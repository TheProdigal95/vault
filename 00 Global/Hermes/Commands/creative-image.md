# /creative-image - Creative Hero Image Pre-Pass

Strategist-invoked workflow for Creative Image static ads that need an original hero visual before layout and final composition. Uses the existing fal.ai API wrapper. Does not replace `/generate-static`.

**System docs:**
- `00 Global/Statics Generator/Creative Hero Workflow.md`
- `00 Global/Statics Generator/Creative Hero Prompting Playbook.md`
- `00 Global/Statics Generator/Overview.md`

---

## Trigger Rule

Invoke only when the strategist explicitly asks for a creative image, a batch of creative static ads, metaphorical image ideas, personified visuals, or `/creative-image`.

Do not auto-route ordinary static generation into this workflow. `/generate-static` remains the default.

When the strategist says "creative static ads," "creative images," or "creative image ads," interpret that as this workflow unless they explicitly say they mean ordinary designed statics.

---

## Entry Modes

### 1. Ideate

```
User: /creative-image
  brand: [Brand]
  batch: T[###]
  angle: [pain point, trigger event, outcome, or mechanism]
```

Steps:
1. Read `Creative Hero Workflow.md`.
2. Load brand context, product context, persona context, compliance, recent ads analysis, current Working Document, and recent image canvases.
3. Build the internal Angle Understanding Sheet.
4. Produce an 8-12 item Visual Concept Board.
5. Run the Diversity Gate against existing and in-progress ads.
6. Present the board and stop for strategist selection.

### 2. Render selected concepts

```
User: generate concepts 2, 4, and 7
```

Steps:
1. Read `Creative Hero Prompting Playbook.md`.
2. Convert only selected concepts into hero prompts.
3. Auto-select NB2 or GPT Image 2 per concept. Report each selection in one line.
4. Upload a product reference only when the hero needs the product.
5. Generate four variants per selected concept:

Omit `--images` entirely when the hero pass has no uploaded references.

```bash
node 00 Global/Hermes/Tools/fal-ai/generate-image.js \
  --model [nb2|gpt] \
  --prompt-file "[prompt-file]" \
  --images "[optional-uploaded-reference-url]" \
  --output "[Brand]/00 Assets/Statics/T[###]-creative-heroes/[concept-slug]" \
  --num-images 4 \
  --aspect-ratio "9:16"
```

6. Save each stable prompt as a `.txt` file beside its variants, then add prompt nodes and all variants to `[Brand]/T00N Images.canvas` under `Creative Image Heroes`:

```bash
node 00 Global/Hermes/Tools/add_to_canvas.js \
  --canvas "[Brand]/T[###] Images.canvas" \
  --files "[comma-separated-vault-relative-image-paths]" \
  --label "Creative Image Heroes - [concept] - v1" \
  --prompt-file "[prompt-file]"
```

7. Present variants for strategist selection.

### 3. Iterate

When the strategist gives feedback:
1. Read the saved canvas prompt.
2. Edit only instructions responsible for the failed detail.
3. Keep successful instructions verbatim.
4. Upload the best prior output as a reference when composition lock matters.
5. Generate a new labeled iteration row on the same canvas.

### 4. Handoff

When the strategist approves a hero:
1. Label it `APPROVED HERO` on the canvas.
2. Run or offer the normal `/generate-static` final-composition path.
3. Pass the approved hero image as a reference.
4. Keep the selected format template unchanged unless the strategist asks to change layout.

The creative hero can be used inside any appropriate existing template, including infographics and educational layouts.

---

## Output Rules

- Save hero images directly to `[Brand]/00 Assets/Statics/T[###]-creative-heroes/`.
- Use the existing batch canvas. Do not create a separate canvas by default.
- No ad copy inside hero images by default.
- Compliance applies to visual implications.
- Do not render the full concept board before strategist selection.
- Do not treat a visual treatment such as claymation as the concept itself.
