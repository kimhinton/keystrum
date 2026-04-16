import Link from "next/link";
import KeyboardGuitar from "@/components/keyboard-guitar/KeyboardGuitar";

export const metadata = {
  title: "KeyStrum · Variant 3 — Split Vibrant",
  description: "The fastest way from a QWERTY to a chord progression.",
};

export default function Variant3Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50 text-zinc-950 font-sans">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/40 bg-white/50 px-6 py-4 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight">
          <span className="inline-flex size-6 items-center justify-center rounded-md bg-gradient-to-br from-rose-500 to-amber-500 text-[11px] font-black text-white shadow">K</span>
          KeyStrum
          <span className="ml-0.5 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">v3</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-zinc-700 sm:flex">
          <a href="#features" className="transition hover:text-rose-600">Features</a>
          <a href="#how" className="transition hover:text-rose-600">How</a>
          <a href="#faq" className="transition hover:text-rose-600">FAQ</a>
          <a
            href="#instrument"
            className="rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:shadow-md"
          >
            Play it ♪
          </a>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-12 lg:grid-cols-2 lg:gap-16 lg:pt-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs text-zinc-700 shadow-sm ring-1 ring-rose-200/60">
            <span className="size-1.5 rounded-full bg-rose-500" />
            Live in your browser · no signup · MIT
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.02] tracking-tight sm:text-7xl">
            The fastest path from
            <br />
            <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">a QWERTY</span>
            <br />
            to a chord progression.
          </h1>
          <p className="mb-8 max-w-lg text-lg text-zinc-700">
            Four rows of keys. Four strings. Six columns pre-mapped to real chords. Drag your fingers down a column — <span className="font-mono font-semibold text-zinc-950">2 w s x</span> — and you&rsquo;re strumming C major.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#instrument"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition hover:shadow-xl hover:shadow-rose-300"
            >
              Play your first riff
              <span className="transition group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full bg-white/70 px-6 py-3 text-sm font-medium text-zinc-900 ring-1 ring-zinc-200/80 backdrop-blur-sm transition hover:ring-zinc-300"
            >
              See the mapping
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6">
            {[
              { n: "4", l: "rows" },
              { n: "6", l: "chords" },
              { n: "0ms", l: "install time" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-black tracking-tight">{s.n}</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div id="instrument" className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-rose-300/40 via-amber-300/30 to-sky-300/40 blur-2xl" aria-hidden />
          <div className="relative rounded-2xl border border-white/80 bg-white/70 p-4 backdrop-blur-sm shadow-2xl shadow-rose-200/40 sm:p-6">
            <KeyboardGuitar theme="vibrant" />
          </div>
        </div>
      </section>

      <section className="bg-white/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-6 text-sm text-zinc-600">
          <span className="text-xs uppercase tracking-widest text-zinc-500">Sounds good to</span>
          <span className="font-semibold">🎸 Beginners</span>
          <span className="text-zinc-300">·</span>
          <span className="font-semibold">🎹 Producers</span>
          <span className="text-zinc-300">·</span>
          <span className="font-semibold">✈️ Travelers</span>
          <span className="text-zinc-300">·</span>
          <span className="font-semibold">🪗 Teachers</span>
          <span className="text-zinc-300">·</span>
          <span className="font-semibold">🎮 Night-owls</span>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600">What&rsquo;s inside</span>
          <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Real guitar moves. Fake guitar.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-white bg-white/80 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl text-2xl" style={{ background: f.bg }}>
                {f.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="border-y border-white/60 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600">How it works</span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">From zero to &ldquo;wait, that&rsquo;s a song&rdquo; in 30 seconds.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {HOW.map((h, i) => (
              <div key={h.title} className="relative rounded-2xl border border-zinc-200 bg-white p-7">
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-amber-500 font-mono text-sm font-black text-white shadow">
                  {i + 1}
                </div>
                <h3 className="mb-2 text-lg font-bold">{h.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-600">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <figure className="rounded-3xl bg-gradient-to-br from-rose-100 to-amber-100 p-10">
            <blockquote className="text-2xl font-semibold leading-relaxed tracking-tight">
              &ldquo;Best possible answer to &lsquo;I&rsquo;m bored and there&rsquo;s no guitar here.&rsquo;&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-zinc-600">— a hostel musician, somewhere</figcaption>
          </figure>
          <figure className="rounded-3xl bg-gradient-to-br from-sky-100 to-fuchsia-100 p-10">
            <blockquote className="text-2xl font-semibold leading-relaxed tracking-tight">
              &ldquo;My students actually heard what a chord progression <em>is</em>.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-zinc-600">— a middle-school music teacher</figcaption>
          </figure>
        </div>
      </section>

      <section id="faq" className="border-t border-white/60 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">Questions you&rsquo;ll definitely ask</h2>
          <dl className="space-y-4">
            {FAQ.map((q) => (
              <div key={q.q} className="rounded-2xl border border-zinc-200 bg-white p-6">
                <dt className="mb-1.5 font-bold text-zinc-900">{q.q}</dt>
                <dd className="text-sm leading-relaxed text-zinc-600">{q.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-4 my-12 overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-amber-500 px-6 py-20 text-center text-white sm:mx-auto sm:max-w-6xl">
        <h2 className="mb-5 text-4xl font-black tracking-tight sm:text-6xl">Your keyboard is a guitar. <br />Go play it.</h2>
        <p className="mb-8 text-lg opacity-90">Tap <span className="font-mono font-bold">2 · w · s · x</span> fast. That&rsquo;s a C chord. Everything else unlocks from there.</p>
        <a href="#instrument" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-rose-600 shadow-lg transition hover:bg-rose-50">
          ↑ Back to the instrument
        </a>
      </section>

      <footer className="border-t border-white/60 bg-white/50 backdrop-blur-sm px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-xs text-zinc-600 sm:flex-row sm:items-center">
          <div>© 2026 KeyStrum · Made with rows, columns, and caffeine</div>
          <div className="flex gap-5">
            <Link href="/" className="hover:text-rose-600">All variants</Link>
            <a href="#" className="hover:text-rose-600">GitHub</a>
            <a href="#" className="hover:text-rose-600">Discord</a>
            <a href="#" className="hover:text-rose-600">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FEATURES = [
  { icon: "🎹", bg: "linear-gradient(135deg,#fecaca,#fed7aa)", title: "Four rows, four strings", body: "Your keyboard&rsquo;s physical layout is the instrument. Row 1 is high E. Row 4 is low D. It&rsquo;s shockingly intuitive." },
  { icon: "↯", bg: "linear-gradient(135deg,#fed7aa,#fef3c7)", title: "Gesture-based strumming", body: "Press a column fast — the system reads order and speed to fire a real up/down strum, not a static chord." },
  { icon: "🎶", bg: "linear-gradient(135deg,#bae6fd,#e9d5ff)", title: "Six chords on tap", body: "2wsx = C. 4rfv = G. Memorize six columns and you&rsquo;ve got every 4-chord pop song in history." },
];

const HOW = [
  { title: "Find the rows", body: "Numbers on top = high E. QWERTY = B. ASDF = G. ZXCV = low D. Already easier than tuning a real guitar." },
  { title: "Strum a column", body: "Hit 2 → w → s → x in under 90ms. You just played a C major, downstroke. Reverse for up." },
  { title: "Move to the next column", body: "4rfv is G. 3edc is A-minor. 5tgb is D-minor. You&rsquo;re three columns into Pachelbel&rsquo;s Canon." },
];

const FAQ = [
  { q: "Is this actually a guitar?", a: "No. It&rsquo;s a keyboard that behaves like a four-string guitar. The chord theory transfers; the right-hand technique doesn&rsquo;t." },
  { q: "What tuning is it?", a: "Top four strings of standard guitar — DGBE. Drop-D and open-G are planned." },
  { q: "Can I use it for production?", a: "MIDI export is on the roadmap. For now, run it alongside your DAW and record audio." },
  { q: "How fast do I need to press?", a: "Under 90 milliseconds from first to last key in a column reads as a strum. Outside that window, each key is a single pluck." },
];
