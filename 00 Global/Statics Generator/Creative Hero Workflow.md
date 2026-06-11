# Creative Hero Workflow

Optional, strategist-invoked pre-pass for Creative Image static ads. Use it when the ad needs an original hero visual before layout work begins: a metaphor, personified body part or object, dramatized pain point, absurd scenario, visceral exaggeration, or surprising depiction of the desired outcome.

This is additive. It does not replace the normal `/generate-static` pipeline, the approved format templates, or educational and infographic layouts. The approved hero image becomes one input to the final composition.

---

## Trigger Rule

Run this workflow only when the strategist explicitly asks for a creative image or a batch of creative static ads, or invokes `/creative-image`.

Do not auto-route a normal static brief into this workflow because it contains an image direction. Product heroes, infographics, comparisons, testimonials, statistics, and educational layouts continue through `/generate-static` by default.

Treat the phrases "creative static ads," "creative images," and "creative image ads" as explicit requests for this workflow unless the strategist says they mean ordinary designed statics.

---

## End-to-End Flow

```text
Strategist requests creative image static ads
  → Load brand context, product context, persona context, compliance, and existing ad log
  → Deepen the angle before ideating
  → Produce a diverse visual concept board
  → Strategist selects concepts to render
  → Convert selected concepts into text-free hero prompts
  → Generate hero variants through the existing fal.ai wrapper
  → Strategist selects and iterates hero images
  → Pass approved hero image into /generate-static
  → Use any existing format template for final layout and composition
```

The checkpoint after concept ideation is mandatory. Do not spend API calls rendering a full concept board before the strategist chooses which ideas are worth testing.

---

## Phase 1: Load Inputs

Read:

1. `[Brand]/00 Context/Brand Context*.md`
2. `[Brand]/00 Context/Product Context*.md`
3. `[Brand]/00 Context/Persona Context*.md`
4. Any file in `[Brand]/00 Context/` matching `(?i)(compliance|guardrails|claims)`
5. Current batch Working Document, when one exists
6. Existing batch canvases and recent statics for the brand
7. Relevant ads analysis docs and supplied visual references

Compliance applies to the image itself, not only to copy. A metaphor, before-after contrast, anatomical depiction, or implied transformation can create a claim even when the hero contains no text.

---

## Phase 2: Deepen the Angle

Before generating concepts, write a compact internal Angle Understanding Sheet:

| Field | What to extract |
|---|---|
| Core truth | The single message the visual must communicate |
| Simplified explanation | Explain the angle as if to a ten-year-old |
| Concrete nouns | Objects, body parts, environments, products, and props |
| Concrete verbs | What is happening physically |
| Pain points | Specific frustrations, not broad category language |
| Trigger events | Real moments where the pain becomes noticeable |
| Desired outcome | What relief, control, confidence, or progress looks like |
| Emotional reaction | Curiosity, recognition, surprise, discomfort, or laughter |
| Compliance boundaries | Visual claims or depictions to avoid |

The ten-year-old explanation is an internal reasoning tool. It is not copy for the ad.

If the angle is still abstract after this pass, go deeper before ideating. Weak understanding produces generic scenes.

---

## Phase 3: Visual Concept Board

Produce 8-12 concepts per angle unless the strategist requests a different count. Each concept should be short enough to scan quickly.

Use this table:

| # | Concept | Visual punchline | Treatment | Product visible? | Source sub-point | Distinctness note |
|---|---|---|---|---|---|---|
| 1 | Short title | What the viewer understands at a glance | Style-library treatment | Yes / No | Pain, trigger event, outcome, or mechanism | Why it differs from existing work |

### Concept Sources

Generate concepts from:

- Pain-point metaphors
- Trigger-event scenarios
- Literal dramatizations
- Personification
- Scale distortion
- Absurd but immediately readable situations
- Before-after contrasts
- Desired-outcome imagery
- Existing ads re-expressed through a distinct visual treatment

Every pain point and trigger event is a candidate image. Do not begin with visual-style roulette. The treatment serves the idea.

### Mechanism Ads

Unique-mechanism angles may still use this workflow, but communicative clarity wins. A creative hero can support an infographic or educational template; it should not obscure how the mechanism works.

---

## Diversity Gate

Before presenting the board:

