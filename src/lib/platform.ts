"use client";

import { Capacitor } from "@capacitor/core";

export type Platform = "web" | "ios" | "android";

export function isNative(): boolean {
  if (typeof window === "undefined") return false;
  try { return Capacitor.isNativePlatform(); } catch { return false; }
}

export function getPlatform(): Platform {
  if (typeof window === "undefined") return "web";
  try { return Capacitor.getPlatform() as Platform; } catch { return "web"; }
}

export function isIOS(): boolean {
  return getPlatform() === "ios";
}

export function isAndroid(): boolean {
  return getPlatform() === "android";
}
