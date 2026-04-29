"use client";

import { useCallback, useRef, useState } from "react";
import { buildChordInfo, getChordFrequencies } from "@keystrum/layout";
import { guitarSynth } from "@keystrum/synth";
import { SONGS } from "@/lib/game/songs";
import type { Song } from "@/lib/game/types";
import { hapticPick, hapticStrum } from "@/lib/haptics";
import { Logo } from "@/components/brand/Logo";

function difficultyHue(d: Song["difficulty"]): string {
  if (d === "easy") return "#34d399";
  if (d === "medium") return "#fbbf24";
  return "#fb7185";
}

export default function NativeSongs() {
  const chordInfos = buildChordInfo();
  const colorByName = new Map(chordInfos.map((c) => [c.name, c.color]));
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playingChord, setPlayingChord] = useState<string | null>(null);
  const cancelRef = useRef(false);

  const previewSong = useCallback(
    async (song: Song) => {
      if (playingId) {
        cancelRef.current = true;
        return;
      }
      cancelRef.current = false;
      setPlayingId(song.id);
      void hapticStrum();
      await guitarSynth.ensureContext();
      const chordByName = new Map(buildChordInfo().map((c) => [c.name, c]));
      const chords = Array.from(new Set(Object.values(song.chordMap))).slice(0, 6);
      const msPerBeat = 60000 / song.bpm;
      for (const name of chords) {
        if (cancelRef.current) break;
        const ci = chordByName.get(name);
        if (!ci) continue;
        setPlayingChord(name);
        const freqs = getChordFrequencies(ci);
        freqs.forEach((f, i) => {
          window.setTimeout(() => {
            void guitarSynth.pluck(f, 2.2, 0.65);
          }, i * 18);
        });
        await new Promise((r) => window.setTimeout(r, Math.max(380, msPerBeat)));
      }
      setPlayingChord(null);
      setPlayingId(null);
    },
    [playingId]
  );

  return (
    <div className="min-h-dvh bg-[#0E0E12] text-neutral-100">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-[#0E0E12]/90 px-5 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Logo size={20} className="shrink-0" />
          <h1 className="text-lg font-semibold tracking-tight">Songs</h1>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
          tap to preview
        </span>
      </header>

      <main className="px-3 py-3">
        <p className="mb-2 px-2 text-[11px] text-neutral-500">
          Tap a song to hear its chord progression · tap again to stop
        </p>
        <ul className="space-y-2">
          {SONGS.map((song) => {
            const c0 = colorByName.get(song.chordMap[0]) ?? "#a78bfa";
            const c1 = colorByName.get(song.chordMap[1]) ?? "#fb7185";
            const c2 = colorByName.get(song.chordMap[2]) ?? "#60a5fa";
            const dColor = difficultyHue(song.difficulty);
            const initial = song.title.charAt(0).toUpperCase();
            const uniqueChords = Array.from(
              new Set(Object.values(song.chordMap))
            ).slice(0, 6);
            const isPlaying = playingId === song.id;
            return (
              <li key={song.id}>
                <button
                  type="button"
                  onClick={() => {
                    void hapticPick();
                    void previewSong(song);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition active:bg-white/[0.06]"
                  style={{
                    backgroundColor: isPlaying ? "#1a1a22" : undefined,
                    borderColor: isPlaying ? `${c0}55` : "rgba(255,255,255,0.05)",
                  }}
                  aria-label={
                    isPlaying ? `Stop ${song.title} preview` : `Preview ${song.title}`
                  }
                >
                  <div
                    className="relative flex size-[60px] shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-[0_8px_20px_-10px_rgba(0,0,0,0.6)]"
                    style={{
                      background: `linear-gradient(135deg, ${c0} 0%, ${c1} 55%, ${c2} 100%)`,
                    }}
                    aria-hidden="true"
                  >
                    <span
                      className="font-mono text-2xl font-black text-white/95"
                      style={{ textShadow: "0 2px 10px rgba(0,0,0,0.45)" }}
                    >
                      {initial}
                    </span>
                    {isPlaying && (
                      <span
                        className="absolute inset-0 flex items-center justify-center bg-black/55 font-mono text-[10px] font-bold uppercase tracking-widest text-white"
                      >
                        ■ stop
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[15px] font-semibold">
                      {song.title}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400">
                      <span className="font-mono">{song.bpm} BPM</span>
                      <span className="text-neutral-700">·</span>
                      <span
                        className="rounded-full px-1.5 py-0 font-mono text-[9px] font-bold uppercase tracking-wider"
                        style={{
                          color: dColor,
                          background: `${dColor}18`,
                          border: `1px solid ${dColor}33`,
                        }}
                      >
                        {song.difficulty}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {uniqueChords.map((name) => {
                        const color = colorByName.get(name) ?? "#999";
                        const active = isPlaying && playingChord === name;
                        return (
                          <span
                            key={name}
                            className="rounded-md border px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider transition"
                            style={{
                              color,
                              background: active ? `${color}33` : `${color}10`,
                              borderColor: active ? `${color}aa` : `${color}44`,
                            }}
                          >
                            {name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    className="shrink-0 text-neutral-500"
                    aria-hidden="true"
                  >
                    {isPlaying ? (
                      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <rect x="6" y="5" width="3" height="12" rx="1" fill="currentColor" />
                        <rect x="13" y="5" width="3" height="12" rx="1" fill="currentColor" />
                      </g>
                    ) : (
                      <polygon points="7 4 17 11 7 18" fill="currentColor" />
                    )}
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 px-2 text-center text-[11px] leading-relaxed text-neutral-600">
          Tap a song to start. Touch-drag across the on-screen keys to strum — practice mode has full touch support.
        </p>
      </main>
    </div>
  );
}
