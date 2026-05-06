import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://keystrum.app";

// AI training / scraper crawlers — blocked because keystrum is a small
// hand-built site, not a content farm, and the GSC impressions data was
// being inflated without producing real users (see 2026-05 audit).
// PerplexityBot is known to rotate user-agents to evade robots.txt
// (Cloudflare 2025-08 report) — block is best-effort, not 100%.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  "Bytespider",
  "Amazonbot",
  "cohere-ai",
  "Diffbot",
  "Omgilibot",
  "Omgili",
  "ImagesiftBot",
  "PetalBot",
  "YouBot",
  "ICC-Crawler",
  "AI2Bot",
  "DuckAssistBot",
  "Timpibot",
  "Webzio-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/share/", "/me"],
      },
      ...AI_CRAWLERS.map((bot) => ({
        userAgent: bot,
        disallow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
