# IM8 — Landing Page Analysis

> Scraped 2026-03-25 / 2026-03-26. Six landing pages across `im8health.com` and `get.im8health.com`. Full per-page breakdowns (long-form funnel context, repeated proof blocks, duplicate ambassador lists) archived at `00 Archive/IM8/Landing Page Analysis - IM8 (pre-compression 2026-04-15).md`. This doc keeps strategic takeaways + the per-page copy, CTAs, and section inventories that are useful for briefs and scripts.

---

## Pages Scraped

| Page | URL | Type | Audience | Primary Angle |
|---|---|---|---|---|
| Recovery / CrossFit | im8health.com/pages/accelerate-recovery-in-90-days | Advertorial (Shopify) | Competitive athletes | Recovery as performance bottleneck |
| GLP-1 Support | get.im8health.com/pages/glp1 | Paid funnel (React SPA) | GLP-1 medication users | 7 reasons to add IM8 before muscle loss & hair thinning |
| Homepage | im8health.com | Brand hub (Shopify) | General / all personas | Science + Beckham + "New Gold Standard" |
| Essentials | get.im8health.com/essentials | Paid funnel (React SPA) | General health-conscious | Product-first PDP, 9 organ systems |
| Menopause | get.im8health.com/pages/menopause | Paid funnel (React SPA) | Women 40-60 in menopause | 7 reasons to replace supplement cabinet |
| Tavi Castro Editorial | im8health.com/pages/tavi-castro-editorial | Influencer editorial | Fitness / male 25-45 | Extreme performance demands extreme nutrition |

`get.im8health.com` pages are React SPAs — scrape with headless Playwright.

---

## The 3 Load-Bearing Takeaways

### 1. The Scientific Advisory Board is the moat
The 11-member SAB (NASA, Mayo Clinic, Cedars-Sinai, Yale) is the single most differentiated asset IM8 has vs. AG1 and every greens competitor. Every landing page leans on it — expert bios, credentials, institutional affiliations. The **James Green (former NASA Chief Scientist) quote** is the most-used testimonial across the site, appearing on 4+ of 6 pages: *"After decades at NASA studying the effects of space on the human body, I saw an opportunity with IM8 to apply that knowledge here on Earth."* **Creative implication:** make the SAB visceral, not a footnote. Real faces + institutions + specific expertise > generic "clinically formulated."

### 2. The "7 Reasons" listicle is a scalable audience-funnel template
Both GLP-1 and Menopause pages use the **same structural template** with audience-specific copy:

```
Category badge → H1 "7 REASONS [AUDIENCE] ARE [ACTION]" → Hero CTA + scroll anchor
→ Clinical proof block (12-week trial stats) → SAB section → Trust ticker
→ 7 numbered reason sections (each with ingredient science) → Embedded product module
→ Ambassador carousel → Competitor comparison table → Reviews → Cost savings → FAQ
→ Sticky footer CTA
```

Template is consistent; claims, ingredients, testimonials, and FAQ questions are entirely different per audience. The Essentials page plays a different role — product-first PDP with the "9 Major Organ Systems" visualization — for higher-intent traffic. **Creative implication:** concepts should map to one audience lane cleanly. Don't dilute across lanes.

### 3. Explicit AG1 competition with named ingredient deltas
- **"The New Gold Standard"** — section heading on all three get.im8health.com pages.
- **"AG1 Pioneered It. IM8 Perfected It."** — active test landing page.
- **Clinical comparison table (11 nutrients vs. "Leading Greens Powder")** on all get.im8health.com pages: K2 +11%, CoQ10 +67%, Vitamin C +80%, Prebiotic Fiber +50%, Riboflavin +110%, Magnesium +233%, Selenium +218%, Chromium +300%, Copper +400%, Manganese +650%, Molybdenum +11%.
- **Menopause FAQ names AG1 directly:** 200mcg B12 vs AG1's 400mcg · 100mcg K2 vs AG1's 90mcg · 50mcg D3 (AG1 has none) · 1,500mg MSM (AG1 has none) · proprietary CRT8 cell renewal complex (no competitor carries).
- **90+ ingredients vs AG1's ~75** · **NSF Certified for Sport** (AG1 doesn't) · **Clinical trials** (SFRI-named) · **Beckham co-founding partner** vs AG1's paid podcast sponsorships.

**Creative implication:** head-to-head comparison content is fair game and already live on-site. Ingredient-level specificity is the register.

---

## Domain Architecture

