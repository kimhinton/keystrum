# keystrum — Value Proposition Statement

> Internal strategy notes (BMC 9-block §1.3.3.2). Geoffrey Moore template + 11-element self-evaluation. keystrum is a free, MIT-licensed, **no-monetization** project — pricing/Sponsors/B2B/Pro tier all permanently disabled per founder decision.
>
> Last updated: 2026-04-30

## Geoffrey Moore template

> *For [target] who [need], our [product] is [category] that [benefit], unlike [alternative], because [evidence].*

### Applied to keystrum

> **For music beginners, DAW producers, and travel-bound musicians** who want to practice or sketch guitar chords without owning an instrument, **keystrum** is a **browser-based virtual guitar** that delivers **real chord strum on your QWERTY keyboard**, unlike **acoustic guitar (~$200, hours of learning curve)** or **virtual guitar VSTs (DAW + MIDI controller required)**, because **Karplus-Strong synthesis renders authentic plucked-string sound, and a 6-chord × 4-row layout maps directly to actual guitar strumming mechanics.**

### One-liner (canonical, README L7)

> Strum guitar chords on your QWERTY keyboard — no guitar needed.

This is the compressed form of the Moore statement above. Both must stay aligned: any change to one updates the other.

## 11-element self-evaluation (Osterwalder VP elements)

| Element | Status | keystrum evidence |
|---|:-:|---|
| **Newness** | △ | QWERTY-as-guitar pattern is unique; Karplus-Strong + 6-chord layout combination has no direct competitor |
| **Performance** | ○ | <50ms latency (McGurk-safe), Karplus-Strong cache LRU 64 (commit 52baf6f) |
| **Customization** | × | No user-customizable chord layouts or sounds |
| **Design** | △ | Minimal layout, single brand color (`--brand` CSS var, commit 96cc56b) |
| **Brand** | × | Pre-PMF, brand recognition near zero (★2, followers 1) |
| **Price** | ○ | Free, $0 forever (no monetization) |
| **Cost reduction** | ○ | Saves the user $200+ vs. buying an acoustic guitar |
| **Risk reduction** | ○ | No install, no account, no email signup, no payment |
| **Accessibility** | ○ | axe-core CI clean (WCAG 2.1 A/AA, 12→0 violations, commit a5c32ae) |
| **Convenience** | ○ | Browser-only; runs on any device with a keyboard |
| **Status** | × | Pre-PMF small project; no status-signal value |

**Score**: 7 strong (○) / 2 partial (△) / 3 weak (×) out of 12 elements (Brand counted twice for visibility). Weak axes are pre-PMF expected — Brand/Status improve with traction; Customization is a deliberate scope decision (focus on core experience).

## Differentiation summary

keystrum's core differentiation is the combination of three traits, none of which alone is unique:

1. **Browser-only** — no install, no DAW
2. **Real instrument synthesis** — Karplus-Strong, not sample playback
3. **Strum mechanics** — 4-row strum detection, not single-chord triggering

No competitor combines all three.

## Cross-references
- README L7 — canonical one-liner
- Hero ELM open-loop sub: `<Hero />` (commit 81e2e96)
- Customer Segments: `docs/business/cs.md`
- Marketing copy: `docs/marketing/{cold-emails,reddit-post,show-hn,product-hunt}.md`
- 부3 단원1 §1.3.3 / §1.3.3.1 / §1.3.3.2 (source units, BMC 9-block)
