# Google Sheets Integration

## Auth state

OAuth token + client_secret stored profile-scoped at `~/.hermes/profiles/reach-digital/`. The `google-workspace` skill wraps everything (`google_api.py` is the execution entry; `gws` CLI not installed, not needed).

The installed version of `setup.py` doesn't support the `--services` flag, so the OAuth consent requests the **full Workspace scope** (Gmail, Calendar, Drive, Contacts, Sheets, Docs) even though we only need Sheets + Drive. The auth itself is valid for all 8 scopes; if you ever call Gmail/Calendar/Docs/Contacts APIs, the corresponding APIs need to be enabled in the Google Cloud project first.

## Brand tracker sheets

One "Ad Creative Tracker" per brand. 5 currently exist; Elevate does not.

| Brand | Spreadsheet ID | Sheet name | Notes |
|---|---|---|---|
| IM8 | `1CsD8NF2xHcUBGaKxYf18YOiXgTfPjUCiez91CTX3Wmk` | "IM8 x RD \| Ad Creative Tracker" | First tab: `Reach Creative` |
| Lifeforce | `1uQACc_TEl1Km5ctwBmf7yXc5LUupju76KkGuXM0ns40` | "Lifeforce x RD \| Ad Creative Tracker" | |
| Stellar Sleep | `1b5S2x8I3vLfKrfUB9W7aUvLi0Ku1CKI89vXOIaKTXJg` | "Stellar Sleep x RD \| Ad Creative Tracker" | |
| Comfort Wear | `1SAG4uYvODaJs_zlAV7w_Ok02L0cpbCgZkj-HnWAxhi0` | "Comfort Wear x RD \| Ad Creative Tracker" | |
| Stepful | `1zHmMxZ9X_SKui0sX9urEBdM4anBYwOnNA9LFHQyMojk` | "Stepful x RD \| Ad Creative Tracker" | |
| Elevate | *(not yet created)* | — | |

Other related sheets in the same Drive (FYI, not trackers):
- `final - RD Creative Strategy Scorecard` — cross-brand
- `IM8 Landing Pages` — landing-page copy tracking
- `ComfortWear - Facebook Ads Resource` — separate from the tracker

## Tracker row structure (STANDARD)

Every batch load into a tracker must follow this exact structure. **Status does not determine row order** — the numbering does.

### Layout

```
Row 1      Column headers  (Column 1, Name, Status, Launch Status, Air/Drive Link, Notes/Feedback)
Row 2      [BATCH SEPARATOR]  — colored row (black/gray background), one cell: "T<NN> Batch"
Row 3+     Data rows for that batch, numbered 01..NN in left-to-right reading order
Row N+1    [BATCH SEPARATOR]  — "T<NN+1> Batch" (next batch)
...        Data rows for the next batch
```

### Numbering rule

The Name column encodes the in-batch sequence as `_NN_T<batch>` suffix. Example for T001:

- `Reach Digital_Stellar Sleep_Founded at Harvard Authority Explainer_01_T001`
- `Reach Digital_Stellar Sleep_Protocol Parity DoD CBT-I_02_T001`
- ...
- `Reach Digital_Stellar Sleep_Pills vs CBT-I Comparison Chart_20_T001`

**Sort by the number before `_T<batch>`** — numerically, 01, 02, 03, ..., 20 — regardless of Status, Launch Status, or any other column. This is the order they were written/created in, and it's the order the tracker must show.

The T001 batch separator row is colored (black or gray background) and contains only the text "T001 Batch" in the Name column. Other cells in that row are blank. **It always sits immediately under the column headers**, not at the bottom.

## Columns

| # | Header | Content | Source |
|---|---|---|---|
| 1 | (no header) | Date / period (e.g. "4/23") | Manual / batch start date |
| 2 | Name | `Reach Digital_<Brand>_<Concept>_NN_T<batch>` | Generated when batch is briefed |
| 3 | Status | Production status (see mapping below) | Pulled from ClickUp |
| 4 | Launch Status | `Launched` / `Not launched` / `Do not launch` | Pulled from ClickUp + ad account |
| 5 | Air/Drive Link | `https://app.air.inc/a/...` link to the asset | Air share link |
| 6 | Notes/Feedback | Editor feedback, revision notes | Manual or ClickUp comments |

