# 6-Month SEO Roadmap — keystrum (2026-04-30 → 2026-10-30)

> Source: 미적용/부1_마케팅/단원7_Acquisition_pSEO.md §7.6.2
> Aligned with: [`docs/business/pmf-absence-checklist.md`](../business/pmf-absence-checklist.md) · [`docs/business/pivot-decision-tree.md`](../business/pivot-decision-tree.md) · [`docs/business/differentiation.md`](../business/differentiation.md)
> Scope: SEO / discoverability roadmap consistent with Pre-PMF policy (no AI mass-generation, no SaaS analytics, organic Pull only)

---

## 0. Immutable constraints

| Policy | Source | Rule |
|---|---|---|
| AI mass-generated content | 마스터 인덱스 절대 함정 + Google Core Update 2025-12 | reject — deindex penalty up to 6 months |
| SaaS analytics setup (Plausible · GA4 · PostHog · Umami) | memory `feedback_no_cold_contact_no_token_setup` | reject — localStorage AARRR + Google Search Console only |
| Cold contact / DM / awesome-list PR | memory `feedback_no_cold_contact` · `feedback_no_awesome_list_work` | reject — Pull signals only |
| Pre-PMF marketing / paid ads | memory `feedback_no_monetization` + `pmf-absence-checklist.md` policy table | reject — permanent 0 |
| Visible UX migration (light/dark · i18n · logo refresh) | memory `feedback_pre_pmf_phase_separation` | hold until ~50 active users (`pivot-decision-tree.md` Branch A) |

These constraints override every recommendation below. If a SEO action conflicts with one of them, the action is rejected — no exceptions.

---

## 1. Timeline overview

```
Month 0     · 2026-04-30 — SOAK start · docs/business/ 7-piece + docs/seo/ baseline
Month 0.5   · 2026-05-14 — SOAK end · 1st baseline polling
Month 1.5   · 2026-06-14 — Mid-point check (observation only, no decision authority)
Month 3     · 2026-07-30 — pivot-decision-tree.md fires · Branch A / B / C decision
Month 4.5   · 2026-09-15 — Post-pivot mid-point (Branch B only)
Month 6     · 2026-10-30 — Sunset window opens (Branch C only)
```

---

## 2. Per-phase execution plan

### Month 0 → 0.5 · SOAK · 2026-04-30 → 2026-05-14

**Already shipped this cycle** (no further action required):
- axe-core CI weekly cron (commit chain `4be4683+`)
- `datePublished` + `dateModified` on chord/song schema (commit `55c63ee`)
- Single FAQPage per route — Search Console duplicate fix (commit `2f1c225`)
- `sitemap.xml` lastmod auto · `robots.txt` Sitemap declaration (verified per O-audit `2026-04-30`)
- `keystrum` Topics 12 + npm keywords 11 (commit `9edda17`)
- README "From the maker" Founder story (commit `2de11d6`)

**Active during SOAK**:
- Manually request recrawl in Google Search Console for the home page and one chord page (`/chords/c-major`) — operator action only, Claude does not automate (token setup blocked).
- Resubmit `sitemap.xml` if any indexing warning persists.
- Monitor weekly: indexed-page count, click-impressions, query-CTR.

**Forbidden during SOAK**:
- Any new chord page
- Any new song page
- Any new schema entity
- Any new doc category that would expand the surface area before the 1st baseline read

Internal-link polish and existing-copy tightening are allowed.

### Month 0.5 → 1.5 · Post-SOAK · 2026-05-14 → 2026-06-14

**Allowed (organic-only)**:
- `/about` page expertise expansion — close partial gap from `brand-identity.md` §4 (the 1 partial out of 9 touchpoints)
- Cited-source list per chord page (Wikipedia URL + canonical music-theory references) — E-E-A-T Trust reinforcement
- `<time>` semantic HTML alongside Schema `datePublished` — additional Trust signal at HTML level
- Internal-link audit: every chord page should link to at least one song page using that chord, and vice versa
- Pull-signal counter: weekly count of unsolicited PR / unsolicited tweet / unsolicited Reddit mention (currently 0)

