# Review Scraping Status -- Elevate Health

---

## Brand Reviews

### Elevate Health -- Trustpilot
- **Source:** trustpilot.com/review/joinelevate.com
- **Method:** WebFetch extraction across 10 pages (20 reviews/page)
- **Status:** Complete
- **Reviews scraped:** ~200 of 304 total (pages 11-15 redirected to Trustpilot login)
- **Rating distribution:** 5: 281 (92.4%) | 4: 9 (3%) | 3: 2 (0.7%) | 2: 2 (0.7%) | 1: 10 (3.3%)
- **Average rating:** 4.6/5
- **Date range:** October 2023 to March 2026
- **All negative reviews (1-3 star) captured.** The gap is only in 5-star reviews.
- **Note:** Trustpilot flagged Elevate for potentially soliciting reviews in a way Trustpilot doesn't support. The 92% five-star rate is unusually high and may not reflect organic sentiment.

### Elevate Health -- On-Site
- **Source:** joinelevate.com, app.joinelevate.com
- **Finding:** **No on-site review system exists.** No Judge.me, no Yotpo, no Stamped, no review widget. Testimonials are curated and displayed on landing pages but are not user-generated review systems.
- **Status:** Resolved -- no reviews to scrape (curated testimonials captured via Playwright).

### Elevate Health -- BBB
- **Source:** BBB (Better Business Bureau)
- **Method:** Web search extraction
- **Status:** Complete (summary only)
- **Finding:** Not BBB accredited. Multiple complaints regarding unauthorized charges, medication effectiveness, and refund difficulties. Company reportedly "in the process of responding to previously closed complaints."

### Elevate Health -- Website Scraping (Playwright)
- **Source:** joinelevate.com + app.joinelevate.com + start.joinelevate.com (12 pages attempted)
- **Method:** Playwright headed browser with stealth settings (anti-automation-detection flags)
- **Status:** Complete -- 11 of 12 pages scraped successfully
- **Pages scraped:**
  - joinelevate.com/ (homepage) -- 6,637 chars
  - joinelevate.com/privacy-policy/ -- 30,408 chars
  - joinelevate.com/compounded-semaglutide-safety-information/ -- 15,682 chars
  - joinelevate.com/compounded-tirzepatide-safety-information/ -- 4,786 chars
  - app.joinelevate.com/ (app home) -- 7,203 chars
  - app.joinelevate.com/semaglutide -- 9,483 chars
  - app.joinelevate.com/semaglutide-weight-loss-program -- 3,224 chars
  - app.joinelevate.com/tirzepatide-weight-loss-program -- 3,223 chars
  - app.joinelevate.com/lp1v2 (landing page) -- 8,932 chars
  - start.joinelevate.com/ (Shopify gummy store) -- 1,825 chars
  - start.joinelevate.com/products/monthly-compounded-tirzepatide-program -- 1,255 chars
- **Failed page:** book.joinelevate.com (DNS resolution failure -- subdomain doesn't resolve)
- **Note:** joinelevate.com is a Next.js single-page app. Many URLs from search results (FAQ, About, The Program) returned 404 -- these sections exist as anchors on the homepage, not separate pages. The site uses three subdomains: joinelevate.com (main site), app.joinelevate.com (conversion funnels), start.joinelevate.com (Shopify supplement store).
- **Output:** Raw text files were written to `raw_pages/`, then archived to `00 Archive/Elevate/raw_pages/` after the cited facts (pricing, shipping, inclusions) were folded into the **Verified First-Party Facts** section of [[Product Context - GLP-1 Programs]]. The scraper script is now at `scripts/scrape_elevate.py` at the vault root. Re-run it if new facts need verification.

---

## Competitor Reviews

### Henry Meds -- Trustpilot
- **Source:** trustpilot.com/review/henrymeds.com
- **Method:** WebFetch extraction (star-filtered pages: 1-star, 2-star, 3-star)
- **Status:** Complete
- **Reviews scraped:** ~60 negative reviews (20 per star rating tier)
- **Total reviews on platform:** ~11,000+
- **Average rating:** 4.5/5
- **Focus:** Product/service complaints only -- billing, medication effectiveness, cancellation, customer service unreachability

### Ro (Body Program) -- Trustpilot
- **Source:** trustpilot.com/review/ro.co
- **Method:** WebFetch extraction (star-filtered pages: 1-star, 2-star, 3-star)
- **Status:** Complete
- **Reviews scraped:** ~60 negative reviews (20 per star rating tier)
- **Total reviews on platform:** ~3,131
- **Average rating:** 3.7/5
- **Focus:** Pricing deception, hidden membership fees, non-refundable deposits, customer service inaccessibility

---

## Third-Party Research Sources

| Source | URL | What Was Extracted |
|--------|-----|-------------------|
| glp-1.com | glp-1.com/providers/elevate-health | Pricing, features, pros/cons, medication details |
| SeekPeptides | seekpeptides.com/blog/articles/elevate-health-semaglutide-complete-guide | Comprehensive review: pricing, safety, complaints, competitor comparison |
| MeetDrJon | meetdrjon.com/elevate-health-vs-mystart/ | Price comparison with MyStart |
| Scamadviser | scamadviser.com/check-website/joinelevate.com | Legitimacy assessment |

---

## Notes

- Elevate's primary review source is Trustpilot (304 reviews). There are NO on-site product reviews.
- Reviews are overwhelmingly about **customer service and ordering process**, not medication efficacy. Detailed weight loss outcome data is sparse in reviews -- most transformation details come from curated on-site testimonials.
- The 92% five-star rate is flagged by Trustpilot as potentially solicited. Exercise caution when using Trustpilot data as representative of true customer sentiment.
- BBB complaints provide the most substantive negative signal (unauthorized charges, medication ineffectiveness, refund difficulties) and should be weighted more heavily than the Trustpilot distribution suggests.
- Competitor negative reviews were star-filtered (1-3 stars only) to capture substantive product/service complaints. Generic shipping complaints were excluded from the Positioning Ammo document.

*Last updated: April 2026*
