# Creative Consumption Source Log - Chronic Joint & Swelling

**Brand:** Comfort Ortho Wear
**Persona:** The Chronic Joint & Swelling Condition Buyer
**Run date:** 2026-06-06
**Profile:** [[Creative Consumption Pilot - Chronic Joint & Swelling]]
**Run version:** v3 clean rerun from scratch

## Method

- Built a candidate pool first, then selected sources. This run did not start with six hand-picked TikToks or a small ad-hoc slice.
- YouTube was searched across 12 persona-derived terms. `yt-dlp` returned 153 unique candidates.
- The selected set was chosen by visible engagement, persona fit, and lane coverage. Higher engagement mattered, but lower-view sources were kept when they covered high-fit lanes that viral doctor/listicle content did not cover: caregiver purchase, lived-condition review, adaptive opening demos, lymphedema/lipedema, and edema shoe depth.
- All 26 selected YouTube videos were downloaded and analyzed with Gemini.
- Regular TikTok was searched separately from TikTok Shop. TikTok Shop pages were not counted as creator-feed sources.
- Supplemental Reddit, Pinterest, and TikTok Shop searches were used only for problem language, commerce clutter, and category context.

## Search Terms

YouTube:

- `arthritis shoes swollen feet`
- `diabetic swollen feet shoes`
- `shoes for swollen feet elderly`
- `wide toe box shoes swollen feet`
- `orthopedic shoes arthritis review`
- `edema shoes swollen feet review`
- `easy shoes swollen feet no bending`
- `arthritis foot pain shoes review`
- `diabetic shoes for mom swollen feet`
- `shoes tight at night swollen feet`
- `foot swelling shoes evening`
- `lymphedema shoes swollen feet`

Regular TikTok:

- `swollen feet shoes`
- `shoes for swollen feet`
- `diabetic swollen feet shoes`
- `diabetic shoes swollen feet`
- `arthritis shoes swollen feet`
- `feet swelling shoes`
- `shoes tight evening swelling`
- `tight shoes swollen feet`
- `swollen feet at night shoes`
- `neuropathy swollen feet shoes`
- `lymphedema shoes swollen feet`
- `shoes for mom swollen feet`
- `wide shoes swollen feet`
- `wide toe box swollen feet`
- `cant fit shoes swollen feet`

Supplemental web/social:

- `Reddit shoes for swollen feet elderly edema recommendations`
- `Reddit diabetic swollen feet shoes recommendations`
- `Pinterest shoes for swollen feet elderly edema`
- `Pinterest lymphedema shoes swollen feet`
- `site:tiktok.com/@ "swollen feet shoes" TikTok`
- `site:tiktok.com/@ "diabetic shoes" "swollen feet" TikTok`
- `site:tiktok.com/@ "shoes for swollen feet" TikTok`
- `site:tiktok.com/@ "lymphedema" "shoes" TikTok`

## Candidate Pool Summary

- **YouTube:** 153 unique candidates. 26 selected. 26 downloaded. 26 Gemini-analyzed. 0 media failures.
- **Regular TikTok:** 15 terms tested through `https://www.tiktok.com/search?q=[term]`. Each term had an initial load, reload retry, and fresh-session retry when no result cards appeared. All returned TikTok's "Something went wrong / Sorry, something wrong with the server" state and 0 accessible creator-feed result cards.
- **TikTok profile/browser fallback:** A local Chrome-profile attempt was tried after the clean route failed, but the browser session hung and was terminated. It did not produce usable TikTok result cards.
- **TikTok Shop:** Search results surfaced TikTok Shop product and keyword pages, but those were treated as commerce/category evidence only.
- **Reddit/Pinterest:** Supplemental public search surfaced caregiver/problem-language and visual-shopping surfaces. These were not used as video grammar evidence.

Important interpretation:

