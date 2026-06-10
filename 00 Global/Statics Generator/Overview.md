# Statics Generator — System Overview

AI-generated static ad production at scale. Three coordinated workflows share one criteria foundation.

**Source:** Adapted from Will Sartorius (Self Made Agency / Skipper) — Motion Bootcamp "Motion Foundations" session, April 2026. Extended with Reach Digital's Creative Strategy Matrix, Three Selves, VoC review pipeline, and 3-tier QA.

---

## Three Workflows

### 1. Batch Flow (Brief Writing)

The existing batch production pipeline with scoring upgrades:

```
Batch Plan → Concept Validation → Tier 0 Plan Critique
  → brief-writer sub-agents × ~5 (parallel, 2-3 briefs each)
    Each brief:
      write → Hook Quality Bar → 4-Question Gate
      → scoring-evaluator sub-agent (7 dimensions, iterate to 90+, cap 5)
      → 4-Question Gate post-scoring → structural pass/fail checks
    After group: within-group cross-check → evidence report
  → Tier 2 orchestrator (3 cross-brief checks)
  → Tier 3 main session critique
  → ClickUp
```

Brief quality rules stay in `00 Global/Criteria/`. The scoring agents read those docs as rubrics — no duplication.

### 2. Generation Pipeline (Image Generation)

Triggered on demand via `/generate-static`. Converts approved briefs into generation-ready prompts and produces images via fal.ai. Supports two models — NanoBanana 2 (NB2) and GPT Image 2 — auto-selected per brief content.

```
Approved brief (from batch flow)
  → Load brand spec cards + format template
  → Auto-select model (NB2 or GPT) based on brief content signals
  → Convert brief copy to model-specific prompt (via format template rendering specs)
  → fal.ai API call (selected model endpoint + reference images)
  → 4 image variants generated
  → Strategist picks best, iterates if needed

Standalone generation (no prior brief):
  → Generate brief inline using format template
  → Hook Quality Bar → 4-Question Gate → Scoring loop (90+)
  → Auto-select model → Convert to prompt → fal.ai → 4 variants
```

**The generation pipeline reads approved copy — it does not re-evaluate it.** Standalone generations run the scoring loop inline but trade QA depth for speed (no Concept Validation, no Tier 0/2/3).

### 3. Creative Hero Pre-Pass (Optional)

Triggered only when the strategist explicitly requests creative image static ads or invokes `/creative-image`. Produces an original standalone hero visual before the normal layout and final-composition pass.

Treat "creative static ads," "creative images," and "creative image ads" as explicit aliases for this opt-in workflow unless the strategist says they mean ordinary designed statics.

```
Pain point / trigger event / outcome / mechanism
  → Deepen angle understanding
  → Generate diverse visual concepts
  → Strategist selects concepts to render
  → Generate text-free hero-image variants via fal.ai
  → Strategist approves and iterates hero
  → Pass approved hero image into /generate-static as a reference
  → Build final composition with any appropriate existing format template
```

This is additive. Do not auto-route ordinary statics into this workflow. Infographic, educational, comparison, statistics, and other existing templates remain available for the final layout.

See `Creative Hero Workflow.md` and `Creative Hero Prompting Playbook.md`.

---

## Components

### Brand Spec Cards

Visual reference PNGs uploaded to NanoBanana 2 so it can *see* fonts, colors, and brand identity. Text prompts with hex codes and font names don't work — the model needs visual specimens.

| Card | Content | Source |
|---|---|---|
| **Brand Spec Card** | Logos, all fonts with visual specimens, brand colors with hex swatches, CTA styling, typography do's/don'ts | Brand Context.md + brand guidelines (if available) + site CSS inspection |
| **Visual Style Card** | Photography direction, styling rules, founder quote, example ad layout, visual do's/don'ts | Ads analysis + brand context + top spender patterns |

Generated once per brand via HTML → Playwright screenshot → PNG. Stored at `[Brand]/00 Context/Brand Spec Card.png` and `Visual Style Card.png`.

