---
cssclasses:
  - table-wide
  - wide
---
# Stellar Sleep Top Spenders Analysis — T001

*Analysis date: April 20, 2026*
Motion report link: https://projects.motionapp.com/organization/6214fe5e1ccc60d23897d87b/69e0f4680ae4b7dd5d546536/top/69e0f46ac5808a9fa158454d
CSV report: ![[Top Creatives-4.csv]]

---

## Raw Notes

For this batch, analyze everything in the CSV. I will leave sparser raw notes than usual. Make sure to include all the ads in the csv.

### Ad 01
Very short and simple video ad, it only calls out the visceral pain point of feeling like you're losing your days and represents it visually in an extremely easy to empathize with manner. But no conversion attributed, so

### Ad 02
Hamster wheel metaphor, animated with AI and cute character styles. Script could do some reworking to go deeper into mechanism or methodology.

### Ad 03
Good way to visualize a metaphor of being trapped, like the hamster wheel. But needs more context. Doesn't really sell you on our solution.

---

## Coverage Notes

- **19 ads in CSV → 17 analyzed, 2 unmatched.** The Motion report table returned 17 creatives with thumbnails; two CSV ads (`vid_female_keeping you from being present`, `vid_female_bold claim_flying money`) had no matching row in the report and could not be downloaded. Spend for those two combined is $1.58 (0.02 + 1.56 = $1.58 of $97.14 total, ~1.6% of reporting spend) — synthesis below is based on the 17 creatives that were pulled.
- All 17 creatives downloaded from Motion (Azure CDN blob) and analyzed with Gemini. Videos received 4-column breakdowns (timestamp / visual / VO / on-screen captions); statics received layout + copy + visual-style breakdowns. Media deleted post-analysis per `/grab` cleanup rule — preview URLs below are the permanent references.

---

## Spend Summary

| # | Ad Name | Format | Spend | Hook Rate (CTR) | Cost / Click | Impressions | Persona Target | Notes |
|---|---|---|---|---|---|---|---|---|
| 01 | vid_both_taking away your day | Video (3D animation, split-screen) | $21.31 | 4.60% | $2.66 | 174 | Chronic Everything-Failer / generic pain-setup | Top spender. Single caption repeating the question hook; no mechanism or solution in-frame. Strategist note: visceral pain, no conversion. |
| 02 | vid_female_endless cycle | Video (3D animation, hamster-wheel metaphor) | $13.13 | 4.83% | $1.88 | 145 | Chronic Everything-Failer | Full funnel: pain → failed solutions (pills / gadgets / hacks) → CBT-I reveal. Strategist wants deeper mechanism/methodology. |
| 03 | still_male_meds maze | Static image (3D illustration) | $13.08 | 2.78% | $3.27 | 144 | Pill Escape Seeker | Hedge-maze metaphor with glowing pills; headline does the full work. Strategist says needs more context / doesn't sell solution. |
| 04 | vid_female_bold claim_flying hamster Wheel | Video (3D animation) | $11.22 | 4.94% | $2.81 | 81 | Chronic Everything-Failer | Hamster-wheel variant of Ad 02 with larger bottom-card captions and identical VO structure. |
| 05 | 02_cartoon_racing female | Static image (3D illustration) | $10.90 | 1.50% | $5.45 | 133 | Sleep Anxiety Spiraler | Racing-thoughts thought-bubble cloud above woman in bed; 3:17 AM clock + "ZZZ"/number overlays. Lowest CTR of the top-5 spenders. |
| 06 | img_male_failed-insomnia-cures_bed | Static image (3D illustration) | $8.93 | 2.34% | $2.98 | 128 | Chronic Everything-Failer | Cost listicle pattern: running tally of failed cures with dollar amounts. Neon-green headline. |
| 07 | vid_female_failed-insomnia-cures_bed | Video (3D animation, loop) | $6.41 | 2.94% | $2.14 | 102 | Chronic Everything-Failer | Video version of the cost-listicle pattern — text ticker is the hero, VO mirrors it. 29-sec looping animation. |
| 08 | vid_male_to do list | Video (3D animation) | $3.46 | **8.70%** | $1.73 | 23 | Sleep Anxiety Spiraler | Highest CTR of any ad with >20 impressions. Bubble-stack building visual matches VO escalation (EMAIL → MEETING → PROJECT → CHAOS → EXHAUSTED). |
| 09 | img_female_failed-insomnia-cures_bed | Static image (3D illustration) | $3.25 | 0% | — | 64 | Chronic Everything-Failer | Female counterpart to Ad 06. Same copy, same format. Zero link clicks at this spend. |
| 10 | 05_Pillow_v5 | Static image (photograph) | $2.75 | 2.70% | $2.75 | 37 | Skeptical Psychology Convert | Only photograph in the top spenders. Face-under-pillow, quote-style headline, CBT-I named in subhead. |
| 11 | vid_female_keeping you from being present | Video | $1.56 | 25% | $0.39 | 16 | (not analyzed — Motion report had no matching row) | Highest CTR in the CSV but only 16 impressions — directional, not reliable. |
| 12 | vid_female_meds maze | Video (3D animation) | $0.33 | 0% | — | 1 | Pill Escape Seeker | Animated version of Ad 03's maze metaphor — woman in pill-lit hedge maze with a bed thought-bubble. Pain-only setup, no solution. |
| 13 | img_female_exhausted_meal | Static image (3D illustration) | $0.23 | 0% | — | 4 | Sleep Anxiety Spiraler / Everything-Failer | Diner scene, woman yawning on table; single question headline. |
| 14 | vid_male_wiped out by morning | Video (3D animation) | $0.22 | 0% | — | 2 | Sleep Anxiety Spiraler | 3:47 AM middle-of-night-wake pattern. Fixed caption banner, dialogue-style VO. |
| 15 | 04_Pillow_v4 | Static image (photograph) | $0.20 | 0% | — | 1 | Skeptical Psychology Convert | v4 of the face-under-pillow photo ad — identical copy to v5, different crop/headboard. |
| 16 | vid_female_I wish I knew_ chasing hacks | Video (3D animation) | $0.02 | 0% | — | 1 | Chronic Everything-Failer | Chasing-floating-text metaphor for "sleep hacks"; full CBT-I reveal with "CBTI" t-shirt payoff. |
| 17 | vid_female_bold claim_flying money | Video | $0.02 | 0% | — | 1 | (not analyzed — Motion report had no matching row) | — |
| 18 | img_male_ditch-meds_split-screen | Static image (3D illustration, diptych) | $0.02 | 0% | — | 1 | Pill Escape Seeker | One-pill-tonight-vs-hundreds-in-a-year dependency framing. |
| 19 | vid_male_insomnia-cures_bed | Video (3D animation, loop) | $0.02 | 0% | — | 1 | Chronic Everything-Failer | Male variant of Ad 07's cost-listicle video. |

