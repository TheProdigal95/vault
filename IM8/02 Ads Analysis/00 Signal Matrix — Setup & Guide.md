# Signal Matrix — IM8

---

## How This Works

1. Export top 30-40 ads by spend with performance data (spend, impressions, CTR, CPA — whatever you have)
2. For each ad, paste the ad text (statics) or transcript (videos) into Claude
3. Claude tags each ad Y/N against the signal list below
4. You review the tags — override anything Claude got wrong
5. Paste the completed matrix + performance data back into Claude and ask for the analysis

The deep qualitative analysis stays on your top 8. This is the wide quantitative pass on 30-40 that lets you check correlations your taste might miss.

---

## Signal List — IM8

10 signals. Each is binary Y/N with a clear definition. Chosen based on what varies across the ad library and what you can actually brief more or less of.

| # | Signal | Y if... | Why this signal |
|---|--------|---------|-----------------|
| 1 | **Contrarian / Myth Bust Hook** | The hook challenges a belief or calls out what's wrong with alternatives ("Most supplements use forms your body can't absorb") | 24% of ads use this hook type. High variation. Actionable: you can brief hooks as contrarian or not. |
| 2 | **Question Hook** | The hook is a direct question to the viewer ("Are you taking supplements but not noticing a difference?") | 22% of ads. Mutually exclusive with contrarian — lets you compare the two. |
| 3 | **Named Authority Figure** | A specific named doctor, scientist, or athlete appears or is cited (Dr. James, Dr. Devkota, Sabalenka — not just "doctors say") | Present in some top spenders, absent in others. Tells you if authority drives performance or if the mechanism itself is enough. |
| 4 | **Specific Numbers / Dosages** | Ad cites at least one exact dosage, stat, or specific number (1,500mg MSM, 733% more B12, 85% better digestion) — not round/vague numbers | Your library analysis says specificity is the #1 credibility tactic. But does it actually correlate with performance, or is it just good practice? |
| 5 | **Stack Replacement Framing** | The ad positions IM8 as replacing multiple supplements, pills, or bottles — consolidation is the value prop | 49% of ads use this angle. High variation. Does making it THE frame outperform ads where it's secondary? |
| 6 | **GLP-1 Specific Targeting** | The ad explicitly mentions GLP-1, Ozempic, Wegovy, or weight loss medication | 8% of ads but 3 of top 8 spenders. Tells you if this segment outperforms proportionally. |
| 7 | **Loss Aversion / Fear Framing** | The ad leads with what the viewer could lose (hair loss, muscle loss, nutrient depletion, health decline) rather than what they could gain | Present in GLP-1 and some menopause ads. Absent in energy/gut. Tells you if fear outperforms aspiration. |
| 8 | **Native / Disguised Format** | The ad is designed to look like organic content, not an ad (Notes app, journal entry, casual UGC photo, editorial style) | ~10% of image ads. Your Top Spenders Analysis flagged the Notes app ad — but does this approach actually perform? |
| 9 | **Dark/Premium Aesthetic** | Visual uses the dark maroon/burgundy/black palette vs. light/warm/lifestyle palette | ~65% dark vs ~35% light based on your library analysis. Tells you if the premium look outperforms approachability. |
| 10 | **Video Format** | Is it a video ad (vs. static image) | 25% of library is video. Your top 8 had 5 videos and 3 statics. Is video actually outperforming, or are videos just getting more spend allocated? |

### Signals NOT included (and why)

- **Science / Clinical credibility** — present in 65% of ads. Not enough variation to draw conclusions.
- **"Learn more" CTA** — present in 98% of ads. No variation at all.
- **Product shown** — present in nearly every ad. No variation.
- **Long-form copy** — 94% of ads are medium or long copy. Not enough variation.

If you find a signal has no variation across your 30-40 export (all Y or all N), drop it and replace with something that does vary in that set.

---

## Step 1: Export

Pull the top 30-40 ads by spend from the ad account. Include:

```
Ad ID | Ad Name/Title | Spend | Impressions | CTR | CPA (or conversions)
```

If you can only get spend + impressions, that's fine. CTR and CPA are bonus.

Separate video and image ads if possible — their performance benchmarks are different.

---

## Step 2: Get the creative for each ad

**Static ads:** Copy the ad body text and title. That's enough for Claude to tag signals 1-8.

**Video ads:** You need transcripts. Use `/transcribe` or the Gemini prompt from the CAF guide:

```
Please analyse this video and return a structured breakdown in the following exact format.

| Section | Details |
|---------|---------|
| Video File Name | [filename] |
| Visual Transcript | [Timestamped breakdown in 15-second segments. Include: creator actions, product placement, text overlays, camera style] |
| Audio Transcript | [Full timestamped dialogue / voiceover] |
| On-Screen Branding | [All text overlays, product placements, brand mentions] |
| Call to Action | [How video ends] |
```

For signals 9-10, you need to see the ad (visual aesthetic, format). You already know these from your ad library work.

---

## Step 3: Batch tag

Paste the signal list + multiple ad texts into Claude in one message:

```
Here are my 10 content signals for IM8:
[paste signal list with definitions]

Tag each of these ads Y/N per signal. Include one-word evidence for each Y.
If uncertain, tag N and flag it.

AD 1: [title]
[paste body text or transcript]

AD 2: [title]
[paste body text or transcript]

...
```

Claude can handle 10-15 ads per message comfortably. Do it in 2-3 batches.

Review the output. Override anything Claude got wrong — you know these ads better than it does. The point is that Claude does the first pass in 2 minutes, and you correct in 5.

---

## Step 4: Build the matrix

Combine in a spreadsheet or markdown table:

```
| Ad | Spend | Imp | CTR | CPA | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 | S9 | S10 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [title] | $X | Xk | X% | $X | Y | N | Y | Y | N | N | Y | N | Y | Y |
```

---

## Step 5: Analyze

Paste the completed matrix into Claude:

```
Here is my IM8 signal matrix with performance data for [n] ads.

For each signal:
1. Split ads into Y and N groups
2. Calculate average spend, CTR, and CPA for each group
3. Calculate lift: (Avg Y - Avg N) / Avg N × 100
4. Flag any signals where Y and N groups have fewer than 3 ads each
5. Flag signals that always co-occur (can't attribute to either alone)

Then classify each signal:
- DO MORE: positive lift on spend AND CTR (or CPA)
- TEST MORE: mixed signals or thin data
- DO LESS: negative lift on both
- INCONCLUSIVE: fewer than 3 per side

Output the ranked list with lift numbers, then a brief: what to include, what to avoid, what to isolate in next wave.
```

---

## Adapting the signal list

These 10 signals are based on the current IM8 library. When you start a new brand:

1. Run your qualitative top spenders analysis first (you already do this)
2. Read your ad library breakdown (you already do this)
3. Pick 8-12 attributes that vary across the library and that you can actually brief more or less of
4. The signals should cover: hook type (2-3 signals), angle/framing (2-3), visual treatment (2-3), format/structure (1-2)

---

## For your own T001 after launch

When the 15 AppLovin scripts go live, you already have the signal definitions from your batch plan. Tag each script (5 minutes — you wrote them), attach AppLovin performance data, and run the same analysis. This makes the T001→T002 gap analysis quantitative, not just qualitative.
