# Persona Summary — Comfort Ortho Wear

> Source of truth: `_data/persona-dictionary.json` + classified `reviews.jsonl` + `_data/ad-classifications.json`.
> Full calc: [[Review Analysis - Comfort Ortho Wear]]. Full persona profiles: [[Persona Context - Comfort Ortho Wear]].

> ⚠ **Persona Summary — degraded state**
> - Persona 'The Long-Shift Standing Worker' precision 68% — classification is directional only.
> - Persona 'The Bunion & Structural Foot Problem Buyer' clustered from fewer than 100 tagged reviews — treat as provisional. (37 tagged reviews.)
> - Ad classification precision below 70% on 'The Plantar Fasciitis & Heel Pain Sufferer' after retry (65%). Creative Pillars for this persona are directional only.
> - Ad classification precision below 70% on 'The Long-Shift Standing Worker' after retry (10%). Creative Pillars for this persona are directional only.
> - Ad classification precision not measured for 'The Chronic Joint & Swelling Condition Buyer' — fewer than 5 ads tagged.

---

## 1. Persona Frequency

| Persona | % of Reviews | Avg Rating |
|---|---|---|
| The Long-Shift Standing Worker | 22.4% | 4.72 |
| The Plantar Fasciitis & Heel Pain Sufferer | 21.4% | 4.75 |
| The Chronic Joint & Swelling Condition Buyer | 11.7% | 4.76 |
| The Bunion & Structural Foot Problem Buyer | 5.6% | 4.68 |
| Untagged (no persona match) | 49.8% | — |

**Raw counts:** Long-Shift 149 / PF 142 / Chronic Joint 78 / Bunion 37 / Untagged 331 — total 665 reviews.

**Note on untagged residual:** The 49.8% untagged rate reflects Loox's photo-first format — a significant share of reviews are short captions that lack the condition/job keywords the dictionary requires. This is a platform artifact, not a signal that half of buyers are outside these personas.

---

## 2. Ad Library Orientation

- **Total live ads:** 95 (59 image / 29 video / 5 carousel / 2 DPA)
- **`first_seen` range:** 2026-02-16 to 2026-04-23
- **Campaign context:** All 95 ads are current (within 10 weeks). The brand is actively spending with at least 4 distinct creative angles in rotation simultaneously.

**Recurring primary-text patterns:**

1. **Pain-condition list with emoji bullets** — 77 of 95 ads use the `👟🦶👩‍⚕️` emoji bullet structure naming Plantar Fasciitis, Bunions, Neuropathy, Flat Feet. This is the dominant creative template.
2. **"40% OFF" urgency framing** — 62 of 95 ads contain "40% OFF" in primary text. Discount urgency ("48 HOURS LEFT," "LAST CHANCE," "SELLING OUT") is a brand-wide pattern; no evergreen non-discount creative observed in this window.
3. **Nurse/healthcare worker social proof** — 23 of 95 ads name nurses or healthcare workers in primary text. Many reference "hands-free" or "3 seconds" slip-on ease.
4. **"500,000+ Happy Customers" authority anchor** — 45 of 95 ads include the 500K customer count in primary text or headline.
5. **Mother's Day gifting framing** — 37 of 95 ads are currently in a Mother's Day campaign rotation (active campaign as of 2026-04-23).

**Recurring headline patterns:**

1. **"Gift Your Mother Comfort Beneath Her Feet — Up To 40% OFF Special"** — 18 of 95 ads. Current dominant headline in active campaign.
2. **"Pain-Free Shoes Nurses Recommend"** — 11 of 95 ads. Second most common headline; evergreen nurse pillar.
3. **Urgency countdown variants** — "EARLY BLACK FRIDAY," "HURRY!," "SELLING OUT," "LAST CHANCE," "DAYS LEFT" — 11 of 95 ads combined.
4. **"Expert-Recommended"** — 6 of 95 ads. Generic authority without specific expert named.
5. **"2026's Best Shoes For Women"** — 6 of 95 ads. Year-based social proof/authority.