- TikTok failure means Codex could not access regular TikTok result cards in this rerun. It does not mean the search terms have no TikTok results.
- The profile is strongest on YouTube/adaptive-footwear/video-pattern evidence and weaker on TikTok/Instagram creator-feed grammar.
- Prior v2 TikTok links were intentionally not counted as v3 selected sources because the user asked for a from-scratch rerun.

## Selected YouTube Sources

1. **Edema: Swollen Feet, Swollen Ankles & Swollen Legs**
   - URL: <https://www.youtube.com/watch?v=hLrlqcMipYg>
   - Creator: Michigan Foot Doctors
   - Visible engagement: 3,307,739 views
   - Search lanes: `shoes for swollen feet elderly`, `edema shoes swollen feet review`, `shoes tight at night swollen feet`, `foot swelling shoes evening`
   - Included because: swelling health context; highest-fit edema explainer by view count
   - Gemini pattern: Doctor-led swelling education uses medical visuals, practical demonstrations, and cautionary guidance. Useful for problem framing, not for claims Comfort should inherit.

2. **Top Winter Boots for Edema, Neuropathy, Diabetes, and Wide Bunion Feet**
   - URL: <https://www.youtube.com/watch?v=JserRScMOCI>
   - Creator: FitVille
   - Visible engagement: 2,897,040 views
   - Search lane: `shoes for swollen feet elderly`
   - Included because: adaptive diabetic/edema footwear demo; high-engagement FitVille product lane
   - Gemini pattern: Direct problem-solution product demo around adjustable straps, wide toe box, non-slip sole, warmth, and cost sensitivity.

3. **What are diabetic shoes and why do people with diabetes need them?**
   - URL: <https://www.youtube.com/watch?v=xZytqWf3W5A>
   - Creator: Neuhaus Foot & Ankle
   - Visible engagement: 1,852,440 views
   - Search lane: `diabetic swollen feet shoes`
   - Included because: diabetic shoe authority; highest-view diabetic footwear explainer
   - Gemini pattern: Podiatrist explains depth, soft inserts, pressure points, easy closure, and the stigma of ugly medical shoes.

4. **Orthofeet Hands-Free Sneakers**
   - URL: <https://www.youtube.com/watch?v=zhLOuBSmWR4>
   - Creator: Orthofeet
   - Visible engagement: 411,097 views
   - Search lane: `orthopedic shoes arthritis review`
   - Included because: hands-free/no-bending proof; high-view short brand demo
   - Gemini pattern: Hands-free entry, stretchy material, removable insole, seamless interior, and non-slip sole turn mobility limitations into visible proof.

5. **Silverts Extra Wide Slip Resistant Shoes**
   - URL: <https://www.youtube.com/watch?v=RJlqdlUkQMM>
   - Creator: Silverts Adaptive Clothing and Footwear
   - Visible engagement: 370,743 views
   - Search lane: `arthritis shoes swollen feet`
   - Included because: caregiver/senior safety; adaptive shoe demo with fall-risk context
   - Gemini pattern: Caregiver narrative solves swollen feet, unsafe slippers, discomfort, and fall-risk anxiety.

6. **Hands-Free Slip-On Shoes - Best Shoes for Swollen Feet & Foot Pain**
   - URL: <https://www.youtube.com/watch?v=C2ljQS8U6Bg>
   - Creator: Orthofeet
   - Visible engagement: 96,785 views
   - Search lanes: `arthritis shoes swollen feet`, `edema shoes swollen feet review`
   - Included because: swollen feet and foot pain proof; short hands-free mechanism
   - Gemini pattern: Fast regular-shoe-fails to stretch/hands-free replacement proof.

7. **Best Women's Sneakers for Arthritis Pain**
   - URL: <https://www.youtube.com/watch?v=3lGNjWaB0EQ>
   - Creator: Orthofeet
   - Visible engagement: 81,301 views
   - Search lanes: `orthopedic shoes arthritis review`, `arthritis foot pain shoes review`
   - Included because: arthritis shoe proof; short arthritis brand demo
   - Gemini pattern: Testimonial framing connects arthritis pain, avoided activity, sensitive feet, cushioning, and stretch uppers.

