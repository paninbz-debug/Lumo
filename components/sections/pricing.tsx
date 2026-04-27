"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { NumberTicker } from "@/components/ui/number-ticker";
import { PRICING } from "@/lib/content";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28 md:py-40">
      <div className="container-lumo">
        <Reveal>
          <div className="max-w-[820px]">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Цена — открытая вилка
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(34px,5vw,68px)] leading-[1.05] text-[color:var(--text-primary)]">
              Сколько стоит{" "}
              <span className="text-gradient-warm">квадратный метр</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          <Reveal className="md:col-span-7">
            <div className="font-[family-name:var(--font-mono)] font-light leading-[0.95] tracking-[-0.04em] text-[clamp(56px,9vw,140px)]">
              <NumberTicker
                to={Number(PRICING.rangeFrom.replace(/\s/g, ""))}
                className="text-gradient-warm"
              />
              <span className="text-[color:var(--text-muted)]"> — </span>
              <NumberTicker
                to={Number(PRICING.rangeTo.replace(/\s/g, ""))}
                className="text-gradient-warm"
              />
            </div>
            <div className="mt-3 font-[family-name:var(--font-mono)] text-[14px] tracking-[0.06em] text-[color:var(--text-secondary)]">
              {PRICING.unit}
            </div>
          </Reveal>

          <Reveal className="md:col-span-5">
            <p className="font-[family-name:var(--font-cormorant)] italic text-[color:var(--text-secondary)] text-[20px] md:text-[22px] leading-snug">
              {PRICING.body}
            </p>
            <div className="mt-9">
              <MagneticButton href="#contact" variant="primary">
                {PRICING.cta}
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-6">
          {PRICING.factors.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-[color:var(--border-strong)] pt-7"
            >
              <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase text-[color:var(--accent-brass)]">
                Фактор · 0{i + 1}
              </div>
              <h3 className="mt-3 font-[family-name:var(--font-unbounded)] font-medium text-[18px] md:text-[20px] text-[color:var(--text-primary)]">
                {f.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-[color:var(--text-secondary)]">
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