1. Scan recent brand statics, current in-progress canvases, and supplied ad-log references.
2. Remove concepts that repeat an overused treatment or composition.
3. Check that the batch varies both the idea and the treatment.
4. Prefer the concept with the clearest first-glance read when two options communicate the same thing.

The bar: scrolling through the batch should feel visibly diverse. A claymation batch with different props is still one visual idea repeated.

---

## Checkpoint: Strategist Selection

Present the concept board and stop. Ask the strategist which concepts to render.

After selection, commit to those concepts. Do not silently add extra hero variants with different ideas. Iteration changes rendering details unless the strategist asks to revisit ideation.

---

## Phase 4: Hero Prompt Construction

Read `Creative Hero Prompting Playbook.md`. Convert each selected concept into a literal image-generation prompt.

Hero prompts differ from final-composition prompts:

| Hero pass | Final composition pass |
|---|---|
| Generate the standalone scroll-stopping visual | Build the finished ad around an approved hero |
| No ad copy by default | Approved copy rendered per format template |
| Brand identity is optional unless visually relevant | Brand spec card and layout rules apply |
| Product reference included only when the concept needs it | Product reference included when final ad needs product fidelity |
| Natural breathing room for later composition | Final safe zones and element hierarchy enforced |

---

## Phase 5: Generate and Iterate

Use the existing wrapper:

Omit `--images` entirely when the hero pass has no uploaded references.

```bash
# Text-to-image hero pass
node 00 Global/Hermes/tools/fal-ai/generate-image.js \
  --model [nb2|gpt] \
  --prompt-file "[prompt-file]" \
  --output "[Brand]/00 Assets/Statics/T[###]-creative-heroes/[concept-slug]" \
  --num-images 4 \
  --aspect-ratio "9:16"

# Hero pass with a product or approved prior-output reference
node 00 Global/Hermes/tools/fal-ai/generate-image.js \
  --model [nb2|gpt] \
  --prompt-file "[prompt-file]" \
  --images "[uploaded-reference-url]" \
  --output "[Brand]/00 Assets/Statics/T[###]-creative-heroes/[concept-slug]" \
  --num-images 4 \
  --aspect-ratio "9:16"
```

Auto-select the model using the same principles as `/generate-static`:

- GPT Image 2 for human subjects, real skin, editorial photography, platform-native realism, and text-sensitive scenes.
- NB2 for stylized object scenes, anthropomorphic concepts, product-discipline concepts, and clean commercial renders.
- Default to GPT when signals are mixed or absent.

Save outputs directly to `[Brand]/00 Assets/Statics/`. Add every variant and its prompt to `[Brand]/T00N Images.canvas` under a `Creative Image Heroes` group.

Save the stable prompt as a `.txt` file beside the generated variants, then add the row to the canvas:

```bash
node 00 Global/Hermes/tools/add_to_canvas.js \
  --canvas "[Brand]/T[###] Images.canvas" \
  --files "[comma-separated-vault-relative-image-paths]" \
  --label "Creative Image Heroes - [concept] - v1" \
  --prompt-file "[prompt-file]"
```

Iterate surgically:

1. Read the saved prompt from the canvas.
2. Change only the instruction responsible for the failed detail.
3. Keep successful composition details verbatim.
4. Upload the strongest prior output as a reference when composition lock matters.

---

## Phase 6: Handoff to `/generate-static`

Once the strategist approves a hero image:

1. Mark the selected image as `APPROVED HERO` on the canvas.
2. Build or update the normal static brief with one committed `Image to generate:` direction.
3. Run `/generate-static` using any appropriate existing format template.
4. Pass the approved hero image as a visual reference for the final composition.

Recommended reference slots for the final composition:

| Slot | Reference |
|---|---|
| 1 | Approved creative hero image |
| 2 | Brand Spec Card |
| 3 | Product photo when product fidelity matters; otherwise Visual Style Card |

The final composition stage remains responsible for typography, approved copy, logo treatment, layout, category clarity, CTA, and safe zones.

---

## Canvas Organization

Use one existing batch canvas: `[Brand]/T00N Images.canvas`.

Add groups in this order:

1. `Creative Image Heroes - Concept Board`
2. `Creative Image Heroes - Rendered Variants`
3. `Creative Image Heroes - Approved`
4. Existing final-composition rows

Store one stable prompt `.txt` file and one matching canvas text node beside each rendered concept. Do not create a separate canvas unless the existing canvas is too large to remain usable.