Total reporting spend: **$97.14** across 17 analyzed + 2 unmatched. No purchases attributed in the report window.

---

## Per-Ad Breakdowns

### Ad 01 — "Is your insomnia taking away your day?"

**Format:** Video (3D animation, split-screen) · **Duration:** ~31s · **Spend:** $21.31 · **Persona:** Chronic Everything-Failer (generic pain-setup) · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc642/video.mp4

**4-column breakdown**

| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|---|---|---|---|
| 00:00-00:02 | Split-screen animation. Top panel: woman in a sweater asleep on a couch, book on her stomach. Bottom panel: a man and two small children hold hands running happily through a sunny park. | (Instrumental music) | Is your insomnia taking away your day? |
| 00:02-00:04 | Top: woman wakes, yawns widely, distressed expression, sits up slightly. | (Instrumental music) | Is your insomnia taking away your day? |
| 00:04-00:05 | Top: woman grabs pillow, throws it over her head in frustration. | (Instrumental music) | Is your insomnia taking away your day? |
| 00:05-00:08 | Top: she flops back down, turning over, hugging a different pillow with a pained look. | (Instrumental music) | Is your insomnia taking away your day? |
| 00:08-00:18 | Top panel loops: woman settling → waking → yawning → pillow-throw → flopping back. Family running in bottom panel continues unchanged. | (Instrumental music) | Is your insomnia taking away your day? |
| 00:18-00:31 | Loop repeats two more times through end of video. | (Instrumental music) | Is your insomnia taking away your day? |

**Strategic read**
- Hook type: Rhetorical question, visceral. Question pairs with the side-by-side visual of what the insomniac is missing (family outing) vs. what they're stuck in (couch loop).
- Structure: Pure pain-setup. No mechanism, no product, no CTA.
- Key persuasion technique: Side-by-side consequence framing + emotional FOMO on lived time. No social proof, no authority.
- Visual treatment: 3D Pixar-style animation, split-screen composition, looping bottom panel = "life continuing without you."
- Caption style: Single persistent banner, one sentence, asked as a question.
- Why it's working (top of the pack): Zero friction to the hook — the image does the promise before the viewer reads a word. Empathy lead, high relatability. Broad targeting match = cheap impressions. But: highest spend with zero conversions and no mechanism in frame is consistent with top-funnel engagement only.
- Adaptable for Stellar Sleep: **With changes.** The empathy lead works; the gap is that nothing follows it. Best adapted by reusing the split-screen / what-you're-missing visual setup, then running a mechanism or proof payoff (Harvard CBT-I, 80% stat, 74-min) in the back half.

---

### Ad 02 — "Endless cycle" (hamster wheel)

**Format:** Video (3D animation, hamster-wheel metaphor) · **Duration:** ~25s · **Spend:** $13.13 · **Persona:** Chronic Everything-Failer · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc649/video.mp4

**4-column breakdown**

| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|---|---|---|---|
| 00:00-00:05 | Animated woman in purple pajamas walks wearily inside a giant hamster wheel. Rubs her eye, exhausted. | Ah. Insomnia feels like you're trapped in an endless cycle. | Insomnia feels like... 🔄 |
| 00:05-00:08 | Continues walking slowly, looking tired, rubs eye. Animated pills float in front of her. | I've tried pills, but they made me feel groggy the next day. | Pills are not the answer 💊 |
| 00:08-00:10 | Close-up of sad face, looks down, sighs. Pills still in frame. | (Sigh) | Pills are not the answer 💊 |
| 00:10-00:14 | Back to wide shot. Hand to forehead, stressed. Emojis: wallet-with-Zzz, dollar, sleep mask. | I've bought every sleep gadget out there, and all of them were a waste of money. | Gadgets don't work 💤 💵 |
| 00:14-00:19 | Rubs eye, looks around thoughtfully. Laptop-with-error emoji. | All the sleep hacks I found online were useless and inaccurate. | Sleep hacks are useless 💻 |
| 00:19-00:25 | Expression shifts from tired to alert/hopeful. Sleeping-face emoji. | But then a friend recommended CBT-I and it finally stopped the insomnia cycle. | CBT-I is the solution 😴 |

**Strategic read**
- Hook type: Metaphor (hamster wheel = endless cycle) + spoken-as-confession ("Insomnia feels like…").
- Structure: Journey — cycle → failed pills → failed gadgets → failed hacks → CBT-I reveal. Classic "tried everything, this finally worked" arc.
- Key persuasion technique: Fail-stack dismissal (pills/gadgets/hacks all rejected before CBT-I named) + friend recommendation as social proof. No stats, no Harvard callout, no app UI.
- Visual treatment: Single persistent hamster-wheel set; emoji overlays do the scene-change work instead of cutting to new scenes.
- Caption style: Two-tier banner — top pill says the category takeaway ("Pills are not the answer"), bottom card echoes VO verbatim.
- Why it's working: Names the exact objection stack (pills, gadgets, hacks) the persona has already tried. Metaphor holds the attention through the failed-solution middle. Friend-recommendation reveal is the lowest-friction authority form.
- Adaptable for Stellar Sleep: **Yes.** This is a proven template — the improvement the strategist flagged is to replace "a friend recommended CBT-I" with the explicit mechanism (Harvard, 80% success, 74-min earlier sleep) since those proof points are absent from the in-market library.

---

### Ad 03 — "Insomnia meds feel like you're trapped" (static maze)

