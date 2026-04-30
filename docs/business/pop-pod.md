# Points of Parity / Points of Difference — keystrum (2026-04-30)

> Source: 미적용/부1_마케팅/단원3_브랜드관리.md §3.4 + 통합.md TOP 10 #9
> Reference: Keller (2003) *Strategic Brand Management* — POP / POD framework
> Cross-ref: [`brand-identity.md`](./brand-identity.md) (5-keyword Core) · [`vp-statement.md`](./vp-statement.md) (POD partial, expanded here) · [`differentiation.md`](./differentiation.md) (6-category map)
> Scope: POP / POD codified vs 6 named alternatives + 5-keyword Core preservation check + 8-surface audit

---

## 0. Framework

- **POP** (Points of Parity) — features users expect from the category. Lacking POP means you are not considered at all.
- **POD** (Points of Difference) — features that distinguish you. Lacking POD means you are interchangeable.

A category leader holds full POP + ≥1 strong POD. A new entrant must show POP coverage ≥ 80% + ≥1 sharp POD.

---

## 1. POP coverage matrix (§3.4.1)

| POP feature | keystrum | Yousician | Fender Play | Chordify | Ultimate Guitar | Simply Guitar | Online piano apps |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Chord library | ✓ (6 → manual expansion only) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Chord visualization | ✓ (4-row × 6-col QWERTY map) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Sound playback | ✓ (Karplus-Strong) | mic input | video | sampled | sampled | sampled | sampled |
| Mobile responsive | ✓ (PWA · tap-area `9bd33f3`) | app | app | ✓ | ✓ | ✓ | varies |
| Search | partial | ✓ | ✓ | ✓ | ✓ | ✓ | varies |
| Practice mode | ✓ (4 songs) | ✓ (1500+) | curated | ✓ | ✓ | ✓ | varies |
| Progression viewer | ✓ (`?prog=` share URL `588d9ed`) | ✓ | ✓ | ✓ | ✓ | partial | N/A |

**POP score**: keystrum 6.5 / 7. Category-entry threshold (≥ 5.6 / 7) cleared.

### POP gap action

| Feature | Status | Action |
|---|:-:|---|
| Search | partial | acceptable at Pre-PMF scale; internal links + sitemap suffice. Re-evaluate at Branch A entry per [`pivot-decision-tree.md`](./pivot-decision-tree.md). |

No further POP work required this cycle.

---

## 2. Points of Difference (§3.4.2 — 3 sharp + 1 secondary)

### POD #1 — Browser-only · zero friction
- No install (PWA optional, runs in any tab)
- No account · no email · no signup
- localStorage only — user data never leaves the device
- Karplus-Strong synthesis runs offline after first load
- **Closest competitor**: none. Yousician / Fender Play / Simply Guitar require app install + account. Chordify requires account for full features. Ultimate Guitar requires account for tabs.

### POD #2 — Karplus-Strong physical-modeling synthesis (1983 lineage)
- Algorithm-based, not sample-based
- Sounds like a plucked string because the physics is similar
- Ships as a few hundred bytes of code instead of multi-megabyte samples
- Same family of algorithms used in research-grade physical-modeling instruments
- **Closest competitor**: none in this user category. Online piano apps use sampled audio. Browser guitar simulators are rare and almost always sample-based.

### POD #3 — 4-row strum mechanics (QWERTY → guitar-string mapping)
- Four QWERTY rows = four guitar strings (E4 / B3 / G3 / D3)
- Six columns = six diatonic chords (Am · C · Em · G · Dm · F)
- Column sweep top-to-bottom in < 90 ms = downstroke; bottom-to-top = upstroke
- Mute keys J / K / L / `;` for percussive accents
- **Closest competitor**: none. No other browser instrument maps QWERTY to a guitar in this layout.

### POD #4 (secondary) — MIT no-lock-in + Wellbeing-first
- MIT licensed, source on GitHub
- No streak guilt · no shame counters · no forced daily missions · no push notifications · no ads · no Pro tier ever
- 25-min Wellbeing nudge (commit `7bb0e68`)
- Solo Singapore-based maintainer (per `storytelling.md` §2)
- **Closest competitor**: open-source projects exist in adjacent categories, but none combine OSS + Wellbeing-first + browser-only in this exact way.

→ **3 sharp + 1 secondary POD**. Keller's threshold (≥ 1 strong POD) is exceeded.

---

## 3. POD vs 5-keyword Core preservation (§3.4.3)

Each POD must reinforce, never contradict, the 5-keyword Core in `brand-identity.md` §1:

| POD | browser-only | Karplus-Strong | chord-trainer | active-recall | MIT no-lock-in |
|---|:-:|:-:|:-:|:-:|:-:|
| #1 Browser-only · zero friction | ✓ | — | ✓ | — | ✓ |
| #2 Karplus-Strong synthesis | — | ✓ | — | — | — |
| #3 4-row strum mechanics | ✓ | ✓ | ✓ | — | — |
| #4 MIT + Wellbeing (secondary) | — | — | — | partial | ✓ |

