# PMF Absence Self-Diagnosis — keystrum (2026-04-30)

> Source: 미적용/부3_사업/단원2_PMF_정의측정.md §2.1.3
> Reference: Andreessen 2007 (PMF 원전) · Sean Ellis 2009 (40% Rule) · Cagan 2017 (Inspired, Pre-PMF customer development)
> **Verdict: 5/5 signals all match → Pre-PMF confirmed → sales / paid acquisition / cold contact permanently 0, customer development + iterate only.**

---

## 0. Pre-PMF Baseline (2026-04-30)

| Metric | Current | PMF Threshold | Gap |
|---|:-:|:-:|:-:|
| GitHub stars | 2 (self + 1 friend) | 100+ (organic) | 50× |
| Followers | 1 | — | — |
| Organic clicks (Google) | 1 / 14 days | meaningful trend | ~0 |
| Unsolicited PR | 0 | 1+ / month | 0 |
| Sean Ellis "very disappointed" | n=0 (unmeasured) | 40%+ (n≥30) | not measurable |
| D30 retention | baseline absent | Consumer 20%+ | not measurable |
| Word of Mouth (organic %) | ~0% | 40%+ | ~0 |

→ proceed to 5-signal self-diagnosis.

---

## Signal 1 — Urge to push sales / paid acquisition

**Definition** (Andreessen 2007): At Pre-PMF, the operator must actively *push* the product to get any traffic. At PMF, customers *pull* the product — even when blocked, they come in.

