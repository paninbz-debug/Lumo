"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText, FolderKanban, Percent, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { TRADE } from "@/lib/content";

const ICONS = [FileText, FolderKanban, Percent, ShieldCheck];
const ease = [0.16, 1, 0.3, 1] as const;

export function Trade() {
  const reduced = useReducedMotion();
  return (
    <section id="trade" className="relative py-28 md:py-40 bg-[color:var(--bg-elevated)] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{ backgroundImage: "var(--gradient-warm)" }}
      />
      <div className="container-lumo">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <Reveal className="md:col-span-5">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Trade · Designers & Architects
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(32px,4.4vw,56px)] leading-[1.05] text-[color:var(--text-primary)]">
              {TRADE.title}
            </h2>
            <p className="mt-7 text-[15px] md:text-[17px] leading-relaxed text-[color:var(--text-secondary)]">
              {TRADE.body}
            </p>
            <div className="mt-9">
              <MagneticButton href="#contact" variant="primary">
                {TRADE.cta}
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </Reveal>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {TRADE.perks.map((p, i) => {
              const Icon = ICONS[i] ?? FileText;
              return (
                <motion.div
                  key={p.title}
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease }}
                  className="rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] p-7 md:p-8 hover:-translate-y-1 hover:border-[color:var(--accent-brass)] transition-[transform,border-color] duration-300"
                >
                  <div className="w-11 h-11 rounded-full border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--accent-brass)]">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-6 font-[family-name:var(--font-unbounded)] font-medium text-[17px] md:text-[19px] text-[color:var(--text-primary)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[color:var(--text-secondary)]">
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
