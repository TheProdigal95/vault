---
cssclasses:
  - table-wide
  - wide
---
# T005 — IM8 End Cards (AI Execution)

---

## Raw Notes — Batch Direction

> **Do more "statistic, common symptom"** with an offer component on every card.
> Target Menopause, Gut Health, and other personas.

**Performance signals (Axon, May 12–18):**
- GA cards lead on CTR: GA-07 (4.91%), GA-05 (4.49%), GA-09 (4.45%)
- Menopause cards get spend-scaled: Menopause2 = $2,595 / 33K impressions at 3.18%
- Offer integration works: RD-Offer2 (4.38% CTR) >> Offer3 (3.18%) >> Offer4 (3.12%) — offer as secondary element, not card lead
- stats-grid-v3 and ingredient-wall-v2 (May 14 batch) tracking at ~3.60% — early but hold the format

**Batch targets:**
- 10 endcards total
- Persona split: Menopause (4), General/Cross-Persona (3), Gut Health (2), GLP-1 (1)
- Offer component on every card — sits in the design right above the bottom 15% CTA zone
- All 5 color systems (mandatory for 10+ batches per criteria)

**Layout rule:**
- CTA button is NOT part of the generated design — the platform renders it in the bottom ~15% of the frame
- The offer component (e.g., "30% off your first order · $72 Welcome Kit") is a designed visual element positioned immediately above that CTA zone
- Stat/symptom leads the card; offer is the visual closer before the CTA

---

## Batch Setup

**Product:** Daily Ultimate Essentials Pro
**Platform:** AppLovin
**Output path:** `IM8/00 Assets/Statics/`
**Canvas:** `IM8/T005 Images.canvas`
**Criteria doc:** `IM8/00 Context/End Card Criteria - IM8.md`

---

## Batch Plan

| # | Persona | Angle | Headline Direction | Comp Type | Palette / Texture | Proof Zone | Offer Component (above CTA zone) |
|---|---|---|---|---|---|---|---|
| 1 | Menopause | Symptom: Sleep loss | "80% of women say poor sleep is their #1 menopause complaint" — stat-first confrontation | 3A — B-Roll Hero Window | Light | Trust: 6,000+ Reviews · NSF Certified · 90-Day Guarantee | $72 Welcome Kit · 90-Day Risk-Free Guarantee |
| 2 | Menopause | Stat: Energy | Giant "95%" as typographic anchor — "of users felt more energy" sub-hl | 3D — Typographic Hero | Dark | Ingredient: Saffron 30mg · B12 83x DV · Magnesium Bisglycinate | $72 Welcome Kit on your first order |
| 3 | Gut Health | Stat: Digestion | "85% of users felt better digestion" — B-roll of gut comfort lifestyle | 3A — B-Roll Hero Window | Blue Molecular | Ingredient: Prebiotics · Probiotics 10B · Postbiotics | $72 Welcome Kit · Free Shipping |
| 4 | Menopause | Symptom: Brain fog | "BRAIN FOG DURING MENOPAUSE IS NOT AGING. IT'S NUTRIENT DEPLETION." — bold sans-serif confrontational | 3D — Typographic Hero | Red Organic | Ingredient: Saffron 30mg · Lion's Mane · P5P | $72 Welcome Kit on your first order |
| 5 | General | Multi-stat grid | 4-cell grid: 95% Energy / 85% Digestion / 80% Sleep / 75% Focus — approved stats only | 3H — Infographic Grid | Light | Trust: 90 Nutrients · NSF Certified · 6,000+ Reviews | 30% off your first order · Free Shipping · $72 Welcome Kit |
| 6 | Gut Health | Symptom: Root cause | "YOUR GUT IS THE ROOT OF EVERYTHING." — symptom confrontation | 3F — Textured Bg + Floating Window | Terracotta | Offer: $72 Welcome Gifts · Free Shipping · 90-Day Guarantee | 30% off + $72 Welcome Kit · Risk-Free |
| 7 | GLP-1 | Symptom: Muscle loss | "GLP-1 Is Working. But It May Be Costing You Muscle." — elegant serif, emotional | 3A — B-Roll Hero Window | Dark | Ingredient: HMB · Leucine · Magnesium Bisglycinate | $72 Welcome Kit · 90-Day Guarantee |
| 8 | Menopause | Symptom: Joint stiffness | "JOINT STIFFNESS DURING MENOPAUSE IS NOT INEVITABLE." — bold sans-serif, empowered woman B-roll | 3A — B-Roll Hero Window | Terracotta | Ingredient: MSM 1,500mg · Turmeric · Tart Cherry | $72 Welcome Kit · 90-Day Risk-Free Guarantee |
| 9 | General | Stat: Focus | Giant "75%" typographic anchor — "of users noticed sharper focus" sub-hl | 3F — Textured Bg + Floating Window | Red Organic | Ingredient: Saffron 30mg · Lion's Mane · P5P | 30% off + $72 Welcome Kit on first order |
| 10 | Fitness / Energy | Symptom: Recovery lag | "STILL SORE 48 HOURS LATER? YOUR RECOVERY IS MISSING 6 KEY NUTRIENTS." — bold sans-serif, empowered athlete B-roll, seal as authority anchor | 3G — Textured Bg + Seal | Blue Molecular | Ingredient: HMB · CoQ10 100mg · MSM 1,500mg | $72 Welcome Kit · Free Shipping |

---

## Batch Planning Checklist

Before generating, verify:

- [ ] All 5 color systems used: Light (#1, #5) · Dark (#2, #7) · Blue Molecular (#3, #10) · Red Organic (#4, #9) · Terracotta (#6, #8)
- [ ] No 3+ consecutive cards in same palette
- [ ] Composition types: 3A (×4), 3D (×2), 3H (×1), 3F (×2), 3G (×1) — 5 types ✓
- [ ] No 4+ consecutive same composition type
- [ ] CTA button NOT in generated design — bottom 15% left blank for platform render
- [ ] Every card has an offer component as the visual closer above the CTA zone — stat/symptom leads
- [ ] 30% off language on exactly 3 cards (#5, #6, #9)
- [ ] All stats match approved phrasing exactly
- [ ] FDA disclaimer on every card with health claims
- [ ] IM8 logo / wordmark on every card
- [ ] Badge content type matches card intent (ingredients / trust / offer — never mixed)
- [ ] CTA text matches card intent

---

## Compliance Quick-Reference

- Approved stats (exact phrasing): "95% of users felt more energy" · "85% of users felt better digestion" · "80% of users felt they slept better" · "75% of users noticed sharper focus"
- "90 clinically dosed ingredients" and "NSF Certified for Sport" — approved
- FDA disclaimer required on health-claim cards: *"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."*
- Full guardrails: [[Guardrails & Claims - IM8]]

---

## Context Files

| File | What It Provides |
|---|---|
| `IM8/00 Context/End Card Criteria - IM8.md` | 5-layer stack, 8 comp types, palettes, typography, proof zone rules, anti-patterns |
| `IM8/00 Context/Guardrails & Claims - IM8.md` | Approved claims and compliance rules |
| `IM8/00 Context/Brand Spec Card.png` | Brand color and logo reference |
| `IM8/00 Context/Visual Style Card.png` | Visual language reference |
| `IM8/00 Context/Background Texture Art Direction.md` | Texture world specifications |
