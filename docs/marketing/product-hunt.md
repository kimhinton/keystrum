# Product Hunt Launch

## Tagline (60 chars max)
```
Turn your keyboard into a 6-chord strum machine. Browser-only.
```
Count: 60 characters exactly.

Alternate, 58 chars:
```
Your QWERTY is a guitar now. No install, no account, MIT.
```

## Description (260 chars max)

```
keystrum maps four QWERTY rows to strings (D3/G3/B3/E4) and six columns
to chords (Am/C/Em/G/Dm/F). Sweep a column fast — that's a strum. Karplus-
Strong physical modeling in Web Audio, no audio samples. Record 30s riffs,
share as .m4a/.webm, local-only. MIT.
```
Count: 260 characters.

## Feature bullets (5)

- **Strum detection** — 3+ keys in a column within 90ms = a strum. Order determines stroke direction. Feels physical.
- **Karplus-Strong synth** — 148-line physical modeling engine. No samples, no downloads, no plugins. Sound generated live.
- **Practice mode** — 3 folk songs (House of the Rising Sun, Scarborough Fair, Greensleeves) with an animated guide.
- **Record & share** — Capture up to 30 seconds. Downloads as .m4a (Safari) or .webm (Chrome/Firefox). File stays on your device.
- **Installable PWA** — Add to home screen on iOS/Android. Works offline. Touch-drag strum for tablets.

## Maker comment (posted at launch)

```
Hey Product Hunt 👋

I built keystrum because I wanted a browser instrument that felt physical, not
gimmicky. Most "type-to-music" toys fire one note per keypress — fine for a demo,
but you can't actually play a song.

The whole bet was on strum detection: can a regular keyboard read a genuine
downstroke vs an upstroke? After weeks of tuning the 90ms window, I think yes.

Everything's MIT on GitHub. Would especially love feedback from teachers using it
to introduce chord theory, and from Web Audio folks who might poke holes in the
Karplus-Strong engine.

No paywall, no account, no samples. Just press 2 → W → S → X, fast.
```

## Image brief for PH gallery (3 images)

1. **Main card 240×240** — MIT badge + keyboard layout ASCII + "strum machine" text
2. **Feature image 1** — Hero screenshot (existing `public/hero-screenshot.png`)
3. **Feature image 2** — Demo GIF (existing `public/demo.gif`)
4. **Feature image 3** — 9:16 vertical render of mobile fallback modal (to cut from desktop screenshot in Stage F)

## Schedule

- **T-7d**: Submit "Coming Soon" with hunter (self if no hunter available, request one in makers slack)
- **T-1d**: Upload all assets, finalize description, gather 10+ "remind me" signals
- **T-0 12:01am PST**: Launch goes live (PH reset is midnight Pacific)
- **T-0 entire day**: Maker comment replies within 15 min, no self-voting
- **T+1d**: Post winning placement (if any) to Twitter, maker communities

## Category

Primary: **Audio & Music**
Secondary: **Developer Tools** (Karplus-Strong source is genuinely interesting to devs)
