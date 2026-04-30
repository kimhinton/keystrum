import type { Song, GameNote, Lane, NoteKind } from "./types";
// Lane 4/5 need explicit cast since PatternStep uses Lane type

interface PatternStep {
  beat: number;
  lane: Lane;
  kind?: NoteKind;
  holdBeats?: number;
  muteCol?: number;
}

const LEAD_IN_MS = 3000;

function bars(
  bpm: number,
  beatsPerBar: number,
  sequence: PatternStep[][],
  idOffset = 0
): { notes: GameNote[]; endMs: number } {
  const msPerBeat = 60000 / bpm;
  const msPerBar = msPerBeat * beatsPerBar;
  const notes: GameNote[] = [];
  let id = idOffset;
  sequence.forEach((bar, barIdx) => {
    bar.forEach((step) => {
      const time = LEAD_IN_MS + barIdx * msPerBar + step.beat * msPerBeat;
      const kind: NoteKind = step.kind ?? "strum";
      notes.push({
        id: id++,
        time,
        lane: step.lane,
        kind,
        holdMs: kind === "hold" && step.holdBeats ? step.holdBeats * msPerBeat : undefined,
        muteCol: step.muteCol,
      });
    });
  });
  const endMs = LEAD_IN_MS + sequence.length * msPerBar;
  return { notes: notes.sort((a, b) => a.time - b.time), endMs };
}

/* ──────────────────────────────────────────────────────────
 * RISING SUN — 72 BPM · 4/4 · 16 bars
 * Chords: Am(0) C(1) Dm(2) F(3)
 * Difficulty: easy — muteCol 0 (J key) only
 *
 * Verse 1 (bars 0-7): Teach strum → mute → hold one at a time
 * Verse 2 (bars 8-15): Full strum+mute pattern
 * ────────────────────────────────────────────────────────── */
const risingSunBars: PatternStep[][] = [
  // === Verse 1: Am-C-Dm-F ===

  // Bar 0 (Am): Single strum. Learn the gesture.
  [{ beat: 0, lane: 0, kind: "strum" }],

  // Bar 1 (C): Two strums. Practice chord change.
  [
    { beat: 0, lane: 1, kind: "strum" },
    { beat: 2, lane: 1, kind: "strum" },
  ],

  // Bar 2 (Dm): Strum + first mute on T.
  [
    { beat: 0, lane: 2, kind: "strum" },
    { beat: 2, lane: 2, kind: "strum" },
    { beat: 3, lane: 2, kind: "mute", muteCol: 0 },
  ],

  // Bar 3 (F): Hold on T. Sustain for 3 beats.
  [{ beat: 0, lane: 3, kind: "hold", holdBeats: 3, muteCol: 0 }],

  // Bar 4 (Am): Strum-strum-mute pattern established.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 2, lane: 0, kind: "strum" },
    { beat: 3, lane: 0, kind: "mute", muteCol: 0 },
  ],

  // Bar 5 (C): Same pattern, new chord.
  [
    { beat: 0, lane: 1, kind: "strum" },
    { beat: 2, lane: 1, kind: "strum" },
    { beat: 3, lane: 1, kind: "mute", muteCol: 0 },
  ],

  // Bar 6 (Dm): Two strums, no mute. Brief rest.
  [
    { beat: 0, lane: 2, kind: "strum" },
    { beat: 2.5, lane: 2, kind: "strum" },
  ],

  // Bar 7 (Dm): Full-bar hold. Breathing room.
  [{ beat: 0, lane: 2, kind: "hold", holdBeats: 4, muteCol: 0 }],

  // === Verse 2: Am-C-Dm-F-Em-G — all 6 chords ===

  // Bar 8 (Am): Offbeat mutes added.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 1.5, lane: 0, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 0, kind: "strum" },
    { beat: 3.5, lane: 0, kind: "mute", muteCol: 0 },
  ],

  // Bar 9 (C): Same groove.
  [
    { beat: 0, lane: 1, kind: "strum" },
    { beat: 1.5, lane: 1, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 1, kind: "strum" },
    { beat: 3.5, lane: 1, kind: "mute", muteCol: 0 },
  ],

  // Bar 10 (Dm): Slightly tighter mute on beats.
  [
    { beat: 0, lane: 2, kind: "strum" },
    { beat: 1, lane: 2, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 2, kind: "strum" },
    { beat: 3, lane: 2, kind: "mute", muteCol: 0 },
  ],

  // Bar 11 (F): Hold then mute pickup.
  [
    { beat: 0, lane: 3, kind: "hold", holdBeats: 2.5, muteCol: 0 },
    { beat: 3, lane: 3, kind: "mute", muteCol: 0 },
  ],

  // Bar 12 (Em): NEW — lane 4 introduced.
  [
    { beat: 0, lane: 4 as Lane, kind: "strum" },
    { beat: 1.5, lane: 4 as Lane, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 4 as Lane, kind: "strum" },
    { beat: 3.5, lane: 4 as Lane, kind: "mute", muteCol: 0 },
  ],

  // Bar 13 (G): NEW — lane 5.
  [
    { beat: 0, lane: 5 as Lane, kind: "strum" },
    { beat: 1.5, lane: 5 as Lane, kind: "mute", muteCol: 0 },
    { beat: 2.5, lane: 5 as Lane, kind: "strum" },
  ],

  // Bar 14 (Am): Wind down — two clean strums.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 2, lane: 0, kind: "strum" },
  ],

  // Bar 15 (Am): Final sustain.
  [{ beat: 0, lane: 0, kind: "hold", holdBeats: 4, muteCol: 0 }],
];

