# Cold Email Templates — Creator Outreach

Target: 3 YouTube creators whose audiences overlap with keystrum's positioning.
Budget: $0 — no paid placements. Pure interest-driven pitch.

---

## Template 1 — Hainbach

**Angle**: Experimental instrument / found-sound / browser-as-instrument

**Subject**: A strum detector that runs in a browser tab — wondered if it'd interest you

**To**: [Hainbach YouTube about page / hainbachmusic.com contact form]

**Recent videos to reference** (fill before sending — check last 30 days):
- [recent video 1] — topic/angle slot
- [recent video 2] — topic/angle slot
- [recent video 3] — topic/angle slot

**Body**:

```
Hi Hainbach,

I'm [name], a developer who's been watching your [recent video title — e.g. "The
weirdest keyboard synth I've ever seen"] — the way you frame instruments that
shouldn't work but do is part of what pushed me to finish this.

I built keystrum (https://keystrum.app) — a browser instrument that detects
strumming on a regular QWERTY keyboard. Sweep a column of keys under 90ms and
it reads it as a downstroke. Reverse for upstroke. Each row is a string pitch,
each column is a chord.

Sound is Karplus-Strong synthesis in Web Audio. No samples, 148 lines of
TypeScript. MIT licensed.

It's not a Make Noise module or a found-object tape loop — but the "instrument
made from not-an-instrument" thread is the same. No pitch for coverage, just
thought you might enjoy 60 seconds of it.

The keyboard is an instrument. It just hasn't been played like one.

— [name]
https://keystrum.app
https://github.com/kimhinton/keystrum
```

---

## Template 2 — Loopop (Ziv Eliraz)

**Angle**: Karplus-Strong technical depth / synthesis methods / gear on a budget

**Subject**: Browser instrument with Karplus-Strong — 148-line engine, MIT source

**To**: [loopop@loopop.net or YouTube about page contact]

**Recent videos to reference** (fill before sending):
- [recent video 1 — likely a synth deep-dive]
- [recent video 2]
- [recent video 3]

**Body**:

```
Hi Ziv,

Your deep dives on [recent video — e.g. "Understanding wavetable synthesis from
scratch"] are partly why I bothered shipping this instead of abandoning it at
the prototype stage.

Short pitch: keystrum (https://keystrum.app) is a browser instrument. QWERTY
columns are chords, rows are strings. Sweep a column fast = strum.

The interesting part for your audience: the whole sound engine is 148 lines of
Karplus-Strong in Web Audio. No samples, no libraries, no WebAssembly. Tuned
delay line + noise burst + lowpass feedback. Plucked-string timbre that
genuinely decays correctly. Source is MIT:

https://github.com/kimhinton/keystrum/blob/main/packages/synth/src/guitar-synth.ts

If a Karplus-Strong walkthrough is ever on your video whiteboard, this could be
the worked example — you can pause it mid-playback and the algorithm is visible
in one screenful of code. No pitch for a review, just throwing it over the fence
in case it's useful.

— [name]
```

---

## Template 3 — Fireship (Jeff Delaney)

**Angle**: Web Audio API developer story / 148-line synth / "you can build this in a weekend"

**Subject**: A musical instrument in 148 lines of Web Audio

**To**: [jeff@fireship.io or Fireship.io contact form]

**Recent videos to reference** (fill before sending):
- [recent video 1 — likely a "X in 100 seconds" or build-in-weekend]
- [recent video 2]
- [recent video 3]

**Body**:

```
Jeff,

Long-time viewer. Your [recent video — e.g. "Web Audio API in 100 seconds"]
nudged me to ship keystrum (https://keystrum.app) instead of leaving it in a
"coming soon" folder.

It's a browser instrument — QWERTY keyboard becomes a 6-chord strummer. Sweep
a column of keys under 90ms and strum detection fires.

The reason I'm writing: the entire sound engine is 148 lines of Karplus-Strong
physical modeling in Web Audio. No libraries, no samples, no WebAssembly. It's
one of those "wait this works?" pieces of code that's perfect for a "build a
musical instrument in a weekend" angle.

Stack: Next.js static export, TypeScript strict, Tailwind, Zustand, Web Audio.
MIT. Deploys to any CDN.

Source engine: https://github.com/kimhinton/keystrum/blob/main/packages/synth/src/guitar-synth.ts

No ask — just thought it might fit the kind of brief-weekend-build content
you do best.

— [name]
https://keystrum.app
```

---

## Sending protocol

1. **Never send from noreply or throwaway**. Use personal domain or a real email with avatar.
2. **One follow-up maximum**, 7 days after initial. If no response, move on.
3. **No attachment**, no tracker pixel, no mailmerge list. Each email is individually typed from template.
4. **Do not send during launch week** — send 2-3 weeks before if possible, so a potential reply lands during launch. Post-launch sends get ignored.
5. **Ethics**: if creator replies "not interested", take them off the list permanently. No re-sending.

## Priority order (send in this sequence over 3 weeks)

| Week | Target | Send day |
|------|--------|----------|
| 1 | Loopop | Monday |
| 1 | Hainbach | Thursday |
| 2 | Fireship | Monday |
| 2 | All 3 follow-ups | Friday |
| 3 | (Reply window closed, proceed with launch) | — |
