# Persona Deep Research — Oral Only

> Compiled 2026-06-10. **This is Part 3 (Journey Maps) of the persona deep-dive.** Parts 1, 2, 4, 5 live in `Persona Context - Oral Only.md`. The 30-second orient is in `Persona Summary - Oral Only.md`.
> Single source of truth: `_data/persona-dictionary.json` + `_data/pain-clusters.json` + `Reviews/reviews.tagged.jsonl` + ad-library classifications.
> **Small-N banner**: 16 reviews is too few to confirm persona-typical journeys with high confidence. The maps below are **inferred** from the corpus, the 33 real-text Meta ads, and competitor 1-star patterns. They are honest directional models, not validated flows.

---

## How to read a journey map

Each map follows the same 7 stages:

```
TRIGGER → RESEARCH → CONSIDERATION → DECISION → ONBOARDING → RETENTION → ADVOCACY
```

For each stage we capture:
- **What the persona is doing** (observed or inferred)
- **What they say / where they say it** (verbatim, cited)
- **What they're feeling** (the emotional state)
- **Where the brand is / isn't present**
- **The "moment"** for that stage: the trigger moment, the aha moment, the decision moment, the exit moment

The maps reference `pain-clusters.json` cluster IDs as the data anchor.

---

## Persona 1 — The Symptom-Focused Solution-Seeker

**Anchored to pain-clusters**: `symptom-focused-solution-seeker.low_energy_unrefreshing_sleep` (4 reviews), `...hopeful_first_weeks` (2), `...diagnostics_unlock` (1).

### The Journey

| Stage | What they do | What they say | What they feel | Where the brand is / isn't | Moment |
|---|---|---|---|---|---|
| **TRIGGER** | Spouse says "you seem off." Or they look in the mirror and don't recognize the energy level they had 5 years ago. Or they Google "low energy men 30s" or "testosterone decline." Usually a 3-6 month gap from "I should do something" to "I'm going to do something." | "I don't feel like myself." "I'm tired all the time." "My wife said I seemed off." | Frustrated, slightly defeated, hoping this is fixable. Not panicked — it's a slow burn. | Brand is NOT present here. They are reading Dr. Attia, Huberman, or generic Men's Health articles. | **The trigger moment** is the day they decide "I'm going to actually look into this." Often 1-2 weeks before they search. |
| **RESEARCH** | Google "[low T symptoms]," browse r/Testosterone (passively, doesn't post), watch YouTube (Huberman, Attia, possibly Dr. Jaquish's channel). Read 5-10 articles. May try a "T booster" supplement first. Hits Men's Health, Cleveland Clinic, possibly Hims. | "Is this normal?" "How do I know if I have low T?" "What does low T feel like?" | Curious, slightly anxious, hoping there's a simple solution. Doesn't want to admit they might need a clinic. | Brand is NOT present at this stage. They are at Hims / Hims-adjacent content. | **The research aha**: "wait, this is a real medical thing, not just me being old." |
| **CONSIDERATION** | Now they know TRT exists. They Google "TRT options" and find injectable (the default framing), creams, and (rarely) oral. They compare telehealth clinics: Hims, Hone, Maximus. They look at Trustpilot. | "What's the difference between Hims and Hone?" "Do I really need to inject?" "How much does TRT cost?" | Active comparison mode. Sensitive to price. Worried about needles (vague). Worried about "is this legit?" | Brand IS present at this stage. Meta ads hit here. But the brand's current ad copy is 88% Symptom-targeted (good), but generic ("you just don't feel it yet"). Differentiator not yet landed. | **The consideration aha**: when they realize oral T exists. Most buyers default to injectable because they don't know oral is a real category. |
| **DECISION** | They pick the lowest-friction option. Often: cheap introductory offer, no-needle, fast onboarding, good reviews. For the price-sensitive Symptom persona, $189/mo is a real blocker. The 12-month plan at $139/mo is the path. | "OK let me just try it." "If the labs come back and I don't qualify, fine." "Let me start with the quiz." | Cautiously optimistic. The "is this going to work" anxiety. Wants validation. | Brand is fully present. Quiz → Plans → Checkout. Trustpilot-equivalent is missing (no third-party reviews). | **The decision moment** is the quiz completion. If the quiz confirms they "may be a candidate," the price friction takes over. The 12-month plan + compounding-status disclosure has to land at this moment. |
| **ONBOARDING** | Lab order → Quest/Labcorp walk-in → wait for results → physician consult → first shipment arrives. The "I haven't started yet" anxiety peaks. | "When will the labs come back?" "What if the doctor says no?" "How long until I feel something?" | Excited but anxious. The "I paid $129, I hope this works" moment. | Brand is present (FAQ, support). But the gap is real: the FAQ does not surface a "if you don't qualify, here's what happens" path. (Product Context §4.1 — UNANSWERED objections) | **The aha moment**: first week of energy improvement. u/Unique-Yak-2449 reports this at 1wk. Marcus T. reports it within months. |
| **RETENTION** | They're in the protocol. Watching for energy, sleep, drive improvements. Quarterly labs are the gating compliance moment. The $69/qtr labs are the friction point — they have to keep paying. | "I hope my labs are good." "Should I be feeling more by now?" "Do I really need to keep doing this?" | Either grateful-and-stable OR anxious-and-questioning. The 6-month mark is a churn risk (annual plan renews at month 12; if not on 12-mo, they've been paying $189×6 = $1,134 with no commitment). | Brand is present (the-science, /plans, quarterly check-ins). The brand has NO Trustpilot / public review surface, so churn feedback is invisible. | **The decision moment** at 6 months: do they renew? do they refer a friend? This is where advocacy is won or lost. |
| **ADVOCACY** | If the protocol worked, they tell a friend. They leave an on-site testimonial (the only public review surface). They might post on r/Testosterone, but only if asked. | "I'm sleeping better, training harder, and my labs back this up." — `oo-home-marcus-t` | Loyal but quiet. The on-site testimonial is the evidence. | Brand is present (on-site testimonials are the only review surface). The brand has no proactive referral program visible to existing members — there's a `partners.oralonly.com` for affiliates, but that's media-buyers, not member-referrals. | **The advocacy moment** is the 6-12 month tenure mark. Marcus T. (8mo), Daniel R. (1yr), Anthony L. (6mo) are the proof points. |

