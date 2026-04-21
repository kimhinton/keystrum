"use client";

import Link from "next/link";

export default function ShareError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-neutral-100">
      <h2 className="text-xl font-semibold">Invalid share link</h2>
      <p className="text-sm text-neutral-400">This score link may be expired or malformed.</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-[#FF3864] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#FF5680]"
        >
          Try again
        </button>
        <Link
          href="/play"
          className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-neutral-300 transition hover:border-white/20 hover:text-white"
        >
          Play instead
        </Link>
      </div>
    </div>
  );
}
