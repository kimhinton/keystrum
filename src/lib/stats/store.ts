"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SavedProgression {
  id: string;
  name: string;
  chords: string[];
  savedAt: number;
}

export type RecallSetting = "auto" | "off";

export interface PendingRecall {
  chord: string;
  expiresAt: number;
}

export interface RecallScore {
  correct: number;
  total: number;
  perChord: Record<string, { correct: number; total: number }>;
}

export interface StatsState {
  chordPlays: Record<string, number>;
  dayActivity: Record<string, number>;
  firstVisit: string | null;
  totalSessions: number;

  currentStreak: number;
  longestStreak: number;
  lastActiveDay: string | null;

  savedProgressions: SavedProgression[];

  sharedReceivedCount: number;

  recallSetting: RecallSetting;
  recallScore: RecallScore;
  pendingRecall: PendingRecall | null;

  recordChordPlay: (chord: string) => void;
  startSession: () => void;
  saveProgression: (chords: string[], name?: string) => string | null;
  removeProgression: (id: string) => void;
  recordSharedReceived: () => void;
  setRecallSetting: (s: RecallSetting) => void;
  triggerRecall: (chord: string, durationMs?: number) => void;
  resolveRecall: (played: string) => "correct" | "wrong" | "noop";
  skipRecall: () => void;
  reset: () => void;
}

const isoDay = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const today = () => isoDay(new Date());
const yesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return isoDay(d);
};

const noopStorage: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  key: () => null,
  length: 0,
};

type StatsData = Omit<
  StatsState,
  | "recordChordPlay"
  | "startSession"
  | "saveProgression"
  | "removeProgression"
  | "recordSharedReceived"
  | "setRecallSetting"
  | "triggerRecall"
  | "resolveRecall"
  | "skipRecall"
  | "reset"
>;

const INITIAL_STATS: StatsData = {
  chordPlays: {},
  dayActivity: {},
  firstVisit: null,
  totalSessions: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDay: null,
  savedProgressions: [],
  sharedReceivedCount: 0,
  recallSetting: "auto",
  recallScore: { correct: 0, total: 0, perChord: {} },
  pendingRecall: null,
};

export const useStatsStore = create<StatsState>()(
  persist(
    (set): StatsState => ({
      ...INITIAL_STATS,

      recordChordPlay: (chord) =>
        set((s) => {
          const t = today();
          return {
            chordPlays: { ...s.chordPlays, [chord]: (s.chordPlays[chord] ?? 0) + 1 },
            dayActivity: { ...s.dayActivity, [t]: (s.dayActivity[t] ?? 0) + 1 },
            firstVisit: s.firstVisit ?? t,
          };
        }),

      startSession: () =>
        set((s) => {
          const t = today();
          if (s.lastActiveDay === t) return s;
          const y = yesterday();
          const newStreak = s.lastActiveDay === y ? s.currentStreak + 1 : 1;
          return {
            totalSessions: s.totalSessions + 1,
            currentStreak: newStreak,
            longestStreak: Math.max(s.longestStreak, newStreak),
            lastActiveDay: t,
            firstVisit: s.firstVisit ?? t,
          };
        }),

      saveProgression: (chords, name) => {
        if (chords.length === 0) return null;
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        set((s) => ({
          savedProgressions: [
            ...s.savedProgressions,
            {
              id,
              name: name ?? chords.join(" → "),
              chords: [...chords],
              savedAt: Date.now(),
            },
          ],
        }));
        return id;
      },

      removeProgression: (id) =>
        set((s) => ({
          savedProgressions: s.savedProgressions.filter((p) => p.id !== id),
        })),

      recordSharedReceived: () =>
        set((s) => ({ sharedReceivedCount: s.sharedReceivedCount + 1 })),

      setRecallSetting: (recallSetting) =>
        set({ recallSetting, pendingRecall: null }),

      triggerRecall: (chord, durationMs = 30_000) => {
        const s = useStatsStore.getState();
        if (s.recallSetting === "off") return;
        if (s.pendingRecall && s.pendingRecall.expiresAt > Date.now()) return;
        set({ pendingRecall: { chord, expiresAt: Date.now() + durationMs } });
      },

      resolveRecall: (played) => {
        const s = useStatsStore.getState();
        const pending = s.pendingRecall;
        if (!pending) return "noop";
        if (pending.expiresAt < Date.now()) {
          set({ pendingRecall: null });
          return "noop";
        }
        const correct = pending.chord === played;
        const prevPer = s.recallScore.perChord[pending.chord] ?? { correct: 0, total: 0 };
        set({
          pendingRecall: null,
          recallScore: {
            correct: s.recallScore.correct + (correct ? 1 : 0),
            total: s.recallScore.total + 1,
            perChord: {
              ...s.recallScore.perChord,
              [pending.chord]: {
                correct: prevPer.correct + (correct ? 1 : 0),
                total: prevPer.total + 1,
              },
            },
          },
        });
        return correct ? "correct" : "wrong";
      },

      skipRecall: () => set({ pendingRecall: null }),

      reset: () => set(INITIAL_STATS),
    }),
    {
      name: "keystrum-stats",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : noopStorage,
      ),
    },
  ),
);
