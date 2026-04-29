"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { useStatsStore } from "@/lib/stats/store";
import { encodeProgression } from "@/lib/share/progression";

const CHORDS = ["Am", "C", "Em", "G", "Dm", "F"] as const;
const CHORD_COLOR: Record<string, string> = {
  Am: "#a78bfa",
  C: "#34d399",
  Em: "#f472b6",
  G: "#fbbf24",
  Dm: "#60a5fa",
  F: "#fb7185",
};

function isoDay(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function lastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(isoDay(d));
  }
  return days;
}

export default function MePage() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const chordPlays = useStatsStore((s) => s.chordPlays);
  const dayActivity = useStatsStore((s) => s.dayActivity);
  const firstVisit = useStatsStore((s) => s.firstVisit);
  const totalSessions = useStatsStore((s) => s.totalSessions);
  const currentStreak = useStatsStore((s) => s.currentStreak);
  const longestStreak = useStatsStore((s) => s.longestStreak);
  const savedProgressions = useStatsStore((s) => s.savedProgressions);
  const sharedReceivedCount = useStatsStore((s) => s.sharedReceivedCount);
  const removeProgression = useStatsStore((s) => s.removeProgression);
  const reset = useStatsStore((s) => s.reset);
  const recallScore = useStatsStore((s) => s.recallScore);
  const recallSetting = useStatsStore((s) => s.recallSetting);
  const setRecallSetting = useStatsStore((s) => s.setRecallSetting);

  const totalPlays = useMemo(
    () => Object.values(chordPlays).reduce((a, b) => a + b, 0),
    [chordPlays],
  );
  const maxChordCount = useMemo(
    () => Math.max(1, ...CHORDS.map((c) => chordPlays[c] ?? 0)),
    [chordPlays],
  );

  const days = useMemo(() => lastNDays(30), []);
  const maxDayCount = useMemo(
    () => Math.max(1, ...days.map((d) => dayActivity[d] ?? 0)),
    [days, dayActivity],
  );

  const heatBg = (count: number) => {
    if (count === 0) return "rgba(255,255,255,0.03)";
    const t = Math.min(1, count / maxDayCount);
    const opacity = 0.15 + t * 0.65;
    return `rgba(255,56,100,${opacity.toFixed(2)})`;
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#0E0E12] text-neutral-100" />
    );
  }

  const empty = totalPlays === 0 && savedProgressions.length === 0 && totalSessions === 0;

  return (
    <div className="min-h-screen bg-[#0E0E12] text-neutral-100">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#0E0E12]/80 px-6 py-4 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Logo size={20} className="shrink-0" />
          keystrum
        </Link>
        <div className="flex items-center gap-5 text-sm text-neutral-400">
          <Link href="/" className="transition hover:text-white">Instrument</Link>
          <Link href="/chords" className="transition hover:text-white">Chords</Link>
          <Link href="/play" className="transition hover:text-white">Practice</Link>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF3864]">Your stats</span>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything you&rsquo;ve strummed.
          </h1>
          <p className="mt-3 max-w-xl text-neutral-400">
            Saved locally in your browser. No account, no server. Reset clears everything.
          </p>
        </div>

        {empty && (
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-10 text-center">
            <p className="mb-4 text-neutral-300">Nothing yet — go play a few chords.</p>
            <Link
              href="/#instrument"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF3864] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#FF5680]"
            >
              Open the instrument →
            </Link>
          </div>
        )}

        {!empty && (
          <>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">Streak</div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-neutral-100">{currentStreak}</span>
                  <span className="text-xs text-neutral-500">day{currentStreak === 1 ? "" : "s"}</span>
                </div>
                <div className="mt-1 text-xs text-neutral-500">Longest: {longestStreak} day{longestStreak === 1 ? "" : "s"}</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">Total chord plays</div>
                <div className="mt-2 text-4xl font-semibold text-neutral-100">{totalPlays.toLocaleString()}</div>
                <div className="mt-1 text-xs text-neutral-500">Across all sessions</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">Sessions</div>
                <div className="mt-2 text-4xl font-semibold text-neutral-100">{totalSessions}</div>
                <div className="mt-1 text-xs text-neutral-500">{firstVisit ? `Since ${firstVisit}` : "Today"}</div>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h2 className="mb-4 text-xs font-mono uppercase tracking-widest text-neutral-500">Plays per chord</h2>
              <div className="space-y-2.5">
                {CHORDS.map((c) => {
                  const count = chordPlays[c] ?? 0;
                  const width = (count / maxChordCount) * 100;
                  return (
                    <div key={c} className="flex items-center gap-3">
                      <span
                        className="w-10 font-mono text-sm font-semibold tabular-nums"
                        style={{ color: CHORD_COLOR[c] }}
                      >
                        {c}
                      </span>
                      <div className="flex-1 overflow-hidden rounded-full bg-white/[0.03]">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${width}%`,
                            background: CHORD_COLOR[c],
                            opacity: count === 0 ? 0.15 : 0.85,
                          }}
                        />
                      </div>
                      <span className="w-12 text-right font-mono text-xs tabular-nums text-neutral-400">
                        {count.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h2 className="mb-4 text-xs font-mono uppercase tracking-widest text-neutral-500">Last 30 days</h2>
              <div className="flex flex-wrap gap-1">
                {days.map((day) => {
                  const count = dayActivity[day] ?? 0;
                  return (
                    <div
                      key={day}
                      title={`${day}: ${count} chord${count === 1 ? "" : "s"}`}
                      className="size-3.5 rounded-sm"
                      style={{ background: heatBg(count) }}
                    />
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-neutral-500">
                Each square is one day. Brighter = more chord plays.
              </p>
            </div>

            <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <div className="mb-4 flex items-baseline justify-between">
                <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">Saved progressions</h2>
                <span className="text-xs text-neutral-500">{savedProgressions.length}</span>
              </div>
              {savedProgressions.length === 0 ? (
                <p className="text-sm text-neutral-500">
                  Save a progression from{" "}
                  <Link href="/" className="text-neutral-300 underline-offset-4 hover:underline">
                    the home page
                  </Link>
                  .
                </p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {savedProgressions.map((p) => {
                    const slug = encodeProgression(p.chords as readonly string[] as never);
                    return (
                      <li
                        key={p.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
                      >
                        <Link
                          href={`/?prog=${slug}#instrument`}
                          className="flex items-baseline gap-2 font-mono text-sm text-neutral-200 transition hover:text-white"
                        >
                          {p.chords.join(" → ")}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeProgression(p.id)}
                          aria-label={`Remove ${p.chords.join("-")}`}
                          className="text-xs text-neutral-500 transition hover:text-red-400"
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {sharedReceivedCount > 0 && (
              <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-5 text-sm text-neutral-300">
                You&rsquo;ve opened{" "}
                <span className="font-mono font-semibold text-[#FF3864]">{sharedReceivedCount}</span>{" "}
                shared progression{sharedReceivedCount === 1 ? "" : "s"} from someone else.
              </div>
            )}

            <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">Active recall</h2>
                <button
                  type="button"
                  onClick={() => setRecallSetting(recallSetting === "off" ? "auto" : "off")}
                  className="text-xs text-neutral-400 underline-offset-4 transition hover:text-neutral-200 hover:underline"
                >
                  {recallSetting === "off" ? "Turn on" : "Turn off"}
                </button>
              </div>
              {recallScore.total === 0 ? (
                <p className="text-sm text-neutral-500">
                  {recallSetting === "off"
                    ? "Recall checks are off. Turn them on to get a quick chord quiz every 5 minutes."
                    : "Once you've played a few chords, you'll get a quick check every 5 minutes — \"strum X without looking.\" Skippable anytime."}
                </p>
              ) : (
                <>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-neutral-100">
                      {Math.round((recallScore.correct / recallScore.total) * 100)}%
                    </span>
                    <span className="text-xs text-neutral-500">
                      {recallScore.correct}/{recallScore.total} correct
                    </span>
                  </div>
                  {Object.keys(recallScore.perChord).length > 0 && (
                    <div className="mt-3 grid gap-1 text-xs sm:grid-cols-3">
                      {CHORDS.map((c) => {
                        const per = recallScore.perChord[c];
                        if (!per) return null;
                        const pct = per.total === 0 ? 0 : Math.round((per.correct / per.total) * 100);
                        return (
                          <div key={c} className="flex items-baseline justify-between rounded-md border border-white/5 bg-white/[0.02] px-2 py-1.5">
                            <span className="font-mono" style={{ color: CHORD_COLOR[c] }}>{c}</span>
                            <span className="font-mono tabular-nums text-neutral-400">
                              {pct}% <span className="text-neutral-600">({per.correct}/{per.total})</span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="mt-10 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Reset all your stats? This cannot be undone.")) reset();
                }}
                className="text-xs text-neutral-500 underline-offset-4 transition hover:text-red-400 hover:underline"
              >
                Reset all stats
              </button>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between text-xs text-neutral-500">
          <div>© 2026 keystrum · MIT licensed · Stored locally in your browser</div>
          <Link href="/" className="hover:text-neutral-300">← Home</Link>
        </div>
      </footer>
    </div>
  );
}
