# Ad-Swipe System

Three-stage competitor ad reverse engineering. Upload a competitor's ad, extract its structural DNA, rebuild the layout with your brand's identity and copy, then generate new copy matched to your strategic inputs.

**Source:** Adapted from Will Sartorius (Self Made Agency / Skipper) ad-swipe methodology. Extended with Reach Digital's Creative Strategy Matrix, Three Selves, scoring agents, and format template system.

**Hard rule: Never copy a competitor's actual copy, tagline, or brand-specific language.** Structural techniques are what we borrow — composition, visual hierarchy, typography relationships, color treatment patterns, pacing of information. The output must look conceived for your brand from scratch.

---

## Inputs

Every ad-swipe run requires these variables before Stage 1 begins.

| Input | Source | Description |
|---|---|---|
| **Brand Name** | Brand folder in vault | The client brand this ad will be produced for |
| **Product** | `[Brand]/00 Context/Product Context.md` | Specific product or product line the ad promotes |
| **Persona** | `[Brand]/00 Context/Persona Context.md` | Pain-trigger persona name (never demographic-named) |
| **Messaging Angle** | Creative Strategy Matrix cell | Core truth for this pain x persona intersection |
| **Awareness Stage** | Creative Strategy Matrix | One of: Unaware, Problem-Aware, Solution-Aware, Product-Aware, Most-Aware |
| **Three Selves Target** | Per-concept decision | Actual Self, Ideal Self, or Ought Self |
| **Competitor Ad** | Upload (PNG, JPG, or screenshot) | The ad being deconstructed |

**Awareness Stage drives expression.** The messaging angle stays constant; what changes is how it's delivered. An Unaware ad educates and reveals. A Most-Aware ad closes with urgency and proof. See Creative Strategy Matrix Steps 4-5 for stage-specific approach and creative mechanics.

**Three Selves drives register.** Ought Self uses imperative, obligation language. Actual Self uses reflective, validation language. Ideal Self uses aspirational, identity language. The ratio is a strategic decision per persona — see Creative Strategy Matrix Three Selves Integration.

---

## Stage 1: Deconstruct

Upload the competitor ad image. Extract a structured JSON analysis across five dimensions.

### 1.1 Layout Analysis

```json
{
  "format_type": "Headline + Image | Us vs Them | Features & Benefits | Testimonial | Statistics | Before-After | Other: [describe]",
  "composition": {
    "primary_focal_point": "description of what the eye hits first",
    "secondary_focal_point": "description of second element in hierarchy",
    "visual_flow": "top-down | Z-pattern | F-pattern | center-radial | split-frame | other",
    "negative_space_usage": "minimal | moderate | generous",
    "negative_space_location": "where the breathing room lives in the layout",
    "content_density": "sparse | balanced | dense",
    "grid_structure": "single column | two column | asymmetric | freeform | card-based"
  },
  "element_positions": [
    {
      "element": "headline | subheading | feature_pill | cta | product_image | logo | testimonial | stat | comparison_column | other",
      "position": "approximate region (top-center, middle-left, bottom-right, etc.)",
      "size_relative": "dominant | large | medium | small | accent",
      "z_index_visual": "foreground | midground | background"
    }
  ]
}
```

### 1.2 Typography Extraction

```json
{
  "text_elements": [
    {
      "role": "headline | subheading | body | pill | cta | attribution | stat_number | stat_label | disclaimer",
      "text_content": "exact text as rendered",
      "font_category": "sans-serif | serif | slab-serif | display | handwriting | monospace",
      "weight": "light | regular | medium | semibold | bold | extrabold | black",
      "case": "uppercase | lowercase | sentence case | title case",
      "alignment": "left | center | right",
      "approximate_size": "relative description (largest on page, secondary, small caption, etc.)",
      "color": "hex estimate or description",
      "spacing": "tight | normal | wide (letter-spacing) + tight | normal | loose (line-height)"
    }
  ],
  "type_hierarchy_notes": "how the typography creates reading order — what do you read first, second, third?"
}
```

### 1.3 Color and Mood Extraction

```json
{
  "background": {
    "type": "solid | gradient | image | textured",
    "primary_color": "hex estimate or description",
    "secondary_color": "hex estimate (if gradient or multi-tone)",
    "treatment": "clean | grainy | blurred | overlaid | split"
  },
  "palette": [
    {
      "color": "hex estimate",
      "role": "primary | accent | text | background | highlight | divider",
      "area_coverage": "percentage estimate of visual real estate"
    }
  ],
  "lighting": "bright natural | warm studio | cool clinical | dramatic contrast | flat/even | moody low-key",
  "energy_level": "calm | confident | urgent | playful | clinical | aggressive",
  "mood_keywords": ["3-5 adjectives describing the overall feeling"]
}
```

### 1.4 Copy Extraction

