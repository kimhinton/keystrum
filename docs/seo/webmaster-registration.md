# Webmaster Tools Registration — Global Targeting

Status as of 2026-05-06. keystrum is targeting global English-speaking
users; this doc covers the registration steps for every search engine
that has a public webmaster tool.

## Search engine market share (2026, global)

| Engine | Share | Submission method | Already done? |
|--------|------|-------------------|---------------|
| Google | 90.04% | Search Console (meta tag) | ✅ |
| Bing | 4.31% | Webmaster Tools (GSC import) | ❌ — register |
| Yandex | 1.84% | Webmaster (meta tag / file) | ❌ — register |
| Naver | KR-centric | Search Advisor (meta tag) | ❌ — register |
| DuckDuckGo | 0.74% | Auto via Bing index | Auto (after Bing) |
| Brave Search | < 1% | No webmaster console | Auto crawl only |
| Mojeek / Kagi / You.com | niche | Auto crawl | Auto |
| Baidu | 0.8% | Chinese-only, English ROI ≈ 0 | skip |

## P0 — Bing Webmaster Tools (5 minutes)

**Why first**: 4.31% of global search + DuckDuckGo (0.74%) uses Bing's
index = 5%+ reach in one signup. Bing currently auto-corrects
"keystrum" → "ihub" in its search box (audited 2026-05-06) — registering
fixes the brand-entity record.

Steps:
1. Visit <https://www.bing.com/webmasters>
2. Sign in with Microsoft account (free)
3. Click **"Import sites from Google Search Console"** — connect via
   Google OAuth (you already own GSC for keystrum.app, so this auto-
   imports + auto-verifies in one click). No meta tag work needed.
4. Submit sitemap: `https://keystrum.app/sitemap.xml`
5. (Optional) Use the **URL Inspection** tool to request indexing for
   all 14 sitemap URLs.

If you skip GSC import and verify manually, paste the meta tag code
into `src/app/layout.tsx` under `verification.other.msvalidate.01`
(template already in place).

## P1 — Yandex Webmaster (5 minutes)

**Why**: 1.84% of global search + ~80% of Russia + Eastern Europe.
keystrum's GSC shows scattered Eastern European impressions
(Estonia, Hungary, Latvia, Lithuania, Slovakia).

Steps:
1. Visit <https://webmaster.yandex.com>
2. Sign in (Yandex account; free, no phone required for English UI)
3. Add `https://keystrum.app`
4. Choose **meta tag** verification → copy the code (looks like
   `<meta name="yandex-verification" content="abcd1234..." />`)
5. Paste only the content value into `src/app/layout.tsx` under
   `verification.yandex` (uncomment the block)
6. Push the change, wait 60s for deploy, then click **Verify** on Yandex
7. Submit sitemap: `https://keystrum.app/sitemap.xml`

## P2 — Naver Search Advisor (5 minutes)

**Why**: Korean search engine. keystrum has 14 impressions from Korea
in the last 90 days (5th highest country) — small but worth the 5 min.
Naver favors Korean content + Korean servers, so English ranking ceiling
is low, but indexing itself is the goal.

Steps:
1. Visit <https://searchadvisor.naver.com>
2. Sign in with Naver account (free; English UI option in top right)
3. Add `https://keystrum.app`
4. Choose **meta tag** verification → copy the
   `<meta name="naver-site-verification" content="..." />` value
5. Paste content value into `src/app/layout.tsx` under
   `verification.other["naver-site-verification"]` (uncomment block)
6. Push, wait, click **Verify**
7. Submit sitemap: `https://keystrum.app/sitemap.xml`

## P3 — IndexNow (already automated)

Auto-pings Bing, Yandex, Naver, Seznam (Czech), Yep on every push to
`main` that touches site code or sitemap. See
`.github/workflows/indexnow.yml`. No action required.

After Bing/Yandex/Naver are registered, IndexNow's pings will be
attached to verified accounts → real-time indexing instead of the
default 4-12 week crawl cycle.

## P4 — PWA Microsoft Store distribution (optional, 30 minutes)

**Why**: Free since 2025-09 for individual developers (was $19). Edge
+ Windows users discover PWAs through the Store. Adds a non-search
discovery channel.

Steps:
1. Create a free Microsoft Partner Center account
   <https://partner.microsoft.com/dashboard>
2. Visit <https://www.pwabuilder.com>
3. Enter `https://keystrum.app` → it auto-reads the manifest, generates
   a Windows `.msixbundle` package
4. Reserve the app name "keystrum" in Partner Center
5. Upload the .msixbundle, fill app description, submit
6. Microsoft reviews in 24-48h

PWABuilder reads from `src/app/manifest.ts` — already has icons (32,
180, 192, 512), screenshots (3), shortcuts (3), categories. No code
change needed.

## Brand entity (Bing-specific)

Bing's "keystrum" → "ihub" auto-correct is the bottleneck for Bing
brand recognition. After registering Bing Webmaster Tools:

1. In Bing Webmaster, go to **Configure My Site → URL & Content
   Submission**
2. Submit the homepage `https://keystrum.app` 5-10 times across
   different days — Bing weights this as a strong signal that keystrum
   is the canonical brand entity
3. The DefinedTerm + Organization schema (already in `layout.tsx`)
   gives Bing the disambiguation hint vs. Chuck Arizona's "Keystrum"
   music album

This typically clears within 4-8 weeks once the brand-entity records
update.

## Rollout order (recommended)

1. Bing (1-click GSC import) — today, 5 min
2. Naver (English UI, simple) — today, 5 min
3. Yandex (Russian UI; English-readable) — today, 5 min
4. Tell Claude the verification codes → Claude pastes into layout.tsx
   and pushes
5. Wait for IndexNow re-ping (auto, 90s after push)
6. Submit sitemap manually in each tool's UI
7. (Optional) PWA Builder for Microsoft Store — this week
