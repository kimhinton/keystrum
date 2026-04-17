#!/usr/bin/env bash
# measure_launch.sh — Tier 3 launch-success gate for keystrum
#
# Three conditions, AND semantics. All three must pass for PASS verdict.
#
#   1. GitHub stars >= STAR_THRESHOLD
#   2. HN front-page dwell time >= HN_HOURS_THRESHOLD (manual input)
#   3. Product Hunt daily rank <= PH_RANK_THRESHOLD (manual input)
#
# Usage:
#   ./scripts/measure_launch.sh
#
# Requires:
#   gh  (GitHub CLI, authenticated)    — for star count
#   jq                                  — for JSON parsing
#
# No arguments — runs interactive for manual inputs.

set -euo pipefail

# ---- Configurable thresholds (adjust to your launch targets) ----
REPO="${REPO:-kimhinton/keystrum}"
STAR_THRESHOLD="${STAR_THRESHOLD:-100}"
HN_HOURS_THRESHOLD="${HN_HOURS_THRESHOLD:-3}"
PH_RANK_THRESHOLD="${PH_RANK_THRESHOLD:-5}"

# ---- Colors ----
if [[ -t 1 ]]; then
  GREEN="\033[32m"; RED="\033[31m"; YELLOW="\033[33m"; BOLD="\033[1m"; RESET="\033[0m"
else
  GREEN=""; RED=""; YELLOW=""; BOLD=""; RESET=""
fi

fail() { printf "${RED}✗${RESET} %s\n" "$1"; }
pass() { printf "${GREEN}✓${RESET} %s\n" "$1"; }
warn() { printf "${YELLOW}!${RESET} %s\n" "$1"; }
hdr()  { printf "\n${BOLD}%s${RESET}\n" "$1"; }

# ---- Preflight ----
if ! command -v gh >/dev/null 2>&1; then
  fail "gh (GitHub CLI) not installed. Install: https://cli.github.com"
  exit 2
fi
if ! command -v jq >/dev/null 2>&1; then
  fail "jq not installed. Install: https://jqlang.github.io/jq/download/"
  exit 2
fi

# ---- Condition 1: GitHub stars ----
hdr "Condition 1 — GitHub stars (auto)"
STARS=$(gh api "repos/${REPO}" --jq '.stargazers_count' 2>/dev/null || echo "")
if [[ -z "$STARS" ]] || ! [[ "$STARS" =~ ^[0-9]+$ ]]; then
  fail "Could not read star count for ${REPO}. Check gh auth status."
  exit 2
fi

if (( STARS >= STAR_THRESHOLD )); then
  pass "${STARS} stars  (threshold ${STAR_THRESHOLD})"
  C1=1
else
  fail "${STARS} stars  (threshold ${STAR_THRESHOLD}, short by $((STAR_THRESHOLD - STARS)))"
  C1=0
fi

# ---- Condition 2: HN front-page hours (manual) ----
hdr "Condition 2 — HN front-page dwell (manual)"
echo "  How many hours was the Show HN on the front page (1-30 range)?"
echo "  (Use https://hnrankings.info/<item-id> for precise tracking.)"
printf "  hours: "
read -r HN_HOURS
if ! [[ "$HN_HOURS" =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
  fail "Invalid input: '${HN_HOURS}'"
  exit 2
fi

if awk -v h="$HN_HOURS" -v t="$HN_HOURS_THRESHOLD" 'BEGIN{exit !(h>=t)}'; then
  pass "${HN_HOURS}h front-page  (threshold ${HN_HOURS_THRESHOLD}h)"
  C2=1
else
  fail "${HN_HOURS}h front-page  (threshold ${HN_HOURS_THRESHOLD}h)"
  C2=0
fi

# ---- Condition 3: Product Hunt daily rank (manual) ----
hdr "Condition 3 — Product Hunt daily rank (manual)"
echo "  What was the Product of the Day rank (1 = best, 99 = did not place)?"
printf "  rank: "
read -r PH_RANK
if ! [[ "$PH_RANK" =~ ^[0-9]+$ ]]; then
  fail "Invalid input: '${PH_RANK}'"
  exit 2
fi

if (( PH_RANK <= PH_RANK_THRESHOLD )); then
  pass "#${PH_RANK} on PH  (threshold ≤#${PH_RANK_THRESHOLD})"
  C3=1
else
  fail "#${PH_RANK} on PH  (threshold ≤#${PH_RANK_THRESHOLD})"
  C3=0
fi

# ---- Verdict ----
hdr "Tier 3 gate (3-condition AND)"
printf "  C1 (stars):  %s\n" "$([[ $C1 == 1 ]] && echo PASS || echo FAIL)"
printf "  C2 (HN):     %s\n" "$([[ $C2 == 1 ]] && echo PASS || echo FAIL)"
printf "  C3 (PH):     %s\n" "$([[ $C3 == 1 ]] && echo PASS || echo FAIL)"

if [[ $C1 == 1 && $C2 == 1 && $C3 == 1 ]]; then
  printf "\n${GREEN}${BOLD}VERDICT: PASS${RESET} — launch thresholds met.\n"
  exit 0
else
  printf "\n${RED}${BOLD}VERDICT: FAIL${RESET} — one or more thresholds missed.\n"
  printf "Consider: extending launch push (Week 2 newsletter submits, creator follow-ups), or accepting results and moving to next iteration.\n"
  exit 1
fi
