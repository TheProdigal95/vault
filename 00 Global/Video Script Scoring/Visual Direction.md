# Visual Direction

Scores the quality and specificity of the Visual Direction block, per-beat Visual column cells, and References — the three things the editor actually works from.

---

## What This Scores

The Visual Direction block, Visual column cells, and References section are what the editor actually works from. Vague direction ("lifestyle B-roll, warm tones") forces the editor to guess. Broken or irrelevant references waste the editor's time. This dimension evaluates whether the Visual Direction provides enough specific, editor-actionable guidance — covering b-roll types, caption style, edit pace, and color treatment — whether every Visual column cell names subject, action, framing, and modality, and whether References are valid, relevant, and visually described. The benchmark is IM8 T004-T005 quality: 5-6 lines covering all four areas, with ~2-3 second b-roll beat cuts and every choice traceable to a References entry.

---

## Required Reads

- `00 Global/Criteria/Video Script Criteria.md` -- Visual & B-Roll Criteria (13-rule audit), Visual Direction section (format conventions, no Tone filler, cross-beat directives only, no header duplication), Caption Style Taxonomy, References section
- `00 Global/Process/Critique Methodology - Video.md` -- Visual-direction audit criteria (specificity, modality variety, anchor, cross-script repeat-shot check)

---

## Calibration Table

| Score Range | Description | Example |
|---|---|---|
| 90-100 | Visual Direction has 5-6 lines covering b-roll approach, caption style, edit pace, and color treatment. Every Visual column cell names subject + action + framing + modality. Body beats >=10s specify >=3 distinct footage types. ~2-3 second cuts for b-roll beats. Every Visual Direction choice traces to a References entry. No Tone filler bullet. No per-beat walkthrough in Visual Direction (that belongs in the table). | Visual Direction: B-roll (woman 45-55, specific scenarios), Caption style (two-tier system with specifics), Edit pace (punchy Part 1, measured Part 2), Color (warm amber lifestyle, cool white mechanism, brand red CTAs). Visual cells: "Woman 50+ holding a single magnesium bottle, looking unsure -- medium shot, soft daylight." |
| 70-89 | Visual Direction covers 3-4 areas but one is missing or vague. Most Visual column cells are specific but 1-2 are generic. Body beats >=10s have 2 footage types instead of 3. Some Visual Direction choices lack References anchors. | Visual Direction has B-roll and Caption style but no Color line and Edit pace is just "fast." One Visual cell says "B-roll of sleep." Most are specific. |
| 50-69 | Visual Direction is 2-3 generic lines. Multiple Visual column cells lack specificity (no subject, no framing, no modality). Visual Direction includes a Tone filler bullet. Includes per-beat walkthrough that belongs in the table. Several choices have no References anchor. | Visual Direction: "Tone: warm and empathetic. B-roll: lifestyle footage. Caption style: bold text." Visual cell: "Product shot." No edit pace, no color, no specific subjects. |
| Below 50 | Visual Direction is absent or 1 line. Visual column cells are mostly "B-roll" or "lifestyle footage" with no specificity. Editor has no actionable guidance. Modality is single-type across the whole script. | Visual Direction: "Lifestyle B-roll with warm tones." Every Visual cell: "Lifestyle B-roll." |

---

## Instant-Fail Triggers

- **Visual Direction block is absent.** A script with no Visual Direction gives the editor nothing to work from. Auto-score 0.
- **More than half of Visual column cells lack subject + action + framing + modality.** Per Video Script Criteria Visual & B-Roll rule 2 -- generic cells are not editor-actionable.
- **Script uses a single visual modality throughout (non-UGC format) with no intentional exception noted.** Per Video Script Criteria Visual & B-Roll rule 4 -- pure single-modality loses engagement.

---

## Scoring Checklist

Evaluate each item by reference to the criteria docs named above. Do not duplicate the rules here. The 13-rule audit from Video Script Criteria Visual & B-Roll Criteria is the primary checklist:

- **Anchor to References:** Every Visual Direction choice traces to a References-block entry. Per Video Script Criteria rule 1.
- **Cell specificity:** Every Visual cell names subject + action + framing + modality. Per rule 2.
- **Beat alignment:** The shot matches what the VO says in that cell. Per rule 3.
- **Modality variety:** 2-3 distinct visual modalities across hook + body + close (not kitchen-sink 5+, not single-type). Per rule 4.
- **Mechanism cutaway pairing:** Any mechanism-explanation beat gets a CGI/animation/overlay assigned. Per rule 5.
- **Source per beat:** Each Visual cell implies its source (brand assets, stock, CGI, creator). Per rule 6.
- **No repeat shots:** Same visual max twice per script. Per rule 7.
- **Edit-pace coherence:** Visual Direction pace descriptor matches the implied cut rate in cells. Per rule 8.
- **Readable cell formatting:** Multi-element cells use `<br><br>` separation. Per rule 9.
- **Visual variety floor:** Body beats >=10s specify >=3 distinct footage types. Per rule 10.
- **No source citations in Visual cells:** No `Source:` URLs in Visual column. Per rule 11.
- **Beat segmentation follows visual change:** Don't split rows if Visual column repeats same setup. Per rule 12.
- **VO + B-roll coverage floor:** New shot or cutaway roughly every 2-4 seconds. Per rule 13.
- **Visual Direction format:** No Tone filler bullet. Cross-beat directives only (no per-beat walkthrough). No header duplication. Per Video Script Criteria Visual Direction format conventions.
- **Caption style specified:** Caption style named and described in Visual Direction. Per Video Script Criteria Caption Style Taxonomy.
- **B-roll cut rate:** ~2-3 second cuts for b-roll beats (IM8 T004-T005 benchmark).

---

## Feedback Format

When scoring below 90, provide:
- Which of the 13 rules or format checks failed, citing the rule number from Video Script Criteria Visual & B-Roll Criteria
- The specific Visual Direction line or Visual cell that triggered the deduction
- A concrete fix -- not "add more detail" but "rewrite Visual cell at 0:08 from 'B-roll of sleep' to 'Woman 50+ tossing in bed, blue-toned bedroom, close-up of face against pillow -- handheld, soft ambient light'"
