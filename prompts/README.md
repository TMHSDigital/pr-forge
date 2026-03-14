# Prompt Library

This directory contains all community-contributed prompts, organized by category.

## Categories

| Directory | Contents |
|---|---|
| `general/` | Everyday tasks and general-purpose prompts |
| `coding/` | Programming, debugging, code review, explanation |
| `writing/` | Drafting, editing, summarizing, tone adjustment |
| `research/` | Analysis, synthesis, question framing, fact-checking |
| `roleplay/` | Personas, simulations, character and scenario prompts |
| `system/` | System prompts and assistant configuration templates |

## Required front matter

```yaml
---
title: "Your Prompt Title"
description: "One sentence about what this prompt does"
category: "general"
tags: ["tag1", "tag2"]
model_target: "any"
author: "your-github-username"
version: "1.0"
---
```

## Required body sections

- `## Prompt` — the actual prompt text
- `## Usage` — when and how to use it

## Validation

```bash
node scripts/validate.js prompts/<category>/<your-file>.md
```
