#!/usr/bin/env node
/**
 * bulk-pr.js — Create a branch, PR, and enable auto-merge for each prompt file.
 * Usage: node scripts/bulk-pr.js [--dry-run] <path-to-prompt.md> [path2.md ...]
 * Run from repo root. Requires gh CLI and a clean main (or files already staged/committed elsewhere).
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync, execFileSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..");

function parseTitleAndCategory(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const titleMatch = content.match(/^title:\s*["'](.+?)["']/m);
  const categoryMatch = content.match(/^category:\s*["'](.+?)["']/m);
  return {
    title: titleMatch ? titleMatch[1] : path.basename(filePath, ".md"),
    category: categoryMatch ? categoryMatch[1] : "general",
  };
}

function run(cmd, opts = {}) {
  const options = { cwd: repoRoot, encoding: "utf8", ...opts };
  if (Array.isArray(cmd)) {
    const [exe, ...args] = cmd;
    return execFileSync(exe, args, options);
  }
  return execSync(cmd, options);
}

function sleep(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}

function pullMain() {
  try {
    const status = run("git status --porcelain");
    if (status.trim().length > 0) {
      run("git stash push -q -m bulk-pr-auto");
      run("git pull --ff-only");
      try { run("git stash pop -q"); } catch (_) {}
    } else {
      run("git pull --ff-only");
    }
  } catch (_) {}
}

function main() {
  const args = process.argv.slice(2).filter((a) => a !== "--dry-run");
  const dryRun = process.argv.includes("--dry-run");

  if (args.length === 0) {
    console.error("Usage: node scripts/bulk-pr.js [--dry-run] <prompt.md> [prompt2.md ...]");
    process.exit(1);
  }

  const stats = { created: 0, skipped: 0, failed: 0, autoMergeFailed: 0 };
  const files = args.map((f) => path.resolve(process.cwd(), f));

  for (const file of files) {
    const relativePath = path.relative(repoRoot, file);
    const slug = path.basename(file, ".md");
    const branchName = `prompt/${slug}`;

    if (!fs.existsSync(file)) {
      console.error(`Skip: not found: ${relativePath}`);
      stats.skipped++;
      continue;
    }
    if (!file.endsWith(".md")) {
      console.error(`Skip: not .md: ${relativePath}`);
      stats.skipped++;
      continue;
    }

    const { title, category } = parseTitleAndCategory(file);
    const commitMsg = `feat(prompts): add ${title}`;
    const prTitle = `feat(prompts): add ${title}`;
    const prBody = [
      "## Summary",
      `Adds prompt: ${relativePath}`,
      "",
      "## Prompt(s) Added / Changed",
      `- \`${relativePath}\` — ${title}`,
      "",
      "## Checklist",
      "- [x] File in correct directory",
      "- [x] Front matter complete",
      "- [x] Validator passed",
      "- [x] Original, useful prompt",
      "- [x] kebab-case .md",
      "",
      `**Category:** ${category}`,
    ].join("\n");

    console.log(`\n--- ${relativePath} (${branchName}) ---`);

    if (dryRun) {
      console.log("  [dry-run] validate, branch, commit, push, pr create, pr merge --auto --squash");
      continue;
    }

    // Validate
    try {
      run(`node scripts/validate.js "${relativePath}"`);
    } catch (e) {
      console.error(`  FAILED validation: ${relativePath}`);
      stats.failed++;
      continue;
    }

    run("git checkout main");
    pullMain();
    try {
      run(`git branch -D ${branchName}`);
    } catch (_) {}
    run(`git checkout -b ${branchName}`);
    const gitPath = relativePath.replace(/\\/g, "/");
    run(["git", "add", gitPath]);
    try {
      run(["git", "commit", "-m", commitMsg]);
    } catch (e) {
      run("git checkout main");
      try {
        run(`git branch -D ${branchName}`);
      } catch (_) {}
      console.warn(`  Skip: nothing to commit (file may already exist on main)`);
      stats.skipped++;
      continue;
    }
    run(`git push -u origin ${branchName}`);

    let prNumber;
    const bodyFile = path.join(os.tmpdir(), `pr-forge-pr-body-${slug}.md`);
    try {
      fs.writeFileSync(bodyFile, prBody, "utf8");
      const out = run([
        "gh", "pr", "create", "--base", "main", "--title", prTitle, "--body-file", bodyFile,
      ]);
      fs.unlinkSync(bodyFile);
      const match = out.match(/pull\/(\d+)/);
      prNumber = match ? match[1] : null;
    } catch (e) {
      if (fs.existsSync(bodyFile)) fs.unlinkSync(bodyFile);
      console.error("  gh pr create failed:", e.stderr || e.message);
      stats.failed++;
      run("git checkout main");
      continue;
    }

    if (prNumber) {
      let merged = false;
      try {
        run(`gh pr merge ${prNumber} --auto --squash`);
        merged = true;
      } catch (e) {
        sleep(3000);
        try {
          run(`gh pr merge ${prNumber} --auto --squash`);
          merged = true;
        } catch (e2) {
          console.warn("  PR opened but auto-merge failed:", e2.stderr || e2.message);
          stats.autoMergeFailed++;
        }
      }
      if (merged) {
        console.log(`  PR #${prNumber} opened, auto-merge enabled.`);
        stats.created++;
      }
    }

    run("git checkout main");
    pullMain();
  }

  console.log(`\nDone. Created: ${stats.created} | Skipped: ${stats.skipped} | Failed: ${stats.failed} | Auto-merge failed: ${stats.autoMergeFailed}`);
}

main();
