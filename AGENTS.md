# Reach Digital Creative Strategy Vault

This is the Obsidian vault where all creative strategy work happens for Reach Digital's DTC brand clients. Everything lives in markdown. Codex is an active collaborator — analyzing ads, writing scripts, running research, and producing creative briefs.

> **Maintenance note:** This file is the skeleton loaded every session. Feature-specific setup, integrations, templates, and detailed workflows belong in `00 Global/Process/*.md`, not here. Keep this file under 250 lines.

---

## First-Time Setup

**When to read `00 Global/Process/Setup.md`:**
- A slash command fails with "not installed" / "command not found" (e.g., `yt-dlp`, `agent-browser`, `ffmpeg`)
- User asks about setup, installing tools, or onboarding a new machine
- User mentions this is a new computer / new strategist / first time using the vault

Setup.md covers OS-specific dependency installs, one-time Motion login, Gemini API key, and Notion/ClickUp OAuth. Do not proactively check tool installation on every session — let command failures trigger it.

---

## Vault Structure

```
Reach Digital/
├── 00 Global/                    <- Cross-brand resources
│   ├── Criteria/                 <- Per-format rules that apply across all brands
│   │   ├── Universal Copy Rules.md          <- Foundation for everything
│   │   ├── Headline & Text Hook Criteria.md <- 18 core types, registers, frameworks (static headlines + video text hooks)
│   │   ├── Video Script Criteria.md         <- Captions, hooks, structures, delivery
│   │   ├── Native Screenshot Ad Criteria.md <- Tweet, Reddit, FB Group, IG Story
│   │   ├── Long-Form Primary Text Criteria.md <- 10-beat story template
│   │   └── Creative Image Ad Criteria.md    <- Headlines, pills, CTA, design
│   ├── Process/                  <- How-to docs, workflows, system overview
│   ├── Statics Generator/        <- AI image generation system (NB2 + GPT Image 2 dual-model, templates, scoring agents, spec card prompts)
│   ├── Skills/                   <- Refinement logs for AI skills
│   └── Workplace/                <- Internal thoughts and notes
│
├── [Brand Name]/                 <- One folder per brand client
│   ├── 00 Context/              <- Brand, product, persona, reviews, compliance
│   ├── 01 App Lovin/            <- Platform-specific work (if applicable)
│   ├── 02 Ads Analysis/         <- Top spender breakdowns, performance analysis
│   ├── T001 Working Document.md <- Batch plan + brand-specific criteria + process log
│   ├── T001 Scripts.md          <- All scripts for that batch
│   ├── T001 Batch Critique.md   <- Critique of the batch
│   ├── 00 Test Log.md           <- Master tracker across batches
│   └── ...future batches (T002, T003, etc.)
```

**To see active brands:** List the top-level folders in this vault. Each folder (except `00 Global`) is a brand. Check each brand's folder contents to understand its current state — if it has T-batch files, it's in production; if only `00 Context/`, it's in research.

---

## How Work Happens

The system, tools, strategic frameworks, research pipeline, and future roadmap are documented in:
- `00 Global/Process/System Overview.md` — The single reference for how everything works

**The short version:**

1. **Research** — Scrape reviews (brand + competitors), run Research Engine sprints, mine VoC language
2. **Context docs** — Brand Context, Product Context, Persona Context, Compliance/Guardrails
3. **Ads analysis** — Break down top spenders from the ad account (hooks, structures, visual styles, persuasion techniques, caption styles, proof formats)
4. **Batch planning** — Map concepts to personas, assign structures and visual direction based on what's winning
5. **Script writing** — Model script first (iterated with creative director), then agents produce the rest in parallel
6. **Review and fix** — Quality checklist, pacing verification, critique
7. **Delegation** — Scripts formatted for editors, footage requests for creators

### Key principles
- Everything traces back to customer language (VoC from reviews and Reddit)
- Two frameworks guide creative strategy: the Creative Strategy Matrix (pain × persona × awareness stages) and Three Selves
- Ads analysis drives creative decisions — we replicate what's actually spending, not assumptions
- Each batch compounds: criteria and process logs carry forward

