# sheets-tracker-sync — ClickUp tasks → Google Sheets brand tracker

**Use this whenever the strategist says any of:**
- "load T00X to the tracker" / "push T00X to the sheet" / "update the [Brand] tracker"
- "sync ClickUp to the sheet" / "add these to the tracker"
- "set up the tracker for [Brand]" (initial creation / brand onboarding)
- After a `T00X Scripts.md` has been pushed to ClickUp and now needs to land in the per-brand Google Sheets tracker
- "tidy the [Brand] tracker" / "fix the [Brand] tracker formatting"

**What it does:** Reads the ClickUp tasks for a brand's Creative Briefs list, syncs them into the per-brand Google Sheets tracker ("X x RD | Ad Creative Tracker") with the right formatting (TABLE structure, dark-gray separator rows between batches, numbered data rows, dropdown status columns, Air share-link hyperlinks), the right status mapping (ClickUp status → Sheets status vocabulary), and the right links (Air share URLs from ClickUp comment bookmarks, rendered as clickable hyperlinks).

**Read these before the first invocation in a session:**
- `00 Global/Process/Sheets Integration.md` — the full Sheets tracker standard (status vocabulary, batch structure, formatting gotchas, click patterns)
- `00 Global/Hermes/Commands/clickup-load.md` — how the canonical ClickUp auth + load flow works (this skill consumes ClickUp, doesn't push to it)

---

## When to use

- **Adding a new batch** (e.g., T003 of Stellar Sleep) to an existing tracker that has T001, T002 in it. Read the existing sheet, find the last batch row, append.
- **First-time setup for a new brand.** A new tracker doesn't exist yet; you need to create it (`sheets.spreadsheets.create`) with the standard TABLE header, then add the first batch.
- **Fixing a broken tracker.** Status dropdowns were lost, separator row color is wrong, hyperlinks aren't clickable, etc. The fix is per the pitfalls in `Sheets Integration.md`.

## When NOT to use

- For pushing vault briefs/scripts to ClickUp → use the `clickup-load` skill instead. This skill reads from ClickUp, doesn't write to it.
- For ad-library pulls → use `ad-library`.
- For static-image generation → use `generate-static`.

---

## Workflow (the canonical steps live in the command file)

The full numbered steps are in `00 Global/Hermes/Commands/sheets-tracker-sync.md`. High-level:

1. **Identify the brand and ClickUp list.** Cross-check `team_to_clickup.json` at the vault root and the brand folder's `00 Context/`.
2. **Read ClickUp tasks for the list** using `$HOME/go/bin/clickup-pp-cli` (canonical, fast) — or direct `curl` if the CLI is broken. Get the tasks' name, status, date_created, and **comments** (where the Air bookmark lives).
3. **Read the existing Google Sheets tracker** to find the last batch and the next free row. Use the `google-workspace` skill's `sheets read` for values, direct Sheets API for formatting.
4. **Decide batch grouping.** Tasks with a numeric prefix `01`, `02`, `03` (or any 2-digit prefix) belong to the same batch. The first numeric prefix encountered defines the batch.
5. **Write the separator row** (`T00X Batch`) with dark gray bg `#434343` + white bold text + 2px bottom border (see Sheets Integration.md "batch standard"). Apply formatting to **all 6 cells** in the row, not just the ones with text.
6. **Write the data rows** in numeric order. Status and Launch Status columns get values from the dropdowns (no cell colors — the toggle colors are set in the Sheets UI). Air link goes in column E as a `=HYPERLINK(url, display_text)` formula.
7. **Verify** the batch by reading the result and confirming:
   - All rows are within the table's range
   - The separator row has the full dark gray bg
   - Hyperlinks are clickable (formula present, not plain text)
   - Status values are in the dropdown vocabulary (no free-text "Done" or similar)
   - **Every task in the batch has an Air link** — if any task is missing one, the data is incomplete (the editor/designer hasn't posted the asset yet, OR the walker missed it)
8. **Document** any new status values (e.g., if T003 introduced "In progress" or "Scrapped" for the first time) by patching `00 Global/Process/Sheets Integration.md` "Status vocabulary" section.

## Air link extraction — use the script (don't reinvent)

The Air share link lives in a ClickUp comment's **rich-text array** (the `comment` field, NOT `comment_text`). The link can appear in three different element shapes depending on how the editor pasted it:

- **`bookmark`** block (most common, original "Copy share link → paste in ClickUp" flow): `{type: bookmark, bookmark: {service: custom, url: ...}}`
- **`link_mention`** block (Vishnu's "done [link] @Marcelo Acosta" inline style): schema varies by ClickUp version, so the script serializes the whole block to JSON and regexes for `app.air.inc`
- **Plain text** in `comment_text`: same regex on the rendered string

**Use the canonical script — don't write your own walker:**

```
~/.hermes/profiles/reach-digital/skills/reach-digital/sheets-tracker-sync/scripts/extract_air_links.py
```

Run it directly: `python3 extract_air_links.py <task_id> [<task_id> ...]` or pipe IDs in. Each output line is `<task_id>\t<air_url>` (empty URL means the editor hasn't posted the asset). Reads the `pk_` token from `~/.config/clickup-pp-cli/config.toml` automatically.

**Full reference** (with JSON examples, the inline Python recipe, and a diagnostic curl command): `references/air-link-extraction.md` in the same skill dir.

**Pre-flight check (mandatory before writing the sheet):**

```python
# After running extract_air_links.py across the batch, fail loudly if any task is missing its air link.
# A missing air link means either: (a) the editor hasn't posted the asset yet, or
# (b) the walker missed it — historically the walker only checked 'bookmark', dropping 'link_mention' silently.
with open('air_links.tsv') as f:
    extracted = dict(line.rstrip('\n').split('\t', 1) for line in f)
missing = [tid for tid in batch_task_ids if not extracted.get(tid, '').strip()]
if missing:
    raise SystemExit(
        f"⚠️  {len(missing)} tasks are missing air links: {missing}\n"
        "Either the editor hasn't posted the asset, or the walker missed it (run the diagnostic curl in air-link-extraction.md)."
    )
```

**The cardinal rule that depends on this:** "Shared With Client" requires a link in column E. If a task is in `approved ready for client` status but the extracted air URL is empty, **do not** flip the row to "Shared With Client" — leave it as "In progress" and flag to the strategist. "Shared With Client" without a link is a contradiction: the client has nothing to open.

## The separation between EXTRACTION and WRITING (this is what burned the user)

The `extract_air_links.py` script in `scripts/` is **read-only** — it fetches comments from ClickUp, walks the rich-text, and prints `<task_id>\t<air_url>` lines on stdout. It does **not** touch any Google Sheet. A separate, deliberate human action (or a future dedicated `sync_tracker.py` script, written with full awareness of the don't-overwrite rule) is responsible for any sheet writes.

**What this means in practice:**
- The walker is safe to run as often as you want — it never modifies data
- A future `sync_tracker.py` (not yet built) would: (a) read the current sheet, (b) call the walker for missing air links, (c) write only the empty cells, (d) leave the strategist's manual entries (including CDN public-share links) untouched
- **Don't have an agent build a one-off script that auto-writes to the sheet.** The T002 batch was clobbered 2026-06-10 by exactly that mistake: a background script overwrote 7 manually-entered URLs (rows 30, 31, 32, 33, 34, 37, 38) with `(editor hasn't posted)` placeholders. The user had to restore the sheet manually. The rule going forward: **extraction is cheap and safe, writing is expensive and must be deliberate.**

**Live-verified 2026-06-10** against the Stellar Sleep T002 batch (the failure case the user reported). Found 5/7 (the other 2 genuinely had no air link in their comments yet — editor hadn't posted). Prior walker (bookmark-only) would have found 1/7.

## Pitfalls (full list in the command file)

- **Don't use `google-workspace` skill's `sheets update` for anything except the data values.** It writes values only. For backgrounds, hyperlinks, borders, bold, use direct Sheets API `batchUpdate` with `repeatCell`/`updateCells`/`addBorders`.
- **The Google Sheets API does NOT support per-value colors in dropdown rules** (`userEnteredFormat` on validation values is rejected). The dropdown toggle colors are configured in the Sheets UI manually.
- **The CLI's `CLICKUP_PP_CLI_BEARER_AUTH` env-var path was patched on 2026-06-10** to detect `pk_` personal tokens and send them verbatim (no `Bearer ` prefix). Older versions need the patch from `.printing-press-patches.json` → `personal-api-token-auth-2026-06-10`.
- **The Air share link lives in a ClickUp comment's rich-text array, NOT in plain `comment_text`.** The rich-text element types that can hold the link: `bookmark` (most common — the URL is in `el.bookmark.url` or `el.url`), `link_mention` (less common — the URL is in `el.link_mention.url` or similar), and plain `text` elements (no `type` field — the URL appears as a substring of `el.text`). The walker must check ALL three shapes, not just `bookmark`. See the canonical extraction function in the command file.
- **NEVER overwrite an existing value in the tracker.** The strategist manually adds URLs and creates public share links (via `POST /assets/:assetId/cdnLink` in the Air web app) for tasks where the editor's link is missing or a public share is needed. Before writing col-E, the sync script must read the current sheet value and skip any cell that's already non-empty. Use this rule: **only write to a cell if it's empty (or if the existing value is a known placeholder like `(editor hasn't posted)`)**. The walker is for filling gaps, not replacing the strategist's work. The cardinal case this protects: the strategist creates a public share link for a task where the editor's link was missing/private. If the sync overwrites that with a different URL found in the comments, the share breaks.
- **Public share links in the sheet are STRATEGIST-AUTHORED — never rewrite them.** If col-E contains a `https://app.air.inc/...` URL (whether it's a `bookmark` link the editor pasted, a `link_mention` URL, or a CDN share link the strategist created via the Air web UI), treat it as authoritative and do not touch it. The whole point of a share link is that it's the canonical URL the team sends to clients — rewriting it with a different URL breaks the share. The "find and fill gaps" walker is for empty cells only. A public link is a manual override; respect it.
- **The "never overwrite" rule is column-E only.** The other columns in the tracker (A=Date, B=Name, C=Status, D=Launch Status, F=Notes/Feedback) are NOT protected — a sync can update them freely based on ClickUp state. For example, a daily sync can flip col-C from `In progress` to `Shared With Client` if the ClickUp status changed, and add a new date in col-A, and append to col-F. The "lock" applies ONLY to col-E (air/driver link), because that's the one cell the strategist manually authors (sometimes creating public share links). Status, launch status, name, date, and notes are all sync-friendly.
- **Profile HOME is wrong on this machine.** `os.UserHomeDir()` returns `/Users/marce/.hermes/profiles/reach-digital/home/` instead of `/Users/marce/`. The Google OAuth token path must be the absolute path `~/.hermes/profiles/reach-digital/google_token.json` (no `~` expansion), same for `~/.config/clickup-pp-cli/config.toml`.

## Files this skill touches

- **Reads:** `~/Documents/reach-digital-hermes/00 Global/Process/Sheets Integration.md` (the standard), the brand's existing tracker (Sheets), ClickUp tasks (via the CLI)
- **Writes:** the brand's tracker (Sheets — formatting + data), and the standard doc (if a new status value appears)
- **Never writes:** ClickUp (read-only), any `00 Global/Criteria/` doc (immutable)

## See also

- `clickup-load` — the inverse: vault markdown → ClickUp tasks
- `Sheets Integration.md` — the canonical tracker standard
- `reach-digital-ops` — provider/auth notes, profile HOME gotcha
- `00 Global/Process/Air API.md` — for the future `air-pp-cli` that will write back to ClickUp (e.g., "the Gemini digest says this asset is clean, post a comment")
