import {
  JUDGE_SCORES,
  JUDGE_WINDOWS,
  HOLD_RELEASE_WINDOW_MS,
  type GameNote,
  type Judgment,
  type JudgmentResult,
  type Lane,
  type NoteKind,
} from "./types";

export function findCandidate(
  notes: GameNote[],
  lane: Lane,
  atMs: number,
  consumed: Set<number>,
  kindFilter?: NoteKind
): { note: GameNote; delta: number } | null {
  let best: { note: GameNote; delta: number } | null = null;
  for (const n of notes) {
    if (n.lane !== lane) continue;
    if (consumed.has(n.id)) continue;
    if (kindFilter && n.kind !== kindFilter) continue;
    const delta = Math.abs(n.time - atMs);
    if (delta > JUDGE_WINDOWS.miss) continue;
    if (!best || delta < best.delta) best = { note: n, delta };
  }
  return best;
}

export function judgeTap(
  notes: GameNote[],
  lane: Lane,
  atMs: number,
  consumed: Set<number>
): JudgmentResult | null {
  const best = findCandidate(notes, lane, atMs, consumed);
  if (!best) return null;
  const kind = classify(best.delta);
  if (!kind) return null;
  consumed.add(best.note.id);
  return {
    kind,
    deltaMs: best.note.time - atMs,
    noteId: best.note.id,
    score: JUDGE_SCORES[kind],
  };
}

export function judgeHoldRelease(
  note: GameNote,
  releasedAtMs: number
): { success: boolean; deltaMs: number } | null {
  if (note.kind !== "hold" || !note.holdMs) return null;
  const endAt = note.time + note.holdMs;
  const delta = releasedAtMs - endAt;
  return { success: Math.abs(delta) <= HOLD_RELEASE_WINDOW_MS || delta >= 0, deltaMs: delta };
}

function classify(delta: number): Judgment | null {
  if (delta <= JUDGE_WINDOWS.perfect) return "perfect";
  if (delta <= JUDGE_WINDOWS.great) return "great";
  if (delta <= JUDGE_WINDOWS.good) return "good";
  return null;
}

export function accuracyOf(stats: {
  perfect: number;
  great: number;
  good: number;
  miss: number;
}): number {
  const total = stats.perfect + stats.great + stats.good + stats.miss;
  if (total === 0) return 0;
  const weighted = stats.perfect * 1 + stats.great * 0.7 + stats.good * 0.4;
  return weighted / total;
}
