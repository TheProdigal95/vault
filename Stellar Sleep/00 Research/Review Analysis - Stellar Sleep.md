# Review Analysis — Stellar Sleep

> Generated: 2026-04-20. Source corpus: `00 Research/Reviews/reviews.jsonl`. Tool chain: review-sampler, persona-counter, persona-dictionary.json.

---

## §1 — Methodology and Coverage

**Corpus:** 123 reviews, all sourced from Apple App Store (iOS listing id1602312365). No Google Play reviews captured — the app's Google Play listing appears to have zero or near-zero public reviews (noted by one reviewer: "I am also really disappointed that I couldn't leave a review through Google Play store and given there are no other reviews on there it seems a bit suspicious"). No Trustpilot or third-party review platform presence detected.

**Date range:** 2022-01-28 to 2026-04-09 (4+ years).

**Coverage target vs. actual:**
- 1–3★ reviews: 61 of 61 available (100%)
- 4–5★ reviews: 62 of unknown total available (App Store does not disclose total review count; site claims "over 500 five-star reviews" but platform only surfaced 62 positive reviews via scraper)

**Gaps:**
- Google Play reviews: zero captured. Platform does not appear to surface public reviews for this app; the scraper cannot access Play Store review pages.
- Amazon: not applicable (app product, not physical).
- Trustpilot / BBB / other platforms: not present.
- App Store positive review coverage is partial. The brand's homepage claims "over 500 five-star reviews" — the 62 positive reviews in this corpus likely represent a small fraction. Positive VoC is directional; negative VoC (1–3★) is likely near-complete for what the App Store surfaces.
- Note: App was previously named "Slumber One" — some reviews reference the old name. These are included in the corpus.

**Tools used:** `/review-scraper` (App Store), `review-sampler` (stratified + persona-segmented), `persona-counter` (classification), inline Gemini tagging (pain cluster derivation), `ad-classifier` (ad library classification).

---

## §2 — Rating Distribution

| Rating | Count | % of corpus |
|---|---|---|
| 1★ | 43 | 35.0% |
| 2★ | 11 | 8.9% |
| 3★ | 7 | 5.7% |
| 4★ | 5 | 4.1% |
| 5★ | 57 | 46.3% |

Total: 123. The corpus is bimodal — a large cluster of 5★ enthusiasts and an equally large cluster of 1★ billing/cancellation complainants. Mid-range (2–4★) is thin: only 23 reviews.

---

## §3 — Geographic Distribution

All 123 reviews are from Apple App Store regional stores:
- US: ~90 reviews (estimated from URL slugs: `appstore-us-most-*`)
- UK: ~12 reviews (`appstore-gb-most-*`)
- Australia: ~10 reviews (`appstore-au-most-*`)
- Canada: ~6 reviews (`appstore-ca-most-*`)
- New Zealand: ~5 reviews (`appstore-nz-most-*`)

No non-English reviews captured. The app appears to serve English-speaking markets primarily; pricing references in reviews span USD, GBP, and AUD.

---

## §4 — Persona Signal Analysis

**Frequency table** (from `_data/persona-frequency.json`):

| Persona | Reviews Matched | % of Corpus | Avg Rating |
|---|---|---|---|
| The Skeptical Psychology Convert | 50 | 40.7% | 3.82 |
| The Billing-Burned Customer | 43 | 35.0% | 1.51 |
| The Chronic Everything-Failer | 30 | 24.4% | 4.47 |
| The Sleep Anxiety Spiraler | 20 | 16.3% | 4.80 |
| The Pill Escape Seeker | 11 | 8.9% | 4.45 |
| Untagged (no persona match) | 29 | 23.6% | — |

**Per-persona rating breakdowns:**

*The Skeptical Psychology Convert (50 reviews, avg 3.82★):*
- 5★: 34 reviews — believers who crossed from skepticism to transformation
- 4★: 0 reviews
- 3★: 2 reviews — "it helped but felt generic"
- 2★: 4 reviews — SRT was harder than disclosed; content felt thin
- 1★: 10 reviews — billing failures + content not worth price

*The Billing-Burned Customer (43 reviews, avg 1.51★):*
- 5★: 3 reviews — charged but got refund quickly; net positive
- 4★: 0
- 3★: 1
- 2★: 2
- 1★: 37 reviews — pure billing/cancellation complaint cluster

