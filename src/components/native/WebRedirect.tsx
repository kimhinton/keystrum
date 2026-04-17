"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isNative } from "@/lib/platform";

/**
 * If running in web (non-native), replace current route with the provided path.
 * Used on native-only screens like /library that have no web equivalent.
 */
export default function WebRedirect({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => {
    if (!isNative()) router.replace(to);
  }, [router, to]);
  return null;
}