**Format:** Static image (3D illustration) · **Spend:** $13.08 · **Persona:** Pill Escape Seeker · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc63c/image.jpg

**Breakdown**
- **Layout:** Central 3D illustration of a tired man in pajamas standing in a hedge maze at night. Maze filled with glowing pills. Man in lower-center, thought-bubble of a bed upper-right.
- **Headline:** "Insomnia meds just feel like you're trapped?"
- **Body / CTA:** None.
- **Visual style:** Dark blue/green palette, cartoon 3D illustration, nighttime tone. Key metaphor: maze of pills = confusing journey to real rest.
- **Key message:** Insomnia meds aren't a real solution; they leave you lost.

**Strategic read**
- Hook type: Rhetorical question targeting medication frustration.
- Structure: Hook-only — no mechanism, no product, no CTA in frame. Relies entirely on the DCO primary text / carousel tail.
- Key persuasion technique: Metaphor does the pain-agitate work; no proof layer.
- Why it's partially working: Strong metaphor image, a lean target (pill-frustrated users). Strategist-flagged gap: nothing sells the alternative.
- Adaptable for Stellar Sleep: **With changes.** Keep the metaphor frame; add a resolution panel (second image or pair it with a video close) that names the non-pill path (CBT-I / behavioral reconditioning).

---

### Ad 04 — "Bold claim, flying hamster wheel"

**Format:** Video (3D animation) · **Duration:** ~25s · **Spend:** $11.22 · **Persona:** Chronic Everything-Failer · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc56a/video.mp4

**4-column breakdown**

| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|---|---|---|---|
| 00:00-00:04 | Animated woman in purple pajamas walks slowly on a giant wooden hamster wheel, rubs eye. Spinning blue cycle emoji in front. | (Sigh) Insomnia feels like you're trapped in an endless cycle. (Sigh) | **Top:** Insomnia feels like... <br> **Bottom:** Insomnia feels like you're trapped in an endless cycle. |
| 00:04-00:08 | Continues walking. Pill emojis appear. Looks down with sad expression. | I've tried pills, but they made me feel groggy the next day. | **Top:** Pills are not the answer <br> **Bottom:** I've tried pills, but they made me feel groggy the next day. |
| 00:08-00:10 | Close-up on face, looks down at pills with sad expression, sighs. | (Sigh) | **Top:** Pills are not the answer <br> **Bottom:** I've tried pills, but they made me feel groggy the next day. |
| 00:10-00:14 | Wider shot. Holds head, distressed. Emojis: folder-with-dollar, sleep mask, sleeping cloud. | I've bought every sleep gadget out there and all of them were waste of money. | **Top:** Gadgets don't work <br> **Bottom:** I've bought every sleep gadget out there and all of them were waste of money. |
| 00:14-00:20 | Continues walking, rubs temple, frustrated. Laptop-with-error + warning symbol emoji. | All the sleep hacks I found online were useless and inaccurate. (Sigh) | **Top:** Sleep hacks are useless <br> **Bottom:** All the sleep hacks I found online were useless and inaccurate. |
| 00:20-00:25 | Walking slowly, defeated. Sleeping-face emoji. Stops walking, looks up with hopeful expression. | But then a friend recommended CBT-I and it finally stopped the insomnia cycle. | **Top:** CBT-I is the solution <br> **Bottom:** But then a friend recommended CBT-I and it finally stopped the insomnia cycle. |

**Strategic read**
- Hook / structure: Identical to Ad 02 — same VO, same journey, same emoji overlay logic. Distinguishing feature: full bottom-card caption echo (subtitles-style VO mirror).
- Why two versions are both spending: The ~$24 combined spend across Ads 02 + 04 suggests Meta is rotating minor variant tests (caption density) rather than a strategic difference. Both hit ~4.8% CTR — performance is near-identical.
- Adaptable for Stellar Sleep: See Ad 02 — same template lesson.

---

### Ad 05 — "Racing thoughts at night" (cartoon racing female)

**Format:** Static image (3D illustration) · **Spend:** $10.90 · **Persona:** Sleep Anxiety Spiraler · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc618/image.jpg

**Breakdown**
- **Layout:** Vertical. 3D-animated woman lying awake in bed in bottom half. Top half: dark blue background with a cloud of glowing thought-bubbles floating above her head. White text container at the bottom.
- **Headline (body text):** "Insomnia giving you racing thoughts at night?"
- **Other on-image text:** `3:17 AM`, `Z Z Z`, `3`
- **Visual style:** Polished 3D animation, Pixar-adjacent. Dark blue/purple nighttime palette with neon-glowing icons inside thought bubbles. Empathetic tone. Key concept: "racing thoughts" rendered as literal floating worry-cloud.
- **Key message:** Targets insomniacs with overactive minds late at night.

**Strategic read**
- Hook type: Pain question naming the specific mechanism (racing thoughts, not "can't sleep").
- Structure: Pain-identification static. No mechanism, no product, no CTA.
- Key persuasion technique: Specificity — "racing thoughts" is narrower than "insomnia" and harder to dismiss. 3:17 AM timestamp anchors to the exact lived moment.
- Why it's working: Top-5 spender despite lowest CTR in the top 5 (1.50%) — suggests Meta is over-serving it to cold audiences while actual click-intent is softer. Image carries the diagnosis without needing a solution.
- Adaptable for Stellar Sleep: **Yes.** The racing-thoughts / to-do-list angle is already saturated in-market (per Persona Summary §3 visual audit). Differentiation: pair this visual with the anxiety-sleep feedback-loop mechanism explanation (absent from the current library).

---

### Ad 06 — "What I've spent on failed insomnia cures" (male, static)

**Format:** Static image (3D illustration) · **Spend:** $8.93 · **Persona:** Chronic Everything-Failer · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc56c/image.jpg

**Breakdown**
- **Layout:** Vertical. Man lying awake in bed, center-right. Top half has headline. Nightstand + digital clock on the left.
- **Headline:** "What I've spent on failed insomnia 'cures'" (bright neon-green text)
- **Body text:** "Sleeping pills $200... white noise machine $250... 'Sleepy' tea $50... 'Miracle Sleep' pillow $100... hypnosis class 300... relaxation app $100..."
- **Other on-image text:** 3:47 AM clock
- **Visual style:** 3D illustration, dark blue/grey nighttime palette, neon-green headline. Tone is relatable, melancholic. Concept: running mental tally of money wasted.
- **Key message:** You've wasted a lot of money on insomnia "cures" that don't work.