Extract every piece of text visible in the ad image with its structural role.

```json
{
  "copy_elements": [
    {
      "role": "headline | subheading | feature_pill | cta | testimonial_quote | attribution | stat_number | stat_label | disclaimer | brand_name | other",
      "text": "exact text as rendered",
      "position": "approximate region in the layout",
      "word_count": 0,
      "function": "what this text element does in the ad's persuasion sequence"
    }
  ],
  "copy_sequence": "the reading order of copy elements as the eye naturally moves through the ad",
  "persuasion_flow": "how the copy elements build on each other — what story do they tell when read in sequence?"
}
```

### 1.5 Editorial Judgment

```json
{
  "strongest_element": "which single element (visual, copy, or layout technique) is the most effective and why",
  "weakest_element": "which single element underperforms and why",
  "visual_copy_coherence": "1-10 rating: how well the visual and copy tell the same story",
  "scroll_stop_factor": "1-10 rating: likelihood this stops a thumb in feed",
  "scroll_stop_reason": "what specifically creates the stop — contrast? curiosity? pattern break? recognition?",
  "steal_worthy_techniques": [
    "specific structural or visual techniques worth borrowing — these are what carry into Stage 2"
  ],
  "format_match": "which of our format templates this maps to: Headline | Us vs Them | Features & Benefits | Testimonial | Statistics | Before-After | none (new format needed)"
}
```

### Stage 1 Output

The complete JSON object combining all five dimensions. This is the structural blueprint — competitor copy is recorded for analysis only and is discarded before Stage 2.

---

## Stage 2: Rebuild

Generate a NanoBanana 2 prompt that keeps the structural techniques identified in Stage 1 while replacing all copy and brand identity with yours.

### 2.1 Load Format Template

Using `format_match` from Stage 1 editorial judgment:

1. **If a match exists:** Load the corresponding template from `00 Global/Statics Generator/Templates/[Format].md`. The template defines composition layout, typography placement, safe zones, variation vectors, and the compliance line pointing to criteria docs.
2. **If no match exists:** Use the Stage 1 structural analysis as the layout blueprint directly. Flag this as a candidate for a new format template if the pattern recurs.

The format template constrains the rebuild. Stage 1's structural analysis informs what to emphasize within those constraints — which techniques to carry forward, which to discard.

### 2.2 Brand Asset Loading

Before writing the NB2 prompt, confirm these assets exist in `[Brand]/00 Context/`:

- **Brand Spec Card.png** — fonts, colors, logo, CTA styling (uploaded as NB2 reference image)
- **Visual Style Card.png** — photography direction, styling rules, visual do's/don'ts (uploaded as NB2 reference image)
- **Product photo** — the specific product being advertised (uploaded as NB2 reference image)
- **Compliance doc** — any file matching `Compliance`, `Guardrails`, or `Claims` in `00 Context/`. Must be read before any copy is written. Non-compliance is an automatic fail.

If Brand Spec Card or Visual Style Card are missing, generate them first. See `Brand Spec Card Prompt.md` and `Visual Style Card Prompt.md`.

### 2.3 Rebuild Template

The NB2 prompt follows this structure. Fill each section from Stage 1 analysis + brand assets + format template constraints.

```
COMPOSITION
- Format: [format type from template or Stage 1]
- Dimensions: 1080x1920 (9:16 vertical)
- Primary focal point: [from Stage 1, adapted to your brand's product/message]
- Secondary focal point: [from Stage 1, adapted]
- Visual flow: [from Stage 1]
- Grid structure: [from Stage 1]
- Negative space: [from Stage 1 — where and how much]
- Content density: [from Stage 1]

COPY ELEMENTS (all text rendered directly in the image)
- Headline: [YOUR copy — from Stage 3 or pre-approved brief]
  Position: [from Stage 1 element positions]
  Size: [dominant/large — from Stage 1 hierarchy]
- Subheading: [YOUR copy]
  Position: [from Stage 1]
  Size: [from Stage 1]
- Feature pills: [YOUR copy — 2-5 words each, 2-4 pills]
  Position: [from Stage 1]
- CTA: [YOUR copy — 2-4 words, matches offer]
  Position: bottom of ad
- [Additional copy elements per Stage 1 structure]

SAFE ZONES (9:16 vertical, 1080x1920)
- Top 270px: clear of primary content (platform UI zone)
- Bottom 340px: clear of primary content (engagement bar zone)
- Left margin: 40px clear
- Right margin: 120px clear from y=600 downward (side engagement buttons)
- Primary content zone: x=40 to x=960, y=270 to y=1580

COLOR AND MOOD
- Background: [from YOUR Brand Spec Card — not competitor's colors]
- Primary palette: [from YOUR Brand Spec Card]
- Accent colors: [from YOUR Brand Spec Card]
- Lighting: [borrow from Stage 1 if it serves the mood; adapt to brand]
- Energy level: [from Stage 1, adjusted for awareness stage]
- Mood: [from Stage 1 mood keywords, filtered through brand personality]

BRAND IDENTITY
- Logo: [placement per YOUR brand spec sheet]
- Typography: [exact fonts, weights, and colors from YOUR Brand Spec Card]
  Headline font: [from spec card]
  Body font: [from spec card]
  Accent font: [from spec card, if applicable]
- CTA button style: [from YOUR Brand Spec Card — color, radius, text style]

PHOTOGRAPHY / PRODUCT
- Product: [YOUR product — position, angle, and scale specified explicitly]
- Photography style: [from YOUR Visual Style Card]
- Image treatment: [borrow Stage 1 technique if applicable — overlay, cutout, etc.]

STRUCTURAL TECHNIQUES BORROWED
[List the steal_worthy_techniques from Stage 1 editorial judgment.
These are composition/layout/hierarchy techniques, NOT copy or brand elements.]

REFERENCE IMAGES (uploaded to NB2)
1. Brand Spec Card.png (fonts, colors, logo, CTA styling)
2. Visual Style Card.png (photography direction, styling rules)
3. Product photo (specific product being advertised)
```

