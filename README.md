<div align="center">

<img src="public/hero-screenshot.png" alt="keystrum — Strum your keyboard" width="720" />

# keystrum

### Strum your keyboard. Practice guitar chords — no guitar needed.

A browser-based virtual guitar that maps your QWERTY keyboard to a 6-chord strum machine.<br/>
Four rows become four strings. Six columns become six chords. Real strum detection.<br/>
No install. No account. No samples. Karplus-Strong synthesis in a tab.

<sub>Built for: music beginners learning chords · DAW producers sketching ideas ·
late-night jammers without a guitar · music teachers looking for a browser chord tool.</sub>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/kimhinton/keystrum/ci.yml?branch=main&label=build)](https://github.com/kimhinton/keystrum/actions)
[![GitHub stars](https://img.shields.io/github/stars/kimhinton/keystrum?style=social)](https://github.com/kimhinton/keystrum/stargazers)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)

[**Live Demo**](https://keystrum.app) &nbsp;&middot;&nbsp; [**Play Songs**](https://keystrum.app/play) &nbsp;&middot;&nbsp; [**Chord Dictionary**](https://keystrum.app/chords)

</div>

---

## Demo

<div align="center">

<img src="public/demo.gif" alt="keystrum demo — strumming six guitar chords on a QWERTY keyboard" width="720" />

<sub>Strumming Am → C → Em → G → Dm → F, then a quick Am–F–C–G progression. All sound generated live in the browser via Karplus-Strong synthesis — no samples, no downloads.</sub>

</div>

## Screenshots

<table>
<tr>
<td width="50%"><img src="public/play-screenshot.png" alt="keystrum practice mode — pick a song" /></td>
<td width="50%"><img src="public/chords-screenshot.png" alt="keystrum chord dictionary — Am, C, Em, G, Dm, F" /></td>
</tr>
<tr>
<td align="center" width="50%"><sub><a href="https://keystrum.app/play">Practice mode</a> — three folk songs with strum · hold · mute lanes.</sub></td>
<td align="center" width="50%"><sub><a href="https://keystrum.app/chords">Chord dictionary</a> — six open-position chords, each on its own keyboard column.</sub></td>
</tr>
</table>

## What is this?

keystrum lets you practice guitar chords without a guitar. It's not a guitar simulator, not a toy piano — it's a dedicated strum machine built for the QWERTY keyboard you already have.

Your keyboard has four usable rows. Each row becomes a string. Each vertical column maps to a chord. Sweep a column top-to-bottom fast — that's a strum. The sound is generated live via Karplus-Strong physical-modeling synthesis, the same algorithm used for real plucked-string sounds. No samples, no downloads.

```
         Am       C       Em       G       Dm       F
       ┌──────┬──────┬──────┬──────┬──────┬──────┐
  E4   │  1   │  2   │  3   │  4   │  5   │  6   │  ← highest pitch
       ├──────┼──────┼──────┼──────┼──────┼──────┤
  B3   │  Q   │  W   │  E   │  R   │  T   │  Y   │
       ├──────┼──────┼──────┼──────┼──────┼──────┤
  G3   │  A   │  S   │  D   │  F   │  G   │  H   │
       ├──────┼──────┼──────┼──────┼──────┼──────┤
  D3   │  Z   │  X   │  C   │  V   │  B   │  N   │  ← lowest pitch
       └──────┴──────┴──────┴──────┴──────┴──────┘
                                              Mute keys: J  K  L  ;
```

Hit `2` → `W` → `S` → `X` fast. You just strummed a **C major** chord.

## Features

<table>
<tr>
<td width="50%">

**Strum Detection**<br/>
Sweep 3+ keys in a column within 90ms — keystrum reads it as a downstroke. Reverse for upstroke. It feels physical.

**6 Diatonic Chords**<br/>
Am · C · Em · G · Dm · F — all chords in C major / A minor. One chord per column.

**Karplus-Strong Synthesis**<br/>
Physical modeling algorithm generating sound live in Web Audio. No samples. No downloads. The sound exists only while you play.

</td>
<td width="50%">

**Practice Mode**<br/>
3 folk songs with an animated character showing when to strum, hold, and mute. Score saves locally.

**Palm Mute**<br/>
J / K / L / ; keys — percussive mute on the right-hand home row. Progressive difficulty introduces them one at a time.

**Score Sharing**<br/>
Best scores persist in localStorage. Share your run via URL.

</td>
</tr>
</table>

## Why keystrum?

**Music beginners learning chords.** You hear "just practice your chord changes" and you don't own a guitar yet — or you do, but you're on the subway or in a hotel. keystrum gives you the six most common chords in C major / A minor on the keyboard in front of you. The muscle memory translates back to a real guitar: same chord progressions, same strum timing, same mute feel.

**DAW producers sketching ideas.** You're in Logic or Ableton, you want to hear an Am–F–C–G progression before you commit to a MIDI pattern. Open a tab, hit `1` `q` `a` `z` → you hear Am. No plugin loading, no sample library scanning. Karplus-Strong produces an acoustic-guitar tone live in Web Audio.

**Late-night jammers without a guitar at hand.** Your guitar is in the other room, the amp is off, the roommate is asleep. keystrum is a full-volume practice rig through headphones with real chord voicings and real strum detection. Sweep the column fast — it strums. Sweep slow — it picks.

**Music teachers looking for a browser chord tool.** Classroom Chromebooks don't have guitars, but every Chromebook has a keyboard. keystrum opens in any browser with no install, no login, no data stored on servers. Point a student's URL at `keystrum.app/play` and they have a chord trainer with three folk songs and progressive difficulty.

## Quick Start

```bash
git clone https://github.com/kimhinton/keystrum.git
cd keystrum
pnpm install
pnpm run dev
```

Requires **pnpm ≥ 10** and **Node ≥ 22** (matches CI).
Open **http://localhost:3000** → press some keys → hear chords.

## Practice Mode

Three songs with progressive difficulty:

| Song | BPM | Time Sig | Difficulty | Mute Keys | Description |
|------|:---:|:--------:|:----------:|:---------:|-------------|
| House of the Rising Sun | 72 | 4/4 | Easy | J | Am–C–Dm–F progression, single strums to pairs |
| Scarborough Fair | 92 | 3/4 | Medium | J, K | Dorian waltz, introduces second mute key |
| Greensleeves | 100 | 3/4 | Medium | J, K, L | Full 6-chord usage, three mute keys |

Each song has two verses: **Verse 1** teaches the pattern sparse. **Verse 2** plays it full.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js](https://nextjs.org/) 16 + [React](https://react.dev/) 19 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 4 + [shadcn/ui](https://ui.shadcn.com/) |
| Audio | Web Audio API — Karplus-Strong physical modeling synthesis |
| State | [Zustand](https://github.com/pmndrs/zustand) with localStorage persistence |
| Language | TypeScript (strict) |
| Deploy | Static export → any CDN (Cloudflare Pages, Vercel, Netlify) |

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing — hero + live instrument
│   ├── play/                   # Practice mode (song list + gameplay)
│   │   ├── page.tsx            # Song selection
│   │   └── [song]/page.tsx     # Game screen
│   ├── chords/                 # Chord dictionary
│   │   ├── page.tsx            # All 6 chords
│   │   └── [name]/page.tsx     # Individual chord detail
│   └── share/                  # Score sharing
├── components/
│   ├── game/                   # GameRunner (918L), GameStage SVG (987L), SongCard
│   └── keyboard-guitar/        # Interactive keyboard on homepage
└── lib/
    ├── audio/                  # Karplus-Strong synth engine (148L)
    ├── game/                   # Types, songs, judgment, Zustand store
    └── keyboard/               # Layout mapping, chord presets, chord theory
```

## Build & Deploy

```bash
pnpm run build     # Static export → out/
pnpm run lint      # ESLint
pnpm exec tsc --noEmit  # Type check
```

The `out/` directory is a static site — deploy to any hosting.

## Contributing

Contributions welcome. See **[CONTRIBUTING.md](CONTRIBUTING.md)** for setup, code style, and how to add songs.

## License

[MIT](LICENSE)

---

<div align="center">
<sub>Built with Web Audio API · No animals were harmed in the making of this instrument</sub>
</div>
