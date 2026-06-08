---
cssclasses:
  - table-wide
  - wide
---
# Video Script Criteria

Rules for video ad scripts across all brands. Apply on top of [[Universal Copy Rules]].

Derived from IM8 T001 and FitSleeps T001 — the strongest version of each rule kept.

For the definition of a hook and the 18 core types / 3 registers used in hook variations, reference [[Headline & Text Hook Criteria]].

---

## On-Screen Captions

**Writing order.** Voiceover is the primary message — it must match the script the editor is delivering. Write VO first. Captions are the second pass: a standalone mute-channel hook for sound-off viewers, written against [[Headline & Text Hook Criteria]] as a different angle on the same beat. Never write the caption first as a subtitle of the VO — that is what produces echo captions.

**Caption-vs-VO check.** For every hook, the caption must use a different core type from [[Headline & Text Hook Criteria]] than the VO is carrying. If the caption is verbatim, near-verbatim, restates the VO's payoff, or shares the same angle in different words → rewrite using a different core type from the criteria doc. This check runs at every QA tier (writer sub-agent, orchestrator, main session) per [[Critique Methodology - Video]] — same-angle captions are blocking, fix in pass.

**Caption compression ban.** A caption that shortens the VO's message into fewer words — without changing the angle or hook type — is a same-angle violation even if no word is shared verbatim. The caption must address a *different viewer intent* than the VO, not compress the same intent. Test: remove the VO. Does the caption still open its own curiosity gap or land its own payoff, independent of the VO? If the caption only makes sense because of the VO it abbreviates, rewrite it.

- Captions and VO are two separate hooks on two channels (sound on vs sound off). Caption creates its own curiosity gap, never repeats VO verbatim and never restates the VO's payoff in different words.
- Captions must work on mute as standalone headlines. Apply [[Headline & Text Hook Criteria]].
- Curiosity gaps must be contrarian and non-generic. See Qualitative Copy Standards in [[Universal Copy Rules]].
- Hook captions must pass the cold viewer test: would someone scrolling with zero context understand the problem AND feel curiosity?
- Use the person's actual name for recognized people, not pronouns. "SABALENKA INVESTED" not "SHE INVESTED." For unrecognized people, title is enough: "THIS DOCTOR" with a photo works.
- Caption cells must contain ONLY the text that appears on screen. No formatting instructions, no markdown, no labels like "**Milestone card:**" or "**Keyword callout:**".
- No special characters or fancy unicode in captions (no middle dots ·, no em-dashes —). Write captions like someone would type on their phone.
- Close caption stacks proof points (customer count, ratings, guarantee) while the VO delivers the emotional beat. Two different messages on two channels, not the same message twice.
- Emoji policy is brand-specific. Default to no emoji unless the brand's top spenders use them. When allowed, use sparingly. The ❌ / ✅ markers below are an exception — they are structural, not decorative, and apply across brands.

### Multi-Card Captions

- When a caption contains multiple distinct messages, list items, or stacked cards, separate them with `<br><br>` (HTML line break + blank line). The blank line stacks each beat as its own visible card on screen.
- Never use " - " (space-dash-space) as a separator between caption cards. The dash reads as a single run-on line on screen and collapses the rhythm. Example of what to do:
	- ✅ `MAGNESIUM<br><br>SAFFRON<br><br>VITAMIN D3` (three stacked cards)
	- ❌ `MAGNESIUM - SAFFRON - VITAMIN D3` (one run-on line)
- Single-line captions with natural sentence punctuation still flow naturally. The `<br><br>` rule applies only when stacking distinct cards or beats.

### Failed vs. Working Alternatives

When a caption juxtaposes alternatives the viewer should reject against options that work, prefix each line:

- `❌` for failed, dismissed, or rejected alternatives (single supplements, prior solutions, broken approaches).
- `✅` for working, preferred, or recommended options (the ingredients/system the script is selling).
- Use `<br>` between same-type items (tighter stacking) and `<br><br>` between the failed block and the working block (a beat of separation).
- Example:

```
❌ MELATONIN
❌ MAGNESIUM PILLS
❌ HERBAL TEAS

NONE OF IT WAS ENOUGH
```

becomes `❌ MELATONIN<br>❌ MAGNESIUM PILLS<br>❌ HERBAL TEAS<br><br>NONE OF IT WAS ENOUGH` in the caption cell.

---

## Hooks (0:00-0:05)

