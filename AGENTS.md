# Reach Digital Creative Strategy Vault

This is the Obsidian vault where all creative strategy work happens for Reach Digital's DTC brand clients. Everything lives in markdown. Hermes is the active AI collaborator — analyzing ads, writing scripts, running research, and producing creative briefs via its skill system and delegated writers.

> **Maintenance note:** This file is the project skeleton Hermes auto-loads each session (as the cwd `AGENTS.md`). Hermes truncates any context file over ~20,000 chars, so keep this file lean — triggers + pointers, not full specs. Feature-specific setup, integrations, templates, and detailed workflows belong in `00 Global/Process/*.md`. Your operating **voice and collaboration principles live in `SOUL.md`** in the Hermes profile (loaded fresh every message, always-on) — not here.

---

## First-Time Setup

**Read `00 Global/Process/Setup.md` when:** a command fails with "not installed" / "command not found" (`yt-dlp`, `agent-browser`, `ffmpeg`); the user asks about setup/installing tools/onboarding; or this is a new machine / new strategist. It covers OS-specific dependency installs, one-time Motion login, the Gemini API key, and ClickUp OAuth. Don't proactively check tool installation every session — let command failures trigger it.

---

## Vault Structure

```
Reach Digital/
├── 00 Global/                    <- Cross-brand resources
│   ├── Criteria/                 <- Per-format rules across all brands
│   │   ├── Universal Copy Rules.md          <- Foundation for everything
│   │   ├── Headline & Text Hook Criteria.md <- 18 core types (static headlines + video text hooks)
│   │   ├── Video Script Criteria.md         <- Captions, hooks, structures, delivery
│   │   ├── Native Screenshot Ad Criteria.md <- Tweet, Reddit, FB Group, IG Story
│   │   ├── Long-Form Primary Text Criteria.md <- 10-beat story template
│   │   └── Creative Image Ad Criteria.md    <- Headlines, pills, CTA, design
│   ├── Process/                  <- How-to docs, workflows, system overview
│   ├── Statics Generator/        <- AI image generation (NB2 + GPT Image 2, templates, scoring)
│   ├── Hermes/                   <- Commands/ (canonical command docs), tools/ (Node/Python tools), Scripts/, strategist.json
│   ├── Skills/                   <- Refinement logs for AI skills
│   └── Workplace/                <- Internal thoughts and notes
│
├── [Brand Name]/                 <- One folder per brand client
│   ├── 00 Context/              <- Brand, product, persona, reviews, compliance
│   ├── 02 Ads Analysis/         <- Top spender breakdowns, performance analysis
│   ├── T001 Working Document.md <- Batch plan + brand-specific criteria + process log
│   ├── T001 Scripts.md          <- All scripts for that batch
│   ├── T001 Batch Critique.md   <- Critique of the batch
│   ├── 00 Test Log.md           <- Master tracker across batches
│   └── ...future batches (T002, T003, etc.)
```

**To see active brands:** list the top-level folders (each except `00 Global` is a brand). A folder with T-batch files is in production; one with only `00 Context/` is in research.

---

## How Work Happens

The full system, frameworks, research pipeline, and roadmap live in `00 Global/Process/System Overview.md`.

**Short version:** (1) Research — scrape reviews (brand + competitors), run Research Engine sprints, mine VoC. (2) Context docs — Brand/Product/Persona Context, Compliance. (3) Ads analysis — break down top spenders (hooks, structures, visual styles, persuasion, captions, proof). (4) Batch planning — map concepts to personas, assign structures/visual direction from what's winning. (5) Script writing — model script first (with the creative director), then writers produce the rest in parallel. (6) Review & fix — quality checklist, pacing, critique. (7) Delegation — scripts formatted for editors, footage requests for creators.

