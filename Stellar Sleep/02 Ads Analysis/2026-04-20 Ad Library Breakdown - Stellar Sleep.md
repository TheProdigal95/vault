---
cssclasses:
  - table-wide
  - wide
---
# Stellar Sleep Ad Library Breakdown — Full Visual Audit

*Analysis date: April 20, 2026*
*Source: Meta Ad Library (active status, page_id 111492238407064)*
*Method: Apify scrape → media download → Gemini per-ad visual analysis*
*Raw data: `~/00 Global/Hermes/Tools/ad-library/data/stellar-sleep/ads-raw.json` · Per-ad analyses: `~/00 Global/Hermes/Tools/ad-library/data/stellar-sleep/analysis/`*

> This audit supersedes the "Ad Library Orientation" block in [[Persona Summary - Stellar Sleep]], which was built from primary-text + format fields only and missed video + visual angle diversity.

---

## 1. Corpus at a Glance

- **Total active ads:** 27
- **Type split:** 14 Image / 13 Video (prior research read of "0 video / 26 carousel" was wrong at the card level — roughly half the library is video)
- **Format (container):** 26 DCO carousel + 1 standard carousel (Meta-side all serve as carousels, but individual creative cards are image or video)
- **First-seen cohorts:** Jan-22 seed (3 ads) → Apr-04/05 mass drop (~19 ads) → rolling adds Apr-07/10/12/19
- **Primary text:** Only **4 unique variants** across 27 ads — differentiation lives entirely in the creative, not the copy block
- **Headlines:** Only **4 unique variants** — "Try It Free For 7 Days" (46×), `{{product.name}}` DCO (26×), "The Sleep Solution That Works" (19×)
- **CTA:** "Sign Up" dominant (free 7-day trial flow)
- **Pillar re-read:** Prior "2 messaging pillars" finding was correct for primary text, wrong for creative. Visuals reveal ~8 distinct angles.

---

## 2. Angle Inventory

| # | Angle | Count | Persona(s) | Example Ad IDs |
|---|---|---|---|---|
| A1 | **"What I've spent" cost listicle** — failed cures itemized with $ amounts (sleeping pills $200, white noise machine $250, etc.) | 5 | Chronic Everything-Failer, Skeptical Psychology Convert | 1463149305271609, 2062645057888583, 1558775819063221, 2674078739617628, 919508317514249 |
| A2 | **3:47 AM wake-up / can't-fall-back-asleep** pain setup | 4 | Sleep Anxiety Spiraler | 1441718840726324, 1285260876868430, 1731882388186895, 1859705698002430 |
| A3 | **Racing thoughts / to-do list at night** (thought bubbles, icons popping) | 4 | Sleep Anxiety Spiraler | 1724458285206827, 2417356385419622, 795848086518371, 829105086879788 |
| A4 | **Pill escape / "trapped by meds"** (maze or daze-from-pills visuals) | 4 | Pill Escape Seeker | 1948741912422824, 4384984691752647, 789295077237240, 1630176828103411 |
| A5 | **Daytime consequence / not-present** (exhausted at work, with kids, at dinner) | 4 | Overwhelmed New Parent, Chronic Everything-Failer | 1206041501608153, 3322081284646659, 759845283844258, 963592709651847 |
| A6 | **Endless cycle / hamster wheel** (tried everything montage → CBT-I reveal) | 3 | Chronic Everything-Failer | 964063809477870, 966622655940524, 1966765570618942 |
| A7 | **"One pill tonight → hundreds in a year"** (dependency scale visual) | 2 (small-N, directional) | Pill Escape Seeker | 953944957243313, 1630176828103411 |
| A8 | **Personified brain mascot** ("Izzy the Brain has insomnia") | 1 (small-N) | Unclear — brand-building, not persona-targeted | 1483623070081882 |
| A9 | **Friend referral social proof** ("my friend tried CBT-I") | 2 (often embedded in A6) | Skeptical Psychology Convert | 1558775819063221, 1966765570618942 |
| A10 | **Exhausted-from-no-sleep cafe/morning scene** | 2 (small-N) | Chronic Everything-Failer | 3668904229907724, 759845283844258 |

Angles overlap — A6 often tails into A9.

---

## 3. Hook Tactic Inventory

