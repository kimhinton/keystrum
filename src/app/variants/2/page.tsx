import Link from "next/link";
import KeyboardGuitar from "@/components/keyboard-guitar/KeyboardGuitar";

export const metadata = {
  title: "KeyStrum · Variant 2 — Playful Light",
  description: "No guitar? Your keyboard has four strings.",
};

export default function Variant2Page() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-zinc-200/70 bg-white/80 px-6 py-4 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight">
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-black text-white">K</span>
          KeyStrum
          <span className="ml-0.5 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600">v2</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-zinc-600 sm:flex">
          <a href="#features" className="transition hover:text-zinc-950">Features</a>
          <a href="#how" className="transition hover:text-zinc-950">How</a>
          <a href="#faq" className="transition hover:text-zinc-950">FAQ</a>
          <a
            href="#instrument"
            className="rounded-full bg-zinc-950 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-zinc-700"
          >
            Start playing ↓
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_at_50%_0%,#fef3c7_0,transparent_70%)]" />
        <div className="mx-auto max-w-3xl px-6 pb-10 pt-16 text-center sm:pt-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 shadow-sm">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Web Audio · open source · zero install
          </div>
          <h1 className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
            No guitar?
            <br />
            Your keyboard has
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">four strings.</span>
              <span className="absolute -inset-x-2 inset-y-1 -z-0 bg-amber-200" aria-hidden />
            </span>
          </h1>
          <p className="mx-auto mb-9 max-w-xl text-lg text-zinc-600">
            KeyStrum turns the four rows of your laptop keyboard into a 4-string guitar. Press a column fast (<span className="font-mono text-zinc-900">2 w s x</span>) — it strums a chord.
          </p>
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            <a
              href="#instrument"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              Grab your keyboard →
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:border-zinc-400"
            >
              Show me how
            </a>
          </div>
        </div>
        <div id="instrument" className="mx-auto max-w-5xl px-6 pb-20">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.15)]">
            <KeyboardGuitar theme="light" />
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-5xl px-6 py-7">
          <p className="mb-4 text-center text-xs uppercase tracking-widest text-zinc-500">Perfect for</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["🎸 Guitar beginners", "🎧 Bedroom producers", "✈️ Travel musicians", "👩‍🏫 Music teachers", "🎮 Late-night goofs"].map((t) => (
              <span key={t} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-14 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Features</span>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Small enough to be a toy. Smart enough not to be.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:shadow-lg">
              <div className="mb-4 text-3xl">{f.icon}</div>
              <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="border-t border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">How it works</span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">Three moves to your first chord.</h2>
          </div>
          <ol className="space-y-5">
            {HOW.map((h, i) => (
              <li key={h.title} className="flex gap-5 rounded-2xl border border-zinc-200 bg-white p-6">
                <span className="flex size-10 flex-none items-center justify-center rounded-full bg-amber-200 font-mono text-sm font-black text-amber-900">
                  {i + 1}
                </span>
                <div>
                  <h3 className="mb-1 text-lg font-bold">{h.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-600">{h.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <figure>
          <div className="mb-4 text-3xl">🎸</div>
          <blockquote className="text-2xl font-semibold leading-relaxed tracking-tight sm:text-3xl">
            &ldquo;I didn&rsquo;t know my keyboard could <em>swing</em>.&rdquo;
          </blockquote>
          <figcaption className="mt-5 text-sm text-zinc-500">— probably you, in about two minutes</figcaption>
        </figure>
      </section>

      <section id="faq" className="border-t border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-2xl px-6 py-24">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">FAQ</h2>
          <dl className="space-y-4">
            {FAQ.map((q) => (
              <div key={q.q} className="rounded-2xl border border-zinc-200 bg-white p-5">
                <dt className="mb-1 font-semibold">{q.q}</dt>
                <dd className="text-sm text-zinc-600">{q.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative mx-4 my-12 overflow-hidden rounded-3xl bg-zinc-950 px-6 py-20 text-center text-white sm:mx-auto sm:max-w-5xl">
        <div className="absolute inset-0 bg-[radial-gradient(30rem_at_50%_100%,#fef3c7_0,transparent_60%)] opacity-20" />
        <div className="relative">
          <h2 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">Enough reading. Your C chord is waiting.</h2>
          <p className="mb-8 text-zinc-400">Hit <span className="font-mono text-white">2</span> → <span className="font-mono text-white">w</span> → <span className="font-mono text-white">s</span> → <span className="font-mono text-white">x</span> — fast.</p>
          <a href="#instrument" className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-zinc-950 transition hover:bg-amber-200">
            ↑ Back to the strings
          </a>
        </div>
      </section>

      <footer className="border-t border-zinc-100 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <div>© 2026 KeyStrum · Made with Web Audio + stubborn optimism</div>
          <div className="flex gap-5">
            <Link href="/" className="hover:text-zinc-900">All variants</Link>
            <a href="#" className="hover:text-zinc-900">GitHub</a>
            <a href="#" className="hover:text-zinc-900">Feedback</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FEATURES = [
  { icon: "🎹", title: "Row = string", body: "Four keyboard rows, four guitar strings. Your muscle memory for QWERTY becomes muscle memory for DGBE tuning." },
  { icon: "⚡", title: "Real strumming", body: "Columns of keys are chords. Hit them in quick sequence and KeyStrum reads direction — up or down." },
  { icon: "🌐", title: "Just a URL", body: "Nothing to install. Everything runs in your browser. Share a link, your friend joins the jam in one second." },
];

const HOW = [
  { title: "Find the four rows", body: "Top to bottom: numbers, QWERTY, ASDF, ZXCV. Each becomes one string — high E, B, G, D." },
  { title: "Pick a column", body: "Every vertical column is a chord. 2wsx is C. 4rfv is G. 3edc is A-minor. Memorize six columns, and you can play half the pop songs ever written." },
  { title: "Strum down, strum up", body: "Hit the four keys in a column quickly — 2 → w → s → x is a downstroke. Reverse direction for an upstroke. Mix them for rhythm." },
];

const FAQ = [
  { q: "Do I need a guitar to learn from this?", a: "No — KeyStrum is the guitar. You won&rsquo;t learn technique for a physical instrument, but you will learn chord progressions." },
  { q: "Is it free forever?", a: "The browser app, yes. We may add optional pro features (custom sound packs, MIDI export), but the core stays free." },
  { q: "Can I play songs I know?", a: "Try any 4-chord pop song. I-V-vi-IV (C-G-Am-F) is literally your 2wsx → 4rfv → 3edc → 5tgb row." },
  { q: "Mobile?", a: "Tap the on-screen keys. Works, but real strumming needs a physical keyboard." },
];
