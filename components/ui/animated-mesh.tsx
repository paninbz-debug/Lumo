"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animated metallic gradient mesh — CSS-only, no canvas / no shader.
 * Three radial blobs in copper/brass/bronze + one mercury,
 * animated via slow CSS keyframes. Reduced-motion → static composition.
 */
export function AnimatedMesh({
  className,
  intensity = "default",
}: {
  className?: string;
  intensity?: "default" | "soft";
}) {
  const reduced = useReducedMotion();
  const opacity = intensity === "soft" ? 0.45 : 0.6;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <span
        className={cn(
          "absolute aspect-square w-[80vw] max-w-[900px] rounded-full blur-[120px]",
          !reduced && "animate-mesh-1"
        )}
        style={{
          top: "-12%",
          left: "55%",
          background: "radial-gradient(circle at center, #c77d4a, transparent 60%)",
          opacity,
        }}
      />
      <span
        className={cn(
          "absolute aspect-square w-[70vw] max-w-[800px] rounded-full blur-[120px]",
          !reduced && "animate-mesh-2"
        )}
        style={{
          top: "30%",
          left: "-15%",
          background: "radial-gradient(circle at center, #b89968, transparent 60%)",
          opacity: opacity * 0.85,
        }}
      />
      <span
        className={cn(
          "absolute aspect-square w-[60vw] max-w-[760px] rounded-full blur-[140px]",
          !reduced && "animate-mesh-3"
        )}
        style={{
          top: "55%",
          left: "60%",
          background: "radial-gradient(circle at center, #856a45, transparent 60%)",
          opacity: opacity * 0.75,
        }}
      />
      <span
        className={cn(
          "absolute aspect-square w-[55vw] max-w-[700px] rounded-full blur-[150px]",
          !reduced && "animate-mesh-4"
        )}
        style={{
          top: "10%",
          left: "20%",
          background: "radial-gradient(circle at center, #c9d2d6, transparent 60%)",
          opacity: opacity * 0.4,
        }}
      />
      {/* film-grain overlay */}
      <span aria-hidden className="absolute inset-0 bg-grain opacity-50 mix-blend-overlay" />
    </div>
  );
}
