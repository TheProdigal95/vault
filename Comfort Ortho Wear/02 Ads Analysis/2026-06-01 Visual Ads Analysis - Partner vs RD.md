---
cssclasses:
  - table-wide
  - wide
---
# Visual Ads Analysis - Partner vs RD

Date: 2026-06-01

Scope: diagnose the gap between the video visuals we brief and the visuals appearing in newly launched partner winners. This is an analysis document only. No brief, script, criteria, or ClickUp changes were made from this review.

---

## Data Pull

Motion workspace: `WearOrtho`

Pull used:

```bash
motion-pp-cli pull --brand WearOrtho --date-preset last_30d --top 100 --json --no-cache
```

The Motion CLI pull does not expose a direct title-search flag. `RD_` can be used reliably to isolate our launches after the pull. The partner side requires a broader read because its winning creatives span multiple naming conventions:

- `RD_` prefix = Reach Digital cohort
- `INT_` prefix = one identifiable partner launch bucket
- `Kyro`, `Aubrey`, `Zirian`, `Kashif`, `TOF`, and `RTG` names = additional partner or account-history creatives that must be inspected separately
- Launch date is embedded in the title, for example `INT_05.28.26_...` or `RD_05.14.26_...`

The first pass treated `INT_` as the partner boundary. That was too narrow and excluded several of the account's largest Kyro winners. Motion metrics below use the last-30-days reporting window. Launch timing is inferred from the title where a date is present, not from a platform-created timestamp.

### Prefix Snapshot

This table is useful for isolating our launches and the identifiable `INT_` bucket. It is not a complete partner-versus-RD total.

| Prefix bucket | Tagged rows in top 100 | Spend | Purchases | Rows typed as video | Video spend | Video purchases |
|---|---:|---:|---:|---:|---:|---:|
| Identifiable partner launches (`INT_`) | 30 | $48,320.61 | 750 | 19 | $27,560.54 | 408 |
| Reach Digital (`RD_`) | 13 | $7,063.02 | 87 | 3 | $401.67 | 0 |

### Kyro Winner Family

Kyro is a major part of the comparison, not a secondary example. Name-matched Kyro rows account for approximately `$143,642` in spend and `2,550` purchases inside the current top-100 pull. This includes the overall rank-1 creative.

| Rank | Creative | Spend | ROAS | Purchases | CTR |
|---:|---|---:|---:|---:|---:|
| 1 | `TOFv5_CV3 \| Kyro373v3hook2` | $51,082.18 | 1.53 | 859 | 6.98% |
| 4 | `TOFv1_GE1 \| Kyro_293_3_V2` | $16,002.59 | 1.39 | 230 | 5.56% |
| 5 | `TOFv5_CV3 \| Kyro373v3hook2 - Copy` | $15,982.03 | 1.53 | 273 | 5.62% |
| 6 | `TOFv1_GD2 \| Kyro_293_1_V1` | $12,886.92 | 1.37 | 200 | 4.62% |
| 7 | `INT_05.12.26_Nurse Quiz Page_Kyro362v3 hook1 - Copy 3` | $12,206.78 | 1.25 | 167 | 3.87% |
| 8 | `TOFv5_X1 \| Kyro362v3 hook1` | $10,950.11 | 1.69 | 191 | 5.05% |

The `RD_` video rows received very little spend because they lost the auction against stronger creatives. That is the outcome to explain. The comparison below therefore asks:

1. What the Kyro-led partner winners visibly do.
2. What our launched RD video edits visibly do.
3. What all 39 local T001-T003 scripts ask editors to produce across 114 hook variants and their body sequences.

---

## Gemini Sample

Source videos were fetched from Motion's creative-assets endpoint and analyzed with Gemini visual breakdowns. Copy variants that resolve to the same source creative are omitted from the sample table.

### Kyro Videos

| Creative ID | Representative ad | Spend | ROAS | CTR | Why sampled |
|---|---|---:|---:|---:|---|
| `69f8c1b8bb87ba4bd12d60ae` | `Kyro373v3hook2` | $51,082.18 | 1.53 | 6.98% | Overall rank-1 creative |
| `69dea50ae23fb809277a03fd` | `Kyro_293_3_V2` | $16,002.59 | 1.39 | 5.56% | High-spend travel comparison |
| `69dea4dde23fb8092779e6f1` | `Kyro_293_1_V1` | $12,886.92 | 1.37 | 4.62% | High-spend nurse ranked comparison |
| `69dea514e23fb809277a1358` | `Kyro_299_2_V1` | $4,782.33 | 4.21 | 4.00% | Strong RTG Kyro variant |

