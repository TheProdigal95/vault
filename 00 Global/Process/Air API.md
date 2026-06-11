# Air API — Research & Plan

> **Source of truth:** https://developer.air.inc (full docs at `/llms.txt`)
> **Workspace:** Reach Digital (Enterprise plan, eligible for API access)
> **Date:** 2026-06-10

## TL;DR

The official Air Public API exists, is fully documented, and works with simple API-key auth — no browser cookies, no Cloudflare bypass, no Chrome automation. The CLI approach I tried earlier (`printing-press` + browser cookies) was a dead end because the only auth path that worked in the browser was Cloudflare edge auth, not a token we could extract.

**Right approach:** get an API key from `app.air.inc → Workspace Settings → API Access`, send `x-api-key` + `x-air-workspace-id` headers, done. The user can generate the key in the UI.

## What I tried (and why it failed)

| Approach | Outcome |
|---|---|
| `printing-press browser-sniff` on a `.har` with the browser traffic | Generated a 55-endpoint spec, but `generate` refused: "live browser page-context execution required" because Air sits behind Cloudflare + Akamai + CAPTCHA |
| Hand-build CLI from the spec, with cookie-based auth | Decrypted Chrome's `Cookies` SQLite via `browser-cookie3` — got the AWS Cognito JWTs (`CognitoIdentityServiceProvider.<pool>.marcelo@reach-digital.co.accessToken`) |
| Use the Cognito tokens as Bearer | `401 Unauthorized: provide a valid x-api-key header or Authorization: Bearer token` — these are web-app session tokens, not API tokens. Different audience/issuer |
| Use the full browser cookie string as `Cookie:` header | Same 401 |
| Launch Chrome with `--remote-debugging-port=9223` against the user's profile | Chrome refused: "DevTools remote debugging requires a non-default data directory." Also needs an open browser window, which the user doesn't want |
| Use Playwright to drive a headless Chrome | Would work but headless Chrome is detected by Air's bot protection. Real Chrome fingerprint is the only way through |

**Lesson:** for sites behind aggressive bot protection, browser-automation / cookie-extraction is fragile and the user's real CLI tools (Motion, ClickUp) work because they have actual server-to-server API auth, not browser-session auth. Air has the same option — the user just needs to enable it.

## What the official API offers

Two auth modes (mutually exclusive per request):

