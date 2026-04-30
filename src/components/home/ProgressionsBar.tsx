"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  POPULAR_PROGRESSIONS,
  decodeProgression,
  encodeProgression,
  type ChordName,
} from "@/lib/share/progression";
import { useStatsStore } from "@/lib/stats/store";

function ProgressionsContent() {
  const searchParams = useSearchParams();
  const selected = decodeProgression(searchParams.get("prog"));
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const recordedKey = useRef<string | null>(null);

  useEffect(() => {
    if (selected.length === 0) return;
    const key = encodeProgression(selected);
    if (recordedKey.current === key) return;
    recordedKey.current = key;
    useStatsStore.getState().recordSharedReceived();
  }, [selected]);

  const handleSave = () => {
    if (selected.length === 0) return;
    useStatsStore.getState().saveProgression(selected);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };

  const share = async (chords: readonly ChordName[]) => {
    const url = `${window.location.origin}/?prog=${encodeProgression(chords)}#instrument`;
    const text = `Try this guitar chord progression: ${chords.join(" → ")}`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "keystrum", text, url });
        return;
      } catch {
        /* user cancelled — fall through to clipboard */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-10">
      {selected.length > 0 && (
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-brand/30 bg-brand/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-widest text-brand">
              Shared progression
            </span>
            <div className="flex flex-wrap items-baseline gap-2">
              {selected.map((c, i) => (
                <span key={i} className="flex items-baseline gap-2">
                  <span className="font-mono text-lg font-semibold text-neutral-100">{c}</span>
                  {i < selected.length - 1 && <span className="text-neutral-400">→</span>}
                </span>
              ))}
              <span className="ml-1 text-sm text-neutral-400">
                — try them in order on the instrument below
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-neutral-200 transition hover:bg-white/[0.06]"
            >
              {saved ? "Saved ✓" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => share(selected)}
              className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-xs font-semibold text-brand transition hover:bg-brand/20"
            >
              {copied ? "Link copied ✓" : "Share →"}
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs text-neutral-400">
          {selected.length > 0 ? "Or try another:" : "Try a popular progression:"}
        </span>
        {POPULAR_PROGRESSIONS.map((p) => (
          <a
            key={p.name}
            href={`/?prog=${encodeProgression(p.chords)}#instrument`}
            title={p.description}
            className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-neutral-300 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
          >
            {p.chords.join(" → ")}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ProgressionsBar() {
  return (
    <Suspense fallback={null}>
      <ProgressionsContent />
    </Suspense>
  );
}
