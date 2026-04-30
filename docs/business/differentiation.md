# Differentiation Tactics — keystrum (2026-04-30)

> Source: 미적용/부1_마케팅/단원10_Retention_자동화도구.md §10.3 + 통합.md TOP 10 #8
> Reference: Porter (1985) *Competitive Advantage* — differentiation strategy
> Cross-ref: `cs.md` (4-tier segments) · `brand-identity.md` (5-keyword Core) · `vp-statement.md` (POP/POD)
> Scope: 6-category differentiation framework scoped to keystrum constraints + anti-feature audit

---

## 0. Why differentiation matters at Pre-PMF

Differentiation under awareness ≈ 0 has limited near-term ROI — there is no audience to differentiate to. The reason to lock it now anyway is **defense from feature creep**: when feature requests pile up after launch, the 6-category map decides which fit and which dilute identity.

This document does not ship marketing copy. It locks the differentiation positions and binds future feature decisions to them.

---

## 1. Six categories

| # | Category | Position | Status | Evidence |
|:-:|---|---|:-:|---|
| 1 | UX (interaction) | **0-second start · zero signup · instant strum** | Strong ✓ | No login wall · localStorage-only · `firstAudioAt` AARRR baseline (commit `78889a5`) |
| 2 | UI (visual) | shadcn-grade dark UI · WCAG 2.1 AA clean (12 → 0 axe violations) · brand CSS tokens (`--brand` / `--brand-soft` / `--brand-hover`) | Strong ✓ | commits `4be4683+` axe-core CI · `96cc56b` brand migration (21 files) · `24f15b4` ARIA |
| 3 | Tech (function) | **Karplus-Strong physical-modeling synthesis (1983 lineage) · Web Audio · zero samples · zero downloads** | Strong ✓ | commit `52baf6f` McGurk cache · `@keystrum/synth` standalone package · Wikipedia citation |
| 4 | Social proof (stars) | ★ 2 → 100 target (Sean Ellis 40% gate per `pmf-absence-checklist.md`) | Pre-PMF baseline | `gh api` stars=2 · `pivot-decision-tree.md` Branch A trigger metric |
| 5 | Promotion / acquisition | **Permanent zero**: no Show HN · no PH · no awesome-list · no cold contact · no paid ads · no email list | Permanently BLOCKED | memory `feedback_no_cold_contact_no_token_setup` · `feedback_no_awesome_list_work` · `pmf-absence-checklist.md` policy table |
| 6 | Psychology / engagement | ELM dual-route Hero · Pre-suasion open loop + mystery hint · 4-layer Variable Reward · Hooked closure · 3-layer learning engine · Today-vs-Yesterday positive delta · 25-min Wellbeing nudge | Strong ✓ | commits `1d2d5ec` (ELM) · `81e2e96` (Pre-suasion) · `1785f62` (Variable Reward) · `5375fde` (Hooked) · `2702919`+`2b4fb83`+`3c651d4` (3-layer learning) · `1006323` (delta) · `7bb0e68` (nudge) |

→ **5 strong · 1 Pre-PMF baseline · 1 permanently blocked.** The block on category #5 is intentional and policy-bound — it is **not** a gap. Treating it as a gap would re-introduce cold-contact and awesome-list patterns that have already failed three times (`project_keystrum_awesome_list_pattern`).

---

## 2. Priority of differentiation reinforcement (§10.3.2)

When investment time is limited, reinforce in this order:

1. **#3 Tech** — `@keystrum/synth` standalone package npm publish (channel pivot per `pivot-decision-tree.md` #9) reinforces the Karplus-Strong claim while staying inside cold-contact-zero policy.
2. **#6 Psychology** — additional learning-engine surface area on `/me` (e.g., due-soon chord nudge already at commit `5375fde`). Low cost, no cold contact.
3. **#1 UX** — speed of first audio. Already strong; only worth touching if a regression appears.
4. **#2 UI** — frozen until Phase 2 (~50 active users) per `feedback_pre_pmf_phase_separation`.
5. **#4 Social proof** — naturally accrues from #1/#3/#6 ROI; no direct push.
6. **#5 Acquisition** — permanently 0 work.

