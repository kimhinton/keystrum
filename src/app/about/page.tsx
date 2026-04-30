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

        <div className="mt-6 flex flex-col gap-2">
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
