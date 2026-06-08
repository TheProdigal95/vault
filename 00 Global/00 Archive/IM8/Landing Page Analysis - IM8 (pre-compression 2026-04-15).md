# IM8 — Landing Page Analysis

> Scraped and analyzed 2026-03-25 (Shopify pages) and 2026-03-26 (React SPA pages via Playwright). Six landing pages examined across `im8health.com` and `get.im8health.com`.

---

## Quick Reference

| Page | URL | Type | Audience | Primary Angle |
|---|---|---|---|---|
| Recovery / CrossFit | [Link](https://im8health.com/pages/accelerate-recovery-in-90-days) | Advertorial | Competitive athletes | Recovery as performance bottleneck |
| GLP-1 Support | [Link](https://get.im8health.com/pages/glp1) | Paid funnel (SPA) | GLP-1 medication users | 7 reasons to add IM8 before muscle loss & hair thinning |
| Homepage | [Link](https://im8health.com) | Brand hub | General / all personas | Science + Beckham + "New Gold Standard" |
| Essentials | [Link](https://get.im8health.com/essentials) | Paid funnel (SPA) | General health-conscious | Product-first PDP with clinical proof + organ system support |
| Menopause | [Link](https://get.im8health.com/pages/menopause) | Paid funnel (SPA) | Women 40-60 in menopause | 7 reasons to replace supplement cabinet for menopause |
| Tavi Castro Editorial | [Link](https://im8health.com/pages/tavi-castro-editorial) | Influencer editorial | Fitness / male 25-45 | Influencer endorsement + science |

*Note: `get.im8health.com` pages are React SPAs (client-side rendered). Content was scraped using headless Playwright on 2026-03-26 to render the full client-side content.*

---

## Table of Contents

1. [Page 1: Accelerate Recovery in 90 Days (CrossFit/Athletes)](#page-1-accelerate-recovery-in-90-days)
2. [Page 2: GLP-1 Support](#page-2-glp-1-support)
3. [Page 3: Homepage](#page-3-homepage)
4. [Page 4: Essentials (get.im8health.com)](#page-4-essentials-landing)
5. [Page 5: Menopause](#page-5-menopause)
6. [Page 6: Tavi Castro Editorial](#page-6-tavi-castro-editorial)
7. [Cross-Page Comparison & Strategic Patterns](#cross-page-comparison--strategic-patterns)

---

## Page 1: Accelerate Recovery in 90 Days

**URL:** `https://im8health.com/pages/accelerate-recovery-in-90-days`

### Page Type
Audience-specific landing page / advertorial hybrid. Sits on the main domain as a dedicated page targeting competitive athletes — specifically CrossFit competitors.

### Target Audience
Competitive CrossFit athletes and high-performance training enthusiasts. The copy explicitly addresses "competitive athletes" who "push your body to its limits daily" and are "striving for the podium."

### Primary Angle / Hook
**Recovery as the bottleneck to performance.** The premise is that elite athletes already train hard — but standard supplements fail them on recovery, joint health, and sustained energy. IM8 is positioned as the "all-in-one, NSF Certified for Sport solution" that bridges that gap.

### Key Claims & Proof Points
- NSF Certified for Sport (the gold standard for athletes — critical for drug-tested competitors)
- 11,000+ 5-star reviews
- 90 nutrient-rich ingredients in one serving
- Clinically proven, third-party tested
- Backed by 11-member Scientific Advisory Board (NASA, Mayo Clinic, Cedars-Sinai, Yale)
- Clinical trial registered with National Library of Medicine
- Manufactured in FDA-registered, GMP-certified facility (New Jersey, USA)
- Tested by Eurofins (independent lab)

### Offer Structure
- **Promo banner:** "NEW YEAR 2026: Exclusive 35% Off — Limited Time Only"
- Drives to Essentials Pro product (subscription or one-time)
- Standard pricing: $89/mo subscription, $112 one-time
- Free Welcome Gifts + Free Shipping on subscriptions

### CTA Strategy
Two primary CTAs in the hero:
1. **"START MY TRANSFORMATION"** — scrolls to product/gift section (action-oriented, transformation language)
2. **"MEET YOUR EXPERTS"** — scrolls to Scientific Advisory Board section (credibility play)
3. **"Get Started"** — links directly to Essentials Pro product page

The CTA hierarchy suggests they lead with emotion/transformation, then back it up with authority, then provide the product path.

### Messaging Tone & Style
- Aspirational and competitive. Speaks the language of athletes who identify with pushing limits.
- Authority-heavy — leans hard into the scientific advisory board as a differentiator.
- Performance-focused language: "accelerate," "train harder," "recover faster," "elite recovery."

### Notable Sections & Elements
- **Scientific Advisory Board section** is the centerpiece — "BACKED BY WORLD-CLASS SCIENTIFIC EXPERTISE" with full bios for 9+ experts including their institutional affiliations (NASA, Mayo Clinic, Cedars-Sinai, Yale). This is a substantial credibility play.
- **Live order count display** — dynamic social proof showing real-time purchases.
- **NSF Certified for Sport badge** prominently displayed — this is a non-negotiable trust signal for competitive athletes subject to drug testing.
- Expert bio expandable sections with "Learn More" links to dedicated pages.

### Funnel Context
**Mid-to-bottom funnel page for warm/hot traffic.** Likely used for:
- Paid social ads targeting CrossFit / competitive fitness audiences
- Retargeting athletes who visited the main site but didn't convert
- Influencer referral traffic from fitness creators
- Potentially linked from CrossFit community partnerships

The 90-day framing suggests they're trying to get athletes to commit to a quarterly subscription.

---

## Page 2: GLP-1 Support

**URL:** `https://get.im8health.com/pages/glp1`

### Page Type
Audience-specific long-form listicle landing page on the `get.im8health.com` subdomain. React SPA, rendered client-side. Structured as a "7 Reasons" editorial-style sales page with an embedded product module at the midpoint.

### Target Audience
People currently taking or considering GLP-1 receptor agonist medications (Ozempic, Wegovy, Mounjaro) who are experiencing or worried about the side effects of reduced eating: muscle loss, hair thinning, energy crashes, nutrient depletion, and GI discomfort. The copy speaks directly to people already on these medications, not people considering them.

### Primary Angle / Hook
**"Your GLP-1 medication works. What it doesn't do: replace the 11 nutrients your reduced eating is depleting."** The page presents 7 numbered reasons why GLP-1 users specifically need IM8, framing the product as the essential companion to their weight-loss medication. The hook is urgency-based: act "before muscle loss & hair thinning set in."

### Key Claims & Proof Points
- **H1:** "7 REASONS GLP-1 USERS ARE ADDING IM8 BEFORE MUSCLE LOSS & HAIR THINNING SET IN"
- Up to 40% of weight loss on GLP-1 is muscle, not fat
- 11 critical nutrient deficiencies from reduced eating (B12, Magnesium, Vitamin D, Zinc, Saffron, Calcium, Folate, Biotin, CoQ10, Potassium, and a second Zinc entry for nails)
- 2026 Cambridge University study cited: GLP-1 patients receive zero nutritional guidance
- 40% of GLP-1 users experience nausea, bloating, constipation
- Replaces 8-10 separate supplements costing $315+/month
- 12-week randomized controlled trial: 95% more energy, 85% better gut health, 80% improved sleep, 75% sharper focus
- 16,255 5-star reviews, 700K+ purchases, 22M+ servings
- NSF Certified for Sport — 280+ banned substances tested per batch
- Dustin Poirier (UFC Champion), Aryna Sabalenka (World No. 1 Tennis), David Beckham (co-founder) all referenced
- Dr. Dawn Mussallem (CMO Fountain Life / founder Mayo Clinic Integrative Breast Oncology) doctor testimonial: recommends comprehensive all-in-one formula for GLP-1 patients
- Dr. Amy Shah (Double Board-Certified MD) endorsement
- James L. Green (Former Chief Scientist of NASA) as SAB member
- Clinical comparison table vs. "Leading Greens Powder" (unnamed AG1): IM8 wins on K2 (+11%), CoQ10 (+67%), Vitamin C (+80%), Prebiotic Fiber (+50%), Riboflavin (+110%), Magnesium (+233%), Selenium (+218%), Chromium (+300%), Copper (+400%), Manganese (+650%), Molybdenum (+11%)
- Specific ingredient callouts with doses: MSM 1,500mg, Biotin 300mcg, AstaPure Astaxanthin, Vitamin C 900mg, Copper 1mg
- Triple-action gut support: prebiotics (3g fiber), probiotics (10B CFU), postbiotics (FloraSMART), digestive enzymes

### Offer Structure
- **Banner:** "SAVE 30% -- Subscribe & Get a Free Welcome Kit"
- **90-Day Supply (Most Popular):** $78/mo ($2.61/serving), billed $235 every 12 weeks, saves $34/mo ($408/yr)
  - Free Welcome Kit (US$28 value)
  - Free Mystery Gift
  - 90-day money-back guarantee
  - Exclusive access to 90-Day IM8 Transformation Program
- **30-Day Supply:** $89/mo ($2.97/serving), saves $23/mo ($276/yr)
  - 30-day money-back guarantee
  - Cancel or pause anytime
  - Free Shipping to US, UK, CA, and most of EU and APAC
  - Free Welcome Kit (US$28)
- **One-Time Purchase:** $112
- **Cost comparison:** IM8 at $78/mo vs. $290/mo in separate supplements = $226 saved monthly, $2,532-$3,000 saved annually
- HSA/FSA eligible (via Truemed partnership)

### CTA Strategy
- **Hero CTA:** "GET STARTED -- SAVE 30%" (primary button) + "See the 7 Reasons" (scroll anchor)
- **Product module CTA:** "START MY 90-DAY TRANSFORMATION -- $78/MO" (the primary conversion button)
- **Cost savings CTA:** "SHOP NOW" (in the savings breakdown section)
- **Sticky footer CTA:** "GET STARTED -- SAVE 30%" with text "Protect your results on GLP-1"
- **Secondary:** "One Time Purchase for $112"
- The page uses two CTA paths — emotional/transformation ("START MY 90-DAY TRANSFORMATION") and rational/savings ("SHOP NOW" in the cost comparison section).

### Messaging Tone & Style
- Direct, urgent, and slightly aggressive. Uses fear of loss ("before muscle loss & hair thinning set in") rather than aspiration.
- Medical/clinical language mixed with consumer-friendly framing. References studies, clinical doses, and specific mechanisms (methylated B12, magnesium bisglycinate, etc.).
- Educational listicle format — each of the 7 reasons reads like a mini-article with a claim, explanation, and ingredient proof.
- Anti-doctor framing in Reason 3: "YOUR DOCTOR DIDN'T WARN YOU ABOUT THESE 11 DEFICIENCIES" — positions IM8 as filling a gap doctors leave.
- Cost-efficiency framing in Reason 6: "REPLACE 8-10 SEPARATE SUPPLEMENTS FOR A FRACTION OF THE COST" — positions IM8 as the smart financial choice.

### Notable Sections & Elements
- **7 Reasons structure** — each reason is a numbered section with a bold claim headline, explanatory copy, specific ingredient doses, and a visual element (chart, infographic, or testimonial). This is the most content-rich format of all the get.im8health.com pages.
- **Reason 1 (Muscle Mass):** Focuses on the muscle loss problem — up to 40% of GLP-1 weight loss being muscle. Highlights amino acids, adaptogens (Rhodiola, Reishi), and CoQ10.
- **Reason 2 (Hair/Nails/Skin):** Positions cosmetic side effects as "signals of nutrient collapse." Detailed ingredient infographic: MSM 1,500mg, Biotin 300mcg, AstaPure Astaxanthin, Vitamin C 900mg, Copper 1mg.
- **Reason 3 (11 Deficiencies):** The most fear-based section. Lists 11 deficiencies with symptoms. Cites Cambridge University 2026 study. Includes Dr. Dawn Mussallem testimonial.
- **Reason 4 (Energy/Clarity):** Links to Aryna Sabalenka endorsement. 95% energy improvement stat.
- **Reason 5 (Gut Health):** Addresses the #1 practical complaint of GLP-1 users (nausea/bloating). Detailed breakdown of pre/pro/post-biotic system. 3 customer testimonials.
- **Reason 6 (Cost Replacement):** The savings math: $315+/mo in separate supplements vs. $78/mo for IM8 = $226/mo saved. Dustin Poirier testimonial.
- **Reason 7 (NSF Certified):** Safety/purity framing for people "already putting a powerful medication in your body." References Beckham, Bearman, Sabalenka, Poirier as trust signals.
- **Product module** embedded mid-page with full pricing, flavor selection (Variety Pack default), and subscription options
- **Clinical Comparison table** vs. "Leading Greens Powder" — side-by-side dosing comparison across 11 nutrients
- **Ambassador/influencer carousel** — Bobby Rich, Dr. Robin Barrett, Dr. Amy Shah, Dustin Poirier, Mona Sharma, Tavi Castro, David Beckham, Aryna Sabalenka (carousel repeats twice in DOM)
- **9 verified customer reviews** — sourced from Trustpilot and direct, covering energy, gut health, Lupus, HRV improvement, celiac/chronic pain, executive performance
- **GLP-1-specific FAQ section:** 7 questions addressing medication interactions, timing, hair loss, taste, and guarantee
- **Sticky footer bar** with persistent CTA

### Funnel Context
**Top-of-funnel cold traffic acquisition page for GLP-1 medication users.** The `get.im8health.com` subdomain with full pixel stack (Facebook Pixel, GA4, GTM, Microsoft Clarity) confirms this is a paid media destination. The 7-reasons listicle format is designed for audiences who need education and persuasion before converting — likely from Facebook/Instagram ads targeting GLP-1-related interests and behaviors. The page does heavy lifting: it educates (why GLP-1 creates nutrient gaps), builds fear (muscle loss, hair thinning, 11 deficiencies), provides clinical proof, handles objections (medication safety, taste, guarantee), and drives to a single product (Essentials Pro subscription). The FAQ section specifically addresses GLP-1 medication concerns, confirming this page is purpose-built for that audience rather than a generic page with GLP-1 copy overlaid.

---

## Page 3: Homepage

**URL:** `https://im8health.com`

### Page Type
Brand homepage / storefront. The central hub of the IM8 brand experience.

### Target Audience
Broad — health-conscious adults interested in premium supplementation. Skews toward people who:
- Already take multiple supplements and want simplification
- Value science-backed, clinically validated products
- Respond to celebrity/authority endorsements
- Are willing to pay a premium for quality

### Primary Angle / Hook
**"The New Gold Standard" — IM8 is the evolution beyond green powders.** The homepage explicitly positions against the "green powder" category (AG1 being the obvious incumbent) and claims superiority through clinical proof, 90 ingredients, and expert backing.

### Key Claims & Proof Points
- Co-Founded by David Beckham and experts from Mayo Clinic and NASA
- "Clinically proven, third-party tested, all-in-one supplement"
- 90 nutrient-rich ingredients replacing 16 capsules in one drink
- 11-member Scientific Advisory Board
- NSF Certified for Sport
- Third-party tested by Eurofins
- Clinical trials registered with National Library of Medicine
- Used by Aryna Sabalenka (Global Ambassador and Shareholder)
- Manufactured in FDA-registered, GMP-certified facility in New Jersey

### Offer Structure
- **Announcement bar:** "Save 30% + Get Free Welcome Gifts | Free Shipping on All Subscriptions"
- **Essentials Pro:** $89/mo subscription, $112 one-time, $235 quarterly
- **Longevity:** $119/mo subscription, $149 one-time
- **Beckham Stack Pro:** $208/mo subscription, $261 one-time
- **Superpower offer:** Buy Essentials Pro and unlock the "Superpower 100+ Biomarkers Blood Test" from $49 (was $199)
- Free Welcome Kit (valued at $60) with subscription
- 30-day money-back satisfaction guarantee

### CTA Strategy
- **Primary:** "Get Started" — links to Essentials Pro product page
- **Secondary:** "Shop Now" — persistent bar for general browsing
- **Announcement bar** with promotional messaging
- Multiple pathways: product pages, science, ingredients, reviews ("Wall of Health")

### Messaging Tone & Style
- Premium and authoritative. Heavy on institutional credibility (NASA, Mayo Clinic, Cedars-Sinai, Yale).
- Celebrity-driven — David Beckham is front and center as co-founding partner, not just an endorser.
- Science-forward — the Scientific Advisory Board is a major differentiator they lean into repeatedly.
- Aspirational health language: "longevity," "cellular renewal," "gold standard."

### Notable Sections & Elements
- **"The New Gold Standard" positioning** — explicit competitive framing against AG1/green powders
- **David Beckham hero presence** — co-founder status, not just ambassador
- **Aryna Sabalenka partnership** — Global Ambassador AND Shareholder (deeper than typical athlete endorsement)
- **Floating stat cards:** 90 ingredients, clinical proof, Mayo Clinic/NASA affiliation
- **James Green quote** (former NASA Chief Scientist) — the most-used testimonial across the site
- **Superpower Blood Test upsell** — interesting cross-sell with biomarker testing at steep discount ($49 vs $199)
- **"Wall of Health" reviews section** — branded review gallery
- **Multi-currency support** — ships to 40+ countries
- **Referral discount system** — viral loop mechanism
- **IM8 Inner Circle** — affiliate/referral program

### Funnel Context
**All-traffic hub.** Receives organic search, direct traffic, brand search, PR/media referrals, and serves as the canonical brand experience. Less optimized for single-conversion than the dedicated landing pages — more about brand storytelling and product education.

---

## Page 4: Essentials Landing

**URL:** `https://get.im8health.com/essentials`

### Page Type
Product-focused landing page (PDP-style) on the `get.im8health.com` subdomain. React SPA, rendered client-side. Unlike the GLP-1 and Menopause pages, this is NOT a listicle — it leads with the product module at the top of the page, followed by clinical proof and supporting sections. This is the broadest, least audience-specific funnel page.

### Target Audience
General health-conscious consumers — the broadest audience funnel page. People who:
- Are interested in an all-in-one supplement solution
- May be comparing IM8 to AG1 or other green powders
- Are clicking from paid social ads (Facebook, Instagram, TikTok)
- Respond to clinical proof and product credibility over problem-specific messaging
- Already have some awareness of IM8 or the all-in-one supplement category

### Primary Angle / Hook
**Product-first: "Daily Ultimate Essentials Pro — All-in-One Supplement."** The page leads with the product itself rather than a problem/audience-specific angle. The announcement bar reads "PRO LAUNCH: 30% OFF -- Feel Like Yourself Again." The core pitch is: one formula replaces 16 supplements across 9 major organ systems, backed by a 12-week clinical trial. This is the "show me the product" page for people who already know what they want.

### Key Claims & Proof Points
- **H1:** "DAILY ULTIMATE ESSENTIALS PRO — All-in-One Supplement"
- 90+ ingredients replacing 16 daily supplements in one drink
- 12-week randomized controlled clinical trial (San Francisco Research Institute): 95% more energy, 85% better gut health, 80% better sleep, 75% sharper focus
- NSF Certified for Sport — 280+ banned substances tested
- Aryna Sabalenka (World No. 1 tennis player) trusts it
- 16,255 reviews, 700K+ purchases, 22M+ servings
- 4.8 average rating
- 9 major organ systems supported in one serving (detailed breakdown)
- Clinical comparison table vs. "Leading Greens Powder" — same 11-nutrient comparison as GLP-1 page
- Saves $2,532-$3,000/year vs. buying separate supplements
- Co-founded by David Beckham, with SAB including Dr. Dawn Mussallem (Fountain Life), James L. Green (NASA), Dr. David Katz (Yale-Griffin), Prof. Suzanne Devkota (Cedars-Sinai), Prof. Stephen Anton (U. Florida), Dr. James DiNicolantonio, Prof. Ock Chun (UConn)
- Three flavors: Acai & Mixed Berries, Lemon + Orange, Mango + Passion Fruit
- Vegan, allergen-free, gluten-free, non-GMO, no artificial flavors/sweeteners/sugar, made in USA, third-party tested
- HSA/FSA eligible via Truemed partnership (98% approval rate)
- Ships to 31 countries

### Offer Structure
- **Banner:** "PRO LAUNCH: 30% OFF -- Feel Like Yourself Again"
- **90-Day Supply (Most Popular):** $78/mo ($2.61/serving), billed $235 every 12 weeks, saves $34/mo ($408/yr)
  - Free Welcome Kit (US$28 value)
  - Free Mystery Gift
  - 90-day money-back guarantee
  - Exclusive access to 90-Day IM8 Transformation Program
- **30-Day Supply:** $89/mo ($2.97/serving), saves $23/mo ($276/yr)
  - 30-day money-back guarantee
  - Cancel or pause anytime
  - Free Shipping to US, UK, CA, and most of EU and APAC
  - Free Welcome Kit (US$28)
- **One-Time Purchase:** $112
- **Cost comparison:** $290/mo in traditional supplements vs. $78/mo for IM8

### CTA Strategy
- **Primary CTA:** "START MY 90-DAY TRANSFORMATION PROGRAM -- $78/MO" (in the product module, top of page)
- **Secondary:** "One Time Purchase for $112"
- **Cost savings CTA:** "SHOP NOW" (in the savings breakdown section)
- No hero CTA above the fold — the product module IS the hero. This is a more direct, less educational approach than the GLP-1 or Menopause pages.

### Messaging Tone & Style
- Product-forward and functional. Less emotional storytelling, more feature/benefit presentation.
- Clinical and authoritative. Leads with the product, immediately backs it with clinical trial stats.
- Organ-system approach — presents health benefits organized by body system rather than by symptom or problem.
- Premium but accessible. Language like "Engineered for peak absorption" and "comprehensive formula."

### Notable Sections & Elements
- **Product module as hero** — the page opens directly with the product image carousel, pricing, flavor selection, and buy button. No long editorial lead-in. This is the most e-commerce-native of the three get.im8health.com pages.
- **Image carousel tabs:** Product, Results, Inside, Comparison, Lifestyle, How To, Label — allows visitors to self-serve different types of product information.
- **Clinically Proven Results section** — 12-week trial stats with a link to "Learn more about our clinical trials." Explicitly names the San Francisco Research Institute.
- **How to Enjoy section** — 3 simple steps (scoop, add water, stir). Flavor tasting notes for all three flavors plus variety pack.
- **9 Major Organ Systems section** — the most distinctive content block on this page. Each of 9 body systems (Digestive, Immune, Cardiovascular, Muscular, Skeletal, Endocrine, Urinary, Skin/Hair/Nails, Nervous) gets a dedicated panel listing the specific IM8 ingredients that support it, with doses. This is a powerful "one product, whole body" visualization.
  - Digestive: Prebiotic Fiber 3g, Probiotics 10B CFU, Postbiotics FloraSMART, Ginger Root, Turmeric
  - Immune: Vitamin C 900mg, D3 50mcg, Selenium 70mcg, Zinc, Elderberry
  - Cardiovascular: CoQ10 100mg, K2 100mcg, AstaPure Astaxanthin, Beet Root, Quatrefolic Folate
  - Muscular: MSM 1,500mg, Magnesium 100mg, D3, Chromium 100mcg, Turmeric Extract
  - Skeletal: D3 50mcg, K2 100mcg, Calcium, Magnesium 100mg, Manganese 3mg
  - Endocrine: Iodine 150mcg, Selenium 70mcg, Chromium 100mcg, Rhodiola Root, B-Vitamin Complex
  - Urinary: Cranberry Extract, Vitamin C 900mg, Probiotics, Copper 1mg, Molybdenum 50mcg
  - Skin/Hair/Nails: MSM 1,500mg, Biotin, Vitamin C 900mg, AstaPure Astaxanthin, Copper 1mg
  - Nervous: B-Vitamin Complex, Magnesium 100mg, Quatrefolic Folate, Saffron 30mg, Rhodiola Root, Choline
- **Ambassador/influencer carousel** — identical to GLP-1 page (Bobby Rich, Dr. Robin Barrett, Dr. Amy Shah, Dustin Poirier, Mona Sharma, Tavi Castro, David Beckham, Aryna Sabalenka)
- **Clinical Comparison table** — same "New Gold Standard" head-to-head vs. unnamed AG1 across 11 nutrients
- **9 verified customer reviews** — same set as GLP-1 page (Trustpilot and direct reviews)
- **General FAQ section** — 6 questions covering "What is IM8?", Beckham's involvement, SAB members, main benefits, taste, and shipping countries. Notably more brand-education oriented than the GLP-1 or Menopause FAQs.
- **HSA/FSA eligibility popup** — Truemed partnership, 98% approval rate. This is a meaningful conversion lever for US health-conscious consumers.
- **Ingredient browser** — 11 ingredient categories browsable by tab: Vitamins & Minerals (27), Superfoods/Greens/Herbs (23), Amino Acids & Recovery (14), Digestive Enzymes (6), Adaptogens & Mushrooms (5), Hydra Electrolytes (3), Probiotics & Postbiotics (3), CRT8 Cell Rejuvenation (6), Heart Health (1), Joint & Muscle Support (1), Saffron Extract (1)

### Funnel Context
**Top-of-funnel cold traffic acquisition page — broadest audience.** This is the default paid media landing page for campaigns not targeting a specific health concern. The product-first layout suggests it receives traffic from people who have some awareness or intent (e.g., they clicked an ad that already told them about IM8, or they're comparing supplements). The `get.im8health.com` subdomain with full pixel stack confirms it is a paid media destination. Multiple URL variants (`/essentials`, `/for/gut`, `/ollie`) suggest this template is the base that gets customized for narrower audiences. The page does less educational heavy-lifting than the GLP-1 or Menopause pages — it assumes the visitor is closer to a buying decision and just needs product details, clinical proof, and social proof to convert.

---

## Page 5: Menopause

**URL:** `https://get.im8health.com/pages/menopause`

### Page Type
Audience-specific long-form listicle landing page on the `get.im8health.com` subdomain. React SPA, rendered client-side. Structured as a "7 Reasons" editorial-style sales page — the same format as the GLP-1 page, but with entirely menopause-specific copy, claims, and ingredient framing. Embeds a product module mid-page.

### Target Audience
Women in perimenopause or menopause (typically ages 40-60+) who are:
- Experiencing fatigue, brain fog, bone density loss, hot flashes, night sweats, sleep disruption, joint stiffness
- Currently taking multiple separate supplements to manage menopause symptoms (and frustrated by the complexity/cost)
- Looking for supplement-based support (non-HRT or complementary to HRT)
- Health-conscious and willing to pay for premium, clinically validated solutions
- Likely reached through Facebook/Instagram ads targeting women's health interests

### Primary Angle / Hook
**"Your body is changing. Your nutrition should have changed years ago."** The page frames menopause as a multi-system breakdown that basic multivitamins and piecemeal supplements cannot address. The H1 is: "7 REASONS WOMEN IN MENOPAUSE ARE REPLACING THEIR ENTIRE SUPPLEMENT CABINET WITH ESSENTIALS PRO." The hook is empowerment: "stop managing symptoms one pill at a time and start rebuilding from the inside out." The overarching theme is "RECLAIM YOUR BODY."

### Key Claims & Proof Points
- **H1:** "7 REASONS WOMEN IN MENOPAUSE ARE REPLACING THEIR ENTIRE SUPPLEMENT CABINET WITH ESSENTIALS PRO"
- 70-80% of menopausal women report fatigue as their #1 symptom
- 40% of adults are B12 deficient; Essentials Pro delivers 200mcg methylcobalamin B12 (+733% increase over previous 24mcg formula)
- CRT8 proprietary 100mg mitochondrial repair compound + 1,580mg Amino Complex for cellular energy
- D3 50mcg (vegan lichen) + K2 100mcg (MK-7 form) synergy: directs calcium to bones, not arteries
- Magnesium bisglycinate chelate 100mg — 80%+ bioavailability vs. magnesium oxide at 4%
- 30mg saffron extract for cognition, mood, and sleep in menopausal women
- 55mg choline for neurotransmitter synthesis
- B6 as P5P (bioactive form that crosses blood-brain barrier)
- Low B12 linked to 2-4x increased risk of cognitive impairment
- 1,500mg MSM for joint support + full bioactive B-vitamin complex
- Magnesium supports 300+ enzymatic processes
- 12-week randomized controlled trial: 95% more energy, 85% better digestion, 80% better sleep, 75% sharper focus
- 16,255 5-star reviews, 700K+ purchases, 22M+ servings
- NSF Certified for Sport — 280+ banned substances tested per batch
- Aryna Sabalenka (World No. 1 Tennis) trust signal used prominently
- Dr. Dawn Mussallem (CMO Fountain Life / founder Mayo Clinic Integrative Breast Oncology) doctor testimonial: "Women in menopause are losing nutrients across every system... A piecemeal approach with 6 different bottles is not the answer."
- Dr. Amy Shah (Double Board-Certified MD) endorsement for brain fog/cognition
- Clinical comparison table vs. "Leading Greens Powder" — same 11-nutrient comparison
- Replaces 6-8 separate bottles costing $150-$250/month
- Vegan, non-GMO, third-party tested

### Offer Structure
- **Banner:** "SAVE 30% -- Subscribe & Get a Free Welcome Kit"
- **90-Day Supply (Most Popular):** $78/mo ($2.61/serving), billed $235 every 12 weeks, saves $34/mo ($408/yr)
  - Free Welcome Kit (US$28 value)
  - Free Mystery Gift
  - 90-day money-back guarantee
  - Exclusive access to 90-Day IM8 Transformation Program
- **30-Day Supply:** $89/mo ($2.97/serving), saves $23/mo ($276/yr)
  - 30-day money-back guarantee
  - Cancel or pause anytime
  - Free Shipping to US, UK, CA, and most of EU and APAC
  - Free Welcome Kit (US$28)
- **One-Time Purchase:** $112
- **Cost comparison:** $290/mo in traditional supplements vs. $78/mo for IM8 = $2,532-$3,000 saved annually
- HSA/FSA eligible

### CTA Strategy
- **Hero CTA:** "START REBUILDING. SAVE 30%" (primary button) + "See the 7 Reasons" (scroll anchor)
- **Product module CTA:** "START MY 90-DAY TRANSFORMATION -- $78/MO"
- **Cost savings CTA:** "SHOP NOW"
- **Sticky footer CTA:** "START TODAY. SAVE 30%" with text "Stop managing symptoms. Start rebuilding."
- The CTA language is distinctly empowerment-focused for this audience: "Start Rebuilding," "Reclaim Your Body," "Start Today." Less transformation-language, more reclaiming/rebuilding language — subtle but audience-appropriate.

### Messaging Tone & Style
- Empathetic but authoritative. Acknowledges the frustration and exhaustion of menopause while positioning IM8 as the clinical-grade solution.
- Deeply scientific in specifics — names exact forms of nutrients (methylcobalamin vs. cyanocobalamin, magnesium bisglycinate vs. oxide, P5P form of B6, MK-7 form of K2, vegan lichen D3). This is the most ingredient-science-heavy page of the three.
- Anti-conventional-supplement framing throughout: "A BASIC MULTIVITAMIN WILL NOT FIX IT," "CALCIUM ALONE MAKES IT WORSE," "MOST SUPPLEMENTS USE THE WRONG FORM ANYWAY," "Most menopause supplements ignore joints completely."
- Validation language: "You are not losing your mind. Your brain is starving for the right raw materials." — directly addresses the self-doubt many menopausal women experience around brain fog.
- Uses comparison charts and bioavailability data (e.g., magnesium oxide 4% vs bisglycinate 80%+ absorption) to build technical credibility.

### Notable Sections & Elements
- **7 Reasons structure** — same format as GLP-1 page but with entirely menopause-specific content:
  - **Reason 1 (Fatigue):** Positions fatigue as "multi-system breakdown," not just tiredness. Highlights B12 upgrade from 24mcg to 200mcg (+733%). Introduces CRT8 mitochondrial repair compound and 1,580mg Amino Complex. Calls it "an engine rebuild."
  - **Reason 2 (Bone Density):** Most sophisticated medical argument on the page. Explains D3-K2 calcium-directing synergy, warns that calcium without K2 deposits in arteries. "Bone Protection Triad" visual: D3 + K2 + Magnesium.
  - **Reason 3 (Brain Fog):** "YOUR BRAIN FOG IS NOT JUST STRESS. IT IS A NUTRIENT DEFICIT WITH A CLINICAL SOLUTION." Saffron 30mg + Choline 55mg + B6 as P5P. Cites 2-4x cognitive impairment risk from low B12. Dr. Amy Shah endorsement.
  - **Reason 4 (Sleep/Hot Flashes):** Links magnesium deficiency to vasomotor symptoms. Bioavailability comparison chart: Oxide 4% vs. Bisglycinate 80%+. Saffron extract for menopausal sleep quality. Dr. Dawn Mussallem testimonial.
  - **Reason 5 (B12 Absorption Decline):** Age-related absorption decline chart (95% at 30-50, down to 28% at 75+). 38% of adults 75+ are B12 deficient. Methylcobalamin vs. cyanocobalamin distinction.
  - **Reason 6 (Joint Stiffness):** Links declining estrogen to inflammation. MSM 1,500mg + bioactive B-vitamin complex. Aryna Sabalenka trust signal. Clinical trial stats repeated.
  - **Reason 7 (Replace Supplement Cabinet):** Cost and simplification argument. $150-$250/mo in fragmented products vs. $78/mo for one NSF-certified product. 16,000+ reviews, 22M+ servings.
- **3 menopause-specific customer testimonials** embedded in the listicle (Reasons 2-3 area):
  - Sandra K. (54): "For two years I barely recognized myself... the exhaustion, the brain fog, waking up drenched at 3am... Three weeks into IM8 my husband looked at me and said 'you're back.'"
  - Michelle T.: "I cried the first morning I woke up without night sweats."
  - Patricia L.: "My doctor ran bloodwork after 90 days... My B12 and Vitamin D levels were finally where they should be for the first time in years. She asked me what changed."
- **Product module** — same structure as GLP-1 page with pricing and subscription options
- **Ambassador/influencer carousel** — identical to other pages
- **Clinical Comparison table** — same "New Gold Standard" head-to-head
- **9 general customer reviews** — same Trustpilot/direct review set as other pages
- **Menopause-specific FAQ section** — 7 questions including "What exactly is in Essentials Pro?", "How is IM8 different from AG1 or other greens powders?" (explicitly names AG1 and provides ingredient-by-ingredient comparison), "How quickly will I notice results?", medication safety, guarantee, vegan/allergen info
- **Sticky footer bar** with persistent CTA

### Funnel Context
**Top-of-funnel cold traffic acquisition page for women in menopause.** The most sophisticated and emotionally nuanced of the three get.im8health.com pages. This page does the heaviest educational and emotional work — it has to convince women who have likely been burned by multiple "menopause solutions" that IM8 is different. The 7-reasons format provides space for deep ingredient science (exact forms, doses, bioavailability comparisons) alongside emotional validation (testimonials about crying with relief, partners noticing changes, doctors being impressed by bloodwork). The menopause-specific testimonials are notably more personal and emotional than the general reviews used on the other pages — these read like they were specifically curated (or possibly written) for this audience. The FAQ explicitly names AG1 as a competitor for the first time across these pages. This represents a significant strategic bet on the women's health market with purpose-built content, not just a generic page with menopause keywords inserted.

---

## Page 6: Tavi Castro Editorial

**URL:** `https://im8health.com/pages/tavi-castro-editorial`

### Page Type
Influencer editorial / advertorial. A long-form content piece framed as a personal story from a brand ambassador, sitting on the main domain.

### Target Audience
Followers of Tavi Castro and the broader adventure/extreme sports community. Also targets:
- Fitness enthusiasts who follow influencer recommendations
- People interested in freediving, extreme sports, or adventure athletics
- Health-conscious men who relate to the "meticulous about nutrition" identity

### Primary Angle / Hook
**Extreme performance demands extreme nutrition.** The editorial frames Tavi Castro as "the real-life Aquaman" — a professional freediver who operates under extreme physiological stress (extended breath holds, crushing deep-water pressure) and therefore needs the most comprehensive nutritional support available.

### Key Claims & Proof Points
- Tavi Castro is described as "incredibly meticulous, almost obsessive, about what I put into my body"
- His work requires "perfect physiological and psychological alignment"
- Extended breath holds under extreme, crushing pressure
- Navigating depths where "sunlight barely penetrates"
- **Community proof:** "55,000 Strong. 5 Million+ Served. This Is a Movement, Not a Moment"
- James Green (former NASA Chief Scientist) supporting testimonial

### Offer Structure
- **Unique influencer code:** TAVI10 for an extra 10% off
- **CTA:** "Dive Into IM8 & Get My Free Welcome Kit!"
- Stacks on top of the standard 30% off + Free Welcome Gifts offer
- Effectively ~40% total discount when both offers combine

### CTA Strategy
Single, clear CTA: **"Dive Into IM8 & Get My Free Welcome Kit!"** — links to a discounted purchase path with code TAVI10 pre-applied. The CTA language cleverly uses "dive" as a pun on Castro's freediving profession.

### Messaging Tone & Style
- First-person editorial voice — reads as a personal endorsement, not a brand ad
- Adventure and exploration language: "diving deep," "anchor," "depths"
- Aspirational but accessible — positions IM8 as essential to extraordinary performance
- Community-building language: "movement, not a moment"

### Notable Sections & Elements
- **Long-form editorial narrative** — personal story format rather than traditional product page
- **Image slider** with customer/athlete testimonials
- **Influencer-specific discount code** (TAVI10) — standard influencer marketing mechanic
- **Community stats** — "55,000 Strong. 5 Million+ Served" (large numbers for social proof)
- **NASA quote cross-sell** — James Green testimonial reinforces scientific credibility even on an influencer page
- **"Movement, Not a Moment"** positioning — suggests community/lifestyle identity, not just a product

### Funnel Context
**Top-to-mid funnel influencer traffic page.** This page is designed to:
- Receive traffic from Tavi Castro's social media posts (Instagram, TikTok, YouTube)
- Convert his audience with a trusted personal recommendation + exclusive discount
- Sits between pure top-of-funnel content (social post) and bottom-of-funnel conversion (product page)
- The editorial format adds depth beyond a simple "use my code" link — builds narrative and emotional connection before asking for the sale

---

## Cross-Page Comparison & Strategic Patterns

### 1. Domain Architecture Strategy

IM8 runs a **dual-domain funnel architecture**:

| Domain | Purpose | Tech Stack | Content Type |
|---|---|---|---|
| `im8health.com` | Brand hub + SEO + organic | Shopify (server-rendered) | Full brand experience, product pages, editorial content |
| `get.im8health.com` | Paid media acquisition funnels | React SPA (client-rendered) | Stripped-down, conversion-focused landing pages |

**Strategic implications:**
- The `get.` subdomain is purpose-built for paid media — it allows rapid A/B testing, cleaner attribution, and conversion optimization without touching the main Shopify store.
- React SPA architecture means they can iterate on page structure, copy, and offers quickly without Shopify theme constraints.
- Multiple URL variants on `get.im8health.com` (e.g., `/essentials`, `/for/gut`, `/pages/glp1`, `/pages/menopause`, `/ollie`) confirm they're running extensive audience segmentation and angle testing.
- The SPA approach blocks traditional scrapers and crawlers from seeing content — this is common in DTC paid media funnels where competitors frequently scrape landing pages.

### 2. Audience Segmentation Strategy

IM8 is running a **one-product, many-audiences** strategy. The core product (Essentials Pro) is the same across all pages, but the landing experience is customized per audience:

| Page | Audience Segment | Entry Angle |
|---|---|---|
| Homepage | Broad health-conscious consumers | "The New Gold Standard" — better than green powders |
| CrossFit/Recovery | Competitive athletes | Recovery acceleration, NSF Certified for Sport |
| GLP-1 | GLP-1 medication users | 7 reasons: prevent muscle loss, hair thinning, nutrient depletion |
| Menopause | Women 40-60+ in menopause | 7 reasons: replace supplement cabinet, rebuild from inside out |
| Essentials | General acquisition (broadest) | Product-first PDP: 9 organ systems, clinical proof, all-in-one |
| Tavi Castro | Adventure/fitness influencer audience | Extreme performance demands extreme nutrition |

This is a mature segmentation approach. Rather than creating separate products for each audience (which would fragment their supply chain and SKU management), they create tailored messaging funnels that lead to the same conversion event.

### 3. Recurring Messaging Themes

**Themes that appear across all or most pages:**

1. **"Co-Founded by David Beckham and experts from Mayo Clinic and NASA"** — This is the universal headline and title tag. It appears on every single page as the primary authority anchor.

2. **Scientific Advisory Board** — The 11-member SAB (featuring former NASA Chief Scientist, Mayo Clinic oncologist, Cedars-Sinai microbiome director, Yale researcher) is the #1 differentiator they lean on. It appears in some form on every page.

3. **James Green (NASA) quote** — "After decades at NASA studying the effects of space on the human body, I saw an opportunity with IM8 to apply that knowledge here on Earth." This single quote appears across at least 4 of the 6 pages. It's their most-used proof point.

4. **90+ nutrient-rich ingredients / replaces 16 supplements** — The product's core value proposition. Consistent across all pages. The get.im8health.com pages use "90+" rather than "92." Client confirmed the correct number is 90 (April 2026).

5. **NSF Certified for Sport** — Critical for athlete-facing pages, but also used broadly as a quality signal.

6. **Clinically proven, third-party tested** — Clinical trials and Eurofins testing are referenced repeatedly.

7. **"Save 30% + Free Welcome Gifts + Free Shipping"** — The standard promotional offer framework across all pages.

8. **Aryna Sabalenka partnership** — The tennis champion's endorsement (as both Ambassador and Shareholder) appears on multiple pages.

### 4. Offer Structure Comparison

| Element | Homepage | CrossFit | Tavi Castro | GLP-1 / Essentials / Menopause |
|---|---|---|---|---|
| Base discount | 30% off | 35% off (New Year) | 30% + TAVI10 (extra 10%) | 30% off (90-day plan) / 20% off (30-day plan) |
| Free Welcome Kit | Yes ($60 value) | Yes | Yes ("My Free Welcome Kit") | Yes (US$28 value) + Free Mystery Gift on 90-day |
| Free shipping | On subscriptions | On subscriptions | On subscriptions | US, UK, CA, most EU and APAC |
| Guarantee | 30-day money-back | Not explicitly stated | Not explicitly stated | 90-day on 90-day plan, 30-day on 30-day plan |
| Blood test upsell | Yes ($49 vs $199) | No | No | No |
| Influencer code | DRJAMES (from referral) | None visible | TAVI10 | None |
| HSA/FSA eligible | Unknown | Unknown | Unknown | Yes (Truemed, 98% approval) |
| 90-Day Transformation Program | Unknown | Unknown | Unknown | Exclusive access on 90-day plan |
| Pricing | $89/mo sub, $112 one-time | Same | Same + TAVI10 | $78/mo (90-day), $89/mo (30-day), $112 one-time |

**Observations:**
- The base offer is remarkably consistent: ~30% off + Free Welcome Kit + Free Shipping.
- The get.im8health.com pages have a more sophisticated tiered pricing model than was previously known: the 90-day plan ($78/mo) is the "Most Popular" anchor, saving $34/mo over the 30-day plan. This nudges toward quarterly commitment.
- The 90-day plan includes additional bonuses (Mystery Gift, Transformation Program access, 90-day guarantee) that the 30-day plan does not — clear incentive stacking.
- HSA/FSA eligibility via Truemed is a meaningful conversion lever that only appears on the get.im8health.com pages.
- Specific pages layer on additional discounts (35% for seasonal, extra 10% for influencer codes).
- The blood test cross-sell ($49 vs $199 "Superpower 100+ Biomarkers") is an interesting high-value upsell that only appears on the main site — suggests it's a retention/engagement play, not an acquisition tool.
- Influencer codes (TAVI10, DRJAMES) enable attribution tracking and give audiences a sense of exclusive access.

### 5. CTA Strategy Patterns

**CTAs are segmented by page purpose and audience:**
- **GLP-1 page:** Hero: "GET STARTED -- SAVE 30%" / Product: "START MY 90-DAY TRANSFORMATION -- $78/MO" / Sticky footer: "GET STARTED -- SAVE 30%" with "Protect your results on GLP-1"
- **Essentials page:** Product: "START MY 90-DAY TRANSFORMATION PROGRAM -- $78/MO" (no hero CTA above fold — product IS the hero)
- **Menopause page:** Hero: "START REBUILDING. SAVE 30%" / Product: "START MY 90-DAY TRANSFORMATION -- $78/MO" / Sticky footer: "START TODAY. SAVE 30%" with "Stop managing symptoms. Start rebuilding."
- **Brand pages** (homepage): Multiple pathways — "Get Started," "Shop Now," product navigation
- **Athlete pages** (CrossFit): Transformation-focused CTAs — "START MY TRANSFORMATION"
- **Editorial pages** (Tavi Castro): Story-specific CTAs — "Dive Into IM8" (thematic pun)

The CTA language is audience-tailored: GLP-1 uses "protect your results" (loss aversion), Menopause uses "start rebuilding" and "reclaim your body" (empowerment), Essentials uses straightforward "transformation program" (generic motivation), and athlete/editorial pages use their own thematic language. All three get.im8health.com pages converge on the same product CTA: "START MY 90-DAY TRANSFORMATION" at the pricing module — the differentiation happens in the hero and sticky footer CTAs.

### 6. Trust & Credibility Architecture

IM8's credibility stack is layered and repeats across pages:

1. **Celebrity founder** — David Beckham (co-founding partner, not just endorser)
2. **Institutional authority** — NASA, Mayo Clinic, Cedars-Sinai, Yale
3. **Named experts** — 11 SAB members with full bios and institutional titles
4. **Athlete validation** — Aryna Sabalenka (shareholder), Tavi Castro, CrossFit community
5. **Certifications** — NSF Certified for Sport, Eurofins third-party testing
6. **Clinical proof** — Registered clinical trials, published results (95% higher energy, 85% improved digestion)
7. **Social proof** — 16,255 reviews (4.8 avg), 700K+ purchases, 22M+ servings, live order counts
8. **Manufacturing standards** — FDA-registered, GMP-certified, made in New Jersey by Vitaquest

This is one of the most comprehensive credibility stacks in the DTC supplement space. Every layer is designed to address a different objection (Is it safe? Is it effective? Is it legitimate? Do real experts back it? Do real people use it?).

### 7. Competitive Positioning

IM8 is explicitly positioning against AG1 (Athletic Greens) across all funnel pages:
- **"The New Gold Standard"** — section heading on all three get.im8health.com pages, directly implies AG1 is the old standard
- **"AG1 Pioneered It. IM8 Perfected It."** — found on a separate test landing page, showing active competitive comparison content
- **Clinical comparison table** on all get.im8health.com pages comparing 11 nutrients vs. "Leading Greens Powder": K2 (+11%), CoQ10 (+67%), Vitamin C (+80%), Prebiotic Fiber (+50%), Riboflavin (+110%), Magnesium (+233%), Selenium (+218%), Chromium (+300%), Copper (+400%), Manganese (+650%), Molybdenum (+11%)
- **Menopause FAQ explicitly names AG1:** "200mcg B12 vs AG1's 400mcg, 100mcg K2 vs AG1's 90mcg, 50mcg D3 (AG1 has none), 1,500mg MSM (AG1 has none), and proprietary CRT8 cell renewal complex that no competitor carries"
- **90+ ingredients vs AG1's ~75** — ingredient count as a concrete differentiator
- **NSF Certified for Sport** — AG1 does not have this certification; IM8 calls it "the hardest certification in supplements to earn"
- **Clinical trials** — AG1 has been criticized for lacking clinical proof; IM8 names the San Francisco Research Institute and cites specific trial stats
- **David Beckham vs AG1's podcast sponsorship model** — celebrity co-founder vs paid media endorsements

### 8. Funnel Architecture Summary

```
COLD TRAFFIC (Paid Social / Search)
    |
    v
get.im8health.com (React SPA funnels)
    |--- /essentials (broad audience)
    |--- /pages/glp1 (GLP-1 users)
    |--- /pages/menopause (women 40-60)
    |--- /for/gut (gut health angle)
    |--- /ollie (unknown segment)
    |
    v
CONVERSION: Essentials Pro Subscription

WARM TRAFFIC (Influencer / Referral / PR)
    |
    v
im8health.com (Shopify)
    |--- /pages/tavi-castro-editorial (influencer audience)
    |--- /pages/accelerate-recovery-in-90-days (CrossFit athletes)
    |--- /pages/test-landing (AG1 comparison)
    |--- /pages/welcome (post-purchase or brand education)
    |
    v
CONVERSION: Essentials Pro / Beckham Stack / Longevity

ORGANIC / BRAND TRAFFIC
    |
    v
im8health.com (Homepage)
    |--- Full product catalog
    |--- Science, ingredients, quality pages
    |--- FAQ, blog, reviews
    |
    v
CONVERSION: Multiple products + upsells (blood test, Beckham Stack)
```

### 9. Key Takeaways for Creative Strategy

1. **The SAB is their moat.** The Scientific Advisory Board (NASA, Mayo Clinic, Cedars-Sinai, Yale) is the single most differentiated asset IM8 has versus competitors. Every landing page leans on it. Creative strategy should consider how to make this even more prominent and visceral in ad creative.

2. **They're testing audience-specific angles aggressively.** The `get.im8health.com` subdomain with multiple paths (/essentials, /glp1, /menopause, /for/gut) shows a systematic approach to finding which health concerns convert best from cold traffic. Each represents a hypothesis about what motivates purchase.

3. **GLP-1 is a fully developed angle, not just a test.** The GLP-1 page is a sophisticated 7-reason listicle with GLP-1-specific claims (40% of weight loss being muscle, Cambridge University 2026 study, 11 critical deficiencies), a dedicated FAQ addressing medication interactions, and a doctor testimonial from Dr. Dawn Mussallem specifically recommending comprehensive supplementation for GLP-1 patients. This is well past the "hypothesis testing" stage — it is a production-grade funnel page.

4. **The Beckham partnership is used as an authority signal, not just star power.** He's "co-founding partner," not "brand ambassador." This is a meaningful distinction in the copy — it implies alignment and ownership, not just a paid endorsement.

5. **Influencer strategy uses editorial content, not just codes.** The Tavi Castro page is a full editorial — a first-person narrative with story arc, not just "use my code." This creates deeper engagement and higher perceived authenticity than standard influencer landing pages.

6. **Offer consistency is high.** The ~30% off + Free Welcome Kit + Free Shipping framework is universal. This simplifies testing (the offer isn't the variable — the audience and angle are).

7. **They're actively competing against AG1.** The "AG1 Pioneered It. IM8 Perfected It." test page and "New Gold Standard" positioning make the competitive target explicit. Creative should consider head-to-head comparison content.

8. **The product lineup is deliberately simple.** Two core products (Essentials Pro, Longevity) plus one bundle (Beckham Stack). This allows them to focus all funnel energy on one primary conversion event (Essentials Pro subscription) rather than creating decision paralysis.

9. **Clinical trial results are deployed everywhere.** The 12-week randomized trial results (95% more energy, 85% better gut health, 80% better sleep, 75% sharper focus) appear on all three get.im8health.com pages. The San Francisco Research Institute is now named as the trial partner. These stats are used as section headers, proof blocks, and repeated within individual reasons — they are the backbone of the conversion argument.

10. **The menopause angle is a fully built-out, high-investment play.** The menopause page is the most scientifically detailed of all six landing pages. It names exact nutrient forms (methylcobalamin vs. cyanocobalamin, magnesium bisglycinate vs. oxide, P5P B6, MK-7 K2, vegan lichen D3), includes bioavailability comparison charts, age-related absorption decline data, and three emotionally powerful menopause-specific testimonials that read as purpose-curated for this audience. This is not a test page — it is a fully committed content investment in the women's health market.

11. **The "7 Reasons" listicle format is the template for audience-specific funnels.** Both the GLP-1 and Menopause pages use the same structural template: category badge, H1 with "7 REASONS [AUDIENCE] ARE [ACTION]", hero CTA + scroll anchor, clinical proof block, SAB section, trust ticker, 7 numbered reason sections with ingredient science, embedded product module, ambassador carousel, competitor comparison table, reviews, cost savings breakdown, and FAQ. The template is consistent but the copy, claims, ingredient emphasis, testimonials, and FAQ questions are entirely different per audience. This is a scalable funnel architecture.

12. **The Essentials page serves a fundamentally different role than GLP-1 and Menopause.** While GLP-1 and Menopause use the listicle format to educate and persuade, the Essentials page leads product-first with a PDP-style layout. Its unique content block is the "9 Major Organ Systems" section — a body-systems visualization showing how one serving supports Digestive, Immune, Cardiovascular, Muscular, Skeletal, Endocrine, Urinary, Skin/Hair/Nails, and Nervous systems. This page assumes higher intent or prior awareness and focuses on product details rather than problem education.

13. **HSA/FSA eligibility is a conversion lever unique to the get.im8health.com pages.** The Truemed partnership (98% approval rate) allows customers to pay with pre-tax health spending accounts. This effectively reduces the perceived cost by ~30% for eligible customers and adds institutional legitimacy (if your HSA covers it, it must be a real health product).

14. **The competitor comparison is now explicit.** All three get.im8health.com pages include a "THE NEW GOLD STANDARD" clinical comparison table showing IM8 vs. "Leading Greens Powder" across 11 nutrients. The Menopause FAQ goes even further, explicitly naming AG1 and providing ingredient-by-ingredient comparisons (e.g., "200mcg B12 vs AG1's 400mcg," "50mcg D3 — AG1 has none," "1,500mg MSM — AG1 has none"). The competitive positioning is no longer just implicit.
