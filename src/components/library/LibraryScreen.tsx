"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  listRecordings,
  loadRecordingBlob,
  deleteRecording,
  exportToDocuments,
  type LibraryEntry,
} from "@/lib/recordings";
import { isNative } from "@/lib/platform";
import { hapticPick } from "@/lib/haptics";
import { Logo } from "@/components/brand/Logo";

export default function LibraryScreen() {
  const [entries, setEntries] = useState<LibraryEntry[] | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [exportedPath, setExportedPath] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);

  const refresh = useCallback(async () => {
    if (!isNative()) { setEntries([]); return; }
    const list = await listRecordings();
    setEntries(list);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();
  }, [refresh]);

  useEffect(() => {
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = null; }
    };
  }, []);

  const handlePlay = useCallback(async (entry: LibraryEntry) => {
    void hapticPick();
    if (playingId === entry.id) {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = null; }
      setPlayingId(null);
      return;
    }
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = null; }
    const blob = await loadRecordingBlob(entry);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    urlRef.current = url;
    const audio = new Audio(url);
    audio.onended = () => {
      setPlayingId(null);
      URL.revokeObjectURL(url);
      urlRef.current = null;
    };
    audioRef.current = audio;
    setPlayingId(entry.id);
    void audio.play();
  }, [playingId]);

  const handleExport = useCallback(async (entry: LibraryEntry) => {
    void hapticPick();
    const uri = await exportToDocuments(entry);
    if (uri) {
      setExportedPath(uri);
      window.setTimeout(() => setExportedPath(null), 2500);
    }
  }, []);

  const handleDelete = useCallback(async (entry: LibraryEntry) => {
    if (playingId === entry.id && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setPlayingId(null);
    }
    await deleteRecording(entry);
    await refresh();
  }, [playingId, refresh]);

  return (
    <div className="min-h-dvh bg-[#0E0E12] text-neutral-100" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <header className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Logo size={20} className="shrink-0" />
          Library
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          {entries ? `${entries.length} clip${entries.length === 1 ? "" : "s"}` : "…"}
        </span>
      </header>

      <main className="mx-auto max-w-md px-4 py-4" style={{ paddingBottom: "calc(62px + env(safe-area-inset-bottom))" }}>
        {entries === null && (
          <p className="py-10 text-center text-sm text-neutral-400">Loading…</p>
        )}

        {entries && entries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.02]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-brand">
                <circle cx="12" cy="12" r="4" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <h2 className="mb-1 text-lg font-semibold">No recordings yet</h2>
            <p className="mb-6 max-w-[14rem] text-sm text-neutral-400">
              Hit REC on the instrument. Clips auto-save here and survive app restarts.
            </p>
            <Link href="/instrument" onClick={() => { void hapticPick(); }} className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black">
              Go to instrument →
            </Link>
          </div>
        )}

        {entries && entries.length > 0 && (
          <ul className="space-y-1.5">
            {entries.map((entry) => {
              const isPlaying = playingId === entry.id;
              const mm = String(Math.floor(entry.durationMs / 60000)).padStart(2, "0");
              const ss = String(Math.floor((entry.durationMs % 60000) / 1000)).padStart(2, "0");
              const when = new Date(entry.createdAt);
              return (
                <li key={entry.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => void handlePlay(entry)}
                    className={`flex size-9 items-center justify-center rounded-full transition ${
                      isPlaying ? "bg-brand text-black" : "border border-white/10 text-neutral-300"
                    }`}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg width="12" height="12" viewBox="0 0 10 10" fill="currentColor"><rect x="1" y="1" width="3" height="8" rx="0.5" /><rect x="6" y="1" width="3" height="8" rx="0.5" /></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 10 10" fill="currentColor"><polygon points="2,1 9,5 2,9" /></svg>
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{entry.name}</div>
                    <div className="font-mono text-[10px] text-neutral-400">
                      {mm}:{ss} · {when.toLocaleDateString()} {when.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => void handleExport(entry)}
                    className="rounded-lg p-2 text-neutral-400 transition hover:bg-white/5 hover:text-white"
                    aria-label="Export to Files"
                    title="Export to Files"
                  >
                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 2v7M4.5 6.5L7 9l2.5-2.5M2 11h10" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(entry)}
                    className="rounded-lg p-2 text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400"
                    aria-label="Delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 4h8l-.7 7.3a1 1 0 01-1 .7H4.7a1 1 0 01-1-.7L3 4zM5.5 6.5v3M8.5 6.5v3M5 2h4M2 4h10" />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {exportedPath && (
          <div className="fixed inset-x-0 top-20 z-50 mx-auto w-fit max-w-[90%] rounded-full border border-brand/40 bg-brand/15 px-4 py-2 text-center text-xs font-mono text-brand shadow-lg">
            Exported to device Files
          </div>
        )}
      </main>
    </div>
  );
}