/* ──────────────────────────────────────────────────────────
 * SCARBOROUGH FAIR — 92 BPM · 3/4 · 16 bars
 * Chords: Dm(0) C(1) F(2) Am(3)
 * Difficulty: medium — muteCol 0 (J) + 1 (K)
 *
 * Verse 1 (bars 0-7): Waltz feel, J mute only
 * Verse 2 (bars 8-15): Introduce K mute
 * ────────────────────────────────────────────────────────── */
const scarboroughBars: PatternStep[][] = [
  // === Verse 1: Dm-Dm-C-Dm-F-C-Dm-Dm ===

  // Bar 0 (Dm): Open with strum.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 2, lane: 0, kind: "mute", muteCol: 0 },
  ],

  // Bar 1 (Dm): Two strums, waltz weight on beat 0.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 2, lane: 0, kind: "strum" },
  ],

  // Bar 2 (C): Chord change + mute.
  [
    { beat: 0, lane: 1, kind: "strum" },
    { beat: 1, lane: 1, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 1, kind: "strum" },
  ],

  // Bar 3 (Dm): Hold — waltz sustain.
  [{ beat: 0, lane: 0, kind: "hold", holdBeats: 3, muteCol: 0 }],

  // Bar 4 (F): New chord voice.
  [
    { beat: 0, lane: 2, kind: "strum" },
    { beat: 2, lane: 2, kind: "mute", muteCol: 0 },
  ],

  // Bar 5 (C): Back to C with mute.
  [
    { beat: 0, lane: 1, kind: "strum" },
    { beat: 1, lane: 1, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 1, kind: "strum" },
  ],

  // Bar 6 (Dm): Strum pair.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 2, lane: 0, kind: "mute", muteCol: 0 },
  ],

  // Bar 7 (Dm): Sustain to close verse 1.
  [{ beat: 0, lane: 0, kind: "hold", holdBeats: 3, muteCol: 0 }],

  // === Verse 2: introduce Y mute ===

  // Bar 8 (Dm): T + Y mute pair.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 1, lane: 0, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 0, kind: "mute", muteCol: 1 },
  ],

  // Bar 9 (Am → Em): Lane 4 preview on beat 2.
  [
    { beat: 0, lane: 3, kind: "strum" },
    { beat: 1, lane: 3, kind: "mute", muteCol: 1 },
    { beat: 2, lane: 4 as Lane, kind: "strum" },
  ],

  // Bar 10 (C → G): Dense mute, lane 5 preview on beat 2.
  [
    { beat: 0, lane: 1, kind: "strum" },
    { beat: 0.5, lane: 1, kind: "mute", muteCol: 0 },
    { beat: 1.5, lane: 1, kind: "mute", muteCol: 1 },
    { beat: 2, lane: 5 as Lane, kind: "strum" },
  ],

  // Bar 11 (Dm): Full sustain.
  [{ beat: 0, lane: 0, kind: "hold", holdBeats: 3, muteCol: 0 }],

  // Bar 12 (Em): NEW — lane 4 introduced. Dorian ii, leading tension.
  [
    { beat: 0, lane: 4 as Lane, kind: "strum" },
    { beat: 1, lane: 4 as Lane, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 4 as Lane, kind: "mute", muteCol: 1 },
  ],

  // Bar 13 (G): NEW — lane 5. Dorian IV, characteristic brightness.
  [
    { beat: 0, lane: 5 as Lane, kind: "strum" },
    { beat: 1, lane: 5 as Lane, kind: "mute", muteCol: 1 },
    { beat: 2, lane: 5 as Lane, kind: "strum" },
  ],

  // Bar 14 (Dm → Em → Dm): Closing with lane 4 echo.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 1, lane: 4 as Lane, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 0, kind: "mute", muteCol: 1 },
  ],

  // Bar 15 (Dm): Final sustain.
  [{ beat: 0, lane: 0, kind: "hold", holdBeats: 3, muteCol: 0 }],
];

