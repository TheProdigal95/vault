# Research Pipeline Build Log

> **Scope:** Overnight build of option B from the 2026-04-17 Brand Research Standardization Proposal (v5.2). Builds leaf tools 1–4 (§16.3 items 1–4) + the `--no-media` flag on `/ad-library` (§16.3 item 7). Orchestrator (`brand-researcher` sub-agent) and `/research-brand` slash command explicitly deferred — they benefit from seeing real tool output first.
> **Ground rules:**
> - No real-data execution (no brand site crawls, no review scrapes). Unit tests use synthetic fixtures only.
> - Hard stop on spec ambiguity: leave TODO, move on.
> - Hard stop on destructive prompts: skip and flag.
> - Build log entries written as items complete.
> **Started:** 2026-04-20 (overnight session)

---

## Pre-flight

- Node: v25.8.1 ✅
- npm: 11.11.0 ✅
- `.claude/tools/gemini-api/` present ✅
- `.claude/tools/grab/` present (Node/Playwright convention reference) ✅
- `.claude/commands/ad-library.md` present ✅
- `.claude/tools/site-scraper/` does not exist — will create ✅
- Playwright Chromium: not yet installed — install step below

---

## Build Order

1. Install Playwright Chromium (background)
2. Explore existing tool conventions (gemini-api, grab, ad-library.md)
3. Build site-scraper — §5.4 — Node/Playwright, recursive whole-site crawler
4. Build review-sampler — §7.2 Step 1, §10.5 — stratified + persona-segmented sampling
5. Build persona-counter — §7.2 Step 4 — dictionary-driven classification of reviews.jsonl
6. Build ad-classifier — §9, §11 — Gemini-driven ad classification, angle dedup, precision validation
7. Add `--no-media` flag to `/ad-library` — §5.5, §16.3 item 7

---

## Progress Log

### 1. Playwright Chromium — ✅ installed
- `npx playwright install chromium` completed without issue.

### 2. Existing tool conventions — ✅ explored
- ES modules (`"type": "module"`), `fs-extra`, `dotenv`, `.env` in tool dir, absolute paths in CLIs, `--flag value` style args. Pattern reused across all four new tools.

### 3. site-scraper — ✅ built
- **Path:** `.claude/tools/site-scraper/`
- **Spec:** proposal §5.4 (recursive same-origin crawler).
- **Deps:** `playwright ^1.47.0`, `fs-extra ^11.3.4`.
- **CLI:** `--url`, `--output-dir`, `--max-depth` (4), `--max-pages` (200), `--headless`, `--concurrency`.
- **Behavior:** Stealth Playwright (webdriver=false, Chrome UA, viewport spoof); reads `robots.txt` + `/sitemap.xml` for same-origin/subdomain seeding; BFS with `EXCLUDE_PATTERNS` (pagination/tag/category/search) and `NON_HTML_EXT` skip set; per-page scroll at 33/66/100/0 before text extraction; writes `${slug}.txt`, `${slug}_data.json` (body text + JSON-LD + OG meta + links), plus `_crawl_manifest.json`.
- **Tests:** 26/26 pass (`node scrape-site.test.js`). Cover URL normalization, same-origin matching, exclusion filters, non-HTML ext detection, slug derivation, sitemap URL extraction.

### 4. review-sampler — ✅ built
- **Path:** `.claude/tools/review-sampler/`
- **Spec:** §7.2 Step 1 + §10.5 (Appendix A stratified; Appendix B persona-segmented).
- **Deps:** `fs-extra`.
- **CLI:** `--input`, `--mode` (`stratified` \| `persona-segmented`), `--output`, `--seed`, `--sample-size`, `--per-persona`, `--truncate-threshold`, `--truncate-words`.
- **Behavior:** Mulberry32 deterministic RNG. Stratified mode builds the 5 Huel-Q3 strata (longest / random_5★ / random_1-2★ / random_3-4★ / random_all) at 100 each with small-corpus fallback: <100 returns all; 100–499 partitions by 20%-target floor-10; ≥500 standard 5×100. Persona-segmented mode targets 40/persona from the `personas` field, quota mix of longest + 1-3★ + 4-5★ + multi-tag, dedupes across personas. Context truncation (§7.2 Step 2): if corpus >150k tokens, bodies >600 words are trimmed to 600 words (flag preserved). Renders both Appendix A and Appendix B markdown.
- **Tests:** 19/19 pass.

### 5. persona-counter — ✅ built
- **Path:** `.claude/tools/persona-counter/`
- **Spec:** §7.2 Step 4 (dictionary-driven full-corpus classification).
- **Deps:** `fs-extra`.
- **CLI:** `--input`, `--dictionary`, `--output-jsonl`, `--output-report`, `--overwrite`, `--halt-threshold` (default 0.5).
- **Behavior:** Accepts `{Persona: "regex"}` or `{Persona: {pattern, flags}}` dictionary; compiles case-insensitive. Classifies each review against `title + body`, writing `personas: [...]` back onto the row. Borderline flag fires when only 1 distinct keyword match is present (feeds §7.2 Step 5). Report: frequency table (count, %, avg rating), multi-persona overlap top-20, untagged count/%, borderlines-by-persona. Non-zero exit (code 2) + HALT banner when untagged fraction exceeds threshold — orchestrator will handle the 2-iteration loop to dictionary revision.
- **Tests:** 12/12 pass.

