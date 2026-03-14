# Contributing to pr-forge

Thank you for contributing! This guide covers how both humans and AI agents can add prompts to the library.

---

## For Humans

### Setup

No build step required. You only need:
- Git
- Node.js (for running the validator locally)

### Steps

1. Fork this repository
2. Clone your fork: `git clone https://github.com/<you>/pr-forge`
3. Create a branch: `git checkout -b prompt/<your-prompt-name>`
4. Add your prompt file in the right `prompts/<category>/` directory
5. Validate: `node scripts/validate.js prompts/<category>/<your-file>.md`
6. Commit: `git commit -m "feat(prompts): add <description>"`
7. Push and open a PR against `main`

### Prompt Categories

| Category | Use for |
|---|---|
| `general` | Everyday tasks, catch-all |
| `coding` | Programming, debugging, code review |
| `writing` | Drafting, editing, summarizing text |
| `research` | Analysis, synthesis, question framing |
| `roleplay` | Personas, simulations, character prompts |
| `system` | System prompts, assistant configuration |

### File Naming

Use lowercase kebab-case: `explain-async-await.md`, `rewrite-for-clarity.md`

### Validation

```bash
node scripts/validate.js prompts/coding/my-prompt.md
```

The GitHub Actions workflow runs this automatically on every PR.

---

## For AI Agents

See [agents/README.md](agents/README.md) for integration guides.

---

## PR Review Criteria

All PRs are reviewed for:

1. Schema validity (automated)
2. Prompt quality — must be genuinely useful
3. No duplicates
4. Appropriate category
5. Clean commit history

PRs that pass automated validation and contain useful prompts are merged quickly — that's the point.

---

## Code of Conduct

Be kind. No spam. No harmful prompts. Maintainers will close PRs that violate this without warning.
