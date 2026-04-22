# keystrum — FAQ

Frequently asked questions about keystrum, a browser-based virtual guitar that maps your QWERTY keyboard to a 6-chord strum machine. Practice guitar chords without a guitar, using Karplus-Strong physical-modeling synthesis in Web Audio.

This FAQ complements the main README. For open-ended questions, use GitHub Discussions (see bottom of this page).

---

1. **Q: Which browsers are supported?**
   A: Every modern browser — Chrome, Firefox, Safari, Edge — version from 2021 onward. keystrum uses only the Web Audio API (universal) and plain JavaScript keyboard events. No MIDI access, no hardware permissions, no special flags required.

2. **Q: Do I need a guitar or any instrument to use keystrum?**
   A: No. The whole point is practicing guitar chords without a guitar. keystrum turns your QWERTY keyboard into a 6-chord strum machine. Work through the three built-in folk songs or explore the chord dictionary without touching a physical instrument.

3. **Q: Why four rows on the keyboard?**
   A: A standard QWERTY keyboard has four usable rows (number row, QWERTY row, ASDF row, ZXCV row). Each row becomes one guitar string. Four strings is enough to voice any common chord, and each string's column mapping makes "sweep the column" feel like strumming.

4. **Q: Why only six chords?**
   A: Am, C, Em, G, Dm, F cover the full diatonic set of C major and A minor — roughly 80% of Western pop and folk chord progressions. Custom chord presets are on the v0.2 roadmap. The current version keeps the column layout simple for first-time users.

5. **Q: What is Karplus-Strong synthesis?**
   A: Karplus-Strong is a physical-modeling algorithm from 1983 that simulates a plucked string mathematically. It feeds a short burst of noise through a delay line with a tuned low-pass filter, and the feedback naturally decays like a real string. keystrum runs it live in Web Audio — no samples, no downloads.

6. **Q: Why no sampled guitar?**
   A: Sampled guitar libraries are 10–100 MB and require decoding before the first note. Karplus-Strong produces guitar-like tone with a few dozen lines of math and zero load time. The tradeoff is timbre flexibility — you get one guitar voice, not a dozen.

7. **Q: How does strum detection work?**
   A: Sweeping 3 or more keys in the same column within a 90 ms window counts as a downstroke. Reverse direction (bottom-to-top) is an upstroke. Pressing individual keys is picking. The 90 ms threshold matches typical finger-sweep speed on a real guitar.

8. **Q: What are the J / K / L / `;` keys for?**
   A: Palm mute keys on the right-hand home row. Each mute key dampens the currently ringing strings — the same technique guitarists use with the side of their strumming hand. Practice mode introduces them progressively across the three songs.

9. **Q: What songs come with practice mode?**
   A: Three public-domain folk songs — House of the Rising Sun (Am/C/Dm/F, easy), Scarborough Fair (Dorian waltz in 3/4, medium, introduces mute keys J+K), Greensleeves (full 6-chord usage in 3/4, medium, all three mute keys J+K+L). Each song has a sparse Verse 1 and a full Verse 2.

10. **Q: How does scoring work?**
    A: Per-song best scores save to `localStorage` — browser-local, per device, no account. Share your best run via URL with the share button; the URL encodes score, song, and timing offsets so the recipient sees the same run.

11. **Q: Can I add my own songs?**
    A: Not through the UI yet — custom song authoring is on the roadmap. For now, songs are defined in `src/lib/game/songs.ts` as declarative chord grids plus timing and lyrics. Adding one requires a code edit and a pull request — the structure is straightforward.

12. **Q: Does keystrum work on mobile?**
    A: Yes. On phones and tablets, tap or drag across the on-screen chord columns — practice mode has full touch-drag strum support. On desktop, use the physical keyboard. Both routes hit the same strum-detection logic.

13. **Q: Is keystrum a PWA? Can I install it?**
    A: Yes. keystrum is a Progressive Web App with a service worker and web manifest. Desktop Chrome / Edge show an "Install keystrum" prompt in the address bar. On iOS Safari, use "Add to Home Screen". On Android Chrome, use "Install app". The installed PWA runs full-screen and caches assets for offline use.

14. **Q: Is there a native iOS / Android app?**
    A: Yes. The same source is wrapped with Capacitor into native iOS and Android apps (see the `cap:ios` and `cap:android` scripts in `package.json`). The native wrappers add haptics, status bar control, and system integration while reusing the entire web app.

15. **Q: What stack is keystrum built on?**
    A: Next.js 16 App Router with React 19, TypeScript in strict mode, Tailwind CSS 4, shadcn/ui components, and Zustand for state with `localStorage` persistence. Audio is pure Web Audio API — no wrapper libraries. Static export deploys to any CDN (Cloudflare Pages, Vercel, Netlify).

16. **Q: What license?**
    A: MIT — see [LICENSE](../LICENSE). Commercial use, modification, private use, and distribution are all permitted. Attribution (retaining the copyright notice) is the only requirement. For academic citation, see [CITATION.cff](../CITATION.cff).

17. **Q: How can I contribute?**
    A: See [CONTRIBUTING.md](../CONTRIBUTING.md). Development flow: fork → clone → `pnpm install` → `pnpm run dev` → make changes → `pnpm run lint` → `pnpm exec tsc --noEmit` → open a PR. The easiest contribution is adding a new song to `src/lib/game/songs.ts`. UI improvements and new chord sets are also welcome.

18. **Q: I found a bug. Where should I report it?**
    A: Open an issue at https://github.com/kimhinton/keystrum/issues/new/choose using the "Bug report" template. Include browser + version, OS, and steps to reproduce. For audio-specific issues, include your output device and any other audio apps running concurrently.

---

## Discussions

For open-ended questions, feature brainstorming, or "how would I practice X" scenarios, use **GitHub Discussions** at https://github.com/kimhinton/keystrum/discussions.

To enable Discussions: **Settings** → **General** → **Features** → check **Discussions**.

This FAQ aims to stay numbered and factual. Discussions handle the long-form and exploratory conversations.
