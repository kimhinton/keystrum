// Home-page FAQ questions consumed by src/app/page.tsx as a single FAQPage
// JSON-LD entity. Kept out of layout.tsx so that subpages with their own
// FAQPage (e.g. /chords/[name]) do not collide with this one — Google
// rejects pages carrying more than one FAQPage and Search Console flags
// it as a duplicate.
export interface FAQEntry {
  question: string;
  answer: string;
}

export const HOME_FAQ_QUESTIONS: FAQEntry[] = [
  {
    question: "Does it work on mobile?",
    answer:
      "Yes, fully. On mobile, tap or drag across the on-screen keys to strum — practice mode has full touch-drag strum support. On desktop, use your keyboard. Install as a PWA for a full-screen, offline-capable experience.",
  },
  {
    question: "Why four rows?",
    answer:
      "A QWERTY keyboard has four usable rows (number, QWERTY, ASDF, ZXCV). Each row is one string — sweep a column top-to-bottom to strum. Four strings is enough to voice any common chord.",
  },
  {
    question: "Can I change the chords?",
    answer:
      "Not in the current version. Column presets are editable in the next release. The default six chords are Am, C, Em, G, Dm, F — all diatonic to C major / A minor.",
  },
  {
    question: "Why is the audio crunchy on some machines?",
    answer:
      "keystrum uses a Karplus-Strong physical-modeling synth rendered in the browser. Low-end devices can clip at high polyphony — lower the volume or hit fewer simultaneous keys.",
  },
  {
    question:
      "How is keystrum different from Yousician, Fender Play, or Chordify?",
    answer:
      "keystrum needs no real instrument and no account. The other tools assume you already own a guitar (Yousician, Fender Play) or that you want to look up tabs for an existing recording (Chordify). keystrum is for the moment when you want to feel out a chord progression before you bother getting the guitar out — or when you simply do not own one.",
  },
  {
    question: "Will I learn real guitar with this?",
    answer:
      "Partly. You will internalize chord names, the diatonic relationship between Am, C, Em, G, Dm and F, and the feel of common 4-chord progressions — all of which transfer directly to a real fretboard. You will not learn finger placement, fret-pressure, or strumming dynamics; for that you still need a physical guitar. Treat keystrum as the chord-theory and progression-sketching layer.",
  },
  {
    question: "Is keystrum free? Open source?",
    answer:
      "Both. keystrum is MIT-licensed, source on GitHub at github.com/kimhinton/keystrum. There is no paid tier, no account, no telemetry beyond standard hosting logs. Stats live in your browser's localStorage and never leave your device.",
  },
  {
    question: "Can I share a chord progression with someone?",
    answer:
      "Yes. Add ?prog= to the URL with hyphen-separated chord names — for example keystrum.app/?prog=Am-F-C-G shares the vi-IV-I-V pop progression. The receiver lands directly in the instrument with that progression preset, no signup needed.",
  },
  {
    question: "What is Karplus-Strong synthesis?",
    answer:
      "Karplus-Strong is a 1983 physical-modeling algorithm that simulates a plucked string with a short delay line + a low-pass filter, instead of replaying a pre-recorded sample. The result sounds like a real guitar string because the physics is similar — but it ships as a few hundred bytes of code instead of multi-megabyte samples, which is why keystrum runs offline as a PWA.",
  },
];
