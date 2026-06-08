# Product Context: Elevate Health GLP-1 Programs

---

## Verified First-Party Facts (Source of Truth for Creative)

Every price, timeline, inclusion, rating, and patient-count number cited in a brief or script must trace to this section. When numbers disagree between existing ads and the facts here, this section wins.

- **Semaglutide 12-week bundle:** $699 total → **$58.25/week** ("Programs from $58/week" is the verified floor). *Source: start.joinelevate.com product page, scraped 2026-04-07.*
- **Tirzepatide 12-week bundle:** $789 total → ~$65.75/week. *Source: same.*
- **Monthly one-time pricing:** Semaglutide $349, Tirzepatide $449. *Source: same.*
- **Subscription pricing:** $99/month (via Seal Subscriptions). *Source: same.*
- **Shipping timeline:** "Medication usually ships in 3-7 business days once you have been approved." *Source: strategist update, 2026-05-27. Replaces prior 7-10 business day site scrape.*
- **Patient count:** "35,000+ Happy Patients." *Source: joinelevate.com homepage, scraped 2026-04-07.*
- **Star ratings:** 5.0 stars displayed on homepage testimonials. *Source: same.*
- **Program inclusions** (per monthly order): medication vial + syringes + alcohol wipes + 60-day supply of anti-nausea meds + physician assessment + ongoing support + free lab panel. *Source: app.joinelevate.com semaglutide program page, scraped 2026-04-07.*
- **Payment options:** Affirm, Klarna, Afterpay ("$0 down" options); HSA/FSA eligible. *Source: start.joinelevate.com checkout, scraped 2026-04-07.*

*Raw scraped pages were archived out of `00 Context/` after extraction. If a new fact needs verification, re-run `scripts/scrape_elevate.py` against the live site.*

---

## Overview

Elevate Health offers compounded GLP-1 and GLP-1/GIP receptor agonist medications for medical weight loss via telehealth. All medications are compounded by state-licensed pharmacies and are NOT FDA-approved. Treatment is prescribed by licensed providers contracted through MDIntegrations and TelegraMG after clinical review.

**Pricing model:**
- One-time purchase (monthly or 12-week bundle)
- Monthly subscription (significant discount via Seal Subscriptions)
- Payment plans via Affirm, Klarna, Afterpay ("$0 down" options)
- HSA/FSA eligible
- Free shipping, free blood work included

**Eligibility:**
- BMI ≥30 (obesity), or BMI ≥27 with at least one weight-related comorbidity (hypertension, type 2 diabetes, dyslipidemia)
- Not pregnant, breastfeeding, or planning pregnancy
- No personal/family history of medullary thyroid carcinoma (MTC) or MEN 2 syndrome
- No active pancreatitis, severe kidney disease

**Quality claims:**
- "Designed by top 1% weight-loss doctors"
- Medications from "FDA-registered 503B outsourcing facilities" (specific pharmacy not disclosed)
- Free lab panel included for comprehensive clinical oversight

---

## Product 1: Compounded Semaglutide Program (Monthly)

**Category:** GLP-1 Weight Loss
**Price:** $349 one-time | $99/mo subscription | Currently $149 with $200 promo discount
**Format:** Injectable, subcutaneous, once weekly
**Duration:** Monthly supply (4 doses)

### What's Included
- Multi-dose semaglutide vial (compounded)
- Syringes
- Alcohol wipes
- 60-day supply of anti-nausea medication
- Initial assessment with licensed physician
- Ongoing support and follow-ups
- Free lab panel (blood work)

### Mechanism of Action
Semaglutide is a synthetic glucagon-like peptide-1 (GLP-1) receptor agonist. It works by:
- Mimicking the GLP-1 hormone that targets areas in the brain regulating appetite and food intake
- Slowing gastric emptying (helps feel fuller longer)
- Reducing appetite and food cravings ("food noise" reduction)
- Improving blood sugar regulation

### Key Claims
- Patients lost up to 15% of body weight in the first year
- Average 11.7 lbs loss in the first month (landing page claim)
- 80% of users saw meaningful progress within 90 days
- 79% experienced improved appetite control and reduced cravings
- 77% felt more energized and healthier
- 68% found better results than other methods tried

### Dosing Protocol
- Start at a low dose, titrated up every 4 weeks as clinically appropriate
- Provider adjusts based on tolerance and progress
- Can start at higher dose if transferring from existing prescription (photo of prescription label required)
- Inject once weekly, same day each week
- Rotate injection sites (stomach, thigh, upper arm)

### Common Side Effects
- Nausea (most common — anti-nausea meds included)
- Diarrhea, vomiting, constipation
- Stomach pain, indigestion, reflux
- Injection site reactions
- Fatigue
- Hair loss (related to rapid weight loss, not medication directly)
- Belching

### Serious Warnings (Black Box)
- **Thyroid C-cell tumors:** In animal studies, semaglutide caused thyroid tumors. Risk in humans unknown. Contraindicated in patients with MTC history or MEN 2.
- **Acute pancreatitis:** Monitor for severe abdominal pain
- **Acute gallbladder disease:** Gallstones risk
- **Hypoglycemia:** Especially when combined with insulin or sulfonylureas
- **Acute kidney injury:** Dehydration risk from GI side effects
- **Suicidal behavior/ideation:** Monitor for mental health changes

### Regulatory Status
**NOT FDA-approved.** Compounded semaglutide does not undergo FDA review for safety, effectiveness, or manufacturing consistency. It is a compounded version of the active ingredient in Ozempic/Wegovy but is NOT the same product. Prepared under federal compounding exemptions.

---

## Product 2: Compounded Semaglutide Program (12-Week Bundle)

