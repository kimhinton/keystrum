"use client";

import { useEffect } from "react";
import RecordBar from "@/components/instrument/RecordBar";

type Props = { onClose: () => void };

export default function RecordModal({ onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 backdrop-blur-sm p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#12121a] p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl leading-none text-neutral-400 transition hover:text-white"
          aria-label="Close"
        >
          ×
        </button>

        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-red-400">
          <span className="size-1.5 rounded-full bg-red-500" />
          30s max
        </div>
        <h2 className="mb-2 text-xl font-semibold tracking-tight">Capture a riff</h2>
        <p className="mb-6 text-sm text-neutral-400">
          The keyboard above stays live. Hit REC, play up to 30 seconds, then download or share.
        </p>

        <RecordBar />

        <div className="mt-4 text-[11px] font-mono text-neutral-400">
          .m4a on Safari · .webm elsewhere · file stays on your device
        </div>
      </div>
    </div>
  );
}
