# Reddit Post

## Target subreddits
- r/webdev (primary)
- r/javascript (same post, Showoff Saturday flair)
- r/WeAreTheMusicMakers (shift focus from tech to playing experience)
- r/musicprogramming (deeper into Karplus-Strong implementation)

## r/webdev Post

### Title
```
I built a browser instrument that detects strumming on your keyboard — Karplus-Strong synthesis, no audio samples, pure Web Audio
```

### Body
```
Hey r/webdev,

I've been working on keystrum (https://keystrum.app), a browser-based instrument where
you strum chords by sweeping columns of keys on your QWERTY keyboard.

The technical challenge I found most interesting: strum detection. The engine collects
keydown events, groups them by column, and if 3+ keys in the same column arrive within
a 90 ms window, it fires a strum. Direction is inferred from key order — top-to-bottom
is a downstroke, bottom-to-top is an upstroke. I couldn't find an existing library that
does this, so I built it from scratch.

For sound, I used Karplus-Strong synthesis via the Web Audio API. No audio files are
loaded at all. Each note starts as a short burst of white noise that gets fed through a
tuned delay line with a lowpass filter — it naturally decays into something that sounds
like a plucked string. The entire synth engine is about 148 lines of TypeScript.

The instrument supports 6 chords (Am, C, Em, G, Dm, F) and has a practice mode with
three folk songs that teach you the strum patterns progressively.

Stack: Next.js 16, React 19, TypeScript (strict), Tailwind, Zustand. Static export,
works on any CDN. MIT licensed.

Source: https://github.com/kimhinton/keystrum

Curious if anyone has tackled rapid sequential keypress detection like this before —
the 90 ms timing window was a lot of trial and error to get right.
```

## Cross-post adaptations

**r/WeAreTheMusicMakers** — Lead with "I made an instrument you play by strumming your keyboard." Drop stack/framework details. Emphasize practice mode and song list.

**r/musicprogramming** — Go deeper on Karplus-Strong implementation (148-line engine, delay line tuning, decay characteristics) and strum detection algorithm.
