#!/usr/bin/env node
/**
 * generate-from-manifest.js — Generate prompt .md files from scripts/prompts-manifest.json.
 * Usage: node scripts/generate-from-manifest.js [manifest.json] [--stdout] [--offset N] [--limit N]
 * Writes to prompts/<category>/<slug>.md. Use --stdout to print paths only (for piping).
 */

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const defaultManifest = path.join(__dirname, "prompts-manifest.json");

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function generate(p) {
  const slug = p.slug || toSlug(p.title);
  const prompt = p.prompt || `${p.description}\n\nProvide clear, actionable guidance.`;
  const usage =
    p.usage ||
    `Use this prompt when you need to ${p.description.toLowerCase()}. Replace any placeholders with your specific input.`;

  const frontMatter = [
    "---",
    `title: "${p.title.replace(/"/g, '\\"')}"`,
    `description: "${p.description.replace(/"/g, '\\"')}"`,
    `category: "${p.category}"`,
    `tags: [${p.tags.map((t) => `"${t}"`).join(", ")}]`,
    'model_target: "any"',
    'author: "agent:cursor"',
    'version: "1.0"',
    "---",
  ].join("\n");

  return `${frontMatter}

## Prompt

${prompt}

## Usage

${usage}
`;
}

function main() {
  const jsonArg = process.argv.slice(2).find((a) => !a.startsWith("--") && a.endsWith(".json"));
  const manifestPath = jsonArg ? path.resolve(process.cwd(), jsonArg) : defaultManifest;
  if (!fs.existsSync(manifestPath)) {
    console.error("Manifest not found:", manifestPath);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  let prompts = manifest.prompts || [];
  const offsetIdx = process.argv.indexOf("--offset");
  if (offsetIdx !== -1 && process.argv[offsetIdx + 1]) {
    const offset = parseInt(process.argv[offsetIdx + 1], 10);
    if (offset > 0) prompts = prompts.slice(offset);
  }
  const limitIdx = process.argv.indexOf("--limit");
  if (limitIdx !== -1 && process.argv[limitIdx + 1]) {
    const limit = parseInt(process.argv[limitIdx + 1], 10);
    if (limit > 0) prompts = prompts.slice(0, limit);
  }

  if (prompts.length === 0) {
    console.error("No prompts in manifest.");
    process.exit(1);
  }

  const written = [];

  for (const p of prompts) {
    const slug = p.slug || toSlug(p.title);
    const outPath = path.join(repoRoot, "prompts", p.category, `${slug}.md`);
    const dir = path.dirname(outPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(outPath, generate(p), "utf8");
    written.push(path.relative(repoRoot, outPath));
  }

  if (process.argv.includes("--stdout")) {
    console.log(written.join("\n"));
  } else {
    console.log(`Generated ${written.length} prompt(s):`);
    written.forEach((f) => console.log(`  - ${f}`));
  }
}

main();
