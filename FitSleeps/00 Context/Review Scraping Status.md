# Review Scraping Status — FitSleeps

---

## Brand Reviews

### FitSleeps — Trustpilot (merged: page scraper + widget API)
- **Source:** trustpilot.com/review/fitsleeps.com
- **Methods:** (1) Server-rendered __NEXT_DATA__ extraction across 21 filter combos, (2) Trustpilot widget-data API (`businessUnitId=66c8c7946557657d6b434e6b`) per star rating
- **Status:** ✅ Complete — merged and deduplicated
- **Reviews scraped:** 382 unique (of ~600 total on Trustpilot)
- **Coverage:** 1★: 78/78 (100%) | 2★: 19/19 (100%) | 3★: 23/23 (100%) | 4★: 59/58 (100%+) | 5★: 203/422 (48%)
- **All negative reviews captured.** The gap is only in 5-star reviews due to API pagination limits.
- **Rating distribution (scraped):** 5★: 203 (53.1%) | 4★: 59 (15.4%) | 3★: 23 (6.0%) | 2★: 19 (5.0%) | 1★: 78 (20.4%)
- **Average (scraped):** 3.76
- **Date range:** 2024-11-14 to 2026-04-04
- **Languages:** English (341), Dutch (27), German (12), Portuguese (1), Spanish (1)
- **Company replies captured:** 270 reviews include FitSleeps' reply
- **File:** `/Users/marce/Desktop/Trabajo/Workflows/Scraped Reviews/FitSleeps Reviews/reviews.jsonl`
- **Copy:** Also at `00 Context/reviews.jsonl`

### FitSleeps — On-Site
- **Source:** fitsleeps.com (product pages)
- **Finding:** On-site reviews are a **Trustpilot widget** filtered to 4-5 stars only — NOT a separate review system. Judge.me metafields exist in the Shopify product data (Standard: 56 reviews, 3.39/5; Pro: 138 reviews, 4.26/5) but no Judge.me widget renders and the Judge.me API rejects authentication for this shop. These metafields are likely from a deprecated/unused Judge.me installation.
- **Status:** ✅ Resolved — on-site reviews are the same Trustpilot data, already captured above.

---

## Competitor Reviews

### Pavlok — Trustpilot
- **Source:** trustpilot.com/review/pavlok.com
- **Status:** ✅ Complete (only 4 reviews exist on Trustpilot)
- **Reviews scraped:** 4
- **File:** `/Users/marce/Desktop/Trabajo/Workflows/Scraped Reviews/Pavlok Reviews/reviews.jsonl`
- **Copy:** Also at `00 Context/competitor-reviews-pavlok.jsonl`
- **Note:** Pavlok's primary review volume is on Amazon (1,000+ at 3.7/5). Verbatim 1-3 star quotes captured via web research in Competitor Analysis document.

### Pavlok — Amazon
- **Source:** amazon.com (ASIN: B07P83FTR5 SC2, B0BGYY45DY SC3)
- **Status:** ❌ Not scraped — Amazon blocks automated scraping
- **Known stats:** 3.7/5, 1,000+ reviews
- **Workaround:** Verbatim 1-3 star quotes captured via WebSearch and stored in Competitor Analysis document

### Sonic Bomb — Amazon
- **Source:** amazon.com (ASIN: B000OOWZUK)
- **Status:** ❌ Not scraped — Amazon blocks automated scraping
- **Known stats:** 4.6/5, 20,000+ reviews
- **Workaround:** Verbatim 1-3 star quotes captured via WebSearch and stored in Competitor Analysis document

### Homedics WakeBand — Amazon
- **Source:** amazon.com (ASIN: B0FVZT834W)
- **Status:** ❌ Not scraped — new product, limited reviews
- **Workaround:** Verbatim complaints captured from editorial reviews

### Coolfire — Amazon
- **Source:** amazon.com (ASIN: B0CBBY723K)
- **Status:** ❌ Not scraped
- **Workaround:** Verbatim 1-3 star quotes captured via WebSearch and stored in Competitor Analysis document

---

## Notes

- FitSleeps' only review source is Trustpilot (600 reviews). The on-site widget is a Trustpilot embed filtered to 4-5 stars. Judge.me metafields exist but the platform is not active.
- 382 of ~600 reviews captured. **100% of all negative reviews (1-3 star) are in the dataset.** The only gap is in 5-star reviews (203/422) due to API limits — sufficient for VOC analysis.
- Competitor reviews are primarily on Amazon. Verbatim 1-3 star quotes have been manually captured via web research and stored in the Competitor Analysis document.

*Last updated: April 2026*
