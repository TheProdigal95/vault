# Listicle Writer Skill: Refinement Log

Logged March 2026 after building the Peck Purity Chili Mix Comparison listicle.

---

## Context

Built a new listicle for GrubTerra (Peck Purity) using the listicle-writer skill. The skill's fundamentals are strong (theme as gravitational center, sales argument types, argument variety check, skim test, zone/mode framework). But 12 gaps caused extra iteration during the session. Logged here for review before implementing changes.

---

## What works well (no changes needed)

- Theme as gravitational center
- Sales argument types (mechanism, competitive, evidence, social proof, risk reversal, credibility) and variety check
- Core vs adjacent feature/benefit mapping
- Point headline criteria (feature + theme + competition)
- Skim test
- Zone/mode framework
- Awareness calibration in Gate 4
- Competitive arguments are feature-specific (not generic "other products")
- FAQ handles objections, listicle handles persuasion
- Formatting rules (one sentence per line, word counts, no em dashes)

---

## Proposed changes

### 1. Connect awareness level to zone/mode selection
**Where:** Gate 3 (Zone, Mode and Headline)
**Problem:** Gate 0 asks for awareness level. Gate 3 asks for zone and mode. But nowhere does the skill connect them. Had to reason ourselves that solution-aware = Direct mode.
**Fix:** Add guidance in Gate 3: "Solution-aware audiences typically get Direct mode (they're comparing, show them why you win). Problem-aware typically gets Educational (teach them the problem, then introduce the product). Product-aware gets Direct with proof-heavy arguments."
**Priority:** High. This is a decision that happens every time.

### 2. Add structural comparison table guidance
**Where:** page-structure.md
**Problem:** The skill only mentions tables "for competitive arguments" within points. Our table sat between the subheadline and point #1 as a standalone competitive element, not attached to any point. The skill doesn't acknowledge this exists.
**Fix:** Add a section in page-structure.md: "A comparison table can go right after the subheadline as a structural element that handles broad competitive framing before the first point. This table positions the product against the competitors the audience is actually comparing. It does competitive work upfront so individual points don't have to repeat it."
**Priority:** High. Both v2 and the new listicle used this structure.

### 3. Relax table cell constraint
**Where:** page-structure.md, Comparison Table Rules
**Problem:** Current rule: "Every cell should be one word or Yes/No." Our actual cells: "Diatomaceous earth + Yucca" (4 words), "Cuts & dries parasites" (4 words). The rule is too strict.
**Fix:** Change to "1-4 words per cell, scannable at phone width. If a cell needs a full sentence, it's not a table."
**Priority:** Medium. Easy fix.

### 4. Add point sequencing guidance
**Where:** Gate 4 or Gate 5
**Problem:** The skill says what each point should contain but never how to order them. We stacked 3 ingredient/mechanism points in a row and had to reorder.
**Fix:** Add: "Don't stack 3+ points of the same argument type consecutively. Alternate between science/mechanism and practical/competitive arguments. If the reader hits three consecutive ingredient points before a tangible benefit, the first half feels like a textbook."
**Priority:** High. This directly affects readability.

### 5. Add adjacent-point redundancy check
**Where:** Gate 5 Validation Checkpoint
**Problem:** Gate 5 has the skim test but doesn't flag when two consecutive headlines cover the same territory. Our original #1 and #2 both opened with "Diatomaceous Earth" in the headline.
**Fix:** Add to validation checkpoint: "Redundancy check: do any two consecutive headlines name the same feature, ingredient, or concept? If so, one may be redundant or they should be separated by a different argument type."
**Priority:** High. Caught a real problem in this session.

### 6. Specify deliverable/working doc separation
**Where:** Gate 6 (Full Draft)
**Problem:** The skill never says to separate clean copy from compliance checks, process reasoning, and strategy notes. Had to fix mid-session.
**Fix:** Add to Gate 6: "The draft output is the deliverable (the file that becomes a landing page). Everything else (compliance checks, process reasoning, strategy notes, comparison to prior work) goes in a separate working doc."
**Priority:** High. Affects every listicle.