---

## 3. Anti-feature audit

Features that would dilute one or more categories are rejected at intake. The audit table is binding:

| Proposed feature | Conflict with category | Verdict |
|---|---|---|
| Login / account / cloud sync | #1 UX (zero friction) | reject permanently |
| Pro tier / paywall | #1 UX (free MIT) + permanent monetization block | reject permanently |
| Sample-based audio (replace synthesis) | #3 Tech (Karplus-Strong lineage) | reject |
| AI-generated chord theory text | #2 UI (handcrafted tone) + Google E-E-A-T penalty | reject |
| Push notifications / forced daily missions | #6 Psychology (Wellbeing principles · 25-min nudge already saturates) | reject permanently |
| Email capture form | #5 Acquisition (cold-contact zero) + #1 UX (zero friction) | reject permanently |
| Streak shame counters / red FAIL | #6 Psychology (no-streak-guilt) | reject permanently (commit `3aadbf2` already removed FAIL→MISS) |
| awesome-list submission | #5 Acquisition (permanent block) + 3 prior attempts → 0 survived | reject permanently |
| AI-revolutionary marketing copy | brand-identity.md tone rules ("Disrupting music education" banned) | reject permanently |
| Translation crowdsource cold DMs | #5 Acquisition (cold contact) | reject; wait for organic translator volunteer |

---

## 4. Maintenance rule

Every new feature proposal (issue · PR · self-suggestion) is audited against the 6 categories before any coding:

1. Does it strengthen one category without weakening another?
2. Does it touch category #5 outside natural Pull-signal channels? → reject.
3. Does it preserve the 5-keyword Core in `brand-identity.md`? → must.
4. If unclear, escalate to `pivot-decision-tree.md`. Most "feature creep" is actually a Customer-need pivot in disguise and belongs at the month-3 review, **not** at v0.x.

The audit lives in PR review; the maintainer is one person, so the audit must be cheap to run mentally — that is what this 6-category list exists for.

---

## 5. Cross-references

- [`docs/business/cs.md`](./cs.md) — segment-by-category fit per tier (commit `ea8704a`)
- [`docs/business/vp-statement.md`](./vp-statement.md) — POP/POD axis (this document is the POD-side codification) (commit `295dd6b`)
- [`docs/business/brand-identity.md`](./brand-identity.md) — 5-keyword Core that all 6 categories must preserve (commit `ace7a17`)
- [`docs/business/pmf-absence-checklist.md`](./pmf-absence-checklist.md) — gates category #4 social-proof escalation (commit `49bc34d`)
- [`docs/business/pivot-decision-tree.md`](./pivot-decision-tree.md) — feature-creep → Customer-need pivot escalation rule (commit `8c99f90`)
- [`docs/business/storytelling.md`](./storytelling.md) — differentiation surfaces in the user's Tests stage (commit `2de11d6`)
- 미적용/부1_마케팅/단원10_Retention_자동화도구.md §10.3 + 통합.md TOP 10 #8
- Memory: `feedback_no_monetization` · `feedback_no_awesome_list_work` · `feedback_no_cold_contact_no_token_setup` · `feedback_pre_pmf_phase_separation` · `project_keystrum_awesome_list_pattern`

---

## 6. Sources

- Porter, M. (1985). *Competitive Advantage: Creating and Sustaining Superior Performance.* Free Press. — Differentiation strategy framework.
- Cross-ref: 부1 통합.md TOP 10 #8 (Differentiation 6 카테고리 명시).

---

**Status**: ✓ 5 strong + 1 Pre-PMF baseline + 1 permanently blocked categories explicit · §10.3.2 priority order codified · 10-feature anti-creep audit · maintenance rule binds intake decisions to PR review.
**Issued**: 2026-04-30 · **Operator**: kimhinton · **Re-audit**: per release cycle (bound to `brand-identity.md` re-audit cadence).
