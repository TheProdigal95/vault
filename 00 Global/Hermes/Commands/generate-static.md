# /generate-static — Static Ad Image Generation

Converts approved briefs into generation-ready prompts and produces images via fal.ai. Supports two models — NanoBanana 2 (NB2) and GPT Image 2 — auto-selected per brief content. Also handles standalone generation, ad-swipe, format multiplication, and final composition around an approved creative hero.

**System docs:**
- `00 Global/Statics Generator/Overview.md` — full architecture, model selection matrix, prompting rules, prompt assembly checklists
- `00 Global/Statics Generator/GPT Image 2 Block.md` — shared safe zone block + universal rules for GPT

---

## Entry modes

### 1. Generate from approved brief

The primary path. Takes a brief that already passed 3-tier QA and converts it to images.

```
User: /generate-static
  brand: IM8
  brief: T002 Briefs.md → Brief #3 (GLP-1 Muscle Loss Explainer)
```

**Steps:**
1. Read the specified brief from the briefs file
2. Load brand assets:
   - `[Brand]/00 Context/Brand Spec Card.png` — if missing, offer to generate via `Brand Spec Card Prompt.md`
   - `[Brand]/00 Context/Visual Style Card.png` — same
   - Product photo — ask strategist for path if not obvious
   - Approved creative hero image — optional; use when the strategist completed `/creative-image`
3. Load the format template from `00 Global/Statics Generator/Templates/` that matches the brief's format
4. **Auto-select model** — scan the brief for content signals (see Model Auto-Selection below). Report the selection with a one-line reason: e.g., "Using GPT Image 2 — brief calls for a lifestyle scene with a real person."
5. Upload reference images to fal.ai storage. Standard mode uses spec card + style card + product photo. Creative-hero handoff uses approved hero + spec card + product photo when fidelity matters; otherwise approved hero + spec card + style card:
   ```bash
   # Standard final composition
   node 00 Global/Hermes/tools/fal-ai/upload.js --files "[Brand]/00 Context/Brand Spec Card.png" "[Brand]/00 Context/Visual Style Card.png" "[product_photo_path]"

   # Creative-hero handoff with product
   node 00 Global/Hermes/tools/fal-ai/upload.js --files "[approved_hero_path]" "[Brand]/00 Context/Brand Spec Card.png" "[product_photo_path]"
   ```
6. Convert the brief's approved copy into a model-specific prompt using the format template's rendering specs. For GPT: prepend the E+ Safe Zone Block from `GPT Image 2 Block.md`, use the template's GPT Image 2 Prompt section. For NB2: use the template's NB2 Image Generation Prompt section.
7. Generate 4 image variants:
   ```bash
   # NB2
   node 00 Global/Hermes/tools/fal-ai/generate-image.js \
     --model nb2 \
     --prompt "[full NB2 prompt]" \
     --images "[reference_urls_for_selected_workflow]" \
     --output "[Brand]/00 Assets/Statics/T[###]-[concept-slug]" \
     --num-images 4 \
     --aspect-ratio "9:16" \
     --resolution "1K"

   # GPT Image 2
   node 00 Global/Hermes/tools/fal-ai/generate-image.js \
     --model gpt \
     --prompt "[E+ Safe Zone Block + GPT prompt]" \
     --images "[reference_urls_for_selected_workflow]" \
     --output "[Brand]/00 Assets/Statics/T[###]-[concept-slug]" \
     --num-images 4 \
     --aspect-ratio "9:16" \
     --quality "high"
   ```
8. Present variants to strategist for selection
9. If strategist wants iteration: adjust the prompt based on their feedback, regenerate

**The copy is already locked** — don't re-evaluate it. The generation pipeline handles brief-to-prompt translation and fal.ai API calls only.

**Approved creative hero rule:** Preserve the selected hero concept and visual treatment. The final-composition pass adds layout, typography, approved copy, logo treatment, CTA, and safe zones. Do not reinterpret the hero into a different metaphor unless the strategist asks.

### 2. Standalone generation (no prior brief)

For quick experiments — single-ad generation without the full batch flow.

```
User: /generate-static
  brand: IM8
  format: headline
  persona: The Pill Fatigue Simplifier
  angle: "One scoop replaces the whole shelf"
  awareness: Solution-Aware
  selves: Actual
```

**Steps:**
1. Load brand assets (same as above)
2. Load the specified format template
3. Generate a brief using the format template, selecting hook tactics appropriate for the awareness stage (see deployment-by-awareness-stage table in `Headline & Text Hook Criteria.md`)
4. **Hook Quality Bar** — 5-test gate. Dead hook → rethink
5. **4-Question Gate** — fast-fail. Q1 failure → rework
6. **Scoring loop** — invoke the `scoring-evaluator` skill (inline, or as a single depth-1 delegate), iterate to 90+ on all 7 dimensions (cap 5)
7. **4-Question Gate** — post-scoring sanity check
8. Auto-select model based on brief content signals
9. Convert to model-specific prompt → upload references → generate via fal.ai
10. Present variants

**Standalone trades QA depth for speed** — no Concept Validation, no Tier 0/2/3. Acceptable for single-ad experiments, not for batch-scale production.

### 3. Ad-swipe generation

Reverse-engineer a competitor ad and rebuild for your brand.

```
User: /generate-static --swipe
  brand: IM8
  competitor_ad: [path to competitor ad image]
  persona: The Pill Fatigue Simplifier
  angle: "Stack replacement — one scoop, eight pills saved"
  awareness: Solution-Aware
  selves: Actual
```

