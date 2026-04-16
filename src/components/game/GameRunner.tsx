"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { guitarSynth } from "@keystrum/synth";
import {
  DEFAULT_CHORD_COLUMNS,
  getChordFrequencies,
  type ChordPreset,
  KEYBOARD_ROWS,
  getKeyPosition,
} from "@keystrum/layout";
import { findCandidate, judgeHoldRelease, accuracyOf } from "@/lib/game/judgment";
import {
  useGameStore,
  judgmentLabel,
  judgmentColor,
} from "@/lib/game/store";
import GameStage from "./GameStage";
import {
  ALL_LANES,
  HOLD_BONUS_PER_HOLD,
  HOLD_RELEASE_WINDOW_MS,
  JUDGE_SCORES,
  JUDGE_WINDOWS,
  LANE_COLORS,
  LANE_KEYS,
  MUTE_KEYS,
  STRUM_BONUS,
  STRUM_MULTI_WINDOW_MS,
  type GameNote,
  type Judgment,
  type Lane,
  type RunStats,
  type Song,
} from "@/lib/game/types";

const COUNTDOWN_MS = 3000;

type Phase = "idle" | "countdown" | "playing" | "finished";

interface Burst {
  id: number;
  lane: Lane;
  label: string;
  color: string;
}

interface ActiveHold {
  noteId: number;
  lane: Lane;
  key: string;
}

function classify(delta: number): Judgment | null {
  if (delta <= JUDGE_WINDOWS.perfect) return "perfect";
  if (delta <= JUDGE_WINDOWS.great) return "great";
  if (delta <= JUDGE_WINDOWS.good) return "good";
  return null;
}

