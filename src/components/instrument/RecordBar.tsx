"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { guitarSynth } from "@keystrum/synth";

type Phase = "idle" | "recording" | "done" | "unsupported";

const MAX_DURATION_MS = 30_000;
const MIME_PREFERENCES = ["audio/mp4", "audio/webm;codecs=opus", "audio/webm"];

function extFor(mimeType: string): string {
  if (mimeType.startsWith("audio/mp4")) return "m4a";
  return "webm";
}

export default function RecordBar() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [blob, setBlob] = useState<Blob | null>(null);
  const timerRef = useRef<number | null>(null);
  const hardStopRef = useRef<number | null>(null);
  const startRef = useRef(0);

  const clearTimers = useCallback(() => {
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
    if (hardStopRef.current) { window.clearTimeout(hardStopRef.current); hardStopRef.current = null; }
  }, []);

  const stop = useCallback(async () => {
    clearTimers();
    const recorded = await guitarSynth.stopRecording();
    setBlob(recorded);
    setPhase("done");
  }, [clearTimers]);

  const start = useCallback(async () => {
    const started = await guitarSynth.startRecording(MIME_PREFERENCES);
    if (!started) {
      setPhase("unsupported");
      return;
    }
    startRef.current = Date.now();
    setElapsed(0);
    setPhase("recording");
    timerRef.current = window.setInterval(() => {
      setElapsed(Date.now() - startRef.current);
    }, 100);
    hardStopRef.current = window.setTimeout(() => { void stop(); }, MAX_DURATION_MS);
  }, [stop]);

  const download = useCallback(() => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    a.download = `keystrum-${ts}.${extFor(blob.type)}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [blob]);

  const share = useCallback(async () => {
    if (!blob || !navigator.canShare) return;
    const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    const file = new File([blob], `keystrum-${ts}.${extFor(blob.type)}`, { type: blob.type });
    if (navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: "keystrum recording" });
    }
  }, [blob]);

  const reset = useCallback(() => {
    setBlob(null);
    setElapsed(0);
    setPhase("idle");
  }, []);

  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  useEffect(() => {
    const onUnload = () => { guitarSynth.dispose(); };
    window.addEventListener("pagehide", onUnload);
    return () => window.removeEventListener("pagehide", onUnload);
  }, []);

  const mm = String(Math.floor(elapsed / 60000)).padStart(2, "0");
  const ss = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, "0");
  const remaining = Math.max(0, Math.ceil((MAX_DURATION_MS - elapsed) / 1000));

  return (
    <div className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
      {phase === "idle" && (
        <button
          type="button"
          onClick={start}
          className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-red-500"
        >
          <span className="inline-block size-2 rounded-full bg-white" />
          REC
        </button>
      )}

      {phase === "recording" && (
        <>
          <span className="inline-block size-2.5 animate-pulse rounded-full bg-red-500" />
          <span className="font-mono text-sm text-red-400">
            {mm}:{ss}
          </span>
          <span className="font-mono text-[10px] text-neutral-400">{remaining}s left</span>
          <button
            type="button"
            onClick={stop}
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.05] px-4 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-white/10"
          >
            <span className="inline-block size-2 rounded-sm bg-neutral-200" />
            Stop
          </button>
        </>
      )}

      {phase === "done" && (
        <>
          <span className="font-mono text-xs text-neutral-400">{mm}:{ss}</span>
          <button
            type="button"
            onClick={download}
            className="rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-black transition hover:bg-brand-hover"
          >
            Download
          </button>
          {typeof navigator !== "undefined" && "canShare" in navigator && (
            <button
              type="button"
              onClick={share}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-neutral-300 transition hover:border-white/20 hover:text-white"
            >
              Share
            </button>
          )}
          <button
            type="button"
            onClick={reset}
            className="text-xs text-neutral-400 transition hover:text-neutral-300"
          >
            Clear
          </button>
        </>
      )}

      {phase === "unsupported" && (
        <span className="font-mono text-[11px] text-neutral-400">
          Recording unavailable on this browser
        </span>
      )}
    </div>
  );
}