**Strategic read**
- Hook type: Cost listicle — sunk-cost/identification.
- Structure: Pain listicle that also serves as qualifier (only someone who has tried 3+ of those solutions will nod).
- Key persuasion technique: Receipts — dollar specificity makes the list feel real rather than rhetorical. No product or proof in frame.
- Why it's working: Cost listicle is one of Stellar Sleep's strongest in-market creative pillars (per Persona Summary §3 visual audit). Qualifies the intended persona while simultaneously telegraphing "and you're about to learn what actually works."
- Adaptable for Stellar Sleep: **Yes.** Strong hook candidate. The upgrade is the payoff — instead of just tallying sunk cost, close the loop with a Harvard-study-backed alternative and the one-price promise ("$X/mo vs. $1000+ wasted").

---

### Ad 07 — "What I've spent" (female, video loop)

**Format:** Video (3D animation, loop) · **Duration:** ~29s · **Spend:** $6.41 · **Persona:** Chronic Everything-Failer · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f483e23fb80927ec1a3b/video.mp4

**4-column breakdown**

| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|---|---|---|---|
| 00:00-00:01 | Animated woman lies in bed under covers, eyes closed. Digital clock on nightstand reads 3:47 AM. | I'm so tired. | **Top:** What I've spent on failed insomnia "cures" <br> **Ticker:** Sleeping pills $200... white noise machine $250... "Sleepy" tea $50... "Miracle Sleep" pillow $100... hypnosis class $300... relaxation app $100... |
| 00:01-00:03 | Opens eyes, distressed. Right hand to forehead. | Why can't I sleep? | Same persistent overlay |
| 00:03-00:05 | Looks up toward ceiling, worried; closes eyes again. | I've tried everything. | Same persistent overlay |
| 00:05-00:06 | Reopens eyes, tired and stressed. | I've spent so much and nothing has worked. | Same persistent overlay |
| 00:06-00:08 | Opens mouth in a wide yawn. Clock briefly flips to 3:48 then back to 3:47. | (Yawn) | Same persistent overlay |
| 00:08-00:29 | VO and animation loop continuously to end of video. | (Looped VO) | Same persistent overlay |

**Strategic read**
- Hook type: Cost listicle + dialogue-style sleepless internal monologue.
- Structure: Pain loop — the looping animation + looping VO IS the structure. Designed to feel like "you're trapped" at the format level.
- Key persuasion technique: Two stacked identifiers (cost list + sleepless VO). Time loop that never resolves mirrors the sleepless night.
- Why it's working: Same cost-listicle persona hit as Ad 06, now with auditory pain reinforcement. Static and video versions both in the top 10 — the visual concept carries across formats.
- Adaptable for Stellar Sleep: **Yes.** Matches a proven in-market pillar. Gap: no resolution. Upgrade by capping the loop at ~12s and running a 15–20s CBT-I mechanism payoff after.

---

### Ad 08 — "To-do list keeping you up all night"

**Format:** Video (3D animation) · **Duration:** ~30s · **Spend:** $3.46 · **Persona:** Sleep Anxiety Spiraler · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc627/video.mp4

**4-column breakdown**

| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|---|---|---|---|
| 00:00-00:02 | Animated man lies awake in bed at night, worried. Clock reads 3:47 AM. Thought bubble appears as he gasps and yawns. | Tomorrow I have to send that email to Jim. | Is your to-do list keeping you up all night? <br> EMAIL |
| 00:02-00:04 | Continues to look worried. Second thought bubble appears next to the first. | Then remember to change the date for the meeting. | Is your to-do list keeping you up all night? <br> EMAIL <br> MEETING |
| 00:04-00:07 | Third thought bubble appears below the first two. Looks up, gasps, yawns. | Then finish the project so I can hand it off to finance. | ...EMAIL / MEETING / PROJECT |
| 00:07-00:09 | Fourth bubble. Looks to the side, stressed. | Then schedule the vet appointment. | ...+ VET APPT |
| 00:09-00:11 | Fifth bubble. Looks tired, eyes widen. | Then pick up the kids. | ...+ KIDS |
| 00:11-00:14 | Sixth bubble. Gasps and yawns again. | I just know I'm forgetting something important. | ...+ FORGET |
| 00:14-00:16 | Seventh bubble. Looks to the side, tries to resettle. | If I forget then the week is going to be rushed and chaotic, | ...+ CHAOS |
| 00:16-00:20 | Two more bubbles appear back-to-back. Gasps, yawns, very tired. | and I won't sleep well every night and then I'll feel so exhausted all day. | ...+ NO SLEEP + EXHAUSTED |
| 00:20-00:30 | All 9 bubbles remain on screen. Animation loops — worried look → gasp → yawn → stressed → resettle. | (Piano music) | Full 9-item stacked list persists |

**Strategic read**
- Hook type: Pain question + mounting-stack visual metaphor. Each VO item triggers a new bubble.
- Structure: Pure pain-escalation. No product, no mechanism. Ends on full-screen clutter = "this is your night."
- Key persuasion technique: Escalation pacing. Each to-do lands faster than the last; the visual gets more crowded while the character gets more tired. Triggers recognition in anyone who's ever had a racing to-do-list night.
- Why it's working (highest CTR in the CSV — 8.7%): VO reads as true inner monologue, not ad copy. The first 5 seconds are specific enough ("email to Jim," "vet appointment") to feel like someone's real thoughts, not a generic ad. Low spend but exceptional click intent — worth scaling.
- Adaptable for Stellar Sleep: **Yes, priority.** This is the strongest script template in the batch. Two recommended extensions: (1) build a female variant with different domestic/work to-do items to test gender lift; (2) add a 10-second mechanism tail (CBT-I reframes the to-do-list loop via cognitive reconditioning). Current ad stops at the pain peak.

---

### Ad 09 — "What I've spent" (female, static)

