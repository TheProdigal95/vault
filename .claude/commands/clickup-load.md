# ClickUp Load — Push Vault Markdown to ClickUp

Load scripts or briefs from a vault markdown file into ClickUp as tasks.

**Binary:** `$HOME/go/bin/clickup-pp-cli` (always call by absolute path)

**Auth:** Set `CLICKUP_API_TOKEN` to your personal ClickUp API token.

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
- Assigns: current strategist (from `.claude/strategist.json`) + Diksha Sharma
- Status: `brief approved, in design`

**`footage-request` command:**
- Creates a single footage request task
- Assigns: strategist + Karra Worang
- Status: `Footage Requested`
- Auto-resolves Footage Requests list by walking the workspace hierarchy

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
# Add to ~/.zshrc or ~/.bashrc
export CLICKUP_API_TOKEN="pk_XXXX..."
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

Source lives at: `~/printing-press/library/clickup/`

```bash
go build -C "$HOME/printing-press/library/clickup" \
  -o "$HOME/go/bin/clickup-pp-cli" ./cmd/clickup-pp-cli
```

Add new brands to `internal/cli/pm_load.go` → `brandListIDs` map.
