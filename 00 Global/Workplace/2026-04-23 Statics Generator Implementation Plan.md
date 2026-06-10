# Statics Generator — Implementation Plan

*Source: Will Sartorius (Self Made Agency / Skipper) — Motion Bootcamp "Motion Foundations" session, April 2026.*
*Transcript: `/Users/marce/Downloads/transcript-en.vtt`*
*Slide deck: `/Users/marce/Downloads/Will Sartorius - Motion Presentation.pdf` (74 slides)*
*Course page: `motionbootcamp.getskipper.ai/motion-foundations/`*
*Downloaded assets:*
- *Headline Template: `/Users/marce/Downloads/will_sartorius_headline_template.md` (226 lines — 3 styles, NB2 prompts, variation vectors, coherence test, Agent 7 checklist)*
- *Ad-Swipe System: `/Users/marce/Downloads/will_sartorius_ad_swipe.md` (239 lines — 3-stage system, JSON schemas, rebuild template)*

*Page prompts captured: Research Prompt, Brand Spec Card Prompt, Visual Style Card Prompt, Scoring Agent DIY Prompt, Agent Review Prompt, NB2 Conversion Prompt*
*Slide prompts captured: Quick Win Deconstruction, Animation Pipeline (4 steps), Briefing Starter, NB2 Prompt Assembly, Format Multiplication*

---

## What This Is

A system for AI-generated static ad production at scale. Will presented a 5-step pipeline: research the brand → generate visual spec cards → save format templates + scoring agents → brief any ad → generate in fal.ai with NanoBanana 2. Two tiers: a "quick win" (clone-rework-generate single ads) and a "scalable" method (build a reusable project with brand specs, format recipe cards, scoring agents, and batch generation).

The plan below evaluates each component against what we already have, applies the adoption rubric (Faster / Better / New Methodology), proposes the folder structure and implementation phases, and includes the full source material for each portworthy component.

---

## Adoption Rubric Evaluation

| Will's Component | Our Equivalent | Verdict | Reason |
|---|---|---|---|
| Brand Extraction Prompt | Brand Research Pipeline (Phases 0-6) | **Skip** | Ours is vastly deeper — VoC mining, persona discovery with auto-gates, competitor analysis with 3-test gate, review classification. His is a web scrape that produces a markdown summary. |
| Brand Spec Card (PNG) | Brand Context.md (text only) | **New Methodology** | Image generation models need to *see* fonts/colors in an uploaded reference image. They can't interpret hex codes or font names in text prompts. We have zero visual spec cards. This is why our image generation hit rate is inconsistent. |
| Visual Style Card (PNG) | Part of ads analysis + brand context | **New Methodology** | Photography direction, styling rules, visual do's/don'ts as an uploadable PNG reference. Companion to the spec card — spec card = what the brand looks like, style card = how the brand feels. |
| Format Templates ("recipe cards") | Creative Image Ad Criteria + Brief Structure | **Better** | We have format rules and quality criteria for writing briefs, but no NB2 generation-ready prompt templates with composition specs, variation vectors, and safe zones. His templates are translation guides: given an approved brief, here's how to assemble the NB2 prompt for this format. Our criteria stay as-is for brief quality; templates handle the brief-to-generation step. |
| Scoring Agents (7 agents, 90+ loop) | 3-tier QA (writer sub-agent, orchestrator, critique) | **Better** | Adds a scored iteration loop over our existing criteria. 7 scoring rubric files read by a single scoring-evaluator sub-agent, spawned from within the brief-writer sub-agent (brief-writer gains the Agent tool). When criteria evolve via the compounding rule, the evaluator automatically follows — it re-reads criteria docs each run. Replaces equivalent pass/fail checks in Tier 1 for 7 dimensions. Briefs stay parallel (2-3 per sub-agent, grouped by format or topic). |
| Ad-Swipe System (3-stage) | Ads analysis (top spender breakdowns) | **Faster + Better** | We analyze top spenders but don't produce structured JSON deconstructions that directly generate image prompts. His system is analysis-to-production in one flow — deconstruct competitor ad, rebuild for our brand, output generation-ready prompt. |
| NanoBanana 2 via fal.ai | Gemini Nano Banana Pro (editorial-image-prompts skill) | **Faster** | fal.ai generates 4 images simultaneously at ~$0.08/image. Gemini does 1 at a time. NanoBanana 2 needs longer prompts (1,000-1,500 words) but produces better results with uploaded reference cards. We already have a fal.ai API key. Use the `/edit` endpoint — it accepts up to 14 reference images via `image_urls` parameter (spec cards + product photo). |
| Veo 3.1 GIF Animation | Nothing | **New Methodology** | Static-to-GIF pipeline doesn't exist in our vault. fal.ai hosts Veo 3.1 with a `first-last-frame-to-video` API endpoint — no Google Labs/Flow web interface needed. Fully automatable. |
| Format Multiplication | Batch planning (manual) | **Faster** | Take a winning concept and auto-rebrief across format templates — same persona, angle, emotion, different layout and copy structure. Currently manual in batch planning. |
| Skipper (SaaS tool) | Research Engine + review scraping | **Skip** | His SaaS for automated persona discovery from reviews. We already have this — review scraping, Research Engine sprints, persona discovery in Brand Research Phase 2. |
| Claude Co-Worker | N/A | **Skip** | Will dismissed this himself ("high on it, then over it two days later"). Connectors break. |

**Result: 7 components pass the rubric. 3 skipped.**

---

## What We're NOT Implementing (and Why)

### Skipped Components

**Brand Extraction / Research Prompt** — Will's research prompt is a 7-phase web scrape that outputs a `brand-research-brief.json`. It covers brand identity, product intelligence, proof points, transformation/pain points, competitive positioning, founder story, and ad-ready hooks. Our Brand Research Pipeline (Phases 0-6) is vastly deeper: it scrapes real customer reviews (not just brand-published info), runs Research Engine sprints on Reddit, discovers personas through a 6-step process with auto-gates, classifies reviews against locked personas, and enforces VoC traceability with `review_id` citations. His prompt is a good "quick start" for brands you don't manage; ours is the production system. The prompt is captured in the Source Material section below if we ever want to reference its JSON output structure.

**Skipper** — His SaaS for automated persona discovery from reviews. We already have this capability through our review scraping pipeline + Research Engine sprints + Brand Research Phase 2 persona discovery. No gap.

**Claude Co-Worker** — Will dismissed this himself in the session. Native connectors to Asana/Slack/Gmail break frequently. Not worth the integration cost.

### Format Templates We're Deferring (Not Skipping)

Will has **15 format templates** total. We're building 6 in the initial implementation. The remaining 9 are deferred — not rejected — because they're either lower-frequency in our current client work or require more examples to build well.

| Template | Status | Reason |
|---|---|---|
| Headline | **Phase 2** | Core format, Will's template downloaded |
| Us vs Them | **Phase 5** | Proven converter per our Creative Image Ad Criteria |
| Features & Benefits | **Phase 5** | Core format in our criteria |
| Testimonial | **Phase 5** | High-frequency format, maps to our VoC review patterns |
| Statistics | **Phase 5** | Social proof format, common in DTC |
| Before & After | **Phase 5** | Common DTC format |
| Bullet Points | *Deferred* | Overlaps with Features & Benefits in structure |
| Social Proof | *Deferred* | Overlaps with Statistics; may merge |
| Press | *Deferred* | Only relevant for brands with press coverage |
| News | *Deferred* | Editorial/advertorial style, niche use case |
| UGC | *Deferred* | Will himself is "morally opposed to AI UGC" — low priority |
| Founder Story | *Deferred* | Relevant for some brands, build when a client needs it |
| Carousel | *Deferred* | Multi-frame format, different generation workflow |
| Handwriting | *Deferred* | Niche style |
| Negative Marketing | *Deferred* | Confrontational/call-out style, build when needed |

The infrastructure built in Phases 1-4 (spec cards, scoring agents, fal.ai integration) supports any number of templates. Adding a new format is just writing another recipe card `.md` file — no system changes needed.

### Not Using Will's Copy Agents Verbatim

Will's 7 favorite agents (per slide 62): Persona Fit, Angle Fit, Emotional Fit, Brand Fit, Conversion, Format, Grammar. We're adapting the concept but replacing 3 of his dimensions with our own frameworks:

