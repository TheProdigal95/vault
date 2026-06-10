# Brand Research Standardization Proposal

> **Purpose:** Codify the "research a new brand from scratch" process so any strategist — or an LLM agent — can execute it end-to-end without guessing. Covers intake, review scraping, first-party whole-site scraping, ad-library read, multi-pass persona discovery, competitor scraping, and final orientation doc. Ends with an automation plan.
> **Status:** Draft v5.2 — blocker and high-priority-gap fixes on v5.1 (pain-based competitor rule replaces form-factor test, Creator-patterns cut from Persona Summary, `/ad-library --no-media` flag mandated, WebSearch as the brand-metadata source for auto-derivation, adjacent-brand handling clarified, small-corpus scaling, sparse-persona precision path, compliance-doc regex, retry-prompt template). Folder structure collapses from 5+7 to 4 context + 3 research docs. Checkpoints 1 and 2 replaced with automated gates (only Checkpoint 3 pauses for strategist review). Persona Summary absorbs Ad Library Orientation + Creative Pillar Scan. Review Analysis absorbs Review Samples + Review Scraping Status. Product Context absorbs Landing Page Analysis. Step 6 pain-based refinement is now mandatory. persona-precision tool cut (inlined as sub-agent prompt). /scrape-site cut. Target runtime: ~90 min wall clock per brand (corpus-dependent; see §3). Awaiting strategist sign-off before promoting to `00 Global/Process/Brand Research.md`.
> **Date:** 2026-04-18

---

## 1. Summary

Research is already ~80% standardized in practice but not written down. This proposal fixes five gaps:

1. **One how-to doc** — exact order of operations, exact deliverables, written down.
2. **`00 Context/` vs `00 Research/` split** — `00 Context/` holds the four docs writer sub-agents load at execution time; `00 Research/` holds the rest (preserved, not deleted, just not auto-loaded).
3. **Persona Summary as the combined scannable orientation doc** — one doc for the strategist showing persona frequency from reviews, the ad library orientation, and creative pillars. Light gap-analysis recommendation at the bottom; the strategist makes the calls.
4. **Review-backed Parts 4 and 5** — Persona Context's Objections and Ad Angles sections must cite direct review quotes. No invented objections.
5. **End-to-end automation except Checkpoint 3** — scraping coverage and persona lock are orchestrator-enforced gates with automatic loopback. Strategist only pauses at the end to review the finished output.

A new `brand-researcher` sub-agent, a `/research-brand` slash command, a Node Playwright whole-site crawler, a persona-counter tool, a review-sampler tool, and an ad-library classifier close the tooling loop.

---

## 2. Folder Structure — What Every Brand Ends Up With

Two-folder permanent structure. `00 Context/` is lean and load-on-execution. `00 Research/` is the reference back-catalog the strategist consults during planning. No archive folder — first-party scraped pages are synthesized into Brand Context + Product Context, then deleted (§14). The synthesis docs preserve the signal; the raw HTML/text would only add bloat.

Compliance/guardrails documents are not pipeline output. They come from the client directly (category-specific claim rules, banned terminology, regulatory constraints) and are placed in `00 Context/` by the strategist when received. Reddit sprints are strategist-initiated ad-hoc research, not pipeline scope.

```
[Brand]/
├── 00 Context/                         ← loaded by writer sub-agents during batch execution
│   ├── Brand Context - [Brand].md
│   ├── Product Context - [Brand].md            (absorbs Landing Page Analysis)
│   ├── Persona Context - [Brand].md            (Parts 1, 2, 4, 5 — source of truth for personas)
│   └── Persona Summary - [Brand].md            (frequency + ad orientation + pillars + light gap rec)
│
└── 00 Research/                        ← strategist consults during planning; not auto-loaded
    ├── Review Analysis - [Brand].md            (absorbs Review Samples + Review Scraping Status)
    ├── Positioning Ammo - [Brand].md           (competitor 1–3★ themes + counter-angles)
    ├── Persona Deep Research - [Brand].md      (Part 3 Journey Maps)
    ├── _data/                                  (machine-readable — sub-agents read, strategist ignores)
    │   ├── persona-dictionary.json
    │   ├── ad-library-raw.json
    │   ├── ad-classifications.json
    │   └── pain-clusters.json
    └── Reviews/
        ├── reviews.jsonl                       (brand reviews, classified) — NEVER DELETED
        ├── competitor-reviews/*.jsonl          (1–3★ only) — NEVER DELETED
        └── trustpilot-export.csv               (if used) — NEVER DELETED
```

**Pipeline scratch:** during Phases 1–4 the crawler writes raw page text to a temporary `[Brand]/raw_pages_tmp/` folder at the brand root. Phase 6 deletes the folder entirely. It never appears in the permanent structure.

**Doc inventory and load-tier:**

| Doc | Folder | Required | Role |
|---|---|---|---|
| Brand Context | Context | ✅ | Company, ICP, positioning, moats, vulnerabilities |
| Product Context | Context | ✅ | Per-product mechanism, pricing, objections, messaging, funnel architecture |
| Persona Context | Context | ✅ | Parts 1, 2, 4, 5 per persona (see §10.1) |
| Persona Summary | Context | ✅ | Frequency + ad orientation + pillars + light gap rec (§11) |
| Review Analysis | Research | ✅ | Full VoC synthesis + sampling appendices + scraping coverage (§10.5) |
| Positioning Ammo | Research | ✅ | Themed competitor 1–3★ quotes + counter-angles |
| Persona Deep Research | Research | ✅ | Part 3 Journey Maps per persona (§10.7) |
| `reviews.jsonl` + competitor JSONL | Research/Reviews | ✅ | Raw corpus, never deleted |

Four context docs + three research docs + `_data/` folder + raw review corpus.

---

## 3. Order of Operations

The `brand-researcher` sub-agent enforces gates — it does not advance a phase until its inputs are present. Automated gates auto-advance on pass and loop back on fail; only Checkpoint 3 pauses for strategist review.

```
PHASE 0 — INTAKE                                         [strategist-in-loop]
  ├─ Collect brand website URL
  ├─ Collect Meta Ad Library URL (or FB page → resolve page ID)
  ├─ Collect direct competitor list (§4.2 rule; 0–5 at intake, auto-derivation post-persona-lock if <2)
  └─ Create folder skeleton

                           ↓

PHASE 1 — RAW DATA COLLECTION                            [3 tracks in parallel]
  ├─ 1a. Brand reviews scrape             → Reviews/reviews.jsonl
  ├─ 1b. First-party whole-site crawl     → raw_pages_tmp/*.txt  (deleted at Phase 6)
  └─ 1c. Meta Ad Library full read        → _data/ad-library-raw.json
            (primary text, headline, description, on-image text, video caption; NO media)

                           ↓

━━━ AUTO-GATE A — SCRAPING COVERAGE ━━━
  Pass: review target met OR platform documented-blocked; crawler manifest complete OR
  at cap with useful coverage; ad library returns ≥1 ad.
  Fail: retry once, then surface failure in Review Analysis methodology and proceed.
  No pause.

                           ↓

PHASE 2 — FIRST-PASS SYNTHESIS                           [3 tracks in parallel]
  ├─ 2a. Brand Context draft              → Brand Context.md
  ├─ 2b. Product Context                  → Product Context.md
  └─ 2c. Persona discovery (six-step)     → _data/persona-dictionary.json +
                                            classified reviews.jsonl
           (stratified sample → LLM open classification → keyword dictionary
            → full-corpus classification → LLM precision validation → pain refinement; §7.2)

                           ↓

━━━ AUTO-GATE B — PERSONA LOCK ━━━
  Pass: untagged <50%; precision ≥60% per persona; no demographic-named personas;
  no >80% overlap between two personas; direct-competitor switch-mention validation complete.
  Fail: auto-loopback to Step 3 dictionary revision, up to 2 iterations, then proceed
  with best-available and surface state in Persona Summary banner.
  No pause.

                           ↓

PHASE 2.5 — COMPETITOR REVIEW SCRAPING                   [after persona lock]
  ├─ Scrape 1–3★ reviews for each validated direct competitor → Reviews/competitor-reviews/
  └─ Capture blocked-platform quotes via WebSearch fallback (§5.3)

                           ↓

PHASE 3 — CLASSIFICATION AGAINST LOCKED PERSONAS         [3 tracks in parallel]
  ├─ 3a. Tag own-brand reviews → persona(s)        [formalized from 2c]
  ├─ 3b. Tag competitor 1–3★ reviews → persona
  └─ 3c. AD-LIBRARY CLASSIFICATION                 (classify every live ad)
           Text-only: primary text + headline + description + caption + on-image text.
           No vision, no transcription. Output: _data/ad-classifications.json

                           ↓

PHASE 4 — DEEP SYNTHESIS                                 [7 tracks, parallel except where noted]
  ├─ 4a. Review Analysis                  → Review Analysis.md
  │         Absorbs stratified sample (pre-lock) + persona-segmented sample
  │         (post-lock) as appendices + Scraping Coverage methodology section
  ├─ 4b. Persona Context Parts 1 + 2      → Persona Context.md
  ├─ 4c. Persona Context Part 4 — Objections     (REQUIRES 3a + 3b)
  ├─ 4d. Persona Context Part 5 — Ad Angles      (REQUIRES 3a + 3b + pain-clusters.json)
  ├─ 4e. Persona Deep Research (Part 3)   → Persona Deep Research.md
  ├─ 4f. Positioning Ammo                 → Positioning Ammo.md
  └─ 4g. Persona Summary                  → Persona Summary.md
            Frequency table + Ad Library Orientation + Creative Pillars + light gap rec

                           ↓

PHASE 5 — AUTOMATED QA (orchestrator)                    runs to pass
  (see §12 for the checklist)

                           ↓

━━━ CHECKPOINT 3 — STRATEGIST FINAL REVIEW ━━━
  Strategist reads Persona Summary first (30-sec orient), then Persona Context,
  then spot-checks Research/ docs. Approval releases the brand to batch production.

                           ↓

PHASE 6 — CLEANUP (automated)
  See §14 cleanup table.
```

**Target runtime:** ~90 min wall clock per brand. Strategist time: Phase 0 intake + Checkpoint 3 review only.

---

## 4. Phase 0 — Intake

### 4.1 Required inputs

The `/research-brand` command prompts:

```
Before I start, I need:
  1. Brand's primary website URL
  2. Brand's Meta Ad Library URL
     (or FB page URL — I'll resolve the page ID)
  3. Up to 5 direct competitors (see rule below)
     If you have 0–1 in mind, that's fine — I'll mine reviews
     for switch-mentions after persona lock and auto-propose the rest.

Items 1 and 2 are required. Competitors can be empty at intake.
```

If the Meta Ad Library returns zero live ads, the `brand-researcher` surfaces that to the strategist and proceeds without ad-library-dependent outputs (Persona Summary publishes only the frequency section; Ad Library Orientation and Creative Pillars sections carry "No live ads as of [date]" notes).