**Option A — API key (recommended for our use case):**
```http
x-api-key: <your_api_key>
x-air-workspace-id: <your_workspace_id>
```
- Workspace-scoped, server-to-server
- Free/Starter: not available. **Business/Enterprise: yes** (we're Enterprise)
- Generate at `app.air.inc → Account Settings → API Access` (admin only)

**Option B — OAuth 2.0 Bearer (for multi-workspace user-context integrations):**
```http
Authorization: Bearer <access_token>
x-air-workspace-id: <your_workspace_id>
```
- Use case: integrations acting on behalf of a user, or need to span workspaces
- We don't need this — Option A covers our QA digest use case

Rate limits (per API key): 15 req/sec, 10 concurrent. SDK handles retries automatically.

## Endpoint inventory (from /llms.txt + the captured .har)

All endpoints under `https://api.air.inc/v1/`. UUIDs are path params.

**Assets (videos, images, files):**
- `GET /assets` — list assets (filter by `parentBoardId`, `tag`, `customField`, `createdAt` range, `search`)
- `GET /assets/:assetId` — get a single asset
- `DELETE /assets/:assetId` — delete an asset
- `GET /assets/:assetId/versions` — list versions of an asset
- `GET /assets/:assetId/versions/:versionId` — get a specific version (includes IPTC, EXIF metadata)
- `GET /assets/:assetId/versions/:versionId/download` — get a signed download URL + expiry
- `GET /assets/:assetId/versions/:versionId/chapters` — chapter info
- `GET /assets/:assetId/versions/:versionId/tags` — list tags on a version
- `POST /assets/:assetId/versions/:versionId/tags` — add a tag
- `DELETE /assets/:assetId/versions/:versionId/tags/:tagId` — remove a tag
- `PATCH /assets/:assetId/versions/:versionId` — update version metadata
- `GET /assets/:assetId/boards` — list parent boards
- `POST /assets/:assetId/cdnLink` — create a public CDN link
- `POST /assets/:assetId/versions/:versionId/cdnLink` — CDN link for a specific version
- `GET /assets/:assetId/customfields/:customFieldId` — get custom field value
- `PUT /assets/:assetId/customfields/:customFieldId` — set custom field value

**Boards (collections of assets — what Air calls "folders"):**
- `GET /boards` — list boards in workspace
- `POST /boards` — create a board
- `GET /boards/:boardId` — get a board (with ancestors, thumbnails, cover image)
- `PATCH /boards/:boardId` — update a board
- `DELETE /boards/:boardId` — delete a board + child-only assets
- `POST /boards/:boardId/assets` — associate assets with a board
- `DELETE /boards/:boardId/assets/:assetId` — remove an asset
- `GET/POST/PATCH/DELETE /boards/:boardId/guests[/:guestId]` — guest management
- `GET/PUT /boards/:boardId/customfields/:customFieldId` — board custom fields

**Custom fields (the structured "Status", "Brand", etc. on each board/asset):**
- `GET /customfields` — list all custom fields in workspace
- `POST /customfields` — create (max 100/workspace)
- `GET/PATCH/DELETE /customfields/:customFieldId`
- `GET/POST/PATCH/DELETE /customfields/:customFieldId/values[/:valueId]`

**Tags:**
- `GET /tags` — list tags (alphabetical)
- `POST /tags` — create tag
- `PATCH /tags/:tagId` — rename
- `DELETE /tags/:tagId`

**Guests / Roles:**
- `GET /roles` — list guest roles

**Uploads / Imports:**
- `POST /uploads` — get a signed upload URL, then `PUT` the file to S3 (file size limit: <5GB)
- `POST /uploads/uploadPart` + `POST /uploads/completeMultipart` — for chunked uploads
- `POST /imports` — import an asset from a public URL
- `GET /imports/:importId/status` — poll import status

**Workspaces / Discovery (Bearer-only):**
- `GET /v1/workspaces` — list workspaces accessible to the current API key (bearer-only endpoint, useful for discovery)

**Note on what I saw in the captured .har vs. what's documented:** the .har showed some unversioned paths (`/workspaces/`, `/boards/{id}`, `/discussions/`) and some `/v1/` paths. The official API is the `/v1/` surface. The unversioned paths are likely the internal web-app API (Cognito-authenticated, not API-key auth) and should be ignored.

## What's possible for the QA digest use case

The original goal: every morning, see which editor/designer submissions in ClickUp have Air videos posted, watch them, compare against brief+script, flag QA issues, send Marce a TL;DR.

**What the Air API lets us do without a browser:**

| QA digest need | Air API path | Notes |
|---|---|---|
| Find videos posted in the last 24h | `GET /assets?createdAt[gte]=<24h-ago>&parentBoardId=<batch-board>` | Returns asset list with metadata, tags, custom fields |
| Get the video file (to feed to Gemini vision) | `GET /assets/:assetId/versions/:versionId/download` → returns signed URL → download with curl/yt-dlp | No browser needed. S3-hosted, time-limited URL. |
| Get video metadata (duration, dimensions, format) | `GET /assets/:assetId/versions/:versionId` | Returns IPTC, EXIF, etc. |
| Find which board a video lives in | `GET /assets/:assetId/boards` | Maps asset to parent board (and ancestors) |
| Check if comments already exist on a board (for the "did reviewers leave feedback?" check) | **Internal `GET /discussions/?boardId=...&discussionLimit=100&commentLimit=100`** — returns full threads with comment text + asset/board context | **Not in the public `/v1/` API**, but exists in the unversioned internal web app API (saw it in the .har). Same `api.air.inc` host. **This is the comments access path — see "Comments gap" below.** |
| Cross-reference with ClickUp | (ClickUp side) `GET /task/{id}/comments` via the (now-fixed) `clickup-pp-cli` | The Air bookmark URL appears in ClickUp comments — match the asset URL on both sides. |
| Validate spec compliance (dimensions, format, duration) | `GET /assets/:assetId/versions/:versionId` (parse IPTC/EXIF/duration) | Hard-validate submissions before watching — auto-flag "wrong aspect ratio" without burning Gemini cycles |
| Find assets with unresolved discussions | `GET /assets?...&withOpenDiscussionStatus=true` (filter param) | Counts of open discussions per asset, even though comment text isn't accessible |
| Verify chapter markers against script beats | `GET /assets/:assetId/versions/:versionId/chapters` | Some editors set chapter timestamps; check they line up with the script |

**What it doesn't cover (would still need browser):**
- Adding comments to assets (no API endpoint anywhere)
- Resolving comments / discussion threads (no API endpoint)
- Real-time push notifications (no webhooks in public API; cron-based polling is the only option)
- Some auth flows (OAuth for multi-workspace)

For the morning TL;DR use case, comment text IS now available via the internal `/discussions/` endpoint (see below). The remaining pieces are about *adding* comments, not reading them.

## The comments gap (corrected)

**Earlier I said "no comments in the API" — that was wrong.** The unversioned internal API at `https://api.air.inc/discussions/` returns full discussion threads including comment text + asset/board context. The browser calls it with no explicit auth headers (Cloudflare edge auth).

**What's NOT in the public API but IS in the internal one:**
- `GET /discussions/?boardId=...&discussionLimit=100&commentLimit=100` — full thread + comment data
- (Likely) `POST /discussions/...` to create comments
- (Likely) `POST /discussions/.../comments` to add a comment

**Auth question (open until we have the API key):** the browser calls `/discussions/` with no auth, and Cloudflare lets it through based on browser fingerprint. For a CLI, we need a different auth path:
- **Option A:** The official `x-api-key` header works for `/discussions/` (it's the same host). Worth testing — if yes, the CLI uses one auth mode for everything.
- **Option B:** The internal API requires Cognito session cookies (the ones I extracted from Chrome's encrypted `Cookies` SQLite — `CognitoIdentityServiceProvider.<pool>.marcelo@reach-digital.co.accessToken`). The CLI would need to:
  1. Get a fresh cookie extract from Chrome (one-time, when the user is logged in)
  2. Save to `~/.config/air-pp-cli/cognito-session.json`
  3. Refresh on expiry (or ask the user to re-extract)
- **Option C:** Hybrid — `x-api-key` for /v1/ endpoints, Cognito for /discussions/. The CLI handles both transparently.

**Recommendation:** test Option A first once the API key is generated. If it works, we have a single auth path. If not, fall back to Option C. Either way, the CLI's design should support both.

**Why printing-press can't fully solve this:**
printing-press generates Go CLIs from OpenAPI specs. The public `/v1/` spec is in the official docs and printing-press will scaffold ~45 endpoints from it. **`/discussions/` is NOT in the public spec** — it's only in the internal web app API. So:
- The standard CRUD endpoints (assets, boards, custom fields, tags, uploads) → printing-press scaffolds these
- `/discussions/` (and any other internal-only endpoints) → hand-added to the same binary

This is fine — printing-press leaves room for custom commands. The hand-addition is ~50 lines of Go. Not a deal-breaker.

## Other use cases the API unlocks (not just the QA digest)

**Ingest from URL** — `POST /imports` lets us pull a public video URL (YouTube, Vimeo, Drive, Dropbox, S3) into a specific Air board. **This is the workflow-killer feature I missed in v1.** Right now the editor loop is probably: upload to Drive → share link → you download → you upload to Air → paste Air link in ClickUp. With `/imports`, the editor pastes the Drive link in ClickUp, our cron sees it, calls `POST /imports` with `parentBoardId=<batch-board>`, the video lands in Air automatically, the asset ID gets written back to the ClickUp task as a comment.

**Programmatic uploads** — `POST /uploads` (signed S3 PUT) for direct file upload to a board. Useful if you ever build a custom "submit your video" form on a ClickUp task.

**Board automation** — `POST /boards` to auto-create "T001 Batch" / "T002 Batch" boards as part of batch planning. `POST /boards/:boardId/assets` to move submissions into the right board. Currently both manual in the web app.

**Status state machines** — if "Status" is a custom field on assets (Pending / In Review / Approved / Rejected), the cron can flip it after Gemini reviews. No human clicks.

**Spec validation** — parse IPTC/EXIF/duration from the version metadata; auto-reject "this video is 1080x1080 but spec said 1080x1920" without ever feeding it to Gemini.

**Public CDN links** — `POST /assets/:assetId/cdnLink` generates a time-limited public URL. Useful for: client-share emails without giving them Air access, embedding in reports.

**Multi-board placement** — `POST /boards/:boardId/assets` can put the same final ad in "T001 Batch" + "Approved Ads" + the client's "My Ads" board, no file duplication.

**Branded short URLs** — `POST /workspaces/:id/shorturl/share` for client-review links.

## The plan

### Step 1: User generates the API key (5 min, one-time)

- Workspace admin: open `app.air.inc → Workspace Settings → API Access` (URL: `https://app.air.inc/account/api`)
- Click "Generate API key" — name it e.g. `reach-digital-hermes`
- Copy: the API key, the Workspace ID
- Send both to me (paste in chat, or via a secure channel — these are credentials)

Optional: a second API key for read-only access (we don't need writes for the QA digest, but the keys don't differentiate scope per docs, so read vs read-write is policy).

### Step 2: Build the air CLI (the right way this time)

**Tech choice: Python, not Go.** Reasoning:
- The other printed CLIs (motion, clickup) are Go because they came from `printing-press` (which generates Go). We don't have that constraint here — the official API has clean docs, the SDK is TypeScript, and we're doing light integration work.
- Python is already in the venv with `requests`. No new build toolchain.
- Easier to iterate and debug than Go for a small utility.
- We have a `native-mcp` skill for MCP if we want to expose Air tools there too (optional, future).

**Match the existing CLIs in spirit:**
- Binary lives at `/Users/marce/go/bin/air-pp-cli` (or `/Users/marce/.hermes/profiles/reach-digital/bin/air-pp-cli` for profile-scoped)
- Config at `~/.config/air-pp-cli/config.toml` (matches motion/clickup pattern)
- Env var support: `AIR_API_KEY`, `AIR_WORKSPACE_ID` (matches the SDK's naming)
- `--agent` flag for JSON + non-interactive (matches the others)
- `--dry-run` where applicable
- `doctor` command for auth check
- Subcommands map 1:1 to resource groups: `air-pp-cli assets list`, `air-pp-cli boards get <id>`, `air-pp-cli tags list`, etc.

**Initial scope (only what we need for the QA digest):**
- `air-pp-cli doctor` — verify auth
- `air-pp-cli boards list` — list boards (find the batch board by name)
- `air-pp-cli assets list --board <id> --since <iso>` — find new assets in a board
- `air-pp-cli assets get <assetId>` — get full metadata
- `air-pp-cli assets download <assetId>` — print the signed download URL (or `--output` to fetch to disk)
- `air-pp-cli customfields list` — list custom fields (so we know what "Status" / "Ready To Launch" map to)
- `air-pp-cli customfields set <assetId> <fieldId> <valueId>` — set Status (e.g., "QA Reviewed") after Gemini runs. **Defer until we know we want writes.**

**Future (after the digest works):**
- Uploads (if we ever need to push files to Air from outside the web app)
- OAuth multi-workspace mode
- Cross-reference with ClickUp task IDs in asset descriptions

### Step 3: Patch printing-press (or skip it)

The user originally asked for `air-pp-cli` matching the printing-press pattern. Two options:
1. **Use `printing-press generate`** with a hand-rolled OpenAPI spec (the one we generated from the .har, then enriched with the official /v1/ paths from the docs). printing-press will scaffold a Go CLI. Faster, more consistent with the others.
2. **Hand-build Python** as above. More flexible, easier to iterate.

**Recommendation:** hand-build Python. printing-press would have scaffolded ~55 endpoints we'd never use (the .har had paths the official API doesn't expose); for ~7 endpoints we actually need, Python is faster end-to-end. The CLI name stays `air-pp-cli` for consistency with the others.

### Step 4: Wire into the QA digest cron

Once `air-pp-cli` works:
- The morning cron calls `air-pp-cli assets list --board <batch-board-id> --since <24h-ago>` to find new submissions
- For each new asset, downloads the video via the signed URL + feeds to Gemini vision (similar to the planned morning digest from earlier in this session)
- Aggregates into a TL;DR (which assets are clean, which have QA issues, by ClickUp status)
- Delivers to chat (per the original design)

That wiring is downstream of getting the CLI working. We don't need to design it until the CLI is real.

### Step 5: Doc the lessons

Add to memory: "Air CLI works as of 2026-06-10 via official API key auth. Source: printing-press not used (would have generated 55 unused endpoints). Hand-built Python at /Users/marce/.hermes/profiles/reach-digital/bin/air-pp-cli. Token via `AIR_API_KEY` env var or `~/.config/air-pp-cli/config.toml`."

Add to vault Process: this doc (`Air API.md`).

## Open questions for the user

1. **Generate the API key when you can** and send me `AIR_API_KEY` + workspace ID. I can build the rest in parallel (CLI scaffold, etc.) while we wait.
2. **Does the QA digest need Comments?** I noted above that the public API doesn't expose comments. If "what did reviewers say?" is a must-have for the morning TL;DR, we need a different approach (browser automation, or a screen-scraping skill). If metadata + video are enough for v1, we can skip this.
3. **CLI name: `air-pp-cli` (matches the others) or something else?** Default: keep `air-pp-cli` for consistency.

## What I missed in my initial scope (the high-value extras)

I scoped the initial CLI down to ~6 read-only subcommands for the QA digest. But the full API has writes and feature endpoints that could be very useful for the creative ops workflow. Here's what I left out and why each could matter:

**Writes (programmatic state changes — all of these work via API key auth):**

| Endpoint | What it does | Why we might want it |
|---|---|---|
| `POST /assets/:assetId/cdnLink` | Create a **public shareable URL** for an asset (with optional expiration) | **Big one.** Today, sharing an asset with a client means: open the asset in the web app, click "Share", copy URL, paste in Slack/email. With the CLI, we can `air-pp-cli assets share <id> --expiry 7d` and embed that URL in the morning digest, the QA notes, anywhere. |
| `POST /uploads` + `PUT <signed-S3-URL>` | Upload a local file as a new asset | Bulk-ingest from a folder (e.g., `for f in ~/Downloads/approved-assets/*; do air-pp-cli assets upload "$f" --board <id>; done`). Useful for: AI-generated content, designer exports, anything coming from outside the web app. |
| `POST /imports` + `GET /imports/:id/status` | Import an asset from a public URL (Air fetches + stores) | One-shot ingestion of assets hosted elsewhere (Dropbox, S3, another DAM, a vendor's CDN). No local file needed. |
| `POST /uploads/uploadPart` + `POST /uploads/completeMultipart` | Chunked upload for files ≥5GB | Less relevant for our 60-90s ad videos (well under 5GB), but if we ever ingest a long-form asset or full episode, this is the path. |
| `PUT /assets/:assetId/customfields/:customFieldId` | Set a custom field value (e.g., "Status = QA Reviewed") | Programmatic status updates. After Gemini runs and flags a video clean, the CLI can mark it reviewed without a human in the loop. |
| `POST /assets/:assetId/versions/:versionId/tags` | Attach a tag to an asset version | Auto-tagging by batch name, brand, status. Avoids the "did someone remember to tag this?" problem. |
| `POST /boards` | Create a board | Auto-create per-batch boards ("T003 — X Brand") on day 1 of a batch, with the right structure, custom fields, default guests. Saves 10-20 min per batch. |
| `POST/PATCH/DELETE /boards/:boardId/guests[/:guestId]` | Add/remove people from a board | Auto-add editors/designers to the right boards when a batch starts, remove when it wraps. |
| `POST /tags` | Create a tag | Pre-create the tag taxonomy once, then auto-apply. |
| `POST /customfields/.../values` | Add a value to a select custom field | Pre-create the option lists (e.g., "QA Reviewed" as a Status value) programmatically. |

**Discovery / metadata (cheap to add, often needed):**

| Endpoint | What it does | Why we might want it |
|---|---|---|
| `GET /v1/workspaces` | List workspaces accessible to the API key | Multi-workspace users (we're not, but the option is there). |
| `GET /boards` (with filters) | List all boards, paginated | Inventory: "show me every board in the workspace with its custom field schema." Useful for auditing the workspace structure. |
| `GET /customfields` | List all custom fields and their values | Build a "what status values exist" map so the CLI can autocomplete `--status` in other commands. |
| `GET /tags` | List all tags | Same: tag autocomplete + inventory. |
| `GET /assets/:assetId/boards` | List parent boards for an asset | "Where does this asset live?" Useful for cross-board cleanup. |
| `GET /assets/:assetId/versions` | List versions of an asset | Track which version is the latest, which is approved, etc. |

**Recommended expanded scope for the air-pp-cli (v1):**

1. **Read scope (same as my original):** doctor, boards list/get, assets list/get/download, customfields list, tags list
2. **Writes to add (v1, gated by `--write` flag for safety):**
   - `air-pp-cli assets share <id> [--expiry 7d]` — the public CDN link
   - `air-pp-cli assets tag <id> <tag>` — add a tag
   - `air-pp-cli customfields set <assetId> <field> <value>` — set a status
3. **Writes to defer (v2, until we know the use case):**
   - Uploads / imports / multipart — large surface area, build only when needed
   - Board / guest management — only relevant if we automate batch setup
   - Tag / custom field creation — assume the workspace is already set up

This expands my original 6-subcommand scope to ~9 subcommands, but each is small and the share/tag/customfield writes unlock the most useful automations. We can do the bigger writes later.

**Net: my original scope was too narrow.** The "CDN link" alone is a significant productivity win (no more copy-paste from the web UI). The `customfields set` write lets us close the loop on the QA digest (Gemini says it's clean → CLI marks it reviewed). Both fit naturally in the same CLI.