- Must land in under 5 seconds.
- 3 variations per script:
  - **Variation A:** Primary hook type for the concept (Curiosity Gap is proven default — dominates top spenders).
  - **Variation B:** Untested type from [[Headline & Text Hook Criteria]] (Provocation, Reframe, Alternative Callout, Conditional, etc.). Pick what fits the concept.
  - **Variation C:** Must use a different visual style from A/B (mandatory). If A/B use CGI, C uses UGC or lifestyle. If A/B use product, C uses empathy B-roll.
- **One variation must use a visual pattern interrupt (mandatory).** The first-frame action or reveal must be able to stop the scroll with sound off, before the viewer fully understands the VO claim. Prefer tactile demonstrations, destructive actions, deceptive reveals, visually exaggerated comparisons, or an unexpected prop/action that is directly relevant to the angle. Examples: cutting open a shoe to reveal flattened foam; a shoe that turns out to be cake; crushing an insole under a heavy weight or press; forcing an expanding balloon or gel prop into a narrow toe box; sliding shoes across wet tile to compare grip; dropping orthotics, a cheaper shoe, and receipts onto a counter under a handwritten `SCAM OR REAL?` note.
  - Routine product close-ups, standard lifestyle B-roll, a different camera angle, survey graphics, and ordinary CGI anatomy overlays do **not** qualify on their own.
  - The visual must still serve the script's claim. Do not add unrelated spectacle that earns attention but creates a misleading setup or a jarring transition into the body.
  - This is a video hook rule. It does not apply to static briefs.
- For narrated humor, the 3 variations can be different scenarios OR different text overlays on the same footage.
- Product CAN appear in the hook (minority of concepts). When it does, pair with curiosity gap + aspirational visual filtering.
- **Problem-first hooks must bridge to solution.** Every problem-first hook (reframe, provocation, conditional) must end with a phrase hinting a solution is coming. "And one scoop a day can fix it." "One supplement can change that." The body then delivers on that hint. Test by reading the hook's last sentence and the body's first sentence back-to-back — if there's a jarring shift from problem to solution, add a bridge phrase.
- All variations must transition smoothly into the same body opening.
- **All hook variations require voiceover.** If the body has VO, no hook may be caption-only or silent. When a hook variation uses B-roll or lifestyle footage with no on-screen talent, write a VO line and tag it `[AI narrator]` or `[TONY]` per the script's speaker format.

---

## VO Attribution Tags

Every Voiceover cell that is not the creator's own speaking voice must open with a speaker tag in square brackets:

- **`[TONY]`** — Tony Robbins A-Roll. Precedes the transcript of Tony's spoken words for that beat.
- **`[AI narrator]`** — AI or brand narrator VO (recorded or generated voice, not the creator on camera). Use this for every non-creator, non-Tony narration line. Never use "Brand narrator," "Brand VO," or any other variant.
- **Creator/talent voice** — no tag. Absence of a tag means the creator or on-camera talent is speaking. This is the default for UGC, talking head, and testimonial formats.
- **Mixed-speaker beats** — when a beat transitions from one speaker to another, tag each portion separately inline within the same cell: `[TONY] Tony's words. [AI narrator] Narrator continuation.` Never combine into a single tag like `[TONY then AI narrator]`.

---

## Body (0:05-0:45)

- Mechanism over claims. Show HOW, not just WHAT.
- Analogies for complex mechanisms (soldier vs army, cheat sheet, cleanup crew). Compress to one beat, don't expand. Max one analogy per script (see [[Universal Copy Rules]]).
- Sophisticated market. Lean into mechanism and pain where the audience knows the category.
- CGI is sparse. Max 2 cutaways per script body as pattern interrupts or mechanism visualization. Not every milestone or mechanism step needs CGI. Fill the rest with lifestyle B-roll, product shots, or stock footage.
- **Mechanism without benefit is explanation, not advertising.** The body (or close) must include at least one after-state beat — outcome language describing what the viewer personally experiences once the mechanism is addressed. Mirror the specific pain from the hook in its resolved form: "recovery in a day instead of three," "sleep that stays deep," "output stops stalling." A script that only explains the mechanism and names the product has not closed the desire loop. The viewer must be able to picture their specific after-state — not just understand how the product works.

(Specificity, "so that / because" connectors, and product-bridge rules are in [[Universal Copy Rules]].)

---

## Visual & B-Roll Criteria

Applies to every `Visual` column cell and to the Visual Direction block. Tier 1 self-audit runs the 14-rule check below on every script before returning.

**Visual Direction standard (mandatory).** Every script's Visual Direction block must include 5-6 lines covering: b-roll types and sources, caption style, edit pace (target cut frequency), color treatment, and any format-specific visual notes. The benchmark is IM8 T004-T005 level — enough direction that an editor can construct the ad without guessing at the visual approach. Visual Direction must trace to specific visual patterns extracted from the Top Spenders Analysis (edit pace, b-roll categories, color grading, transition types observed in winning ads). A script whose Visual Direction is generic ("aspirational and energetic" or "clean and professional") fails this standard.

