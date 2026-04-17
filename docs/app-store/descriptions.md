# Store Descriptions

## Apple App Store

### Name (30 chars)
```
keystrum — Strum Instrument
```
Count: 26

### Subtitle (30 chars)
```
Your keyboard is a guitar.
```
Count: 25

### Promotional Text (170 chars) — editable without re-review
```
Four rows of keys become four strings. Six columns become six chords. Sweep a column fast — that's a strum. Record, share, play. Live guitar synthesis on a keyboard.
```
Count: 167

### Description (4000 chars max)
```
keystrum turns your keyboard into a 6-chord strum machine.

Four rows of keys map to four guitar strings (D3, G3, B3, E4). Six vertical columns map to six chords (Am, C, Em, G, Dm, F). Sweep a column of keys under 90 milliseconds and keystrum reads it as a downstroke. Reverse the direction for an upstroke. The sweep feels physical — there's a real difference between a fast strum and a slow one, and between down and up.

No samples, no downloads, no plugins. keystrum uses Karplus-Strong physical modeling — a 148-line synthesis engine that generates plucked-string sound live as you play. The sound exists only while you're playing it.

FEATURES

• Strum detection — sweep 3+ keys in a column within 90ms and it fires a strum event
• 6 diatonic chords — Am · C · Em · G · Dm · F, all within C major / A minor
• Karplus-Strong synthesis — physical modeling, not samples, not MIDI
• Touch-drag strum — drag across the on-screen keyboard on iPad
• Record and share — capture up to 30 seconds of playing, share to the system share sheet as M4A or download to Files
• Practice mode — three folk songs (House of the Rising Sun, Scarborough Fair, Greensleeves) with an animated guide showing when to strum, hold, and mute
• Chord dictionary — browse all six chords with their theory, keyboard mapping, and song examples
• Fully offline — no account, no network, no upload, no tracking

USE ON IPAD

Pair a Bluetooth or Smart Keyboard for the full experience. Each physical key on your iPad keyboard becomes part of the instrument. Touch-drag also works without a keyboard.

PALM MUTE

Keys past column 6 (7-=, u-], j-', m-/) produce percussive palm-muted ghost notes — use them as passing tones or to tighten up a progression.

PRIVACY

keystrum makes no network requests. Recordings never leave your device. No account, no analytics, no ads, no tracking. Source code is MIT licensed on GitHub.

FOR DEVELOPERS

The entire sound engine is 148 lines of TypeScript implementing Karplus-Strong: a delay line filled with noise, fed through a lowpass filter, tuned to the target pitch. Source available at https://github.com/kimhinton/keystrum

KEYBOARD LAYOUT

  Am    C    Em    G    Dm    F       (chord columns)
1    2    3    4    5    6             E4 row (highest)
 Q    W    E    R    T    Y             B3 row
  A    S    D    F    G    H            G3 row
   Z    X    C    V    B    N           D3 row (lowest)

Four rows, four strings, six columns, six chords. Press 2 → W → S → X fast — you just strummed a C major.
```
Count: ~2500

### What's New (for updates)
```
v0.1.0 — Initial launch.
```

---

## Google Play Store

### App name (30 chars)
```
keystrum — Strum Instrument
```
Count: 26

### Short description (80 chars)
```
Turn your keyboard into a 6-chord strum machine. Karplus-Strong, no install.
```
Count: 78

### Full description (4000 chars — use Apple description above, identical copy OK)

Use the Apple description verbatim for Google Play. No policy conflict.

### Tags
See `keywords.md`.

---

## Launch metadata (first release)

- **Category (Apple)**: Music (primary), Entertainment (secondary)
- **Category (Google Play)**: Music & Audio
- **Age rating (Apple)**: 4+ (no restricted content)
- **Content rating (Google Play)**: Everyone
- **Price**: Free, no IAP
- **Support URL**: https://github.com/kimhinton/keystrum/issues
- **Marketing URL**: https://keystrum.app
- **Privacy Policy URL**: REQUIRED — create at https://keystrum.app/privacy before submitting (state: no data collection, no network calls, no third-party SDKs)
