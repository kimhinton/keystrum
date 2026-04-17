# Show HN Post

## Title (80 chars max)
```
Show HN: keystrum – turn your QWERTY into a guitar strummer
```

## Body (< 400 chars — final: ~395)

```
https://keystrum.app

Not a piano, not a tracker — a strum machine.

Sweep a column of QWERTY keys top-to-bottom under 90ms and keystrum reads it as a downstroke. Reverse for an upstroke. Rows = strings (D3/G3/B3/E4), columns = chords (Am/C/Em/G/Dm/F).

Karplus-Strong physical modeling in Web Audio, no samples. Record 30s riffs to .m4a / .webm, no upload. MIT.

Source: https://github.com/kimhinton/keystrum
```

Character count (body only, no URL line): 397.

## Why this version vs the earlier longer draft

The prior draft (https://keystrum.app … "Would love feedback on the feel of the strum detection") ran ~1.3k characters. HN front page bias rewards the opening line; losing "Not a piano, not a tracker — a strum machine." to a wall of text was the problem.

Shorter Show HN posts consistently outperform long ones — the comment thread is where detail lives, not the submission. Every sentence here earns its place:

1. **Hook** — negative-definition opener (what it's NOT) is more memorable than a claim of newness.
2. **Mechanic** — strum detection is the non-obvious technical insight. 90ms window + row-order = core innovation.
3. **Stack proof** — Karplus-Strong + Web Audio signals engineering depth to the HN crowd without buzzwords.
4. **Record/share** — differentiator (BeepBox uses URL-hash, others have no export at all). Local-first ("no upload") matches HN values.
5. **MIT + repo** — credibility close.

## First-reply preparation

Within 2 minutes of posting, self-reply with 2-3 sentence technical dive:

```
One thing I iterated on most: the 90ms strum window. Too short (<60ms) and fast typing
registered as strums; too long (>120ms) and deliberate fast single-notes fused into
phantom chords. 90ms hits the sweet spot where a deliberate sweep *feels* strummed but
typing doesn't false-trigger.

Happy to answer on the Karplus-Strong engine (148 lines, src/packages/synth).
```

## Moderator pre-email (separate file: `hn-moderator.md`)

See `hn-moderator.md` for the Strudel/Patatap duplication defense sent to hn@ycombinator.com
before the Show HN goes live.