**B-roll beat coverage (mandatory).** For VO + B-roll and mixed-modality formats, the Visual column must specify enough b-roll to fill every beat with approximately 2-3 second cuts. A 10-second body beat needs 3-5 distinct shots named, not "lifestyle B-roll." The editor should be able to assemble the sequence from the Visual column alone. Exception: by-design single-modality formats (talking head, selfie walk) where continuous shots are intentional — mark in Visual Direction.

1. **Anchor to References.** Every Visual Direction choice traces to a References-block entry (Top Spender, Format, B-Roll, Visual Treatment, any category). A visual choice with no matching reference is a flag: add the reference or drop the choice.
2. **Cell specificity.** Every `Visual` cell names subject + action + framing + modality. ✅ "Woman 50+ holding a single magnesium bottle, looking unsure — medium shot, soft daylight." ❌ "B-roll of a woman."
3. **Beat alignment.** The shot matches what the VO says in that cell. VO names saffron → saffron or a serotonin-pathway visual is on screen, not a tangential lifestyle shot.
4. **Modality variety (not maximalism).** Across hook + body + close, show **2-3 distinct visual modalities** from the palette: lifestyle B-roll, product shots, CGI/animation, kinetic text / overlay, split-screen, green-screen composite, chart / diagram, UGC direct-to-camera. Target is variety, not kitchen-sink — a script cramming 5+ modalities looks frantic. Pure single-modality loses engagement (flag). Exception: by-design pure-UGC.
5. **Mechanism → cutaway pairing.** Any beat where VO explains a pathway (GABA, serotonin conversion, nutrient absorption) gets an animation / CGI cutaway or overlay assigned in the Visual cell. Don't leave "show mechanism" for the editor to solve.
6. **Source per beat.** Each Visual cell implies its source: brand assets, stock library, CGI, creator-filmed. Ambiguity = editor hunts.
7. **No repeat shots across beats.** Same visual (e.g., "woman drinking IM8") appears max twice in a script — one hero product beat in the close is enough.
8. **Edit-pace descriptor coherence.** If Visual Direction says "fast and punchy," cells imply multiple cuts per beat. If "slow and intimate," cells hold longer shots. Mismatch = flag.
9. **Readable cell formatting.** When a Visual cell stacks multiple elements (B-roll + header card + overlay + kinetic text + product shot), separate each element with `<br><br>` so the editor can scan them as a list, not parse a run-on sentence. Single-element cells stay as prose.
10. **Visual variety floor.** Any body beat lasting ≥10 seconds must specify ≥3 distinct footage types in its Visual cell (e.g., lifestyle B-roll + ingredient overlay + product shot). A single footage type held for 10+ seconds is a Tier 1 flag. Exception: narrative testimonial or other by-design single-modality formats — mark the exception intentional in Visual Direction.
11. **No source citations in Visual cells.** Never write `Source:` attributions, URLs, or provenance markers (e.g., "Source: app.joinelevate.com") inside a Visual column cell. The visual description implies what the editor shoots or pulls. Specific source URLs live in the **Footage** section.
12. **Beat segmentation follows visual change.** Do not split a table into 2-3 second rows if the Visual column repeats the same setup (e.g. "AI talking head continues"). For by-design single-modality talking head or testimonial formats, consolidate continuous spans into one row and state that no B-roll cuts are needed.
13. **VO + B-roll coverage floor.** In VO + B-roll formats, the Visual column must carry the ad: name a new shot or cutaway roughly every 2-4 seconds, or list the ordered shot sequence inside a longer row. Generic placeholders like "Lifestyle b-roll" over a long VO beat are a flag.

### Caption Style Taxonomy

Promoted from the IM8 T002 Working Document's Caption Style Reference. A starter palette mapping caption style → structure fit. New batches extend this table; a style goes fully global once it recurs across 2+ brands.

| Style | Background | Color | Animation | Use For |
|---|---|---|---|---|
| Bold sans-serif + milestone cards | Solid white/red blocks + dark red milestone cards | White body, yellow milestones | Static, abrupt cuts | Progression Timeline |
| Two-tier: sans-serif narration + bold SERIF keywords | Dark red blocks for narration; none for keywords | White on red | Word-by-word pop-in | Mechanism Explainer / Whiteboard |
| Numbered header cards + kinetic text | Transparent / minimal | Brand accent | Fast punchy entrance | Numbered Reasons |
| Medium sans-serif on semi-transparent grey | Semi-transparent grey | White | Static fade | Mixed / neutral |
| Subtitle-only (auto-generated style) | None | White with black edge | Follows speech | UGC / Narrative Testimonial |

