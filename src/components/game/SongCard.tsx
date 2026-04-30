"use client";

import Link from "next/link";
import { useGameStore, difficultyColor } from "@/lib/game/store";
import { ALL_LANES, LANE_COLORS, type Song } from "@/lib/game/types";

export function SongCard({ song }: { song: Song }) {
  const best = useGameStore((s) => s.bestBySong[song.id]);
  const dColor = difficultyColor(song.difficulty);
  return (
    <Link
      href={`/play/${song.id}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-5 transition hover:border-white/15 hover:bg-white/[0.04]"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{song.title}</h3>
          <p className="mt-0.5 text-xs text-neutral-400">{song.subtitle}</p>
        </div>
        <span
          className="rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
          style={{ borderColor: `${dColor}55`, color: dColor, background: `${dColor}10` }}
        >
          {song.difficulty}
        </span>
      </div>
      <div className="flex gap-1.5">
        {ALL_LANES.filter((lane) => song.chordMap[lane]).map((lane) => {
          const color = LANE_COLORS[lane];
          return (
            <span
              key={lane}
              className="flex-1 rounded-md border py-1.5 text-center text-[10px] font-mono font-bold"
              style={{ borderColor: `${color}44`, color, background: `${color}10` }}
            >
              {song.chordMap[lane]}
            </span>
          );
        })}
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col text-xs">
          <span className="text-neutral-400">Best</span>
          <span className="font-mono text-sm font-bold text-neutral-200">
            {best ? best.score.toLocaleString() : "—"}
          </span>
        </div>
        <div className="flex flex-col items-end text-xs">
          <span className="text-neutral-400">Notes</span>
          <span className="font-mono text-sm font-bold text-neutral-300">{song.notes.length}</span>
        </div>
        <span
          className="rounded-full bg-[#FF3864]/10 px-3 py-1 text-xs font-semibold text-[#FF3864] transition group-hover:bg-[#FF3864] group-hover:text-black"
        >
          Play →
        </span>
      </div>
    </Link>
  );
}
