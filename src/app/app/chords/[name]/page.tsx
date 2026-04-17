import { notFound } from "next/navigation";
import { buildChordInfo, getChordInfo } from "@keystrum/layout";
import { SONGS } from "@/lib/game/songs";
import NativeChordDetail from "@/components/native/NativeChordDetail";

export function generateStaticParams() {
  return buildChordInfo().map((c) => ({ name: c.name }));
}

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AppChordPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const c = getChordInfo(name);
  if (!c) notFound();

  const songsWithChord = SONGS.filter((s) =>
    Object.values(s.chordMap).includes(c.name)
  ).map((s) => ({ id: s.id, title: s.title, difficulty: s.difficulty }));

  return <NativeChordDetail chord={c} songsWithChord={songsWithChord} />;
}
