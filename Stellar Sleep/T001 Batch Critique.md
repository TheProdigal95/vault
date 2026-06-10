---
cssclasses:
  - table-wide
  - wide
---
# T001 Batch Critique — Stellar Sleep

**Fresh critique run:** 2026-04-22 (post-fix pass, audit-only mode — this pass does NOT edit Scripts or Briefs)
**Scope:** All 20 T001 items (1–9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20) re-audited from scratch against Universal Copy Rules, Video Script Criteria, Creative Image Ad Criteria, Brief Structure, Headline & Text Hook Criteria, and the T001 Working Document's brand-specific overrides.

> Methodology: [[Critique Methodology - Video]] (videos) + [[Critique Methodology - Static]] (statics)

---

## Prior Critique — Archive Summary

This critique document previously held a completed Tier 2 + Tier 3 pass dated 2026-04-22 19:51. That pass was run before the final fix-application edits to `T001 Scripts.md` and `T001 Briefs.md` (touched 20:40–20:42). It has been rolled up into the bullet list below for history. Full prior detail is reproducible from git if needed — it was not forked into a separate archive file per "do not create new files" convention.

**What the prior pass addressed and resolved:**

- **Stat phrasing + attribution** — fixed 1 Hook B + 9 close VO to use "In a study of 100 patients, over 80%" framing per brand lock; flagged 3 body "significantly" deletion (strategist call, left as Flag).
- **Cross-script hook duplication** — rewrote 1 Hook A (off 4's VoC phrase) and 4 Hook C (off 4 Hook A duplicate). VoC-phrase-ownership rule promoted as Candidate 2 for global criteria.
- **Harvard / Mandatory Disclaimer** — added missing `### Mandatory Disclaimer` sections on 16 + 20; 15 flagged pending K-Tjen sign-off.
- **Em-dash violations** — fixed 16 + 19 primary text (replaced em-dashes with commas).
- **Formatting flags** — blank line between `### References` and first heading (batch-wide carry-forward); 14 Image Direction first-bullet label convention miss. Both left as flags for T002 template.
- **Tier 3 reference audit** — 20 findings across 14 items: 1 fabricated Notion URL (13 "Editorial Quote Static" → real Tier List page), 1 broken Motion URL (16 Ad 03 Meds Maze 404), 1 chart/Diagram Example mismatch (20 — 2 cols vs. actual 3 cols), 1 chart visual bug (20/3 empty cells, strategist call), 3 scripts missing References sections (1/4/8 — added), 7 Top-Spender borrows beyond allowed character DNA (13/15/16/2/3/5/6/7 — all fixed with Notion DB replacements), 6 missing-format-anchor fixes (2/6/9/10/20 — added).
- **Brand-Specific Rule promoted** — "Stellar Sleep Top Spender references = AI 3D character DNA only" landed in the T001 Working Document with allowed/not-allowed list, `**Top Spender (character DNA only)**` heading convention, required Ignore-line convention, and exclusion of Ad 03 (2D cartoon) + Ad 10 (photograph) from the allowed-borrow family.
- **Candidates promoted to global criteria watchlist:** (1) study-attribution framing as a Tier 1 checklist item; (2) VoC-phrase-ownership rule for cross-script batches; (3) Harvard-copy-triggers-Mandatory-Disclaimer mechanical check; (4) Stellar Sleep Top Spender character-DNA-only rule (landed locally); (5) script-writer References-section evidence-report check; (6) hook-variant-dependent rule coverage (T002 watchlist, not yet at 3+ threshold); (7) live-fetch every Motion/asset URL before Tier 1 return.
- **Open strategist decisions carried forward:** 20 empty-cell chart (accept / re-export / mask); 5 + 3 stat attribution soft-miss; 13 "no sharp shadows" lighting directive; Notion DB gap entries for Cost Listicle Format + Confession VO over B-roll.

---

## Fresh Critique — 2026-04-22 (this pass)

_This section holds the fresh from-scratch Tier 2 + Tier 3 findings. Audit-only: nothing in Scripts or Briefs is edited. Everything flagged here is a finding for the strategist to triage._

### Result Summary

**Tier 2 result:** ❌ **Escalated** — 22 blocking findings + 27 flags across 9 of 31 categories swept. Every item has at least one finding; 15 categories swept clean.

**Items with blockers (10 of 20):** 1, 2, 3, 8, 9, 10, 11, 12, 13, 17, 18, 19.
**Items with flags only (10 of 20):** 4, 5, 6, 7, 14, 15, 16, 20.
**Compliance doc status:** still missing from `00 Context/`. No `### Mandatory Disclaimer` section exists in any brief this batch. Batch ships without disclaimer coverage unless client supplies approved text or Harvard mentions are removed from Image Direction / Primary Text / Headlines.

**Prior pass did not regress.** New findings sit in categories the prior pass didn't scope (on-screen text-wall em-dashes, stat verbatim VO audit, caption-VO echoes on 2, cross-script bridge uniqueness, cross-script hook-framing duplication, register coherence on aspirational blocks, headline core-type variety, Image Direction palette creep).

---

### Em-Dashes in User-Facing Copy

9 blocking violations across 6 items. Em-dashes in on-screen text-wall body copy, overlay bodies, and one caption. Universal Copy Rules currently names "VO text or primary text" — pattern shows the rule needs to extend explicitly to all on-screen / overlay / text-wall channels (see promote candidate below).

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ❌ | Em-dash in caption: `stop fighting — sleep follows` | 8 Body 0:22–0:31 caption | Universal Copy Rules / Video Script Criteria rule 7 | Fixed |
| ❌ | Em-dash in text-wall overlay body: `…treatment built for it — CBT-I, the first-line treatment…` | 10 Variation 3 (Scripts.md:909) | Universal Copy Rules | Fixed |
| ❌ | Em-dash in text-wall overlay body: `It is called CBT-I — Cognitive Behavioral Therapy for Insomnia.` | 11 Variation 3 (Scripts.md:982) | Universal Copy Rules | Fixed |
| ❌ | Em-dash in overlay body × 3 variations: `…ready to try CBT-I on Stellar Sleep — [continuation]` | 12 Variations 1, 2, 3 | Universal Copy Rules | Fixed |
| ❌ | Em-dash in overlay body: `…treatment built for it — CBT-I, the first-line treatment recommended by…` | 17 Variation 3 (Briefs.md:395) | Universal Copy Rules | Fixed |
| ❌ | Em-dash in overlay body: `It is called CBT-I — Cognitive Behavioral Therapy for Insomnia.` | 18 Variation 3 (Briefs.md:500) | Universal Copy Rules | Fixed |
| ❌ | Em-dash in overlay body × 3 variations: `…ready to try CBT-I on Stellar Sleep — [continuation]` | 19 Variations 1, 2, 3 | Universal Copy Rules | Fixed |

### Clinical Stat Verbatim

Nine blocking paraphrases of the four approved stat phrasings. Pattern is not random — every violation is either past-tense ("improved" instead of "improve"), unit-swap ("74 min more sleep per night" instead of "74 minute increase in total sleep time"), or rewording ("time needed to fall asleep dropped by fifty-three minutes" instead of "53 minutes less time to fall asleep"). This is a verbatim rule; interpretive reading doesn't apply.

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ❌ | Past-tense paraphrase: "Over 80% of users significantly improved their sleep" | 1 Hook B VO (Scripts.md:69) | Working Doc line 200 | Ignored per strategist |
| ❌ | Paraphrased & past-tense: "Over eighty percent of users improved their sleep" | 1 Body 0:17–0:22 VO | Working Doc line 200 | Ignored per strategist |
| ❌ | Paraphrased: "Total sleep time increased by seventy-four minutes on average" | 1 Body 0:22–0:27 VO | Working Doc line 200 | Ignored per strategist |
| ❌ | Paraphrased: "time needed to fall asleep dropped by fifty-three minutes" | 1 Body 0:27–0:32 VO | Working Doc line 200 | Ignored per strategist |
| ❌ | Past-tense paraphrase: "Over 80% of users improved their sleep. 74 minute increase in total sleep time." | 3 Close 0:41–0:49 VO | Working Doc line 200 | Ignored per strategist |
| ❌ | Added-word paraphrase: "Over 80% improve their sleep" | 9 Close VO (Scripts.md:823) | Working Doc line 200 | Ignored per strategist |
| ❌ | Headline paraphrase: "Over 80% of people with chronic insomnia improved their sleep. Here's why." | 13 Variation C Headline (Briefs.md:57) | Working Doc line 200 | Ignored per strategist |
| ❌ | Primary Text paraphrase: "Over 80% of Stellar Sleep users significantly improved their sleep." | 13 Variation A PT (Briefs.md:68) | Working Doc line 200 | Ignored per strategist |
| ❌ | Primary Text paraphrase: "Over 80% of people improve their sleep." | 13 Variation C PT (Briefs.md:84) | Working Doc line 200 | Ignored per strategist |
| ⚠️ | Unit swap: "74 min more sleep per night" meaningfully differs from approved "74 minute increase in total sleep time" (per-night vs cumulative). Recurs in 15 comparison box + 15 PT + 5 Close card + the 15 headline framing. | 15, 5 | Working Doc line 200 | Ignored per strategist |

**Strategic note:** Every VO stat drop also lacks "In a study of 100 patients" framing per the strategist audit brief. Working Doc line 237 allows either that framing OR "over 80% of users" — current scripts use the lenient form. If the stricter rule wins in T002, every stat-bearing VO beat needs a rewrite to add the framing.

### Caption-VO Echoes

2 ships with a "two-tier card stack — top = category label, bottom = VO mirror" caption style by design per brief. That design pattern directly conflicts with the Video Script Criteria rule that captions must carry a different core type from the VO. All three 2 hooks are ❌ blockers under the global rule but 🟦 intentional under the brief spec. Needs strategist resolution before fix.

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ❌ / 🟦 | Caption verbatim: "The Department of Defense has a protocol for insomnia" (both VO + bottom-tier caption) | 2 Hook A | Video Script Criteria On-Screen Captions | Fixed — bottom tier rewrote to "Most people never hear about it"; Visual Direction convention updated from "VO mirror" to "complementary-angle line" |
| ❌ / 🟦 | Caption near-verbatim: "This is the DoD protocol for insomnia" | 2 Hook B | Video Script Criteria | Fixed — bottom tier rewrote to "No pill. No app. A protocol." |
| ❌ / 🟦 | Caption verbatim: "If you have tried everything for chronic insomnia, this is what you missed" | 2 Hook C | Video Script Criteria | Fixed — bottom tier rewrote to "The protocol designed for chronic insomnia" |
| ⚠️ | Caption near-verbatim paraphrases VO's final clause: "THE NEXT ONE WILL BE DIFFERENT. YOU'VE THOUGHT THAT BEFORE." against VO "…hoping the next one would finally be different?" | 6 Hook C | Video Script Criteria | Fixed — caption rewrote to "YEARS OF PILLS. / SAME 3 AM." (Problem-Only, distinct from VO's Conversational Question) |
| ⚠️ | Caption stacks VO's failed-alternative list: caption lists melatonin + prescription meds + "none of it fixed the problem" against VO "I spent years cycling through melatonin, prescription sleep meds…" | 6 Hook A | Video Script Criteria | Fixed — caption rewrote to "A PROBLEM / NO PILL CAN REACH" (Reframe, different angle from VO's Alternative Callout) |
| ⚠️ | Same "there's a reason" payoff in both channels | 4 Hook B | Video Script Criteria | Fixed — caption bottom swapped to "YOUR BODY ISN'T THE ISSUE" (Reframe) |
| ⚠️ | Caption paraphrases "racing thoughts won't let you sleep" as "here's why nothing quiets them" | 7 Hook B | Video Script Criteria | Fixed — caption bottom swapped to "THIS IS NOT A STRESS PROBLEM" (Reframe) |
| ⚠️ | Caption "YOU TRIED THE APPS / THEY DIDN'T FIX IT" same-angle as VO "Relaxation apps won't fix this" | 7 Hook C | Video Script Criteria | Fixed — caption rewrote to "EXHAUSTED BUT NOTHING WORKS / YOUR BRAIN LEARNED THIS" (Problem-Only → Reframe, drops "apps" overlap with VO) |

