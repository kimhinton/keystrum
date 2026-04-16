import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "keystrum — Strum your keyboard",
    short_name: "keystrum",
    description:
      "A strum-based keyboard instrument. Four rows = four strings. Six columns = six chords. Browser-only.",
    start_url: "/instrument",
    display: "standalone",
    background_color: "#0b0b0f",
    theme_color: "#0b0b0f",
    categories: ["music", "entertainment", "education"],
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/pwa-icon-192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa-icon-512", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
