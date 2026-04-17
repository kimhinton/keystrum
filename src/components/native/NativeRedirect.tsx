"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isNative } from "@/lib/platform";

/**
 * If running in native (Capacitor), replace current route with `/instrument`.
 * Used on the web-marketing home page so native users skip the landing.
 */
export default function NativeRedirect() {
  const router = useRouter();
  useEffect(() => {
    if (isNative()) router.replace("/instrument");
  }, [router]);
  return null;
}
