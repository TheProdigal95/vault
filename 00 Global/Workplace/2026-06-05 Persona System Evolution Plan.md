# Persona System Evolution Plan

> **Purpose:** Codify the improvements surfaced from our AdCrete persona methodology review (June 2026). Covers VoC enrichment, market sophistication assessment, competitor categorization revision, creative consumption analysis, persona-level performance tracking, batch allocation formalization, ClickUp→Sheet sync, and evidence-density confidence checks. Each item includes the rationale, what changes, which docs get modified, and what needs to be built.
> **Status:** Draft v4 — revised after strategist clarification. Zero switch-mentions never auto-demote. Market sophistication uses browser-based Meta Ad Library review as the proven v1 workflow; no CLI dependency. Recent VoC Addendum is on-request only, not every batch. Creative Consumption pilot → Comfort Ortho Wear. Persona Performance requires confidence thresholds. Google Sheets sync remains paused pending tracker structure.
> **Date:** 2026-06-05
> **Origin:** Discussion comparing AdCrete's persona analysis process (YouTube walkthrough) against our current Brand Research pipeline and batch flow.
>
> **Source material:**
> - **YouTube video (transcript analyzed):** AdCrete walkthrough on persona analysis — covers persona identification, deep analysis (5Fs, awareness levels, market sophistication, buying journey, cognitive biases, objection stacks), creative consumption analysis, persona ranking (Revenue/LTV/CAC/Strategic Priority), creative allocation, underserved persona detection via VoC-vs-ad-spend gap analysis, and monthly review cadence.
> - **Notion — Persona Analysis Process:** https://adcrate.notion.site/Conducting-Persona-Analysis-Step-by-Step-Process-361d5575919580ea9f81f587b8733461 — 5-step process (Persona Identification → Deep Analysis → Creative Consumption Analysis → Persona Ranking → Creative Allocation). Includes data source list (reviews, ad comments, support tickets, post-purchase surveys, Reddit, Trustpilot, Amazon, Facebook groups, TikTok/YouTube comments, Quora, sales calls, win/loss interviews). Prompts for Parker and Claude are behind disabled toggles (not accessible on public page). Key quote: "You're looking for recurring patterns of language. Not what they say once, but what 30 different people say in 30 different ways that means the same thing."
> - **Notion — Creative Consumption Analysis:** https://adcrate.notion.site/How-to-Conduct-Creative-Consumption-Analysis-366d5575919580839c36eb879584b9f2 — 5-step methodology: (1) Pull problem-language search terms from VoC, NOT shopping language; (2) Search on platforms the persona lives on (TikTok, IG, FB, YouTube, Pinterest — prioritize platforms mentioned in VoC); (3) Sort by engagement, sample top 20-30 pieces; (4) Observe production patterns (format, production aesthetic, length, creator casting, environment, audio style, tonal register) — look for consistency not outliers; (5) Cross-reference organic patterns against competitor ad libraries to find tension between organic consumption and paid creative. Key quote: "The content with millions of views is teaching you what the persona has been trained to engage with. That's the visual grammar their eye is fluent in."

---

## 1. Summary of Changes

Nine improvements, grouped by complexity:

| # | Change | Complexity | Affects |
|---|---|---|---|
| 1 | Failed Solutions sub-bucket in Review Analysis | Low | Brand Research, Review Analysis spec |
| 2 | Desired vs Actual Transformation split | Low | Brand Research, Review Analysis spec |
| 3 | Market Sophistication Assessment — stage range + confidence | Medium | Brand Research, Brand Context, Persona Context, Batch Template |
| 3a | VoC Freshness Weighting | Low | Review Analysis quote surfacing |
| 3b | Browser-Based Competitive Ad Scan for market sophistication | Low-Medium | Batch Template, Top Spenders Analysis |
| 3c | Recent VoC Addendum (lightweight enrichment without mutating generated docs) | Low | Working Document / `00 Research/`, on-request workflow |
| 4 | Competitor Categorization Revision — market players vs positioning competitors vs customer-validated competitors | Medium | Brand Research §4.2, Positioning Ammo |
| 5 | Creative Consumption Analysis | Medium-High | Brand Research, Persona Deep Research, manual pilot first; optional tooling later |
| 6 | Persona Allocation in Batch Setup | Low | Batch Template |
| 7 | Persona Performance Tracking in Test Log | Low | Test Log format |
| 8 | ClickUp → Google Sheet Sync | High | Separate ops build, blocked on Sheet structure |
| 9 | Evidence-Density Confidence Check on persona docs | Low | Brand Research Phase 4 |

---

## 2. VoC Enrichment — Failed Solutions + Desired vs Actual

### 2.1 Failed Solutions Sub-Bucket

**Rationale:** We capture competitor weaknesses from competitor 1–3★ reviews (Positioning Ammo) and pain points from own-brand reviews. But we don't systematically extract what customers tried *before* this brand and *why those failed* — from the brand's own positive reviews. This is different data: it's the customer's prior journey framing ("I tried everything — X, Y, Z — nothing worked until..."). Directly usable in hooks, body copy, and it's a proxy for market sophistication.

**Sources:**
- Own-brand reviews — where customers describe prior journey (all ratings, but especially 4–5★ where they contrast current satisfaction against past failures)
- Competitor 1–3★ reviews — where customers describe what failed (already scraped)
- Filter: skip logistics complaints (shipping, packaging, customer service). Keep only product/service/outcome failures.

**What changes:**
- `00 Global/Process/Brand Research.md` §10.5 Review Analysis spec: Add **"Failed Solutions"** as a sub-section under Pain Points (bucket 6). Format:
  ```
  #### Failed Solutions
  What they tried before, why it failed, and how they describe the failure.
  - Named brand/product alternatives (count: how many per review on average)
  - Category-specific vs cross-category alternatives
  - Failure framing: outcome-level ("didn't work") vs mechanism-level ("wrong form of magnesium")
  - Quotes with review_id
  ```
- Downstream handoff addition: Failed Solutions → hook material ("I tried everything"), market sophistication Signal 1 input, competitor wedge language

**Build required:** None. Data exists in current review corpus. Analysis prompt addition only.

### 2.2 Desired vs Actual Transformation

**Rationale:** Our Transformations bucket (bucket 9) captures post-purchase outcomes. But pre-purchase aspirational language — "I just wanted to wake up and not feel like garbage" — is different from post-purchase confirmation — "I actually wake up feeling human now." Both are useful for different parts of the ad. Desired feeds the hook/problem section (speak to what they want). Actual feeds the proof/close (show what they got).

**What changes:**
- `00 Global/Process/Brand Research.md` §10.5 Review Analysis spec: Split Transformations (bucket 9) into two sub-sections:
  ```
  #### Desired Transformation (pre-purchase)
  What they hoped for, in their own words. From "I was hoping...", "I just wanted...", 
  "All I needed was...", "If I could just..." language. Aspirational, not yet validated.
  
  #### Actual Transformation (post-purchase)
  What changed after purchase. The specific result, the emotional shift, how they 
  describe it. Validated by experience.
  ```
- Downstream handoff update: Desired Transformation → hook/problem framing; Actual Transformation → social proof, close, authority

**Build required:** None. Prompt refinement only.

---

## 3. Market Sophistication Assessment

### 3.1 The Concept

Market sophistication (Eugene Schwartz) is a separate axis from buyer awareness. Awareness = where the *prospect* is. Sophistication = where the *market* is. Same prospect, same awareness level, completely different copy depending on how crowded the claims landscape is.