### Harvard Compliance

No banned framings ("endorsed by," "backed by," "approved by," "partnered with") anywhere. All Harvard mentions use one of the two approved phrases. Disclaimer coverage is the gap.

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Six briefs reference Harvard in user-facing copy (Image Direction / Headline / Primary Text) with zero `### Mandatory Disclaimer` sections in `T001 Ads.md` | 13, 14, 15, 16, 17 (Var 3), 20 (Var C) | Working Doc line 235 + strategist audit instruction | Resolved per strategist — K-Tjen already cleared Harvard use as long as we stick to the approved phrase ("Founded and developed at Harvard") and don't claim endorsements. No Mandatory Disclaimer section required. |
| ⚠️ | No compliance / guardrails / claims doc in `00 Context/` | Batch-wide | Working Doc line 147 | Resolved per strategist — K-Tjen confirmed approved-phrase-only rule is the operative compliance rule; no separate doc needed. |

### Stellar Sleep Top Spender Borrowing

One Ad 10 ("Pillow v5") reference found — the item the Working Doc explicitly excludes from the allowed-borrow family (line 222). Internal inconsistency: the Batch Plan (line 163) authorizes the Ad 10 borrow for 1, while Brand-Specific Rules (line 222) excludes it. Surface to strategist.

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ❌ | Image Direction: "replicating the Pillow v5 mood and framing but as a new original asset" (Briefs.md:26) | 13 | Working Doc line 222 (Ad 10 / Ad 03 exclusion) vs Batch Plan line 163 | Resolved per strategist — Top Spender image references are OK when borrowing the image itself (not layout/design style). Image Direction tightened to explicitly scope reference to "mood and framing" and added "designer owns lighting and palette." Working Doc Brand-Specific Rule will be reconciled in T002 planning. |

