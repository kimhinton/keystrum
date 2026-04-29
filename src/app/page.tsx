import Link from "next/link";
import KeyboardGuitar from "@/components/keyboard-guitar/KeyboardGuitar";
import RecordCTA from "@/components/home/RecordCTA";
import MobileFallback from "@/components/home/MobileFallback";
import NativeRedirect from "@/components/native/NativeRedirect";
import ProgressionsBar from "@/components/home/ProgressionsBar";
import { Logo } from "@/components/brand/Logo";

export const metadata = {
  title: "keystrum — Practice guitar chords without a guitar",
  description: "Virtual guitar online, free, no download. Strum 6 guitar chords on your QWERTY keyboard — 4 rows become 4 strings. Real strum detection, Karplus-Strong synthesis, 3 folk songs in practice mode. Browser-only, no install, no account.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0E0E12] text-neutral-100 font-sans" data-web-only="true">
      <NativeRedirect />
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#0E0E12]/80 px-6 py-4 backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Logo size={20} className="shrink-0" />
          keystrum
        </a>
        <div className="hidden items-center gap-6 text-sm text-neutral-400 sm:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <Link href="/chords" className="transition hover:text-white">Chords</Link>
          <Link href="/play" className="transition hover:text-white">Play</Link>
          <Link href="/instrument" className="transition hover:text-white">Instrument</Link>
          <Link href="/me" className="transition hover:text-white">Stats</Link>
          <a href="#faq" className="transition hover:text-white">FAQ</a>
          <a href="#instrument" className="rounded-full bg-[#FF3864] px-4 py-1.5 text-xs font-semibold text-black transition hover:bg-[#FF5680]">
            Start playing →
          </a>
        </div>
      </nav>

      <section id="top" className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:pt-20">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-400">
            <span className="size-1.5 rounded-full bg-[#FF3864]" />
            Practice without a guitar · No install · Open source
          </div>
          <h1 className="mb-3 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Strum your
            <br />
            <span className="text-[#FF3864]">keyboard.</span>
          </h1>
          <p className="mb-2 max-w-xl text-sm italic text-neutral-500">
            For when a guitar is out of reach.
          </p>
          <p className="mb-6 max-w-xl text-xl font-medium text-neutral-200 sm:text-2xl">
            Practice guitar chords &mdash; no guitar needed.
          </p>
          <p className="mb-8 max-w-lg text-base text-neutral-400">
            A browser instrument. Four rows become four strings, six columns become six chords.
            <br className="hidden sm:block" />
            <span className="text-neutral-300">Sweep a column &mdash; hear it ring.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#instrument"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF3864] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#FF5680]"
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
          <details className="group mt-8 max-w-xl">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-sm text-neutral-400 transition hover:text-neutral-200 [&::-webkit-details-marker]:hidden">
              <span className="inline-block text-[#FF3864] transition group-open:rotate-90">▶</span>
              <span>Why QWERTY? — 3 reasons</span>
            </summary>
            <div className="mt-4 space-y-3 text-sm text-neutral-400">
              <p>
                <span className="font-semibold text-neutral-200">1. The hardware is already in front of you.</span>{" "}
                Your laptop&rsquo;s QWERTY keyboard has 4 usable rows and 6+ columns &mdash; exactly enough for 4 strings &times; 6 diatonic chords. No purchase, no setup, no setup cost between you and a chord.
              </p>
              <p>
                <span className="font-semibold text-neutral-200">2. Strum detection is just timing.</span>{" "}
                Sweep 3+ keys within 90&thinsp;ms = downstroke. Reverse for upstroke. The browser reports keystroke timestamps with millisecond precision &mdash; same physical action as a guitar pick crossing strings, just on a different surface.
              </p>
              <p>
                <span className="font-semibold text-neutral-200">3. Karplus-Strong gives you real plucked-string sound.</span>{" "}
                The same physical-modeling algorithm used in commercial guitar plugins, running live in Web Audio. No samples, no downloads. The sound is generated in your browser the moment you press a key.
              </p>
            </div>
          </details>
          <div className="mt-10 flex items-center gap-5 text-xs text-neutral-500">
            <span>↓ Just press any key below</span>
          </div>
        </div>

        <div id="instrument" className="flex flex-col items-center gap-3">
          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.02] p-2 sm:p-4 md:p-6 shadow-[0_20px_80px_-30px_rgba(255,56,100,0.35)]">
            <KeyboardGuitar theme="dark" />
          </div>
          <Link
            href="/instrument"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-neutral-300 transition hover:border-[#FF3864]/40 hover:text-white"
          >
            Open full instrument with recording &amp; metronome
            <span className="text-[#FF3864]">→</span>
          </Link>
        </div>
      </section>

      <ProgressionsBar />

      <RecordCTA />

      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-[#FF3864]">Features</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">An instrument that fits in your keyboard.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-white/10">
              <div className="mb-4 inline-flex size-8 items-center justify-center rounded-lg bg-[#FF3864]/15 font-mono text-xs font-bold text-[#FF3864]">
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
            <span className="text-xs uppercase tracking-widest text-[#FF3864]">How it works</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Four rows. Six chords. One sweep.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {HOW.map((h, i) => (
              <div key={h.title} className="relative">
                <div className="mb-3 font-mono text-5xl font-bold text-[#FF3864]/30">{String(i + 1).padStart(2, "0")}</div>
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
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#FF3864]/15 via-[#FF3864]/5 to-transparent p-8 transition hover:border-[#FF3864]/40"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF3864]">Practice mode</span>
            <h3 className="text-2xl font-semibold tracking-tight">Learn with songs.</h3>
            <p className="text-sm text-neutral-400">
              A character shows you when to strum, hold, and mute. Three folk songs, six chord lanes.
            </p>
            <div className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#FF3864]">
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF3864]/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="mb-5 text-4xl font-semibold tracking-tight sm:text-5xl">Stop reading. Strum.</h2>
          <p className="mx-auto mb-8 max-w-lg text-neutral-400">Scroll back up. Hit <span className="font-mono text-white">2</span>, <span className="font-mono text-white">w</span>, <span className="font-mono text-white">s</span>, <span className="font-mono text-white">x</span> — one after the other, fast.</p>
          <a href="#instrument" className="inline-flex items-center gap-2 rounded-full bg-[#FF3864] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#FF5680]">
            ↑ Back to the instrument
          </a>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-xs text-neutral-500 sm:flex-row sm:items-center">
          <div>© 2026 keystrum · MIT licensed</div>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-neutral-300">Privacy</Link>
            <a href="https://github.com/kimhinton/keystrum" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300">GitHub</a>
          </div>
        </div>
      </footer>

      <MobileFallback />
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
  { q: "Does it work on mobile?", a: "Yes, fully. Tap or drag across the on-screen keys to strum — practice mode has full touch-drag strum support. On desktop, use your keyboard. Install as a PWA for a full-screen, offline-capable experience." },
  { q: "Is there a practice mode?", a: "Yes — /play has three songs where a character shows you when to strum, hold, and mute. Scores save locally and can be shared via URL." },
  { q: "Why four strings?", a: "QWERTY has four rows. keystrum uses all four — that&apos;s the instrument&apos;s design, not a limitation." },
  { q: "Can I change the chords?", a: "Not yet on v1. Column presets will be editable in the next release. Six chords available now: Am, C, Em, G, Dm, F." },
  { q: "What makes the sound?", a: "Karplus-Strong synthesis — a physical modeling algorithm running in Web Audio. No samples, no downloads. The sound is generated live in your browser." },
];