**keystrum self-check**: ✓ matches
- 3 awesome-list PR attempts → 0 survived (PR #85 merged, deleted 8 days later · awesome-devops #408 CI-blocked · 1 closed). Verified pattern in memory `project_keystrum_awesome_list_pattern`.
- Recurrent urge: Show HN, Product Hunt, Reddit launch.
- Recurrent urge: cold DM, mailing-list outreach.

**Decision**: Sales / paid acquisition / cold contact permanently 0 until Sean Ellis 40% + ★100 reached.
References: memory `feedback_no_cold_contact_no_token_setup`, `feedback_no_awesome_list_work`.

---

## Signal 2 — Word of Mouth absent

**Definition** (Sean Ellis 2009): organic acquisition share < 40% = PMF absent. Users do not voluntarily share with peers.

**keystrum self-check**: ✓ matches
- 14-day cumulative organic clicks: 1 (Google Search Console).
- Unsolicited tweets: 0 · unsolicited PRs: 0 · community-generated content: 0.
- Followers: 1.

**Decision**: Even if traffic is bought, retention will not stick (WoM = 0 → CAC recovery = 0). Hold paid acquisition at 0.

---

## Signal 3 — Churn / retention not measurable

**Definition**: D1 / D7 / D30 cohort retention is absent or denominator is too small to be meaningful.

**keystrum self-check**: ✓ matches (instrumentation present, denominator absent)
- AARRR funnel localStorage applied (commit `78889a5`: `firstAudioAt` + `recordFirstAudio` + `/me` AARRR card).
- However, user count ≈ 0 → no meaningful cohort forms.
- SaaS analytics (Plausible / Umami / GA4 / PostHog) account / token setup blocked per memory `feedback_no_cold_contact_no_token_setup`.

**Decision**: Keep localStorage funnel + accumulate baseline through natural polling. No SaaS token setup.

---

## Signal 4 — Press / PR / external-validation thirst

**Definition**: Substituting external visibility for actual *pull*. Imagining PMF will appear once "the right list / the right press" notices the product.

**keystrum self-check**: ✓ matches
- 3 awesome-list attempts → 0 survived (`project_keystrum_awesome_list_pattern`).
- Recurrent urges: HN front page, Product Hunt launch, Reddit cross-post, tech-media outreach.

**Decision**: All awesome-list work / HN / PH / Reddit launch / press outreach permanently blocked until Sean Ellis 40% + ★100. Reference: memory `feedback_no_awesome_list_work`.

---

## Signal 5 — "One more feature will fix PMF" illusion

**Definition**: Endless feature accumulation under the belief that the next addition will trigger PMF. Real cause is unverified target audience / acquisition channel.

**keystrum self-check**: ✓ matches
- v0.1.0 → v0.2.0 cycle shipped 33 large items: 3-layer learning engine (Active recall + Interleaving + SM-2) · 4-layer Variable Reward · Hooked closure · Flow zone · McGurk cache · WCAG 2.1 AA clean (12→0 axe violations) · ARIA dynamic content · 25-min Wellbeing nudge · brand CSS migration (21 files / ~85 occurrences) · PWA enrichment + SW v2 · metronome · 4th demo song (Britpop) · mobile tap-area height fix · no-lock-in framing · FAIL→MISS terminology · Today vs Yesterday positive delta · AEO/GEO Schema · AARRR localStorage · Pre-suasion · Cialdini 4 applied / 2 blocked · Unity footer · Response-time SLA · BMC + VP statement docs.
- Functionally sufficient. Yet **Pull signal = 0** → feature insufficiency is *not* the cause of PMF absence.
- Real cause: target-audience verification + acquisition-channel verification absent (constrained by cold-contact-zero policy → natural inbound only).

**Decision**: SOAK 1–2 weeks (~2026-05-14 resume) + zero new feature work. Baseline measurement + customer development (natural inbound responses only).

---

## 6. Consolidated Policy

| Domain | Policy |
|---|---|
| Sales / paid acquisition / cold contact | Permanent 0 until Sean Ellis 40% + ★100 |
| Monetization (Pro tier · Sponsorware · Sponsors tiers · pricing) | Permanently blocked (memory `feedback_no_monetization`) |
| Awesome-list work (any) | Permanently blocked (memory `feedback_no_awesome_list_work`) |
| SaaS analytics token setup (Plausible · GA4 · PostHog) | Blocked — localStorage funnel only |
| New feature development | Hold until SOAK ends + 5+ customer interviews + retention baseline |
| Phase 1 (infra · docs · non-visible SEO) | Allowed — this document is one such item |
| Phase 2 (visible UX migration · light/dark · i18n) | Hold until ~50 active users (memory `feedback_pre_pmf_phase_separation`) |
| HN / PH / Reddit / press launch | Hold until Sean Ellis 40% + ★100 |

---

## 7. Next Measurement Cursor

- **~2026-05-14**: Google index recovery check + localStorage AARRR retention baseline 1st review.
- **Sean Ellis n=30**: cold-contact-zero policy stays. In-app prompt allowed (no DM / email / cold outreach). Wait for natural inbound responses.
- **Pull-signal monitoring**: count of unsolicited PRs / unsolicited tweets / unsolicited Reddit mentions per week (currently 0).

Re-run this checklist quarterly OR whenever any of the 7 baseline metrics moves materially.

---

## 8. Cross-references

- `.state.yaml` cursor: `SOAK_PHASE_DAY_1` → resume target ~2026-05-14
- [`docs/business/cs.md`](./cs.md) — 4-tier × 4-axis CS niche segments (commit `ea8704a`)
- [`docs/business/vp-statement.md`](./vp-statement.md) — Moore template + Osterwalder 11-element self-eval (commit `295dd6b`)
- 미적용/부3_사업/단원2_PMF_정의측정.md §2.1, §2.3, §2.5
- Memory: `feedback_no_monetization` · `feedback_no_awesome_list_work` · `feedback_no_cold_contact_no_token_setup` · `feedback_pre_pmf_phase_separation` · `project_keystrum_awesome_list_pattern` · `project_keystrum_session_2026_04_29`

---

## 9. Sources

- Andreessen, M. (2007). *The only thing that matters.* PMF original definition (pmarchive.com archive).
- Ellis, S. (2009). *Find PMF before scaling marketing* — 40% Rule (startup-marketing.com archive).
- Cagan, M. (2017). *Inspired*, Ch. 4 — Pre-PMF customer development.

---

**Status**: ✓ Self-diagnosis complete. **Verdict: Pre-PMF confirmed (5/5).**
**Issued**: 2026-04-30 · **Operator**: kimhinton · **Next review**: ~2026-05-14 (post-SOAK).
