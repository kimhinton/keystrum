"use client";

import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { isNative } from "./platform";

/**
 * Trigger native haptic feedback. No-op on web.
 */
export async function hapticStrum(): Promise<void> {
  if (!isNative()) return;
  try { await Haptics.impact({ style: ImpactStyle.Medium }); } catch { /* noop */ }
}

export async function hapticPick(): Promise<void> {
  if (!isNative()) return;
  try { await Haptics.impact({ style: ImpactStyle.Light }); } catch { /* noop */ }
}

export async function hapticPalm(): Promise<void> {
  if (!isNative()) return;
  try { await Haptics.impact({ style: ImpactStyle.Heavy }); } catch { /* noop */ }
}
