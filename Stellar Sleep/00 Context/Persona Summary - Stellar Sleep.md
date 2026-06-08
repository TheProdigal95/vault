# Persona Summary — Stellar Sleep

> Source of truth: `_data/persona-dictionary.json` + classified `reviews.jsonl` + `_data/ad-classifications.json`.
> Full calc: [[Review Analysis - Stellar Sleep]]. Full persona profiles: [[Persona Context - Stellar Sleep]].

> ⚠ **Persona Summary — degraded state**
> - Review corpus under 123 reviews (Apple App Store only) — Google Play reviews not accessible; positive review coverage is partial (brand claims 500+ five-star reviews; corpus contains 62). Persona clustering reflects available App Store reviews only.
> - 'The Billing-Burned Customer' is a commercial complaint cluster, not a buying-trigger persona. Retained in frequency table for reference; excluded from ad targeting. See Persona Context for trust/objection signals.
> - 'The Overwhelmed New Parent' is a client-confirmed persona (customer interviews) not represented in the review corpus. App Store reviews don't capture new parents. Frequency shown as 0% corpus / client-confirmed real.
> - 'The Pill Escape Seeker' clustered from 11 tagged reviews — small-N, treat as directional. Medication-exit angles best tested via The Chronic Everything-Failer funnel.
> - **Ad Library Orientation + Creative Pillars + Gap Analysis below are TEXT-ONLY** (built from primary text classification per research pipeline methodology). A separate visual audit of the current library (27 ads, 14 image + 13 video inside DCO carousels) shows materially different persona coverage — see [[2026-04-20 Ad Library Breakdown - Stellar Sleep]] as the source of truth for in-market creative angle coverage. In particular, Sleep Anxiety Spiraler (~30% visual coverage), Pill Escape Seeker (~22%), and Overwhelmed New Parent (~7%) all have ad coverage once visuals are factored in, even though text classification shows 0% for each.
> - No direct competitors validated from switch-mention analysis. Sleep Reset nominated by client as #1 closest competitor — run --refresh=competitors to build Positioning Ammo.

---

## 1. Persona Frequency

| Persona                          | % of Reviews | Avg Rating | Notes                                                                                     |
| -------------------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------- |
| The Skeptical Psychology Convert | 40.7%        | 3.82       | Primary acquisition persona                                                               |
| The Chronic Everything-Failer    | 24.4%        | 4.47       | Secondary acquisition persona                                                             |
| The Sleep Anxiety Spiraler       | 16.3%        | 4.80       | Highest outcome satisfaction; ~30% visual ad coverage (text-only classification reads 0%) |
| The Pill Escape Seeker           | 8.9%         | 4.45       | Small-N (11 reviews); directional only                                                    |
| The Overwhelmed New Parent       | 0% corpus    | —          | Client-confirmed (customer interviews); not in App Store corpus                           |
| The Billing-Burned Customer      | 35.0%        | 1.51       | ⚠ Complaint cluster — not an acquisition persona                                          |
| Untagged (no persona match)      | 23.6%        | —          |                                                                                           |

---

## 2. Ad Library Orientation

> Text-only orientation per pipeline methodology. Numbers reflect the 2026-04-20 text classification of ad copy and headlines. For the visual audit of carousel cards (angles, hooks, persona coverage in creative), see [[2026-04-20 Ad Library Breakdown - Stellar Sleep]].

- **Total live ads:** 26 at the time of text classification (2026-04-20 scrape). Library rotates — a refresh scrape the same day returned 27 ads. Use the Ad Library Breakdown doc for the current count.
- **Meta format container:** All ads serve as DCO carousel (26 DCO + 1 standard carousel in refresh scrape). The carousel container does not mean the cards inside are static — visual audit shows 14 image + 13 video cards across the 27-ad refresh, so video is present in-market even though the display_format field is always "carousel."
- **`first_seen` range:** 2026-01-22 to 2026-04-19
- **Recurring primary-text patterns:**
  1. "Stellar Sleep uses proven psychology-based techniques to help you sleep better. Developed at Harvard. Customized for you." — dominant primary text (~21 of 27 ads in the 04-20 refresh)
  2. "I tried every sleep hack — nothing worked. Then Stellar Sleep reset my nights in weeks with just 10 minutes a day." — secondary primary text (~19 of 27 ads, often paired as DCO alternative)
  3. Both patterns follow the format: `[brand]` / `---` / `[body text]` — a DCO carousel template with a brand header and a single rotating body copy line
  4. No personalization visible in primary text — both patterns are used across all classified ads without persona-specific variation
- **Recurring headline patterns:**
  1. `{{product.name}}` — dynamic DCO placeholder used across the library as the headline, resolving to "Stellar Sleep" at serve time
  2. Static headline variants: "Try It Free For 7 Days" (dominant in refresh), "The Sleep Solution That Works" (paired with the tried-every-sleep-hack body)
  3. No pain-specific or persona-specific headline copy in the current active library

---

## 3. Creative Pillars