| Hook tactic                                                                                         | Count | Example IDs                                                                                                |
| --------------------------------------------------------------------------------------------------- | ----- | ---------------------------------------------------------------------------------------------------------- |
| **Pain-recognition question** ("Insomnia giving you racing thoughts?" / "Exhausted from no sleep?") | ~11   | 1724458285206827, 2417356385419622, 3322081284646659, 3668904229907724, 759845283844258, 829105086879788   |
| **3:47 AM clock drop** (visual pattern interrupt)                                                   | 6     | 1441718840726324, 1463149305271609, 1285260876868430, 2062645057888583, 2674078739617628, 1724458285206827 |
| **Cost listicle shock** (dollar tally as hook)                                                      | 5     | 1463149305271609, 2062645057888583, 919508317514249, 1558775819063221, 2674078739617628                    |
| **First-person confession VO** ("I'm so tired. Why can't I sleep?")                                 | ~7    | 1441718840726324, 2674078739617628, 919508317514249, 1558775819063221, 964063809477870, 966622655940524    |
| **Provocation / trapped metaphor** (maze, hamster wheel)                                            | 5     | 1948741912422824, 4384984691752647, 964063809477870, 966622655940524, 789295077237240                      |
| **Inner-monologue reveal** ("My mind and body are exhausted… but I still can't fall asleep")        | 3     | 1285260876868430, 1731882388186895, 1859705698002430                                                       |
| **Scale-shock visual** (1 pill → pile of pills)                                                     | 2     | 1630176828103411, 953944957243313                                                                          |

**Absent hook tactics:** no stat drop, no quiz-first, no celeb/expert, no doctor authority, no clinical study cited, no before/after transformation.

---

## 4. Visual Treatment Inventory

| Treatment | Count | Example IDs |
|---|---|---|
| **3D animated character (Pixar-style)** — the clear house style | ~23 | 1441718840726324, 1463149305271609, 2062645057888583, 1948741912422824, 2417356385419622, 1558775819063221, 759845283844258, 3668904229907724 |
| **Photographic / live-action bed shots** (faceless, minimalist) | 3 | 1285260876868430, 1731882388186895, 1859705698002430 |
| **Split-screen (parent vs. kids; tired vs. engaged colleague)** | 2 | 1206041501608153, 963592709651847 |
| **Mascot character** (Izzy the Brain) | 1 | 1483623070081882 |
| **Kinetic-text / 3D typography hook** (letters "SLEEP HACKS" shattering) | 1 | 1966765570618942 |
| **Surreal metaphor scenes** (hedge maze, hamster wheel, pill-character companions) | 5 | 1948741912422824, 4384984691752647, 964063809477870, 966622655940524, 789295077237240 |

**Absent:** no stock video, no real testimonial face-to-camera, no app-UI screenshots, no journal/study reference B-roll, no hand-drawn, no street-interview format, no creator/UGC.

---

## 5. Proof Cascade Inventory

| Proof element | Frequency | Example IDs |
|---|---|---|
| **"Developed at Harvard" tagline** (primary text only — never in-image or VO) | 21 of 27 primary-text uses | Most `Try It Free For 7 Days` ads |
| **"Proven psychology-based techniques"** (generic, no study cited) | 21 | Same cluster |
| **"10 minutes a day"** mechanism claim | 6 | 1206041501608153, 1441718840726324, 1630176828103411, 795848086518371, 829105086879788, 4384984691752647 |
| **CBT-I named in-video** | ~7 | 1558775819063221, 1966765570618942, 964063809477870, 966622655940524, 1630176828103411, 1285260876868430, 1731882388186895 |
| **Friend referral as social proof** | 3 | 1558775819063221, 1966765570618942, 964063809477870 |

**Absent proof:** no 80% stat, no 74-minute claim, no clinical trial reference, no journal name, no doctor/expert face, no user testimonial clip, no before/after timeline, no Trustpilot or App Store rating, no press logos.

---

## 6. Persona Coverage (Revised)

| Persona | Coverage | Notes |
|---|---|---|
| **Sleep Anxiety Spiraler** | **Strong** (~8 ads) | A2 + A3 own this — racing thoughts, 3:47 AM, to-do list. Prior "0% ad coverage" read was wrong once visuals are included. |
| **Chronic Everything-Failer** | **Strong** (~8 ads) | A1 cost listicles + A6 hamster wheel + A10 exhausted cafe |
| **Pill Escape Seeker** | **Moderate** (~6 ads) | A4 maze + A7 pill-pile + 789295077237240 daze-from-pills. Prior "0% ad coverage" read was wrong. |
| **Skeptical Psychology Convert** | **Weak-to-moderate** (~3 ads direct lead) | Mostly embedded as the turn/reveal at end of A6. **No ad leads with "here's why CBT-I is science-backed."** |
| **Overwhelmed New Parent** | **Weak** (2 ads, small-N) | 759845283844258 (mom + kids at park), 1206041501608153 (split-screen). Neither leans hard into parent-specific guilt. |

**Gaps in-market:**
- Skeptical Psychology Convert is under-served at the lead — Harvard/CBT-I is always a tail payoff, never an opener.
- Overwhelmed New Parent barely touched.
- No ad addresses the "I've been to a doctor / sleep clinic already" sub-segment.

---

## 7. What This Changes vs. Prior Research Read

The Persona Summary's "Ad Library Orientation" block (built from primary-text + display_format only) materially mis-characterized the library in three ways:

