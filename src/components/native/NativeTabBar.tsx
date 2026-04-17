"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { hapticPick } from "@/lib/haptics";

type Tab = {
  href: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
  match: (pathname: string) => boolean;
};

const TABS: Tab[] = [
  {
    href: "/instrument",
    label: "Play",
    match: (p) => p === "/" || p === "/instrument",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="9" width="18" height="9" rx="1.5" />
        <path d="M6 9V7M10 9V7M14 9V7M18 9V7M6 18v-4M10 18v-4M14 18v-4M18 18v-4" />
      </svg>
    ),
  },
  {
    href: "/library",
    label: "Library",
    match: (p) => p.startsWith("/library"),
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12" />
        <path d="M7 17V5M11 17V5M15 17V5M21 21l-3-3 3-3" />
      </svg>
    ),
  },
  {
    href: "/play",
    label: "Songs",
    match: (p) => p.startsWith("/play"),
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 17V5l12-2v12" />
        <circle cx="6" cy="17" r="3" />
        <circle cx="18" cy="15" r="3" />
      </svg>
    ),
  },
  {
    href: "/chords",
    label: "Chords",
    match: (p) => p.startsWith("/chords"),
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
];

export default function NativeTabBar() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0b0b0f]/95 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={() => { void hapticPick(); }}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 transition-colors"
              style={{ color: active ? "#ff6b35" : "#8a8d99" }}
              aria-current={active ? "page" : undefined}
            >
              {tab.icon(active)}
              <span className="text-[10px] font-mono uppercase tracking-widest">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