### Designer Note Discipline

Per Brief Structure: editor/designer guidance only, no strategy commentary, no disclaimer text.

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Strategy rationale in Designer Note: "The metaphor does the emotional work; Harvard is the credibility close." | 16 (Briefs.md:264) | Brief Structure Designer Note rules | Fixed — strategy commentary stripped; kept "Keep Harvard/CBT-I authority as a subhead tag, not a headline element" (genuine design directive) |
| ⚠️ | Strategy rationale in Designer Note: "Hierarchy signals 'what they've been told' vs. 'the truth.'" | 18 (Briefs.md:508) | Brief Structure | Fixed — rationale sentence removed; typographic directive kept |
| ⚠️ | Designer Note restates Image Direction: "Card copy is locked verbatim. Do not rephrase." — already stated in Image Direction | 14 (Briefs.md:116) | Brief Structure Pre-Content Block Economy | Fixed — Designer Note section removed entirely per Pre-Content Block Economy |

### 19 Image Direction / Designer Note Contradiction

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ❌ | Image Direction (Briefs.md:574): "Single AI-generated still — Scene F4 … Full-frame background across all 3 variations." Designer Note (Briefs.md:583): "Three separate execution files — one per variation, each with its own background still." One says single shared still; the other implies per-variation backgrounds. Designer will be confused which is the truth. | 19 | Internal consistency | Fixed — per strategist direction applied to all text-wall ads (17/18/19 + 10/11/12): brief the single background once in Image Direction, drop over-explanation bullets in Designer Note. Contradiction removed. |

### Image Direction — "Image to Generate" Boundaries

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Image Direction describes whole composition (pose + bedding + lighting grade) rather than committing one custom element. "warm neutral bedding … Soft natural-light bedroom setting, no sharp shadows." | 13 (Briefs.md:26) | Brief Structure Image Direction | Fixed — stripped lighting grade, "warm neutral bedding" cut, Pillow v5 reference retained and scoped to "mood and framing"; added "Designer owns lighting and palette" |
| ⚠️ | Background palette specified: "Dark blue/grey nighttime palette" | 15 (Briefs.md:173) | Brief Structure "no background color" rule | Fixed — palette spec removed; covers reference kept as image-content detail |
| ⚠️ | Background palette specified: "Moody, night-time palette" | 16 Variant A (Briefs.md:252) | Brief Structure | Fixed — palette spec + "No harsh studio light" lighting directive both removed |

### Pacing

Body-beat target is ~250 spm, hooks tolerated to 280 spm per Universal Copy Rules.

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Body beat at ~290 spm: "F tier: sleeping pills. They work, but only while you're taking them. D tier: melatonin. Helps with timing, not the root." (29 syl / 6s) | 3 Body 0:05–0:11 | Universal Copy Rules pacing | Fixed — extended beat to 0:05–0:12 (~249 spm). Downstream 3 timestamps cascaded +1s through close (0:50–0:58). Total duration 57s → 58s. |
| ⚠️ | Body beat at ~288 spm (4 conditioned-arousal mechanism explanation, 48 syl / 10s) | 4 Body 0:21–0:31 | Universal Copy Rules pacing | Fixed — extended beat to 0:21–0:32 (~262 spm). Downstream 4 timestamps cascaded +1s through close (0:44–0:53). Total duration 52s → 53s. |

