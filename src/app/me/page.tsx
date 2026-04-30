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
  const [now, setNow] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard SSR hydration pattern; Zustand persist requires post-mount flag
    setHydrated(true);
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const chordPlays = useStatsStore((s) => s.chordPlays);
  const dayActivity = useStatsStore((s) => s.dayActivity);
  const firstVisit = useStatsStore((s) => s.firstVisit);
  const firstAudioAt = useStatsStore((s) => s.firstAudioAt);
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
  const chordSrs = useStatsStore((s) => s.chordSrs);

  const formatNextDue = (ms: number): string => {
    const hours = ms / 3_600_000;
    if (hours < 1) return `${Math.max(1, Math.round(ms / 60_000))}m`;
    if (hours < 24) return `${Math.round(hours)}h`;
    return `${Math.round(hours / 24)}d`;
  };

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

  // Time-dependent due-card calculation: now is updated every minute via useEffect interval
  // (function-body Date.now() would violate react-hooks/purity)
  let dueCount = 0;
  let nextDueAt = Number.POSITIVE_INFINITY;
  let nextDueChord: string | null = null;
  for (const c of CHORDS) {
    const s = chordSrs[c];
    if (!s || s.dueAt <= now) {
      dueCount += 1;
    } else if (s.dueAt < nextDueAt) {
      nextDueAt = s.dueAt;
      nextDueChord = c;
    }
  }
  const nextDueIn = nextDueAt === Number.POSITIVE_INFINITY ? null : nextDueAt - now;
  const dueInfo = { dueCount, nextDueIn, nextDueChord };

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
          <span className="font-mono text-xs uppercase tracking-widest text-brand">Your stats</span>
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
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-hover"
            >
              Open the instrument →
            </Link>
          </div>
        )}

        {!empty && (
          <>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">Streak</div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-neutral-100">{currentStreak}</span>
                  <span className="text-xs text-neutral-400">day{currentStreak === 1 ? "" : "s"}</span>
                </div>
                <div className="mt-1 text-xs text-neutral-400">Longest: {longestStreak} day{longestStreak === 1 ? "" : "s"}</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">Total chord plays</div>
                <div className="mt-2 text-4xl font-semibold text-neutral-100">{totalPlays.toLocaleString()}</div>
                <div className="mt-1 text-xs text-neutral-400">Across all sessions</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">Sessions</div>
                <div className="mt-2 text-4xl font-semibold text-neutral-100">{totalSessions}</div>
                <div className="mt-1 text-xs text-neutral-400">{firstVisit ? `Since ${firstVisit}` : "Today"}</div>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h2 className="mb-4 text-xs font-mono uppercase tracking-widest text-neutral-400">Plays per chord</h2>
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

            {firstVisit && (
              <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="mb-3 flex items-baseline justify-between">
                  <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">Funnel (AARRR · self-hosted)</h2>
                  <span className="font-mono text-[10px] text-neutral-400">localStorage</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-4">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Acquisition</div>
                    <div className="mt-1 text-sm text-neutral-200">First visit</div>
                    <div className="mt-0.5 font-mono text-xs text-brand">{firstVisit}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Activation</div>
                    <div className="mt-1 text-sm text-neutral-200">First chord</div>
                    <div className="mt-0.5 font-mono text-xs text-brand">
                      {firstAudioAt
                        ? `${Math.round((firstAudioAt - new Date(firstVisit).getTime()) / 1000)}s after visit`
                        : "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Retention</div>
                    <div className="mt-1 text-sm text-neutral-200">{Object.keys(dayActivity).length} active day{Object.keys(dayActivity).length === 1 ? "" : "s"}</div>
                    <div className="mt-0.5 font-mono text-xs text-brand">streak {currentStreak}d / max {longestStreak}d</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Referral</div>
                    <div className="mt-1 text-sm text-neutral-200">Shared progressions opened</div>
                    <div className="mt-0.5 font-mono text-xs text-brand">{sharedReceivedCount}</div>
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-neutral-400">All numbers live in this browser&rsquo;s localStorage. No telemetry, no SaaS. Reset clears them.</p>
              </div>
            )}

            <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h2 className="mb-4 text-xs font-mono uppercase tracking-widest text-neutral-400">Last 30 days</h2>
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
              <p className="mt-3 text-xs text-neutral-400">
                Each square is one day. Brighter = more chord plays.
              </p>
            </div>

            <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <div className="mb-4 flex items-baseline justify-between">
                <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">Saved progressions</h2>
                <span className="text-xs text-neutral-400">{savedProgressions.length}</span>
              </div>
              {savedProgressions.length === 0 ? (
                <p className="text-sm text-neutral-400">
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
                          className="text-xs text-neutral-400 transition hover:text-red-400"
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
                <span className="font-mono font-semibold text-brand">{sharedReceivedCount}</span>{" "}
                shared progression{sharedReceivedCount === 1 ? "" : "s"} from someone else.
              </div>
            )}

            <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">Active recall</h2>
                <div className="flex items-center gap-1 rounded-md border border-white/10 p-0.5 text-xs">
                  {(["off", "auto", "drill"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setRecallSetting(mode)}
                      className={
                        recallSetting === mode
                          ? "rounded bg-brand/20 px-2 py-1 font-medium text-brand"
                          : "rounded px-2 py-1 text-neutral-400 transition hover:text-neutral-200"
                      }
                    >
                      {mode === "off" ? "Off" : mode === "auto" ? "1 chord" : "3-chord drill"}
                    </button>
                  ))}
                </div>
              </div>
              {recallScore.total === 0 ? (
                <p className="text-sm text-neutral-400">
                  {recallSetting === "off"
                    ? "Recall checks are off. Pick 1 chord (single-chord prompt) or 3-chord drill (interleaving) to get a quick check every 5 minutes."
                    : recallSetting === "drill"
                      ? "Once you've played a few chords, you'll get a 3-chord drill every 5 minutes — \"strum Am → C → G without looking.\" Interleaving is ~43% better for retention than single-chord drill (Rohrer 2012). Skippable anytime."
                      : "Once you've played a few chords, you'll get a quick check every 5 minutes — \"strum X without looking.\" Skippable anytime."}
                </p>
              ) : (
                <>
                {recallSetting !== "off" && (
                  <p className="mb-3 text-xs text-neutral-400">
                    {dueInfo.dueCount > 0
                      ? `${dueInfo.dueCount} chord${dueInfo.dueCount === 1 ? "" : "s"} due now (SM-2 spaced repetition queue).`
                      : dueInfo.nextDueIn && dueInfo.nextDueChord
                        ? `All caught up — next: ${dueInfo.nextDueChord} in ${formatNextDue(dueInfo.nextDueIn)}.`
                        : "Spaced repetition queue empty — next prompt picks the chord you've practiced least."}
                  </p>
                )}
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-neutral-100">
                      {Math.round((recallScore.correct / recallScore.total) * 100)}%
                    </span>
                    <span className="text-xs text-neutral-400">
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
                              {pct}% <span className="text-neutral-400">({per.correct}/{per.total})</span>
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
                className="text-xs text-neutral-400 underline-offset-4 transition hover:text-red-400 hover:underline"
              >
                Reset all stats
              </button>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between text-xs text-neutral-400">
          <div>© 2026 keystrum · MIT licensed · Stored locally in your browser</div>
          <Link href="/" className="hover:text-neutral-300">← Home</Link>
        </div>
      </footer>
    </div>
  );
}
