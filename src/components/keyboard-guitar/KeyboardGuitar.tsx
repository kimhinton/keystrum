"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { guitarSynth } from "@keystrum/synth";
import {
  KEYBOARD_ROWS,
  getKeyPosition,
  type StringIndex,
  DEFAULT_CHORD_COLUMNS,
  getChordFrequencies,
  getPresetForColumn,
  type ChordPreset,
} from "@keystrum/layout";
import { hapticStrum } from "@/lib/haptics";
import { useStatsStore } from "@/lib/stats/store";

export interface KeyboardGuitarProps {
  theme?: "dark" | "light" | "vibrant";
  onActivityChange?: (active: boolean) => void;
}

interface KeyEvent {
  key: string;
  row: StringIndex;
  col: number;
  timestamp: number;
}

const STRUM_WINDOW_MS = 90;

export default function KeyboardGuitar({ theme = "light", onActivityChange }: KeyboardGuitarProps) {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [lastChord, setLastChord] = useState<ChordPreset | null>(null);
  const [strumPulse, setStrumPulse] = useState<{ col: number; dir: "down" | "up" } | null>(null);
  const [goldenFlash, setGoldenFlash] = useState(false);

  const triggerGoldenFlash = useCallback(() => {
    setGoldenFlash(true);
    window.setTimeout(() => setGoldenFlash(false), 900);
  }, []);
  const [audioReady, setAudioReady] = useState(false);
  const recentByCol = useRef<Map<number, KeyEvent[]>>(new Map());
  const strumTimeout = useRef<number | null>(null);
  const isDragging = useRef(false);
  const dragKeys = useRef<Set<string>>(new Set());

  // Measure container → scale row stagger proportionally
  const boardRef = useRef<HTMLDivElement>(null);
  const [stagger, setStagger] = useState(14);
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentBoxSize[0].inlineSize;
      // 14px at ≥800px, scales down linearly, floor 3px
      setStagger(Math.max(3, Math.min(14, Math.round(w * 0.018))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    useStatsStore.getState().startSession();
  }, []);

  const playKey = useCallback(async (key: string) => {
    const pos = getKeyPosition(key);
    if (!pos) return;
    if (!audioReady) {
      await guitarSynth.ensureContext();
      setAudioReady(true);
    }
    const preset = getPresetForColumn(pos.col, DEFAULT_CHORD_COLUMNS);
    if (!preset) {
      const freqs = getChordFrequencies({ name: "open", label: "open", frets: [0, 0, 0, 0], color: "#888" });
      guitarSynth.pluckMuted(freqs[pos.row], 0.55);
      setLastChord({ name: "mute", label: "palm mute", frets: [0, 0, 0, 0], color: "#6b7280" });
      onActivityChange?.(true);
      return;
    }
    const freqs = getChordFrequencies(preset);
    guitarSynth.pluck(freqs[pos.row], 2.4, 0.7);
    setLastChord(preset);
    const stats = useStatsStore.getState();
    stats.recordChordPlay(preset.name);
    stats.recordFirstAudio(); // AARRR Activation — only fires the first time per device
    if (stats.pendingRecall) stats.resolveRecall(preset.name);
    onActivityChange?.(true);
    // 0.5% chance golden key — surprise reward, ~once a week at typical use
    if (Math.random() < 0.005) triggerGoldenFlash();

    const events = recentByCol.current.get(pos.col) ?? [];
    const now = performance.now();
    const pruned = events.filter((e) => now - e.timestamp < STRUM_WINDOW_MS * 2);
    pruned.push({ key, row: pos.row, col: pos.col, timestamp: now });
    recentByCol.current.set(pos.col, pruned);

    if (pruned.length >= 3) {
      const rows = pruned.map((e) => e.row);
      const isDown = rows[0] < rows[rows.length - 1];
      setStrumPulse({ col: pos.col, dir: isDown ? "down" : "up" });
      void hapticStrum();
      if (strumTimeout.current) window.clearTimeout(strumTimeout.current);
      strumTimeout.current = window.setTimeout(() => setStrumPulse(null), 420);
    }
  }, [audioReady, onActivityChange, triggerGoldenFlash]);

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (!getKeyPosition(k)) return;
      e.preventDefault();
      setActiveKeys((prev) => {
        if (prev.has(k)) return prev;
        const next = new Set(prev);
        next.add(k);
        return next;
      });
      playKey(k);
    };
    const handleUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (!getKeyPosition(k)) return;
      setActiveKeys((prev) => {
        if (!prev.has(k)) return prev;
        const next = new Set(prev);
        next.delete(k);
        return next;
      });
    };
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
      if (strumTimeout.current) window.clearTimeout(strumTimeout.current);
    };
  }, [playKey]);

  const handleDragStart = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    dragKeys.current = new Set();
    const el = (e.target as HTMLElement).closest("[data-key]");
    if (el) dragKeys.current.add(el.getAttribute("data-key")!);
  }, []);

  const handleDragMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const keyEl = el.closest("[data-key]") as HTMLElement | null;
      if (!keyEl) return;
      const key = keyEl.getAttribute("data-key")!;
      if (dragKeys.current.has(key)) return;
      dragKeys.current.add(key);
      setActiveKeys((prev) => new Set(prev).add(key));
      playKey(key);
      window.setTimeout(() => {
        setActiveKeys((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }, 180);
    },
    [playKey]
  );

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
    dragKeys.current = new Set();
  }, []);

  const palette = themePalette(theme);

  return (
    <div className="w-full relative" style={{ ["--kg-active" as string]: palette.active }}>
      {goldenFlash && (
        <div
          className="pointer-events-none fixed inset-0 z-40 animate-pulse"
          style={{ boxShadow: "inset 0 0 120px 24px #fbbf24aa" }}
          aria-hidden="true"
        />
      )}
      <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2 sm:px-3 py-1 transition-colors"
          style={{ background: palette.chipBg, color: palette.chipFg }}
        >
          <span className="inline-block size-1.5 rounded-full" style={{ background: audioReady ? "#4ade80" : "#fb923c" }} />
          {audioReady ? "audio live" : "press any key to start"}
        </span>
        {lastChord && (
          <span
            className="inline-flex items-center gap-1 sm:gap-2 rounded-full px-2 sm:px-3 py-1 font-semibold"
            style={{ background: lastChord.color + "22", color: lastChord.color, border: `1px solid ${lastChord.color}44` }}
          >
            {lastChord.name} <span className="opacity-80 font-normal hidden sm:inline">{lastChord.label}</span>
          </span>
        )}
        {strumPulse && (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 sm:px-3 py-1 font-semibold animate-pulse"
            style={{ background: palette.strumBg, color: palette.strumFg }}
          >
            {strumPulse.dir === "down" ? "↓" : "↑"}
          </span>
        )}
      </div>

      <div
        ref={boardRef}
        className="relative w-full overflow-hidden rounded-lg sm:rounded-xl p-1.5 sm:p-3 md:p-4"
        style={{ background: palette.boardBg, border: `1px solid ${palette.boardBorder}`, touchAction: "none" }}
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
      >
        <div className="flex w-full flex-col gap-[2px] sm:gap-1 md:gap-1.5">
          {KEYBOARD_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-[2px] sm:gap-1 md:gap-1.5" style={{ paddingLeft: rowIdx * stagger }}>
              {row.map((key, colIdx) => {
                const isActive = activeKeys.has(key);
                const preset = getPresetForColumn(colIdx);
                const presetColor = preset?.color;
                const isStrumCol = strumPulse?.col === colIdx;
                const isMuteCol = !preset;
                return (
                  <button
                    type="button"
                    key={key}
                    data-key={key}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setActiveKeys((prev) => new Set(prev).add(key));
                      playKey(key);
                    }}
                    onMouseUp={() =>
                      setActiveKeys((prev) => {
                        const n = new Set(prev);
                        n.delete(key);
                        return n;
                      })
                    }
                    onMouseLeave={() =>
                      setActiveKeys((prev) => {
                        const n = new Set(prev);
                        n.delete(key);
                        return n;
                      })
                    }
                    className="relative flex flex-1 min-w-0 aspect-square items-center justify-center rounded sm:rounded-md md:rounded-lg font-mono text-[9px] sm:text-xs md:text-sm font-semibold transition-[transform,box-shadow,background] duration-75"
                    style={{
                      background: isActive
                        ? isMuteCol
                          ? palette.keyMuteActive
                          : palette.keyActive
                        : isMuteCol
                        ? palette.keyMuteBg
                        : palette.keyBg,
                      color: isActive
                        ? isMuteCol
                          ? palette.keyMuteActiveText
                          : palette.keyActiveText
                        : isMuteCol
                        ? palette.keyMuteText
                        : palette.keyText,
                      border: `1px ${isMuteCol ? "dashed" : "solid"} ${
                        isActive
                          ? isMuteCol
                            ? palette.keyMuteActiveBorder
                            : palette.keyActiveBorder
                          : isMuteCol
                          ? palette.keyMuteBorder
                          : palette.keyBorder
                      }`,
                      transform: isActive ? "translateY(2px) scale(0.97)" : "translateY(0)",
                      boxShadow: isActive
                        ? `inset 0 2px 4px ${palette.shadowInset}`
                        : `0 2px 0 ${palette.shadowBase}`,
                    }}
                  >
                    {preset && rowIdx === 0 && (
                      <span
                        className="absolute -top-3.5 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 rounded-full px-1 sm:px-1.5 py-0.5 text-[7px] sm:text-[9px] md:text-[10px] font-bold tracking-wide whitespace-nowrap"
                        style={{
                          background: presetColor,
                          color: "#000",
                          opacity: isStrumCol ? 1 : 0.78,
                          boxShadow: isStrumCol ? `0 0 12px ${presetColor}` : "none",
                        }}
                      >
                        {preset.name}
                      </span>
                    )}
                    <span className="select-none">{key.toUpperCase()}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-2 sm:mt-4 flex flex-wrap items-center gap-x-2 sm:gap-x-4 gap-y-1 text-[8px] sm:text-[11px] font-mono" style={{ color: palette.hintFg }}>
          <span>row 1→E4 · row 2→B3 · row 3→G3 · row 4→D3</span>
          <span className="opacity-80">try: 1-q-a-z (Am) · 5-t-g-b (Dm) fast ↓↑</span>
          <span className="opacity-80 hidden sm:inline">· cols 7+ (7-= · u-] · j-&apos; · m-/): ghost notes</span>
        </div>
      </div>
    </div>
  );
}

function themePalette(theme: "dark" | "light" | "vibrant") {
  if (theme === "dark") {
    return {
      boardBg: "#0f1014",
      boardBorder: "#26262e",
      keyBg: "#1b1c22",
      keyText: "#c9cbd3",
      keyBorder: "#2b2d36",
      keyActive: "#FF3864",
      keyActiveText: "#0E0E12",
      keyActiveBorder: "#FF3864",
      keyMuteBg: "#141418",
      keyMuteText: "#5a5d66",
      keyMuteBorder: "#2b2d36",
      keyMuteActive: "#3a3b43",
      keyMuteActiveText: "#c9cbd3",
      keyMuteActiveBorder: "#4a4d56",
      keyMuteLabel: "#6b7280",
      shadowBase: "#000",
      shadowInset: "rgba(0,0,0,0.6)",
      chipBg: "#1b1c22",
      chipFg: "#8a8d99",
      strumBg: "#FF386422",
      strumFg: "#FF3864",
      active: "#FF3864",
      hintFg: "#6b6e7a",
    };
  }
  if (theme === "vibrant") {
    return {
      boardBg: "linear-gradient(135deg, #fef3c7 0%, #fce7f3 50%, #dbeafe 100%)",
      boardBorder: "#fde68a",
      keyBg: "#ffffff",
      keyText: "#0c0a09",
      keyBorder: "#e7e5e4",
      keyActive: "#f43f5e",
      keyActiveText: "#ffffff",
      keyActiveBorder: "#f43f5e",
      keyMuteBg: "#f5f5f4",
      keyMuteText: "#a8a29e",
      keyMuteBorder: "#d6d3d1",
      keyMuteActive: "#d6d3d1",
      keyMuteActiveText: "#44403c",
      keyMuteActiveBorder: "#a8a29e",
      keyMuteLabel: "#78716c",
      shadowBase: "#d6d3d1",
      shadowInset: "rgba(244,63,94,0.3)",
      chipBg: "#ffffff",
      chipFg: "#57534e",
      strumBg: "#f43f5e22",
      strumFg: "#be123c",
      active: "#f43f5e",
      hintFg: "#78716c",
    };
  }
  return {
    boardBg: "#fafaf9",
    boardBorder: "#e7e5e4",
    keyBg: "#ffffff",
    keyText: "#0c0a09",
    keyBorder: "#d6d3d1",
    keyActive: "#18181b",
    keyActiveText: "#ffffff",
    keyActiveBorder: "#18181b",
    keyMuteBg: "#f5f5f4",
    keyMuteText: "#a8a29e",
    keyMuteBorder: "#d6d3d1",
    keyMuteActive: "#d6d3d1",
    keyMuteActiveText: "#44403c",
    keyMuteActiveBorder: "#a8a29e",
    keyMuteLabel: "#78716c",
    shadowBase: "#d6d3d1",
    shadowInset: "rgba(0,0,0,0.25)",
    chipBg: "#ffffff",
    chipFg: "#57534e",
    strumBg: "#18181b11",
    strumFg: "#18181b",
    active: "#18181b",
    hintFg: "#78716c",
  };
}
