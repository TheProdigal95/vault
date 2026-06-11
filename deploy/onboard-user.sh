#!/usr/bin/env bash
# ============================================================================
# Reach Digital — Per-User Onboarder
# ============================================================================
# Onboards a new team member to the deployed Reach Digital Hermes stack.
#
# Usage (as the deploy user, not root):
#   bash onboard-user.sh <username> [--ssh-key-path /path/to/their/key.pub]
#
# What it does:
#   1. Creates a per-user Hermes profile (cloned from the reach-digital distribution)
#   2. Adds the user's SSH public key to the VPS's authorized_keys
#   3. Generates a local-app config snippet for them (printed to stdout)
#   4. (Optional) Provisions their .env with team-shared API keys
#
# After this script finishes, send the user the printed config snippet.
# They paste it into their local Hermes app and they're running.
# ============================================================================

set -euo pipefail

# --- Argument parsing ---------------------------------------------------------
USERNAME="${1:-}"
SSH_KEY_PATH=""
shift || true
while [ $# -gt 0 ]; do
  case "$1" in
    --ssh-key-path) SSH_KEY_PATH="${2:-}"; shift 2 ;;
    --help|-h)
      sed -n '2,20p' "$0"; exit 0 ;;
    *) echo "Unknown flag: $1" >&2; exit 2 ;;
  esac
done

if [ -z "$USERNAME" ]; then
  echo "Usage: bash onboard-user.sh <username> [--ssh-key-path /path/to/their/key.pub]" >&2
  exit 2
fi

# --- Sanity checks ------------------------------------------------------------
if [ "$(id -u)" -eq 0 ]; then
  echo "ERROR: this script should NOT be run as root. Run as the deploy user." >&2
  exit 1
fi

if ! command -v hermes >/dev/null 2>&1; then
  echo "ERROR: hermes not on PATH. Run deploy-stack.sh first." >&2
  exit 1
fi

VPS_PUBLIC_HOST="${VPS_PUBLIC_HOST:-<set-this-to-your-vps-public-hostname-or-ip>}"
VPS_SSH_PORT="${VPS_SSH_PORT:-22}"

# --- Output helpers -----------------------------------------------------------
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'
ok()   { printf "  ${GREEN}\xe2\x9c\x93${NC} %s\n" "$*"; }
warn() { printf "  ${YELLOW}!${NC} %s\n" "$*"; }
err()  { printf "  ${RED}\xe2\x9c\x97${NC} %s\n" "$*"; }
hdr()  { printf "\n${BOLD}${BLUE}\xe2\x94\xbf\xe2\x94\xbf\xe2\x94\xbf %s \xe2\x94\xbf\xe2\x94\xbf\xe2\x94\xbf${NC}\n" "$*"; }
note() { printf "    ${YELLOW}\xe2\x86\x92${NC} %s\n" "$*"; }

# --- Phase 1: add SSH key -----------------------------------------------------
hdr "Phase 1: add SSH public key"
if [ -n "$SSH_KEY_PATH" ] && [ -f "$SSH_KEY_PATH" ]; then
  mkdir -p "$HOME/.ssh"
  chmod 700 "$HOME/.ssh"
  cat "$SSH_KEY_PATH" >> "$HOME/.ssh/authorized_keys"
  chmod 600 "$HOME/.ssh/authorized_keys"
  ok "Added $SSH_KEY_PATH to authorized_keys"
else
  warn "No SSH key provided. The user will need to add theirs manually:"
  note "Ask $USERNAME to run: ssh-keygen -t ed25519"
  note "Then add ~/.ssh/id_ed25519.pub to: $HOME/.ssh/authorized_keys"
fi

# --- Phase 2: create per-user profile ----------------------------------------
hdr "Phase 2: create Hermes profile for $USERNAME"
PROFILE_DIR="$HOME/.hermes/profiles/$USERNAME"
if [ -d "$PROFILE_DIR" ]; then
  warn "Profile $USERNAME already exists at $PROFILE_DIR"
  warn "(Skipping profile create. Re-run with --force to recreate.)"
else
  # Clone the reach-digital profile (config.yaml, SOUL.md, skills, MCP). NOTE:
  # `--clone` ALSO copies .env, so we scrub the source secret values immediately —
  # each user supplies their own keys. (There is no --yes flag; profile create is
  # non-interactive.)
  hermes profile create "$USERNAME" --clone --clone-from reach-digital
  if [ -f "$PROFILE_DIR/.env" ]; then
    # Blank every VAR=value to VAR= so the source machine's keys never leak into
    # a teammate's profile, while leaving the key names as a template to fill in.
    sed -i.bak -E 's/^([A-Za-z_][A-Za-z0-9_]*=).*/\1/' "$PROFILE_DIR/.env" && rm -f "$PROFILE_DIR/.env.bak"
    ok "Scrubbed cloned .env — key names kept, values blank for $USERNAME to fill"
  fi
  ok "Profile $USERNAME created (cloned from reach-digital)"
  note "Their .env values are blank, memories/sessions empty — they fill those in."
fi

# --- Phase 3: generate the local-app config snippet --------------------------
hdr "Phase 3: local-app config snippet for $USERNAME"
SNIPPET_FILE="$(mktemp -t hermes-config-$USERNAME.XXXXXX.yaml)"
cat > "$SNIPPET_FILE" <<EOF
# Reach Digital Hermes config for $USERNAME
# Paste this into your local Hermes app's config (or save as
# ~/.hermes/profiles/reach-digital/config.yaml on your local machine
# if running the CLI). Delete the lines below this header.

profile: $USERNAME

terminal:
  backend: ssh
  ssh_host: $VPS_PUBLIC_HOST
  ssh_port: $VPS_SSH_PORT
  ssh_user: $(whoami)
  # The local app uses your SSH key to authenticate.
  # Make sure your ~/.ssh/id_ed25519 (or id_rsa) is loaded into the agent:
  #   eval "\$(ssh-agent -s)" && ssh-add ~/.ssh/id_ed25519
EOF

ok "Snippet written to $SNIPPET_FILE"
echo ""
echo "================================================================="
echo "  CONFIG SNIPPET FOR $USERNAME (paste into their local Hermes app)"
echo "================================================================="
echo ""
cat "$SNIPPET_FILE"
echo ""
echo "================================================================="
echo ""
ok "Done. Send $USERNAME the snippet + the team onboarding doc:"
echo "    deploy/ONBOARDING.md   (in the vault repo on the VPS)"