### 2.4 Rebuild Rules

1. Every piece of copy rendered in the image must come from Stage 3 output or a pre-approved brief. No competitor copy carries into the rebuild.
2. Typography must match the Brand Spec Card exactly. NB2 reads fonts from the uploaded PNG — do not describe fonts by name in the prompt; the spec card shows them.
3. All 10 universal generation rules apply (see Overview.md NanoBanana 2 Prompting Rules).
4. Safe zones are non-negotiable. No primary content in the top 270px, bottom 340px, or right 120px from y=600 down.
5. Prompt length target: 1,000-1,500 words. Under-prompting is worse than over-prompting. NB2 does not make assumptions.
6. Format template constraints override Stage 1 layout when they conflict. The template is the canonical layout spec; Stage 1 informs emphasis within it.
7. Max 2-3 reference images uploaded to NB2. Brand Spec Card + Visual Style Card + product photo is the standard set.
8. Output is one continuous image. No panels, borders, or split frames.

---

## Stage 3: Copy Generation

Write the copy that fills every text element slot identified in Stage 1 and mapped in Stage 2.

### 3.1 Load Copy Inputs

From the inputs defined at the top of this doc:

- **Persona:** Load the full persona profile from `[Brand]/00 Context/Persona Context.md`. Identify VoC language, objections, pain points, and journey-map stages specific to this persona.
- **Messaging Angle:** The core truth for this pain x persona intersection. This is the single idea every copy element must serve.
- **Awareness Stage:** Determines expression. Load the stage-specific approach from Creative Strategy Matrix Step 4.
- **Three Selves Target:** Determines register. Load the language pattern from Creative Strategy Matrix Three Selves Integration.

### 3.2 Load Format Copy Template

If a format template was matched in Stage 1:

1. Load the template's copy structure — which text element slots exist, word count constraints per slot, and any format-specific copy rules.
2. The template defines the slots. Stage 1 defines how many of each slot. Stage 3 fills them.

If no format template was matched, use the Stage 1 copy extraction as the slot map — same number of text elements, same roles, same approximate word counts.

### 3.3 Write Copy Per Slot

For each copy element slot:

| Slot | Constraints | Source |
|---|---|---|
| Headline | 8-12 words, names an experience not a mechanism | Headline & Text Hook Criteria (pick core type + register) |
| Subheading | Brand name + period + mechanism/differentiator, under 10 words | Creative Image Ad Criteria |
| Feature pills | 2-5 words each, benefit-forward | Creative Image Ad Criteria |
| CTA | 2-4 words, action-forward, matches the offer | Creative Image Ad Criteria |
| Testimonial quote | VoC language from reviews, attributed | Review Analysis in `[Brand]/00 Research/` |
| Stat number | Research-backed, never invented | Universal Copy Rules Specificity rules |
| Stat label | Context for the number | -- |
| Other slots | Per Stage 1 structure | Per format-specific criteria |

**Copy must trace to customer language.** Every claim, pain point, and benefit phrasing should come from or be grounded in VoC data from Review Analysis or Persona Deep Research. No invention.

### 3.4 Verify Word Counts

After writing all slots, verify each element against its word count constraint. Static ads are scanned in under 2 seconds. Every excess word costs attention.

| Element | Max Words |
|---|---|
| Headline | 12 |
| Subheading | 10 |
| Feature pill | 5 per pill |
| CTA | 4 |
| Testimonial quote | 25 (for in-image quotes) |
| Stat label | 8 |

### 3.5 Scoring Gate

Copy must pass all 7 scoring dimensions at 90+ before entering the Stage 2 rebuild prompt.