### 6. ad-classifier — ✅ built
- **Path:** `.claude/tools/ad-classifier/`
- **Spec:** §9 (classify), §11 (angle dedup + precision validation).
- **Deps:** `fs-extra`, `@google/generative-ai`, `dotenv`.
- **Stages:** `classify` \| `dedup` \| `validate` \| `all`.
- **Behavior:**
  - `loadPersonaTaxonomy()` accepts persona-dictionary shape OR `{personas: [{name, one_line_pain, top_keywords}]}`.
  - `adFullText()` concatenates primary_text + headline + description + on_image_text + caption.
  - Gemini lazy-loaded; `.env` resolves from `ad-classifier/.env` then falls back to `gemini-api/.env`.
  - Batching: 10 ads/call. `withBackoff()` exponential (max 60s) on transient errors (429/5xx/timeout/ECONN). 400s do not retry.
  - Mock mode (`--mock`) routes classification by persona-name-in-text and groups angles by lowercased first-4-words — used by the full test suite so we don't burn tokens in CI.
  - Angle dedup: Gemini clusters raw angles → canonical labels → `rewriteAngles()` rewrites classifications + persists `angle_clusters` map.
  - Precision validation sparse-persona fallback: n<5 → `skipped-insufficient-volume`; 5–19 → rescore all with small-N banner; ≥20 → seeded sample of 20. Zero-ad taxonomy personas appear in output as skipped.
  - `buildRetryPrompt()` is the verbatim §9 retry template with persona pain, top keywords, and borderline examples injected.
- **Tests:** 20/20 pass.

### 7. `/ad-library --no-media` — ✅ added
- **Path:** `~/.claude/tools/ad-library/batch.js` + `.claude/commands/ad-library.md`.
- **Discovery:** the ad-library tool itself lives under the user-global `~/.claude/tools/ad-library/` (not project-local), but the slash-command doc is project-local at `.claude/commands/ad-library.md`. Both are canonical — kept as-is.
- **Change:** added `--no-media` as an alias to the pre-existing `--scrape-only` flag in `batch.js` (one-line parser change + usage string). Updated the slash-command doc to mention `--no-media` next to `--scrape-only` and reference proposal §5.5. `scrape.js` already outputs metadata-only (no media download), so no change needed there.
- **No tests:** the ad-library tool has no test harness; change is a 2-char flag alias.

---

## Summary for the morning

**Built and tested (77/77 unit tests pass):**
- `.claude/tools/site-scraper/` — 26 tests
- `.claude/tools/review-sampler/` — 19 tests
- `.claude/tools/persona-counter/` — 12 tests
- `.claude/tools/ad-classifier/` — 20 tests (mock mode; no real Gemini calls)