| Domain | Purpose | Tech Stack | Content Type |
|---|---|---|---|
| `im8health.com` | Brand hub + SEO + organic | Shopify (server-rendered) | Full brand experience, product pages, editorial |
| `get.im8health.com` | Paid media acquisition funnels | React SPA (client-rendered) | Stripped-down, conversion-focused landing pages |

Multiple SPA URL variants (`/essentials`, `/for/gut`, `/pages/glp1`, `/pages/menopause`, `/ollie`) confirm extensive audience segmentation and angle testing. The SPA approach also blocks traditional scrapers — common in DTC paid media funnels.

---

## Per-Page Breakdowns

### Page 1 — Recovery / CrossFit (`/pages/accelerate-recovery-in-90-days`)

- **Angle:** Recovery as the bottleneck to performance. Elite athletes already train hard — standard supplements fail them on recovery, joint health, sustained energy.
- **Promo banner:** "NEW YEAR 2026: Exclusive 35% Off — Limited Time Only"
- **Hero CTAs:** `START MY TRANSFORMATION` (scrolls to product) · `MEET YOUR EXPERTS` (scrolls to SAB) · `Get Started` (direct to Essentials Pro PDP)
- **Tone:** Aspirational + competitive. Athlete identity language — "accelerate," "train harder," "recover faster," "elite recovery." Authority-heavy (SAB as centerpiece).
- **Section inventory:** Hero + proof stack → Scientific Advisory Board (expandable bios for 9+ experts with institutional titles) → Live order count display (dynamic social proof) → NSF Certified for Sport badge → Ingredients/benefits → Offer/product → Reviews.
- **Unique content blocks:** Expandable SAB expert bios with "Learn More" links; 11-member SAB is the centerpiece. NSF Certified for Sport badge prominently displayed — non-negotiable for drug-tested athletes.
- **Funnel context:** Mid-to-bottom funnel for warm/hot traffic (paid social to CrossFit audiences, retargeting, influencer referral). 90-day framing nudges quarterly subscription.

### Page 2 — GLP-1 Support (`/pages/glp1`)

- **H1:** `7 REASONS GLP-1 USERS ARE ADDING IM8 BEFORE MUSCLE LOSS & HAIR THINNING SET IN`
- **Angle:** "Your GLP-1 medication works. What it doesn't do: replace the 11 nutrients your reduced eating is depleting." Urgency-based, fear of loss.
- **Hero CTAs:** `GET STARTED — SAVE 30%` (primary) · `See the 7 Reasons` (scroll anchor)
- **Product module CTA:** `START MY 90-DAY TRANSFORMATION — $78/MO`
- **Cost savings CTA:** `SHOP NOW` (in savings breakdown section)
- **Sticky footer:** `GET STARTED — SAVE 30%` with "Protect your results on GLP-1"
- **Tone:** Direct, urgent, slightly aggressive. Fear of loss over aspiration. Anti-doctor framing in Reason 3 ("YOUR DOCTOR DIDN'T WARN YOU ABOUT THESE 11 DEFICIENCIES"). Cost-efficiency framing in Reason 6 ("REPLACE 8-10 SEPARATE SUPPLEMENTS FOR A FRACTION OF THE COST").
- **The 7 Reasons (exact sequence):**
  1. **Muscle Mass** — up to 40% of GLP-1 weight loss is muscle. Amino acids, adaptogens (Rhodiola, Reishi), CoQ10.
  2. **Hair/Nails/Skin** — cosmetic side effects as "signals of nutrient collapse." Ingredient infographic: MSM 1,500mg, Biotin 300mcg, AstaPure Astaxanthin, Vitamin C 900mg, Copper 1mg.
  3. **11 Deficiencies** — most fear-based section. Cambridge University 2026 study: GLP-1 patients receive zero nutritional guidance. Dr. Dawn Mussallem testimonial.
  4. **Energy/Clarity** — links to Aryna Sabalenka endorsement. 95% energy stat.
  5. **Gut Health** — addresses 40% GLP-1 users' nausea/bloating/constipation. Pre/pro/post-biotic + enzymes breakdown. 3 customer testimonials.
  6. **Cost Replacement** — $315+/mo separate supplements vs $78/mo IM8 = $226/mo saved. Dustin Poirier testimonial.
  7. **NSF Certified** — safety framing for "already putting a powerful medication in your body." Beckham, Bearman, Sabalenka, Poirier trust signals.
- **Offer structure:** 90-Day (Most Popular) $78/mo ($235 billed every 12wks, saves $34/mo + Mystery Gift + 90-day guarantee + Transformation Program access) · 30-Day $89/mo · One-Time $112. HSA/FSA via Truemed.
- **Doctor testimonial (Reason 3):** Dr. Dawn Mussallem (CMO Fountain Life / founder Mayo Clinic Integrative Breast Oncology) — recommends comprehensive all-in-one formula for GLP-1 patients.
- **FAQ:** 7 questions on medication interactions, timing, hair loss, taste, guarantee.