/* ──────────────────────────────────────────────────────────
 * GREENSLEEVES — 100 BPM · 3/4 · 18 bars
 * Chords: Am(0) C(1) G(2) Em(3)
 * Difficulty: medium — muteCol 0 (J) + 1 (K) + 2 (L)
 *
 * A section (bars 0-8): Main theme, J+K mutes
 * B section (bars 9-17): Contrast, introduce L mute
 * ────────────────────────────────────────────────────────── */
const greensleevesBars: PatternStep[][] = [
  // === A section: Am-Am-C-C-Am-Am-Em-Em-Am ===

  // Bar 0 (Am): Open.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 2, lane: 0, kind: "mute", muteCol: 0 },
  ],

  // Bar 1 (Am): Add mute Y.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 1, lane: 0, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 0, kind: "mute", muteCol: 1 },
  ],

  // Bar 2 (C): Chord change.
  [
    { beat: 0, lane: 1, kind: "strum" },
    { beat: 1, lane: 1, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 1, kind: "strum" },
  ],

  // Bar 3 (C): Sustain.
  [{ beat: 0, lane: 1, kind: "hold", holdBeats: 2.5, muteCol: 0 }],

  // Bar 4 (Am): Return with drive.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 0.5, lane: 0, kind: "mute", muteCol: 0 },
    { beat: 1.5, lane: 0, kind: "mute", muteCol: 1 },
    { beat: 2, lane: 0, kind: "strum" },
  ],

  // Bar 5 (Am): Pair.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 1, lane: 0, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 0, kind: "mute", muteCol: 1 },
  ],

  // Bar 6 (Em): New color.
  [
    { beat: 0, lane: 3, kind: "strum" },
    { beat: 1, lane: 3, kind: "mute", muteCol: 1 },
    { beat: 2, lane: 3, kind: "strum" },
  ],

  // Bar 7 (Em): Sustain.
  [{ beat: 0, lane: 3, kind: "hold", holdBeats: 3, muteCol: 1 }],

  // Bar 8 (Am): Section close.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 2, lane: 0, kind: "strum" },
  ],

  // === B section: C-C-Am-Em-C-C-Am-Em-Am ===

  // Bar 9 (C): B opens brighter.
  [
    { beat: 0, lane: 1, kind: "strum" },
    { beat: 1, lane: 1, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 1, kind: "mute", muteCol: 2 },
  ],

  // Bar 10 (C → Dm): Dense mute, lane 4 bridge on beat 2.
  [
    { beat: 0, lane: 1, kind: "strum" },
    { beat: 0.5, lane: 1, kind: "mute", muteCol: 0 },
    { beat: 1, lane: 1, kind: "mute", muteCol: 1 },
    { beat: 2, lane: 4 as Lane, kind: "strum" },
  ],

  // Bar 11 (Dm): NEW — lane 4 introduced. iv chord, natural minor contrast.
  [
    { beat: 0, lane: 4 as Lane, kind: "strum" },
    { beat: 1, lane: 4 as Lane, kind: "mute", muteCol: 2 },
    { beat: 2, lane: 4 as Lane, kind: "strum" },
  ],

  // Bar 12 (Em): Resolution.
  [{ beat: 0, lane: 3, kind: "hold", holdBeats: 2, muteCol: 1 },
    { beat: 2.5, lane: 3, kind: "mute", muteCol: 0 },
  ],

  // Bar 13 (C → F): Repeat B with lane 5 bridge on beat 2.
  [
    { beat: 0, lane: 1, kind: "strum" },
    { beat: 1, lane: 1, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 5 as Lane, kind: "strum" },
  ],

  // Bar 14 (F): NEW — lane 5. VI chord, warm resolution.
  [
    { beat: 0, lane: 5 as Lane, kind: "strum" },
    { beat: 1, lane: 5 as Lane, kind: "mute", muteCol: 2 },
    { beat: 2, lane: 5 as Lane, kind: "strum" },
  ],

  // Bar 15 (Am): Familiar ground.
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 0.5, lane: 0, kind: "mute", muteCol: 0 },
    { beat: 1.5, lane: 0, kind: "mute", muteCol: 1 },
    { beat: 2, lane: 0, kind: "strum" },
  ],

  // Bar 16 (Em → Dm → Em): Pre-final with lane 4 color.
  [
    { beat: 0, lane: 3, kind: "strum" },
    { beat: 1, lane: 4 as Lane, kind: "mute", muteCol: 0 },
    { beat: 2, lane: 3, kind: "strum" },
  ],

  // Bar 17 (Am): Final sustain.
  [{ beat: 0, lane: 0, kind: "hold", holdBeats: 3, muteCol: 0 }],
];

