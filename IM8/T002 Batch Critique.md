# T002 Batch Critique

> This document is used for plan critique, script critique, and prioritizing fixes for batch T002.

---

## Batch Plan Critique (Pre-Script)

**Verdict:** The plan is solid — 10/3/2 menopause split matches AppLovin data, structures are drawn from proven top spenders, and variety across hooks/visuals/closes is well-distributed. The hook/hold rate data confirms most choices and flags a few worth revisiting before scripts are written.

---

### Structures vs. Data

| Structure in Batch | Source Ad | Hook | Hold | ROAS | Data Says |
|---|---|---|---|---|---|
| Progression timeline (#1, #14) | Ad #2 (69 hook, 3.8% hold, 0.77), Ad #5 (58 hook, 3.4% hold, 0.90) | Mid-high | Very low | Strong | Low hold = most viewers drop early, but survivors convert well. Hooks carry extra weight. |
| AI animated character (#2, #5, #11) | Ad #11 (61 hook, 12.3% hold, 0.73) | Mid | High | Mid | Format retains but doesn't stop. At 30-60s (AppLovin), hold risk is mitigated vs. the original 3:33. |
| Narrative testimonial (#3, #8, #15) | Ad #4 (63 hook, 8.2% hold, 0.69) | Mid | Mid | Lower | Decent retention but lowest ROAS in top 10. Stories need strong proof closers to convert. |
| Numbered reasons (#6, #7) | No direct top spender | - | - | - | Untested. Low hold risk — each reason is a mini-payoff. #6 uses comp disqualification as body beat. |
| Stack replacement (#4) | No direct top spender | - | - | - | Untested. The math is the hook — Formula/Math is proven (Ad #11's "39% fewer calories"). |
| Educational (#9 authority, #13 explainer) | Ad #1 (59 hook, 14.8% hold, 0.94) | Mid | Highest | Near-best | Whiteboard is #1 spender with best hold. #9 now uses "How To" tactic. #13 uses study data for muscle loss focus. |
| Narrative + math (#12) | Ad #4 structure + Ad #11 math | Mid | Mid | - | Combines proven elements. Untested as a combined structure. |
| Short mechanism contrast (#10) | No direct top spender | - | - | - | Untested. Quick A/B comparison, single symptom. 30-45s limits hold risk. |

---

### Hook Tactics vs. Data

| Motion Tactic | Hook Score (avg) | Best ROAS | In This Batch? |
|---|---|---|---|
| Curiosity | 69 (58, 66, 82) | 0.90 | Hook B on 3 scripts. Strong default for secondary hooks. |
| How To | 59 | 0.94 | **#9 Hook A.** Best hold rate + ROAS combo in the data. |
| Confession | 63 | 0.69 | VoC Hook (#3) is adjacent. |
| Contrarian | 61 | 0.73 | Pattern Interrupt/sardonic (#11) is adjacent. |
| If Then | 50 | 0.78 | Conditional (#7) is adjacent. Weakest tactic — only used once. |
| *Urgency/Temporal* | *N/A (not a Motion classification)* | *0.90* | **#8 Hook A, #1 Hook B, #3 Hook B.** 3 urgency hooks in menopause. |

---

### Flags — Status After Revision

- ~~**Reframe's hook problem.**~~ **Resolved.** Reframe demoted from script structure to hook/beat. #2 restructured to AI animated character (green screen). #13 restructured to educational explainer. #15 relabeled as narrative. Reframe remains as Hook A on #2 and opening beat on #13 — paired with stronger visual formats.
- ~~**AI animated character hold rate risk.**~~ **Mitigated.** All scripts now 30-60s (AppLovin requirement). #5 condensed from 5 symptoms to 2 (sleep + hot flashes). Long-form retention risk eliminated by format constraint.
- ~~**"How To" missing.**~~ **Resolved.** #9 Hook A changed to How To: "How 90 nutrients a day change menopause."
- **Narrative testimonial ROAS — still a watch item.** Ad #4 has lowest ROAS in the top 10 (0.69) but decent hook (63) and hold (8.2%). Kept #3 and #8 as narratives — the format is worth testing for menopause. Both need strong proof closers.
- ~~**Hook C Reframe concentration.**~~ **Improved.** Reduced from 4x to 3x. #13 Hook C changed to Formula/Math.

---

### Your Elements — Where They Land (Updated)

| Element from Top Spenders | Deployed In |
|---|---|
| Simplify the language | All 15 (batch-level, with T001 contrast table) |
| "$72 in Welcome Gifts" text hook | #2, #4, #7, #12 (4 scripts) |
| Reframe as tactic | #2 Hook A, #10 Hook B, #13 opening beat (tactic, not structure) |
| "Within a day or two" temporal discounting | #1 Hook B, #3 Hook B, #8 Hook A (3 urgency hooks in menopause) |
| AI animated character (green screen) | #2 (menopause mechanism), #5 (menopause symptoms), #11 (GLP-1 sardonic) |
| 30-day timelines | #1, #14 |
| Math problem technique | #4 (stack replacement), #12 (calorie math) |
| Micro-details sell the story | #3, #8 (narrative scripts) |
| Competitive positioning without brand names | #6 body beat, #15 body beat |
| Specificity everywhere | All 15 (batch-level) |
| "How To" hook tactic | #9 Hook A (highest hold rate tactic in data) |
| Different visual per hook variation | All 15 (batch-level — triples visual testing surface) |

**Not deployed (by design):**
- Green screen with real creator (no shooting except #9)
- Micro-testimonial / celebrity format (no creator)
- Product-aware angle (AppLovin = cold traffic, but worth noting for future)

---

### Remaining Gap

- **No product-aware angle.** Top spenders #3, #7, #15 (all images, product-aware) have strong ROAS (0.84-1.02). The batch is 100% problem/solution-aware. Makes sense for cold AppLovin traffic, but worth revisiting if menopause retargeting data shows returning users.

---

---

## Script Critique (Post-Draft) — Round 1

All blocking issues and most quality issues from Round 1 have been applied. See Process Log in the Working Document for the full list of fixes. Remaining unfixed items carried into the orchestrator fix pass:

- **#2:** No specific failed alternatives named (only "single-ingredient supplements" generally — needs named alternatives like magnesium, black cohosh, etc.)
- **#4:** Body 0:06-0:15 lists 8 supplements with prices in 9 seconds (~435 spm) — densest line in the batch. Needs splitting or trimming.
- **Body line density broadly:** Some scripts still have body lines above 250 spm after timestamp extension. Orchestrator to audit and fix.
- **Product bridges #1/#5 still adjacent:** "One scoop of IM8, every morning" vs. "90 nutrients in one scoop of IM8."

---

## Script Critique — Round 2 (Post-Fix)

**Date:** 2026-04-16
**Auditor:** Claude (full 25-item per-script QA + 7-item cross-batch)
**Scope:** All 15 scripts in T002 Scripts.md, post-Round 1 fixes

All 18 blocking issues from the initial Round 2 audit have been applied. Status of the minor flags after the April 16 strategist refinement pass:

---

### Per-Script Minors — Status

- ~~**#1** Hook C "DAY 1 - DAY 7 - DAY 30" caption~~ → **Fixed.** Now "BETTER SLEEP, MOOD, AND ENERGY IN 30 DAYS" (still flagged in Round 3 for VO overlap — see below).
- ~~**#2** Close VO treatment claim~~ → **Fixed.** Close rewritten to "Formulated alongside Dr. James DiNicolantonio... One scoop a day, supporting your body through menopause."
- ~~**#5** Close VO guarantee tied to outcome~~ → **Fixed.** Now "If you do not love how you feel, you get every penny back" (no health-outcome tie).
- **#5 Hook A density** — still ~285 spm. Strategist call.
- ~~**#7** Body opens ingredient-before-pain~~ → **Fixed.** Body row 1 now "Number one. Those mood swings... Saffron..."
- ~~**#7** Hook duration over 60s~~ → **Fixed.** Now ~54s.
- **#9** Hook B caption "RESEARCHERS WERE SHOCKED" still near-verbatim with VO "surprised even the researchers." Rolled into Round 3.
- ~~**#11** "dangerously low"~~ → **Fixed.** Now "running significantly low."
- **#13** No named failed alternatives — format-specific, no fix needed. Noted permanently.
- ~~**#14** Hook A caption~~ → **Fixed.** Now "TIRED, FOGGY, BLOATED? / WATCH WHAT 30 DAYS CAN DO."
- ~~**#15** Hook A caption verbatim VO overlap~~ → **Fixed.** Now "DOING EVERYTHING RIGHT / STILL BLOATED EVERY DAY?"

---

### Cross-Batch Minors — Status

- ~~**#2/#13 authority close VOs near-identical**~~ → **Fixed.** #13 close rewritten ("Co-founded by David Beckham with experts from Mayo Clinic and NASA...").
- **#1/#14 temporal discounting.** Same Day 1/7/14/30 cadence. Different personas — low collision risk. Monitor.
- **Failed alternative overlap.** Melatonin (#1, #5, #8), magnesium (#5, #6, #7, #8). Contexts differ. Monitor.
- **"One scoop of IM8" frequency.** Recurring CTA across #1, #4, #5, #8, #9. Dilutes impact. Watch in T003.

### Marcelos's notes:

- Free or welcome gifts should be $64 in all cases where they're mentioned
- for the references you are putting, what you want them to take in can go on the same line. You could put it as a sub-bullet point. For example, put the link in one bullet point and then in sub-bullets below it, inside that hierarchy or block, put what you want them to take from that reference specifically.
- Overall I feel like in visual direction "tone" is mostly filler and not useful to editors
- "caption style" can be divided in sub-bullet points instead of mostly long period-divided sentences. Same for edit pace when it has more than one instruction. Also for "references".

Example of how to use bullet points so it's easier to read:

### References

**Format**

- [AI Animated Character VSL (Notion)](https://www.notion.so/344522bdbdba8162bf74db329f7663bc)
    - character compositing over B-roll
    - full-frame vs. corner-box alternation
    - pacing

Now my notes on specific scripts:

### Script 1

- Hook B - On-screen captions for this are not engaging, try some pattern interrupt like "YOU DO NOT NEED TO SUFFER SO MUCH THROUGH MENOPAUSE"

### Script 2

- Make the AI character a female doctor and specify she's over 50 years old
- Hook A - On-screen captions are long, condense to "hot flashes mean your body is starving for nutrients"
- Hook B - Update to $64
- I feel like it goes in the body straight from black cohosh and evening primrose oil, not being enough into just citing magnesium. There's no transition into "Hey this is what actually works, this is what you actually need," or something like that

### Script 3

- Hook B - I modified voiceover to use the word "holistically" - verify if it's ok and a good use
- Also look at how in the body I added emojis for the bad symptoms. I added the ❌ for the misses of alternative solutions and I'm using line breaks instead of just dashes because the dashes can be confusing for the editors unless you want an actual dash in the on-screen captions. This should be a general rule for the captions in all of our scripts and I'm talking about the line breaks, specifically.

### Script 4

- hook B of the alternative call out doesn't work here because we already do the alternative calls to action in the body. We can't repeat the same strategy because it becomes redundant
- Hook C should be $64 in welcome gifts in the captions
- also the visual for hook A and the starting visual for body are the same; that is also redundant on the visual side. we need to replace the visual on hook A
- for this script I feel like the whole math thing runs too long. 20 seconds of math is too long. We should find a way to condense this into a maximum of the first 14 seconds. From there we already get into IMA having all of that plus more.
    - I could imagine doing this: instead of citing the name and the dollar amounts in the voiceover, we just show them in the on-screen captions. That should save us time and we just say the total in the voiceover, so we say "past $150/month and nothing works together"
- we also repeat that it will work together too many times in one very short script. It's redundant

### Script 5

- the body is a little redundant because we already mention saffron in one point and then mention it again. The same thing applies to magnesium. We can simplify it so it doesn't repeat itself and makes the viewer understand that IM8 contains all of that plus more

### Script 6

- by citing "I am eight" as number three, it seems as though it's part of the problem because it's part of the same list. Instead we should just replace that number three phrasing with an indication that the solution is "I am eight". Also you repeat "90 ingredients" in both the body and the close; you shouldn't be redundant. Edit the close so it's not redundant

### Script 7

- Hook A - Change to $64
- Hook B - Saying "number one might surprise you" misses the point of the curiosity gap, it should be number 3 or 4 that might surprise them so they stick until the end
- Hook C - the caption is way too long and repeats "300+ papers". Edit to "RESEARCHER HELPS WITH MENOPAUSE BREAKTHROUGH" or something similar that stays compliant
- I noticed that in the visuals during the body you cite the same things that are in the on-screen captions. We need to fix that. I like the kinetic call-out, but the on-screen captions shouldn't be repeating what's in the kinetic call-outs
- We should always say "AT 83 TIMES YOUR DAILY VALUE" or "83X YOUR DAILY VALUE", not "8,333" so it's easier to understand
- "methylcobalamin" is too complex of a word an most people won't understand it, it becomes noise instead of signal
- Same for "CFU"

### Script 8

- Hook C - opens in the voiceover in first person, then switches to third person and that doesn't make sense. just keep it in first person. Choose one and stick to it or just use third person if you feel it better matches the body

### Script 9

- Whenever you want the editors to use medical journals for B-roll and things like that, you need to look up the specific papers or links they can screenshot and use, and put those in the references. You need to do that here and wherever else you want that type of B-roll. This should be a standard rule for any brand that requires this type of footage, always.

---

## Script Critique — Round 3 (Hook Caption vs. Voiceover Audit) — ✅ Resolved

**Date:** 2026-04-16
**Status:** All picks applied to [[T002 Scripts]] on 2026-04-16. 17 captions rewritten, 14 kept as-is after strategist review.
**Scope:** All 45 hooks (15 scripts × 3 variations)
**Lens:** [[Headline & Text Hook Criteria]] — captions are mute-channel hooks. They must stop the scroll independently of the VO.

### Why this audit

Too many hook captions restated the voiceover almost verbatim. The on-screen caption is the **mute-channel hook** — when caption = VO, we waste the mute channel and underperform on cold AppLovin traffic. **Rule now codified in [[Video Script Criteria]]:** captions never repeat VO verbatim. Each hook uses two different angles — one in caption, one in VO — that compound, not echo.

### Pre-Fix Counts

| Tier | Count | % |
|---|---|---|
| ❌ Heavy overlap | 16 | 36% |
| ⚠️ Moderate overlap | 8 | 18% |
| ✅ Divergent | 17 | 38% |
| 🟦 Offer text hook | 4 | 9% |

---

### Caption Rewrites Applied

| Hook | Old Caption | New Caption (Live in Scripts.md) |
|---|---|---|
| 2C | MENOPAUSE TOOK MORE THAN YOUR HORMONES / IT TOOK YOUR NUTRIENTS | EXHAUSTED. FOGGY. AWAKE AT 3AM. |
| 3C | 51 AND GOING THROUGH PERIMENOPAUSE / FEELING BETTER THAN SHE HAS IN YEARS | PERIMENOPAUSE DOES NOT HAVE TO MEAN LOSING YOURSELF |
| 4B | I CLEARED $150 OF MENOPAUSE SUPPLEMENTS / HERE IS WHAT REPLACED THEM | STILL SPENDING $150/MO ON MENOPAUSE SUPPLEMENTS? |
| 5A | MENOPAUSE DEPLETES 10 SYSTEMS / MOST SUPPLEMENTS COVER ONE | STILL AWAKE AT 3AM TWO YEARS INTO MENOPAUSE? |
| 5B | HOW TO SLEEP BETTER DURING MENOPAUSE | WHY MELATONIN STOPPED WORKING IN MENOPAUSE |
| 6A | ❌ MAGNESIUM / ❌ BLACK COHOSH / ❌ EVENING PRIMROSE / NONE OF THEM ARE ENOUGH | MENOPAUSE DEPLETES 10 SYSTEMS / YOUR SUPPLEMENT COVERS 1 |
| 8A | IN JUST 2 WEEKS / ✅ SLEEP THROUGH THE NIGHT / ✅ NO HOT FLASH AT 3AM | MENOPAUSE STOPPED RUINING HER NIGHTS |
| 9C | MENOPAUSE BREAKS DOWN 5 SYSTEMS / WHAT HAPPENS WHEN YOU ADDRESS ALL OF THEM? | ONE SUPPLEMENT. 10 MENOPAUSE SYSTEMS. |
| 10B | MENOPAUSE BRAIN FOG IS NOT YOUR BRAIN GETTING OLD | STOP BLAMING MENOPAUSE FOR YOUR BRAIN FOG |
| 10C | FORGETTING WORDS MID-SENTENCE / YOUR SUPPLEMENTS ARE FAILING YOU | MENOPAUSE BRAIN FOG IS NOT WHO YOU ARE |
| 11C | THE SCALE SAYS YOU ARE WINNING / YOUR BODY SAYS OTHERWISE | 3 SYMPTOMS GLP-1 USERS IGNORE TOO LONG |
| 12B | GLP-1 WEIGHT DOWN / NUTRIENTS DOWN WITH IT | GLP-1 SOLVES ONE PROBLEM / CREATES 11 MORE |
| 13B | UC DAVIS / 15-25% LEAN MUSCLE LOSS ON GLP-1 | YOUR GLP-1 IS BURNING YOUR MUSCLES FOR FUEL |
| 14B | WHAT HAPPENS INSIDE YOUR GUT IN 30 DAYS | DAY 1 RESULTS WILL SURPRISE YOU |
| 14C | IMAGINE EATING WITHOUT FEAR / THAT IS DAY 30 | DAY 30: DINNER WITHOUT BLOAT |
| 15B | ❌ PROBIOTICS / ❌ ENZYMES / ❌ FIBER / NOTHING IS BEING REPAIRED | BLOATING IS A LINING PROBLEM, NOT A FOOD PROBLEM |
| 15C | YOU ARE TREATING SYMPTOMS / NOT THE CAUSE | HOLES IN YOUR GUT LINING. NUTRIENTS LEAKING OUT. |

**Kept as-is** (strategist taste call): 1A, 1C, 2A, 3A, 3B, 5C, 6B, 6C, 7B, 7C, 9B, 11A, 11B, 13C.

---

### System Fix — Stop the Revision Cycle

Three rounds of audits caught the same kind of mistake (caption echoing VO). The fix is enforcing the rule at draft time, not post-draft. Codified as system-level rules in [[Video Script Criteria]]:

1. **Voiceover is primary.** VO must match the script — that is the message the editor delivers. Write VO first.
2. **Captions are the second pass, not a subtitle.** Once VO is locked, write the caption as a standalone mute-channel hook against [[Headline & Text Hook Criteria]] — a different angle on the same beat, never an echo.
3. **Per-script self-audit before output (mandatory, blocking).** Before returning a script, the writer reads each hook's caption alone, then VO alone. If the caption is verbatim, near-verbatim, restates the payoff, or carries the same angle in different words → rewrite immediately using [[Headline & Text Hook Criteria]] core types. Do not surface for strategist review until clean.

Net effect: Round 1 should catch a handful of issues per script instead of 17+ caption rewrites batch-wide. Round 2 becomes a strategist taste pass, not a remediation pass.

### Patterns to Carry Forward

Where heavy overlap concentrated:
- **Reframe hooks** — strongest pull toward saying the same reframe in caption + VO. Caption carries the *wrong* belief or felt experience; VO carries the *corrected* belief.
- **Curiosity Gap hooks** — caption often restates the VO loop. Caption can name a specific number or proper noun that VO's question gestures at.
- **Credibility/Authority hooks** — caption restates the citation. Pick one channel for the source name, the other for the raw stat.

Caption-side hook types underused this batch (lean on these next time): VoC Hook (verbatim quote), Problem-Only (just symptom list), Conversational Question, Identity Callout.

---

## Script Critique — Round 4 (Fresh-Eyes Pass) — ✅ Resolved

**Date:** 2026-04-16
**Auditor:** Claude (main session, full criteria audit)
**Scope:** All 15 scripts post-Round 3. Treats Round 3 caption-vs-VO audit as resolved. Scans for rule drift, compliance drift, cross-batch residue, timing notation, per-line pacing, and defensibility of cited stats.

**Net verdict:** Batch is mostly clean. One blocking item (UC Davis claim/URL substantiation). A set of word-level compliance flags, pacing outliers at the hook and body line level, persistent cross-batch repetition of "One scoop of IM8, every morning" across 5 scripts (noted in Round 2, still unresolved), and timing notation inconsistencies at the hook/body boundary. Roughly 6-8 fixes before the batch ships at the quality bar.

---

### Category: Source verification (blocking)

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ❌ | VO cites "UC Davis found 15-25% lean muscle loss on GLP-1" as proof. References list 2 UC Davis URLs — the backup URL (foodandhealth.ucdavis.edu) has a headline that directly contradicts the script claim: "...does NOT result in a disproportionate loss of muscle mass or function..." Strategist must verify which UC Davis source actually substantiates the 15-25% figure, lock the correct URL, and drop the contradictory backup before shipping. | #11 Hook B VO + body row 2; #13 Hook B VO + Hook C VO + body row 2 | Video Script Criteria → Medical Journal / Study B-Roll: "Never fabricate a URL. Surface to strategist if study cannot be located." | ✅ Applied |

---

### Category: Compliance — Regulated verbs

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Banned verb "treating" appears in VO. Both instances describe competitor/alternative frameworks ("still treating each symptom alone," "every probiotic and elimination diet is treating symptoms, not the cause"), not IM8 claims. At the letter of IM8 Guardrails §3, "treat" is a prohibited drug-claim verb regardless of subject. Swap to "chasing," "patching," "covering." | #4 body row 1 VO; #15 Hook C VO | IM8 Guardrails §3 — Prohibited Terms: "Cure, Treat, Prevent, Diagnose... Use instead: support, promote, maintain, help with" | ✅ Applied |

---

### Category: Pacing — per-line syllable density

Calculated line-by-line at 250 spm target, 280 spm brisk ceiling, >300 spm rewrite.

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ❌ | Body line above 300 spm — rewrite territory. Editor cannot natural-pace 300+ without sounding rushed. | #4 body row 1 (~41 syl / 8s ≈ 308 spm), #7 body row 2 (~51 syl / 10s ≈ 306 spm), #10 body row 1 (~51 syl / 10s ≈ 306 spm) | Universal Copy Rules → Pacing: ">300 spm = rewrite" | ✅ Applied |
| ⚠️ | Hook VO above the 280 spm brisk ceiling. Hooks can run tighter than bodies but 300+ sounds crammed on cold scroll. | #3 Hook B (~40 syl / 7s ≈ 343 spm), #4 Hook A (~35 syl / 6s ≈ 350 spm), #8 Hook B (~36 syl / 7s ≈ 309 spm) | Universal Copy Rules → Pacing | ✅ Applied |
| ⚠️ | Body line on the edge at ~285-295 spm. Acceptable if editor paces well, but thin margin. | #11 body row 2 (~48 syl / 10s ≈ 288 spm); #13 body row 1 (~54 syl / 11s ≈ 295 spm) | Universal Copy Rules → Pacing | Monitor |

---

### Category: Cross-batch duplication

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ❌ | Product-bridge phrase "One scoop of IM8, every morning" repeats verbatim in 5 scripts. Cross-batch rule caps this at 2×. Flagged in Round 2 as "watch for T003" — still active in T002. Diversify: "every day," "in your morning glass," "a single scoop," "in your daily mix." | #1 body Day 30, #4 close, #6 close, #9 body row 3, #14 body Day 30 | Critique Methodology — Video → Cross-Batch Checks: "CTA structure varied. Max 2× same close phrasing across 15-script batch." | ✅ Applied |
| ⚠️ | Close proof stacks share identical openers: #2 and #9 both lead with "DR. JAMES DINICOLANTONIO + 300+ PAPERS"; #4 and #8 both lead with "80% OF USERS FELT THEY SLEPT BETTER." #2/#9 overlap is the stronger concern since both are menopause mechanism plays. Re-order or swap opener. Also: #2 caption says "300+ PAPERS," #9 says "300+ PUBLISHED PAPERS" — lock one phrasing. | #2 close vs. #9 close; #4 close vs. #8 close | Universal Copy Rules → Redundancy: "No two scripts should have near-identical close sections." | ✅ Applied |
| ⚠️ | "Melatonin" as named dismissed alternative appears in 4 menopause scripts. "Magnesium (standalone)" as named dismissed alternative appears in 4. Both above the 3-script dilution threshold. Contexts differ (sleep vs. brain fog vs. hot flashes) but the mechanical repetition weakens objection-handling. | Melatonin: #1, #3, #5, #8 · Magnesium: #5 Hook B, #6, #7 Hook A, #8 | Critique Methodology — Video → Cross-Batch Checks: "Same failed alternative in 3+ scripts dilutes." | Monitor |

---

### Category: Hook-body redundancy

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Hook C VO previews the body beat-for-beat ("Day 1, your sleep starts to shift. Day 7, the hot flashes ease. Day 30, everything changes.") — and body rows 1-4 then deliver Day 1 / Day 7 / Day 14 / Day 30 in sequence. Same preview-then-repeat pattern that was fixed on #14 Hook A in Round 2. Rewrite Hook C as teaser ("What actually changes in 30 days of filling the nutrients menopause drained?"). | #1 Hook C | Universal Copy Rules → Redundancy: "Never repeat phrasing between a hook and the body." | ✅ Applied |

---

### Category: Failed alternatives coverage (2-per-script minimum)

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Only "Melatonin" named as a dismissed alternative (Day 7 beat). Format is progression timeline — add a second named alternative in Day 7 or Day 14 (e.g., magnesium pills, hormone gummies). | #1 | Video Script Criteria → Alternative Positioning: "Mention at least 2 failed alternatives" | ✅ Applied |
| ⚠️ | Hook A names magnesium; body's numbered-reasons rows 1-4 list IM8 nutrients without dismissing named alternatives. Add "B-complex alone won't touch this" to row 2 (B12) or similar. | #7 | Same | ✅ Applied |
| 🟦 | Educational authority (#9) and GLP-1 mechanism-focused scripts (#11, #12, #13) don't lean on alternative dismissal — noted as permanent format exception in Round 2. | #9, #11, #12, #13 | Same | Resolved — intentional |

---

### Category: Timing notation (hook ↔ body boundary)

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Hooks that end at 0:07 or 0:08 sit against body row 1 timestamps that start at 0:06 — 1-2 seconds of notational overlap. Editor will handle the visual handoff but the spec is self-inconsistent. Standardize: body row 1 starts at the longest hook's end time. | #2 Hooks A+B+C (0:07-0:08 vs. body 0:06), #3 Hooks A+B (0:07), #5 all 3 hooks (0:08), #6 Hook B (0:08), #8 Hook B (0:07), #9 all 3 hooks (0:06-0:08 vs. body 0:06), #10 Hooks B+C (0:08), #11 all 3 hooks (0:08), #12 Hooks B+C (0:08), #13 Hooks B+C (0:08), #14 Hook A (0:07), #15 all 3 hooks (0:09) | Video Script Criteria → Timing & Pacing: "Timestamps must reflect real delivery time." | ✅ Applied |

---

### Category: Hook-to-body verification table accuracy

These tables exist so strategists can read hook last-VO → body first-VO adjacent and spot tone breaks. Stale rows defeat the purpose.

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Verification table Hook B last line reads "...insomnia felt like." Actual Hook B VO ends "...menopause sleep struggles felt like." Verification row is stale from a prior draft. | #8 | Brand-Specific Quality Checklist → Hook-to-Body Transition Checkpoint | ✅ Applied |
| ⚠️ | Verification table renders body's first VO as a question ("That drained, foggy feeling even when you do everything right?") but actual body row 1 is declarative ("...means that declining estrogen drags magnesium, B12, and serotonin down with it"). Update to match body. | #2 | Same | ✅ Applied |

---

### Category: Within-script hook visual variety

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Hook A ("woman at desk, hand on forehead") and Hook B ("same desk scene, rubbing temples, foggy morning light") use near-identical lifestyle setups. Hook C differs, so the base rule (C ≠ A/B) is met — but the T002 plan spec says "each Hook A, B, C gets a distinct visual treatment" (triples visual testing surface). Swap Hook B to a different frame — e.g., meeting-room blank-stare mid-sentence, or kitchen losing train of thought. | #10 | Batch Plan → "Different visual per hook variation" | ✅ Applied |

---

### Category: Persona signaling (marginal)

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Hook C VO names the symptoms ("sleep starts to shift," "hot flashes ease") but never says "menopause." Caption "BETTER SLEEP, MOOD, AND ENERGY IN 30 DAYS" also doesn't name the persona. A cold AppLovin scroll without menopause context may not ID this as their ad. Fix: add "MENOPAUSE" to the caption (e.g., "BETTER SLEEP, MOOD, AND ENERGY — 30 DAYS OF MENOPAUSE FIXED" — or similar that doesn't over-promise). | #1 Hook C | Universal Copy Rules → Qualitative Copy: "Persona in every hook, VO or caption." | ✅ Applied |

---

### Category: Offer text-hook dash format

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Offer hook displays as "$64 IN WELCOME GIFTS - ON US" with " - " dash. Batch-wide fix in Round 2 stripped " - " dash separators from multi-card captions in favor of `<br><br>`. These 4 offer captions are the remaining holdouts. Strategist call: treat as one marketing phrase (keep dash) and document the intentional exception, OR split into `$64 IN WELCOME GIFTS<br><br>ON US` to match the rest of the batch. | #2 Hook B, #4 Hook C, #7 Hook A, #12 Hook C | Video Script Criteria → Multi-Card Captions | ✅ Applied |

---

### Category: Precision / source attribution

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ⚠️ | Hook B VO says "a 2025 advisory from the American Society for Nutrition confirmed it." The referenced document is a Joint Advisory co-published in *Obesity* journal (ASN is a co-publisher, not sole author). More precise: "a 2025 advisory in *Obesity*, co-published by the American Society for Nutrition" or "a 2025 ASN-backed advisory." Low-risk but challengable as imprecise attribution in a compliance-scrutinized category. | #11 Hook B | Universal Copy Rules → Specificity; IM8 Guardrails §7 — Scientific Claims | Monitor — strategist call |

---

### Cross-Batch Patterns to Carry Forward

1. **"One scoop of IM8, every morning" overused.** Recurred in 5/15 T002 scripts. Flagged in Round 2 and Round 4. Meets the 2-consecutive-batch compounding threshold if T003 doesn't lock CTA variety at Tier 1.
2. **Menopause alternative-dismissal concentration.** Melatonin and magnesium-standalone each hit 4 scripts. Objection-handling loses force when every menopause script dismisses the same two.
3. **Identical close proof openers.** "DR. JAMES DINICOLANTONIO + 300+ PAPERS" and "80% OF USERS FELT THEY SLEPT BETTER" each lead two closes. Same-proof-different-script reduces the proof's perceived breadth.
4. **Pacing outliers concentrate on numbered-reason and long-list body rows.** Scripts #4, #7, #10 all carry 300+ spm rows where long ingredient enumerations are compressed into <10s. Tier 1 writer self-audit did not catch these — the 250 spm check is nominally required but the enforcement is uneven.

---

### Promote to Global Criteria

| Proposed rule | Trigger pattern | Target doc |
|---|---|---|
| **CTA-phrase variety rule.** No exact product-bridge phrase (e.g., "One scoop of [Product], every morning") may appear in more than 2 scripts per 15-script batch. Enforced at Tier 1 (writer self-audit) and Tier 2 (orchestrator cross-script). Lock the canonical variant list in the Working Document's Script Criteria section. | 5× in T002 + flagged as monitor item across two consecutive rounds | `00 Global/Criteria/Video Script Criteria.md` → Cross-Batch Checks (add as item #4) |
| **Study source-claim substantiation rule.** When a script cites a named source ("UC Davis found X," "ASN advisory confirmed Y"), the URL in References must resolve to content that directly substantiates the exact claim. Writer sub-agent must spot-check URL ↔ claim alignment before returning — not just that a URL exists. Fabrication + unchecked attribution drift are both blocking. | UC Davis URL/claim mismatch surfaced in Round 4 (backup URL contradicts the VO claim) | `00 Global/Criteria/Video Script Criteria.md` → Medical Journal / Study B-Roll (strengthen existing section) |
| **Hook-body preview redundancy rule.** Hook VO must not enumerate the body's milestones in the same order the body delivers them. Teaser hooks allowed ("what happens in 30 days"), beat-by-beat previews disallowed ("Day 1 X. Day 7 Y. Day 30 Z."). Rule already applied to #14 Hook A in Round 2 via strategist fix — formalize so every writer catches it at Tier 1. | Fixed on #14 Hook A in Round 2; same pattern surfaced on #1 Hook C in Round 4 — recurring across 2 items in the same batch | `00 Global/Criteria/Video Script Criteria.md` → Hooks (add under "Problem-first hooks must bridge to solution") |
| **Per-line pacing enforcement.** 250 spm target / 280 brisk / >300 rewrite is already in Universal Copy Rules — but 3 body lines shipped above 300 in T002. Strengthen the Tier 1 self-audit step to require explicit syllable count on the longest body row of every script before returning. Zero tolerance for >300 spm body lines. | 3 blocking pacing violations across 3 scripts in T002 | `00 Global/Criteria/Video Script Criteria.md` → Quality Checklist (expand item #1 into a per-line check, not just total-duration) |

---

## Script Critique — Round 5 (Spoken Cadence Audit)

**Date:** 2026-04-16
**Auditor:** Claude, prompted by strategist after #7 rewrite still read robotic.
**Scope:** All 15 scripts. Lens: does every VO line sound like something a person would actually say out loud, or is it a string of noun-phrase fragments glued together?

### Why this audit

The existing Round 4 fix pass on Script #7 stripped "IM8" repetition but left the body in telegraphic fragment form ("Those mood swings. Saffron at 30 milligrams. Anything less..."). Strategist flagged the line as un-speakable — "people don't speak like that." The persuasion engine is broken when the viewer hears noun phrases stacked without connective tissue: no one actually talks that way, so the ad stops sounding like a person and starts sounding like a PowerPoint.

This rule is **already in the global criteria** at [[Universal Copy Rules]] lines 16-19:
- "Lines must flow like natural speech. Use connectors: 'but,' 'then,' 'and finally,' 'because.' Choppy standalone statements feel scripted."
- "VO must sound spoken, not written."
- "Every mechanism claim needs a 'so that' or 'because' connector explaining WHY the viewer should care."

The rule existed. The writer (Claude, main session) did not apply it in the Round 4 fix. Round 5 catches the gap and re-fixes.

### Pattern

**Broken (noun-phrase stack, no connectors):**
> Those mood swings. Saffron at 30 milligrams. Anything less and it barely supports your serotonin.

**Fixed (bridged with because / means / so / that's):**
> Number one, mood swings. You need saffron at 30 milligrams, because anything less barely supports your serotonin.

The bridge is a subject + verb + connector ("you need X because Y") that turns a list of noun fragments into an actual sentence someone would say on camera.

### Findings

| Severity | Finding | Affected | Linked Rule | Status |
|---|---|---|---|---|
| ❌ | Body VO reads as a stack of orphan noun-phrase fragments. No connective tissue ("because," "so," "that means," "and that's why"). Line cannot be delivered on camera without sounding scripted. | #7 body rows 1-4 | Universal Copy Rules → Voice & Flow (lines 16-19) | ✅ Applied |
| ⚠️ | "Saffron for mood. Magnesium for sleep." — two orphan prepositional fragments mid-VO. Bridge with a colon or conjunction. | #3 body row 2 | Same | ✅ Applied |
| ⚠️ | "Saffron for serotonin. Magnesium so your brain calms down enough to think clearly." — second sentence bridges itself, first is an orphan. Merge into the list with a conjunction. | #10 body row 3 | Same | ✅ Applied |
| ⚠️ | "Better digestion. More energy. Sharper thinking." — three pure noun-phrase fragments at the Day 30 beat. Reads as a caption, not a VO. | #14 body Day 30 | Same | ✅ Applied |
| ⚠️ | "One daily scoop. Built for what menopause actually depletes." — participle fragment orphaned from its subject. Comma-merge or add subject. | #5 body row 3 | Same | ✅ Applied |

Scripts audited and cleared this round: #1, #2, #4, #6, #8, #9, #11, #12, #13, #15. Fragment-style lines in those scripts (e.g., #3 row 3 "Not from a dozen bottles. From one scoop, every morning") kept intentionally — contrast fragments ("Not X. But Y.") are a recognized cadence when they carry emphasis, not a telegraph.

### Promote to Global Criteria

| Proposed rule | Trigger pattern | Target doc |
|---|---|---|
| **Noun-phrase fragment stacking rule.** No VO line may contain more than one consecutive standalone noun phrase without a linking verb. "Mood swings. Saffron at 30 mg. Anything less and..." is a violation; "Mood swings — you need saffron at 30 mg, because anything less barely supports serotonin" is correct. Add a concrete before/after example to Voice & Flow so the rule lands with writers. Enforced at Tier 1: writer must read VO aloud before returning. | 5 lines across 5 scripts in T002 shipped in fragment form despite the rule existing. Tier 1 did not catch it. | `00 Global/Criteria/Universal Copy Rules.md` → Voice & Flow (expand lines 16-19 with concrete example) |

---

## Round 4 Resolution (Fix Pass)

**Date:** 2026-04-16
**Applied by:** Claude (main session, per strategist directives)

**Strategist overrides applied before fix pass:**
- **CTA-phrase variety rule — dropped.** Strategist: "each CTA can easily be used 5 times or more if it's good." No diversification of "One scoop of IM8, every morning" across #1, #4, #6, #9, #14. Promotion to global criteria dropped.
- **"One scoop of IM8" 5-script repetition — accepted.** Strategist: "it's fine for us to say one scoop of IM8 every morning in five scripts." Cross-batch finding closed as intentional.
- **UC Davis blocking — resolved with authoritative URL.** Strategist supplied `https://health.ucdavis.edu/news/headlines/uc-davis-health-examines-systemic-impact-of-glp-1based-therapies/2025/12`, which directly states "While GLP-1 drugs promote fat loss, rapid weight reduction can lead to 15–25% lean muscle mass loss." Backup URL (`foodandhealth.ucdavis.edu`, contradictory) removed from #13 Study Sources.

**Fixes applied to [[T002 Scripts]]:**

| Finding | Action | Scripts |
|---|---|---|
| ❌ UC Davis source verification | Removed contradictory backup URL from Study Sources. Primary UC Davis Health URL retained (directly substantiates 15-25% claim). | #13 |
| ⚠️ Banned verb "treating" | #4 body row 1 rewritten ("And still chasing each symptom alone"). #15 Hook C swapped to "chasing symptoms, not the cause." | #4, #15 |
| ❌ Body line >300 spm | #4 body row 1 rewritten (ingredient names moved to on-screen captions per strategist Round 2 note). #7 body row 2 rewritten (tighter phrasing). #10 body row 1 rewritten (B-complex → saffron, magnesium, gut serotonin). | #4, #7, #10 |
| ⚠️ Hook VO >280 spm | #3 Hook B VO trimmed. #4 Hook A extended to 0:08 with math-first phrasing. #8 Hook B VO rewritten with clean cadence. #11 Hook B extended to 0:09 with precise ASN attribution. | #3, #4, #8, #11 |
| ⚠️ Close proof opener collisions | #2 reordered (Beckham → DiNicolantonio → papers). #9 reordered (guarantee → DiNicolantonio → papers). #4 reordered (clinical trial → 80%). #8 reordered (NSF → 80%). | #2, #4, #8, #9 |
| ⚠️ Hook-body redundancy (#1 Hook C) | Hook C VO rewritten as teaser: "What happens in 30 days of filling the nutrients menopause drained?" Caption updated to "WHAT 30 DAYS OF MENOPAUSE NUTRITION ACTUALLY CHANGES." | #1 |
| ⚠️ Failed alternatives coverage | #1 Day 7 beat adds "and black cohosh" after Melatonin. #7 body row 2 adds "A B-complex alone will not touch this." | #1, #7 |
| ⚠️ Timing notation at hook↔body boundary | All scripts' body row 1 shifted to start at longest hook's end time. Downstream body rows and closes shifted accordingly. Durations updated in each script header (ranges +1 to +3s). | #2, #3, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13, #14, #15 |
| ⚠️ Verification table accuracy | #8 Hook B row updated to "...menopause sleep was like." #2 body-first-VO rendered as declarative to match actual body row 1. | #2, #8 |
| ⚠️ Hook visual variety (#10) | Hook B visual changed to "Meeting room. Woman mid-sentence, trailing off, searching for the word." — distinct from Hook A. | #10 |
| ⚠️ Persona signaling (#1 Hook C) | Caption now names menopause: "WHAT 30 DAYS OF MENOPAUSE NUTRITION ACTUALLY CHANGES." | #1 |
| ⚠️ Offer-text-hook dash format | All 4 offer captions converted from " - " dash to `<br><br>`. | #2, #4, #7, #12 |
| ⚠️ Precision on ASN attribution (#11) | Hook B VO rewritten to "A 2025 ASN advisory found GLP-1 users run low on iron, magnesium, zinc, D3, B12, and vitamin A." | #11 |

**Findings closed as intentional / strategist override:**

| Finding | Disposition |
|---|---|
| ❌ CTA-phrase variety ("One scoop of IM8, every morning" ×5) | Closed — strategist accepts repetition for strong CTAs. Promotion to global criteria dropped. |
| ⚠️ Melatonin/magnesium alternative concentration | Left as Monitor. No fix this round. Re-evaluate if pattern recurs in T003. |
| Monitor-tier items (#11/#13 body ~288-295 spm) | Acceptable — within brisk ceiling. |

**Still to carry into global criteria (strategist review):**
- Study source-claim substantiation rule (UC Davis incident validates the need — writer must spot-check URL ↔ claim alignment).
- Hook-body preview redundancy rule (#14 Round 2 + #1 Round 4 = recurring).
- Per-line pacing enforcement (3 >300 spm body lines shipped in T002 — needs Tier 1 audit strengthening).