- His "Angle Fit" → our **Awareness Stage Alignment** (does copy match the intended awareness stage from the Creative Strategy Matrix?)
- His "Emotional Fit" → absorbed into **Messaging Angle Coherence** (does copy deliver the specified messaging angle for this pain × persona cell? Emotional register is implicit in the angle — "Your dermatologist wrecked your skin" carries its own emotional weight without a separate framework)
- His "Conversion" → absorbed into **Copy Editor** (our Universal Copy Rules already cover CTA effectiveness and urgency)
- Adding **Three Selves** check (he doesn't have this at all)

We keep his Persona Fit, Brand Fit (→ our Brand Compliance), Format, and Grammar (→ our Copy Editor with veto power). The result is 7 agents that are structurally similar to his but encode our strategic depth.

---

## Proposed Folder Structure

```
00 Global/
├── Statics Generator/
│   ├── Overview.md                       <- System doc, workflow, tool stack
│   ├── Ad-Swipe System.md               <- 3-stage competitor reverse engineering
│   ├── Animation Pipeline.md            <- Static to GIF workflow (Veo 3.1)
│   ├── Format Multiplication.md         <- Winning concept to multi-format expansion
│   ├── Brand Spec Card Prompt.md        <- Prompt to generate brand spec card PNG
│   ├── Visual Style Card Prompt.md      <- Prompt to generate visual style card PNG
│   │
│   ├── Templates/                       <- Format "recipe cards" (6 of 15 initial)
│   │   ├── Headline.md                  <- Adapted from Will's + our criteria
│   │   ├── Us vs Them.md
│   │   ├── Features & Benefits.md
│   │   ├── Testimonial.md
│   │   ├── Statistics.md
│   │   └── Before-After.md
│   │   (Deferred: Bullet Points, Social Proof, Press, News, UGC,
│   │    Founder Story, Carousel, Handwriting, Negative Marketing)
│   │
│   └── Scoring Agents/                  <- Copy QA scoring agents
│       ├── Persona Fit.md
│       ├── Awareness Stage Alignment.md
│       ├── Messaging Angle Coherence.md
│       ├── Three Selves.md
│       ├── Brand Compliance.md
│       ├── Format Compliance.md
│       └── Copy Editor.md

Per brand (generated outputs):
[Brand]/
├── 00 Context/
│   ├── Brand Spec Card.png              <- Generated from Brand Context.md
│   └── Visual Style Card.png            <- Generated from ads analysis + brand context
```

The 7 scoring rubric files are read by a single `scoring-evaluator` sub-agent (`.claude/agents/scoring/scoring-evaluator.md`) spawned from within each `brief-writer` sub-agent during the scoring loop. The rubric files stay in `00 Global/Statics Generator/Scoring Agents/` as the canonical source — no mirroring needed.

---

## Key Technical Details from Will's Session

### NanoBanana 2 Prompting Rules

- **Ideal prompt length: 1,000-1,500 words.** Don't exceed 2,000. Under-prompting produces worse results than over-prompting.
- **NanoBanana 2 does not make assumptions.** If you don't specify something, it won't do it. NanoBanana Pro (the previous model) was good at filling in holes — NanoBanana 2 is not. Over-communicate every detail.
- **Text-based prompts, not JSON.** NanoBanana 2 works best with text prompts. JSON prompts are for Veo 3.1 only.
- **Upload reference images, don't describe them.** The model can see fonts and colors in uploaded images. It cannot reliably reproduce fonts from names or colors from hex codes in text. This is why spec cards as PNGs are essential.
- **Max 2-3 brand reference images.** More than that introduces contradictions. One spec card + one style card + one product image = the sweet spot.
- **Four images per generation in fal.ai.** Generate 4 variants at once. Pick the best. Iterate the prompt based on failures.

### Safe Zone Rule (9:16 Vertical)

All text and critical content must stay out of:
- **Top 270px** (platform UI: status bar, app header, profile info)
- **Bottom 340px** (platform UI: engagement bar, caption preview, navigation)
- **Left margin: 40px**
- **Right margin: 120px from y=600 downward** (side engagement buttons)

**Primary content zone: x=40 to x=960, y=270 to y=1580** (on a 1080x1920 canvas).

These values get encoded into every format template's image generation prompt.

### Scoring Agent Threshold System

- Each agent scores copy 0-100 on its specific dimension.
- Copy iterates automatically until **every agent gives 90+**.
- **Copy Editor agent has veto power** — any grammar/mechanical error blocks approval regardless of other scores.
- Will has ~20 agents now. Per the slide deck (slide 62), his core 7 favorites: **Persona Fit, Angle Fit, Emotional Fit, Brand Fit, Conversion, Format, Grammar.**
- Average iteration time: ~20 minutes for all agents to converge.
- Cap at ~5 iterations to prevent infinite loops.

### Veo 3.1 Animation Rules

- Upload **start frame AND end frame** as image URLs — the fal.ai endpoint `fal-ai/veo3.1/first-last-frame-to-video` accepts `first_frame_url` + `last_frame_url` + text `prompt`.
- 8-second video is standard. Output is MP4 (can be converted to GIF locally via ffmpeg).
- First generation will usually be bad. Download output, upload to Claude with both original frames, describe what's wrong, get corrected prompt, re-generate. 2-3 iterations typical.
- **All text must stay frozen during animation.** Only the visual elements (product, background, characters) should animate. Text that moves or morphs looks amateur. Specify this explicitly in the prompt.
- No camera movement. Background stays perfectly still.
- CPMs on GIFs are generally lower than statics — so converting a winning static to GIF extends its life.
- **Pricing:** $0.20/s at 720p/1080p without audio, $0.40/s at 4K. An 8-second 1080p video = ~$1.60/gen. Fast tier available at $0.10/s.
- Also available: `fal-ai/veo3.1/image-to-video` (single frame → video) and `fal-ai/veo3.1/extend-video` (lengthen existing video).
- Will's 6-step animation workflow: Ideate concept → Create the missing frame (start or end) via NanoBanana 2 → Write animation prompt via Claude → Generate in Veo 3.1 via fal.ai API → Review output and describe failures → Iterate prompt until clean.

**Alternative video models on fal.ai (if Veo 3.1 quality doesn't meet needs):**
- Kling O3 Standard (`kling-video/o3/standard/image-to-video`) — also supports start/end frame
- Seedance 2.0 (`bytedance/seedance-2.0/image-to-video`) — start/end frame control with native audio
- Sora 2 (`sora-2/image-to-video`) — OpenAI's video model

### Brand Spec Card Generation

Two situations:

1. **Have brand guidelines:** Upload PDF/PowerPoint to Claude. Convert to markdown first (Claude handles markdown better than PDFs). Then generate spec card from the markdown.
2. **Don't have brand guidelines:** Go to the client's website, open DevTools (Inspect), search for "font" — copy the CSS. Paste into Claude. Repeat for "color." Claude extracts the font families, weights, hex codes and builds the spec card.

The spec card prompt outputs HTML, which includes a final instruction to convert to PNG. The PNG is what gets uploaded to NanoBanana 2 as a reference image.

**Content of a spec card:**
- Logos (all variants)
- All fonts with visual specimens (headline, sub-header, body, UI)
- All brand colors with hex codes and swatches
- CTA styling rules (shape, fill, text)
- Typography do's and don'ts

**Content of a visual style card:**
- Photography direction (angles, lighting, contexts)
- Styling rules
- Founder quote (captures brand voice)
- Example ad layout (what a "correct" ad looks like)
- Visual do's and don'ts

### Ad-Swipe System (3-Stage Reverse Engineering)

**Stage 1 — Deconstruct.** Upload competitor ad to Claude. Extract structured JSON: layout analysis (format type, composition, visual hierarchy, negative space), typography extraction (font category, weight, alignment, letter spacing, color), color and mood extraction (background, palette, lighting, energy level), copy extraction (each text element with role, text, word count, position), and editorial judgment (strongest element, weakest, visual-copy coherence rating, scroll-stop factor 1-10, steal-worthy techniques).

**Stage 2 — Rebuild.** Using the deconstruction, generate a complete NanoBanana 2 prompt that: keeps the structural techniques that work (layout, composition, visual hierarchy), replaces all copy with YOUR brand's copy matched to the specified persona/angle/emotion, applies YOUR brand's visual system from the uploaded spec cards, and passes YOUR format template constraints.

**Stage 3 — Copy Generation.** Before inserting copy into the rebuild prompt: load the matched format template, use its copy template, write copy for the persona/angle/emotion, verify against word count limits, run through Copy Editor agent checklist. Output the copy mapped to each text element slot.

**Hard rule:** Never copy a competitor's actual copy, tagline, or brand-specific language. We borrow structure, not content. The final ad must look like it was conceived for our brand from scratch.

### NanoBanana 2 Universal Generation Rules

Every NB2 image generation prompt must include these constraints (from slides 39 + 69):

1. All text rendered directly in the image (not layered post-generation)
2. No text smaller than 24px equivalent
3. Sufficient contrast between text and background
4. Photorealistic product representation (use uploaded product photo as reference)
5. One continuous image — no panels, no borders, no split frames
6. Safe zones enforced (top 270px, bottom 340px, left 40px, right 120px from y=600)
7. Typography matches brand spec card exactly (font names, weights, colors)
8. Logo placement per brand spec sheet
9. Color palette from brand spec card (no improvised colors)
10. Product position, angle, and scale specified explicitly

### NB2 Prompt Assembly Checklist (slide 69)

Every prompt sent to NanoBanana 2 must contain:
- Exact dimensions (1080x1920, 9:16 vertical)
- Every piece of approved copy rendered verbatim in the image
- Product position, angle, and scale from creative direction
- Background treatment from creative direction
- Typography: exact font names, weights, and color from brand spec card
- Safe zones (top 270px, bottom 340px clear of critical content)
- Lighting and energy direction
- Logo placement per brand spec sheet
- All 10 universal rules above
- A note that the user will upload the brand spec card, visual style card, and product photo as reference images

### Format Multiplication

Take a winning ad brief and feed it alongside other format templates to Claude:

1. Specify: "I have this winning headline ad. Here are my other format templates (statistics, testimonial, features-benefits, before-after). For each format, rewrite the brief to match that template. Same persona, angle, emotion."
2. Claude rewrites copy to fit each format's structure.
3. Each rewritten brief runs through the scoring agents.
4. Each passing brief gets converted to a NanoBanana 2 prompt.

Also works within a single format — Will's headline template has styles A, B, C (product hero, lifestyle context, typography-dominant). A winning Style A headline ad can be auto-rebriefed into Style B and C variants.

---

## How Will's System Maps to Our Frameworks

Will works with persona + angle + emotion as his three briefing inputs. These map to our frameworks:

| Will's Input | Our Framework |
|---|---|
| Persona | Pain-trigger persona from Persona Context (never demographic-named) |
| Angle | Messaging angle from the Creative Strategy Matrix — the core truth for a specific pain × persona intersection |
| Emotion | No formal framework. Will's "emotion" input (e.g., "frustration," "hope," "relief") stays as an informal descriptor. Emotional register is implicit in the messaging angle and the Three Selves lens — not a separate axis. |

Additionally, our system adds layers Will doesn't use:
- **Awareness stage** (from Creative Strategy Matrix) — is this ad targeting Unaware, Problem-Aware, Solution-Aware, Product-Aware, or Most-Aware? This determines copy strategy: education vs. agitation vs. comparison vs. proof vs. conversion.
- **Three Selves** — is the ad targeting the Actual Self (who they are now), Ideal Self (who they want to be), or Ought Self (who they feel they should be)? This affects emotional register.

These extra dimensions get encoded into our adapted scoring agents (Awareness Stage Alignment, Messaging Angle Coherence, and Three Selves Check) — agents Will doesn't have.

---

## Implementation Phases

### Phase 1: Brand Spec Cards (proof of concept)

**Pick one active brand.** Generate the spec card and visual style card PNGs from their existing Brand Context.md and ads analysis. Test by generating a headline ad through the full pipeline (brief → NanoBanana 2 prompt → fal.ai) and comparing quality against our current image generation output.

**Trigger model:** Spec cards are generated once per brand and refreshed when the brand's visual identity changes. Two trigger paths:
1. **Part of brand research** — added as the new Phase 5 in the Brand Research Pipeline (after Phase 4 deep synthesis produces Brand Context, generate spec cards from it). Current Phase 5 (QA) becomes Phase 6; current Phase 6 (Cleanup) becomes Phase 7. New brands get spec cards automatically.
2. **Standalone** — "generate spec cards for [Brand]" for brands that already have research done. Many existing brands need spec cards without re-running the full pipeline.

**Deliverables:**
- `Brand Spec Card Prompt.md` — the generation prompt
- `Visual Style Card Prompt.md` — the generation prompt
- One brand's `00 Context/Brand Spec Card.png`
- One brand's `00 Context/Visual Style Card.png`
- Before/after comparison of image generation quality
- Integration point documented in Brand Research Pipeline (Phase 5, after deep synthesis)

**Effort:** Medium. Main work is writing the prompts and testing the HTML-to-PNG conversion in Claude Code.

### Phase 2: Headline Format Template

**Adapt Will's headline template as our first NB2 rendering spec.** His template has 3 styles (product hero, lifestyle context, typography-dominant) with image generation prompts and variation vectors. We keep his NB2 prompt structure and add our rendering constraints: safe zones, typography placement from spec cards, composition layout per style. Copy quality rules (8-12 word headlines, subheadings starting with brand name, 2-5 word pills, category clarity, ad-unit congruence) stay in Creative Image Ad Criteria and Headline & Text Hook Criteria — the template references them with a compliance line, not duplicates them.

**Deliverables:**
- `00 Global/Statics Generator/Templates/Headline.md`
- Test: generate 4 headline ads for the proof-of-concept brand, compare against designer-produced briefs

**Effort:** Medium. Will's template is the skeleton; we add our rendering constraints and reference our criteria docs for copy rules.

### Phase 3: Ad-Swipe System

**Port Will's 3-stage system with minimal adaptation.** The downloaded asset is nearly production-ready. Main changes: map persona/angle/emotion inputs to our Creative Strategy Matrix (pain × persona × messaging angle × awareness stage) + Three Selves, add our format template reference (so the rebuild matches a template from our cookbook), add our Copy Editor checklist (banned constructions from Universal Copy Rules).

**Deliverables:**
- `00 Global/Statics Generator/Ad-Swipe System.md`

**Effort:** Low. The system is downloaded and mostly ready.

### Phase 4: Scoring Agents + Brief-Writer Upgrade

This phase has two coupled deliverables: the scoring rubric system, and upgrading the brief-writer sub-agent to run scoring loops internally.

#### 4A. Brief-Writer Gains Agent Tool + Multi-Brief Grouping

**Keep `.claude/agents/brief-writer.md` as a sub-agent. Add `Agent` to its tool list.** This gives it the ability to spawn the scoring-evaluator sub-agent during the copy iteration loop — no skill conversion needed. Briefs stay parallel (multiple sub-agents running simultaneously), each sub-agent gets its own isolated context, and the orchestrator's fix-pass loop stays self-contained.

**Multi-brief grouping:** Each brief-writer sub-agent handles 2-3 briefs per invocation, grouped by format or topic. This reduces total sub-agent count (5 sub-agents × 3 briefs vs 15 × 1), cuts token cost (criteria docs read 5 times not 15), and enables within-group cross-checking (if brief #1 used Curiosity Gap, brief #2 picks a different core type). The main session groups the Batch Plan rows before dispatch.

**What changes in the brief production flow:**

```
BEFORE:
Main Session → [brief-writer sub-agent] × N (PARALLEL, 1 brief each)
  Each: write → structural audit → evidence report → return

AFTER:
Main Session → [brief-writer sub-agent] × ~5 (PARALLEL, 2-3 briefs each)
  Each brief within the group, sequentially:
    write → Hook Quality Bar → 4-Question Gate →
    spawn scoring-evaluator sub-agent → iterate if <90 (cap 5) →
    4-Question Gate post-scoring → structural checks
  After all briefs in group:
    within-group cross-check (uniqueness, spec consistency)
    → evidence report for all briefs → return
```

**Evidence delivery stays as sub-agent return values.** No file-based workaround needed. The orchestrator collects evidence reports from each sub-agent's return, same as today.

**Fix-pass flow stays symmetric with video.** The orchestrator dispatches fix-passes to brief-writer sub-agents the same way it dispatches to script-writer. No dual-mode, no main-session intervention mid-loop.

**Files affected by this upgrade** (edits happen during implementation, not as pre-requisites):

| File | What Changes |
|---|---|
| `.claude/agents/brief-writer.md` | Add `Agent` to tools list. Add scoring loop (spawn scoring-evaluator, iterate to 90+, cap 5). Add Hook Quality Bar + 4-Question Gate as pre-scoring gates. Update invocation contract for multi-brief grouping (`plan_rows` array instead of single `plan_row`). Add within-group cross-check step. Update evidence report format to include scoring history. |
| `CLAUDE.md` § Writing Briefs | Routing rule: "per-brief, parallel" → "2-3 briefs per sub-agent, grouped by format or topic, parallel, with scoring loop." 3-tier QA note: "Writer sub-agents self-audit before returning" → "Writer sub-agents write + score each brief (scoring-evaluator sub-agent iterates copy to 90+ on 7 dimensions), cross-check within group, then return." Add scoring agents hard rule. |
| `Critique Methodology - Static.md` | Tier 1: update for scoring loop + multi-brief grouping. Tier 2: slim to 3 cross-brief checks (product spec, fabricated stats, compounding rule). Remove headline framing uniqueness, CTA repetition, and other checks now handled by brief-writer's scoring loop. |
| `Batch Template.md` | Step 9: "produced in parallel by writer sub-agents" → "produced in parallel by brief-writer sub-agents (2-3 briefs each, grouped by format or topic, with scoring-evaluator iteration loop)." Step 10: slimmed orchestrator scope for static. |
| `.claude/agents/critique-orchestrator.md` | For static batches: slim Step 2 category sweeps to 3 checks (product spec consistency, fabricated stats, compounding rule scan). Remove headline framing uniqueness, CTA repetition, References format, Image to generate, Mandatory Disclaimer, commit-to-one-option, Diagram Example, Designer Note discipline, per-format checklist, per-platform overlay, brand compliance — all now covered by the brief-writer's scoring loop. Step 5 fix-pass: product spec → Edit directly (mechanical replacement from Working Document canonical), fabricated stats → dispatch to brief-writer with `mode=fix`. Compounding rule → return candidates to main session (no fix, just flagging). |

#### 4B. Scoring Rubric Files + Scoring-Evaluator Sub-Agent

**Build 7 scoring rubric files and 1 scoring-evaluator sub-agent.** The rubric files define what each dimension evaluates; the scoring-evaluator reads all 7 rubrics in a single invocation and returns 7 scores.

**Why one evaluator, not seven agents:** Spawning 7 agents per iteration (up to 5 iterations per brief, up to 15 briefs per batch) = up to 525 agent invocations. One evaluator per iteration = up to 75. The evaluator reads all 7 rubrics (~350 lines total) — easily fits in one agent's context.

Each rubric file is ~40-60 lines of markdown: what dimension it evaluates, which criteria doc(s) it reads, scoring calibration (what 60 / 80 / 95 looks like with concrete examples), what triggers an instant fail, and how to write actionable revision feedback.

**The rules live in our criteria docs, not in the rubric files.** When a new rule gets promoted to a criteria doc via the compounding rule (3+ briefs or 2+ batches), every future scoring run automatically enforces it — the evaluator re-reads the criteria docs each time. No manual updates needed.

| Rubric | Dimension | Criteria Doc(s) It Reads | What It Scores |
|---|---|---|---|
| Persona Fit | Does copy speak to the pain-trigger persona? | Persona Context, Review Analysis (Standout Language bucket) | Higher when copy uses exact Standout Language phrases from VoC vs. paraphrased VoC. Checks persona-specific language, not generic demographic callouts. |
| Awareness Stage Alignment | Does copy match the intended awareness stage? | Creative Strategy Matrix § Awareness Stages | Unaware = educate/reveal. Problem-Aware = agitate/validate. Solution-Aware = differentiate. Product-Aware = prove. Most-Aware = close. Checks that tactics match the deployment-by-awareness-stage table in Headline & Text Hook Criteria. |
| Messaging Angle Coherence | Does copy deliver the specified messaging angle? | Creative Strategy Matrix messaging angles, Persona Deep Research angle dumps | The angle's core truth comes through — not a generic version of it, not a drift into adjacent angles. |
| Three Selves | Is the targeted self consistent throughout? | Creative Strategy Matrix § Three Selves | No unintended self-switching mid-copy. Checks Actual/Ideal/Ought register consistency. |
| Brand Compliance | Passes brand's guardrails/claims? | Brand Compliance/Guardrails files in 00 Context/ | Every claim, ingredient reference, pricing, and disclaimer matches the compliance doc. |
| Format Compliance | Copy fits the format's constraints? | Creative Image Ad Criteria (format section) + Brief Structure + the format template being used | Word counts, element counts, section order, References format, Image Direction rules, Diagram Example spec. |
| Copy Editor | Grammar, banned constructions, formatting. **Veto power.** | Universal Copy Rules, Headline & Text Hook Criteria | Any grammar/mechanical error blocks approval regardless of other scores. Covers em-dashes, number formatting, brand name capitalization, banned constructions. |

**The scoring-evaluator sub-agent** (`.claude/agents/scoring/scoring-evaluator.md`):
- Receives: the brief copy, the brand name, the assigned persona/angle/awareness stage/Three Selves target
- Reads: all 7 rubric files from `00 Global/Statics Generator/Scoring Agents/`, plus the criteria docs each rubric references, plus the brand compliance doc if applicable
- Returns: 7 dimension scores (0-100) + actionable revision feedback for any dimension <90
- Feedback quality: must pass the Insight Quality Standard from Critique Methodology — remove-the-metrics test, brand specificity, actionability. "Score: 72 — doesn't match persona" fails. "Score: 72 — uses 'busy professionals' which is a demographic callout; this persona responds to 'still taking 8 pills every morning'" passes.

#### What the scoring loop replaces in Tier 1

Currently the brief-writer runs ~15 pass/fail checks. With the scoring-evaluator sub-agent:
- **7 checks become scored dimensions** (the scoring loop handles them — Persona Fit, Awareness Stage, Messaging Angle, Three Selves, Brand Compliance, Format Compliance, Copy Editor). These no longer run as separate pass/fail checks.
- **Remaining checks stay pass/fail** — Brief Structure section order, References format (category headings, no nested sub-bullets), Mandatory Disclaimer placement, Diagram Example minimal spec, commit-to-one-option rule. These are structural formatting rules, not things you iterate toward a score on.
- **The Hook Quality Bar and 4-Question Gate stay as gates** — they're triage, not scoring dimensions (see below).

#### The iteration flow inside brief-writer (per brief)

```
1. Generate brief copy
2. Hook Quality Bar — 5-test gate. Dead hook → rethink, don't score
3. 4-Question Gate — fast-fail. Q1 failure → rewrite, don't iterate
4. Scoring loop:
   - Spawn scoring-evaluator sub-agent with the brief copy + context
   - Evaluator reads all 7 rubrics, scores each dimension 0-100, returns feedback
   - If any dimension < 90, revise based on feedback, re-spawn evaluator
   - Cap at 5 iterations
5. 4-Question Gate — post-scoring sanity check
6. Structural pass/fail checks (Brief Structure, References, Disclaimer, Diagram)
```

After all 2-3 briefs in the group complete steps 1-6:
```
7. Within-group cross-check (headline uniqueness, spec consistency within group)
8. Evidence report compiled for all briefs (scores per dimension per iteration + structural results)
9. Return evidence report to orchestrator / main session
```

#### Integration with existing QA gates

1. **Hook Quality Bar** (pre-scoring gate) — the 5-test quality bar from Headline & Text Hook Criteria (cognitive friction, strong trigger, complete thought, authentic voice, personal stakes) + 12-item anti-pattern list + character constraints (75 char avg, 100 max). A dead hook shouldn't iterate — it needs rethinking, not refinement.

2. **4-Question Gate** (pre-scoring fast-fail + post-scoring sanity check) — from Critique Methodology. Four ranked questions: Make sense fast? → Feel like it's for them? → Believe it? → Take action? A Q1 failure makes the entire scoring loop moot. Runs before the loop to fast-fail, and once more after scoring converges.

**Deliverables:**
- 7 rubric files in `00 Global/Statics Generator/Scoring Agents/`
- `.claude/agents/scoring/scoring-evaluator.md` — single evaluator sub-agent
- Updated `.claude/agents/brief-writer.md` — gains Agent tool, scoring loop, multi-brief grouping, within-group cross-check
- Updated `.claude/agents/critique-orchestrator.md` — slimmed to 3 cross-brief checks for static batches
- Updated `Critique Methodology - Static.md` — Tier 1 scoring loop, Tier 2 slimmed scope
- Updated `CLAUDE.md` — routing rule, 3-tier QA note, scoring agents hard rule
- Updated `Batch Template.md` — multi-brief grouping, slimmed orchestrator
- Hook Quality Bar check wired as pre-loop gate inside brief-writer
- 4-Question Gate wired as pre-loop fast-fail and post-loop sanity check inside brief-writer

**Effort:** Medium-High. Reduced from the original plan — no skill conversion, no Evidence.md file convention, no dual-mode fix-pass logic. The work is: writing scoring calibration examples, adding the Agent tool + scoring loop to brief-writer, writing the multi-brief grouping logic, slimming the orchestrator, and updating 4 downstream docs.

### Phase 5: Remaining Format Templates

**Build template files for the other 5 formats** using the same structure as Headline.md. Each template is a rendering spec — it tells the generation pipeline how to translate an approved brief into an NB2 prompt for that format. The template does NOT replace or duplicate the format's rules in Creative Image Ad Criteria; it references them. Each template includes: format description, styles/variants, NB2 image generation prompt template (with composition layout, typography placement, safe zones, brand identity sections), variation vectors, and a compliance line pointing to the relevant Creative Image Ad Criteria section.

| Template | Creative Image Ad Criteria Section | NB2-Specific Additions |
|---|---|---|
| Us vs Them | "Us vs Them (Comparison)" | Split-column composition spec, muted vs. brand-color rendering, comparison row layout |
| Features & Benefits | "Features & Benefits" | Pill placement grid, product shot positioning, feature callout line specs |
| Testimonial | Will's system + our VoC review language patterns | Quote block rendering, attribution line, portrait/product placement |
| Statistics | Social proof formats from ads analysis patterns | Number typography (size, weight, color), stat callout positioning |
| Before-After | Common DTC format, derive from top spender patterns | Split-frame or timeline composition, before/after label rendering |

**Effort:** High. Each template requires full NB2 prompt engineering + variation vectors. The copy quality rules stay in our criteria docs — templates only handle rendering.

### Phase 6: fal.ai Integration

**Set up fal.ai API access in the vault tools.** We already have the API key. Build a wrapper (similar to `00 Global/Hermes/Tools/gemini-api/`) covering both image generation and video animation.

**Image generation (NanoBanana 2):**
1. Upload local reference images (spec card PNG, style card PNG, product photo) to fal.ai storage via `fal.storage.upload()` → get public URLs
2. Call `fal-ai/nano-banana-2/edit` with: text `prompt` (1,000-1,500 words) + `image_urls` (array of uploaded URLs) + `num_images: 4` + `aspect_ratio: "9:16"` + `resolution: "1K"`
3. Download the 4 generated image variants

**Video animation (Veo 3.1):**
1. Upload start frame + end frame PNGs to fal.ai storage → URLs
2. Call `fal-ai/veo3.1/first-last-frame-to-video` with: `first_frame_url` + `last_frame_url` + text `prompt` + `aspect_ratio: "9:16"` + `duration: "8s"`
3. Download the MP4, optionally convert to GIF via `ffmpeg`

**Auth:** `FAL_KEY` environment variable. SDK: `@fal-ai/client` npm package.

**Deliverables:**
- `00 Global/Hermes/Tools/fal-ai/package.json` — with `@fal-ai/client` dependency
- `00 Global/Hermes/Tools/fal-ai/.env` — `FAL_KEY`
- `00 Global/Hermes/Tools/fal-ai/generate-image.js` — NB2 edit endpoint wrapper
- `00 Global/Hermes/Tools/fal-ai/generate-video.js` — Veo 3.1 first-last-frame wrapper
- `00 Global/Hermes/Tools/fal-ai/upload.js` — local file → fal.ai storage URL helper

**Effort:** Medium. API integration is straightforward — the harder part is prompt tuning. Same Node.js pattern as the Gemini API wrapper.

### Phase 7: End-to-End Workflow + Slash Command

**Wire everything together into a `/generate-static` slash command.** This replaces the deprecated `/statics-briefer` skill (which referenced TEEP stages and Emotional Zones — frameworks never implemented in production, superseded by the Creative Strategy Matrix).

**Two separate workflows, not one pipeline:**

1. **Batch flow (updated for scoring)** — plan the batch, write briefs via brief-writer sub-agents (2-3 briefs each, parallel, each brief scored by scoring-evaluator sub-agent), run 3-tier QA, approve. Briefs stay parallel. The overall flow stays: batch plan → concept validation → Tier 0 → Tier 1 (brief-writer sub-agents × ~5, parallel) → Tier 2 (orchestrator, 3 cross-brief checks) → Tier 3 (critique) → ClickUp.

2. **Generation pipeline (on demand, triggered by `/generate-static`)** — takes approved briefs and converts them into NB2 prompts → fal.ai → generated images. The strategist triggers this when ready: "generate these briefs from T002" or "generate ad #3."

**The generation pipeline workflow:**

1. Strategist specifies what to generate — a specific brief from an approved batch, or inputs for a standalone generation (brand, format template, persona, messaging angle, awareness stage, Three Selves target)
2. Claude loads the brand's spec card PNG, style card PNG, Brand Context, Compliance doc, and the matched format template
3. **If generating from an approved brief:** Claude reads the brief's copy (headline, subheading, pills, CTA, image direction) and skips to step 8 — the copy already passed 3-tier QA
4. **If generating standalone (no prior brief):** Claude generates a brief using the format template, selecting hook tactics appropriate for the awareness stage (see deployment-by-awareness-stage table in Headline & Text Hook Criteria)
5. **Hook Quality Bar** — 5-test gate on the headline/hook. Dead hook → rethink before scoring
6. **4-Question Gate** — fast-fail. Q1 failure → rework, not iterate
7. Scoring agents iterate the copy until all 90+ (cap at 5 iterations)
8. Claude converts the approved brief/copy into a NanoBanana 2 prompt using the format template's rendering specs (composition, safe zones, typography placement)
9. Claude calls fal.ai API with the prompt + reference images (spec card + style card + product photo)
10. 4 variants are generated and saved to a session folder
11. Strategist picks the best, provides feedback for prompt iteration if needed

**Steps 4-7 only run for standalone generations.** When generating from an approved batch brief, the copy is already locked — the pipeline just handles the brief-to-NB2-prompt translation and fal.ai API call. Standalone generations trade QA depth for speed (no Concept Validation, no Tier 0/2/3) — acceptable for single-ad experiments, not for batch-scale production.

**Effort:** High. Orchestration, error handling, iteration flow. The two-path design (from-brief vs. standalone) adds routing logic but avoids redundant QA on already-approved briefs.

### Phase 8: Animation Pipeline + Format Multiplication

**Animation Pipeline:** Now fully automatable via fal.ai API (no Google Labs/Flow needed). Wire into the end-to-end workflow:
1. Strategist picks a winning static ad
2. Claude ideates 5 animation concepts (start/end frame, motion, rationale)
3. Strategist picks a concept
4. Claude writes NB2 prompt for the missing frame → fal.ai generates it via `nano-banana-2/edit`
5. Claude writes animation prompt → fal.ai generates video via `veo3.1/first-last-frame-to-video`
6. Strategist reviews → Claude adjusts prompt → regenerate if needed
7. Convert MP4 to GIF via `ffmpeg` if needed for Meta upload

**Format Multiplication:** Largely a prompt pattern, not a tool build. "Here's my winning brief. Here are my format templates. Rebrief across formats, score each, generate prompts." Can be wired into the `/generate-static` slash command as a follow-up step.

**Format Multiplication and the Differentiation Rule:** Format Multiplication deliberately produces variants that differ only in visual format — same persona, same angle, same awareness stage, different layout. This means multiplied variants shift only 1 of 4 axes (visual format), which would fail the Concept Validation differentiation rule ("shift ≥2 of 4 axes"). This is intentional: Format Multiplication is a production efficiency tool (extend a winning concept's life across formats), not a creative diversity tool (generate distinct creative bets). Multiplied variants are exempt from the per-batch differentiation rule but still subject to the Creative Diversity Audit's Format Spread dimension — if 80% of your static portfolio is headline ads, multiplication should prioritize non-headline formats. See [[Creative Diversity Audit]] for portfolio-level balance.

**Effort:** Medium. Animation is now a real automation (not just documentation) since fal.ai handles Veo 3.1 via API.

---

## Priority Summary

| Phase | Item | Effort | Blocks | Notes |
|---|---|---|---|---|
| 1 | Brand Spec Cards (proof of concept) | Medium | Phases 2, 6, 7 | Do this first — biggest quality unlock |
| 2 | Headline Format Template | Medium | Phase 5 | Will's template is the starting point |
| 3 | Ad-Swipe System | Low | Nothing | Port is nearly ready |
| 4 | Scoring Agents + Brief-Writer Upgrade | Medium-High | Phase 7 | Brief-writer gains Agent tool + multi-brief grouping. Orchestrator slims to 3 checks. Touches 5 existing files. |
| 5 | Remaining Format Templates | High | Phase 7 (for full pipeline) | Build as needed per brand/batch |
| 6 | fal.ai Integration (image + video) | Medium | Phase 7 | NB2 edit + Veo 3.1 first-last-frame, same API key |
| 7 | End-to-End Workflow | High | Everything above | The orchestration layer |
| 8 | Animation + Multiplication | Medium | Phases 1-6 | Now fully automatable via fal.ai Veo 3.1 API |

---

## Source Material Reference

### Prompts Captured from Page (verbatim)

**Brand Spec Card Prompt:**

> Using the Brand Research Brief you just created, generate a clean HTML page I can screenshot as a Brand Spec Card for AI image generation.
>
> The card should include:
>
> 1. Logo & Wordmark - show the brand name in the exact fonts and colors from the brief, with black and white versions and usage notes
> 2. Typography System - sample text rendered in each font role (headlines, body, accents/labels) with font names labeled
> 3. Color Palette - visual swatches of all brand colors with hex codes and names (primary, secondary, accent, background)
> 4. Design Rules - 4-5 "always do" and 4-5 "never do" rules specific to this brand
> 5. CTA Button Style - render the actual CTA button style (color, shape, text treatment) based on what you found on their site
>
> Make it clean, well-organized, and visually clear. This card will be uploaded as a reference image to an AI image generator, so every detail needs to be visually explicit, not just described in text.

**Visual Style Card Prompt:**

> Using the Brand Research Brief, generate a second HTML page I can screenshot as a Visual Style Card. This card should include:
>
> 1. Brand Essence - 3 adjectives that define the brand voice, with short descriptions
> 2. Founder Quote - one defining quote that captures the brand's philosophy
> 3. Photography Direction - separate visual blocks for: product photography, skin/model photography, lifestyle/context shots, and background/surface preferences. Each with keyword tags
> 4. Always/Never Rules - specific to how this brand portrays people, skin, products, and environments
> 5. Product Styling Notes - how the hero product should be photographed
> 6. Mood Spectrum - where the brand sits on scales like loud vs quiet, youthful vs timeless, clinical vs warm
>
> Same as before: clean, visual, designed to be uploaded as a reference image to an AI image generator.

**Scoring Agent DIY Prompt:**

> I need a copywriting assistant that reviews my ad copy for [YOUR FOCUS].
>
> This assistant should:
> - Understand what "good" looks like for [YOUR FOCUS] in the context of direct response advertising
> - Score every brief 1-100 with clear reasoning for the score
> - Break the score into 5 specific dimensions relevant to [YOUR FOCUS], each scored individually
> - List what's working and why
> - List what's not working and why
> - Give specific, actionable rewrites — not just "make it better," but "change X to Y because Z"
> - Flag any hard violations that should be an instant fail regardless of score (e.g. grammar errors, banned words, off-brand language)
> - Nothing ships below 90
>
> Write this as a comprehensive .md file I can save and reuse. Include examples of what a 60, 80, and 95 score looks like for each dimension so I can calibrate.

**Agent Review Prompt (Production section, step 2 of Brief→Score→Generate→Multiply):**

> Please have the agents review the copy.
>
> Please iterate on the copy until every agent gives it a 90+ / 100.

**NB2 Conversion Prompt (Production section, step 3 of Brief→Score→Generate→Multiply):**

> Convert this into a ready-to-paste Nano Banana 2 image generation prompt.
>
> The prompt must include:
> - Exact dimensions (1080x1920, 9:16 vertical)
> - Every piece of approved copy rendered verbatim in the image
> - Product position, angle, and scale from the creative direction
> - Background treatment from the creative direction
> - Typography: exact font names, weights, and color from the brand spec card
> - Safe zones (top 270px, bottom 340px clear of critical content)
> - Lighting and energy direction
> - Logo placement per brand spec sheet
> - All 10 universal rules (no panels, no text under 24px, sufficient contrast, photorealistic product, etc.)
> - A note that I will upload the brand spec card, visual style card, and product photo as reference images

### Prompts Captured from Slide Deck (verbatim)

**Quick Win — Ad Deconstruction Prompt (slide 11):**

> I'm uploading a competitor's ad. Deconstruct it completely.
> Break down every single element you see:
> 1. AD FORMAT: What type of ad is this? (feature callout, headline, before/after, testimonial, etc.)
> 2. COPY: List every piece of text in the ad — headlines, subheads, product names, feature labels, callouts, CTAs, fine print. Include the exact words and where each one is positioned.
> 3. PRODUCT: What is the product? Describe its angle, orientation, position in the frame, and how much space it takes up.
> 4. LAYOUT: How are all the elements arranged relative to each other? What's the visual hierarchy — what does your eye hit first, second, third?
> 5. BACKGROUND: Describe exactly what's behind the product — color, gradient, texture, photo, etc.
> 6. TYPOGRAPHY: Describe the font sizes relative to each other, weights (bold/light), casing (uppercase/lowercase), and alignment for each text element.
> 7. VISUAL DEVICES: Leader lines, arrows, badges, icons, borders, overlays, shadows — anything decorative that connects or highlights elements.
> 8. COLOR PALETTE: What are the dominant colors and how is each one used?
> 9. SPACING: Is it tight or airy? How much breathing room between elements? Centered or asymmetric?
>
> Be thorough. I want someone who has never seen this ad to understand exactly what it looks like from your description alone.

**Quick Win — Rebuild Prompt (slide 12, key rules):**

> Using the ad deconstruction above, write me a detailed image generation prompt for Nano Banana 2 that recreates the same ad layout and structure but for my product.
>
> The prompt must include:
> - The exact dimensions (1080x1920, 9:16 vertical)
> - The background treatment (recreate the same style but adjusted for my product's color)
> - Product placement: same position, angle, and scale as the original but describing MY product
> - Every piece of copy rewritten for my brand and product — headline, subhead, every feature callout — keeping the same tone, length, and structure as the original
> - Typography direction: same size relationships, weights, casing, and alignment as the original
> - All visual devices: leader lines, spacing, everything from the deconstruction
> - Color palette guidance based on my brand
> - A note that I will be uploading 2-3 of my brand's existing ads as reference images — tell the generator to match the exact colors, fonts, and visual style from those references, not from the competitor's ad
> - A note that I will upload a product photo — tell the generator to use it for accurate product representation
> - Safe zones: no critical content in the top 270px or bottom 340px (platform UI overlays)
> - Rules: all text rendered in the image, no text smaller than 24px, sufficient contrast, one continuous image with no panels or borders

**Briefing Starter Prompt (slide 68):**

> I want to create a [FORMAT] ad for [PRODUCT].
>
> Persona: [persona name]
> Angle: [angle]
> Emotion: [emotion]
>
> Use my brand bible and format template to write the full brief: headline, subhead, copy, creative direction, everything. Follow the format template exactly.

**Animation Pipeline — Step 1: Ideate Concepts (slide 21):**

> I want to animate this static ad. Give me 5 animation concepts.
> For each one tell me: (1) Is my static the START or END frame? (2) What does the other frame look like — describe it in detail? (3) What motion happens between the two frames? (4) Why does this motion make sense for the product?
> Rules: all text must stay frozen in place throughout the animation, no camera movement, 3-4 seconds max

**Animation Pipeline — Step 2: Generate Missing Frame Prompt (slide 22):**

> I want to animate this static ad. The concept is: [describe chosen concept and which frame your static is].
>
> My static is the [START/END] frame.
>
> I need you to write a Nano Banana 2 prompt to generate the other frame as a still image. Based on the animation concept, figure out which elements need to be added, removed, or repositioned in the missing frame.
>
> Every piece of text must be reproduced verbatim — same words, same position, same fonts, colors, and sizing. The background, lighting, and overall style must match my static exactly. Only change what needs to be different for the other frame of the animation.
>
> The prompt must specify exact dimensions (1080x1920). I will upload my original static as a reference image — tell the generator to match everything from it except the elements that change between frames.
>
> Be extremely detailed — NB2 won't guess, it only does what you tell it.

**Animation Pipeline — Step 4: Veo 3.1 JSON Prompt (slide 24):**

> I'm uploading two frames for a video animation.
>
> IMAGE 1 is the START frame.
> IMAGE 2 is the END frame.
>
> The animation concept: [describe the motion].
>
> Write me a comprehensive Veo 3.1 JSON prompt that creates a smooth 8 second animation from the start frame to the end frame.
>
> The prompt MUST include:
> - Every piece of text from both frames reproduced verbatim so the fonts don't degrade during generation
> - Explicit instruction that ALL text stays completely frozen in place throughout — no movement, no warping, no fading
> - No camera movement whatsoever
> - The background stays perfectly still
> - A detailed description of the motion: what enters, from where, how it moves, the physics and easing
> - The animation must resolve cleanly into the end frame as its final resting state
> - Describe what stays still and what moves — be explicit about both
>
> Format as a ready-to-paste JSON prompt for Veo 3.1.

**Animation Pipeline — Step 6: Iteration Prompt (slide 26):**

> I'm uploading the animation output plus my original start and end frame for reference.
>
> Here's what's wrong with the animation:
>
> [describe your issues — e.g. "no gummy bears appeared, the text warps at 3 seconds, the tube just floats up on its own instead of being lifted, there's a weird color shift in the background"]
>
> Give me a corrected Veo 3.1 JSON prompt that fixes these issues. Keep everything that worked well.

**Format Multiplication Prompt (slide 73):**

> I have a winning ad brief that I want to multiply across different format templates. The original brief is below.
>
> Here are my format templates: [upload or list your .md template files]
>
> For EACH format template, rewrite the brief to fit that format exactly:
> - Keep the same persona, angle, emotion, and core product truth
> - Rewrite the copy to match the new format's structure (headline lengths, copy slots, required elements)
> - Follow the format template's copy rules and variation vectors
> - Adjust the creative direction to match the new format's visual requirements
> - Write a complete Nano Banana 2 image generation prompt for each
>
> Do not change the strategic foundation. Only change the packaging.

---

### Prompts Captured from Page (verbatim, continued)

**Research Prompt (skipped for implementation, captured verbatim for reference):**

We skip this because our Brand Research Pipeline (Phases 0–6) is vastly deeper, but the JSON output structure could inform our own Brand Context format if we ever want structured-data exports.

> INPUT VARIABLES:
>
> Target Brand Name: [INSERT BRAND NAME HERE]
> Target URL: [INSERT URL HERE]
> Hero Product (if known): [INSERT PRODUCT NAME OR "FLAGSHIP"]
>
> Role: Act as a Senior Performance Creative Strategist at a DTC ad agency. You specialize in building static ad creative across 15 proven ad formats. Your job is to extract every piece of usable information from a brand's public presence so a designer can produce ads without needing to ask a single follow-up question.
>
> Objective: Build a comprehensive "Ad Creative Research Brief" for the Target Brand, covering brand identity, product details, proof points, competitive positioning, and founder narrative. This brief will fuel the generation of static ads across these 15 formats: Before & After, Bullet Points, Carousel, Features & Benefits, Founder Story, Handwriting, Negative Marketing, New Creative Formats, News, Press, Social Proof, Statistics, Testimonial, UGC, Us vs Them.
>
> PHASE 1: BRAND IDENTITY & VISUAL SYSTEM
>
> Search the web for:
> - "[Brand] brand guidelines pdf"
> - "[Brand] press kit" or "media kit"
> - "[Brand] design agency case study" or "who designed [Brand] branding"
> - "[Brand] font" or "what font does [Brand] use"
> - "[Brand] hex color codes"
>
> Visit the Target URL and analyze.
>
> Output as JSON:
> ```
> {
>   "brand_identity": {
>     "name": "",
>     "tagline": "",
>     "mission_statement": "",
>     "design_agency": "Name or 'Unknown'",
>     "voice_adjectives": ["", "", ""],
>     "tone_notes": "How they talk to customers",
>     "banned_language": "Words/phrases they clearly avoid or that would feel off-brand"
>   },
>   "visual_system": {
>     "primary_font": "Exact or best guess",
>     "secondary_font": "Exact or best guess",
>     "primary_color_hex": "",
>     "secondary_color_hex": "",
>     "accent_color_hex": "",
>     "background_preference": "white / cream / dark / colorful",
>     "imagery_style": "e.g., clean studio, lifestyle, grainy film, clinical, editorial",
>     "ui_shapes": "rounded / sharp / mixed",
>     "logo_url_or_description": ""
>   }
> }
> ```
>
> PHASE 2: PRODUCT INTELLIGENCE
>
> Focus on the Hero Product (or their best-seller if not specified).
>
> Search the web for:
> - "[Brand] [Product] ingredients" or "what's in [Brand]"
> - "[Brand] [Product] how it works"
> - "[Brand] vs [competitor]"
> - "[Brand] [Product] review" on Reddit, Amazon, TrustPilot
>
> Output as JSON:
> ```
> {
>   "product_details": {
>     "product_name": "",
>     "product_type": "",
>     "price": "",
>     "price_per_unit_or_serving": "",
>     "hero_claim": "The single biggest promise on the product page",
>     "how_it_works": "1-2 sentence plain-English explanation",
>     "key_ingredients_or_specs": [
>       {"name": "", "benefit": ""}
>     ],
>     "form_factor": "",
>     "usage_instructions": "",
>     "offer_details": {
>       "current_offer": "",
>       "subscription_discount": "",
>       "free_shipping_threshold": "",
>       "guarantee": ""
>     }
>   }
> }
> ```
>
> PHASE 3: PROOF POINTS & SOCIAL PROOF
>
> Search the web for:
> - "[Brand] clinical study" or "[Brand] clinically proven"
> - "[Brand] reviews" on TrustPilot, Amazon, their own site
> - "[Brand] before and after results"
> - "[Brand] celebrity" or "[Brand] endorsed by"
> - "[Brand] featured in" or "[Brand] as seen on"
>
> Output as JSON:
> ```
> {
>   "statistics_and_data": [
>     {"stat": "", "source": "", "context": ""}
>   ],
>   "press_mentions": [
>     {"publication": "", "quote_or_headline": "", "date": ""}
>   ],
>   "testimonials": [
>     {"quote": "", "name": "", "detail": ""}
>   ],
>   "review_metrics": {
>     "average_rating": "",
>     "total_reviews": "",
>     "platform": ""
>   },
>   "notable_endorsements": [],
>   "certifications_or_badges": []
> }
> ```
>
> PHASE 4: TRANSFORMATION & PAIN POINTS
>
> Output as JSON:
> ```
> {
>   "customer_pain_points": [
>     {"pain": "", "intensity": "mild / moderate / severe", "current_bad_solution": ""}
>   ],
>   "transformation_claims": [
>     {"before_state": "", "after_state": "", "timeframe": "", "proof_type": ""}
>   ],
>   "emotional_triggers": [],
>   "target_audience": {
>     "primary_demo": "",
>     "psychographic": "",
>     "life_stage": ""
>   }
> }
> ```
>
> PHASE 5: COMPETITIVE POSITIONING
>
> Search for:
> - "[Brand] vs" (autocomplete reveals top competitors)
> - "[Brand] alternative"
> - Direct competitor websites for pricing and claims
>
> Output as JSON:
> ```
> {
>   "competitive_landscape": {
>     "top_competitors": [
>       {"name": "", "price": "", "key_weakness": "", "common_comparison_point": ""}
>     ],
>     "unique_differentiators": [],
>     "category_conventions": "",
>     "us_vs_them_angles": [
>       {"them": "", "us": "", "why_it_matters": ""}
>     ]
>   }
> }
> ```
>
> PHASE 6: FOUNDER & ORIGIN STORY
>
> Search for:
> - "[Brand] founder" or "who founded [Brand]"
> - "[Brand] founder interview" or "[Brand] founder podcast"
> - "[Brand] origin story"
>
> Output as JSON:
> ```
> {
>   "founder_story": {
>     "founder_name": "",
>     "founder_title": "",
>     "origin_hook": "",
>     "personal_pain_point": "",
>     "credibility_marker": "",
>     "quotable_moment": "",
>     "mission_beyond_product": ""
>   }
> }
> ```
>
> PHASE 7: AD-READY HOOKS & ANGLES
>
> Based on everything above, generate ready-to-use hooks for each ad type:
>
> ```
> {
>   "ad_hooks": {
>     "before_after": ["3 hooks that set up a transformation"],
>     "bullet_points": ["3 sets of 3-5 bullet point groupings"],
>     "negative_marketing": ["3 contrarian or 'reasons NOT to buy' hooks"],
>     "news_hooks": ["3 hooks styled as breaking news or urgent updates"],
>     "handwriting_hooks": ["3 short, punchy, handwritten-note-style hooks"],
>     "us_vs_them_hooks": ["3 comparison framings"],
>     "statistic_hooks": ["3 data-led hooks"],
>     "social_proof_hooks": ["3 hooks leveraging reviews, endorsements, or user counts"],
>     "press_hooks": ["3 hooks leveraging media mentions"],
>     "testimonial_hooks": ["3 hooks built around a customer quote"],
>     "founder_story_hooks": ["3 hooks that open with the founder's story"],
>     "features_benefits_hooks": ["3 hooks that lead with a feature and land on a benefit"],
>     "ugc_hooks": ["3 hooks written in customer voice, casual first-person"],
>     "carousel_angles": ["3 multi-slide narrative arcs"],
>     "new_format_hooks": ["3 experimental or pattern-interrupt concepts"]
>   }
> }
> ```

---

### Downloaded Assets

**Headline Template** (`will_sartorius_headline_template.md`): Three styles (A: Product hero with headline, B: Lifestyle context with headline, C: Typography-dominant). Each style includes copy template with word count constraints, full NanoBanana 2 image generation prompt with placeholders for brand, product, persona, safe zones, typography, and variation vectors. Also includes global rules: visual-headline coherence test (CRITICAL — "cover the headline, does the image hint at the same idea?"), Agent 7 Copy Editor checklist (grammar, spelling, punctuation, banned characters, number consistency, duplicate content, word count compliance, brand name capitalization), "price is not a default element," "fewer elements by default," and what to avoid list.

**Ad-Swipe System** (`will_sartorius_ad_swipe.md`): Full 3-stage system. Stage 1 deconstructs a competitor ad into structured JSON (layout analysis, typography extraction, color/mood extraction, copy extraction, editorial judgment). Stage 2 rebuilds using your brand's spec cards and copy. Stage 3 generates copy matched to persona/angle/emotion and passes the Copy Editor checklist. Includes a complete rebuild prompt template with safe zone specs and brand identity sections.

### Key Quotes from Will's Session

On prompting philosophy:
> "The last time I read a full prompt was probably two years ago. I really don't read prompts in-depth, and that's because oftentimes what I'm doing is I'm taking my end result product, putting it back into Claude, and having it refine the prompt."

On NanoBanana 2 vs Pro:
> "NanoBanana Pro was very good at filling in holes and making assumptions. NanoBanana 2 is not good at making assumptions. When in doubt, over-communicate."

On spec cards vs text descriptions:
> "When you tell NanoBanana in your prompt 'this is the hex code' or 'this is my font' — it has no fucking idea what you're talking about. Unless you're using Times New Roman. If it can *see* your font or *see* your colors, it can recreate it."

On format templates:
> "Think of this like a recipe card. If someone hands you a cookbook, you'll have a much better sense of what to cook. But if someone said 'make chicken teriyaki for me,' you'd be like, I don't know where to start."

On creative agency:
> "The best AI creatives you're gonna get is gonna come from a creative mind. AI is not deciding which persona, angle, emotion to target. The creative strategists are."

On the minimal tool stack:
> "Claude Chat and Gemini. That's all you need. You can even have the free version of Claude Chat."

On AI video perception:
> "We don't use AI UGC because I'm morally opposed to it. When it comes to AI video, if you lean into it and make it like 'this is an AI video' and don't try to hide it, that is a safe bet."

On iteration expectations:
> "People assume AI is just going to give a great result immediately. When it comes to statics, yes, we are there. When it comes to videos and GIFs, we're getting there."

### Tool Stack (Will's recommended + our adaptation)

| Tool | Role | Cost | Notes |
|---|---|---|---|
| Claude Code | Orchestration, briefing, copy generation, prompt engineering, scoring agents | Opus 4.6 subscription | We're already here |
| fal.ai — NanoBanana 2 (`/edit`) | Image generation with reference image upload | ~$0.08/image at 1K, $0.12 at 2K, $0.16 at 4K | Up to 14 reference images, 1-4 images/gen, `image_urls` param |
| fal.ai — Veo 3.1 (`/first-last-frame-to-video`) | Static-to-video animation | ~$1.60/8s video at 1080p ($0.20/s), fast tier $0.80 ($0.10/s) | Start + end frame → video, fully API-driven |
| fal.ai — Veo 3.1 (`/image-to-video`) | Single image animation | Same pricing | When only one frame exists |
| Playwright (local) | HTML → PNG conversion for spec cards | Free (already installed) | Headless Chrome screenshots |
| ffmpeg (local) | MP4 → GIF conversion for animated ads | Free (already installed) | Post-processing for Meta upload |

**Will also recommended:** Google Labs/Flow for Veo 3.1 (web UI) and Gemini direct for free single-image generation. We don't need either — fal.ai covers both via API.

**Other fal.ai models available as fallbacks:**
- Kling O3 Standard — start/end frame video, alternative to Veo 3.1
- Seedance 2.0 (ByteDance) — start/end frame + native audio
- Sora 2 (OpenAI) — image-to-video
- NanoBanana Pro — previous gen model, better at "filling gaps" (useful when NB2 is too literal)

### Will's Contact / Resources

- Newsletter: SelfStack (selfgen.co/sub-home) — weekly on Fridays, AI workflows and prompts
- Agency: Self Made (selfmade.co)
- Skipper: getskipper.ai (beta — automated persona discovery from reviews)
- LinkedIn: linkedin.com/in/willsartorius/
- Consulting: calendly.com/selfmade-discovery/will-sartorius-ai-creative-consulting-call

---

## Differences from Our Current System

### What we gain
1. **Visual spec cards as generation references** — the single biggest quality unlock for AI image generation
2. **Format recipe cards with generation prompts** — bridges strategy (our criteria) to production (NanoBanana 2 prompts)
3. **Scored copy iteration loop** — systematic quality assurance beyond pass/fail
4. **Structured competitor ad reverse engineering** — turns analysis into production-ready prompts
5. **Static-to-video/GIF pipeline** — new format with lower CPMs, fully API-driven via fal.ai Veo 3.1 (start + end frame → video)
6. **Format multiplication** — automated variant expansion from winning concepts
7. **Single API for everything** — fal.ai handles image generation (NB2), video animation (Veo 3.1), and has fallback models (Kling, Seedance, Sora 2). One API key, one wrapper, one integration

### What we keep (stronger than Will's)
1. **Brand Research Pipeline** — our Phases 0-7 with auto-gates, review classification, persona discovery, and spec card generation is leagues beyond his web scrape extraction
2. **VoC integration** — every angle, objection, and journey-map stage traces to verbatim review quotes with review_id. His system uses personas but doesn't enforce VoC traceability. The 5-bucket VoC extraction (Pain Points, Trigger Moments, Objections, Transformations, Standout Language) gives us structured source material for copy — especially the Standout Language bucket for verbatim phrases
3. **Creative Strategy Matrix + Three Selves** — Pain × Persona × Messaging Angle × 5 Awareness Stages as the strategic scaffolding, with Three Selves (Actual/Ideal/Ought) as the orthogonal targeting lens. He works with persona/angle/emotion, which is simpler. Our matrix gives explicit cell assignments for each concept; our Three Selves gives precision in emotional register
4. **Criteria system** — 6 criteria docs covering copy, headlines, video, native, long-form, and creative image ads. His system has format templates but not the same depth of rules. Plus the Hook Quality Bar (5-test gate, 12-item anti-pattern list, character constraints) which catches dead hooks before they enter a scoring loop
5. **3-tier QA + structured gates** — brief-writer sub-agent (with scoring-evaluator sub-agent for scored iteration, 2-3 briefs per group), orchestrator (slimmed to 3 cross-brief checks for static), main session critique. His scoring agents are one tier. We integrate his scoring into our Tier 1 via a dedicated evaluator sub-agent spawned from within brief-writer, add the 4-Question Gate as fast-fail triage and the Hook Quality Bar as a pre-scoring check, and keep the orchestrator + critique layers above it
6. **ClickUp integration** — loading briefs to the design team. His system ends at generation; ours continues through delegation
7. **Concept Validation + Diversity Audit** — the 7-test quality bar and differentiation rule (shift ≥2 of 4 axes) catch weak or duplicative concepts before creative production starts. The 5-dimension Creative Diversity Audit checks portfolio balance across batches. His system has no equivalent concept-level or portfolio-level quality gates

### The hybrid — two workflows, one criteria system

**Brief writing and image generation are separate workflows with a shared criteria foundation.**

1. **Batch flow (brief writing)** changes production method but not overall shape: batch plan → concept validation → Tier 0 → brief-writer sub-agents × ~5 in parallel (2-3 briefs each, each brief scored to 90+ by scoring-evaluator sub-agent on 7 dimensions, structural checks stay pass/fail, within-group cross-check) → orchestrator QA (3 cross-brief checks: product spec, fabricated stats, compounding rule) → main session critique → strategist approval → ClickUp. Two changes from the pre-Statics-Generator flow: brief-writer gains Agent tool and multi-brief grouping (enables scoring loop + within-group cross-checking), and the orchestrator slims to 3 batch-level checks instead of 14+ category sweeps (the scoring loop handles everything within-brief).

2. **Generation pipeline (image generation)** is a separate on-demand workflow triggered by `/generate-static`: approved brief → NB2 prompt conversion via format template → fal.ai API → 4 image variants → strategist picks. The generation pipeline reads the approved brief's copy — it doesn't re-evaluate it. For standalone generations (no prior brief), the scoring loop runs inline.

**The criteria docs are the single source of truth for both workflows.** The scoring agents read our criteria docs as rubrics (not separate rules). The format templates read our criteria docs for copy constraints (not separate copy rules). When a rule gets promoted to a criteria doc via the compounding rule, both workflows pick it up automatically.

**`/statics-briefer` is deprecated.** The Creative Strategy Matrix (Pain × Persona × Messaging Angle × 5 Awareness Stages + Three Selves) replaces the TEEP stages and Emotional Zones that `/statics-briefer` referenced. `/generate-static` is the new command.

---

## System Integration Changes

Changes to existing system docs required for the Statics Generator to integrate cleanly. These edits happen during implementation, not as a pre-requisite.

### CLAUDE.md — Multiple updates

**1. Add Statics Generator trigger section** (after "Critiquing a Batch"):

**Triggers:** "generate a static," "generate this brief," "create ad images," "run the generation pipeline," "convert this brief to NB2," "generate spec cards for [Brand]," "swipe this ad," "multiply this format," "animate this static," anything involving NanoBanana 2, fal.ai, or AI image generation for ads.

**When triggered, read `00 Global/Statics Generator/Overview.md`** — it contains the two-workflow architecture (batch flow for briefs, generation pipeline for images), the format template system, scoring agent integration, fal.ai API usage, spec card generation, ad-swipe system, animation pipeline, and format multiplication.

**Hard rules:**
- Generation pipeline and batch flow are separate workflows. Briefs are written via the batch flow; images are generated on demand via `/generate-static`.
- Format templates are NB2 rendering specs, not brief-writing criteria. Brief quality rules stay in `00 Global/Criteria/`.
- Scoring agents read our criteria docs as rubrics — never duplicate rules into rubric files.
- Spec cards are generated once per brand. Check `[Brand]/00 Context/` for existing spec cards before regenerating.

**2. Update "Writing Briefs" section** — brief-writer upgrade:

- Routing rule: change "Full drafts and multi-finding fix passes across multiple briefs → `brief-writer` sub-agent (per-brief, parallel)" to "Full drafts and multi-finding fix passes → `brief-writer` sub-agent (2-3 briefs per sub-agent, grouped by format or topic, parallel, with scoring loop)."
- 3-tier QA note: change "Writer sub-agents self-audit before returning" to "Writer sub-agents write + score each brief (scoring-evaluator sub-agent iterates copy to 90+ on 7 dimensions), cross-check within group, then return. Orchestrator runs 3 cross-brief checks (product spec, fabricated stats, compounding rule)."
- Path reference: `.claude/agents/brief-writer.md` stays the same (no skill conversion).
- Scoring agents hard rule: "Scoring rubric files in `00 Global/Statics Generator/Scoring Agents/` are the canonical source. The scoring-evaluator sub-agent reads them each run — never duplicate criteria-doc rules into rubric files."

**3. Update "Researching a New Brand" section:**

- Change all references from "Phases 0–6" to "Phases 0–7" (spec card generation is the new Phase 5).

### Critique Methodology - Static — Tier 1/2 flow updates

**Tier 1:**
- Body: "The `brief-writer` sub-agent (defined at `.claude/agents/brief-writer.md`) produces one brief per invocation" → "produces 2-3 briefs per invocation (grouped by format or topic)"
- "dispatches one `brief-writer` sub-agent per row in the Batch Plan, in parallel" → "dispatches ~5 `brief-writer` sub-agents in parallel, each handling 2-3 Batch Plan rows grouped by format or topic. Each sub-agent writes each brief, runs Hook Quality Bar + 4-Question Gate, spawns scoring-evaluator sub-agent for copy iteration (7 dimensions, 90+ threshold, cap 5 iterations), runs structural pass/fail checks, cross-checks within its group, and returns an evidence report covering all briefs in the group."
- Evidence report: format updated to include scoring history (which dimensions failed on which iterations) alongside structural results.

**Tier 2 — slimmed to 3 cross-brief checks:**
- Remove from category sweeps: headline framings unique, CTA repetition, References format consistency, "Image to generate" compliance, Mandatory Disclaimer placement, commit-to-one-option, Diagram Example, Designer Note discipline, per-format checklist, per-platform overlay, brand compliance — all now handled by the brief-writer's scoring loop (Format Compliance + Copy Editor + Brand Compliance dimensions).
- Keep 3 checks only: product spec phrasing consistency, fabricated stats/URLs, compounding rule scan.
- Fix-pass for product spec: orchestrator fixes directly via Edit (mechanical replacement using Working Document canonical phrasing). Fix-pass for fabricated stats: dispatches to brief-writer with `mode=fix` (writer needs to find a real source or rewrite). Compounding rule: returns candidates to main session (no fix, just flagging).

**Four-Question Gate integration (§ "How the gate integrates with tiered QA"):**
- "Tier 2 orchestrator re-runs the gate as the first category sweep" → remove for static batches. The 4-Question Gate now runs inside the brief-writer (pre-scoring and post-scoring). The orchestrator no longer re-runs it for static. For video batches, the orchestrator still re-runs the gate.

**Cross-Batch Checks section (§ "Cross-Batch Checks (Orchestrator Tier)"):**
- Slim from 10 checks to 3 for static: keep product spec phrasing, fabricated stats/URLs, and (implicitly) compounding rule. Remove headline framings, References format, "Image to generate" compliance, Mandatory Disclaimer, brand compliance, CTA repetition, Diagram example, Designer Note discipline. Note: this section is a standalone reference that mirrors the orchestrator's Step 2 — both must stay in sync.

### Batch Template — Multi-brief grouping + slimmed orchestrator

**Step 9 (Tier 1):**
- "Remaining scripts/briefs produced in parallel by writer sub-agents" → "Scripts produced in parallel by script-writer sub-agents (1 per script). Briefs produced in parallel by brief-writer sub-agents (2-3 briefs each, grouped by format or topic, with scoring-evaluator iteration loop)."

**Step 10 (Tier 2):**
- For video: unchanged (full category sweeps, fix-passes to script-writer).
- For static: "orchestrator runs 3 cross-brief checks (product spec consistency, fabricated stats, compounding rule scan). Product spec fixes applied directly via Edit. Fabricated stat fixes dispatched to brief-writer. Compounding rule candidates returned to main session."

### Critique-Orchestrator — Slimmed scope for static batches

Update `.claude/agents/critique-orchestrator.md`:

- Description: update to reflect slimmed static batch scope.
- `writer_agent` contract: `writer_agent: script-writer (video batches) | brief-writer (static batches)` — stays symmetric.
- Step 1 (evidence reports): unchanged — collected from sub-agent return values for both batch types.
- Step 2 (category sweeps): for static batches, run only 3 checks: product spec phrasing consistency (canonical from Working Document), fabricated stats/URLs (every cited stat/study/percentage must have a verifiable source), compounding rule scan (any scoring dimension that required 2+ iterations across 3+ briefs → candidate for criteria promotion). For video batches, unchanged (full sweep set).
- Step 5 (dispatch fix passes): for static, product spec → Edit directly, fabricated stats → dispatch to brief-writer with `mode=fix`, compounding rule → return candidates (no fix). For video, unchanged.

### Batch Template — Add Format Multiplication exemption

Add to the Differentiation Rule section in [[Batch Template]]:

> **Format Multiplication exemption:** Variants produced by Format Multiplication (same concept rebriefed across format templates — same persona, same angle, same awareness stage, different visual format) are exempt from the differentiation rule. They shift only 1 of 4 axes by design. Format Multiplication is a production efficiency tool (extend a winning concept across formats), not a creative diversity tool (generate distinct creative bets). Multiplied variants are still subject to the Creative Diversity Audit's Format Spread dimension — if 80% of the static portfolio is headline ads, multiplication should prioritize non-headline formats.

### System Overview — Add Statics Generator entry

Add to the "What's Built and Working" → "Tools" table in [[System Overview]]:

> | **`/generate-static`** | Converts approved briefs to NB2 prompts, generates images via fal.ai (NanoBanana 2), animates statics via Veo 3.1. Supports standalone generation, ad-swipe, and format multiplication. | `00 Global/Hermes/Commands/generate-static.md` + `00 Global/Hermes/Tools/fal-ai/` + `00 Global/Statics Generator/` |

Also move the "Auto-generation of static ad images via API" entry from "What's NOT Built Yet" to "What's Built and Working" once implementation is complete.

Also deprecate `/statics-briefer` in the "Creative Skills" table — remove or mark deprecated. `/generate-static` is the replacement.

### Brand Research Pipeline — Add Phase 5 (Spec Card Generation)

Add a new Phase 5 (Spec Card Generation) after Phase 4 deep synthesis completes Brand Context. Generates Brand Spec Card.png and Visual Style Card.png from Brand Context + ads analysis via HTML → Playwright screenshot → PNG. Current Phase 5 (Automated QA) becomes Phase 6; current Phase 6 (Cleanup) becomes Phase 7. Brand Research becomes Phases 0–7 total. CLAUDE.md references to "Phases 0–6" update to "Phases 0–7." Also available standalone for brands with existing research.

Update Brand Research §2 folder structure to include spec card PNGs in `00 Context/`:

```
[Brand]/
├── 00 Context/
│   ├── Brand Context - [Brand].md
│   ├── Product Context - [Brand].md
│   ├── Persona Context - [Brand].md
│   ├── Persona Summary - [Brand].md
│   ├── Brand Spec Card.png              ← generated Phase 5 (or standalone)
│   └── Visual Style Card.png            ← generated Phase 5 (or standalone)
```

Note the load-tier distinction: spec card PNGs are loaded by the generation pipeline (`/generate-static`), not by writer sub-agents during batch execution. Writer sub-agents continue loading only the markdown context docs.

### `/statics-briefer` — Deprecate

Remove the `/statics-briefer` skill definition. The Creative Strategy Matrix replaces the TEEP stages and Emotional Zones it referenced. `/generate-static` is the replacement command.

---

## Implementation Log — 2026-04-25

Everything above has been built. File-by-file record of what was created or modified:

**New files — Statics Generator system (`00 Global/Statics Generator/`)**
- `Overview.md` — central system doc (two-workflow architecture, NB2 rules, safe zones, prompt checklist)
- `Brand Spec Card Prompt.md` — prompt + Playwright command to generate Brand Spec Card PNG
- `Visual Style Card Prompt.md` — prompt + Playwright command to generate Visual Style Card PNG
- `Ad-Swipe System.md` — 3-stage competitor reverse engineering (Deconstruct → Rebuild → Copy Generation)
- `Animation Pipeline.md` — 6-step static-to-video workflow via Veo 3.1, all 4 prompt templates, ffmpeg GIF conversion
- `Format Multiplication.md` — winning-brief multiplication across format templates, differentiation exemption, portfolio balance

**New files — Format templates (`00 Global/Statics Generator/Templates/`)**
- `Headline.md` — 3 styles (Product Hero, Lifestyle Context, Typography-Dominant)
- `Us vs Them.md` — 2 styles (Side-by-side split, Stack comparison)
- `Features & Benefits.md` — 3 styles (Radiating callouts, Horizontal strip, Grid layout)
- `Testimonial.md` — 3 styles (Quote card, Quote over lifestyle, Star rating)
- `Statistics.md` — 3 styles (Single stat hero, Multi-stat, Before/after stat)
- `Before-After.md` — 3 styles (Side-by-side, Timeline, Overlay/reveal)

**New files — Scoring agents (`00 Global/Statics Generator/Scoring Agents/`)**
- `Persona Fit.md`, `Awareness Stage Alignment.md`, `Messaging Angle Coherence.md`, `Three Selves.md`, `Brand Compliance.md`, `Format Compliance.md`, `Copy Editor.md` — 7 rubrics, 0–100 scoring, Copy Editor has veto power

**New files — Sub-agent + tools**
- `.claude/agents/scoring/scoring-evaluator.md` — single sub-agent reads all 7 rubrics per invocation (75 calls/batch vs 525)
- `00 Global/Hermes/Tools/fal-ai/upload.js` — uploads local files to fal.ai storage, returns public URLs
- `00 Global/Hermes/Tools/fal-ai/generate-image.js` — NanoBanana 2 via `fal-ai/nano-banana-2/edit`, 4 variants default
- `00 Global/Hermes/Tools/fal-ai/generate-video.js` — Veo 3.1 image-to-video + first-last-frame-to-video
- `00 Global/Hermes/Tools/fal-ai/package.json` — ESM module, `@fal-ai/client` + `dotenv`
- `00 Global/Hermes/Tools/fal-ai/.env.example` — template for API key
- `00 Global/Hermes/Commands/generate-static.md` — `/generate-static` slash command (4 entry modes)

**Modified files — System integration**
- `CLAUDE.md` — added Statics Generator trigger section, updated vault structure tree, updated brief-writer routing + QA notes, updated Brand Research phase references (0–6 → 0–7)
- `.claude/agents/brief-writer.md` — full rewrite: multi-brief grouping (2–3 per invocation), Agent tool added, 6-step scoring pipeline, within-group cross-check, updated evidence report format
- `.claude/agents/critique-orchestrator.md` — slimmed static scope to 3 cross-brief checks (product spec, fabricated stats, compounding rule)
- `00 Global/Process/Critique Methodology - Static.md` — Tier 1 scoring pipeline, Tier 2 slim sweep, 4-Question Gate moved inside brief-writer
- `00 Global/Process/Batch Template.md` — step 9/10 updated for multi-brief grouping + static vs video branch, Format Multiplication exemption added
- `00 Global/Process/System Overview.md` — added `/generate-static` to Tools table, deprecated `/statics-briefer`, updated "Auto-generation" section to note it's built
- `00 Global/Process/Brand Research.md` — inserted Phase 5 (Spec Card Generation), renumbered Phase 5→6 (QA) and Phase 6→7 (Cleanup), updated all cross-references, added spec card PNGs to §2 folder structure
- `.claude/agents/brand-researcher.md` — description updated (Phases 0–7, spec card generation)

**Not done**
- `/statics-briefer` skill file — marked deprecated in System Overview but the file itself wasn't removed/modified (exists at global `~/00 Global/Hermes/Commands/` level, outside this project)

---

## Post-Implementation Audit Fix — 2026-04-25

Full audit found 1 critical issue, 2 minor issues, and 1 missing env file. All fixed:

**Critical — `.claude/agents/brand-researcher.md` phase numbering**
- Agent body was missing Phase 5 (Spec Card Generation) entirely — description said Phases 0–7 but body jumped from Phase 4 to QA
- Added full Phase 5 section: reads spec card prompts, gathers brand sources, generates HTML, screenshots via Playwright, saves PNGs to `00 Context/`
- Renumbered Phase 5 (Automated QA) → Phase 6, Phase 6 (Cleanup) → Phase 7
- Fixed 8 internal cross-references (lines 46, 66, 599, 604, 607, 614, 618 + Checkpoint 3 rejection routing)
- Added spec card rejection route to Checkpoint 3 routing table

**Minor — `00 Global/Statics Generator/Templates/Headline.md` compliance section**
- Added terminal `## Compliance` section matching the format used by all other 5 templates (compliance info was in the preamble but not at the scannable terminal position)

**Minor — `00 Global/Hermes/Tools/fal-ai/upload.js` dead import**
- Removed unused `fileURLToPath` import from `"url"`

**Env — `00 Global/Hermes/Tools/fal-ai/.env`**
- Created with `FAL_KEY` from strategist. Image and video generation now functional.
