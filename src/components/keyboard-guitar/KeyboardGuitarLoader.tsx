"use client";

import dynamic from "next/dynamic";
import type { KeyboardGuitarProps } from "./KeyboardGuitar";

// Dynamic import + ssr: false — KeyboardGuitar is client-interactive
// (Web Audio context, ResizeObserver, key handlers). SSR-rendering it
// only inflates the main bundle and TBT without any user-visible win.
// The skeleton placeholder matches the instrument's aspect ratio so
// CLS stays at 0.
const KeyboardGuitar = dynamic(() => import("./KeyboardGuitar"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="aspect-[16/10] w-full animate-pulse rounded-2xl bg-white/[0.02]"
    />
  ),
});

export default function KeyboardGuitarLoader(props: KeyboardGuitarProps) {
  return <KeyboardGuitar {...props} />;
}