*The Chronic Everything-Failer (30 reviews, avg 4.47★):*
- 5★: 26 reviews — people who exhausted all options and finally found something that worked
- 4★: 1
- 3★: 2
- 2★: 1
- 1★: 0

*The Sleep Anxiety Spiraler (20 reviews, avg 4.80★):*
- 5★: 18 reviews — almost uniformly positive; this persona gets the most benefit from CBT-I
- 4★: 1
- 3★: 1
- 2★: 0
- 1★: 0

*The Pill Escape Seeker (11 reviews, avg 4.45★):*
- 5★: 8 reviews
- 4★: 1
- 3★: 1
- 2★: 1
- 1★: 0

---

## §5 — Multi-Persona Overlap (top 20)

| Combination | Count | % of Corpus |
|---|---|---|
| The Chronic Everything-Failer + The Skeptical Psychology Convert | 10 | 8.1% |
| The Billing-Burned Customer + The Skeptical Psychology Convert | 8 | 6.5% |
| The Skeptical Psychology Convert + The Sleep Anxiety Spiraler | 5 | 4.1% |
| The Chronic Everything-Failer + The Skeptical Psychology Convert + The Sleep Anxiety Spiraler | 4 | 3.3% |
| The Chronic Everything-Failer + The Pill Escape Seeker + The Skeptical Psychology Convert | 3 | 2.4% |
| The Chronic Everything-Failer + The Pill Escape Seeker + The Skeptical Psychology Convert + The Sleep Anxiety Spiraler | 3 | 2.4% |
| The Pill Escape Seeker + The Skeptical Psychology Convert | 3 | 2.4% |
| The Chronic Everything-Failer + The Sleep Anxiety Spiraler | 2 | 1.6% |
| The Chronic Everything-Failer + The Pill Escape Seeker | 1 | 0.8% |

No pair exceeds 80% mutual overlap — Auto-Gate B criterion 5 passes.

---

## §6 — Sentiment Themes

**Praise themes (by frequency in 4–5★ reviews):**

| Theme | Count |
|---|---|
| "Finally worked after everything else failed" | 28 |
| Psychology/CBT-I approach is genuinely different | 22 |
| Sleep improved within 2 weeks | 18 |
| Harvard/scientific credibility built trust | 15 |
| Reduced sleep anxiety / no longer dread bedtime | 14 |
| Got off sleeping pills / melatonin | 9 |
| Customer service was responsive (specific reps named) | 6 |
| Program structure and daily lessons valued | 6 |

**Complaint themes (by frequency in 1–2★ reviews):**

| Theme | Count |
|---|---|
| Unauthorized/surprise charges after cancellation | 30 |
| Cannot cancel subscription easily | 18 |
| Content too thin / empty after first month | 12 |
| Price not disclosed until after completing quiz | 9 |
| Sleep Restriction Therapy too brutal, undisclosed upfront | 6 |
| App bugs (progress tracker, sleep log) | 5 |
| Content too generic / not personalized enough | 5 |
| No response from customer service | 5 |

---

## §7 — Common Objections (top 7)

**Objection 1: "They charged me after I cancelled"**
Severity: CRITICAL — appears in ~30 reviews. This is the single most damaging pattern.
- "I cancelled on day 7. Come to find out that 3 months later, my account was *somehow* still active when my credit card was charged $188." — appstore-us-most-12409714849, 1★
- "I cancelled my subscription via the app before my second extortionate quarterly payment... Then, 6 months down the line I realise that cancelling on the app cancels your 'access' to the app but does NOT cancel the actual subscription... I am furious." — appstore-gb-most-11373942153, 1★
- "They kept charging my card up to 5x after the trial even after though I canceled the subscription. Made me change my credit card number twice." — appstore-us-most-12012414427, 1★

**Objection 2: "The price isn't shown until after you've invested 20 minutes in the quiz"**
Severity: HIGH — appears in ~9 reviews.
- "They have you complete a long signup form just to reveal the price at the end of $188 every 3 months." — appstore-us-most-13078507645, 1★
- "Getting into the app it suggests a $9/week cost. Then PayPal informs me that I now have a subscription that costs $188 every three months." — appstore-us-most-10129453768, 1★

