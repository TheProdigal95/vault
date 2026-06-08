# Top Spenders Analysis Template

Standard format for every ads analysis. Three mandatory lenses — **SPEND**, **CONVERSIONS**, **RETENTION** — each requiring a WHY hypothesis that connects creative choices to performance. The analysis is not a data dump — it's a diagnosis of what's working, why it works, and what that means for the next batch.

Based on best practices from IM8 T005 (Axon analysis), Elevate T005 (retention quartiles + heuristic identification), COW T003 (angle reads + split recommendations).

---

## Analytical framework

Every analysis should think in these layers:

1. **Name the engine.** Each ad has one structural or psychological mechanism that makes it work. Don't say "this ad works" — identify the single thing driving it. ("The overwhelm-then-simplify technique is the engine — list 10+ complex ingredients, make the viewer feel it's impossible alone, then present IM8 as the one-step answer.")

2. **Triangulate metrics.** Hook score, hold rate, and ROAS together tell a diagnosis. High hook + low hold = body doesn't deliver. High hook + bad ROAS = scroll-stopper that doesn't close. Read the three numbers as one story, not three data points.

3. **Separate attention from conversion.** Who clicks is not who buys. A celebrity hook can stop scrolls without converting. A young woman in an ad for 40-60 year old buyers gets engagement, not purchases. Always ask: does this creative attract the buyer or just the scroller?

4. **WHO is shown.** Demographics, profession, setting — and whether that person IS the target buyer. A nurse in scrubs on concrete floors converts for nursing shoes because she is the customer. An aspirational model in a lifestyle setting gets attention but may not close.

5. **WHAT is shown and how.** Edit pacing (2-3 second cuts vs. static), shot types (CU product vs. WS lifestyle vs. screen recording), visual disguise (Notes app, UGC selfie, native feed aesthetic vs. polished ad look). These choices drive performance — Gemini analysis is the evidence.