---

## Notion Integration

**Triggers:** anything involving Notion pages, the Creative References Database, logging a reference, searching for prior references, or modifying an existing Notion page. Also triggers on words like "reference," "log this," "add to Notion," "search Notion."

**When triggered, read `00 Global/Process/Notion Integration.md`** — it contains the key page IDs, References Database schema, page content conventions, image-safety rules, and MCP tool usage.

**Hard rule regardless of the detail doc:** Never create or modify Notion pages unless the user explicitly asks.

---

## Slash Commands — Use These, Don't Reinvent Them

This vault has custom slash commands sourced from `.claude/commands/` and migrated for Codex as skills under `.agents/skills/source-command-*` (project-level, shared with the repo). When the user's request matches one of these, **invoke the matching Codex skill** instead of trying to do it manually. The commands contain the exact tools, paths, and logic needed.

**Important:**
- Always use project-relative paths (`node .claude/tools/grab/grab.js`) — never hardcoded paths like `/opt/homebrew/bin/node` or `~/.claude/tools/`.
- If global commands exist at `~/.claude/commands/` that conflict with these, the global ones may be outdated. The canonical source versions are in this project's `.claude/` directory; the Codex-facing wrappers are in `.agents/skills/source-command-*`.
- **Before first use of Gemini tools**, check that `.claude/tools/gemini-api/.env` exists and `node_modules/` is installed. If not, run: `cp ~/.claude/tools/gemini-api/.env .claude/tools/gemini-api/.env` (if migrating from global) or ask the user for their key, then `cd .claude/tools/gemini-api && npm install && cd ../../..`. This is a one-time setup per machine.

### `/transcribe` — Video & Audio Transcription

**Invoke this command when the user says anything like:**
- "transcribe this" / "transcribe this video" / "transcribe this audio"
- "get me the transcript" / "pull the transcript"
- "what does this video say" / "what are they saying in this"
- "convert this to text" / "speech to text"
- "transcribe these videos" / "transcribe this folder"
- "I need the voiceover from this ad"
- "get the script from this video"
- Any request involving extracting spoken words or visual breakdowns from a media file

**What it does:** Routes between MLX (local, free, speech-only) and Gemini (API, visual + audio breakdown) based on context. Handles single files and batch folders.

### `/ad-library` — Meta Ad Library Pull & Analysis

**Invoke this command when the user says anything like:**
- "pull their ad library" / "scrape their ads" / "get their ads"
- "run an ad library pull on [brand]"
- "I need to see what [brand] is running"
- "pull ads for these brands" (batch mode)
- "do a competitive ad audit"
- Any request involving Meta/Facebook Ad Library URLs or competitive ad scraping

**What it does:** Scrapes Meta Ad Library via Apify, downloads media, optionally runs Gemini analysis. Supports batch mode for 10-20 brands at once.

### `/research-brand` — Brand Research Pipeline (Phases 0–7)

Full trigger list + hard rules live in the **Researching a New Brand** section below; the command just dispatches the `brand-researcher` sub-agent which owns Phases 0–7 per `00 Global/Process/Brand Research.md`. Supports first-time runs and `--refresh=ads|reviews|competitors|product|brand|full`.

### `/grab` — Download Ad Media from URLs

**Invoke this command when the user does anything like:**
- Pastes URLs from YouTube, TikTok, Motion, or direct media links alongside raw notes or analysis intent
- "analyze this ad [url]" / "break down this creative [url]" / "what's this ad doing [url]"
- "here are the top spenders [urls + notes]" / "analyze these top spenders"
- "download this [url]" / "grab this [url]" / "pull the media from this [url]"
- Pastes a Motion authenticated report URL (`/top/` page) with a CSV table of ads
- Any message containing social media URLs + intent to analyze, download, or discuss the creative