const risingSun = bars(72, 4, risingSunBars);
const scarborough = bars(92, 3, scarboroughBars);
const greensleeves = bars(100, 3, greensleevesBars);

/* ──────────────────────────────────────────────────────────
 * BRITPOP JAM — 87 BPM · 4/4 · 8 bars
 * Chords: Em(0) G(1) Dm(2) C(3) — vi-I-v-IV in C major
 * Difficulty: easy — 4-chord cycle, two strums per bar
 *
 * The Em-G-Dm-C progression underpins many 1990s Britpop songs,
 * most famously Wonderwall (Oasis, 1995). Original key uses D and
 * Cadd9; we substitute Dm to fit the keystrum 6-chord set.
 * Chord progression itself is not copyrighted (musical structure).
 * ────────────────────────────────────────────────────────── */
const britpopBars: PatternStep[][] = [
  // Bar 0 — Em: single strum to learn the chord
  [{ beat: 0, lane: 0, kind: "strum" }],

  // Bar 1 — G: two strums, on beat 0 and 2
  [
    { beat: 0, lane: 1, kind: "strum" },
    { beat: 2, lane: 1, kind: "strum" },
  ],

  // Bar 2 — Dm
  [
    { beat: 0, lane: 2, kind: "strum" },
    { beat: 2, lane: 2, kind: "strum" },
  ],

  // Bar 3 — C
  [
    { beat: 0, lane: 3, kind: "strum" },
    { beat: 2, lane: 3, kind: "strum" },
  ],

  // Bars 4-7: full cycle again, two strums per bar
  [
    { beat: 0, lane: 0, kind: "strum" },
    { beat: 2, lane: 0, kind: "strum" },
  ],
  [
    { beat: 0, lane: 1, kind: "strum" },
    { beat: 2, lane: 1, kind: "strum" },
  ],
  [
    { beat: 0, lane: 2, kind: "strum" },
    { beat: 2, lane: 2, kind: "strum" },
  ],
  [
    { beat: 0, lane: 3, kind: "strum" },
    { beat: 2, lane: 3, kind: "strum" },
  ],
];

const britpop = bars(87, 4, britpopBars);

export const SONGS: Song[] = [
  {
    id: "rising-sun",
    title: "House of the Rising Sun",
    subtitle: "Am → C → Dm → F · 72 BPM · slow 4/4",
    credit: "Public domain · traditional American folk ballad",
    difficulty: "easy",
    bpm: 72,
    durationMs: risingSun.endMs + 1500,
    chordMap: { 0: "Am", 1: "C", 2: "Dm", 3: "F", 4: "Em", 5: "G" },
    notes: risingSun.notes,
  },
  {
    id: "scarborough",
    title: "Scarborough Fair",
    subtitle: "Dm → C → F → Am · 92 BPM · 3/4 waltz",
    credit: "Public domain · English folk ballad (pre-1670)",
    difficulty: "medium",
    bpm: 92,
    durationMs: scarborough.endMs + 1500,
    chordMap: { 0: "Dm", 1: "C", 2: "F", 3: "Am", 4: "Em", 5: "G" },
    notes: scarborough.notes,
  },
  {
    id: "greensleeves",
    title: "Greensleeves",
    subtitle: "Am → C → G → Em · 100 BPM · 3/4 waltz",
    credit: "Public domain · 16th century English ballad",
    difficulty: "medium",
    bpm: 100,
    durationMs: greensleeves.endMs + 1500,
    chordMap: { 0: "Am", 1: "C", 2: "G", 3: "Em", 4: "Dm", 5: "F" },
    notes: greensleeves.notes,
  },
  {
    id: "britpop-jam",
    title: "Britpop 4-chord (Em-G-Dm-C)",
    subtitle: "Em → G → Dm → C · 87 BPM · 4/4",
    credit: "Em-G-Dm-C progression — used in many 1990s Britpop songs including Wonderwall (Oasis 1995). Chord progression is not copyrighted.",
    difficulty: "easy",
    bpm: 87,
    durationMs: britpop.endMs + 1500,
    chordMap: { 0: "Em", 1: "G", 2: "Dm", 3: "C", 4: "Am", 5: "F" },
    notes: britpop.notes,
  },
];

export function getSong(id: string): Song | null {
  return SONGS.find((s) => s.id === id) ?? null;
}
