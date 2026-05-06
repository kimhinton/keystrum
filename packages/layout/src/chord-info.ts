import { DEFAULT_CHORD_COLUMNS, type ChordPreset } from "./chord-presets";
import { KEYBOARD_ROWS, STRING_NAMES } from "./layout";

export type TransitionDifficulty = "easy" | "medium" | "hard";
export type VoicingDifficulty = "beginner" | "intermediate" | "advanced";

export interface ChordTheory {
  function: string;
  relativeTo: string;
  romanNumeral: string;
}

export interface ChordVoicing {
  name: string;
  fingering: string;
  difficulty: VoicingDifficulty;
  description: string;
}

export interface ChordInfo extends ChordPreset {
  columnIndex: number;
  keys: string[][];
  notes: string[];
  intervals: string[];
  feel: string;
  seoSummary: string;
  usedIn: string[];
  siblings: string[];
  commonMistakes: string[];
  practiceTip: string;
  theory: ChordTheory;
  transitionDifficulty: Record<string, TransitionDifficulty>;
  voicings: ChordVoicing[];
}

const SEMITONES: Record<string, number> = {
  C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4,
  F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9,
  "A#": 10, Bb: 10, B: 11,
};

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function parseNote(note: string): { pitch: number; octave: number } {
  const m = note.match(/^([A-G]#?|[A-G]b?)(-?\d)$/);
  if (!m) return { pitch: 0, octave: 4 };
  return { pitch: SEMITONES[m[1]], octave: parseInt(m[2]) };
}

function renderNote(semi: number): string {
  const octave = Math.floor(semi / 12);
  const pitch = ((semi % 12) + 12) % 12;
  return `${NOTE_NAMES[pitch]}${octave}`;
}

function computeNotes(preset: ChordPreset): { notes: string[]; intervals: string[] } {
  const notes = preset.frets.map((fret, i) => {
    const open = parseNote(STRING_NAMES[i]);
    return renderNote(open.pitch + open.octave * 12 + fret);
  });
  const rootName = preset.name.replace(/m$|maj$|dim$|sus\d?$|7$|min$/, "") || preset.name;
  const root = SEMITONES[rootName] ?? 0;
  const intervals = notes.map((n) => {
    const { pitch } = parseNote(n);
    const diff = (pitch - root + 12) % 12;
    return INTERVAL_NAMES[diff] ?? String(diff);
  });
  return { notes, intervals };
}

const INTERVAL_NAMES: Record<number, string> = {
  0: "R", 1: "\u266D2", 2: "2", 3: "\u266D3", 4: "3", 5: "4",
  6: "\u266D5", 7: "5", 8: "\u266D6", 9: "6", 10: "\u266D7", 11: "7",
};

interface ChordMeta {
  feel: string;
  seoSummary: string;
  usedIn: string[];
  commonMistakes: string[];
  practiceTip: string;
  theory: ChordTheory;
  transitionDifficulty: Record<string, TransitionDifficulty>;
  voicings: ChordVoicing[];
}

const CHORD_META: Record<string, ChordMeta> = {
  Am: {
    feel: "Melancholy, reflective. The workhorse of pop ballads.",
    usedIn: ["House of the Rising Sun", "Stairway to Heaven (intro)", "Zombie \u2014 Cranberries"],
    commonMistakes: [
      "Letting the low E ring \u2014 Am is voiced from string 5 down, so palm-mute string 6",
      "Pressing the index finger flat instead of with the fingertip on B string fret 1",
      "Lifting all fingers when changing chords \u2014 keep ring and middle planted as anchors",
    ],
    practiceTip: "Loop Am \u2192 E at 60 BPM, four strums each, for one minute before increasing tempo. The minor-i to major-V swap is the most common motion in pop minor keys.",
    theory: {
      romanNumeral: "i (in A minor) / vi (in C major)",
      function: "Tonic of A minor; submediant of C major \u2014 the bridge between minor and major key centers",
      relativeTo: "C major (shares the same key signature, no sharps or flats)",
    },
    transitionDifficulty: { C: "easy", Em: "medium", G: "medium", Dm: "easy", F: "hard" },
    seoSummary: "The A minor (Am) chord is the most-used minor chord in Western pop music, played with three fingers across the first three frets — index on B string fret 1, middle and ring on D and G strings fret 2. Its dark, reflective color anchors thousands of ballads including House of the Rising Sun, Stairway to Heaven, and Zombie. Am is the i chord in A minor and the vi chord in C major — the bridge between minor and major key centers.",
    voicings: [
      { name: "Open position", fingering: "x 0 2 2 1 0", difficulty: "beginner", description: "The classic open Am. Index on B string fret 1, middle on D string fret 2, ring on G string fret 2." },
      { name: "Am7", fingering: "x 0 2 0 1 0", difficulty: "beginner", description: "Lift the ring finger off G string — instant Am7. Mellower, jazzier, perfect for Beatles-era pop." },
      { name: "A5 power chord", fingering: "x 0 2 2 x x", difficulty: "beginner", description: "Just root and fifth, no third. Neither major nor minor — the open neutral chord for rock and punk." },
      { name: "Barre at 5th fret", fingering: "5 7 7 5 5 5", difficulty: "intermediate", description: "Movable Am shape barred at fret 5. Same shape, brighter voicing, rings through the high register." },
      { name: "Am add9", fingering: "x 0 7 5 5 0", difficulty: "intermediate", description: "Adds the 9th (B note) for color. Used in modern indie folk and dream-pop arrangements." },
    ],
  },
  C: {
    feel: "Bright, neutral, immediate. The chord every musician starts with.",
    usedIn: ["Let It Be \u2014 Beatles", "No Woman No Cry \u2014 Marley", "Imagine \u2014 Lennon"],
    commonMistakes: [
      "Index finger muting the high E \u2014 angle it so only the B string is fretted",
      "Strumming the low E (string 6) \u2014 C major is voiced from string 5 down",
      "Releasing the ring finger when switching to G \u2014 it's the pivot point of the most common transition",
    ],
    practiceTip: "C \u2192 G is the most-played transition in Western pop. Drill at 65 BPM keeping the ring finger as a pivot \u2014 it stays planted on the same fret across both chords.",
    theory: {
      romanNumeral: "I (in C major) / III (in A minor)",
      function: "Tonic of C major \u2014 the I chord that defines the most common Western pop key",
      relativeTo: "A minor (relative minor, same key signature)",
    },
    transitionDifficulty: { Am: "easy", Em: "medium", G: "easy", Dm: "medium", F: "medium" },
    seoSummary: "The C major chord is the first chord most guitarists learn — bright, neutral, and immediate. Played with three fingers across the second and third frets (ring on A string fret 3, middle on D string fret 2, index on B string fret 1), it rings out across five strings and forms the I chord in C major. Used in countless songs from Let It Be to No Woman No Cry, C major is the gateway to most popular Western harmonic progressions.",
    voicings: [
      { name: "Open position", fingering: "x 3 2 0 1 0", difficulty: "beginner", description: "The first chord most guitarists learn. Ring on A string fret 3, middle on D string fret 2, index on B string fret 1." },
      { name: "Cmaj7", fingering: "x 3 2 0 0 0", difficulty: "beginner", description: "Lift the index finger off the B string. Dreamy, floating quality used in bossa nova and modern folk." },
      { name: "Cadd9", fingering: "x 3 2 0 3 0", difficulty: "beginner", description: "Add the pinky on B string fret 3. The 'Wonderwall' opening — bigger, more open sound." },
      { name: "C/G bass", fingering: "3 3 2 0 1 0", difficulty: "intermediate", description: "Adds low G to the bass for a fuller foundation. Most common alternate voicing in singer-songwriter arrangements." },
      { name: "Barre at 8th fret", fingering: "8 10 10 9 8 8", difficulty: "advanced", description: "Movable C shape barred at fret 8. Compact, tighter voicing for solo guitar and chord-melody arrangements." },
    ],
  },
  Em: {
    feel: "Brooding but open. Two notes and you're already making music.",
    usedIn: ["Losing My Religion \u2014 R.E.M.", "Zombie \u2014 Cranberries", "Wonderwall \u2014 Oasis"],
    commonMistakes: [
      "Forgetting Em fingers only two strings (5 and 4) \u2014 strings 6, 3, 2, 1 ring open",
      "Tucking the thumb across the neck \u2014 Em is the most relaxed shape; keep the thumb behind",
      "Bunching middle and ring on the same string \u2014 they share fret 2 but on different strings (5 and 4)",
    ],
    practiceTip: "Em is the easiest open chord on guitar. Use it as the warmup: 4 strums Em \u2192 4 strums Am for 60 seconds, eyes closed, before any session.",
    theory: {
      romanNumeral: "iii (in C major) / vi (in G major) / i (in E minor)",
      function: "Most often used as iii in C major progressions or as the tonic of E minor",
      relativeTo: "G major (relative major)",
    },
    transitionDifficulty: { Am: "medium", C: "medium", G: "easy", Dm: "medium", F: "hard" },
    seoSummary: "The E minor (Em) chord is the easiest open chord on guitar — just two fingers on strings 5 and 4 at the second fret, with all other strings ringing open. Its brooding, modal color makes Em the go-to warmup chord and the foundation of countless rock and folk songs including Wonderwall, Zombie, and Losing My Religion. Em functions as the iii chord in C major, the vi in G major, and the i (tonic) of E minor key.",
    voicings: [
      { name: "Open position", fingering: "0 2 2 0 0 0", difficulty: "beginner", description: "The easiest chord on guitar. Just two fingers — middle and ring on A and D strings, fret 2." },
      { name: "Em7", fingering: "0 2 2 0 3 0", difficulty: "beginner", description: "Add pinky on B string fret 3. Smoother, more melodic — frequent in Cranberries and Coldplay." },
      { name: "E5 power chord", fingering: "0 2 2 x x x", difficulty: "beginner", description: "Strum only the bottom three strings. Aggressive low-end, foundation of grunge and punk." },
      { name: "Em add9", fingering: "0 2 4 0 0 0", difficulty: "intermediate", description: "Stretch ring finger to G string fret 4. Modal, cinematic — used in post-rock and ambient guitar." },
      { name: "Barre at 7th fret", fingering: "7 9 9 7 7 7", difficulty: "intermediate", description: "Movable Em shape at fret 7. Same minor color, higher register for solos and lead lines." },
    ],
  },
  G: {
    feel: "Confident, rural, full. Opens up the low end.",
    usedIn: ["Knockin' on Heaven's Door \u2014 Dylan", "Wonderwall \u2014 Oasis", "Sweet Caroline \u2014 Diamond"],
    commonMistakes: [
      "Leaving the high E open \u2014 the full G voicing frets string 1 at fret 3",
      "Stretching the pinky too high \u2014 relax the wrist and drop the elbow slightly to reach fret 3",
      "Muting string 6 by accident \u2014 the low E is fretted at fret 3 and should ring out",
    ],
    practiceTip: "G \u2192 C is the workhorse folk transition. Drill at 70 BPM using the ring finger as a pivot \u2014 in both chords it stays on the same fret, just shifted to a different string.",
    theory: {
      romanNumeral: "I (in G major) / V (in C major)",
      function: "Tonic of G major; dominant V of C major \u2014 creates the strongest pull back to home in pop progressions",
      relativeTo: "E minor (relative minor)",
    },
    transitionDifficulty: { Am: "medium", C: "easy", Em: "easy", Dm: "hard", F: "hard" },
    seoSummary: "The G major chord is the workhorse of folk and country guitar — confident, full-bodied, and rural. Played with three or four fingers spanning all six strings (middle on low E fret 3, index on A string fret 2, ring or pinky on high E fret 3), it provides the strongest low-end foundation among open chords. G major is the home key of songs like Knockin' on Heaven's Door, Wonderwall, and Sweet Caroline, and the V chord pulling toward C in the most common Western progression.",
    voicings: [
      { name: "Open position (3-finger)", fingering: "3 2 0 0 0 3", difficulty: "beginner", description: "Standard open G. Middle on low E fret 3, index on A string fret 2, ring on high E fret 3." },
      { name: "Open position (4-finger)", fingering: "3 2 0 0 3 3", difficulty: "beginner", description: "Adds pinky on B string fret 3. Bigger ring, easier transition to Cadd9. The 'modern' G voicing." },
      { name: "G6", fingering: "3 2 0 0 0 0", difficulty: "beginner", description: "Drop the high E to open. Adds the 6th (E note) — country, rockabilly, and old-school folk." },
      { name: "G/B bass", fingering: "x 2 0 0 3 3", difficulty: "intermediate", description: "Skip low E, B note on bass. Smooth voice-leading from C to G, classic in fingerstyle arrangements." },
      { name: "Barre at 3rd fret", fingering: "3 5 5 4 3 3", difficulty: "intermediate", description: "E-shape barre form at fret 3. Tighter voicing, full body — works well in higher-energy strumming." },
    ],
  },
  Dm: {
    feel: "The saddest chord \u2014 Spinal Tap's joke about this one happens to be correct.",
    usedIn: ["Scarborough Fair \u2014 Simon & Garfunkel", "Californication \u2014 RHCP"],
    commonMistakes: [
      "Pressing the high E ring finger too hard \u2014 let natural finger weight do the work",
      "Strumming strings 5 and 6 \u2014 Dm is voiced from string 4 down (4 strings only)",
      "Confusing Dm with D major \u2014 Dm has the high E at fret 1, D major has it at fret 2",
    ],
    practiceTip: "Dm sits between Am and F in the i\u2013iv\u2013V minor cadence. Loop Am \u2192 Dm at 60 BPM, 16 cycles, before adding the Em or F.",
    theory: {
      romanNumeral: "ii (in C major) / i (in D minor) / vi (in F major)",
      function: "Predominant ii chord in C major; tonic of D minor when used as the i chord",
      relativeTo: "F major (relative major)",
    },
    transitionDifficulty: { Am: "easy", C: "medium", Em: "medium", G: "hard", F: "medium" },
    seoSummary: "The D minor (Dm) chord is the saddest of the open chords — Spinal Tap's running joke about it captures the feeling exactly. Played on the top four strings only with three fingers (index on high E fret 1, middle on G string fret 2, ring on B string fret 3), Dm sits between Am and F in the i-iv-V minor cadence. It powers the emotional core of folk standards like Scarborough Fair and modern alt-rock anthems like Californication.",
    voicings: [
      { name: "Open position", fingering: "x x 0 2 3 1", difficulty: "beginner", description: "The classic open Dm. Index on high E fret 1, middle on G string fret 2, ring on B string fret 3." },
      { name: "Dm7", fingering: "x x 0 2 1 1", difficulty: "intermediate", description: "Mini-barre with index across B and high E at fret 1. Jazzy, mellow — common in Stevie Wonder and bossa." },
      { name: "Dm/F bass", fingering: "1 x 0 2 3 1", difficulty: "intermediate", description: "Adds low F bass under standard Dm. Walking bass-line option in i–v–IV minor progressions." },
      { name: "Barre at 5th fret", fingering: "x 5 7 7 6 5", difficulty: "intermediate", description: "A-shape minor barre at fret 5. Same Dm color, higher register — pairs well with barre Am at fret 5." },
      { name: "Dm add9", fingering: "x 5 7 5 6 5", difficulty: "advanced", description: "Adds the 9th (E note) for color. Modern, atmospheric — used in indie folk and ambient arrangements." },
    ],
  },
  F: {
    feel: "Tension, aspiration. The first chord that makes beginners quit \u2014 until they don't.",
    usedIn: ["Let It Be \u2014 Beatles", "Hey Jude \u2014 Beatles", "Wonderwall \u2014 Oasis"],
    commonMistakes: [
      "Trying to barre all six strings on day one \u2014 start with mini-F (top four strings only)",
      "Keeping the thumb high behind the neck like an E shape \u2014 for F, drop the thumb lower for index leverage",
      "Pressing the index finger flat across the fret \u2014 angle it slightly so the bony side touches the strings",
    ],
    practiceTip: "F is the wall most beginners hit. Practice mini-F (strings 4\u20131 only, fret 1 with index, 3rd fret D, 2nd fret G, 1st fret B) at 50 BPM until clean before adding the low strings.",
    theory: {
      romanNumeral: "IV (in C major) / I (in F major)",
      function: "Subdominant IV in C major \u2014 the chord that pulls toward the dominant before resolving home",
      relativeTo: "D minor (relative minor)",
    },
    transitionDifficulty: { Am: "hard", C: "medium", Em: "hard", G: "hard", Dm: "medium" },
    seoSummary: "The F major chord is the wall most beginning guitarists hit. The full barre version requires the index finger to press all six strings at fret 1 while the other fingers form an E shape above — but the mini-F (top four strings only, no barre) covers 90% of pop songs and is far more accessible for beginners. F major is the IV chord in C major and the I chord in F major key, used in Beatles standards Let It Be and Hey Jude.",
    voicings: [
      { name: "Mini-F (top 4 strings)", fingering: "x x 3 2 1 1", difficulty: "beginner", description: "Index mini-barres B and high E at fret 1, middle on G fret 2, ring on D fret 3. The starter F — start here, always." },
      { name: "Fmaj7", fingering: "x x 3 2 1 0", difficulty: "beginner", description: "Drop the high E to open. Floating, bright, used in jazz standards and bossa nova." },
      { name: "Fadd9", fingering: "x x 3 2 1 3", difficulty: "intermediate", description: "Pinky on high E fret 3 adds the 9th. Common Coldplay and indie-folk shape." },
      { name: "Full barre", fingering: "1 3 3 2 1 1", difficulty: "advanced", description: "The wall: index barre across all six strings at fret 1, ring on A fret 3. Full body, heavy — every guitarist's hurdle." },
      { name: "F at 8th fret (CAGED)", fingering: "x 8 10 10 10 8", difficulty: "advanced", description: "A-shape barre at fret 8. Compact, tighter than the full barre — useful for chord-melody and solo arrangements." },
    ],
  },
};

const FALLBACK_THEORY: ChordTheory = { romanNumeral: "", function: "", relativeTo: "" };

export function buildChordInfo(): ChordInfo[] {
  return DEFAULT_CHORD_COLUMNS.flatMap((preset, i) => {
    if (!preset) return [];
    const { notes, intervals } = computeNotes(preset);
    const keys = KEYBOARD_ROWS.map((row) => [row[i]]);
    const meta = CHORD_META[preset.name];
    return [{
      ...preset,
      columnIndex: i,
      keys,
      notes,
      intervals,
      feel: meta?.feel ?? "",
      seoSummary: meta?.seoSummary ?? "",
      usedIn: meta?.usedIn ?? [],
      commonMistakes: meta?.commonMistakes ?? [],
      practiceTip: meta?.practiceTip ?? "",
      theory: meta?.theory ?? FALLBACK_THEORY,
      transitionDifficulty: meta?.transitionDifficulty ?? {},
      voicings: meta?.voicings ?? [],
      siblings: DEFAULT_CHORD_COLUMNS.filter(
        (p): p is ChordPreset => !!p && p.name !== preset.name
      ).map((p) => p.name),
    }];
  });
}

export function getChordInfo(name: string): ChordInfo | null {
  return buildChordInfo().find((c) => c.name.toLowerCase() === name.toLowerCase()) ?? null;
}

const CHORD_SLUG: Record<string, string> = {
  Am: "a-minor",
  C: "c-major",
  Em: "e-minor",
  G: "g-major",
  Dm: "d-minor",
  F: "f-major",
};

export function getChordSlug(name: string): string {
  return CHORD_SLUG[name] ?? name.toLowerCase();
}

export function getChordBySlug(slug: string): ChordInfo | null {
  const lower = slug.toLowerCase();
  return buildChordInfo().find(
    (c) => CHORD_SLUG[c.name] === lower || c.name.toLowerCase() === lower,
  ) ?? null;
}
