"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { COLLECTIONS } from "@/lib/content";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Collections() {
  const reduced = useReducedMotion();

  return (
    <section id="collections" className="relative py-28 md:py-40 bg-[color:var(--bg-elevated)] overflow-hidden">
      <div className="container-lumo">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-[680px]">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                Коллекции — пять
              </span>
              <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(34px,5vw,68px)] leading-[1.05] text-[color:var(--text-primary)]">
                Пять характеров одного материала
              </h2>
            </div>
            <p className="md:text-right md:max-w-[360px] text-[15px] leading-relaxed text-[color:var(--text-secondary)]">
              Каждая коллекция — отдельная техника финиша.
              Зеркало, патина, бра́ш, ртуть, огонь.
              Состав работ, перечень металлов и применение — внутри.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-6">
          {COLLECTIONS.map((c, i) => {
            const isWide = i >= 4; // last (5th) wide on desktop, layout becomes 2-2-1
            const span =
              i < 2 ? "md:col-span-3" : i < 4 ? "md:col-span-3" : "md:col-span-6";
            return (
              <motion.div
                key={c.id}
                initial={reduced ? false : { opacity: 0, y: 30 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className={cn(span)}
              >
              <TiltCard
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-card)] p-7 md:p-9 min-h-[340px] md:min-h-[420px] flex flex-col h-full",
                  isWide && "md:p-12 md:min-h-[360px]"
                )}
              >
                {/* art panel — gradient swatch */}
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 -z-10 opacity-[0.18] transition-opacity duration-500 group-hover:opacity-[0.32]",
                    c.accent === "warm" ? "bg-gradient-warm" : ""
                  )}
                  style={
                    c.accent === "cool"
                      ? { backgroundImage: "var(--gradient-cool)" }
                      : undefined
                  }
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 mix-blend-overlay opacity-50 bg-grain"
                />

                <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">
                  Коллекция · {String(i + 1).padStart(2, "0")} / {COLLECTIONS.length}
                </div>

                <h3
                  className={cn(
                    "mt-4 font-[family-name:var(--font-unbounded)] font-medium text-[color:var(--text-primary)] tracking-[-0.01em]",
                    isWide ? "text-[clamp(34px,4.6vw,52px)]" : "text-[clamp(28px,3.4vw,40px)]"
                  )}
                >
                  {c.name}
                </h3>

                <div
                  className={cn(
                    "mt-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase",
                    c.accent === "warm" ? "text-gradient-warm" : "text-gradient-cool"
                  )}
                >
                  {c.epithet}
                </div>

                <p className="mt-6 font-[family-name:var(--font-cormorant)] italic text-[color:var(--text-secondary)] text-[18px] md:text-[20px] leading-snug">
                  {c.description}
                </p>

                <p className="mt-4 text-[13px] leading-relaxed text-[color:var(--text-muted)]">
                  {c.use}
                </p>

                <div className="mt-auto pt-8 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em] uppercase text-[color:var(--text-secondary)] group-hover:text-[color:var(--accent-brass)] transition-colors">
                    Запросить образец A4
                  </span>
                  <span aria-hidden className="w-9 h-9 rounded-full border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--text-secondary)] group-hover:text-[color:var(--accent-brass)] group-hover:border-[color:var(--accent-brass)] transition-colors">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
