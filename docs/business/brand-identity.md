# Brand Identity Workbook — keystrum (2026-04-30)

> Source: 미적용/부1_마케팅/단원3_브랜드관리.md §3.2 + 통합.md TOP 10 #6
> Reference: Aaker (1996) Brand Identity model · Aaker (1997) Brand Personality · Keller (2003) CBBE pyramid
> Scope: Identity statement (§3.2.1) · Image baseline (§3.2.2) · Gap diagnosis (§3.2.3, main) · 5-keyword Core (§3.2.4)

---

## 0. Identity vs Image — one line

**Identity** = the brand the strategist intends to build. **Image** = the brand the market actually perceives. The distance between them is the brand-health gap.

keystrum (2026-04-30): Identity is concrete and consistent. Image baseline ≈ 0 (★2 · followers 1 · organic clicks 1 / 14 days) — normal Pre-PMF state.

---

## 1. Identity statement (§3.2.1)

> **Free, browser-based virtual guitar — Karplus-Strong synthesis on QWERTY, by an indie maker. MIT, no account, no lock-in.**

Brand essence (footer Unity): *"From one keyboard guitarist to another."*

### 5-keyword Core (§3.2.4)

1. **browser-only** — install 0, signup 0, instant strum
2. **Karplus-Strong** — 1983 academic synthesis lineage (Wikipedia-cited, not AI generation)
3. **chord-trainer** — 6 chords × 4 strings × strum mechanics + 3-layer learning engine
4. **active-recall** — Active recall + Interleaving + SM-2 (commits `2b4fb83` · `3c651d4` · `2702919`)
5. **MIT no-lock-in** — full data portability via localStorage; no Pro tier ever

These 5 are immutable. Anything that contradicts them must not ship.

---

## 2. Identity — Aaker 4 perspectives

### Brand-as-Product
| Element | keystrum |
|---|---|
| Product scope | Browser-based virtual guitar (QWERTY) |
| Attributes | 6 chords · 4 strings (E4/B3/G3/D3) · Karplus-Strong synthesis · 4-row strum mechanics |
| Quality cues | shadcn/ui · WCAG 2.1 AA clean (12→0 violations) · TypeScript strict · 25-min Wellbeing nudge |
| Uses | Practice chord progressions / explore voicings without an acoustic guitar |
| Country of origin | Solo developer · Singapore |

### Brand-as-Organization
| Element | keystrum |
|---|---|
| Values | Wellbeing first (no forced missions · no push · no ads · no dark patterns · no streak guilt) · No lock-in · Open source · No monetization (permanent) |
| Local vs global | Global · English-only · Singapore-based |
| Heritage | Karplus-Strong (1983) · Web Audio API · open-source musical instruments lineage (Tone.js · Chrome Music Lab) |

### Brand-as-Person (Aaker 1997 personality, 5 axes)
| Axis | keystrum | Evidence |
|---|:-:|---|
| Sincerity | strong ✓ | Pre-PMF self-honest (`pmf-absence-checklist.md`) · no growth hacks · no fake stars · Wellbeing principles |
| Excitement | partial | Variable Reward 4-layer · metronome · Britpop song · 0.5% golden key |
| Competence | strong ✓ | Karplus-Strong · WCAG · 3-layer learning engine · TypeScript strict · axe-core CI |
| Sophistication | minor | Clean dark UI · brand CSS tokens (`--brand` / `--brand-soft` / `--brand-hover`) · Geist typography |
| Ruggedness | weak | not applicable to this category — leave dormant |

### Brand-as-Symbol
- **Visual**: dark keyboard-instrument aesthetic · brand pink `#FF5680` (CSS var, future warm-wood A/B possible at Phase 2)
- **Logo**: minimalist SVG (`src/components/brand/Logo.tsx`)
- **Voice**: friendly · technical · honest

---

## 3. Image baseline (§3.2.2)

| Source | Method | Status (Pre-PMF) |
|---|---|---|
| GitHub stars | `gh api repos/kimhinton/keystrum` | ★2 (self + 1 friend) |
| Followers | `gh api users/kimhinton` | 1 |
| Organic clicks | Google Search Console | 1 / 14 days |
| Issue / Discussion sentiment | Manual read of #14–#23 + Discussion #13 | seed-only, no community discussion yet |
| External mentions | Web search `"keystrum"` | 0 organic mentions |

→ **Image baseline ≈ 0.** Strong Identity does not produce Image without awareness. Per `feedback_no_cold_contact_no_token_setup` and `feedback_no_awesome_list_work`, all push channels are permanently blocked. Pull-signal accumulation only (natural inbound).

