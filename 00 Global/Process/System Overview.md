# System Overview — Reach Digital Creative Strategy

*Living document. Last updated: 2026-06-09 (Hermes-native port).*

---

## What This System Is

An AI-assisted creative strategy system built on Hermes Agent + Obsidian. One strategist + Hermes can research, analyze competitors, write scripts, produce briefs, and delegate to designers at the speed of a full creative team. The 8 reach-digital skills (motion-top-spenders, brand-researcher, batch-planner, clickup-load, grab-media, transcribe, script-writer, reach-digital-ops) live under `~/.hermes/profiles/reach-digital/skills/reach-digital/<name>/` and are loaded automatically by the profile.

Everything lives in markdown. The vault is the single source of truth.

---

## What's Built and Working

### Tools

| Tool | What it does | Where it lives |
|---|---|---|
| **`/motion-pull`** | Pulls top-spender data from the Motion GraphQL API (metrics, CDN URLs, Motion share links). Subcommands: `pull` (top creatives + download), `angles` (angle spend breakdown), `formats` (format trends), `highlights` (AI signals), `delta` / `stale` / `history` (longitudinal tracking). Stores every pull in local SQLite. **Replaces the old CSV + `/grab` batch-download workflow for Motion.** | `00 Global/Hermes/Commands/motion-pull.md` · Binary: `$HOME/go/bin/motion-pp-cli` |
| **`/grab`** | Downloads ad media from YouTube, TikTok, and direct URLs. Extracts ad copy from metadata. Videos get 4-column Gemini analysis. **Use for non-Motion sources only** — Motion pulls go through `/motion-pull`. Never fabricates analysis for failed downloads. | `00 Global/Hermes/Commands/grab.md` + `00 Global/Hermes/tools/grab/grab.js` |
| **`/transcribe`** | Routes video/audio to MLX (local, free, speech-only) or Gemini (visual + audio breakdown with 4-column table). | `00 Global/Hermes/Commands/transcribe.md` + `00 Global/Hermes/tools/mlx-transcribe.py` |
| **`/ad-library`** | Batch scrapes Meta Ad Library via Apify. Downloads media, optional Gemini analysis. Supports 10-20 brands at once. | `00 Global/Hermes/Commands/ad-library.md` + `00 Global/Hermes/tools/ad-library/` |
| **Gemini API** | Video analysis (4-column tables + edit-style breakdown), image analysis, text generation, image generation. Essential for visual analysis of top spenders — edit pace, b-roll patterns, color treatment, caption style — which the CLI's metric pull doesn't cover. | `00 Global/Hermes/tools/gemini-api/gemini-api.js` |
| **Research Engine** | Reddit research sprints — scrapes conversations, extracts evidence, discovers themes, mines language patterns. | MCP server (separate from vault) |
| **Review Scraper** | Scrapes product reviews from any ecommerce site into standardized JSONL. | `/review-scraper` skill |
| **`/generate-static`** | Converts approved briefs to model-specific prompts, generates images via fal.ai (NanoBanana 2 or GPT Image 2), and animates statics via Veo 3.1. Supports standalone generation, ad-swipe, format multiplication, and final composition around an approved creative hero. | `00 Global/Hermes/Commands/generate-static.md` + `00 Global/Hermes/tools/fal-ai/` + `00 Global/Statics Generator/` |
| **`/creative-image`** | Optional hero-first pre-pass for creative image static ads. Deepens the angle, proposes metaphorical or scenario-based concepts, generates text-free hero variants via the existing fal.ai wrapper, then hands an approved hero to `/generate-static` for final composition. | `00 Global/Hermes/Commands/creative-image.md` + `00 Global/Statics Generator/Creative Hero Workflow.md` |

### Creative Skills (slash commands)

| Skill | What it produces |
|---|---|
| `/statics-briefer` | **Deprecated.** Replaced by `/generate-static`. TEEP stages and Emotional Zones superseded by Creative Strategy Matrix. |
| `/listicle-writer` | Long-form listicle landing pages where each point is a sales argument |
| `/native-ad-creative` | Native ad headlines + image direction using direct response psychology |
| `/editorial-image-prompts` | Editorial-style image prompts for Gemini image generation |

### Integrations