**Trigger model:**
1. Part of brand research — new Phase 5, after Phase 4 deep synthesis produces Brand Context
2. Standalone — `generate spec cards for [Brand]` for brands with existing research

See `Brand Spec Card Prompt.md` and `Visual Style Card Prompt.md` for the generation prompts.

### Format Templates

NB2 rendering specs — "recipe cards" that translate an approved brief into a generation-ready prompt. Each template includes composition layout, typography placement, safe zones, variation vectors, and a compliance line pointing to the relevant criteria doc.

**Templates are rendering specs, not brief-writing criteria.** Copy quality rules stay in `00 Global/Criteria/`. The template references them with a compliance line, not duplicates them.

| Template | Models | Status |
|---|---|---|
| `Templates/Headline.md` | Both | Built (5 styles: product hero, lifestyle context, typography-dominant, data visualization, lifestyle + UI cards) |
| `Templates/Us vs Them.md` | Both | Built (2 styles: side-by-side split, stack comparison) |
| `Templates/Features & Benefits.md` | Both | Built (5 styles: product center radiating, horizontal strip, grid, portrait + data fusion, category inventory) |
| `Templates/Testimonial.md` | Both | Built (4 styles: quote card, lifestyle quote, star rating, portrait + data-backed quote) |
| `Templates/Statistics.md` | Both | Built |
| `Templates/Before-After.md` | Both | Built |
| `Templates/UGC TikTok.md` | GPT only | Built (2 styles: TikTok UI, IG Story UI) |
| `Templates/Handwriting.md` | GPT only | Built (3 styles: Post-It note, handwritten letter, whiteboard) |
| `Templates/Instagram Stories Q&A.md` | Both | Built |
| `Templates/Reverse Psychology.md` | Both | Built |
| `Templates/Search List.md` | Both | Built |
| `Templates/Visual Elements.md` | Both | Built — shared rendering specs for data cards, trend lines, category pills, social proof badges, glassmorphism cards, selective emphasis |
| Bullet Points, Social Proof, Press, News, Founder Story, Carousel, Negative Marketing | — | Deferred — add when a client needs them |

### Creating a New Template

Write a single `.md` file in `Templates/`. No system changes needed. Structure per style:

1. **Header** — format description, `**Models supported:** Both | GPT only | NB2 only`, copy quality rules links, scoring gate reference
2. **Per style:**
   - `#### Copy template` — what copy the format needs
   - `#### Strategic inputs` — persona, awareness stage, Three Selves, photography direction
   - `#### NB2 Image Generation Prompt` — freeform 1,000-1,500 word prompt with NB2 safe zones (skip if GPT only)
   - `#### GPT Image 2 Prompt` — structured SCENE → TYPOGRAPHY → COPY TO RENDER → PRODUCT FIDELITY, starts with "Prepend the E+ Safe Zone Block from [[GPT Image 2 Block]]", ends with GPT Universal Rules (skip if NB2 only)
   - `**Model preference:**` note — use the Decision Matrix above to assign. Human subjects / platform UI / handwriting → GPT. Strict product geometry → NB2. Both when either model works.
   - `#### Variation vectors` — table of options that apply to both models
3. **Global rules** — format-specific quality rules
4. **Compliance** — link to criteria docs

Use an existing template as the structural reference (Headline.md for "Both" templates, UGC TikTok.md for "GPT only").

### Format References

Competitor and aspirational ad references stored at `00 Global/Statics Generator/References/`. Analyze them for reusable design principles and encode those principles into prompt text. Do not upload competitor references to the generation models. Approved own-brand outputs and approved creative heroes are the visual references used for composition lock.

Primary sources: Function Health, Juniper (medical weight loss). 13 references covering data visualization overlays, portrait + data fusion, category inventories, glassmorphism UI cards, testimonial + data proof, and native social formats.

### Scoring Agents

