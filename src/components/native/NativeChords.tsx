"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  buildChordInfo,
  getChordFrequencies,
  type ChordInfo,
} from "@keystrum/layout";
import { guitarSynth } from "@keystrum/synth";
import { hapticPick, hapticStrum } from "@/lib/haptics";
import { Logo } from "@/components/brand/Logo";

const LONG_PRESS_MS = 420;

export default function NativeChords() {
  const chords = buildChordInfo();
  const [tooltipFor, setTooltipFor] = useState<string | null>(null);
  const pressTimer = useRef<number | null>(null);
  const longPressFired = useRef(false);

  const playChord = useCallback((c: ChordInfo) => {
    void hapticStrum();
    void guitarSynth.ensureContext();
    const freqs = getChordFrequencies(c);
    freqs.forEach((f, i) => {
      window.setTimeout(() => {
        void guitarSynth.pluck(f, 2.2, 0.7);
      }, i * 18);
    });
  }, []);

  const handlePressStart = useCallback((c: ChordInfo) => {
    longPressFired.current = false;
    pressTimer.current = window.setTimeout(() => {
      longPressFired.current = true;
      setTooltipFor(c.name);
      void hapticPick();
    }, LONG_PRESS_MS);
  }, []);

  const handlePressEnd = useCallback(() => {
    if (pressTimer.current !== null) {
      window.clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  }, []);

  const handleClick = useCallback(
    (c: ChordInfo, e: React.MouseEvent) => {
      if (longPressFired.current) {
        e.preventDefault();
        longPressFired.current = false;
        return;
      }
      playChord(c);
    },
    [playChord]
  );

  return (
    <div className="min-h-dvh bg-[#0E0E12] text-neutral-100">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-[#0E0E12]/90 px-5 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Logo size={20} className="shrink-0" />
          <h1 className="text-lg font-semibold tracking-tight">Chords</h1>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          tap to hear
        </span>
      </header>

      <main className="p-3">
        <p className="mb-3 px-1 text-[11px] text-neutral-400">
          Tap a chord to hear it · hold to read its feel
        </p>
        <ul className="grid grid-cols-2 gap-2.5">
          {chords.map((c) => {
            const keyStr = c.keys.map((row) => row[0] ?? "").join("");
            return (
              <li key={c.name} className="relative">
                <Link
                  href={`/app/chords/${c.name}`}
                  onClick={(e) => handleClick(c, e)}
                  onTouchStart={() => handlePressStart(c)}
                  onTouchEnd={handlePressEnd}
                  onTouchCancel={handlePressEnd}
                  onMouseDown={() => handlePressStart(c)}
                  onMouseUp={handlePressEnd}
                  onMouseLeave={handlePressEnd}
                  onContextMenu={(e) => e.preventDefault()}
                  className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border p-3.5 transition active:scale-[0.97]"
                  style={{
                    backgroundColor: "#13131a",
                    backgroundImage: `linear-gradient(160deg, ${c.color}22 0%, transparent 60%)`,
                    borderColor: `${c.color}33`,
                  }}
                  aria-label={`Play ${c.label}`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="font-mono text-[44px] font-black leading-none tracking-tight"
                      style={{ color: c.color, textShadow: `0 0 22px ${c.color}55` }}
                    >
                      {c.name}
                    </span>
                    <span className="rounded-full bg-black/35 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                      col {c.columnIndex + 1}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400">{c.label}</span>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {c.notes.map((n, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-white/10 bg-white/[0.02] px-1.5 py-0.5 font-mono text-[9px] text-neutral-300"
                      >
                        {n.replace(/-?\d+$/, "")}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[9px]">
                    <span className="font-mono uppercase tracking-widest text-neutral-400">
                      {keyStr}
                    </span>
                    <span
                      className="font-mono uppercase tracking-wider"
                      style={{ color: c.color }}
                    >
                      ▶ play
                    </span>
                  </div>
                </Link>

                {tooltipFor === c.name && (
                  <button
                    type="button"
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-black/85 p-4 text-center backdrop-blur-md"
                    onClick={() => setTooltipFor(null)}
                  >
                    <span
                      className="mb-2 font-mono text-lg font-black"
                      style={{ color: c.color }}
                    >
                      {c.name}
                    </span>
                    <span className="text-[11px] leading-relaxed text-neutral-200">
                      {c.feel}
                    </span>
                    <span className="mt-3 font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                      tap to dismiss
                    </span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