The scoring evaluator (`scoring-evaluator` sub-agent) reads the 7 rubric files in `00 Global/Statics Generator/Scoring Agents/` and returns 7 scores in a single invocation:

| Dimension | Rubric | What It Checks |
|---|---|---|
| Persona Fit | `Persona Fit.md` | Copy speaks to the pain-trigger persona using VoC language |
| Awareness Stage Alignment | `Awareness Stage Alignment.md` | Copy matches intended awareness stage tactics |
| Messaging Angle Coherence | `Messaging Angle Coherence.md` | Copy delivers the specified messaging angle's core truth |
| Three Selves | `Three Selves.md` | Targeted self (Actual/Ideal/Ought) consistent throughout |
| Brand Compliance | `Brand Compliance.md` | Every claim passes brand guardrails |
| Format Compliance | `Format Compliance.md` | Copy fits format constraints (word counts, slot structure) |
| Copy Editor | `Copy Editor.md` | Grammar, banned constructions, formatting. Veto power. |

**Scoring loop:** If any dimension scores below 90, the evaluator returns actionable feedback per dimension. Revise and resubmit. Cap at 5 iterations. If copy cannot reach 90+ across all 7 dimensions in 5 iterations, flag for strategist review.

**Copy Editor has veto power.** A Copy Editor score below 90 blocks the ad regardless of other scores. This dimension enforces Universal Copy Rules and Headline & Text Hook Criteria — banned constructions, em-dash prohibition, specificity requirements, and all cross-format rules.

### 3.6 Map Copy to Rebuild Prompt

After copy passes scoring, map each scored copy element to its corresponding position in the Stage 2 rebuild template. The rebuild prompt receives only scored, approved copy.

```
Stage 1 copy_elements[0].role = "headline"
  → Stage 3 scored headline → Stage 2 COPY ELEMENTS Headline field

Stage 1 copy_elements[1].role = "subheading"
  → Stage 3 scored subheading → Stage 2 COPY ELEMENTS Subheading field

[...continue for all slots]
```

---

## Execution Order

The three stages run in this sequence, but Stage 3 can begin in parallel with Stage 2 preparation:

```
1. Collect inputs (brand, product, persona, angle, awareness stage, Three Selves target)
2. Stage 1: Upload competitor ad, extract structured JSON
3. Stage 2a: Load format template + brand assets (can start immediately after Stage 1)
4. Stage 3: Write copy per slot, run through scoring gate (can run parallel with 2a)
5. Stage 2b: Assemble final NB2 rebuild prompt with scored copy
6. Generate via NB2 (4 variants)
7. Strategist picks best, iterates if needed
```

---

## Batch Mode

When swiping multiple competitor ads in one session:

1. Run Stage 1 on all competitor ads first. Review the JSON extractions as a set — identify which structural techniques appear across multiple ads (proven patterns) vs. one-offs.
2. Assign each swipe its own persona/angle/awareness stage/Three Selves combination from the batch plan.
3. Run Stage 3 for each swipe, scoring each independently.
4. Assemble Stage 2 rebuild prompts only after all copy passes scoring.
5. Generate via NB2 in sequence (each generation needs strategist review before iterating).

---

## Quality Checklist

Before submitting the final NB2 prompt for generation:

1. No competitor copy, tagline, or brand-specific language anywhere in the prompt
2. All copy passed 7-dimension scoring at 90+
3. Copy Editor dimension specifically passed at 90+ (veto gate)
4. Brand compliance doc was read and all claims verified
5. Format template constraints satisfied (if template matched)
6. Safe zones enforced (top 270px, bottom 340px, left 40px, right 120px from y=600)
7. Primary content zone bounded to x=40-960, y=270-1580
8. Brand Spec Card, Visual Style Card, and product photo confirmed for upload
9. All text rendered directly in the image (no post-generation text overlay)
10. No text smaller than 24px equivalent
11. Typography matches Brand Spec Card exactly
12. Logo placement per brand spec sheet
13. Color palette from Brand Spec Card only (no improvised colors)
14. Product position, angle, and scale specified explicitly
15. Prompt length between 1,000-1,500 words
16. Category clarity — headline + subheading + hero combo answers "what is being sold?" on a half-second glance
17. Ad-unit congruence — all narrative elements tell the same story

---

## What This System Does Not Do

- **It does not replace batch planning.** The Creative Strategy Matrix determines which persona/angle/awareness stage cells to target. This system borrows structure from competitors to fill those cells.
- **It does not skip the scoring gate.** Every ad-swipe output runs through the same 7-dimension scoring as any brief produced in the batch flow.
- **It does not generate images autonomously.** The strategist reviews and picks from 4 NB2 variants. Iteration is expected.
- **It does not touch competitor copy.** Structure is borrowed. Copy is generated fresh from VoC data, persona context, and the Creative Strategy Matrix cell assignment.
