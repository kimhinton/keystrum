# Pivot Decision Tree — keystrum (2026-04-30)

> Source: 미적용/부3_사업/단원2_PMF_정의측정.md §2.5.4
> Reference: Ries (2011) *The Lean Startup* — 10 pivot types · Andreessen (2007) PMF · Christensen (2003) *Innovator's Solution*
> Trigger: 3-month baseline review (~2026-07-30) of three Pre-PMF metrics established in `pmf-absence-checklist.md`.
> Authority: This document binds the next pivot decision. Any change to pivot policy outside this tree must update the doc first.

---

## 0. Decision-trigger metrics

Three PMF signals jointly determine the pivot decision at the 3-month review (~2026-07-30):

| Metric | PMF threshold | Source | If unmeasurable |
|---|:-:|---|---|
| **Sean Ellis "very disappointed" share** | ≥ 40% (n ≥ 30) | In-app prompt only (cold contact 영구 BLOCKED per `feedback_no_cold_contact_no_token_setup`) | Treat as below threshold |
| **D30 retention** | ≥ 10% Consumer / ≥ 30% SaaS | localStorage AARRR funnel (commit `78889a5`) — denominator must reach n ≥ 50 | Treat as below threshold |
| **Organic acquisition share** | ≥ 20% (target 40% for PMF) | Google Search Console + manual referrer audit | Treat as below threshold |

**Hard constraint**: any analytics setup that requires a SaaS account / API token (Plausible, GA4, PostHog, Umami) is permanently blocked per memory rule. Use only localStorage AARRR + Google Search Console.

---

## 1. Decision tree (3-month review at ~2026-07-30)

```
                        Measure 3 metrics
                              │
          ┌───────────────────┼────────────────────┐
          │                   │                    │
   ALL ≥ threshold      SOME ≥ threshold      ALL < threshold
          │                   │                    │
          ▼                   ▼                    ▼
     PMF reached       Targeted pivot        Hard pivot or
   (Phase 2 entry)     (single dimension)        sunset
```

