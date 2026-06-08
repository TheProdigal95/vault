# Reach Digital Creative Strategy Vault

This is the Obsidian vault where all creative strategy work happens for Reach Digital's DTC brand clients. Everything lives in markdown. Gemini is an active collaborator — analyzing ads, writing scripts, running research, and producing creative briefs.

> **Maintenance note:** This file is the skeleton loaded every session. Feature-specific setup, integrations, templates, and detailed workflows belong in `00 Global/Process/*.md`, not here. Keep this file under 250 lines.

---

## First-Time Setup

**If `yt-dlp` or `agent-browser` is missing, this is a new machine. Read `00 Global/Process/Setup.md` and run the full first-time setup.** It covers OS-specific dependency installs, one-time Motion login, Gemini API key, and Notion/ClickUp OAuth.

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

**Hard rules regardless of the detail doc:**
- **Never create or modify Notion pages unless the user explicitly asks.**
- **🚨 CRITICAL: Notion Image Safety:** Never use `replace_content` on a page that contains images. `replace_content` deletes every image block on the page. Image URLs from Notion's `prod-files-secure.s3` are signed and expire in ~1 hour. Re-embedding the URL after deletion is NOT a real restore—the image will break once the signature expires. **Mandate:** Use `update_content` with surgical `old_str` / `new_str` operations to rewrite prose while leaving `![](...)` blocks untouched. If you see `![](...)` in the fetched content, `replace_content` is banned.

---

## Slash Commands / Script Executions — Use These, Don't Reinvent Them

This vault has custom slash commands at `.claude/commands/` (project-level, shared with the repo). When the user's request matches one of these, **invoke the underlying script with the `run_shell_command` tool** instead of trying to do it manually. The commands contain the exact tools, paths, and logic needed.

**Important:**
- Always use project-relative paths (`node .claude/tools/grab/grab.js`) — never hardcoded paths like `/opt/homebrew/bin/node` or `~/.claude/tools/`.
- If global commands exist at `~/.claude/commands/` that conflict with these, the global ones take priority and may be outdated. The canonical versions are in this project's `.claude/` directory.
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
**Execution:** `python3 .claude/tools/mlx-transcribe.py [file]`

### `/ad-library` — Meta Ad Library Pull & Analysis

**Invoke this command when the user says anything like:**
- "pull their ad library" / "scrape their ads" / "get their ads"
- "run an ad library pull on [brand]"
- "I need to see what [brand] is running"
- "pull ads for these brands" (batch mode)
- "do a competitive ad audit"
- Any request involving Meta/Facebook Ad Library URLs or competitive ad scraping

**What it does:** Scrapes Meta Ad Library via Apify, downloads media, optionally runs Gemini analysis. Supports batch mode for 10-20 brands at once.
**Execution:** Follow `.claude/commands/ad-library.md`

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
**Execution:** `node .claude/tools/grab/grab.js [urls]`

### `/creative-image` — Creative Hero Image Pre-Pass

**Invoke only when the strategist explicitly asks for creative image static ads, metaphorical hero-image ideas, personified visuals, or a batch of creative statics.**

**Meaning:** When the strategist says "creative static ads," "creative images," or "creative image ads," interpret that as this opt-in hero-first workflow unless they explicitly say they mean ordinary designed statics.

**What it does:** Deepens the angle, produces a diverse visual concept board, pauses for strategist selection, generates text-free hero-image variants through the existing fal.ai wrapper, and hands the approved hero to `/generate-static` for final layout and composition. It is additive — never auto-route ordinary static generation into this workflow.

**Execution:** Read `.claude/commands/creative-image.md`, then follow `00 Global/Statics Generator/Creative Hero Workflow.md`.

### General rule

If the user's request maps to a slash command, **use the `run_shell_command` tool to invoke it**. Don't manually cobble together the same steps — the command handles routing, paths, and edge cases.

---

## Starting a New Batch

**Triggers:** "start a new batch for [Brand]", "let's do T002", "let's do T002 for IM8", "set up the batch docs", "create the working document", "new batch", "next batch", or anything about beginning a new batch of ads/scripts.

