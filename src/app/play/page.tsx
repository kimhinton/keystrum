import Link from "next/link";
import type { Metadata } from "next";
import { SONGS } from "@/lib/game/songs";
import { SongCard } from "@/components/game/SongCard";
import { Logo } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: "Folk song chord practice — browser chord trainer",
  description:
    "Practice guitar chords on four songs — House of the Rising Sun, Scarborough Fair, Greensleeves, and the Britpop Em-G-Dm-C progression (Wonderwall and friends). Browser-based chord trainer with strum · hold · mute across 6 lanes. Progressive difficulty, no guitar required, no install.",
  keywords: [
    "folk song chord practice",
    "chord practice browser",
    "learn strumming pattern online",
    "practice guitar chords without guitar",
    "browser chord trainer",
    "house of the rising sun chords practice",
    "scarborough fair chords practice",
    "greensleeves chords practice",
    "wonderwall chords practice",
    "em g dm c progression",
  ],
  alternates: { canonical: "/play" },
  openGraph: {
    title: "Folk song chord practice — keystrum",
    description: "Learn guitar chords on House of the Rising Sun, Scarborough Fair, Greensleeves. Browser-based chord trainer with strum detection. No install, no guitar needed.",
    url: "/play",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://keystrum.app";

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Folk songs to practice on QWERTY keyboard guitar",
  description:
    "Free, browser-based practice list of folk standards arranged for the keystrum 6-lane chord trainer.",
  numberOfItems: SONGS.length,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: SONGS.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/play/${s.id}`,
    name: s.title,
    description: s.subtitle,
  })),
};

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/play#collection`,
  name: "Folk song chord practice — keystrum",
  description:
    "Practice mode collection: browser-based folk-song chord trainer. Three traditional songs (House of the Rising Sun, Scarborough Fair, Greensleeves) plus the Britpop Em-G-Dm-C progression.",
  url: `${SITE_URL}/play`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "keystrum", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Practice", item: `${SITE_URL}/play` },
    ],
  },
};

export default function PlayHome() {
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

        <div className="mt-12 max-w-3xl rounded-xl border border-white/5 bg-white/[0.015] p-6">
          <h2 className="mb-3 text-base font-semibold text-neutral-200">About these practice songs</h2>
          <div className="space-y-3 text-sm leading-relaxed text-neutral-400">
            <p>
              All four arrangements use only the six chords in keystrum&apos;s column layout (Am, C, Em, G, Dm, F), making them ideal for testing your chord-transition fluency without learning new shapes. House of the Rising Sun (traditional American folk) drills the minor i–III–IV–VI progression. Scarborough Fair (15th century English ballad) pivots between Dm, C, F, and Am. Greensleeves (16th century English) stays on Em, D, G, and C in cyclic 6/8 time. The Britpop Em–G–Dm–C progression compresses Wonderwall, Don&apos;t Look Back in Anger, and dozens of 90s standards into one 4-bar loop.
            </p>
            <p>
              Each song&apos;s note pattern is encoded bar-by-bar relative to the song BPM with a 3-second lead-in. Strum lanes (0–3) correspond to the four QWERTY keyboard rows mapped to guitar strings; mute lanes (4–5) trigger short dampening at specific columns. The judgment engine scores each input within 60/120/200 ms timing windows.
            </p>
            <p>
              For best practice results, start with one song at slow tempo until chord transitions are clean, then progress to full tempo and add bonus shortcuts (hold-tail release, multi-key strum). Loop a single song until you score 90%+ accuracy before moving to the next. The same chord vocabulary appears in the{" "}
              <Link href="/chords" className="underline hover:text-white">
                chord dictionary
              </Link>{" "}
              with finger positions, multiple voicings, common mistakes, and music-theory function.
            </p>
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
