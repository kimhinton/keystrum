"use client";

export default function PlayError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-neutral-100">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-sm text-neutral-400">Audio or game state failed to load.</p>
      <button
        onClick={reset}
        className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-black transition hover:bg-brand-hover"
      >
        Try again
      </button>
    </div>
  );
}