Coverage: every Core keyword is reinforced by at least one POD. No POD violates a keyword. Active-recall is the weakest-covered keyword (only POD #4 partial); this is acceptable because it surfaces directly in `/me` and the 3-layer learning engine, not as a positioning axis.

---

## 4. Where POP / POD surface on the site (8-surface audit)

| Surface | POP/POD reflected | Status |
|---|---|:-:|
| Hero (`/`) | "What if your keyboard was the guitar?" — POD #3 mechanics + #1 browser-only | ✓ |
| README "How keystrum compares" table | full POP table + POD per row | ✓ (existing) |
| README "Why keystrum?" 4-segment narrative | POD #1 and #2 ground each segment's case | ✓ |
| `/chords/[name]` keyboard column visualization | POD #3 mechanics | ✓ |
| `/chords/[name]` Karplus-Strong dedicated note | POD #2 synthesis | partial — mention exists, no dedicated section yet |
| `/play/[song]` credit + composer Traditional | POD #4 MIT + Wellbeing tone | ✓ |
| `/me` Today-vs-Yesterday + 25-min nudge | POD #4 Wellbeing | ✓ |
| `/privacy` "No data · No tracking · No accounts" | POD #1 + #4 lock-in | ✓ |

→ 8 surfaces audited; 7 clean, 1 minor partial (Karplus-Strong dedicated section on chord pages — small follow-up, low priority and not blocking).

---

## 5. Competitor decision rule

When a user evaluates keystrum against a competitor, the position to take is fixed:

| Competitor | Their POD | keystrum's response |
|---|---|---|
| Yousician | structured curriculum + 1500+ songs | "Use Yousician for curriculum; use keystrum for the 5-minute chord-change drill when your guitar is out of reach." (already in README "Coming from another tool?") |
| Fender Play | brand authority · production quality | acknowledge; do not compete on production. Compete on browser-only + zero friction. |
| Chordify | tab + chord lookup for existing recordings | different jobs-to-be-done. "Chordify finds the chords; keystrum lets you feel them on a keyboard." |
| Ultimate Guitar | massive tab archive | out of scope. Different category. |
| Simply Guitar | structured beginner course | use it for fingering on a real guitar. keystrum is the chord-progression sketch layer. |
| Online piano apps | sampled piano | different instrument. POD #3 is irrelevant to keyboard-piano users; do not pursue them. |

**Feature-decision rule**: every proposed feature must sharpen POD #1 / #2 / #3 OR be neutral. Anything that dilutes a POD by chasing a competitor's strength is rejected per [`differentiation.md`](./differentiation.md) §3 anti-creep audit.

---

## 6. Maintenance rule

Re-audit this document when:
- A POD surface in §4 changes (e.g., redesigned Hero copy, new chord page section)
- A new competitor enters the category and changes POP coverage expectations
- The 5-keyword Core in `brand-identity.md` is updated
- Branch A is reached at month-3 review (PMF reached → POD axes may need re-validation against a larger user base)

If a POD weakens (e.g., a competitor matches POD #1 by going browser-only too), escalate to `pivot-decision-tree.md` Branch B Customer-segment or Customer-need pivot.

---

## 7. Cross-references

- [`docs/business/cs.md`](./cs.md) — 4-tier customer segments; each segment evaluates POD in its own context (commit `ea8704a`)
- [`docs/business/vp-statement.md`](./vp-statement.md) — Moore template; POD partial expanded here (commit `295dd6b`)
- [`docs/business/brand-identity.md`](./brand-identity.md) — 5-keyword Core preservation check (§3 above) (commit `ace7a17`)
- [`docs/business/pmf-absence-checklist.md`](./pmf-absence-checklist.md) — Pre-PMF context for POP gap acceptability (commit `49bc34d`)
- [`docs/business/pivot-decision-tree.md`](./pivot-decision-tree.md) — POD weakening triggers Branch B pivot (commit `8c99f90`)
- [`docs/business/storytelling.md`](./storytelling.md) — POD #4 surfaces in Founder story (commit `2de11d6`)
- [`docs/business/differentiation.md`](./differentiation.md) — 6-category map; PODs are categories #1, #3, #6 reframed as user-perceived advantages (commit `700ff15`)
- [`docs/seo/6-month-plan.md`](../seo/6-month-plan.md) — POD reinforcement priority drives Phase 2 SEO actions (commit `ff4beb9`)
- 미적용/부1_마케팅/단원3_브랜드관리.md §3.4 + 통합.md TOP 10 #9

---

## 8. Sources

- Keller, K. L. (2003). *Strategic Brand Management* — POP / POD framework, brand mantra.
- Cross-ref: 부1 통합.md TOP 10 #9 (POP/POD 작성).

---

**Status**: ✓ POP score 6.5 / 7 (1 acceptable partial) · 3 sharp PODs + 1 secondary · 5-keyword Core preservation verified · 8-surface audit (7 clean · 1 minor) · 6-competitor decision rule fixed · feature-decision rule binds future intake to PRs.
**Issued**: 2026-04-30 · **Operator**: kimhinton · **Re-audit**: when a POD surface changes / new competitor / Core update / Branch A reached.
