"use client";

import { useEffect, useState } from "react";

const SESSION_LIMIT_MS = 25 * 60 * 1000;
const CHECK_INTERVAL_MS = 30 * 1000;
const POSTPONE_MS = 25 * 60 * 1000;

export default function SessionBreakNudge() {
  const [sessionStart] = useState(() => Date.now());
  const [show, setShow] = useState(false);
  const [postponedUntil, setPostponedUntil] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const elapsed = now - sessionStart;
      if (elapsed >= SESSION_LIMIT_MS && now >= postponedUntil) {
        setShow(true);
      }
    };
    tick();
    const id = setInterval(tick, CHECK_INTERVAL_MS);
    return () => clearInterval(id);
  }, [sessionStart, postponedUntil]);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-lg border border-neutral-700 bg-neutral-900/95 px-4 py-3 text-sm text-neutral-100 shadow-lg backdrop-blur-sm sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="font-medium">25 minutes — nice session.</p>
          <p className="mt-1 text-neutral-300">
            Your prefrontal cortex thanks you. Stretch, hydrate, then come back fresh.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShow(false);
            setPostponedUntil(Date.now() + POSTPONE_MS);
          }}
          className="rounded p-1 text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-600"
          aria-label="Dismiss break reminder"
        >
          ×
        </button>
      </div>
    </div>
  );
}
