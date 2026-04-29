import type { MetadataRoute } from "next";
import { execSync } from "child_process";

export const dynamic = "force-static";

import { SONGS } from "@/lib/game/songs";
import { buildChordInfo, getChordSlug } from "@keystrum/layout";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://keystrum.app";

function gitLastModified(filePath: string): Date {
  try {
    const ts = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      encoding: "utf-8",
    }).trim();
    return ts ? new Date(ts) : new Date("2026-04-16");
  } catch {
    return new Date("2026-04-16");
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: gitLastModified("src/app/page.tsx"), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/play`, lastModified: gitLastModified("src/app/play/page.tsx"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/chords`, lastModified: gitLastModified("src/app/chords/page.tsx"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/instrument`, lastModified: gitLastModified("src/app/instrument/page.tsx"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/privacy`, lastModified: gitLastModified("src/app/privacy/page.tsx"), changeFrequency: "yearly", priority: 0.3 },
  ];
  const songDate = gitLastModified("src/lib/game/songs.ts");
  const songs = SONGS.map((s) => ({
    url: `${SITE_URL}/play/${s.id}`,
    lastModified: songDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const chordDate = gitLastModified("packages/layout");
  const chords = buildChordInfo().map((c) => ({
    url: `${SITE_URL}/chords/${getChordSlug(c.name)}`,
    lastModified: chordDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...base, ...songs, ...chords];
}
