---
cssclasses:
  - table-wide
  - wide
---
# Top Spenders Analysis — Lifeforce — T005

**Date:** 2026-06-11
**Source Data:** Motion API pull — last 14 days (2026-05-28 → 2026-06-10), top 20 creatives
**Motion Report:** [Lifeforce Top Creatives](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/top/697a256f5582f2ae4ee9dd41)
**Media Analysis:** Visual evidence in T004 References. No fresh Gemini pass — engines already documented in T004 Scripts.

---

## TLDR Key Learnings

> 5-8 bullets. What changed since last analysis. What's working. What's dead. What's missing. Which heuristics and creative choices are driving results.

1. **CORE vs. TRT are two different ad accounts running the same product family.** Split the data and the formats diverge: CORE = Tony SALE + peak performance + high ROAS, low volume. TRT = 90-Day Timeline + Reddit/Tweet native + lower ROAS, high volume. Don't blend learnings across them.
2. **TRT 90-Day Timeline is the engine.** 21 purchases (most in account), $651 CPA, 0.14 ROAS. Engine: easy-to-understand step progression (Day 1 → Week 2 → Month 1 → Month 3) + the "feel like yourself again" identity-loss phrase embedded in Month 1. Identity loss — not fatigue, not symptoms — is the emotional territory.
3. **Native formats (Reddit, Tweet) work for TRT, not for CORE.** Reddit_5_T00202 = $9K / 17 purch / $537 CPA. Tweet_TRT_V4 = $3.3K / 6 purch / $556 CPA. The dead Reddit sibling (T00203) failed on messaging, not format. Implication: keep the format, iterate the messaging.
4. **Tony Robbins SALE is CORE's only big winner.** 0.32 ROAS at $14.7K spend, 12 purchases. The SALE + Peak Performance + $150 OFF combo works. Tony's other CORE frames (Cost Breakdown V1/V2, both $3.4K combined spend / 0 purchases) are dead. SALE is the frame that converts, not Tony alone.
5. **Health Obsessed Case Study (video) is the only working video format.** $2.5K / 6 purch / 0.12 ROAS / $408 CPA. 3 of 4 videos in the L14 top-20 underperform (ROAS 0.03-0.06). Implication: limit new video concepts to the case-study structure.
6. **CORE has a 60% dead creative rate (6 of 10); TRT has 11% (1 of 9).** CORE is higher-risk per concept. Plan CORE test slots accordingly — expect more kills.
7. **Quarterly testing is the under-used differentiator.** Most providers test yearly; Lifeforce tests quarterly. Re-frames the value prop from "we'll fix you" to "we'll catch what drifts." See `T005 Working Document > Raw Notes > Quarterly Testing Differentiator` for hook territory.
8. **Low-spend ROAS signals to monitor (cleared $300 floor, low purchase count):** LF-Tony-AccessHealth-QuoteDream (0.30 ROAS, 2 purch) and 2024_12_PR - 4_G1_MEN (0.26 ROAS, 2 purch) — promising but unproven. Don't write full briefs on them yet.

---

## Product-Line Split — L14

| Metric | CORE | TRT | Combined |
|---|---:|---:|---:|
| Creatives | 10 (8 image / 2 video) | 10 (6 image / 4 video) | 20 |
| Total spend | $41,132 | $46,725 | $87,857 |
| Total purchases | 27 | 66 | 93 |
| **Weighted ROAS** | **0.20** | 0.10 | 0.12 |
| **CPA** | $1,523 | **$708** | $945 |
| Dead spend | $7,094 (17% of CORE) | $538 (1% of TRT) | $7,632 |
| % of total spend | 47% | 53% | 100% |
| % of total purchases | 29% | 71% | 100% |

**Read:** CORE is the efficiency engine (2x ROAS, 1.7x higher CPA per purchase). TRT is the volume engine (2.4x purchases, 2.2x more efficient per purchase). CORE pays more per purchase but gets more revenue per purchase. Both product lines need to be running.

