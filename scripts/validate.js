#!/usr/bin/env node
/**
 * validate.js - Validates a prompt file against prompts/schema.json
 * Usage: node scripts/validate.js <path-to-prompt-file.md>
 * Exit 0 = valid, Exit 1 = invalid
 */

const fs = require("fs");
const path = require("path");

function parseFrontMatter(content) {
  const lines = content.split(/\r?\n/);
  if (lines[0].trim() !== "---") return { frontMatter: null, body: content };
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") { end = i; break; }
  }
  if (end === -1) return { frontMatter: null, body: content };
  return { frontMatter: parseYaml(lines.slice(1, end)), body: lines.slice(end + 1).join("\n") };
}

function parseYaml(lines) {
  const result = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.startsWith("#")) { i++; continue; }
    // Inline array: key: ["a", "b"]
    const ia = line.match(/^(\w+):\s*\[(.*)\]\s*$/);
    if (ia) {
      result[ia[1]] = ia[2].split(",").map(s => s.trim().replace(/^"|"$/g, "").replace(/^'|'$/g, "")).filter(Boolean);
      i++; continue;
    }
    // Block array
    const bk = line.match(/^(\w+):\s*$/);
    if (bk) {
      const key = bk[1]; const items = []; i++;
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*-\s+/, "").trim().replace(/^"|"$/g, ""));
        i++;
      }
      result[key] = items; continue;
    }
    // Scalar
    const sc = line.match(/^(\w+):\s*"(.*)"\s*$/) || line.match(/^(\w+):\s*'(.*)'\s*$/) || line.match(/^(\w+):\s+([^\[\s].+)\s*$/);
    if (sc) { result[sc[1]] = sc[2].trim(); i++; continue; }
    i++;
  }
  return result;
}

function validate(data, schema) {
  const errors = [];
  for (const f of (schema.required || [])) {
    if (!data[f] && data[f] !== 0) errors.push(`Missing required field: "${f}"`);
  }
  for (const [k, v] of Object.entries(data)) {
    const p = (schema.properties || {})[k];
    if (!p) { if (schema.additionalProperties === false) errors.push(`Unknown field: "${k}"`); continue; }
    if (p.type === "string" && typeof v !== "string") { errors.push(`"${k}" must be a string`); continue; }
    if (p.type === "array" && !Array.isArray(v)) { errors.push(`"${k}" must be an array`); continue; }
    if (typeof v === "string") {
      if (p.minLength && v.length < p.minLength) errors.push(`"${k}" too short (min ${p.minLength})`);
      if (p.maxLength && v.length > p.maxLength) errors.push(`"${k}" too long (max ${p.maxLength})`);
      if (p.enum && !p.enum.includes(v)) errors.push(`"${k}" must be one of: ${p.enum.join(", ")}`);
      if (p.pattern && !new RegExp(p.pattern).test(v)) errors.push(`"${k}" doesn't match pattern ${p.pattern}`);
    }
    if (Array.isArray(v)) {
      if (p.minItems && v.length < p.minItems) errors.push(`"${k}" needs >= ${p.minItems} items`);
      if (p.maxItems && v.length > p.maxItems) errors.push(`"${k}" allows <= ${p.maxItems} items`);
      if (p.items?.pattern) {
        const re = new RegExp(p.items.pattern);
        v.forEach(item => { if (!re.test(item)) errors.push(`Tag "${item}" invalid (must match ${p.items.pattern})`); });
      }
    }
  }
  return errors;
}

function validateBody(body) {
  const errors = [];
  if (!body.includes("## Prompt")) errors.push('Missing required section: "## Prompt"');
  if (!body.includes("## Usage")) errors.push('Missing required section: "## Usage"');
  const m = body.match(/## Prompt\s+([\s\S]*?)(?=##|$)/);
  if (m && m[1].trim().length < 20) errors.push('"## Prompt" section is too short (min 20 chars)');
  return errors;
}

const args = process.argv.slice(2);
if (!args[0]) { console.error("Usage: node scripts/validate.js <file.md>"); process.exit(1); }

const filePath = path.resolve(process.cwd(), args[0]);
if (!fs.existsSync(filePath)) { console.error(`ERROR: Not found: ${filePath}`); process.exit(1); }
if (!filePath.endsWith(".md")) { console.error("ERROR: File must be .md"); process.exit(1); }

console.log(`Validating: ${path.relative(process.cwd(), filePath)}`);

const { frontMatter, body } = parseFrontMatter(fs.readFileSync(filePath, "utf8"));
if (!frontMatter) { console.error("ERROR: No YAML front matter found (must start with ---)"); process.exit(1); }

const schemaPath = path.resolve(__dirname, "../prompts/schema.json");
if (!fs.existsSync(schemaPath)) { console.error("ERROR: prompts/schema.json not found"); process.exit(1); }
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

const errors = [...validate(frontMatter, schema), ...validateBody(body)];
if (errors.length) {
  console.error(`FAILED: ${errors.length} error(s):`);
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}
console.log("OK: All checks passed.");
console.log(`  title:    ${frontMatter.title}`);
console.log(`  category: ${frontMatter.category}`);
console.log(`  author:   ${frontMatter.author}`);
process.exit(0);