---

## 3. Creative Pillars

**Ad classification note:** Precision varied significantly by persona. Bunion persona precision 95% (reliable). Plantar Fasciitis precision 65% (directional). Long-Shift Worker precision 10% (unreliable — the nurse testimonial angle overlaps heavily with PF persona and the classifier may be systematically misassigning). Chronic Joint: 0 ads tagged (no ads in this corpus explicitly target arthritis/diabetes/swelling as a primary angle).

| Persona | Angle | Ad Count |
|---|---|---|
| The Plantar Fasciitis & Heel Pain Sufferer | Mother's Day gift: give the gift of foot pain relief. | 16 |
| The Plantar Fasciitis & Heel Pain Sufferer | Hands-free slip-on comfort for fast pain relief | 11 |
| The Plantar Fasciitis & Heel Pain Sufferer | Comfortable, supportive shoes for foot pain, 40% off | 6 |
| The Plantar Fasciitis & Heel Pain Sufferer | 60% off: walk pain-free with orthopedic shoes for plantar fasciitis & bunions. | 6 |
| The Plantar Fasciitis & Heel Pain Sufferer | 500K+ happy customers prove pain relief works | 3 |
| The Plantar Fasciitis & Heel Pain Sufferer | Sitewide 40% off sale | 1 |
| The Plantar Fasciitis & Heel Pain Sufferer | Lasting all-day comfort for reducing foot fatigue. | 1 |
| The Long-Shift Standing Worker | Nurses find relief from foot pain with hands-free shoes. | 17 |
| The Long-Shift Standing Worker | Mother's Day gift: give the gift of foot pain relief. | 3 |
| The Long-Shift Standing Worker | Lasting all-day comfort for reducing foot fatigue. | 2 |
| The Long-Shift Standing Worker | Hands-free slip-on comfort for fast pain relief | 2 |
| The Bunion & Structural Foot Problem Buyer | 60% off: walk pain-free with orthopedic shoes for plantar fasciitis & bunions. | 25 |
| The Bunion & Structural Foot Problem Buyer | Sitewide 40% off sale | 1 |
| The Chronic Joint & Swelling Condition Buyer | (no ads classified) | 0 |

**Pillars** (≥20% of total ad volume OR ≥3× next-largest for same persona):

- "60% off: walk pain-free with orthopedic shoes for plantar fasciitis & bunions." — 31 ads (32.6%)
- "Mother's Day gift: give the gift of foot pain relief." — 19 ads (20.0%)

**Persona ad-share rollup:**
- The Plantar Fasciitis & Heel Pain Sufferer: 46.3% (44 ads)
- The Bunion & Structural Foot Problem Buyer: 27.4% (26 ads)
- The Long-Shift Standing Worker: 25.3% (24 ads)
- The Chronic Joint & Swelling Condition Buyer: 0.0% (0 ads)

---

## Gap Analysis — Recommendation (light)

Review-share vs ad-share observations only. No prescriptions.

- The Long-Shift Standing Worker is the largest persona by review frequency (22.4%) but receives 25.3% of ad spend — roughly proportional.
- The Chronic Joint & Swelling Condition Buyer is the third-largest persona by review frequency (11.7%) with 0% ad representation. All ads in this corpus explicitly address pain and foot conditions — but none appear to lead with arthritis, diabetes, swelling, or joint-replacement language.
- The Mother's Day campaign (19 ads, 20% of total) is a current rotation, not an evergreen pillar — its ad share will shift post-Mother's Day.
- No ads in the classified corpus use the "failed specialist prescription" angle (Sandy P., `loox--7bkEGEVE`) despite it being one of the strongest purchase-driver narratives in the review corpus.
- The caregiver/gift buyer (daughter buying for diabetic mother, granddaughter buying for arthritic grandmother) is a real segment in reviews but not a classified standalone creative angle.

*Last updated: 2026-04-27*
