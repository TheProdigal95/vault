# ClickUp Integration

## Detecting the current strategist

**On every new session, detect who is using the system** before creating any ClickUp tasks:

1. Check if `00 Global/Hermes/strategist.json` exists in the project root. If it does, read the strategist name and ClickUp ID from it.
2. If the file doesn't exist, run `whoami` and `git config user.name` to try to match against the team roster below.
3. If no match, ask: "Which strategist are you?" and save the answer to `00 Global/Hermes/strategist.json`:
   ```json
   { "name": "Kylie McCreary", "clickup_id": "75585377" }
   ```
4. This file is gitignored — each person's machine knows who they are permanently.

**All ClickUp task assignments use:** the current strategist + Diksha Sharma (lead designer who distributes work). This applies to every task type — brief loads, video script loads, anything else — unless the strategist explicitly says otherwise. Footage Requests are the one standing exception (strategist + Karra Worang, see below).

## Team roster

| Name | ClickUp ID | Role | Email |
|---|---|---|---|
| Marcelo Acosta | 87415563 | Creative strategist | marcelo@reach-digital.co |
| Kylie McCreary | 75585377 | Creative strategist | kylie@reach-digital.co |
| Michael Starr | 81508885 | Creative strategist | michael@reach-digital.co |
| Cristina Cepeda | 75446242 | Creative strategist | cristina@reach-digital.co |
| Karra Worang | 87362004 | Creator / footage | karra@reach-digital.co |
| Diksha Sharma | 75430705 | Lead designer | diksha@reach-digital.co |

## Brand → Creative Briefs list

Every brand has ONE Creative Briefs list. Both static briefs and video scripts always load into this same list — there is never a separate Video Scripts list. Use the IDs / URLs below; do not search for a list by name and guess, because brands often have multiple "Creative Briefs" lists left over from folder duplication.

| Brand | List ID | Entry URL | Notes |
|---|---|---|---|
| IM8 | `901113419033` | https://app.clickup.com/36744350/v/l/6-901113419033-1 | Creative Briefs list. Both briefs and scripts go here. |
| Elevate | `901104143324` | https://app.clickup.com/36744350/v/l/6-901104143324-1 | Folder `90112227864` in Active Client Space. Duplicate `901111859965` (trailing space in name) is NOT active — ignore it. |
| Lifeforce | `901113128100` | https://app.clickup.com/36744350/v/l/131b4y-18831 | Folder `90117605651` in Active Client Space. |
| Stellar Sleep | `901113639668` | https://app.clickup.com/36744350/v/l/6-901113639668-1 | Folder `90117903610` in Active Client Space. |
| Comfort Ortho Wear | `901113706036` | https://app.clickup.com/36744350/v/l/li/901113706036 | Creative Briefs list. Both briefs and scripts go here. |
| Stepful | `901113894694` | https://app.clickup.com/36744350/v/l/6-901113894694-1 | Folder `90118025914` in Active Client Space. |

**Fallback when a brand isn't in this table OR when a brand has multiple candidate "Creative Briefs" lists:** do not ask before proceeding. Match the brand folder in this vault to the brand space in ClickUp. Find the Creative Briefs list in that space; if multiple exist, pick the one that is **most populated AND most recently active** — that is the live list; the others are dead duplicates from folder copies. After loading, append the brand row to the table above so the next run doesn't need the fallback.

## GitHub accounts

For vault repo and tool repo collaborator access:

| Name | GitHub username |
|---|---|
| Kylie McCreary | `kylie-mccreary` |
| Archit (IM8 CEO) | `rcht-blip` |

## Loading briefs and scripts

**CLI tool:** `$HOME/go/bin/clickup-pp-cli` — handles all vault-to-ClickUp loading. Command reference: `00 Global/Hermes/Commands/clickup-load.md`.

```bash
# Load scripts (auto-detects brand, list, task type)
$HOME/go/bin/clickup-pp-cli load "IM8/T003 Scripts.md"

# Load briefs
$HOME/go/bin/clickup-pp-cli load "Comfort Ortho Wear/T001 Briefs.md"

# Dry-run to preview
$HOME/go/bin/clickup-pp-cli load "IM8/T003 Scripts.md" --dry-run

# Footage request from script entry
$HOME/go/bin/clickup-pp-cli footage-request --script-file "IM8/T003 Scripts.md" --slug "GLP1" --title "IM8_Greenscreen GLP1 Muscle Recovery"
```

## Google Sheets tracker sync — paused

ClickUp → Google Sheet sync is a planned one-directional ops build, not an active workflow. Do not create Sheet rows, update trackers, or add sync behavior to `clickup-pp-cli` until the strategist provides the current tracker structure.

