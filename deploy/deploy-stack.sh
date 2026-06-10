#!/usr/bin/env bash
# ============================================================================
# Reach Digital — Stack Deployer
# ============================================================================
# Deploys the Reach Digital Hermes stack on a hardened VPS that has
# vps-provision.sh already run.
#
# Usage (as the deploy user, not root):
#   bash deploy-stack.sh
#
# What it does:
#   1. Verifies the 3 repos are cloned to /opt/reach-digital/{vault,printing-press,hermes-profile}
#   2. Installs Hermes Agent CLI
#   3. Builds the Go CLIs (motion-pp-cli, clickup-pp-cli) from printing-press
#   4. Installs Node tool deps in vault/00 Global/Hermes/Tools/
#   5. Creates the "default" Hermes profile and installs the reach-digital distribution
#   6. Runs the vault's setup.sh smoke test
#   7. Prints a summary
# ============================================================================

set -euo pipefail

# --- Path setup ---------------------------------------------------------------
REPO_ROOT="${REPO_ROOT:-/opt/reach-digital}"
VAULT="$REPO_ROOT/vault"
PP="$REPO_ROOT/printing-press"
HERMES_PROFILE="$REPO_ROOT/hermes-profile"
HERMES_BIN="${HERMES_BIN:-$(command -v hermes 2>/dev/null || echo /usr/local/bin/hermes)}"

# --- Output helpers -----------------------------------------------------------
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'
ok()   { printf "  ${GREEN}\xe2\x9c\x93${NC} %s\n" "$*"; }
warn() { printf "  ${YELLOW}!${NC} %s\n" "$*"; }
err()  { printf "  ${RED}\xe2\x9c\x97${NC} %s\n" "$*"; }
hdr()  { printf "\n${BOLD}${BLUE}\xe2\x94\xbf\xe2\x94\xbf\xe2\x94\xbf %s \xe2\x94\xbf\xe2\x94\xbf\xe2\x94\xbf${NC}\n" "$*"; }

# --- Pre-flight ---------------------------------------------------------------
hdr "Pre-flight"
[ -d "$VAULT" ]            || { err "Vault not found at $VAULT. Clone it first."; exit 1; }
[ -d "$PP" ]               || { err "printing-press not found at $PP. Clone it first."; exit 1; }
[ -d "$HERMES_PROFILE" ]   || { err "hermes-profile not found at $HERMES_PROFILE. Clone it first."; exit 1; }
ok "All 3 repos present at $REPO_ROOT"

if [ "$(id -u)" -eq 0 ]; then
  err "This script should NOT be run as root. Run as the deploy user (e.g. hermes)."
  err "If you don't have a deploy user, run vps-provision.sh first."
  exit 1
fi

# --- Phase 1: install Hermes Agent -------------------------------------------
hdr "Phase 1: install Hermes Agent"
if command -v hermes >/dev/null 2>&1; then
  ok "Hermes already installed: $(hermes --version 2>&1 | head -1)"
else
  curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
  ok "Installed Hermes"
fi

# Verify profile install is available (requires v0.12.0+)
HERMES_VERSION="$(hermes --version 2>&1 | head -1 | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1 || echo 'unknown')"
HERMES_MAJOR="$(echo "$HERMES_VERSION" | cut -d. -f1)"
HERMES_MINOR="$(echo "$HERMES_VERSION" | cut -d. -f2)"
if [ "$HERMES_MAJOR" = "unknown" ] || [ "$HERMES_MAJOR" -lt 1 ] && [ "$HERMES_MINOR" -lt 12 ]; then
  warn "Hermes $HERMES_VERSION detected. Profile Distribution requires v0.12.0+."
  warn "Run: hermes update"
  warn "(Continuing anyway — distribution install will fail if version is too old.)"
else
  ok "Hermes $HERMES_VERSION supports profile distributions"
fi

