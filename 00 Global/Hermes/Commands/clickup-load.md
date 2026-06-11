# ClickUp Load — Push Vault Markdown to ClickUp

Load scripts or briefs from a vault markdown file into ClickUp as tasks.

**Binary:** `$HOME/go/bin/clickup-pp-cli` (always call by absolute path)

**Auth:** The Go CLI reads its token from `~/.config/clickup-pp-cli/config.toml` → `auth_header` (real user home, NOT profile-scoped `$HOME`). You do **NOT** need to set `CLICKUP_API_TOKEN` in your shell — that env var was removed from `~/.zshrc` on 2026-06-10 because a stale value caused red-herring 401s on direct API. To rotate the token:
```bash
clickup-pp-cli auth set-token "pk_XXXX..."
# or edit ~/.config/clickup-pp-cli/config.toml directly
```
Verify with `clickup-pp-cli team --json --compact` (live API acceptance check).

---

## When to use

Use when the user says:
- "load to ClickUp" / "push to ClickUp" / "push the scripts to ClickUp"
- "push the briefs to ClickUp"
- "create tasks in ClickUp for T003"
- "load [Brand] T00X to ClickUp"

---

## Core commands

### Load scripts (Video ads)
```bash
# Auto-detects brand, list, and task type from file path
$HOME/go/bin/clickup-pp-cli load "IM8/T003 Scripts.md"

# Dry-run to preview without creating tasks
$HOME/go/bin/clickup-pp-cli load "IM8/T003 Scripts.md" --dry-run

# Override list ID (e.g. for Lifeforce which has no hardcoded ID yet)
$HOME/go/bin/clickup-pp-cli load "Lifeforce/T002 Scripts.md" --list-id 901112345678
```

### Load briefs (Static ads)
```bash
$HOME/go/bin/clickup-pp-cli load "Comfort Ortho Wear/T001 Briefs.md"
$HOME/go/bin/clickup-pp-cli load "Comfort Ortho Wear/T001 Briefs.md" --dry-run
```

### Footage requests
```bash
# From a Scripts.md entry (extracts hook/body/close tables)
$HOME/go/bin/clickup-pp-cli footage-request \
  --script-file "IM8/T003 Scripts.md" \
  --slug "GLP1" \
  --title "IM8_Greenscreen GLP1 Muscle Recovery"

# Dry run
$HOME/go/bin/clickup-pp-cli footage-request \
  --script-file "IM8/T003 Scripts.md" \
  --slug "GLP1" \
  --title "IM8_Greenscreen GLP1 Muscle Recovery" \
  --dry-run
```

---

## What it does

**`load` command:**
- Parses all slug lines (`Reach Digital_Brand_Concept_##_T###`) in the file
- Each slug → one ClickUp task, name = slug, description = content through Close
- Auto-detects brand from file path → resolves Creative Briefs list ID
- Auto-detects task type from filename (`Scripts.md` → `Video ads`, anything else → `Static ads`)
- Sets `Task type` custom field
- Assigns: current strategist (from `00 Global/Hermes/strategist.json`) + Diksha Sharma
- Status: `brief approved, in design`

**`footage-request` command:**
- Creates a single footage request task
- Assigns: strategist + Karra Worang
- Status: `Footage Requested`
- Auto-resolves Footage Requests list by walking the workspace hierarchy

---

## Team members → ClickUp user ID

**Canonical source: `team_to_clickup.json` at the vault root.** 23 active workspace members, refreshed 2026-06-09 from `clickup-pp-cli team --json --compact`. The JSON has three parallel maps (`user_ids`, `emails`, plus a `default_assignees` block describing the load / footage-request hardcoded fallbacks).

**Mirrored in the binary** at `.printing-press-patches.json` (patch `team-members-2026-06-09`). The Go `teamMembers` map in `internal/cli/pm_load.go` (line 33) has the same 23 names as lowercase fragments — keep both in sync.

To resolve a name → ID in a script/skill, just read the JSON; don't shell out to the CLI for lookups.

To refresh after someone joins or leaves the workspace:
```bash
clickup-pp-cli team --json --compact | tail -n +2 | \
  python3 -c "import json,sys; d=json.load(sys.stdin); \
  [print(f'{m[chr(34)+chr(117)+chr(115)+chr(101)+chr(114)+chr(34)][chr(34)+chr(117)+chr(115)+chr(101)+chr(114)+chr(110)+chr(97)+chr(109)+chr(101)+chr(34)]} {m[chr(34)+chr(117)+chr(115)+chr(101)+chr(114)+chr(34)][chr(34)+chr(105)+chr(100)+chr(34)]} {m[chr(34)+chr(117)+chr(115)+chr(101)+chr(114)+chr(34)][chr(34)+chr(101)+chr(109)+chr(97)+chr(105)+chr(108)+chr(34)]}') for m in d['results']['teams'][0]['members']]"
```
Update the JSON, then re-patch the Go `teamMembers` map (lowercase first + lowercase first-last) and rebuild with `make -C ~/printing-press/library/clickup install` — and **add a new entry to `.printing-press-patches.json`** so the regen tooling knows about the customization.

---

## Brand → List ID table (embedded in binary)

| Brand | List ID |
|---|---|
| IM8 | 901113419033 |
| Elevate | 901104143324 |
| Stellar Sleep | 901113639668 |
| Comfort Ortho Wear | 901113706036 |
| Lifeforce | — (needs `--list-id`) |

For brands not in the table, pass `--list-id <id>`. After loading, add the brand to `brandListIDs` in `pm_load.go` and rebuild.

---

## Auth setup

```bash
# The ClickUp Go CLI does NOT use an env var — it reads ~/.config/clickup-pp-cli/config.toml
# Set the token there instead. To rotate, either run:
#   clickup-pp-cli auth set-token "pk_XXXX..."
# or edit the file directly. (Adding CLICKUP_API_TOKEN to ~/.zshrc used to be the
# way, but was removed 2026-06-10 — it caused red-herring 401s on direct API.)
```

Or use the CLI auth command:
```bash
$HOME/go/bin/clickup-pp-cli auth set-token
```

Test with:
```bash
$HOME/go/bin/clickup-pp-cli doctor
```

---

## Updating the binary

Source lives at: `~/printing-press/library/clickup/` (a `cli-printing-press` generated tree)

```bash
cd ~/printing-press/library/clickup
make install   # builds and `go install`s to $HOME/go/bin/
```

Add new brands to `internal/cli/pm_load.go` → `brandListIDs` map. Any local edit to a generated file must also be added to `.printing-press-patches.json` (with a `// PATCH(YYYY-MM-DD): ...` comment at the edit site) — otherwise the change is lost on the next regen.
