export type Lane = 0 | 1 | 2 | 3 | 4 | 5;
export type StrumDir = "down" | "up";
export type Difficulty = "easy" | "medium" | "hard";
export type Judgment = "perfect" | "great" | "good" | "miss";
export type NoteKind = "tap" | "hold" | "strum" | "mute";

export const ALL_LANES: Lane[] = [0, 1, 2, 3, 4, 5];

export interface GameNote {
  id: number;
  time: number;
  lane: Lane;
  kind: NoteKind;
  strumDir?: StrumDir;
  holdMs?: number;
  muteCol?: number;
}

export interface SongMeta {
  id: string;
  title: string;
  subtitle: string;
  credit: string;
  difficulty: Difficulty;
  bpm: number;
  durationMs: number;
  chordMap: Record<number, string>;
  datePublished: string;
}

export interface Song extends SongMeta {
  notes: GameNote[];
}

export interface JudgmentResult {
  kind: Judgment;
  deltaMs: number;
  noteId: number;
  score: number;
}

export interface RunStats {
  songId: string;
  score: number;
  maxCombo: number;
  perfect: number;
  great: number;
  good: number;
  miss: number;
  accuracy: number;
  completedAt: number;
}

export const JUDGE_WINDOWS = {
  perfect: 60,
  great: 120,
  good: 200,
  miss: 260,
} as const;

export const JUDGE_SCORES: Record<Judgment, number> = {
  perfect: 300,
  great: 200,
  good: 100,
  miss: 0,
};

export const STRUM_MULTI_WINDOW_MS = 140;
export const STRUM_BONUS = 150;
export const HOLD_RELEASE_WINDOW_MS = 120;
export const HOLD_BONUS_PER_HOLD = 120;

export const LANE_KEYS: Record<Lane, string[]> = {
  0: ["1", "q", "a", "z"],
  1: ["2", "w", "s", "x"],
  2: ["3", "e", "d", "c"],
  3: ["4", "r", "f", "v"],
  4: ["5", "t", "g", "b"],
  5: ["6", "y", "h", "n"],
};

export const LANE_COLORS: Record<Lane, string> = {
  0: "#a78bfa",
  1: "#fb7185",
  2: "#60a5fa",
  3: "#34d399",
  4: "#fbbf24",
  5: "#f472b6",
};

export const MUTE_KEYS = ["j", "k", "l", ";"] as const;

export const MUTE_COLORS: Record<number, string> = {
  0: "#f59e0b",
  1: "#ec4899",
  2: "#14b8a6",
  3: "#f97316",
};
