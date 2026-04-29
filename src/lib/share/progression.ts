const VALID_CHORDS = ["Am", "C", "Em", "G", "Dm", "F"] as const;
export type ChordName = (typeof VALID_CHORDS)[number];

export function encodeProgression(chords: readonly ChordName[]): string {
  return chords.join("-");
}

export function decodeProgression(slug: string | null | undefined): ChordName[] {
  if (!slug) return [];
  const valid = VALID_CHORDS as readonly string[];
  return slug
    .split("-")
    .map((c) => c.trim())
    .filter((c): c is ChordName => valid.includes(c));
}

export interface ProgressionPreset {
  readonly name: string;
  readonly chords: readonly ChordName[];
  readonly description: string;
}

export const POPULAR_PROGRESSIONS: readonly ProgressionPreset[] = [
  {
    name: "I-V-vi-IV",
    chords: ["C", "G", "Am", "F"],
    description: "Pop's most-used progression — thousands of songs from \"Don't Stop Believin'\" onward",
  },
  {
    name: "vi-IV-I-V",
    chords: ["Am", "F", "C", "G"],
    description: "The sad pop progression — \"Zombie\", \"Apologize\", \"Hey Soul Sister\"",
  },
  {
    name: "i-VII-VI-VII",
    chords: ["Am", "G", "F", "G"],
    description: "Folk-rock minor cadence — Stairway intro feel",
  },
  {
    name: "I-vi-IV-V",
    chords: ["C", "Am", "F", "G"],
    description: "50s doo-wop — \"Stand By Me\", \"Earth Angel\"",
  },
  {
    name: "ii-V-I",
    chords: ["Dm", "G", "C"],
    description: "Jazz cadence — the most resolved chord motion in Western music",
  },
];
