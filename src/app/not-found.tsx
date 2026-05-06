import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for does not exist. Browse the chord dictionary, practice mode, or return to the keystrum instrument.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0E0E12] text-neutral-100">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#0E0E12]/80 px-6 py-4 backdrop-blur-xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <Logo size={20} className="shrink-0" />
          keystrum
        </Link>
      </nav>

      <main className="mx-auto flex min-h-[calc(100vh-49px-80px)] max-w-3xl flex-col items-start justify-center px-6 py-16">
        <span className="font-mono text-xs uppercase tracking-widest text-brand">404</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Page not found.
        </h1>
        <p className="mt-3 max-w-xl text-neutral-400">
          The URL you followed does not exist on keystrum. It may have been
          renamed, removed, or you may have a typo. Try one of the entry points
          below — the instrument, chord dictionary, and practice mode are
          probably where you wanted to go.
        </p>

        <div className="mt-10 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/"
            className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-brand/40"
          >
            <h2 className="mb-1 text-sm font-semibold text-neutral-200">Instrument</h2>
            <p className="text-xs text-neutral-400">
              The keystrum home page. Strum your QWERTY keyboard right away.
            </p>
            <span className="mt-3 inline-block text-xs text-brand transition group-hover:text-brand-hover">
              Open →
            </span>
          </Link>
          <Link
            href="/chords"
            className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20"
          >
            <h2 className="mb-1 text-sm font-semibold text-neutral-200">Chord dictionary</h2>
            <p className="text-xs text-neutral-400">
              Six chords (Am, C, Em, G, Dm, F) — notes, voicings, theory, songs.
            </p>
            <span className="mt-3 inline-block text-xs text-neutral-300">Open →</span>
          </Link>
          <Link
            href="/play"
            className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20"
          >
            <h2 className="mb-1 text-sm font-semibold text-neutral-200">Practice mode</h2>
            <p className="text-xs text-neutral-400">
              Three folk standards. A character shows when to strum, hold, mute.
            </p>
            <span className="mt-3 inline-block text-xs text-neutral-300">Open →</span>
          </Link>
          <Link
            href="/instrument"
            className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20"
          >
            <h2 className="mb-1 text-sm font-semibold text-neutral-200">Full instrument</h2>
            <p className="text-xs text-neutral-400">
              Keyboard with metronome, volume, recording, and share.
            </p>
            <span className="mt-3 inline-block text-xs text-neutral-300">Open →</span>
          </Link>
          <Link
            href="/about"
            className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20"
          >
            <h2 className="mb-1 text-sm font-semibold text-neutral-200">About</h2>
            <p className="text-xs text-neutral-400">
              How Karplus-Strong synthesis works, who keystrum is for.
            </p>
            <span className="mt-3 inline-block text-xs text-neutral-300">Open →</span>
          </Link>
          <a
            href="https://github.com/kimhinton/keystrum/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20"
          >
            <h2 className="mb-1 text-sm font-semibold text-neutral-200">Report a broken link</h2>
            <p className="text-xs text-neutral-400">
              Open an issue on GitHub if you found this 404 from a real source.
            </p>
            <span className="mt-3 inline-block text-xs text-neutral-300">GitHub →</span>
          </a>
        </div>
      </main>

      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between text-xs text-neutral-400">
          <div>© 2026 keystrum · MIT licensed</div>
          <Link href="/" className="hover:text-neutral-300">
            ← Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