8. **The BEST SHOES For Wide Feet**
   - URL: <https://www.youtube.com/watch?v=Jf3X0REdWns>
   - Creator: Dr. Yonatan Whitten
   - Visible engagement: 77,458 views
   - Search lane: `wide toe box shoes swollen feet`
   - Included because: wide-foot lived review; toe-box comparison lane
   - Gemini pattern: Doctor/reviewer uses personal wide-foot frustration, insole comparison, and fit demos to validate toe room and flexibility.

9. **Best Shoes for Foot Neuropathy**
   - URL: <https://www.youtube.com/watch?v=p3u1UhTodGc>
   - Creator: Orthofeet
   - Visible engagement: 51,493 views
   - Search lanes: `arthritis shoes swollen feet`, `diabetic swollen feet shoes`, `shoes for swollen feet elderly`, `orthopedic shoes arthritis review`, `arthritis foot pain shoes review`
   - Included because: neuropathy/sensitive-foot authority; diabetic foot protection lane
   - Gemini pattern: Expert explains soft interior, seamless design, extended widths, orthotic insole, and sensitive-foot protection.

10. **The Best Shoes for Knee Pain**
   - URL: <https://www.youtube.com/watch?v=DeacQiArr2I>
   - Creator: Arthritis Knee Pain Centers
   - Visible engagement: 46,894 views
   - Search lanes: `arthritis shoes swollen feet`, `orthopedic shoes arthritis review`, `arthritis foot pain shoes review`
   - Included because: joint-pain authority; footwear connected to knee/joint pain
   - Gemini pattern: Expert shoe criteria center on stability, cushioning, arch support, toe box, flexibility, and mobility.

11. **Shoes For Swollen Feet - They're Available**
   - URL: <https://www.youtube.com/watch?v=P62uLVKZEZE>
   - Creator: DT Footwear
   - Visible engagement: 25,198 views
   - Search lanes: `arthritis shoes swollen feet`, `diabetic swollen feet shoes`, `shoes for swollen feet elderly`, `edema shoes swollen feet review`, `lymphedema shoes swollen feet`
   - Included because: major swelling adaptive footwear; seller demo focused on fit impossibility
   - Gemini pattern: Owner-expert demonstrates fit solutions for severe swelling and emphasizes personal fit help.

12. **Best Shoes for Arthritis**
   - URL: <https://www.youtube.com/watch?v=waYMKYoccsc>
   - Creator: Orthofeet
   - Visible engagement: 20,202 views
   - Search lanes: `orthopedic shoes arthritis review`, `arthritis foot pain shoes review`
   - Included because: arthritis shoe authority; podiatrist-approved claim-risk comparison
   - Gemini pattern: Podiatrist-style brand content explains shoe features as arthritis comfort support. Compliance risk is the direct pain-relief framing.

13. **Shoes for AFO, Lymphedema, Edema, Diabetes - Bilby Shoes**
   - URL: <https://www.youtube.com/watch?v=a5hHESROaoM>
   - Creator: Enovis ANZ
   - Visible engagement: 9,918 views
   - Search lanes: `arthritis shoes swollen feet`, `diabetic swollen feet shoes`, `shoes for swollen feet elderly`, `wide toe box shoes swollen feet`, `edema shoes swollen feet review`, `lymphedema shoes swollen feet`
   - Included because: AFO/lymphedema/edema shoe mechanism; wide-opening professional demo
   - Gemini pattern: Professional demo shows deep-set, adjustable shoes with wide openings for complex fit conditions.

14. **Adaptive Clothing - Foot Swelling or Edema Issues?**
   - URL: <https://www.youtube.com/watch?v=W1_4upXbJyE>
   - Creator: Buck and Buck
   - Visible engagement: 9,686 views
   - Search lanes: `edema shoes swollen feet review`, `lymphedema shoes swollen feet`
   - Included because: adaptive clothing/edema shoe demo; open-front and heel-zipper mechanism
   - Gemini pattern: Wide opening, heel zipper, deep footbed, soft interior, and easy care translate swelling into design requirements.

