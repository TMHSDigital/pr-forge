#!/usr/bin/env node
/**
 * bulk-from-manifest.js — Generate prompts from manifest, then open PRs with auto-merge.
 * Usage: node scripts/bulk-from-manifest.js [manifest.json] [--dry-run] [--generate-only] [--offset N] [--limit N]
 * Run from repo root. Requires gh CLI.
 *
 * manifest.json: optional path (default: scripts/prompts-manifest.json)
 * --generate-only: only write .md files, skip PR creation
 * --dry-run: validate and show what would run, no git/gh changes
 * --limit N: only process first N prompts (for batching; e.g. --limit 50)
 */

const { execSync } = require("child_process");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");

function main() {
  const dryRun = process.argv.includes("--dry-run");
  const generateOnly = process.argv.includes("--generate-only");
  const offsetIdx = process.argv.indexOf("--offset");
  const offsetArg = offsetIdx !== -1 && process.argv[offsetIdx + 1] ? `--offset ${process.argv[offsetIdx + 1]}` : "";
  const limitIdx = process.argv.indexOf("--limit");
  const limitArg = limitIdx !== -1 && process.argv[limitIdx + 1] ? `--limit ${process.argv[limitIdx + 1]}` : "";
  const jsonArg = process.argv.slice(2).find((a) => !a.startsWith("--") && a.endsWith(".json"));
  const manifestArg = jsonArg ? path.resolve(process.cwd(), jsonArg) : "";

  // Step 1: Generate files from manifest
  const genCmd = ["node", "scripts/generate-from-manifest.js", manifestArg, "--stdout", offsetArg, limitArg].filter(Boolean).join(" ");
  const out = execSync(genCmd, { cwd: repoRoot, encoding: "utf8" });
  const paths = out.trim().split(/\r?\n/).filter(Boolean);

  if (paths.length === 0) {
    console.error("No prompts generated.");
    process.exit(1);
  }

  console.log(`Generated ${paths.length} prompt(s).`);

  if (generateOnly) {
    console.log("Skipping PR creation (--generate-only).");
    return;
  }

  // Step 2: Run bulk-pr on generated paths
  const bulkArgs = dryRun ? ["--dry-run", ...paths] : paths;
  execSync(
    `node scripts/bulk-pr.js ${bulkArgs.map((p) => `"${p}"`).join(" ")}`,
    { cwd: repoRoot, stdio: "inherit" }
  );
}

main();