| Stage | Market state | Copy strategy implication |
|---|---|---|
| 1 | First or near-first in market | Simple, direct claim. Name the benefit. |
| 2 | Competitors exist, claims still work | Sharpen the claim and make the outcome more specific. Do not inflate unsupported claims. |
| 3 | Claims crowded | Introduce a mechanism — HOW it works. |
| 4 | Mechanisms copied | Elaborate mechanism + proof stack, evidence-qualified and compliance-safe |
| 5 | Everything has been said | Identity, story, belonging — "for people like you" |

### 3.2 Assessment Signals

Three primary signals, one confirming. Revised after discussion — claim skepticism dropped (demographic skew makes it unreliable), mechanism literacy demoted to confirming only (too sparse in most review corpora to be a primary signal). The output is a **stage range + confidence + copy implication**, not a fake-exact label.

**Signal 1 — Alternative Awareness (from reviews, date-aware)**
- What % of reviews mention trying alternatives at all?
- Are alternatives same-category (stage 3+) or cross-category (stage 1-2)?
- Are they named by brand or generic?
- Is this increasing over time? (recent 6 months vs older reviews)
- **Reliability:** High. Most reviewers naturally mention prior attempts. No technical language required.
- **Data source:** `reviews.jsonl` — already collected. Failed Solutions sub-bucket (§2.1) feeds this directly.

**Signal 2 — Competitor Ad Copy Patterns (from Meta Ad Library browser scan)**
- What type of claims dominate across competitor ads?
- Simple benefit → sharper claim → mechanism → elaborated mechanism + proof → identity/story
- **Reliability:** High. Directly observable from ad copy.
- **Data source:** Browser-based Meta Ad Library scan of top positioning competitors + keyword search across the broader market (§3.5).

**Signal 3 — Competitor Density (from intake + Ad Library keyword search)**
- How many brands are actively advertising in this solution space?
- How differentiated are their claims, or is everyone saying the same thing?
- Uses the broader "market player" view (see §4 Competitor Categorization Revision), not just direct competitors.
- **Reliability:** High. Countable.
- **Data source:** Phase 0 intake + Meta Ad Library keyword search.

**Signal 4 — Mechanism Literacy (confirming only)**
- How technically do happy buyers describe why the product works?
- Outcome language ("works!") vs ingredient naming ("magnesium glycinate") vs formulation comparison ("chelated form, 3x absorption")
- **Reliability:** Low as primary signal — most reviewers don't write this way. Valuable when present.
- **Role:** If Signals 1, 2, and 3 point to stage 3, and Signal 4 shows technical language in even a small minority of reviews, confidence in stage 3-4 increases. Absence of Signal 4 doesn't lower the assessment — it just means the signal was silent.

**Stage determination:** Weight Signals 1, 2, and 3 directionally. If two of three point to the same level, output that level as the center of the range (e.g. `Stage 3, medium confidence` or `Stage 3-4, medium-high confidence`). Signal 4 can nudge the range ±1 if present. When signals conflict, document the conflict — it's an insight (e.g., competitor ads are at stage 4 but buyers are at stage 2 → opportunity for simpler copy).

**Output rule:** The useful artifact is not the stage number by itself. It is:
- `Stage range:` [1 / 2 / 3 / 3-4 / 4 / 5]
- `Confidence:` [high / medium / low], with why
- `Copy implication:` [claim / sharper claim / mechanism / elaborated mechanism + proof / identity-story]
- `Known tension:` [where review language and competitor ad language disagree]

### 3.3 Where It Lives

- **Brand Context** gets a new `## Market Sophistication Assessment` section — the brand-level baseline. Written during Phase 4 deep synthesis (new track 4h). Includes per-signal evidence, stage range, confidence, and copy implication.
- **Persona Context** gets a one-line modifier per persona only when a specific persona's data materially diverges from the market baseline. Example: "The Desperate Heavy Sleeper has tried 4.2 alternatives on average vs the market's 2.3 — treat as stage 4 copy even though the brand baseline is stage 3-4."
- **Batch Plan** references the sophistication level when choosing copy strategy per concept. Not a new column — just a consideration the strategist factors into the "Key Mechanism" and "Persuasion Techniques" columns.
- **Part 5 Ad Angles** gets a new field per angle: `Market sophistication response: [Claim / Sharper claim / Mechanism / Elaborated mechanism + proof / Identity-story]` — tells the script writer what kind of proof or framing the copy needs to deploy for that angle.

### 3.4 Refresh Cadence

Market sophistication shifts slowly (months to years). Full re-assessment at:
- Brand research refresh (`--refresh=full` or `--refresh=brand`)
- Start of a new batch cycle IF the last assessment is >90 days old
- Light re-assessment (Signal 2 only — competitive ad scan) when the strategist asks for it

### 3.5 Current Workflow: Browser-Based Competitive Ad Scan

Signal 2 and the broader market scan for Signal 3 use browser-based Meta Ad Library search. This is the v1 workflow, and it is considered proven enough for market-sophistication assessment as long as source details are captured.

**What the browser workflow does:**
- Search Meta Ad Library by keyword(s) — e.g., "GLP-1 weight loss," "menopause supplement," "daily greens"
- Capture active advertisers, visible ad copy, claim type, and source URL / search date
- Open the top 2-3 positioning competitors' Ad Library pages and classify dominant copy type from active ads
- Save screenshots or source links when a claim-landscape read materially affects the assessment

**Implementation rule:** Do not add command-line tooling as a prerequisite for this workflow. The browser review is the workflow.

### 3.6 Date-Aware Review Analysis

**Rationale:** Review dates tell us market trajectory — is sophistication increasing, stable, or (rarely) decreasing? Also reveals persona emergence/decline and product change impacts.

**What changes:**
- `00 Global/Process/Brand Research.md` §10.5 Review Analysis: The persona frequency table splits by time period:
  ```
  | Persona | % All Reviews | % Last 6 Months | Last 6 Months N | Trend |
  |---|---|---|---|---|
  | Pill Fatigue Simplifier | 22.1% | 28.3% | 184 | Growing |
  | Energy Seeker | 18.7% | 14.2% | 92 | Declining |
  ```
- Failed Solutions sub-bucket (§2.1) also reports recent vs older alternative-mention rates — this is Signal 1 for market sophistication.
- **Persona Summary** (§11 in Brand Research) inherits the trend column so the strategist sees it at a glance.

**Build required:** Minimal but must be report-safe. The `date` field exists on every review. The persona-counter tool needs a recency report mode that computes a filtered table without writing a partial tagged JSONL over the canonical corpus. Frequency table rendering needs the split, plus recent-period sample size (`N`) so small recent windows are not over-interpreted.

### 3.7 VoC Freshness Weighting

**Rationale:** Date-aware frequency tables (§3.6) tell us which personas are growing or declining. But we also need recency awareness on *which quotes* get surfaced for creative use. A 2021 review quote used in a 2026 ad risks referencing an outdated product, offer, or market state.

**Rule:** When surfacing quotes for Part 5 Ad Angles, Standout Language (bucket 10), and Transformations (bucket 9):
- Prefer quotes from the last 12 months
- Quotes older than 12 months are still usable but flagged with the review date so the strategist can judge relevance
- Quotes referencing specific offers, pricing, or product formulations that may have changed are flagged as "verify current" regardless of age

This doesn't mean old quotes are bad — some pain language is timeless ("I was taking 12 pills a day"). But outcome language and product-specific claims age faster. The flag lets the strategist decide, not the pipeline.

