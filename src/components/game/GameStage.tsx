"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import {
  ALL_LANES,
  JUDGE_WINDOWS,
  LANE_COLORS,
  LANE_KEYS,
  MUTE_COLORS,
  MUTE_KEYS,
  type GameNote,
  type Lane,
  type Song,
} from "@/lib/game/types";
import { KEYBOARD_ROWS, type ChordPreset } from "@keystrum/layout";

export interface ActiveHoldInfo {
  noteId: number;
  lane: Lane;
  key: string;
}

interface StageProps {
  song: Song;
  now: number;
  pressedKeys: Set<string>;
  chordPresets: Record<Lane, ChordPreset | null>;
  activeHolds: ActiveHoldInfo[];
  strumPending: Map<number, { firstKey: string; firstAt: number }>;
  consumed: Set<number>;
  missed: Set<number>;
  strumming: boolean;
  missing: boolean;
  lastHitLane: Lane | null;
  onLaneTap: (lane: Lane, key: string) => void;
  onLaneRelease: (key: string) => void;
  onGhostTap: (key: string) => void;
}

const VIEW_W = 900;
const VIEW_H = 560;

const KB_X = 70;
const KB_Y = 250;
const KB_W = 760;
const KB_H = 220;
const KEY_W = 54;
const KEY_H = 38;
const SLOT = 58;
const ROW_H = 44;
const ROW_STAGGER = [0, 14, 26, 42];
const KB_INNER_OFFSET_X = 16;
const KB_INNER_OFFSET_Y = 18;

function keyRect(row: number, col: number): { x: number; y: number; cx: number; cy: number } {
  const x = KB_X + KB_INNER_OFFSET_X + ROW_STAGGER[row] + col * SLOT;
  const y = KB_Y + KB_INNER_OFFSET_Y + row * ROW_H;
  return { x, y, cx: x + KEY_W / 2, cy: y + KEY_H / 2 };
}

const LANE_PRIMARY_CENTER: Record<Lane, { x: number; y: number }> = {
  0: { x: keyRect(1, 0).cx, y: keyRect(1, 0).cy },
  1: { x: keyRect(1, 1).cx, y: keyRect(1, 1).cy },
  2: { x: keyRect(1, 2).cx, y: keyRect(1, 2).cy },
  3: { x: keyRect(1, 3).cx, y: keyRect(1, 3).cy },
  4: { x: keyRect(1, 4).cx, y: keyRect(1, 4).cy },
  5: { x: keyRect(1, 5).cx, y: keyRect(1, 5).cy },
};

const REST_RIGHT = { x: 440, y: 220 };
const REST_LEFT = { x: 210, y: 225 };

const APPROACH_MS = 900;
const CHORD_FLASH_DURATION = 380;
const HAND_PRESS_RADIUS = 38;
const HAND_PRESS_INNER = 16;

function computeGlow(dt: number): number {
  if (dt > 2000) return 0;
  if (dt >= 0) return Math.max(0.06, 1 - dt / 2000);
  if (dt > -JUDGE_WINDOWS.miss) return Math.max(0, 1 - Math.abs(dt) / JUDGE_WINDOWS.miss);
  return 0;
}

function interpHand(
  note: GameNote | null,
  rest: { x: number; y: number },
  now: number,
  active: { x: number; y: number } | null
): { x: number; y: number } {
  if (active) return active;
  if (!note) return rest;
  const dt = note.time - now;
  if (dt > APPROACH_MS) return rest;
  if (dt <= 0) return LANE_PRIMARY_CENTER[note.lane];
  const target = LANE_PRIMARY_CENTER[note.lane];
  const progress = 1 - dt / APPROACH_MS;
  return {
    x: rest.x + (target.x - rest.x) * progress,
    y: rest.y + (target.y - rest.y) * progress,
  };
}

function blendHex(hex: string, alpha: number): string {
  const a = Math.max(0, Math.min(1, alpha));
  return `${hex}${Math.round(a * 255).toString(16).padStart(2, "0")}`;
}

