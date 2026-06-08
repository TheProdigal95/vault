# Brand Compliance

Scores whether every claim passes brand guardrails and compliance requirements.

---

## What This Dimension Evaluates

Every claim, ingredient reference, pricing mention, dosage number, and legal disclaimer in the copy must be traceable to the brand's compliance documentation. This is not about good copy — it is about whether the copy can legally run. A brilliant ad that makes a prohibited claim is worthless.

---

## Required Reads

- `[Brand]/00 Context/` — any file matching `Compliance`, `Guardrails`, or `Claims` in the filename (e.g., `Compliance - Marketing Rules.md`, `Guardrails & Claims - IM8.md`)
- These files are client-supplied and canonical. Their rules override every other criteria doc.

---

## Scoring Criteria

### What earns points

1. **Every claim traceable** — each health claim, efficacy statement, or mechanism claim in the copy has a matching approved claim in the compliance doc
2. **Approved language used** — when the compliance doc specifies approved wording for a claim, the copy uses that wording (or a close paraphrase that doesn't change the meaning)
3. **Pricing exact** — dollar amounts, subscription terms, trial offers match the compliance doc precisely
4. **Ingredient references accurate** — names, dosages, forms (e.g., "magnesium glycinate" not just "magnesium") match what the brand has documented
5. **Required disclaimers present** — if the compliance doc mandates specific disclaimers for certain claim types, those disclaimers appear in the brief's Mandatory Disclaimer section
6. **Prohibited territory avoided** — the copy does not enter any territory the compliance doc explicitly bans (cure language, guaranteed results, specific medical conditions if restricted)

### What loses points

1. **Unverified stat** — a number, percentage, or clinical reference appears in the copy without a corresponding entry in the compliance doc
2. **Wording variance that shifts meaning** — the compliance doc says "supports healthy sleep" and the copy says "fixes your sleep" (different claim strength)
3. **Missing disclaimer** — the claim type requires a disclaimer per compliance but none appears
4. **Ingredient inaccuracy** — wrong form, wrong dosage, wrong name for an ingredient
5. **Pricing drift** — the copy mentions a price point or offer that doesn't match current approved pricing

---

## Calibration

| Score | Description | Example |
|-------|-------------|---------|
| 60 | Most claims compliant but one unverified stat or unapproved claim. The bulk passes, one element cannot be traced to compliance. | Copy says "clinically proven to reduce bloating by 67%" but compliance doc only approves "clinically studied to support digestive comfort" |
| 80 | All claims compliant, minor wording variance from approved language. No prohibited claims, but phrasing is slightly stronger than the approved version. | Compliance says "may help support healthy cortisol levels" — copy says "helps manage cortisol" (dropped the hedge, slightly stronger) |
| 95 | Every claim traceable to compliance doc. Pricing exact. Ingredient names/dosages correct. Disclaimers present where required. No prohibited territory entered. | Copy uses "supports healthy sleep patterns" (matching compliance), "$49/month" (matching pricing), lists "Magnesium Glycinate 400mg" (matching ingredient spec), disclaimer present |

---

## Instant Fail (score capped at 59)

- **Any claim the compliance doc explicitly prohibits.** If the compliance doc says "never use cure language" and the copy says "cures insomnia," that is an automatic fail regardless of every other dimension. Same for "guaranteed results" when the brand forbids guarantee claims, disease-specific claims when the brand restricts to structure/function claims, or any explicitly banned phrase.

---

## Special Rule: No Compliance Doc

If the brand's `00 Context/` folder contains no file matching `Compliance`, `Guardrails`, or `Claims`:
- Score defaults to **90** (baseline pass)
- Feedback note: "No compliance doc found for this brand. Brand-general rules applied (no cure language, no guaranteed results, no unverifiable stats). If the brand has compliance requirements, add them to `[Brand]/00 Context/` before the next batch."
- Brand-general rules still apply: no cure language, no "guaranteed" results claims, no unverifiable statistics, no disease-specific claims without hedging

---

## Feedback Format

When score is below 90, feedback must include:
1. The specific claim, price, or ingredient reference that triggered the deduction
2. What the compliance doc actually says (exact quote from the doc)
3. A rewrite that uses the approved language — not "make it compliant" but "replace 'fixes your sleep' with the approved claim 'supports healthy sleep patterns' from [Compliance doc name], section X"