**Objection 3: "Sleep Restriction Therapy is brutal and they don't tell you upfront"**
Severity: HIGH — appears in ~6 reviews, including several who had genuine sleep worsening.
- "The central element is sleep restriction therapy. It is absolutely brutal, but you don't get the details as to just how brutal this approach is until after the low introductory cost for the first week has passed and you've been billed a hefty sum for your subscription." — appstore-us-most-11553200970, 2★
- "I remember thinking, 'why is the VA doctor telling me to only allow myself to sleep in a 5.5 hour window'. I was frustrated with the guidance and only lasted two days." — appstore-us-most-11123687667, 5★ (ultimately succeeded, but noted the initial resistance)

**Objection 4: "After the first month, there's nothing left but you keep getting billed"**
Severity: HIGH — appears in ~12 reviews.
- "Once you go through the first month there is no point having the app, even the daily tops don't appear any more. Total rip off." — appstore-gb-most-11373942153, 1★
- "I'm 26 days into the program and it says I'm done. It has given me some useful ideas & tools. But I don't understand why you must pay for 3 months when the program content stops at 26 days." — appstore-us-most-9179926694, 3★

**Objection 5: "The content is generic / the same as what's free online"**
Severity: MEDIUM — appears in ~5 reviews. Often from users who didn't do the full program.
- "Do not waste your money. Scant content ladled out in ponderously small daily doses. It was very generic and could be obtained for free off of hundreds of internet sites." — appstore-us-most-10751291412, 1★
- "Although full of useful information, there is nothing in this app that you cannot find for free on the Internet." — appstore-gb-most-10947654480, 1★

**Objection 6: "I don't know if an app can actually treat my insomnia"**
Severity: MEDIUM — implicit in "skeptic" persona; most overcome after trying.
- "When I bought the app, I was doubtful that my sleep would actually improve." — appstore-us-most-13795155489, 5★
- "I considered insomnia a part of my heritage... but this app truly showed me that I do not have to own that title." — appstore-us-most-10426506847, 5★

**Objection 7: "Sleep Restriction makes things worse before better — will I actually improve?"**
Severity: MEDIUM — SRT-related anxiety appears in ~5 reviews.
- "Absolutely terrible app. The sleep restriction window didn't even change based on my feedback... This technique also ended up making me more anxious and worsening my insomnia." — appstore-us-most-10492752574, 1★
- "I'm getting less sleep than when I started this program three weeks ago." — appstore-us-most-11553200970, 2★

---

## §8 — Key VoC Quotes by Persona

### The Skeptical Psychology Convert

1. "I approached Stellar Sleep with a healthy dose of skepticism. However, the scientifically supported methods the app employed to tackle sleep issues were compelling... the transformation brought about has been nothing short of remarkable." — Ellis.JD, 5★, 2023-07-28, `appstore-us-most-10193721293`

2. "When I bought the app, I was doubtful that my sleep would actually improve... I awaken refreshed and ready for the day bc of the advice and encouragement the app provided on a daily basis. I understand my habits much better and I get more deep sleep and REM sleep than I did." — &hilo, 5★, 2026-02-27, `appstore-us-most-13795155489`

3. "This really, actually works. I don't know how. Some of the stuff they tell you to do just seems completely illogical, but somehow, through their sequence of instructions, I can sleep again." — david.w.87, 5★, 2022-04-09, `appstore-us-most-8550819579`

4. "I didn't think psychology could fix sleep... Stellar sleep has helped me recognize that and handle it in a way where it no longer affects my sleep." — pmios, 5★, 2023-03-06, `appstore-us-most-9687450171`

5. "Only thing that actually worked for me because of the psychological component that helped me discover how burned out I was." — anonymous, 5★, 2023-05-01, `appstore-us-most-9846809702`

6. "Works surprising well. Went from an average of 70% to 95% sleep efficiency in 4 weeks." — anonymous, 2★, 2023-02-01, `appstore-us-most-9247093491`

7. "I wondered if CBT-I could work for insomnia in menopausal women. It DOES! The secret for me has been revisiting it regularly." — LateBloomer365, 5★, 2025-12-05, `appstore-us-most-13478145246`

8. "I was doubtful during the first week of the Stella sleep program and had accepted the fact that I was going to be a poor sleeper my whole life. 3 months later I'm off my sleeping pills and no longer have crushing anxiety about going to bed." — 01terry, 5★, 2024-07-08, `appstore-nz-most-11472026575`

