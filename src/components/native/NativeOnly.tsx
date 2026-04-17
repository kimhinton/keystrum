"use client";

import { useNative } from "@/lib/useNative";

export function NativeOnly({ children }: { children: React.ReactNode }) {
  const native = useNative();
  return native === true ? <>{children}</> : null;
}

export function WebOnly({ children }: { children: React.ReactNode }) {
  const native = useNative();
  // SSR + first client render: show web content (safe for SEO)
  if (native === null) return <>{children}</>;
  return native ? null : <>{children}</>;
}