### Page 3 — Homepage (`im8health.com`)

- **Angle:** "The New Gold Standard" — IM8 is the evolution beyond green powders.
- **Announcement bar:** "Save 30% + Get Free Welcome Gifts | Free Shipping on All Subscriptions"
- **CTAs:** `Get Started` (primary, → Essentials Pro) · `Shop Now` (persistent)
- **Tone:** Premium, authoritative. Heavy institutional credibility. Science-forward. Aspirational health language: "longevity," "cellular renewal," "gold standard."
- **Unique content blocks:**
  - **Superpower Blood Test upsell** — 100+ biomarkers from $49 (was $199). Retention/engagement play, not acquisition. Only appears on main site.
  - **"Wall of Health"** branded review gallery.
  - **Multi-currency support** — ships to 40+ countries.
  - **Referral discount system** (viral loop) + **IM8 Inner Circle** affiliate/referral program.
  - **Aryna Sabalenka partnership** framed as Global Ambassador AND Shareholder (deeper than typical athlete endorsement).
- **Pricing on-page:** Essentials Pro $89/mo / $112 / $235 quarterly · Longevity $119/mo / $149 · Beckham Stack Pro $208/mo / $261 · Welcome Kit valued at $60.

### Page 4 — Essentials Landing (`/essentials`)

- **H1:** `DAILY ULTIMATE ESSENTIALS PRO — All-in-One Supplement`
- **Angle:** Product-first PDP. Announcement bar: "PRO LAUNCH: 30% OFF — Feel Like Yourself Again." One formula replaces 16 supplements across 9 major organ systems.
- **CTAs:** No hero CTA above the fold — the product module IS the hero. Product CTA: `START MY 90-DAY TRANSFORMATION PROGRAM — $78/MO`. Secondary: `One Time Purchase for $112`. Cost savings: `SHOP NOW`.
- **Tone:** Product-forward, functional. Less storytelling, more feature/benefit. Organ-system approach — benefits organized by body system rather than by symptom. "Engineered for peak absorption," "comprehensive formula."
- **Section inventory:** Product module (hero, with image carousel: Product / Results / Inside / Comparison / Lifestyle / How To / Label tabs) → Clinically Proven Results (12-wk SFRI trial: 95% energy / 85% gut / 80% sleep / 75% focus) → How to Enjoy (3 steps + flavor tasting notes) → **9 Major Organ Systems section** → Ambassador carousel → Clinical Comparison table → 9 verified reviews → FAQ → HSA/FSA popup.
- **The 9 Major Organ Systems visualization** (unique to this page — the most distinctive content block):
  - **Digestive:** Prebiotic Fiber 3g, Probiotics 10B CFU, Postbiotics FloraSMART, Ginger Root, Turmeric
  - **Immune:** Vitamin C 900mg, D3 50mcg, Selenium 70mcg, Zinc, Elderberry
  - **Cardiovascular:** CoQ10 100mg, K2 100mcg, AstaPure Astaxanthin, Beet Root, Quatrefolic Folate
  - **Muscular:** MSM 1,500mg, Magnesium 100mg, D3, Chromium 100mcg, Turmeric Extract
  - **Skeletal:** D3 50mcg, K2 100mcg, Calcium, Magnesium 100mg, Manganese 3mg
  - **Endocrine:** Iodine 150mcg, Selenium 70mcg, Chromium 100mcg, Rhodiola Root, B-Vitamin Complex
  - **Urinary:** Cranberry Extract, Vitamin C 900mg, Probiotics, Copper 1mg, Molybdenum 50mcg
  - **Skin/Hair/Nails:** MSM 1,500mg, Biotin, Vitamin C 900mg, AstaPure Astaxanthin, Copper 1mg
  - **Nervous:** B-Vitamin Complex, Magnesium 100mg, Quatrefolic Folate, Saffron 30mg, Rhodiola Root, Choline
- **Ingredient browser:** 11 tabs — Vitamins & Minerals (27), Superfoods/Greens/Herbs (23), Amino Acids & Recovery (14), Digestive Enzymes (6), Adaptogens & Mushrooms (5), Hydra Electrolytes (3), Probiotics & Postbiotics (3), CRT8 (6), Heart Health (1), Joint & Muscle Support (1), Saffron Extract (1).
- **Funnel role:** Default paid media landing page for campaigns not targeting a specific health concern. Assumes higher intent; less educational lift than GLP-1/Menopause pages.

