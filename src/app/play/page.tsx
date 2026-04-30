import Link from "next/link";
import type { Metadata } from "next";
import { SONGS } from "@/lib/game/songs";
import { SongCard } from "@/components/game/SongCard";
import { Logo } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: "Folk song chord practice — browser chord trainer",
  description:
    "Practice guitar chords on three folk songs — House of the Rising Sun, Scarborough Fair, Greensleeves. Browser-based chord trainer with strum · hold · mute across 6 lanes. Progressive difficulty, no guitar required, no install.",
  keywords: [
    "folk song chord practice",
    "chord practice browser",
    "learn strumming pattern online",
    "practice guitar chords without guitar",
    "browser chord trainer",
    "house of the rising sun chords practice",
    "scarborough fair chords practice",
    "greensleeves chords practice",
  ],
  alternates: { canonical: "/play" },
  openGraph: {
    title: "Folk song chord practice — keystrum",
    description: "Learn guitar chords on House of the Rising Sun, Scarborough Fair, Greensleeves. Browser-based chord trainer with strum detection. No install, no guitar needed.",
    url: "/play",
  },
};

export default function PlayHome() {
  return (
    <div className="min-h-screen bg-[#0E0E12] text-neutral-100">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#0E0E12]/80 px-6 py-4 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Logo size={20} className="shrink-0" />
          keystrum
        </Link>
        <div className="flex items-center gap-5 text-sm text-neutral-400">
          <Link href="/" className="transition hover:text-white">Instrument</Link>
          <Link href="/chords" className="transition hover:text-white">Chord dictionary</Link>
          <Link href="/play" className="text-white">Practice</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 pt-16 pb-10">
        <div className="mb-8 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-brand">Practice mode</span>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Pick a song.</h1>
          <p className="mt-3 text-neutral-400">
            Three folk standards, arranged for six chord lanes.
            Three techniques — <span className="text-brand">strum</span> (sweep 2+ keys in the column), <span className="text-[#fbbf24]">hold</span> (keep the key pressed), and <span className="text-neutral-200">mute</span> (short tap on the right-hand keys).
            Timing windows: <span className="font-mono text-neutral-200">60 · 120 · 200 ms</span>.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SONGS.map((s) => (
            <SongCard key={s.id} song={s} />
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 text-sm text-neutral-400">
            <span className="text-neutral-300 font-semibold">How scoring works.</span>{" "}
            Each hit awards 300 · 200 · 100 for Perfect · Great · Good. Combo multiplier up to 1.5× kicks in at 50+ hits. Miss resets combo.
            Accuracy weights Perfect 1.0, Great 0.7, Good 0.4.
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 text-sm text-neutral-400">
            <span className="text-neutral-300 font-semibold">Bonuses.</span>{" "}
            <span className="text-[#fbbf24]">Hold</span> release within 120 ms of the tail end: <span className="font-mono text-neutral-200">+120</span>.
            <span className="text-brand"> Strum</span> (2+ different keys in the column within 140 ms): <span className="font-mono text-neutral-200">+150</span>.
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-8 mt-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-neutral-400">
          <div>© 2026 keystrum · MIT licensed · No account, no lock-in</div>
          <Link href="/" className="hover:text-neutral-300">← Instrument home</Link>
        </div>
      </footer>
    </div>
  );
}
