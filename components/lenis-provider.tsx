"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Premium smooth-scroll wrapper. Canonical 2026 setup per RESEARCH_premium_brand_2026_lumo §9.11.
 *
 * - Disabled when `prefers-reduced-motion: reduce` is set.
 * - Native scroll on touch devices (Lenis-recommended; iOS Safari struggles with hijacked scroll).
 * - Easing matches the spec: out-expo with 1.2s window, calm not bouncy.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // mobile/touch: keep native — premium-mobile-restraint per spec §9.14
      syncTouch: false,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
