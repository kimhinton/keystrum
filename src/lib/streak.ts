"use client";

import { Preferences } from "@capacitor/preferences";
import { isNative } from "./platform";

const LAST_DAY_KEY = "keystrum.streak.lastDay";
const COUNT_KEY = "keystrum.streak.count";

function todayStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export async function getStreak(): Promise<number> {
  if (!isNative()) return 0;
  const { value } = await Preferences.get({ key: COUNT_KEY });
  if (!value) return 0;
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Mark today as an active practice day. Returns updated streak count.
 * - If no prior record: streak = 1
 * - If last day was yesterday: streak += 1
 * - If last day was today: unchanged
 * - Otherwise (gap ≥ 2 days): reset to 1
 */
export async function markTodayActive(): Promise<number> {
  if (!isNative()) return 0;
  const today = todayStr();
  const yday = yesterdayStr();
  const [lastRes, countRes] = await Promise.all([
    Preferences.get({ key: LAST_DAY_KEY }),
    Preferences.get({ key: COUNT_KEY }),
  ]);
  const last = lastRes.value ?? "";
  const prev = countRes.value ? parseInt(countRes.value, 10) : 0;
  if (last === today) return Number.isFinite(prev) ? prev : 0;
  const next = last === yday ? (Number.isFinite(prev) ? prev + 1 : 1) : 1;
  await Promise.all([
    Preferences.set({ key: LAST_DAY_KEY, value: today }),
    Preferences.set({ key: COUNT_KEY, value: String(next) }),
  ]);
  return next;
}