export default function GameStage({
  song,
  now,
  pressedKeys,
  chordPresets,
  activeHolds,
  strumPending,
  consumed,
  missed,
  strumming,
  missing,
  lastHitLane,
  onLaneTap,
  onLaneRelease,
  onGhostTap,
}: StageProps) {
  const upcomingByLane = useMemo<Record<Lane, GameNote | null>>(() => {
    const out: Record<Lane, GameNote | null> = { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null };
    for (const n of song.notes) {
      if (consumed.has(n.id) || missed.has(n.id)) continue;
      if (n.time - now < -JUDGE_WINDOWS.miss) continue;
      if (n.kind === "mute" || n.kind === "hold") continue;
      if (!out[n.lane]) out[n.lane] = n;
    }
    return out;
  }, [song.notes, now, consumed, missed]);

  const upcomingMute = useMemo(() => {
    for (const n of song.notes) {
      if (consumed.has(n.id) || missed.has(n.id)) continue;
      if (n.kind !== "mute" && n.kind !== "hold") continue;
      if (n.muteCol === undefined) continue;
      if (n.time - now < -JUDGE_WINDOWS.miss) continue;
      if (n.time - now > 2000) continue;
      return n;
    }
    return null;
  }, [song.notes, now, consumed, missed]);

  const earliestNonHold = useMemo(() => {
    let best: GameNote | null = null;
    for (const lane of ALL_LANES) {
      const n = upcomingByLane[lane];
      if (!n || n.kind === "hold") continue;
      if (!best || n.time < best.time) best = n;
    }
    return best;
  }, [upcomingByLane]);

  const earliestHold = useMemo(() => {
    let best: GameNote | null = null;
    for (const lane of ALL_LANES) {
      const n = upcomingByLane[lane];
      if (!n || n.kind !== "hold") continue;
      if (!best || n.time < best.time) best = n;
    }
    return best;
  }, [upcomingByLane]);

  const activeHold = activeHolds[0];
  const restingRightHand = interpHand(earliestNonHold, REST_RIGHT, now, null);

  const rightIsStrumming =
    strumming || (earliestNonHold?.kind === "strum" && earliestNonHold.time - now < 250);
  const rightHandColor = rightIsStrumming
    ? "#ff6b35"
    : missing
    ? "#f87171"
    : lastHitLane !== null
    ? LANE_COLORS[lastHitLane]
    : "#e7e5e4";

  const mouthPath = rightIsStrumming
    ? "M 430 148 Q 450 160 470 148"
    : missing
    ? "M 434 152 Q 450 142 466 152"
    : "M 434 148 Q 450 152 466 148";

  const strumPendingLanes = useMemo(() => {
    const set = new Set<Lane>();
    for (const [noteId] of strumPending) {
      const n = song.notes.find((nn) => nn.id === noteId);
      if (n) set.add(n.lane);
    }
    return set;
  }, [strumPending, song.notes]);

  const lanesPressed = useMemo<Set<Lane>>(() => {
    const set = new Set<Lane>();
    (Object.entries(LANE_KEYS) as Array<[string, string[]]>).forEach(([laneStr, keys]) => {
      if (keys.some((k) => pressedKeys.has(k))) set.add(Number(laneStr) as Lane);
    });
    return set;
  }, [pressedKeys]);

  const nowRef = useRef(now);
  useEffect(() => { nowRef.current = now; });

  const laneHitTimeRef = useRef<Record<Lane, number>>({ 0: -9999, 1: -9999, 2: -9999, 3: -9999, 4: -9999, 5: -9999 });
  useLayoutEffect(() => {
    if (lastHitLane !== null) {
      laneHitTimeRef.current = { ...laneHitTimeRef.current, [lastHitLane]: nowRef.current };
    }
  }, [lastHitLane]);

  const STRUM_LEAD_MS = 420;
  const STRUM_TAIL_MS = 180;
  const demoStrumNote = useMemo(() => {
    for (const n of song.notes) {
      if (consumed.has(n.id) || missed.has(n.id)) continue;
      if (n.kind !== "strum") continue;
      const dt = n.time - now;
      if (dt > STRUM_LEAD_MS) continue;
      if (dt < -STRUM_TAIL_MS) continue;
      return n;
    }
    return null;
  }, [song.notes, now, consumed, missed]);

  const strumLane = demoStrumNote?.lane ?? 0;
  const strumStart = {
    x: keyRect(0, strumLane).cx,
    y: keyRect(0, strumLane).cy - 36,
  };
  const strumEnd = {
    x: keyRect(3, strumLane).cx,
    y: keyRect(3, strumLane).cy + 38,
  };

  let strumRollProgress: number | null = null;
  let strumProgressEased = 0;
  let strumHandPos: { x: number; y: number } | null = null;
  if (demoStrumNote) {
    const dt = demoStrumNote.time - now;
    const raw = (STRUM_LEAD_MS - dt) / (STRUM_LEAD_MS + STRUM_TAIL_MS);
    strumRollProgress = Math.max(0, Math.min(1, raw));
    strumProgressEased =
      strumRollProgress * strumRollProgress * (3 - 2 * strumRollProgress);
    strumHandPos = {
      x: strumStart.x + (strumEnd.x - strumStart.x) * strumProgressEased,
      y: strumStart.y + (strumEnd.y - strumStart.y) * strumProgressEased,
    };
  }

  const strumTrail: Array<{ x: number; y: number; opacity: number }> = [];
  if (strumRollProgress !== null) {
    for (let i = 1; i <= 8; i++) {
      const tp = strumRollProgress - i * 0.045;
      if (tp <= 0) break;
      const eased = tp * tp * (3 - 2 * tp);
      strumTrail.push({
        x: strumStart.x + (strumEnd.x - strumStart.x) * eased,
        y: strumStart.y + (strumEnd.y - strumStart.y) * eased,
        opacity: (1 - i / 8) * 0.55,
      });
    }
  }

  function handKeyIntensity(kx: number, ky: number): number {
    if (strumHandPos === null) return 0;
    const dx = strumHandPos.x - kx;
    const dy = strumHandPos.y - ky;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > HAND_PRESS_RADIUS) return 0;
    if (dist < HAND_PRESS_INNER) return 1;
    return 1 - (dist - HAND_PRESS_INNER) / (HAND_PRESS_RADIUS - HAND_PRESS_INNER);
  }

  let tapPressBounceY = 0;
  let tapPressLane: Lane | null = null;
  let tapPressKey: string | null = null;
  if (strumRollProgress === null && earliestNonHold && earliestNonHold.kind !== "hold") {
    const dt = earliestNonHold.time - now;
    if (dt <= 90 && dt >= -170) {
      const t = (90 - dt) / 260;
      const peak = 0.35;
      tapPressBounceY =
        t < peak
          ? (t / peak) * 9
          : Math.max(0, (1 - (t - peak) / (1 - peak)) * 9);
      if (t > 0.08 && t < 0.75) {
        tapPressLane = earliestNonHold.lane;
        tapPressKey = LANE_KEYS[earliestNonHold.lane][1];
      }
    }
  }

  const nextTapTarget =
    strumRollProgress === null && earliestNonHold && earliestNonHold.kind !== "hold"
      ? LANE_PRIMARY_CENTER[earliestNonHold.lane]
      : null;
  const showAimLine =
    nextTapTarget !== null &&
    earliestNonHold !== null &&
    earliestNonHold.time - now > 60 &&
    earliestNonHold.time - now < 1500;
  const aimLineIntensity = showAimLine && earliestNonHold
    ? Math.min(1, 1 - (earliestNonHold.time - now) / 1500)
    : 0;

  const rightHand =
    strumHandPos !== null
      ? strumHandPos
      : {
          x: restingRightHand.x,
          y: restingRightHand.y + tapPressBounceY,
        };

  const _leftHand =
    strumHandPos !== null
      ? activeHold
        ? LANE_PRIMARY_CENTER[activeHold.lane]
        : REST_LEFT
      : interpHand(
          earliestHold,
          REST_LEFT,
          now,
          activeHold ? LANE_PRIMARY_CENTER[activeHold.lane] : null
        );

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="block h-auto w-full max-w-[900px] touch-none select-none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="stage-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#24252d" />
          <stop offset="100%" stopColor="#101015" />
        </linearGradient>
        <linearGradient id="stage-keyboard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#0b0b0f" />
        </linearGradient>
        <linearGradient id="stage-key-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#24252d" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
        <radialGradient id="stage-spot" cx="0.5" cy="0" r="0.9">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="stage-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14141a" />
          <stop offset="100%" stopColor="#0b0b0f" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="url(#stage-floor)" />
      <ellipse cx={VIEW_W / 2} cy={VIEW_H} rx={VIEW_W / 2} ry="80" fill="url(#stage-spot)" />

      <g style={{ animation: "kg-bob 1.8s ease-in-out infinite", transformOrigin: "450px 170px" }}>
        <ellipse cx="450" cy="244" rx="160" ry="6" fill="#000" opacity="0.35" />

        <path
          d="M 350 170 L 550 170 L 590 260 L 310 260 Z"
          fill="url(#stage-body)"
          stroke="#c9cbd3"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M 380 180 L 380 255" stroke="#c9cbd3" strokeWidth="1.2" opacity="0.3" />
        <path d="M 520 180 L 520 255" stroke="#c9cbd3" strokeWidth="1.2" opacity="0.3" />
        <rect x="420" y="200" width="60" height="10" rx="2" fill="#ff6b35" opacity="0.85" />
        <text x="450" y="208" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="800" fill="#0b0b0f">
          KEYSTRUM
        </text>

        <circle cx="450" cy="110" r="55" fill="url(#stage-body)" stroke="#c9cbd3" strokeWidth="3.5" />
        <path
          d="M 395 90 Q 395 54 450 54 Q 505 54 505 90"
          fill="none"
          stroke="#c9cbd3"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect x="384" y="88" width="18" height="38" rx="6" fill="#c9cbd3" />
        <rect x="498" y="88" width="18" height="38" rx="6" fill="#c9cbd3" />
        <circle cx="384" cy="107" r="4" fill="#0b0b0f" />
        <circle cx="516" cy="107" r="4" fill="#0b0b0f" />

        <ellipse cx="432" cy="112" rx="7" ry="5" fill="#c9cbd3" />
        <ellipse cx="468" cy="112" rx="7" ry="5" fill="#c9cbd3" />
        <circle cx="433" cy="113" r="2" fill="#0b0b0f" />
        <circle cx="469" cy="113" r="2" fill="#0b0b0f" />
        <circle cx="434" cy="112" r="0.7" fill="#c9cbd3" />
        <circle cx="470" cy="112" r="0.7" fill="#c9cbd3" />

        <path d="M 422 95 Q 432 92 442 96" fill="none" stroke="#c9cbd3" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 458 96 Q 468 92 478 95" fill="none" stroke="#c9cbd3" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d={mouthPath}
          fill="none"
          stroke="#c9cbd3"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <ellipse cx="418" cy="135" rx="7" ry="3.5" fill="#ff6b35" opacity="0.18" />
        <ellipse cx="482" cy="135" rx="7" ry="3.5" fill="#ff6b35" opacity="0.18" />
      </g>

      <path
        d={`M ${KB_X} ${KB_Y + 30} Q ${KB_X - 20} ${KB_Y - 40} 360 ${KB_Y - 90}`}
        fill="none"
        stroke="#8a8d99"
        strokeWidth="2.5"
        strokeDasharray="4 5"
      />
      <path
        d={`M ${KB_X + KB_W} ${KB_Y + 30} Q ${KB_X + KB_W + 20} ${KB_Y - 40} 540 ${KB_Y - 90}`}
        fill="none"
        stroke="#8a8d99"
        strokeWidth="2.5"
        strokeDasharray="4 5"
      />

      <rect
        x={KB_X}
        y={KB_Y}
        width={KB_W}
        height={KB_H}
        rx="10"
        fill="url(#stage-keyboard)"
        stroke="#c9cbd3"
        strokeWidth="2.5"
      />
      <rect x={KB_X} y={KB_Y} width={KB_W} height="12" rx="10" fill="#0b0b0f" />
      <rect x={KB_X + 12} y={KB_Y + 4} width="120" height="4" rx="2" fill="#3a3b43" />
      <text
        x={KB_X + KB_W - 16}
        y={KB_Y + 8}
        textAnchor="end"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="700"
        fill="#6b6e7a"
      >
        KS-45 · MECHANICAL
      </text>

      {KEYBOARD_ROWS.map((row, rowIdx) =>
        row.map((keyChar, colIdx) => {
          const { x, y } = keyRect(rowIdx, colIdx);
          const isLaneCol = colIdx < 6;
          const lane = isLaneCol ? (colIdx as Lane) : null;
          const upcoming = lane !== null ? upcomingByLane[lane] : null;
          const dt = upcoming ? upcoming.time - now : Infinity;
          const intensity = lane !== null ? computeGlow(dt) : 0;
          const color = lane !== null ? LANE_COLORS[lane] : "#2b2d36";
          const isPressed = pressedKeys.has(keyChar);
          const isHeld = activeHolds.some((h) => h.key === keyChar);
          const isStrumPending = lane !== null && strumPendingLanes.has(lane);
          const isPrimary = rowIdx === 1 && isLaneCol;
          const _isInPressedChord = lane !== null && lanesPressed.has(lane);
          const chordFlashElapsed = lane !== null ? now - laneHitTimeRef.current[lane] : Infinity;
          const _chordFlashIntensity =
            chordFlashElapsed >= 0 && chordFlashElapsed < CHORD_FLASH_DURATION
              ? 1 - chordFlashElapsed / CHORD_FLASH_DURATION
              : 0;

          const handStrumIntensity = handKeyIntensity(x + KEY_W / 2, y + KEY_H / 2);
          const isHandStrumHit = handStrumIntensity > 0.2;
          const isHandTapHit = tapPressKey !== null && tapPressKey === keyChar;
          const isHandPressing = isHandStrumHit || isHandTapHit;

          const _chordGlow = 0;
          const upcomingHint = (() => {
            if (!isLaneCol || intensity <= 0.08) return 0;
            if (upcoming?.kind === "strum") return intensity * 0.6;
            if (isPrimary) return intensity * 0.7;
            return 0;
          })();

          let strumRowGlow = 0;
          if (strumRollProgress !== null && isLaneCol && lane === strumLane) {
            const rowStart = rowIdx * 0.22;
            const rowEnd = rowStart + 0.38;
            if (strumProgressEased >= rowStart && strumProgressEased <= rowEnd) {
              const t = (strumProgressEased - rowStart) / (rowEnd - rowStart);
              strumRowGlow = Math.sin(t * Math.PI) * 0.9;
            }
          }
          const totalGlow = Math.max(upcomingHint, strumRowGlow);

          const fill = isPressed || isHandPressing
            ? isLaneCol
              ? color
              : blendHex("#ff9966", 0.85)
            : isLaneCol && totalGlow > 0
            ? blendHex(color, Math.max(0.12, totalGlow))
            : isLaneCol
            ? blendHex(color, 0.04)
            : "url(#stage-key-face)";
          const stroke = isHeld
            ? color
            : isPressed || isHandPressing
            ? isLaneCol
              ? color
              : "#ff9966"
            : isLaneCol && totalGlow > 0.3
            ? color
            : isLaneCol
            ? `${color}66`
            : "#2b2d36";
          const strokeWidth = isHeld
            ? 3
            : isPressed || isHandPressing || totalGlow > 0.6
            ? 2.2
            : isLaneCol
            ? 1.4
            : 1;
          const textColor =
            isPressed || isHandPressing || (isLaneCol && totalGlow > 0.5)
              ? "#0b0b0f"
              : isLaneCol
              ? color
              : "#5a5d66";
          const isLabelDimmed = !isLaneCol && !isHandPressing;
          const keyFilter =
            isHandPressing && isLaneCol
              ? `drop-shadow(0 0 ${6 + totalGlow * 8}px ${color})`
              : isHandPressing
              ? "drop-shadow(0 0 10px #ff9966)"
              : totalGlow > 0.2 && isLaneCol
              ? `drop-shadow(0 0 ${4 + totalGlow * 10}px ${color})`
              : "none";
          const keyDepressY = isHandPressing
            ? isHandStrumHit
              ? 2.5 * handStrumIntensity
              : 2.5
            : 0;

          const muteIdx = (MUTE_KEYS as readonly string[]).indexOf(keyChar);
          const isMuteTarget = rowIdx === 2 && muteIdx >= 0 && upcomingMute?.muteCol === muteIdx;
          const muteIntensity = isMuteTarget && upcomingMute ? computeGlow(upcomingMute.time - now) : 0;
          const muteColor = muteIdx >= 0 ? (MUTE_COLORS[muteIdx] ?? "#f59e0b") : "#f59e0b";

          const isHeldMute = isHeld && muteIdx >= 0;
          const finalFill = isHeldMute ? muteColor : muteIntensity > 0.1 ? blendHex(muteColor, Math.max(0.15, muteIntensity * 0.65)) : fill;
          const finalStroke = isHeldMute ? muteColor : muteIntensity > 0.3 ? muteColor : muteIntensity > 0.1 ? `${muteColor}66` : stroke;
          const finalStrokeWidth = isHeldMute ? 3 : muteIntensity > 0.6 ? 2.2 : muteIntensity > 0.1 ? 1.6 : strokeWidth;
          const finalKeyFilter = isHeldMute ? `drop-shadow(0 0 14px ${muteColor})` : muteIntensity > 0.2 ? `drop-shadow(0 0 ${4 + muteIntensity * 10}px ${muteColor})` : keyFilter;

          return (
            <g key={`${rowIdx}-${colIdx}`}>
              <rect
                x={x}
                y={y}
                width={KEY_W}
                height={KEY_H}
                rx="4"
                fill={finalFill}
                stroke={finalStroke}
                strokeWidth={finalStrokeWidth}
                strokeDasharray={isLaneCol || isMuteTarget ? "none" : "3 2"}
                style={{
                  filter: finalKeyFilter,
                  cursor: "pointer",
                  transition: isHandPressing
                    ? "fill 40ms, stroke 40ms, filter 40ms"
                    : "fill 70ms, stroke 70ms, stroke-width 70ms, filter 90ms, transform 90ms",
                  transform: keyDepressY > 0 ? `translateY(${keyDepressY}px)` : undefined,
                }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  if (isLaneCol && lane !== null) onLaneTap(lane, keyChar);
                  else onGhostTap(keyChar);
                }}
                onPointerUp={() => {
                  if (isLaneCol) onLaneRelease(keyChar);
                }}
                onPointerLeave={() => {
                  if (isLaneCol) onLaneRelease(keyChar);
                }}
              />
              <text
                x={x + KEY_W / 2}
                y={y + KEY_H / 2 + 4}
                textAnchor="middle"
                fontSize={isPrimary ? 16 : 12}
                fontWeight={isPrimary ? 900 : 700}
                fontFamily="monospace"
                fill={textColor}
                opacity={isLabelDimmed ? 0.6 : 1}
                style={{ pointerEvents: "none", transition: "fill 70ms" }}
              >
                {keyChar.toUpperCase()}
              </text>
              {isLaneCol && upcoming && intensity > 0.12 && (upcoming.kind === "strum" || isPrimary) && (
                <g style={{ pointerEvents: "none" }}>
                  <rect
                    x={x - 3 - (1 - intensity) * 10}
                    y={y - 3 - (1 - intensity) * 10}
                    width={KEY_W + 6 + (1 - intensity) * 20}
                    height={KEY_H + 6 + (1 - intensity) * 20}
                    rx={5 + (1 - intensity) * 10}
                    fill="none"
                    stroke={upcoming.kind === "strum" ? "#ff6b35" : color}
                    strokeWidth={upcoming.kind === "strum" ? 2.5 : 2}
                    opacity={Math.min(0.95, intensity * 1.2)}
                  />
                  {isPrimary && upcoming.kind === "tap" && intensity > 0.2 && (
                    <>
                      <rect
                        x={x + KEY_W / 2 - 16}
                        y={y - 32}
                        width={32}
                        height={22}
                        rx="5"
                        fill={color}
                        opacity={Math.min(1, intensity * 1.4)}
                      />
                      <text
                        x={x + KEY_W / 2}
                        y={y - 17}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="900"
                        fontFamily="monospace"
                        fill="#0b0b0f"
                        opacity={Math.min(1, intensity * 1.4)}
                      >
                        {keyChar.toUpperCase()}
                      </text>
                      <path
                        d={`M ${x + KEY_W / 2 - 6} ${y - 6} L ${x + KEY_W / 2} ${y} L ${x + KEY_W / 2 + 6} ${y - 6}`}
                        stroke={color}
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        opacity={Math.min(1, intensity * 1.3)}
                      />
                    </>
                  )}
                  {isPrimary && upcoming.kind === "hold" && (
                    <>
                      <rect
                        x={x + 8}
                        y={y - 20}
                        width={38}
                        height={14}
                        rx="3"
                        fill="#fbbf24"
                        opacity={Math.min(1, intensity * 1.3)}
                      />
                      <text
                        x={x + KEY_W / 2}
                        y={y - 10}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="900"
                        fontFamily="monospace"
                        fill="#0b0b0f"
                        opacity={Math.min(1, intensity * 1.3)}
                      >
                        HOLD
                      </text>
                    </>
                  )}
                  {rowIdx === 0 && upcoming.kind === "strum" && (
                    <>
                      <rect
                        x={x + 2}
                        y={y - 22}
                        width={50}
                        height={16}
                        rx="3"
                        fill="#ff6b35"
                        opacity={Math.min(1, intensity * 1.4)}
                      />
                      <text
                        x={x + KEY_W / 2}
                        y={y - 10}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="900"
                        fontFamily="monospace"
                        fill="#0b0b0f"
                        opacity={Math.min(1, intensity * 1.4)}
                      >
                        ⇅ STRUM
                      </text>
                    </>
                  )}
                </g>
              )}
              {isPrimary && isStrumPending && (
                <circle
                  cx={x + KEY_W / 2}
                  cy={y + KEY_H + 10}
                  r="3.5"
                  fill="#ff6b35"
                  style={{ animation: "kg-pulse 0.6s ease-in-out infinite", pointerEvents: "none" }}
                />
              )}
              {isHeld && (
                <circle
                  cx={x + KEY_W - 6}
                  cy={y + 6}
                  r="3"
                  fill="#fbbf24"
                  style={{ animation: "kg-pulse 1s ease-in-out infinite", pointerEvents: "none" }}
                />
              )}
              {isMuteTarget && muteIntensity > 0.12 && (
                <g style={{ pointerEvents: "none" }}>
                  <rect
                    x={x - 3 - (1 - muteIntensity) * 8}
                    y={y - 3 - (1 - muteIntensity) * 8}
                    width={KEY_W + 6 + (1 - muteIntensity) * 16}
                    height={KEY_H + 6 + (1 - muteIntensity) * 16}
                    rx={5 + (1 - muteIntensity) * 8}
                    fill="none"
                    stroke={muteColor}
                    strokeWidth="2.5"
                    opacity={Math.min(0.95, muteIntensity * 1.2)}
                  />
                  <rect
                    x={x + KEY_W / 2 - 24}
                    y={y - 34}
                    width={48}
                    height={22}
                    rx="5"
                    fill={muteColor}
                    opacity={Math.min(1, muteIntensity * 1.4)}
                  />
                  <text
                    x={x + KEY_W / 2}
                    y={y - 18}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="900"
                    fontFamily="monospace"
                    fill="#0b0b0f"
                    opacity={Math.min(1, muteIntensity * 1.4)}
                  >
                    {(upcomingMute?.kind === "hold" ? "HOLD " : "✋ ") + keyChar.toUpperCase()}
                  </text>
                  <path
                    d={`M ${x + KEY_W / 2 - 6} ${y - 6} L ${x + KEY_W / 2} ${y} L ${x + KEY_W / 2 + 6} ${y - 6}`}
                    stroke={muteColor}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity={Math.min(1, muteIntensity * 1.3)}
                  />
                </g>
              )}
            </g>
          );
        })
      )}

      {ALL_LANES.map((lane) => {
        const { cx } = keyRect(0, lane);
        const preset = chordPresets[lane];
        const color = LANE_COLORS[lane];
        return (
          <g key={`chord-${lane}`} style={{ pointerEvents: "none" }}>
            <rect
              x={cx - 22}
              y={KB_Y - 32}
              width={44}
              height={22}
              rx="5"
              fill={blendHex(color, 0.18)}
              stroke={`${color}88`}
              strokeWidth="1"
            />
            <text
              x={cx}
              y={KB_Y - 16}
              textAnchor="middle"
              fontSize="14"
              fontWeight="900"
              fontFamily="monospace"
              fill={color}
            >
              {preset?.name ?? "—"}
            </text>
          </g>
        );
      })}

      {strumRollProgress !== null && strumHandPos !== null && (
        <g style={{ pointerEvents: "none" }}>
          <line
            x1={strumStart.x}
            y1={strumStart.y}
            x2={strumHandPos.x}
            y2={strumHandPos.y}
            stroke="#ff6b35"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={0.5 * (1 - strumRollProgress * 0.2)}
            style={{ filter: "drop-shadow(0 0 6px #ff6b35)" }}
          />
          {strumTrail.map((t, i) => (
            <circle
              key={`trail-${i}`}
              cx={t.x}
              cy={t.y}
              r={4 + t.opacity * 3}
              fill="#ff6b35"
              opacity={t.opacity * 0.55}
            />
          ))}
          <circle
            cx={strumHandPos.x}
            cy={strumHandPos.y}
            r={18}
            fill="none"
            stroke="#ffcba0"
            strokeWidth="2"
            opacity={0.6 * (1 - strumRollProgress)}
          />
          {[-1, 0, 1].map((offset) => (
            <circle
              key={`spark-${offset}`}
              cx={strumHandPos.x + offset * 6 - 3}
              cy={strumHandPos.y + 14 + Math.abs(offset) * 2}
              r={1.5 + (offset + 2) * 0.27}
              fill="#ffb380"
              opacity={0.7 * (1 - strumRollProgress * 0.5)}
            />
          ))}
        </g>
      )}

      {showAimLine && nextTapTarget !== null && earliestNonHold && (
        <g style={{ pointerEvents: "none" }}>
          <line
            x1={restingRightHand.x}
            y1={restingRightHand.y}
            x2={nextTapTarget.x}
            y2={nextTapTarget.y}
            stroke={LANE_COLORS[earliestNonHold.lane]}
            strokeWidth="2"
            strokeDasharray="4 5"
            opacity={aimLineIntensity * 0.7}
          />
          <circle
            cx={nextTapTarget.x}
            cy={nextTapTarget.y}
            r={KEY_W / 2 + 4 + 3 * Math.sin(now / 100)}
            fill="none"
            stroke={LANE_COLORS[earliestNonHold.lane]}
            strokeWidth="2.5"
            opacity={aimLineIntensity * 0.75}
          />
          {earliestNonHold.kind === "tap" && (
            <>
              <rect
                x={nextTapTarget.x - 16}
                y={nextTapTarget.y - KEY_H / 2 - 34}
                width={32}
                height={22}
                rx="5"
                fill={LANE_COLORS[earliestNonHold.lane]}
                opacity={Math.min(1, aimLineIntensity * 1.2)}
              />
              <text
                x={nextTapTarget.x}
                y={nextTapTarget.y - KEY_H / 2 - 18}
                textAnchor="middle"
                fontSize="14"
                fontWeight="900"
                fontFamily="monospace"
                fill="#0b0b0f"
                opacity={Math.min(1, aimLineIntensity * 1.2)}
              >
                {LANE_KEYS[earliestNonHold.lane][1].toUpperCase()}
              </text>
              <path
                d={`M ${nextTapTarget.x - 6} ${nextTapTarget.y - KEY_H / 2 - 8} L ${nextTapTarget.x} ${nextTapTarget.y - KEY_H / 2 - 2} L ${nextTapTarget.x + 6} ${nextTapTarget.y - KEY_H / 2 - 8}`}
                stroke={LANE_COLORS[earliestNonHold.lane]}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                opacity={aimLineIntensity * 0.9}
              />
            </>
          )}
          {earliestNonHold.kind === "strum" && (
            <>
              <rect
                x={nextTapTarget.x - 25}
                y={nextTapTarget.y - KEY_H / 2 - 34}
                width={50}
                height={22}
                rx="5"
                fill="#ff6b35"
                opacity={Math.min(1, aimLineIntensity * 1.2)}
              />
              <text
                x={nextTapTarget.x}
                y={nextTapTarget.y - KEY_H / 2 - 18}
                textAnchor="middle"
                fontSize="11"
                fontWeight="900"
                fontFamily="monospace"
                fill="#0b0b0f"
                opacity={Math.min(1, aimLineIntensity * 1.2)}
              >
                ⇅ STRUM
              </text>
            </>
          )}
        </g>
      )}

      <path
        d={`M 530 240 Q 560 260 ${rightHand.x} ${rightHand.y - 4}`}
        stroke="#c9cbd3"
        strokeWidth="11"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse
        cx={rightHand.x}
        cy={rightHand.y}
        rx={strumHandPos !== null ? 16 : tapPressLane !== null ? 13 : 11}
        ry={
          strumHandPos !== null
            ? 8
            : tapPressLane !== null
            ? 9 + tapPressBounceY * 0.2
            : 11
        }
        transform={
          strumHandPos !== null
            ? `rotate(${
                (Math.atan2(strumEnd.y - strumStart.y, strumEnd.x - strumStart.x) * 180) / Math.PI
              } ${rightHand.x} ${rightHand.y})`
            : undefined
        }
        fill={rightHandColor}
        stroke="#3a3b43"
        strokeWidth="2"
        style={{
          filter: rightIsStrumming
            ? "drop-shadow(0 0 16px #ff6b35)"
            : tapPressLane !== null
            ? `drop-shadow(0 0 12px ${LANE_COLORS[tapPressLane]})`
            : lastHitLane !== null
            ? `drop-shadow(0 0 10px ${LANE_COLORS[lastHitLane]})`
            : "none",
          transition:
            strumRollProgress !== null
              ? "fill 80ms, filter 80ms"
              : tapPressLane !== null
              ? "fill 60ms, filter 60ms, cx 60ms ease-out, cy 60ms ease-out"
              : "fill 120ms, filter 120ms, cx 160ms ease-out, cy 160ms ease-out",
        }}
      />
      {tapPressLane !== null && tapPressBounceY > 3 && (
        <g style={{ pointerEvents: "none" }}>
          <circle
            cx={rightHand.x - 6}
            cy={rightHand.y + 6}
            r={2.2}
            fill={LANE_COLORS[tapPressLane]}
            opacity={Math.min(1, tapPressBounceY / 9) * 0.85}
          />
          <circle
            cx={rightHand.x + 6}
            cy={rightHand.y + 7}
            r={1.8}
            fill={LANE_COLORS[tapPressLane]}
            opacity={Math.min(1, tapPressBounceY / 9) * 0.75}
          />
        </g>
      )}
    </svg>
  );
}