**Key principles:** everything traces to customer language (VoC from reviews/Reddit); two frameworks guide strategy (Creative Strategy Matrix = pain × persona × awareness, and Three Selves); ads analysis drives creative (replicate what's actually spending); each batch compounds — **criteria carry forward; the Process Log starts fresh each batch.**

---

## Slash Commands — Use These, Don't Reinvent Them

Custom commands are documented canonically in `00 Global/Hermes/Commands/` and are exposed to Hermes as **skills** under your profile (`skills/reach-digital/`). When a request matches one, **invoke the matching skill via the skills tool** instead of cobbling the steps manually — the command owns the exact tools, paths, and edge cases.

**Tool paths:** always project-relative and **lowercase** — `node "00 Global/Hermes/tools/grab/grab.js"`. Never hardcode `/opt/homebrew/bin/node` or a `~/`-prefixed vault path, and never use a capital `Tools/` (the on-disk dir is lowercase `tools/`; capital breaks on Linux). Before first use of the Gemini tools on a new machine, ensure `00 Global/Hermes/tools/gemini-api/.env` exists (copy from `.env.example` and add the key) and `node_modules/` is installed (`cd "00 Global/Hermes/tools/gemini-api" && npm install`).

Commands and their triggers:
- **`/script-writer` / `script-writer` skill** — "write scripts / draft scripts / fix scripts / dispatch writers / hooks / VO / captions." Primary video pipeline: Gemini writes copy, Hermes validates, patches, auto-runs deterministic checks + `critique-orchestrator` before presenting.
- **`/brief-writer` / `brief-writer` skill** — "write briefs / draft static briefs / image ads / headline variations / design elements." Primary static pipeline: applies shared `script-writer` dispatch contract, Gemini writes copy, `scoring-evaluator` scores, `critique-orchestrator` runs cross-brief QA before presenting.
- **`/critique-orchestrator` / `critique-orchestrator` skill** — "critique this batch / review scripts or briefs / audit T### / QA." Auto-runs after writer pipelines and can also be invoked directly for category-sweep batch QA and fix-pass routing.
- **`/transcribe`** — "transcribe this / get the transcript / what does this video say / speech to text / I need the voiceover." Routes MLX (local, free, speech-only) vs Gemini (visual + audio breakdown); single files or batch folders.
- **`/ad-library`** — "pull their ad library / scrape their ads / what's [brand] running / competitive ad audit." Scrapes Meta Ad Library via Apify, downloads media, optional Gemini analysis; batch mode for 10–20 brands.
- **`/research-brand`** — full brand research pipeline (Phases 0–7). See **Researching a New Brand** below. Supports `--refresh=ads|reviews|competitors|product|brand|full`.
- **`/grab`** — pasted YouTube/TikTok/Motion/direct-media URLs + analysis intent. Downloads then chains into Gemini analysis. **Never fabricate analysis for ads you couldn't download** — only analyze media actually on disk. Video analysis = 4-column table (`Timestamp | Visual Action | Voiceover | On-Screen Captions`). Delete media after analysis is saved.
- **`/creative-image`** — opt-in creative-hero pre-pass. **Only when the strategist explicitly asks for creative image static ads / metaphorical hero images.** Deepens the angle, builds a concept board, pauses for selection, generates text-free hero variants via fal.ai, then hands the approved hero to `/generate-static`. Never auto-route ordinary static generation here.
- **`/generate-static`**, **`/generate-endcard`** — AI image / end-card generation (see Statics Generator below).
- **`/motion-pull`** — pull top spenders from the Motion report (GraphQL → SQLite).
- **`/clickup-load`** — push briefs/scripts/footage requests to ClickUp (see ClickUp below).

If a request maps to a command, invoke the skill. Don't re-cobble the steps.

---

## Researching a New Brand

**Triggers:** "research [Brand]", "onboard [Brand]", "run the research pipeline / Phases 0–7", "refresh [Brand]'s ads/reviews/product/brand/competitors", "the personas are stale", or anything producing/refreshing `00 Context/` (Brand/Product/Persona Context, Persona Summary) and `00 Research/` docs.

**Read `00 Global/Process/Brand Research.md`** — the canonical end-to-end spec (folder structure, Phase 0 intake, Phase 1 collection, Auto-Gates A/B, persona discovery, competitor scraping, classification, deep synthesis, spec cards, QA, refresh cadence, tool inventory, and the `/research-brand` UX incl. all `--refresh=*` modes).

**Invoke via the `brand-researcher` skill** — Hermes loads it from your profile; it owns phase orchestration, auto-gates, and the 2-iteration loop budget (and may delegate parallel research writers). Never cobble the pipeline together manually.

**Hard rules:**
- **Personas are named by pain/trigger, never demographics** (demographic names auto-fail Auto-Gate B).
- Direct competitors must pass the three-test gate (same pain/job, price ±50%, ≥3 switch-mentions post-persona-lock). Form factor is not a disqualifier.
- **Every objection, angle, and journey stage traces to a verbatim review quote with `review_id`.** No invention.
- Ad classification is **text-only** (primary text + headline + description + on-image text + caption). No vision, no transcription.
- Compliance/guardrails files in `00 Context/` are client-supplied — never touched by the pipeline.
- First-time run refuses if `00 Context/` already has generated docs — use `--refresh=*`.
- **One source of truth for numbers:** `_data/persona-dictionary.json` + classified `reviews.jsonl` + `_data/ad-classifications.json`. No manual re-typing.

---

## Starting a New Batch

**Triggers:** "start a new batch for [Brand]", "let's do T002", "set up the batch docs", "new batch", "next batch".

**Read `00 Global/Process/Batch Template.md`** — the three-file template (Working Document, Scripts, Batch Critique), the Concept Validation gate (7-test bar + batch-level differentiation + conflict-resolution hierarchy), carry-forward rules, and the 12-step batch flow from top-spenders analysis through script critique. Carry forward Script Criteria + Context Files + Dead Angles; **the Process Log starts empty each batch.**

---

## Copywriting Gate — Do Not Bypass Skills

Any task that writes, edits, reviews, formats, or dispatches creative copy for `T[###] Scripts.md`, `T[###] Briefs.md`, or `T[###] Creatives.md` must load the relevant Hermes skill before tool use:

- Scripts / video / hooks / VO / captions → `script-writer`
- Static briefs / image ad copy → `brief-writer` primary skill; it applies the shared `script-writer` copywriting contract
- Batch critique / QA / fix sweeps → `critique-orchestrator`

Do not send thin delegated prompts like “write complete briefs,” “use T002 format,” or “write 4-column scripts.” The dispatch context must explicitly include required criteria, exact prior-batch template excerpt, brand overrides, Working Document rows, and evidence-return requirements. Do not rely on AGENTS.md being injected into child requests.

**End-to-end automation:** a request to write/run/fix scripts or briefs authorizes the whole pipeline. Do not stop after draft generation and do not ask the strategist to manually call QA. After `script-writer` or `brief-writer` finishes writer dispatch/consolidation, the main session automatically runs deterministic checks, `scoring-evaluator` for statics, `critique-orchestrator` for post-writer sweeps, and fix loops until no blocking issues remain.

The original iCloud vault is not runtime context. Copywriting uses the active duplicate vault and active Hermes skills only; do not inspect iCloud unless the strategist explicitly asks for a port/audit comparison.

Top Spenders Analysis belongs to Working Document / planning. Writers do not independently re-read top spender files during draft generation unless the strategist asks or a Working Document asset/reference must be verified.

---

## Writing Briefs

**Triggers:** writing/editing/reviewing any static image ad brief — "write the briefs", "draft T00X briefs", "refine this brief", editing References / Image Direction / Design Elements / Designer Note sections, or creating any `T[###] Briefs.md` / `T[###] Creatives.md`.

**Read `00 Global/Process/Brief Structure.md` (Creative Structure)** — the unified structure for briefs and scripts (three-section model, section order, References format, Image Direction rules, Design Elements, Designer Note rules, disclaimer placement, Diagram Example, Pre-Content Block Economy, commit-to-one-option).

**Hard rules:**
- **Three sections: Notes → Brief → Media Buying.** Notes = References, Image Direction, Designer Note. Brief = Headline Variations (first), Design Elements, VoC Quote Block, Diagram Example, Mandatory Disclaimer (last). Media Buying = Primary Text.
- References use category headings (`**Layout**`, `**Material**`, `**Image**`) with parent + sub-bullets. No spend/ROAS/strategy notes.
- Image Direction = image to generate + compliance only. **No supporting copy, CTAs, or payment logos** (those go in Design Elements). Never specify background color — designers own background.
- **Image-generation briefs: write primary text once, skip the scoring/revision loop on it** — primary text is not rendered (see Creative Image Ad Criteria).
- **Every edit follows the criteria — casual fixes included.** No "too small to re-check" exceptions.
- **Routing:** full drafts and multi-finding fix passes → the **`brief-writer` skill** as the primary entrypoint, applying the shared **`script-writer` copywriting contract** for Gemini dispatch/prompt completeness (2–3 briefs per delegated writer, grouped by format, parallel, with the scoring loop). Single-brief targeted structural edits can be done directly; creative copy rewrites go back to Gemini.
- **3-tier QA:** delegated writers write + score each brief (via `scoring-evaluator`) and cross-check within group; then the main session automatically runs `critique-orchestrator` cross-brief sweeps and fix loops before presenting. See `00 Global/Process/Critique Methodology - Static.md`.

---

## Writing or Refining Scripts

**Triggers:** writing/editing/refining/fixing any video script — "write the scripts", "draft T00X scripts", "fix the scripts", "apply the critique", editing Visual Direction / References / Hook / Body / Close of any `T[###] Scripts.md`, or creating any scripts file.

**Read `00 Global/Process/Brief Structure.md` (Creative Structure), `00 Global/Criteria/Video Script Criteria.md`, AND `00 Global/Criteria/Universal Copy Rules.md`** — section model, caption rules, Visual Direction conventions, hook variation rules, close types, per-structure rules, redundancy checks, quality checklist, banned constructions, pacing, specificity.

**Hard rules:**
- **Three sections: Notes → Brief → Media Buying.** Notes = Visual Direction, References, Editor Notes (optional), Footage. Brief = Hook/Body/Close tables, Mandatory Disclaimer (last). Footage Requests consolidated at document bottom.
- Multi-card captions separate with `<br><br>`, never " - ". Use `❌` for failed alternatives, `✅` for working ones.
- **Source links go in Footage, not References.** Any specific asset in the Visual column needs its source URL in Footage. Never fabricate a URL — surface to the strategist if a cited study can't be located.
- Captions never repeat VO verbatim — two channels, two messages.
- **Preserve strategist-drafted hooks** — edit for compliance, don't restructure the VO phrasing (see Video Script Criteria).
- **Routing:** full drafts and multi-finding fix passes → the **`script-writer` skill** (3 scripts per delegated writer, grouped by structure/persona, parallel). Single-script targeted structural edits can be done directly; creative copy rewrites go back to Gemini.
- **3-tier QA:** delegated writers run a 19-point checklist (binary pass/fail with evidence) + viewer read (3 read-throughs) + within-group cross-check; then the main session automatically runs deterministic SPM/format checks and `critique-orchestrator` cross-script + brand-compliance sweeps before presenting. Rubrics at `00 Global/Video Script Scoring/`. See `00 Global/Process/Critique Methodology - Video.md`.

---

## Critiquing a Batch

**Triggers:** "critique this batch", "review the scripts", "audit T00X", "QA this batch", or writing/updating any `T[###] Batch Critique.md`.

**Read the relevant methodology:** video → `00 Global/Process/Critique Methodology - Video.md`; static/brief → `00 Global/Process/Critique Methodology - Static.md`. Each has the 3-tier QA workflow, severity tiers (❌ blocking / ⚠️ flag / ✅ pass / 🟦 intentional), per-structure/format checklists, cross-batch checks, the compounding rule, and the canonical Batch Critique format.

**Hard rules:**
- Findings group by **category** (Caption-VO, Pacing, References, Compliance, etc.), not by script/brief number.
- Standard table: `Severity | Finding | Affected | Linked Rule | Status`.
- A finding recurring in 3+ items this batch OR 2+ consecutive batches must be proposed for promotion to global criteria.
- Never invent findings or fabricate severity. If a script wasn't read end-to-end, say so.

---

## Statics Generator (AI Image Generation)

**Triggers:** "generate a static / generate this brief / create ad images / run the generation pipeline / convert this brief to NB2 / generate spec cards / swipe this ad / multiply this format / animate this static / creative image static ads / metaphorical hero image", or anything involving NanoBanana 2, GPT Image 2, fal.ai, format templates, or AI image generation for ads.

**Read `00 Global/Statics Generator/Overview.md`** — dual-model architecture (NB2 + GPT Image 2), model-selection matrix, batch flow, generation pipeline, creative-hero pre-pass, format templates, scoring agents, fal.ai usage, spec cards, ad-swipe, animation pipeline, format multiplication.

**Hard rules:**
- Generation pipeline and batch flow are separate. Briefs come from the batch flow; images generate on demand via `/generate-static`.
- **Creative hero generation is opt-in** (`/creative-image` only on explicit request).
- **Model selection is automatic** — the system scans the brief for content signals and picks NB2 or GPT Image 2. Never ask the strategist to choose.
- Scoring agents read the criteria docs as rubrics — never duplicate rules into rubric files. Rubrics in `00 Global/Statics Generator/Scoring Agents/` are canonical; the `scoring-evaluator` skill reads them each run.
- Spec cards generate once per brand — check `[Brand]/00 Context/` first.
- **All generated images/videos save to `[Brand]/00 Assets/Statics/` or `/Animations/`** — never `/tmp`. Use the vault path as `--output`. After generation, add every output to `[Brand]/T00N Images.canvas` (one canvas per batch; create it automatically on the first pass).

---

## ClickUp Integration

**Triggers:** "load to ClickUp / push the scripts/briefs to ClickUp / create footage request / create a brief or script task", creating any ClickUp task, or assigning work to the designer (Diksha) / creator (Karra). Detect the current strategist each new session.

**Read `00 Global/Process/ClickUp Integration.md`** — strategist detection, team roster with ClickUp IDs, the Brand → Creative Briefs list table, the fallback list-resolution rule, unified brief-and-script loading rules, footage request format, the "waiting on footage" pattern.

**Hard rules:**
- **Never load briefs, scripts, or create footage requests unless explicitly told to.**
- Static briefs and video scripts both load into the brand's **single Creative Briefs list** — never a separate Scripts list. Only the `Task type` field and status string differ.
- **Task name = the file slug**; **task description = everything from the slug through the Close / final designer-facing section** (exclude QA/internal blocks like Hook-to-Body Transition Verification).
- Always assign the current strategist (from `00 Global/Hermes/strategist.json`) + Diksha Sharma for every task type — except footage requests, which assign the strategist + Karra Worang.
- Resolving a brand's list: check the table first; if absent, match the vault brand to the ClickUp space and pick the most populated + most recently active Creative Briefs list, then add it to the table.

---

## Working With This Vault

- **File naming:** date-first when relevant — `YYYY-MM-DD [Type] [Batch] - [Brand].md`.
- **Brand folders are self-contained** — each brand's `00 Context/` has everything needed to produce creative.
- **Compliance docs are mandatory reading** — see SOUL.md (overrides every other criteria doc).
- **Process docs in `00 Global/Process/` are the canonical how-to guides.**
- **Ads analysis is the main creative-intelligence source** — top-spender breakdowns in `02 Ads Analysis/` drive structures, hooks, and direction.
- **T-batches build on each other** — T001 tests hypotheses, T002 refines on data, T003 expands formats. The Working Document carries criteria forward (Process Log resets each batch).
