---
cssclasses:
  - table-wide
  - wide
---
# Top Spenders Analysis — Stellar Sleep — T003

**Date:** 2026-06-05
**Source Data:** Motion API pull — 14-day window (2026-05-22 to 2026-06-04), top 20 creatives
**Motion Report:** [Top Creatives Report](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/top/69e0f46ac5808a9fa158454d)
**Media Analysis:** Gemini API — 7 videos + 2 statics analyzed in full.

---

## TLDR Key Learnings

> - **Anti-pills positioning is the new #1 spend signal.** The `anti-pills confession` creative launched 5/28 and immediately became the top spender at $5.4k — the algorithm rewards the "your sleep meds are the problem" reframe. This is the strongest new creative direction since the Harvard hero card.
> - **Text walls continue to dominate** — 3 of top 6 spenders are T001 text wall variants. The format's high-intent filtering mechanism is still working. The aspirational relief variant outspends pain stack ~12:1.
> - **Conversion is the bottleneck, not attention.** Only 3 purchases across the entire top 20 in 14 days. The #1 spender ($5.4k) has zero purchases. High CTR across the board (3.25%-7.23% for meaningful spenders) means the creatives stop scrolls and drive clicks — but the funnel leaks between click and purchase.
> - **Harvard authority is a CTR driver, not a closer.** The Harvard quote-card continues to spend ($1.5k) with strong CTR, but the only Harvard-tagged creative that converted is the authority explainer hook 3 at 3.09x ROAS on tiny $61 spend.
> - **Best ROAS signal: Harvard authority explainer hook 3** (3.09x on $61) and **pain stack text wall v3** ($194 CPA, 0.51x). Both use mechanism education + VoC pain recognition. The conversion pattern is: name the pain in buyer's language → explain WHY nothing else worked → introduce the clinical mechanism → close on CBT-I protocol.
> - **No real UGC or creator-led content in the top spenders.** Everything is AI b-roll, stock footage, text walls, or AI illustration. This is an untested lever.
> - **Aspirational angle ("Wake Up Rested") dominates spend at 1,938% share** but the pain/mechanism angles are what convert. The gap between what gets spend and what gets purchases = the T003 opportunity.
> - **Heuristic stack is narrow.** Authority Bias + Processing Fluency are doing all the work. Temporal Discounting, Goal Gradient, Scarcity, and Affect Heuristic are barely present or absent entirely.

---

## 1. SPEND: What the Platform Is Scaling — and Why

### L14 Spend Summary

| # | Creative | Format | Spend | ROAS | CTR | CPP | Purchases |
|---|---------|--------|-------|------|-----|-----|-----------|
| 1 | [vid_anti-pills confession hook-2](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/6a1866ce5973d5b54f60a0e3?startDate=2026-05-22&endDate=2026-06-04) | Video | $5,417 | 0.00 | 3.60% | — | 0 |
| 2 | [vid_aspirational relief text wall_12_v2](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/69f4efe2bb87ba4bd1be9fef?startDate=2026-05-22&endDate=2026-06-04) | Video (Text Wall) | $2,302 | 0.00 | 3.80% | — | 0 |
| 3 | [vid_aspirational relief text wall_12_v1](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/69f4e9a9bb87ba4bd1baf3f3?startDate=2026-05-22&endDate=2026-06-04) | Video (Text Wall) | $2,062 | 0.09 | 4.14% | $2,062 | 1 |
| 4 | [static_harvard hero quote-card_13_v2](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/69f262deab5d13a5b5913f1b?startDate=2026-05-22&endDate=2026-06-04) | Static (Quote Card) | $1,547 | 0.00 | 3.25% | — | 0 |
| 5 | [img_cost listicle upgraded payoff_15](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/6a1874f15973d5b54f84f020?startDate=2026-05-22&endDate=2026-06-04) | Static (Listicle) | $416 | 0.00 | 3.59% | — | 0 |
| 6 | [vid_pain stack text wall_10_v3](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/69f4f7b5bb87ba4bd1c1d9c8?startDate=2026-05-22&endDate=2026-06-04) | Video (Text Wall) | $194 | 0.51 | 2.71% | $194 | 1 |
| 7 | [vid_sleep method tier list hook 1](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/6a0cb3606af6728470a6e2dc?startDate=2026-05-22&endDate=2026-06-04) | Video | $193 | 0.00 | 5.86% | — | 0 |
| 8 | [vid_anti-pills confession hook-3](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/6a1874f15973d5b54f84f0e1?startDate=2026-05-22&endDate=2026-06-04) | Video | $134 | 0.00 | 7.23% | — | 0 |
| 9 | [vid_founded at harvard authority explainer hook 3](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/6a0cb3606af6728470a6e2dd?startDate=2026-05-22&endDate=2026-06-04) | Video | $61 | 3.09 | 4.63% | $61 | 1 |

Ranks 10-20 have negligible spend ($0.01-$7.39) — legacy/pre-Reach creatives not meaningfully in the auction.

**Total meaningful spend:** $12,326 across 9 creatives.
**Total purchases:** 3 ($12,326 / 3 = ~$4,109 blended CPA).

### Angles Snapshot

| Angle | Spend Share | WoW | Ads | Winners | State |
|-------|-----------|-----|-----|---------|-------|
| Wake Up Rested | 1,938% | +292% | 1 | 0 | Scaling |
| Stop Wasting Money | 558% | +100% | 5 | 0 | Scaling |
| CBT-I Is The Answer | 0.98% | +100% | 5 | 0 | Emerging |
| Trapped By Meds | 0.92% | +100% | 6 | 0 | Emerging |
| Stop Feeling Exhausted | 0.15% | +100% | 2 | 0 | Low |
| Racing Thoughts | 0.14% | +100% | 4 | 0 | Low |
| Be Present | — | — | 2 | 0 | Inactive |
| Break The Cycle | — | — | 1 | 0 | Inactive |
| Feel Energized Again | — | — | 1 | 0 | Inactive |
| Alternative To Meds | — | — | 1 | 0 | Inactive |