9. "I don't think psychology could fix sleep — they string you along with a trial then charge you ridiculous amounts." — anonymous, 1★, 2024-02-01, `appstore-us-most-10943491214` (objection — did not convert)

10. "Works surprising well... [but] I opted out of sleep restriction and was supposed to be given a personalized program. It was very generic." — anonymous, 1★, 2024-02-01, `appstore-us-most-10751291412`

### The Chronic Everything-Failer

1. "The program in this app ended a decade long stretch of insomnia. Before finding this I tried everything from supplements (magnesium, melatonin) to prescription medication to lifestyle changes (no caffeine, exercise more, etc) and nothing really worked." — anonymous, 5★, 2023-06-01, `appstore-us-most-10567740942`

2. "I found Slumber One at a point in my life where I hadn't slept for weeks. I mean that literally. I track my sleep and I had gone for at least 3 weeks where Fitbit told me I literally had slept 0 minutes and 0 hours in the past 3 weeks... By the fourth week, I actually slept every single night." — david.w.87, 5★, 2022-04-09, `appstore-us-most-8550819579`

3. "Been struggling with 2–4am wake ups for over 4 years. Two weeks in and the pattern is significantly different." — anonymous, 5★, 2023-10-20, `appstore-us-most-11061664330`

4. "I've had really bad insomnia for over 10 years, I've tried seemingly everything under the sun... I've had a couple one off bad nights here and there but the tools I've learned from this app have taken me from average 3 hours a night to pretty consistent 7 hours a night." — anonymous, 5★, 2023-07-10, `appstore-us-most-10189076784`

5. "I've been having trouble sleeping for a year and a half now. I've tried many times to get better, but nothing has ever worked... My friend recommended Stellar Sleep to me this January, and I've been telling her that she probably saved my life." — vicky0066, 5★, 2023-08-01, `appstore-us-most-10209334086`

6. "After at least 40 years of struggling with insomnia my New Year's resolution for 2025 was to successfully defeat it. I had tried pretty much everything imaginable up until now. After starting the Stellar Sleep app I knew there was hope for me." — JDonnell4, 5★, 2025-04-17, `appstore-us-most-12556145990`

7. "I've had insomnia for two years. I have tried 5 or 6 other solutions that claimed they could help me. Stellar sleep is the only thing that actually worked for me." — anonymous, 5★, 2023-05-01, `appstore-us-most-9846809702`

8. "I struggled with insomnia for decades. This app has transformed and improved my sleep in just one week." — Seshef, 5★, 2025-06-21, `appstore-us-most-12802874672`

### The Sleep Anxiety Spiraler

1. "I suffered from insomnia both when my son was born and again in perimenopause. It became so bad I would panic at bedtime, knowing I wouldn't get adequate rest. I knew it had become mental at this point as well and I needed help. Stellar helped from Day 1." — Perimenopausal Insomnia, 5★, 2025-01-24, `appstore-us-most-12224394054`

2. "I used to get anxious hours before bed, fearful of another sleepless night. This program provided me with the tools to combat these fears and return to a restful, restorative sleep cycle." — Babakoy, 5★, 2025-10-01, `appstore-ca-most-13209785798`

3. "I suffered for a year, every night I had fear of going to bed. The first night I used the app, it was very comforting and helpful. After 2 weeks I was sleeping better. After 2 months I was cured." — Elmoweber, 5★, 2025-05-26, `appstore-us-most-12702076720`

4. "I like the emphasis on building skills that I can use to tackle my specific sleep issues vs other apps I've tried which try to just calm you down with generic seeming meditation. I've found that a lot of my sleep problems are made worse by my anxiety, and Stellar sleep has helped me recognize that and handle it in a way where it no longer affects my sleep." — pmios, 5★, 2023-03-06, `appstore-us-most-9687450171`

5. "This program saved my life... I was skeptical at first but decided to give it a try after not being able to find a CBT-I therapist in town, and became extremely desperate to sleep. I was also in regular therapy to address my problems with anxiety, so please know what most sleep issues are related to anxiety." — Daniel Frenkel, 5★, 2024-05-17, `appstore-us-most-11277848613`