| Platform | What Claude does | How |
|---|---|---|
| **Motion** | Pulls top-spender metrics, downloads media via CDN, constructs Motion share links for references. Subcommands cover angle/format trends, AI highlights, delta tracking. | `motion-pp-cli` (Go CLI calling Motion GraphQL API directly) |
| **ClickUp** | Loads briefs for designers, creates footage requests, comments on tasks | ClickUp Go CLI (`clickup-pp-cli`, personal API token) + ClickUp MCP (OAuth) |

### Criteria System

Global rules that apply across all brands, stored in `00 Global/Criteria/`:

| Document | Scope |
|---|---|
| `Universal Copy Rules.md` | Foundation for all copy — voice, flow, connectors, redundancy |
| `Video Script Criteria.md` | Captions, hooks, structures, delivery, pacing |
| `Native Screenshot Ad Criteria.md` | Tweet, Reddit, FB Group, IG Story format rules |
| `Long-Form Primary Text Criteria.md` | 10-beat story template for native image ads |
| `Creative Image Ad Criteria.md` | Headlines, feature pills, CTA, designer notes |
| `Headline & Text Hook Criteria.md` | 18 core types, registers, frameworks — applies to static headlines AND video text hooks |
| `Format Master Base.md` | Canonical registry of all ad formats/structures — video and static. Canonical names, sub-variants, per-structure rules, cross-brand adoption |

Brand-specific overrides (guardrails, claims, ingredients, pricing) live in each brand's Working Document.

**Compliance docs, when present, are mandatory reading.** Some brands have a `Compliance` doc in `00 Context/` — if one exists, it must be read before writing any creative for that brand. Compliance rules override all other criteria. Not every brand has one, and that's fine — proceed normally without it.

### Creative References Database (deprecated)

The cross-brand reference library lived in Notion, which is **no longer wired into Hermes**. If reference logging is still wanted, the strategist manages it manually in Notion — Hermes does not auto-populate or read it.

---

## How a Batch Gets Produced

1. **Strategist says "start a new batch"** → Hermes creates Working Document + Scripts + Batch Critique files (via the `batch-planner` skill)
2. **Hermes runs the Motion data pull** — in parallel: `motion-pp-cli pull` (metrics + media download), `angles` (angle spend breakdown), `formats` (format trends). For non-Motion URLs (YouTube, TikTok, competitive refs), use `grab-media`.
3. **Hermes runs Gemini analysis** on each downloaded video (4-column table + edit-style breakdown: edit pace, b-roll types, color treatment, caption style, transition types). **Only analyzes files actually downloaded — never fabricates analysis for failed downloads.**
4. **Top Spenders Analysis** gets completed in `02 Ads Analysis/` — three-lens analysis (what's getting spent, what's converting, what keeps viewers watching), per-ad visual breakdowns, pattern extraction.
5. **Strategist drops batch strategy notes** in the Working Document
6. **Batch Plan** is built using: top spenders patterns, angle spend data, format trend data, and strategy notes
7. **Concept Validation** runs on the plan — 7-test quality bar + differentiation rule
8. **Plan Critique** checks the plan against data — blocking gate before writer dispatch
9. **Model script** is written and iterated with the creative director
10. **Remaining scripts** produced in parallel by agents (3 per script-writer), using global Criteria + brand overrides + process log. Each writer runs a 19-point checklist (concrete pass/fail with evidence) + viewer read (3 read-throughs per script for narrative logic) before returning.
11. **Orchestrator QA** runs category sweeps across the batch, fix-passes back to writers
12. **Main session writes the Batch Critique** — runs `motion-pp-cli highlights` automatically, applies the compounding rule
13. **Briefs/scripts loaded to ClickUp** when told → designers/editors execute
14. **Footage requests created in ClickUp** for scripts needing creator filming
15. **Media files deleted** after analysis — Motion share links serve as permanent reference

---

## What's NOT Built Yet (Future Ideas)

### ~~Auto-generation of static ad images via API~~ → BUILT

**Now live as the Statics Generator.** See `00 Global/Statics Generator/Overview.md`.

### ~~Standardized research-to-context process~~ → BUILT

**Now live as the Brand Research Pipeline.** See `00 Global/Process/Brand Research.md`. Invoked via `/research-brand`. Covers Phases 0–7 with auto-gates, persona discovery, spec card generation, and refresh modes.

### ~~Motion creative reference links~~ → BUILT

**Now handled by `motion-pp-cli`.** The CLI constructs Motion share links from the creative asset ID, organization ID, and workspace ID in every pull. These share links are the canonical reference format for scripts, briefs, and analysis docs. CDN URLs are for download/analysis only.

