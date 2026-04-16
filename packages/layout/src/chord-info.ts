import { DEFAULT_CHORD_COLUMNS, type ChordPreset } from "./chord-presets";
import { KEYBOARD_ROWS, STRING_NAMES } from "./layout";

export interface ChordInfo extends ChordPreset {
  columnIndex: number;
  keys: string[][];
  notes: string[];
  intervals: string[];
  feel: string;
  usedIn: string[];
  siblings: string[];
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

const CHORD_META: Record<string, { feel: string; usedIn: string[] }> = {
  Am: {
    feel: "Melancholy, reflective. The workhorse of pop ballads.",
    usedIn: ["House of the Rising Sun", "Stairway to Heaven (intro)", "Zombie \u2014 Cranberries"],
  },
  C: {
    feel: "Bright, neutral, immediate. The chord every musician starts with.",
    usedIn: ["Let It Be \u2014 Beatles", "No Woman No Cry \u2014 Marley", "Imagine \u2014 Lennon"],
  },
  Em: {
    feel: "Brooding but open. Two notes and you're already making music.",
    usedIn: ["Losing My Religion \u2014 R.E.M.", "Zombie \u2014 Cranberries", "Wonderwall \u2014 Oasis"],
  },
  G: {
    feel: "Confident, rural, full. Opens up the low end.",
    usedIn: ["Knockin' on Heaven's Door \u2014 Dylan", "Wonderwall \u2014 Oasis", "Sweet Caroline \u2014 Diamond"],
  },
  Dm: {
    feel: "The saddest chord \u2014 Spinal Tap's joke about this one happens to be correct.",
    usedIn: ["Scarborough Fair \u2014 Simon & Garfunkel", "Californication \u2014 RHCP"],
  },
  F: {
    feel: "Tension, aspiration. The first chord that makes beginners quit \u2014 until they don't.",
    usedIn: ["Let It Be \u2014 Beatles", "Hey Jude \u2014 Beatles", "Wonderwall \u2014 Oasis"],
  },
};

export function buildChordInfo(): ChordInfo[] {
  return DEFAULT_CHORD_COLUMNS.flatMap((preset, i) => {
    if (!preset) return [];
    const { notes, intervals } = computeNotes(preset);
    const keys = KEYBOARD_ROWS.map((row) => [row[i]]);
    const meta = CHORD_META[preset.name] ?? { feel: "", usedIn: [] };
    return [{
      ...preset,
      columnIndex: i,
      keys,
      notes,
      intervals,
      feel: meta.feel,
      usedIn: meta.usedIn,
      siblings: DEFAULT_CHORD_COLUMNS.filter(
        (p): p is ChordPreset => !!p && p.name !== preset.name
      ).map((p) => p.name),
    }];
  });
}

export function getChordInfo(name: string): ChordInfo | null {
  return buildChordInfo().find((c) => c.name.toLowerCase() === name.toLowerCase()) ?? null;
}
