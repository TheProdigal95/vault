# Persona Summary — Stepful

> Source of truth: `_data/persona-dictionary.json` + classified `reviews.jsonl` + `_data/ad-classifications.json`.
> Full calc: [[Review Analysis - Stepful]]. Full persona profiles: [[Persona Context - Stepful]].

> ⚠ **Persona Summary — degraded state**
> - Persona lock completed with constraints after 2-iteration loop budget exhausted. See Review Analysis §4 precision table.
> - Review corpus under 420 reviews — persona clustering is small-N; untagged residual 56.2% driven by short 5★ reviews lacking behavioral signal keywords.
> - Ad classification precision below 70% on "The Life-Circumstances Career Launcher" after retry (20%). Creative Pillars for this persona are directional only.
> - Ad classification precision below 70% on "The Dead-End Job Escaper" after retry (15%). Creative Pillars for this persona are directional only.
> - Ad classification precision below 70% on "The Healthcare Credential Upgrader" after retry (22%). Creative Pillars for this persona are directional only.
> - Crawler hit --max-pages (200) with queue_incomplete non-empty (839 URLs). Remaining URLs are state/city salary SEO pages — all core program and brand pages fully captured.

---

## 1. Persona Frequency

| Persona | % of Reviews | Avg Rating |
|---|---|---|
| The Affordable Fast-Track Seeker | 22.1% | 3.59 |
| The Externship & Job-Placement Deceived | 19.8% | 2.58 |
| The Dead-End Job Escaper | 11.0% | 3.76 |
| The Healthcare Credential Upgrader | 9.0% | 3.34 |
| The Life-Circumstances Career Launcher | 7.9% | 3.70 |
| Untagged (no persona match) | 56.2% | — |

*Note: Rows sum to >100% due to multi-persona tagging (some reviews match multiple personas). Untagged residual accepted as-is per strategist instruction — driven by short 5★ testimonials with no behavioral keywords.*

---

## 2. Ad Library Orientation

- **Total live ads:** 115 (79 video / 9 image / 27 carousel)
- **`first_seen` range:** 2026-04-06 to 2026-05-31
- **Recurring primary-text patterns:**
  1. "4 months, 100% online" speed-plus-flexibility frame — appears in 52+ ads across all formats
  2. Certification exam names (CCMA, CPhT, DANB, NHA, PTCB) anchoring career destination — appears in 60+ ads
  3. "No experience / no degree needed" objection removal — appears in 35+ ads
  4. Externship/clinical hours called out as a built-in differentiator — appears in 35+ ads
  5. Student testimonial / "take it from me" voice — appears across 8+ dedicated UGC/creator ads
- **Recurring headline patterns:**
  1. "100% Online & Part-Time Training + In-Person Clinical Hours" — 6 static/carousel executions, verbatim repeat
  2. "Certified in 4 Months" / "Become a [Role] in 4 Months" — variant in 6+ ads
  3. "Ranked #1 EdTech Company in the USA by TIME" — authority badge, 6 video ads
  4. "Stand out from book-only pre-meds" — pre-med niche angle, 5+ ads
  5. "Built for Busy Moms Ready to Level Up" — life-circumstances angle, 3 ads

---

## 3. Creative Pillars

| Persona | Angle | Ad Count |
|---|---|---|
| The Affordable Fast-Track Seeker | Get certified & hired in 4 months: online, externship, job coaching. | 13 |
| The Affordable Fast-Track Seeker | Testimonial: A former student recommends joining Stepful. | 10 |
| The Affordable Fast-Track Seeker | Start your healthcare class now. | 7 |
| The Affordable Fast-Track Seeker | Launch a flexible healthcare career while balancing life. | 3 |
| The Affordable Fast-Track Seeker | No experience or degree? Launch a Dental Assistant career in 4 months. | 3 |
| The Life-Circumstances Career Launcher | Launch a flexible healthcare career while balancing life. | 7 |
| The Life-Circumstances Career Launcher | Start your healthcare class now. | 6 |
| The Life-Circumstances Career Launcher | No experience or degree? Launch a Dental Assistant career in 4 months. | 5 |
| The Life-Circumstances Career Launcher | Choose purpose, not just a career. | 3 |
| The Life-Circumstances Career Launcher | Get certified & hired in 4 months: online, externship, job coaching. | 3 |
| The Dead-End Job Escaper | Choose purpose, not just a career. | 8 |
| The Dead-End Job Escaper | Testimonial: A former student recommends joining Stepful. | 7 |
| The Dead-End Job Escaper | Get certified & hired in 4 months: online, externship, job coaching. | 4 |
| The Dead-End Job Escaper | Entry-level isn't the finish line: Upgrade your healthcare career. | 3 |
| The Dead-End Job Escaper | No experience or degree? Launch a Dental Assistant career in 4 months. | 1 |
| The Externship & Job-Placement Deceived | Preview your hands-on externship experience. | 7 |
| The Externship & Job-Placement Deceived | Pre-med hack: Get paid clinical hours & boost med school app. | 5 |
| The Externship & Job-Placement Deceived | Get certified & hired in 4 months: online, externship, job coaching. | 3 |
| The Externship & Job-Placement Deceived | No experience or degree? Launch a Dental Assistant career in 4 months. | 1 |
| The Healthcare Credential Upgrader | Pre-med hack: Get paid clinical hours & boost med school app. | 4 |
| The Healthcare Credential Upgrader | Entry-level isn't the finish line: Upgrade your healthcare career. | 4 |
| The Healthcare Credential Upgrader | Identify with a fun MA archetype. | 1 |

**Pillars** (≥20% of total ad volume for a persona OR ≥3× next-largest):
- "Get certified & hired in 4 months: online, externship, job coaching." → 13 ads for Affordable Fast-Track (33.3% of persona ad share) — dominant pillar
- "Choose purpose, not just a career." → 8 ads for Dead-End Job Escaper (33.3% of persona ad share) — dominant pillar
- "Preview your hands-on externship experience." → 7 ads for Externship & Job-Placement Deceived (43.8% of persona ad share) — dominant pillar
- "Launch a flexible healthcare career while balancing life." → 7 ads for Life-Circumstances Career Launcher (25.9% of persona ad share) — dominant pillar

**Persona ad-share rollup:**
- The Affordable Fast-Track Seeker: 39 ads (33.9%)
- The Life-Circumstances Career Launcher: 27 ads (23.5%)
- The Dead-End Job Escaper: 24 ads (20.9%)
- The Externship & Job-Placement Deceived: 16 ads (13.9%)
- The Healthcare Credential Upgrader: 9 ads (7.8%)

---

## Gap Analysis — Recommendation (light)

- The Externship & Job-Placement Deceived is the brand's second-largest review persona (19.8% of reviews, avg 2.58★ — the most negative in the corpus) but receives the second-smallest ad share (13.9%). The "Preview your hands-on externship experience" angle actively runs to this audience — this is a deliberate counter-positioning play addressing the persona's core anxiety.
- The Affordable Fast-Track Seeker dominates both review share (22.1%) and ad share (33.9%) — this is the most matched persona in the library. The "Get certified & hired in 4 months" frame is the clear lead creative.
- The Life-Circumstances Career Launcher is over-indexed in ads (23.5% ad share) relative to reviews (7.9%) — the "Built for Busy Moms" frame is actively amplified beyond what the review corpus alone would suggest as the primary audience.
- The Healthcare Credential Upgrader is both the smallest review persona (9.0%) and the smallest ad share (7.8%) — proportional.

No prescriptions. No suggested angles. For angle pools, see Persona Context Part 5.

*Last updated: 2026-06-01*
