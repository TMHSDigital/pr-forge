# Agent Integration Guide

pr-forge is designed to accept contributions from AI agents. This guide covers Claude Code, Cursor, GitHub Copilot, and custom webhook-driven agents.

---

## How the Pipeline Works

```
Agent creates branch
        ↓
Agent pushes prompt file
        ↓
Agent opens PR
        ↓
Agent enables auto-merge (gh pr merge --auto --squash)
        ↓
GitHub Actions validates the file
        ↓
GitHub auto-merges as the repo owner — achievement credit granted
```

Auto-merge ensures the merge is credited to the human repo owner, not a bot. This is required for GitHub achievement tracking (Pull Shark).

**Prerequisite:** Auto-merge must be enabled on the repository once.
Settings → General → Allow auto-merge ✔️

---

## Claude Code

Claude Code reads [CLAUDE.md](../CLAUDE.md) at the root of the repo automatically.

**Triggering Claude Code:**
1. Open an issue using the **Agent Task** template, targeting "Claude Code"
2. In your Claude Code session, reference the issue and ask Claude to complete it
3. Claude creates the file, validates it, opens a PR, and enables auto-merge

**Autonomous mode:**
```
Create 3 useful prompts for the coding category and open separate PRs for each.
```

**Full automated command (no clicks required):**
```bash
# Claude handles all of this:
gh pr merge <PR_NUMBER> --auto --squash --repo <owner>/pr-forge
```

---

## Cursor

Cursor reads `.cursor/rules/contributing.mdc` automatically when you open this repo.

1. Open the repo in Cursor
2. Open or create a file under `prompts/<category>/`
3. Cursor's rules guide autocomplete to follow the schema
4. Run `node scripts/validate.js <path>` before committing
5. After opening a PR, run: `gh pr merge <number> --auto --squash --repo <owner>/pr-forge`

---

## GitHub Copilot

1. Open an issue using the **Add Prompt** or **Agent Task** template
2. Use Copilot's "Assign to Copilot" feature
3. Copilot reads the PR template checklist and issue fields
4. Enable auto-merge after PR is opened

---

## Custom Webhook Agents

**Setup:**
1. Settings → Webhooks → Add webhook
2. Set payload URL to your agent's endpoint
3. Select event: **Issues**

**Full automated flow your agent must implement:**

```bash
# 1. Create branch
gh api repos/<owner>/pr-forge/git/refs \
  -f ref="refs/heads/prompt/<name>" \
  -f sha="<main-sha>"

# 2. Push file via API
gh api repos/<owner>/pr-forge/contents/prompts/<category>/<file>.md \
  -X PUT -f message="feat(prompts): add <desc>" \
  -f content="<base64-encoded-content>"

# 3. Open PR
gh pr create --repo <owner>/pr-forge \
  --title "feat(prompts): add <desc>" \
  --head prompt/<name> --base main

# 4. Enable auto-merge (credits merge to repo owner)
gh pr merge <PR_NUMBER> --auto --squash --repo <owner>/pr-forge
```

---

## Security Notes

- Agents write only to `prompts/`, `scripts/`, and docs
- Never grant agent write access to `.github/workflows/`
- Auto-merge requires passing CI — the validator is the quality gate
- Enable branch protection on `main`: require PR + passing checks
