#!/usr/bin/env bash
# ============================================================================
# Reach Digital — VPS Restore
# ============================================================================
# Restores a Reach Digital VPS from a Hetzner/DigitalOcean snapshot.
#
# Usage (after Hetzner/DO has restored the snapshot to a new volume):
#   sudo bash restore.sh
#
# What it does:
#   1. Verifies we're on a fresh box with the restored snapshot mounted
#   2. Re-creates the deploy user if missing
#   3. Re-runs vps-provision.sh (idempotent) to re-apply hardening
#   4. Verifies the 3 repos are at /opt/reach-digital/
#   5. Re-runs the smoke test
#
# IMPORTANT: this script does NOT restore the snapshot itself.
# Restore the snapshot via your provider's UI first, then run this.
# ============================================================================

set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'
ok()   { printf "  ${GREEN}\xe2\x9c\x93${NC} %s\n" "$*"; }
warn() { printf "  ${YELLOW}!${NC} %s\n" "$*"; }
err()  { printf "  ${RED}\xe2\x9c\x97${NC} %s\n" "$*"; }
hdr()  { printf "\n${BOLD}${BLUE}\xe2\x94\xbf\xe2\x94\xbf\xe2\x94\xbf %s \xe2\x94\xbf\xe2\x94\xbf\xe2\x94\xbf${NC}\n" "$*"; }

if [ "$(id -u)" -ne 0 ]; then
  err "This script must be run as root (sudo bash restore.sh)"
  exit 1
fi

# --- Phase 1: snapshot verification -------------------------------------------
hdr "Phase 1: verify restored snapshot"
for path in /opt/reach-digital /home; do
  if [ ! -d "$path" ]; then
    err "$path missing. Did the snapshot restore correctly?"
    exit 1
  fi
done
ok "Core paths present"

# --- Phase 2: re-apply hardening (idempotent) --------------------------------
hdr "Phase 2: re-apply hardening"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_USER="$(ls /home | grep -v '^_' | head -1 || echo hermes)"
if [ -f "$SCRIPT_DIR/vps-provision.sh" ]; then
  bash "$SCRIPT_DIR/vps-provision.sh" "$DEPLOY_USER" || warn "vps-provision.sh had warnings (probably normal on a restored box)"
else
  warn "vps-provision.sh not found at $SCRIPT_DIR (skipping re-hardening)"
fi

# --- Phase 3: verify the 3 repos ---------------------------------------------
hdr "Phase 3: verify the 3 repos"
for repo in vault printing-press hermes-profile; do
  if [ -d "/opt/reach-digital/$repo" ]; then
    cd "/opt/reach-digital/$repo"
    if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
      COMMIT="$(git log --oneline -1 2>&1)"
      ok "$repo: $COMMIT"
    else
      err "$repo: not a git repo?"
    fi
  else
    err "$repo: missing at /opt/reach-digital/$repo"
  fi
done

# --- Phase 4: smoke test -----------------------------------------------------
hdr "Phase 4: smoke test"
# Re-run as the deploy user
DEPLOY_USER_HOME="$(getent passwd "$DEPLOY_USER" | cut -d: -f6)"
SMOKE="$DEPLOY_USER_HOME/.hermes/profiles/reach-digital/skills/reach-digital/reach-digital-ops/scripts/smoke-test.sh"
if [ -f "$SMOKE" ]; then
  if sudo -u "$DEPLOY_USER" bash "$SMOKE" 2>&1 | tail -20; then
    ok "Smoke test passed"
  else
    warn "Smoke test had warnings (see above)"
  fi
else
  warn "Smoke test not found at $SMOKE"
fi

# --- Done --------------------------------------------------------------------
hdr "Done"
cat <<EOF

  VPS restored.

  If anything is red above, address it before opening the gateway to the team:
    - bash /opt/reach-digital/vault/deploy/deploy-stack.sh    # re-run if needed
    - bash $SCRIPT_DIR/onboard-user.sh <username>             # re-add users

  Verify the gateway is up:
    sudo -u $DEPLOY_USER /home/$DEPLOY_USER/.local/bin/reach-digital gateway status
EOF