**Format:** Static image (3D illustration) · **Spend:** $3.25 · **Persona:** Chronic Everything-Failer · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc5d9/image.jpg

**Breakdown**
- **Layout:** Vertical. Top quarter has the headline. Middle: animated woman in bed looking up at a ticker text box. Bottom: lower bed/blanket. Digital clock on the left.
- **Headline:** "What I've spent on failed insomnia 'cures'"
- **Body:** "Sleeping pills $200... white noise machine $250... 'Sleepy' tea $50... 'Miracle Sleep' pillow $100... hypnosis class $300... relaxation app $100..."
- **Other on-image text:** 3:47 AM
- **Visual style:** Dark blues/greys with glowing lime-green headline. 3D Pixar-adjacent. Melancholic tone.

**Strategic read**
- Hook / structure / persuasion technique: Same as Ad 06 — gendered A/B on the cost-listicle static. Zero link clicks at $3.25 / 64 impressions suggests the female variant is underperforming the male variant at this spend level.
- Why the male outperformed: Unclear from CSV; possibilities = Meta auction variance, different target audience clusters, or male face drawing more attention in the mixed-gender placements.
- Adaptable for Stellar Sleep: **With changes.** Cost listicle concept is worth keeping; consider testing the female character in a video variant (Ad 07 outperforms Ad 09 at static parity) rather than another static.

---

### Ad 10 — "My mind and body are exhausted" (Pillow v5)

**Format:** Static image (photograph) · **Spend:** $2.75 · **Persona:** Skeptical Psychology Convert (CBT-I named) · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc610/image.jpg

**Breakdown**
- **Layout:** Text in top half against plain light background. Main visual: person lying in bed, face obscured by pillow, bottom half. Simple and clean.
- **Headline (quote):** "My mind and body are exhausted… but I still can't fall asleep"
- **Body:** "If that's you, CBT-I might be the answer"
- **Visual style:** Warm/natural palette, whites/beiges, wood headboard, orange shirt. Photograph with soft natural light. Empathetic, relatable tone.
- **Key message:** CBT-I is the solution for the physically-exhausted-but-can't-sleep archetype.

**Strategic read**
- Hook type: Testimonial-style quoted pain statement.
- Structure: Pain quote → mechanism name-drop ("CBT-I"). Closest any top spender gets to a Skeptical-Psychology-Convert creative.
- Key persuasion technique: Specificity of the pain formulation ("exhausted but can't sleep" disqualifies the "just need to relax" advice the persona has heard a thousand times). CBT-I reveal is matter-of-fact, not hyped.
- Why it's working: Only photograph in the top spenders — visual break from the otherwise 3D-animated account. The format contrast itself is part of the click-intent lift on a cold Meta audience.
- Adaptable for Stellar Sleep: **Yes, priority.** This is the closest template in the batch to a Skeptical Psychology Convert lead. The persona is 40.7% of reviews but has near-zero creative lead coverage in the current library. Worth building a full cluster around this pillow/quote format with: explicit Harvard callout, app-UI shot, 80%/74-min stat pill, and an expert-authority card — none of which are in the current library.

---

### Ad 11 — "Keeping you from being present" (NOT ANALYZED)

**Format:** Video · **Spend:** $1.56 · **CTR:** 25% (16 impressions — directional only) · **Persona:** Unknown

Motion report had no matching row for this creative name. Not in the downloaded set; not analyzed. Note the 25% CTR is from 4 clicks on 16 impressions — too small to weight.

---

### Ad 12 — "Meds maze" (video version)

**Format:** Video (3D animation) · **Duration:** ~23s · **Spend:** $0.33 · **Persona:** Pill Escape Seeker · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc622/video.mp4

**4-column breakdown**

| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|---|---|---|---|
| 00:00-00:02 | Animated young blonde girl in pink striped pajamas standing in a hedge maze at night. Thought bubble of a bed. Maze lit by glowing blue/white pills. Rubs tired eyes. | (Somber music) | — |
| 00:02-00:05 | Camera slowly zooms in. Girl stops rubbing eyes, looks around wearily, opens mouth for a big yawn. | (Yawn) | — |
| 00:05-00:07 | Closer shot of face and torso. Hand to forehead, exhausted/distressed. | (Somber music) | — |
| 00:07-00:15 | Cut to dark blue background. Yellow glowing text appears in center. | (Somber music) | Insomnia meds feel like you're just trapped? |
| 00:15-00:23 | Text fades. Static high-angle shot of girl in maze, holding side of her face, tired/sad. | (Somber music fades) | — |

**Strategic read**
- Hook type: Visual-only hook (no VO hook), then late-appearing text headline at 7s.
- Structure: Pain-setup only. Never names a solution.
- Key persuasion technique: Atmosphere — somber music + slow zoom + stillness. Builds mood rather than argument.
- Why it's underperforming (barely $0.33 spend, 1 impression): Late hook reveal (7s for the text) is too slow for paid social; viewer has no reason to stay past second 3. Minimal auction signal for Meta to scale.
- Adaptable for Stellar Sleep: **With changes.** The pill-maze visual is strong but needs front-loaded captions and a VO hook in the first 2 seconds. Works better as a 6–8s opening hook clip inside a longer structured video than as a standalone ad.

---

### Ad 13 — "Exhausted from no sleep last night" (female diner)

**Format:** Static image (3D illustration) · **Spend:** $0.23 · **Persona:** Sleep Anxiety Spiraler / Everything-Failer · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f483e23fb80927ec1a1c/image.jpg

**Breakdown**
- **Layout:** Vertical. Text overlay box at the top. Main visual: woman in foreground (left) yawning with head on a diner table. Second woman to her right looks on with concern. Diner interior background.
- **Headline:** "Exhausted from no sleep last night?"
- **Body / CTA:** None.
- **Visual style:** 3D CGI illustration, modern animated-film style. Warm palette — browns, beiges, soft lighting. Relatable, cozy atmosphere.