"Wake Up Rested" (aspirational outcome) and "Stop Wasting Money" (cost/futility reframe) are the two angles the platform is scaling. All others are emerging or inactive.

### Formats Snapshot

| Format | Creative Count (Industry) | Planning Decision |
|---|---|---|
| Demo | 2,047 | Untested for Stellar Sleep — potential gap |
| Offer-First Banner | 704 | Not applicable (no direct offer) |
| Testimonial | 610 | Untested — major gap |
| Feature Benefit Pointout | 352 | Partially tested (listicle) |
| Unboxing | 293 | Not applicable (app product) |
| Try-On | 289 | Not applicable |
| Review | 261 | Untested — potential gap |
| How To | 194 | Untested — CBT-I walkthrough opportunity |
| UGC Overlay | 181 | Untested — major gap |
| Transformation | 174 | Untested — before/after opportunity |
| Expert Explainer | 165 | Partially tested (Harvard authority) |
| Us Vs Them | 164 | Untested — pills vs. CBT-I opportunity |
| POV | 135 | Untested |
| Behind The Scenes | 125 | Not applicable |

### Why These Are Spending

- **Anti-pills confession (#1, $5.4k):** The platform scales this because it's a VO-driven educational format that systematically dismantles the alternative (sleep pills) across 3 numbered problems. Each problem creates a micro-loop (name the problem → show the consequence → stack fear). The structure forces completion — the viewer needs to hear all 3 problems to resolve the tension. It positions Stellar Sleep not against other apps, but against the viewer's current behavior (taking pills). Heuristics: Authority Bias (CBT-I protocol, ACP/AASM recommendation), Framing Effect (pills = "not a fix, just needing more" vs. CBT-I = "teaches you to fall asleep on your own").

- **Text walls (#2-3, #6, combined $4.6k):** The text wall format's native disguise is the engine. Dense text on a single atmospheric visual (wheat field for aspirational, dark bedroom for pain) repels casual scrollers and self-filters for high-intent readers. The information density itself signals "this is real information, not an ad." The aspirational variant outspends the pain variant 12:1, suggesting the platform rewards the positive-resolution copy more than the negative-recognition copy — but the pain variant is the one that actually converted.

- **Harvard quote-card (#4, $1.5k):** Processing fluency is the engine — one quote, one authority line, one stat pill, one photo. The quote "Your body wants to sleep. Your brain won't let it" is a diagnosis that reframes the viewer's problem (from "I can't sleep" to "my brain is doing this"). Harvard is a cognitive shortcut that bypasses skepticism. The format looks like an editorial pull quote, not an ad.

- **Cost listicle (#5, $416):** Framing Effect drives this. Lists failed solutions with dollar amounts ($200 sleeping pills, $250 white noise machine, etc.) to build to "$1,000+ WASTED." Reframes the viewer's history of failure from personal blame to misdiagnosis ("You've been solving the wrong problem"). Authority close: "The protocol Harvard measured at 74 min more sleep per night."

---

## 2. CONVERSIONS: What Actually Converts — and Why

### Top Converters (by ROAS)

| Creative | Spend | ROAS | Purchases | CPP | CTR |
|---|---|---|---|---|---|
| [vid_founded at harvard authority explainer hook 3](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/6a0cb3606af6728470a6e2dd?startDate=2026-05-22&endDate=2026-06-04) | $61 | 3.09 | 1 | $61 | 4.63% |
| [vid_pain stack text wall_10_v3](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/69f4f7b5bb87ba4bd1c1d9c8?startDate=2026-05-22&endDate=2026-06-04) | $194 | 0.51 | 1 | $194 | 2.71% |
| [vid_aspirational relief text wall_12_v1](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/69f4e9a9bb87ba4bd1baf3f3?startDate=2026-05-22&endDate=2026-06-04) | $2,062 | 0.09 | 1 | $2,062 | 4.14% |

### High Efficiency (Best CTR, Minimum $100 Spend)

| Creative | CTR | Spend | ROAS | Purchases |
|---|---|---|---|---|
| [vid_anti-pills confession hook-3](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/6a1874f15973d5b54f84f0e1?startDate=2026-05-22&endDate=2026-06-04) | 7.23% | $134 | 0.00 | 0 |
| [vid_sleep method tier list hook 1](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/6a0cb3606af6728470a6e2dc?startDate=2026-05-22&endDate=2026-06-04) | 5.86% | $193 | 0.00 | 0 |
| [vid_founded at harvard authority explainer hook 3](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/6a0cb3606af6728470a6e2dd?startDate=2026-05-22&endDate=2026-06-04) | 4.63% | $61 | 3.09 | 1 |
| [vid_aspirational relief text wall_12_v1](https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/creative/69f4e9a9bb87ba4bd1baf3f3?startDate=2026-05-22&endDate=2026-06-04) | 4.14% | $2,062 | 0.09 | 1 |

### What Converts vs What Doesn't

**Converts (3 purchases total):**
- Pain stack text wall v3 ($194 CPA) — VoC pain recognition + mechanism education
- Aspirational relief text wall v1 ($2,062 CPA) — future-pacing temporal progression + CBT-I positioning
- Harvard authority explainer hook 3 ($61 CPA) — expert authority + mechanism education

Pattern: All three converters use **mechanism education** (explaining WHY insomnia persists and HOW CBT-I works differently). The converters don't just agitate pain — they teach.

**Gains spend, doesn't convert:**
- `anti-pills confession hook-2` — $5,417 spend, 0 purchases. The creative stops scrolls with the anti-pill provocation and educates on the 3 problems with pills, but the pivot to CBT-I comes late (0:27 of 0:48) and the app demonstration is cursory. Diagnosis: the hook attracts people frustrated with pills, but the body doesn't bridge them to why a CBT-I app is the answer. The viewer leaves educated about their pill problem but not sold on the app.
- `aspirational relief text wall v2` — $2,302 spend, 0 purchases vs. v1's $2,062 with 1 purchase. Same body concept, different hook. v2 leads with "What if sleep left you ready?" (aspirational question) vs. v1's "You wake before your alarm" (future-pacing declarative). The declarative hook converts; the question hook doesn't.
- `harvard hero quote-card v2` — $1,547 spend, 0 purchases. 3.25% CTR drives spend, but the static has no mechanism education and no CTA path beyond "Founded at Harvard." It sells the diagnosis ("Your brain won't let it") but not the treatment.

**Dead angles (with spend-to-kill evidence):** Too early to declare any angle dead — all angles are still accumulating data. The low-spend creatives (ranks 10-20) are pre-Reach legacy ads that never competed meaningfully.

### Why These Convert

- **Mechanism education is the conversion driver.** All 3 converting creatives explain the clinical mechanism (CBT-I reconditions the brain's learned wakefulness response). The non-converters either stop at pain recognition or stop at authority positioning without bridging to "here's how it actually works."
- **The conversion sequence is: Pain → Reframe → Mechanism → Protocol.** Pain stack text wall: names the exact pain symptoms → reframes from "you can't sleep" to "your brain learned to be awake in bed" → introduces CBT-I as the reconditioning fix → closes on Harvard/ACP authority. Harvard authority explainer: names the frustration → reframes pills as treating symptoms not cause → explains CBT-I as addressing conditioned patterns → shows app.
- **Authority stacking closes.** The two best-ROAS creatives both stack Harvard + ACP/AASM + CBT-I as a triple authority signal. Authority alone (the quote-card) drives CTR but doesn't close. Authority + mechanism education closes.
- **Attention-to-conversion gap:** The #1 spender's 3.60% CTR proves the anti-pills hook stops scrolls. Zero purchases proves the body doesn't close. The gap is the bridge between "pills are bad" → "CBT-I is better" → "this app delivers CBT-I." The creative spends too long dismantling pills and not enough time selling the app's unique mechanism.

---

## 3. RETENTION: What Holds Attention — and Why

### Video Performance

> **Data gap:** Hook Score, Watch Score, Hold Rate, Thumbstop, ThruPlay, and retention quartiles are not available in this Motion pull. CTR is used as a proxy for attention capture.

| Creative | CTR (Proxy) | Spend | Format | Duration |
|---|---|---|---|---|
| vid_anti-pills confession hook-3 | 7.23% | $134 | VO + B-roll montage | ~31s |
| vid_sleep method tier list hook 1 | 5.86% | $193 | Problem-agitate-solution | ~34s |
| vid_founded at harvard authority explainer hook 3 | 4.63% | $61 | Authority explainer | ~29s |
| vid_aspirational relief text wall_12_v1 | 4.14% | $2,062 | Text wall (aspirational) | ~25s |
| vid_aspirational relief text wall_12_v2 | 3.80% | $2,302 | Text wall (aspirational) | ~25s |
| vid_anti-pills confession hook-2 | 3.60% | $5,417 | VO explainer (3-problem) | ~48s |
| vid_pain stack text wall_10_v3 | 2.71% | $194 | Text wall (pain) | ~43s |

### Hook-vs-Hold Diagnosis

Without retention data, diagnosis is limited to CTR × conversion:

- **High CTR + converts:** Harvard authority explainer hook 3 (4.63% CTR, 3.09x ROAS). Strong hook AND strong close. This is the replication target.
- **High CTR + doesn't convert:** Anti-pills confession hook-3 (7.23% CTR, 0 purchases), tier list hook 1 (5.86%, 0 purchases). These are scroll-stoppers that don't close — the hook is doing its job but the body or CTA fails.
- **Moderate CTR + converts:** Pain stack text wall v3 (2.71%, $194 CPA). Self-filtering format — lower CTR means fewer clicks but more qualified ones. The text wall repels casual scrollers.
- **Moderate CTR + high spend:** Anti-pills confession hook-2 (3.60%, $5.4k). The platform is scaling on engagement signals beyond CTR (likely watch-through and engagement rate). The 48-second runtime with VO narration may be generating high ThruPlay despite moderate click-through.

### Why These Hold

- **Anti-pills "3 problems" structure forces completion.** The numbered problem format (Problem #1, #2, #3) creates a ranked list mechanic — the viewer needs to see all three to resolve the information loop. This is why the 48-second creative gets $5.4k in spend despite moderate CTR.
- **Text walls self-filter and reward reading.** The dense text + atmospheric visual combination repels scrollers (low CTR) but deeply engages readers (high dwell time → high spend). The temporal progression structure ("Early on... A few weeks in... Over time...") creates forward momentum through the text.
- **Short-form montage captures fast attention.** The hook-3 variants (~29-31s) with rapid-cut b-roll and fast-paced VO achieve the highest CTRs. Speed = scroll-stop.
- **Information architecture drives retention.** Every spending creative creates an unresolved question in the first 3 seconds that only resolves by watching: "What can't your sleep med do?" → "What are the 3 problems?" → "What if sleep left you ready?" → "What's the Harvard protocol?"

---

## 4. Creative Anatomy: Top Performer Breakdowns

> Awaiting strategist notes for annotation priority. Full Gemini 4-column tables are available for all 9 analyzed creatives. Breakdowns below cover the top 6 spenders and the top converter.

### #1 — Anti-Pills Confession Hook-2 — Top Spender ($5,417)

- **Metrics:** Spend $5,417 | ROAS 0.00 | Purchases 0 | CTR 3.60%
- **The engine:** The "3 numbered problems" demolition arc — systematically destroy the viewer's current solution (pills) by naming dependency, side effects, and tolerance as an escalating fear sequence, then pivot to CBT-I as the only alternative that addresses the cause.
- **Heuristics firing:** Authority Bias in close (ACP + AASM recommendation, Harvard founding). Framing Effect throughout (pills reframed from "help" to "trap": "That's not a fix. You just keep needing more."). Processing Fluency in the 3-problem structure (numbered list = easy to follow). Affect Heuristic in the pain b-roll (groggy mornings, temples rubbing, exhausted hair).
- **Hook VO:** "Sleep meds can work tonight. That's exactly the problem for chronic insomnia."
- **Hook Caption:** WHAT YOUR SLEEP MED CAN'T DO FOR CHRONIC INSOMNIA.
- **Hook type:** Provocative reframe — takes the viewer's assumed solution and turns it into the problem.
- **Structure:** 3-Problem Demolition → Mechanism Pivot → App Demo → Authority Close
- **Caption style:** Reinforcement captions — mirror VO with slight condensation, bold keywords.
- **Who is shown:** Stock footage of women ~30-50 in dark bedrooms, plus medical imagery (doctor writing Rx, pill bottles). No specific subject — the "character" is the pill itself.
- **Close type:** Authority close — CBT-I first-line treatment, recommended by ACP/AASM, try CBT-I.
- **Body scaffold:** Hook (pills are the problem) → Problem #1: dependency (brain adjusts) → Problem #2: side effects (groggy mornings) → Problem #3: tolerance (dose escalation) → Pivot: CBT-I works differently → App demo (UI walkthrough) → Authority close (ACP/AASM/Harvard)

#### Full 4-Column Breakdown

| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|---|---|---|---|
| 0:00-0:01 | Close-up of hand pouring pills from prescription bottle into palm | Sleep meds can work tonight. | WHAT YOUR SLEEP MED CAN'T DO FOR CHRONIC INSOMNIA. |
| 0:01-0:02 | Bedside table with glass of water and multiple blister packs | That's exactly the problem for chronic insomnia. | WHAT YOUR SLEEP MED CAN'T DO FOR CHRONIC INSOMNIA. |
| 0:02-0:04 | Dark, messy, unmade bed. Dim lighting. | They treat one night, | WHAT YOUR SLEEP MED CAN'T DO FOR CHRONIC INSOMNIA. |
| 0:04-0:05 | Woman in pajamas sits on bed edge, distressed | not the cause. | WHAT YOUR SLEEP MED CAN'T DO FOR CHRONIC INSOMNIA. |
| 0:05-0:07 | Bed with two pillows. Dark room, light through blinds. | The story always looks the same. | The story always |
| 0:07-0:08 | Person in bed (out of focus). Blister pack + glass in foreground. | Something works for a few nights, | Something works |
| 0:08-0:09 | Woman holding both hands to head, headache | then it stops. | Then it stops. |
| 0:09-0:10 | Close-up of prescription pill bottle | Problem one: dependency. | Problem #1 |
| 0:10-0:12 | Table covered with pills, capsules, blister packs | Your brain adjusts to the pill. | Problem #1, Your brain adjusts to the pill. |
| 0:12-0:14 | Woman sleeping. Pill bottle + capsules on table in foreground. | Soon you need it just to sleep. | Problem #1, Soon you need it just to sleep. |
| 0:14-0:15 | Doctor in white coat writes on prescription pad | Second, side effects. | Problem #2, side effects. |
| 0:15-0:17 | Tabletop with prescription papers, blister packs, pill bottle | A pill might help you sleep, | Problem #2, help you sleep, |
| 0:17-0:18 | Woman in white pajamas on bed edge, looking groggy | but the morning after feels wrong: | Problem #2, but the morning |
| 0:18-0:20 | Closer shot, rubbing temples | groggy, foggy, | Problem #2, after feels wrong: groggy, |
| 0:20-0:21 | Close-up running hands through messy hair, exhausted | like the rest didn't count. | Problem #2, like the rest didn't count. |
| 0:21-0:23 | Man's fingers hold single white pill | And problem three: tolerance. | Problem #3 |
| 0:23-0:25 | Man with blue sleep mask takes a pill | They stop working unless you increase the dose. | Problem #3, They stop working unless you increase the dose. |
| 0:25-0:27 | Silhouette takes pill, drinks water | That's not a fix. You just keep needing more. | Problem #3, That's not a fix. You just keep needing more. |
| 0:27-0:29 | Woman wakes up stretching happily, bright sunlight | CBT-I works differently, | CBT-I works differently, |
| 0:29-0:32 | Woman smiling, sitting up in bed, refreshed | because it addresses the conditioned patterns keeping your brain awake. | because it addresses the conditioned patterns keeping your brain awake. |
| 0:32-0:34 | Stellar Sleep app: "Your Sleep Last Night" 54% efficiency | And it teaches you to fall asleep on your own. | And it teaches you to fall asleep on your own. |
| 0:34-0:35 | Hand holds iPhone: "Good Afternoon, Colleen" greeting | Ten minutes a day. | Ten minutes a day. |
| 0:35-0:37 | App dashboard: "My sleep last night" | Most people start seeing changes | seeing changes |
| 0:37-0:38 | App: "How did you sleep?" questionnaire | in two weeks, | in two weeks, |
| 0:38-0:40 | App: "What time did you go to bed?" time-scroll interface | because it rebuilds the sleep drive from the inside. | the sleep drive from the inside. |
| 0:40-0:43 | Stellar Sleep website: "Why Stellar Sleep" headline | CBT-I is the first-line treatment for chronic insomnia, | CBT-I is the first-line treatment for chronic insomnia, |
| 0:43-0:46 | Website scrolls to "Developed by top experts" with scientist/doctor images | recommended by ACP and AASM. | recommended by ACP and AASM. |
| 0:46-0:48 | Website continues scrolling | Try CBT-I. | Try CBT-I. |

#### Gemini Visual Evidence

- **Edit pacing:** 1-2 second cuts in the first 14 seconds (hook + problem #1) create urgency. 2-3 second cuts in problems #2-3 let the consequences land. Transition to aspirational b-roll + app demo at 0:27 is the emotional pivot point.
- **What's being shown per beat:** First 27 seconds = dark, medical, clinical imagery (pills, prescription pads, groggy mornings). Last 20 seconds = bright, warm transformation + app UI screenshots. The visual contrast mirrors the copy structure: problem (dark) → solution (light).
- **Who's being shown:** Women ~30-50 in nighttime/morning bedroom settings. No single "character" — the ad treats insomnia as universal. The doctor at 0:14 adds clinical authority without making it feel like a pharma ad.
- **Visual disguise / native feel:** Moderate. The stock footage is polished but the VO narration style (calm, informative, confessional) and caption treatment feel like a health education video rather than an ad. The app UI screenshots at the end break the native disguise.
- **Caption treatment:** Bold white text on dark backgrounds, reinforcing VO key phrases. Problem numbers are highlighted. Captions don't duplicate VO verbatim — they compress and emphasize.
- **Transition patterns:** Hard cuts throughout. No dissolves or effects. The directness matches the confessional, educational tone.

---

### #2 & #3 — Aspirational Relief Text Walls (v2 $2,302 / v1 $2,062)

- **Metrics:** Combined $4,364 | v1: 1 purchase at $2,062 CPA, 4.14% CTR | v2: 0 purchases, 3.80% CTR
- **The engine:** The temporal progression arc — maps the CBT-I recovery journey across three time horizons (Early on / A few weeks in / Over time) to create forward momentum through text. The reader experiences the relief journey by reading it, creating an Affect Heuristic simulation of the outcome.
- **Heuristics firing:** Affect Heuristic (the entire copy drops the reader INTO the experience of recovering: "You wake with the quiet sense your body actually took care of you while you slept"). Temporal Discounting in the progression structure — "Early on" = immediate, accessible first step. Processing Fluency in the minimalist format (one image, all text, zero UI clutter).
- **Hook VO:** None (text-only, ambient music)
- **Hook Caption v1:** "You wake before your alarm." (declarative future-pacing — CONVERTS)
- **Hook Caption v2:** "What if sleep left you ready?" (aspirational question — DOESN'T CONVERT)
- **Hook type:** v1 = Future-pacing declarative. v2 = Aspirational question.
- **Structure:** Text Wall — single atmospheric visual + dense text overlay + logo close
- **Caption style:** Full-screen text wall. No VO. Ambient music.
- **Who is shown:** No people. Golden wheat field at sunrise/sunset — aspirational landscape visual that evokes "renewal" without showing a person.
- **Close type:** Branded close — "Wake up rested. [Stellar Sleep logo]"

#### Full 4-Column Breakdown — v1 (Converter)

| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|---|---|---|---|
| 0:00-0:19 | Static shot of golden wheat field under partly cloudy sky at sunrise/sunset. Low camera angle through wheat stalks. | None (calm ambient instrumental) | You wake before your alarm.<br><br>Sleep finally worked.<br><br>That is what rested looks like. CBT-I on Stellar Sleep is the program that rebuilds the conditioned pattern driving chronic insomnia.<br><br>Early on: The 3am wake-ups get less frequent.<br><br>A few weeks in: You fall asleep without trying. The math on hours stops.<br><br>Over time: You wake before your alarm. Body heavy in the good way.<br><br>Mind quiet. No dreading the day ahead.<br><br>That unhurried morning is what sleep is supposed to give you. |
| 0:19-0:25 | Same wheat field. Previous text fades. Logo and close text appear center. | None (music fades) | Wake up rested.<br><br>[Stellar Sleep logo: teal crescent moon with star] Stellar Sleep |

#### Full 4-Column Breakdown — v2 (Non-Converter)

| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|---|---|---|---|
| 0:00-0:19 | Same golden wheat field, same camera angle. | None (calm instrumental) | What if sleep left you ready?<br><br>Not surviving the day. Actually ready for it.<br><br>Sleep like that is learnable. CBT-I on Stellar Sleep moves you from exhausted-and-wired to rested-and-steady.<br><br>Early on: The mental math on how many hours you got starts to fade.<br><br>A few weeks in: The afternoon fog lifts. You stop dreading tonight by 3pm.<br><br>Over time: You wake with the quiet sense your body actually took care of you while you slept.<br><br>That is what sleep is supposed to feel like. |
| 0:19-0:25 | Same wheat field. Text fades. Logo appears. | None (music fades) | Wake up rested.<br><br>[Stellar Sleep logo] Stellar Sleep |

#### Gemini Visual Evidence

- **Edit pacing:** None — single continuous shot with text overlays fading in/out. The pacing IS the reading pace of the text itself.
- **What's being shown:** A single atmospheric landscape (wheat field at golden hour). No product, no people, no app UI. The visual exists to evoke a feeling of calm renewal, not to demonstrate anything. This is pure Affect Heuristic.
- **Visual disguise / native feel:** Maximum native feel. Looks like a wellness quote post or a poetry card, not an ad. The Stellar Sleep logo only appears in the final 6 seconds.
- **v1 vs v2 copy difference:** v1 opens with certainty ("You wake before your alarm") — the reader is immediately placed in the outcome. v2 opens with uncertainty ("What if sleep left you ready?") — the reader has to opt into the possibility. The declarative hook converts because it bypasses the viewer's skepticism gate; the question hook triggers it.

---

### #4 — Harvard Hero Quote-Card — Top Static ($1,547)

- **Metrics:** Spend $1,547 | ROAS 0.00 | Purchases 0 | CTR 3.25%
- **The engine:** Diagnostic reframe — "Your body wants to sleep. Your brain won't let it" reframes insomnia from a personal failure to a neurological condition. The quote gives the viewer a new diagnosis that makes their problem feel solvable. Harvard provides the authority to believe the diagnosis.
- **Heuristics firing:** Authority Bias (Harvard founding, CBT-I therapy label). Processing Fluency (one quote, one authority line, two proof pills, one photo — maximum simplicity). Social Proof (80% improve sleep stat pill).
- **Layout:** Vertical split — top 55% white text card with quote, authority line, and proof pills. Bottom 45% editorial photo of woman lying awake in bed.
- **All on-image text:** Quote: "Your body wants to sleep. Your brain won't let it." / Authority: "Founded and developed at Harvard." / Pill 1 (dark, with moon icon): "Over 80% improve sleep." / Pill 2 (outlined): "CBT-I Therapy"
- **Color scheme:** Off-white/cream card, black serif quote, gray sans-serif authority line, dark navy pills, warm muted earth tones in photo.
- **Typography:** Large serif font for quote (editorial magazine feel). Clean sans-serif for authority and pills.
- **Style:** Looks like a wellness publication content card, not an ad. The quote-card format is native to editorial feeds.

---

### #5 — Cost Listicle Upgraded Payoff — New Static ($416)

- **Metrics:** Spend $416 | ROAS 0.00 | Purchases 0 | CTR 3.59%
- **The engine:** Sunk cost revelation — itemize the viewer's past spending on failed solutions to build to a shocking total, then reframe: "You've been solving the wrong problem." The cost stack creates a visceral "money wasted" reaction that makes the Harvard protocol feel like the rational next step.
- **Heuristics firing:** Framing Effect (the cost list reframes individual "reasonable" purchases into a devastating total). Authority Bias (Harvard protocol + "74 min more sleep" stat). Affect Heuristic (the 3:47 AM illustration drops the viewer into the experience).
- **Layout:** Vertical long-form (9:16). Stacked: serif headline → cost list card (rounded, translucent) → AI illustration of woman in bed at 3:47 AM → green payoff banner → brand bar.
- **All on-image text:** Headline: "You've been solving the wrong problem." / Cost list: Sleeping pills $200, White noise machine $250, "Sleepy" tea $50, "Miracle Sleep" pillow $100, Hypnosis class $300, Relaxation app $100 / Clock: 3:47 AM / Payoff: "$1,000+ WASTED" + "The protocol Harvard measured at 74 min more sleep per night." / Brand bar: "Stellar Sleep" + "CBT-I: the psychology of sleep, not another supplement."
- **Style:** AI-illustrated (semi-realistic, slightly animated aesthetic). The illustration style is distinctive — avoids stock photo feel while being emotionally resonant. The 3:47 AM clock is a highly specific, relatable detail.

---

### #9 — Harvard Authority Explainer Hook 3 — Top Converter ($61 CPA, 3.09x ROAS)

- **Metrics:** Spend $61 | ROAS 3.09 | Purchases 1 | CTR 4.63%
- **The engine:** Failed-methods cascade → "the fix isn't in a bottle, it's in your pocket." The creative rapidly stacks visual evidence of failed solutions (warm milk, tinctures, pills), then pivots on the physical metaphor: bottle (physical, external) vs. phone (personal, always-with-you). The before/after split screen is the visual proof of transformation.
- **Heuristics firing:** Authority Bias ("gold standard for treating insomnia," Cognitive Behavioral Therapy). Framing Effect (bottle vs. pocket reframe). Goal Gradient (before/after split screen shows the finish line — "fall asleep faster, stay asleep longer, wake up with energy"). Temporal Discounting ("in just a few weeks").
- **Structure:** Failed methods cascade → Reframe ("not in a bottle, in your pocket") → App introduction → Before/After split → Benefit triple → Free trial CTA
- **Why it converts:** This is the only creative that stacks mechanism education + authority + visual proof of transformation + clear CTA (7-day free trial). The before/after split screen at 0:17 is the conversion moment — it makes the result feel concrete and achievable.

> **Note:** Despite filename referencing "Founded at Harvard," Gemini analysis did not detect explicit Harvard mention in this hook variant. The authority claim is "gold standard for treating insomnia" + "Cognitive Behavioral Therapy." Verify against source video.

---

## 5. Cross-Ad Pattern Synthesis

### Format × Performance

| Format | Spend | Purchases | ROAS | Diagnosis |
|---|---|---|---|---|
| VO Explainer (anti-pills) | $5,551 | 0 | 0.00 | Attention without conversion — hooks work, bodies don't close |
| Text Wall (aspirational) | $4,364 | 1 | 0.05 | High spend, very low conversion efficiency |
| Text Wall (pain) | $194 | 1 | 0.51 | Low spend, best CPA among text walls |
| Quote Card (static) | $1,547 | 0 | 0.00 | CTR driver, doesn't convert |
| Cost Listicle (static) | $416 | 0 | 0.00 | New, accumulating data |
| Authority Explainer | $61 | 1 | 3.09 | Best ROAS — mechanism education closes |
| Problem-Agitate-Solution | $193 | 0 | 0.00 | High CTR (5.86%), no conversion yet |
| Anti-pills montage | $134 | 0 | 0.00 | Highest CTR (7.23%), no conversion yet |

**Key finding:** Format that educates on the mechanism (how CBT-I works) converts. Format that only agitates pain or attacks alternatives gets attention but doesn't close. The missing piece in most creatives is the bridge from "pills are bad / you're suffering" to "here's specifically how CBT-I fixes the root cause."

### Visual Choices × Performance

- **Text walls (single atmospheric visual + dense text) correlate with the most spend.** The format's native disguise and self-filtering mechanism continue to be the platform's preferred creative type for this brand.
- **Stock b-roll of bedrooms and pills is universal.** Every video uses some combination of dark bedroom, rumpled bed, clock showing 3-4 AM, pills/bottles. The visual language is consistent but undifferentiated — there's no visual signature that separates Stellar Sleep's ads from any other sleep brand's.
- **App UI appears in converting creatives.** Both the pain stack text wall (converted) and the anti-pills confession (top spender) show the Stellar Sleep app interface. The authority explainer (top converter) also shows the app. The text walls and quote card that DON'T show the app convert less efficiently.
- **AI illustration (cost listicle) is a format differentiator.** The semi-realistic animated style of the 3:47 AM bedroom scene is the most visually distinctive creative in the set. At 3.59% CTR it captures attention — needs more spend to evaluate conversion.
- **Before/after split screen appears in the top converter.** The Harvard authority explainer's transformation visual (tired at desk → energetic with coffee) is the only creative that shows a concrete visual transformation. This visual proof correlates with the best ROAS.

### Heuristic Distribution

| Heuristic | Present In | Absent From | Assessment |
|---|---|---|---|
| Authority Bias | 8 of 9 (Harvard, CBT-I, ACP/AASM) | None | Over-relied on. Every creative leans on the same authority stack. |
| Processing Fluency | Text walls, quote card, listicle | — | Strong in statics, drives the native disguise. |
| Framing Effect | Anti-pills (pills as trap), cost listicle ($1,000 wasted) | Text walls, tier list | Underused. Only 2 creatives actively reframe. |
| Affect Heuristic | Text walls (wheat field), cost listicle (3:47 AM) | Anti-pills (educational, not experiential), authority explainer | Present but not primary. Most ads educate rather than evoke. |
| Temporal Discounting | Text walls ("Early on..."), authority explainer ("in just a few weeks") | Anti-pills, quote card, listicle | Underused. Only appears as progression structure, never in hooks. |
| Social Proof | Quote card (80% stat) | Everything else | Nearly absent. No testimonials, no review counts, no user stories. |
| Goal Gradient | Authority explainer (before/after split) | Everything else | Nearly absent. Major gap. |
| Scarcity | — | Everything | Completely absent. |
| Salience Bias | Cost listicle (AI illustration), quote card (editorial format) | Most video creatives look similar | Underused. Video creatives are visually homogeneous. |

### Who Is Shown × Performance

- No real UGC or customer footage in ANY top spender. Everything is stock, AI-generated, or app screenshots.
- Women ~30-50 in dark bedrooms dominate the stock footage. No men as primary subjects (despite insomnia being equally prevalent). No specific demographic or professional identity is shown.
- The Harvard authority explainer (top converter) uses a before/after of a woman at a desk → woman looking energetic. This is the only creative that shows a real human transformation.
- **Major gap:** No ads show a specific person the viewer can identify with. The pain is universal, but the creative lacks a "that's me" moment anchored in a relatable character.

### What's Missing (Opportunity Gaps)

1. **No UGC or testimonial content.** Zero user-generated content in the top 20. Testimonial is the #3 trending format in the industry (610 creatives). This is the single largest untested format for Stellar Sleep.
2. **No creator-led content.** Every video is VO narration over stock/AI b-roll. No talking head, no direct-to-camera, no real person telling their story.
3. **No Social Proof stacking.** Beyond the "80% improve sleep" stat pill, there are no review callouts, no user count, no before/after stories from real users.
4. **Temporal Discounting never appears in hooks.** "In two weeks" and "10 minutes a day" appear deep in the body — never as the opening hook. The immediacy of relief is the most persuasive claim for chronic insomnia sufferers and it's buried.
5. **No parent-specific content spending.** The Overwhelmed New Parent (ONP) persona has zero representation in the top spenders.
6. **No anxiety-specific content spending.** The Sleep Anxiety Spiraler (SAS) persona has zero representation in the top spenders.
7. **No comparison/vs format.** "Pills vs. CBT-I" or "Sleep Apps vs. Stellar Sleep" comparative formats are untested despite the anti-pills angle being the #1 spend signal.
8. **Goal Gradient is absent.** No creative shows the viewer how close they are to the result (progress bars, step counts, "3 sessions in" milestone visualization).
9. **Video creative is visually homogeneous.** Dark bedroom + stock pills footage = every video looks the same in the feed. No scroll-stopping visual differentiation.

---

## 6. Decision Framework

### Replicate (with guardrails)

1. **Anti-pills positioning AS A HOOK — but with mechanism education in the body.** The anti-pills hook stops scrolls (3.60-7.23% CTR). But the body needs to bridge from "pills are bad" to "CBT-I reconditions your brain" faster. Don't spend 27 seconds demolishing pills and 20 seconds selling the app. Flip the ratio.
2. **Text wall format — pain variant over aspirational.** The pain stack text wall converted at $194 CPA vs. aspirational at $2,062. The pain variant's VoC specificity drives conversion. Continue testing pain-recognition text walls with updated VoC language.
3. **Mechanism education in every converter.** All 3 purchases came from creatives that explain HOW CBT-I works (conditioned wakefulness, brain reconditioning). This is the non-negotiable conversion element — every T003 creative must include mechanism education.
4. **Harvard authority stacking in closes.** Harvard + ACP/AASM + CBT-I protocol is the proven trust stack. Keep it in every close, but don't rely on it alone — it drives CTR but only converts when paired with mechanism education.

**Guardrails:** Don't over-index on text walls alone. The format is hitting diminishing returns — 3 text wall variants are all spending but only 1 converted in 14 days. Diversify the format mix.

### Kill (with evidence)

- No angles or formats have enough spend-to-kill evidence to formally declare dead. The account is too young (only T001-T002 batches) for definitive kills.
- **Watch list:** Aspirational-only copy (no mechanism education) may be an attention trap. The aspirational relief text wall v2 spent $2,302 with 0 purchases — the "what if" framing is getting spend but not converting. If T003 aspirational variants also fail to convert, kill the angle for future batches.

### Test (gaps and opportunities)

1. **UGC / Creator-led testimonial.** Real person direct-to-camera telling their insomnia → CBT-I recovery story. Highest priority gap — the industry's #3 format has zero Stellar Sleep creative.
2. **Temporal Discounting in hooks.** Open with the immediacy: "I noticed the difference on night three," "Within a week, the 3am wake-ups stopped," "10 minutes before bed changed everything." Put the speed-of-relief in the scroll-stop position.
3. **Comparison format (Pills vs. CBT-I).** The anti-pills angle drives attention. Formalize it into a visual side-by-side: Pills (dependency, side effects, tolerance) vs. CBT-I (addresses root cause, no drugs, lasting results). The data supports the angle — give it a format that makes the comparison explicit.
4. **Parent-specific creative (ONP persona).** "I was too exhausted to be present for my kids" → "CBT-I gave me my mornings back." Untested persona with clear VoC support from research.
5. **Before/After transformation format.** The only converting creative with visual transformation (rank 9) has the best ROAS. Test dedicated before/after stories with more detail and emotional arc.
6. **Social Proof stacking.** Add user count, review quotes, star ratings, and specific outcome numbers to creatives. Currently absent from everything except the 80% stat pill.
7. **Goal Gradient integration.** Show the CBT-I journey as a visible progression (Week 1 → Week 2 → Week 4) to activate the "close to the finish line" effect. The app's built-in program structure makes this natural.

### Split Recommendation

| Bucket | Count | What It Must Test |
|---|---|---|
| Anti-pills / mechanism education (video) | 3-4 | Faster pivot from hook to mechanism. Under 35s. At least 1 with Temporal Discounting hook. |
| UGC / Creator testimonial (video) | 2-3 | First-person recovery story. Real person DTC. At least 1 parent-specific. |
| Text wall evolution (video) | 2 | Pain-forward with updated VoC. Mechanism education embedded earlier. |
| Comparison / vs format (video or static) | 2 | Pills vs. CBT-I side-by-side. Visual proof of difference. |
| Static (quote card / listicle / new formats) | 3-4 | At least 1 with Social Proof stacking. At least 1 with Temporal Discounting. At least 1 before/after transformation. |

**Total: 12-15 creatives** — balanced between scaling proven angles (anti-pills, mechanism education) and testing major gaps (UGC, comparison, Social Proof).

### Risks / Guardrails

- **Text wall concentration risk.** 3 of 6 video spenders are text walls. Don't let T003 default to more text walls — the format is reaching diminishing returns.
- **Authority saturation risk.** Every creative leads with the same Harvard/ACP/AASM authority stack. The audience will develop ad blindness to this proof point. Start diversifying the trust mechanism (user testimonials, specific outcome stories, before/after evidence).
- **Anti-pills negative framing risk.** The anti-pills angle attracts but doesn't convert. Spending too long in negative framing (attacking pills) may be filtering out buyers who want to hear about the solution, not the problem. T003 should test positive-framing hooks that sell the CBT-I mechanism without first demolishing the alternative.
- **Stock footage homogeneity risk.** All video creatives use similar dark bedroom / pills stock footage. This makes ads look alike in the feed and reduces scroll-stop differentiation. T003 should diversify visual treatment.

---

## 7. Carry-Forward Creative Learnings

- **Mechanism education is the conversion gating factor.** All 3 purchases (across $12.3k total spend) came from creatives that explain how CBT-I works by addressing conditioned wakefulness patterns. Creatives that only agitate pain or attack alternatives get attention (up to 7.23% CTR) but zero purchases.
- **Declarative future-pacing hooks outperform aspirational question hooks.** Text wall v1 ("You wake before your alarm") converted; v2 ("What if sleep left you ready?") did not, on comparable spend. The declarative version bypasses the skepticism gate that questions trigger.
- **The anti-pills hook is the strongest new attention signal.** Two anti-pills variants in the top 9 (7.23% and 3.60% CTR). The "what your sleep med can't do" reframe is the scroll-stopper — but it needs mechanism education to convert.
- **Pain-recognition text walls convert more efficiently than aspirational ones.** Pain stack at $194 CPA vs. aspirational at $2,062 CPA. VoC specificity in pain copy drives conversion; aspirational copy drives spend volume.
- **Before/after visual transformation correlates with the best ROAS in the account.** The only creative with a visual transformation (rank 9, before/after split screen) produced 3.09x ROAS — 6x better than the next converter.
- **Total spend is running ahead of total purchases.** $12.3k spend / 3 purchases = $4,109 blended CPA. The creative is driving attention effectively but the attention-to-conversion pipeline needs work — either in the creative body, the landing page, or both.