### 7. Add process log as a gate
**Where:** New Gate 9 (after imagery) or post-Gate 8 step
**Problem:** T003 statics and T004 UGC briefs both have process logs that enable one-shotting future deliverables. The listicle skill doesn't mention creating one.
**Fix:** Add a gate or step: "Document the process in the working doc. Include: what the theme was and why, what went wrong and what was fixed, and one-shot criteria for doing this on any product. The process log exists so an LLM can read it and one-shot a listicle at this quality bar."
**Priority:** Medium. Compounds over time.

### 8. Add regulated product handling
**Where:** Gate 0 and Gate 7
**Problem:** For supplements, health products, or finance products, compliance guidelines must be loaded before writing and a compliance cross-check run after. The skill is silent on this.
**Fix:** Gate 0: add "Is this product in a regulated category (supplements, health, finance)? If yes, load compliance guidelines before proceeding." Gate 7: add "Compliance cross-check (regulated products only): run every line against the product's compliance guidelines. Log pass/fail for each rule."
**Priority:** High for regulated products. N/A otherwise.

### 9. Add competitive headline formulas
**Where:** headline-formulas.md
**Problem:** Zone 1 formulas are all neutral/educational: "Things [Audience] Should Know About [Topic]." Our winning headline was competitive: "7 Reasons Chicken Keepers Are Ditching Chili Mixes And Folk Remedies For Peck Purity." No zone has competitive formula variants.
**Fix:** Add competitive formulas to each zone. Zone 1 examples: "[Number] Reasons [Audience] Are Switching From [Competitor] To [Product]", "[Number] Reasons [Audience] Trust [Product] Over [Competitor] For [Problem]", "[Number] Things [Product] Does For [Problem] That [Competitor] Can't."
**Priority:** High. Competitive headlines were the strongest options every time.

### 10. Sharpen subheadline guidance
**Where:** headline-formulas.md, Subheadline Patterns
**Problem:** The skill says "bridges the headline to Point 1" with abstract zone examples. Short imperative subheadlines ("Read this before you buy another chili mix.") outperformed descriptive ones.
**Fix:** Add: "If the headline is long, the subheadline is short. One punchy imperative line often outperforms a descriptive sentence. The subheadline does whatever the headline doesn't. If the headline names the competitor, the subheadline can be a direct command."
**Priority:** Medium. Reduces iteration on subheadlines.

### 11. Add VoC data hierarchy
**Where:** Gate 1, Track A
**Problem:** Track A says "user queries their scraped reviews." Customer call transcripts are far higher quality VoC than reviews. The skill doesn't acknowledge this hierarchy.
**Fix:** Add: "VoC data hierarchy: customer calls (if available) > reviews > forums. If call transcripts exist, they are the primary VoC source. Reviews become secondary validation. Forums provide community language but overstate emotional intensity compared to actual buyers."
**Priority:** Medium. Only applies when calls are available.

### 12. Improve fast-track for rich pre-existing research
**Where:** Fast Track section
**Problem:** When the user arrives with briefs, customer calls, and competitive analysis already done, the skill just says "validate and skip." It should be more specific.
**Fix:** Add: "If the user arrives with extensive research (creative briefs, customer call transcripts, competitive analysis), synthesize the existing research into the research brief format (customer voice, competitive landscape, pain point experience, evidence). Validate it has all four sections. Flag gaps. Proceed to the next incomplete gate. Do not re-research what's already documented."
**Priority:** Medium. Saves time on projects with existing research.

---

## Implementation notes

- Changes 1, 2, 4, 5, 6, 8, 9 are high priority (affect every listicle or caught real problems)
- Changes 3, 7, 10, 11, 12 are medium priority (improve efficiency but didn't block us)
- Changes touch 4 files: SKILL.md (gates 0, 3, 5, 6, 7), headline-formulas.md (formulas, subheadlines), page-structure.md (table rules, structural table), point-structure.md (sequencing)
- The process log from the Peck Purity working doc has one-shot criteria that should inform the skill updates
