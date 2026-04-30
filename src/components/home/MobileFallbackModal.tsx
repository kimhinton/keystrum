"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type Props = { open: boolean; onClose: () => void };

export default function MobileFallbackModal({ open, onClose }: Props) {
  const [installEvt, setInstallEvt] = useState<BeforeInstallPromptEvent | null>(null);
  const [env, setEnv] = useState<{ isIOS: boolean; shareAvailable: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnv({
      isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
      shareAvailable: typeof navigator.share === "function",
    });
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const isIOS = env?.isIOS ?? false;
  const shareAvailable = env?.shareAvailable ?? false;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const install = async () => {
    if (!installEvt) return;
    await installEvt.prompt();
    onClose();
  };

  const shareKeystrum = async () => {
    const url = window.location.origin;
    if (shareAvailable) {
      try {
        await navigator.share({
          title: "keystrum",
          text: "Practice guitar chords on your keyboard — no guitar needed.",
          url,
        });
        onClose();
        return;
      } catch { /* user cancelled */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm p-4 sm:items-center" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#12121a] p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl leading-none text-neutral-400 transition hover:text-white"
          aria-label="Close"
        >
          ×
        </button>

        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-[#FF3864]">
          <span className="size-1.5 rounded-full bg-[#FF3864]" />
          On mobile
        </div>
        <h2 className="mb-2 text-xl font-semibold tracking-tight">
          Tap or drag to strum.
        </h2>
        <p className="mb-6 text-sm text-neutral-400">
          The on-screen keys are fully playable — tap for single notes, drag across a column to strum. Practice mode has full touch-drag strum support. Install as an app for a full-screen, offline experience.
        </p>

        <div className="flex flex-col gap-2">
          {installEvt && (
            <button
              type="button"
              onClick={install}
              className="rounded-full bg-[#FF3864] py-3 text-sm font-semibold text-black transition hover:bg-[#FF5680]"
            >
              Install as app
            </button>
          )}
          {!installEvt && isIOS && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-neutral-300">
              <div className="mb-1 font-semibold text-white">Install on iOS</div>
              Tap <span className="font-mono text-[#FF3864]">Share</span> → <span className="font-mono text-[#FF3864]">Add to Home Screen</span>
            </div>
          )}
          <button
            type="button"
            onClick={shareKeystrum}
            className="rounded-full border border-white/10 bg-white/[0.03] py-3 text-sm font-medium text-neutral-200 transition hover:border-white/20 hover:bg-white/[0.06]"
          >
            {copied ? "Link copied ✓" : shareAvailable ? "Share keystrum →" : "Copy link"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="pt-2 text-xs text-neutral-400 transition hover:text-neutral-300"
          >
            Keep playing
          </button>
        </div>
      </div>
    </div>
  );
}