**Steps:**
1. Read `00 Global/Statics Generator/Ad-Swipe System.md`
2. Run Stage 1 — Deconstruct the competitor ad (upload to Gemini for analysis)
3. Run Stage 2 — Rebuild prompt using your brand's spec cards and the matched format template
4. Run Stage 3 — Generate copy, score to 90+ on all 7 dimensions
5. Auto-select model, assemble the model-specific prompt
6. Upload references → generate via fal.ai → present variants

### 4. Format multiplication

Take a winning brief and multiply across format templates.

```
User: /generate-static --multiply
  brand: IM8
  source_brief: T002 Briefs.md → Brief #3
  target_formats: us-vs-them, statistics, testimonial
```

**Steps:**
1. Read `00 Global/Statics Generator/Format Multiplication.md`
2. Read the source brief
3. For each target format template: rewrite the brief to match that template's structure (same persona, angle, awareness stage, Three Selves — different copy packaging)
4. Score each rewritten brief to 90+ on all 7 dimensions
5. Auto-select model per brief, convert each to a model-specific prompt
6. Generate images for each

---

## Required assets per brand

Before generating, check that these exist:

| Asset | Location | If missing |
|---|---|---|
| Brand Spec Card | `[Brand]/00 Context/Brand Spec Card.png` | Generate using `Brand Spec Card Prompt.md` |
| Visual Style Card | `[Brand]/00 Context/Visual Style Card.png` | Generate using `Visual Style Card Prompt.md` |
| Product photo | Varies — ask strategist | Required when the final composition includes the product |
| Approved creative hero | `[Brand]/00 Assets/Statics/T[###]-creative-heroes/` | Optional; generated through `/creative-image` |
| Brand compliance doc | `[Brand]/00 Context/Compliance*.md` or `Guardrails*.md` | Proceed without (Brand Compliance scoring dimension defaults to 90) |

---

## Model auto-selection

The system picks the model automatically. The strategist never specifies it.

**Step 1: Check template constraint.** If the template is GPT-only (UGC TikTok, Handwriting) or NB2-only → use that model. Skip step 2.

**Step 2: Scan brief content for signals.** When the template supports both models, scan the brief's Image Direction, Visual Direction, copy, and format for these signals:

GPT Image 2 signals (any one triggers GPT):
- Human subject, portrait, face, real skin, creator
- Handwriting, handwritten note, Post-It, letter
- Platform-native UI (TikTok, IG Story, Reels)
- Warm organic surfaces (fabric, linen, parchment, cream, wooden table)
- Dark mode / moody editorial / dramatic lighting with portraits
- Typography-dominant composition (words are the visual)
- Camera/lens specs or editorial photography direction

NB2 signals (only win when no GPT signals are present):
- Strict product geometry as the hero (can, bottle, jar, tube — no humans)
- Bold commercial / retail-shelf / industrial aesthetic
- Glassmorphism / data card UI without human subjects

**Tiebreaker:** If signals are mixed or absent, default to GPT.

**Step 3: Report.** State the selection with a one-line reason before generating: e.g., "Using GPT Image 2 — brief calls for a lifestyle scene with a real person."

---

## Prompt construction

### NB2 prompts

Follow the NB2 Prompt Assembly Checklist in `00 Global/Statics Generator/Overview.md`:
- Exact dimensions (1080x1920, 9:16 vertical)
- Every piece of approved copy rendered verbatim
- Product position, angle, and scale
- Background treatment (from brand Generation Components NB2 section)
- Typography from brand spec card
- Safe zones (top 270px, bottom 340px, left 40px, right 120px from y=600)
- Lighting and energy direction
- Logo placement per spec sheet
- All 10 universal generation rules
- Note about uploaded reference images

**Prompt length: 1,000-1,500 words.** Under-prompting is worse than over-prompting. NB2 does not make assumptions.

### GPT Image 2 prompts

Follow the GPT Prompt Assembly Checklist in `00 Global/Statics Generator/Overview.md`:
1. **Prepend** the E+ Safe Zone Block verbatim from `GPT Image 2 Block.md`
2. Use the template's **GPT Image 2 Prompt** section (not the NB2 section)
3. Follow SCENE → TYPOGRAPHY → COPY TO RENDER → PRODUCT FIDELITY structure
4. Include camera/lens spec in SCENE
5. Inject brand Generation Components GPT section (if exists)
6. **Append** GPT Universal Rules (product fidelity, anti-AI slips, no dashes/hyphens)

GPT prompts are shorter and more structured than NB2 — don't pad to 1,000 words.

---

## Iteration workflow

After presenting variants:
1. Strategist picks the best variant or says what's wrong
2. Adjust the prompt based on feedback (not the copy — the rendering instructions)
3. Regenerate with the same reference images
4. Repeat until the strategist approves

Common iteration fixes:
- Product too small/large → adjust "occupying roughly X% of the visual frame"
- Text illegible → add "ensure strong contrast between text and background, minimum 24px"
- Colors off → add "match brand spec card exactly — do not improvise colors"
- Layout feels cramped → adjust negative space or element positioning
- Wrong mood → adjust lighting and energy descriptors

---

## Cleanup

Generated images stay in `[Brand]/00 Assets/Statics/` and on the batch canvas. Do not delete generated variants automatically. The canvas is the iteration record; cleanup only happens when the strategist explicitly requests it.

---

## Animation follow-up

If the strategist wants to animate a winning static:
1. Read `00 Global/Statics Generator/Animation Pipeline.md`
2. Follow the 6-step workflow (ideate → generate missing frame → animate via Veo 3.1)
3. Use `00 Global/Hermes/tools/fal-ai/generate-video.js` for the Veo 3.1 API call
