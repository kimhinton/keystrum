"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NativeHome() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/instrument");
  }, [router]);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0b0b0f]">
      <span
        className="inline-flex size-10 items-center justify-center rounded-lg bg-[#ff6b35] font-mono text-base font-black text-black"
        aria-label="keystrum"
      >
        K
      </span>
    </div>
  );
}
