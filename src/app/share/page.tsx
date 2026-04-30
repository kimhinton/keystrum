"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { getSong } from "@/lib/game/songs";
import { accuracyOf } from "@/lib/game/judgment";
import { Logo } from "@/components/brand/Logo";

interface SharePayload {
  s: string;
  sc: number;
  mc: number;
  p: number;
  g: number;
  o: number;
  m: number;
}

function decode(code: string): SharePayload | null {
  try {
    const json = JSON.parse(atob(decodeURIComponent(code)));
    if (
      typeof json.s === "string" &&
      typeof json.sc === "number" &&
      typeof json.mc === "number" &&
      typeof json.p === "number" &&
      typeof json.g === "number" &&
      typeof json.o === "number" &&
      typeof json.m === "number"
    ) {
      return json as SharePayload;
    }
    return null;
  } catch {
    return null;
  }
}

function ShareContent() {
  const params = useSearchParams();
  const code = params.get("code");
  const p = code ? decode(code) : null;

  return (
    <div className="min-h-screen bg-[#0E0E12] text-neutral-100">
      <nav className="flex items-center justify-between border-b border-white/5 bg-[#0E0E12]/80 px-6 py-3">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Logo size={20} className="shrink-0" />
          keystrum
        </Link>
        <Link href="/play" className="text-xs text-neutral-400 hover:text-white">Try it →</Link>
      </nav>

      <main className="mx-auto max-w-md px-6 py-16">
        {!p ? (
          <div className="text-center text-neutral-400">
            <h1 className="mb-2 text-2xl font-semibold text-neutral-100">Broken link</h1>
            <p className="mb-6 text-sm">This score link is malformed. Try the song list instead.</p>
            <Link href="/play" className="inline-flex rounded-full bg-[#FF3864] px-5 py-2.5 text-sm font-semibold text-black">
              Browse songs →
            </Link>
          </div>
        ) : (
          <SharedCard payload={p} />
        )}
      </main>
    </div>
  );
}

function SharedCard({ payload }: { payload: SharePayload }) {
  const song = getSong(payload.s);
  const acc = accuracyOf({
    perfect: payload.p,
    great: payload.g,
    good: payload.o,
    miss: payload.m,
  });
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-10 text-center">
      <div>
        <div className="mb-2 text-xs font-mono uppercase tracking-widest text-[#FF3864]">Shared score</div>
        <div className="text-5xl font-black text-neutral-100">{payload.sc.toLocaleString()}</div>
        <div className="mt-1 text-sm text-neutral-400">{song?.title ?? payload.s}</div>
      </div>

      <div className="grid grid-cols-2 gap-3 font-mono text-sm">
        <Stat label="Accuracy" value={`${Math.round(acc * 100)}%`} />
        <Stat label="Max combo" value={`${payload.mc}×`} />
        <Stat label="Perfect" value={`${payload.p}`} />
        <Stat label="Miss" value={`${payload.m}`} />
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={song ? `/play/${song.id}` : "/play"}
          className="w-full rounded-full bg-[#FF3864] py-3 text-sm font-bold text-black transition hover:bg-[#FF5680]"
        >
          Beat this score →
        </Link>
        <Link href="/play" className="text-xs text-neutral-400 hover:text-neutral-300">
          ← Back to songs
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center rounded-md border border-white/5 bg-white/[0.01] px-2 py-3">
      <span className="text-[10px] uppercase tracking-widest text-neutral-400">{label}</span>
      <span className="mt-0.5 text-lg font-bold text-neutral-100">{value}</span>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#0E0E12] text-neutral-400">
        Loading...
      </div>
    }>
      <ShareContent />
    </Suspense>
  );
}
