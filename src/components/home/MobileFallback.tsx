"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import MobileFallbackModal from "./MobileFallbackModal";

const DISMISS_KEY = "keystrum-mobile-fallback-dismissed";

export default function MobileFallback() {
  const isMobile = useIsMobile();
  const [dismissed, setDismissed] = useState<boolean | null>(null);

  useEffect(() => {
    let stored = false;
    try { stored = localStorage.getItem(DISMISS_KEY) === "1"; } catch { /* noop */ }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDismissed(stored);
  }, []);

  if (dismissed === null || !isMobile || dismissed) return null;

  const handleClose = () => {
    setDismissed(true);
    try { localStorage.setItem(DISMISS_KEY, "1"); } catch { /* noop */ }
  };

  return <MobileFallbackModal open onClose={handleClose} />;
}
