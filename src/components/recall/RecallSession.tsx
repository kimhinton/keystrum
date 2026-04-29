"use client";

import { useEffect, useRef, useState } from "react";
import { useStatsStore } from "@/lib/stats/store";

const RECALL_INTERVAL_MS = 5 * 60 * 1000;
const PROMPT_WINDOW_MS = 30 * 1000;
const ALL_CHORDS = ["Am", "C", "Em", "G", "Dm", "F"] as const;

function pickWeakChord(chordPlays: Record<string, number>): string {
  const counts = ALL_CHORDS.map((c) => ({ chord: c, count: chordPlays[c] ?? 0 }));
  const min = Math.min(...counts.map((c) => c.count));
  const candidates = counts.filter((c) => c.count <= min + 5).map((c) => c.chord);
  return candidates[Math.floor(Math.random() * candidates.length)] ?? "C";
}

export default function RecallSession() {
  const setting = useStatsStore((s) => s.recallSetting);
  const pending = useStatsStore((s) => s.pendingRecall);
  const triggerRecall = useStatsStore((s) => s.triggerRecall);
  const skipRecall = useStatsStore((s) => s.skipRecall);
  const setRecallSetting = useStatsStore((s) => s.setRecallSetting);
  const chordPlays = useStatsStore((s) => s.chordPlays);

  const [resolved, setResolved] = useState<"correct" | "wrong" | null>(null);
  const [now, setNow] = useState(Date.now());
  const lastResolvedTotal = useRef(useStatsStore.getState().recallScore.total);

  useEffect(() => {
    if (setting === "off") return;
    const id = window.setInterval(() => {
      const s = useStatsStore.getState();
      if (s.pendingRecall) return;
      if (s.recallSetting === "off") return;
      const totalPlays = Object.values(s.chordPlays).reduce((a, b) => a + b, 0);
      if (totalPlays < 12) return;
      const chord = pickWeakChord(s.chordPlays);
      triggerRecall(chord, PROMPT_WINDOW_MS);
    }, RECALL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [setting, triggerRecall]);

  useEffect(() => {
    if (!pending) return;
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [pending]);

  useEffect(() => {
    const unsub = useStatsStore.subscribe((s) => {
      if (s.recallScore.total <= lastResolvedTotal.current) return;
      lastResolvedTotal.current = s.recallScore.total;
      const last = s.recallScore.perChord;
      const recent = Object.values(last).reduce(
        (acc, v) => ({ correct: acc.correct + v.correct, total: acc.total + v.total }),
        { correct: 0, total: 0 },
      );
      setResolved(recent.correct === s.recallScore.correct ? "correct" : "wrong");
      window.setTimeout(() => setResolved(null), 1800);
    });
    return unsub;
  }, []);

  if (setting === "off") return null;

  const expired = pending && pending.expiresAt < now;
  if (expired) skipRecall();

  if (!pending && !resolved) return null;

  if (resolved) {
    return (
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-widest shadow-lg backdrop-blur-md"
        style={{
          borderColor: resolved === "correct" ? "#10b98155" : "#fbbf2455",
          background: resolved === "correct" ? "rgba(16,185,129,0.15)" : "rgba(251,191,36,0.15)",
          color: resolved === "correct" ? "#34d399" : "#fbbf24",
        }}
      >
        {resolved === "correct" ? "Correct ✓" : "Try again next round"}
      </div>
    );
  }

  if (!pending) return null;
  const remainingSec = Math.max(0, Math.ceil((pending.expiresAt - now) / 1000));

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[min(420px,92vw)] -translate-x-1/2 rounded-2xl border border-[#FF3864]/40 bg-[#12121a]/95 p-4 shadow-2xl backdrop-blur-md">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF3864]">
          Quick check · {remainingSec}s
        </span>
        <span className="text-[10px] text-neutral-500">no peeking at the diagram</span>
      </div>
      <p className="mb-3 text-base text-neutral-100">
        Strum{" "}
        <span className="rounded-md bg-[#FF3864]/15 px-2 py-0.5 font-mono font-semibold text-[#FF3864]">
          {pending.chord}
        </span>
        {" "}without looking.
      </p>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={skipRecall}
          className="text-xs text-neutral-400 underline-offset-4 transition hover:text-neutral-200 hover:underline"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={() => {
            skipRecall();
            setRecallSetting("off");
          }}
          className="text-xs text-neutral-500 underline-offset-4 transition hover:text-neutral-300 hover:underline"
        >
          Don&rsquo;t ask again
        </button>
      </div>
    </div>
  );
}
