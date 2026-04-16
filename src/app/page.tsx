import Link from "next/link";
import KeyboardGuitar from "@/components/keyboard-guitar/KeyboardGuitar";

export const metadata = {
  title: "keystrum — Strum your keyboard",
  description: "A new instrument. Four rows, six chords, one keyboard. Sweep a column fast and it strums. Practice mode with three songs included.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-neutral-100 font-sans">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#0b0b0f]/80 px-6 py-4 backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="inline-flex size-5 items-center justify-center rounded-md bg-[#ff6b35] text-[10px] font-black text-black">K</span>
          keystrum
        </a>
        <div className="hidden items-center gap-6 text-sm text-neutral-400 sm:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <Link href="/chords" className="transition hover:text-white">Chords</Link>
          <Link href="/play" className="transition hover:text-white">Play</Link>
          <Link href="/instrument" className="transition hover:text-white">Instrument</Link>
          <a href="#faq" className="transition hover:text-white">FAQ</a>
          <a href="#instrument" className="rounded-full bg-[#ff6b35] px-4 py-1.5 text-xs font-semibold text-black transition hover:bg-[#ff8555]">
            Start playing →
          </a>
        </div>
      </nav>

      <section id="top" className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:pt-20">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-400">
            <span className="size-1.5 rounded-full bg-[#ff6b35]" />
            No install · Web Audio · open source
          </div>
          <h1 className="mb-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Strum your
            <br />
            <span className="text-[#ff6b35]">keyboard.</span>
          </h1>
          <p className="mb-8 max-w-lg text-lg text-neutral-400">
            A new instrument. Four rows, six chords.
            <br className="hidden sm:block" />
            <span className="text-neutral-300">Sweep a column — hear it ring.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#instrument"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff6b35] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#ff8555]"
            >
              Start playing →
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              See the mapping
            </a>
          </div>
          <div className="mt-10 flex items-center gap-5 text-xs text-neutral-500">
            <span>↓ Just press any key below</span>
          </div>
        </div>

        <div id="instrument" className="flex flex-col items-center gap-3">
          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.02] p-2 sm:p-4 md:p-6 shadow-[0_20px_80px_-30px_rgba(255,107,53,0.35)]">
            <KeyboardGuitar theme="dark" />
          </div>
          <Link
            href="/instrument"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-neutral-300 transition hover:border-[#ff6b35]/40 hover:text-white"
          >
            Open full instrument with recording &amp; metronome
            <span className="text-[#ff6b35]">→</span>
          </Link>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 text-xs text-neutral-500">
          <span>Built for</span>
          <span className="font-semibold text-neutral-300">music beginners</span>
          <span>·</span>
          <span className="font-semibold text-neutral-300">DAW producers</span>
          <span>·</span>
          <span className="font-semibold text-neutral-300">late-night jammers</span>
          <span>·</span>
          <span className="font-semibold text-neutral-300">music teachers</span>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#ff6b35]">Features</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">An instrument that fits in your keyboard.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-white/10">
              <div className="mb-4 inline-flex size-8 items-center justify-center rounded-lg bg-[#ff6b35]/15 font-mono text-xs font-bold text-[#ff6b35]">
                {f.icon}
              </div>
              <h3 className="mb-1.5 text-base font-semibold">{f.title}</h3>
              <p className="text-sm text-neutral-400">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="border-t border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#ff6b35]">How it works</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Four rows. Six chords. One sweep.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {HOW.map((h, i) => (
              <div key={h.title} className="relative">
                <div className="mb-3 font-mono text-5xl font-bold text-[#ff6b35]/30">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mb-2 text-base font-semibold">{h.title}</h3>
                <p className="text-sm text-neutral-400">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-3">
          <Link
            href="/play"
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#ff6b35]/15 via-[#ff6b35]/5 to-transparent p-8 transition hover:border-[#ff6b35]/40"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">Practice mode</span>
            <h3 className="text-2xl font-semibold tracking-tight">Learn with songs.</h3>
            <p className="text-sm text-neutral-400">
              A character shows you when to strum, hold, and mute. Three folk songs, six chord lanes.
            </p>
            <div className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#ff6b35]">
              Start practicing
              <span className="transition group-hover:translate-x-0.5">→</span>
            </div>
          </Link>
          <Link
            href="/instrument"
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-red-500/15 via-red-500/5 to-transparent p-8 transition hover:border-red-500/40"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-red-400">Full instrument</span>
            <h3 className="text-2xl font-semibold tracking-tight">Play &amp; record.</h3>
            <p className="text-sm text-neutral-400">
              Distraction-free keyboard with metronome, volume control, and recording. Download or share your sessions.
            </p>
            <div className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-red-400">
              Open instrument
              <span className="transition group-hover:translate-x-0.5">→</span>
            </div>
          </Link>
          <Link
            href="/chords"
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition hover:border-white/20"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Chord dictionary</span>
            <h3 className="text-2xl font-semibold tracking-tight">Six chords, six columns.</h3>
            <p className="text-sm text-neutral-400">
              Am · C · Em · G · Dm · F. Each chord&apos;s notes, intervals, keyboard mapping, and famous songs.
            </p>
            <div className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-neutral-200">
              Open dictionary
              <span className="transition group-hover:translate-x-0.5">→</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl text-neutral-400">
            &ldquo;No testimonials yet.
            <br />
            <span className="text-white">Try it — yours might go here.</span>&rdquo;
          </blockquote>
          <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-neutral-600">— the honesty policy</figcaption>
        </figure>
      </section>

      <section id="faq" className="border-t border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight">Quick answers</h2>
          <dl className="space-y-6">
            {FAQ.map((q) => (
              <div key={q.q} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <dt className="mb-1.5 font-semibold">{q.q}</dt>
                <dd className="text-sm text-neutral-400">{q.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="mb-5 text-4xl font-semibold tracking-tight sm:text-5xl">Stop reading. Strum.</h2>
          <p className="mx-auto mb-8 max-w-lg text-neutral-400">Scroll back up. Hit <span className="font-mono text-white">2</span>, <span className="font-mono text-white">w</span>, <span className="font-mono text-white">s</span>, <span className="font-mono text-white">x</span> — one after the other, fast.</p>
          <a href="#instrument" className="inline-flex items-center gap-2 rounded-full bg-[#ff6b35] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#ff8555]">
            ↑ Back to the instrument
          </a>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-xs text-neutral-500 sm:flex-row sm:items-center">
          <div>© 2026 keystrum · MIT licensed</div>
          <div className="flex gap-5">
            <a href="https://github.com/kimhinton/keystrum" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FEATURES = [
  { icon: "4×", title: "Four-row mapping", body: "Number row to Z row — each physical row is a string. Each vertical column is a chord. The layout clicks the moment you try it." },
  { icon: "⚡", title: "Strum detection", body: "Sweep a column top-down in under 90ms and keystrum reads it as a downstroke. Reverse for upstroke. It feels physical." },
  { icon: "◉", title: "Zero install", body: "Karplus-Strong synthesis in the browser. No samples, no plugins, no account. This instrument lives in your tab." },
];

const HOW = [
  { title: "Find the rows", body: "Numbers, QWERTY, ASDF, ZXCV. Four rows, four strings. Top row is the highest pitch." },
  { title: "Pick a column", body: "Each vertical column is a chord: 1qaz = Am, 2wsx = C, 3edc = Em, 4rfv = G, 5tgb = Dm, 6yhn = F." },
  { title: "Sweep it", body: "Hit two or more keys in a column — fast, top to bottom. That sweep is a strum. The faster you go, the tighter it sounds." },
];

const FAQ = [
  { q: "Does it work on mobile?", a: "The page loads, but strumming needs a physical keyboard. On-screen keys work as a fallback. Practice mode has touch support." },
  { q: "Is there a practice mode?", a: "Yes — /play has three songs where a character shows you when to strum, hold, and mute. Scores save locally and can be shared via URL." },
  { q: "Why four strings?", a: "QWERTY has four rows. keystrum uses all four — that&apos;s the instrument&apos;s design, not a limitation." },
  { q: "Can I change the chords?", a: "Not yet on v1. Column presets will be editable in the next release. Six chords available now: Am, C, Em, G, Dm, F." },
  { q: "What makes the sound?", a: "Karplus-Strong synthesis — a physical modeling algorithm running in Web Audio. No samples, no downloads. The sound is generated live in your browser." },
];
