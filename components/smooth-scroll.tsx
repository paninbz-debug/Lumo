"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Marketing-page smooth scroll wrapper. Lumo is a pure marketing site,
 * so we mount this at the layout root.
 *
 * Do NOT add this to dashboards / app routes — it interferes with
 * scroll-restoration on route changes (per VIBECODER_ANTIPATTERNS §2).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