### 3.8 Competitive Ad Scan (On-Demand)

**Rationale:** Market sophistication (§3.1) and the competitive claim landscape shift over time. A full pipeline re-run is too heavy for every batch, but a periodic scan keeps the strategist aware of what competitors are doing now.

**Trigger:** Strategist asks for it — not automatic at every batch start. Mandatory during full brand research and `--refresh=brand`.

**What it covers:**
1. Open Meta Ad Library for the top 2-3 positioning competitors using browser search / page URLs
2. Classify the dominant copy type across their active ads: claim-led / mechanism-led / identity-led
3. Note any new angles, formats, or personas being targeted that weren't present in the last scan
4. Note any significant volume shifts (a competitor going heavy on a persona we're not targeting)
5. Save source URLs, search terms, search date, and screenshots when a market-read depends on a specific result

**Output:** A short section in the Top Spenders Analysis doc (or appended to the Working Document's Raw Notes if there's no Top Spenders Analysis for this batch):

```markdown
## Competitive Landscape Scan — [Date]

**Competitors scanned:** [Brand A], [Brand B], [Brand C]

**Dominant copy type:** Mechanism-led (70% of ads across all three)
**New angles since last scan:** Brand A testing identity/community ("the [product] movement")
**Persona coverage:** All three heavily targeting [persona]; none targeting [persona]
**Market sophistication read:** Stage 3-4, medium confidence, stable since last assessment

**Implications for this batch:** [1-2 lines — e.g., "mechanism copy is table stakes; 
differentiate on proof stack or identity angle"]
```

**The output feeds both the Batch Plan and any market sophistication re-assessment. Future automation is optional, not required.**

### 3.9 Recent VoC Addendum — Lightweight Enrichment Without Mutating Generated Docs

**Rationale:** Persona docs are effectively static between full pipeline re-runs. New reviews, ad comments, Reddit threads, and support tickets accumulate between batches but don't make it into Persona Context or Persona Deep Research until someone runs `--refresh`. The transcript emphasized this should be a "living breathing document." The constraint: generated Persona Context must remain traceable to the `_data/` source files and safe to regenerate.

**Lightweight enrichment process (only when the strategist asks for it, before writing the Batch Plan):**
1. Scan recent reviews (last 30-60 days) for notable new VoC — pain language, trigger moments, or transformations that aren't already captured in Persona Context
2. If any stand out, add them to a **Recent VoC Addendum** table in the Working Document, or to `00 Research/Recent VoC - [Brand].md` if the signal should persist across multiple batches
3. If a new pain cluster or sub-pain is emerging, note it in the Working Document's Raw Notes for the strategist to decide whether it warrants a `--refresh=reviews` re-run

**Format:**
```markdown
| Persona | Quote | Source / review_id / date | Why notable | Use in this batch? | Refresh trigger? |
|---|---|---|---|---|---|
```

**What this is not:** A full re-run. No dictionary revision, no re-classification, no frequency table update, and no direct edits to generated Persona Context. Just: "here are 3 new review quotes that are too good to wait for the next refresh." The persona-counter numbers and precision scores are left alone — they only update on a full re-run.

**Promotion rule:** If a recent VoC pattern recurs across multiple new reviews, comments, or support tickets, promote it from the addendum to a `--refresh=reviews` trigger. It should enter canonical Persona Context through the pipeline, not by manual patch.

**Cadence:** On request only. Do not run ad hoc Recent VoC enrichment every batch.

---

## 4. Competitor Categorization Revision

### 4.1 The Problem

The current gate (§4.2 in Brand Research) was built for Positioning Ammo — "who should we position against in ads?" But we now need it to serve three different purposes:

| Purpose | What matters | Current gate fit |
|---|---|---|
| Positioning Ammo (ad counter-angles) | Customer considers them + failures are relevant to our buyer | Decent — designed for this |
| Market Sophistication (claim landscape) | Anyone making claims in this space, regardless of price | Too narrow — price gate excludes market players |
| Customer Consideration Set (who the buyer compares against) | Plausible substitution evidence; switch-mentions, Reddit comparisons, comments, surveys when available | Under-captured — Test 3 is useful but too sparse to define the set |

### 4.2 Proposed Revision

**Core correction:** most customers do not name other brands in reviews. Some will, but most won't. So switch-mentions should upgrade confidence when present, not decide whether a competitor matters.

Replace the single "direct competitor" gate with three named sets:

| Set | Criteria | Use |
|---|---|---|
| Market Player | Active in the same solution / claim landscape, even if not the same exact buyer pain | Market sophistication, claim crowding, format landscape |
| Positioning Competitor | Plausibly solves the same pain or job for the same buyer. Evidence can be homepage positioning, ad copy, category search behavior, Reddit/comment comparisons, surveys, support tickets, strategist judgment, or price relationship. Switch-mentions are helpful but not required. | Positioning Ammo, counter-angles, competitor wedges |
| Customer-Validated Competitor | A positioning competitor that also appears in switch/comparison language from reviews, comments, Reddit, surveys, or support tickets | Highest-confidence Positioning Ammo; strongest "used to use X" language |

**Change Test 2 from a binary gate to a descriptive field.** Price tier stops being pass/fail and becomes a relationship descriptor:

| Old | New |
|---|---|
| "Is the price within ±50%?" → pass/fail | "What's the price relationship?" → cheaper / similar / premium |

The competitor can stay in the Positioning Ammo set regardless of price tier if it is a plausible solution to the same pain/job. The price relationship informs *what kind* of counter-angle is appropriate:
- Cheaper competitor → quality/formulation positioning
- Similar competitor → mechanism/differentiation positioning  
- Premium competitor → value/accessibility positioning

**Add confidence labels inside Positioning Ammo:**

| Confidence | Evidence |
|---|---|
| High | Same pain/job + switch/comparison evidence OR repeated third-party comparisons |
| Medium | Same pain/job + strong positioning/ad-copy overlap + plausible price relationship |
| Low | Same broad pain space but weak evidence that buyers would substitute directly |

**Rule:** Switch-mentions upgrade confidence. Absence of switch-mentions does not disqualify and must never auto-demote a competitor.

**Market Players are separate.** These aren't always "competitors" in the ad-positioning sense — they're brands cluttering the same market, making claims that raise the sophistication bar for everyone. The strategist doesn't need Positioning Ammo against every Market Player, but their ad copy needs to be scanned to assess how crowded the messaging landscape is.

### 4.3 What Changes in the Docs

- `00 Global/Process/Brand Research.md` §4.2: Replace the two-test gate + switch-mention signal with the three-set model: Market Players, Positioning Competitors, Customer-Validated Competitors.
- `Positioning Ammo` structure: Add confidence label, evidence basis, and price relationship to each competitor header.
- Phase 0 intake prompt: Strategist still names likely positioning competitors. Market Players can be surfaced automatically through browser-based Ad Library keyword search (§3.5) — no strategist nomination needed.

---

## 5. Creative Consumption Analysis

### 5.1 The Concept

Understanding what organic content each persona already consumes on TikTok, YouTube, Instagram, Facebook, and Pinterest — not ads, but the creators and formats they naturally engage with. The content with millions of views is teaching you what the persona has been *trained* to engage with — that's the visual grammar their eye is fluent in. This tells us how to blend into their feed, which is a different input than "what's working in our ad account."

### 5.2 What to Look For

Don't pre-constrain the observation categories. The point is to describe what you actually see, then let patterns emerge across 20-30 videos. That said, the kinds of things that matter include:

- Who the creator is — age, energy, how they present themselves, whether they come across as a peer, expert, or regular person sharing their experience
- How it's made — phone or produced, one take or edited, lighting, setting/environment, graphics or text overlays
- Audio — talking to camera, voiceover, trending sound, music, original audio
- Emotional tone and mood — not from a dropdown, but described naturally ("vulnerable and confessional, like talking to a friend at 2am" is more useful than "confessional")
- Length and pacing
- What makes it stop-scroll-worthy for someone in this pain situation
- What the comment section reveals — questions, pain language, competitor mentions (pre-purchase VoC)

Look for consistency — patterns across multiple top performers, not one outlier. But also look for surprises — patterns you wouldn't have predicted (like "12 of 30 creators film in their car between errands" is a setting pattern no template would have listed).

### 5.3 How to Get the Data

**Step 1 — Generate search terms: problem language, not shopping language.**

Search the *problem* in the persona's own words, not the product category. Problem language takes you to where the persona actually lives (confessional content, tutorials, peer-to-peer advice — the stuff they watch at 11pm when they're frustrated). Shopping language takes you to comparison content and listicles, which is a different audience.