**Strategic read**
- Hook type: Pain-identification question, daylight-consequence framing (not the standard nighttime shot).
- Structure: Hook-only static.
- Key persuasion technique: Witness-framing — the concerned friend amplifies "other people can see this" social shame.
- Why it's underperforming: Minimal spend (~$0.23) = no real auction signal. Concept is solid but the headline is too generic to differentiate from the rest of the insomnia ad field.
- Adaptable for Stellar Sleep: **With changes.** The daylight-consequence scene (cafe, meeting, school pickup) is a visual white space vs. the dominant 3am-bed-scene pattern. Worth testing a sharper hook like "If your friend says you look tired at brunch again…".

---

### Ad 14 — "Wiped out by morning" (male, 3:47 AM)

**Format:** Video (3D animation) · **Duration:** ~22s · **Spend:** $0.22 · **Persona:** Sleep Anxiety Spiraler · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc62f/video.mp4

**4-column breakdown**

| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|---|---|---|---|
| 00:00-00:03 | Animated man in pajamas lies awake in bed at night, stares at ceiling. Clock on nightstand reads 3:47 AM. Opens mouth in a wide yawn. | (Soft piano) | Can't fall back asleep and wiped out even before the day begins? |
| 00:03-00:06 | Tosses in bed with frustrated expression, sits up, gestures with hands open in confusion. | I'm so tired. Why can't I sleep? | Same persistent banner |
| 00:06-00:10 | Semi-transparent overlay of him tossing and turning appears over him sitting up. Lies back down, wide awake. | I fall asleep but then wake up at 3:00 AM, wide awake until morning. | Same banner |
| 00:10-00:14 | Tosses side to side, clutches head. Semi-transparent overlay shows him sleeping peacefully. | (Piano) | Same banner |
| 00:14-00:18 | Now sleeping on his back, mouth open. Clock cycles through 5 o'clock hour. Wakes up with a start, rubs his nose. | (Piano) | Same banner |
| 00:18-00:22 | Clock reads 8:00 AM. Lies in bed, completely exhausted and defeated expression. | The day is starting, but I feel wiped out. | Same banner |

**Strategic read**
- Hook type: Multi-part pain question on persistent banner; VO is first-person monologue.
- Structure: Night-to-morning compression — 3:47 → 5:00 → 8:00. Ends on defeat.
- Key persuasion technique: Time-compression montage. The clock is the scene-structure; the VO is sparse enough to let the visual do the time-passage work.
- Why it's underperforming: Ad barely served (2 impressions). No clear read on potential.
- Adaptable for Stellar Sleep: **Yes.** Middle-of-night wake is the specific sub-pattern of Sleep Anxiety Spiraler that's already strong (per visual audit). The clock-advancement mechanic is a useful compression device for longer-form scripts — can be reused as a setup for a CBT-I mechanism reveal ("What if 3:47 AM became 7:30 AM in 4 weeks?").

---

### Ad 15 — "My mind and body are exhausted" (Pillow v4)

**Format:** Static image (photograph) · **Spend:** $0.20 · **Persona:** Skeptical Psychology Convert · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc61d/image.jpg

**Breakdown**
- **Layout:** Horizontally divided. Top third: text against a dark textured headboard. Bottom two-thirds: photograph of a person in bed under white sheets, covering head with pillow.
- **Headline (quote):** "My mind and body are exhausted… but I still can't fall asleep"
- **Body:** "If that's you, CBT-I might be the answer"
- **Visual style:** Neutral palette, dark grey headboard, crisp white bedding. Photograph — realistic and relatable. Empathetic tone.

**Strategic read**
- Hook / structure / persuasion technique: Identical copy to Ad 10 (v5) — different photograph (different headboard, different crop). v4 barely served ($0.20 spend). v5 won the auction rotation.
- Adaptable for Stellar Sleep: See Ad 10 — same template lesson. Iterate on the composition for v6+ (different demographics, different bed contexts) rather than treating as distinct concepts.

---

### Ad 16 — "I wish I knew sleep hacks don't work"

**Format:** Video (3D animation) · **Duration:** ~36s · **Spend:** $0.02 · **Persona:** Chronic Everything-Failer · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc5b7/video.mp4

**4-column breakdown**

| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|---|---|---|---|
| 00:00-00:03 | Animated woman with brown wavy hair runs across a sunny green lawn, chasing large floating 3D text "SLEEP HACKS". | I wish I knew that sleep hacks don't work on my insomnia. | I wish I knew that sleep hacks don't work on my insomnia. |
| 00:03-00:06 | Continues running, reaching for bouncing/eluding text. Expression becomes desperate. | (Same VO repeats) | (Same caption) |
| 00:06-00:08 | Stumbles, nearly falls, still trying to catch the "SLEEP HACKS" text. Looks up with sad expression. | In fact, they made it worse. | In fact, they made it worse. |
| 00:08-00:10 | Lunges for text, misses, comes to a stop with a frustrated sad look. | I tried so many | In fact, they made it worse. I tried so many |
| 00:10-00:14 | Close-up on face. Looks up with worried wide-eyed expression as letters from "HACKS" start to fall onto her head. | random things based on inaccurate online info. | random things based on inaccurate online info. |
| 00:14-00:18 | Letters "H A C K S" jumbled on her head. Stressed, overwhelmed. Letters start to dissolve. | The stress from nothing working led to even worse insomnia. | The stress from nothing working led to even worse insomnia. |
| 00:18-00:21 | Shakes head; letters disintegrate into dust, blow away. Exhales tiredly. | (Continued VO) | (Continued) |
| 00:21-00:23 | Expression softens, looks up hopefully, slight smile forms. | Then one of my friends tried CBT-I | Then one of my friends tried CBT-I |
| 00:23-00:28 | Smiles broadly, relieved and happy, looking off-screen. | and it completely changed her sleep. | and it completely changed her sleep. |
| 00:28-00:32 | Faces camera, smile. Holds out hands — letters "CBTI" appear on her shirt. | No hacks, no pills, just proven science to learn how to sleep well again. | No hacks, no pills, just proven science to learn how to sleep well again. |
| 00:32-00:36 | Close-up smiling confidently at camera in "CBTI" t-shirt. | (Same closing line repeats) | (Same caption) |