### Page 5 — Menopause (`/pages/menopause`)

- **H1:** `7 REASONS WOMEN IN MENOPAUSE ARE REPLACING THEIR ENTIRE SUPPLEMENT CABINET WITH ESSENTIALS PRO`
- **Angle:** "Your body is changing. Your nutrition should have changed years ago." Overarching theme: "RECLAIM YOUR BODY." Empowerment framing (not transformation).
- **Hero CTAs:** `START REBUILDING. SAVE 30%` (primary) · `See the 7 Reasons` (scroll anchor)
- **Product module CTA:** `START MY 90-DAY TRANSFORMATION — $78/MO`
- **Sticky footer:** `START TODAY. SAVE 30%` with "Stop managing symptoms. Start rebuilding."
- **Tone — most scientifically detailed of all 6 pages.** Empathetic but authoritative. Validation language ("You are not losing your mind. Your brain is starving for the right raw materials."). Anti-conventional-supplement throughout ("A BASIC MULTIVITAMIN WILL NOT FIX IT," "CALCIUM ALONE MAKES IT WORSE," "MOST SUPPLEMENTS USE THE WRONG FORM ANYWAY"). Names exact nutrient forms — **methylcobalamin vs cyanocobalamin**, **magnesium bisglycinate vs oxide**, **P5P form of B6**, **MK-7 form of K2**, **vegan lichen D3**.
- **The 7 Reasons (exact sequence):**
  1. **Fatigue** — fatigue as "multi-system breakdown." B12 upgrade 24mcg → 200mcg (+733%). CRT8 + 1,580mg Amino Complex. "An engine rebuild."
  2. **Bone Density** — most sophisticated medical argument. D3-K2 calcium-directing synergy (calcium without K2 deposits in arteries). **"Bone Protection Triad" visual:** D3 + K2 + Magnesium.
  3. **Brain Fog** — "YOUR BRAIN FOG IS NOT JUST STRESS. IT IS A NUTRIENT DEFICIT WITH A CLINICAL SOLUTION." Saffron 30mg + Choline 55mg + B6 as P5P. Low B12 → 2-4x cognitive impairment risk. Dr. Amy Shah endorsement.
  4. **Sleep/Hot Flashes** — magnesium deficiency → vasomotor symptoms. **Bioavailability comparison chart: Mg Oxide 4% vs Bisglycinate 80%+**. Saffron for menopausal sleep quality. Dr. Dawn Mussallem: *"Women in menopause are losing nutrients across every system... A piecemeal approach with 6 different bottles is not the answer."*
  5. **B12 Absorption Decline** — **age-related absorption decline chart (95% at 30-50 → 28% at 75+)**. 38% of adults 75+ B12 deficient.
  6. **Joint Stiffness** — declining estrogen → inflammation. MSM 1,500mg + bioactive B-complex. Sabalenka trust signal.
  7. **Replace Supplement Cabinet** — $150-$250/mo fragmented vs $78/mo one NSF product. 16,000+ reviews, 22M+ servings.
- **3 menopause-specific testimonials** (embedded Reasons 2-3 area, notably more personal/emotional than general reviews — purpose-curated or written for this audience):
  - **Sandra K. (54):** *"For two years I barely recognized myself... the exhaustion, the brain fog, waking up drenched at 3am... Three weeks into IM8 my husband looked at me and said 'you're back.'"*
  - **Michelle T.:** *"I cried the first morning I woke up without night sweats."*
  - **Patricia L.:** *"My doctor ran bloodwork after 90 days... My B12 and Vitamin D levels were finally where they should be for the first time in years. She asked me what changed."*