Every other body beat across the 12 scripts lands between 191–270 spm ✓.

### Immediate-Relief Framing

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Hook flirts with immediate-relief promise: "What if tonight you finally slept?" | 9 Hook C (Scripts.md:802) | Working Doc line 249 | Fixed — swapped to "What if you slept like this, night after night?" (removes night-specific anchor, keeps hypothetical register) |

### Hook Core-Type Variation Within Script

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | All 3 hooks are Curiosity Gap variants — distinction is only framing ("Every sleep method, ranked." / "You've tried every sleep fix out there. Here's how they rank…" / "Most people chasing better sleep are stuck in C tier.") | 3 | Video Script Criteria Hook rule (3 variations = distinct core types) | Partially resolved per strategist — 3 Curiosity Gaps accepted for tier-list format. Hook C quality rewrite applied: VO → "Every sleep method has a tier. Only one hits S."; caption → "EVERY METHOD YOU'VE TRIED / IS WHAT TIER?" |

### Cross-Script / Cross-Brief Framing Duplication

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | "Willpower" payoff recurs across 4 items | 1 Hook A caption, 4 Hook C VO, 8 Hook B VO, 13 Variation A PT | Cross-batch hook-framing uniqueness | Ignored per strategist — cross-script duplication accepted as-is when it works |
| ⚠️ | Near-verbatim body/brain Reframe headlines: 13B "Your body wants to sleep. Your brain won't let it." and 16C "Your Body Is Tired. Your Brain Won't Let You Sleep." | 13 Variation B headline, 16 Variation C headline | Headline Criteria + Universal Copy Rules differentiation | Ignored per strategist |
| ⚠️ | Product bridge "Stellar Sleep is built on CBT-I" × 3 (Scripts.md:179, 351, 620) | 2, 4, 7 | Universal Copy Rules Product Intro | Ignored per strategist |

### Headline Core-Type Variety (Statics)

Per Headline Criteria: at least 5 distinct core types across a brief's set; closer variety.

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Reframe dominates static headlines: 6+ Reframes across 8 briefs (13B, 16A, 16C, 17 Var 2, 20A, 20C) | Batch-wide | Headline Criteria Type Variety | Ignored per strategist |
| ⚠️ | All 3 18 headlines are Confrontational Command / "Stop X" scaffold. A: "Stop listening to sleep advice…" B: "Stop treating chronic insomnia…" C: "Stop taking sleep advice…" — only angle varies | 18 | Headline Criteria Type Variety + closer variety | Ignored per strategist |

### Close-Type Distribution (Videos)

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Authority / Proof Cascade = 6/12 scripts (1, 2, 3, 6, 7, 8). ~50% concentration on institutional-authority close pattern | Batch-wide | Video Script Criteria Close distribution | Ignored per strategist |

### Register Coherence (Aspirational Blocks)

| Severity | Finding                                                                                                                                                                                                                                     | Affected                                        | Linked Rule                             | Status |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------- | ------ |
| ⚠️       | "We're looking for people ready to try CBT-I on Stellar Sleep" opens body in all 6 aspirational overlay bodies — casting-call register clashes with the "this is what rested feels like" dreamy/relief register the hooks/headers establish | 12 (all 3 variations), 19 (all 3 variations) | Universal Copy Rules register coherence | Fixed — all 6 openers rewrote to 3 distinct aspirational framings (12+19 1 = "That is what rested looks like."; 12+19 2 = "Sleep like that is learnable."; 12+19 3 = "It is a skill, built one night at a time."). All 6 recruitment-frame em-dashes removed. |

### Near-Banned Framing — "Clinical Study"

Per Working Doc line 237: never "published study," "peer-reviewed research," or "clinical trial results."

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Hook VO: "There's a sleep protocol with a clinical study behind it." "Clinical study" sits adjacent to the banned "clinical trial results" phrase — brand is an internal 100-patient study, not a clinical trial. | 5 Hook C (Scripts.md:420) | Working Doc line 237 | Ignored per strategist |

### Meta Headline Truncation

Per Meta overlay: headline ≤40 char visible on mobile feed before "…" cut.

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Headlines exceed 40-char feed visibility (each brief acknowledges the trade-off in its own notes) | 15 A/B (41 ch), 19 Meta 2 (42 ch), 19 Meta 3 (47 ch), 20 V C (55 ch) | Per-Platform Meta overlay | Partially fixed per strategist — rule applies only to in-platform feed-field headlines, not in-creative. 19 Meta Headline (feed field) trimmed to ≤40 chars across all 3 variations. 15 + 20 headlines are in-creative; truncation caveats removed from their Designer Note / Headline Type Index rows. |

### Within-Body Scaffold Repetition (8)

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Three myth-bust beats use parallel scaffold "But [reason]. CBT-I [fix]." Beats 1 and 2 are parallel; beat 3 deviates slightly. Passes 2-distinct-scaffold threshold but barely. | 8 Body | Video Script Criteria Redundancy rule 2 | Fixed — Myth 2 VO rewrote to break parallelism: "Trying harder actually raises your brain's arousal. And arousal is what blocks sleep. CBT-I teaches the opposite, because telling your brain to stay awake is what finally drops it." Also fixes the caption em-dash ("stop fighting, sleep follows"). |

---

### Passes (No Action Required)

