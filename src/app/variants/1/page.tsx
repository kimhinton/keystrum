import Link from "next/link";
import KeyboardGuitar from "@/components/keyboard-guitar/KeyboardGuitar";

export const metadata = {
  title: "KeyStrum · Variant 1 — Dark Minimal",
  description: "Your keyboard, tuned to four strings.",
};

export default function Variant1Page() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-neutral-100 font-sans">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#0b0b0f]/80 px-6 py-4 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="inline-flex size-5 items-center justify-center rounded-md bg-[#ff6b35] text-[10px] font-black text-black">K</span>
          KeyStrum
          <span className="text-xs font-normal text-neutral-500">v1</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-neutral-400 sm:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#how" className="transition hover:text-white">How it works</a>
          <a href="#faq" className="transition hover:text-white">FAQ</a>
          <a href="#play" className="rounded-full bg-[#ff6b35] px-4 py-1.5 text-xs font-semibold text-black transition hover:bg-[#ff8555]">
            Start playing →
          </a>
        </div>
      </nav>

      <section id="play" className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:pt-20">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-400">
            <span className="size-1.5 rounded-full bg-[#ff6b35]" />
            No install · Web Audio · open source
          </div>
          <h1 className="mb-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Your keyboard,
            <br />
            <span className="text-[#ff6b35]">tuned to four strings.</span>
          </h1>
          <p className="mb-8 max-w-lg text-lg text-neutral-400">
            KeyStrum maps each keyboard row to a guitar string. Press a column fast — <span className="font-mono text-neutral-200">2wsx</span>, <span className="font-mono text-neutral-200">4rfv</span> — and it strums.
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
              How it works
            </a>
          </div>
          <div className="mt-10 flex items-center gap-5 text-xs text-neutral-500">
            <span>↓ Just press any key below</span>
          </div>
        </div>

        <div id="instrument" className="flex items-center">
          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 shadow-[0_20px_80px_-30px_rgba(255,107,53,0.35)]">
            <KeyboardGuitar theme="dark" />
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 text-xs text-neutral-500">
          <span>Built for</span>
          <span className="font-semibold text-neutral-300">guitar beginners</span>
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
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">A guitar that fits in your laptop.</h2>
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
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Four rows, four strings, six chords.</h2>
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

      <section className="mx-auto max-w-7xl px-6 py-20">
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl">
            &ldquo;Took me thirty seconds to go from &lsquo;nice toy&rsquo; to &lsquo;wait, I&rsquo;m actually playing a chord progression.&rsquo;&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-neutral-500">— an early user, probably you in five minutes</figcaption>
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
          <div>© 2026 KeyStrum · MIT licensed</div>
          <div className="flex gap-5">
            <Link href="/" className="hover:text-neutral-300">All variants</Link>
            <a href="#" className="hover:text-neutral-300">GitHub</a>
            <a href="#" className="hover:text-neutral-300">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FEATURES = [
  { icon: "4×", title: "Four-row mapping", body: "Number row to Z row — each physical row of your keyboard becomes one guitar string. It clicks the moment you try it." },
  { icon: "⚡", title: "Strum detection", body: "Press a column top-down in under 90ms and KeyStrum reads it as a downstroke. Reverse for upstroke." },
  { icon: "◉", title: "Zero install", body: "Web Audio synth. No samples to download, no plugins, no account. Close the tab and you&apos;re done." },
];

const HOW = [
  { title: "Find the rows", body: "Numbers, QWERTY, ASDF, ZXCV. Top to bottom, high string to low. Your E is the top row." },
  { title: "Pick a column", body: "Each vertical column is pre-mapped to a chord: 2wsx = C, 4rfv = G, 3edc = Am, and so on." },
  { title: "Strum it", body: "Quickly hit the four keys in a column — up or down. The faster you go, the tighter the strum." },
];

const FAQ = [
  { q: "Does it work on mobile?", a: "The page loads, but strumming needs a physical keyboard. Tap keys on screen work as a fallback." },
  { q: "Why only four strings?", a: "QWERTY has four letter/number rows. We picked DGBE (top four of standard guitar tuning) — enough for most pop chords." },
  { q: "Can I change the chords?", a: "Not yet on v1. Column presets are editable in the next release. Use the default C/G/Am/F/Dm/Em progression for now." },
  { q: "Why is the audio crunchy on some machines?", a: "It&apos;s a Karplus-Strong synth in the browser. Low-end devices clip at high polyphony — drop the volume or hit fewer keys." },
];
