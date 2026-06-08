# Brand Research

> Canonical process for researching a new brand from scratch, or refreshing an existing one. Covers intake, review scraping, first-party whole-site scraping, ad-library read, multi-pass persona discovery, competitor scraping, deep synthesis, spec card generation, automated QA, and cleanup. End-to-end runtime ~90 min wall clock; strategist only pauses at Phase 0 intake + Checkpoint 3. Invoked via `/research-brand`.

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
│   ├── Persona Summary - [Brand].md            (frequency + ad orientation + pillars + light gap rec)
│   ├── Brand Spec Card.png                     (generated Phase 5 — NB2 reference image for static generation)
│   └── Visual Style Card.png                   (generated Phase 5 — NB2 reference image for static generation)
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

**Pipeline scratch:** during Phases 1–4 the crawler writes raw page text to a temporary `[Brand]/raw_pages_tmp/` folder at the brand root. Phase 7 deletes the folder entirely. It never appears in the permanent structure.

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
  ├─ Collect positioning competitor list (§4.2 rule; 0–5 at intake, auto-derivation post-persona-lock if <2)
  ├─ Ask for optional customer data sources (surveys, support tickets, win/loss notes)
  └─ Create folder skeleton

                           ↓

PHASE 1 — RAW DATA COLLECTION                            [3 tracks in parallel]
  ├─ 1a. Brand reviews scrape             → Reviews/reviews.jsonl
  ├─ 1b. First-party whole-site crawl     → raw_pages_tmp/*.txt  (deleted at Phase 7)
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
  no >80% overlap between two personas; Positioning Competitor switch-mention counts logged.
  Fail: auto-loopback to Step 3 dictionary revision, up to 2 iterations, then proceed
  with best-available and surface state in Persona Summary banner.
  No pause.

                           ↓

PHASE 2.5 — COMPETITOR REVIEW SCRAPING                   [after persona lock]
  ├─ Scrape 1–3★ reviews for each Positioning / Customer-Validated Competitor → Reviews/competitor-reviews/
  └─ Capture blocked-platform quotes via WebSearch fallback (§5.3)

                           ↓

PHASE 3 — CLASSIFICATION AGAINST LOCKED PERSONAS         [3 tracks in parallel]
  ├─ 3a. Tag own-brand reviews → persona(s)        [formalized from 2c]
  ├─ 3b. Tag competitor 1–3★ reviews → persona
  └─ 3c. AD-LIBRARY CLASSIFICATION                 (classify every live ad)
           Text-only: primary text + headline + description + caption + on-image text.
           No vision, no transcription. Output: _data/ad-classifications.json

                           ↓

PHASE 4 — DEEP SYNTHESIS                                 [8 tracks, parallel except where noted]
  ├─ 4a. Review Analysis                  → Review Analysis.md
  │         Absorbs stratified sample (pre-lock) + persona-segmented sample
  │         (post-lock) as appendices + Scraping Coverage methodology section
  ├─ 4b. Persona Context Parts 1 + 2      → Persona Context.md
  ├─ 4c. Persona Context Part 4 — Objections     (REQUIRES 3a + 3b)
  ├─ 4d. Persona Context Part 5 — Ad Angles      (REQUIRES 3a + 3b + pain-clusters.json)
  ├─ 4e. Persona Deep Research (Part 3)   → Persona Deep Research.md
  ├─ 4f. Positioning Ammo                 → Positioning Ammo.md
  ├─ 4g. Persona Summary                  → Persona Summary.md
            Frequency table + Ad Library Orientation + Creative Pillars + light gap rec
  └─ 4h. Market Sophistication Assessment → Brand Context.md section

                           ↓

PHASE 5 — SPEC CARD GENERATION                           [automated]
  ├─ Brand Spec Card (logos, typography, color palette, CTA button)
  └─ Visual Style Card (brand essence, photography direction, always/never rules)
  See 00 Global/Statics Generator/Brand Spec Card Prompt.md + Visual Style Card Prompt.md
  Output: 00 Context/Brand Spec Card.png + Visual Style Card.png

                           ↓

PHASE 6 — AUTOMATED QA (orchestrator)                    runs to pass
  (see §12 for the checklist)

                           ↓

━━━ CHECKPOINT 3 — STRATEGIST FINAL REVIEW ━━━
  Strategist reads Persona Summary first (30-sec orient), then Persona Context,
  then spot-checks Research/ docs. Approval releases the brand to batch production.

                           ↓

PHASE 7 — CLEANUP (automated)
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
  3. Up to 5 positioning competitors (see rule below)
     If you have 0–1 in mind, that's fine — I'll mine reviews
     for switch-mentions after persona lock and auto-propose the rest.
  4. Optional but high-value — does the client have any of these?
     - Post-purchase survey data
     - Customer support ticket themes
     - Win/loss interview notes

Items 1 and 2 are required. Competitors can be empty at intake.
```

If the Meta Ad Library returns zero live ads, the `brand-researcher` surfaces that to the strategist and proceeds without ad-library-dependent outputs (Persona Summary publishes only the frequency section; Ad Library Orientation and Creative Pillars sections carry "No live ads as of [date]" notes).

**If the brand has no Meta page at all** (strategist can't supply an Ad Library URL or FB page), the orchestrator accepts the intake with `ad_library: none` and runs the full pipeline minus Phase 1c and Phase 3c. Persona Summary carries a "No Meta presence as of [date]" note in place of sections 2 and 3, and Auto-Gate A's ad-library criterion is waived for this run. Recorded in Review Analysis §1 methodology.

### 4.2 Competitor categorization

Past failure mode: one "direct competitor" gate was doing three jobs at once: Positioning Ammo, market-sophistication reads, and customer consideration-set discovery. The pipeline now keeps those jobs separate.

**Core rule:** switch-mentions upgrade confidence. Absence of switch-mentions does not disqualify, because most customers do not name competing brands in reviews.

| Set | Criteria | Use |
|---|---|---|
| **Market Player** | Active in the same solution / claim landscape, even if not the same exact buyer pain | Market sophistication, claim crowding, format landscape |
| **Positioning Competitor** | Plausibly solves the same pain or job for the same buyer. Evidence can include homepage positioning, ad copy, category search behavior, Reddit/comment comparisons, surveys, support tickets, strategist judgment, or price relationship. Form factor is irrelevant. | Positioning Ammo, counter-angles, competitor wedges |
| **Customer-Validated Competitor** | A positioning competitor that also appears in switch/comparison language from reviews, comments, Reddit, surveys, or support tickets | Highest-confidence Positioning Ammo; strongest "used to use X" language |

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

**Intake check:** strategist names each positioning competitor plus a one-line rationale confirming which pain/job it targets. Price tier is captured as a relationship descriptor, not evaluated as a pass/fail gate. Brands that are only category-adjacent are logged as Market Players or adjacent references, not scraped for Positioning Ammo unless the strategist explicitly approves that scope.

**Automated post-persona-lock switch-mention check:** orchestrator counts switch-mentions in the brand's own `reviews.jsonl` against each nominated Positioning Competitor's name + aliases. Log the mention count in Positioning Ammo regardless. Zero switch-mentions never auto-demote an intake-approved Positioning Competitor; the count only changes confidence.

**Auto-derivation fallback:** if fewer than 2 Positioning Competitors are nominated at intake, the orchestrator mines `reviews.jsonl` for top brands mentioned in switch/comparison language and proposes them automatically (target: 2–3 Positioning Competitors total). Each promoted brand still needs same-pain/job validation:

- Switch-mention count is the confidence upgrade by construction.
- Same-pain/job and price relationship are evaluated via WebSearch: the orchestrator queries `"[brand] product"`, `"[brand] reviews"`, `"[brand] price"` (3 queries max per nominee), captures (a) the brand's stated pain/job positioning from its own homepage or top-ranked press coverage and (b) MSRP / subscription price. An LLM scores same-pain/job as `pass / fail / uncertain` and records price relationship as `cheaper / similar / premium / unknown`.

Promotions are logged in Positioning Ammo with exact switch-mention count, WebSearch evidence excerpt, same-pain/job score, price relationship, and confidence label. Strategist confirms or rejects uncertain candidates at Checkpoint 3.

Market Players can also be surfaced during the browser-based Meta Ad Library keyword scan used for market sophistication (§10.8). They are not scraped for Positioning Ammo unless they also qualify as Positioning Competitors.

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

Empty placeholder files are NOT created. Docs are written when their phase produces them. `raw_pages_tmp/` is created by the site-scraper at Phase 1b runtime and removed at Phase 7.

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

Built at `.claude/tools/site-scraper/`, matching the existing `.claude/tools/grab/` and `.claude/tools/gemini-api/` convention. Node / Playwright library, invoked from Bash. **No Playwright MCP.**

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
node .claude/tools/site-scraper/scrape-site.js \
  --url https://im8health.com \
  --output-dir "IM8/raw_pages_tmp"
```

**Crawl manifest.** On completion the crawler writes `raw_pages_tmp/_crawl_manifest.json`:
- `pages_visited`: count + list of URLs
- `pages_skipped`: count + reason (off-origin, excluded pattern, non-HTML, dedupe)
- `queue_incomplete`: list of URLs queued but not visited (hit `--max-pages`). Empty = full crawl completed.
- `subdomains_from_sitemap`: off-host URLs found in robots/sitemap.

Auto-Gate A (§6) auto-accepts complete manifests and partial-with-coverage manifests; logs state in Review Analysis §1.

`raw_pages_tmp/` is scratch — synthesized into Brand Context + Product Context during Phase 4, then deleted at Phase 7.

**What we extract from scraped pages:**

| Synthesize into → | From pages | What to capture |
|---|---|---|
| Brand Context | About, homepage, team, press | Mission, personnel, funding, social presence, moats |
| Product Context (spec §10.4) | Every PDP, bundle, "compare," science/how-it-works, FAQ, subscription terms, guarantee, landers, funnel pages | Verbatim hero copy, dated offer structure, full ingredient list + dosages, cross-product comparison, FAQ-answered objections, funnel architecture, CTA language |

### 5.5 Ad library read

The pipeline invokes `~/.claude/tools/ad-library/scrape.js` directly (not via the `/ad-library` slash command), with `--output` pinned to `[Brand]/00 Research/_data/ad-library-scrape/`. `scrape.js` is metadata-only by default — no media download — which is what the research pipeline needs. (WebFetch is not used here — it misses the Ad Library's dynamic rendering and pagination.) Capture per ad: `ad_archive_id`, primary text, headline, description, on-image text (static ads), video caption text, ad format, `start_date_formatted`.

**Schema bridge.** `scrape.js` (via the Apify `curious_coder~facebook-ads-library-scraper` actor) writes a nested `ads-raw.json` shape: `{ ad_archive_id, start_date_formatted, snapshot: { body:{text}, title, link_description, display_format, cards[], ... } }`. `ad-classifier/classify.js` expects a flat schema: `{ ad_id, primary_text, headline, description, on_image_text, caption, ad_format, first_seen }`. The `flatten-apify.js` utility (at `.claude/tools/ad-classifier/flatten-apify.js`) bridges the two. Canonical invocation:

```bash
node ~/.claude/tools/ad-library/scrape.js \
  --brand "[Brand]" \
  --url "[ad_library_url]" \
  --output "[Brand]/00 Research/_data/ad-library-scrape"

node .claude/tools/ad-classifier/flatten-apify.js \
  --input  "[Brand]/00 Research/_data/ad-library-scrape/ads-raw.json" \
  --output "[Brand]/00 Research/_data/ad-library-raw.json"
```

**Note on Meta terminology:** "primary text" is the post copy above the creative (the same thing the strategist may colloquially call "the caption"). The `caption` field in the schema is the separate on-video subtitle/caption track when present. `flatten-apify.js` emits `caption: ""` because Apify does not expose the subtitle track separately — the classifier's `caption` therefore is empty in practice, and classification relies on primary text + headline + description + on-image text.

**Text-only classification. No media downloads, no audio transcription, no Gemini vision.** The classifier reads primary text + headline + description + on-image text + caption. Saves API cost and runtime; accepts noise on video ads where VO adds signal not present in the caption.

Output: `00 Research/_data/ad-library-raw.json` — one flat object per live ad.

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

**Step 4 — Classify the full corpus** via `.claude/tools/persona-counter/`

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
6. Positioning Competitor switch-mention counts complete (§4.2); zero-mention competitors retained and logged with confidence, not auto-demoted.

**Fail path:** auto-loopback to Step 3 (dictionary revision) within the shared Step 4 / Auto-Gate B 2-iteration budget (§7.2 Step 4). Once the budget is exhausted, proceed with best-available state and flag at top of Persona Summary via the degraded-state banner (§11).

Auto-advance to Phase 2.5 on pass. No strategist pause.

**On rejection at Checkpoint 3** (strategist overrides): loop back to the specific phase the strategist flags.
- **Persona issues** → Phase 2c. Dictionary revisions re-enter at Step 3; full re-cluster re-enters at Step 2; pain-cluster refinement re-enters at Step 6. Re-running any earlier step runs the downstream steps automatically.
- **Product Context gaps** (missing SKU, outdated offer block, missing funnel page) → Phase 2b re-run, typically preceded by a targeted Phase 1b site re-scrape of the affected URLs.
- **Positioning Ammo weaknesses** (thin competitor quotes, missing fatal flaw) → Phase 4f re-run, preceded by Phase 2.5 competitor re-scrape if the underlying corpus is the problem.
- **Brand Context gaps** (missing moat, weak positioning section) → Phase 2a re-run against the existing `raw_pages_tmp/` if still present, otherwise preceded by Phase 1b re-scrape of About / homepage / press pages.
- **QA regression** (numbers drifted, banner not raised when it should be) → re-run Phase 6 QA only, without re-running synthesis.

---

## 8.5 Phase 2.5 — Competitor Review Scraping

Runs after Auto-Gate B passes.

**Sequence rationale.** Competitor classification (Phase 3b) requires the locked persona dictionary. Scraping earlier would mean either re-scraping if personas change, or biasing discovery toward competitor language.

**Inputs from Auto-Gate B:**
- Positioning Competitor / Customer-Validated Competitor list from §4.2
- Locked `persona-dictionary.json`

**Execution:**
- Per Positioning Competitor / Customer-Validated Competitor: scrape 1–3★ reviews using the same platform coverage table (§5.2) as brand reviews. Same output schema (§5.1 rule 3).
- Written to `00 Research/Reviews/competitor-reviews/[competitor-slug].jsonl`
- Platform-blocked competitors: WebSearch fallback per §5.3 patterns. Quotes written to `00 Research/Reviews/competitor-reviews/[competitor-slug]-websearch.md` (verbatim, attributed with source URL + capture date). Phase 4f reads this into Positioning Ammo.

**Output feeds:**
- Phase 3b (classify each competitor review against own-brand personas)
- Phase 4f (Positioning Ammo — theme-clustered 1–3★ quotes per competitor)

**Market Players and adjacent brands.** Both are excluded from pipeline review scraping by default:

1. **Market Players** — active in the same claim landscape, useful for market sophistication (§10.8), but not necessarily substitutable for the same buyer pain/job.
2. **Adjacent brands** — category-near but weak same-pain/job evidence.

Neither category is classified or ammo-synthesized by default. If the strategist explicitly wants adjacent-brand reference quotes post-Checkpoint 3, they can collect them ad-hoc via WebSearch and file them in an optional "Adjacent Space Signals" appendix inside Positioning Ammo — this is a strategist judgment call, not a pipeline output, and Phase 6 QA does not enforce its presence.

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

Eight tracks, parallel except where noted.

**Dependencies (explicit):**
- 4a (Review Analysis) depends on 3a (own-brand persona tagging).
- 4c (Part 4 Objections) depends on 3a + 3b (competitor tagging).
- 4d (Part 5 Ad Angles) depends on 3a + 3b + `_data/pain-clusters.json` (from Step 6).
- 4f (Positioning Ammo) depends on 3b.
- 4g (Persona Summary) depends on 3a (classified `reviews.jsonl` for frequency) + 3c (`_data/ad-classifications.json` for Ad Library Orientation + Creative Pillars). Runs after the ad-classifier precision validation sub-step so the banner state is known.
- 4h (Market Sophistication Assessment) depends on 4a Failed Solutions output, competitor categorization (§4.2), and the browser-based competitive ad scan (§10.8).
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

### Confidence Assessment
(required per persona; see below)
```

**Market sophistication modifier.** Add a one-line note under the persona header only when that persona materially diverges from the brand-level Market Sophistication Assessment (§10.8). Example: "This persona has tried 4.2 alternatives on average vs the market's 2.3 — treat as stage 4 copy even though the brand baseline is stage 3-4."

**Confidence Assessment (required per persona).** At the end of each persona block, output an evidence-density assessment. This is not a quality judgment or a model self-confidence score — it is a transparency layer so the strategist knows where to spend review time.

Format:
- **High confidence (grounded in VoC):** [sections] — cite evidence counts and source class (e.g., "47 own-brand reviews tagged to this persona; 12 attributed quotes used directly")
- **Medium confidence (pattern-inferred):** [sections] — cite what is interpretive (e.g., "counter-angles from 9 own-brand negative reviews + 14 competitor 1–3★ reviews")
- **Low confidence (needs strategist review):** [sections] — cite what is thin (e.g., "only 3 reviews describe the decision process explicitly; no recent comment/survey data")

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
**Market sophistication response:** [Claim / Sharper claim / Mechanism / Elaborated mechanism + proof / Identity-story]
**Structure suggestions:** [2–3 structures drawn from the structure taxonomy in `00 Global/Criteria/Video Script Criteria.md` and `00 Global/Criteria/Headline & Text Hook Criteria.md` — e.g. List, Before-After, Authority, Problem-Agitate-Solution, Unexpected Data, Mechanism Reveal]
```

**Sourcing rule.** Pain anchor must be a verbatim quote with a `review_id`. When derived from a pain cluster, copy the `representative_quote` and `representative_review_id` fields from `pain-clusters.json` directly — no LLM summary or paraphrase. Every angle traces to at least one direct quote. Abstract angles without quote backing belong in the Working Document's Batch Plan (where they can be tested), not in Persona Context.

**Freshness rule.** When surfacing quotes for Part 5 angles, Standout Language, and Transformations:
- Prefer quotes from the last 12 months.
- Quotes older than 12 months are still usable but flagged with the review date.
- Quotes referencing specific offers, pricing, or product formulations are flagged as `verify current` regardless of age.

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
4. Persona Signal Analysis — frequency table with recent-window split + per-persona rating breakdowns for polarized personas
5. Multi-Persona Overlap — top 20 combinations (ideal-customer signal)
6–10. **VoC Extraction — 5-Bucket Framework.** Run each bucket separately per persona. Strict separation prevents the most common failure: conflating pain points with trigger moments ("she was tired of X" lumps the pain and the moment — they serve different creative purposes). Each quote traces to a `review_id` per §10.2.

6. **Pain Points** — what problem they had before purchase. How long they had it, what they tried, how it affected their life, the emotional weight. Signal strength = repeated ideas across many reviews; same idea across multiple platforms = stronger.

#### Failed Solutions
What the customer tried before this brand, why it failed, and how they describe the failure.
- Named brand/product alternatives (count: how many per review on average)
- Category-specific vs cross-category alternatives ("I tried other greens powders" vs "I tried yoga and meditation")
- Failure framing: outcome-level ("didn't work") vs mechanism-level ("wrong form of magnesium")
- Quotes with review_id
- Filter: skip logistics complaints (shipping, packaging, customer service). Keep only product/service/outcome failures.

Sources: own-brand reviews (all ratings, especially 4–5★ where buyers contrast against past failures) + competitor 1–3★ reviews (Phase 2.5).

7. **Trigger Moments** — the specific event, realization, or breaking point that finally made them buy. Life events (wedding, diagnosis), hitting a breaking point, running out of patience, recommendation from someone trusted. Most powerful hook material — the most under-mined bucket.
8. **Objections Before Purchasing** — what almost stopped them. In positive reviews, objections appear in past tense: "I was skeptical but..." or "I almost didn't try it because..." Gold for objection-handling copy. Top 5–7 with 2–3 verbatim quotes, severity graded.
9. **Transformations** — split into two sub-sections. Both use the same review corpus but surface different creative material.

#### Desired Transformation (pre-purchase)
What they hoped for, in their own words. From "I was hoping...", "I just wanted...", "All I needed was...", "If I could just..." language. Aspirational, not yet validated by experience. Appears in all ratings — in positive reviews as retrospective desire ("I just wanted to sleep through the night — and now I do"), in negative reviews as unmet expectation ("All I wanted was for my skin to clear up").

#### Actual Transformation (post-purchase)
What changed after purchase. The specific result, the emotional shift, how they describe it. Validated by experience. The more visceral and specific, the more useful.

10. **Standout Language** — exact phrases worth stealing for ads. Lines that made you stop while reading: unusually specific descriptions, visceral before/after language, phrases that could work as a hook with zero editing. All verbatim quotes, attributed. This is where the raw ad-copy material lives.

**Persona Signal Analysis frequency table:**

```markdown
| Persona | % All Reviews | % Last 6 Months | Last 6 Months N | Avg Rating | Trend |
|---|---|---|---|---|---|
```

Trend is `Growing / Stable / Declining / Insufficient recent sample`. The recent-window calculation is report-safe: it filters by `date` for reporting only and never writes a partial tagged JSONL over the canonical corpus.

**Downstream handoff** (each bucket feeds specific creative uses):
- Pain Points → [[Creative Strategy Matrix]] pain anchor mapping
- Failed Solutions → hook material ("I tried everything"), market sophistication Signal 1 input (§10.8), competitor wedge language
- Trigger Moments → hook material (emotional readiness = scroll-stop power)
- Objections → Risk Reversal, Contrarian, and objection-handling hooks
- Desired Transformation → hook/problem framing (speak to what they want)
- Actual Transformation → social proof, close, authority (show what they got)
- Standout Language → verbatim ad copy, headlines, captions

**Guardrails:**
- Don't treat reviews as performance proof. Don't over-generalize from one voice. Don't clean up language so much it loses personality. Don't fabricate or rewrite quotes in a way that changes meaning.
- **Pain vs Trigger separation:** Pain Points describe the chronic condition (ongoing suffering, failed attempts, life impact). Trigger Moments describe the acute event that broke inertia (a specific day, diagnosis, recommendation, breaking point). "I was exhausted all the time" = Pain. "The day I fell asleep at my kid's game" = Trigger. If a quote contains both, split it — the chronic part goes in Pain Points, the breaking-point event goes in Trigger Moments.
- **Bucket 8 vs Part 4 Objections:** Bucket 8 (Objections Before Purchasing) mines from positive reviews — past-tense objections the buyer overcame ("I was skeptical but..."). Part 4 Objections (§10.2) mines from negative and competitor reviews — active objections and disappointments. Different sources, different creative uses. Don't duplicate across them.

11. Discovery: Unexpected Patterns — signals the taxonomy didn't predict
12. Implications for Creative — strongest personas by signal strength, bucket-to-creative mapping, objections to handle
13. **Appendix A — Stratified Sample (pre-lock)** — Step 1 output. 500 reviews across 5 strata. Frozen audit record of what the Step 2 LLM read.
14. **Appendix B — Persona-Segmented Sample (post-lock)** — up to ~40 per persona, mix of longest / 1–3★ / 4–5★ / multi-tag. Persona blocks in descending frequency. Small personas (<40 reviews): include all with `Full population — no sampling` note. The 1–3★ slice is non-negotiable — primary VoC mine for Persona Context Parts 4 and 5.
15. **Appendix C — Amazon Quotes (if applicable)** — brand-Amazon verbatim quotes captured via WebSearch fallback.

Smaller corpora (<500 reviews) may collapse some main sections but preserve order and appendices.

### 10.6 Positioning Ammo structure

`00 Research/Positioning Ammo - [Brand].md`, per Positioning Competitor / Customer-Validated Competitor:

1. **Header** — set, confidence label, evidence basis, switch-mention count, and price relationship
2. **Stats** — Trustpilot rating, review count, what they do, price range
3. **Fatal Flaw** — one-line headline ("Customer Service Black Hole," "Hidden Fees")
4. **Themes A, B, C, D** — each with:
   - 4–8 verbatim 1–3★ quotes, attributed (author, star, source)
   - **[Brand] positioning angle:** — a one-sentence counter-position

Ends with a **Quick-Reference table** — Top 3 positioning lines per competitor, copy-ready.

Market Players and adjacent brands do NOT get their own block unless the strategist explicitly asks for an optional appendix. Zero switch-mention Positioning Competitors are retained and labeled with their actual confidence; they are not auto-demoted.

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

### Confidence Assessment
- **High confidence (grounded in VoC):** [sections] — cite evidence counts and source class
- **Medium confidence (pattern-inferred):** [sections] — cite what is interpretive
- **Low confidence (needs strategist review):** [sections] — cite sparse or inferred sections
```

**Source attribution rule.** Every journey stage cites at least one verbatim quote with review_id. Invented content (e.g. "she probably Googles X") is not allowed. If a stage has no review signal, write `No review signal — inferred from [competitor reviews / first-party site content / ad-copy]` and treat it as lower-confidence. Ad-hoc Reddit signal is outside this pipeline (§2) — if the strategist ran a Research Engine sprint separately, those quotes may be cited with sprint reference.

**Confidence Assessment rule.** Required at the end of each journey map. It is an evidence-density assessment, not a model self-confidence score. It tells the strategist which sections were directly grounded in VoC and which required pattern inference.

### 10.8 Market Sophistication Assessment

New track 4h in Phase 4 deep synthesis. Produces a `## Market Sophistication Assessment` section in `Brand Context - [Brand].md`.

**Depends on:** Failed Solutions sub-bucket from Review Analysis, competitor categorization (§4.2), and the browser-based competitive ad scan. Do not add command-line tooling as a prerequisite; browser review is the v1 workflow.

**Stages:**

| Stage | Market state | Copy strategy implication |
|---|---|---|
| 1 | First or near-first in market | Simple, direct claim. Name the benefit. |
| 2 | Competitors exist, claims still work | Sharpen the claim and make the outcome more specific. Do not inflate unsupported claims. |
| 3 | Claims crowded | Introduce a mechanism — how it works. |
| 4 | Mechanisms copied | Elaborated mechanism + proof stack, evidence-qualified and compliance-safe |
| 5 | Everything has been said | Identity, story, belonging — "for people like you" |

**Signals:**

1. **Alternative Awareness (from Failed Solutions, date-aware)** — what % of reviews mention alternatives, same-category vs cross-category, named-brand vs generic, recent 6 months vs older.
2. **Competitor Ad Copy Patterns (browser-based Meta Ad Library scan)** — claim type distribution across competitor ads: simple benefit / sharper claim / mechanism / elaborated mechanism + proof / identity-story.
3. **Competitor Density (Phase 0 intake + Ad Library keyword search)** — how many brands actively advertise for this pain/solution space and how much positioning overlap exists.
4. **Mechanism Literacy (confirming only)** — how technically happy buyers describe why the product works. Present signal can nudge the stage range ±1; absence is not evidence.

**Browser workflow for Signals 2 and 3:**
- Search Meta Ad Library by primary pain/solution terms (e.g., "GLP-1 weight loss," "menopause supplement," "daily greens").
- Capture active advertisers, visible ad copy, claim type, source URL, and search date.
- Open top 2–3 Positioning Competitors / Customer-Validated Competitors and classify dominant copy type from active ads.
- Save screenshots or source links when a claim-landscape read materially affects the assessment.

**Stage determination:** output a stage range + confidence + copy implication, not a fake-exact label. If two of three primary signals agree, that level becomes the center of the range. Conflicts are documented as insights.

**Output format in Brand Context:**

```markdown
## Market Sophistication Assessment

**Stage range:** [1 / 2 / 3 / 3-4 / 4 / 5]
**Confidence:** [high / medium / low] — [why]
**Copy implication:** [Claim / Sharper claim / Mechanism / Elaborated mechanism + proof / Identity-story]
**Known tension:** [where review language and competitor ad language disagree, if any]

### Signal Evidence
- **Alternative Awareness:** [rate, recent-vs-older read, examples with review_id]
- **Competitor Ad Copy Patterns:** [dominant claim types, competitors scanned, source URLs, search date]
- **Competitor Density:** [active advertiser count / qualitative density, search terms, search date]
- **Mechanism Literacy:** [present/silent, examples with review_id]
```

**Per-persona modifier in Persona Context:** one-line addition only when a persona diverges materially from the brand baseline.

**Part 5 Ad Angles:** every angle includes `Market sophistication response: [Claim / Sharper claim / Mechanism / Elaborated mechanism + proof / Identity-story]`.

### 10.9 Creative Consumption Profile — Codex-orchestrated manual pilot

This is not a mandatory Phase 4 track yet. The pilot is **manual orchestration by Codex**, not manual work for the strategist. "Manual" means Codex runs the steps one by one using existing tools (browser feed review, `yt-dlp`, Gemini, and main-session synthesis) instead of invoking a packaged `/creative-consumption` command.

Pilot brand: Comfort Ortho Wear. Run one priority persona first. Only promote to a reusable `/creative-consumption` command after the pilot produces useful, non-obvious production guidance.

**Trigger phrase:** "run the Creative Consumption pilot for Comfort Ortho Wear" or "run creative consumption for [persona]."

**What Codex does in the pilot:** Codex executes the full flow below, saves the raw source log in the vault, and returns a skim-first Persona Feed Profile for strategist review. The strategist's job is to approve, reject, or annotate the output — not to do the searches manually.

**Purpose:** understand what organic content a persona already consumes around their pain, separate from paid ad performance. Top spenders show what converts in ad accounts; creative consumption shows the persona's organic visual grammar.

**Pilot flow Codex runs:**
1. Load the persona and its entries in `_data/pain-clusters.json`.
2. Generate search terms from problem language, not shopping language. Use pain labels, trigger moments, and simple VoC phrases.
3. Search YouTube with `yt-dlp "ytsearch20:[term]" --flat-playlist --dump-json` per term.
4. Search regular TikTok / Instagram / Facebook / Pinterest by browser when accessible; scroll the creator/feed results, save screenshots when the feed pattern matters, and capture visible metadata. Treat TikTok Shop separately from regular TikTok: Shop pages are commerce/category signals, not a replacement for creator-feed consumption. For regular TikTok, prefer the rendered browser route `https://www.tiktok.com/search?q=[term]`; `/search/video?q=[term]` may return an empty shell or "Something went wrong." If one TikTok query fails, retry before marking it unavailable: wait/reload once, try the same query in a fresh tab or session once, and test one adjacent problem-language phrasing. Log these as route/access failures, not as proof that TikTok has no results.
5. Maintain a reproducibility log:
   ```markdown
   | Platform | Search term | Search date | URL / content ID | Creator | Engagement visible | Included? | Inclusion reason |
   |---|---|---|---|---|---|---|---|
   ```
6. Finish candidate collection before final selection. Build one pooled candidate list across the planned search terms and accessible platforms, then deduplicate and rank by persona relevance plus engagement. Engagement is a qualifier, not a blind sort: prioritize the highest visible engagement within each platform/search lane, using shares/comments/saves/reposts when visible, then views/likes, then recency. Preserve lane coverage so one broad viral doctor/listicle does not crowd out a lower-engagement but high-fit caregiver, lived-condition, or adaptive-footwear source.
7. Download accessible top performers with `yt-dlp`; analyze each with Gemini using an open-ended organic-content prompt. Do not force categories inside individual analyses.
8. Extract patterns across the set: dominant, secondary, surprises.
9. Cross-reference organic patterns against competitor paid ads from the competitive ad scan.
10. Produce a Persona Feed Profile draft for strategist review.
11. Delete downloaded media after the analysis is saved.

**Persona Feed Profile output** goes inside `Persona Deep Research - [Brand].md` under the relevant persona when the strategist approves the pilot output.

**Skim-first standard:** this output should read like `Persona Summary`, not a research dump. The first screen must answer "what do they watch, what should we make, what should we avoid?" Keep source logs, Gemini details, and automation notes in a compact appendix or separate linked source-log file. Do not put long narrative synthesis above the action tables.

**Full-run threshold:** a Creative Consumption Profile requires 20–30 selected sources and at least 20 successfully analyzed creative/video pieces unless the strategist explicitly approves a smaller scope. "Selected sources" means sources chosen from the ranked candidate pool because they have visible engagement, strong persona fit, and clear lane coverage documented in the source log. Do not include random or low-signal sources just to hit the count. Anything below that threshold is labeled **Directional Scan**, not Profile, and must not be used as the canonical persona feed read. If a platform is blocked, compensate with other accessible organic surfaces and state the platform caveat in Source Notes. If regular TikTok or Instagram is blocked, TikTok Shop may be logged only as supplemental commerce evidence, never as creator-feed evidence. If regular TikTok or Instagram is a key source for the persona and the run cannot access it, mark the profile as creator-feed incomplete until that gap is resolved or explicitly accepted by the strategist.

```markdown
### Creative Consumption Profile

#### 1. Quick Read

- **Organic feed type:** [plain-language archetype]
- **Best creative bet:** [1-line production direction]
- **Do not force:** [what would feel unnatural]
- **Main viewer need:** [what the viewer is trying to resolve]
- **Confidence:** [high/medium/low + why]

**Bottom line:** [2-3 sentences max. Say what to make and why.]

#### 2. Feed Snapshot

##### [Feed Lane Name]

- **Looks like:** [visual/content grammar]
- **Viewer wants:** [viewer job]
- **Brand translation:** [how to use it]

#### 3. Creative Rules

##### Lead With

- [condition/problem/trigger language]

##### Show

- [specific visuals, footage, props, settings]

##### Avoid

- [creative patterns, claims, tones, or visuals that do not fit]

#### 4. Best Tests

1. **[Test Lane]**
   - **Hook shape:** "[hook shape]"
   - **Why it fits:** [evidence link]

#### 5. Organic Vs Paid Tension

- **Organic feed:** [dominant organic grammar]
- **Paid direction / competitor paid:** [paid grammar]
- **Tension:** [where they diverge]
- **Opportunity:** [how to combine or choose]

#### 6. Evidence Snapshot

- [source link] - [one-line pattern]

#### 7. Source Notes

**Search terms used:** [problem-language terms, sourced from pain-clusters.json].
**Platforms:** [ordered by density + caveats].
**Automation / confidence notes:** [collection issues, blocked analyses, missing platforms, low-confidence areas].
```

**Automation guardrail:** do not build `/creative-consumption` before the manual pilot validates the workflow. Current proven pieces are browser feed review, `yt-dlp` search/download, Gemini analysis, and main-session pattern extraction.

---

## 11. Phase 4g — Persona Summary

The combined orientation doc. Data first, light recommendation last. The strategist reads this to orient; the strategist also makes the gap-analysis calls. The pipeline does not interpret the data.

```markdown
# Persona Summary — [Brand]

> Source of truth: `_data/persona-dictionary.json` + classified `reviews.jsonl` + `_data/ad-classifications.json`.
> Full calc: [[Review Analysis - Brand]]. Full persona profiles: [[Persona Context - Brand]].

## 1. Persona Frequency

| Persona | % All Reviews | % Last 6 Months | Last 6 Months N | Avg Rating | Trend |
|---|---|---|---|---|---|
| The Pill Fatigue Simplifier | 22.1% | 28.3% | 184 | 4.2 | Growing |
| The Energy Seeker / Coffee Substitute | 18.7% | 14.2% | 92 | 4.5 | Declining |
| The Gut Health Seeker | 13.9% | 13.6% | 61 | 4.1 | Stable |
| Untagged (no persona match) | 48.4% | 44.0% | 287 | — | — |

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
- **Recent-window frequency** comes from persona-counter's report-safe recency mode (`--since YYYY-MM-DD` or equivalent orchestrator-calculated six-month cutoff). It never overwrites the canonical `reviews.jsonl`.
- **Trend labels require enough recent data.** If the last-six-month sample is too small to support a read, render `Insufficient recent sample` rather than Growing / Stable / Declining.
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

## 12. Phase 6 — Automated QA

Orchestrator-enforced checklist. Runs to pass. Fails escalate to Checkpoint 3 with flagged state (not blocked).

- [ ] Every doc in `00 Context/` earns its place (cited downstream or loaded by writer sub-agents).
- [ ] Persona Summary frequency % values reconcile to classified `reviews.jsonl`.
- [ ] Persona Summary recent-window fields reconcile to persona-counter recency report mode; small recent windows render `Insufficient recent sample`.
- [ ] Persona Summary pillar counts reconcile to `_data/ad-classifications.json`.
- [ ] Persona Context per-persona headers cite the same % + precision % (rendered from the same source data).
- [ ] Parts 4 and 5 derivation rule: every objection and every angle has a cited review quote with review_id.
- [ ] Persona Context Part 5 angles include `Market sophistication response`.
- [ ] Persona Context and Persona Deep Research include Confidence Assessment blocks with evidence counts/source classes.
- [ ] Personas named by pain/trigger — regex check clears demographic terms.
- [ ] Untagged residual <50% OR flagged in Persona Summary banner.
- [ ] Precision ≥60% per persona OR flagged as above.
- [ ] Review Analysis §1 declares scraping coverage % + gaps.
- [ ] Every ad in `_data/ad-library-raw.json` has a classification entry in `_data/ad-classifications.json` (no drops, no phantom entries); every `angle` value in ad entries is present in the top-level `angle_clusters` canonical set.
- [ ] Ad-classifier precision ≥70% (20-ad rescore per persona) OR flagged in Persona Summary banner.
- [ ] Every Positioning Competitor has set, confidence label, evidence basis, price relationship, and switch-mention count logged in Positioning Ammo (may be zero).
- [ ] Competitor reviews scraped at Phase 2.5 match the Positioning Competitor / Customer-Validated Competitor list.
- [ ] Review Analysis Appendix A (stratified) and Appendix B (persona-segmented) both present.
- [ ] Persona Deep Research has one Journey Map per locked persona, each stage quote-sourced or flagged as inferred.
- [ ] No Amazon quotes attributed without source URL.
- [ ] Product Context covers every SKU surfaced by the whole-site crawl (one block per product).
- [ ] Product Context offer blocks dated and captured verbatim.
- [ ] Multi-SKU brands have the cross-product comparison table.
- [ ] Hero benefit claims and FAQ phrasing in Product Context are verbatim.
- [ ] Product Context includes Funnel Architecture section.
- [ ] Crawler manifest `queue_incomplete` empty OR flagged in Review Analysis §1.
- [ ] Positioning Ammo — every Positioning Competitor / Customer-Validated Competitor block has a Fatal Flaw line (§10.6).
- [ ] Positioning Ammo — every Positioning Competitor / Customer-Validated Competitor block has 3–4 themes, each with 4–8 verbatim quotes and one positioning angle line.
- [ ] Brand Context covers mission, ICP, positioning, moats, vulnerabilities (§2 doc inventory).
- [ ] Brand Context includes Market Sophistication Assessment with stage range, confidence, copy implication, known tension, and signal evidence/source details.
- [ ] Persona Context — each persona's Part 1 is 100–200 words; Part 2 has 8–12 direct review quotes with attribution (§10.1).
- [ ] Auto-derived competitors (§4.2) are logged with switch-mention count + WebSearch evidence excerpt + same-pain/job score + price relationship. Intake-nominated competitors include switch-mention count in Positioning Ammo even if zero.
- [ ] Persona Summary Ad Library Orientation — headline / primary-text patterns surface 3–5 each OR brand has no Meta page (§4.1 waiver).
- [ ] No stray downloaded ad media under `~/.claude/tools/ad-library/downloads/session-*` for this brand (§5.5 uses `scrape.js` which is metadata-only, but Phase 7 cleans any leftover from prior `/ad-library` runs).

---

## 13. Checkpoint 3 — Strategist Final Review

The only strategist pause post-intake.

Strategist reads in this order:
1. **Persona Summary** — 30-second orient. Frequency → ad orientation → pillars → light gap rec.
2. **Persona Context** — four parts per persona.
3. **Spot-check Research/** — Review Analysis frequency table, a Positioning Ammo competitor block, Persona Deep Research for the primary persona.

Approval releases the brand to batch production (T001 planning). Rejection routes back to the appropriate phase.

---

## 14. Phase 7 — Cleanup

| Artifact | Action | Destination |
|---|---|---|
| `raw_pages_tmp/` (first-party site scrape output) | **Delete entirely** | — (synthesis docs preserve the signal) |
| `reviews.jsonl` | Keep in place | `Reviews/reviews.jsonl` — **NEVER DELETED** |
| `competitor-reviews/*.jsonl` | Keep in place | `Reviews/competitor-reviews/` — **NEVER DELETED** |
| `competitor-reviews/*-websearch.md` (blocked-platform verbatim quotes, §5.3) | Keep in place | `Reviews/competitor-reviews/` — **NEVER DELETED** |
| Trustpilot CSV exports | Keep in place | `Reviews/` — **NEVER DELETED** |
| `_data/ad-library-scrape/` (Apify nested `ads-raw.json` + manifest) | Keep in place | `_data/` (source for flatten; small) |
| `ad-library-raw.json` (flat, post-flatten) | Keep in place | `_data/` |
| `persona-dictionary.json` | Keep in place | `_data/` (reproducibility for re-runs) |
| `ad-classifications.json` | Keep in place | `_data/` (includes top-level `angle_clusters` canonical map) |
| `pain-clusters.json` | Keep in place | `_data/` |
| Per-brand one-off scrape scripts (e.g. `scripts/scrape_[brand].py`) | Delete | — (generalized site-scraper supersedes) |
| `~/.claude/tools/ad-library/downloads/session-*` (leftovers from prior `/ad-library` media runs) | **Delete entirely** | — (research pipeline uses `scrape.js` metadata-only; any leftover media is from unrelated runs) |

**Rules:**
- **Review data files are never deleted**, only relocated.
- **Raw scraped pages ARE deleted** after synthesis. No `00 Archive/`. The point is no bloat — if the synthesis is good, the raw text isn't needed again.

---

## 15. Refresh Cadence

Research is a one-shot pipeline at brand onboarding. It is re-run selectively, not calendar-driven:

- **Re-run Phase 1c + Phase 3c + Phase 4g** (ad library + classification + Persona Summary) when batch planning surfaces a creative pillar shift — e.g. T002 shows a new pillar that wasn't in the scan, or the brand has paused half the ads the scan classified.
- **Re-run Phase 1a + Phase 2c + Phase 4a** (brand reviews + persona re-discovery + Review Analysis) when a T-batch surfaces a persona that doesn't appear in the current Summary, OR after every ~500 new reviews accumulated. Phase 2c re-runs from Step 3 by default (dictionary revision forward) — often sufficient when the dictionary still mostly holds.
- **Re-run Phase 2.5 + Phase 3b + Phase 4f** (competitor bad-reviews + competitor classification + Positioning Ammo) when a new Positioning Competitor / Customer-Validated Competitor is named, or an existing competitor relaunches with major positioning changes.
- **Re-run Phase 1b + Phase 2b (Product Context only)** when the brand changes an offer, adds/removes a SKU, reformulates, or updates pricing. Whole-site crawler runs fresh so no page is missed. Always a refresh trigger at batch planning if any Product Context offer block is dated >60 days old.
- **Re-run Phase 4h Market Sophistication Assessment** on `--refresh=brand`, `--refresh=full`, or when the last assessment is >90 days old at the start of a new batch cycle. A light Signal 2-only competitive ad scan runs only when the strategist asks.
- **Creative Consumption Profile refresh** is manual and slow-cadence: first pilot on one priority persona, then refresh every 3–4 batches or quarterly if the pilot proves useful. It is not part of the mandatory research pipeline yet.
- **Full re-run** — only at major brand pivot (repositioning, new product line, new ICP).

No fixed calendar. Refresh is triggered by evidence, not by time.

---

## 16. Tools

### 16.1 Inventory

| Tool | Location | Purpose |
|---|---|---|
| `/review-scraper` skill | `~/.claude/skills/review-scraper/` | Scrape reviews from 7 platforms + custom fallback |
| `~/.claude/tools/ad-library/scrape.js` | `~/.claude/tools/ad-library/` | Single-brand Meta Ad Library pull (metadata-only by default) |
| `~/.claude/tools/ad-library/batch.js` | `~/.claude/tools/ad-library/` | Batch Meta Ad Library pull; supports `--no-media` / `--scrape-only` |
| `/grab` command | `.claude/commands/grab.md` | Download ad media (not used by research pipeline) |
| `.claude/tools/gemini-api/` | `.claude/tools/gemini-api/` | Text/image/video analysis |
| `.claude/tools/site-scraper/` | `.claude/tools/site-scraper/` | First-party whole-site Playwright crawler (§5.4) |
| `.claude/tools/review-sampler/` | `.claude/tools/review-sampler/` | Stratified + persona-segmented review sampler |
| `.claude/tools/persona-counter/` | `.claude/tools/persona-counter/` | Dictionary-regex full-corpus classifier |
| `.claude/tools/ad-classifier/` | `.claude/tools/ad-classifier/` | Gemini ad classification + angle dedup + precision validator |
| `.claude/tools/ad-classifier/flatten-apify.js` | `.claude/tools/ad-classifier/` | Apify `ads-raw.json` → flat classifier schema bridge (§5.5) |
| `brand-researcher` sub-agent | `.claude/agents/brand-researcher.md` | Orchestrates Phases 0–7 |
| `/research-brand` slash command | `.claude/commands/research-brand.md` | UX surface for first-time + refresh runs |
| Playwright runtime | Installed by `site-scraper`'s `npm install` + `npx playwright install chromium` | See Setup.md Step 6 |

Persona-precision is inlined as a sub-agent prompt (Step 5) — no separate tool. `/scrape-site` is not a standalone command — site-scraper is invoked from Bash directly.

Reddit sprints run via Research Engine MCP when the strategist initiates ad-hoc — not part of this pipeline.

### 16.2 One-time install (per machine)

Per-machine install is documented in `00 Global/Process/Setup.md` Step 6. Summary:

```bash
cd .claude/tools/site-scraper   && npm install && npx playwright install chromium && cd ../../..
cd .claude/tools/review-sampler  && npm install && cd ../../..
cd .claude/tools/persona-counter && npm install && cd ../../..
cd .claude/tools/ad-classifier   && npm install && cd ../../..
cp .claude/tools/gemini-api/.env .claude/tools/ad-classifier/.env
```

No Playwright MCP. Both site-scraper and review-scraper invoke Playwright via local scripts from Bash.

### 16.3 Tool specs (for maintenance)

1. **`.claude/tools/site-scraper/scrape-site.js`** — §5.4 contract. Node/Playwright recursive whole-site crawler. Reads `/robots.txt` + `/sitemap.xml` on start to surface subdomains.
2. **`.claude/tools/review-sampler/`** — Node. Input: `reviews.jsonl` (pre-lock) or classified `reviews.jsonl` (post-lock). Outputs: stratified Markdown (Review Analysis Appendix A) and persona-segmented Markdown (Appendix B). Pre-lock mode applies the Step 2 context-handling truncation (§7.2 Step 2) when longest-stratum sample exceeds ~150k tokens.
3. **`.claude/tools/persona-counter/`** — Node. Input: `reviews.jsonl` + `persona-dictionary.json`. Outputs: full frequency table, Multi-Persona Overlap top 20, untagged residual %, per-review `personas: [...]` field written back to JSONL. Optional `--since YYYY-MM-DD` adds a report-only recent-window frequency table (`% Last 6 Months`, recent N, trend) without writing a filtered JSONL or mutating the canonical corpus.
4. **`.claude/tools/ad-classifier/`** — Node. Input: flat `ad-library-raw.json` (produced by `flatten-apify.js` from Apify's nested `ads-raw.json`) + locked persona taxonomy + angle library (starts empty, accumulates). Outputs: per-ad `{persona, angle, format}` JSON + top-level `angle_clusters` canonical map + aggregate `Persona | Angle | Ad Count` table. Gemini classification, batched 10/call with exponential backoff. Three sub-modes: (a) initial classification, (b) **angle deduplication pass** (§9), (c) inline precision-validator (20-ad rescore per persona).
5. **`.claude/tools/ad-classifier/flatten-apify.js`** — Node. Bridges Apify nested schema to the flat schema classify.js expects. Field mapping: `ad_archive_id` → `ad_id`; `snapshot.body.text` (+ cards[].body joined with `\n\n---\n\n`) → `primary_text`; `snapshot.title` → `headline`; `snapshot.link_description` → `description`; `start_date_formatted[:10]` → `first_seen`; `snapshot.display_format` (lowercased; `DCO` with ≥2 cards → `carousel`) → `ad_format`. `on_image_text` and `caption` emit empty strings (Apify does not OCR images and does not expose video caption tracks separately).
6. **`brand-researcher` sub-agent** at `.claude/agents/brand-researcher.md` — orchestrates phases (0–7), enforces auto-gates, dispatches parallel phase workers, inlines persona-precision prompt (Step 5) and pain-cluster prompt (Step 6). Generates spec cards at Phase 5. Tracks the shared 2-iteration budget across Step 4 halts and Auto-Gate B failures.
7. **`/research-brand` slash command** at `.claude/commands/research-brand.md` — intake UX wrapping the sub-agent; supports first-time-run and selective-refresh entry modes (§17.1).

All tools ship with their own `*.test.js` suite. Run `npm test` in each tool's directory to verify a machine is healthy.

---

## 17. Automation — `/research-brand`

### 17.1 UX — entry modes

The command has two entry modes: **first-time run** (full pipeline) and **refresh** (selective, per §15).

**First-time run** — fires all Phases 0–7 end to end:

```
Strategist: /research-brand IM8
  website: https://im8health.com
  ad_library: https://facebook.com/ads/library?...&view_all_page_id=...
  competitors:
    - AG1 (same pain: daily foundational wellness for adults stacking supplements; price: $99/mo vs $60/mo)
    - Huel (same pain: replacing multiple supplements with one product; price: $70/mo)
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
| `--refresh=competitors` | 2.5 → 3b → 4f | New Positioning Competitor / Customer-Validated Competitor named or major repositioning |
| `--refresh=product` | 1b → 2b (Product Context only) | Offer change, new SKU, reformulation, pricing update, or offer block >60 days old |
| `--refresh=brand` | 1b → 2a → 4h | Brand Context gap flagged, market sophistication reassessment due, or batch planning asks for brand-level refresh |
| `--refresh=full` | All phases including Phase 0 intake re-prompt (website URL, Meta Ad Library URL, competitor list); overwrites all generated docs; preserves `00 Context/` compliance/guardrails files | Major brand pivot only; `--confirm` required |

Refresh-mode outputs overwrite the specific docs they regenerate and leave everything else untouched. Numbers re-reconcile across docs at the end of the refresh via the Phase 6 QA pass (scoped to the affected docs).

Compliance/guardrails docs are supplied by the client and placed in `00 Context/` by the strategist when received — they are not part of intake or pipeline output, and are never touched by refresh mode. Reddit sprints are strategist-initiated ad-hoc, not part of this orchestrator flow.

### 17.2 What the orchestrator does

- Validates Phase 0 intake (URLs present; 0–5 Positioning Competitors allowed at intake per §4.1; same-pain/job rationale required for each nominee; price captured as relationship).
- Dispatches Phase 1 tracks in parallel (brand reviews, whole-site crawl, ad library).
- Runs Auto-Gate A (coverage). Auto-advance on pass; retry once + log on fail.
- Runs Phase 2 (brand/product context drafts + six-step persona discovery — all steps mandatory). Tracks the shared Step 4 / Auto-Gate B 2-iteration budget.
- Runs Auto-Gate B (persona lock). Auto-loopback to Step 3 within the shared budget; proceed with flagged state if unresolved.
- Counts competitor switch-mentions as a confidence signal only; zero-mention Positioning Competitors are retained. **If fewer than 2 Positioning Competitors were nominated**, auto-derivation runs against `reviews.jsonl` to promote top switch-mention brands (§4.2 auto-derivation fallback).
- Runs Phase 2.5 (competitor review scraping) automatically after persona lock + competitor validation.
- Runs Phases 3–5 without pause (classification — including the angle-deduplication sub-step — + synthesis + spec card generation).
- Runs Phase 6 QA.
- Pauses at Checkpoint 3 for strategist review.
- Runs Phase 7 cleanup on approval.

### 17.3 What the orchestrator does NOT do

- Does not invent data. Scraping gaps are flagged in Review Analysis §1 methodology; no hallucinated quotes. Journey Map stages with no review signal are flagged as inferred, not written as fact.
- **Does not perform the gap analysis.** Persona Summary presents data (frequency + ad orientation + pillars) and light surface-level observations only. No prescriptive angle suggestions, no interpretive "Gap" column, no "opportunity" flags. The strategist makes the calls.
- Does not generate or scrape compliance/guardrails documents — client-supplied.
- Does not run Reddit sprints — strategist ad-hoc via Research Engine MCP.
- Does not apply the Creative Strategy Matrix or Three Selves during research. Those are strategist tools applied at batch planning.
- Does not write Ads Analysis docs (`02 Ads Analysis/`) — driven by ad-account performance data, separate from research.
- Does not trigger ClickUp or Notion loading. Research output stays in the vault until the strategist promotes it.
- **Does not use ad media for classification, run Gemini vision, or transcribe audio.** Ad classification is text-only (primary text + headline + description + on-image text + caption). The pipeline invokes `scrape.js` directly with `--output` pinned to the brand's `_data/ad-library-scrape/` folder; `scrape.js` is metadata-only by default so nothing is downloaded. Phase 7 cleanup deletes any leftover media under `~/.claude/tools/ad-library/downloads/session-*` that unrelated prior `/ad-library` runs may have left behind.

---

## 18. Maintenance

The pipeline is built. Entry point is `/research-brand` (first-time or `--refresh=…`). Maintenance concerns:

- **Backfills.** Brands onboarded before this pipeline existed (IM8, Elevate, FitSleeps, Lifeforce) need a one-time refresh to regenerate Persona Summary + Persona Context under the v5.2 rules. Run `/research-brand [Brand] --refresh=reviews` followed by `/research-brand [Brand] --refresh=ads` per brand.
- **Tool test suites.** Each `.claude/tools/*` ships a `*.test.js`. Run `npm test` in each directory after any edit to that tool. Setup.md Step 6 lists the canonical verification commands.
- **Proposal doc.** The historical proposal (`00 Global/Workplace/2026-04-17 Brand Research Standardization Proposal.md`) is kept for decision-log traceability. This process doc is canonical; the proposal is reference.
- **Build log.** The implementation notes live at `00 Global/Workplace/2026-04-20 Research Pipeline Build Log.md` — useful when auditing what was actually built vs what was specified.