| Category | Sweep Result |
|---|---|
| 10 vs 11 language-pool separation | ✅ 10 stays inside symptoms (racing thoughts, clock-checking, exhaustion, 3am wake-ups, body-tired/mind-awake). 11 stays on advice-disqualification (melatonin, sleep hygiene, prescription meds, meditation app, OTC sleep aid). No cross-contamination either direction. 17/18 clean on the same rule. |
| 6 anti-pills 3-card lock | ✅ Scripts.md:522–524 cards in order: DEPENDENCY → SIDE EFFECTS → STOPS WORKING (tolerance). Matches Working Doc line 250 lock. |
| 8 myth-lock | ✅ Myth 1 → Sleep Restriction (line 710). Myth 2 → Paradoxical Intention (line 712). Myth 3 → Stimulus Control + Cognitive Exercises (line 714). Matches Working Doc line 170. |
| Comparison chart restriction | ✅ `chart_4347910802099195.png` appears only at 3 (Scripts.md:203, 258) and 20 (Briefs.md:694). No other concept. |
| 20 Diagram Example matches chart | ✅ 3 columns × 4 rows with intentional blanks faithfully reproduced (Briefs.md:727–753). |
| DoD framing (2) | ✅ Protocol-level only. No "partners with" / "military-grade" / VA. Stylised silhouettes, no real logos, no named officials. |
| CTA Lock Bank — all 20 items | ✅ Every item's CTA matches the locked CTA in Working Doc lines 269–292. No freelancing, no alts. |
| No brand / competitor / pharmaceutical names | ✅ Drug categories throughout (melatonin, prescription sleep meds, OTC sleep aids, sleeping pills). Zero branded products. |
| Tier list no-brand rule (3) | ✅ Methodologies ranked, not brands. |
| Cost listicle payoff upgrade (5, 15) | ✅ Both close on Harvard-math comparison per Working Doc line 239 — no reuse of "nothing has worked." |
| Footage-vs-References source-link rule | ✅ Study screenshots + source URLs (stellarsleep.com/learn/why-stellar-sleep, ACP/AASM) consistently live in Footage blocks. |
| Visual style distribution across Hook A/B/C | ✅ 1, 2, 4, 5, 6, 7, 9 — each hook uses a distinct visual style. 10/b/c overlay-text-only is 🟦 intentional (working doc design). |
| No discount / promo / urgency / free-trial / cancel-anytime anywhere | ✅ Zero billing language. |
| Pre-Content Block Economy | ✅ No blank line between `### Heading` and first bullet on any script or brief. Editor Notes / Designer Note only present where script-specific directive exists. |
| Redundancy — hook↔body content overlap | ✅ No hook previews body beats in sequence. Three forms clean outside of 8 scaffold borderline (flagged above). |

---

### Cross-Batch Patterns

T001 is the first Stellar Sleep batch. These seed the T002 comparison.

1. **On-screen text channels were not audited against the em-dash ban pre-fix-pass.** Every em-dash violation this pass landed in text-wall overlays, overlay bodies, or captions — not VO and not primary text (which the prior pass did scrub). The rule in Universal Copy Rules currently names "VO text or primary text"; writers treated anything outside those two cells as out of scope. 9 violations across 6 items is well past the 3-item compounding threshold.

2. **Clinical stat verbatim rule is a floor, not a suggestion — currently treated as a target.** Writers paraphrased the approved stat phrasings in past tense, dropped "significantly," blended two stats into one sentence, and unit-swapped "per night" for "total sleep time." 9 violations across 4 items. The Working Doc states the rule plainly (line 200) but writers defaulted to conversational VO delivery over verbatim lock.

3. **Caption-style decisions at brief-planning stage can silently override global criteria.** 2 ships "two-tier card stack — top = category label, bottom = VO mirror" as the locked caption style. That spec directly contradicts the Video Script Criteria rule that captions carry a different angle from VO. The writer followed the brief. The audit surfaced the conflict. Needs a convention for marking "intentional exception to X rule" at the brief level so audits don't loop on it.

4. **Cross-script framing cohesion isn't explicitly a Tier 1 check.** "Willpower" payoff recurs across 4 items; body/brain Reframe headlines duplicate across 13 + 16; product bridge "Stellar Sleep is built on CBT-I" recurs 3×. Cross-script uniqueness was not in any writer's Tier 1 self-audit because the writer only sees their own item.

5. **Reframe dominates static headlines (6+ of 8 briefs' headline sets include at least one Reframe; 18 is 3/3 Confrontational Command "Stop X").** Type-variety rule in Headline Criteria is real but rarely gets flagged until post-hoc review. Worth surfacing during brief planning (i.e., Working Doc should log which core types each brief's headline set targets).

6. **Authority / Proof Cascade closes = ~50% of the 12-script batch (1, 2, 3, 6, 7, 8).** Every Harvard-primary script plus several mechanism-primary scripts all land institutional authority in the close. Close-type diversity would strengthen the test — Benefit, Aspirational, Outcome-Anchored, and Mechanism-Name close types are all underweighted.

7. **Register coherence on aspirational blocks is a separate quality axis from register-pool separation.** 12 and 19 all open with casting-call register ("We're looking for people ready to try CBT-I on Stellar Sleep") after the header promises aspirational identification ("You wake before your alarm"). The two registers do not cohere within a single overlay block.

---

### Promote to Global Criteria — Candidates

Six rule candidates. Mechanical paste for strategist approval during Tier 3 close-out.

**Candidate 1 — Em-dash ban extends to all on-screen text channels**

Pattern: 9 violations across 8 caption + 10/b/c and 17/b/c overlay bodies / 1 batch.

Rule to add:
> Em-dashes are banned across all user-facing copy channels — VO, primary text, captions, on-screen overlay text, text-wall bodies, headlines, and any text that will render for a viewer. Use commas, periods, or colons instead. The ban applies equally to text meant to be spoken and text meant to be read; em-dashes always get rewritten to a different mark.

Target doc: `00 Global/Criteria/Universal Copy Rules.md`
Suggested insertion point: Banned Constructions section (extend the current "no em-dashes in VO text or primary text" line).
Count: 9 items this batch / 1 batch.

**Candidate 2 — Clinical stat verbatim table for Stellar Sleep Working Document**