> The table below reflects **text-only classification** (primary text + headline only). It's the pipeline-canonical view. For the **visual-audit view** of which personas are actually being targeted by creative angles (hook style, scene setup, VO), see [[2026-04-20 Ad Library Breakdown - Stellar Sleep]] §6 "Persona Coverage (Revised)" — that's the source of truth for ad-coverage decisions in batch planning.

### Text-only view (primary text classification)

| Persona | Angle | Ad Count |
|---|---|---|
| The Skeptical Psychology Convert | Harvard-backed psychology for better sleep | ~21 (from 04-20 refresh) |
| The Chronic Everything-Failer | Tried everything? This 10-min daily method works. | ~19 (from 04-20 refresh) |
| The Sleep Anxiety Spiraler | — | 0 (text only — see visual audit) |
| The Pill Escape Seeker | — | 0 (text only — see visual audit) |
| The Overwhelmed New Parent | — | 0 (text only — see visual audit) |
| The Billing-Burned Customer | — | 0 (appropriate — complaint cluster) |

**Text-only pillars** (≥20% of ad volume by primary text):
- "Harvard-backed psychology for better sleep" → dominant primary-text pillar
- "Tried everything? This 10-min daily method works." → second primary-text pillar

### Visual-audit view (from [[2026-04-20 Ad Library Breakdown - Stellar Sleep]])

Once carousel card visuals and video VO are classified, persona coverage shifts materially:

| Persona | Visual Coverage | Notes |
|---|---|---|
| The Skeptical Psychology Convert | Weak-to-moderate (~3 ads lead) | Harvard/CBT-I appears as tail-reveal, never a creative lead. White space for T001. |
| The Chronic Everything-Failer | Strong (~8 ads) | Cost listicles, hamster wheel, exhausted cafe visuals |
| The Sleep Anxiety Spiraler | Strong (~8 ads) | 3:47 AM wake-up + racing thoughts angles — text view missed this entirely |
| The Pill Escape Seeker | Moderate (~6 ads) | Pill-maze, pill-pile, daze-from-pills — text view missed this entirely |
| The Overwhelmed New Parent | Weak (2 ads, small-N) | Surface-level parent-consequence visuals only |
| The Billing-Burned Customer | 0 (appropriate — complaint cluster) | — |

---

## Gap Analysis — Recommendation (visual-audit revised)

Gap conclusions below reflect the [[2026-04-20 Ad Library Breakdown - Stellar Sleep]] visual-audit view, not the text-only classification. Visual audit supersedes for acquisition decisions.

- **The Skeptical Psychology Convert** (40.7% of reviews, 3.82 avg) — **under-served as a creative lead.** The Harvard/CBT-I claim appears in-market only as a primary-text tagline (21 of 27 ads) and as an end-of-video tail reveal on ~3 ads. Zero ads open with Harvard/CBT-I as the visual or VO hook. This is the biggest untapped creative angle given the persona's review weight.
- **The Chronic Everything-Failer** (24.4% of reviews, 4.47 avg) — **well-covered** across ~8 ads via cost listicles, hamster wheel / tried-everything montages, and exhausted morning-cafe visuals. Creative borrow candidates: cost listicle structure with Harvard-study payoff.
- **The Sleep Anxiety Spiraler** (16.3% of reviews, 4.80 avg — highest outcome satisfaction) — **has ~8 ads in-market** via the 3:47 AM wake-up angle and racing-thoughts / to-do-list angle. Text-only view incorrectly read this as 0% coverage. Still worth targeting but no longer the "strongest untested opportunity" — it's already saturated with pain-setup framing. Differentiation lane: lead with the anxiety-sleep feedback-loop mechanism explanation, which is absent from the current library.
- **The Overwhelmed New Parent** — has ~2 ads in-market (small-N), both surface-level (split-screen, mom-at-park). Parent-specific guilt/consequence angles are still largely untested creative territory. Client confirms this is a real acquisition segment.
- **The Pill Escape Seeker** (8.9% of reviews, 4.45 avg) — **has ~6 ads in-market** via the pill-maze / pill-pile / daze-from-pills angles. Text-only view incorrectly read this as 0% coverage. Already covered.
- **The Billing-Burned Customer** (35.0% of reviews, 1.51 avg) — trust/commercial problem, not an acquisition opportunity. Zero ad coverage is appropriate.
- **Format mix in-market:** DCO carousels contain both image and video cards (~14 image / 13 video of the 27-ad refresh). Visual house style is heavy 3D Pixar-style animation (~23 of 27). Live-action, stock video, UGC/creator, app-UI, and study-screenshot / journal B-roll are all absent — each is a visual-treatment white space.
- **Proof cascade gap stands** even after visual audit: no in-creative stat drop (80%, 74-min, 53-min, 52% never spoken or shown), no testimonial/face-to-camera, no doctor/expert authority, no study screenshot or journal B-roll, no before/after timeline, no Trustpilot or App Store rating surfaced.

*Last updated: 2026-04-20 (revised post-visual-audit)*