Seven scoring dimensions that replace pass/fail checks in Tier 1. Each rubric file defines what the dimension evaluates, which criteria docs it reads, scoring calibration (60/80/95 examples), instant-fail triggers, and actionable feedback format.

| Rubric | Dimension | Criteria Docs Read |
|---|---|---|
| `Persona Fit.md` | Copy speaks to the pain-trigger persona using VoC language | Persona Context, Review Analysis (Standout Language) |
| `Awareness Stage Alignment.md` | Copy matches intended awareness stage tactics | Creative Strategy Matrix, Headline & Text Hook Criteria |
| `Messaging Angle Coherence.md` | Copy delivers the specified messaging angle's core truth | Creative Strategy Matrix, Persona Deep Research |
| `Three Selves.md` | Targeted self (Actual/Ideal/Ought) consistent throughout | Creative Strategy Matrix |
| `Brand Compliance.md` | Every claim passes brand guardrails | Brand Compliance/Guardrails in 00 Context/ |
| `Format Compliance.md` | Copy fits format constraints | Creative Image Ad Criteria + Brief Structure + format template |
| `Copy Editor.md` | Grammar, banned constructions, formatting. **Veto power.** | Universal Copy Rules, Headline & Text Hook Criteria |

**One evaluator, not seven agents.** The `scoring-evaluator` sub-agent (formerly at `.claude/agents/scoring/scoring-evaluator.md`; the rubric + scoring logic now lives at `00 Global/Statics Generator/Scoring Agents/` and is invoked from within the `script-writer` skill) reads all 7 rubrics in a single invocation and returns 7 scores. One evaluator per iteration = up to 75 agent invocations per batch (vs 525 if seven agents per iteration).

**The rules live in criteria docs, not rubric files.** When a new rule gets promoted via the compounding rule, every future scoring run automatically enforces it.

### Ad-Swipe System

Three-stage competitor ad reverse engineering:
1. **Deconstruct** — upload competitor ad, extract structured JSON (layout, typography, color, copy, editorial judgment)
2. **Rebuild** — generate NB2 prompt keeping structural techniques, replacing copy/brand identity with yours
3. **Copy Generation** — write copy matched to persona/angle/awareness stage, run through scoring agents

See `Ad-Swipe System.md` for the full system.

### Animation Pipeline

Static-to-GIF/video via fal.ai Veo 3.1 API:
1. Pick winning static → ideate animation concepts → generate missing frame via NB2 → animate via Veo 3.1 → iterate → convert to GIF

See `Animation Pipeline.md` for the full workflow.

### Format Multiplication

Take a winning brief and auto-rebrief across format templates — same persona, angle, awareness stage, different layout. Each rewritten brief runs through scoring agents before generation.

See `Format Multiplication.md` for the workflow.

---

## Technical Stack

| Tool | Role | Cost |
|---|---|---|
| fal.ai — NanoBanana 2 (`/edit`) | Image generation — product discipline, strict geometry, fast iteration | ~$0.08/image at 1K, $0.12 at 2K |
| fal.ai — GPT Image 2 (`openai/gpt-image-2/edit`) | Image generation — editorial realism, human subjects, text accuracy, platform-native UI | ~$0.17/image at high quality |
| fal.ai — Veo 3.1 (`/first-last-frame-to-video`) | Static-to-video animation | ~$1.60/8s at 1080p |
| fal.ai — Veo 3.1 (`/image-to-video`) | Single image animation | Same |
| Playwright (local) | HTML → PNG for spec cards | Free |
| ffmpeg (local) | MP4 → GIF conversion | Free |

**API wrapper:** `00 Global/Hermes/Tools/fal-ai/` — same Node.js pattern as Gemini API wrapper. `FAL_KEY` in `.env`.

**Fallback models on fal.ai:** Kling O3 Standard, Seedance 2.0 (ByteDance), Sora 2 (OpenAI), NanoBanana Pro (previous gen, better at filling gaps).

---

## Model Selection