Pattern: 9 paraphrase violations across 1 (×4), 3, 9, 13 (×3) + 1 unit-swap flag (15, 5) / 1 batch.

Rule to add:
> Acceptable VO / caption / headline / primary text forms for clinical outcome stats:
>
> | Stat | Approved | Deviations that fail |
> |---|---|---|
> | 80% outcome | "Over 80% improve sleep." | "Over 80% improved their sleep." / "Over 80% of users significantly improved…" / "Over 80% of Stellar Sleep users improve their sleep." |
> | 74-min sleep time | "74 minute increase in total sleep time." | "74 min more sleep per night." / "Total sleep time increased by 74 minutes." |
> | 53-min sleep onset | "53 minutes less time to fall asleep." | "Time to fall asleep dropped by 53 minutes." |
> | 52% awakening reduction | "52% fewer awakenings." | "52% less time awake in the middle of the night." (that's a different stat from a different brand page) |
>
> Past-tense rewrites, unit swaps ("per night" vs cumulative), added modifiers ("Stellar Sleep users"), and conversational rephrasings are all deviations. The rule is verbatim.

Target doc: `Stellar Sleep/T001 Working Document.md` → Brand-Specific Rules section (currently line 200–206, extend); plus a note in `00 Global/Criteria/Universal Copy Rules.md` Specificity section referencing the brand pattern.
Count: 9 items this batch / 1 batch.

**Candidate 3 — Text-wall / overlay body copy is primary-text-equivalent**

Pattern: 6 items where text-wall or overlay body text contains em-dashes / violates rules normally enforced on primary text / 1 batch.

Rule to add:
> Text-wall full-screen overlays, dense text overlay bodies, and any on-screen block of copy the viewer is expected to read count as a primary-text channel for audit purposes. They inherit Universal Copy Rules banned constructions (em-dashes, fourth-wall breaks, quotation marks wrapping content), pacing considerations, and stat verbatim locks. They are not loosened because the channel is visual rather than spoken.

Target doc: `00 Global/Criteria/Video Script Criteria.md` (On-Screen Captions section) + `00 Global/Process/Brief Structure.md` (Text Wall format rules if the format becomes a standard entry).
Count: 6 items this batch / 1 batch.

**Candidate 4 — "Intentional exception" marker convention for caption-VO style**

Pattern: 2 ships intentionally VO-mirror captions by brief spec, which auto-fails the global caption-VO rule. No marker convention for when a writer is deliberately deviating from a global rule.

Rule to add:
> When a brief or script deliberately deviates from a global rule (caption-VO distinction, close-type variety, hook variation distribution), the deviation must be marked explicitly in Visual Direction or Caption Style with `🟦 intentional exception to [named rule]` and a one-line reason. Audit sub-agents will flag any uncaptured deviation as ❌ blocking by default. The marker converts ❌ to 🟦 without needing a round-trip.

Target doc: `00 Global/Process/Critique Methodology - Video.md` + `00 Global/Process/Critique Methodology - Static.md`.
Count: 2 this batch (3 hooks affected) / 1 batch.

**Candidate 5 — Image Direction boundary: no palette / lighting grade specs**

Pattern: 3 briefs this batch crossed into designer territory on palette or lighting (13, 15, 16).

Rule to add:
> Image Direction may NOT specify: background color, overall palette ("dark blue/grey nighttime palette," "moody night-time palette"), lighting grade ("no sharp shadows," "soft natural-light"), color temperature, or film-grain / cinematic filter. Designer owns all of these. `Image to generate:` commits the subject and scene, not the treatment. When the treatment is genuinely load-bearing (e.g., a specific Top-Spender character scene reference), cite the reference in References rather than describing the treatment in Image Direction.

Target doc: `00 Global/Process/Brief Structure.md`.
Suggested insertion point: Image Direction section — extend the current "no background color" rule.
Count: 3 items this batch / 1 batch.

**Candidate 6 — Cross-script framing uniqueness as a Tier 1 self-audit item (brand-level)**

Pattern: "Willpower" × 4 items, body/brain Reframe × 2, "built on CBT-I" product bridge × 3 / 1 batch.

Rule to add (to writer sub-agent self-audit):
> Before returning a script or brief, grep the entire output file (`T[###] Scripts.md` / `T[###] Briefs.md`) for the item's distinctive hook-payoff phrase, product-bridge phrase, and primary reframe verb. If any exact or near-verbatim match exists in another script or brief already in the batch, rewrite. Cross-script phrase uniqueness is a Tier 1 responsibility, not a Tier 2 catch.

Target doc: `00 Global/Hermes/Commands/script-writer.md` + the brief-writing section of the same canonical command (formerly `.claude/agents/script-writer.md` + `.claude/agents/brief-writer.md`, deleted during the 2026-06-09 Hermes port) — evidence-report format.
Count: 3 duplicated phrases this batch / 1 batch.

---

### Strategic Notes for the Strategist

Items that are interpretation or open calls, not QA findings.

1. **The Working Document's Batch Plan (line 163) authorizes Ad 10 borrow for 1 while Brand-Specific Rules (line 222) excludes Ad 10 from the allowed-borrow family.** 13 Image Direction references "Pillow v5 mood and framing." Prior Tier 3 pass dropped the Ad 10 reference from 13 References but the phrase survives in Image Direction. Decision: (a) strip "replicating the Pillow v5 mood and framing" from 13 Image Direction to honor the Brand-Specific Rule; or (b) amend the Brand-Specific Rule to allow Ad 10 photograph-mood borrow (contradicts strategist's earlier direction); or (c) promote the exclusion rule from brand-level to a locked batch plan ruleset. Recommend (a) — Image Direction already generates a fresh AI photograph, the Ad 10 reference adds nothing the prior pass didn't already prove by dropping it from References.

