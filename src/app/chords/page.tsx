import Link from "next/link";
import type { Metadata } from "next";
import { buildChordInfo, getChordSlug } from "@keystrum/layout";
import { Logo } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: "Guitar Chord Dictionary — Am, C, Em, G, Dm, F",
  description:
    "Guitar chord reference: Am, C, Em, G, Dm, F. Notes, intervals, voicings, QWERTY mapping, songs each chord appears in. Practice without a guitar.",
  keywords: [
    "guitar chord dictionary",
    "chord practice app",
    "Am chord guitar",
    "C chord guitar",
    "Em chord guitar",
    "G chord guitar",
    "Dm chord guitar",
    "F chord guitar",
    "C major chord progression",
    "A minor chord progression",
  ],
  alternates: { canonical: "/chords" },
  openGraph: {
    title: "Guitar chord dictionary — keystrum",
    description: "Am · C · Em · G · Dm · F — notes, intervals, keyboard mapping, and famous songs. Practice without a guitar.",
    url: "/chords",
  },
};

export default function ChordIndex() {
  const chords = buildChordInfo();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guitar chord dictionary — Am, C, Em, G, Dm, F",
    description: "The 6 open-position chords diatonic to C major / A minor, with notes, intervals, voicings, and QWERTY keyboard mappings.",
    numberOfItems: chords.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: chords.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://keystrum.app/chords/${getChordSlug(c.name)}`,
      name: `${c.name} guitar chord (${c.label})`,
      description: `${c.label} — notes ${c.notes.join(", ")}. ${c.voicings.length} voicings.`,
    })),
  };

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://keystrum.app/chords#collection",
    name: "Guitar chord dictionary",
    description: "Six guitar chords (Am, C, Em, G, Dm, F) with notes, intervals, multiple voicings (open, barre, power chord, 7th, add9), and QWERTY keyboard mappings.",
    url: "https://keystrum.app/chords",
    isPartOf: { "@id": "https://keystrum.app/#website" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "keystrum", item: "https://keystrum.app" },
        { "@type": "ListItem", position: 2, name: "Chord dictionary", item: "https://keystrum.app/chords" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-[#0E0E12] text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#0E0E12]/80 px-6 py-4 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Logo size={20} className="shrink-0" />
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
          <span className="text-xs font-mono uppercase tracking-widest text-brand">Chord dictionary</span>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Six columns, six chords.</h1>
          <p className="mt-3 text-neutral-400">
            keystrum ships with six open-position chord presets — the scaffolding for most pop music.
            Each column on your keyboard plays one chord. Click any card for notes, intervals, voicings, and songs.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chords.map((c) => (
            <Link
              key={c.name}
              href={`/chords/${getChordSlug(c.name)}`}
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
              <p className="text-xs text-neutral-500">
                {c.voicings.length} voicings · {c.usedIn.length > 0 && `used in ${c.usedIn[0].split(" — ")[0]}`}
              </p>
              <span className="mt-auto text-xs text-brand transition group-hover:text-brand-hover">
                Open →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 max-w-3xl rounded-xl border border-white/5 bg-white/[0.015] p-6">
          <h2 className="mb-3 text-base font-semibold text-neutral-200">About these six chords</h2>
          <div className="space-y-3 text-sm leading-relaxed text-neutral-400">
            <p>
              These six chords — Am, C, Em, G, Dm, F — are the core of Western pop, folk, and rock harmony. They are diatonic to the key of C major (and its relative minor, A minor), meaning every chord shares the same key signature with no sharps or flats. Together they form the harmonic palette of thousands of songs, from Beatles standards to modern indie folk.
            </p>
            <p>
              Each chord page on keystrum includes the notes and intervals, multiple voicings (open position, barre, power chord, 7th, add9 variations), QWERTY keyboard mapping for browser practice, common mistakes, music-theory function, and a transition difficulty matrix to other chords. Practice without a guitar — your laptop keyboard becomes the instrument.
            </p>
            <p>
              The most common chord progressions in pop music use these same six chords: <span className="text-neutral-300">I&ndash;V&ndash;vi&ndash;IV (C&ndash;G&ndash;Am&ndash;F)</span>, <span className="text-neutral-300">vi&ndash;IV&ndash;I&ndash;V (Am&ndash;F&ndash;C&ndash;G)</span>, and the folk standard <span className="text-neutral-300">i&ndash;VII&ndash;VI&ndash;VII (Am&ndash;G&ndash;F&ndash;G)</span>. Master these six chords and you can play hundreds of songs by ear.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-neutral-400">
          <div>© 2026 keystrum · MIT licensed · No account, no lock-in</div>
          <Link href="/" className="hover:text-neutral-300">← Instrument home</Link>
        </div>
      </footer>
    </div>
  );
}
