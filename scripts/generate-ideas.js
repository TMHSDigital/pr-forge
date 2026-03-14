#!/usr/bin/env node
/**
 * generate-ideas.js — Generate prompt ideas from scripts/idea-seeds.json (templates + seeds).
 * Usage: node scripts/generate-ideas.js [--count N] [--output path] [--append-manifest]
 * Default: 500 ideas to stdout as JSON array. Use --append-manifest to merge into prompts-manifest.json.
 */

const fs = require("fs");
const path = require("path");

const scriptDir = path.resolve(__dirname);
const seedsPath = path.join(scriptDir, "idea-seeds.json");
const manifestPath = path.join(scriptDir, "prompts-manifest.json");

const CATEGORIES = ["general", "coding", "writing", "research", "roleplay", "system"];
const TITLE_MAX = 100;
const DESC_MAX = 300;
const TAGS_MAX = 10;

function toSlug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function tagFromSeed(seed) {
  const t = toSlug(seed);
  return t.length > 0 ? t : "topic";
}

function truncate(str, max) {
  if (str.length <= max) return str;
  return str.slice(0, max - 3).trim() + "...";
}

function main() {
  const args = process.argv.slice(2);
  let count = 500;
  let outputPath = null;
  let appendManifest = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--count" && args[i + 1]) {
      count = Math.max(1, parseInt(args[i + 1], 10));
      i++;
    } else if (args[i] === "--output" && args[i + 1]) {
      outputPath = path.resolve(process.cwd(), args[i + 1]);
      i++;
    } else if (args[i] === "--append-manifest") {
      appendManifest = true;
    }
  }

  if (!fs.existsSync(seedsPath)) {
    console.error("Not found: scripts/idea-seeds.json");
    process.exit(1);
  }

  const { templates, seeds } = JSON.parse(fs.readFileSync(seedsPath, "utf8"));
  const seen = new Set();
  const out = [];

  for (const t of templates) {
    const cat = t.category || "general";
    const list = seeds[cat];
    if (!Array.isArray(list)) continue;

    for (const seed of list) {
      const title = truncate(t.title.replace(/\{0\}/g, seed), TITLE_MAX);
      const description = truncate(t.description.replace(/\{0\}/g, seed), DESC_MAX);
      const slug = toSlug(title);
      if (!slug || title.length < 5 || description.length < 10) continue;
      if (seen.has(slug)) continue;
      seen.add(slug);

      const baseTags = Array.isArray(t.tags) ? t.tags : [cat];
      const tag = tagFromSeed(seed);
      const tags = [...new Set([...baseTags.map(toSlug), tag].filter(Boolean))].slice(0, TAGS_MAX);

      out.push({
        title,
        description,
        category: cat,
        tags,
        slug,
      });
      if (out.length >= count) break;
    }
    if (out.length >= count) break;
  }

  const result = out.slice(0, count);

  if (appendManifest) {
    let manifest = { prompts: [] };
    if (fs.existsSync(manifestPath)) {
      manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    }
    const existingSlugs = new Set((manifest.prompts || []).map((p) => (p.slug || toSlug(p.title))));
    const newOnes = result.filter((p) => !existingSlugs.has(p.slug));
    manifest.prompts = (manifest.prompts || []).concat(newOnes);
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
    console.error(`Appended ${newOnes.length} ideas to prompts-manifest.json (${existingSlugs.size} existing).`);
    return;
  }

  const payload = { prompts: result };
  const json = JSON.stringify(payload, null, 2);
  if (outputPath) {
    fs.writeFileSync(outputPath, json, "utf8");
    console.error(`Wrote ${result.length} ideas to ${outputPath}`);
  } else {
    console.log(json);
  }
}

main();
