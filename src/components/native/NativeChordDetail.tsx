"use client";

import { useCallback } from "react";
import Link from "next/link";
import { getChordFrequencies, type ChordInfo } from "@keystrum/layout";
import { guitarSynth } from "@keystrum/synth";
import { hapticPick, hapticStrum } from "@/lib/haptics";

const STRING_LABELS = ["E4", "B3", "G3", "D3"] as const;

type SongRef = {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
};

export default function NativeChordDetail({
  chord: c,
  songsWithChord,
}: {
  chord: ChordInfo;
  songsWithChord: SongRef[];
}) {
  const playStrum = useCallback(() => {
    void hapticStrum();
    void guitarSynth.ensureContext();
    const freqs = getChordFrequencies(c);
    freqs.forEach((f, i) => {
      window.setTimeout(() => {
        void guitarSynth.pluck(f, 2.2, 0.7);
      }, i * 18);
    });
  }, [c]);

  const playString = useCallback(
    (idx: number) => {
      void hapticPick();
      void guitarSynth.ensureContext();
      const freqs = getChordFrequencies(c);
      void guitarSynth.pluck(freqs[idx], 2.2, 0.7);
    },
    [c]
  );

  return (
    <div className="min-h-dvh bg-[#0b0b0f] text-neutral-100">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-white/5 bg-[#0b0b0f]/90 px-4 py-3 backdrop-blur-xl">
        <Link
          href="/app/chords"
          onClick={() => {
            void hapticPick();
          }}
          className="flex size-8 items-center justify-center rounded-full border border-white/10 text-neutral-300 active:bg-white/10"
          aria-label="Back to chords"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="12 3 5 9 12 15" />
          </svg>
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span
              className="font-mono text-2xl font-black leading-none tracking-tight"
              style={{ color: c.color }}
            >
              {c.name}
            </span>
            <span className="truncate text-xs text-neutral-400">{c.label}</span>
          </div>
        </div>
        <span className="rounded-full bg-black/35 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400">
          col {c.columnIndex + 1}
        </span>
      </header>

      <main className="space-y-4 p-4">
        <button
          type="button"
          onClick={playStrum}
          className="relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border p-6 transition active:scale-[0.98]"
          style={{
            backgroundColor: "#13131a",
            backgroundImage: `linear-gradient(160deg, ${c.color}28 0%, transparent 55%)`,
            borderColor: `${c.color}44`,
          }}
        >
          <span
            className="font-mono text-7xl font-black leading-none"
            style={{ color: c.color, textShadow: `0 0 30px ${c.color}66` }}
          >
            {c.name}
          </span>
          <span
            className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ color: c.color }}
          >
            ▶ tap to strum
          </span>
        </button>

        <p className="px-1 text-[13px] leading-relaxed text-neutral-300">
          {c.feel}
        </p>

        <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <h2 className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            Notes
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {c.notes.map((n, i) => (
              <span
                key={i}
                className="rounded-md border px-2 py-1 font-mono text-xs font-semibold"
                style={{
                  borderColor: `${c.color}55`,
                  background: `${c.color}12`,
                  color: c.color,
                }}
              >
                {n}
              </span>
            ))}
          </div>
          <h2 className="mt-4 mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            Intervals
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {c.intervals.map((iv, i) => (
              <span
                key={i}
                className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 font-mono text-xs text-neutral-300"
              >
                {iv}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <h2 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            Keyboard column {c.columnIndex + 1}
          </h2>
          <ul className="space-y-2">
            {c.keys.map((row, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => playString(i)}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-2 transition active:bg-white/[0.06]"
                >
                  <span className="w-12 font-mono text-[11px] text-neutral-500">
                    {STRING_LABELS[i]}
                  </span>
                  <span
                    className="inline-flex size-10 items-center justify-center rounded-lg border font-mono text-base font-bold"
                    style={{
                      borderColor: `${c.color}55`,
                      background: `${c.color}12`,
                      color: c.color,
                    }}
                  >
                    {row[0]?.toUpperCase() ?? "·"}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500">
                    fret {c.frets[i]}
                  </span>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                    tap
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] leading-relaxed text-neutral-500">
            Tap any row to pick that string · sweep 2+ in under 90ms to strum.
          </p>
        </section>

        {songsWithChord.length > 0 && (
          <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
            <h2 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              Appears in
            </h2>
            <ul className="space-y-1">
              {songsWithChord.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-neutral-200">{s.title}</span>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                    {s.difficulty}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {c.usedIn.length > 0 && (
          <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
            <h2 className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              Famously used in
            </h2>
            <ul className="space-y-1 text-sm text-neutral-300">
              {c.usedIn.map((s, i) => (
                <li key={i} className="flex items-baseline gap-2">
                  <span className="text-neutral-600">—</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {c.siblings.length > 0 && (
          <section>
            <h2 className="mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              Related
            </h2>
            <div className="flex flex-wrap gap-2">
              {c.siblings.map((sib) => (
                <Link
                  key={sib}
                  href={`/app/chords/${sib}`}
                  onClick={() => {
                    void hapticPick();
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-sm text-neutral-300 transition active:bg-white/[0.08]"
                >
                  {sib}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
