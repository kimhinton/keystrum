# Changelog

All notable changes to keystrum are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- 25-minute soft session-break nudge (`SessionBreakNudge.tsx`) — appears once a tab has been open ~25 min, dismissible, postpones the next reminder by another 25 min, mounted in `RootLayout` so it applies to all routes (commit `7bb0e68`)
- *Today / Yesterday* delta line on `/me` "Last 30 days" — `+Δ over yesterday` shown only when delta is positive; negative delta is intentionally **not** framed as a loss (commit `1006323`)
- Wellbeing principles section in `CONTRIBUTING.md` — six explicit guardrails (no forced missions, no push, no ads, no dark patterns, silent failure, dlPFC fatigue acknowledgment) plus a *Wellbeing first* paragraph in `README.md` (commit `d6bfa39`)
- "No account, no lock-in" Migration-cost framing on three page footers (`/chords`, `/chords/[name]`, `/play`) — Prospect-Theory anti-switching-cost signal (commit `5b25269`)
- BMC strategy notes under `docs/business/`: Customer Segments (4-tier × 4-axis, ARPU `[BLOCKED]` per no-monetization stance) and Geoffrey-Moore Value Proposition statement with 11-element self-evaluation (commits `ea8704a`, `295dd6b`)

### Changed

- Game burst label on missed strum notes: `STRUM FAIL` → `STRUM MISS` — aligns with the other miss labels and avoids the more punitive `FAIL` wording, matching the Wellbeing principles (commit `3aadbf2`)
- Brand color migration: 21 source files, ~85 occurrences of hardcoded `#FF3864` / `#FF5680` consolidated to a single `--brand` CSS variable (Tailwind v4 `@theme inline`); future warm-wood A/B = one-line edit (commit `96cc56b`)
- Long-form typography on chord theory and FAQ answers: `max-w-prose` + `leading-relaxed`. Tailwind v4 default `1.125` ratio kept (intentional — a `1.25` ratio override would have cascaded into 293 occurrences and caused regressions) (commit `0eb5568`)
- PWA manifest enrichment: `id`, `scope`, `orientation`, `lang`, `dir`, `prefer_related_applications`, three screenshots (hero / play / chords, 2880×1800), three shortcuts (Practice / Chords / Stats), maskable icons 192/512. Service worker bumped to `CACHE_NAME v2` and pre-cache extended to `/me`, `/about`, `/privacy` (commit `8c8a308`)
- Footer (homepage): added Unity message *"From one keyboard guitarist to another"* — Cialdini Pre-suasion in-group identity (commit `5020d3c`)

### Fixed

- WCAG 2.1 A/AA: `viewport` no longer blocks pinch-zoom; `text-neutral-500/600` lightened to `text-neutral-400`; `opacity-60/80` removed where it dragged contrast under 4.5:1; step-number tracking opacity raised. axe-core CI check now runs weekly via `cron` and on `workflow_dispatch` — 12 violations → 0 across all six pages (commits `4be4683`, `a63c4d6`, `8b7b6db`, `eab6057`, `94823de`, `1cc8ad0`, `86c525f`, `a5c32ae`, `bf8086e`)
- ARIA additions: `RecallSession` popup `role=status` `aria-live=polite`, `FinishedScreen` `role=region` with `aria-label`, `KeyboardGuitar` `role=application` — covers dynamic content the static axe-core checker can't see (commit `24f15b4`)
- `eslint-config-next 16.2.4` strict-purity restored: `InstrumentApp` PWA detection moved out of render with one disable comment; `RecallSession` impure `useState` / `useRef` initializers made pure (commit `6295be4`)

### Documentation

- `docs/business/cs.md` and `docs/business/vp-statement.md` — internal strategy reference (the no-monetization stance is preserved by ARPU `[BLOCKED]` rows and an opening disclaimer)

### Notes

- Cialdini 6 principles audit: 4 applied (Reciprocity / Commitment / Liking / Authority), 2 permanently `[BLOCKED]` (Social Proof — pre-PMF, can't fake; Scarcity — free site)

## [0.1.0] — 2026-04-29

Initial public release.

### Added

- 4-row × 6-column QWERTY keyboard mapping (4 strings × 6 chords)
- Six diatonic chords: Am, C, Em, G, Dm, F (C major / A minor)
- Karplus-Strong physical-modeling synthesis running live in Web Audio
- Real strum detection — sweep 3+ keys within 90 ms triggers a chord strum
- Three demo songs in practice mode: House of the Rising Sun, Scarborough Fair, Greensleeves
- Active recall practice mode — 5-minute interval prompts (default ON, skippable)
- `/me` dashboard with persisted stats (Stored Value): chord plays per chord, day activity heatmap, streak, saved progressions
- Chord progression sharing via `?prog=` URL parameter (e.g. `keystrum.app/?prog=Am-F-C-G`)
- Per-chord theory pages at `/chords/[name]` — chord function, common mistakes, songs that use it
- ELM dual-route hero — peripheral (auto first sound) + central (Why QWERTY toggle, 3 reasons)
- PWA support (offline-capable, installable, manifest + service worker)
- Native iOS and Android apps via Capacitor — same source, single build
- 11 npm keywords for discoverability (qwerty-instrument, browser-guitar, guitar-chord-practice, chord-trainer, karplus-strong, web-audio-synthesis, web-audio, strum, keyboard-instrument, music, nextjs)
- 12 GitHub Topics for repository discoverability
- Schema.org structured data: WebSite, Organization, SoftwareApplication, FAQPage
- llms.txt + sitemap.xml for AI search indexing

### Changed

- All chord URLs normalized to lowercase + dashes (e.g. `/chords/am`, `/chords/c-major`) with 301 redirects from any uppercase variants — fixes the 50 % indexation rate that came from inconsistent external links

### Fixed

- CI restored after 3 commits of failure: cleared the React 19 / Next 16 `react-hooks/set-state-in-effect` lint error on `/me` hydration, plus 5 pre-existing lint warnings (unused vars, missing effect deps, unstable useCallback dep)
- Removed buggy `SearchAction` schema (the site has no search feature) so Google stops trying to index a non-existent endpoint
- Twitter card now points to the actual handle `@RBlue7681` instead of the never-registered `@keystrum_app`

### Notes

- Project age at release: 14 days from first commit
- Solo built, MIT licensed, no payment gating
- 0 errors / 0 warnings on `pnpm lint`
- CI + Deploy passing on every commit since lint cleanup
