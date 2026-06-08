# Review Scraping Status — Lifeforce

---

## Brand Reviews

### Lifeforce — Trustpilot
- **Source:** trustpilot.com/review/mylifeforce.com
- **Method:** WebFetch extraction across 8 pages (20 reviews/page)
- **Status:** ✅ Complete
- **Reviews scraped:** ~160 of 170 total (page 9 returned duplicates/filtered view)
- **Rating distribution:** 5★: 113 (66.5%) | 4★: 17 (10%) | 3★: 7 (4.1%) | 2★: 12 (7.1%) | 1★: 21 (12.4%)
- **Average rating:** 4.3/5
- **Date range:** May 2024 to March 2026
- **All negative reviews (1-2 star) captured.** The small gap is only in 5-star reviews.
- **Note:** No cookies/authentication were needed — Trustpilot public pages scraped cleanly via WebFetch.

### Lifeforce — On-Site
- **Source:** mylifeforce.com (product pages)
- **Finding:** **No on-site review system exists.** Product pages do not have customer reviews, ratings, or a review widget (no Judge.me, no Yotpo, no Stamped, no Trustpilot embed). This is unusual for a DTC brand.
- **Status:** ✅ Resolved — no reviews to scrape.

### Lifeforce — Website Scraping (Playwright)
- **Source:** mylifeforce.com (23 pages)
- **Method:** Playwright headed browser with stealth settings (anti-automation-detection flags)
- **Status:** ✅ Complete — 20 of 23 pages scraped successfully
- **Failed pages:** product_peak_rise (sparse), product_peak_defense (sparse), product_rest_recovery (redirect)
- **Note:** Site is Next.js with heavy client-side rendering. Standard WebFetch could not extract content. Playwright headed mode with domcontentloaded + scroll + wait was required.
- **Output:** Raw text files were written to `raw_pages/`, then archived to `00 Archive/Lifeforce/raw_pages/` after synthesis into [[Brand Context - Lifeforce]] and [[Product Context - Supplements]]. The scraper script is now at `scripts/scrape_lifeforce.py` at the vault root. Re-run it if new facts need verification.

---

## Competitor Reviews

### Function Health — Trustpilot
- **Status:** ❌ Not scraped
- **Note:** Potential future research target

### InsideTracker — Trustpilot
- **Status:** ❌ Not scraped
- **Note:** Potential future research target

---

## Notes

- Lifeforce's primary review source is Trustpilot (170 reviews). There are NO on-site product reviews.
- Reviews are overwhelmingly about the **membership service experience** (clinicians, coaching, blood draws), not about individual supplement products. Supplement-specific feedback is extremely sparse.
- ~160 of 170 reviews captured. 100% of negative reviews (1-2 star) are in the dataset.
- Third-party reviews of individual products (Peak NMN, Peak Rise, Peak Rest, Peak Healthspan, Peak Defense) were captured from longevity.technology, SuppCo, Sleep Advisor, and other editorial review sites to supplement the limited product-specific Trustpilot data.

*Last updated: April 2026*