15. **Shoes For Edema - Swollen Feet**
   - URL: <https://www.youtube.com/watch?v=ct9qFOPRCYI>
   - Creator: DT Footwear
   - Visible engagement: 6,509 views
   - Search lane: `lymphedema shoes swollen feet`
   - Included because: edema shoe depth explanation; instep/evening swelling mechanism
   - Gemini pattern: Stretch, inserts, and adjustable design are framed as tools for daily size changes and instep swelling.

16. **My Lymphedema Journey: Shoes that Fit**
   - URL: <https://www.youtube.com/watch?v=B4U01thp2P8>
   - Creator: Global Business Plaza
   - Visible engagement: 4,609 views
   - Search lanes: `wide toe box shoes swollen feet`, `lymphedema shoes swollen feet`
   - Included because: lymphedema lived-condition shoe journey; style plus function tension
   - Gemini pattern: Functional and fashionable positioning matters because swollen-foot buyers still want shoes that do not feel embarrassing.

17. **Wide Shoes for Lipedema - Unbiased Review of 3 Shoes for Swollen Feet**
   - URL: <https://www.youtube.com/watch?v=q6mRxdkYSgs>
   - Creator: Sturdy Woman
   - Visible engagement: 4,562 views
   - Search lane: `lymphedema shoes swollen feet`
   - Included because: lipedema/swollen-feet shoe review; unbiased multi-shoe comparison
   - Gemini pattern: Peer reviewer emphasizes stability, durability, comfort, painful feet, body weight, and lack of appealing wide-size options.

18. **Finding the Right Footwear for Edema**
   - URL: <https://www.youtube.com/watch?v=sXkL_61yAHM>
   - Creator: DT Footwear
   - Visible engagement: 3,049 views
   - Search lanes: `wide toe box shoes swollen feet`, `edema shoes swollen feet review`, `lymphedema shoes swollen feet`
   - Included because: edema footwear education; width/depth/instep adjustment detail
   - Gemini pattern: Expert-led discussion explains width, depth, circumference, material forgiveness, and adjustable closure.

19. **The BEST Shoes For Rheumatoid Arthritis**
   - URL: <https://www.youtube.com/watch?v=pjoPQ582RLg>
   - Creator: Living with Rheumatoid Arthritis
   - Visible engagement: 2,571 views
   - Search lanes: `arthritis shoes swollen feet`, `orthopedic shoes arthritis review`, `arthritis foot pain shoes review`
   - Included because: rheumatoid arthritis lived review; normal-shoes-failed language
   - Gemini pattern: Lived RA source talks about serious heel pain, normal shoes failing, swelling, pressure, cushion, wide sizing, and slip-on ease.

20. **Easy On and Adjustable Comfort With Swollen Feet**
   - URL: <https://www.youtube.com/watch?v=zf1HmL3cL2Q>
   - Creator: Graying With Grace
   - Visible engagement: 1,297 views
   - Search lane: `shoes for swollen feet elderly`
   - Included because: senior swollen-feet review; easy-on/off and mall-use test
   - Gemini pattern: Senior-care expert reviews dual closure, pull loop, soft heel, lightweight build, shuffling concerns, and honest drawbacks.

21. **FitVille Men's EasyTop Wings V2**
   - URL: <https://www.youtube.com/watch?v=35yjrBo1Jjk>
   - Creator: FitVille
   - Visible engagement: 115,749 views
   - Search lane: `wide toe box shoes swollen feet`
   - Included because: short FitVille demo; adjustable strap/exploded-view product proof
   - Gemini pattern: Exploded-view animation turns shoe technology into quick visual proof of width, support, cushioning, and slip-free ease.

