import Link from "next/link";
import type { Metadata } from "next";
import { buildChordInfo } from "@keystrum/layout";

export const metadata: Metadata = {
  title: "Chord dictionary",
  description:
    "All six chord presets used in keystrum — Am, C, Em, G, Dm, F. Keyboard mapping, chord notes, songs they appear in. Learn the column then play.",
  alternates: { canonical: "/chords" },
  openGraph: {
    title: "keystrum chord dictionary",
    description: "Six chord columns, mapped to keyboard columns. Notes, feel, famous songs.",
    url: "/chords",
  },
};

export default function ChordIndex() {
  const chords = buildChordInfo();
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-neutral-100">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#0b0b0f]/80 px-6 py-4 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="inline-flex size-5 items-center justify-center rounded-md bg-[#ff6b35] text-[10px] font-black text-black">K</span>
          keystrum
        </Link>
        <div className="flex items-center gap-5 text-sm text-neutral-400">
          <Link href="/" className="transition hover:text-white">Instrument</Link>
          <Link href="/chords" className="text-white">Chord dictionary</Link>
          <Link href="/play" className="transition hover:text-white">Practice</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 pt-16 pb-10">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">Chord dictionary</span>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Six columns, six chords.</h1>
          <p className="mt-3 text-neutral-400">
            keystrum ships with six open-position chord presets — the scaffolding for most pop music.
            Each column on your keyboard plays one chord. Click any card for notes, intervals, and songs.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chords.map((c) => (
            <Link
              key={c.name}
              href={`/chords/${c.name}`}
              className="group relative flex flex-col gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-5 transition hover:border-white/15"
              style={{ ["--c" as string]: c.color }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className="font-mono text-3xl font-black tracking-tight"
                    style={{ color: c.color }}
                  >
                    {c.name}
                  </span>
                  <span className="ml-2 text-sm text-neutral-400">{c.label}</span>
                </div>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  col {c.columnIndex + 1}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {c.notes.map((n, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-0.5 text-neutral-300"
                  >
                    {n}
                  </span>
                ))}
              </div>
              <p className="text-sm text-neutral-400">{c.feel}</p>
              <span className="mt-auto text-xs text-[#ff6b35] transition group-hover:text-[#ff8555]">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-neutral-500">
          <div>© 2026 keystrum · MIT licensed</div>
          <Link href="/" className="hover:text-neutral-300">← Instrument home</Link>
        </div>
      </footer>
    </div>
  );
}
