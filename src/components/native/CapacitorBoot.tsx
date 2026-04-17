"use client";

import { useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { Keyboard } from "@capacitor/keyboard";
import { App as CapApp } from "@capacitor/app";
import { isAndroid, isIOS, isNative } from "@/lib/platform";

/**
 * Runs once on mount — configures Capacitor plugins for native context.
 * No-op on web.
 */
export default function CapacitorBoot() {
  useEffect(() => {
    if (!isNative()) return;

    document.body.setAttribute("data-native", "true");

    void (async () => {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        if (isAndroid()) {
          await StatusBar.setOverlaysWebView({ overlay: false });
          await StatusBar.setBackgroundColor({ color: "#0b0b0f" });
        }
      } catch { /* plugin unavailable */ }

      try {
        if (isIOS()) { await Keyboard.setAccessoryBarVisible({ isVisible: false }); }
      } catch { /* plugin unavailable */ }

      try { await SplashScreen.hide({ fadeOutDuration: 250 }); } catch { /* noop */ }
    })();

    const sub = CapApp.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        void CapApp.exitApp();
      }
    });

    return () => { void sub.then((h) => h.remove()); };
  }, []);

  return null;
}