export default function GameRunner({ song }: { song: Song }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [now, setNow] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [stats, setStats] = useState({ perfect: 0, great: 0, good: 0, miss: 0 });
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [activeHolds, setActiveHolds] = useState<ActiveHold[]>([]);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [mascotActiveLane, setMascotActiveLane] = useState<Lane | null>(null);
  const [mascotStrumming, setMascotStrumming] = useState(false);
  const [mascotMissing, setMascotMissing] = useState(false);

  const startedAtRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const consumedRef = useRef<Set<number>>(new Set());
  const missedRef = useRef<Set<number>>(new Set());
  const burstIdRef = useRef(0);
  const pressedRef = useRef<Set<string>>(new Set());
  const strumPendingRef = useRef<Map<number, { firstKey: string; firstAt: number }>>(new Map());
  const holdingRef = useRef<Map<string, { noteId: number; lane: Lane }>>(new Map());
  const mascotActiveTimerRef = useRef<number | null>(null);
  const mascotStrumTimerRef = useRef<number | null>(null);
  const mascotMissTimerRef = useRef<number | null>(null);

  const submitRun = useGameStore((s) => s.submitRun);
  const masterVolume = useGameStore((s) => s.masterVolume);

  const chordPresets = useMemo<Record<Lane, ChordPreset | null>>(() => {
    const map: Record<Lane, ChordPreset | null> = { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null };
    (Object.entries(song.chordMap) as Array<[string, string]>).forEach(([laneStr, name]) => {
      const lane = Number(laneStr) as Lane;
      map[lane] = DEFAULT_CHORD_COLUMNS.find((p) => p?.name === name) ?? null;
    });
    return map;
  }, [song]);

  const notesById = useMemo(() => {
    const m = new Map<number, GameNote>();
    song.notes.forEach((n) => m.set(n.id, n));
    return m;
  }, [song]);

  const pushBurst = useCallback((lane: Lane, label: string, color: string) => {
    const id = burstIdRef.current++;
    setBursts((prev) => [...prev, { id, lane, label, color }]);
    window.setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 800);
  }, []);

  const flashMascotHit = useCallback((lane: Lane) => {
    setMascotActiveLane(lane);
    if (mascotActiveTimerRef.current) window.clearTimeout(mascotActiveTimerRef.current);
    mascotActiveTimerRef.current = window.setTimeout(() => setMascotActiveLane(null), 380);
  }, []);

  const flashMascotStrum = useCallback(() => {
    setMascotStrumming(true);
    if (mascotStrumTimerRef.current) window.clearTimeout(mascotStrumTimerRef.current);
    mascotStrumTimerRef.current = window.setTimeout(() => setMascotStrumming(false), 300);
  }, []);

  const flashMascotMiss = useCallback(() => {
    setMascotMissing(true);
    if (mascotMissTimerRef.current) window.clearTimeout(mascotMissTimerRef.current);
    mascotMissTimerRef.current = window.setTimeout(() => setMascotMissing(false), 420);
  }, []);

  const playChord = useCallback(
    (lane: Lane, velocity = 0.7) => {
      const preset = chordPresets[lane];
      if (!preset) return;
      const freqs = getChordFrequencies(preset);
      freqs.forEach((f, i) => {
        window.setTimeout(() => guitarSynth.pluck(f, 2, velocity), i * 16);
      });
    },
    [chordPresets]
  );

  const playSingle = useCallback(
    (lane: Lane, stringIdx: number, velocity = 0.55) => {
      const preset = chordPresets[lane];
      if (!preset) return;
      const freqs = getChordFrequencies(preset);
      guitarSynth.pluck(freqs[stringIdx] ?? freqs[0], 1.8, velocity);
    },
    [chordPresets]
  );

  const playMuteGhost = useCallback((key: string) => {
    const pos = getKeyPosition(key);
    if (!pos) return;
    const freqs = getChordFrequencies({ name: "open", label: "open", frets: [0, 0, 0, 0], color: "#888" });
    guitarSynth.pluckMuted(freqs[pos.row], 0.5);
  }, []);

  const consumeHold = useCallback(
    (note: GameNote, key: string, at: number) => {
      const delta = Math.abs(note.time - at);
      const kind = classify(delta);
      if (!kind) return;
      consumedRef.current.add(note.id);
      const multiplier = 1 + Math.min(combo, 50) * 0.01;
      setScore((s) => s + JUDGE_SCORES[kind] * multiplier);
      setCombo((c) => {
        const next = c + 1;
        setMaxCombo((m) => Math.max(m, next));
        return next;
      });
      setStats((s) => ({ ...s, [kind]: s[kind] + 1 }));
      pushBurst(note.lane, judgmentLabel(kind), judgmentColor(kind));
      const stringIdx = LANE_KEYS[note.lane].indexOf(key);
      playSingle(note.lane, stringIdx < 0 ? 0 : stringIdx, 0.6);
      holdingRef.current.set(key, { noteId: note.id, lane: note.lane });
      setActiveHolds((prev) => [...prev, { noteId: note.id, lane: note.lane, key }]);
      flashMascotHit(note.lane);
    },
    [combo, pushBurst, playSingle, flashMascotHit]
  );

  const consumeStrum = useCallback(
    (note: GameNote, firstAt: number) => {
      const delta = Math.abs(note.time - firstAt);
      const kind = classify(delta);
      if (!kind) return;
      consumedRef.current.add(note.id);
      const multiplier = 1 + Math.min(combo, 50) * 0.01;
      setScore((s) => s + JUDGE_SCORES[kind] * multiplier + STRUM_BONUS);
      setCombo((c) => {
        const next = c + 1;
        setMaxCombo((m) => Math.max(m, next));
        return next;
      });
      setStats((s) => ({ ...s, [kind]: s[kind] + 1 }));
      pushBurst(note.lane, `${judgmentLabel(kind)} · STRUM +${STRUM_BONUS}`, "#ff6b35");
      playChord(note.lane, 0.9);
      flashMascotHit(note.lane);
      flashMascotStrum();
    },
    [combo, pushBurst, playChord, flashMascotHit, flashMascotStrum]
  );

  const consumeMute = useCallback(
    (note: GameNote, at: number) => {
      const delta = Math.abs(note.time - at);
      const kind = classify(delta);
      if (!kind) return;
      consumedRef.current.add(note.id);
      const multiplier = 1 + Math.min(combo, 50) * 0.01;
      setScore((s) => s + JUDGE_SCORES[kind] * multiplier);
      setCombo((c) => {
        const next = c + 1;
        setMaxCombo((m) => Math.max(m, next));
        return next;
      });
      setStats((s) => ({ ...s, [kind]: s[kind] + 1 }));
      pushBurst(note.lane, `${judgmentLabel(kind)} · MUTE`, "#f59e0b");
      playMuteGhost(MUTE_KEYS[note.muteCol ?? 0]);
      flashMascotHit(note.lane);
    },
    [combo, pushBurst, playMuteGhost, flashMascotHit]
  );

  const handleLaneKey = useCallback(
    (lane: Lane, key: string) => {
      if (phase !== "playing") return;
      const t = performance.now() - startedAtRef.current;

      for (const [noteId, pending] of strumPendingRef.current) {
        const pNote = notesById.get(noteId);
        if (!pNote || pNote.lane !== lane) continue;
        if (key === pending.firstKey) continue;
        if (t - pending.firstAt > STRUM_MULTI_WINDOW_MS) continue;
        consumeStrum(pNote, pending.firstAt);
        strumPendingRef.current.delete(noteId);
        return;
      }

      const candidate = findCandidate(song.notes, lane, t, consumedRef.current, "strum");
      if (candidate) {
        strumPendingRef.current.set(candidate.note.id, { firstKey: key, firstAt: t });
        playChord(lane, 0.45);
        flashMascotHit(lane);
        return;
      }

      playChord(lane, 0.35);
    },
    [phase, song.notes, notesById, consumeStrum, playChord, flashMascotHit]
  );

  const handleKeyRelease = useCallback(
    (key: string) => {
      const holding = holdingRef.current.get(key);
      if (!holding) return;
      const note = notesById.get(holding.noteId);
      holdingRef.current.delete(key);
      setActiveHolds((prev) => prev.filter((h) => h.key !== key));
      if (!note || note.kind !== "hold") return;
      const released = performance.now() - startedAtRef.current;
      const evald = judgeHoldRelease(note, released);
      if (!evald) return;
      if (evald.success) {
        setScore((s) => s + HOLD_BONUS_PER_HOLD);
        pushBurst(holding.lane, `HOLD +${HOLD_BONUS_PER_HOLD}`, "#fbbf24");
      } else {
        pushBurst(holding.lane, "HOLD BREAK", "#f87171");
        setCombo(0);
      }
    },
    [notesById, pushBurst]
  );

  useEffect(() => {
    guitarSynth.setVolume(masterVolume);
  }, [masterVolume]);

  useEffect(() => {
    if (phase !== "playing" && phase !== "countdown") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (pressedRef.current.has(k)) return;
      pressedRef.current.add(k);
      setPressedKeys((prev) => new Set(prev).add(k));
      const laneEntry = (Object.entries(LANE_KEYS) as Array<[string, string[]]>).find(([, keys]) =>
        keys.includes(k)
      );
      if (laneEntry) {
        e.preventDefault();
        handleLaneKey(Number(laneEntry[0]) as Lane, k);
        return;
      }
      const muteIdx = (MUTE_KEYS as readonly string[]).indexOf(k);
      if (muteIdx >= 0 && phase === "playing") {
        e.preventDefault();
        const t = performance.now() - startedAtRef.current;
        let best: { note: GameNote; delta: number } | null = null;
        for (const n of song.notes) {
          if ((n.kind !== "mute" && n.kind !== "hold") || n.muteCol !== muteIdx) continue;
          if (consumedRef.current.has(n.id)) continue;
          const delta = Math.abs(n.time - t);
          if (delta > JUDGE_WINDOWS.miss) continue;
          if (!best || delta < best.delta) best = { note: n, delta };
        }
        if (best) {
          if (best.note.kind === "hold") {
            consumeHold(best.note, k, t);
          } else {
            consumeMute(best.note, t);
          }
        } else {
          playMuteGhost(k);
        }
        return;
      }
      const pos = getKeyPosition(k);
      if (pos) {
        e.preventDefault();
        playMuteGhost(k);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      pressedRef.current.delete(k);
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(k);
        return next;
      });
      handleKeyRelease(k);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [phase, song.notes, handleLaneKey, handleKeyRelease, playMuteGhost, consumeMute]);

  useEffect(() => {
    if (phase !== "playing" && phase !== "countdown") return;
    const tick = () => {
      const t = performance.now();
      const elapsed = t - startedAtRef.current;
      setNow(elapsed);

      if (phase === "playing") {
        for (const n of song.notes) {
          if (consumedRef.current.has(n.id) || missedRef.current.has(n.id)) continue;
          if (elapsed - n.time > JUDGE_WINDOWS.miss) {
            missedRef.current.add(n.id);
            setCombo(0);
            const label = n.kind === "strum" ? "STRUM FAIL" : n.kind === "mute" ? "MUTE MISS" : n.kind === "hold" ? "HOLD MISS" : "MISS";
            pushBurst(n.lane, label, judgmentColor("miss"));
            setStats((s) => ({ ...s, miss: s.miss + 1 }));
            strumPendingRef.current.delete(n.id);
            flashMascotMiss();
          }
        }

        for (const h of activeHolds) {
          const note = notesById.get(h.noteId);
          if (!note || note.kind !== "hold" || !note.holdMs) continue;
          const endAt = note.time + note.holdMs;
          if (elapsed > endAt + HOLD_RELEASE_WINDOW_MS && holdingRef.current.has(h.key)) {
            setScore((s) => s + HOLD_BONUS_PER_HOLD);
            pushBurst(h.lane, `HOLD +${HOLD_BONUS_PER_HOLD}`, "#fbbf24");
            holdingRef.current.delete(h.key);
            setActiveHolds((prev) => prev.filter((x) => x.key !== h.key));
          }
        }

        if (elapsed > song.durationMs) {
          setPhase("finished");
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase, song.notes, song.durationMs, pushBurst, activeHolds, notesById, flashMascotMiss]);

  useEffect(() => {
    if (phase !== "finished") return;
    const total = stats.perfect + stats.great + stats.good + stats.miss;
    if (total === 0) return;
    const run: RunStats = {
      songId: song.id,
      score: Math.floor(score),
      maxCombo,
      perfect: stats.perfect,
      great: stats.great,
      good: stats.good,
      miss: stats.miss,
      accuracy: accuracyOf(stats),
      completedAt: Date.now(),
    };
    submitRun(run);
  }, [phase, song.id, score, maxCombo, stats, submitRun]);

  const startGame = useCallback(async () => {
    await guitarSynth.ensureContext();
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setStats({ perfect: 0, great: 0, good: 0, miss: 0 });
    setBursts([]);
    setActiveHolds([]);
    consumedRef.current = new Set();
    missedRef.current = new Set();
    holdingRef.current = new Map();
    strumPendingRef.current = new Map();
    startedAtRef.current = performance.now() + COUNTDOWN_MS;
    setPhase("countdown");
    window.setTimeout(() => setPhase("playing"), COUNTDOWN_MS);
  }, []);

  const restartGame = useCallback(() => {
    setPhase("idle");
    window.setTimeout(() => startGame(), 50);
  }, [startGame]);

  if (phase === "idle") return <GameIntro song={song} onStart={startGame} />;
  if (phase === "finished") {
    return (
      <FinishedScreen
        song={song}
        score={Math.floor(score)}
        maxCombo={maxCombo}
        stats={stats}
        onRetry={restartGame}
      />
    );
  }

  const countdownLeft = phase === "countdown" ? Math.ceil(-now / 1000) : 0;
  const total = stats.perfect + stats.great + stats.good + stats.miss;
  const acc = total > 0 ? accuracyOf(stats) : 1;

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-5 text-neutral-100">
      <GameHud
        song={song}
        score={Math.floor(score)}
        combo={combo}
        maxCombo={maxCombo}
        accuracy={acc}
        elapsed={Math.max(0, now)}
        duration={song.durationMs}
      />

      <Playfield
        song={song}
        now={now}
        pressedKeys={pressedKeys}
        chordPresets={chordPresets}
        activeHolds={activeHolds}
        strumPending={strumPendingRef.current}
        consumed={consumedRef.current}
        missed={missedRef.current}
        bursts={bursts}
        strumming={mascotStrumming}
        missing={mascotMissing}
        lastHitLane={mascotActiveLane}
        onLaneTap={(lane, key) => handleLaneKey(lane, key)}
        onLaneRelease={(key) => handleKeyRelease(key)}
        onGhostTap={(key) => playMuteGhost(key)}
      />

      {phase === "countdown" && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            className="font-mono text-8xl font-black text-[#ff6b35]"
            style={{ textShadow: "0 0 40px #ff6b35" }}
          >
            {countdownLeft}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
        <span>
          <span className="text-neutral-300">Lane keys</span> at glow peak · keep down for holds · tap 2+ for strum · free keys palm-mute
        </span>
        <Link
          href="/play"
          className="rounded-full border border-white/10 px-3 py-1 text-neutral-400 hover:border-white/20 hover:text-white"
        >
          ← Back to songs
        </Link>
      </div>
    </div>
  );
}

function Playfield({
  song,
  now,
  pressedKeys,
  chordPresets,
  activeHolds,
  strumPending,
  consumed,
  missed,
  bursts,
  strumming,
  missing,
  lastHitLane,
  onLaneTap,
  onLaneRelease,
  onGhostTap,
}: {
  song: Song;
  now: number;
  pressedKeys: Set<string>;
  chordPresets: Record<Lane, ChordPreset | null>;
  activeHolds: ActiveHold[];
  strumPending: Map<number, { firstKey: string; firstAt: number }>;
  consumed: Set<number>;
  missed: Set<number>;
  bursts: Burst[];
  strumming: boolean;
  missing: boolean;
  lastHitLane: Lane | null;
  onLaneTap: (lane: Lane, key: string) => void;
  onLaneRelease: (key: string) => void;
  onGhostTap: (key: string) => void;
}) {
  const laneBurst = (lane: Lane) => bursts.filter((b) => b.lane === lane).slice(-1)[0];

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black/50 p-4 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.9)]">
      <PreviewStrip song={song} now={now} consumed={consumed} missed={missed} />

      <div className="mt-3 flex flex-col items-center gap-3">
        <GameStage
          song={song}
          now={now}
          pressedKeys={pressedKeys}
          chordPresets={chordPresets}
          activeHolds={activeHolds}
          strumPending={strumPending}
          consumed={consumed}
          missed={missed}
          strumming={strumming}
          missing={missing}
          lastHitLane={lastHitLane}
          onLaneTap={onLaneTap}
          onLaneRelease={onLaneRelease}
          onGhostTap={onGhostTap}
        />

        <div className="grid w-full max-w-[760px] grid-cols-6 gap-1.5">
          {ALL_LANES.map((lane) => {
            const burst = laneBurst(lane);
            return (
              <div key={lane} className="flex h-7 items-center justify-center">
                {burst && (
                  <span
                    className="rounded-md px-2 py-0.5 font-mono text-[11px] font-black tracking-wider"
                    style={{
                      background: `${burst.color}22`,
                      color: burst.color,
                      border: `1px solid ${burst.color}55`,
                      animation: "kg-burst 700ms ease-out forwards",
                    }}
                  >
                    {burst.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-1 md:hidden">
          <GhostKeyboard pressedKeys={pressedKeys} onGhostTap={onGhostTap} />
        </div>

        <div className="flex w-full max-w-[900px] items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.01] px-4 py-2 text-[11px] text-neutral-500">
          <span>
            <span className="text-neutral-300">Lane keys (1·q·a·z · 2·w·s·x · 3·e·d·c · 4·r·f·v · 5·t·g·b · 6·y·h·n)</span> play chords. <span className="text-neutral-300">Mute keys (J·K·L·;)</span> dampen strings.
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">45 keys · full qwerty</span>
        </div>
      </div>
    </div>
  );
}

function GhostKeyboard({
  pressedKeys,
  onGhostTap,
}: {
  pressedKeys: Set<string>;
  onGhostTap: (key: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      {KEYBOARD_ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-1" style={{ paddingLeft: rowIdx * 8 }}>
          {row.slice(6).map((key) => {
            const isPressed = pressedKeys.has(key);
            return (
              <button
                type="button"
                key={key}
                onPointerDown={(e) => {
                  e.preventDefault();
                  onGhostTap(key);
                }}
                className="flex size-7 items-center justify-center rounded font-mono text-[10px] font-semibold transition-all"
                style={{
                  background: isPressed ? "#44403c" : "#14141a",
                  borderStyle: "dashed",
                  borderWidth: 1,
                  borderColor: isPressed ? "#78716c" : "#2b2d36",
                  color: isPressed ? "#e7e5e4" : "#5a5d66",
                  transform: isPressed ? "translateY(1px) scale(0.95)" : "translateY(0)",
                }}
              >
                {key.toUpperCase()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function PreviewStrip({
  song,
  now,
  consumed,
  missed,
}: {
  song: Song;
  now: number;
  consumed: Set<number>;
  missed: Set<number>;
}) {
  const upcoming = useMemo(() => {
    return song.notes
      .filter((n) => {
        if (consumed.has(n.id) || missed.has(n.id)) return false;
        const dt = n.time - now;
        return dt > -150 && dt < 6000;
      })
      .slice(0, 6);
  }, [song.notes, now, consumed, missed]);

  return (
    <div className="flex items-center gap-2 overflow-x-auto rounded-lg bg-white/[0.02] px-3 py-2 text-xs">
      <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Next</span>
      {upcoming.length === 0 ? (
        <span className="text-neutral-600">—</span>
      ) : (
        upcoming.map((n, idx) => {
          const isMute = n.kind === "mute";
          const chord = isMute ? MUTE_KEYS[n.muteCol ?? 0].toUpperCase() : song.chordMap[n.lane];
          const color = isMute ? "#f59e0b" : LANE_COLORS[n.lane];
          const dt = n.time - now;
          const isNow = dt < JUDGE_WINDOWS.good;
          const icon = n.kind === "hold" ? "⟜" : n.kind === "strum" ? "⇅" : isMute ? "✋" : "•";
          return (
            <div
              key={n.id}
              className="flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[11px] font-bold"
              style={{
                borderColor: isNow ? color : `${color}33`,
                background: isNow ? `${color}22` : `${color}08`,
                color,
                opacity: idx === 0 ? 1 : 0.6 - idx * 0.08,
                boxShadow: isNow ? `0 0 12px ${color}` : "none",
              }}
            >
              <span className="opacity-70">{icon}</span>
              <span>{chord}</span>
              <span className="opacity-50 text-[9px]">{Math.max(0, Math.round(dt))}ms</span>
            </div>
          );
        })
      )}
    </div>
  );
}

function GameHud({
  song,
  score,
  combo,
  maxCombo,
  accuracy,
  elapsed,
  duration,
}: {
  song: Song;
  score: number;
  combo: number;
  maxCombo: number;
  accuracy: number;
  elapsed: number;
  duration: number;
}) {
  const progress = Math.max(0, Math.min(1, elapsed / duration));
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">Now playing</div>
          <div className="text-xl font-semibold">{song.title}</div>
          <div className="text-[11px] text-neutral-500">{song.credit}</div>
        </div>
        <div className="grid grid-cols-4 gap-3 font-mono text-sm">
          <Stat label="Score" value={score.toLocaleString()} />
          <Stat label="Combo" value={`${combo}×`} accent={combo >= 10} />
          <Stat label="Max" value={`${maxCombo}×`} />
          <Stat label="Acc" value={`${Math.round(accuracy * 100)}%`} />
        </div>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
        <div className="h-full bg-[#ff6b35] transition-[width] duration-75" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex min-w-[72px] flex-col items-end">
      <span className="text-[10px] uppercase tracking-widest text-neutral-500">{label}</span>
      <span className={`text-lg font-bold ${accent ? "text-[#ff6b35]" : "text-neutral-100"}`}>{value}</span>
    </div>
  );
}

function GameIntro({ song, onStart }: { song: Song; onStart: () => void }) {
  return (
    <div className="flex max-w-md flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-10 text-center text-neutral-200">
      <div>
        <div className="mb-1 text-xs font-mono uppercase tracking-widest text-[#ff6b35]">Ready up</div>
        <h1 className="text-3xl font-semibold tracking-tight">{song.title}</h1>
        <p className="mt-2 text-sm text-neutral-400">{song.subtitle}</p>
        <p className="mt-1 text-[11px] text-neutral-600">{song.credit}</p>
      </div>
      <div className="grid grid-cols-6 gap-2 font-mono text-xs">
        {ALL_LANES.map((lane) => {
          const color = LANE_COLORS[lane];
          return (
            <div key={lane} className="flex flex-col gap-1 rounded-lg border px-2 py-2" style={{ borderColor: `${color}44`, background: `${color}10`, color }}>
              <span className="text-sm font-bold">{song.chordMap[lane]}</span>
              <span className="text-[10px] opacity-70">{LANE_KEYS[lane][1].toUpperCase()}</span>
            </div>
          );
        })}
      </div>
      <div className="w-full space-y-2 rounded-lg border border-white/5 bg-white/[0.01] p-3 text-left text-[11px] text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-5 items-center justify-center rounded bg-white/10 font-mono text-[10px] text-white">T</span>
          <span><b className="text-neutral-200">Tap:</b> key glows → press any one lane key at peak glow.</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex size-5 items-center justify-center rounded bg-[#fbbf24]/20 font-mono text-[10px] text-[#fbbf24]">H</span>
          <span><b className="text-neutral-200">Hold:</b> HOLD tag above key → press and keep pressing.</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex size-5 items-center justify-center rounded bg-[#ff6b35]/20 font-mono text-[10px] text-[#ff6b35]">⇅</span>
          <span><b className="text-neutral-200">Strum:</b> ⇅ tag → must hit 2+ different keys in the column (single tap = fail).</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex size-5 items-center justify-center rounded bg-[#f59e0b]/20 font-mono text-[10px] text-[#f59e0b]">✋</span>
          <span><b className="text-neutral-200">Mute (J·K·L·;):</b> palm-mute notes — press the highlighted right-hand key to dampen the string.</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="w-full rounded-full bg-[#ff6b35] py-3 text-sm font-bold text-black transition hover:bg-[#ff8555]"
      >
        Start · 3s countdown
      </button>
      <Link href="/play" className="text-xs text-neutral-500 hover:text-neutral-300">
        ← Pick another song
      </Link>
    </div>
  );
}

function FinishedScreen({
  song,
  score,
  maxCombo,
  stats,
  onRetry,
}: {
  song: Song;
  score: number;
  maxCombo: number;
  stats: { perfect: number; great: number; good: number; miss: number };
  onRetry: () => void;
}) {
  const acc = accuracyOf(stats);
  const rank = rankFor(acc);
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const payload = btoa(
      JSON.stringify({ s: song.id, sc: score, mc: maxCombo, p: stats.perfect, g: stats.great, o: stats.good, m: stats.miss })
    );
    return `${window.location.origin}/share?code=${encodeURIComponent(payload)}`;
  }, [song.id, score, maxCombo, stats]);
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // noop
    }
  }, [shareUrl]);
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-10 text-center text-neutral-200">
      <div>
        <div className="mb-2 text-xs font-mono uppercase tracking-widest text-[#ff6b35]">Finished</div>
        <div className="text-6xl font-black" style={{ color: rank.color }}>{rank.label}</div>
        <div className="mt-1 text-xs text-neutral-500">{song.title}</div>
      </div>
      <div className="grid w-full grid-cols-2 gap-3 font-mono text-sm">
        <Stat label="Score" value={score.toLocaleString()} />
        <Stat label="Accuracy" value={`${Math.round(acc * 100)}%`} accent={acc > 0.9} />
        <Stat label="Max combo" value={`${maxCombo}×`} />
        <Stat label="Total hits" value={`${stats.perfect + stats.great + stats.good}`} />
      </div>
      <div className="grid w-full grid-cols-4 gap-2 text-[10px] font-mono uppercase tracking-wider">
        <Pill label="Perfect" value={stats.perfect} color="#fbbf24" />
        <Pill label="Great" value={stats.great} color="#34d399" />
        <Pill label="Good" value={stats.good} color="#60a5fa" />
        <Pill label="Miss" value={stats.miss} color="#f87171" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <button
          type="button"
          onClick={onRetry}
          className="w-full rounded-full bg-[#ff6b35] py-3 text-sm font-bold text-black transition hover:bg-[#ff8555]"
        >
          Retry
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 text-xs font-semibold text-neutral-300 transition hover:border-white/20 hover:text-white"
        >
          {copied ? "Link copied ✓" : "Share score link"}
        </button>
        <Link href="/play" className="text-xs text-neutral-500 hover:text-neutral-300">
          ← Back to songs
        </Link>
      </div>
    </div>
  );
}

function Pill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col items-center rounded-md border px-1 py-2" style={{ borderColor: `${color}33`, background: `${color}10`, color }}>
      <span className="text-sm font-bold">{value}</span>
      <span className="opacity-70">{label}</span>
    </div>
  );
}

function rankFor(acc: number): { label: string; color: string } {
  if (acc >= 0.95) return { label: "SS", color: "#fbbf24" };
  if (acc >= 0.88) return { label: "S", color: "#f43f5e" };
  if (acc >= 0.78) return { label: "A", color: "#34d399" };
  if (acc >= 0.6) return { label: "B", color: "#60a5fa" };
  if (acc >= 0.4) return { label: "C", color: "#a78bfa" };
  return { label: "D", color: "#94a3b8" };
}
