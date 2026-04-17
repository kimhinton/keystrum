#!/usr/bin/env bash
# setup-capacitor.sh — one-shot Capacitor bootstrap for keystrum
# Usage: bash scripts/setup-capacitor.sh

set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f package.json ]]; then
  echo "✗ Run from the project root or use bash scripts/setup-capacitor.sh" >&2
  exit 1
fi

echo "→ Installing Capacitor deps (already in package.json, runs npm install)"
npm install

echo "→ Building Next.js static export to out/"
npm run build

if [[ ! -d android ]]; then
  echo "→ Adding Android platform (npx cap add android)"
  npx cap add android
else
  echo "✓ android/ already exists — skipping cap add"
fi

if [[ ! -d ios ]]; then
  echo "→ Adding iOS platform (npx cap add ios)"
  echo "  note: on Windows, this only copies template files — iOS building requires macOS"
  npx cap add ios || echo "! iOS platform add failed (expected on non-Mac hosts); skipping"
else
  echo "✓ ios/ already exists — skipping cap add"
fi

echo "→ Syncing web assets + plugins into native projects"
npx cap sync

echo ""
echo "✓ Capacitor bootstrap complete."
echo ""
echo "Next steps:"
echo "  Android (local build):"
echo "    npm run cap:android           # opens Android Studio"
echo "    npm run android:build-aab     # or: build release AAB from CLI"
echo ""
echo "  iOS (requires macOS; recommend GitHub Actions):"
echo "    Push a tag starting with 'v' (e.g. v0.1.0) to trigger iOS CI,"
echo "    or run Workflow 'iOS Build' from Actions tab."
echo ""
echo "  App Store submission docs:"
echo "    docs/app-store/README.md"
