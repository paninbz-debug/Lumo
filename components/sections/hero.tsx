"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { HERO } from "@/lib/content";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { HERO_PHOTO } from "@/lib/copy/photos";

const AnimatedMesh = dynamic(
  () => import("@/components/ui/animated-mesh").then((m) => m.AnimatedMesh),
  { ssr: false }
);

const BackgroundBeams = dynamic(
  () => import("@/components/ui/background-beams").then((m) => m.BackgroundBeams),
  { ssr: false }
);

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
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-[120px] md:pt-[180px] pb-[100px] md:pb-[140px]"
    >
      {/* hero photo — temporary Unsplash, see /credits */}
      <div aria-hidden className="absolute inset-0 -z-30 overflow-hidden">
        <Image
          src={HERO_PHOTO.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--bg-primary)]/90 via-[color:var(--bg-primary)]/70 to-[color:var(--bg-primary)]" />
      </div>

      {/* animated metallic mesh — Phase 2.5 visual layer */}
      <AnimatedMesh className="-z-10" intensity="soft" />

      {/* premium animated beams (warm-metallic, paths re-coloured) */}
      <BackgroundBeams className="opacity-30" />

      {/* warm/cool radial backdrops */}
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
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[color:var(--border-strong)] font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-secondary)] backdrop-blur-sm bg-[color:var(--bg-primary)]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent-brass)]" />
            Студия LUMO · Партнёр AuraMetal
          </span>
        </motion.div>

        <motion.h1
          id="hero-title"
          {...stagger(1)}
          className="mt-7 md:mt-9 font-[family-name:var(--font-unbounded)] font-black tracking-[-0.02em] text-[clamp(40px,8vw,104px)] leading-[1.02] text-[color:var(--text-primary)] max-w-[1100px]"
        >
          <span className="block">{HERO.h1Lead}</span>
          <span className="shimmer-warm block">{HERO.h1Accent}</span>
        </motion.h1>

        <motion.p
          {...stagger(2)}
          className="mt-7 md:mt-9 font-[family-name:var(--font-cormorant)] italic font-light text-[clamp(22px,2.4vw,34px)] leading-snug text-[color:var(--text-secondary)] max-w-[820px]"
        >
          {HERO.subtitle}
        </motion.p>

        <motion.p
          {...stagger(3)}
          className="mt-6 md:mt-8 text-[color:var(--text-primary)] text-[17px] md:text-[19px] leading-relaxed max-w-[760px]"
        >
          Премиальное покрытие для стен, фасадов и мебели — настоящий металл (медь, латунь, бронза, никель, алюминий) в&nbsp;жидкой форме. Без швов, без пластика, без масс-производства. На&nbsp;десятилетия.
        </motion.p>

        <motion.p
          {...stagger(4)}
          className="mt-4 text-[color:var(--text-secondary)] text-[15px] md:text-[16px] leading-relaxed max-w-[640px]"
        >
          {HERO.body}
        </motion.p>

        <motion.div
          {...stagger(4)}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4"
        >
          <MovingBorderButton href="#contact" ariaLabel="Заказать выкрас">
            <span className="inline-flex items-center gap-2">
              {HERO.ctaPrimary}
              <ArrowRight size={16} aria-hidden />
            </span>
          </MovingBorderButton>
          <a
            href="#collections"
            className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-[color:var(--border-strong)] text-[color:var(--text-primary)] text-[13px] font-semibold tracking-[0.06em] uppercase hover:border-[color:var(--accent-brass)] hover:text-[color:var(--accent-brass)] transition-colors min-h-[44px]"
          >
            {HERO.ctaSecondary}
          </a>
        </motion.div>

        <motion.p
          {...stagger(5)}
          className="mt-8 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em] uppercase text-[color:var(--text-muted)]"
        >
          {HERO.ctaCaption}
        </motion.p>

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
