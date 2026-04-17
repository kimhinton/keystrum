"use client";

import { useEffect, useState } from "react";

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const narrow = window.innerWidth < 768;
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsMobile(coarse && narrow && !standalone);
    };
    check();
    window.addEventListener("resize", check);
    const coarseMq = window.matchMedia("(pointer: coarse)");
    const standaloneMq = window.matchMedia("(display-mode: standalone)");
    coarseMq.addEventListener("change", check);
    standaloneMq.addEventListener("change", check);
    return () => {
      window.removeEventListener("resize", check);
      coarseMq.removeEventListener("change", check);
      standaloneMq.removeEventListener("change", check);
    };
  }, []);
  return isMobile;
}