Blocked inputs:
- Sheet URL(s) and whether tracking is one sheet per brand or a master sheet.
- Column names and required row fields.
- Status mapping from ClickUp production statuses to client-facing tracker statuses.
- Where public asset links live once a task is approved.

Intended flow once specified: ClickUp remains the production source of truth; the Sheet mirrors task status for client visibility. No reverse sync from Sheet to ClickUp.

The rules below apply to BOTH static briefs and video scripts. Everything loads into the brand's single Creative Briefs list. The only things that differ between briefs and scripts are the `Task type` custom field value and the status string.

- **Never load to ClickUp unless explicitly told to.** Wait for "load to ClickUp," "push to ClickUp," or similar instruction. This applies to briefs, scripts, and any other task creation.
- **Finding the right list:** Check the "Brand → Creative Briefs list" table above. If the brand isn't there, use the fallback rule (match brand folder to ClickUp space; if multiple candidate "Creative Briefs" lists exist, pick the most populated + most recently active). After resolving, add the brand to the table.
- **One task per brief or script.**
  - **Task name = the file slug** — the identifier line in the source doc, formatted `Reach Digital_[Brand]_[Concept Type]_[Name]_[##]_[T###]`. For example, `Reach Digital_IM8_Education_GLP1 Muscle Loss Explainer_13_T002`. The concept type is a high-level category (Testimonial, Education, Side by Side, Product Showcase, Humor, Barriers to Entry, etc.) — see the full taxonomy in `00 Global/Process/Brief Structure.md` → Section Order → Slug. That exact slug string is the task title. Do not paraphrase, do not use the `## Script #X — ...` heading, do not use the Concept/Persona metadata block.
  - **Task description = everything that comes after the slug, up to and including the Close section (for scripts) or the final designer-facing section (for briefs). Nothing after.** Any QA / verification / internal block that lives after the final designer-facing content is excluded.
    - **Video scripts** — include: Editor Notes, Footage, Footage Needs (if present), Visual Direction, References, Study Sources (if present), Hook Variations A/B/C (full tables), Body (full table), Close (full table). Stop there. **Exclude: Hook-to-Body Transition Verification** and anything after it.
    - **Static briefs** — include every designer-facing section from the first section after the slug through the last one (Format specs, Image Direction, Designer Note, Mandatory Disclaimer, References, Diagram Example if present, headline/pill/CTA variations). **Exclude: Primary text, platform headline, CTA button** (those are media-buying fields, not design) and any critique/verification block that may live at the end of the brief entry.
  - If the source doc evolves and adds new sections between the slug and the Close / final designer-facing section, those are included by default — the rule is positional (slug → Close/final), not a fixed section list.
- **Default task settings (briefs AND scripts, identical):**
  - Assignees: **current strategist** + Diksha Sharma. Always both. No exceptions unless the strategist explicitly names a different assignee in the request.
  - Priority: normal (unless told otherwise).
  - Status: `brief approved, in design` for both briefs and scripts. This is the canonical starting status for all creative work in this list.
  - Custom field `Task type`: `Static ads` for image briefs; `Video ads` for video scripts.

## Footage Requests

When scripts require creator filming (green screen, UGC, talking head), create footage request tasks in ClickUp.

- **Never create footage requests unless explicitly told to.** Same rule as briefs — wait for the instruction.
- **Finding the right list:** Active Client Space → Content Production space → "Footage Requests" list. Use `clickup_get_list` with list name "Footage Requests" to find the ID.
- **One task per footage request.** Task title = `[Brand]_[Format] [Angle]` (e.g., "IM8_Greenscreen Muscle Recovery").
- **Task description includes:**
  - Instructions for the creator (filming setup, tone, what to film)
  - Timing note about platform time limits
  - Hook variations table: `| Time | Voiceover | On Camera |`
  - Body + Close table: `| Time | Voiceover | On Camera |`
  - Note about green screen: "You don't need an actual green screen. Just find a background that's not too busy so we can key it out."
  - Note to film each line as a separate take
- **Task settings:**
  - Assignees: **current strategist** + Karra Worang (87362004)
  - Status: "Footage Requested"
  - Priority and due date as instructed

## Briefs waiting on footage

When a brief in the Creative Briefs list requires footage that hasn't arrived yet:
- **Add a comment on the brief task** saying "Waiting on footage from Karra for this one"
- **Tag Diksha Sharma** (ClickUp ID: 75430705) in that comment so she's aware of the dependency
- Use `clickup_create_task_comment` to add the comment