| Problem language (search this) | Shopping language (not this) |
|---|---|
| "how to get rid of dandruff" | "best dandruff shampoo" |
| "why does my scalp itch" | "dandruff shampoo review" |
| "menopause brain fog" | "best menopause supplement" |
| "I can't sleep anymore" | "sleep supplement comparison" |

Mix in simple pain phrases too — "perimenopause mood swings," "menopause bloating," "brain fog menopause." These are often how people tag their own videos, and they surface more peer/confessional content than the longer queries.

Source from the persona's VoC — pain clusters in `pain-clusters.json`, Trigger Moments (bucket 7), and Pain Points (bucket 6). Use their words, not category terms.

**Step 2 — Browse the feed, don't just scrape metadata.**

Two layers of observation:

**Layer 1 — Feed-level browsing (agent-browser).** Open TikTok/YouTube/Instagram search results for each term and scroll through the feed. This gives the visual texture — what the thumbnail grid looks like, what kinds of creators dominate, the aesthetic of the feed as a whole. This is how the strategist would experience it if they were scrolling manually, and it catches things that metadata alone misses (thumbnail styles, text overlay patterns, how polished vs raw the grid feels). Take screenshots of the feed layout for the strategist.

Platforms in order of likely density: TikTok, YouTube, Instagram, Facebook, Pinterest. If the persona's VoC mentions specific platforms ("I saw this on TikTok," "my friend sent me a Reel"), prioritize those.

**Layer 2 — Metadata capture.** While browsing, capture structured data:
- YouTube: `yt-dlp "ytsearch20:[term]" --flat-playlist --dump-json` returns view count, channel, duration, URL, description per result
- TikTok: agent-browser captures creator name, engagement count, description, date, hashtags, audio source from the search results page
- Instagram: agent-browser where accessible

Sort by engagement across all terms, deduplicate, select the top 20-30 for deep analysis. **Engagement selection:** prioritize shares (especially for private/sensitive health topics — sharing signals the content broke through the stigma barrier), then comments and likes. The most-shared content on taboo topics reveals what the persona trusts enough to pass along.

**Reproducibility log (required).** Organic feeds are volatile, so every run saves a lightweight audit trail:

```markdown
| Platform | Search term | Search date | URL / content ID | Creator | Engagement visible | Included? | Inclusion reason |
|---|---|---|---|---|---|---|---|
```

Also save feed screenshots for any platform whose visual pattern meaningfully informs the Persona Feed Profile. This prevents a later reader from treating a volatile feed impression as timeless fact.

**Step 3 — Download and analyze the top performers with Gemini.**

Download top 20-30 videos via yt-dlp (works for both YouTube and TikTok URLs). Run each through Gemini with an open-ended prompt that lets it describe what it sees:

> You're analyzing organic content that a specific audience watches when they're dealing with [persona's pain]. This is NOT an ad — it's organic content from their feed.
>
> Describe everything you observe about how this video is made and why someone would watch it:
>
> - Who is the creator? What do they look like, how old roughly, where are they, what's the setting? What's their energy — are they calm, intense, funny, clinical, vulnerable? Do they come across as a peer, an expert, a professional, or just a regular person sharing their experience?
> - How is this shot? Phone or produced? One take or edited? What's the lighting like? Any graphics, text overlays, transitions?
> - What's the audio? Are they talking to camera, doing voiceover, using a trending sound, playing music?
> - What's the emotional tone? How would you describe the mood of this video to someone who hasn't seen it?
> - Why would this get engagement? What about this specific video would make someone in [pain situation] stop scrolling and watch?
> - What does this video feel like as a viewer? Not what it says — what it *feels* like.
>
> Describe freely. Don't force categories — tell me what you actually see.

The open-ended prompt lets Gemini surface things a pre-built checklist would miss. Pattern extraction happens afterward, across the full set of analyses — not inside each individual analysis.

**Step 4 — Pattern extraction across the full set.**

After all 20-30 analyses are complete, extract recurring patterns. What shows up in 15+ of them? That's dominant. What shows up in 5-8? Secondary. What shows up unexpectedly? Flag it — those surprises are often the most valuable insight. The categories emerge from the data; they aren't imposed beforehand.

**Step 5 — Cross-reference organic patterns against competitor paid ads.**

Open the Meta Ad Library and TikTok Creative Center for the category. Compare what competitors are running in paid against the organic patterns from steps 1-4.

- If competitors are running long-form UGC with peer-aged creators and it's been live for 6+ months → that format is winning in paid for this persona
- If the top-spending competitor ads look completely different from the organic content the persona consumes → tension worth noting:
  - **Opportunity:** organic patterns haven't been translated to paid yet (we can be first)
  - **Warning:** someone already tested the organic format in paid and it didn't work

This step prevents prescribing ad formats based purely on organic patterns that may not translate to paid. It connects creative consumption analysis to the competitive ad scan (§3.8).

**Tooling — what works today:**
- YouTube search + download: yt-dlp handles both. Proven.
- TikTok search: agent-browser opens search results, captures metadata. Download via yt-dlp with the video URLs.
- TikTok/YouTube feed scrolling: agent-browser. Screenshots for strategist review.
- Video analysis: Gemini via existing `00 Global/Hermes/Tools/gemini-api/`.
- Instagram/Facebook: agent-browser for browsing, manual download for now.

**Future optional automation:** A `/creative-consumption` slash command could orchestrate the full flow — generates search terms from pain clusters, runs the searches, captures metadata, downloads top performers, runs Gemini analysis, and produces the Persona Feed Profile. The pieces exist today; the command wires them together after a manual pilot proves the workflow.

### 5.4 Output: Persona Feed Profile

A new section in `Persona Deep Research - [Brand].md` (Part 3), per persona. The format is deliberately loose — categories emerge from the data, not from a template. The first run for each brand will look different. What stays consistent is the structure: search terms → what we found → what it means.

```markdown
### Creative Consumption Profile

**Search terms used:** [problem-language terms, sourced from pain-clusters.json]
**Platforms searched:** [ordered by density for this persona]
**Sample size:** [N] top-engagement pieces analyzed
**Feed screenshots:** [links to saved screenshots of the feed grid for strategist review]

**What this persona's feed looks like:**
[2-3 paragraph narrative description of the overall feel — what the thumbnail grid 
looks like, what kind of creators dominate, how polished vs raw, what the energy is. 
Written so someone who hasn't seen the feed can picture it.]

**Dominant patterns (what showed up in 15+ of [N] pieces):**
[Bulleted list — whatever actually recurred. Don't force categories. Examples of what 
might surface:
- "18 of 25 videos: woman talking to camera in her bathroom, phone propped on the counter, 
  natural light, no edits"
- "20 of 25 videos: original audio (not trending sounds) — these creators talk, they 
  don't lip-sync"
- "15 of 25 videos: vulnerable/confessional tone — 'nobody tells you this about 
  menopause' energy"
- "12 of 25 videos: creator is 45-60, presents as a peer sharing her own experience, 
  not an expert"]

**Secondary patterns (5-8 of [N]):**
[Same format — whatever showed up less frequently but still notable]

**Surprises:**
[Patterns that were unexpected and potentially high-value. "6 of 25 creators film in 
their car between errands — this setting might signal 'real life, not performed' better 
than the bathroom setting."]

**Organic vs Paid tension:**
- Organic dominant pattern: [what the feed looks like]
- Competitor paid dominant pattern: [what competitor ads look like]
- Tension/opportunity: [where they diverge and what that means for us]

**Comment section insights:**
- Top questions viewers ask: [themes]
- Pain language in comments: [verbatim phrases — pre-purchase VoC]
- Competitor mentions: [if any]

**Implications for ad production:**
- Visual Direction should mirror: [specific elements]
- Avoid: [what would feel out of place in this persona's feed]
- Format opportunity: [organic patterns not yet seen in competitor paid]
```

**How it informs production:** The Persona Feed Profile either validates or changes what we're planning. Both outcomes are useful — validation gives confidence to commit; change redirects before production. It informs Visual Direction, creator casting, format selection, setting, audio style, and tonal register. The strategist reviews the profile before it shapes any batch and adds notes based on their own experience with the brand.

### 5.5 When to Run

- **Initial research:** Run manually on one priority persona first before adding it as a mandatory Phase 4 track. After the manual pilot proves useful (validates or changes production decisions), add full analysis during brand onboarding.
- **Refresh:** Light refresh every 3-4 batches or quarterly — re-search top pain terms, check for format/trend shifts
- **Not every batch** — organic feed patterns shift slowly. Monthly is overkill.

### 5.6 Downstream Impact

- **Visual Direction** in scripts: draws from two sources — top spenders analysis (what converts in our account) + creative consumption profile (what this persona's organic feed looks like). The first tells you what works; the second tells you how to blend in.
- **Production briefs:** can specify lighting, setting, energy level, and tonal register based on organic content patterns
- **Format selection:** informed by what's trending organically for that persona's pain topics, cross-referenced against what's working in competitor paid
- **Creator casting:** informed by creator archetype in the persona's organic feed
- **Hook style:** organic content hooks differ from ad hooks — understanding both gives a wider palette

### 5.7 What Works Today vs What Needs Building

**Works today (no build required):**
- YouTube search + metadata: `yt-dlp "ytsearch20:[term]" --flat-playlist --dump-json` — returns view count, channel, duration, URL, description. Proven.
- YouTube + TikTok download: `yt-dlp [URL]` handles both platforms.
- TikTok search + metadata: agent-browser opens search results, scrolls the feed, captures creator names, engagement counts, descriptions, dates, hashtags, audio sources.
- Feed browsing + screenshots: agent-browser scrolls and screenshots the feed grid on any platform.
- Video analysis: Gemini via `00 Global/Hermes/Tools/gemini-api/analyze-ads.js` (same pipeline as ad analysis, just pointed at organic content).
- Pattern extraction: done in the main session after all Gemini analyses return.

**What a `/creative-consumption` slash command would automate:**
The pieces above work but require manual orchestration — generating search terms, running each search, collecting URLs, downloading, running Gemini on each, then extracting patterns. A slash command would wire these steps together: take a persona name → read its pain clusters → generate search terms → search YouTube and TikTok → capture metadata → download top 20-30 → run Gemini → produce the Persona Feed Profile draft. The strategist's role stays the same: validate and annotate. Do not build this before one manual pilot has proven the workflow produces useful, non-obvious production guidance.

**Not needed yet:**
- YouTube Data API (yt-dlp search is sufficient for now)
- Dedicated TikTok CLI (agent-browser handles TikTok search)
- Instagram/Facebook scraping CLIs (manual browsing via agent-browser is fine given lower volume)

---

## 6. Persona Allocation in Batch Setup

### 6.1 What Changes

Add a **Persona Allocation** section to the Batch Setup block in the Working Document template (`00 Global/Process/Batch Template.md`):

```markdown
## Persona Allocation

| Persona | Allocation % | Concepts | Justification |
|---|---|---|---|
| Pill Fatigue Simplifier | 40% | 6 | Highest review share, gap vs ad spend — opportunity |
| Energy Seeker | 35% | 5 | Top performer in T002, scaling |
| Gut Health Seeker | 25% | 4 | Untested — strategic expansion |
```

### 6.2 How It Works Day-to-Day

1. Strategist starts a new batch. Batch Setup already has Personas listed.
2. The allocation table forces the strategist to decide: what % of this batch goes to each persona? How many concepts does that translate to?
3. The Justification column forces the *why* — grounded in the Persona Performance Summary from the test log (§7) + Persona Summary gap analysis.
4. The Batch Plan table then maps each concept to a persona, and the concept count per persona should roughly match the allocation.

### 6.3 What This Replaces

Currently: the strategist lists personas in Batch Setup and distributes concepts informally. The allocation is implicit in the Batch Plan but never declared or justified.

With this change: the allocation is explicit, justified, and traceable. "Why did we make 8 menopause ads and only 2 gut health ads?" has an answer.

---

## 7. Persona Performance Tracking in Test Log

### 7.1 What Changes

Add a **Persona Performance** section below the current test log table. Two parts:

**Cumulative View** (updated each batch):
```markdown
## Persona Performance

| Persona | Batches | Total Ads | Total Spend | Avg CPP | Best Ad | Trend | Confidence |
|---|---|---|---|---|---|---|---|
| Menopause | T001–T005 | 34 | $18,200 | $41 | Progression Timeline_01 | Stable | High |
| Gut Health | T001–T005 | 12 | $6,400 | $52 | CGI Detox_03 | Improving | Medium |
| GLP-1 | T002–T005 | 9 | $3,100 | $58 | Peptides Hook_02 | New | Medium |
| Energy | T005 | 3 | $703 | — | — | New, low spend | Low |
| Fitness | T001, T003 | 6 | $1,900 | $72 | — | Dead? | Low |
```

**Per-Batch Detail** (one table per batch, written when results come back):
```markdown
### T005 (May 18, 2026)
| Persona | Ads | Spend | CPP | Notes |
|---|---|---|---|---|
| Menopause | 8 | $4,100 | $38 | Conditional hook x Four Nutrients = top performer |
| Gut Health | 3 | $1,200 | $45 | V3 formula clone testing |
| GLP-1 | 3 | $800 | $62 | Visceral hair-loss hook showing promise |
| Energy | 3 | $703 | — | First test, too early to call |
```

**CPP = Cost Per Purchase.**

**Confidence thresholds:**
- **High confidence:** ≥5 ads and ≥$3,000 spend in the relevant read window
- **Medium confidence:** 3-4 ads or $1,000-$2,999 spend
- **Low confidence:** <3 ads or <$1,000 spend
- Do not mark a persona as `Improving`, `Declining`, or `Dead` from low-confidence data. Use `New`, `Directional`, or `Low spend` until the threshold is met.
- For mature brands, include a recent-window read (`Last 60 days CPP`) when old batch data could obscure current performance.

### 7.2 How It Works Day-to-Day

1. Main test log table stays exactly as-is — no new columns, no format change
2. When performance data comes back (via Motion or ad account), strategist fills in Learnings in the main table (qualitative, same as now)
3. At the same time, the per-batch persona detail table gets filled in (quantitative — which personas spent, at what CPP)
4. Cumulative table at the top gets updated — this is what the strategist scans when planning the next batch's Persona Allocation (§6)

### 7.3 Mapping Ad → Persona

The Batch Plan already has a Persona column per concept. When results come back, the strategist maps ad names to the Batch Plan to determine persona. This is ~5 minutes of manual work per batch. Not worth automating until volume is much higher.

**Decision: personas stay out of ad slugs.** The slug format (`Reach Digital_Brand_Category_Concept_##_T00X`) is already dense, and for non-media-buying clients the persona wouldn't carry through to the ad name anyway. The Batch Plan is the mapping layer — don't duplicate it in the slug.

### 7.4 What This Enables

The learning loop closes: Allocation (§6) → production → launch → persona performance → next allocation. Currently this loop exists in the strategist's head. Making it explicit means the data is visible and the next batch's allocation is evidence-based.

---

## 8. ClickUp → Google Sheet Sync

### 8.1 Scope

One-directional sync: ClickUp → Google Sheet. The Sheet is a client-facing tracker that mirrors production status. No reverse sync (clients may mark revision requests in the Sheet, but that doesn't flow back to ClickUp automatically — handled manually to keep it safe).

### 8.2 Flow

```
ClickUp (production status) ──→ Google Sheet (client tracker)
```

**Trigger 1 — Batch published to ClickUp:**
When the strategist runs `clickup-pp-cli load`, the CLI also creates/updates the corresponding rows in the Google Sheet. Fields: creative name, status ("In Production"), batch, assignees.

**Trigger 2 — Status change in ClickUp:**
When a task status changes in ClickUp (e.g., "In Progress" → "Review" → "Approved"), the Sheet row updates to match.

**Trigger 3 — Approved status:**
When a task reaches "Approved to share with client" (or the equivalent status), the Sheet row changes to "Shared with client" and the public asset link gets added.

### 8.3 What We Don't Handle

- Launch dates — media buyer owns that
- Performance data — not in this sheet
- Reverse sync — clients mark revisions in Sheet, strategist reads and handles manually
- Anything after launch — the Sheet tracks from briefing to launch, nothing beyond

### 8.4 Day-to-Day for the Strategist

- On batch load: `clickup-pp-cli load "Brand/T003 Scripts.md"` → tasks created in ClickUp AND rows created in Google Sheet (one command, both systems)
- Periodic sync: run a sync command ("sync tracker for IM8") which reads current ClickUp statuses and pushes updates to the Sheet
- Or: scheduled sync that runs daily/automatically

### 8.5 Build Required

- Google Sheets API integration (either added to `clickup-pp-cli` or a separate sync CLI)
- Need to understand current Sheet structure: column names, one sheet per brand vs master sheet, how batches are organized
- Authentication: Google service account or OAuth for Sheets API

### 8.6 Next Step

Before building: strategist shares the current Google Sheet structure (column layout, how brands/batches are organized, what statuses map to what) so the sync can be specced precisely.

---

## 9. Evidence-Density Confidence Check

### 9.1 What It Is

At the end of each persona block in Persona Context and Persona Deep Research, the model outputs an evidence-density assessment flagging which sections are strongly grounded in VoC data vs which required inference. This is not "the model feels confident." It is a source transparency layer.

### 9.2 Format

```markdown
### Confidence Assessment
- **High confidence (grounded in VoC):** Parts 1, 2 — 47 own-brand reviews tagged to this persona; 12 attributed quotes used directly
- **Medium confidence (pattern-inferred):** Part 4 Objections — 9 own-brand negative reviews + 14 competitor 1–3★ reviews; counter-angles are interpretive
- **Low confidence (needs strategist review):** Journey Map "Evaluation" stage — only 3 reviews describe the decision process explicitly; Market sophistication modifier — 2 competitor ad libraries scanned, no recent comment/survey data
```

### 9.3 What Changes

- `00 Global/Process/Brand Research.md` Phase 4 spec: Add Confidence Assessment as a required output section at the end of each persona block in Persona Context (§10.1) and each journey map in Persona Deep Research (§10.7).
- The assessment is generated during synthesis from explicit evidence counts and source classes. Required inputs: number of own-brand reviews, number of competitor reviews, number of cited quotes, whether a section relies on first-party site copy, whether it relies on ad-library copy, and whether any claim is inferred from sparse data.
- The strategist uses this to prioritize review time: high-confidence sections get a skim, low-confidence sections get scrutiny.

### 9.4 Build Required

None. Prompt addition to Phase 4 synthesis instructions only.

---

## 10. Implementation Plan — Edit-by-Edit

Goal: specific enough for a one-shot execution session. Each item lists the exact file, section, and content to add or replace.

### 10.1 — Failed Solutions Sub-Bucket

**File:** `00 Global/Process/Brand Research.md`
**Section:** §10.5 Review Analysis, after bucket 6 (Pain Points) content

**Add** (as a sub-section under Pain Points):

```markdown
#### Failed Solutions
What the customer tried before this brand, why it failed, and how they describe the failure.
- Named brand/product alternatives (count: how many per review on average)
- Category-specific vs cross-category alternatives ("I tried other greens powders" vs "I tried yoga and meditation")
- Failure framing: outcome-level ("didn't work") vs mechanism-level ("wrong form of magnesium")
- Quotes with review_id
- Filter: skip logistics complaints (shipping, packaging, customer service). Keep only product/service/outcome failures.

Sources: own-brand reviews (all ratings, especially 4–5★ where buyers contrast against past failures) + competitor 1–3★ reviews (already scraped at Phase 2.5).
```

**Also update** the downstream handoff table (after bucket 10):
```
- Failed Solutions → hook material ("I tried everything"), market sophistication Signal 1 input (§3.2 of Evolution Plan), competitor wedge language
```

---

### 10.2 — Desired vs Actual Transformation Split

**File:** `00 Global/Process/Brand Research.md`
**Section:** §10.5 Review Analysis, bucket 9 (Transformations)

**Replace** the current Transformations bucket description with two sub-sections:

```markdown
9. **Transformations** — Split into two sub-sections. Both use the same review corpus but surface different creative material.

#### Desired Transformation (pre-purchase)
What they hoped for, in their own words. From "I was hoping...", "I just wanted...", "All I needed was...", "If I could just..." language. Aspirational, not yet validated by experience. Appears in all ratings — in positive reviews as retrospective desire ("I just wanted to sleep through the night — and now I do"), in negative reviews as unmet expectation ("All I wanted was for my skin to clear up").

#### Actual Transformation (post-purchase)
What changed after purchase. The specific result, the emotional shift, how they describe it. Validated by experience. The more visceral and specific, the more useful.
```

**Also update** downstream handoff:
```
- Desired Transformation → hook/problem framing (speak to what they want)
- Actual Transformation → social proof, close, authority (show what they got)
```

---

### 10.3 — Evidence-Density Confidence Check

**File:** `00 Global/Process/Brand Research.md`
**Section 1:** §10.1 Persona Context spec, after the Part 5 block
**Section 2:** §10.7 Persona Deep Research spec, after the journey map template

**Add** to both sections:

```markdown
### Confidence Assessment (required per persona)
At the end of each persona block, the model outputs an evidence-density assessment. This is not a quality judgment or a model self-confidence score — it's a transparency layer so the strategist knows where to spend review time.

Format:
- **High confidence (grounded in VoC):** [sections] — cite evidence counts and source class (e.g., "47 own-brand reviews tagged to this persona; 12 attributed quotes used directly")
- **Medium confidence (pattern-inferred):** [sections] — cite what's interpretive (e.g., "counter-angles from 9 own-brand negative reviews + 14 competitor 1–3★ reviews")
- **Low confidence (needs strategist review):** [sections] — cite what's thin (e.g., "only 3 reviews describe the decision process explicitly; no recent comment/survey data")
```

---

### 10.4 — Persona Allocation Table in Batch Setup

**File:** `00 Global/Process/Batch Template.md`
**Section:** Inside the Working Document template, after `**Concepts per persona:** [number]`

**Add:**

```markdown
---

## Persona Allocation

> Declare the split before the Batch Plan. Justification grounded in Persona Performance (test log) + Persona Summary gap analysis. This is the "why this split" record.

| Persona | Allocation % | Concepts | Justification |
|---|---|---|---|
```

---

### 10.5 — Persona Performance Section in Test Log

**File:** `00 Global/Process/Batch Template.md` (add guidance on what goes in test logs)
**Where:** After the Batch Critique template section, add a new section:

```markdown
## Test Log — Persona Performance Section

Below the main test log table (which stays unchanged), add a **Persona Performance** section with two parts:

**Cumulative View** — one table, updated each batch, showing all-time persona performance. This is what the strategist scans when planning the next Persona Allocation.

**Per-Batch Detail** — one sub-table per batch, written when performance data comes back. Maps ads to personas using the Batch Plan's Persona column.

Personas stay out of ad slugs. The Batch Plan is the mapping layer. Mapping ad → persona when results come back is ~5 minutes of manual work per batch.

See the Persona System Evolution Plan §7 for the exact table format.
```

---

### 10.6 — Competitor Categorization Revision

**File:** `00 Global/Process/Brand Research.md`
**Section:** §4.2 Direct-competitor selection rule

**Replace** the two-test gate with:

```markdown
### 4.2 Competitor categorization

**Core rule:** switch-mentions upgrade confidence. Absence of switch-mentions does not disqualify, because most customers do not name competing brands in reviews.

Use three sets:

| Set | Criteria | Use |
|---|---|---|
| Market Player | Active in the same solution / claim landscape, even if not the same exact buyer pain | Market sophistication, claim crowding, format landscape |
| Positioning Competitor | Plausibly solves the same pain or job for the same buyer. Evidence can include homepage positioning, ad copy, category search behavior, Reddit/comment comparisons, surveys, support tickets, strategist judgment, or price relationship. | Positioning Ammo, counter-angles, competitor wedges |
| Customer-Validated Competitor | A positioning competitor that also appears in switch/comparison language from reviews, comments, Reddit, surveys, or support tickets | Highest-confidence Positioning Ammo |

**Price relationship:** descriptive field, not a binary gate. Capture as `cheaper / similar / premium`.
- Cheaper → quality/formulation positioning
- Similar → mechanism/differentiation positioning
- Premium → value/accessibility positioning

**Positioning Ammo confidence label:**

| Confidence | Evidence |
|---|---|
| High | Same pain/job + switch/comparison evidence OR repeated third-party comparisons |
| Medium | Same pain/job + strong positioning/ad-copy overlap + plausible price relationship |
| Low | Same broad pain space but weak evidence that buyers would substitute directly |

Market Players are discovered via browser-based Ad Library keyword search during the market sophistication assessment (§3.8 competitive ad scan). Positioning Competitors are nominated at intake, auto-derived from switch-mentions when available, or proposed by the strategist based on positioning evidence.
```

**Also update** Positioning Ammo structure (§10.6): add set, confidence label, evidence basis, and price relationship to each competitor header.

**Also update** Phase 0 intake prompt (§4.1): strategist provides competitor name + one-line rationale confirming which pain/job it targets. Price tier is captured as a descriptive field, not evaluated as a gate.

---

### 10.7 — VoC Freshness Weighting

**File:** `00 Global/Process/Brand Research.md`
**Section:** §10.3 Part 5 Ad Angles derivation rule, and §10.5 buckets 9 and 10

**Add** to §10.3 after the sourcing rule:

```markdown
**Freshness rule.** When surfacing quotes for Part 5 angles, Standout Language, and Transformations:
- Prefer quotes from the last 12 months
- Quotes older than 12 months are still usable but flagged with the review date
- Quotes referencing specific offers, pricing, or product formulations flagged as "verify current" regardless of age
```

---

### 10.8 — Recent VoC Addendum Cadence

**File:** `00 Global/Process/Batch Template.md`
**Section:** In "The flow" section, before step 1 (or as a new step 0)

**Add:**

```markdown
0. **Recent VoC Addendum (on request, before the Top Spenders Analysis).** Only when the strategist asks for recent VoC enrichment, scan recent reviews (last 30-60 days) for notable new VoC — pain language, trigger moments, or transformations not already in Persona Context. If any stand out, add them to a `## Recent VoC Addendum` table in the Working Document, or to `00 Research/Recent VoC - [Brand].md` if the signal should persist across batches:

| Persona | Quote | Source / review_id / date | Why notable | Use in this batch? | Refresh trigger? |
|---|---|---|---|---|---|

Do **not** append directly to generated Persona Context. This is NOT a full pipeline re-run — no dictionary revision, no re-classification, no frequency table update. If a pattern recurs, mark it as a `--refresh=reviews` trigger so it can enter canonical Persona Context through the pipeline.
```

---

### 10.9 — Market Sophistication Assessment

**File:** `00 Global/Process/Brand Research.md`
**Where:** New §10.8 (after §10.7 Persona Deep Research), new Phase 4h track

**Add** new Phase 4 track:

```markdown
### 10.8 Market Sophistication Assessment

New track 4h in Phase 4 deep synthesis. Depends on: Failed Solutions sub-bucket (from 4a), competitor data (from 3b), and the browser-based competitive ad scan.

Produces a new `## Market Sophistication Assessment` section in Brand Context.

**Three primary signals, one confirming:**

**Signal 1 — Alternative Awareness (from Failed Solutions sub-bucket)**
- What % of reviews mention trying alternatives?
- Same-category vs cross-category alternatives?
- Named by brand vs generic?
- Recent 6 months vs older (date-aware)?

**Signal 2 — Competitor Ad Copy Patterns (from browser-based competitive ad scan)**
- Claim type distribution across competitor ads: simple benefit / sharper claim / mechanism / elaborated mechanism + proof / identity-story
- Captured via browser browsing the Meta Ad Library (keyword search by pain point + WebSearch to resolve competitor page URLs → browse their specific ad libraries)
- Save source URLs, search terms, search date, and screenshots when they materially affect the read.

**Signal 3 — Competitor Density (from Phase 0 intake + Ad Library keyword search)**
- How many brands are actively advertising for this pain/solution space?
- Positioning overlap across their claims

**Signal 4 — Mechanism Literacy (confirming only)**
- How technically do positive reviewers describe why the product works?
- Role: nudges assessment ±1 stage if present. Absence is not evidence.

**Stage determination:** Output a stage range + confidence + copy implication, not a fake-exact label. If 2 of 3 primary signals agree, that level becomes the center of the range. Conflicts are documented as insights.

**Output in Brand Context:**
[The assessment template from §3.2 of this plan — per-signal evidence + stage range + confidence + copy strategy implication + known tension]

**Per-persona modifier in Persona Context:**
One-line addition per persona when their sophistication diverges from the baseline: "This persona has tried 4.2 alternatives on average vs the market's 2.3 — treat as stage 4 copy even though the brand baseline is stage 3-4."

**Part 5 Ad Angles addition:**
Each angle gets a new field: `Market sophistication response: [Claim / Sharper claim / Mechanism / Elaborated mechanism + proof / Identity-story]`
```

**Also update** Phase 4 dependency list and the Phase 3 pipeline diagram to include track 4h.

---

### 10.10 — Date-Aware Frequency Tables

**File:** `00 Global/Process/Brand Research.md`
**Section:** §10.5 Review Analysis section 4 (Persona Signal Analysis) and §11 Persona Summary

**Edit** the frequency table spec to include recency split:

```markdown
| Persona | % All Reviews | % Last 6 Months | Last 6 Months N | Avg Rating | Trend |
|---|---|---|---|---|---|
```

**Build required:** Add a report-safe recency mode to `00 Global/Hermes/Tools/persona-counter/` that filters `reviews.jsonl` by the `date` field before computing frequencies, while preserving the full-corpus tagged JSONL. Output both the full-corpus and filtered tables. If recent-period N is too small to support a trend read, render `Insufficient recent sample` instead of Growing / Declining.

---

### 10.11 — Competitive Ad Scan (On-Demand)

**File:** `00 Global/Process/Batch Template.md`
**Section:** "The flow" section — add a note under step 2 (not a mandatory sub-step)

**Add:**

```markdown
**Optional: Competitive ad scan** (run when strategist asks). For the top 2-3 Positioning Competitors / Customer-Validated Competitors:
   - WebSearch "[competitor] Facebook page" to get their page URL
   - Browse their Ad Library via agent-browser (navigate to `facebook.com/ads/library/?view_all_page_id=[ID]`)
   - Also run a keyword search on the Ad Library for the brand's primary pain terms (e.g., "menopause supplement") to see the full market landscape
   - Classify dominant claim types across competitor ads: claim-led / mechanism-led / identity-led
   - Note new angles, formats, or personas being targeted since last scan
   - Output: a short "Competitive Landscape Scan" section in the Top Spenders Analysis or Working Document Raw Notes
   - Browser review + WebSearch are the workflow.
```

---

### 10.12 — Creative Consumption Manual Pilot, Then Optional Slash Command

**First step:** Manual pilot on one priority persona for Comfort Ortho Wear before creating a command.

**Manual pilot flow:**
1. Read persona name → load `pain-clusters.json` for that persona
2. Generate search terms: problem language from pain labels + triggers, plus simpler pain phrases
3. YouTube search: `yt-dlp "ytsearch20:[term]" --flat-playlist --dump-json` per term → collect metadata
4. TikTok search: agent-browser opens search results per term → scroll feed, capture screenshots, capture metadata (creator, engagement, description, hashtags, audio)
5. Maintain the reproducibility log required in §5.3
6. Deduplicate across all terms, rank by engagement, select top 20-30
7. Download top videos where accessible
8. Run Gemini analysis on each with the open-ended prompt (from §5.3 Step 3 of this plan)
9. Pattern extraction across all analyses
10. Cross-reference against competitor ads (from the competitive ad scan in 10.11)
11. Produce Persona Feed Profile draft for strategist review
12. Clean up downloaded media after analysis

**Optional command after pilot:** `00 Global/Hermes/Commands/creative-consumption.md` could automate the flow if the pilot produces useful, non-obvious production guidance and the manual steps are repetitive enough to justify a command.

**Build scope if approved:** The workflow pieces exist. Automation, if ever approved, should only orchestrate the proven manual flow after the pilot demonstrates useful, non-obvious guidance.

---

### 10.13 — Persona-Counter Recency Report Mode

**File:** `00 Global/Hermes/Tools/persona-counter/` (existing tool)

**Change:** Add `--since YYYY-MM-DD` plus a report-safe mode that computes filtered frequencies without writing a partial tagged JSONL over the canonical corpus. Output both full-corpus and filtered frequency tables, including filtered `N` per persona and an insufficient-sample flag.

**Build scope:** Small code change — add date filtering + report output mode.

---

### 10.14 — ClickUp → Google Sheet Sync

**Blocked on:** Strategist sharing the current Sheet structure (column layout, brand/batch organization, status names).

**Build approach:** Add a `sync` subcommand to `clickup-pp-cli` or build a separate `sheet-sync` CLI. Uses Google Sheets API (service account auth). Reads ClickUp task statuses via the existing ClickUp API integration, pushes updates to the Sheet.

**Build scope:** Google Sheets API integration, auth setup, status mapping.

---

### 10.15 — Data Sources — Phase 0 Intake Prompt Update

**File:** `00 Global/Process/Brand Research.md`
**Section:** §4.1 Required inputs

**Add** to the intake prompt:

```markdown
  4. Optional but high-value — does the client have any of these?
     - Post-purchase survey data (what made them buy, what else they considered)
     - Customer support ticket themes (top complaints, common questions)
     - Win/loss interview notes (why people bought, why people churned)
     Don't gate the pipeline on these. Request and incorporate when available.
```

---

## 11. Execution Order

All items are independent EXCEPT:
- 10.9 (Market Sophistication) depends on 10.1 (Failed Solutions) being in place — Signal 1 reads from the Failed Solutions sub-bucket
- 10.10 (Date-aware tables) depends on 10.13 (persona-counter recency report mode) being built
- 10.12 (Creative Consumption automation) depends on a successful manual pilot

**Recommended order for a one-shot session:**

```
Pass 1 — Brand Research.md edits (items 10.1, 10.2, 10.3, 10.6, 10.7, 10.9, 10.10, 10.15)
  All in one file. Do them sequentially top-to-bottom through the doc.

Pass 2 — Batch Template.md edits (items 10.4, 10.5, 10.8, 10.11)
  All in one file.

Pass 3 — Small build (item 10.13)
  Persona-counter recency report mode. Prerequisite for 10.10 to actually work.

Pass 4 — Manual pilot (item 10.12)
  Run Creative Consumption manually on one priority persona. Decide whether the profile produces useful, non-obvious guidance.

Pass 5 — Optional medium build (item 10.12)
  Build `/creative-consumption` only if the manual pilot proves the workflow.

Pass 6 — Blocked ops build (item 10.14)
  ClickUp → Sheet sync. Needs Sheet structure from strategist first.
```

Passes 1 and 2 are pure doc edits — could be done in a single session. Pass 3 is a quick code change. Pass 4 validates the riskiest research behavior before automation. Pass 5 is optional. Pass 6 waits on strategist input.

---

## 12. Open Questions (resolve before one-shot execution)

1. **~~Test log persona tracking for non-media-buying clients~~** — **Resolved.** We have Motion access and performance data for all clients. Persona Performance section applies to every brand.
2. **Google Sheets structure** — need the current Sheet column layout and status names before building the sync (item 10.14). **On pause** — strategist will share tracker links when ready.
3. **Recent VoC storage default** — **Resolved.** Default to the Working Document. Only create a persistent `00 Research/Recent VoC - [Brand].md` file when a signal has proven useful across 2+ batches.
4. **~~Creative Consumption — first brand to test on?~~** — **Resolved.** First pilot runs on Comfort Ortho Wear.
