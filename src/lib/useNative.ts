"use client";

import { useEffect, useState } from "react";
import { isNative } from "./platform";

/**
 * SSR-safe native detection.
 * Returns `null` during SSR + first client render, then true/false after mount.
 * Components should render web-default when null to avoid hydration mismatch.
 */
export function useNative(): boolean | null {
  const [native, setNative] = useState<boolean | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNative(isNative());
  }, []);
  return native;
}
