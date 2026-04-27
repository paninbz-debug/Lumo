"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CRAFT } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

export function Craft() {
  const reduced = useReducedMotion();
  return (
    <section id="craft" className="relative py-28 md:py-40">
      <div className="container-lumo">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-end">
            <div className="md:col-span-7">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                Ремесло — пять рук
              </span>
              <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(34px,5vw,68px)] leading-[1.05] text-[color:var(--text-primary)]">
                Пять самостоятельных ремёсел.{" "}
                <span className="text-gradient-warm">Один объект.</span>
              </h2>
            </div>
            <p className="md:col-span-5 font-[family-name:var(--font-cormorant)] italic text-[color:var(--text-secondary)] text-[18px] md:text-[20px] leading-snug">
              {CRAFT.lead}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-5 gap-px bg-[color:var(--border)] border border-[color:var(--border)] rounded-2xl overflow-hidden">
          {CRAFT.steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="group bg-[color:var(--bg-primary)] p-8 md:p-7 lg:p-9 flex flex-col min-h-[300px] md:min-h-[420px] hover:bg-[color:var(--bg-card)] transition-colors"
            >
              <div className="font-[family-name:var(--font-mono)] font-light text-[clamp(48px,5.4vw,80px)] leading-none text-gradient-warm">
                {s.n}
              </div>
              <h3 className="mt-6 font-[family-name:var(--font-unbounded)] font-medium text-[20px] md:text-[22px] text-[color:var(--text-primary)]">
                {s.name}
              </h3>
              <div className="mt-1 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em] uppercase text-[color:var(--text-muted)]">
                {s.tagline}
              </div>
              <p className="mt-5 text-[13.5px] leading-relaxed text-[color:var(--text-secondary)]">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex justify-end">
            <a
              href="#craft"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.16em] uppercase text-[color:var(--text-secondary)] hover:text-[color:var(--accent-brass)] transition-colors"
            >
              Все детали ремесла <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
