# Research Brand — Full Research Pipeline

Run the end-to-end brand research pipeline for a new brand, or refresh an existing one. Orchestrates Phases 0–7: intake validation, review scraping, whole-site crawl, ad library read, persona discovery (six-step), competitor scraping, deep synthesis, spec cards, automated QA, Checkpoint 3, and cleanup. Strategist input required only at Phase 0 (if fields are missing at intake) and Checkpoint 3 (final review).

## Prerequisites

**One-time per machine** (skip if already done):
```bash
cd 00 Global/Hermes/tools/site-scraper   && npm install && npx playwright install chromium && cd ../../..
cd 00 Global/Hermes/tools/review-sampler  && npm install && cd ../../..
cd 00 Global/Hermes/tools/persona-counter && npm install && cd ../../..
cd 00 Global/Hermes/tools/ad-classifier   && npm install && cd ../../..
```

**Ad-classifier API key** (one-time):
```bash
cp 00 Global/Hermes/tools/gemini-api/.env 00 Global/Hermes/tools/ad-classifier/.env
```
Or create `00 Global/Hermes/tools/ad-classifier/.env` with `GEMINI_API_KEY=your_key`.

**Check `Setup.md`** (`00 Global/Process/Setup.md`) if any tool reports missing dependencies or a first-time machine setup is needed.

---

## First-time run

```
/research-brand IM8
website: https://im8health.com
ad_library: https://facebook.com/ads/library/?active_status=active&...&view_all_page_id=123456
competitors:
  - AG1 (same pain: daily foundational wellness for adults stacking supplements; price relationship: premium)
  - Huel (same pain: replacing multiple supplements with one product; price relationship: similar)
```

`ad_library` may be `none` if the brand has no Meta presence — pipeline skips the ad-library phase and Persona Summary shows frequency only.

Competitors can be empty at intake — the pipeline auto-derives from switch-mentions in brand reviews post-persona-lock when needed. Each provided competitor needs a one-line rationale confirming same primary pain/job-to-be-done. Price is captured as a relationship (`cheaper / similar / premium / unknown`), not a binary gate. Zero switch-mentions never auto-demote an intake-approved Positioning Competitor.

Optional but high-value inputs: post-purchase survey data, customer support ticket themes, or win/loss interview notes. These do not gate the pipeline.

**The pipeline refuses to run if `[Brand]/00 Context/` already contains generated docs** (Brand Context, Product Context, Persona Context, or Persona Summary). Use `--refresh` instead. Compliance/guardrails files are ignored by this check.

---

## Refresh modes

Use when re-running part of the pipeline after batch production surfaces a signal (new persona, creative pillar shift, competitor rebrand, offer change).

```
/research-brand IM8 --refresh=ads
/research-brand IM8 --refresh=reviews
/research-brand IM8 --refresh=reviews --from-step=2
/research-brand IM8 --refresh=competitors
/research-brand IM8 --refresh=product
/research-brand IM8 --refresh=brand
/research-brand IM8 --refresh=full --confirm
```

| Flag | Phases re-run | When to use |
|---|---|---|
| `--refresh=ads` | 1c → 3c → 4g | Creative pillar shift at batch planning |
| `--refresh=reviews` | 1a → 2c (Step 3+) → 4a | New persona surfaces or ~500 new reviews accumulated |
| `--refresh=reviews --from-step=2` | 1a → 2c (Step 2+) → 4a | Full re-cluster needed (not just dictionary tightening) |
| `--refresh=competitors` | 2.5 → 3b → 4f | New Positioning Competitor / Customer-Validated Competitor named or major repositioning |
| `--refresh=product` | 1b → 2b (Product Context only) | Offer change, new SKU, reformulation, or offer block >60 days old |
| `--refresh=brand` | 1b → 2a → 4h | Brand Context gap flagged, market sophistication reassessment due, or batch planning asks for brand-level refresh |
| `--refresh=full --confirm` | All phases including Phase 0 intake re-prompt | Major brand pivot only; `--confirm` required |

Refresh outputs overwrite only the docs they regenerate. Everything else is untouched.

---

## What Claude does when invoked

1. **Parse the invocation.** Extract brand name, mode (first-time or refresh), website URL, ad library URL, competitors with rationales, and optional customer data sources.

2. **Check prerequisites.** Verify `00 Global/Hermes/tools/ad-classifier/.env` exists and contains `GEMINI_API_KEY`. If missing, stop and ask before proceeding.

3. **Collect any missing required fields.** For first-time run: if `website` or `ad_library` not provided, prompt before dispatching. Competitors can be empty.

4. **Dispatch the `brand-researcher` sub-agent** with all collected parameters. The sub-agent owns Phases 0–7 and pauses at Checkpoint 3 for strategist review.

---

## Output

After Checkpoint 3 approval, the brand folder contains:

**`00 Context/`** — loaded by writer sub-agents at batch execution time:
- `Brand Context - [Brand].md` (includes Market Sophistication Assessment)
- `Product Context - [Brand].md`
- `Persona Context - [Brand].md` (Parts 1, 2, 4, 5 per persona)
- `Persona Summary - [Brand].md` (frequency + ad orientation + pillars + light gap rec)

**`00 Research/`** — strategist reference; not auto-loaded:
- `Review Analysis - [Brand].md` (VoC synthesis + stratified + persona-segmented appendices)
- `Positioning Ammo - [Brand].md` (competitor 1–3★ themes + counter-angles)
- `Persona Deep Research - [Brand].md` (Part 3 Journey Maps per persona)
- `_data/` (persona-dictionary.json, ad-library-raw.json, ad-classifications.json, pain-clusters.json)
- `Reviews/reviews.jsonl` + `Reviews/competitor-reviews/*.jsonl` (raw corpus — never deleted)

The brand is ready for T001 batch planning after Checkpoint 3 approval.

---

## Notes

- **Target runtime: ~90 min wall clock.** The pipeline runs mostly automated — strategist only pauses at Phase 0 intake + Checkpoint 3.
- **Ad classification is text-only.** No media is downloaded for classification. The pipeline uses `00 Global/Hermes/tools/ad-library/scrape.js` directly (metadata-only by default) with `--output` pinned to the brand's `_data/ad-library-scrape/` folder, then `flatten-apify.js` converts Apify's nested schema to the flat schema the classifier reads. Gemini reads primary text + headline + description + on-image text + caption only.
- **Compliance/guardrails docs are never touched.** They are client-supplied, placed by the strategist, and not pipeline output.
- **Reddit sprints are out of scope.** Strategist-initiated ad-hoc via Research Engine MCP, separate from this pipeline.
- **Persona numbers have one source of truth:** `_data/persona-dictionary.json` + classified `reviews.jsonl` + `_data/ad-classifications.json`. Persona Summary, Review Analysis, and Persona Context all render from these — no manual number re-entry.
