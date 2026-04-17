# HN Moderator Pre-email

**Send to**: hn@ycombinator.com
**Timing**: Send 2-4 hours before posting the Show HN. This lets moderators
pre-classify keystrum against the existing landscape of browser music toys,
reducing the risk of being flagged as duplicate submission by a reviewer
unfamiliar with the space.

## Subject

```
Show HN: keystrum — distinct positioning from Strudel / Patatap (brief note before I post)
```

## Body

```
Hi HN moderators,

I'm about to submit a Show HN for keystrum (https://keystrum.app), a browser
instrument. Before posting I wanted to preempt a possible duplicate-submission
flag by clarifying how it differs from existing browser music toys in your
index:

- **Strudel** (https://strudel.cc) — live-coding REPL. You type code patterns in
  JavaScript/Tidal syntax, it renders them as music. keystrum is the inverse:
  you play the keyboard as an instrument, no code.

- **Patatap** (https://patatap.com) — one-note-per-key sound+animation toy.
  Each A–Z key fires one sound. keystrum is chord-based: 6 columns = 6 chords,
  4 rows = 4 strings, and a column sweep is detected as a strum.

- **Typatone** (https://typatone.com) — typing text plays sequential notes.
  Input-driven linear composition. keystrum is performance-driven: you play
  chords in time, same as a guitar.

- **BeepBox** (https://beepbox.co) — grid-based chiptune composer. You place
  notes on a step sequencer. keystrum has no sequencer — it's real-time
  performance.

The distinguishing technical piece is strum detection: when 3+ keys in the same
column arrive within a 90ms window, the engine fires a strum event and infers
direction (downstroke vs upstroke) from key order. I couldn't find this in any
existing browser project, which is what made me think it was worth building.

Stack: Next.js 16 static export, TypeScript strict, Web Audio API (Karplus-
Strong), MIT licensed. No accounts, no tracking, no backend.

Source: https://github.com/kimhinton/keystrum

Not asking for any special treatment — just wanted the context on record in
case a reviewer sees "yet another browser music toy" and flags it.

Thanks,
[name]
[contact]
```

## After sending

- Do NOT post to Show HN until at least 2 hours have passed.
- Post once, during a US-morning weekday slot (7-9am Pacific is the traditional sweet spot).
- Do NOT edit the submission title after posting (triggers flagged status).
- Respond to first wave of comments within 10 minutes of posting.
- If flagged anyway: send a ONE-paragraph reply from the Show HN account
  referencing this email, then wait. Do not re-submit.

## What NOT to do

- Do not email modulators multiple times in the same week.
- Do not ask moderators to promote the submission.
- Do not complain if the submission doesn't reach the front page — the HN
  algorithm is deliberately opaque and moderators won't discuss rankings.
