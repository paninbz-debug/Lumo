"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HERO } from "@/lib/content";
import { MagneticButton } from "@/components/magnetic-button";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  const stagger = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 24 },
    animate: reduced ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease, delay: 0.05 * i },
  });

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-[120px] md:pt-[180px] pb-[100px] md:pb-[140px] bg-grain-soft"
    >
      {/* metallic radial backdrops */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-40 w-[60vw] max-w-[820px] aspect-square rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #c77d4a, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-32 w-[55vw] max-w-[760px] aspect-square rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #c9d2d6, transparent 65%)" }}
      />

      <div className="container-lumo relative">
        <motion.div {...stagger(0)}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[color:var(--border-strong)] font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-secondary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent-brass)]" />
            Студия LUMO · Партнёр AuraMetal
          </span>
        </motion.div>

        <motion.h1
          {...stagger(1)}
          className="mt-7 md:mt-9 font-[family-name:var(--font-unbounded)] font-black tracking-[-0.02em] text-[clamp(40px,8vw,104px)] leading-[1.02] text-[color:var(--text-primary)] max-w-[1100px]"
        >
          {HERO.h1Lead}{" "}
          <span className="shimmer-warm">{HERO.h1Accent}</span>
        </motion.h1>

        <motion.p
          {...stagger(2)}
          className="mt-7 md:mt-9 font-[family-name:var(--font-cormorant)] italic font-light text-[clamp(22px,2.4vw,34px)] leading-snug text-[color:var(--text-secondary)] max-w-[820px]"
        >
          {HERO.subtitle}
        </motion.p>

        <motion.p
          {...stagger(3)}
          className="mt-6 md:mt-8 text-[color:var(--text-secondary)] text-[15px] md:text-[17px] leading-relaxed max-w-[640px]"
        >
          {HERO.body}
        </motion.p>

        <motion.div
          {...stagger(4)}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <MagneticButton href="#contact" variant="primary">
            {HERO.ctaPrimary}
            <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton href="#collections" variant="ghost">
            {HERO.ctaSecondary}
          </MagneticButton>
        </motion.div>

        <motion.p
          {...stagger(5)}
          className="mt-8 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em] uppercase text-[color:var(--text-muted)]"
        >
          {HERO.ctaCaption}
        </motion.p>

        {/* numerical strip */}
        <motion.div
          {...stagger(6)}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 pt-10 border-t border-[color:var(--border)]"
        >
          {[
            { v: "5", s: "Коллекций — Deep Mirror, Aged Patina, Brushed Daylight, Liquid Mercury, Copper Fire" },
            { v: "5+2", s: "Лет гарантии — на покрытие и на работы письменно" },
            { v: "240ч+", s: "Программа AuraMetal Academy для каждого мастера" },
            { v: "9H", s: "Полисилазан — защита поверхности до 1000 °C" },
          ].map((m) => (
            <div key={m.v} className="flex flex-col gap-2">
              <div className="font-[family-name:var(--font-mono)] text-[28px] md:text-[36px] leading-none text-gradient-warm">
                {m.v}
              </div>
              <div className="text-[12px] leading-snug text-[color:var(--text-muted)] max-w-[220px]">
                {m.s}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