**Critical rules:**
- If the user pastes URLs with analysis intent, chain directly into Gemini analysis — never ask them to download manually. Video analysis = 4-column table (`| Timestamp | Visual Action | Voiceover | On-Screen Captions |`).
- **NEVER fabricate or invent analysis for ads you couldn't download.** If a download fails, say it failed. Only analyze what you actually have on disk. Do not write descriptions, breakdowns, or visual analyses based on the ad name alone — you must have the actual media file. Making up analysis is worse than skipping an ad.
- Always delete media after analysis is saved (`rm -rf .claude/tools/grab/downloads/session-*`).

### `/creative-image` — Creative Hero Image Pre-Pass

**Invoke only when the strategist explicitly asks for creative image static ads, metaphorical hero-image ideas, personified visuals, or a batch of creative statics.**

**What it does:** Deepens the angle, produces a diverse visual concept board, pauses for strategist selection, generates text-free hero-image variants through the existing fal.ai wrapper, and hands the approved hero to `/generate-static` for final layout and composition. It is additive — never auto-route ordinary static generation into this workflow.

**Meaning:** When the strategist says "creative static ads," "creative images," or "creative image ads," interpret that as this opt-in hero-first workflow unless they explicitly say they mean ordinary designed statics.

### General rule

If the user's request maps to a slash command, **use the Skill tool to invoke it**. Don't manually cobble together the same steps — the command handles routing, paths, and edge cases.

---

## Researching a New Brand

**Triggers:** "research [Brand]", "onboard [Brand]", "run the research pipeline", "run Phases 0–7", "refresh [Brand]'s ads/reviews/product/brand/competitors", "the personas are stale," "we need updated Persona Summary," or anything about producing or refreshing `00 Context/` research docs (Brand Context, Product Context, Persona Context, Persona Summary) and `00 Research/` docs (Review Analysis, Positioning Ammo, Persona Deep Research).

**When triggered, read `00 Global/Process/Brand Research.md`** — the canonical end-to-end spec. Covers folder structure (two-folder `00 Context/` + `00 Research/` split), Phase 0 intake rules, Phase 1 raw data collection (three parallel tracks), Auto-Gate A (coverage), Phase 2 first-pass synthesis + six-step persona discovery, Auto-Gate B (persona lock), Phase 2.5 competitor review scraping, Phase 3 classification against locked personas, Phase 4 deep synthesis (seven tracks), Phase 5 spec card generation (Brand Spec Card + Visual Style Card PNGs), Phase 6 automated QA checklist, Checkpoint 3 strategist review, Phase 7 cleanup, refresh cadence (§15), tool inventory (§16), and the `/research-brand` UX (§17) including all `--refresh=*` modes.

**Hard rules regardless of the detail doc:**
- Always invoke via `/research-brand` — never cobble the pipeline together manually. The slash command dispatches the `brand-researcher` sub-agent which owns phase orchestration, auto-gates, and the 2-iteration loop budget.
- **Personas are named by pain/trigger, never by demographics.** Demographic names auto-fail Auto-Gate B. See §7.1.
- **Direct competitors must pass §4.2's three-test gate** (same pain/job, price tier within ±50%, ≥3 switch-mentions post-persona-lock). Form factor is explicitly not a disqualifier.
- **Every objection, angle, and journey-map stage must trace to a verbatim review quote with `review_id`.** No invention. §10.2, §10.3, §10.7.
- **Ad classification is text-only** (primary text + headline + description + on-image text + caption). No vision, no transcription. §9, §17.3.
- **Compliance/guardrails files in `00 Context/` are client-supplied and never touched by the pipeline.** Detected by filename regex `(?i)(compliance|guardrails|claims)`. §17.1.
- **First-time run refuses if `00 Context/` already contains generated docs** (Brand, Product, Persona Context, or Persona Summary). Use `--refresh=*` instead. §17.1.
- **Numbers have one source of truth** — `_data/persona-dictionary.json` + classified `reviews.jsonl` + `_data/ad-classifications.json`. Persona Summary, Review Analysis, and Persona Context all render from these. No manual re-typing anywhere. §7.3.

