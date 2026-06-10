# Reach Digital — Creative Strategy Vault

Obsidian vault + Hermes Agent (Nous Portal + Gemini API + FAL) for creative strategy. Hermes is your co-pilot — analyzing ads, writing scripts, producing briefs, loading tasks to ClickUp, and managing creative references in Notion.

> **Hermes is the only system.** 8 vault slash commands are mirrored as Hermes skills under `~/.hermes/profiles/reach-digital/skills/reach-digital/`. The Go CLIs (`clickup-pp-cli`, `motion-pp-cli`) are preferred for routine work; 51 ClickUp MCP tools cover ad-hoc reads.

---

## Quick Start (New Strategist)

### Prerequisites

1. **Obsidian** — [Download](https://obsidian.md/) (free)
2. **Hermes Agent** — install from [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com). The reach-digital profile lives at `~/.hermes/profiles/reach-digital/` and is preloaded with provider auth (Nous OAuth, Gemini API key) and 8 vault skills.

### Open the Vault

```bash
hermes   # CLI — auto-loads the reach-digital profile from ~/.hermes/profiles/reach-digital/
hermes --tui   # TUI
```

Or use the **Obsidian Agent Client sidebar** (right panel — installed by setup) — runs through Hermes via the ACP adapter.

Then say: **"This is my first time. Set me up."** Hermes walks you through API keys, browser logins, and Obsidian configuration.

**Verify anytime:**
```bash
bash ~/.hermes/profiles/reach-digital/skills/reach-digital/reach-digital-ops/scripts/smoke-test.sh
```

All green means everything works.

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

Talk naturally. Hermes routes to the right skill automatically. URLs from YouTube, TikTok, Motion, and direct media links are auto-detected.

### Supported Platforms

| Platform | Supported | Login needed? |
|---|---|---|
| YouTube | Yes | No |
| TikTok | Yes | No |
| Motion | Yes | One-time (see Setup.md) |
| Direct .mp4/.jpg links | Yes | No |
| Twitter/X, Facebook, Instagram | No | Download manually, give Hermes the file path |

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
reach-digital-hermes/
├── AGENTS.md                      ← auto-loaded by Hermes every session
├── README.md                      ← this file
├── team_to_clickup.json           ← 23-member ClickUp team directory
├── brand_to_motion.json           ← brand → Motion workspace/report IDs
├── reviews.jsonl, IM8_FULL_INVENTORY.json,
│   elevate_ads_payload.json,
│   Lifeforce_Performance_Flat.json   ← research data
├── 00 Global/
│   ├── Criteria/                  ← quality rules for all copy (immutable)
│   ├── Process/                   ← workflows, setup, system docs
│   ├── Hermes/                    ← Hermes-specific config (canonical)
│   │   ├── Commands/              ← 8 .md files, the canonical skill references
│   │   ├── Tools/                 ← Node tools + Go CLI source
│   │   └── strategist.json        ← your identity for ClickUp task assignment
│   ├── Statics Generator/         ← AI image generation system
│   ├── Script Structure Examples/
│   ├── Video Script Scoring/
│   ├── Skills/                    ← skill refinement logs
│   ├── Workplace/                 ← internal notes
│   └── 00 Archive/                 ← old/archived work
└── [Brand Name]/
    ├── 00 Context/                ← brand, product, persona, compliance
    ├── 02 Ads Analysis/           ← top spender breakdowns
    ├── T001 Working Document.md   ← batch plan + criteria + process log
    ├── T001 Scripts.md            ← video scripts
    ├── T001 Briefs.md             ← static ad briefs
    └── T001 Batch Critique.md     ← quality review
```

---

## What's in the Hermes Profile

The reach-digital profile at `~/.hermes/profiles/reach-digital/` ships pre-configured. **No install script needed** — install Hermes Agent and the profile is ready.

| Category | Components |
|---|---|
| **Provider auth** | Nous Portal (OAuth) + Google AI Studio + FAL + ClickUp (API token + MCP OAuth) |
| **Reach-digital skills (8)** | batch-planner, brand-researcher, clickup-load, grab-media, motion-top-spenders, reach-digital-ops, script-writer, transcribe |
| **Go CLIs** | `motion-pp-cli` + `clickup-pp-cli` — pre-built, installed at `$HOME/go/bin/`, source at `~/printing-press/library/<name>/` |
| **Node tools** | gemini-api, site-scraper, review-sampler, persona-counter, ad-classifier, fal-ai, endcard-generator — pre-installed under `00 Global/Hermes/Tools/` |
| **MCP servers** | ClickUp (configured, 51 tools) + Notion (add manually) + Google Drive (add manually) |
| **Obsidian** | Minimal theme, 4 plugins, 2 CSS snippets, dark mode, appearance config |

Full reference: [Setup.md](00%20Global/Process/Setup.md)

---

## Key Docs for New Strategists

| Doc | Covers |
|---|---|
| `00 Global/Process/System Overview.md` | How everything works end-to-end |
| `00 Global/Process/Setup.md` | Detailed setup reference (auth, tools, MCP, logins) |
| `00 Global/Process/Brand Research.md` | 7-phase brand research pipeline |
| `00 Global/Criteria/Universal Copy Rules.md` | Quality bar for all ad copy |
| `00 Global/Criteria/Video Script Criteria.md` | Script-specific rules |
| `00 Global/Criteria/Creative Image Ad Criteria.md` | Static brief rules |

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Tool not found | Run the smoke test to see which binary is missing. Install via brew (`/opt/homebrew/bin/`) or `go install` for Go CLIs. |
| Motion grabs fail | Re-run the Motion login (session expired). |
| Gemini analysis broken | `cat 00 Global/Hermes/Tools/gemini-api/.env` — key should be there. |
| ClickUp tasks assigned wrong | Edit `00 Global/Hermes/strategist.json` with your name + ClickUp ID. |
| Obsidian plugins missing | Restart Obsidian (Cmd+Q, reopen). |
| Agent Client says "auth required" | Re-link via `hermes auth refresh`; restart Obsidian. |
| Go CLIs missing | Ask for the printing-press source directory or pre-built binary. Copy to `$HOME/go/bin/`. |
| Hermes can't find a CLI on PATH | Check `~/.hermes/profiles/reach-digital/home/.bashrc` — `$HOME`-relative PATH entries expand wrong inside the profile-scoped shell. Hardcode the absolute path. |
| ClickUp tool IDs stale | Update `team_to_clickup.json` at the vault root and rebuild `~/printing-press/library/clickup/`. |
| Smoke test reports failures | Run `bash ~/.hermes/profiles/reach-digital/skills/reach-digital/reach-digital-ops/scripts/smoke-test.sh` and inspect which check failed. |

---

## Tips

- **Talk naturally.** Say "analyze this ad," "start a new batch," "load to ClickUp." No slash commands needed.
- **Paste URLs freely.** Hermes auto-downloads and analyzes.
- **Your raw notes are valuable.** Write what YOU see — spend data, strategic context. Hermes adds timestamps, exact copy, visual breakdowns.
- **Criteria docs are your quality bar.** Skim `00 Global/Criteria/`. Hermes reads them automatically, but you should know what's in there.
- **Each batch compounds.** Working Documents carry criteria and process logs forward.