### Supporting Partner Videos

| Creative ID | Launch | Representative ad | Spend | ROAS | CTR | Why sampled |
|---|---|---|---:|---:|---:|---|
| `69dea4c6e23fb8092779d8d3` | 05.12 | `Kyro362v3 hook1` | $12,206.78 | 1.25 | 3.87% | Highest-spend tagged partner video |
| `6a0b2934386f399701da0adf` | 05.13 | `Aubrey ... Top5Shoes` | $9,946.15 | 1.66 | 7.77% | High-spend creator-led ranked comparison |
| `69dea4d5e23fb8092779e21a` | 05.12 | `851 ... WeReviewedFiveMostPopular12HourShiftShoes` | $2,258.73 | 1.60 | 4.77% | Ranked comparison variation |
| `6a186cb85973d5b54f7795a3` | 05.28 | `COM49_Teacher Traveling Yapper` | $1,072.26 | 2.22 | 5.75% | New travel launch with encouraging early read |
| `6a18747e5973d5b54f82265c` | 05.28 | `Kyro390v1_H5` | $871.68 | 1.91 | 5.07% | New authority-style launch with encouraging early read |

### RD Video Comparators

| Creative ID | Launch | Representative ad | Spend | ROAS | CTR | Why sampled |
|---|---|---|---:|---:|---:|---|
| `6a0323de127c5b390b0331ab` | 05.12 | `3 Shoe Ranked Comparison_02_T001_V1` | $176.25 | 0.00 | 2.52% | Highest-spend launched RD video |
| `69fe321ed0e26cf1498053b0` | 05.08 | `500 Nurses PF Survey_05_T001_V2` | $90.15 | 0.00 | 4.41% | RD survey-format comparator |

---

## What Kyro-Led Winners Are Doing

### 1. Hooks Make The Premise Legible Immediately

The strongest partner hooks are understandable quickly with sound off. Some use an obvious visual event. Others use native footage plus a sharp captioned premise. Kyro proves that the rule is not "every hook needs a stunt." The standard is that the viewer understands the tension immediately.

| Video | First visual beats | Why it interrupts |
|---|---|---|
| `Kyro373v3hook2` | Airplane-window and Positano footage under the caption: `The worst travel advice I ever got was "just wear your comfortable sneakers."` | Native travel footage plus a contrarian claim. The viewer immediately understands that a common belief is about to be attacked. |
| `Kyro_293_3_V2` | Busy European street at night, rapid shoe shots, then travel scenery under: `Think sneakers are the most comfortable shoes for travel? We tested five...` | The setting and question establish a test the viewer can follow without waiting for context. |
| `Kyro_293_1_V1` | Hands tie athletic shoes, then rapid cuts across shoe types under: `TOP 5 SHOES FOR NURSES`. | The ranking promise is visually immediate and creates an open loop. |
| `Kyro362v3 hook1` | Three nurses in scrubs walk around a hospital room wearing high-heeled boots. Rapid cuts to nurse feet in different shoes. | The heels are incongruous in a hospital. The survey VO is supported by immediate visual variety. |
| `Aubrey ... Top5Shoes` | Creator smiles at camera, then rapidly holds up Crocs, Skechers, Dansko, and Hoka shoes. | The shoe collection makes the ranking premise obvious before the explanation finishes. |
| `COM49_Teacher Traveling Yapper` | Woman holds the product beside a comment bubble, looks directly into camera, then says not to wear Skechers to Europe. | A human face, a prop, a comment, and a direct warning land in the first two seconds. |
| `Kyro390v1_H5` | Doctor appears beside a floating Hoka product image and rating. | The authority frame and category judgment are visually immediate. |

The common pattern is not cinematic B-roll. It is a legible visual premise.

### 2. Every Spoken Clause Gets A Literal Visual