1. **"0 video" was wrong.** 13 of 27 are video. Half the creative intelligence value of the library was invisible in a primary-text-only audit.
2. **"Only 2 messaging pillars" was wrong at the visual level.** Primary-text laziness (4 variants) masked ~8 distinct visual angles — cost listicle, pill-maze, hamster-wheel, racing-thoughts, daytime-consequence, morning-cafe, mascot, split-screen all real and distinct.
3. **"Sleep Anxiety Spiraler has 0% ad coverage" was wrong.** They have ~8 ads. "Pill Escape Seeker has 0% ad coverage" was wrong — ~6 ads.

The prior read got **one thing right:** proof cascade is genuinely thin. Harvard is boilerplate in primary text; no in-creative clinical proof; no testimonials; no stats. The "creatively narrow on proof" finding stands even after visual audit — arguably stronger, because nothing in the video VO leans on the 80%/74-min clinical claims either.

---

## 8. Implications for T001 Batch Plan

### Harvard angle is genuine white space — but not for the reason we thought

Harvard appears **only as a primary-text tagline**, never as a visual or VO hook in the current library. Zero ads open with "Harvard scientists found…" or show the research. If T001 goes 70% Harvard angle, Stellar Sleep is NOT competing against themselves on that angle — they're not running it as a creative, only as a trust bumper.

**T001 Harvard angle should:**
- Lead with Harvard visually and in VO (study screenshots, Brigham and Women's Hospital, Massachusetts eHealth Institute funding, named researchers)
- Own the stat drop — 80% improve sleep, 74-min gain, 53 min faster to fall asleep, 52% fewer awakenings. **None of these appear in the current library.**
- Consider modeling on the cost listicle structure (proven to get spend) but swap the payoff from "here's what I wasted" to "here's what the Harvard study tested and measured."

**Harvard claims to verify before scripting:**
- "Founded at Harvard Innovation Labs" (Brand Context confirmed)
- "Curriculum developed with Harvard Medical School + Brigham and Women's Hospital" (Brand Context confirmed)
- "Clinical study funded by Massachusetts eHealth Institute" (Brand Context confirmed)
- Clinical outcome stats (80% / 74min / 53min / 52%) — Brand Context has these as site claims; **verify each against a specific URL before putting in VO or on a study screenshot.** Science page + Why Stellar Sleep article are the canonical sources.

### Currently saturated — differentiate heavily or avoid

- 3:47 AM clock wake-up as hook (6 ads)
- Pain-recognition question with animated tired person (~11 ads)
- Cost listicle format (5 ads — covered; only borrow the structure with a new payoff)
- Hamster wheel / maze "trapped" metaphor (5 ads)
- 3D Pixar-style animation as visual language (23 ads — picking this for T001 would blend into their own library)

### White space (high-signal)

- **Stat-drop hooks** — "80% of users improved their sleep" / "74 more minutes of sleep" — invisible in-market. Strong opener candidate.
- **Mechanism explainers** — no ad shows *how* CBT-I works. "Here's the 10-minute method, step by step" is untested.
- **Real testimonials / before-after timelines** — zero in the library. Major proof gap.
- **Skeptical Psychology Convert lead-with-science format** — no ad opens with CBT-I credibility.
- **Overwhelmed New Parent** with parent-specific guilt/consequence beyond surface — 2 ads, both generic.
- **Live-action or photographic visual treatment** — only 3 ads, all faceless minimalist. Strong differentiation lane vs. the 3D-animated house style. If T001 shoots creator UGC, it's visually novel vs. everything else Stellar is running.
- **Study screenshot / journal B-roll** — completely absent. Perfect complement to the Harvard angle.

### Tactics worth borrowing

- **Cost listicle structure** — clearly spending. Adapt with Harvard study payoff.
- **First-person confession VO** ("I'm so tired. Why can't I sleep?") — repeated enough to signal it works. Fine as scaffolding on Harvard scripts; pair with science-forward body.
- **Pain-recognition question at top of frame** — their proven attention mechanic. Reusable even on Harvard angle.

### Format mix for T001

- Current plan: 8 videos + 4 statics + 3 additional = 15. Given Stellar's library is ~half video, the 8:4 split is roughly in line with what's in-market.
- Statics white space: no stat-card static, no quote-card testimonial, no before-after. Pick formats that don't duplicate the animated-character cost listicle (the dominant current static).

---

## 9. Open Verification Items

Before T001 scripting, confirm:

- [ ] URL for the 80% / 74-min / 53-min / 52% stats on https://stellarsleep.com/science (or Why Stellar Sleep article) — pull screenshot source for Footage references.
- [ ] Massachusetts eHealth Institute grant — public source URL (press release or brand page) for study-screenshot B-roll.
- [ ] Whether Brigham and Women's Hospital clinical study has published results or is still ongoing — determines whether we can claim outcomes or only "studied at" framing.
- [ ] With K-Tjen Khong: is there a compliance/guardrails doc we should be working from? Not yet in `00 Context/`.

---

*Raw ads retained at `~/00 Global/Hermes/Tools/ad-library/data/stellar-sleep/` for re-run. Per-ad analysis files preserved in `analysis/` subfolder; media downloads cleaned up after this report.*
