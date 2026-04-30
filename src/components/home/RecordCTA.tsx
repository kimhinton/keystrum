"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const RecordModal = dynamic(() => import("./RecordModal"), { ssr: false });

export default function RecordCTA() {
  const [open, setOpen] = useState(false);
  return (
    <section id="record" className="relative overflow-hidden border-y border-white/5 bg-gradient-to-b from-[#0E0E12] via-[#12100e] to-[#0E0E12]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.12),transparent_50%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-6 py-14 lg:grid-cols-[1.3fr_auto] lg:py-20">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-red-400">Record · share</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Record what you play.
            <br />
            <span className="text-neutral-400">Share it anywhere.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm text-neutral-400">
            Hit record, play up to 30 seconds, download the audio or share via your OS. No signup, no upload — the file stays on your device.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
            <span>Safari · .m4a</span>
            <span className="opacity-30">·</span>
            <span>Chrome · .webm</span>
            <span className="opacity-30">·</span>
            <span>30s cap</span>
          </div>
        </div>
        <div className="flex items-center lg:justify-end">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2.5 rounded-full bg-red-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(239,68,68,0.6)] transition hover:bg-red-500"
          >
            <span className="inline-block size-2.5 animate-pulse rounded-full bg-white" />
            Start recording
          </button>
        </div>
      </div>
      {open && <RecordModal onClose={() => setOpen(false)} />}
    </section>
  );
}
