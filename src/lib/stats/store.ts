"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SavedProgression {
  id: string;
  name: string;
  chords: string[];
  savedAt: number;
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

  recordChordPlay: (chord: string) => void;
  startSession: () => void;
  saveProgression: (chords: string[], name?: string) => string | null;
  removeProgression: (id: string) => void;
  recordSharedReceived: () => void;
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

export const useStatsStore = create<StatsState>()(
  persist(
    (set) => ({
      chordPlays: {},
      dayActivity: {},
      firstVisit: null,
      totalSessions: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDay: null,
      savedProgressions: [],
      sharedReceivedCount: 0,

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

      reset: () =>
        set({
          chordPlays: {},
          dayActivity: {},
          firstVisit: null,
          totalSessions: 0,
          currentStreak: 0,
          longestStreak: 0,
          lastActiveDay: null,
          savedProgressions: [],
          sharedReceivedCount: 0,
        }),
    }),
    {
      name: "keystrum-stats",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : noopStorage,
      ),
    },
  ),
);