---

## Redundancy (All Sections)

A script has four redundancy failure modes. Every script must pass all four before it ships. These apply across hook, body, and close — not just hooks.

1. **Hook ↔ body content overlap.** Any claim, symptom framing, ingredient+dose pairing, mechanism phrase, or payoff line in the hook cannot be restated anywhere in the body. Not just hook's last line vs body's first line — the whole hook against the whole body. If Hook C says "saffron supports serotonin," the body may name saffron but cannot repeat the serotonin mechanism. Hook opens a loop, body enters through a different door.
2. **Within-body pattern repetition.** If the body is a list (numbered reasons, progression milestones, stack items, symptom rundown), at least two distinct sentence scaffolds must appear across beats. A body that runs `[symptom]? [ingredient] at [dose]. [claim].` four times in a row reads mechanical and collapses the pacing. Mix scaffolds: one beat as a question, one as a direct statement, one as a contrast, etc.
3. **Within-script phrase echo.** Same mechanism phrase, product-bridge wording, or benefit word cannot repeat more than once across hook + body + close combined. "Everything menopause depleted" once is a callback; twice is an echo; three times is a cudgel. Grep the script's VO column for repeated noun phrases before returning.
4. **Hook previews body structure beat-by-beat.** If the hook names or implies the body's specific beats in sequence (e.g., "First your sleep improves, then hot flashes ease, then your energy returns" — mirroring what the body delivers milestone by milestone), the body loses its reveal. The hook may open the structure category ("here are 3 things menopause depletes") but must not preview the specific sequence of beats. Test: if a viewer who stopped after the hook can predict the body's exact order, rewrite the hook to open a different loop.

Captions summarizing what the VO is saying is fine and expected — that's mute-channel reinforcement, not redundancy. Redundancy here is about the VO channel repeating itself against itself (hook→body, beat→beat, or line→line).

---

## Close (Final 5-10 Seconds)

Use one close type per script. Distribute across a batch so no type dominates:

1. **Proof cascade** — stat + certification + celebrity/authority. Direct and numbers-heavy.
2. **Authority close** — name a specific doctor/institution, then emotional pivot ("Your [problem] can end today").
3. **Story close** — the story IS the proof. No stats needed.
4. **Ease/simplicity close** — soft, reassuring. ("One band. One purpose. And it actually works.")
5. **Emotional close** — identity-level payoff ("I finally feel in control of my mornings").
6. **Urgency/offer close** — guarantee + scarcity + CTA.

Offer elements (welcome kit, guarantee, discount) go in the platform end card, not the script — unless the close type specifically calls for it (urgency/offer).

**Close CTA diversity.** Before writing any close CTA, scan the scripts file for close VO phrasings already used in the batch. No close CTA may share its primary verb phrase (Start/Get/Run/Begin your labs) AND its trailing phrase (link below / the link is below) with any other script in the same batch. Max 2× same structure across a 15-script batch. Differentiators include: different action verb, different product anchor phrase, different reason-to-act frame (per-day comparison, specific metric, transformation framing). The $49 price anchor must still appear — only the surrounding phrasing changes.

---

## Per-Structure Rules

