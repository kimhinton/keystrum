import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "keystrum — Strum your keyboard",
    short_name: "keystrum",
    description:
      "A strum-based keyboard instrument. Four rows = four strings. Six columns = six chords. Browser-only.",
    start_url: "/instrument",
    scope: "/",
    display: "standalone",
    orientation: "any",
    lang: "en",
    dir: "ltr",
    background_color: "#0E0E12",
    theme_color: "#0E0E12",
    categories: ["music", "entertainment", "education"],
    prefer_related_applications: false,
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/pwa-icon-192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa-icon-512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa-icon-192", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/pwa-icon-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    screenshots: [
      { src: "/hero-screenshot.png", sizes: "2880x1800", type: "image/png", form_factor: "wide", label: "keystrum hero — strum your QWERTY keyboard" },
      { src: "/play-screenshot.png", sizes: "2880x1800", type: "image/png", form_factor: "wide", label: "Practice mode — three folk songs" },
      { src: "/chords-screenshot.png", sizes: "2880x1800", type: "image/png", form_factor: "wide", label: "Chord dictionary — six chords" },
    ],
    shortcuts: [
      { name: "Practice mode", short_name: "Play", description: "Three folk songs with a strum-along character", url: "/play" },
      { name: "Chord dictionary", short_name: "Chords", description: "Six chords with theory, mistakes, and practice tips", url: "/chords" },
      { name: "Your stats", short_name: "Stats", description: "Streak, AARRR funnel, SM-2 review queue", url: "/me" },
    ],
  };
}
