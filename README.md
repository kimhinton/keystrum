<div align="center">

# keystrum

**Strum your keyboard.**

A browser-based instrument that turns your QWERTY keyboard into a 6-chord strum machine. No install, no account, no samples — just Web Audio synthesis in a tab.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/kimhinton/keystrum/ci.yml?branch=main&label=build)](https://github.com/kimhinton/keystrum/actions)
[![GitHub stars](https://img.shields.io/github/stars/kimhinton/keystrum?style=social)](https://github.com/kimhinton/keystrum)

[Live Demo](https://keystrum.app) · [Play Songs](https://keystrum.app/play) · [Chord Dictionary](https://keystrum.app/chords)

</div>

---

## What is keystrum?

keystrum is a new kind of instrument. Your keyboard's four rows become four strings. Each vertical column maps to a chord. Sweep a column top-to-bottom — that's a strum.

```
        Am       C       Em       G       Dm       F
      ┌──────┬──────┬──────┬──────┬──────┬──────┐
Row 1 │  1   │  2   │  3   │  4   │  5   │  6   │  ← highest pitch
      ├──────┼──────┼──────┼──────┼──────┼──────┤
Row 2 │  Q   │  W   │  E   │  R   │  T   │  Y   │
      ├──────┼──────┼──────┼──────┼──────┼──────┤
Row 3 │  A   │  S   │  D   │  F   │  G   │  H   │
      ├──────┼──────┼──────┼──────┼──────┼──────┤
Row 4 │  Z   │  X   │  C   │  V   │  B   │  N   │  ← lowest pitch
      └──────┴──────┴──────┴──────┴──────┴──────┘
                                            Mute: J K L ;
```

Hit `2`, `W`, `S`, `X` fast — you just strummed a C major chord.

## Features

| Feature | Description |
|---------|-------------|
| **Strum detection** | Sweep 3+ keys in a column within 90ms — keystrum reads it as a downstroke. Reverse for upstroke. |
| **6 diatonic chords** | Am · C · Em · G · Dm · F — all chords in C major / A minor, one per column. |
| **Karplus-Strong synthesis** | Physical modeling algorithm running live in Web Audio. No samples, no downloads. |
| **Practice mode** | 3 folk songs with an animated character showing when to strum, hold, and mute. |
| **Mute keys** | J / K / L / ; — percussive palm-mute on the right hand home row. |
| **Score sharing** | Best scores save locally. Share via URL. |
| **Zero install** | Opens in a browser tab. No plugins, no account, no setup. |

## Quick Start

```bash
# Clone
git clone https://github.com/kimhinton/keystrum.git
cd keystrum

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and press some keys.

## Practice Mode

Three songs with progressive difficulty:

| Song | BPM | Time | Difficulty | Mute Keys |
|------|-----|------|------------|-----------|
| House of the Rising Sun | 72 | 4/4 | Easy | J only |
| Scarborough Fair | 92 | 3/4 | Medium | J, K |
| Greensleeves | 100 | 3/4 | Medium | J, K, L |

Each song has two verses: Verse 1 teaches the pattern sparse, Verse 2 plays it full.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 16 + React 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4 + [shadcn/ui](https://ui.shadcn.com)
- **Audio**: Web Audio API with Karplus-Strong synthesis
- **State**: [Zustand](https://github.com/pmndrs/zustand) with localStorage persistence
- **Language**: TypeScript
- **Deploy**: Static export (`next build` → `out/`)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page with live instrument
│   ├── play/               # Practice mode (song list + gameplay)
│   ├── chords/             # Chord dictionary
│   └── share/              # Score sharing
├── components/
│   ├── game/               # GameRunner, GameStage (SVG), SongCard
│   └── keyboard-guitar/    # KeyboardGuitar (homepage instrument)
└── lib/
    ├── audio/              # Karplus-Strong synth engine
    ├── game/               # Types, songs, scoring, state store
    └── keyboard/           # Layout mapping, chord presets, chord info
```

## Build

```bash
npm run build    # Static export to out/
npm run lint     # ESLint
```

The build output in `out/` can be deployed to any static hosting (Cloudflare Pages, Vercel, Netlify, GitHub Pages).

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE) — free to use, modify, and distribute.