| Structure | Time to Benefit | Hook Rule | Duration | Key Requirement |
|---|---|---|---|---|
| **Progression timelines** | 5-10s | "From your first sip/night/day" opens with immediate benefit | ~45-60s | 3-4 milestones max; each names the ingredient/mechanism; honest starts ("first sip" energy/joints, "first night" sleep, "Day 14" gut); use days not weeks past month 1 |
| **Talking-head (green screen / whiteboard)** | by 0:30 (Educational mechanism: education before product) | CGI as pattern interrupt; creator enters within 5s | ~30-50s | Alternate full-frame and corner-box every 5-8s; creator references authority, doesn't claim to be one (name the doctor); whiteboard: disqualify alternatives (red X) then reveal pathway (circle); B-roll = labels, nutrient tables, product, athletes, certifications; creator = knowledgeable friend, not doctor |
| **Numbered reasons** | ~3s (each reason IS a benefit) | Each reason runs mini-PAS (problem → product's solve) | 30-50s | Benefits start ~3s; close with ease/simplicity; product reveal can be late |
| **Authority / story** | 15-20s | Story earns the delay | 40-60s | Narrative arc with tension (skepticism, risk, proof) — not endorsement; real details (name, document, moment); max 2 transformation claims per 8s section |
| **UGC / story with narrative thread** | by 0:10 | Story carries the benefit | ~35-50s | Overarching narrative — NOT a quote montage; each clip serves the arc (dismissed → discovered → results); intercut 2-3s B-roll; narrative VO bridges people; if one creator: narrate in third person for a specific customer, OK to switch to direct address |
| **Narrated humor (UGC + B-roll)** | 5-8s (product by sec 5-6) | Humor hook earns attention; product pitch is straight | ~20-30s | Humor = relatable exaggeration, not jokes; self-deprecating builds trust; creator narrates over B-roll, stock, product shots — NOT a filmed skit; don't try to be funny during selling |
| **Podcast testimonial** | Immediate | Product named in first 2s | ~30-50s | Testimonial format — authority guest + product early |
| **Green screen educational** | by 0:15 | Mechanism first, then product | ~30-50s | Format-specific: faster product reveal than general educational; mechanism visualized via green-screen B-roll (labels, nutrient tables, certifications) |
| **AI animated character** | 5-10s (character in frame establishes hook) | Character composited over B-roll from 0:00; establish persona in hook | 30-60s | Alternate full-frame and corner-box every 5-8s; ≥3 visual layers per body beat of ~10s (character frame + B-roll + overlay/CGI); body B-roll = labels, nutrient tables, product, certifications; 2-3 symptoms max (AppLovin 60s cap) |
| **Selfie walk + trending audio** | Immediate (caption-as-hook) | Caption IS the hook — sound-off first; trending audio carries sound-on | ~15s | Single continuous selfie walk, no cuts; persistent on-screen captions throughout (each new line appears as previous stays or fades); only hooks vary across A/B/C — body captions and walk footage identical; one body row with all captions as `<br><br>` block; no separate Close section (fold CTA into body captions) |
| **Text wall + inspirational audio** | Immediate (caption-as-hook) | No VO — captions carry the arc; inspirational IG audio carries emotional energy | 15-30s | 3-5 atmospheric shots TOTAL — B-roll sets mood, does NOT tell the story; text tells the entire arc in short persistent cards (5-8 words max per card, 2-3 cards per shot); one atmospheric shot holds multiple text cards (this is NOT B-roll + captions — do NOT match each caption beat to a new shot); only the opening hook card changes across A/B/C; body captions identical across variations; shame-to-pride arc: struggle → discovery → transformation → payoff; **caption compression rule:** cut connective tissue ("I kept searching," "I signed up that night," "Real equipment. Real skills."); keep specific numbers, key proof points, and emotional payoff lines |

---

## Authority Figure Rules

- If the body references an authority figure ("what he discovered"), every hook variation must establish who "he" is: name in VO, photo + name tag in visual, or title in caption.
- Authority figures not on camera: show their photo with name + short qualifier (3-4 words). Example: "Dr. James DiNicolantonio · 300+ Published Papers."

---

## Partner Angle

- Even when the product is for the individual, a partner beat adds emotional weight.
- The partner doesn't need to be the focus — just present. A single line is enough.
- Exception: when the persona has no romantic partner (teenager in a dorm, single person), a roommate or family member fills the same role.

---

## Alternative Positioning

- Every video script should mention at least 2 failed alternatives the viewer has tried.
- Name them specifically where possible, with prices where known.
- For videos, this can be visual (show the product, dismiss it) or spoken.
- When transitioning from mechanism to failed alternatives, use a connector. Don't jump topics.

---

## Visual Direction

- Give the general vibe and editing approach. Editors have creative freedom with transitions, pacing, and footage selection.
- Specific shots are suggestions, not rigid requirements. "Use warm lighting, empathetic tone, lifestyle B-roll" is good. Shot-by-shot cut lists are unnecessary.
- Only flag vague phrases that are truly meaningless and unactionable.
- **Cross-beat directives only.** Visual Direction captures what applies across the whole script — overall edit pace, overall color palette or shift, format modality, caption-style system. Per-beat specifics (which hook is full-frame vs. corner-box, what each caption says, which visual treatment each beat uses) live in the script table's Visual column and must not be restated here. A bullet that walks through each beat in order ("Hook A full-frame → Hook B no character → body corner-box → close full-frame…") is a redundancy flag — delete it. If a bullet can only be written as a per-beat sequence, the info belongs in the table, not Visual Direction.
- **No header duplication.** If the script's top-of-document header block (above Footage) already lists Caption style, Duration, Close type, or Format, do not repeat those lines in Visual Direction. Cross-reference or drop.

### Format Conventions

- **No `Tone:` filler bullet.** Tone is implicit in caption style + edit pace + visual choices. If a tone descriptor adds nothing the editor cannot already infer from the rest of Visual Direction + References, omit it. Default to leaving it out unless the script genuinely needs a tone instruction the other bullets cannot carry.
- **Sub-bullet format is mandatory.** Parent bullet = category name (B-roll, Edit pace, Color). Sub-bullets = specifics. Never write run-on prose bullets that pack 4+ items into one line. ❌ "B-roll is atmospheric and sequential with flat/cool fluorescent before shots and warm clinical after shots, text pops in on hard cuts at 2-4 seconds each, no filters, white balance shifts naturally" ✅ B-roll parent bullet + shots sub-bullet, separate Edit pace bullet, separate Color bullet.
- Sub-bullet `Edit pace`, `Color`, and similar descriptors when they need detail beyond a single phrase. Keep parent bullets scannable.
- Suggested bullet order when applicable: B-roll/footage approach → Caption style → Color → Edit pace. Skip any line that has nothing brand-new to say.
- **Caption style is already in the header metadata — omit from Visual Direction entirely.**
- Whitespace and condensation rules are in [[Brief Structure|Creative Structure]] → Pre-Content Block Economy. No blank line between a `### Heading` and its first bullet; cut obvious filler; preserve sub-bullet hierarchy.

### Footage Sources vs. References — Where Source Links Live

**Footage section** — raw source links for anything the editor pulls literal assets from: study screenshots, medical journal pages, brand science pages, product unboxing reels, anything cited in the Visual column as a specific screenshot or clip. These are *sources*, not templates.

If there are no real source links or footage needs, omit the Footage section entirely. Never include `### Footage` with `N/A`, `n/a`, `None`, or a note saying no footage is needed.

**References section** — things we *model from*: Notion format entries, Top Spender ads we're borrowing visual treatment from, Visual Treatment techniques. The editor reads these to understand style; they do not pull assets from them.

**Audio section** — specific music, trending audio, or sound-bed links the editor should use or approximate. These live under `### Audio`, not inside References and not inside Footage.

**Rule:** every specific asset called out in the Visual column (a study screenshot, a named science page, a UC Davis article, a brand science page) MUST have a precise link in the **Footage** section (or Editor Notes / Footage Needs if it's a shoot). Never leave the editor to search for a cited source — give them the exact URL and tell them what to screenshot.

- Editors are not researchers. If References only says "use medical journal B-roll," they will grab generic stock and the proof element loses credibility.
- For each cited study (e.g., "UC Davis found 15-25% muscle loss," "ASN 2025 advisory," "12-week clinical trial"), find the actual public-facing URL — university health-system page, journal article landing page, PubMed/PMC, or the brand's own science page — and put it in **Footage**, not References.
- Include one line per source describing what to screenshot (e.g., "title + abstract + 15-25% stat highlighted" or "trial results section: 80% felt they slept better").
- **Never fabricate a URL.** If the study cannot be located, surface it to the strategist before shipping the script. A missing reference is recoverable; a fabricated one breaks trust with editors and audience.

---

## References

References serve editors and designers, not strategists. Only include what helps the person editing the video.

### Category Headings

Group references under bold category headings. The standard set:

- **Format** — links that show the structural template (e.g., whiteboard expert lecture, AI animated character VSL, benefits timeline, numbered listicle).
- **B-Roll** — links that point to a library of footage the editor will pull cutaways from (e.g., CGI medical animations, hand-drawn sketch animation, stock lifestyle reels). Use this label whenever the reference is a *source of footage*, not a styling choice. Most of the time this is what you actually mean — default here.
- **Visual Treatment** — links that show a specific *stylistic* technique applied to footage or comp (e.g., competitive disqualification fade, muted-to-warm color grade, split-screen comparison). Only use this label when it really is a styling choice, not a B-roll library. If in doubt, use **B-Roll**.
- **Top Spender** — top-spending ad references the script borrows from.

Skip any heading with no entries. Add brand-specific or script-specific headings only when none of the standard ones fit.

**Each category heading appears once per References block.** All entries of the same type nest as consecutive bullets under that single heading. Never open a second `**Top Spender**` (or any other category) block in the same script.

### Bullet Hierarchy

- Each reference link is a **parent bullet**. The link text describes what the reference is.
- **Sub-bullets** describe what the editor takes from the reference: compositing style, animation type, caption treatment, color grading, pacing, framing, screenshot target.
- "Ignore" directives nest as sub-bullets under the parent reference, not as floating top-level lines. Example: `ignore green screen framing — this script is B-roll only`.
- Do not mix top-level descriptions and sub-bullets under the same parent. Either everything inline (one short phrase) or everything sub-bulleted (when there are multiple takeaways).
- Keep References blocks tight: no blank lines before category headings (`**Format**`, `**Top Spender**`, etc.) and no blank line between a category heading and its first parent bullet.
- **Motion links default to creative pages.** If the reference is from Motion, use the in-app `projects.motionapp.com/.../creative/<CreativeAsset:id>?startDate=...` URL. Do not use `motionaccountassets.blob.core.windows.net` CDN media URLs as canonical References unless no Motion creative-page URL exists after checking the report/cache. CDN links belong to download/analysis workflows, not editor-facing reference blocks.
- **Audio is not a References category.** Specific IG/TikTok/music links get their own `### Audio` section with one parent bullet per track and optional usage notes.

### What NOT to Include

- No strategy or copy guidance ("simple language," "pain-first approach," "math problem technique," "narrative arc," "root cause framing"). These informed the writing — they are not editor references.
- No top-spender ad just because its language influenced the script copy. Reference it only if the editor will visually borrow from it.
- No internal-only links the editor cannot open.

### Notion References Database

Always search the Creative References Database for relevant entries (CGI techniques, format entries, caption styles) before finalizing References. The database is the cross-brand library of winning visual elements.

---

## Timing & Pacing (Video-Specific Extensions)

Baseline pacing method (syllable-based, 250 spm target, per-line verification) lives in [[Universal Copy Rules]]. Video adds:

- Duration by format: narrated humor ~20-30s · green screen educational ~30-50s · UGC talking-head ~35-50s · podcast testimonial ~30-50s · progression timeline ~45-60s.
- If a line feels rushed at its assigned timestamp, extend the timestamp or split the line. Do NOT cut good VO to hit a time target — extend the time instead.
- When trimming for time, cut from the BODY, not the hooks. Hooks are tested as-is.
- Good trims: throat-clearing phrases ("Here's what's actually happening:"), redundant summaries, wordy connectors. Bad trims: mechanism connectors ("so that," "because"), ingredient specificity, proof points.

---

## Script Delivery Format

Section order (Notes → Brief → Media Buying), References format, Pre-Content Block Economy, and Footage Requests placement are defined in [[Brief Structure|Creative Structure]]. This doc covers video content criteria only.

- No quotation marks around VO text. Scripts are spoken word, not quoted dialogue.
- Triple line dividers (---) between each script for visual separation.
- Study/screenshot source URLs live in Footage, NOT References.

---

## Footage Requests

- One request per script that needs creator filming.
- Each request includes: task title (Brand_Description format), instructions, tone, and a full script table with Time | Voiceover | On Camera columns.
- Time column shows approximate duration per line so the creator can pace delivery.
- Include a note that delivery must roughly match the timestamps because the platform has a time limit.
- "Green screen" means the footage will be edited as green screen — the creator doesn't need an actual green screen, just a non-busy background so it can be keyed out in post.
- Never assume what equipment or setup a creator has. Describe the result you want, not the equipment you assume.

---

## Quality Checklist (Video-Specific)

Generic rules (no em-dashes, specificity, mechanism connectors, max one analogy, no fourth-wall breaks, dollar-amount speech form, percentage-stat "of users" inclusion) are enforced via [[Universal Copy Rules]] and don't need to be re-checked here. The items below are video-script specific.

1. Total syllables fit under target duration at 250 spm (longest hook + body + close)
2. Timestamps match real delivery time per-line (no 30-syllable lines crammed into 4 seconds); the longest body row passes the syllable check at 250 spm — writer evidence report names the row, its syllable count, duration, and calculated spm
3. Hook captions carry a different angle from VO — not verbatim, not near-verbatim, not restating the same payoff (run the self-audit before output, not after)
4. Hook captions work as standalone headlines on mute
5. Hook C uses a different visual style from A/B
5a. At least one hook variation uses a sound-off visual pattern interrupt: a relevant first-frame action or reveal that creates curiosity before the VO claim is understood. Routine product close-ups, alternate B-roll, survey graphics, and ordinary CGI overlays do not qualify on their own.
6. No formatting labels in caption cells (no "**Milestone card:**")
7. No special characters or fancy unicode in captions (no middle dots, no em-dashes); ❌/✅ markers allowed only for failed/working alternative blocks
8. Multi-card captions stack with `<br><br>`, never with " - " dash separators
9. No quotation marks wrapping VO text
10. Recognized people named in hook captions (name, not pronouns)
11. Product bridge is unique to this concept (not copied from model script)
12. Close type is assigned and varied across the batch
12a. Before finalizing close VO, grep `scripts_file` for the exact close CTA phrase you have written. If it appears more than once (counting this script), rewrite until the count is 1. Evidence line: "CTA uniqueness — grep '[close phrase]' = 1 match ✅" — recurred in 4 scripts, IM8 T005
13. Redundancy audit passes all four forms (see Redundancy section): no hook↔body content overlap, no repeated sentence scaffold across body list beats, no within-script phrase echo across hook+body+close, no hook that previews body beats in sequence
13a. Hook-to-Body Transition Verification table populated from the actual final body VO — not from a draft. Read the body's first cell and paste the opening VO sentence directly into the "Body's First VO Line" column. Evidence line: "Transition table — pasted from body row [timestamp]: '[exact first VO sentence].'" — recurred in 2 scripts, IM8 T005
14. All hook variations transition smoothly into the same body opening
15. Persona's condition appears in every hook (VO or caption)
16. Hook captions name something the viewer FEELS
17. At least 2 failed alternatives mentioned or shown
18. Close caption stacks proof points instead of repeating the VO
19. No competitor brand names (use solution categories unless brand permits)
20. Compliance hedging where needed (structure/function claims are fine without "may")
20a. Approved clinical stats include the "of users" qualifier in both VO and captions, exactly as specified in the brand's Guardrails doc — never abbreviated. VO: "Ninety-five percent of users felt more energy" not "Ninety-five percent felt more energy." Evidence line must quote the exact stat phrase with "of users" confirmed present — recurred in 2 scripts, IM8 T005
21. Brief includes format one-liner, reference links, and footage links only when actual sources/requests exist
22. Visual Direction has no `Tone:` filler bullet; descriptors sub-bulleted where they need detail
23. References use category headings + parent-link/sub-bullet hierarchy; no strategy/copy guidance
24. If Visual Direction calls for journal/study B-roll OR any specific cited screenshot, Footage section includes the precise source URL + what to screenshot (NOT References)
25. Editor Notes omitted when only boilerplate (no "follow hooks closely / use judgment for body / visual descriptions are suggestions" blocks left in the script)
26. No blank line between any `### Heading` and its first bullet across Editor Notes, Audio, Footage, Footage Needs, Visual Direction, References; no blank lines inside References before category headings or between category headings and parent bullets; no obvious filler ("appears on beat with voiceover," `Tone:`, throat-clearing connectors); no References sub-bullet that merely restates the parent link's name; no empty `### Footage` sections
27. Visual quality passes 13-rule audit (anchor to References, cell specificity, beat alignment, modality variety 2-3, mechanism→cutaway pairing, source per beat, no repeat shots, edit-pace coherence, readable cell formatting, visual variety floor ≥3 types per ≥10s beat, no `Source:` citations in Visual cells, beat segmentation follows visual change, VO + B-roll coverage floor — see [Visual & B-Roll Criteria](#visual--b-roll-criteria))
28. Each cited URL verified to support the specific claimed stat — not just the general topic (the linked page must contain the specific percentage, number, or range stated in VO; a page on-topic but lacking the specific figure is a fabricated-stat risk — surface to strategist before shipping). **Exception:** stats used verbatim from the account's own existing creative are pre-approved — note the source ad in the Footage section (e.g., "stat from Ad 03") and move on; do not add a blocker.
29. Any body beat ≥10s specifies ≥3 distinct footage types in its Visual cell, or the single-type treatment is marked intentional in Visual Direction (per Visual & B-Roll rule 10)
30. At least one after-state / benefits beat present — outcome language mirroring the hook's pain in resolved form ("recovery in a day instead of three," "sleep that stays deep"). Can be in the body or close, but must exist. A script with only mechanism + product bridge has not closed the desire loop.
31. All hook variations have a VO line — no hook is caption-only or silent when the body has voiceover (see VO Attribution Tags section)
32. Each References category heading appears exactly once per script — all entries of the same type under one heading, never duplicate headings (e.g., two `**Top Spender**` blocks)

### Brand-Specific Checklist Items

Add these per brand in the Working Document:
- Mechanism claims defensible against brand's science doc (e.g., FitSleeps: no "brain can't habituate to vibration")
- Partner angle present where required by brand rules
- Humor register matches brand tone (some brands encourage, others don't)
- Creator perspective congruent (a female creator says "my partner" not "my wife" if applicable)
- Guarantee phrasing matches brand standard (e.g., "100 nights" not "100 days")
- Brand-specific ingredient counts, dosages, and approved stats match current confirmed numbers

### Cross-Batch Checks

Run after all scripts in the batch are written:

1. No two scripts use the same product bridge phrasing
2. No two scripts have near-identical close sections
3. Close types are properly distributed (check against the distribution table)
