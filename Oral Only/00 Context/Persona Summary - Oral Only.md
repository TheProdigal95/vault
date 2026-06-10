# Persona Summary — Oral Only

> **30-second orient** for the writer sub-agents at batch execution time.
> Single source of truth: `_data/persona-dictionary.json` + `Reviews/reviews.tagged.jsonl` + `_data/ad-classifications.json` + `_data/pain-clusters.json`.
> Updates at `/refresh=full` flag.

---

## Banner: Small-N Corpus + Forum-Biased Sample

> ⚠️ **This brand has NO third-party review platform** (no Trustpilot, Yotpo, Judge.me). The review corpus is **16 entries**: 3 on-site testimonials (5-star, marketing-shaped) + 13 public forum quotes from ExcelMale + r/Testosterone + r/trt.
>
> Persona frequencies below are **directional only**. The forum quotes skew toward skeptical/critical voice. The on-site testimonials skew toward symptom-relief. The ad library and competitor 1-star reviews are used as triangulation signal to keep the persona definitions honest.
>
> Recommend `/refresh=reviews` after OralOnly accumulates 200+ on-platform reviews or publishes customer testimonials externally.

---

## 1. Persona Frequency Table

Source: `persona-counter-report.json` (16 reviews, 4 personas, dictionary compiled from Gemini LLM open classification). Reviews can match multiple personas (overlap meaningful).

| Persona | Reviews Matched | % of Corpus | Avg Rating (out of 5) | Ad-Library Share (33 real ads) |
|---|---|---|---|---|
| **The Credibility-Conscious Critic** | 10 | 62.5% | 0.5 (forum-weighted) | 1 (3%) |
| **The Protocol-Fatigued Veteran** | 8 | 50.0% | 0.63 (forum-weighted) | 3 (9%) |
| **The Symptom-Focused Solution-Seeker** | 7 | 43.8% | 1.43 (mixed on-site + forum) | 29 (88%) |
| **The Hematocrit Skeptic** | 2 | 12.5% | 0 | 0 |
| Untagged | 1 | 6.3% | — | — |

**Note on ratings**: Most reviews have `rating: null` (forum quotes). The averages shown are computed from the 3 on-site testimonials only. Don't read into the per-persona star averages — they're heavily skewed by which source mix hit that persona.

**Note on overlaps** (key combinations):
- Veteran ∩ Hematocrit (1 review): Freedom40again — the "blood-thickening vet" is a key sub-segment.
- Symptom ∩ Critic (1 review): Daniel R. on-site testimonial "Real labs, real physicians, no gimmicks" — credibility-first optimist.
- Symptom ∩ Veteran (1 review): Day_Dreamer — switched from injectable, currently happy.

---

## 2. Ad Library Orientation

**Total live ads**: 96 (33 with real text, 63 with template placeholders)
**Date range**: 2026-05-20 → present (recent push)
**Persona distribution** (real-text ads only):

| Persona | Ad count | % of real ads |
|---|---|---|
| **The Symptom-Focused Solution-Seeker** | 29 | 88% |
| **The Protocol-Fatigued Veteran** | 3 | 9% |
| **The Credibility-Conscious Critic** | 1 | 3% |
| **The Hematocrit Skeptic** | 0 | 0% |
| N/A | 0 | 0% |

**Ad-library is heavily Symptom-focused** (88% of real ads). The audience-vs-message gap:
- Forum audience: dominated by Critic (62%) and Veteran (50%)
- Ad creative: dominated by Symptom (88%)

**Implication**: A batch that writes only from the Symptom persona will sound exactly like what's already in market. Differentiation will come from Veteran + Hematocrit angles that the current ad set largely misses, AND from Critic-respecting creative that doesn't look AI-generated or amateurish.

---

## 3. Creative Pillars (synthesized from corpus + ads + competitor 1-stars)

These pillars organize every brief. Pillars derive from pain-clusters.json.

### Pillar 1 — "Tired of the Needle" (Veteran + Critic-via-quality)
- **Hook type**: Veteran resignation + Veteran transition
- **Pain language**: "tired of pinning", "20 years of needles", "switched from injectable", "no more weekly shots"
- **Proof type**: Tenure + lab values + "I forget I'm even on T now" lifestyle
- **Risk**: Sounds too "needle-phobic" — frame as "convenience + control" not fear