### Journey summary

- **Entry mode**: spouse / mirror / "I should look into this"
- **Time to convert**: 1-3 months from trigger to checkout (long — they're cautious)
- **Where they drop**: at the price wall ($189/mo), at the "do I really need labs first" question, at the "is this FDA-approved" question
- **Where they convert**: when the quiz confirms candidacy + the 12-month plan makes the math work
- **Churn risk**: at 6 months (no commitment), at 12 months (renewal decision), at the 3-month labs moment
- **Advocacy surface**: only on-site testimonials. The brand has no Trustpilot, no Yotpo, no Judge.me.

---

## Persona 2 — The Protocol-Fatigued Veteran

**Anchored to pain-clusters**: `protocol-fatigued-veteran.tired_of_pinning` (3 reviews), `...looking_for_diurnal_physiology` (1).

### The Journey

| Stage | What they do | What they say | What they feel | Where the brand is / isn't | Moment |
|---|---|---|---|---|---|
| **TRIGGER** | The routine has gotten old. Maybe 5 years, maybe 20 years (vdux: 20 years). A specific moment crystallizes: traveling with sharps, the spouse complaining about needles in the bathroom, a plateau in results, or a forum post about oral T. Sometimes a lab result is the trigger (HCT spike — overlaps with Persona 3). | "I'm tired of pinning." "20 years of needles, I'm done." "I want to try something different." | Resigned-but-hopeful. They've accepted TRT as part of their life, but they want it to be easier. | Brand is NOT present. They are on r/trt, ExcelMale, possibly a private Telegram group. | **The trigger moment** is when convenience fatigue overcomes switching friction. |
| **RESEARCH** | Heavy research. r/trt, r/Testosterone, ExcelMale, possibly a Kyzatrex thread, possibly a peptide forum. They read every word. They compare Nandrogen to Kyzatrex to Jatenzo to Maximus to UGL DIY. They look at the white paper on OralOnly.com and judge it. | "Is there an oral T that actually works?" "Is Nandrogen real?" "What's the actual PK?" | Highly analytical. Wants data. Distrusts marketing. Will leave if the surface looks amateur. | Brand IS present (white paper, the-science page), but the brand's forum reputation is mixed. u/vdux calls it "Temu for roids" adjacent. u/swoops36 cites a 404. u/Jayween defends it. | **The research aha**: when they find a peer testimonial with lab values. u/Jayween's >1500 ng/dL at 2h20m post-dose is the prototype. u/Day_Dreamer's 6-week report is the second. Without these, the brand looks unproven. |
| **CONSIDERATION** | They want to compare mechanism: diurnal vs. supraphysiologic, sublingual vs. injection frequency, compounded vs. FDA-approved. The Kyzatrex comparison is the central trade-off: FDA approval vs. twice-daily vs. once-daily. The price comparison: UGL DIY $45/10 weeks vs. Nandrogen $139/mo. | "What's better, Nandrogen or Kyzatrex?" "Is the diurnal claim real?" "Is the compounded status a deal-breaker?" | Skeptical. Wants to be convinced. Will not be moved by emotional copy. | Brand IS present (the-science page, white paper). But the white paper is general absorption data, not product-specific. The site is missing the PK curve they want. (Product Context §8) | **The consideration aha**: the diurnal mechanism framing. "High AM, low PM — like your body would do." For the medically-literate Veteran, this is the difference-maker. |
| **DECISION** | They pick based on (a) data they trust (b) mechanism they understand (c) price they accept (d) compounding-status tolerance. For the Veteran, $1,200/year is a real concern (vdux cites it directly). The 12-month plan mitigates this. | "OK I'll try it for 6 months. If my labs are good, I stay." | Cautiously optimistic. Wants to be the case study, not the cautionary tale. | Brand is fully present (quiz, plans, intake). The compounding status is disclosed but feels hidden. | **The decision moment** is when the FAQ answers their #1 objection (the HCT claim, the DHT claim, the diurnal claim) — and the answer is "we'll show you on your quarterly labs." |
| **ONBOARDING** | Lab order → Quest/Labcorp → first labs are the critical baseline → physician consult → first shipment. The first week of dosing is the "does this feel different" moment. The first 3-month labs are the "is it actually working" moment. | "My T was >1500 ng/dL at 2h20m post-dose." — `excelmale-day-dreamer` "Feeling very good and focused within an hour, no needle." — `reddit-jayween` | Cautiously validating. Watching for the lab values. The "did I make a mistake" anxiety is high. | Brand is present (FAQ, support, /the-science). The gap: the FAQ does not address "I'm currently on another testosterone therapy. Can I start oral TRT?" — the central Veteran question. (Product Context §4.1) | **The aha moment**: the first post-dose hour ("feeling very good and focused within an hour" — Jayween). The second aha: the first 3-month lab value. |
| **RETENTION** | They're in the protocol. Watching the diurnal curve on their own labs. Reading forums for "is anyone else on Nandrogen" — the brand has no community surface. The quarterly $69 labs are the gating compliance moment. | "I hope my HCT stays steady." "I want to see my diurnal labs over 6 months." | Either grateful-and-stable OR analytical-and-skeptical. They are more likely than the Symptom persona to leave a forum-style review. | Brand is present but quiet. The brand has no community surface, no r/Nandrogen, no Discord. The forum presence is third-party (r/trt, ExcelMale). | **The decision moment** at 6 months: do they stay? For the Veteran, this is when the lab data confirms the mechanism (or doesn't). |
| **ADVOCACY** | If the protocol worked, they post on r/trt / ExcelMale with their lab values. This is the Veteran advocacy mode — peer-credibility, not on-site testimonials. | "Pretty much the same as I did on injections — not better or worse. Happy overall; acknowledges company is new with growing pains." — `excelmale-day-dreamer` | Loyal but critical. Willing to defend the brand against unfair criticism (`reddit-jayween`'s "they didn't pull it out of their asses" defense), but won't sugarcoat the gaps. | Brand is NOT present in this advocacy. The brand has no community surface, no r/Nandrogen, no way to engage. The veteran is advocating in third-party forums the brand can't access. | **The advocacy moment** is when the lab data and the subjective experience both line up. The Veteran advocates on data, not emotion. |

### Journey summary

- **Entry mode**: routine fatigue, plateau, travel friction, OR HCT scare (Persona 3 overlap)
- **Time to convert**: 3-6 months from trigger to checkout (long — they're doing diligence)
- **Where they drop**: at the "is this FDA-approved" question, at the "what's the PK data" question, at the "what about fertility" question
- **Where they convert**: when the diurnal mechanism clicks, when a peer testimonial lands (Jayween, Day_Dreamer), when the price wall is cleared
- **Churn risk**: at the 3-month labs if HCT spikes OR diurnal claim doesn't hold; at the 6-month mark if no peer community to validate the experience
- **Advocacy surface**: r/trt, ExcelMale, possibly r/Testosterone. NOT on-site. The brand has no community engagement strategy here.

---

## Persona 3 — The Hematocrit Skeptic

**Anchored to pain-clusters**: `hematocrit-skeptic.blood_thickening_fear` (2 reviews).

### The Journey

| Stage | What they do | What they say | What they feel | Where the brand is / isn't | Moment |
|---|---|---|---|---|---|
| **TRIGGER** | A blood test shows HCT 50+. Or a doctor says "we need to discuss your hematocrit." Or they're already on phlebotomy. The fear is concrete: clotting, stroke, cardiovascular event. | "My HCT was 56 in 2 months." "I think my hematocrit is going to go through the roof." | Medical fear. This is the only persona in the corpus driven by **fear**, not fatigue or curiosity. | Brand is NOT present. They're at their urologist, hematologist, or r/trt. | **The trigger moment** is the lab result. It's a specific date. |
| **RESEARCH** | They Google "hematocrit testosterone." They read about polycythemia, blood donation, phlebotomy frequency. They find OralOnly only if they search for "oral testosterone hematocrit" — and they have to. The brand does not appear in the HCT-concerned search path naturally. | "Is there a T option that doesn't push HCT?" "Does oral T raise hematocrit?" "What's the half-life of Nandrogen?" | Analytical, data-seeking, anxious. Will not move without data. | Brand is present (the-science page mentions HCT monitoring, partners page claims "oral keeps RBC steady") but **the data is not in the FAQ, not on the main product page, and not in a white paper**. (Product Context §8 — hematocrit safety is "light" in current ad-library creative) | **The research aha**: when they find the diurnal claim + the "short-half-life" framing. This is the mechanism promise. |
| **CONSIDERATION** | They want lab data. Specifically: HCT values from Nandrogen users over 3-6 months. They want to know if anyone has done the comparison. The forum has 0 such data points in the corpus. | "Where's the HCT data?" "What about estrogen?" "Will my E2 spike?" | Skeptical. The brand's claim is exactly what they want to hear — but they have no way to verify it. | Brand is present but with a **data gap**. The partners page says "oral TRT keeps red blood cell counts steady" with no citation. The forum confirms no peer-reviewed PK data exists. | **The consideration aha**: when they find a peer testimonial with HCT data. u/Jayween's >1500 ng/dL T-level is helpful but doesn't include HCT. u/Day_Dreamer's 6-week report doesn't include HCT. **No testimonial in the corpus has HCT data.** |
| **DECISION** | They convert only if (a) the mechanism framing is convincing (diurnal = less RBC stimulation), (b) a peer endorsement lands, (c) the protocol includes HCT monitoring at every quarterly cycle. The compounding status is a known downside; they accept it for the mechanism. | "OK I'll try it for 3 months. If my HCT stays at 50 or below, I stay. If it spikes, I'm out." | Risk-averse, analytical, hoping they're making the right call. | Brand is present (quiz, plans, intake). The "is this FDA-approved" question has to be answered honestly. | **The decision moment** is the 3-month lab result. "Did my HCT stay steady?" If yes, they stay. If no, they leave for a different option. |
| **ONBOARDING** | Baseline labs (HCT critical) → physician consult (must address HCT explicitly) → first shipment → first month → first quarterly labs. The HCT number is the only metric they care about in month 1-3. | "My baseline HCT was 52. Let me see what 3 months does." | Watching. Waiting. The lab number is the only thing that matters. | Brand is present (FAQ, support, /the-science). The gap: no protocol commitment for HCT monitoring frequency. The $69/qtr labs are the mechanism, but the brand does not say "we'll chart your HCT at every cycle." | **The aha moment**: the first 3-month HCT result. "It stayed at 50. It didn't go up." |
| **RETENTION** | They're in the protocol. Watching the HCT curve. Reading their own labs. Comparing to injectable numbers. The 6-month mark is the next checkpoint. | "My HCT is 50, not 56. The diurnal claim is holding." | Analytical-and-validating. They will not be a vocal advocate unless they have the HCT data. | Brand is present. The brand could deepen the relationship here by publishing member lab trends (anonymized, with consent). | **The decision moment** at 6 months: do they continue? This is when the HCT data confirms the mechanism (or doesn't). |
| **ADVOCACY** | If the protocol worked AND the HCT data is favorable, they post on r/trt / ExcelMale with their lab values. This is the Hematocrit Skeptic advocacy mode — peer-credibility, data-led, focused on the specific fear. | "HCT stayed steady. Diurnal claim is real. For the blood-thickening vets on injectable, this might be the move." | Data-led advocate. Will not be a marketing testimonial. Will be a peer-credibility testimonial. | Brand is NOT present. The Hematocrit Skeptic advocates in third-party forums the brand can't access. The brand should be reading these forums and engaging, but the corpus shows no such engagement. | **The advocacy moment** is when the HCT data confirms the diurnal mechanism. The Hematocrit Skeptic advocates on data, not emotion. |

### Journey summary

- **Entry mode**: HCT lab result, doctor visit, phlebotomy
- **Time to convert**: 1-3 months from trigger to checkout (faster than Veteran — they have an urgent trigger)
- **Where they drop**: at the "is there HCT data" question (no peer-reviewed data exists), at the "compounded status" question
- **Where they convert**: when the diurnal mechanism clicks, when the protocol includes HCT monitoring at every quarterly cycle
- **Churn risk**: at the 3-month labs if HCT spikes; at any point if they find a hematologist who tells them oral T's diurnal claim is unproven
- **Advocacy surface**: r/trt, ExcelMale, possibly r/Testosterone. NOT on-site. The brand has no community engagement strategy here, and no HCT data to share with the advocate.

---

## Persona 4 — The Credibility-Conscious Critic

**Anchored to pain-clusters**: `credibility-conscious-critic.amateur_marketing_red_flags` (5 reviews), `...founder_credential_skepticism` (2), `...no_published_data` (4).

### The Journey

| Stage | What they do | What they say | What they feel | Where the brand is / isn't | Moment |
|---|---|---|---|---|---|
| **TRIGGER** | Multiple possible triggers: (a) they see an ad and the surface looks amateur (mystery discount, AI-generated imagery); (b) a friend recommends OralOnly and they Google it; (c) they read a Reddit thread criticizing the brand and want to verify; (d) they search for "is OralOnly legit" and hit Trustpilot-equivalent (which doesn't exist for the brand); (e) they search for "Nandrogen review" and find only the 3 on-site testimonials. | "What is this, Temu for roids?" "Looks either fake or amateur." "Is this real?" | Distrust-first. Skeptical by default. Looking for the red flag. | Brand is present but **failing the surface credibility test** at the first click. Mystery discount popups, AI-generated video ad, 404 history, no Trustpilot — all hit the Critic persona on arrival. | **The trigger moment** is the first surface impression. The Critic decides in 2-5 seconds whether the brand is legit. The current site is failing this test. |
| **RESEARCH** | They Google "[brand] scam," "[brand] review," "[brand] Trustpilot." They check ScamAdviser, Gridinsoft, LegitScript (the brand's footer link to LegitScript is a real signal here). They search r/Testosterone, r/trt, ExcelMale. They read the FAQ closely. They check the pharmacy partner. | "Is oralonly.com legit?" "What do real users say about Nandrogen?" "Where's the data?" | Investigating. Cross-referencing. Not yet hopeful. | Brand is present (FAQ, the-science page, the white paper). But the brand has **no third-party review surface**. The on-site testimonials are the only public reviews. The Critic will not trust on-site testimonials — they are marketing-shaped by definition. | **The research aha**: when they find an external validation source (Reddit thread, ExcelMale thread, LegitScript verification, a peer-reviewed citation). The current corpus has Reddit + ExcelMale, but the discussion is critical-leaning, not validating. |
| **CONSIDERATION** | They want to see (a) peer-reviewed PK data, (b) independent user reports with lab values, (c) a transparent compounding disclosure, (d) a credible physician network, (e) the absence of "mystery discount" / "Temu for roids" surface patterns. They will convert only if the brand passes **all five**. The compounding status is acceptable if disclosed honestly. | "Is the white paper real data?" "Who's the physician?" "Why does the founder sell rubber bands?" | Testing. Will not move on emotion. Will move on proof. | Brand is partially present. The FAQ discloses the compounded status. The physician network (TelegraMD, MDIntegrations) is named in the privacy policy. The white paper is general absorption data. The founder's X3 Bar history is not addressed. The "mystery discount" popup is still on the site. | **The consideration aha**: when they find the FAQ's compounding disclosure + the physician network names + the white paper. For the Critic, transparency is the mechanism. |
| **DECISION** | They pick based on (a) surface credibility (does the site look professional?), (b) data credibility (is there peer-reviewed PK data?), (c) physician credibility (is there a named doctor?), (d) brand credibility (does the founder feel medical-grade?). For the Critic, all four must be positive. The price wall is secondary — the Critic is price-tolerant if credibility is high. | "OK this looks more legit than I thought. Let me try the quiz." | Cautiously willing. The Critic converts last in the sequence, but converts with the highest advocacy once they do. | Brand is fully present (quiz, plans, intake). The gap: the FAQ does not address "Is there peer-reviewed data on Nandrogen?" directly. The Critic will look for this answer and not find it. | **The decision moment** is the FAQ answer to "is this FDA-approved?" + the FAQ answer to "where's the data?" If the brand answers both honestly (compounded, with general absorption data only), the Critic will consider. If the brand hides, they leave. |
| **ONBOARDING** | Lab order → walk-in → first labs → physician consult → first shipment. The Critic watches for: (a) do the labs actually arrive? (b) does the physician actually call? (c) is the shipment on time? These are the operational credibility tests. | "OK labs are in. Let me see what the doctor says." | Cautiously validating. The "is this actually a real medical practice" anxiety. | Brand is present (FAQ, support). The gap: the cancellation flow is not visible in the FAQ (Product Context §4.1 — UNANSWERED objections). For a Critic who is anxious about subscription traps, this is a real blocker. | **The aha moment**: the first physician call. If the doctor is real, knowledgeable, and on time, the Critic is converted. If the call is late, the Critic is gone. |
| **RETENTION** | They're in the protocol. Watching for: (a) are the labs delivered in full (not "monitoring" they can't see)?, (b) is the customer service real (vs. chatbot)?, (c) is the brand consistent in messaging? They will be the first to detect any change. | "I want to see my labs." "Is the support real?" | Engaged-but-vigilant. The Critic is the highest-value customer because they pay attention. | Brand is present. The gap: the brand has no published commitment to "your labs in your hands, every quarter." Maximus had this same issue and got 1-stars. (Positioning Ammo §2.5) | **The decision moment** at 6-12 months: do they renew AND advocate? This is when the operational credibility has been tested for a full cycle. |
| **ADVOCACY** | If the protocol worked AND the operational credibility held (real physician, real labs, no chatbot, on-time shipment), the Critic becomes the brand's most powerful advocate. They will leave a thoughtful on-site testimonial (`oo-home-daniel-r` is the prototype: "Finally a clinic that treats you like an adult. Real labs, real physicians, no gimmicks."). They will also defend the brand in forums against unfair criticism. | "Finally a clinic that treats you like an adult. Real labs, real physicians, no gimmicks." — `oo-home-daniel-r` | Loyal-and-vocal. The Critic advocates on principle, not just outcomes. | Brand is present (on-site testimonials are the only review surface). The brand should be **actively recruiting Critic testimonials** because they are the most credible voice for the next Critic buyer. The brand is not doing this — Daniel R. is the only Critic-voice testimonial in the corpus. | **The advocacy moment** is when the operational credibility has been validated for a full year. The Critic is the highest-trust advocate the brand can have. |

### Journey summary

- **Entry mode**: surface impression (negative or positive), friend referral, Reddit thread, ScamAdviser check
- **Time to convert**: 3-6 months from trigger to checkout (longest — they're doing the deepest diligence)
- **Where they drop**: at the "mystery discount" surface, at the AI-generated ad, at the 404 history, at the missing peer-reviewed data, at the founder's X3 Bar history
- **Where they convert**: when the FAQ answers "is this FDA-approved?" + "where's the data?" honestly, when the physician network is named, when the white paper is at least a starting point
- **Churn risk**: at the first operational credibility failure (late shipment, chatbot, hidden labs)
- **Advocacy surface**: on-site testimonials (the prototype is Daniel R.), plus third-party forums when the Critic defends the brand. The brand is not currently recruiting Critic testimonials.

---

## Cross-persona journey map

### Where the 4 personas converge and diverge

| Stage | Symptom | Veteran | Hematocrit | Critic |
|---|---|---|---|---|
| **TRIGGER** | Spouse / mirror / fatigue | Routine fatigue / plateau | HCT lab result | Surface impression / friend / Reddit |
| **RESEARCH** | Generic health content | r/trt, ExcelMale, white paper | r/trt, ExcelMale, PubMed | ScamAdviser, Trustpilot (missing), Reddit |
| **CONSIDERATION** | Compare Hims / Hone / Maximus | Compare Nandrogen / Kyzatrex / Maximus | Compare mechanism (diurnal vs. inject) | Test surface + data + physician |
| **DECISION** | Quiz + 12-mo plan | Quiz + 6-mo trial | Quiz + 3-mo trial | Quiz + FAQ confirmation |
| **ONBOARDING** | First energy improvement | First lab values | Baseline HCT | First physician call |
| **RETENTION** | 3-month labs | 3-month labs (HCT) | 3-month HCT specifically | Operational credibility (shipment, support, labs) |
| **ADVOCACY** | On-site testimonial | r/trt post with labs | r/trt post with HCT data | On-site testimonial + forum defense |

### The unified "aha moment" pattern

The aha moment is different per persona:
- **Symptom**: "I feel different" (energy, sleep, drive)
- **Veteran**: "My labs are the same, but the routine is gone" (mechanism + convenience)
- **Hematocrit**: "My HCT didn't go up" (medical safety)
- **Critic**: "The doctor was real" (operational credibility)

Each persona's advocacy is anchored to their specific aha moment. The brand's current marketing leads with the Symptom aha ("I'm sleeping better, training harder"), but the corpus shows the Veteran + Critic aha moments are also high-value and underexploited.

### The unified "exit moment" pattern

The exit moment (churn trigger) is also different per persona:
- **Symptom**: "It didn't work" or "I can't afford $189/mo" (price wall)
- **Veteran**: "My labs got worse" or "I'm not seeing the diurnal claim" (mechanism invalidation)
- **Hematocrit**: "My HCT spiked" (medical safety violation)
- **Critic**: "I got a chatbot / late shipment / hidden labs" (operational credibility failure)

The brand has **no proactive exit survey or win-back flow** in the corpus. The first signal of an exit comes from a public forum post (Reddit) or a Trustpilot-style 1-star (which doesn't exist for this brand).

---

## Sourcing notes & small-N caveats

- The 16-review corpus is heavily skewed: 3 on-site (5★, marketing-shaped) + 13 forum (mostly critical-leaning, often from skeptics). The "happy customer who converted and stayed quiet" persona is invisible in the corpus.
- The journey maps above are inferred from (a) the corpus, (b) the 33 real-text Meta ads, (c) the 40 competitor 1-stars, (d) the on-site testimonials, (e) the FAQ and product pages. They are **honest directional models**, not validated flows.
- The maps assume the brand's operational reality matches the brand's marketing claims. Where the corpus shows a gap (no third-party reviews, no published cancellation flow, no HCT data), the gap is noted in the maps.
- The **unifying strategic insight** across all four personas: the brand's current creative is 88% Symptom-targeted (per ad-library classification), but the corpus and competitor 1-star patterns show the brand's biggest opportunity is in the Veteran + Hematocrit + Critic sub-segments where the creative is currently underexploited. The maps above are designed to support that strategic shift.

---

*This is a living document. Updates at `/refresh=personas` flag. Banner reflects small-N corpus — re-run with a larger sample if 200+ on-platform reviews accumulate.*