**Strategic read**
- Hook type: "I wish I knew…" retrospective confession + visual metaphor (chasing floating text).
- Structure: Full funnel — retrospective mistake → consequence (stress worsened insomnia) → friend recommendation → mechanism name ("CBT-I" + "proven science") → identity payoff (wearing CBTI shirt).
- Key persuasion technique: Three stacked persuasion moves — retrospective framing, friend recommendation, identity transformation (CBTI shirt = conversion).
- Why it barely spent: $0.02 / 1 impression — no meaningful delivery. Concept looks strong; likely lost auction to the more established cost-listicle and hamster-wheel variants.
- Adaptable for Stellar Sleep: **Yes.** Retrospective "I wish I knew" framing is a distinct variation on the "tried everything" template — worth re-testing with stronger targeting, or repackaging as a UGC-style testimonial. The CBTI shirt reveal is a clean but underused identity-payoff pattern — relevant for any script closing on "you become someone who sleeps."

---

### Ad 17 — "Bold claim, flying money" (NOT ANALYZED)

**Format:** Video · **Spend:** $0.02 · **Persona:** Unknown

Motion report had no matching row. Not in the downloaded set; not analyzed.

---

### Ad 18 — "Ditch meds, split-screen"

**Format:** Static image (3D illustration, vertical diptych) · **Spend:** $0.02 · **Persona:** Pill Escape Seeker · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc658/image.jpg

**Breakdown**
- **Layout:** Vertical diptych. Top image: woman in pajamas sadly looking at a single blue pill in her hand. Bottom image: same woman with shocked expression, hands overflowing with hundreds of the same blue pills.
- **Headline / CTA:** None (embedded as body).
- **Body:** "One sleeping pill tonight... how many pills in a year?"
- **Visual style:** 3D animation, modern-animated-film adjacent. Warm muted palette, soft ambient bedroom lighting. Somber and alarming tone. Concept: dramatic escalation from seemingly harmless action to overwhelming problem.

**Strategic read**
- Hook type: Reframe question that forces the viewer to do the math themselves.
- Structure: Before/after diptych. Zero solution named.
- Key persuasion technique: Dependency escalation — the single pill feels small, the 365-pill pile feels alarming. Forces the viewer to feel the scale.
- Why it barely spent: $0.02 / 1 impression.
- Adaptable for Stellar Sleep: **With changes.** Diptych math-visual is strong — could be reused for CBT-I with a positive inversion ("10 minutes a day × 4 weeks = X nights of sleep"). As a pill-escape ad it's effective at escalation but offers no off-ramp — best paired with a second ad that presents CBT-I as the non-pill path.

---

### Ad 19 — "What I've spent" (male, video loop)

**Format:** Video (3D animation, loop) · **Duration:** ~30s · **Spend:** $0.02 · **Persona:** Chronic Everything-Failer · **Preview:** https://motionaccountassets.blob.core.windows.net/69e0f469c5808a9fa158453d/creativeassetfacebook/69e0f474e23fb80927ebc65b/video.mp4

**4-column breakdown**

| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|---|---|---|---|
| 00:00-00:02 | Animated man in pajamas sits up in bed, exhausted. Looks up, yawns widely. | I'm so tired. Why can't I sleep? | **Top:** What I've spent on failed insomnia "cures" <br> **Ticker:** Sleeping pills $200... white noise machine $250... "Sleepy" tea $50... "Miracle Sleep" pillow $100... hypnosis class 300... relaxation app $100... |
| 00:02-00:04 | Covers yawn with hand, looks around frustrated. Transparent head-turning overlay (tossing and turning effect). | I've tried everything. I've spent so much and nothing has worked. | Same persistent overlay |
| 00:04-00:13 | Loop continues — settles, looks up, yawns, covers mouth, head-turning glitch, restarts. | (VO looped) | Same overlay |
| 00:13-00:30 | Loop repeats continuously — yawning, tossing, defeated expression. Ends on exhausted/defeated look. | (VO looped) | Same overlay |

**Strategic read**
- Hook / structure / persuasion technique: Male counterpart to Ad 07's female cost-listicle loop. Identical copy, identical persistent overlay.
- Why it barely served: $0.02 / 1 impression — lost auction to Ad 07 (female variant) which has ~320× the spend.
- Adaptable for Stellar Sleep: See Ad 07. A/B on gender did not produce meaningful data in this batch — female variant won the auction decisively.

---

## Patterns

### Hook patterns
- **Rhetorical pain question** dominates (7 of 17 analyzed ads): "Is your insomnia taking away your day?", "Insomnia meds just feel like you're trapped?", "Is your to-do list keeping you up all night?", "Exhausted from no sleep last night?", "Insomnia giving you racing thoughts at night?", "Can't fall back asleep and wiped out even before the day begins?", "How many pills in a year?" All follow a single-sentence, one-question-one-pain format with no competing copy.
- **Cost/receipts hook** (3 ads — 06, 07, 09, 19): "What I've spent on failed insomnia 'cures'" + a dollar-itemized list. The exact same ticker copy ("Sleeping pills $200... white noise machine $250...") appears across all 4 variants. Strongest pillar in the batch by spend concentration ($18.61 across the 4 variants = ~19% of reporting spend).
- **Retrospective confession hook** (1 ad — 16): "I wish I knew that sleep hacks don't work on my insomnia." Strong template; under-spent.
- **Testimonial-quote hook** (2 ads — 10, 15): Pillow ads quoting the exact pain formulation. Only top-spender creative naming CBT-I in the hook.
- **Visceral-empathy hook** (1 ad — 01): Top spender by dollars. No question, just image-as-hook (split-screen life-continuing-without-you). Works because the image IS the argument before the copy is read.

### Structural patterns
- **Pain-only structures dominate** (12 of 17 ads): Setup-only, no mechanism, no product, no CTA in frame. Relies on DCO primary text to do the solution work. This matches the Persona Summary §3 gap — the creative library is heavily pain-forward and mechanism-light.
- **Full-funnel structures are rare but effective** (3 of 17 ads — 02, 04, 16): All three follow the "tried pills / tried gadgets / tried hacks → then CBT-I" arc. All use "friend recommended CBT-I" as the authority move; none reference Harvard, the 80% stat, or the 74-min earlier-sleep stat.
- **Loop-as-structure** (Ads 01, 07, 19, and implicitly Ads 04, 08, 14): Animation loops that repeat the sleepless moment without resolution. The loop itself is the message — "this is your night, every night." Only works when the first cycle is visually compelling enough to warrant the re-watch.