### Pillar 2 — "The Blood Test You Don't Have to Take" (Hematocrit Skeptic)
- **Hook type**: Specific medical concern + Resolution
- **Pain language**: "hematocrit 50+", "phlebotomy", "blood thick", "my HCT was 56 in 2 months"
- **Proof type**: Comp lab values (oral T's HCT impact), physician quotes on diurnal vs. supraphysiologic
- **Risk**: Sounds too "medical" — frame around "feeling normal" + "no extra blood draws"

### Pillar 3 — "Real Doctors, Real Labs, No Gimmicks" (Critic-as-primary)
- **Hook type**: Anti-cretin + Clinical credibility
- **Pain language**: "Temu for roids", "AI-generated", "scam", "no science"
- **Proof type**: Physician name + face, lab requisition example, white paper link, before/after lab values
- **Risk**: Sounds defensive — frame as "we built the clinic we wished existed"

### Pillar 4 — "The Energy/Sleep Return" (Symptom — already dominant in ads)
- **Hook type**: Symptom stacking + Outcome contrast
- **Pain language**: "exhausted", "brain fog", "low drive", "I don't feel like myself"
- **Proof type**: Member testimonial with tenure + lab values
- **Risk**: Sounds generic — every wellness brand uses this. Differentiate with the diurnal mechanism.

### Pillar 5 — "Lab-First, Not Guess-First" (Sub-Symptom)
- **Hook type**: Data-first + "show me the numbers"
- **Pain language**: "I want to know my numbers", "I don't trust guesswork", "what's actually off"
- **Proof type**: Lab panel example, $129 entry fee, "if you don't qualify, you don't pay" framing
- **Risk**: Sounds too cautious — frame as "smart, not slow"

---

## 4. Persona × Pillar Map (where to focus creative)

| Persona | Primary Pillar | Secondary Pillar | Avoid Pillar |
|---|---|---|---|
| Symptom-Focused Solution-Seeker | Pillar 4 (Energy/Sleep) | Pillar 5 (Lab-First) | Pillar 1 (Needle) — they're not yet on T, needle pain is hypothetical |
| Protocol-Fatigued Veteran | Pillar 1 (Tired of Needle) | Pillar 4 (Energy — compare to inject) | Pillar 5 (Lab-First) — they already know their numbers |
| Hematocrit Skeptic | Pillar 2 (No Blood Test) | Pillar 1 (Needle) | Pillar 4 alone — too generic |
| Credibility-Conscious Critic | Pillar 3 (Real Doctors) | Pillar 5 (Lab-First) | Pillar 1 alone — sounds needle-phobic without substance |

---

## 5. Light Gap Recommendation

**The biggest creative whitespace**: Pillar 1 (Tired of Needle) + Pillar 2 (No Blood Test) targeting the **Veteran ∩ Hematocrit** sub-segment.

- **Forum voice is rich here**: Freedom40again (HCT 48→56, "looking for short-half-life options to minimize sides") and vdux (20yr pinner, "hematocrit is going to go through the roof") are exactly the buyers most likely to convert — they already have the data, they have the pain, they have the budget.
- **Current ad set barely covers them**: 9% Veteran, 0% Hematocrit in the 33 real ads.
- **Why this matters for the brand**: This segment is the easiest to convert (already on TRT, just want a different delivery) and the highest LTV (they're committed to ongoing therapy, just want a better option).

**Recommended batch T001 mix**:
- 30% Veteran (Pillar 1)
- 25% Hematocrit Skeptic (Pillar 2)
- 20% Critic (Pillar 3) — to earn trust
- 15% Symptom (Pillar 4)
- 10% Lab-First (Pillar 5)

(Specific batch planning lives in T001 Working Document.md, not here.)

---

## 6. Stage + Awareness (Eugene Schwartz)

| Persona | Typical Stage | Creative tone |
|---|---|---|
| Symptom-Focused Solution-Seeker | 2-3 (Problem → Solution aware) | Identity-level, emotional, "you don't feel it yet" |
| Protocol-Fatigued Veteran | 3-4 (Solution → Product aware) | Comparative, mechanism-heavy, "here's why this works differently" |
| Hematocrit Skeptic | 3-4 (Solution → Product aware) | Medical-credible, lab-value-led, "here's the hematocrit impact" |
| Credibility-Conscious Critic | 3-4 (Solution → Product aware) | Anti-marketing, physician-led, "we built the clinic we wished existed" |

---

## 7. Cross-References

- **Persona definitions + supporting quotes**: see `Persona Context - Oral Only.md`
- **Journey maps + Part 3 (deep psychology)**: see `Persona Deep Research - Oral Only.md`
- **VoC source quotes + sampling**: see `Review Analysis - Oral Only.md`
- **Competitor 1-star themes + counter-angles**: see `Positioning Ammo - Oral Only.md`
- **Pain clusters + ad-angle derivation**: see `_data/pain-clusters.json`

---

*Generated 2026-06-10 by brand-researcher pipeline. Banner reflects small-N corpus. Re-run at `/refresh=full` once a real review platform is integrated or 200+ on-platform reviews accumulate.*
