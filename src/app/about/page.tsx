import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export const metadata = {
  title: "About keystrum — why a QWERTY guitar, and how Karplus-Strong works",
  description: "Why keystrum exists: practice guitar chords without a guitar. How the QWERTY-to-guitar mapping works, why Karplus-Strong physical modeling synthesis produces a real plucked-string sound in the browser, and what's next on the roadmap.",
  keywords: [
    "Karplus-Strong web audio",
    "javascript guitar synthesis",
    "physical modeling synthesis demo",
    "open source browser instrument",
    "qwerty keyboard instrument",
  ],
  alternates: { canonical: "/about" },
};

const VERSION = "0.1.0";

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-[#0E0E12] text-neutral-100" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <header className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <Link href="/instrument" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Logo size={20} className="shrink-0" />
          keystrum
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">v{VERSION}</span>
      </header>

      <main className="mx-auto max-w-md px-5 py-6">
        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-brand">About</span>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight">A keyboard becomes a guitar.</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Four rows of keys, six columns of chords. Sweep a column top-to-bottom under 90ms and it strums.
          </p>
        </div>

        <ul className="divide-y divide-white/5 rounded-xl border border-white/10 bg-white/[0.02]">
          <Row label="Engine" value="Karplus-Strong physical modeling" />
          <Row label="Latency window" value="90 ms" />
          <Row label="Chords" value="Am · C · Em · G · Dm · F" />
          <Row label="String tuning" value="D3 · G3 · B3 · E4" />
          <Row label="Record cap" value="30 s · m4a / webm" />
          <Row label="License" value="MIT" />
        </ul>

        <section className="mt-8 space-y-5 text-sm leading-relaxed text-neutral-300">
          <div>
            <h2 className="mb-2 text-xs font-mono uppercase tracking-widest text-neutral-400">What is keystrum?</h2>
            <p>
              keystrum is a free, open-source browser-based virtual guitar instrument. It maps a QWERTY computer keyboard to a four-string guitar — four physical keyboard rows (numbers, QWERTY, ASDF, ZXCV) become four guitar strings, and six columns become six diatonic chord presets: Am, C, Em, G, Dm, F. No physical instrument required, no installation, no account.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-xs font-mono uppercase tracking-widest text-neutral-400">How does it sound real?</h2>
            <p>
              keystrum uses Karplus-Strong physical-modeling synthesis — the same algorithm used in commercial guitar plugins. Instead of playing back recorded samples, the algorithm simulates a vibrating string in real-time, producing the natural decay and overtones of a plucked acoustic guitar. The synthesis runs entirely in your browser via the Web Audio API. No server roundtrip, no audio files to download.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-xs font-mono uppercase tracking-widest text-neutral-400">Who is it for?</h2>
            <p>
              Beginning guitarists practicing chord transitions on the go, music teachers demonstrating progressions in the browser, late-night jammers without a guitar at hand, DAW producers sketching chord ideas, and anyone curious about how physical-modeling synthesis works. keystrum.app is distinct from <em>Keystrum</em>, the alternative music project by Chuck Arizona.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-xs font-mono uppercase tracking-widest text-neutral-400">Why a QWERTY keyboard?</h2>
            <p>
              Your laptop&apos;s QWERTY keyboard has four usable rows and at least six columns — exactly enough for four strings × six diatonic chords. The mapping is one-to-one. You do not learn a new instrument; you re-use the one already under your fingers. Sweep three or more keys in a column within 90 ms and keystrum reads it as a downstroke. Reverse the sweep for an upstroke. The same physical action as a guitar pick crossing strings.
            </p>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-2">
          <Link href="/privacy" className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-medium text-neutral-200 transition hover:bg-white/[0.04]">
            Privacy policy
          </Link>
          <a href="https://github.com/kimhinton/keystrum" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm font-medium text-neutral-200 transition hover:bg-white/[0.04]">
            Source on GitHub
          </a>
        </div>

        <p className="mt-8 text-center text-[11px] font-mono text-neutral-400">
          No tracking · No account · No upload
        </p>
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between px-4 py-3 text-sm">
      <span className="text-neutral-400">{label}</span>
      <span className="font-medium text-neutral-100">{value}</span>
    </li>
  );
}
