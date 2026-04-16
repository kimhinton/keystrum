# Show HN Post

## Title
```
Show HN: Keystrum – Turn your QWERTY keyboard into a strum instrument (Web Audio, no samples)
```

## Body
```
https://keystrum.app

I built a browser instrument that detects strumming on a regular keyboard.

The idea: your QWERTY keyboard has four usable rows. Map each row to a string pitch
(D3, G3, B3, E4). Map each of the first six columns to a chord (Am, C, Em, G, Dm, F).
Sweep a column of keys top-to-bottom fast — that's a downstroke. Reverse it for an
upstroke.

The hard part was strum detection. The engine watches for 3+ keys in the same column
arriving within a 90 ms window and determines stroke direction from the order. This
feels surprisingly physical — there's a real difference between a fast sweep and a
slow one, and between down and up strokes.

All sound is Karplus-Strong synthesis running in Web Audio. No audio samples are loaded.
Each note is generated from a burst of noise fed through a tuned delay line with a
lowpass filter — the classic physical modeling algorithm. The result is a plucked-string
timbre that exists only while you're playing.

There's also a practice mode with three folk songs (House of the Rising Sun,
Scarborough Fair, Greensleeves) where an animated guide shows you when to strum, hold,
and mute. Muting uses the J/K/L/; keys on the right-hand home row.

Stack: Next.js, TypeScript, Web Audio API. MIT licensed.

Source: https://github.com/kimhinton/keystrum

Would love feedback on the feel of the strum detection — that's the part I iterated on
most.
```
