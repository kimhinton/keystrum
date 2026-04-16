export const KEYBOARD_ROWS: readonly string[][] = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
] as const;

export const STRING_NAMES = ["E4", "B3", "G3", "D3"] as const;
export type StringIndex = 0 | 1 | 2 | 3;

export const ROW_OFFSETS = [0, 0.5, 1, 1.8] as const;

const KEY_INDEX_MAP = new Map<string, { row: StringIndex; col: number }>();
KEYBOARD_ROWS.forEach((row, rowIdx) => {
  row.forEach((key, colIdx) => {
    KEY_INDEX_MAP.set(key, { row: rowIdx as StringIndex, col: colIdx });
  });
});

export function getKeyPosition(key: string): { row: StringIndex; col: number } | null {
  return KEY_INDEX_MAP.get(key.toLowerCase()) ?? null;
}

export function getColumnKeys(col: number): string[] {
  return KEYBOARD_ROWS
    .map((row) => row[col])
    .filter((k): k is string => Boolean(k));
}

export function isKeyboardKey(key: string): boolean {
  return KEY_INDEX_MAP.has(key.toLowerCase());
}
