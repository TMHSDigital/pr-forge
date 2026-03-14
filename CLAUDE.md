# CLAUDE.md — Instructions for Claude Code

This file tells Claude Code how to operate in this repository. Claude's primary job here is to create valid prompt contributions and open pull requests.

## Repository Purpose

This is a prompt library. Contributions are Markdown files with YAML front matter added under `prompts/<category>/`. Each file must conform to `prompts/schema.json`.

## Your Primary Task

When asked to contribute a prompt:

1. Choose or create an appropriate category directory under `prompts/`
2. Create a new `.md` file with a descriptive kebab-case name (e.g., `explain-regex.md`)
3. Populate it using the schema below
4. Validate it by running `node scripts/validate.js prompts/<category>/<filename>.md`
5. Commit with message format: `feat(prompts): add <short description>`
6. Open a PR using the PR template — fill in all checklist items

## Prompt File Schema

Every prompt file MUST have this YAML front matter followed by Markdown body:

```yaml
---
title: "Short descriptive title"
description: "One sentence describing what the prompt does"
category: "general|coding|writing|research|roleplay|system"
tags: ["tag1", "tag2"]
model_target: "any|gpt-4|claude|gemini"
author: "your-github-username or agent:claude-code"
version: "1.0"
---
```

After the front matter, include:

- `## Prompt` — the actual prompt text (required)
- `## Usage` — when/how to use it (required)
- `## Example Output` — sample output (optional but encouraged)
- `## Notes` — caveats, tips, variations (optional)

## Rules

- Never modify files outside `prompts/`, `scripts/`, and documentation files
- Never delete existing prompts without explicit human instruction
- Do not create more than 3 prompt files per session without being asked
- Always run the validator before committing
- Always open a draft PR first; mark ready when validation passes
- PR title format: `feat(prompts): <short description of what prompt does>`
- Branch name format: `prompt/<kebab-case-title>`

## Validation

```bash
node scripts/validate.js prompts/<category>/<file>.md
```

Exit code 0 = valid. Exit code 1 = invalid (read stderr for errors).

## When asked to "grind achievements"

Create a batch of up to 3 distinct, genuinely useful prompts in different categories. Open separate PRs for each. Do not create filler or low-effort content — every prompt must be useful.

## What NOT to do

- Do not create empty, duplicate, or nonsensical prompts
- Do not force-push to main
- Do not merge your own PRs (a human maintainer must merge)
- Do not modify `.github/workflows/` without explicit instruction