---

## Starting a New Batch

**Triggers:** "start a new batch for [Brand]", "let's do T002", "let's do T002 for IM8", "set up the batch docs", "create the working document", "new batch", "next batch", or anything about beginning a new batch of ads/scripts.

**When triggered, read `00 Global/Process/Batch Template.md`** — it contains the three-file template (Working Document, Scripts, Batch Critique), the Concept Validation gate (7-test quality bar + batch-level differentiation rule + conflict resolution hierarchy), the carry-forward rules for subsequent batches, and the full 12-step batch flow from top spenders analysis through script critique.

---

## Writing Briefs

**Triggers:** writing, editing, or reviewing any static image ad brief for any brand — "write the briefs", "draft T00X briefs", "refine this brief", editing the References / Image Direction / Design Elements / Designer Note / Diagram Example sections of a brief file, or creating any new `T[###] Briefs.md` or `T[###] Creatives.md`.

**When triggered, read `00 Global/Process/Brief Structure.md` (Creative Structure)** — the unified structure doc covering both briefs and scripts. Contains the three-section model (Notes → Brief → Media Buying), section order, References format (category headings + sub-bullets), Image Direction rules (image-only, no supporting copy), Design Elements (new section for on-canvas elements), Designer Note rules (optional), Mandatory Disclaimer placement (always last in Brief), Diagram Example spec, Pre-Content Block Economy, and commit-to-one-option rule. Applies to every brand.

**Hard rules regardless of the detail doc:**
- **Three sections: Notes → Brief → Media Buying.** Notes = References, Image Direction, Designer Note. Brief = Headline Variations (first), Design Elements, VoC Quote Block, Diagram Example, Mandatory Disclaimer (last). Media Buying = Primary Text.
- References use category headings (`**Layout**`, `**Material**`, `**Image**`) with parent bullets + sub-bullets describing takeaways. No spend data, ROAS, or strategy notes.
- Image Direction contains only the image to generate + compliance. **No supporting copy, CTAs, payment logos** — those go in Design Elements.
- Never specify background color in Image Direction. Designers own background.
- Table/chart/grid format briefs get a minimal Diagram Example (headline + chart + logos + subheading + CTA only — no background notes, emoji, logo placeholders, or disclaimer annotations).
- **Pre-content blocks are tight.** Designer Note is optional — omit when it would only restate Image Direction or say generic "use your judgment on layout." Preserve bullet/sub-bullet hierarchy. No blank line between a `### Heading` and its first bullet. Cut vague filler and References sub-bullets that merely restate the parent link's name. Full convention in Creative Structure → Pre-Content Block Economy.
- **Every edit follows the criteria — casual fixes included.** Any edit to a brief file must still pass Universal Copy Rules, Creative Image Ad Criteria, Headline & Text Hook Criteria, Creative Structure, and brand compliance. No "the change was too small to re-check" exceptions.
- **Routing — when to use the `brief-writer` sub-agent vs edit directly.** Full drafts and multi-finding fix passes → `brief-writer` sub-agent (2-3 briefs per sub-agent, grouped by format or topic, parallel, with scoring loop). Single-brief targeted edits → edit directly in the main session.
- **3-tier QA workflow applies to batch production.** Writer sub-agents write + score each brief, cross-check within group, then return. Orchestrator runs 3 cross-brief checks. Main session writes the Batch Critique. See `00 Global/Process/Critique Methodology - Static.md`.

---

## Writing or Refining Scripts

**Triggers:** writing, editing, refining, or fixing any video script for any brand — "write the scripts", "draft T00X scripts", "fix the scripts", "apply the critique", "refine this script", editing the Visual Direction / References / Hook / Body / Close sections of any `T[###] Scripts.md` or `T[###] Creatives.md`, or creating any new scripts file.