22. **Comfortable Shoes for Swollen Feet**
   - URL: <https://www.youtube.com/watch?v=792BMr77Z8k>
   - Creator: DB Wider Fit Shoes
   - Visible engagement: 36,891 views
   - Search lane: `foot swelling shoes evening`
   - Included because: comfortable shoes for swollen feet; wider-fit specialist product proof
   - Gemini pattern: Chronic swelling is tied to quality of life, with wider/deeper shapes, removable insoles, soft cushioning, easy access, and adjustable straps.

23. **Best Shoes for Ankle Arthritis**
   - URL: <https://www.youtube.com/watch?v=qya2ftNNDYI>
   - Creator: Flawless Physio | Shoe Reviews
   - Visible engagement: 26,881 views
   - Search lanes: `arthritis shoes swollen feet`, `arthritis foot pain shoes review`
   - Included because: ankle arthritis shoe advice; arthritis support mechanism
   - Gemini pattern: Physiotherapist reviews stability, cushioning, guide rails, arch support, heel cup, and irritation control.

24. **Lymphedema Treatment**
   - URL: <https://www.youtube.com/watch?v=w4T4nZptZaQ>
   - Creator: Michigan Foot Doctors
   - Visible engagement: 755,243 views
   - Search lanes: `shoes for swollen feet elderly`, `edema shoes swollen feet review`, `lymphedema shoes swollen feet`
   - Included because: lymphedema/swelling health context; high-view lymphedema pain context
   - Gemini pattern: Doctor explains chronic swelling, skin problems, compression/self-care, movement limits, and medical oversight.

25. **Foot and Ankle Swelling: What Causes It?**
   - URL: <https://www.youtube.com/watch?v=frjWnpLgaLs>
   - Creator: Talking With Docs
   - Visible engagement: 2,117,129 views
   - Search lanes: `shoes for swollen feet elderly`, `diabetic shoes for mom swollen feet`, `foot swelling shoes evening`
   - Included because: foot and ankle swelling causes; high-view general condition context
   - Gemini pattern: Doctors explain common and serious swelling causes. Useful for understanding anxiety and compliance risk.

26. **9 Tricks To Stop Swollen Feet & Legs Immediately**
   - URL: <https://www.youtube.com/watch?v=OpQYLeXETeU>
   - Creator: Michigan Foot Doctors
   - Visible engagement: 647,277 views
   - Search lanes: `shoes for swollen feet elderly`, `easy shoes swollen feet no bending`, `diabetic shoes for mom swollen feet`, `shoes tight at night swollen feet`, `foot swelling shoes evening`
   - Included because: swelling management context; high-ranking query result across terms
   - Gemini pattern: Podiatrist-style urgency, diagrams, and product-adjacent self-care advice show the medical-claim line Comfort should avoid crossing.

## Regular TikTok Retry Log

All terms used `https://www.tiktok.com/search?q=[encoded term]`.

- `swollen feet shoes` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `shoes for swollen feet` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `diabetic swollen feet shoes` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `diabetic shoes swollen feet` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `arthritis shoes swollen feet` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `feet swelling shoes` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `shoes tight evening swelling` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `tight shoes swollen feet` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `swollen feet at night shoes` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `neuropathy swollen feet shoes` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `lymphedema shoes swollen feet` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `shoes for mom swollen feet` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `wide shoes swollen feet` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `wide toe box swollen feet` - initial load, reload, and fresh session all returned server-error state; 0 links.
- `cant fit shoes swollen feet` - initial load, reload, and fresh session all returned server-error state; 0 links.

Interpretation:

- This is a platform/tool access failure, not a content finding.
- TikTok should be rerun through a stable logged-in browser/API route before this profile is promoted as a complete creator-feed map.
- TikTok Shop pages surfaced in web search, but they are ecommerce/category signals only.

## Supplemental Web / Social Surfaces

Reddit:

- [r/Shoes - shoes for swollen feet](https://www.reddit.com/r/Shoes/comments/1r2t8um/shoes_for_swollen_feet/)
  - Role: caregiver problem-language evidence
  - Signal: mom with edema; upper-foot swelling stops sneakers/slip-ons from fitting; desire for flexible or adjustable top without ugly medical-shoe stigma

- [r/ChronicIllness - Shoes for Swollen Feet](https://www.reddit.com/r/ChronicIllness/comments/1g3uhfj)
  - Role: chronic swelling problem-language evidence
  - Signal: regular shoes hurt; affordability matters; swelling varies by day; adjustable laces/Velcro are more suitable than hard uppers

- [r/AgingParents - shoes for very swollen feet](https://www.reddit.com/r/AgingParents/comments/1j05edk)
  - Role: caregiver/senior evidence
  - Signal: husband/dad/older parent; regular shoes not fitting; diabetic Velcro shoes and adjustable tops/heels recommended; caregivers value easy-on/off

- [r/diabetes - diabetic shoes discussion](https://www.reddit.com/r/diabetes/comments/1qnvs7d/honest_question_do_you_wear_diabetic_shoes_why_or/)
  - Role: diabetic-foot context
  - Signal: shoe rubbing, ulcer prevention, proper fit, and scan/fitting discussions shape buyer seriousness

- [r/type2diabetes - diabetic shoes help](https://www.reddit.com/r/type2diabetes/comments/1nkdga9/do_diabetic_shoes_actually_help/)
  - Role: support/stability context
  - Signal: wider/longer shoes can reduce rubbing but may affect footing; arthritis and fibromas increase caution around minimalist shoes

Pinterest:

- [Shoes for swollen feet lipedema board](https://www.pinterest.com/legslikemine/shoes-for-swollen-feet-lipedema/)
  - Role: visual discovery surface
  - Signal: chronic swelling communities save shoe options in board/list format

- [Adjustable shoe for swollen feet pin](https://ca.pinterest.com/pin/the-worlds-first-stylish-adjustable-shoe-for-swollen-feet--363454632436143553/)
  - Role: visual-shopping context
  - Signal: adjustable + stylish is a recurring desire, not just function

- [Extra-expandable shoes for swollen feet pin](https://ca.pinterest.com/pin/extraexpandable-shoes-for-swollen-feet-the-saturday-style--837177018242686352/)
  - Role: visual-shopping context
  - Signal: expandable/adaptive language circulates visually

TikTok Shop:

- [LeIsfIt diabetic shoes product page](https://shop.tiktok.com/us/pdp/leisfit-diabetic-shoes-for-women-adjustable-fit-comfort/1729500340815435116)
  - Role: commerce-language evidence only
  - Signal: extra wide, adjustable, swollen arthritis edema feet, zero-drop, low-price marketplace clutter

- [TikTok Shop keyword page - diabetic swollen feet](https://shop.tiktok.com/us/k/diabetic-swollen-feet)
  - Role: commerce/category surface
  - Signal: shoes, socks, creams, swelling relief claims, diabetic/edema/neuropathy keyword stacking

- [TikTok Shop keyword page - slip-on shoes for swollen feet](https://shop.tiktok.com/us/k/slip-on-shoes-for-swollen-feet)
  - Role: commerce/category surface
  - Signal: flexible fabric, roomy interior, stretchable material, wide fit, cushioned insole, lightweight design

## Excluded / Downweighted Examples

- Viral vitamin, bunion, exercise, and general foot-health videos were downweighted when they did not show footwear creative grammar or were too far from the persona's buying moment.
- Broad "best orthopedic shoes" listicles were downweighted when they were generic and not swelling/arthritis/caregiver specific.
- TikTok Shop pages were not counted as TikTok creator-feed sources.
- Prior v2 TikTok source links were not reused for v3 selection, because this rerun was explicitly from scratch.

## Current Confidence

- **High confidence:** YouTube authority, adaptive footwear, hands-free/no-bend proof, caregiver/senior safety, and lived-condition review lanes.
- **Medium confidence:** Reddit/Pinterest problem-language support and TikTok Shop commerce clutter.
- **Low confidence:** Regular TikTok and Instagram creator-feed grammar until a stable route returns searchable result cards and downloadable videos.