The Kyro edits cut densely through a broad clip bank. They do not wait for one scene to carry a paragraph. When the VO says cobblestones, the screen shows cobblestones. When it says swollen feet, the screen shows a swollen foot. When it says narrow toe box, a shoe is discarded or squeezed. When it says benches, the screen shows the traveler sitting on a bench.

This makes even long videos easy to follow because the picture refreshes constantly and each shot answers the current sentence.

### 3. B-Roll Is Physical, Literal, and Cheap to Read

Partner winners repeatedly use simple demonstrations:

- Hands compress foam until it visibly flattens.
- A creator squeezes a clog or toe box.
- A nurse rubs her foot, limps, bends over, or holds her lower back.
- Shoes are held up, removed from boxes, discarded into a trash can, or compared side by side.
- Dollar bills are held beside expensive options.
- Water is poured onto a floor before the shoe steps through it.
- Feet walk on hospital tile, concrete, brick, cobblestones, stairs, and puddles.
- An insole is pulled out and shown directly to camera.

The proof is usually readable in one glance. It does not require a viewer to interpret a polished narrative sequence.

### 4. Continuity Is Optional

Some partner videos use a stable speaker frame as the organizing device:

- Creator holding shoes and ranking them.
- Teacher holding the product and telling a specific travel story.
- Doctor rating competitors while product images appear beside him.

Kyro also shows that the edit does not need one consistent character, location, or production treatment. `Kyro_293_3_V2` moves rapidly across city streets, cobblestones, tourist locations, gym floors, suitcases, sandals, product shots, and different people. The through-line is the argument, not visual continuity.

### 5. The Editing Grammar Is Native and Dense

Repeated edit traits:

- Frequent 1-3 second cuts, especially in the hook and competitor-failure sections.
- Many ordinary clips rather than one visually consistent character, location, or grade.
- Mixed shot quality is acceptable: direct-to-camera footage, phone-like product handling, feet POV, simple overlays, reviews, and product shots coexist.
- Captions often closely mirror the VO, making the story highly legible with sound off.
- Simple overlays do most of the work: scores, prices, arrows, red `X` marks, green glow, comment bubbles, and short verdicts.
- CGI or anatomy visuals appear as supporting proof, not as the primary visual language.

The winning videos feel assembled from highly legible proof clips. They do not depend on a polished, continuous mini-film.

---

## What Our Launched RD Videos Are Doing

### `3 Shoe Ranked Comparison_02_T001_V1`

This edit is strategically close to the partner ranked-comparison winners:

- Hook: hospital walking shot followed by a three-panel split screen.
- Body: Skechers, Hoka, orthotics, then ComfortWear.
- Proof: rotating product shots, foam-compression animation, hospital walking, cash beside orthotics, arch-support overlays.
- Pace: generally 1-3 second cuts.

The weakness is not the structure. It is the visual emphasis. The opening is informational and polished, but it does not have the same human prop-driven interruption as a creator rapidly holding up a shoe collection or nurses walking in heels. The edit spends more visual attention on diagrams and staged coverage than on visceral physical moments.

### `500 Nurses PF Survey_05_T001_V2`

This edit is closer to the partner grammar:

- Opens with a nurse rubbing her foot.
- Shoes are tossed onto the floor.
- Feet stand on clear blocks to demonstrate failed support.
- Hoka gait is shown through walking footage.
- Orthotics are handled physically.
- ComfortWear appears with product handling and foot overlays.

This is directionally the stronger visual model inside the RD sample, but it only received $90.15 of spend in the current window. The auction outcome is still weak; there is simply not enough delivery to isolate which visual factor caused it to lose.

---

## What We Have Been Briefing

The local audit covered all 39 T001-T003 scripts and 114 hook variants. The briefs contain several strong physical hook ideas, especially in T003 after the recent pattern-interrupt pass:

- Expanding balloon or gel prop inside a narrow shoe versus StretchFit knit.
- Clog sliding on wet hospital tile, followed by the nurse reacting with alarm.
- `SCAM OR REAL?` note landing over orthotics, shoe, and receipts.
- Long receipt unrolling beside `$300` orthotics before a `$60` shoe stops the roll.
- Trash bag of worn-out sneakers dumped onto a table.
- Suitcase zipper popping back open before extra shoes are removed.
- Passport-style `FAILED` stamps landing on travel shoes.
- `1 STAR` stamp flipping to `5 STARS`.