Re-measurement: quarterly, or whenever any metric moves materially.

---

## 4. Identity-Image gap diagnosis (§3.2.3 — main)

| Touchpoint | Identity reflected | Image proxy | Gap action |
|---|:-:|:-:|---|
| Hero (`/`) | ✓ mission line + open-loop sub + mystery hint | unknown (analytics ≈ 0) | none — clean |
| `/chords` | ✓ theory · practice tip · Famously-used · datePublished | unknown | none — clean |
| `/play` | ✓ song credit · composer Traditional · datePublished | unknown | none — clean |
| `/me` | ✓ AARRR · Today-vs-Yesterday positive delta · Wellbeing nudge | unknown | none — clean |
| `/privacy` | ✓ "No data · No tracking · No accounts" | unknown | none — clean |
| `/about` | partial | not articulated | About page expertise expand (P1 30m, follow-up cursor) |
| README | partial (mission line + Singapore + MIT) | "random GitHub repo" | Hero's Journey + Founder story (P1 1h, follow-up §3.5 cursor) |
| Topics + keywords | ✓ 12 + 11 (commit `9edda17`) | unknown | none — clean |
| Logo / brand voice | partial (logo minimalist) | unknown | Phase 2 only (~50 active users); permanently held until then |

→ **5 clean · 3 partial · 1 Phase-2 deferred.** The real gap source is *Image formation* (acquisition channel = 0) — not Identity drift. Identity is in good shape; the bottleneck is Pull-signal volume, which is gated by the SOAK + cold-contact-zero policy.

---

## 5. Consistency-enforcement mechanism

On every PR / every large commit, audit these 5 baseline touchpoints for Identity drift:

1. **Hero** — mission line + open-loop sub + mystery hint unchanged (baseline `1d2d5ec` · `81e2e96`)
2. **`/chords`** — theory · practice tip · datePublished present (baseline `2da2d64` · `55c63ee`)
3. **`/play`** — song credit · Public-domain attribution · datePublished present (baseline `73be72d` · `55c63ee`)
4. **`/me`** — Wellbeing nudge mounted · Today-vs-Yesterday positive-delta only (baseline `7bb0e68` · `1006323`)
5. **`/privacy`** — `"No data · No tracking · No accounts"` line present (existing)

Any touchpoint outside this 5: validate against Aaker 4 perspectives (§2 above) before shipping.

---

## 6. Pre-PMF decision summary

| Dimension | Policy |
|---|---|
| Core Identity (5 keywords) | Permanently fixed |
| Identity-strengthening work | Docs-only allowed (this file · §3.5 storytelling · §3.4 POP/POD audit · About page expand) |
| Image-formation work (paid / cold) | Permanently 0 until SOAK ends and Pull signals accrue |
| Touchpoint consistency audit | Required on every large commit |
| Quarterly Image re-measurement | Required (re-run §3 above) |
| Phase 2 visual changes (light/dark · logo refinement · i18n) | Held until ~50 active users (memory `feedback_pre_pmf_phase_separation`) |

---

## 7. Cross-references

- [`docs/business/cs.md`](./cs.md) — 4-tier × 4-axis CS niche segments (commit `ea8704a`)
- [`docs/business/vp-statement.md`](./vp-statement.md) — Moore template + Osterwalder 11-element (commit `295dd6b`)
- [`docs/business/pmf-absence-checklist.md`](./pmf-absence-checklist.md) — Pre-PMF 5/5 self-diagnosis (commit `49bc34d`)
- 미적용/부1_마케팅/단원3_브랜드관리.md §3.1 (Brand Equity) · §3.2 (this) · §3.4 (POP/POD) · §3.5 (Storytelling)
- Memory: `feedback_persona_foreign_identity` (Singapore permanent) · `feedback_no_monetization` · `feedback_pre_pmf_phase_separation`

---

## 8. Sources

- Aaker, D. A. (1996). *Building Strong Brands.* Free Press — Brand Identity (4 perspectives · Core / Extended).
- Aaker, J. L. (1997). *Dimensions of Brand Personality.* Journal of Marketing Research, 34(3) — 5 personality axes.
- Keller, K. L. (2003). *Strategic Brand Management.* CBBE pyramid (recall · recognition · responses · resonance).
- Cross-ref: 부1 통합.md TOP 10 #6 (Brand Identity 1-pager).

---

**Status**: ✓ Identity defined · 5-keyword Core fixed · Image baseline ~0 (Pre-PMF awareness gap) · 9-touchpoint gap analysis · consistency mechanism specified.
**Issued**: 2026-04-30 · **Operator**: kimhinton · **Next review**: quarterly, or on material baseline movement.