### Caption style patterns
- **Persistent banner** (top spenders): Ad 01, 07, 08, 13, 14, 19 all use a single caption that never changes across the entire video. Caption does the hook work; VO does the inner-monologue work.
- **Two-tier card stack** (Ads 02, 04): Top pill = category takeaway ("Pills are not the answer"). Bottom card = VO mirror. Higher caption information density; cleanest structure for a journey arc.
- **Dialogue-mirror captions** (Ads 07, 19): Captions echo VO verbatim. Works for cost-listicle loops because the ticker IS the hero asset.
- **No captions** (Ad 12, parts of 14): Relies on atmosphere — consistently underperforms on CTR in this batch.

### Persuasion technique patterns
- **Fail-stack dismissal** (pills / gadgets / hacks all rejected before CBT-I named): Only in the journey-structure ads (02, 04, 16). Sets up CBT-I as "the one thing nobody told you about."
- **Friend recommendation** as authority: Used in all 3 journey-structure ads. No doctor, no Harvard, no stat, no testimonial beyond friend.
- **Cost specificity as qualifier**: The dollar ticker ($200, $250, $50, $100, $300, $100 → $1,000 total) performs as both a pain list and a self-qualifier — only someone who recognizes 3+ items will nod.
- **Metaphor-as-hook**: Hamster wheel (Ads 02, 04), pill maze (Ads 03, 12), chasing floating text (Ad 16), pill-pile (Ad 18), racing-thoughts cloud (Ad 05), to-do-list bubble stack (Ad 08). Metaphor does the diagnosis without needing copy to do the work.
- **Time-compression**: Ads 14, 07, 19 use clock-advancement or looping 3:47 AM → 8:00 AM as the emotional scaffolding. Effective at rendering "one endless night" visually.

### Persona angle patterns
- **Chronic Everything-Failer:** 7 of 17 ads (01, 02, 04, 06, 07, 09, 16, 19) — ~47% of analyzed spend. Dominant creative pillar.
- **Sleep Anxiety Spiraler:** 4 of 17 ads (05, 08, 13, 14) — ~$15.51 spend. Racing-thoughts and 3:47 AM wake angles.
- **Pill Escape Seeker:** 3 of 17 ads (03, 12, 18) — ~$13.43 spend. Maze + pill-pile metaphors. All pain-only — no ad in the top-spender set pairs pill-escape with a CBT-I payoff.
- **Skeptical Psychology Convert:** 2 of 17 ads (10, 15) — only ~$2.95 spend. The one persona that already has CBT-I named in its creative, but the lowest spend share. Major white space.
- **Overwhelmed New Parent:** 0 of 17 ads. Absent from the top spenders entirely.

### Format patterns
- **3D Pixar-style animation is the house style** (15 of 17 ads). Only the Pillow v4/v5 pair are photographs.
- **Video-to-static mix**: 9 videos / 8 statics. Videos dominate the top of the spend ladder (4 of the top 5 spenders are video).
- **DCO carousel container** for all 17 — format-field reads "video" or "image" but the live Meta delivery is always inside a DCO carousel template (per Persona Summary §2).
- **No live-action, no UGC, no doctor/expert faces, no app-UI, no study-screenshot/journal B-roll, no stat pill on-screen, no testimonial name + photo, no rating overlay.** Every single one of Stellar Sleep's proof-layer white spaces (per Persona Summary §3 visual audit) is confirmed absent from the top-spender cohort.

---

## Implications for T001 Batch Plan

1. **Every journey script must replace "friend recommended CBT-I" with explicit mechanism proof.** Harvard, 80% success rate, 74-min earlier sleep, and 53-min reduced wake time are entirely absent from the top spenders and the in-market library. This is the single biggest identified lift opportunity.
2. **Build a Skeptical Psychology Convert cluster as the T001 priority persona.** 40.7% of reviews, near-zero creative lead coverage. Model off Ad 10 (Pillow v5) but add: explicit Harvard callout, app-UI shot, 80%/74-min stat pill, and expert-authority framing. None of these exist in the current library.
3. **Scale the to-do-list angle (Ad 08).** Highest CTR in the CSV (8.7%), lowest spend ($3.46). Priority replications: (a) female variant with domestic/work to-do items, (b) extended version with a 10-second CBT-I mechanism tail (current ad stops at pain peak).
4. **Pair every pill-escape ad with a CBT-I resolution.** All 3 pill-escape ads in the top spenders (Ads 03, 12, 18) are pain-only. Even one resolution follow-up would close a clear strategic gap.
5. **Cost listicle is a proven pillar — upgrade the payoff, not the setup.** Ads 06, 07, 09, 19 total $18.61 in spend. Replace the open-ended "and nothing has worked" close with a direct cost comparison ("$1,000+ wasted vs. $X/month for CBT-I that works in 4 weeks").
6. **Test a live-action or UGC format as a break from 3D animation.** The only photograph in the top spenders (Pillow v5) hits a distinct CTR profile. All other top spenders are 3D Pixar-style. Format contrast is itself a white space.
7. **Drop the male cost-listicle A/B.** Ad 09 (female static) at $3.25 delivered zero clicks; Ad 19 (male video) at $0.02 lost the auction. Female video (Ad 07) wins the category decisively — scale that lane.
8. **Add Overwhelmed New Parent coverage to T001.** Zero top-spender coverage, client-confirmed as a real acquisition segment (per Persona Summary §1). Parent-specific guilt/consequence angles are still largely untested creative territory across the whole in-market library.
9. **Replace pain-only statics with pain + reveal diptychs.** Ads 03, 05, 13 are all single-panel pain-identification statics. Each would lift with a second panel that names the mechanism (Harvard CBT-I) or the outcome (74 min earlier sleep).
10. **Borrow the loop-as-structure device for longer-form scripts.** The 3:47 AM loop (Ads 07, 14, 19) is visually distinctive and emotionally sticky. Useful as a 10s opener inside a 30-45s script that breaks the loop with the CBT-I mechanism reveal — the loop-break is itself the payoff.