2. **2 caption style is a design-intent vs global-rule conflict.** The "two-tier card stack, bottom = VO mirror" is a deliberate creative decision (institutional credentialing register benefits from the VO-mirror cadence). Options: (a) keep the style and add `🟦 intentional exception to caption-VO distinction rule` to 2's Caption Style + Visual Direction so audits classify it correctly going forward; or (b) rewrite 2 captions so bottom tier carries a different angle from VO (e.g., top tier = DoD category label, bottom tier = viewer reframe — "THE PROTOCOL / the one you never knew to ask about"). Recommend (a) with a named note; (b) requires a caption rewrite across 3 hooks + body + close.

3. **"Over 80% improve sleep" verbatim lock is the most systemically-violated rule this batch.** Writers defaulted to natural spoken VO ("improved their sleep") and conversational paraphrases ("of people with chronic insomnia improved"). All fixable, but the T002 writer template should surface the verbatim bank inline (not as a doc reference) to prevent recurrence. The Candidate 2 promotion above is the mechanical fix.

4. **3's three hooks are structurally similar (all Curiosity Gap variations on the tier-list).** The concept may not have room for 3 distinct core types given the format locks on the tier-list graphic. Decision: (a) accept as a 🟦 intentional exception given the format constraint; or (b) reshape Hook B as a Problem-Only ("Most people never see their sleep methods ranked") and Hook C as a Reframe ("Your current sleep method isn't the problem. It's the tier it's in."). Recommend (a) — the format is the concept, three hooks all Curiosity Gap is acceptable when the cell forces it.

5. **9 Hook C "What if tonight you finally slept?" brushes against Working Doc line 249 ("don't over-promise immediate relief").** Hypothetical framing softens it but "tonight" is the exact anchor the rule was written to avoid. Decision: keep hypothetical phrasing OR swap to "What if this was the first week you slept?" — shifts from night-specific to week-specific, matches the brand's 2-week anchor. Recommend the swap.

6. **19 Image Direction vs Designer Note contradiction is a writer-level wording issue, not a plan-level issue.** Image Direction says single F4 still, all 3 variations share. Designer Note says "three separate execution files — one per variation, each with its own background still." The intent is 3 separate ad-unit files, each carrying the same F4 background with different overlay text. A one-line Designer Note reword fixes it without touching the visual plan.

