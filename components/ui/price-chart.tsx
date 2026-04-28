"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type PriceRow = {
  name: string;
  /** ₽ per m² — middle of range */
  pricePerM2: number;
  /** lifespan years — middle of range */
  lifespanYears: number;
  featured?: boolean;
};

/**
 * Vertical bar chart, log price scale + lifespan as overlay metric.
 * No recharts — pure CSS + Framer for entrance.
 */
export function PriceChart({ rows, className }: { rows: PriceRow[]; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.2 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // log scale 700 ₽ → 100 000 ₽
  const minLog = Math.log10(700);
  const maxLog = Math.log10(100_000);
  const scale = (v: number) =>
    ((Math.log10(v) - minLog) / (maxLog - minLog)) * 100;

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[color:var(--text-muted)]">
        <span className="flex items-center gap-2">
          <span className="block w-3 h-3 rounded-sm bg-gradient-warm" /> Цена ₽/м² (лог. шкала)
        </span>
        <span className="flex items-center gap-2">
          <span className="block w-3 h-3 rounded-full border-2 border-[color:var(--accent-mercury)]" />
          Срок службы, лет
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4">
        {rows.map((r, i) => (
          <div key={r.name} className="grid grid-cols-12 items-center gap-3 md:gap-4">
            <div
              className={cn(
                "col-span-5 md:col-span-4 text-[13.5px] leading-snug",
                r.featured ? "text-[color:var(--text-primary)] font-semibold" : "text-[color:var(--text-secondary)]"
              )}
            >
              {r.name}
            </div>
            <div className="col-span-7 md:col-span-8 relative h-12 rounded-md bg-[color:var(--bg-elevated)] overflow-hidden border border-[color:var(--border)]">
              <motion.span
                aria-hidden
                initial={reduced ? false : { width: "0%" }}
                animate={inView || reduced ? { width: `${scale(r.pricePerM2)}%` } : undefined}
                transition={{ duration: 1.1, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "absolute inset-y-0 left-0",
                  r.featured ? "bg-gradient-warm" : "bg-[color:var(--accent-bronze)]/55"
                )}
              />
              {/* lifespan dot */}
              <span
                aria-hidden
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[color:var(--accent-mercury)] bg-[color:var(--bg-elevated)]"
                style={{ left: `calc(${Math.min(98, r.lifespanYears * 0.95)}% - 6px)` }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--text-primary)]">
                {r.pricePerM2.toLocaleString("ru-RU")} ₽
              </span>
              <span className="absolute left-3 bottom-1 font-[family-name:var(--font-mono)] text-[10px] text-[color:var(--text-muted)] tracking-[0.04em]">
                {r.lifespanYears} лет
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