**Category:** GLP-1 Weight Loss
**Price:** $699 for 12 weeks
**Format:** Same as monthly program but bundled for 12-week commitment
**Included:** Same as monthly program plus 3 months of medication

### Key Difference from Monthly
- Better per-month value ($233/month vs. $349/month one-time)
- Pricing may change if starting at a higher dose
- Designed for patients committing to a full treatment cycle

---

## Product 3: Compounded Tirzepatide Program (Monthly)

**Category:** GLP-1/GIP Weight Loss (Dual Agonist)
**Price:** $449 one-time | $99/mo subscription | Currently $149 with $300 promo discount
**Format:** Injectable, subcutaneous, once weekly
**Duration:** Monthly supply (4 doses)

### What's Included
Same as semaglutide program: vial, syringes, alcohol wipes, anti-nausea meds, physician assessment, ongoing support, free labs.

### Mechanism of Action
Tirzepatide is a dual GLP-1/GIP receptor agonist — it activates BOTH the GLP-1 and GIP pathways. This dual mechanism may produce:
- Greater appetite suppression than semaglutide alone
- Enhanced insulin sensitivity
- Improved glucose metabolism
- Potentially faster/greater weight loss

### Key Claims
- Positioned as "Most Effective" on joinelevate.com homepage
- "Advanced provider-guided metabolic support options"
- Recommended for patients who had insufficient results on semaglutide alone

### Regulatory Status
**NOT FDA-approved.** Compounded tirzepatide is prepared by licensed 503A compounding pharmacies. Not the same as Mounjaro or Zepbound (both FDA-approved branded tirzepatide from Eli Lilly). Elevate explicitly states no affiliation with Eli Lilly.

---

## Product 4: Compounded Tirzepatide Program (12-Week Bundle)

**Category:** GLP-1/GIP Weight Loss
**Price:** $789 for 12 weeks
**Format:** Same as monthly tirzepatide, bundled
**Per-month value:** ~$263/month

---

## Product 5: Zepbound (FDA-Approved Tirzepatide)

**Category:** FDA-Approved Weight Loss (Tirzepatide injection)
**Price:** ~$1,289
**Format:** Brand-name Eli Lilly Zepbound injection

### Key Difference
- FDA-approved, manufactured by Eli Lilly
- Undergoes full FDA safety and efficacy review
- Significantly more expensive than compounded options
- Listed on joinelevate.com as the "Most Effective" option

---

## Product 6: Phentermine

**Category:** FDA-Approved Weight Loss (Oral)
**Price:** $258
**Format:** Oral tablets

### Key Facts
- FDA-approved appetite suppressant
- Stimulant-based (different mechanism than GLP-1)
- Short-term use (typically 12 weeks)
- Available for patients who don't qualify for or prefer alternatives to GLP-1

---

## Product 7: Add-On Injections

| Product | Price | Purpose |
|---------|-------|---------|
| B12 Injection | $109 | Mood, energy support |
| NAD+ Injection | $219 | Energy, longevity, cellular health |
| Glutathione Injection | $129 | Master antioxidant, detox support |

### Notes
- Listed on joinelevate.com homepage alongside core GLP-1 products
- Likely shipped separately from GLP-1 medication
- No detailed ingredient or clinical information provided on site

---

## Product 8: GLP Nutra Gummies (Side-Effect Support)

Sold via start.joinelevate.com (Shopify store). Four gummy formulations designed to address common GLP-1 side effects.

| Product | Price | Key Ingredients | Addresses |
|---------|-------|-----------------|-----------|
| Fat Burner | ~$19.99 | Not disclosed on scraped page | Fatigue, supports weight loss |
| Fiber Max | ~$19.99 | Fiber blend | Constipation, intestinal regularity |
| Probiotic Max | ~$19.99 | Two probiotic strains | Digestive system support |
| Stress Relief | ~$19.99 | Ashwagandha | Stress, anxiety, mood |

### Strategic Notes
- Creates a secondary revenue stream from existing GLP-1 patients
- Solves real side-effect problems that GLP-1 users experience
- Low price point ($19.99) creates easy upsell/add-on opportunity
- Shopify-based (separate from main app platform) suggests this is a newer addition

---

## Product Strategy Notes for Creative

1. **The product IS the price.** Elevate doesn't sell clinical depth, proprietary formulations, or biomarker insights. It sells affordable GLP-1 access. Every creative should lead with price/value.

2. **Compounded vs. brand-name is the key objection to navigate.** Educated buyers will ask "is this the real Ozempic?" Creative needs to acknowledge compounding honestly while emphasizing that the active ingredient (semaglutide) is the same, prescribed by real doctors, and prepared by licensed pharmacies.

3. **The anti-nausea medication inclusion is an underused selling point.** Nausea is the #1 reason people quit GLP-1 therapy. Including anti-nausea meds in every shipment is a genuine retention differentiator that should feature more prominently in creative.

4. **Free blood work is a trust signal AND a medical credibility play.** It signals "we're not just a pill mill — we do real medical oversight." This differentiates from many competitors who skip labs entirely.

5. **Payment plans are the conversion unlock.** Many reviews explicitly cite Affirm/Klarna/Afterpay as the reason they chose Elevate. "$0 down" isn't just marketing — it's the actual conversion mechanism for cost-sensitive buyers.

6. **The gummy supplement line is a retention play.** Patients who experience GLP-1 side effects (constipation, nausea, fatigue) are at risk of dropping out. The gummy line addresses this directly and creates a habit-forming secondary purchase.

7. **Tirzepatide is the upgrade path.** For patients on semaglutide who plateau, tirzepatide (dual GLP-1/GIP) is positioned as the more effective option. This creates an internal upgrade funnel.

---

*Last updated: April 2026*