6. **Identify the heuristics.** Which of the 9 psychological shortcuts are firing? Name them specifically. (See [Heuristic reference](#heuristic-reference-for-analysis) below.) Layer identification — most winning ads stack 2-3 heuristics in the first 10 seconds.

7. **Read the negative space.** What's MISSING from the account is often the biggest lever. Which angles have zero creative? Which formats haven't been tested? Where is VoC language absent?

8. **Format-level reads.** Same audience, different format = different ROAS. Emotional testimonial vs. mechanism explainer vs. numbered reasons — format is a variable that drives performance, not decoration. Track which formats convert vs. which just get attention.

---

## File naming

`02 Ads Analysis/YYYY-MM-DD Top Spenders Analysis - T[###].md`

---

## Template

### Pre-write gate

Before writing ANY analysis, confirm these data sources are available. If any are missing, run the command — don't proceed without them.

| Source | Command | What it provides |
|---|---|---|
| Top creatives with share links | `motion-pp-cli pull --brand [brand]` | Ranked rows with metrics + Motion share URL per creative |
| Angle breakdown | `motion-pp-cli angles --brand [brand]` | Spend per angle, WoW%, scaling/declining state |
| Format breakdown | `motion-pp-cli formats --brand [brand]` | Creative format distribution + trending state |
| Media files for Gemini | `motion-pp-cli pull --brand [brand] --download` | Downloaded video/image files for visual analysis |

All four run automatically at batch step 2. If writing an analysis outside the batch flow, run them manually first.

### Template

```markdown
---
cssclasses:
  - table-wide
  - wide
---
# Top Spenders Analysis — [Brand] — T[###]

**Date:** YYYY-MM-DD
**Source Data:** Motion API pull — [date range], top [N] creatives
**Motion Report:** [Report Name](https://projects.motionapp.com/organization/...)
**Media Analysis:** Gemini API — [N] videos + [N] statics analyzed in full.

---

## TLDR Key Learnings

> 5-8 bullets. What changed since last analysis. What's working. What's dead. What's missing. Which heuristics and creative choices are driving results. A strategist should be able to plan the next batch from this section alone.

---

## Competitive Landscape Scan — [Date]

> Optional. Include only when the strategist asked for a competitive ad scan. Browser review + WebSearch are the workflow; do not add CLI tooling as a prerequisite.

**Competitors scanned:** [Brand A], [Brand B], [Brand C]

**Dominant copy type:** [Claim-led / mechanism-led / identity-led / mixed]
**New angles since last scan:** [1-2 lines]
**Persona coverage:** [which personas competitors appear to target or ignore]
**Market sophistication read:** [stage range + confidence, if materially affected]

**Implications for this batch:** [1-2 lines]

---

## 1. SPEND: What the Platform Is Scaling — and Why

### L7 Spend Summary

| # | Creative | Format | Spend | ROAS | CTR | CPP | Purchases |
|---|---------|--------|-------|------|-----|-----|-----------|
| 1 | [Creative Name](https://projects.motionapp.com/organization/.../creative/...) | Image | $X | X.XX | X.XX% | $X | X |

Creative names are ALWAYS markdown links to Motion share URLs. The links come from `motion-pp-cli pull` output.

### Angles Snapshot

> From `motion-pp-cli angles --brand [brand]`. Include 1-line summary of the dominant angle below the table.

| Angle | Spend | State | Ads | Winners |
|-------|-------|-------|-----|---------|

State: Scaling / Holding / Declining.

### Formats Snapshot

> From `motion-pp-cli formats --brand [brand]`.

| Format | Creative Count | Planning Decision |
|---|---|---|

### Why These Are Spending

Don't just list what's getting budget — hypothesize WHY the platform is scaling these. Connect creative choices to spend signals:

- **Format / structure:** Is a specific format getting disproportionate spend? (e.g., "Pure typographic statics get 60% of spend — processing fluency, zero production friction, and infinitely iterable.")
- **Hook mechanics:** What's stopping the scroll? Is it a visual disguise (looks like organic content), a stat, a provocation, a relatable subject?
- **Who is shown:** Does the subject match the buyer? Are the highest-spend creatives showing a specific demographic, profession, or setting?
- **Heuristics at work:** Which psychological shortcuts are firing in the first 3 seconds? Name them. (e.g., "Every scaling creative opens with framing effect — price reframed into a smaller unit.")
- **Platform reward signals:** Is the algorithm favoring a specific format, length, or engagement pattern? (e.g., "UGC selfie-style videos get lower CPMs than polished ads — platform treats them as organic.")

---

## 2. CONVERSIONS: What Actually Converts — and Why

### Top Converters (by ROAS/CPP)

| Creative | Spend | ROAS | Purchases | CPP | CTR |
|---|---|---|---|---|---|

Creative names are markdown links to Motion share URLs (same as spend table).

### High Efficiency (Best CTR, Minimum $X Spend)

| Creative | CTR | Spend | ROAS | Purchases |
|---|---|---|---|---|

Set a minimum spend threshold to qualify — surface efficiency, not noise.

### What Converts vs What Doesn't

**Converts:** [creatives/formats/angles with purchase volume]

**Gains spend, doesn't convert:** [creatives getting platform scale despite poor efficiency — the platform likes the hook, but the body or landing page doesn't close. Diagnose the gap: is it WHO is shown (wrong demo), WHAT is shown (features without objection handling), or HOW it's structured (no bridge from hook to CTA)?]

**Dead angles:** [angles/formats/personas with meaningful spend but zero or near-zero purchases. Include the spend-to-kill denominator: "Kids/Longevity — $4,697 spend, 0 purchases across 2 creatives"]

### Why These Convert

The conversion diagnosis — what separates ads that close from ads that just get attention:

- **Objection sequence:** Do converters systematically demolish barriers? In what order? (e.g., "Every converting static has payment logos + $0 down + price chunking. This is the non-negotiable conversion kit.")
- **Closing mechanism:** What's the last thing the viewer sees/hears before acting? Eligibility framing ("see if you qualify") vs. direct purchase CTA vs. social proof close?
- **Heuristic stack:** Which heuristics work together to close? (e.g., "Framing effect ($8/day) + processing fluency (one idea, one frame) + temporal discounting ('from your first dose') — three shortcuts stacked in one static.")
- **Attention-to-conversion gap:** For creatives that get spend but don't convert — is it the wrong audience (high CTR from non-buyers), wrong body (hook over-promises), or wrong CTA (too high commitment)?

---

## 3. RETENTION: What Holds Attention — and Why

### Video Performance

| Creative | Hook Score | Watch Score | Hold Rate | Thumbstop | ThruPlay | Ret 25% | Ret 50% | Ret 75% | Ret 100% |
|---|---|---|---|---|---|---|---|---|---|

Hook Score = 3-second view rate. Hold Rate = ThruPlay %. Include retention quartiles when available.

### Hook-vs-Hold Diagnosis

Per-ad tension analysis:
- **High hook + low hold** = body doesn't deliver on hook's promise. Hook is strong, script loses them.
- **Low hook + high hold** = self-filtering for committed viewers. Narrow but engaged audience.
- **High hook + high hold** = scalable. Replicate this format/structure.
- **Low hook + low hold** = dead. Kill it.

### Why These Hold

The retention diagnosis — what keeps people watching:

- **Edit pacing:** Do high-retention videos share a pacing pattern? (e.g., "1-2 second cuts in hooks, 2-3 second cuts in body — fast enough to maintain energy without overwhelming.")
- **What's being shown:** Product demos, lifestyle b-roll, screen recordings, UGC footage, text cards? Which visual content types correlate with retention?
- **Who's being shown:** Does showing a relatable subject (nurse, mom, real customer) hold better than stock or aspirational footage?
- **Audio / format mechanics:** Does a specific audio approach drive completion? (e.g., "Inspirational IG audio format drives 79% thruplay — the music carries attention through text-heavy sections.")
- **Information architecture:** Does the script create loops that force watching? (e.g., "Ranked lists hold because the viewer needs to see #1. The '500 nurses' stat creates a curiosity gap that only resolves at the product reveal.")

---

## 4. Creative Anatomy: Top Performer Breakdowns

> Only break down ads the strategist annotated in their raw notes. The spend summary table can include every ad for context — depth is limited to annotated ones.

### [Ad Name] — [Top Spender / Top Converter / Outlier]

- **Metrics:** Spend $X | ROAS X.XX | Purchases X | Hook X% | Hold X%
- **The engine:** [One sentence naming the single structural or psychological mechanism that makes this ad work. Not "this ad is good" — name the thing. e.g., "The overwhelm-then-simplify arc: list 10+ complex ingredients to create a problem (impossibly complex), then present IM8 as the one-step answer."]
- **Heuristics firing:** [Name the specific heuristics at work with WHERE they fire. e.g., "Temporal discounting in hook VO ('from your first sip'). Processing fluency in layout (one headline, one CTA, zero clutter). Framing effect in price ($58/week, not $232/month)."]
- **Hook VO:** [exact transcript]
- **Hook Caption:** [exact on-screen text]
- **Hook type:** [classification per Headline & Text Hook Criteria]
- **Structure:** [format per Format Master Base]
- **Caption style:** [per Video Script Criteria caption style taxonomy]
- **Who is shown:** [demographics, profession, setting — and whether they match the target buyer]
- **Close type:** [per Video Script Criteria close types]
- **Body scaffold:** [beat-by-beat structure summary]

#### Full 4-Column Breakdown

| Timestamp | Visual Action | Voiceover | On-Screen Captions |
|---|---|---|---|

#### Gemini Visual Evidence

> Gemini analysis feeds the engine and heuristic identification above — it's evidence for WHY the ad works, not a standalone checklist.

- **Edit pacing:** [cut frequency + how it correlates with retention. e.g., "2-3 second cuts in body keep energy high — retention barely drops through 50% mark."]
- **What's being shown per beat:** [product close-ups, lifestyle, UGC, screen recording, pain visualization, transformation — and what each visual choice does psychologically]
- **Who's being shown:** [demographics, body language, expressions — and whether viewers see themselves. e.g., "Woman ~40-55, realistic body type, calm expression, gazing up — she looks like the target customer, not a model."]
- **Visual disguise / native feel:** [how ad-like vs. organic does the creative feel? e.g., "Selfie camera, natural window light, room echo, cat in background — polished version of this would feel like a sales pitch."]
- **Caption treatment:** [font, placement, animation — and whether it contributes to the native feel or disrupts it]
- **Transition patterns:** [hard cuts, dissolves, swipes — and whether they reinforce the pacing or break attention]

[Repeat for each qualifying ad]

---

## 5. Cross-Ad Pattern Synthesis

> Don't just list what appeared — identify which creative choices correlate with which performance outcomes. This section directly feeds the Batch Plan and script Visual Direction.

### Format × Performance

[Which format types convert vs. which just get attention? Same audience, different format — what's the ROAS difference? e.g., "Emotional testimonial → 100-121% D7 ROAS. Mechanism/numbered-reasons → 37-42%. 2.5-3x difference driven entirely by format."]

### Visual Choices × Performance

[Which visual approaches correlate with better metrics? This is where Gemini evidence across multiple ads reveals patterns. e.g., "Every ad with real-customer UGC holds 25%+ better than stock footage ads. Single-take selfie videos get the highest thruplay. Product close-ups in the first 3 seconds correlate with lower hook scores (feels like an ad)."]

### Heuristic Distribution

[Which heuristics appear in the top converters? Which are absent from the account? e.g., "5 of 6 top converters use framing effect (price chunking). Zero use temporal discounting despite it working well in prior batches. Affect heuristic is absent — no ads drop the viewer INTO the experience."]

### Who Is Shown × Performance

[Does subject demographic affect conversion? e.g., "Ads showing the target buyer (40-55, realistic body type) convert. Ads showing young aspirational subjects get clicks but zero purchases."]

### What's Missing (Opportunity Gaps)

[What the account is NOT testing. Untested angles, absent formats, missing heuristics, demographics not represented. This is often the highest-value section. e.g., "No video converts at scale. VoC is barely present. No ads use temporal discounting in the hook."]

---

## 6. Decision Framework

### Replicate (with guardrails)

[What's working and should be iterated on. Name the format, angle, visual treatment, AND the creative principle to replicate — not the exact execution. Include guardrails against over-indexing.]

### Kill (with evidence)

[What's dead. Include spend + purchase data as evidence. Dead angles carry forward to the Working Document's Dead Angles section.]

### Test (gaps and opportunities)

[What's missing. Untested angles, underexplored formats, audience segments with no creative. Hypotheses about why they might work — grounded in the heuristic and pattern analysis above.]

### Split Recommendation

| Bucket | Count | What It Must Test |
|---|---|---|

### Risks / Guardrails

[Caps on overused patterns. Diversity requirements. Things to avoid over-indexing on based on this data. Format concentration risk.]

---

## 7. Carry-Forward Creative Learnings

> Named facts that compound across batches. Not recommendations — facts. Each learning connects a creative choice to a measurable outcome.

Good: "Emotional testimonial format produces 2.5-3x higher D7 ROAS than mechanism format in the same audience."
Good: "Ads using temporal discounting in the hook ('from your first sip') hold 15%+ better than identical scripts without it."
Bad: "We should try more testimonials."

- [Learning with evidence]
```

---

## Heuristic reference for analysis

When identifying heuristics in top performers, use these definitions. Layer identification — most winning ads stack 2-3 in the first 10 seconds.

### Tier 1 — Common Three

| Heuristic | Core | What to look for |
|---|---|---|
| **Scarcity** | Limited = wanted | Quantity limits, "Max 2 per customer," visible inventory counts. Quantity > time limits. |
| **Social Proof** | Crowd = safe | Review counts, "X people switched," user testimonials, visible social engagement. Humanized numbers > raw stats. |
| **Authority Bias** | Expert = trust | Doctor quotes, certifications, "clinically tested." Also triggered by confident authoritative LANGUAGE without a named expert. Boomers and institution-distrusters respond better to peer proof. |

### Tier 2 — Hidden Three (where the big numbers are)

| Heuristic | Core | What to look for |
|---|---|---|
| **Affect Heuristic** | Feels good = is good | Does the ad drop you INTO an experience, a feeling, a memory? Selling the feeling before the feature. "He put up the tent. You brought the flask." — no pitch, just the feeling. |
| **Processing Fluency** | Simple = trust | Clean layout, one message, minimal copy. If a 7-year-old can't get it in 3 seconds, it's too complex. Single headline + clean visual > cluttered ad with five bullets. |
| **Temporal Discounting** | NOW > later | Results framed as IMMEDIATE. "From your first sip," "within 24 hours," "the very first night," "by morning." The reward feels close — not someday, not a timeline of milestones, but NOW. NOT milestone cards (Day 1/7/30), NOT "30 days looks like," NOT price discounts. Put temporal language in hooks or first 10 seconds. |

### Tier 3 — Power Three

| Heuristic | Core | What to look for |
|---|---|---|
| **Salience Bias** | Different = noticed | Does the ad look different in the feed? Bright element against muted background, unexpected visual, format that breaks the scroll pattern. |
| **Goal Gradient** | Close = motivated | Progress bars, step-by-step visuals, "Buy. Wear. Achieve." — shows how close the viewer is to the result. The brain accelerates near the finish line. |
| **Framing Effect** | Same fact, different frame | Price reframed: "$0.50 per meal" vs. "$180/month." "3 sprays/day = 1 year of fragrance." Cost per use, not sticker price. Most versatile heuristic. |

### Stacking patterns

- Supplement/medical/trust: Authority Bias + Social Proof + Processing Fluency
- Urgency/offers: Scarcity + Goal Gradient + Temporal Discounting
- Emotional/lifestyle: Affect Heuristic + Processing Fluency + Salience Bias
- Value/price: Framing Effect + Temporal Discounting + Processing Fluency
- Launches: Salience Bias + Affect Heuristic + Social Proof

### Audit question

For each annotated ad: which 2-3 heuristics are firing in the first 10 seconds? If you can't name them, look harder — the top converters almost always have them.

---

## Hard rules

- **All three lenses are mandatory.** An analysis that only shows spend rankings without conversion efficiency or retention data is incomplete. If certain metrics aren't available (e.g., retention quartiles), note the gap — don't skip the section.
- **Every lens requires a WHY hypothesis.** Data tables without interpretation are not analysis. Each "Why These..." section must connect specific creative choices (who is shown, what is shown, edit pacing, heuristics, format, hook type) to the performance outcome. If you can't hypothesize why, say so — don't skip the section or fill it with generic observations.
- **Gemini visual analysis is mandatory for annotated ads.** The visual evidence (edit pacing, who/what is shown, native feel, shot types) feeds the engine and heuristic identification. Without it, the "why" hypotheses are guesswork. Gemini is the evidence — not a standalone checklist.
- **Heuristic identification is mandatory for annotated ads.** Every per-ad breakdown names the specific heuristics at work and WHERE in the ad they fire (hook, body, close, visual, caption). Use the 9 heuristics defined above. If no heuristic is identifiable, that's a finding worth noting.
- **Motion share links are non-negotiable in every table.** Every creative name in the spend summary, converters, and efficiency tables MUST be a markdown link to its Motion share URL: `[Creative Name](https://projects.motionapp.com/...)`. The links come from `motion-pp-cli pull` output — they are always available after a pull. If links are missing from the pull output, flag it; never write the table without them. CDN URLs are for download/analysis only.
- **Decision Framework drives the Batch Plan.** The "Replicate / Kill / Test" sections and Split Recommendation table directly inform concept selection in the Working Document. If the analysis doesn't produce actionable batch constraints, it hasn't done its job.
- **Dead angles carry forward.** Anything killed here must appear in the Working Document's Dead Angles section for the current and all future batches.
- **Cross-Ad Pattern Synthesis is not optional.** The per-ad breakdowns are inputs. The synthesis section identifies correlations across ads: which format types convert, which visual choices correlate with retention, which heuristics appear in converters but not in attention-only ads, which demographics in the creative match the buyer vs. just the scroller. This section directly feeds script Visual Direction and concept selection.