**When triggered, read `00 Global/Process/Brief Structure.md` (Creative Structure), `00 Global/Criteria/Video Script Criteria.md`, AND `00 Global/Criteria/Universal Copy Rules.md`** — Creative Structure defines the three-section model (Notes → Brief → Media Buying), section order, References format, and Pre-Content Block Economy shared with briefs. Video Script Criteria contains caption format rules, Visual Direction conventions, Footage-vs-References source-link rule, hook variation rules, close types, per-structure rules, redundancy checks, and the quality checklist. Universal Copy Rules covers banned constructions, pacing, specificity, and cross-batch differentiation.

**Hard rules regardless of the detail doc:**
- **Three sections: Notes → Brief → Media Buying.** Notes = Visual Direction, References, Editor Notes (optional), Footage. Brief = Hook/Body/Close tables, Mandatory Disclaimer (last). Media Buying = Primary Text (if applicable). Footage Requests consolidated at document bottom.
- Multi-card captions separate with `<br><br>`, never with " - " dash. Use `❌` for failed alternatives, `✅` for working ones.
- Visual Direction has no `Tone:` filler bullet — tone is implicit in caption style + edit pace + visual choices. Sub-bullet `Edit pace`, `Color`, and similar descriptors when they need detail.
- References use category headings (`**Format**`, `**Visual Treatment**`, `**Top Spender**`) with parent-link bullets and sub-bullets describing what the editor takes from each. No strategy/copy guidance, no spend data.
- **Source links go in Footage, not References.** Any specific asset called out in the Visual column must have its source URL in the Footage section. Never fabricate a URL — surface to strategist if a cited study cannot be located.
- Captions never repeat VO verbatim. Two channels, two messages.
- Redundancy audit passes all four forms per Video Script Criteria's Redundancy section.
- **Pre-content blocks are tight.** Editor Notes is optional. No blank line between headings and content. Cut filler. Full convention in Creative Structure → Pre-Content Block Economy.
- **Every edit follows the criteria — casual fixes included.** No "the change was too small to re-check" exceptions.
- **Routing — when to use the `script-writer` sub-agent vs edit directly.** Full drafts and multi-finding fix passes → `script-writer` sub-agent (3 scripts per sub-agent, grouped by structure or persona, parallel). Single-script targeted edits → edit directly in the main session.
- **3-tier QA workflow applies to batch production.** Writer sub-agents run a 19-point concrete checklist (binary pass/fail with evidence per check) + viewer read (3 read-throughs per script, one per hook variation, answering 4 narrative-logic questions) + within-group cross-check before return. Quality reference rubrics at `00 Global/Video Script Scoring/`. Orchestrator validates evidence reports + runs cross-script sweeps + brand compliance sweep. Main session writes the Batch Critique. See `00 Global/Process/Critique Methodology - Video.md`.

---

## Critiquing a Batch

**Triggers:** "critique this batch", "review the scripts", "audit T00X", "what's wrong with these briefs", "QA this batch", "run the critique", or anything about reviewing finished scripts/briefs against criteria — including writing or updating any `T[###] Batch Critique.md` file.

**When triggered, read the relevant methodology doc:**
- Video script batches → `00 Global/Process/Critique Methodology - Video.md`
- Static ad / brief batches → `00 Global/Process/Critique Methodology - Static.md`

Each doc contains the 3-tier QA workflow (writer sub-agent → orchestrator → main session), severity tiers (❌ blocking / ⚠️ flag / ✅ pass / 🟦 intentional), pre-production plan critique, per-structure or per-format checklists, per-platform overlays, cross-batch checks, the compounding rule for promoting recurring patterns to global criteria, and the canonical Batch Critique output format.

**Hard rules regardless of the detail doc:**
- Critique findings group by category (Caption-VO, Pacing, References, Compliance, etc.), NOT by script/brief number. Strategist needs to scan patterns, not jump between scripts.
- Use the standard table format: `Severity | Finding | Affected | Linked Rule | Status`.
- A finding that recurred in 3+ items in this batch OR 2+ consecutive batches must be proposed for promotion to global criteria in the "Promote to Global Criteria" section. This is what stops the same audit from being needed next batch.
- Never invent findings or fabricate severity. If a script wasn't read end-to-end, say so.

