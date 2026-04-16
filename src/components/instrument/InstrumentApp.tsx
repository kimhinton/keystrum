"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { guitarSynth } from "@keystrum/synth";
import KeyboardGuitar from "@/components/keyboard-guitar/KeyboardGuitar";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Recording {
  id: string;
  name: string;
  blob: Blob;
  url: string;
  durationMs: number;
  createdAt: number;
}

type RecPhase = "idle" | "recording" | "done";

/* ------------------------------------------------------------------ */
/*  InstrumentApp                                                      */
/* ------------------------------------------------------------------ */

const CHORDS = [
  { name: "Am", keys: "1qaz", color: "#f43f5e" },
  { name: "C", keys: "2wsx", color: "#f97316" },
  { name: "Em", keys: "3edc", color: "#eab308" },
  { name: "G", keys: "4rfv", color: "#22c55e" },
  { name: "Dm", keys: "5tgb", color: "#3b82f6" },
  { name: "F", keys: "6yhn", color: "#a855f7" },
];

export default function InstrumentApp() {
  // Volume
  const [volume, setVolume] = useState(0.5);

  // Metronome
  const [bpm, setBpm] = useState(120);
  const [metroOn, setMetroOn] = useState(false);
  const [metroBeat, setMetroBeat] = useState(0);
  const metroRef = useRef<number | null>(null);
  const tapTimesRef = useRef<number[]>([]);

  // Recording
  const [recPhase, setRecPhase] = useState<RecPhase>("idle");
  const [recElapsed, setRecElapsed] = useState(0);
  const recTimerRef = useRef<number | null>(null);
  const recStartRef = useRef(0);

  // Recordings list
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Activity indicator
  const [active, setActive] = useState(false);

  // Guide toggle
  const [showGuide, setShowGuide] = useState(false);

  // Standalone (app) mode detection
  const [isApp, setIsApp] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(display-mode: standalone)");
    setIsApp(mq.matches || (navigator as unknown as { standalone?: boolean }).standalone === true);
    const onChange = (e: MediaQueryListEvent) => setIsApp(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* ---- Volume ---- */
  const handleVolume = useCallback((v: number) => {
    setVolume(v);
    guitarSynth.setVolume(v);
  }, []);

  /* ---- Metronome ---- */
  useEffect(() => {
    if (!metroOn) {
      if (metroRef.current) window.clearInterval(metroRef.current);
      metroRef.current = null;
      return;
    }
    const interval = 60000 / bpm;
    let beat = 0;
    const tick = () => {
      guitarSynth.playClick(beat % 4 === 0);
      setMetroBeat(beat % 4);
      beat++;
    };
    tick();
    metroRef.current = window.setInterval(tick, interval);
    return () => {
      if (metroRef.current) window.clearInterval(metroRef.current);
    };
  }, [metroOn, bpm]);

  const tapTempo = useCallback(() => {
    const now = Date.now();
    const times = tapTimesRef.current;
    times.push(now);
    if (times.length > 5) times.shift();
    if (times.length >= 2) {
      const intervals = [];
      for (let i = 1; i < times.length; i++) intervals.push(times[i] - times[i - 1]);
      const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      if (avg > 0) setBpm(Math.round(Math.min(300, Math.max(40, 60000 / avg))));
    }
  }, []);

  /* ---- Recording ---- */
  const startRec = useCallback(async () => {
    await guitarSynth.startRecording();
    recStartRef.current = Date.now();
    setRecElapsed(0);
    setRecPhase("recording");
    recTimerRef.current = window.setInterval(() => {
      setRecElapsed(Date.now() - recStartRef.current);
    }, 100);
  }, []);

  const stopRec = useCallback(async () => {
    if (recTimerRef.current) window.clearInterval(recTimerRef.current);
    const blob = await guitarSynth.stopRecording();
    if (blob.size > 0) {
      const id = crypto.randomUUID();
      const url = URL.createObjectURL(blob);
      const dur = Date.now() - recStartRef.current;
      const idx = recordings.length + 1;
      setRecordings((prev) => [
        { id, name: `Recording ${idx}`, blob, url, durationMs: dur, createdAt: Date.now() },
        ...prev,
      ]);
    }
    setRecPhase("idle");
    setRecElapsed(0);
  }, [recordings.length]);

  /* ---- Playback ---- */
  const playRecording = useCallback(
    (rec: Recording) => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (playingId === rec.id) {
        setPlayingId(null);
        return;
      }
      const audio = new Audio(rec.url);
      audio.onended = () => setPlayingId(null);
      audio.play();
      audioRef.current = audio;
      setPlayingId(rec.id);
    },
    [playingId]
  );

  const downloadRecording = useCallback((rec: Recording) => {
    const a = document.createElement("a");
    a.href = rec.url;
    const ts = new Date(rec.createdAt).toISOString().slice(0, 19).replace(/[:T]/g, "-");
    a.download = `keystrum-${ts}.webm`;
    a.click();
  }, []);

  const shareRecording = useCallback(async (rec: Recording) => {
    const ts = new Date(rec.createdAt).toISOString().slice(0, 19).replace(/[:T]/g, "-");
    const file = new File([rec.blob], `keystrum-${ts}.webm`, { type: rec.blob.type });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "keystrum recording" });
    }
  }, []);

  const deleteRecording = useCallback(
    (id: string) => {
      if (playingId === id && audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setPlayingId(null);
      }
      setRecordings((prev) => {
        const rec = prev.find((r) => r.id === id);
        if (rec) URL.revokeObjectURL(rec.url);
        return prev.filter((r) => r.id !== id);
      });
    },
    [playingId]
  );

  /* ---- Cleanup ---- */
  useEffect(() => {
    return () => {
      if (recTimerRef.current) window.clearInterval(recTimerRef.current);
      if (metroRef.current) window.clearInterval(metroRef.current);
      if (audioRef.current) audioRef.current.pause();
      recordings.forEach((r) => URL.revokeObjectURL(r.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mm = String(Math.floor(recElapsed / 60000)).padStart(2, "0");
  const ss = String(Math.floor((recElapsed % 60000) / 1000)).padStart(2, "0");

  return (
    <div className="flex min-h-dvh flex-col bg-[#0b0b0f] text-neutral-100">
      {/* ---- Header ---- */}
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <a href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="inline-flex size-5 items-center justify-center rounded-md bg-[#ff6b35] text-[10px] font-black text-black">
            K
          </span>
          keystrum
        </a>
        <div className="flex items-center gap-3">
          {!isApp && (
            <a
              href="/"
              className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 transition hover:text-neutral-300"
            >
              Back to site
            </a>
          )}
          <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            {active && <span className="inline-block size-1.5 rounded-full bg-green-400" />}
            {active ? "playing" : "ready"}
          </div>
        </div>
      </header>

      {/* ---- Chord Strip ---- */}
      <div className="border-b border-white/5 bg-white/[0.02]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-2">
          <div className="flex items-center gap-1.5">
            {CHORDS.map((c) => (
              <div
                key={c.name}
                className="flex flex-col items-center rounded-md border px-2 py-1 sm:px-3"
                style={{ borderColor: `${c.color}44`, background: `${c.color}10` }}
              >
                <span className="text-xs font-bold sm:text-sm" style={{ color: c.color }}>
                  {c.name}
                </span>
                <span className="font-mono text-[8px] text-neutral-500 sm:text-[9px]">{c.keys}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowGuide((p) => !p)}
            className="rounded border border-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 transition hover:border-white/20 hover:text-white"
          >
            {showGuide ? "Hide" : "Guide"}
          </button>
        </div>
      </div>

      {/* ---- Key Guide (collapsible) ---- */}
      {showGuide && (
        <div className="border-b border-white/5 bg-[#0d0d12]">
          <div className="mx-auto max-w-4xl px-4 py-3">
            <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <div className="mb-1 font-semibold text-[#ff6b35]">Strum</div>
                <div className="text-neutral-400">
                  Sweep a column top→bottom fast (under 90ms). e.g. <span className="font-mono text-white">1</span>→<span className="font-mono text-white">q</span>→<span className="font-mono text-white">a</span>→<span className="font-mono text-white">z</span> for Am
                </div>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <div className="mb-1 font-semibold text-neutral-200">Pick</div>
                <div className="text-neutral-400">
                  Tap a single key for one note. Each row = a different string pitch (top = highest).
                </div>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <div className="mb-1 font-semibold text-neutral-200">Mute</div>
                <div className="text-neutral-400">
                  Keys past column 6 (<span className="font-mono text-white">7-=</span>, <span className="font-mono text-white">u-]</span>, etc.) play palm-muted ghost notes.
                </div>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <div className="mb-1 font-semibold text-neutral-200">Rows</div>
                <div className="text-neutral-400">
                  <span className="font-mono text-white">1-6</span> = E4 &middot; <span className="font-mono text-white">q-y</span> = B3 &middot; <span className="font-mono text-white">a-h</span> = G3 &middot; <span className="font-mono text-white">z-n</span> = D3
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- Keyboard ---- */}
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 shadow-[0_20px_80px_-30px_rgba(255,107,53,0.35)]">
            <KeyboardGuitar theme="dark" onActivityChange={setActive} />
          </div>
        </div>
      </main>

      {/* ---- Control Bar ---- */}
      <div className="border-t border-white/5 bg-white/[0.02]">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          {/* Volume */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">VOL</span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(volume * 100)}
              onChange={(e) => handleVolume(Number(e.target.value) / 100)}
              className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/10 accent-[#ff6b35] sm:w-28"
            />
            <span className="w-7 text-right font-mono text-[10px] text-neutral-400">
              {Math.round(volume * 100)}
            </span>
          </div>

          {/* Metronome */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMetroOn((p) => !p)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                metroOn
                  ? "bg-[#ff6b35] text-black"
                  : "border border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/20"
              }`}
            >
              <span className="font-mono">BPM</span>
            </button>
            <button
              type="button"
              onClick={() => setBpm((b) => Math.max(40, b - 5))}
              className="flex size-6 items-center justify-center rounded border border-white/10 text-xs text-neutral-400 hover:border-white/20 hover:text-white"
            >
              -
            </button>
            <span className="w-8 text-center font-mono text-sm font-bold">{bpm}</span>
            <button
              type="button"
              onClick={() => setBpm((b) => Math.min(300, b + 5))}
              className="flex size-6 items-center justify-center rounded border border-white/10 text-xs text-neutral-400 hover:border-white/20 hover:text-white"
            >
              +
            </button>
            <button
              type="button"
              onClick={tapTempo}
              className="rounded border border-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 transition hover:border-white/20 hover:text-white"
            >
              Tap
            </button>
            {metroOn && (
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="inline-block size-2 rounded-full transition-colors"
                    style={{
                      background: metroBeat === i ? (i === 0 ? "#ff6b35" : "#fbbf24") : "#333",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Record */}
          <div className="flex items-center gap-2">
            {recPhase === "idle" && (
              <button
                type="button"
                onClick={startRec}
                className="flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-red-500"
              >
                <span className="inline-block size-2 rounded-full bg-white" />
                REC
              </button>
            )}
            {recPhase === "recording" && (
              <>
                <span className="inline-block size-2 animate-pulse rounded-full bg-red-500" />
                <span className="font-mono text-sm text-red-400">
                  {mm}:{ss}
                </span>
                <button
                  type="button"
                  onClick={stopRec}
                  className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-white/10"
                >
                  <span className="inline-block size-2 rounded-sm bg-neutral-200" />
                  Stop
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ---- Recordings List ---- */}
      {recordings.length > 0 && (
        <div className="border-t border-white/5">
          <div className="mx-auto max-w-4xl px-4 py-3">
            <div className="mb-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
              Recordings ({recordings.length})
            </div>
            <div className="space-y-1.5">
              {recordings.map((rec) => {
                const durMM = String(Math.floor(rec.durationMs / 60000)).padStart(2, "0");
                const durSS = String(Math.floor((rec.durationMs % 60000) / 1000)).padStart(2, "0");
                const isPlaying = playingId === rec.id;
                return (
                  <div
                    key={rec.id}
                    className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
                  >
                    {/* Play/Pause */}
                    <button
                      type="button"
                      onClick={() => playRecording(rec)}
                      className={`flex size-7 items-center justify-center rounded-full transition ${
                        isPlaying
                          ? "bg-[#ff6b35] text-black"
                          : "border border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {isPlaying ? (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                          <rect x="1" y="1" width="3" height="8" rx="0.5" />
                          <rect x="6" y="1" width="3" height="8" rx="0.5" />
                        </svg>
                      ) : (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                          <polygon points="2,1 9,5 2,9" />
                        </svg>
                      )}
                    </button>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-xs font-medium">{rec.name}</div>
                      <div className="text-[10px] text-neutral-500">
                        {durMM}:{durSS} &middot;{" "}
                        {new Date(rec.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => downloadRecording(rec)}
                        className="rounded p-1.5 text-neutral-400 transition hover:bg-white/5 hover:text-white"
                        title="Download"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M7 2v7m0 0L4.5 6.5M7 9l2.5-2.5M2 11h10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {"canShare" in navigator && (
                        <button
                          type="button"
                          onClick={() => shareRecording(rec)}
                          className="rounded p-1.5 text-neutral-400 transition hover:bg-white/5 hover:text-white"
                          title="Share"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="10.5" cy="3" r="1.5" />
                            <circle cx="3.5" cy="7" r="1.5" />
                            <circle cx="10.5" cy="11" r="1.5" />
                            <path d="M5 6l4-2M5 8l4 2" />
                          </svg>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteRecording(rec.id)}
                        className="rounded p-1.5 text-neutral-500 transition hover:bg-red-500/10 hover:text-red-400"
                        title="Delete"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 4h8l-.7 7.3a1 1 0 01-1 .7H4.7a1 1 0 01-1-.7L3 4zM5.5 6.5v3M8.5 6.5v3M5 2h4M2 4h10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
