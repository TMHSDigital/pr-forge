# Agent Integration Guide

pr-forge is designed to accept contributions from AI agents. This guide covers Claude Code, Cursor, GitHub Copilot, and custom webhook-driven agents.

---

## How the Pipeline Works

```
Issue (agent-task template)
        ↓
Agent reads issue / gets triggered
        ↓
Agent creates branch → writes prompt file → runs validator
        ↓
Agent opens PR (uses PR template)
        ↓
GitHub Actions validates the file automatically
        ↓
Human maintainer reviews and merges
```

Agents NEVER merge their own PRs. A human must merge.

---

## Claude Code

Claude Code reads [CLAUDE.md](../CLAUDE.md) at the root of the repo automatically.

**Triggering Claude Code:**
1. Open an issue using the **Agent Task** template, targeting "Claude Code"
2. In your Claude Code session, reference the issue and ask Claude to complete it
3. Claude creates the file, validates it, and opens a PR

**Autonomous mode:**
```
Create 3 useful prompts for the coding category and open separate PRs for each.
```

---

## Cursor

Cursor reads `.cursor/rules/contributing.mdc` automatically when you open this repo.

1. Open the repo in Cursor
2. Open or create a file under `prompts/<category>/`
3. Cursor's rules guide autocomplete to follow the schema
4. Run `node scripts/validate.js <path>` before committing

---

## GitHub Copilot

1. Open an issue using the **Add Prompt** or **Agent Task** template
2. Use Copilot's "Assign to Copilot" feature
3. Copilot reads the PR template checklist and issue fields

---

## Custom Webhook Agents

**Setup:**
1. Settings → Webhooks → Add webhook
2. Set payload URL to your agent's endpoint
3. Select event: **Issues**

**On issue creation with `agent-task` label**, GitHub sends the issue body. Your agent must:
1. Parse `task_type`, `objective`, `acceptance_criteria`, `branch_name` from the issue
2. Create a branch and write the prompt file
3. Run `node scripts/validate.js <path>`
4. Commit, push, and open a PR referencing the issue

**Open a PR via API:**
```bash
curl -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/<owner>/pr-forge/pulls \
  -d '{"title": "feat(prompts): add <desc>", "head": "<branch>", "base": "main", "draft": true}'
```

---

## Security Notes

- Agents write only to `prompts/`, `scripts/`, and docs
- Never grant agent write access to `.github/workflows/`
- Always require human review before merge
- Enable branch protection on `main`: require PR + passing checks
