# Reach Digital — Creative Strategy Vault

Obsidian vault + Claude Code for creative strategy. Claude is your co-pilot — analyzing ads, writing scripts, producing briefs, loading tasks to ClickUp, and managing creative references in Notion.

---

## Quick Start (New Strategist)

### Prerequisites

1. **Obsidian** — [Download](https://obsidian.md/) (free)
2. **Claude Code** — Requires an Anthropic Max or Team plan. Install via **any** of these:
   - [Desktop app](https://claude.ai/download) (recommended — includes terminal + GUI)
   - npm global: `npm install -g @anthropic-ai/claude-code && claude login`
   - Or use it inside VS Code / JetBrains via the Claude Code extension

### 3-Step Setup

```bash
# 1. Clone the repo
git clone https://github.com/TheProdigal95/reach-digital.git

# 2. Open reach-digital/ as a vault in Obsidian

# 3. Open Claude Code in the vault and say:
```

> **"This is my first time. Set me up."**

Claude handles the rest — installs every dependency, asks for your API keys, configures Obsidian (theme, plugins, snippets), wires up integrations (ClickUp, Notion, Motion), and walks you through any browser logins. The whole thing takes about 5 minutes.

You can also run the setup script directly if you prefer: `bash setup.sh`

**Verify anytime:** `bash setup.sh --check` — all green means everything works.

---

## Using the Vault

Open Claude Code in the vault:
- **Desktop app:** Open the `reach-digital/` folder
- **Terminal CLI:** `cd reach-digital && claude`
- **Obsidian:** Use the Agent Client sidebar (right panel — installed by setup)

### What to Say

| Task | Say this |
|---|---|
| Start a new batch | "Start a new batch for IM8" |
| Pull top spenders | "Pull the top spenders from Motion for Elevate" |
| Analyze an ad | "Analyze this ad [paste URL]" |
| Write scripts | "Write the remaining scripts" |
| Write briefs | "Write the briefs" |
| Load to ClickUp | "Load the scripts to ClickUp" |
| Research a new brand | "Research Pure Plank" |
| Transcribe video | "Transcribe this video [path or URL]" |
| Add to Notion references | "Add this to the References Database" |

Talk naturally. Claude routes to the right tool automatically. URLs from YouTube, TikTok, Motion, and direct media links are auto-detected.

### Supported Platforms

| Platform | Supported | Login needed? |
|---|---|---|
| YouTube | Yes | No |
| TikTok | Yes | No |
| Motion | Yes | One-time (see above) |
| Direct .mp4/.jpg links | Yes | No |
| Twitter/X, Facebook, Instagram | No | Download manually, give Claude the file path |

---

## How Work Flows

```
Research → Context docs → Ads analysis → Batch plan → Scripts/Briefs → Critique → ClickUp
```

1. **Research** — Scrape reviews, run research sprints, mine customer language
2. **Context** — Brand, Product, Persona docs in `[Brand]/00 Context/`
3. **Ads analysis** — Break down top spenders from the ad account
4. **Batch plan** — Map concepts to personas, assign structures and visual direction
5. **Write** — Model script first (iterated with CD), then agents produce the rest in parallel
6. **Critique** — Quality checklist, fix passes, batch review
7. **Load** — Push to ClickUp for designers and editors

Each batch compounds. T001 tests hypotheses, T002 refines, T003 expands.

---

## Vault Structure

```
reach-digital/
├── setup.sh                      <- Run this first
├── 00 Global/
│   ├── Criteria/                 <- Quality rules for all copy
│   ├── Process/                  <- Workflows, templates, system docs
│   └── Statics Generator/       <- AI image generation system
├── [Brand Name]/
│   ├── 00 Context/              <- Brand, product, persona, compliance
│   ├── 02 Ads Analysis/         <- Top spender breakdowns
│   ├── T001 Working Document.md <- Batch plan + criteria + process log
│   ├── T001 Scripts.md          <- Video scripts
│   ├── T001 Briefs.md           <- Static ad briefs
│   └── T001 Batch Critique.md   <- Quality review
└── .claude/
    ├── commands/                 <- Slash commands (auto-loaded by Claude Code)
    ├── tools/                    <- Node.js tools, Go CLI source, utility scripts
    │   ├── motion-pp-cli/       <- Motion API CLI (Go source, built during setup)
    │   └── clickup-pp-cli/      <- ClickUp CLI (Go source, built during setup)
    └── settings.json             <- Project-level config
```

---

## What setup.sh Installs

| Category | Components |
|---|---|
| **System packages** | Homebrew, yt-dlp, ffmpeg, Node.js, Go, Python 3 |
| **npm globals** | agent-browser, claude-agent-acp |
| **Project tools** (7) | gemini-api, site-scraper, review-sampler, persona-counter, ad-classifier, fal-ai, endcard-generator |
| **Python venv** | review-scraper (httpx + Playwright + Chromium) |
| **Go CLIs** | motion-pp-cli (Motion API), clickup-pp-cli (ClickUp loading) — built from in-repo source |
| **API keys** | Gemini (free, for video analysis) + fal.ai (for image generation) |
| **Obsidian** | Minimal theme, 4 plugins, 2 CSS snippets, appearance config |
| **Claude Code MCPs** | ClickUp, Notion, Motion Creative marketplace plugins |

Full reference: [Setup.md](00%20Global/Process/Setup.md)

---

## Key Docs for New Strategists

| Doc | Covers |
|---|---|
| `00 Global/Process/System Overview.md` | How everything works end-to-end |
| `00 Global/Process/Setup.md` | Detailed setup reference (what each phase does) |
| `00 Global/Process/Batch Template.md` | The 12-step batch flow |
| `00 Global/Criteria/Universal Copy Rules.md` | Quality bar for all ad copy |
| `00 Global/Criteria/Video Script Criteria.md` | Script-specific rules |
| `00 Global/Criteria/Creative Image Ad Criteria.md` | Static brief rules |

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Setup script reports errors | Run `bash setup.sh` again (it fixes what it can) |
| Tool not found | `bash setup.sh --check` to see what's missing |
| Motion grabs fail | Re-run the Motion login (session expired) |
| Gemini analysis broken | `cat .claude/tools/gemini-api/.env` — key should be there |
| ClickUp tasks assigned wrong | Edit `.claude/strategist.json` with your name + ClickUp ID |
| Obsidian plugins missing | Restart Obsidian (Cmd+Q, reopen), then `bash setup.sh` |
| Agent Client says "auth required" | `claude login` in terminal, restart Obsidian |
| Go CLIs missing | Run `bash setup.sh` — it builds them from in-repo source automatically |
| Claude Code not installed | [Download desktop app](https://claude.ai/download) or `npm install -g @anthropic-ai/claude-code` |

---

## Tips

- **Talk naturally.** Say "analyze this ad," "start a new batch," "load to ClickUp." No slash commands needed.
- **Paste URLs freely.** Claude auto-downloads and analyzes.
- **Your raw notes are valuable.** Write what YOU see — spend data, strategic context. Claude adds timestamps, exact copy, visual breakdowns.
- **Criteria docs are your quality bar.** Skim `00 Global/Criteria/`. Claude reads them automatically, but you should know what's in there.
- **Each batch compounds.** Working Documents carry criteria and process logs forward.