**If the brand has no Meta page at all** (strategist can't supply an Ad Library URL or FB page), the orchestrator accepts the intake with `ad_library: none` and runs the full pipeline minus Phase 1c and Phase 3c. Persona Summary carries a "No Meta presence as of [date]" note in place of sections 2 and 3, and Auto-Gate A's ad-library criterion is waived for this run. Recorded in Review Analysis §1 methodology.

### 4.2 Direct-competitor selection rule

Past failure mode: adjacent brands (different pain target, or different price tier) have been treated as direct competitors, producing Positioning Ammo that doesn't translate to real ad angles.

**Definition — a direct competitor is a brand that claims to solve the same primary pain point or job-to-be-done for the same prospect, at a comparable price tier.** Not "in the same category." Not "has overlapping ingredients." Not "both sell wellness." Form factor (powder vs capsule vs drink vs gummy) is irrelevant — prospects with a pain don't shop by format; they shop by whether the claim resolves the pain.

**Three-test gate. A nominated brand must pass all three to be treated as a direct competitor:**

| Test | Question | Pass criterion |
|---|---|---|
| **Same pain / job** | Does it target the same primary pain point or job-to-be-done for the same prospect? | Yes — matches on pain, not on category or form. (E.g., AG1 and Ritual both target "daily foundational wellness for adults tired of stacking pills" — same pain, different formats — so both can be direct competitors.) |
| **Price tier** | Is the per-month or per-use price within ±50% of the subject brand? | Yes |
| **Review-switch-mention** (auto-validated post-persona-lock) | After reviews are scraped, does this brand appear in ≥3 reviews of the subject brand with switch/comparison language — "switched from X," "used to take X," "tried X before," "better than X"? | Yes |

**Why test 3 runs post-persona-lock:** it counts mentions in the brand's own `reviews.jsonl`, which requires Phase 1a scraping to have completed and Phase 2c classification to have produced the persona dictionary (used to scope which mentions are relevant). Running test 3 earlier would either require re-running it later, or waste Phase 2.5 competitor scraping on nominees that turn out to have zero switch-mentions.

**Intake check (tests 1 and 2):** strategist names each competitor plus a one-line rationale confirming (a) which pain it targets and (b) its price tier. If either fails, the brand is flagged "adjacent" and is not treated as a direct competitor anywhere in the research set. Adjacent brands are not scraped by the pipeline (see §8.5 for optional post-Checkpoint 3 strategist workflow).

**Automated post-persona-lock (test 3):** orchestrator counts switch-mentions in the brand's own `reviews.jsonl` against each nominated competitor's name + aliases. Zero switch-mentions → auto-demote to adjacent, log demotion in Positioning Ammo. Strategist catches overrides at Checkpoint 3.

**Auto-derivation fallback:** if fewer than 2 nominees survive all three tests post-persona-lock (i.e., after test 3 auto-validation + auto-demotions), the orchestrator mines the brand's `reviews.jsonl` for top brands mentioned in switch/comparison language and promotes them automatically to fill the gap (target: 2–3 direct competitors total). Each promoted brand must itself pass the three-test gate:

- **Test 3** is satisfied by construction (switch-mention count is how the brand was surfaced).
- **Tests 1 and 2** are evaluated via WebSearch: the orchestrator queries `"[brand] product"`, `"[brand] reviews"`, `"[brand] price"` (3 queries max per nominee), captures (a) the brand's stated pain/job positioning from its own homepage or top-ranked press coverage and (b) MSRP / subscription price. An LLM scores each test as `pass / fail / uncertain` against the captured evidence. Pass = promoted. Uncertain or fail = logged in Positioning Ammo as "surfaced by switch-mentions but unverified on test [1|2] — strategist confirm at Checkpoint 3."

Promotions logged in Positioning Ammo with the exact switch-mention count, WebSearch evidence excerpt, and test scores; strategist confirms or rejects at Checkpoint 3.

### 4.3 Folder skeleton creation

Once intake is complete, the orchestrator creates:

```
[Brand]/
├── 00 Context/
└── 00 Research/
    ├── _data/
    └── Reviews/
        └── competitor-reviews/
```

Empty placeholder files are NOT created. Docs are written when their phase produces them. `raw_pages_tmp/` is created by the site-scraper at Phase 1b runtime and removed at Phase 6.

---

## 5. Phase 1 — Raw Data Collection

Three scraping tracks run in parallel: brand reviews, first-party whole-site crawl, ad library. Competitor review scraping is deferred to Phase 2.5 (§8.5) — it requires the locked persona dictionary.

### 5.1 Review scraping rules

1. **Brand reviews (Phase 1a): scrape everything.** Coverage target = 100% of 1–3★ + as many 4–5★ as the platform allows.
2. **Competitor reviews (Phase 2.5): 1–3★ ONLY.** Positive competitor reviews don't matter here.
3. **Fixed output schema** (defined by the `/review-scraper` skill): `review_id`, `author_name`, `rating`, `title`, `body`, `date`, `verified_buyer`, `product_title`, `source_url`, `scraped_at`. A `personas: [string]` field is added during Phase 2c Step 4 after classification.
4. **Scraping coverage** is captured in Review Analysis §10.5 section 1 (Methodology & Coverage) — per-star coverage, methods used, gaps, what was NOT captured. No separate Review Scraping Status doc.

### 5.2 Platform coverage — the `/review-scraper` skill

| Platform | Method | Typical result |
|---|---|---|
| Trustpilot | `__NEXT_DATA__` extraction, star × sort × language pagination | All 1–3★ + 50–80% of 5★ |
| Yotpo | Public widget API, app-key auto-detection | ~100% |
| Junip | Cursor-paginated API, store-key auto-detection | 100% if API enabled |
| Okendo | Cursor API, subscriber ID from DOM | 100% |
| Stamped.io | Widget API, key from query param | 100% |
| Loox | Playwright "Load More" click loop | 100% |
| Judge.me | Adapt Stamped pattern | 100% typically |
| Unknown / custom widget | Playwright network interception, reverse-engineer API | Varies |
| **Amazon** | ❌ Blocked. WebSearch verbatim 1–3★ quotes. Routing depends on whose reviews: competitor-Amazon → Positioning Ammo (§10.6); brand-Amazon → quoted in Review Analysis §1 methodology as flagged gap + Appendix C in Review Analysis. | Quote-level only |

### 5.3 Competitor capture when the platform is blocked

**Executes at Phase 2.5 (§8.5), not Phase 1.** Four patterns proven across existing brands:

- **Trustpilot competitor:** star-filter URLs (1★/2★/3★ pages), WebFetch ~20/star → 60 negatives/competitor.
- **Amazon competitor:** WebSearch for `"[competitor] 1 star Amazon review"` + `"[competitor] complaints"` + `"[competitor] doesn't work"` — capture 10–20 verbatim quotes with source URL attribution.
- **BBB complaints:** for regulated/telehealth competitors.
- **Editorial review sites** (longevity.technology, SuppCo, Sleep Advisor): when no direct review corpus exists.

### 5.4 First-party whole-site scraping — Playwright CLI (Node)

Built at `00 Global/Hermes/Tools/site-scraper/`, matching the existing `00 Global/Hermes/Tools/grab/` and `00 Global/Hermes/Tools/gemini-api/` convention. Node / Playwright library, invoked from Bash. **No Playwright MCP.**

**Approach: recursive same-origin crawl. No page list, no strategist confirmation step.** The crawler starts at the homepage, follows every same-origin link it finds, and scrapes each page it discovers. This eliminates the failure mode of missing a PDP (or any other page) because no one listed it.

**Subdomains.** Same-origin means same host, so content on content subdomains (e.g. `blog.brand.com`, `science.brand.com`) is NOT followed by default. **On start, the crawler fetches `/robots.txt` and `/sitemap.xml` and reports any off-host URLs found** — surfaces in the manifest so meaningful subdomains aren't invisible. If a brand splits content across subdomains, re-run the crawler with each subdomain as a separate `--url` into the same `--output-dir`. Manifest entries are keyed by full URL — no collisions.

**Contract:**

| Input | Value |
|---|---|
| `--url` | Base URL (e.g. `https://im8health.com`) |
| `--output-dir` | Where raw `.txt` + structured `.json` land |
| `--max-depth` | Default 4. Link-hop depth from homepage |
| `--max-pages` | Default 200. Hard cap (safety net for infinite pagination / calendar widgets) |
| `--headless` | Default false; Next.js sites need headed + stealth |

**Exclusion patterns (baked-in, regex — not strategist-configurable per-run):**
- Pagination: `/page/\d+`, `?page=\d+`, `&page=\d+`
- Taxonomy indexes: `/tag/`, `/tags/`, `/category/`, `/categories/`, `/topic/`
- On-site search: `/search`, `?s=`, `?q=`
- Fragment-only links (`#` without a path change)
- Off-origin links
- Non-HTML assets: `.pdf`, `.jpg`, `.png`, `.webp`, `.gif`, `.svg`, `.zip`, `.mp4`, `.mov`

**Behavior per page:** `page.goto(domcontentloaded, 45s)` → wait 4s for hydration → scroll to 33%/66%/100%/0 → extract `document.body.innerText` + JSON-LD Product + OG meta → collect `<a href>` for same-origin links and add unseen ones to the queue → write `${slugified-url}.txt` + `${slugified-url}_data.json`. Stealth flags set `webdriver=false` and spoof a real Chrome UA/viewport.

**Invocation pattern:**

```bash
node 00 Global/Hermes/Tools/site-scraper/scrape-site.js \
  --url https://im8health.com \
  --output-dir "IM8/raw_pages_tmp"
```

**Crawl manifest.** On completion the crawler writes `raw_pages_tmp/_crawl_manifest.json`:
- `pages_visited`: count + list of URLs
- `pages_skipped`: count + reason (off-origin, excluded pattern, non-HTML, dedupe)
- `queue_incomplete`: list of URLs queued but not visited (hit `--max-pages`). Empty = full crawl completed.
- `subdomains_from_sitemap`: off-host URLs found in robots/sitemap.

Auto-Gate A (§6) auto-accepts complete manifests and partial-with-coverage manifests; logs state in Review Analysis §1.

`raw_pages_tmp/` is scratch — synthesized into Brand Context + Product Context during Phase 4, then deleted at Phase 6.

**What we extract from scraped pages:**

| Synthesize into → | From pages | What to capture |
|---|---|---|
| Brand Context | About, homepage, team, press | Mission, personnel, funding, social presence, moats |
| Product Context (spec §10.4) | Every PDP, bundle, "compare," science/how-it-works, FAQ, subscription terms, guarantee, landers, funnel pages | Verbatim hero copy, dated offer structure, full ingredient list + dosages, cross-product comparison, FAQ-answered objections, funnel architecture, CTA language |

### 5.5 Ad library read

The existing `/ad-library` tool against the Meta Ad Library URL, invoked with the `--no-media` flag so nothing is downloaded to disk. (WebFetch is not used here — it misses the Ad Library's dynamic rendering and pagination.) Capture per ad: `ad_id`, primary text, headline, description, on-image text (static ads), video caption text, ad format, `first_seen` date.

**Note on Meta terminology:** "primary text" is the post copy above the creative (the same thing the strategist may colloquially call "the caption"). The `caption` field in the schema is the separate on-video subtitle/caption track when present. Classification in §9 reads both plus headline, description, and on-image text — the redundancy between "primary text" and any colloquial "caption" is absorbed by reading all fields.

**Text-only classification. No media downloads, no audio transcription, no Gemini vision.** The classifier reads primary text + headline + description + on-image text + caption. Saves API cost and runtime; accepts noise on video ads where VO adds signal not present in the caption.

**`--no-media` flag status.** The existing `/ad-library` tool downloads media by default. Adding `--no-media` (skip media download, metadata-only output) is a small build item tracked in §16.3. Until the flag lands, the research pipeline uses `/ad-library` as-is and Phase 6 cleanup deletes the downloaded media directory (`00 Global/Hermes/Tools/ad-library/downloads/session-*`) as a cleanup artifact.

Output: `00 Research/_data/ad-library-raw.json` — one object per live ad.

---

## 6. Auto-Gate A — Scraping Coverage

Orchestrator-enforced. No strategist pause.

**Pass criteria:**
- Review scraping: hit coverage target OR platform returned documented-blocked error.
- Crawler manifest: `queue_incomplete` empty OR hit `--max-pages` with useful coverage (≥50 pages visited).
- Ad library: returns ≥1 live ad OR explicit zero-ad confirmation.

**Fail path:**
- Review scrape short of target: retry once (different pagination strategy or API key rotation). Still short → proceed and log in Review Analysis §1 methodology.
- Crawler short: surface page list in Review Analysis §1 as "site coverage gap — Phase 2 synthesis may miss X."
- Ad library zero: proceed with Persona Summary frequency section only; Ad Library Orientation and Creative Pillars sections carry "No live ads as of [date]" notes.

Auto-advance to Phase 2 on pass.

---

## 7. Phase 2 — First-Pass Synthesis

Three tracks in parallel: Brand Context draft, Product Context draft, persona discovery.

### 7.1 Persona naming rule

**Personas are named by pain point or buying trigger. Never by demographics.**

| Example | Name | Trigger type |
|---|---|---|
| IM8 | The Pill Fatigue Simplifier | Pain: drowning in supplement bottles |
| Elevate | The GLP-1 Continuer — "My Insurance Stopped Covering Mounjaro" | Trigger: insurance termination |
| Lifeforce | The Dismissed Patient — "My Doctor Says I'm Fine But I Don't Feel Fine" | Pain: medical dismissal |
| FitSleeps | The Desperate Heavy Sleeper | Trigger: fired / late too many times |

Demographics (age, income, gender) may appear IN the persona as supporting detail. They are never the persona itself. Demographic-named personas auto-fail Auto-Gate B.

### 7.2 Persona discovery — six-step methodology (all steps mandatory)

Derived from the Huel Q3 methodology (22,720 Trustpilot reviews → stratified sample → LLM open classification → keyword dictionary → full-corpus classify → precision validation → pain-based refinement). Two principles carry:

**Principle 1: classify the full corpus, not a sample.** A 100-review sample of a 20,000-review corpus is unreliable — you miss personas with <5% frequency and you cannot compute a defensible persona-share %.

**Principle 2: bottom-up beats top-down.** A pre-written keyword dictionary catches what you expected and misses what's new. Stratified sampling + LLM open classification surfaces clusters the strategist wouldn't have hypothesized — Huel's "Junk Food Escape" (largest new cluster) and "Shift Worker" (96% of shift workers would be mis-tagged as "Busy Professional" by a naive dictionary) both emerged here.

**Six-step pipeline. All steps mandatory.**

**Step 1 — Stratified sample** → Review Analysis Appendix A (pre-lock stratified sample)

Pull ~500 reviews from `reviews.jsonl` across five strata (deterministic seed for reproducibility):

| Stratum | Size | Rationale |
|---|---|---|
| Longest reviews | 100 | Most detail = most persona signal |
| Random 5★ | 100 | What satisfied buyers value |
| Random 1–2★ | 100 | Specific complaints and unmet needs |
| Random 3–4★ | 100 | Nuanced mixed-feeling signals |
| Random across all | 100 | Baseline catch-all, prevents bias |

Review-sampler tool writes the stratified sample to Review Analysis Appendix A (verbatim body, rating, title, date, author, review_id per entry).

**Small-corpus rule.** If `reviews.jsonl` has fewer than 500 reviews total:
- Corpus <100: use the full corpus as the Step 2 sample; skip stratification. Appendix A notes `Full corpus — no sampling`.
- Corpus 100–499: include every review in Step 2; preserve strata structure in Appendix A by partitioning the full corpus (longest / 5★ / 1–2★ / 3–4★ / random) with the counts that naturally fall out. Target ratio 20% per stratum; floor of 10 per stratum unless a rating bucket is genuinely empty (e.g. no 1–2★ reviews) — in which case note the gap.
- Corpus ≥500: per the table above.

Small corpora produce lower-confidence persona clustering. Any persona clustered from <100 reviews is flagged "small-N" in Review Analysis §4 and surfaced in the Persona Summary banner alongside precision state.

**Step 2 — LLM open-ended classification**

LLM reads the ~500-review sample and proposes persona clusters without keyword priors. Prompt asks for: candidate persona name, description, distinguishing signals, example review IDs, first-pass size estimate. Output: typically 10–15 candidate clusters on first pass, consolidated to 5–8 after the Step 3 dictionary pass.

**Model:** Claude (large context, strong clustering on narrative data).

**Context handling.** 500 reviews at typical length fit within Claude's context comfortably. If the corpus has unusually long reviews (e.g. longest-review stratum averages >800 words) and the sample exceeds ~150k tokens, the sampler truncates per-review body to 600 words with a `[truncated]` tag before sending. Cluster output is unaffected — persona signals are carried in the first 200–400 words of almost every review. The stratified sample always runs on the 500-review Step 1 output; Step 2 does not accept a reduced sample just to fit context.

**Step 3 — Build keyword/phrase dictionary from discovered clusters** → `_data/persona-dictionary.json`

For each candidate persona, extract repeating language patterns from LLM-classified examples — symptoms, triggers, identity markers, product mentions. Build a case-insensitive regex per persona.

Example (IM8 Gut Health):
```
gut|digestion|bloat|bowel|IBS|IBD|colitis|probiotic|constipat|stomach|digest
```

Reviews can match multiple personas. Overlap is meaningful (e.g. IM8's "Energy + Pill Fatigue" overlap = ideal-customer signal).

**Step 4 — Classify the full corpus** via `00 Global/Hermes/Tools/persona-counter/`

Apply the dictionary to every review in `reviews.jsonl`. Persist `personas: [...]` field on each review (consumed by Phase 3a). Outputs:
- Full frequency table: `Persona | Reviews Matched | % of Reviews | Avg Rating`
- Multi-Persona Overlap table (top 20 combinations — ideal-customer signal)
- Untagged residual %

If untagged >50%, persona-counter flags and halts Step 4. Orchestrator auto-loops to Step 3 with a broader dictionary prompt. **Loop budget is shared with Auto-Gate B: 2 iterations total across Step 4 halts and Auto-Gate B failures combined.** Example: one Step 4 halt + one Auto-Gate B precision fail = budget exhausted; next fail proceeds with flagged state. This prevents unbounded looping when a corpus genuinely resists clean clustering.

**Step 5 — LLM precision validation** (inline sub-agent prompt — no separate tool)

Sample 30 reviews per persona (mix of high-signal and borderline matches — persona-counter flags borderlines as reviews matching only 1 keyword). LLM scores each as `match` / `mismatch` / `borderline`. Compute:

```
precision = (match + 0.5 × borderline) / 30
```

The 0.5 weight splits credit for genuinely ambiguous reviews. Personas <60% precision auto-loop back to Step 3 for dictionary tightening. Huel's v2 precision ranged 23% (Snack Reform — collapsed) to 93% (Health Condition — kept). This is the step that catches "Busy Professional" eating up shift workers.

**Model:** Gemini (cheap per-review scoring, high volume).

**Step 6 — Pain-based refinement (mandatory)**

Tag an additional sample with LLM-assigned `pain_points`, `trigger`, `desire`, `existing_persona_match`, `distinct_from_existing`. Sample size scales with corpus: `target_size = min(2000, max(500, ceil(corpus_size × 0.10)))`. For corpora smaller than the target, use the full corpus. Examples: 300-review corpus → all 300; 3,000-review corpus → 500; 22,000-review corpus → 2,000. Used to:
- Name personas more precisely (pain-first beats identity-first)
- Surface sub-pains hiding inside broad buckets (Huel's "Junk Food Escape" inside Busy Professional)
- Seed Part 5 angles grounded in specific pain language

Output: updates to `persona-dictionary.json` + `_data/pain-clusters.json` feeding §10.3 ad-angle derivation.

**`pain-clusters.json` schema** (one entry per cluster):
```json
{
  "cluster_id": "pill_fatigue_simplifier.medication_routine_fatigue",
  "persona": "The Pill Fatigue Simplifier",
  "pain_label": "Stack-of-bottles exhaustion",
  "trigger": "Opening the cabinet and counting 8+ daily pills",
  "desire": "One thing that replaces the whole shelf",
  "frequency_reviews": 47,
  "representative_quote": "I was taking 12 pills a day and I finally just threw them all out.",
  "representative_review_id": "tp-4f29a1",
  "distinct_from_existing": "Different from generic 'too many supplements' — this group frames it as medical-regimen fatigue, not wellness-stack fatigue"
}
```
Part 5 ad-angle derivation (§10.3) reads `representative_quote` + `representative_review_id` directly as its Pain anchor field. No LLM summary — the anchor must be a verbatim review quote with a traceable ID.

**Model:** Gemini (high-volume tagging).

### 7.3 Where the numbers live — single source of truth

`_data/persona-dictionary.json` + classified `reviews.jsonl` + `_data/ad-classifications.json` are the **single source of truth** for all persona/pillar numbers. Three docs render from those files:

1. **Persona Summary** (00 Context/) — frequency + ad rollup + pillars. The 30-second scannable (§11). Does not render precision % in the main table (kept scannable); precision state is surfaced via the degraded-state banner only (see §11 Banner Format).
2. **Review Analysis** (00 Research/) — full calc: frequency table, per-persona rating breakdowns, Multi-Persona Overlap top 20, precision %s from Step 5.
3. **Persona Context** (00 Context/) — one inline line per persona: `**Audience share:** 22.1% of reviews. Primary persona. Precision: 82%.`

All three regenerate from the `_data/` source files on any re-run. No manual re-typing of numbers anywhere. Precision %s originate in Review Analysis and Persona Context; Persona Summary only flags them if they breach thresholds.

### 7.4 How many personas

The count emerges from how the review corpus clusters. Typical outcome is 4–6. If Step 2 proposes 8+, two personas almost always overlap enough to merge — check Multi-Persona Overlap and Step 5 precision. If <3, the dictionary is too broad and is merging distinct pains.

**4–6 is guidance, not an Auto-Gate B rule.** Auto-Gate B only checks the structural criteria in §8 (naming, coverage, precision, overlap, competitor validation). A 3-persona or 7-persona result that passes those checks advances automatically. Count judgment is Checkpoint 3 territory — the strategist can ask for re-clustering there.

---

## 8. Auto-Gate B — Persona Lock

Orchestrator-enforced. No strategist pause.

**Pass criteria:**
1. Persona names pass pain/trigger rule — regex check rejects purely demographic names. **Locked regex blocklist (case-insensitive), changes require process update:**
   - `age \d+[\-–]\d+` (e.g. "age 35–54")
   - `\b(women|men|male|female|moms?|dads?)\b` — allowed only if followed within the same name by a pain-qualifier word (`fatigue`, `pain`, `struggl`, `dismissed`, `overwhelmed`, `exhausted`, `desperate`, etc.)
   - `\b(millennials?|gen [xyz]|boomers?|zoomers?|seniors?)\b`
   - `\b(affluent|wealthy|high[- ]income|upper[- ]class|middle[- ]class)\b`
   - `\bbusy (professional|mom|dad|parent|executive)s?\b` (without pain-qualifier suffix)
   - `\b(urban|suburban|rural|metro)\b` (without pain-qualifier suffix)
2. Frequency table reconciles to `reviews.jsonl` when re-run with the dictionary.
3. Untagged residual <50%.
4. Precision ≥60% per persona (Step 5).
5. No two personas with >80% Multi-Persona Overlap (auto-merge flagged).
6. Direct-competitor switch-mention validation complete (§4.2 test 3); auto-demotions logged.

**Fail path:** auto-loopback to Step 3 (dictionary revision) within the shared Step 4 / Auto-Gate B 2-iteration budget (§7.2 Step 4). Once the budget is exhausted, proceed with best-available state and flag at top of Persona Summary via the degraded-state banner (§11).

Auto-advance to Phase 2.5 on pass. No strategist pause.

**On rejection at Checkpoint 3** (strategist overrides): loop back to the specific phase the strategist flags.
- **Persona issues** → Phase 2c. Dictionary revisions re-enter at Step 3; full re-cluster re-enters at Step 2; pain-cluster refinement re-enters at Step 6. Re-running any earlier step runs the downstream steps automatically.
- **Product Context gaps** (missing SKU, outdated offer block, missing funnel page) → Phase 2b re-run, typically preceded by a targeted Phase 1b site re-scrape of the affected URLs.
- **Positioning Ammo weaknesses** (thin competitor quotes, missing fatal flaw) → Phase 4f re-run, preceded by Phase 2.5 competitor re-scrape if the underlying corpus is the problem.
- **Brand Context gaps** (missing moat, weak positioning section) → Phase 2a re-run against the existing `raw_pages_tmp/` if still present, otherwise preceded by Phase 1b re-scrape of About / homepage / press pages.
- **QA regression** (numbers drifted, banner not raised when it should be) → re-run Phase 5 QA only, without re-running synthesis.

---

## 8.5 Phase 2.5 — Competitor Review Scraping

Runs after Auto-Gate B passes.

**Sequence rationale.** Competitor classification (Phase 3b) requires the locked persona dictionary. Scraping earlier would mean either re-scraping if personas change, or biasing discovery toward competitor language.

**Inputs from Auto-Gate B:**
- Validated direct competitor list (passed §4.2 tests 1, 2 at intake + test 3 auto-validated)
- Locked `persona-dictionary.json`

**Execution:**
- Per validated competitor: scrape 1–3★ reviews using the same platform coverage table (§5.2) as brand reviews. Same output schema (§5.1 rule 3).
- Written to `00 Research/Reviews/competitor-reviews/[competitor-slug].jsonl`
- Platform-blocked competitors: WebSearch fallback per §5.3 patterns. Quotes written to `00 Research/Reviews/competitor-reviews/[competitor-slug]-websearch.md` (verbatim, attributed with source URL + capture date). Phase 4f reads this into Positioning Ammo.

**Output feeds:**
- Phase 3b (classify each competitor review against own-brand personas)
- Phase 4f (Positioning Ammo — theme-clustered 1–3★ quotes per competitor)

**Adjacent brands — two categories, handled identically.** Both are excluded from pipeline scraping:

1. **Failed at intake** — failed §4.2 test 1 (different pain/job) or test 2 (price tier outside ±50%). Flagged adjacent at Phase 0.
2. **Auto-demoted post-persona-lock** — passed tests 1 and 2 at intake, failed test 3 (zero switch-mentions) at Auto-Gate B. Logged in Positioning Ammo with demotion note.

Neither category is scraped by the pipeline and neither is classified or ammo-synthesized. If the strategist explicitly wants adjacent-brand reference quotes post-Checkpoint 3, they can collect them ad-hoc via WebSearch and file them in an optional "Adjacent Space Signals" appendix inside Positioning Ammo — this is a strategist judgment call, not a pipeline output, and Phase 5 QA does not enforce its presence.

---

## 9. Phase 3 — Classification Against Locked Personas

Three parallel tracks.

**3a. Tag own-brand reviews → persona(s).** Formalized from Phase 2c Step 4. Each review gets zero, one, or multiple persona tags. Persisted to `reviews.jsonl` as a `personas` field.

**3b. Tag competitor 1–3★ reviews → persona.** Same dictionary, applied to each `competitor-reviews/[slug].jsonl`. Many will match "no persona" — that's fine; they're still useable for generic competitor-bad-flavor quotes but won't seed persona-specific Part 4 objections.

**3c. Ad-library classification.** The `ad-classifier` tool reads each ad from `_data/ad-library-raw.json` — primary text + headline + description + on-image text + caption text. **Text only; no vision, no transcription.** Tags `{persona, angle, format}`:
- **Persona:** which locked persona's pains/language the copy implicitly targets. Pick one (primary); if two are equally implicated, tag both.
- **Angle:** the one-line creative idea the ad leads with. Short, specific, reusable across ads ("Feel sharp by 10am — cognitive-speed demo" / "Stack replacement — one scoop, eight pills saved"). Angles repeat across ads — that's the point.
- **Format:** video / static / partnership / carousel.

**Angle deduplication pass (mandatory sub-step).** Raw LLM angle strings drift — the same idea surfaces as "Feel sharp by 10am," "Sharper by 10am," and "Alert by mid-morning" across different batches. After initial classification, the classifier runs a second LLM pass over the unique angle strings with this prompt: "Group these angle strings into clusters where each cluster is the same underlying creative idea. Return `{canonical_angle: string, members: [string]}` per cluster." The classifier then rewrites every ad's `angle` field to its canonical form. Without this pass, the Creative Pillars table in §11 fragments identical ideas across several rows and undercounts pillar volume.

**Output: `_data/ad-classifications.json`.** Contains `{ad_id, persona, angle (canonical), format}` per ad, plus a top-level `angle_clusters` map from raw-to-canonical strings for traceability. Phase 4g aggregates this file into the §11 Creative Pillars table by:
1. Grouping on `{persona, angle}` pairs and counting.
2. Computing pillar thresholds (row count ≥20% of total ads OR ≥3× the next-largest row for that persona).
3. Rolling up `ad_count` per persona for the persona ad-share section.
4. Listing personas with zero ads by joining against `persona-dictionary.json` (so 0%-ad personas still appear).

**Rate-limiting:** classifier batches 10 ads per Gemini call. At 200 ads = 20 calls. Retry with exponential backoff on rate-limit errors. Angle-deduplication pass is a single LLM call (unique angle strings rarely exceed a few hundred).

**Precision validation:** sample 20 ads per persona, rescore with a fresh LLM pass, require ≥70% agreement with original tag.

**Sparse-persona fallback.** Classification always runs (every locked persona gets tagged against every ad), but precision measurement scales:
- ≥20 ads tagged to this persona: sample 20.
- 5–19 ads tagged: rescore all available; the ≥70% threshold still applies but n-small noise is flagged in banner.
- <5 ads tagged (including 0 ads): skip precision measurement entirely; persona is surfaced in Persona Summary banner as "precision not measured — insufficient ad volume." Zero-ad personas still appear in the Creative Pillars rollup with `ad_count = 0` so the strategist sees them.

**On-fail retry.** If precision <70% on the ≥5-ad path, run one auto-retry using this template:

> **Retry prompt:** You previously classified [N] ads against persona `[persona name]` — "[persona one-line pain]". A fresh audit found [M] disagreements out of [K] rescored. Here are the [M] disagreements: [paste each ad's primary_text + headline + the original tag + the rescore verdict]. Re-classify the full set of [N] ads, prioritizing: (1) the persona's specific pain language — [top 3 keywords from `persona-dictionary.json`]; (2) these borderline patterns that caused disagreement — [paste 2-3 example primary_text snippets from the disagreements]. Return `{ad_id, persona, angle, format}` per ad.

Persistent <70% after retry → surface in Persona Summary banner per §11 Banner Format. Classification output is still written — the banner flags that pillars for this persona are directional only.

**Why 70% here but 60% for persona precision (§7.2 Step 5)?** Ad copy is shorter and more ambiguous per item than a review — but the classifier sees the full ad as a unit, and the angle label is a creative summary that should be more concentrated than the underlying implicit persona signal. The 10-point-higher bar on ad-classifier precision reflects that concentration. Review classification has to survive reviewers who mention four things at once; ad classification should not, because a 30-word ad has one lead. Both thresholds are empirical starting points — if either consistently fails on well-formed corpora, revise in a process update.

---

## 10. Phase 4 — Deep Synthesis

Seven tracks, parallel except where noted.

**Dependencies (explicit):**
- 4a (Review Analysis) depends on 3a (own-brand persona tagging).
- 4c (Part 4 Objections) depends on 3a + 3b (competitor tagging).
- 4d (Part 5 Ad Angles) depends on 3a + 3b + `_data/pain-clusters.json` (from Step 6).
- 4f (Positioning Ammo) depends on 3b.
- 4g (Persona Summary) depends on 3a (classified `reviews.jsonl` for frequency) + 3c (`_data/ad-classifications.json` for Ad Library Orientation + Creative Pillars). Runs after the ad-classifier precision validation sub-step so the banner state is known.
- 4b (Part 1 + 2) and 4e (Persona Deep Research) depend only on Phase 2 outputs + 3a, so they start as soon as 3a finishes.

### 10.1 Persona Context spec — lean form

`Persona Context - [Brand].md` lives in `00 Context/` and has four sections per persona. Part 3 (Journey Map) lives in `00 Research/Persona Deep Research - [Brand].md` (§10.7) — kept separate because journey-map detail is strategist reference, not load-on-execution material.

```markdown
## [Persona Name] — "[Persona tagline]"
**Audience share:** 22.1% of reviews. Primary persona. Precision: 82%.
**Top 3 pains:** [pain 1], [pain 2], [pain 3]

### Part 1 — How [Brand] Connects
Mechanism → pain match. 100–200 words.

### Part 2 — Customer Profile + VoC
Who they are, what they say. 8–12 direct review quotes verbatim, attributed.

### Part 4 — Objections
(see derivation rule §10.2)

### Part 5 — Ad Angles
(see derivation rule §10.3)
```

### 10.2 Part 4 Objections — derivation rule

Every objection is sourced. Two legitimate sources only:

1. **Own-brand reviews tagged to this persona** — what buyers say they got wrong, what disappointed them, what they almost didn't buy, what they wish they'd known.
2. **Competitor 1–3★ reviews tagged to this persona** — what made them churn, what the competitor promised that didn't deliver.

Format per objection:

```markdown
### Objection: "[The objection, in customer's words]"
**Source:** Own-brand 2★ (Persona: Pill Fatigue Simplifier) + Ritual 1★ (same persona)
**Quote:** "[direct quote]"
**Counter-angle:** [1–2 lines the brand can lead with to pre-empt]
```

No invented objections. No "customers might wonder if…" phrasing. If it can't be sourced from a tagged review, it doesn't go in Part 4.

### 10.3 Part 5 Ad Angles — derivation rule

Angles derive from three review signals per persona (Step 6 pain clusters feed the third):

1. **What they say they got** — positive VoC. Outcome language satisfied buyers use. Becomes the *promise*.
2. **What they say they struggled with** — pain language + what competitors failed to solve. Becomes the *pain anchor* and the *against-competitor wedge*.
3. **Pain cluster** — from Step 6 `pain-clusters.json`. Specific sub-pain hiding inside the broader persona bucket. Becomes a more precise *pain anchor* than the generic persona pain.

Format per angle:

```markdown
### Angle: "[Angle headline in plain language]"
**Awareness level:** [Problem-aware / Solution-aware / Product-aware]
**Pain anchor:** "[verbatim review quote]" — `[review_id]` (from own-brand or pain cluster `representative_quote`)
**Promise (from reviews):** "[quote from a satisfied buyer of same persona]" — `[review_id]`
**Competitor wedge (from their 1–3★, optional):** "[quote showing the gap]" — `[review_id]` (`[competitor]`)
**Structure suggestions:** [2–3 structures drawn from the structure taxonomy in `00 Global/Criteria/Video Script Criteria.md` and `00 Global/Criteria/Headline & Text Hook Criteria.md` — e.g. List, Before-After, Authority, Problem-Agitate-Solution, Unexpected Data, Mechanism Reveal]
```

**Sourcing rule.** Pain anchor must be a verbatim quote with a `review_id`. When derived from a pain cluster, copy the `representative_quote` and `representative_review_id` fields from `pain-clusters.json` directly — no LLM summary or paraphrase. Every angle traces to at least one direct quote. Abstract angles without quote backing belong in the Working Document's Batch Plan (where they can be tested), not in Persona Context.

### 10.4 Product Context — spec

One `Product Context - [Brand].md` covers every SKU the brand sells plus the funnel architecture. Written to `00 Context/`. Structure per product:

**Product identity**
- Exact product name + all variants (flavors, sizes, bundle configurations)
- Form factor (powder, capsule, drink, gummy, device, ...)
- Category position (foundational / performance / targeted / niche)

**Offer structure — verbatim, dated**
- One-time price (MSRP)
- Subscription price + % discount vs one-time
- First-order promo / welcome discount
- Bundle / multi-pack pricing tiers
- Free shipping threshold
- Guarantee / trial / return terms
- **Rule:** every price/offer line is dated (`as of YYYY-MM-DD`). Offer blocks >60 days old at batch planning trigger re-scrape (§15).

**Mechanism & ingredients — verbatim hero + full list**
- Hero benefit claims in the brand's exact language (headline, sub-head, bullet promises)
- Complete ingredient list with dosages
- Stated mechanism — how the brand explains *why* it works

**Evidence & proof**
- Clinical claims made on-page, with cited studies / "clinically proven" flags
- Third-party certifications (NSF, Informed Sport, USDA Organic, Non-GMO, ...)
- Testimonial patterns — representative quotes the brand features on the PDP

**Objections addressed on-page**
- FAQ items
- Safety / side-effect language
- "Is this right for you / who this is not for" gates

**Cross-product comparison — required if multi-SKU**
- Table: `Product A | Product B | Product C` on form, primary use case, hero benefit, price, substitution relationship
- Explicit answer to "which one is right for me"
- Note any products designed to stack vs compete

**Funnel Architecture (absorbs Landing Page Analysis)**
- Primary landers — URL, hero pattern, offer tier, trust stack
- PDP vs lander CTA language differences
- Above-the-fold hero patterns across the funnel
- Offer tiering (order-bump, post-purchase upsell, subscription nudge)

**Verbatim rule.** Hero claims, benefit copy, and FAQ phrasing are captured **verbatim**, never paraphrased. Product Context is source material for ad copy and brief Close blocks — paraphrase destroys the brand voice we're supposed to match.

**Source attribution.** Every block cites its source page URL + capture date. Offer blocks dated explicitly. When the strategist re-scrapes at a refresh, the old offer block is replaced, not appended — Product Context should read as current state, not a changelog.

**SKU-variant dedup rule.** Variants that differ only in flavor, size, or bundle configuration (e.g. Vanilla / Chocolate / Berry of the same powder; 30-count vs 60-count of the same capsule) roll up into a single Product block. List variants under **Product identity → All variants**, and surface only the differences (price per variant, flavor-specific reviews, variant-only constraints like "berry contains X"). Separate Product blocks are created only when the variant differs meaningfully on mechanism, ingredient profile, hero claim, or positioning (e.g. "Daily" vs "Performance" vs "Sleep" under the same brand — different jobs-to-be-done). Use the Cross-product comparison table to disambiguate when blocks are adjacent.

### 10.5 Review Analysis — canonical structure

`00 Research/Review Analysis - [Brand].md`, in this order:

1. **Methodology & Coverage** — corpus size, date range, per-platform coverage %, methods used, gaps, what was NOT captured (absorbs former Review Scraping Status content).
2. Rating Distribution — overall + by source + by product
3. Geographic Distribution — if international
4. Persona Signal Analysis — frequency table + per-persona rating breakdowns for polarized personas
5. Multi-Persona Overlap — top 20 combinations (ideal-customer signal)
6. Sentiment Themes — praise + complaint counts, ranked
7. Common Objections — top 5–7 with 2–3 verbatim quotes, severity graded
8. Key VoC Quotes by Persona — 5–10 ad-ready quotes per persona, attributed
9. Emotional Drivers — What Makes People Buy / Stay / Leave
10. Discovery: Unexpected Patterns — signals the taxonomy didn't predict
11. Implications for Creative — strongest personas by signal strength, language to steal, objections to handle
12. **Appendix A — Stratified Sample (pre-lock)** — Step 1 output. 500 reviews across 5 strata. Frozen audit record of what the Step 2 LLM read.
13. **Appendix B — Persona-Segmented Sample (post-lock)** — up to ~40 per persona, mix of longest / 1–3★ / 4–5★ / multi-tag. Persona blocks in descending frequency. Small personas (<40 reviews): include all with `Full population — no sampling` note. The 1–3★ slice is non-negotiable — primary VoC mine for Persona Context Parts 4 and 5.
14. **Appendix C — Amazon Quotes (if applicable)** — brand-Amazon verbatim quotes captured via WebSearch fallback.

Smaller corpora (<500 reviews) may collapse some main sections but preserve order and appendices.

### 10.6 Positioning Ammo structure

`00 Research/Positioning Ammo - [Brand].md`, per direct competitor:

1. **Stats** — Trustpilot rating, review count, what they do, price range
2. **Fatal Flaw** — one-line headline ("Customer Service Black Hole," "Hidden Fees")
3. **Themes A, B, C, D** — each with:
   - 4–8 verbatim 1–3★ quotes, attributed (author, star, source)
   - **[Brand] positioning angle:** — a one-sentence counter-position

Ends with a **Quick-Reference table** — Top 3 positioning lines per competitor, copy-ready.

Auto-demoted competitors (failed §4.2 test 3 post-persona-lock) and adjacent brands do NOT get their own block. Their quotes may feed a single "Adjacent Space Signals" appendix.

### 10.7 Persona Deep Research — Part 3 Journey Map

`00 Research/Persona Deep Research - [Brand].md`. One journey map per locked persona. Derives entirely from review data + first-party site pages + ad-library copy — no invention.

```markdown
## [Persona Name] — Journey Map

### Trigger (what starts the buying journey)
The specific event, realization, or pain spike that sends them searching.
- **Signal from reviews:** [verbatim quote — "I finally gave up when..."]
- **Signal strength:** [N reviews reference this trigger / total persona reviews]

### Awareness → Consideration
- What they search (query language from review content, not invented)
- What competitors they compare against (from switch-mention data)
- Information gaps (what they say they wish they'd known)

### Evaluation
- Deciding factors cited in reviews (price, ingredients, social proof, guarantee)
- Anxieties that almost stopped purchase (from 2–3★ "almost didn't buy" language)
- Decisive moment / tipping point

### Purchase
- Preferred path (subscription vs one-time, channel, bundle vs single)
- Offer sensitivity (first-order discount mentions, shipping threshold mentions)

### Use / Post-purchase
- How they describe the product in month 1 vs month 3+
- Ritual / routine language ("every morning," "before the gym")
- What surprised them (positive and negative)

### Advocacy / Churn
- Why they stay (retention language from long-tenure reviewers)
- Why they leave (from 1–3★ churn reviews)
- What they tell others (from "I told my [partner/friend/mom]" language)
```

**Source attribution rule.** Every journey stage cites at least one verbatim quote with review_id. Invented content (e.g. "she probably Googles X") is not allowed. If a stage has no review signal, write `No review signal — inferred from [competitor reviews / first-party site content / ad-copy]` and treat it as lower-confidence. Ad-hoc Reddit signal is outside this pipeline (§2) — if the strategist ran a Research Engine sprint separately, those quotes may be cited with sprint reference.

---

## 11. Phase 4g — Persona Summary

The combined orientation doc. Data first, light recommendation last. The strategist reads this to orient; the strategist also makes the gap-analysis calls. The pipeline does not interpret the data.

```markdown
# Persona Summary — [Brand]

> Source of truth: `_data/persona-dictionary.json` + classified `reviews.jsonl` + `_data/ad-classifications.json`.
> Full calc: [[Review Analysis - Brand]]. Full persona profiles: [[Persona Context - Brand]].

## 1. Persona Frequency

| Persona | % of Reviews | Avg Rating |
|---|---|---|
| The Pill Fatigue Simplifier | 22.1% | 4.2 |
| The Energy Seeker / Coffee Substitute | 18.7% | 4.5 |
| The Gut Health Seeker | 13.9% | 4.1 |
| Untagged (no persona match) | 48.4% | — |

## 2. Ad Library Orientation

- **Total live ads:** N (N video / N static / N partnership / N carousel)
- **`first_seen` range:** YYYY-MM-DD to YYYY-MM-DD  <!-- field name matches ad-library-raw.json -->
- **Recurring primary-text patterns:** [3–5 patterns — e.g. "'Stack of benefits' framing in 8 ads," "'Founder story / I was sick and tired of...' opener in 6 ads"]
- **Recurring headline patterns:** [3–5 patterns — e.g. "'Feel sharp by 10am' variant in 14 ads," "'One scoop, X pills saved' variant in 3 ads"]

## 3. Creative Pillars

| Persona | Angle | Ad Count |
|---|---|---|
| The Energy Seeker / Coffee Substitute | "Feel sharp by 10am" (cognitive-speed demo) | 14 |
| The Energy Seeker / Coffee Substitute | "Stack of benefits" (ingredient list) | 8 |
| The Pill Fatigue Simplifier | "One scoop, eight pills saved" | 3 |

**Pillars** (rows with ≥20% of total ad volume OR ≥3× next-largest row for the same persona):
- "Feel sharp by 10am" → 14 ads (29.8%)
- "Stack of benefits" → 8 ads (17.0%)

**Persona ad-share rollup:**
- The Energy Seeker / Coffee Substitute: 46.8%
- The Pill Fatigue Simplifier: 6.4%
- The Gut Health Seeker: 0.0%
- [Personas with 0% ads are still listed so the strategist sees them]

---

## Gap Analysis — Recommendation (light)

Surface-level observations only. Strategist makes the calls.

- The Pill Fatigue Simplifier accounts for 22.1% of reviews and 6.4% of ad targeting.
- The Gut Health Seeker accounts for 13.9% of reviews and 0% of ad targeting.
- The Energy Seeker / Coffee Substitute accounts for 46.8% of ad targeting and 18.7% of reviews.

No prescriptions. No suggested angles. For angle pools, see Persona Context Part 5.

*Last updated: YYYY-MM-DD*
```

**Rules:**
- **Both % sources are exact counts** from their respective classifiers. No rounding, no `~`. Classification uncertainty is tracked via precision validation (§7.2 Step 5 for personas, §9 for ads) — the reported numbers are what the classifiers produced.
- **No "Gap" column on the frequency table.** Gap observations live only in the light recommendation section at the bottom.
- **No prescriptive angle suggestions in Persona Summary.** Angle derivation lives in Persona Context Part 5 (§10.3).
- **Untagged residual row** stays in the frequency table so the strategist sees the tagging ceiling.
- **Pillars surface from concept repetition across wrappers** (creators, formats, hook variants) — not from ad duration. Long-running ads are often lower-funnel retargeting, NOT a signal of what's working at the top of funnel.
- **Source separation preserved.** Personas come from reviews (Phase 2c → frequency). Pillars come from the ad library (Phase 3c). The two streams only meet visually in Persona Summary — they are not commingled in discovery. Using ads to seed personas would make any later gap observation circular.

**Banner Format (degraded states).** When any degraded-state condition is met, a single block is rendered at the top of Persona Summary, above `## 1. Persona Frequency`. One banner block, one or more lines, each mapped to a specific trigger:

```markdown
> ⚠ **Persona Summary — degraded state**
> - Persona lock completed with constraints after 2-iteration loop budget exhausted. See Review Analysis §4 precision table.
> - Ad classification precision below 70% on [Persona Name] after retry (62%). Pillars for this persona are directional only.
> - Crawler hit `--max-pages` with `queue_incomplete` non-empty ([N] URLs). Product Context may be missing pages — see Review Analysis §1.
> - Ad library returned zero live ads. Sections 2 and 3 unavailable for this run.
```

Triggers (orchestrator renders any that apply):
- Auto-Gate B exited with fail after the 2-iteration budget (§8).
- Any persona's Step 5 precision <60% (§7.2).
- Any persona's ad-classifier precision <70% after retry (§9).
- Any persona's ad-classifier precision skipped for insufficient volume (<5 ads, §9).
- Crawler manifest had `queue_incomplete` non-empty at Auto-Gate A (§6).
- Ad library returned zero live ads (§5.5).
- Brand has no Meta page at all — sections 2 and 3 unavailable (§4.1).
- Corpus <100 reviews — persona clustering is small-N, low-confidence (§7.2 Step 1).
- Any persona clustered from <100 tagged reviews (§7.2 Step 1).

When none of these conditions apply, no banner is rendered. Do not render a placeholder "no issues" banner.

---

## 12. Phase 5 — Automated QA

Orchestrator-enforced checklist. Runs to pass. Fails escalate to Checkpoint 3 with flagged state (not blocked).

- [ ] Every doc in `00 Context/` earns its place (cited downstream or loaded by writer sub-agents).
- [ ] Persona Summary frequency % values reconcile to classified `reviews.jsonl`.
- [ ] Persona Summary pillar counts reconcile to `_data/ad-classifications.json`.
- [ ] Persona Context per-persona headers cite the same % + precision % (rendered from the same source data).
- [ ] Parts 4 and 5 derivation rule: every objection and every angle has a cited review quote with review_id.
- [ ] Personas named by pain/trigger — regex check clears demographic terms.
- [ ] Untagged residual <50% OR flagged in Persona Summary banner.
- [ ] Precision ≥60% per persona OR flagged as above.
- [ ] Review Analysis §1 declares scraping coverage % + gaps.
- [ ] Every ad in `_data/ad-library-raw.json` has a classification entry in `_data/ad-classifications.json` (no drops, no phantom entries); every `angle` value in ad entries is present in the top-level `angle_clusters` canonical set.
- [ ] Ad-classifier precision ≥70% (20-ad rescore per persona) OR flagged in Persona Summary banner.
- [ ] Every direct competitor passes §4.2 tests 1, 2, 3 OR auto-demoted to adjacent with log entry.
- [ ] Competitor reviews scraped at Phase 2.5 match the validated-competitor list.
- [ ] Review Analysis Appendix A (stratified) and Appendix B (persona-segmented) both present.
- [ ] Persona Deep Research has one Journey Map per locked persona, each stage quote-sourced or flagged as inferred.
- [ ] No Amazon quotes attributed without source URL.
- [ ] Product Context covers every SKU surfaced by the whole-site crawl (one block per product).
- [ ] Product Context offer blocks dated and captured verbatim.
- [ ] Multi-SKU brands have the cross-product comparison table.
- [ ] Hero benefit claims and FAQ phrasing in Product Context are verbatim.
- [ ] Product Context includes Funnel Architecture section.
- [ ] Crawler manifest `queue_incomplete` empty OR flagged in Review Analysis §1.
- [ ] Positioning Ammo — every direct competitor block has a Fatal Flaw line (§10.6).
- [ ] Positioning Ammo — every direct competitor block has 3–4 themes, each with 4–8 verbatim quotes and one positioning angle line.
- [ ] Brand Context covers mission, ICP, positioning, moats, vulnerabilities (§2 doc inventory).
- [ ] Persona Context — each persona's Part 1 is 100–200 words; Part 2 has 8–12 direct review quotes with attribution (§10.1).
- [ ] Auto-derived competitors (§4.2) are logged with switch-mention count + WebSearch evidence excerpt + test 1/2 LLM scores.
- [ ] Persona Summary Ad Library Orientation — headline / primary-text patterns surface 3–5 each OR brand has no Meta page (§4.1 waiver).
- [ ] If `/ad-library` was run without `--no-media`, downloaded media directory is scheduled for Phase 6 cleanup (§5.5, §14).

---

## 13. Checkpoint 3 — Strategist Final Review

The only strategist pause post-intake.

Strategist reads in this order:
1. **Persona Summary** — 30-second orient. Frequency → ad orientation → pillars → light gap rec.
2. **Persona Context** — four parts per persona.
3. **Spot-check Research/** — Review Analysis frequency table, a Positioning Ammo competitor block, Persona Deep Research for the primary persona.

Approval releases the brand to batch production (T001 planning). Rejection routes back to the appropriate phase.

---

## 14. Phase 6 — Cleanup

| Artifact | Action | Destination |
|---|---|---|
| `raw_pages_tmp/` (first-party site scrape output) | **Delete entirely** | — (synthesis docs preserve the signal) |
| `reviews.jsonl` | Keep in place | `Reviews/reviews.jsonl` — **NEVER DELETED** |
| `competitor-reviews/*.jsonl` | Keep in place | `Reviews/competitor-reviews/` — **NEVER DELETED** |
| `competitor-reviews/*-websearch.md` (blocked-platform verbatim quotes, §5.3) | Keep in place | `Reviews/competitor-reviews/` — **NEVER DELETED** |
| Trustpilot CSV exports | Keep in place | `Reviews/` — **NEVER DELETED** |
| `ad-library-raw.json` | Keep in place | `_data/` |
| `persona-dictionary.json` | Keep in place | `_data/` (reproducibility for re-runs) |
| `ad-classifications.json` | Keep in place | `_data/` (includes top-level `angle_clusters` canonical map) |
| `pain-clusters.json` | Keep in place | `_data/` |
| Per-brand one-off scrape scripts (e.g. `scripts/scrape_[brand].py`) | Delete | — (generalized site-scraper supersedes) |
| `/ad-library` downloaded media (only if run without `--no-media`) | **Delete entirely** | — (classification is text-only; media was never used) |

**Rules:**
- **Review data files are never deleted**, only relocated.
- **Raw scraped pages ARE deleted** after synthesis. No `00 Archive/`. The point is no bloat — if the synthesis is good, the raw text isn't needed again.

---

## 15. Refresh Cadence

Research is a one-shot pipeline at brand onboarding. It is re-run selectively, not calendar-driven:

- **Re-run Phase 1c + Phase 3c + Phase 4g** (ad library + classification + Persona Summary) when batch planning surfaces a creative pillar shift — e.g. T002 shows a new pillar that wasn't in the scan, or the brand has paused half the ads the scan classified.
- **Re-run Phase 1a + Phase 2c + Phase 4a** (brand reviews + persona re-discovery + Review Analysis) when a T-batch surfaces a persona that doesn't appear in the current Summary, OR after every ~500 new reviews accumulated. Phase 2c re-runs from Step 3 by default (dictionary revision forward) — often sufficient when the dictionary still mostly holds.
- **Re-run Phase 2.5 + Phase 3b + Phase 4f** (competitor bad-reviews + competitor classification + Positioning Ammo) when a new direct competitor is named, or an existing competitor relaunches with major positioning changes.
- **Re-run Phase 1b + Phase 2b (Product Context only)** when the brand changes an offer, adds/removes a SKU, reformulates, or updates pricing. Whole-site crawler runs fresh so no page is missed. Always a refresh trigger at batch planning if any Product Context offer block is dated >60 days old.
- **Full re-run** — only at major brand pivot (repositioning, new product line, new ICP).

No fixed calendar. Refresh is triggered by evidence, not by time.

---

## 16. Tools

### 16.1 Inventory

| Tool | Status | Location | Purpose |
|---|---|---|---|
| `/review-scraper` skill | ✅ Exists | `~/.claude/skills/review-scraper/` | Scrape reviews from 7 platforms + custom fallback |
| `/ad-library` command | ✅ Exists (needs `--no-media` flag added — §16.3) | `00 Global/Hermes/Commands/ad-library.md` | Meta ad library pull |
| `/grab` command | ✅ Exists | `00 Global/Hermes/Commands/grab.md` | Download ad media |
| `00 Global/Hermes/Tools/gemini-api/` | ✅ Exists | `00 Global/Hermes/Tools/gemini-api/` | Text/image/video analysis |
| First-party whole-site crawler | ❌ To build | `00 Global/Hermes/Tools/site-scraper/` | §5.4 contract |
| Persona-counter | ❌ To build | `00 Global/Hermes/Tools/persona-counter/` | §16.3 |
| Review sampler | ❌ To build | `00 Global/Hermes/Tools/review-sampler/` | §16.3 |
| Ad classifier | ❌ To build | `00 Global/Hermes/Tools/ad-classifier/` | §16.3 |
| `brand-researcher` sub-agent | ❌ To build | `.claude/agents/brand-researcher.md` | Orchestrates Phases 0–6 |
| `/research-brand` slash command | ❌ To build | `00 Global/Hermes/Commands/research-brand.md` | UX surface |
| Playwright runtime | ❌ Not installed | — | See §16.2 |

Persona-precision is inlined as a prompt in the sub-agent — no separate tool. `/scrape-site` cut — invoke site-scraper from Bash directly.

Reddit sprints run via Research Engine MCP when the strategist initiates ad-hoc — not part of this pipeline.

### 16.2 One-time install (per machine)

Add to `00 Global/Process/Setup.md`:

```bash
# First-party site scraper (Node — matches 00 Global/Hermes/Tools/* convention)
cd 00 Global/Hermes/Tools/site-scraper && npm install && npx playwright install chromium && cd -

# Review-scraper skill (Python — reuses the chromium binary installed above)
pip install httpx playwright
```

No Playwright MCP. Both paths invoke Playwright via local scripts from Bash.

### 16.3 Tools to build

1. **`00 Global/Hermes/Tools/site-scraper/scrape-site.js`** — §5.4 contract. Node/Playwright recursive whole-site crawler. Reads `/robots.txt` + `/sitemap.xml` on start to surface subdomains. ~3h.
2. **`00 Global/Hermes/Tools/review-sampler/`** — Node. Input: `reviews.jsonl` (pre-lock) or classified `reviews.jsonl` (post-lock). Outputs: stratified Markdown (Review Analysis Appendix A) and persona-segmented Markdown (Appendix B). Pre-lock mode applies the Step 2 context-handling truncation (§7.2 Step 2) when longest-stratum sample exceeds ~150k tokens. ~1h.
3. **`00 Global/Hermes/Tools/persona-counter/`** — Node. Input: `reviews.jsonl` + `persona-dictionary.json`. Outputs: full frequency table, Multi-Persona Overlap top 20, untagged residual %, per-review `personas: [...]` field written back to JSONL. ~1–2h.
4. **`00 Global/Hermes/Tools/ad-classifier/`** — Node. Input: `ad-library-raw.json` + locked persona taxonomy + angle library (starts empty, accumulates). Outputs: per-ad `{persona, angle, format}` JSON + top-level `angle_clusters` canonical map + aggregate `Persona | Angle | Ad Count` table. Gemini classification, batched 10/call with exponential backoff. Three sub-modes: (a) initial classification, (b) **angle deduplication pass** (§9 — consolidates near-duplicate angle strings to canonical form), (c) inline precision-validator (20-ad rescore per persona). ~2–3h (adds ~30–60 min for the dedup pass over the prior spec).
5. **`brand-researcher` sub-agent** at `.claude/agents/brand-researcher.md` — orchestrates phases, enforces auto-gates, dispatches parallel phase workers, inlines persona-precision prompt (Step 5) and pain-cluster prompt (Step 6). Tracks the shared 2-iteration budget across Step 4 halts and Auto-Gate B failures. ~3h.
6. **`/research-brand` slash command** at `00 Global/Hermes/Commands/research-brand.md` — intake UX wrapping the sub-agent; supports first-time-run and selective-refresh entry modes (§17.1). ~1h.
7. **Add `--no-media` flag to `/ad-library`** — the existing tool downloads media by default; research pipeline doesn't need it (§5.5, §17.3). Flag skips media download and returns metadata-only output. ~30 min.

**One-time install (not counted in build effort):** Playwright Chromium via `npx playwright install chromium` — ~15 min on first machine, downloads ~170 MB browser binary. Captured in `Setup.md` (§16.2).

**Total build effort: ~12–13h** (v5.2 adds ~30 min for the `/ad-library --no-media` flag; still well below v4's ~13–15h).

---

## 17. Automation — `/research-brand`

### 17.1 UX — entry modes

The command has two entry modes: **first-time run** (full pipeline) and **refresh** (selective, per §15).

**First-time run** — fires all Phases 0–6 end to end:

```
Strategist: /research-brand IM8
  website: https://im8health.com
  ad_library: https://facebook.com/ads/library?...&view_all_page_id=...
  competitors:
    - AG1 (same form: daily foundational powder; ~same price: $99 vs $60)
    - Huel (same form + similar price tier)
```

On first-time run, the orchestrator checks that `[Brand]/00 Context/` is empty (or contains only compliance/guardrails docs). Compliance docs are detected by filename regex `(?i)(compliance|guardrails|claims)` (case-insensitive), matching the convention in CLAUDE.md's "compliance docs are mandatory reading" rule. If Persona Context, Brand Context, Product Context, or Persona Summary are already present, the orchestrator refuses to proceed and asks the strategist to switch to `--refresh` instead — this prevents accidental full re-runs that overwrite curated state.

**Refresh run** — re-runs a subset of phases per §15:

```
Strategist: /research-brand IM8 --refresh=ads
Strategist: /research-brand IM8 --refresh=reviews
Strategist: /research-brand IM8 --refresh=competitors
Strategist: /research-brand IM8 --refresh=product
Strategist: /research-brand IM8 --refresh=brand
Strategist: /research-brand IM8 --refresh=full   # forces full re-run; requires explicit --confirm
```

Refresh-mode mapping to §15:

| Flag | Phases re-run | Trigger from §15 |
|---|---|---|
| `--refresh=ads` | 1c → 3c → 4g | Creative pillar shift surfaces at batch planning |
| `--refresh=reviews` | 1a → 2c (from Step 3 by default; `--from-step=2` forces full re-cluster) → 4a | New persona surfaces or ~500 new reviews accumulated |
| `--refresh=competitors` | 2.5 → 3b → 4f | New direct competitor named or major repositioning |
| `--refresh=product` | 1b → 2b (Product Context only) | Offer change, new SKU, reformulation, pricing update, or offer block >60 days old |
| `--refresh=brand` | 1b → 2a | Brand Context gap flagged at Checkpoint 3 or during batch planning |
| `--refresh=full` | All phases including Phase 0 intake re-prompt (website URL, Meta Ad Library URL, competitor list); overwrites all generated docs; preserves `00 Context/` compliance/guardrails files | Major brand pivot only; `--confirm` required |

Refresh-mode outputs overwrite the specific docs they regenerate and leave everything else untouched. Numbers re-reconcile across docs at the end of the refresh via the Phase 5 QA pass (scoped to the affected docs).

Compliance/guardrails docs are supplied by the client and placed in `00 Context/` by the strategist when received — they are not part of intake or pipeline output, and are never touched by refresh mode. Reddit sprints are strategist-initiated ad-hoc, not part of this orchestrator flow.

### 17.2 What the orchestrator does

- Validates Phase 0 intake (URLs present; 0–5 competitors allowed at intake per §4.1; tests 1 + 2 pass-rationale required for each nominee).
- Dispatches Phase 1 tracks in parallel (brand reviews, whole-site crawl, ad library).
- Runs Auto-Gate A (coverage). Auto-advance on pass; retry once + log on fail.
- Runs Phase 2 (brand/product context drafts + six-step persona discovery — all steps mandatory). Tracks the shared Step 4 / Auto-Gate B 2-iteration budget.
- Runs Auto-Gate B (persona lock). Auto-loopback to Step 3 within the shared budget; proceed with flagged state if unresolved.
- Auto-validates competitor test 3 (switch-mention); auto-demotes zero-mention nominees to adjacent. **If fewer than 2 nominees survive all three tests post-validation**, auto-derivation runs against `reviews.jsonl` to promote top switch-mention brands (§4.2 auto-derivation fallback).
- Runs Phase 2.5 (competitor review scraping) automatically after persona lock + competitor validation.
- Runs Phases 3–5 without pause (classification — including the angle-deduplication sub-step — + synthesis + QA).
- Pauses at Checkpoint 3 for strategist review.
- Runs Phase 6 cleanup on approval.

### 17.3 What the orchestrator does NOT do

- Does not invent data. Scraping gaps are flagged in Review Analysis §1 methodology; no hallucinated quotes. Journey Map stages with no review signal are flagged as inferred, not written as fact.
- **Does not perform the gap analysis.** Persona Summary presents data (frequency + ad orientation + pillars) and light surface-level observations only. No prescriptive angle suggestions, no interpretive "Gap" column, no "opportunity" flags. The strategist makes the calls.
- Does not generate or scrape compliance/guardrails documents — client-supplied.
- Does not run Reddit sprints — strategist ad-hoc via Research Engine MCP.
- Does not apply TEEP / Three Selves / Emotional Zones frameworks during research. Those are strategist tools applied later at batch planning.
- Does not write Ads Analysis docs (`02 Ads Analysis/`) — driven by ad-account performance data, separate from research.
- Does not trigger ClickUp or Notion loading. Research output stays in the vault until the strategist promotes it.
- **Does not use ad media for classification, run Gemini vision, or transcribe audio.** Ad classification is text-only (primary text + headline + description + on-image text + caption). The `/ad-library --no-media` flag prevents media from being downloaded in the first place; if the flag is unavailable (pre-§16.3 build), Phase 6 cleanup deletes the downloaded media directory since it was never used.

---

## 18. Next Steps

1. **Strategist sign-off** on v5.2 as the canonical process.
2. **Install Playwright** on the current machine (§16.2).
3. **Build `site-scraper`** (whole-site recursive crawler) at `00 Global/Hermes/Tools/site-scraper/` (§5.4, §16.3). ~3h.
4. **Build `review-sampler`** at `00 Global/Hermes/Tools/review-sampler/` (§7.2 Step 1, §10.5 Appendices). ~1h.
5. **Build `persona-counter`** at `00 Global/Hermes/Tools/persona-counter/` (§7.2 Step 4). ~1–2h.
6. **Build `ad-classifier`** at `00 Global/Hermes/Tools/ad-classifier/` (§9, §11). ~2h.
7. **Build `brand-researcher` sub-agent** at `.claude/agents/brand-researcher.md` (§17). ~3h.
8. **Build `/research-brand` slash command** (§17.1). ~1h.
9. **Add `--no-media` flag to `/ad-library`** (§5.5, §16.3). ~30 min.
10. **Promote this doc** to `00 Global/Process/Brand Research.md` (minus §1, Appendix A, Appendix B).
11. **Backfill Persona Summary + Persona Context refresh** for IM8, Elevate, FitSleeps, Lifeforce. ~1h total once the tools are built.
12. **Test on next new brand onboarded.** Capture gaps → iterate.

---

## Appendix A — Decisions Log

Resolved items.

| # | Question | Decision |
|---|---|---|
| 1 | Playwright install acceptable? | Yes. Documented as one-time setup in `Setup.md`. |
| 2 | Amazon scraping approach | Skip Amazon scraping. WebSearch-verbatim-quote fallback is sufficient; no paid proxy. |
| 3 | Shared persona keyword dictionaries per category? | No. Every brand's dictionary is derived from its own review corpus. Cross-brand dictionaries lose the specificity that makes persona-tagging work. |
| 4 | How many personas? | Emerges from review clustering. Typically 4–6. Auto-Gate B applies structural rules; Checkpoint 3 is where the strategist can call for re-clustering. |
| 5 | Deep vs terse persona docs? | Deep (all parts present, quote-sourced). Parts 1, 2, 4, 5 in `00 Context/`; Part 3 (Journey Map) in `00 Research/Persona Deep Research`. |
| 6 | TEEP / Three Selves / Emotional Zones mapping? | Not part of research. Frameworks are applied later by the strategist at batch planning. |
| 7 | Direct-competitor selection rule? | §4.2 three-test gate (same pain/job, price tier, review-switch-mention). Form factor is explicitly NOT a test — prospects shop by pain, not by format. Test 3 auto-validated post-persona-lock. |
| 8 | Reddit as a pipeline phase? | No. Reddit sprints are strategist-initiated ad-hoc via Research Engine MCP. |
| 9 | Compliance as a pipeline doc? | No. Client-supplied. |
| 10 | First-party site scraping — page list or whole-site? | Whole-site recursive crawl (§5.4). No strategist confirmation step. Safety net: `--max-pages` cap + crawler manifest. |
| 11 | Round ad-share %s to 5% buckets? | No. Both axes of the frequency and pillar tables are exact counts. Classification uncertainty is tracked via precision validation, not rounding. |
| 12 | Persona discovery — top-down dictionary or bottom-up sampling? | Bottom-up, per Huel Q3 methodology (§7.2). Six-step pipeline, all steps mandatory. |
| 13 | Competitor review scraping — Phase 1 or after persona lock? | After persona lock (Phase 2.5). Competitor classification (Phase 3b) requires the locked dictionary; scraping earlier wastes work if personas change. |
| 14 | Gap analysis — computed in pipeline or left to strategist? | **Left to strategist.** Persona Summary presents data (frequency + ad orientation + pillars) and light surface-level observations only. No prescriptive angle suggestions, no interpretive "Gap" column, no "opportunity" flags. |
| 15 | Folder fragmentation — keep 5+7 docs or consolidate? | **Consolidate to 4 context + 3 research.** Persona Summary absorbs Ad Library Orientation + Creative Pillar Scan. Review Analysis absorbs Review Samples + Review Scraping Status. Product Context absorbs Landing Page Analysis. Machine data moves to `_data/`. |
| 16 | Checkpoints 1 and 2 — strategist pause or automated? | **Automated gates with auto-loopback.** Auto-Gate A (coverage) and Auto-Gate B (persona lock). Checkpoint 3 (final review) is the only strategist pause. |
| 17 | Step 6 pain-based refinement — optional or mandatory? | **Mandatory.** Part 5 ad-angle derivation depends on `pain-clusters.json`. |
| 18 | Gemini vision/transcription on ad media? | **No.** Text-only classification from primary text + headline + description + on-image text + caption. Saves cost and runtime. |
| 19 | Persona-precision as separate Node tool? | No. Inlined as sub-agent prompt (Step 5). |
| 20 | LLM per step? | Claude for synthesis (Phase 4 writes) + Step 2 open clustering. Gemini for high-volume classification (Step 5 precision, Step 6 pain tagging, ad-classifier). |

---

## Appendix B — Changelog

- **v5.2 (2026-04-20)** — Blocker and high-priority-gap fixes on v5.1 from the audit pass. No architecture change. **Blockers (5):** (B1) §11 "Creator patterns" bullet cut — no creator/page-name field in `_data/ad-library-raw.json`; kept "Recurring primary-text patterns" and "Recurring headline patterns" since those fields ARE captured. (B2) `/ad-library --no-media` flag mandated in §5.5, §17.3, §14 cleanup, §16.1 tool status. Flag is a small add to the existing tool, tracked as §16.3 item 7 and §18 step 9. (B3) §4.2 auto-derivation "brand metadata lookup" replaced with explicit WebSearch-based evidence capture (`"[brand] product" / "[brand] reviews" / "[brand] price"`, 3 queries max per nominee) + LLM scoring against tests 1 and 2. (B4) §8.5 adjacent-brand handling rewritten — both failed-at-intake (tests 1/2) and auto-demoted (test 3) categories now handled identically: not scraped by pipeline; optional strategist ad-hoc WebSearch post-Checkpoint 3; no QA enforcement. §4.2 misleading "may seed Positioning Ammo" promise removed. (B5) **Direct-competitor test 1 rewritten from form-factor-based to pain-based** — prior rule excluded AG1 (powder) vs Ritual (capsules) as non-competitors because of form mismatch; strategist confirms prospects shop by pain, not format. New test 1: "Does it target the same primary pain point or job-to-be-done for the same prospect?" Form factor explicitly non-disqualifying. Appendix A decision 7 updated. **High-priority gaps (8):** (G1) §7.2 Step 1 small-corpus rule added — corpora <100 use full corpus; 100–499 include all with stratum partitioning; small-N personas flag Persona Summary banner. (G2) §7.2 Step 6 fixed "1,000–2,000 reviews" replaced with `min(2000, max(500, ceil(corpus × 0.10)))` + full-corpus fallback when smaller. (G3) §9 sparse-persona precision path — classification always runs; precision measurement scales (≥20 = sample 20; 5–19 = rescore all; <5 = skip + banner). Zero-ad personas still listed in Creative Pillars rollup. (G4) §4.1 "no Meta page exists" path — `ad_library: none` intake accepted; Phase 1c / 3c / §11 sections 2 + 3 waived; banner fires. (G5) §17.1 compliance-doc detection regex named: `(?i)(compliance\|guardrails\|claims)` per CLAUDE.md convention. (G6) §10.3 "Structure suggestions" now points to `00 Global/Criteria/Video Script Criteria.md` + `Headline & Text Hook Criteria.md` for the structure taxonomy. (G7) §17.1 `--refresh=full` clarified to include Phase 0 intake re-prompt; preserves `00 Context/` compliance files. (G8) §9 retry-prompt template defined verbatim — persona descriptors + keyword set + borderline examples from first-pass disagreements injected. **Additional:** §12 QA checklist gained 7 items (Positioning Ammo Fatal Flaw + theme structure, Brand Context completeness, Persona Context word/quote counts, auto-derivation evidence logging, Ad Library Orientation pattern counts, cleanup of pre-flag media downloads). §11 banner triggers expanded (no-Meta-page, small-N corpus, <5-ad persona). §14 cleanup table gains ad-library media row. Appendix A decision 7 updated. Build total: ~12–13h (adds 30 min for the `--no-media` flag build).
- **v5.1 (2026-04-18, night)** — Spec-gap fixes on v5; no architecture change. **Blocking (7):** (B1) angle deduplication pass added to ad-classifier (§9) — without it, the Creative Pillars table fragments identical ideas across rows and undercounts pillar volume; `_data/ad-classifications.json` now includes a top-level `angle_clusters` canonical map. (B2) Competitor auto-derivation trigger corrected from "<2 at intake" to "<2 survivors of all three tests post-persona-lock" (§4.2, §17.2) — intake count was the wrong gate because test 3 demotions can drop a 3-nominee intake to 1 survivor. (B3) Substitution-test wording fixed in §4.2 — "powder vs pill vs drink" misread as equivalence; now "e.g., both powders, both capsules, or both drinks — not powder vs pill." (B4) Loop-budget unified: the 2-iteration cap is shared across Step 4 halts and Auto-Gate B failures (§7.2 Step 4, §8). (B5) Step 2 context-handling rule added (§7.2 Step 2): ~150k-token cap with per-review 600-word truncation; sample size never drops below 500. (B6) `/research-brand` entry modes defined (§17.1): first-time run refuses if `00 Context/` is non-empty; `--refresh=ads|reviews|competitors|product|brand|full` covers §15 selective refreshes. (B7) Pain-anchor format fixed: `pain-clusters.json` schema in §7.2 Step 6 now includes `representative_quote` + `representative_review_id`; §10.3 Part 5 format rewritten so pain anchor is a verbatim review quote with `review_id`, copied directly from the cluster — no LLM summary. **Inconsistencies (10):** (I1) §11 example persona set made consistent across frequency table, pillars table, ad-share rollup, and gap rec (all four sections now use the IM8 set — Pill Fatigue Simplifier / Energy Seeker / Gut Health Seeker). (I2) §4.2 "does not appear in the Creative Pillars gap observations" clause rewritten — the referenced section no longer exists. (I3) §9 output → §4g aggregation documented explicitly (grouping, pillar-threshold formula, persona ad-share rollup, zero-ad persona listing). (I4) §5.5 WebFetch dual path removed — single canonical path via `/ad-library`. (I5) §7.3 single-source-of-truth claim softened: Persona Summary no longer promises precision %s in its main table; precision state is surfaced only via the degraded-state banner. (I6) §14 cleanup table adds a row for `competitor-reviews/*-websearch.md` (never deleted). (I7) 60% vs 70% precision threshold split justified in §9: ad classification sees a 30-word lead with a concentrated idea; review classification survives reviewers mentioning four things at once. (I8) §12 dropped the tautological "classified count matches raw count" check; replaced with "every ad has a classification + every classified angle exists in `angle_clusters`" coverage check. (I9) §8 rejection routing broadened beyond persona loop — Product Context, Positioning Ammo, Brand Context, and QA-only paths explicitly mapped. (I10) Banner format consolidated into a single spec block in §11, with five named triggers; Auto-Gate B and §9 now reference §11 instead of re-stating banner copy. **Refinements (7):** (R1) §10 intro lists every 4x track's dependencies explicitly (previously 4g dependencies were implicit). (R2) §8 demographic blocklist regex locked: six named patterns, case-insensitive, "pain-qualifier suffix" exception defined. (R3) §10.4 SKU-variant dedup rule added: flavor/size/bundle variants roll up into one Product block; separate blocks only on mechanism/ingredient/claim/positioning divergence. (R4) §11 Ad Library Orientation "First-seen date range" label renamed to `first_seen range` to match the JSON key in `ad-library-raw.json`. (R5) Playwright one-time install time (~15 min, ~170 MB binary) called out separately from build effort; build total updated to ~11.5–12.5h. (R6) §4.2 rationale added for why test 3 runs post-persona-lock (depends on Phase 1a + Phase 2c outputs). (R7) §7.4 states explicitly that the 4–6 persona-count guidance is not an Auto-Gate B rule — structural criteria only; count judgment is Checkpoint 3 territory.
- **v5 (2026-04-18, late evening)** — Consolidation pass on v4. (1) **Folder structure collapsed** from 5 context + 7 research to 4 context + 3 research docs. Persona Summary absorbs Ad Library Orientation + Creative Pillar Scan (one scannable doc — frequency → ad orientation → pillars → light gap rec). Review Analysis absorbs Review Samples (as Appendices A + B) + Review Scraping Status (as §1 Methodology & Coverage). Product Context absorbs Landing Page Analysis (as Funnel Architecture section). Machine data moves to `00 Research/_data/`. (2) **Checkpoints 1 and 2 replaced with automated gates.** Auto-Gate A (coverage) and Auto-Gate B (persona lock) auto-advance on pass; loopback on fail up to 2 iterations; proceed with flagged state if unresolved. Checkpoint 3 is the only strategist pause. Target runtime ~90 min wall clock (down from v4's 4–8h with checkpoint waits). (3) **Step 6 pain-based refinement is now mandatory** (was optional). Part 5 ad-angle derivation depends on `pain-clusters.json`. (4) **Gap analysis is the strategist's job, not the pipeline's.** Persona Summary presents data + light surface observations. No prescriptive angle suggestions, no interpretive "Gap" column, no "opportunity" flags in the data sections. (5) **Ad-library classification confirmed text-only** — no Gemini vision, no audio transcription. Saves API cost and runtime. (6) **Persona-precision inlined as sub-agent prompt** — no separate Node tool. (7) **`/scrape-site` optional command cut** — invoke site-scraper from Bash directly. (8) **Rate-limiting added** to ad-classifier (10-ad batches, exponential backoff) and Step 5 precision validation. (9) **LLM specified per step** — Claude for synthesis + Step 2 open clustering; Gemini for high-volume classification (Steps 5, 6, ad-classifier). (10) **Competitor test 3 auto-validation** — switch-mention check runs automatically post-persona-lock; zero-mention nominees auto-demoted to adjacent and logged. (11) **Crawler reads `/robots.txt` + `/sitemap.xml` on start** and reports off-host URLs (subdomain discovery). (12) **Numbers have a single source of truth** — `_data/persona-dictionary.json` + classified `reviews.jsonl` + `ad-classifications.json`. Persona Summary, Review Analysis, Persona Context all render from the same source; no manual number re-typing. (13) **Build effort ~11–12h** (down from ~13–15h). (14) **Phase numbering tightened** — old Phase 5 (Gap Analysis) folded into Phase 4g. QA is Phase 5; Cleanup is Phase 6. (15) **`personas:[...]` write timing fixed** — explicitly at Phase 2c Step 4, not "Phase 3a after classification." (16) **Gap trigger formula redundancy removed** (prior `reviews% > ads%` clause was logically implied; now moot because pipeline doesn't compute a gap trigger at all). (17) **Review Samples overwrite issue fixed** — pre-lock stratified sample preserved in Review Analysis Appendix A; post-lock persona-segmented in Appendix B.
- **v4 (2026-04-18, evening)** — Audit pass on v3. Emotion Rank removed, Research Log dropped, phase-number bug fixed, Landing Page Analysis formalized as Phase 4i, ad-classifier failure path + Amazon routing + WebSearch file paths + intake fallback timing + subdomain handling + Review Samples post-lock spec filled in.
- **v3 (2026-04-18, PM)** — Strategist feedback pass. Reddit removed from pipeline, Compliance removed from pipeline, whole-site crawl adopted, Huel six-step persona methodology, competitor scraping moved to Phase 2.5, Review Samples added, Gap rule rewritten with Emotion Rank.
- **v2 (2026-04-18)** — Full rewrite. Collapsed drafting layers into one linear spec. Added §4.2 direct-competitor rule and Checkpoint 2 validation.
- **v1 (2026-04-17)** — Original proposal, four layered passes.

---

*End of proposal. Ready for strategist review.*
