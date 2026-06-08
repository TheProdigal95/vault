# Format Compliance

Scores whether copy fits the assigned format's structural constraints and brief conventions.

---

## What This Dimension Evaluates

Every format (Headline + Image, Us vs Them, Features & Benefits, Testimonial, Statistics, Before-After) has specific structural rules: element counts, word limits, section order, required and optional sections. The copy must fit within these constraints. A great headline that's 20 words long fails a format that caps at 12. A brief missing its References section fails structure.

---

## Required Reads

- `00 Global/Criteria/Creative Image Ad Criteria.md` — headlines (8-12 words), subheadings (under 10 words, brand name + period + mechanism), feature pills (2-5 words, 2-4 pills), in-image CTA (2-4 words), image direction rules, category clarity, ad-unit congruence
- `00 Global/Process/Brief Structure.md` — section order, References format (category headings, top-level bullets only), Image Direction rules (first bullet is "Image to generate:", no background color), Designer Note rules (optional, omit when boilerplate), Mandatory Disclaimer placement, Diagram Example spec, Pre-Content Block Economy
- `00 Global/Statics Generator/Templates/[format].md` — the specific format template if `format_template` is specified (composition, element counts, rendering constraints)

---

## Scoring Criteria

### What earns points

1. **Word counts within spec** — headline (8-12 words), subheading (under 10 words), pills (2-5 words each), CTA (2-4 words)
2. **All required elements present** — headline, subheading, pills (2-4), CTA, primary text, image direction
3. **Section order matches Brief Structure** — References before Image Direction before Designer Note before Mandatory Disclaimer before Headline Variations before Diagram Example before Primary Text
4. **References format correct** — category headings, top-level bullets only, no nested sub-bullets, each bullet describes what to take from the reference
5. **Image Direction format correct** — first bullet is "Image to generate:", no background color specified, one committed visual (no A/B/C options)
6. **Pre-Content Block Economy** — Designer Note omitted when it would only restate Image Direction; no blank lines between headings and first bullets; filler language cut
7. **Mandatory Disclaimer in own section** — not buried in Designer Note or Image Direction
8. **Format-specific rules pass** — if using a format template, all template-specific constraints met (element counts, layout zones, composition rules)

### What loses points

1. **Word count violations** — headline over 12 words, subheading over 10 words, pills over 5 words, CTA over 4 words
2. **Missing required elements** — no subheading, no CTA, no image direction, no primary text
3. **Wrong section order** — sections out of sequence per Brief Structure
4. **References format violations** — nested sub-bullets, missing category headings, sub-bullets that merely restate the parent link's name
5. **Image Direction violations** — missing "Image to generate:" first bullet, background color specified, multiple uncommitted options
6. **Unnecessary Designer Note** — present but only contains boilerplate ("use your judgment on layout")
7. **Diagram Example bloat** — for table/chart/grid formats, Diagram Example includes background notes, emoji, logo placeholders, or disclaimer annotations instead of the minimal five elements (headline + chart + logos + subheading + CTA)

---

## Calibration

| Score | Description | Example |
|-------|-------------|---------|
| 60 | Correct format but word counts exceeded and required elements missing. The format is identifiable but constraints are not met. | Headline is 18 words, pills are full sentences (8-10 words each), no subheading, References uses nested sub-bullets |
| 80 | All elements present, minor constraint miss. The brief is structurally sound with one small violation. | Everything correct but headline is 14 words (2 over limit) and one pill is 6 words (1 over). Section order and References format are correct. |
| 95 | Every element within spec, section order matches Brief Structure, all format-specific rules pass. Pre-content blocks are tight and economical. | Headline 10 words, subheading 8 words with brand name + period, 3 pills at 3-4 words each, CTA 3 words, References with category headings and top-level bullets, Image Direction starts with "Image to generate:", no boilerplate Designer Note, Mandatory Disclaimer in own section |

---

## Instant Fail (score capped at 59)

- **Wrong format entirely.** If the batch plan assigns "Headline + Image" but the brief is structured as a Testimonial (with quote block, attribution, and testimonial-specific elements), that is a format mismatch regardless of copy quality.

---

## Feedback Format

When score is below 90, feedback must include:
1. Which format rule was violated and where in the brief
2. The current value vs. the required constraint (e.g., "headline is 16 words, limit is 12")
3. A specific fix — not "shorten the headline" but "cut 'that you need to know about' to bring it from 16 to 10 words: '[revised headline]'"