**Still forbidden**:
- New chord pages — wait for Pull signal before expansion
- New song pages — same gate
- Any AI-generated theory / mistakes / practice-tip text
- Translation work without an organic translator volunteer (do not crowdsource via cold DM)

### Month 1.5 → 3 · Conditional expansion · 2026-06-14 → 2026-07-30

**If Pull signals appear** (organic clicks > 5 / week OR ≥ 1 unsolicited mention OR ≥ 1 unsolicited PR):
- Manual chord variations: `maj7`, `sus4`, `add9` — each new chord page authored or reviewed by the maintainer. Each page must clear the `§3` quality gate below.
- Manual song additions: only public-domain or chord-progression-only (per `73be72d` Britpop pattern — chord progression itself is not copyrighted, song title generalized for safety). Cap: 1–2 new songs.

**If no Pull signals**: hold all expansion. Adding content without baseline traffic is wasted effort and increases maintenance burden.

### Month 3 · Pivot review · 2026-07-30

`pivot-decision-tree.md` fires. SEO actions then split by branch:

**Branch A (PMF reached — all 3 trigger metrics ≥ threshold)**:
- Phase 2 entry. Permitted SEO actions:
  - i18n: ko · ja · es per `cs.md` tier-1 segment expansion. **Human translation only — no machine translation, no LLM translation.** Translator credit on each localized page.
  - Light/dark theme markup (no SEO impact, but enables #4 Social-proof category by improving accessibility footprint)
  - Chord library expansion: 6 → 12 chords, manual authorship
  - Programmatic SEO: only if the maintainer can guarantee 1 unique 800+ word article per chord. If not, skip — `pSEO 50 페이지 확장` (통합.md TOP 10 #10) is rejected by default under solo-dev constraint.

**Branch B (1 trigger weak — targeted pivot)**:
SEO actions follow the chosen pivot type:
- **Customer-segment pivot**: Hero copy + chord-set ordering + song-selection rewrite to address the new target segment.
- **Customer-need pivot**: launch-page variants — `keystrum.app/ear-training`, `keystrum.app/dictionary`, `keystrum.app/progressions` — only one variant at a time.
- **Engine-of-growth pivot**: deepen `?prog=` discoverability surfaces (already at commit `588d9ed`). Add `?ref=` referral attribution. Add chord-progression OG cards.
- **Channel pivot**: dedicated landing for `@keystrum/synth` + `@keystrum/layout` npm packages. New page at `/dev` with code samples and TypeScript type docs.

**Branch C (all triggers weak — sunset preparation)**:
- Stop new SEO content
- README archive banner draft
- Maintain `sitemap.xml` for existing pages until domain expiry decision

### Month 3 → 4.5 · Post-pivot iteration · 2026-07-30 → 2026-09-15 (Branch B)

- One change at a time, in `pivot-decision-tree.md` priority order (segment > engine-of-growth > zoom-in > channel > customer-need > technology).
- Re-measure 3 trigger metrics after 6 weeks.
- Improvement → continue. Flat → escalate to next pivot type.

### Month 4.5 → 6 · Sunset window · 2026-09-15 → 2026-10-30 (Branch C only)

- `gh repo archive kimhinton/keystrum`
- README banner: *"archived: insufficient PMF after 6 months · forking welcome"*
- Domain `keystrum.app` kept (cost negligible, prevents squatting)
- Post-mortem on `kimhinton/README` post-mortem section
- Memory entry: `project_keystrum_sunset_2026_10`

---

## 3. Page quality gate (always, every chord/song page)

Every new or modified chord/song page must satisfy:

1. **800+ words** of human-authored context — theory · common mistakes · practice tip · famously-used songs.
2. **`datePublished` + `dateModified`** in JSON-LD (commit `55c63ee` pattern).
3. **Schema entities (single per page)**: MusicComposition + HowTo + (FAQPage if applicable, but never duplicate per κ commit `2f1c225`).
4. **Wikipedia + canonical citation** in the page footer or theory section.
5. **No AI-generated paragraphs** — Google E-E-A-T penalty risk. Snippets / autocomplete OK; full paragraphs not.
6. **Internal linking**: chord pages link to songs using that chord; song pages link to all chord pages they use.
7. **Image alt text** + WCAG 2.1 AA contrast (axe-core CI binding).

---

## 4. Measurement plan

| Metric | Source | Cadence | Branch A trigger |
|---|---|:-:|---|
| Indexed pages | Google Search Console | weekly | ≥ 16 (current ≈ 8) |
| Organic clicks (acquisition share) | Google Search Console | weekly | ≥ 20% (PMF target 40%) |
| Sean Ellis "very disappointed" | localStorage in-app prompt | n ≥ 30 unique users | ≥ 40% |
| D30 retention | localStorage AARRR funnel | monthly | Consumer ≥ 10% / SaaS ≥ 30% |
| Star count | `gh api repos/kimhinton/keystrum` | weekly | ≥ 100 |
| Unsolicited PR | `gh api` | weekly | ≥ 1 / month |
| External mentions | manual web search `"keystrum"` | quarterly | ≥ 1 / quarter (Pull-signal floor) |

Per-review reports: `docs/business/pmf-review-YYYY-MM.md` (one new file per review per `pivot-decision-tree.md` mandate).

---

## 5. Cross-references

- [`docs/business/cs.md`](../business/cs.md) — 4-tier segment matrix drives i18n priority on Branch A
- [`docs/business/vp-statement.md`](../business/vp-statement.md) — POP/POD informs comparison-table SEO and meta-keywords
- [`docs/business/pmf-absence-checklist.md`](../business/pmf-absence-checklist.md) — defines the 3 trigger metrics; SaaS analytics permanently blocked
- [`docs/business/brand-identity.md`](../business/brand-identity.md) — 5-keyword Core preserves SEO content tone
- [`docs/business/pivot-decision-tree.md`](../business/pivot-decision-tree.md) — Branch A/B/C decision authority at ~2026-07-30
- [`docs/business/storytelling.md`](../business/storytelling.md) — Hero copy + Founder story consistency on every Phase-2 migration
- [`docs/business/differentiation.md`](../business/differentiation.md) — feature-creep audit binds SEO content additions
- 미적용/부1_마케팅/단원7_Acquisition_pSEO.md §7.6.2 + 통합.md TOP 10 #10 (pSEO 50 페이지 확장은 본 plan에서 default reject — manual-only expansion only)
- Memory: `feedback_no_monetization` · `feedback_no_awesome_list_work` · `feedback_no_cold_contact_no_token_setup` · `feedback_pre_pmf_phase_separation` · `project_keystrum_awesome_list_pattern` · `project_keystrum_session_2026_04_29`

---

## 6. Sources

- Google Search Central. *Search Quality Rater Guidelines* (2025) — E-E-A-T four dimensions.
- LowFruits (2025). *Deindexing recovery patterns* — 1–2 week to 6-month recovery window observed.
- Cross-ref: 부1 단원7 §7.6.2 (P1, 1h) + 통합.md TOP 10 #10 (pSEO scaling — handled by §3 quality gate).

---

**Status**: ✓ 6-month timeline aligned with `pivot-decision-tree.md` + `pmf-absence-checklist.md` · 5 immutable constraints · per-phase execution with explicit Branch-A/B/C SEO actions · 7-point quality gate per chord/song page · 7-metric measurement schedule with thresholds.
**Issued**: 2026-04-30 · **Operator**: kimhinton · **Re-audit**: at each pivot-review (~2026-07-30 first).
