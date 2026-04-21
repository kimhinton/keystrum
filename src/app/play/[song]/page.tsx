import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import GameRunner from "@/components/game/GameRunner";
import { SONGS, getSong } from "@/lib/game/songs";
import { Logo } from "@/components/brand/Logo";

export function generateStaticParams() {
  return SONGS.map((s) => ({ song: s.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ song: string }> }
): Promise<Metadata> {
  const { song: songId } = await params;
  const song = getSong(songId);
  if (!song) return { title: "Song not found" };
  return {
    title: `${song.title} — Play`,
    description: `Play ${song.title} — ${song.subtitle}. Difficulty: ${song.difficulty}. Practice mode in keystrum.`,
    alternates: { canonical: `/play/${song.id}` },
    openGraph: {
      title: `${song.title} · keystrum Practice`,
      description: song.subtitle,
      url: `/play/${song.id}`,
    },
  };
}

export default async function PlaySong(
  { params }: { params: Promise<{ song: string }> }
) {
  const { song: songId } = await params;
  const song = getSong(songId);
  if (!song) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicComposition",
        name: song.title,
        description: song.subtitle,
        musicalKey: "C major / A minor",
        musicCompositionForm: "Folk",
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
            name: "Practice mode",
            item: "https://keystrum.app/play",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: song.title,
            item: `https://keystrum.app/play/${song.id}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0E0E12] text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="flex items-center justify-between border-b border-white/5 bg-[#0E0E12]/80 px-6 py-3 backdrop-blur-xl">
        <Link href="/play" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Logo size={20} className="shrink-0" />
          keystrum · Practice
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1.5 sm:flex">
            {Object.values(song.chordMap).filter((v, i, a) => a.indexOf(v) === i).map((chord) => (
              <Link
                key={chord}
                href={`/chords/${chord}`}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-neutral-400 transition hover:border-white/20 hover:text-white"
              >
                {chord}
              </Link>
            ))}
          </div>
          <Link href="/play" className="text-xs text-neutral-400 hover:text-white">← Exit</Link>
        </div>
      </nav>
      <main className="flex min-h-[calc(100vh-49px)] items-center justify-center px-4 py-6">
        <GameRunner song={song} />
      </main>
    </div>
  );
}