**To verify in the morning:**
```bash
cd ".claude/tools/site-scraper"    && npm install && node scrape-site.test.js
cd ".claude/tools/review-sampler"  && npm install && node sample.test.js
cd ".claude/tools/persona-counter" && npm install && node count.test.js
cd ".claude/tools/ad-classifier"   && npm install && node classify.test.js
```
(Each tool has its own `package.json`; `npm install` is per-tool. `node_modules` weren't committed.)

**Also shipped:**
- `--no-media` alias on `~/.claude/tools/ad-library/batch.js` + doc update in `.claude/commands/ad-library.md`.

**Explicitly deferred (per Option B scope):**
- `brand-researcher` orchestrator sub-agent (§3, §16.3 item 5) — wants real tool output to design handoffs against.
- `/research-brand` slash command (§16.3 item 6) — same reason; trivial once the orchestrator is defined.
- Auto-gates & Checkpoint 3 wiring — orchestrator concern.

---

## Post-build audit (2026-04-20)

**What was re-verified:**
- All 4 `package.json` shapes valid, `type: module` set, `main` correct.
- `node --check` passes on all 4 main files.
- Re-ran all test suites: **77/77 pass** (site 26 / sampler 19 / counter 12 / classifier 20).
- Smoke test: `persona-counter` run end-to-end on synthetic 4-review fixture → correct frequency table, overlap, untagged %, borderlines.
- `--no-media` flag present in `~/.claude/tools/ad-library/batch.js` (line 35) and documented in `.claude/commands/ad-library.md`.

**Bug found + fixed during audit:**
- **CLI main-guard was silently broken on vault paths with spaces.** All 4 tools used `import.meta.url === \`file://${process.argv[1]}\`` to detect direct invocation. On macOS with spaces + tildes in the path (`Mobile Documents`, `iCloud~md~obsidian`), `import.meta.url` is URL-encoded (`%20`, `%7E`) while `file://${argv[1]}` is not — so the guard was always false. Tools exited 0 silently when invoked as a CLI; tests still passed because they import functions directly.
- **Fix:** switched all 4 files to `pathToFileURL(process.argv[1]).href` (added `pathToFileURL` to the existing `from 'url'` import). All 4 CLIs now properly error-and-exit-1 on missing args. Tests still 77/77.

**Open items / TODOs (carried forward):**
- **No integration tests yet.** All 77 tests are unit tests with synthetic fixtures. "Integration test" here means a real brand run end-to-end — not new test code. First real brand run is the smoke test; budget for one fix-up pass before scaling.
- **Ad-library location discrepancy.** The tool lives at `~/.claude/tools/ad-library/` (user-global) while every other research tool is at `.claude/tools/` (project-local). Noted in `brand-researcher.md` — the orchestrator checks `.claude/commands/ad-library.md` for the canonical invocation. Reconciliation is a nice-to-have, not a blocker.
- **`persona-counter` halt loop — resolved at orchestrator level.** `count.js` exits code 2 when untagged > threshold. `brand-researcher.md` tracks the shared 2-iteration budget and handles both Step 4 halt and Auto-Gate B failure loops.
- **`ad-classifier` real-API behavior unverified.** Classification is text-only (primary text + headline + description + on-image text + caption) — no media, no vision. The risk is the Gemini text classification/dedup prompts against live ad copy; mock mode covers shape but not LLM output quality. First real run: use a small brand (~20 ads) to sanity-check JSON parsing and retry logic before scaling.
- **Output-directory convention — resolved at orchestrator level.** `brand-researcher.md` specifies every canonical output path per §2 and §4.3 of the proposal. Each tool invocation passes explicit `--output` / `--output-jsonl` / `--output-report` paths.

---

## Session 2 — Orchestrator + slash command (2026-04-20)

**Scope:** Build the two deferred items from Option B: `brand-researcher` sub-agent (§16.3 item 5) + `/research-brand` slash command (§16.3 item 6).

### 8. `brand-researcher` sub-agent — ✅ built
- **Path:** `.claude/agents/brand-researcher.md`
- **Spec:** §3 (order of operations), §4–§14 (all phases), §17.2 (orchestrator responsibilities).
- **Covers:** Phase 0 intake validation + folder skeleton | Phase 1 three-track raw data collection | Auto-Gate A coverage check | Phase 2 first-pass synthesis + six-step persona discovery (inline Step 2 clustering prompt, Step 5 precision prompt, Step 6 pain-cluster prompt) | Auto-Gate B persona lock (five criteria + demographic blocklist regex + competitor test 3 auto-validation + auto-derivation fallback) | Phase 2.5 competitor review scraping | Phase 3 classification (3a/3b/3c with exact CLI invocations for persona-counter + ad-classifier) | Phase 4 seven-track deep synthesis (brand context, product context, persona context parts 1+2+4+5, deep research, positioning ammo, persona summary) | Phase 5 QA checklist (27 items verbatim from §12) | Checkpoint 3 pause with strategist-facing summary | Phase 6 cleanup | Banner format with all 9 trigger conditions | Refresh-mode routing table.
- **Exact CLI flags captured from source:** `persona-counter` uses `--output-jsonl` (writes to `.tagged.jsonl`, then `mv` to replace original — per tool's "do NOT overwrite input" warning); `ad-classifier` uses `--ads` + `--personas` (not `--input` / `--dictionary`); `review-sampler` writes markdown output directly.

### 9. `/research-brand` slash command — ✅ built
- **Path:** `.claude/commands/research-brand.md`
- **Spec:** §17.1 (UX entry modes).
- **Covers:** First-time run syntax (brand + website + ad_library + competitors) | Refresh modes (`--refresh=ads|reviews|competitors|product|brand|full --confirm`) with `--from-step=2` for full re-cluster | Prerequisite setup (npm install + Playwright + `.env`) | What Claude does on invocation (parse → check prereqs → collect missing fields → dispatch brand-researcher) | Output structure (4 context docs + 3 research docs + `_data/` + raw review corpus).

### Pipeline status after Session 2

**Complete — all §16.3 items shipped:**
1. ✅ `site-scraper` — whole-site recursive crawler
2. ✅ `review-sampler` — stratified + persona-segmented sampling
3. ✅ `persona-counter` — dictionary-driven full-corpus classification
4. ✅ `ad-classifier` — Gemini-driven ad classification, dedup, precision validation
5. ✅ `brand-researcher` sub-agent — orchestrates Phases 0–6
6. ✅ `/research-brand` slash command — UX surface
7. ✅ `--no-media` flag on `/ad-library` — metadata-only output

**Remaining before first real run:**
- One-time Playwright install on any new machine (see Prerequisites in `research-brand.md`)
- Verify `.claude/tools/ad-classifier/.env` has `GEMINI_API_KEY` before first invocation
- First real brand run = the integration test; budget for one fix-up pass
