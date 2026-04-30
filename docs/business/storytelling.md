# Brand Storytelling Workbook — keystrum (2026-04-30)

> Source: 미적용/부1_마케팅/단원3_브랜드관리.md §3.5 + 통합.md TOP 10 #7
> Reference: Campbell (1949) Hero's Journey · Vogler (2007) Writer's Journey · Miller (2017) StoryBrand
> Scope: User Hero's Journey (§3.5.1) · Founder story (§3.5.2) · README/about audit (§3.5.3 main)

---

## 0. Storytelling under Pre-PMF

Storytelling under awareness ≈ 0 has limited near-term ROI — there is no audience yet. The reason to write it now anyway is **internal coherence**: the story decides which copy survives audit, which features get prioritized, which segments stay in scope.

This workbook does not optimize for virality. It locks the narrative.

---

## 1. User Hero's Journey (§3.5.1)

Campbell's 12-stage monomyth condensed to 5 stages — the hero is the **student**, not the founder.

| Stage | The user's experience |
|---|---|
| **Ordinary world** | Wants to learn guitar chords. No guitar at hand (subway · hotel · roommate asleep · Chromebook in classroom). Has been told "just practice chord changes" but cannot. |
| **Call to adventure** | Discovers keystrum via search ("free chord trainer no install") or peer mention. Lands on `keystrum.app` Hero. |
| **Mentor** | The product itself. Friendly Hero copy ("What if your keyboard was the guitar?"). The 3-layer learning engine — Active recall + Interleaving + SM-2 — gives the mentor algorithmic backing. |
| **Tests** | Six chords · four strings · 90 ms strum window · mute keys (J / K / L / `;`) · three difficulty-graded folk songs (Verse 1 sparse, Verse 2 dense) · 25-min Wellbeing nudge. |
| **Reward** | Stored Value: streak · cohort retention dashboard at `/me` · Today-vs-Yesterday positive delta · "Next: Am in 6h" closure cue. Muscle memory transfers back to a real guitar. |

**Anti-stages explicitly avoided** (per Wellbeing principles + memory rules):
- No "refusal of the call" trap (no signup gate, no email wall — aligned with `feedback_no_cold_contact_no_token_setup`)
- No "ordeal" with shame counters (no red X, no FAIL framing — see commit `3aadbf2` FAIL→MISS)
- No artificial gating to extract metrics (Wellbeing principle: silent failure)

---

## 2. Founder Story (§3.5.2)

> **Singapore-based indie maker, two open-source projects (`keystrum` + `endpulse`), MIT-licensed and ad-free. Built keystrum after looking up chord trainers and finding only $20/mo apps or static PDF chord charts. Decided the gap deserved a free, browser-based, no-account alternative.**

### Persona constants (immutable)

| Element | Value | Source |
|---|---|---|
| Location | Singapore | memory `feedback_persona_foreign_identity` — never propose Seoul / Korea / Korean media |
| Maker scope | Solo · 2 OSS projects · MIT | Pinned: `keystrum`, `endpulse`, `kimhinton`, `til` |
| Monetization stance | No Pro tier ever | memory `feedback_no_monetization` |
| Acquisition stance | No Show HN push · no DM outreach · no awesome-list PR | memory `feedback_no_cold_contact_no_token_setup` · `feedback_no_awesome_list_work` |
| Tone | Honest · technical · friendly · restrained | `brand-identity.md` 5-axis personality |

### Tone rules

- **Honest** — Pre-PMF self-acknowledged in `pmf-absence-checklist.md`. No "users love it" claims; the data is ★2.
- **Technical** — Karplus-Strong cited explicitly. Wikipedia is the primary source for chord theory.
- **Friendly** — footer Unity line *"From one keyboard guitarist to another"* (commit `5020d3c`).
- **Restrained** — no growth-hack vocabulary, no AI-revolutionary cliché, no "disruption" framing.

### What NOT to say