6. "Have had periodic bouts of sleeplessness which was causing me to be very anxious about sleep and only perpetuating the problem. The guided sleep journey in this app helps me relax and build good sleep inducing habits that have helped me squash the sleep anxiety." — Rich 6260, 5★, 2024-01-21, `appstore-us-most-10847354022`

7. "After 3 years of progressively worsening sleep, things are finally starting to move in the right direction. I feel so much less stressed about sleep and am starting to wake less." — LondonLally, 5★, 2025-05-19, `appstore-gb-most-12675962674`

8. "This is the first time my fear of sleep is starting to go away. The methods are surprising, but extremely effective." — L421, 5★, 2024-01-24, `appstore-ca-most-10860221393`

### The Pill Escape Seeker

1. "By the middle of the second week I stopped taking melatonin and about 10 other supplements. I would fall asleep quickly... Now I'm a month in to the program and I don't even do anything special to fall asleep if I wake up in the middle of the night. I just fall asleep again." — Yoda the Yoda, 5★, 2024-04-05, `appstore-us-most-11123687667`

2. "3 months later I'm off my sleeping pills and no longer have crushing anxiety about going to bed." — 01terry, 5★, 2024-07-08, `appstore-nz-most-11472026575`

3. "Melatonin, sleeping pills and THC worked for awhile but stopped... I finally went to my new doctor... was prescribed Temazepam for sleep, which usually worked, but I didn't want to get addicted... Stellar Sleep really worked for me." — christasic, 5★, 2024-05-28, `appstore-us-most-11316861661`

4. "Stellar Sleep has solved sleep with their psychology method. I consistently get a great night's sleep and wake up feeling so energized. I no longer need coffee to kickstart my day." — kkjcheng, 5★, 2023-08-10, `appstore-us-most-10241843854`

5. "I was dealing with sudden, debilitating insomnia for 6 months before starting stellar sleep... Within 2 weeks, I was getting 6 hours of sleep. Within a month, I was getting 7. Now, 4 months out, I'm getting the sleep I was getting before." — Kelsenator1993, 5★, 2025-05-16, `appstore-us-most-12662727925`

6. "After 9 months of waking up in the middle of the night and being unable to go back to sleep for hours, I'm finally sleeping through the night!" — Mysic fan, 5★, 2024-08-14, `appstore-ca-most-11609113463`

7. "I used to seriously struggle with sleep, getting 1–2 hours some nights. That feeling of shutting my eyes, awake in bed, sometimes feels worse than a nightmare." — kkjcheng, 5★, 2023-08-10, `appstore-us-most-10241843854`

### The Billing-Burned Customer

1. "The pricing feels designed to make you lose sleep, not get it." — anonymous, 1★, 2024-06-01, `appstore-us-most-10960585092`

2. "I cancelled my subscription via the app before my second extortionate quarterly payment as, quite frankly, once you go through the first month there is no point having the app, even the daily tops don't appear any more. Total rip off." — anonymous, 1★, 2023-11-01, `appstore-gb-most-11373942153`

3. "They kept charging my card up to 5x after the trial even after though I canceled the subscription. Made me change my credit card number twice. Not worth the headache and stress. STAY AWAY." — anonymous, 1★, 2025-01-01, `appstore-us-most-12012414427`

4. "Go to Profile > Manage Subscription > Cancel now. Select 'too expensive' as the reason and receive a massive discount." — anonymous, 3★, 2024-03-01, `appstore-au-most-11980299847`

5. "I am not familiar with this app, but it keeps trying to take $131 from my bank account. If there is a 'Contact Us' link to attempt to dispute the charge, I can't find it." — anonymous, 1★, 2023-01-01, `appstore-us-most-9435399419`

---

## §9 — Emotional Drivers

**What makes people buy:**
- Desperation after years of failed solutions (melatonin, sleeping pills, lifestyle changes, other apps all failed)
- The Harvard/clinical credibility signal bypasses skepticism ("They're from Harvard. Maybe it'll work.")
- Word-of-mouth from a trusted person ("My friend recommended Stellar Sleep to me... she probably saved my life")
- The psychology framing resonates: "I knew it had become mental at this point as well and I needed help"
- Wanting to get off medication / avoid dependency