- **FAQ:** 7 questions including "How is IM8 different from AG1?" — explicitly names AG1 with ingredient-by-ingredient comparison (see takeaway #3 above).
- **Strategic note:** This is not a test page — it's a fully committed content investment in women's health.

### Page 6 — Tavi Castro Editorial (`/pages/tavi-castro-editorial`)

- **Angle:** Extreme performance demands extreme nutrition. Tavi as "the real-life Aquaman" — professional freediver under extreme physiological stress (extended breath holds, crushing deep-water pressure).
- **CTA:** `Dive Into IM8 & Get My Free Welcome Kit!` — thematic pun on freediving. Links to discounted purchase with code **TAVI10** pre-applied (stacks with 30% + Free Welcome Gifts = ~40% total).
- **Tone/structure:** First-person editorial voice — reads as personal endorsement, not brand ad. Adventure/exploration language ("diving deep," "anchor," "depths"). Community language: **"55,000 Strong. 5 Million+ Served. This Is a Movement, Not a Moment."**
- **Section inventory:** Long-form editorial narrative (personal story arc) → image slider with customer/athlete testimonials → community stats → James Green NASA quote cross-sell (reinforces science credibility even on an influencer page) → CTA with code.
- **Key quotes used:** Tavi "incredibly meticulous, almost obsessive, about what I put into my body" · His work requires "perfect physiological and psychological alignment."
- **Why this matters for influencer briefs:** Standard "use my code" link does not build deep engagement. This format does — first-person narrative with story arc + exclusive discount + community-belonging language. Template for future influencer editorials.

---

## Cross-Page Strategic Patterns

### CTA Language by Audience
- **GLP-1:** `GET STARTED — SAVE 30%` / `Protect your results on GLP-1` → **loss aversion**
- **Menopause:** `START REBUILDING. SAVE 30%` / `Stop managing symptoms. Start rebuilding.` / `Reclaim Your Body` → **empowerment**
- **Essentials (broad):** `START MY 90-DAY TRANSFORMATION PROGRAM — $78/MO` → **generic transformation**
- **Athletes (CrossFit):** `START MY TRANSFORMATION` → **athlete identity / transformation**
- **Editorial (Tavi):** `Dive Into IM8` → **thematic pun / community**

All three get.im8health.com pages converge on the same product-module CTA (`START MY 90-DAY TRANSFORMATION — $78/MO`); differentiation happens in the hero and sticky footer.

### Offer Tiering (get.im8health.com)
- **90-Day (Most Popular):** $78/mo · $235 billed every 12 weeks · saves $34/mo · **+ Free Mystery Gift · + 90-day guarantee · + 90-Day Transformation Program access**
- **30-Day:** $89/mo · saves $23/mo · 30-day guarantee · cancel anytime
- **One-Time:** $112
- **Cost comparison used on-page:** $290/mo in traditional supplements vs $78/mo IM8 = $2,532-$3,000/yr saved.
- **HSA/FSA via Truemed (98% approval)** — only on get.im8health.com pages. Effectively ~30% further cost reduction.

### Offer Consistency Across Pages
Base framework is universal: ~30% off + Free Welcome Kit + Free Shipping. Seasonal or influencer layers on top (35% New Year promo on CrossFit; extra 10% TAVI10 stacks with base). Offer isn't the test variable — audience and angle are.

### Trust Stack (layered, repeats across pages)
1. Celebrity founder — Beckham as co-founding partner (not endorser).
2. Institutional authority — NASA, Mayo Clinic, Cedars-Sinai, Yale.
3. Named experts — 11 SAB members with full bios.
4. Athlete validation — Sabalenka (shareholder), Bearman (F1), Poirier (UFC), Castro.
5. Certifications — NSF Certified for Sport, Eurofins third-party testing.
6. Clinical proof — SFRI 12-week trial (95% energy / 85% gut / 80% sleep / 75% focus).
7. Social proof — 16,255 reviews (4.8 avg), 700K+ purchases, 22M+ servings, live order counter.
8. Manufacturing — FDA-registered, GMP-certified, Vitaquest NJ.

### Ambassador Carousel (identical on GLP-1, Essentials, Menopause)
Bobby Rich · Dr. Robin Barrett · Dr. Amy Shah · Dustin Poirier · Mona Sharma · Tavi Castro · David Beckham · Aryna Sabalenka. Carousel repeats twice in DOM on GLP-1 page.

### Funnel Architecture (One-Liner)
Cold paid → `get.im8health.com/{essentials,glp1,menopause,for/gut}` (SPA listicle funnels) → Essentials Pro subscription. Warm/influencer → `im8health.com/pages/*` (Shopify editorial pages). Organic/brand → `im8health.com` homepage (full catalog + Beckham Stack/Longevity + Superpower blood test upsell).

### Other Facts Worth Preserving
- **Beckham framing:** "co-founding partner" (equity/alignment), not "brand ambassador" (paid) — deliberate copy choice.
- **Ingredient count copy:** get.im8health.com pages use "90+" not "92." Client confirmed correct number is 90 (April 2026).
- **Only 3 reviews on Longevity** when scraped — newly reformulated capsule → powder.
- **Menopause + GLP-1 pages share the same 9 general customer reviews** (Trustpilot + direct) — menopause page adds 3 menopause-specific testimonials on top.

---

*For full narrative per-page funnel context, repeated ingredient bullets, the complete SAB bio list, and duplicate trust-stack prose, see the archived version.*