The system auto-selects the generation model per brief. Templates declare which models they support ("NB2 only," "GPT only," or "Both"). When a template supports both, the `/generate-static` command scans the brief content for signals and picks the right model. The strategist never needs to specify a model manually.

### Auto-Selection Signals

**GPT Image 2 signals** — any one of these triggers GPT:
- Brief calls for a human subject, portrait, face, real skin, or creator
- Handwriting, handwritten note, Post-It, letter, whiteboard
- Platform-native UI (TikTok, IG Story, Reels)
- Warm organic surfaces (fabric, linen, parchment, cream, wooden table)
- Dark mode / moody editorial / dramatic lighting with portraits
- Typography-dominant composition (GPT's text rendering is materially superior)
- Camera/lens specs or editorial photography direction

**NB2 signals** — only win when no GPT signals are present:
- Strict product geometry as the hero (can, bottle, jar, tube — no humans)
- Bold commercial / retail-shelf / industrial aesthetic
- Glassmorphism / data card UI without human subjects

**Tiebreaker:** If signals are mixed or absent, default to GPT (higher quality ceiling).

### Decision Matrix

| Format / Content | Model |
|---|---|
| UGC TikTok / IG Story UI | GPT only |
| Handwriting (Post-It, Letter, Whiteboard) | GPT only |
| Any brief with human subjects | GPT |
| Editorial lifestyle scenes | GPT |
| Dark mode / moody editorial portraits | GPT |
| Typography-dominant (words are the visual) | GPT |
| Warm fabric / linen / parchment surfaces | GPT |
| Product hero on clean background, no humans | NB2 |
| Strict can / bottle / jar geometry | NB2 |
| Bold commercial / bottom-shelf aesthetic | NB2 |
| Data card / glassmorphism without humans | NB2 |
| Mixed signals or ambiguous | GPT |

### Anti-Sameness: Batch Variation

When generating multiple ads for the same brand in a batch, rotate these vectors to prevent visual monotony:

- **Surfaces:** warm linen → cool white marble → warm wooden table → clean seamless white → off-black with charcoal texture
- **Palettes:** warm cream / clean white / dark mode / monochromatic single-hue / natural environment
- **Compositions:** product centered-lower / product right-aligned with type dominant / flat lay / held-by-hand UGC
- **Product variants:** rotate shades/colors if the product has variants — tests fidelity AND adds visual variety

---

## NanoBanana 2 Prompting Rules

1. **Ideal prompt length: 1,000–1,500 words.** Don't exceed 2,000. Under-prompting is worse than over-prompting.
2. **NB2 does not make assumptions.** If you don't specify something, it won't do it. Over-communicate every detail.
3. **Text-based prompts, not JSON.**
4. **Upload reference images, don't describe them.** The model sees fonts and colors in uploaded PNGs. It cannot reproduce fonts from names or colors from hex codes.
5. **Max 2–3 reference images.** Standard final composition uses one spec card + one style card + one product image. Creative-hero handoff and iteration modes override those slots per Reference Image Strategy below.
6. **Four images per generation.** Generate 4 variants, pick the best, iterate.

## GPT Image 2 Prompting Rules

GPT Image 2 differs from NB2 in prompt style, safe zone handling, and what it's good at. Full shared block at `GPT Image 2 Block.md`.

1. **Shorter, structured prompts.** GPT prompts follow SCENE → TYPOGRAPHY → COPY TO RENDER → PRODUCT FIDELITY. Shorter than NB2's 1,000-1,500 word freeform blocks.
2. **E+ Safe Zone Block is mandatory.** Prepend verbatim to every prompt. GPT ignores standard safe zone language — it needs pixel-precise constraints (top/bottom 400px, left/right 150px) and the background continuity rule.
3. **Text rendering is GPT's strength.** Specify exact copy to render with explicit formatting: ALL CAPS, "stacked on 2-3 lines," periods only (no dashes or hyphens). GPT renders text more accurately than NB2.
4. **Include camera/lens specs.** GPT responds well to photographic direction: "Shot on 85mm f/1.8" for product/portraits, "iPhone 15 Pro 24mm f/1.78" for UGC. See cheatsheet in `GPT Image 2 Block.md`.
5. **Anti-AI rules are explicit.** Always append: "film grain visible, no hyper-smooth surfaces." GPT tends toward hyper-clean renders without this.
6. **Reference images: max 3.** Standard final composition uses spec card + style card + product photo. Creative-hero handoff and iteration modes override those slots per Reference Image Strategy below. More than 3 increases render time and causes blending.
7. **Four images per generation.** Same as NB2. Generate 4, pick the best, iterate.
8. **~100-120 seconds per generation.** Slower than NB2 but higher quality ceiling.

### Universal Final-Composition Rules (Both Models)

Every final-composition NB2 prompt must include:
1. All text rendered directly in the image (not layered post-generation)
2. No text smaller than 24px equivalent
3. Sufficient contrast between text and background
4. When product is present: photorealistic product representation (use uploaded product photo)
5. One continuous image — no panels, borders, split frames
6. Safe zones enforced (see below)
7. Typography matches brand spec card exactly
8. Logo placement per brand spec sheet
9. Color palette from brand spec card (no improvised colors)
10. When product is present: product position, angle, and scale specified explicitly

### Safe Zone Rule — NB2 (9:16 Vertical, 1080x1920)

| Zone | Clear of |
|---|---|
| Top 270px | Platform UI: status bar, app header, profile info |
| Bottom 340px | Engagement bar, caption preview, navigation |
| Left margin 40px | — |
| Right margin 120px from y=600 down | Side engagement buttons |

**Primary content zone: x=40 to x=960, y=270 to y=1580.**

**GPT Image 2 uses different safe zones** — see `GPT Image 2 Block.md` for the E+ Safe Zone Block. GPT ignores standard safe zone language and needs pixel-precise constraints prepended verbatim. Key differences: top/bottom 400px (vs 270/340), left/right 150px (vs 40/120), plus an explicit background continuity rule (one continuous photographic plane, no card-within-card).

### Output Destination

**All generated images and videos go directly to `[Brand]/00 Assets/Statics/` or `[Brand]/00 Assets/Animations/`.** Never write to `/tmp` first — use the vault path as the `--output` target.

After generation, add every output to the batch canvas at `[Brand]/T00N Images.canvas` (e.g., `T002 Images.canvas`). One canvas per batch. On the first generation pass for a batch, create the canvas automatically — don't ask. Organize by section (hero iterations, persona variations, format multiplication, animations) with labeled rows. Each variant gets its own node; label nodes describe the format, concept, and iteration status.

### Prompt-on-Canvas Workflow

When generating the first pass for a concept, build the full prompt (NB2 or GPT) from the format template (filling in all brand/copy/persona variables) and save it as a text node on the canvas alongside the generated images. One prompt per concept — not per variation.

**Creative hero exception:** `/creative-image` uses the scene-first prompt structure in `Creative Hero Prompting Playbook.md`, not a final-composition format template. Save those hero prompts to the same canvas so approved visuals can be iterated and handed off without reconstructing the prompt.

**Why:** Iteration requires changing one variable at a time. Rewriting prompts from scratch between rounds causes regressions on things that were already working (circle positioning, font choice, color, layout). The saved prompt is the stable base.

**Iteration rules:**
1. When the strategist gives a note, read the saved prompt from the canvas, edit only the specific lines that address that note, and generate. Everything else stays verbatim.
2. For variations (different portrait, different headline copy), duplicate the prompt and change only the variable parts.
3. After generating, add the new images to the canvas in a new labeled row. Do not modify the prompt node unless the strategist's note changes the base (e.g., "change the font" is a base change; "try a different person" is a variation).
4. When a prior output achieves the right composition, upload it as a reference image — NB2 matches what it sees in uploaded references far more reliably than pixel coordinates in text.

**Final-composition prompt length:** 1,000–1,500 words. Built from the format template in `Templates/`, not summarized. The template sections (COMPOSITION, TYPOGRAPHY, SAFE ZONES, COLOR AND TREATMENT, BRAND IDENTITY, PHOTOGRAPHY DIRECTION, MOOD, REFERENCE IMAGES) must all be present. Creative-hero prompts follow `Creative Hero Prompting Playbook.md` instead.

### Reference Image Strategy

Both models use max 3 reference images per generation. Choose slots based on the workflow:

| Workflow | Slot 1 | Slot 2 | Slot 3 |
|---|---|---|---|
| Standard final composition | Brand Spec Card | Visual Style Card | Product photo |
| Final-composition iteration | Brand Spec Card | Own prior output for composition lock | Product photo |
| Creative-hero handoff to final composition | Approved creative hero | Brand Spec Card | Product photo when fidelity matters; otherwise Visual Style Card |
| Creative hero generation | Product photo only when concept requires it | Approved prior output when iterating | Optional style reference only when strategist supplied and safe to use |

When an approved creative hero is present, it replaces the Visual Style Card as the strongest art-direction reference unless no product photo is needed. The hero already carries the chosen visual treatment.

**Competitor references are NEVER uploaded to either model.** They get analyzed and the learnings get written into the prompt text instead. Reasons:
- The model may copy competitor branding, logos, or text from the reference image
- Prompt text is explicit and editable — you can tweak "frosted glass card at 85% opacity" but you can't tweak "do it like this uploaded image"
- Doesn't burn a reference slot needed for brand identity
- Learnings compound — once extracted, they can be reused across concepts and batches

**Competitor reference flow:**
1. Strategist drops competitor ads onto the batch References canvas at `[Brand]/T00N References.canvas`
2. Analyze each reference — extract the design principles: composition structure, typography hierarchy, color treatment, element spacing, overlay mechanics, data visualization patterns
3. Write those learnings into the prompt as explicit instructions (or into the format template in `Templates/` if they're reusable across concepts)
4. The competitor image itself stays on the References canvas for visual context but never gets uploaded to the fal.ai API

**References canvas:** One per batch, separate from the Images canvas. Strategist organizes refs by category (composition, color, typography, format). When the strategist points to a specific reference ("use the composition from the Juniper one"), read the canvas to find the file path, analyze it, and apply the learnings to the prompt.

### Brand Generation Components

Both models benefit from brand-specific prompt tuning. NB2 defaults to sans-serif, glassmorphism, stock photography, and cool tones. GPT Image 2 defaults to generic editorial without brand specificity. Brand-level component files encode what worked through iteration so first-pass quality stays high.

**Location:** `[Brand]/00 Context/Generation Components.md` (previously `NB2 Components.md` — rename on first use of GPT Image 2 for a brand)

**What they contain:** Drop-in prompt blocks organized by model:
- **NB2 section:** Background treatments, typography enforcement (triple-reinforced), pill/badge styling, data card treatment, color palette, CTA buttons, social proof, composition complexity limits — all tuned to what NB2 actually renders correctly for that brand.
- **GPT section:** Surface and material descriptions, photography direction (camera/lens), lighting style, text rendering preferences, anti-AI rules calibration — tuned to what GPT Image 2 renders correctly for that brand.

**How to use:** When assembling a prompt, start with the format template, then inject the relevant brand components for the selected model. The components replace the generic placeholder sections in the template (e.g., the template says `{{photography_direction}}` — the brand component file has the exact paragraph for each model).

**When to create:** After the first generation pass for a new brand. The iteration learnings from rounds 1-3 become the components. Without them, every new concept cold-starts and re-learns the same brand rendering issues. Add the GPT section the first time GPT Image 2 is used for the brand.

### Prompt Assembly Checklist — NB2

Every prompt sent to NB2 must contain:
- Exact dimensions (1080x1920, 9:16 vertical)
- Every piece of approved copy rendered verbatim
- Product position, angle, and scale when product is present
- Background treatment (from brand Generation Components NB2 section, not generic)
- Typography enforcement block (from brand Generation Components — triple-reinforced)
- Safe zones (top 270px, bottom 340px clear)
- Lighting and energy direction
- Logo placement per spec sheet
- All 10 universal rules
- Color palette with hex values AND descriptive names (from brand Generation Components)
- Pill/badge treatment (from brand Generation Components — prevents glassmorphism default)
- Reference-image note matching the selected workflow in Reference Image Strategy
- Font metadata stripped (no font-name + pixel-size combos — NB2 renders these as literal text)

### Prompt Assembly Checklist — GPT Image 2

Every prompt sent to GPT Image 2 must contain:
- E+ Safe Zone Block prepended verbatim (from `GPT Image 2 Block.md`)
- Structured format: SCENE → TYPOGRAPHY → COPY TO RENDER → PRODUCT FIDELITY
- Camera/lens spec in SCENE (see cheatsheet in `GPT Image 2 Block.md`)
- Exact copy to render with explicit formatting (ALL CAPS, stacked lines, periods only)
- Background surface description (continuous photographic plane)
- GPT Universal Rules appended (product fidelity, anti-AI slips, no dashes/hyphens)
- Brand Generation Components GPT section injected (if exists for the brand)
- Reference images uploaded according to the selected workflow in Reference Image Strategy
- No font metadata in prompts — GPT reads fonts from the uploaded spec card visually

---

## How Our Frameworks Map to Generation Inputs

| Input | Our Framework |
|---|---|
| Persona | Pain-trigger persona from Persona Context (never demographic-named) |
| Messaging Angle | From the Creative Strategy Matrix — core truth for a specific pain × persona intersection |
| Awareness Stage | From Creative Strategy Matrix — Unaware / Problem-Aware / Solution-Aware / Product-Aware / Most-Aware |
| Three Selves | Actual Self / Ideal Self / Ought Self — affects emotional register |

These dimensions encode into our scoring agents (Awareness Stage Alignment, Messaging Angle Coherence, Three Selves Check) — strategic depth beyond persona/angle/emotion.

---

## File Locations

```
00 Global/Statics Generator/
├── Overview.md                       ← this file
├── GPT Image 2 Block.md             ← shared safe zone + universal rules for GPT
├── Creative Hero Workflow.md         ← optional visual-concept pre-pass
├── Creative Hero Prompting Playbook.md
├── Brand Spec Card Prompt.md
├── Visual Style Card Prompt.md
├── Ad-Swipe System.md
├── Animation Pipeline.md
├── Format Multiplication.md
├── Templates/
│   ├── Headline.md                   ← Both (NB2 + GPT prompts)
│   ├── Us vs Them.md                 ← Both
│   ├── Features & Benefits.md        ← Both
│   ├── Testimonial.md                ← Both
│   ├── Statistics.md                 ← Both
│   ├── Before-After.md               ← Both
│   ├── UGC TikTok.md                 ← GPT only
│   ├── Handwriting.md                ← GPT only
│   └── Visual Elements.md            ← Shared rendering specs
└── Scoring Agents/
    ├── Persona Fit.md
    ├── Awareness Stage Alignment.md
    ├── Messaging Angle Coherence.md
    ├── Three Selves.md
    ├── Brand Compliance.md
    ├── Format Compliance.md
    └── Copy Editor.md

00 Global/Statics Generator/Scoring Agents/scoring-evaluator.md   ← (formerly at `.claude/agents/scoring/scoring-evaluator.md`, moved 2026-06-09 during the Hermes port)
00 Global/Hermes/Tools/fal-ai/                    ← generate-image.js supports --model nb2|gpt
00 Global/Hermes/Commands/generate-static.md
00 Global/Hermes/Commands/creative-image.md
```