### Branch A — All three thresholds met → PMF reached
**Action**: Enter Phase 2 (memory `feedback_pre_pmf_phase_separation`).
- Resume visible UX migration: light/dark theme (#23) · i18n (#17) · logo refinement
- Continue cold-contact-zero policy (organic Pull is now self-sustaining)
- Monetization remains permanently blocked per memory `feedback_no_monetization`

### Branch B — Partial signal → Targeted pivot

| Pattern | Diagnosis | Pivot type (Ries) |
|---|---|---|
| Sean Ellis ≥ 40% · retention/organic weak | Right product, weak distribution | **Engine-of-growth pivot** (sticky/viral) |
| D30 ≥ 10% · Sean Ellis weak | Used but not loved by current users | **Customer-need pivot** (different need, same users) |
| Organic ≥ 20% · Sean Ellis/retention weak | Discovered by wrong audience | **Customer-segment pivot** (target a different cs.md tier) |
| Two of three weak | Mismatch on 2+ axes | **Zoom-in pivot** (narrow scope) — start there before larger moves |

### Branch C — All three below → Hard pivot or sunset

| Sub-condition | Action |
|---|---|
| Any single metric > 50% of threshold (signal of life) | One Customer-segment pivot OR Zoom-in pivot — 6-week experiment, then re-measure |
| All metrics < 50% of threshold AND month 6 reached | **Sunset**: archive repo · README marked "archived: insufficient PMF after 6 months · forking welcome" · domain kept · MIT preserved |

---

## 2. Pivot option matrix (Ries 10 types, scoped to keystrum)

| # | Pivot type | Effort | Risk | keystrum fit | Notes |
|:-:|---|:-:|:-:|:-:|---|
| 1 | Customer-segment | low | medium | ⭐⭐⭐ | `cs.md` already defines 4 tiers (beginners / DAW producers / late-night jammers / teachers). Switch focus segment via copy + Hero rewrite — no architectural change. |
| 2 | Customer-need | medium | medium | ⭐⭐ | chord practice → ear training / theory teaching / live-performance backing. Requires UI re-arch but reuses Karplus-Strong + 4-row strum. |
| 3 | Zoom-in (narrow scope) | medium | low | ⭐⭐⭐ | chord trainer → chord-dictionary only · OR · progression-library only · OR · pure strum-mechanics. Pre-PMF natural simplification. |
| 4 | Zoom-out (broaden scope) | high | high | ⭐ | "general music education platform" — over-engineering risk under solo-dev constraint. Avoid. |
| 5 | Platform | high | high | ⭐ | keystrum-as-app → keystrum-as-embed-library (npm package). Reasonable as a *channel* pivot, not a platform pivot per se. |
| 6 | Business-architecture | — | — | ❌ | Margin-volume re-balance is monetization-adjacent. Permanently blocked per memory `feedback_no_monetization`. |
| 7 | Value-capture (monetization) | — | — | ❌ | All Pro tier / Sponsors / pricing options permanently blocked. Not on this tree. |
| 8 | Engine-of-growth | low | low | ⭐⭐⭐ | Sticky: deepen Stored Value (commit `532ec85`) + SM-2 due-soon nudges. Viral: amplify `?prog=` share-URL surface area, add `?ref=` referral attribution. **Paid is permanently blocked.** |
| 9 | Channel | low | low | ⭐⭐ | Direct (keystrum.app) → npm-package embed (`@keystrum/strum-trainer`) for music-education sites. OSS distribution — natural fit. |
| 10 | Technology | high | high | ⭐ | Web Audio Karplus-Strong → MIDI-first / VST plugin / native-mobile-first. Architectural rewrite — last resort. |

---

## 3. Recommended decision sequence (under partial signal, Branch B)

If forced to pick a single first pivot, the order of preference is:

1. **#1 Customer-segment** — cheapest reversible move; existing `cs.md` map makes it executable in 1–2 days (Hero copy + chord set ordering + song selection).
2. **#8 Engine-of-growth** — sticky/viral tweaks; code-only; reuses existing surfaces.
3. **#3 Zoom-in** — narrow scope to dictionary OR progression library only; reduces maintenance.
4. **#9 Channel (npm embed)** — packages existing logic for OSS distribution.
5. **#2 Customer-need** — only after #1 confirms wrong-audience hypothesis.
6. **#10 Technology** — only after 2+ failed targeted pivots and clear root-cause attribution to the runtime.

Items #4 (Zoom-out), #5 (Platform), #6/#7 (monetization-related), and any cold-contact channel are **off the menu**.

---

## 4. Pivot vs persevere decision (Branch A intermediate state)

If exactly 2 of 3 metrics meet threshold but the third hovers within 25% below:

| Sub-pattern | Action |
|---|---|
| Sean Ellis = 30–39% · others passing | **Persevere 6 more weeks** — collect more responses, do not pivot |
| D30 = 7.5–9.9% · others passing | Persevere · audit `/me` retention surfaces |
| Organic = 15–19% · others passing | Persevere · audit SEO surfaces (sitemap freshness, internal linking) |

**Trap to avoid**: false positive from a single in-app prompt cluster. Sean Ellis n must be ≥ 30 *unique users* before treating the share as decision-grade.

---

## 5. Sunset criteria (Branch C terminal)

If at month 6 (~2026-10-30) all three metrics are still below 50% of their PMF thresholds AND no single targeted pivot from §3 produced movement:

| Action | Detail |
|---|---|
| Repo state | `gh repo archive kimhinton/keystrum` |
| README | Append top section: *"archived: insufficient PMF after 6 months. forking welcome — MIT."* |
| Domain | Keep `keystrum.app` (cost negligible · prevents squatting) |
| License | MIT preserved · contributors retain rights |
| Communication | One short post on `kimhinton/README` post-mortem section · no PR to anywhere |
| Memory | Add `project_keystrum_sunset_2026_10` |

This is **not** failure — it is a clean finish. Andreessen 2007 explicitly notes that most products do not reach PMF; archiving honestly preserves credibility for the next attempt.

---

## 6. Re-measurement schedule

| Date | Action |
|---|---|
| ~2026-05-14 | SOAK end · first metric polling (numbers expected at baseline ≈ 0) |
| ~2026-06-14 | Month-1.5 mid-point check (no decision authority — observation only) |
| **~2026-07-30** | **Month-3 review · this tree fires.** Branch A / B / C decision committed in writing. |
| ~2026-09-15 | Month-4.5 mid-point of post-pivot 6-week window (if Branch B) |
| ~2026-10-30 | Month-6 review · sunset decision authority (Branch C only) |

Each review writes a one-page summary to `docs/business/pmf-review-YYYY-MM.md` (new file each time).

---

## 7. Cross-references

- [`docs/business/cs.md`](./cs.md) — 4-tier customer segments (commit `ea8704a`) · directly maps to Customer-segment pivot options
- [`docs/business/vp-statement.md`](./vp-statement.md) — Moore template + Osterwalder 11-element (commit `295dd6b`)
- [`docs/business/pmf-absence-checklist.md`](./pmf-absence-checklist.md) — establishes the 3 trigger metrics (commit `49bc34d`)
- [`docs/business/brand-identity.md`](./brand-identity.md) — 5-keyword Core that pivots must preserve (commit `ace7a17`)
- 미적용/부3_사업/단원2_PMF_정의측정.md §2.1 (PMF definition) · §2.3 (Pre-PMF behavior) · §2.5 (PMF workbooks)
- Memory: `feedback_no_monetization` (rules out pivots #6/#7) · `feedback_no_awesome_list_work` (rules out #9 to awesome-lists) · `feedback_no_cold_contact_no_token_setup` (rules out cold-channel pivots) · `feedback_pre_pmf_phase_separation` (Phase 2 entry only on Branch A)

---

## 8. Sources

- Ries, E. (2011). *The Lean Startup.* Crown Business. — 10 pivot types (Zoom-in / Zoom-out / Customer-segment / Customer-need / Platform / Business-architecture / Value-capture / Engine-of-growth / Channel / Technology).
- Andreessen, M. (2007). *The only thing that matters.* — PMF original definition.
- Christensen, C. (2003). *The Innovator's Solution.* Harvard Business Press. — disruption framework cross-reference.
- Sean Ellis (2009). *40% Rule* — survey threshold.
- Cross-ref: 부3 단원2 §2.5.4 (P1, 2h) `pivot-decision-tree.md`.

---

**Status**: ✓ 3-branch decision tree codified · 10 pivot types scoped to keystrum constraints · 4 BLOCKED categories explicit · sunset criteria precise · re-measurement schedule fixed.
**Issued**: 2026-04-30 · **Operator**: kimhinton · **Fires**: ~2026-07-30 (month-3 review) · **Sunset window opens**: ~2026-10-30 if Branch C.