## Status vocabulary (cross-brand standard)

**Status column** — 8 values, each with a fixed background color (color-coded dropdown):

| Value | RGB (0-1) | Hex approx | Semantic |
|---|---|---|---|
| `In progress` | (0.96, 0.70, 0.42) | #F6B26B | orange — active work (designer/editor iterating) |
| `Ready To Launch` | (0.22, 0.46, 0.11) | #38761D | dark green — approved, awaiting launch |
| `Completed` | (0.85, 0.92, 0.83) | #D9EAD3 | light green — creative work finished |
| `Shared With Client` | (0.71, 0.65, 0.84) | #B4A7D6 | purple — sent to client for review |
| `Revisions Requested` | (0.88, 0.40, 0.40) | #E06666 | red — needs more work |
| `Rejected` | (0.75, 0.75, 0.75) | #BFBFBF | gray — won't move forward |
| `Adding aspect ratios` | (1.00, 0.85, 0.40) | #FFD966 | yellow — adding sizes (transitional) |
| `Scrapped` | (0.45, 0.45, 0.45) | #737373 | dark gray — terminated, won't pursue |

**Launch Status column** — 4 values, each with a fixed background color:

| Value | RGB (0-1) | Hex approx | Semantic |
|---|---|---|---|
| `Launched` | (0.22, 0.46, 0.11) | #38761D | dark green — live in ad account |
| `Not launched` | (0.88, 0.40, 0.40) | #E06666 | red — not yet live |
| `Scheduled for launch` | (1.00, 0.85, 0.40) | #FFD966 | yellow — on schedule, waiting |
| `Do not launch` | (0.75, 0.75, 0.75) | #BFBFBF | gray — explicitly killed |

**Rule on cell colors:** the Google Sheets API does NOT support setting per-value colors in the data validation rule's `values` array (it rejects `userEnteredFormat` on validation values). The toggle colors must be configured in the **Sheets UI** — open the dropdown on a Status/Launch Status cell, right-click each option, set its color manually. Once configured, the cell stays plain (white bg, black text); the colors only show in the dropdown options. So when writing a value via API, just pick from the list — no cell-color formatting needed.

## ClickUp → Sheets status mapping

**Status column mapping:**

| ClickUp status | Sheets Status |
|---|---|
| `backlog / concept` | *(omit from tracker until briefed)* |
| `design needs edits` | `In Progress` |
| `in internal review` | `In Progress` |
| `approved ready for client` | `Shared With Client` |
| `client approved` (if it exists) | `Ready To Launch` |
| `live` (if it exists) | `Ready To Launch` + `Launch Status: Launched` |

**Launch Status column mapping:**

| ClickUp status / ad-account state | Sheets Launch Status |
|---|---|
| Not yet live in ad account | `Not launched` |
| Live in ad account (Motion confirms) | `Launched` |
| Killed in ClickUp (status `rejected` / `do not launch`) | `Do not launch` |

## Date rule (Column 1)

Column 1 = ClickUp task `date_created`, formatted as `M/DD` (no leading zero on month or day, e.g. `4/23`, `5/19`). If `date_created` is missing or unreliable, leave blank.

## Air link source

The Air link in Column 5 comes from a ClickUp task comment. It can live in any of three places — check all of them in order:

1. **Bookmark block** in the rich-text `comment[]` array:
   - `type`: `bookmark`
   - `bookmark.service`: `custom`
   - `bookmark.url`: the air.inc URL
2. **Link-mention block** in `comment[]` (the "done [link]" / inline-link format editors use):
   - `type`: `link_mention`
   - The URL appears in `block.text` or a sibling field — grep the whole block dict for `app.air.inc`
3. **Plain text** in `comment_text` as a last-resort fallback.

Some tasks have multiple comments — pick the most recent one with an `app.air.inc` URL. If a task is in `approved ready for client` status but no comment block contains an air link, **do not** mark the row as "Shared With Client" — flag it to the strategist.

## Open design questions

These need user input before the ClickUp → Sheets status mapping can be built:

