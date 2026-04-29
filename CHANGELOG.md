# Changelog

All notable changes to keystrum are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