---

## Statics Generator (AI Image Generation)

**Triggers:** "generate a static," "generate this brief," "create ad images," "run the generation pipeline," "convert this brief to NB2," "generate spec cards for [Brand]," "swipe this ad," "multiply this format," "animate this static," "create a new template," "add a format template," "creative image static ads," "metaphorical hero image," anything involving NanoBanana 2, GPT Image 2, fal.ai, format templates, or AI image generation for ads.

**When triggered, read `00 Global/Statics Generator/Overview.md`** — it contains the dual-model architecture (NB2 + GPT Image 2), model selection matrix, batch flow, generation pipeline, optional creative-hero pre-pass, format template system, scoring agent integration, fal.ai API usage, spec card generation, ad-swipe system, animation pipeline, and format multiplication.

**Hard rules:**
- Generation pipeline and batch flow are separate workflows. Briefs are written via the batch flow; images are generated on demand via `/generate-static`.
- **Creative hero generation is opt-in.** Run `/creative-image` only when the strategist explicitly requests creative image statics or hero-image ideation. It generates and approves the standalone hero first, then hands the approved image to `/generate-static` as a final-composition reference. Any existing template can be used afterward, including infographic and educational layouts.
- **Model selection is automatic.** The system scans the brief for content signals (human subjects, handwriting, platform UI, surfaces, etc.) and picks NB2 or GPT Image 2. Never ask the strategist to choose a model. See Overview.md → Model Selection for the full decision matrix.
- Format templates contain rendering specs for both models (NB2 prompt + GPT prompt). Some templates are GPT-only (UGC TikTok, Handwriting). Brief quality rules stay in `00 Global/Criteria/`.
- Scoring agents read our criteria docs as rubrics — never duplicate rules into rubric files. Scoring rubric files in `00 Global/Statics Generator/Scoring Agents/` are the canonical source. The scoring-evaluator sub-agent reads them each run.
- Spec cards are generated once per brand. Check `[Brand]/00 Context/` for existing spec cards before regenerating.
- **All generated images and videos save directly to `[Brand]/00 Assets/Statics/` or `[Brand]/00 Assets/Animations/`** — never to `/tmp`. Use the vault path as the `--output` target. After generation, add every output to the batch canvas at `[Brand]/T00N Images.canvas` (e.g., `T002 Images.canvas`). One canvas per batch. On the first generation pass for a batch, create the canvas automatically — don't ask.

---

## ClickUp Integration

**Triggers:** "load to ClickUp", "push to ClickUp", "push the scripts to ClickUp", "push the briefs to ClickUp", "create footage request", "create a brief task", "create a script task", creating any ClickUp task, or assigning work to the designer (Diksha) / creator (Karra). Also on every new session the strategist must be detected.

**When triggered, read `00 Global/Process/ClickUp Integration.md`** — it contains the strategist detection flow, team roster with ClickUp IDs, the Brand → Creative Briefs list table, the fallback rule for resolving the list when a brand isn't in the table, unified brief-and-script loading rules (task name = slug, description = slug-to-Close content), footage request format, and the "waiting on footage" comment pattern.

**Hard rules regardless of the detail doc:**
- Never load briefs, scripts, or create footage requests unless explicitly told to.
- Static briefs and video scripts both load into the brand's **single Creative Briefs list**. There is never a separate Scripts list. Same list, same assignees, same "don't touch unless told" rule. Only the `Task type` custom field and status string differ.
- **Task name = the file slug** (the `Reach Digital_[Brand]_[Concept]_[##]_[T###]` line in the source doc, e.g., `Reach Digital_IM8_GLP1 Muscle Loss Explainer_13_T002`). **Task description = everything after the slug through the Close / final designer-facing section — exclude anything after** (Hook-to-Body Transition Verification and similar QA/internal blocks are excluded).
- Always assign the current strategist (from `.claude/strategist.json`) + Diksha Sharma for every task type (briefs, scripts, anything else), with one exception: footage requests assign the strategist + Karra Worang.
- Resolving a brand's list: check the Brand → Creative Briefs list table first. If the brand isn't there, match the vault brand folder to the ClickUp space; if multiple candidate Creative Briefs lists exist, pick the **most populated and most recently active** one — that's the live list, the others are dead duplicates. Don't ask — resolve it, then add the brand to the table so the next run doesn't re-solve it.

