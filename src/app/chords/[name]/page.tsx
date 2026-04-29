import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildChordInfo, getChordBySlug, getChordSlug } from "@keystrum/layout";
import { SONGS } from "@/lib/game/songs";
import { Logo } from "@/components/brand/Logo";

export function generateStaticParams() {
  return buildChordInfo().map((c) => ({ name: getChordSlug(c.name) }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ name: string }> }
): Promise<Metadata> {
  const { name } = await params;
  const c = getChordBySlug(name);
  if (!c) return { title: "Chord not found" };
  const slug = getChordSlug(c.name);
  return {
    title: `${c.name} guitar chord — practice without a guitar`,
    description: `${c.name} (${c.label}) guitar chord — notes ${c.notes.join(" · ")}. Play it by sweeping QWERTY keyboard column ${c.columnIndex + 1} on keystrum. Used in ${c.usedIn.slice(0, 2).join(", ")}.`,
    keywords: [
      `${c.name} chord`,
      `${c.name} chord guitar`,
      `${c.name} chord keyboard`,
      `${c.name} chord practice`,
      `${c.name} ${c.label.toLowerCase()}`,
      "guitar chord dictionary",
      "chord practice app",
    ],
    alternates: { canonical: `/chords/${slug}` },
    openGraph: {
      title: `${c.name} guitar chord — keystrum`,
      description: `Notes: ${c.notes.join(" · ")}. Strum on keyboard column ${c.columnIndex + 1}. Practice without a guitar.`,
      url: `/chords/${slug}`,
    },
  };
}

export default async function ChordPage(
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const c = getChordBySlug(name);
  if (!c) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicComposition",
        name: `${c.name} chord`,
        alternativeHeadline: c.label,
        description: `${c.label} chord. Notes: ${c.notes.join(", ")}. Intervals: ${c.intervals.join(", ")}.`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "keystrum",
            item: "https://keystrum.app",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Chord dictionary",
            item: "https://keystrum.app/chords",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${c.name} chord`,
            item: `https://keystrum.app/chords/${getChordSlug(c.name)}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0E0E12] text-neutral-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="flex items-center justify-between border-b border-white/5 bg-[#0E0E12]/80 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Logo size={20} className="shrink-0" />
          keystrum
        </Link>
        <div className="flex items-center gap-5 text-sm text-neutral-400">
          <Link href="/chords" className="transition hover:text-white">All chords</Link>
          <Link href="/play" className="transition hover:text-white">Practice</Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/chords" className="text-xs text-neutral-500 hover:text-neutral-300">
          ← All chords
        </Link>
        <h1 className="mt-3 flex items-baseline gap-3 text-5xl font-semibold tracking-tight sm:text-6xl">
          <span style={{ color: c.color }}>{c.name}</span>
          <span className="text-xl text-neutral-400">{c.label}</span>
        </h1>
        <p className="mt-3 max-w-xl text-neutral-400">{c.feel}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <h2 className="mb-3 text-xs font-mono uppercase tracking-widest text-neutral-500">Notes</h2>
            <div className="flex flex-wrap gap-2 font-mono text-sm">
              {c.notes.map((n, i) => (
                <span
                  key={i}
                  className="rounded-md border px-2 py-1 font-semibold"
                  style={{ borderColor: `${c.color}55`, background: `${c.color}0f`, color: c.color }}
                >
                  {n}
                </span>
              ))}
            </div>
            <h2 className="mt-5 mb-3 text-xs font-mono uppercase tracking-widest text-neutral-500">Intervals</h2>
            <div className="flex flex-wrap gap-2 font-mono text-xs text-neutral-400">
              {c.intervals.map((iv, i) => (
                <span key={i} className="rounded-md border border-white/10 bg-white/[0.01] px-2 py-1">
                  {iv}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <h2 className="mb-3 text-xs font-mono uppercase tracking-widest text-neutral-500">Keyboard column {c.columnIndex + 1}</h2>
            <div className="flex flex-col gap-1.5 font-mono text-sm">
              {c.keys.map((row, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-14 text-xs text-neutral-500">{["E4", "B3", "G3", "D3"][i]}</span>
                  <span
                    className="inline-flex size-9 items-center justify-center rounded-md border font-bold"
                    style={{ borderColor: `${c.color}55`, background: `${c.color}0f`, color: c.color }}
                  >
                    {row[0]?.toUpperCase() ?? "·"}
                  </span>
                  <span className="text-xs text-neutral-500">fret {c.frets[i]}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-neutral-500">
              Press any one key to play that string. Press all four top-to-bottom in under 90 ms to trigger a down-strum.
            </p>
          </div>
        </div>

        {c.usedIn.length > 0 && (
          <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <h2 className="mb-3 text-xs font-mono uppercase tracking-widest text-neutral-500">Famously used in</h2>
            <ul className="flex flex-col gap-2 text-sm text-neutral-300">
              {c.usedIn.map((s, i) => (
                <li key={i} className="flex items-baseline gap-2">
                  <span className="text-neutral-600">—</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {c.siblings.map((sib) => (
            <Link
              key={sib}
              href={`/chords/${getChordSlug(sib)}`}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-sm font-mono text-neutral-400 transition hover:border-white/20 hover:text-white"
            >
              {sib}
            </Link>
          ))}
        </div>

        {(() => {
          const songsWithChord = SONGS.filter((s) =>
            Object.values(s.chordMap).includes(c.name)
          );
          if (songsWithChord.length === 0) return null;
          return (
            <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h2 className="mb-3 text-xs font-mono uppercase tracking-widest text-neutral-500">Practice songs using {c.name}</h2>
              <div className="flex flex-wrap gap-2">
                {songsWithChord.map((s) => (
                  <Link
                    key={s.id}
                    href={`/play/${s.id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm transition hover:border-[#FF3864]/40"
                  >
                    <span className="text-neutral-300">{s.title}</span>
                    <span className="text-[10px] text-neutral-500">{s.difficulty}</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF3864] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#FF5680]"
          >
            Play this chord on the instrument →
          </Link>
          <Link
            href="/play"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-white/20 hover:bg-white/[0.05]"
          >
            Try practice mode
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between text-xs text-neutral-500">
          <div>© 2026 keystrum · MIT licensed</div>
          <Link href="/" className="hover:text-neutral-300">← Home</Link>
        </div>
      </footer>
    </div>
  );
}