# --- Phase 2: build Go CLIs ---------------------------------------------------
hdr "Phase 2: build Go CLIs"
mkdir -p "$HOME/go/bin"
export PATH="$HOME/go/bin:$PATH"
for cli in clickup motion; do
  if [ -d "$PP/library/$cli" ]; then
    if command -v "$cli-pp-cli" >/dev/null 2>&1; then
      ok "$cli-pp-cli already built: $(command -v $cli-pp-cli)"
    else
      note() { printf "    ${YELLOW}\xe2\x86\x92${NC} %s\n" "$*"; }
      note "Building $cli-pp-cli from $PP/library/$cli"
      (cd "$PP/library/$cli" && go build -o "$HOME/go/bin/$cli-pp-cli" "./cmd/$cli-pp-cli") \
        && ok "$cli-pp-cli built -> $HOME/go/bin/$cli-pp-cli" \
        || err "$cli-pp-cli build FAILED"
    fi
  else
    warn "Skipping $cli: $PP/library/$cli not found"
  fi
done

# --- Phase 3: install Node tool deps -----------------------------------------
hdr "Phase 3: install Node tool deps"
if [ ! -d "$VAULT/00 Global/Hermes/Tools" ]; then
  warn "Vault tools dir not found: $VAULT/00 Global/Hermes/Tools"
  warn "(Make sure the vault was cloned correctly. Skipping.)"
else
  for tool_dir in "$VAULT/00 Global/Hermes/Tools"/*/; do
    [ -d "$tool_dir" ] || continue
    name="$(basename "$tool_dir")"
    if [ ! -f "$tool_dir/package.json" ]; then
      continue  # not a Node tool
    fi
    if [ -d "$tool_dir/node_modules" ]; then
      ok "$name (node_modules present)"
    else
      note() { printf "    ${YELLOW}\xe2\x86\x92${NC} %s\n" "$*"; }
      note "npm install in $name"
      (cd "$tool_dir" && npm install --silent) && ok "$name installed" || err "$name FAILED"
    fi
  done
fi

# --- Phase 4: install the reach-digital Hermes profile ------------------------
hdr "Phase 4: install reach-digital Hermes profile"
PROFILE_DIST="$HERMES_PROFILE"
if [ ! -f "$PROFILE_DIST/distribution.yaml" ]; then
  err "distribution.yaml not found at $PROFILE_DIST"
  err "(The hermes-profile repo needs a distribution.yaml at its root.)"
  exit 1
fi
if hermes profile list 2>&1 | grep -qE "reach-digital"; then
  ok "reach-digital profile already installed"
else
  note() { printf "    ${YELLOW}\xe2\x86\x92${NC} %s\n" "$*"; }
  note "hermes profile install $PROFILE_DIST --alias"
  hermes profile install "$PROFILE_DIST" --alias --yes || {
    err "Profile install failed. Check the output above."
    exit 1
  }
  ok "reach-digital profile installed"
fi

# --- Phase 5: smoke test ------------------------------------------------------
hdr "Phase 5: smoke test"
SMOKE="$HOME/.hermes/profiles/reach-digital/skills/reach-digital/reach-digital-ops/scripts/smoke-test.sh"
if [ -f "$SMOKE" ]; then
  if bash "$SMOKE" 2>&1 | tail -25; then
    ok "Smoke test passed"
  else
    warn "Smoke test reported warnings (see output above)"
  fi
else
  warn "Smoke test script not found at $SMOKE"
  warn "(This is normal for a fresh profile install; the script is in the vault.)"
fi

# --- Done --------------------------------------------------------------------
hdr "Done"
cat <<EOF

  Stack is deployed. To use it:

    reach-digital chat                  # interactive chat
    reach-digital gateway start         # start the messaging gateway
    reach-digital doctor                # health check

  Onboard a new team member:
    bash $VAULT/deploy/onboard-user.sh <username>

  The full master doc is at:
    $VAULT/deploy/README.md
EOF