**When triggered, read `00 Global/Process/Batch Template.md`** — it contains the three-file template (Working Document, Scripts, Batch Critique), the carry-forward rules for subsequent batches, and the full batch flow from top spenders analysis through script critique.

---

## Writing Briefs

**Triggers:** writing, editing, or reviewing any static image ad brief for any brand — "write the briefs", "draft T00X briefs", "refine this brief", editing the References / Image Direction / Designer Note / Diagram Example sections of a brief file, or creating any new `T[###] Briefs.md`.

**When triggered, read `00 Global/Process/Brief Structure.md`** — it contains the canonical section order, References format (category headings, top-level bullets), Image Direction rules (first bullet is `Image to generate:`, no background color), Designer Note rules, Mandatory Disclaimer section placement, Diagram Example spec (five elements only), and the commit-to-one-option rule. Applies to every brand.

**Hard rules regardless of the detail doc:**
- References use category headings (`**Layout**`, `**Material**`, `**Image**`) with top-level bullets only. No nested sub-bullets.
- Image Direction's first bullet is always `**Image to generate:**` — one committed visual, no A/B/C options.
- Never specify background color in Image Direction. Designers own background.
- Mandatory disclaimer lives in its own `### Mandatory Disclaimer` section, never buried in Designer Note.
- Table/chart/grid format briefs get a minimal Diagram Example (headline + chart + logos + subheading + CTA only — no background notes, emoji, logo placeholders, or disclaimer annotations).

---

## ClickUp Integration

**Triggers:** "load to ClickUp", "push to ClickUp", "create footage request", "create a brief task", creating any ClickUp task, or assigning work to the designer (Diksha) / creator (Karra). Also on every new session the strategist must be detected.

**When triggered, read `00 Global/Process/ClickUp Integration.md`** — it contains the strategist detection flow, team roster with ClickUp IDs, brief-loading rules (list, description content, assignees, status), footage request format, and the "waiting on footage" comment pattern.

**Hard rules regardless of the detail doc:**
- **Strategist Detection:** On every new session, identify the strategist. Check `.claude/strategist.json`. If not found, ask: "Which strategist are you?" (Marcelo Acosta `87415563`, Kylie McCreary `75585377`, Michael Starr `81508885`, Cristina Cepeda `75446242`).
- Never load briefs or create footage requests unless explicitly told to.
- Always assign the current strategist (from `.claude/strategist.json`) + the relevant teammate (Diksha for briefs, Karra for footage).

---

## Working With This Vault

- **File naming:** Date-first when relevant. `YYYY-MM-DD [Type] [Batch] - [Brand].md`
- **Brand folders are self-contained.** Each brand has its own 00 Context/ with everything needed to produce creative.
- **Compliance docs are mandatory reading.** If a brand's `00 Context/` contains a file matching `Compliance`, `Guardrails`, or `Claims` in the name (e.g., `Compliance - Marketing Rules.md`, `Guardrails & Claims - IM8.md`), it MUST be read before writing any brief, script, or ad copy for that brand. These rules override every other criteria doc — non-compliance is an automatic fail. Always check for compliance/guardrails docs at the start of any creative work for a brand.
- **Process docs are in `00 Global/Process/`.** These are the canonical how-to guides.
- **Ads analysis is the main creative intelligence source.** Top spender breakdowns in `02 Ads Analysis/` identify what's working in ad accounts — this is what drives script structures, hook styles, and creative direction.
- **T-batches build on each other.** T001 tests hypotheses, T002 refines based on data, T003 expands formats. The Working Document carries criteria and process logs forward.
- **Strategists work fast.** They provide raw voice-note-style notes and expect Gemini to fill gaps — run Gemini analysis on media, cross-reference patterns from prior brands, surface things they didn't mention. Don't just reformat their notes. Add value.
- **Senior Collaborator:** Professional, direct, high-signal. No conversational filler.
- **Surgical Edits:** Keep document structure intact; only update relevant sections.