- "Disrupting music education" — false grandiosity at ★2.
- Year of birth · age · specific personal history — keep persona narrow.
- "Built in 13 days" — vanity micro-achievement; the point is the product, not the timeline.
- Any phrase that implies the maker is in Korea or expects Korean-language audience.

---

## 3. README storytelling audit (§3.5.3 — main)

| Section | Current | Story dimension | Gap | Action |
|---|:-:|---|:-:|---|
| Hero (top fold) | ✓ "Strum guitar chords on your QWERTY keyboard — no guitar needed." | Call to adventure | none | — |
| Demo gif + caption | ✓ live Karplus-Strong demo | Reward (auditory) | none | — |
| "What is this?" | ✓ ASCII keyboard map + sweep instruction | Mentor (the product) | none | — |
| "Why keystrum?" | ✓ 4-segment narrative (beginners · DAW · late-night · teachers) | Tests (per segment) | none | — |
| "How keystrum compares" | ✓ comparison table | Tests (alternative paths) | none | — |
| **From the maker** | ✗ missing | Founder story | **add** | new section before "Wellbeing first" |
| Wellbeing first | ✓ existing | Reward (psychological) | none | — |
| Used in the wild | partial · "Nothing to feature yet" | Community → Mentor | acceptable Pre-PMF | — |

→ **One material gap**: explicit Founder story section. Adding 2-3 short paragraphs (per `feedback_persona_foreign_identity` constraint) before "Wellbeing first" closes §3.5.2 narrative-side and §3.5.3 README-audit-side simultaneously.

---

## 4. Maintenance rule

Re-audit this workbook whenever any of the following changes:
- Hero copy (`src/app/page.tsx` mission line / sub-line)
- Founder story in `README.md` "From the maker"
- 5-keyword Core (`brand-identity.md` §1)
- New segment added to `cs.md`

If the story breaks one of the persona / no-monetization / no-cold-contact / no-vanity rules, the change is rejected at PR review. Story drift is the cheapest brand drift to catch — fix it before it ships.

---

## 5. Cross-references

- [`docs/business/cs.md`](./cs.md) — 4-tier CS niche segments (commit `ea8704a`); each segment is an arc within the user's Tests stage
- [`docs/business/vp-statement.md`](./vp-statement.md) — Moore + Osterwalder 11-element (commit `295dd6b`)
- [`docs/business/pmf-absence-checklist.md`](./pmf-absence-checklist.md) — Pre-PMF 5/5 self-diagnosis (commit `49bc34d`)
- [`docs/business/brand-identity.md`](./brand-identity.md) — 5-keyword Core that any storytelling must preserve (commit `ace7a17`)
- [`docs/business/pivot-decision-tree.md`](./pivot-decision-tree.md) — Branch B Customer-segment pivot rewrites the user's Ordinary world (commit `8c99f90`)
- 미적용/부1_마케팅/단원3_브랜드관리.md §3.5 + 통합.md TOP 10 #7
- Memory: `feedback_persona_foreign_identity` · `feedback_no_monetization` · `feedback_no_cold_contact_no_token_setup` · `feedback_pre_pmf_phase_separation` · `feedback_no_awesome_list_work`

---

## 6. Sources

- Campbell, J. (1949). *The Hero with a Thousand Faces.* — Monomyth 12-stage structure.
- Vogler, C. (2007). *The Writer's Journey: Mythic Structure for Writers* (3rd ed.). Michael Wiese Productions. — Practical Hero's Journey for short-form narrative.
- Miller, D. (2017). *Building a StoryBrand.* HarperCollins Leadership. — 7-element StoryBrand framework (character · problem · guide · plan · call to action · success · failure avoidance).
- Cross-ref: 부1 통합.md TOP 10 #7 (Storytelling — Hero's Journey + Founder story).

---

**Status**: ✓ 5-stage user journey condensed · founder persona locked · README single gap identified · maintenance rule binds story to PR review.
**Issued**: 2026-04-30 · **Operator**: kimhinton · **Re-audit triggers**: Hero copy · Founder story · 5-keyword Core · new cs.md segment.