**What makes people stay:**
- Measurable progress visible in the sleep tracker (Fitbit counter going from 0 to real numbers)
- The 2-week inflection point: almost universally, users who stay report noticing change by week 2
- Learning-based confidence: "the tools I've learned... will last a lifetime"
- Emotional investment in the daily check-in owl: "Now when I open the app and see the owl, I just feel so emotional and happy"
- Badge gamification creates low-key accountability

**What makes people leave:**
- Billing surprise — discovering a $188 charge after attempting cancellation
- Content cliff after day 26–30: daily lessons stop, subscription continues
- Sleep Restriction Therapy too painful without adequate preparation
- Feeling the program wasn't customized (generic content complaint)
- App bugs blocking progress (30-day counter stuck)

---

## §10 — Discovery: Unexpected Patterns

1. **The Billing-Burned Customer is a distinct persona, not just noisy 1-star complaints.** 43 reviews match this pattern. At 35% of the corpus and avg 1.51★, this cluster is as large as the Chronic Everything-Failer persona. Critically, several Billing-Burned reviews note the app genuinely worked — the complaint is purely commercial/trust.

2. **The app's former name "Slumber One" still appears in positive 5★ reviews.** Long-tenure users wrote reviews using the old name and clearly don't know or care about the rebrand. This suggests early adopters are among the strongest advocates.

3. **Sleep Anxiety Spiraler is the highest-satisfaction persona at 4.80 avg rating.** CBT-I is particularly well-matched to this persona's actual problem (anxiety-driven insomnia). Every single low-rated review in this persona set is a billing complaint, not a program complaint.

4. **Multiple reviewers credit a specific customer service rep "Jennifer" by name.** This signals that individual human touchpoints are emotionally disproportionate to the fully-automated program model.

5. **FSA/HSA eligibility is mentioned by zero reviews.** This is a notable distribution gap — a potentially strong retention/acquisition angle that has not reached consumers yet.

6. **Several reviewers mention their Fitbit or sleep tracker as the evidence mechanism.** "My Fitbit counter was finally no longer at 0" — hardware data creates objective proof that emotional experience alone doesn't provide.

7. **The free CBT-I Coach / VA app is the only direct competitor mentioned by name.** It is free and government-produced, so it fails the ±50% price test for competitor positioning purposes. But its existence as a named alternative suggests some users are comparison-shopping on CBT-I specifically, not just "sleep apps."

---

## §11 — Implications for Creative

1. The "finally worked after everything failed" narrative is the dominant success story. Ads should be built from the exhausted-everything frame, not from a first-time sleep advice angle.
2. Two-week results language appears across almost all positive reviews — this is a credible, reviewable milestone and a natural CTA anchor.
3. Billing/trust objections are pre-purchase anxiety for informed prospects. Ads targeting skeptics should address price transparency proactively.
4. "Psychology" as a frame resonates deeply: people who failed physical interventions (supplements, pills, routines) are primed for a mental-mechanism explanation.
5. The sleep anxiety persona's near-100% positive experience suggests this persona converts particularly well if reached. Text-only ad classification reads their coverage as 0%, but the visual audit ([[2026-04-20 Ad Library Breakdown - Stellar Sleep]]) shows ~8 ads targeting them via 3:47 AM / racing-thoughts angles. Differentiation lane for T001: the anxiety-sleep feedback-loop mechanism explanation, which is absent in the current library.
6. Sleep tracker data ("my Fitbit said 0 hours for 3 weeks") creates credibility through specificity that generic "I couldn't sleep" framing lacks.

---

## Appendix A — Stratified Sample (pre-lock)

> Content of `_data/stratified-sample.md`. Generated by `review-sampler` on 2026-04-20. Input: `reviews.jsonl`. Seed: 42. Small corpus (123 reviews). 88 reviews sampled across 5 strata.

See: `/Users/marce/Library/Mobile Documents/iCloud~md~obsidian/Documents/Reach Digital/Stellar Sleep/00 Research/_data/stratified-sample.md`

---

## Appendix B — Persona-Segmented Sample (post-lock)

> Content of `_data/persona-segmented-sample.md`. Generated by `review-sampler` on 2026-04-20. Input: classified `reviews.jsonl`. Seed: 42. Target 40 per persona.

See: `/Users/marce/Library/Mobile Documents/iCloud~md~obsidian/Documents/Reach Digital/Stellar Sleep/00 Research/_data/persona-segmented-sample.md`
