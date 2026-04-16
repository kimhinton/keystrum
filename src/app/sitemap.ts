import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { SONGS } from "@/lib/game/songs";
import { buildChordInfo } from "@keystrum/layout";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://keystrum.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/play`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/chords`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
  const songs = SONGS.map((s) => ({
    url: `${SITE_URL}/play/${s.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const chords = buildChordInfo().map((c) => ({
    url: `${SITE_URL}/chords/${c.name}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...base, ...songs, ...chords];
}
