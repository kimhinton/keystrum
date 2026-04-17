# Screenshots — Capture Checklist

## Apple App Store required sizes (2026)

| Device | Resolution | Min count |
|--------|-----------|-----------|
| 6.9" iPhone (16 Pro Max) | 1320×2868 portrait | 3 |
| 6.5" iPhone (11 Pro Max) | 1284×2778 portrait | 3 |
| 13" iPad Pro | 2064×2752 portrait | 3 |

Apple accepts the 6.9" as the primary and auto-downscales for smaller sizes; you
can upload only the 6.9" set if you want the minimum viable submission.

## Google Play required sizes

| Type | Resolution | Min count |
|------|-----------|-----------|
| Phone screenshot | 1080×1920 portrait (or landscape) | 2 |
| Tablet screenshot | 1600×2560 portrait | optional but recommended |
| Feature graphic | 1024×500 | required (single) |

## Content shot list (same set for both stores)

### Shot 1 — Hero / instrument open
- URL: https://keystrum.app/instrument
- Wait for: "audio live" chip green
- Caption overlay: **"Four rows. Six chords. One sweep."**
- Frame: full keyboard visible, chord strip top, control bar bottom

### Shot 2 — Touch strum in action
- URL: https://keystrum.app/instrument
- Action: finger on column 2 (C chord), mid-sweep
- Chord strip shows C highlighted
- Strum pulse indicator (↓) visible
- Caption: **"Sweep a column. That's a strum."**

### Shot 3 — Practice mode
- URL: https://keystrum.app/play/house-of-the-rising-sun
- Action: mid-gameplay, character animating, score visible
- Caption: **"Learn with folk songs."**

### Shot 4 — Recording in progress
- URL: https://keystrum.app/instrument
- Action: REC active, timer showing ~12 seconds
- Recording indicator pulse visible
- Caption: **"Record. Share. Keep."**

### Shot 5 — Chord dictionary (iPad only)
- URL: https://keystrum.app/chords
- Caption: **"Six chords, six columns, full theory."**

## Capture tooling

Option A — **Browser devtools** (free, manual):
- Chrome DevTools → Device toolbar → iPhone 15 Pro Max (auto-detected DPR).
- Screenshot via ⋮ menu → "Capture screenshot."
- Export will be correct resolution. Repeat for iPad.

Option B — **Playwright** (scriptable, reproducible):
- Install: `npm i -D playwright`
- Run the provided `scripts/capture-screenshots.mjs` (to-be-added)
- Outputs PNG files at correct DPR for all sizes.

Option C — **Real device** (for App Store authenticity):
- iPhone: Open keystrum.app in Safari → Add to Home Screen → take screenshot
  with Side+Vol Up. iOS will size to 1320×2868 on Pro Max.
- iPad: Same flow on iPad Pro → 2064×2752.

Recommended order: Option A for first submission speed; Option B for future re-captures.

## Feature graphic (Google Play, 1024×500)

Design brief:
- Left half: keystrum wordmark + "Strum your keyboard" tagline
- Right half: crop of keyboard with chord strip overlay
- Palette: #0b0b0f background, #ff6b35 accent, neutral-200 body text
- Export as PNG, < 1MB

## Preview video (optional, strongly recommended for ASO)

Apple spec:
- 30 seconds MAX
- Portrait 1080×1920, H.264, .mov
- Device silhouette mandatory (can be added in Final Cut or iMovie)

Content arc:
- 0-5s: Silent keyboard appearing
- 5-15s: Strum demo (existing `public/demo.gif` sequence captured as video)
- 15-25s: Record → share flow
- 25-30s: Logo + "keystrum.app"

Do NOT add voiceover — Apple strips it in some locales. Let the music carry.
