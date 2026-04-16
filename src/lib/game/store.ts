"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Difficulty, Judgment, RunStats } from "./types";

export interface BestRun {
  score: number;
  accuracy: number;
  maxCombo: number;
  at: number;
}

interface GameState {
  bestBySong: Record<string, BestRun>;
  lastRun: RunStats | null;
  masterVolume: number;
  noteSpeed: number;
  submitRun: (run: RunStats) => void;
  setMasterVolume: (v: number) => void;
  setNoteSpeed: (v: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      bestBySong: {},
      lastRun: null,
      masterVolume: 0.6,
      noteSpeed: 1,
      submitRun: (run) =>
        set((state) => {
          const prev = state.bestBySong[run.songId];
          const next: BestRun = {
            score: run.score,
            accuracy: run.accuracy,
            maxCombo: run.maxCombo,
            at: run.completedAt,
          };
          const bestBySong =
            !prev || run.score > prev.score
              ? { ...state.bestBySong, [run.songId]: next }
              : state.bestBySong;
          return { bestBySong, lastRun: run };
        }),
      setMasterVolume: (v) => set({ masterVolume: Math.max(0, Math.min(1, v)) }),
      setNoteSpeed: (v) => set({ noteSpeed: Math.max(0.5, Math.min(2, v)) }),
    }),
    {
      name: "keystrum-game",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        bestBySong: s.bestBySong,
        masterVolume: s.masterVolume,
        noteSpeed: s.noteSpeed,
      }),
    }
  )
);

export function judgmentLabel(j: Judgment): string {
  if (j === "perfect") return "PERFECT";
  if (j === "great") return "GREAT";
  if (j === "good") return "GOOD";
  return "MISS";
}

export function judgmentColor(j: Judgment): string {
  if (j === "perfect") return "#fbbf24";
  if (j === "great") return "#34d399";
  if (j === "good") return "#60a5fa";
  return "#f87171";
}

export function difficultyColor(d: Difficulty): string {
  if (d === "easy") return "#34d399";
  if (d === "medium") return "#fbbf24";
  return "#f87171";
}