### Automated ad performance tracking (partially built)

`motion-pp-cli delta`, `stale`, and `history` subcommands handle longitudinal tracking and creative lifecycle detection. What's NOT built:
- Scheduled automatic pulls (daily/weekly)
- Automatic fatigue flagging (high frequency + declining CTR)
- Push notifications when top spenders change

### Cross-brand pattern mining

Automatically scan all brands' ads analysis docs and surface:
- Which structures work across multiple brands
- Which hook types have the best CTR patterns
- Which proof formats correlate with higher ROAS

**Partially addressed by the [[Format Master Base]]** — a manual registry of formats with cross-brand adoption history. Automated mining is not built.

### Google Sheets ad creative tracker

Each brand has a Google Sheets tracker for ad creatives. **Batch loads follow a fixed standard: colored separator row per batch (e.g. "T001 Batch") with numbered rows below (01, 02, 03...) in creation order — independent of status.** Full structure, sheet IDs, columns, and status vocabulary in [[Sheets Integration]].

### Footage & asset library

Catalogue all existing A-roll and B-roll across Google Drives and storage locations. Searchable index so editors can be pointed to the correct folders.

---

## Strategic Frameworks

Two frameworks guide creative strategy. Full detail in [[Creative Strategy Matrix]]. Portfolio-level balance checks in [[Creative Diversity Audit]].

### 5 Awareness Stages (Funnel Position)

| Stage | Viewer state | Ad goal | CTA energy |
|---|---|---|---|
| **Unaware** | Don't know they have a problem | Make them aware the problem exists | Education. "Learn more." |
| **Problem-Aware** | Know the problem, don't know solutions exist | Agitate the pain, validate their experience | Empathy. "See how it works." |
| **Solution-Aware** | Know solutions exist, exploring options | Position your solution, show differentiation | Comparison. "See the difference." |
| **Product-Aware** | Know your product, considering vs alternatives | Overcome objections, prove superiority | Direct. "Try [product]." |
| **Most-Aware** | Ready to purchase, need final push | Close the sale | Confident. "Start today." |

**Critical rule:** Each ad serves ONE stage. Blending stages makes the ad unfocusable.

### Three Selves (Self-Discrepancy Theory)

| Self | Language pattern | When to use |
|---|---|---|
| **Ought** | Imperative. Obligation. "You should." "Stop doing X." | When they need a nudge to act on something they already believe. |
| **Actual** | Reflective. Validation. "You're not wrong." "This is happening." | When they need recognition before they can act. |
| **Ideal** | Aspirational. Identity. "The person who..." "Your best..." | When they want to see the version of themselves the product creates. |

**The ratio is deliberate.** Too much Ought with a buyer who needs validation = tone-deaf. Too much Ideal with a buyer in crisis = dismissive. The mix is a strategic decision per persona.

---

## Research Pipeline

### Two types of customer language

| Source | What you get | When you use it |
|---|---|---|
| **Reviews** (brand + competitor) | **Result language.** What improved, how much, emotional relief. | Evaluation-stage ads. Testimonial-style creative. Headlines that show the outcome. |
| **Reddit / Forums** | **Problem language.** How people describe suffering, the vocabulary of desperation, specific triggers. | Trigger-stage ads. Problem-awareness creative. Headlines that name what the buyer is going through. |

Always scrape competitor reviews too. Build a cross-brand pain point frequency table to see which pain points are universal vs. unique.

### Research Engine

Custom Python pipeline that scrapes Reddit, extracts evidence, discovers themes, scores brand fit, and mines language patterns.

- **Input:** Brand brief + research direction
- **Output:** `insights_final.csv` (20-40 insights with evidence counts, VoC quotes, persona assignments) + `language_report.json` (how the audience actually talks)
- **Run time:** 7-25 minutes per sprint
- **Usage:** Multiple sprints per brand, each targeting a different research direction
- **MCP tools:** `mcp__research-engine__run_research_sprint`, `mcp__research-engine__list_brands`, `mcp__research-engine__list_sprints`

---

## Setup

See `00 Global/Process/Setup.md` for complete installation instructions (replaces the legacy `CLAUDE.md → "First-Time Setup"` section that was deleted during the 2026-06-09 Hermes port). Covers all OS platforms (macOS, Windows, Linux).