7. **"We're looking for people ready to try CBT-I on Stellar Sleep" recurs across 6 items (12 × 3 + 19 × 3) and clashes with the aspirational register.** The header promises "You wake before your alarm" and "This is what rested feels like" — a recruitment-style body opener pulls the viewer out of that emotional state. Decision: (a) rewrite body opener to carry the aspirational register through ("CBT-I is how you get back here. Built on the same psychology top sleep clinics use, just 10 minutes a day."); or (b) accept the handoff to recruitment register as the conversion trigger (Meta's app-download placement rewards direct-ask framing at this position). Recommend (a) — the register break is real enough to hurt cold-audience performance, and the recruitment frame can land on the CTA button itself.

8. **Authority close dominance (6/12 scripts) is a batch-composition observation, not a per-script fix.** All Harvard-primary scripts plus 6 + 7 land authority closes. T002 could diversify close types: Benefit-led ("Wake up rested, every morning, in 2 weeks"), Mechanism-Name ("That's CBT-I."), or Aspirational ("This is what rested feels like").

9. **18 headline set is 3/3 Confrontational Command "Stop X" structure.** Only angle varies. The set reads monotonous even though each headline is individually strong. T002 could diversify to one Reframe ("The advice you're following wasn't built for chronic insomnia"), one Confrontational Command ("Stop treating chronic insomnia with mild-insomnia advice"), and one Problem-Only ("Chronic insomnia doesn't respond to sleep hygiene").

10. **"Clinical study" in 5 Hook C is semantically adjacent to Working Doc's banned "clinical trial results" framing.** The brand's stats come from an internal 100-patient study, not a peer-reviewed clinical trial. "Clinical study" is not on the banned list as written, but the phrase reads similar. Decision: swap 5 Hook C VO to "There's a sleep protocol with a published study behind it" or just "There's a sleep protocol with a study behind it" — both safer than "clinical study."

---

### Priority Fix Queue

Ordered for Tier 3 decision / fix-pass staging. Highest-leverage fixes first.

| # | Fix | Why first | Est. effort |
|---|---|---|---|
| 1 | Em-dash sweep across 8 caption + 10/b/c + 17/b/c overlay bodies | 9 blockers, all mechanical (em-dash → comma / period). No creative decisions. | Low — 15 min |
| 2 | Stat verbatim rewrite across 1 (×4 VO beats), 3 close, 9 close, 13 headline + PT A + PT C | 9 blockers. Mechanical rewrite against approved bank. | Low — 30 min |
| 3 | 19 Image Direction / Designer Note reconciliation | 1 blocker, 1-line reword | Trivial — 5 min |
| 4 | 13 Image Direction strip "Pillow v5 mood and framing" phrase (or strategist amends Working Doc) | 1 blocker, strategist call first | Trivial — 5 min after call |
| 5 | 2 caption style — add `🟦 intentional exception` marker OR rewrite 3 captions | 3 borderline-blockers. Strategist decides path. | Low if marker, medium if rewrite |
| 6 | 5 Hook C "clinical study" swap to "study" | 1 flag, 1 word | Trivial |
| 7 | 9 Hook C "tonight" → "this week" rewrite | 1 flag, 1 phrase swap | Trivial |
| 8 | 15 / 5 "per night" → "in total sleep time" unit-swap fix | 1 flag across 2 items, mechanical rewrite | Trivial |
| 9 | Register-coherence rewrite on 12 + 19 "We're looking for people" body opener (6 items, same phrase) | 1 flag × 6 items, single phrase swap | Low — 15 min |
| 10 | Designer Note strategy-commentary cleanup (16, 18, 14 repetition) | 3 flags, inline edits | Trivial |
| 11 | Image Direction palette strips (13, 15, 16) | 3 flags, delete offending phrases | Trivial |
| 12 | Willpower-payoff / body-brain / "built on CBT-I" deconfliction | Cross-script cosmetic. Can wait for T002 process change per Candidate 6. | Low |
| 13 | 18 3/3 "Stop X" headline diversification | Flag, creative rewrite required | Medium |
| 14 | Mandatory Disclaimer coverage | Blocked on client compliance doc — no action until received | External blocker |
| 15 | 3 body + 4 body pacing trim (290 spm, 288 spm → ≤280) | Flags, VO rewrite | Low |

---

*Tier 2 + Tier 3 complete. Strategist decisions applied in the follow-up pass below — `T001 Scripts.md` and `T001 Briefs.md` edited per strategist direction; `T001 Working Document.md` untouched.*

---

## Strategist Decisions Applied — 2026-04-23

Follow-up pass. Strategist gave per-category direction on every finding. Summary below; individual row statuses updated in place above.

### Fixed (applied to Scripts/Briefs)

- **Em-dashes in user-facing copy** — all 9 user-facing em-dash instances fixed (8 caption, 10 3 body, 11 3 body, 12 1/2/3 bodies handled via "We're looking for people" rewrites, 17 3 body, 18 3 body, 19 1/2/3 bodies handled via "We're looking for people" rewrites).
- **Caption-VO echoes (all 8 instances)** — 2 Hooks A/B/C bottom tiers rewrote to carry complementary angle (not VO mirror); 2 Visual Direction + caption-style header updated from "VO mirror" to "complementary-angle line." 4 Hook B, 6 Hooks A + C, 7 Hooks B + C all rewrote to distinct core types per Headline & Text Hook Criteria.
- **3 Hook C quality** — VO + caption rewrote ("Every sleep method has a tier. Only one hits S." / "EVERY METHOD YOU'VE TRIED / IS WHAT TIER?"). Strategist accepted three Curiosity Gap variants for tier-list format.
- **3 + 4 pacing** — timestamps extended (no copy trim, no brief edits per strategist direction). 3 total duration 57s → 58s; 4 total duration 52s → 53s. All body beats now ≤270 spm.
- **9 Hook C immediate-relief framing** — "What if tonight you finally slept?" → "What if you slept like this, night after night?" (no tonight anchor, keeps hypothetical register).
- **8 scaffold repetition** — Myth 2 VO rewrote to break the "But X. CBT-I Y." pattern parallelism with Myth 1. 8 caption em-dash also fixed.
- **12 + 19 "We're looking for people" register** — all 6 instances rewrote to 3 distinct aspirational openers (1: "That is what rested looks like."; 2: "Sleep like that is learnable."; 3: "It is a skill, built one night at a time."). Recruitment register removed across the board.
- **Text-wall single-background over-explanation** — strategist rule applied to all 6 text-wall ads (10/b/c + 17/b/c): single background briefed once in Image Direction, redundant clarifications removed from Designer Notes and footage blocks.
- **19 Image Direction / Designer Note contradiction** — resolved as part of the text-wall simplification.
- **Image Direction palette/lighting flags** — 13 (lighting grade stripped, Pillow v5 reference tightened to "mood and framing"), 15 (palette spec stripped), 16 Variant A (palette + lighting grade stripped).
- **Designer Note commentary** — 16 strategy sentence removed, 18 hierarchy rationale removed, 14 Designer Note removed entirely per Pre-Content Block Economy (Image Direction already says "verbatim — do not rewrite").
- **Meta Headline feed-field truncation (19 only)** — all 3 19 Meta Headlines trimmed to ≤40 chars. In-creative truncation caveats (15, 20) removed since rule applies to in-platform CTA only.

### Resolved per strategist (no Scripts/Briefs edit needed)

- **Harvard Mandatory Disclaimer gap** — K-Tjen already cleared Harvard use as long as we stick to the approved phrase ("Founded and developed at Harvard") and don't claim endorsements. No Mandatory Disclaimer section required for any brief. No compliance doc pending.
- **Top Spender image borrow (13 Ad 10 Pillow v5)** — Top Spender references are OK when borrowing the image itself (not layout/design style). 13 Image Direction tightened to explicitly scope to "mood and framing" and hand palette/lighting to designer. Working Doc Brand-Specific Rule (line 222) will be reconciled in T002 planning to match this practical reading.
- **3 three hooks same core type (Curiosity Gap)** — accepted by strategist. Format constraint (tier list) justifies the overlap.

### Ignored per strategist (no action this batch)

- **Clinical stat verbatim violations** (9 blockers + 1 flag) — strategist does not require verbatim lock enforcement this batch.
- **Cross-script / cross-brief framing duplication** ("willpower" × 4, body/brain Reframe × 2, "built on CBT-I" × 3) — accepted where it works.
- **Headline core-type variety (statics)** — Reframe dominance + 18 3/3 Confrontational Command accepted.
- **Close-type distribution** (Authority 6/12) — accepted.
- **5 Hook C "clinical study" near-banned framing** — accepted as-is.

### Remaining open for strategist triage

- **Promote-to-Global candidates** (6 proposed) — not yet landed in criteria docs. Candidate 2 (stat verbatim) effectively superseded by strategist decision to ignore that finding. Candidates 1, 3, 4, 5, 6 still active.
- **Working Document Ad 10 exclusion reconciliation** — Brand-Specific Rule (line 222) vs practical strategist reading (image-borrow OK, layout/design-borrow not) should be reconciled in T002 Working Document.

*Batch is clean against strategist-accepted scope. Scripts and Briefs are ready to ship pending any final strategist review.*