The gap is not that the briefs contain zero strong ideas. The gap is consistency. The default visual columns and body sequences are still significantly more authored than the partner winners. Common asks include:

- One consistent AI nurse or traveler character across scenes.
- Hospital corridor, break room, parking lot, patient-room, airport, museum, hotel, and piazza coverage.
- Desaturated pain states shifting into warm solution states.
- Structured 2-3 second cuts with slower 3-4 second mechanism beats.
- 3D joints, plantar fascia animations, cross-sections, toe-splay arrows, pain glows, arch overlays, and CGI feature reveals.
- Narrative sequences such as Hour 1 vs Hour 12, Day 1 vs Day 5, or a full travel transformation.

There are good directions inside T003 that move closer to the winning visual grammar:

- Clog on wet hospital tile versus ComfortWear on the same surface.
- Handheld unboxing with imperfect framing.
- Stretching the knit upper and pressing the sole on tile.
- Pile of worn-out cheap sneakers beside one intact ComfortWear pair.
- Cash and price comparisons placed physically beside shoes.

Those directions work because the viewer can understand the point without waiting for the VO.

---

## Where We Are Missing the Mark

| Area | Partner winners | Our briefing tendency | Gap |
|---|---|---|---|
| Hook visual | Immediate premise: action, prop, ranking, contrarian caption, oddity, or judgment | Establishing B-roll, product beauty shot, split screen, or mechanism setup | The first frame often explains slowly rather than making the tension instantly legible. |
| B-roll purpose | One-glance physical proof or literal match for the current sentence | Illustrative coverage for a larger VO paragraph | We brief too many scenes that decorate the claim instead of demonstrating the active sentence. |
| Production style | Native, mixed-quality, clip-bank feel | Cohesive mini-film with continuity and color grammar | We may be overproducing coherence at the expense of scroll-stopping density. |
| Continuity | Optional; the argument connects the clips | One consistent AI character or location across scenes | We are spending creative effort on visual continuity that the winners do not require. |
| Mechanism visuals | Short supporting insert | Frequent CGI and anatomy emphasis | Mechanism proof is useful, but we are treating it as the default visual solution. |
| Pain visualization | Visible body behavior: limp, bend, rub, discard | Red glow, desaturation, or explanatory overlays | The partner edits show pain more physically and immediately. |
| Sound-off readability | Captions closely track the spoken point | Caption system often tries to add a second message | Partner edits prioritize fast comprehension over channel separation. |
| Editing rhythm | Dense 1-3 second evidence clips, often one visual per spoken clause | Prescribed 2-3 second rhythm with slower mechanism holds | Our pacing rules are orderly, but the strongest Kyro edits feel more opportunistic, varied, and compressed. |

---

## Working Interpretation

The visual problem is not that our scripts are too weak or that we need more elaborate B-roll. The evidence points in the opposite direction.

We are often briefing visuals as if the editor is building a coherent short-form commercial. The Kyro-led winners behave more like dense native evidence sequences: a sharp premise, constant visual refresh, literal matches for each spoken clause, physical demonstrations, ordinary footage, visible discomfort, and simple overlays.

The useful strategic shift to discuss is:

> Brief fewer illustrative sequences. Brief a legible first-frame premise, then require each spoken claim to earn a literal proof clip.

This does not mean every shot needs to be bizarre, or that CGI, anatomy overlays, and polished scenes should disappear. It means those assets should support the argument rather than become the default visual language.

---

## Questions Before Changing The System

1. Should each video brief identify one explicit first-frame visual premise or event before the rest of the B-roll is written?
2. Should we brief a reusable physical-proof clip bank separately from concept-specific scenes: foam compression, shoe toss, wet-floor grip, toe-box stretch, insole pull-out, limp, foot rub, cash beside shoes, trash pile?
3. Should each body row be checked for a literal visual match to the current spoken clause rather than a general illustrative montage?
4. Should CGI be capped to one or two short mechanism inserts per video unless the concept is explicitly educational?
5. Should caption rules be revisited for these native edits, given that partner winners often prioritize sound-off repetition and direct legibility?
6. Should the next comparison separate visual-hook tests from full-body visual rewrites so we can learn whether the main issue is the first three seconds or the full editing grammar?