---

## Working With This Vault

- **File naming:** Date-first when relevant. `YYYY-MM-DD [Type] [Batch] - [Brand].md`
- **Brand folders are self-contained.** Each brand has its own 00 Context/ with everything needed to produce creative.
- **Compliance docs are mandatory reading.** If a brand's `00 Context/` contains a file matching `Compliance`, `Guardrails`, or `Claims` in the name (e.g., `Compliance - Marketing Rules.md`, `Guardrails & Claims - IM8.md`), it MUST be read before writing any brief, script, or ad copy for that brand. These rules override every other criteria doc — non-compliance is an automatic fail. Always check for compliance/guardrails docs at the start of any creative work for a brand.
- **Process docs are in 00 Global/Process/.** These are the canonical how-to guides.
- **Ads analysis is the main creative intelligence source.** Top spender breakdowns in `02 Ads Analysis/` identify what's working in ad accounts — this is what drives script structures, hook styles, and creative direction.
- **T-batches build on each other.** T001 tests hypotheses, T002 refines based on data, T003 expands formats. The Working Document carries criteria and process logs forward.

---

## Collaboration Principles

These apply to every task in this vault — writing, editing, analyzing, briefing. They override default LLM instincts toward overproduction, silent interpretation, and drive-by "improvements."

- **Strategists work fast.** They provide raw voice-note-style notes and expect Codex to fill gaps — run Gemini analysis on media, cross-reference patterns from prior brands, surface things they didn't mention. Don't just reformat their notes. Add value.
- **Surface your interpretation before committing.** When strategist notes are ambiguous ("make it more like that IM8 one," "tighten this," "you know what I mean"), name the read you're about to act on — or present the two or three readings if real ambiguity exists. Filling gaps is expected; hiding which gap you filled is what burns a revision cycle.
- **Edit surgically.** When revising an existing brief, script, working document, context doc, or Notion page, only change what was asked. Don't rephrase adjacent bullets, don't "improve" other sections, don't reformat references, don't restructure paragraphs you weren't told to touch. Every changed line should trace directly to the request. If you spot something else worth fixing, call it out separately — don't silently bundle it into the same edit.
- **No speculative additions.** Don't add sections, bullets, scripts, variants, headlines, or content that wasn't requested. A brief revision doesn't need a new Designer Note. A script fix doesn't need extra hook variants. A working document tweak doesn't need fresh strategic analysis. If you think something's missing, ask first — don't just add it.
- **Match what exists.** When extending a file (new brief in an existing brief doc, new script in an existing scripts doc, new row in an existing table), match the section order, heading depth, bullet style, and formatting conventions already in that file. Don't silently "upgrade" the format. If the existing format is wrong per `00 Global/Process/*.md`, flag it — don't unilaterally rewrite.
- **Plan before producing at scale.** For multi-item work (a full batch of briefs, multiple scripts, bulk analysis), state the plan first — what you'll produce, in what order, using what sources — and wait for a go. Producing 8 briefs off a misread is 8× the revision cost of producing 1.
- **Save workflow rules to the system, not memory.** When strategist feedback is a workflow, process, format, or criteria rule that applies across sessions, migrate it to the right file (`AGENTS.md`, `00 Global/Process/*.md`, `00 Global/Criteria/*.md`) instead of — or in addition to — saving a memory. Memory is for user facts, active project context, external system IDs, and personal preferences (e.g., voice-dictation handling) — not rules the whole system should always know. If you notice an existing memory that duplicates a system rule, propose deleting the memory. Memory doesn't always load; AGENTS.md and triggered process docs do.