---

## Top Spenders — All 20 (L14, sorted by spend ↓)

| # | Creative | Type | Product Line | Spend | ROAS | CTR | Purchases | CPA |
|---|---------|:----:|:----:|------:|-----:|----:|----------:|----:|
| 1 | [Core - Sale - Top Performer Edit](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/69c190e23ea1439320dce781?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | CORE | $15,481 | 0.18 | 2.14% | 7 | $2,212 |
| 2 | [Core - Tony Robbins - SALE - Peak Performance](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/699ced03d7b54bd21ae2d260?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | CORE | $14,772 | **0.32** | 0.95% | 12 | $1,231 |
| 3 | [TRT - 90 Day Timeline](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/697a25753bac25b1dbf105ad?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | TRT | $13,680 | 0.14 | 1.16% | **21** | $651 |
| 4 | [NP - TRT - Digital LF BA TRT Lifestyle (2)](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/6a17789a5973d5b54fa08203?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Video | TRT | $10,756 | 0.06 | 1.51% | 10 | $1,076 |
| 5 | [NP - TRT - Reddit_5_T00202](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/6a1e1e345973d5b54f3d8f0e?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | TRT | $9,125 | 0.09 | **1.80%** | 17 | **$537** |
| 6 | [NP - TRT - Tweet_TRT_V4](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/69cc144e1ae2df5b3c5d466a?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | TRT | $3,334 | 0.09 | 1.58% | 6 | $556 |
| 7 | [TRT - Tony - Frame 2](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/697a25753bac25b1dbf10597?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | TRT | $3,093 | 0.11 | 1.00% | 7 | **$442** |
| 8 | [Reach - TRT - Before & After](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/69ec581dab5d13a5b5ee1673?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Video | TRT | $3,066 | 0.06 | **2.78%** | 1 | $3,066 |
| 9 | [NP - CORE - Tony Robbins Cost Breakdown V2](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/6a17a2c25973d5b54ffe05d7?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | CORE | $2,914 | 0.00 | 1.89% | 0 | — |
| 10 | [NP - CORE - Health Obsessed Case Study hook2](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/6a17a2c25973d5b54ffe0580?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Video | CORE | $2,451 | 0.12 | 2.64% | 6 | $408 |
| 11 | [NP - TRT - UGC Personal Narrative v1_2](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/6a17789a5973d5b54fa0814b?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Video | TRT | $1,534 | 0.03 | 2.05% | 1 | $1,534 |
| 12 | [Core - LF-Tony-AccessHealth-QuoteDream](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/69ae50bf627a9fffb77732a5?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | CORE | $1,334 | **0.30** | 1.19% | 2 | $667 |
| 13 | [Core - LF vs. PCP - 10 min or a lifetime](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/69d355034dbfa8a40bbe4f21?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | CORE | $1,018 | 0.00 | 0.66% | 0 | — |
| 14 | [NP - 2024_12_PR - 4_G1_MEN (1)](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/697a258c3bac25b1dbf140d7?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Video | TRT | $950 | **0.26** | 2.57% | 2 | $475 |
| 15 | [Core - Us vs Them - $1.37 Background](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/69f9959a8cb4477ac7e5092f?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | CORE | $943 | 0.00 | 1.17% | 0 | — |
| 16 | [NP - CORE - Health Obsessed Case Study hook3](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/6a17a2c25973d5b54ffe04e7?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Video | CORE | $913 | 0.00 | 3.06% | 0 | — |
| 17 | [Core - BOF Sale - Still thinking](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/69d9d0a24dbfa8a40b0a11a3?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | CORE | $777 | 0.00 | 0.78% | 0 | — |
| 18 | [NP - LF Static - TRT - TRT Timeline - 7172](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/6a1de6175973d5b54fb1f8de?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | TRT | $650 | 0.08 | 1.35% | 1 | $650 |
| 19 | [NP - TRT - Reddit_5_T00203](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/6a1e1e335973d5b54f3d8e5b?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | TRT | $538 | 0.00 | 1.16% | 0 | — |
| 20 | [NP - CORE - Tony Robbins Cost Breakdown V1](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/697a256b66437695f674687d/creative/6a17a2c25973d5b54ffe0703?startDate=2026-05-28&endDate=2026-06-10&datePreset=last_14d) | Image | CORE | $530 | 0.00 | 1.68% | 0 | — |

---

## ROAS-Getters — L14 (spend ≥ $300)

> Per the strategist's $300-spend floor rule (June 11, 2026). In the L14 top-20, all creatives have spend > $300, so the floor does not filter anyone out. The rule's value shows up in shorter windows (L7, L3) where a $150 test creative might briefly hit 0.20 ROAS off 2 purchases; those are excluded.

| ROAS | Creative | Spend | Purchases | CPA | Signal |
|-----:|---------|------:|----------:|----:|:-------|
| **0.32** | Tony Robbins SALE - Peak Performance | $14,772 | 12 | $1,231 | ✅ Best ROAS at scale — CORE engine |
| 0.30 | LF-Tony-AccessHealth-QuoteDream | $1,334 | 2 | $667 | ⚠️ Strong but only 2 purchases |
| 0.26 | 2024_12_PR - 4_G1_MEN (1) — TRT | $950 | 2 | $475 | ⚠️ Strong but only 2 purchases |
| 0.18 | Core - Sale - Top Performer Edit | $15,481 | 7 | $2,212 | ✅ Top spender, expensive CPA |
| 0.14 | TRT - 90 Day Timeline | $13,680 | 21 | $651 | ✅ Top converter by volume |
| 0.12 | Health Obsessed Case Study hook2 (video) | $2,451 | 6 | $408 | ✅ Best CORE CPA |
| 0.11 | TRT - Tony Frame 2 | $3,093 | 7 | $442 | ✅ Best TRT CPA |
| 0.09 | Reddit_5_T00202 | $9,125 | 17 | $537 | ✅ Strong CPA + volume |
| 0.09 | Tweet_TRT_V4 | $3,334 | 6 | $556 | ✅ Solid mid-size |
| 0.08 | TRT Timeline - 7172 | $650 | 1 | $650 | ⚠️ Single-purchase noise |
| 0.06 | Digital LF BA TRT Lifestyle (video) | $10,756 | 10 | $1,076 | ⚠️ High volume, weak ROAS |
| 0.06 | Reach - TRT - Before & After (video) | $3,066 | 1 | $3,066 | ❌ $3K CPA, single purchase |
| 0.03 | UGC Personal Narrative v1_2 (video) | $1,534 | 1 | $1,534 | ❌ Poor efficiency |

**Proven L14 ROAS-getters (≥$300 spend + ≥3 purchases + ROAS ≥ 0.09):** 7 creatives. This is the iteration set for T005.

---

## Dead Spend — L14 ($7,632 across 7 creatives, 8.7% of total spend)

| Creative | Spend | CTR | Why dead |
|---------|------:|----:|---------|
| NP - CORE - Tony Robbins Cost Breakdown V2 | $2,914 | 1.89% | High CTR, no close — angle doesn't land |
| Core - LF vs. PCP - 10 min or lifetime | $1,018 | 0.66% | Low CTR, doesn't engage |
| Core - Us vs Them - $1.37 Background | $943 | 1.17% | Stops scrolls, no purchase |
| NP - CORE - Health Obsessed Case Study hook3 | $913 | 3.06% | Highest CTR in dead set — pure attention |
| Core - BOF Sale - Still thinking | $777 | 0.78% | Doesn't even stop scrolls |
| NP - TRT - Reddit_5_T00203 | $538 | 1.16% | Sibling of T00202 (which converts) — bad messaging variant, format is fine |
| NP - CORE - Tony Robbins Cost Breakdown V1 | $530 | 1.68% | Sibling of V2, same dead angle |

**Pattern by product line:**
- **CORE dead spend:** $7,094 across 6 creatives (Cost Breakdown x2, LF vs. PCP, Us vs. Them, Case Study hook3, BOF Sale) — broad range of angles failing.
- **TRT dead spend:** $538 across 1 creative (Reddit T00203 only) — format is fine, just bad message.

---

## Cross-Product Pattern Synthesis

### Format × Performance

| Format | CORE Performance | TRT Performance |
|---|---|---|
| Image (static) | Mixed: 1 winner (Tony SALE), 6 dead. Image is riskier in CORE. | Strong: 5 of 6 image creatives convert. Image is the safer TRT format. |
| Video | 1 of 2 works (Health Obsessed Case Study hook2). The other dead. | 1 of 4 works (Digital Lifestyle video has 10 purchases but $1,076 CPA, ROAS 0.06). Video is risky in TRT. |
| Native (Reddit, Tweet) | Absent in top 10 CORE. | **Both top performers** (Reddit $9K/17 purch, Tweet $3.3K/6 purch). Native = TRT-only. |

### Visual Choices × Performance

- **No-people milestone card layouts (TRT 90-Day Timeline)** correlate with 21 purchases — legibility beats aspirational imagery for TRT
- **Tony face + Peak Performance frame (CORE Tony SALE)** = 0.32 ROAS — Tony's face on the ad is the conversion lever for the only winning CORE creative
- **Reddit native card format** gets 1.80% CTR + $537 CPA — the highest CTR of any TRT creative
- **Twitter/X dark-mode native** (Tweet_TRT_V4) gets 1.58% CTR + $556 CPA — the second-highest TRT CTR
- **Native format = TRT only** — no CORE creative in the top 20 uses Reddit or Tweet

### Heuristic Distribution

- **"Feel like yourself again" identity-loss phrase** appears in the TRT 90-Day Timeline Month 1 card. Identity loss is the strongest emotional territory for TRT conversions. (Per strategist: "speaks about the identity loss that men feel when they start to decline in their drive.")
- **$49 to start** price anchor is consistent across the winning TRT creatives.
- **Loss-aversion framing** (don't skip this step, missing the variable) appears in T004 winners — test if it carries into the L14 winners.
- **Tony Robbins authority** is the conversion lever in CORE's only big winner — but only when paired with SALE + Peak Performance + $150 OFF.

### What's Missing (Opportunity Gaps)

- **No creative in the L14 top-20 leads with "quarterly testing" as a differentiator** — the new angle is unproven at scale. T005 should test 2-3 quarterly-testing concepts.
- **No TRT creative in the L14 top-20 uses a B&A split-screen treatment with strong copy** (Ad #8 is a B&A but the L14 data shows 1 purchase only). The T004 B&A script (Script 6) and the Ad #20 from T003 references are not connecting in the L14 window.
- **No CORE creative uses a Reddit or Tweet format** — the format that works in TRT has zero CORE test data.
- **No "common symptom → discover hormone gap" frame in the L14 winners** — the SaaS pitch frame (your doctor said X, but your blood shows Y) is missing. Ad #1 (1 in 3 Men) and T002 Ad #4 use this frame, but they're not in the L14 top spenders.

---

## Decision Framework

### Replicate (with guardrails)

- **TRT 90-Day Timeline format** — replicate 3-4x in T005 with different identity-loss angles, different steps, and one quarterly-testing integration
- **TRT Reddit native format** — replicate with new post topics, NOT killing the format
- **CORE Tony SALE - Peak Performance** — replicate with new Tony quotes and SALE frames; do not assume Tony alone converts (Cost Breakdown siblings prove he doesn't)
- **CORE Health Obsessed Case Study (video)** — replicate the structure with new cases; this is the only working video format

### Kill (with evidence)

- **Tony Robbins Cost Breakdown (CORE)** — both V1 and V2 are dead. $3,444 total waste. Don't test this frame again.
- **LF vs. PCP comparison static (CORE)** — $1,018 spent, 0 purchases, 0.66% CTR. The T004 video version (Concept 14) should be reviewed but the static is dead.
- **BOF Sale (CORE)** — "Still thinking" had 0.78% CTR and 0 purchases. Sale/offer-first BOF framing is dead in CORE.
- **Us vs. Them $1.37 Background (CORE)** — $943 spent, 0 purchases. The $1.37 anchor was a T003 concept; the static treatment didn't land.
- **Before & After video (TRT)** — $3K spent, 1 purchase. The T004 B&A script (Concept 6) is the better execution; this ad may be the legacy static B&A without proper context.
- **Reddit_5_T00203 messaging (TRT)** — message-specific kill, not format-specific. T00202 messaging is the keeper.

### Test (gaps and opportunities)

- **Quarterly testing angle** — 2-3 concepts in T005. Different product lines + native format. The differentiator is unproven at scale.
- **CORE in native format (Reddit/Tweet)** — zero CORE tests in this format. The TRT evidence suggests it might work, but the L14 data is TRT-only.
- **"Common symptom → discover hormone gap" frame for CORE** — proven in T002 (Ad #1, Ad #4) but absent in L14 top 20. Test a refresh.
- **TRT video with case study structure** — videos are risky in TRT, but the Health Obsessed Case Study video works in CORE. Test TRT case study variants.

### Risks / Guardrails

- **CORE is high-risk per concept** (60% dead rate). Plan CORE test slots accordingly — don't double down on a single concept.
- **Video is high-risk** (1 of 5 L14 videos works). Cap new video concepts to 4-5 of 15 max in T005.
- **Don't over-index on the SALE/promo frame in CORE.** SALE works in CORE Tony, but the BOF Sale and Sale Edit creative families are mixed (one works, one is high-CPA). Treat SALE as one valid frame, not the default.
- **Don't apply CORE winners' formats to TRT** (and vice versa). The two product lines need different treatments.

---

## Carry-Forward Creative Learnings

- **TRT 90-Day Timeline engine: easy-to-understand step progression + "feel like yourself again" identity-loss phrase + explicit time markers.** All three are required — not any one alone. (Strategist-confirmed, June 11, 2026.)
- **Native format (Reddit, Tweet) is a TRT-only play.** Top CTRs in the account. Don't kill the format when a message variant dies.
- **Tony Robbins SALE + Peak Performance + $150 OFF is CORE's conversion stack.** Without all three (SALE frame, peak-performance positioning, monetary offer), Tony variants fail.
- **CORE has a 60% dead creative rate vs. TRT's 11% in L14.** Test slots for CORE should be smaller and more diverse; budget for higher kill rate.
- **Health Obsessed Case Study (video) is the only working video format.** $408 CPA at $2.5K spend. Extend, don't reinvent.
- **Quarterly testing is unproven at scale.** T005 carries 2-3 concepts to test the differentiator across product lines and formats.

---

## Notes on L14 Categorization

- **Correction:** The `NP - 2024_12_PR - 4_G1_MEN (1)` creative (Creative #14) was initially categorized as unclassified in the working L14 data. Primary text in DataJSON confirms it's a **TRT creative** (not CORE). This shifts the TRT/CORE split — TRT total becomes 10 creatives / $46,725 spend / 66 purchases (was 9 / $45,775 / 64). CORE is unchanged.
- **Process rule:** When classifying by product line, check the primary text in DataJSON — the creative name doesn't always carry a clear CORE/TRT signal. The "NP" (New Production) prefix doesn't indicate product line. Names like "4_G1_MEN" or "_PR" can be either.
- **Implication for the motion-top-spenders skill:** The auto-classification logic should fall back to primary text inspection when the creative name lacks an explicit CORE/TRT marker.

---

*This document is the T005 source for the L14 ads analysis. The 15 briefs in `T005 Briefs.md` reference this analysis and the L14 winners as iteration targets.*
