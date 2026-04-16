import { STRING_NAMES, type StringIndex } from "./layout";

export interface ChordPreset {
  name: string;
  label: string;
  frets: [number, number, number, number];
  color: string;
}

const SEMITONE_OFFSETS: Record<string, number> = {
  "C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3, "E": 4,
  "F": 5, "F#": 6, "Gb": 6, "G": 7, "G#": 8, "Ab": 8, "A": 9,
  "A#": 10, "Bb": 10, "B": 11,
};

function noteToSemitone(note: string): number {
  const match = note.match(/^([A-G]#?|[A-G]b?)(-?\d)$/);
  if (!match) return 0;
  const [, n, octave] = match;
  return SEMITONE_OFFSETS[n] + parseInt(octave) * 12;
}

function semitoneToFreq(semitone: number): number {
  return 440 * Math.pow(2, (semitone - noteToSemitone("A4")) / 12);
}

export function getChordFrequencies(preset: ChordPreset): [number, number, number, number] {
  return preset.frets.map((fret, idx) => {
    const openNote = STRING_NAMES[idx as StringIndex];
    const openSemitone = noteToSemitone(openNote);
    return semitoneToFreq(openSemitone + fret);
  }) as [number, number, number, number];
}

export const DEFAULT_CHORD_COLUMNS: (ChordPreset | null)[] = [
  { name: "Am", label: "A minor", frets: [0, 1, 2, 2], color: "#a78bfa" },
  { name: "C", label: "C major", frets: [0, 1, 0, 2], color: "#fb7185" },
  { name: "Em", label: "E minor", frets: [0, 0, 0, 2], color: "#60a5fa" },
  { name: "G", label: "G major", frets: [3, 0, 0, 0], color: "#34d399" },
  { name: "Dm", label: "D minor", frets: [1, 3, 2, 0], color: "#fbbf24" },
  { name: "F", label: "F major", frets: [1, 1, 2, 3], color: "#f472b6" },
  null, null, null, null, null, null,
];

export function getPresetForColumn(col: number, presets = DEFAULT_CHORD_COLUMNS): ChordPreset | null {
  return presets[col] ?? null;
}
