# pr-forge

**A community prompt library for LLMs — built to be forked, contributed to, and genuinely useful.**

pr-forge serves two honest purposes:

1. **A real prompt library** — a growing, community-maintained collection of high-quality prompts for ChatGPT, Claude, Gemini, Cursor, and other LLMs. Organized by category, validated by schema, open to all.
2. **An achievement grinder** — GitHub's [Pull Shark](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/github-achievement-types) badge rewards merging PRs. This repo is designed to make that easy through structured, low-friction contributions.

Both goals reinforce each other: more contributors = more prompts = more merged PRs = more achievements.

---

## What's in the library?

Prompts are stored in `prompts/` organized by category:

```
prompts/
├── general/
├── coding/
├── writing/
├── research/
├── roleplay/
└── system/
```

Each prompt is a Markdown file with YAML front matter. See [prompts/schema.json](prompts/schema.json) and [prompts/README.md](prompts/README.md).

---

## How to contribute

### Humans
1. Fork this repo
2. Add a prompt file in the right `prompts/<category>/` folder
3. Follow the schema in `prompts/schema.json`
4. Open a PR — the GitHub Actions validator will check your file automatically

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

### AI Agents
This repo is designed to be AI-agent-friendly:
- **Claude Code** — see [CLAUDE.md](CLAUDE.md)
- **Cursor** — rules in `.cursor/rules/contributing.mdc`
- **GitHub Copilot** — uses PR template and issue templates
- **Custom agents** — see [agents/README.md](agents/README.md)

---

## Fork this repo for your own grind

Want to run your own prompt library + Pull Shark grind? Fork this repo:

1. Fork it
2. Update `README.md` with your name/org
3. Set yourself (and friends) as maintainers
4. Start merging

The structure, validation workflow, and agent integration are all ready to go.

---

## Achievement progress

| Achievement | Requirement | Status |
|---|---|---|
| Pull Shark | 2 merged PRs | - |
| Pull Shark x2 | 4 merged PRs | - |
| Pull Shark x3 | 8 merged PRs | - |
| Pull Shark x4 | 16 merged PRs | - |
| Pull Shark x5 | 32 merged PRs | - |

Update this table as you merge.

---

## License

MIT — fork freely.
