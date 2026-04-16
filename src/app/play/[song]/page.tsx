import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import GameRunner from "@/components/game/GameRunner";
import { SONGS, getSong } from "@/lib/game/songs";

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

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-neutral-100">
      <nav className="flex items-center justify-between border-b border-white/5 bg-[#0b0b0f]/80 px-6 py-3 backdrop-blur-xl">
        <Link href="/play" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="inline-flex size-5 items-center justify-center rounded-md bg-[#ff6b35] text-[10px] font-black text-black">K</span>
          keystrum · Practice
        </Link>
        <Link href="/play" className="text-xs text-neutral-400 hover:text-white">← Exit</Link>
      </nav>
      <main className="flex min-h-[calc(100vh-49px)] items-center justify-center px-4 py-6">
        <GameRunner song={song} />
      </main>
    </div>
  );
}