1. **ClickUp status taxonomy** — what statuses does a creative task move through in ClickUp? Need a list of the actual statuses (e.g. `Draft → Brief → Production → Review → Live` or whatever it actually is).
2. **Status mapping** — how do ClickUp statuses map to the 5 Status values + 3 Launch Status values above? One-to-one? Many-to-one? Computed (e.g. `Launch Status` derived from `Status` + ad-account state)?
3. **Sync direction** — one-way (Sheets displays ClickUp state) or two-way (edits in Sheets push back)?
4. **Trigger** — cron (every X hours), ClickUp webhook (on status change), or manual run?

## Reordering rows: formatting gotcha

The `google-workspace` skill's `sheets update` only writes **values**, not cell formatting. So when you reorder rows by writing the new order to a range:

- ✅ Cell values (text) move to the new positions
- ❌ Cell formatting (background color, text color, fonts) stays at the **old** positions

In the Stellar Sleep T001 case, the dark gray `#434343` background + **white text** of the "T001 Batch" separator row stayed at row 22 (old position) when the text moved to row 2. A first fix moved the background but **missed the text color**, leaving the #20 data row with white text on a white background (unreadable) and the T001 Batch row with black text on dark gray (also unreadable).

**The rule:** when a row has a custom background color, it always has a custom text color too (light bg → dark text, dark bg → light text). When you move the row, you must move BOTH.

```python
# Move dark gray bg + white text from old row to new row, and reset the old row
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

TOK = "/Users/marce/.hermes/profiles/reach-digital/google_token.json"  # absolute, not ~ (profile HOME is wrong)
creds = Credentials.from_authorized_user_file(TOK)
service = build('sheets', 'v4', credentials=creds)

# Find the sheet's numeric ID first
spreadsheet = service.spreadsheets().get(spreadsheetId=SHEET_ID, fields="sheets(properties(sheetId,title))").execute()
sheet_id = next(s['properties']['sheetId'] for s in spreadsheet['sheets'] if s['properties']['title'] == 'Reach Creative')

DARK = {"red": 0.263, "green": 0.263, "blue": 0.263}  # #434343
WHITE = {"red": 1, "green": 1, "blue": 1}
BLACK = {"red": 0, "green": 0, "blue": 0}

requests = [
    # Move colored separator (dark bg + white text) from old position to new
    {"repeatCell": {
        "range": {"sheetId": sheet_id, "startRowIndex": 1, "endRowIndex": 2,
                  "startColumnIndex": 0, "endColumnIndex": 6},
        "cell": {"userEnteredFormat": {
            "backgroundColor": DARK,
            "textFormat": {"foregroundColor": WHITE, "bold": True}
        }},
        "fields": "userEnteredFormat(backgroundColor,textFormat)"
    }},
    # Reset the old position back to default (white bg + black text)
    {"repeatCell": {
        "range": {"sheetId": sheet_id, "startRowIndex": 21, "endRowIndex": 22,
                  "startColumnIndex": 0, "endColumnIndex": 6},
        "cell": {"userEnteredFormat": {
            "backgroundColor": WHITE,
            "textFormat": {"foregroundColor": BLACK}
        }},
        "fields": "userEnteredFormat(backgroundColor,textFormat)"
    }}
]
service.spreadsheets().batchUpdate(spreadsheetId=SHEET_ID, body={"requests": requests}).execute()
```

**Env gotcha worth noting:** the reach-digital profile's `$HOME` is `/Users/marce/.hermes/profiles/reach-digital/home`, NOT `/Users/marce/`. So `os.path.expanduser("~")` resolves wrong inside this profile. Use absolute paths for the token file: `/Users/marce/.hermes/profiles/reach-digital/google_token.json`.

**Rule for future batch loads:** if you're moving the T001 (or T00X) separator row, or any other row with custom background color, you also need to move its text color. Same for any row with custom formatting.

## Dependencies for the integration

- **Air CLI** — needs public-share-link download via yt-dlp. Air's web API is Cloudflare+Akamai+CAPTCHA protected; the `printing-press` tool refuses to print a CLI for it. Practically: use yt-dlp on the `app.air.inc/a/...` share links to fetch videos for the QA digest.
- **ClickUp CLI** — already installed (`clickup-pp-cli`).
- **Google Workspace OAuth** — done (this doc).
- **Sheets read/write** — done via the `google-workspace` skill (`sheets get` / `sheets update`). For formatting changes (background colors, etc.), use the Sheets API directly as shown above.
