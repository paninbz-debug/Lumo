import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { HOME_WHAT_IS_IT } from "@/lib/copy/home-extras";

export function WhatIsIt() {
  return (
    <section className="relative py-24 md:py-32" aria-labelledby="what-is-it-title">
      <div className="container-lumo">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          <Reveal className="md:col-span-5">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              {HOME_WHAT_IS_IT.label}
            </span>
            <h2
              id="what-is-it-title"
              className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(30px,4.4vw,56px)] leading-[1.05] text-[color:var(--text-primary)]"
            >
              {HOME_WHAT_IS_IT.title}
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-7 space-y-5 md:space-y-6">
            {HOME_WHAT_IS_IT.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[16px] md:text-[18px] leading-relaxed text-[color:var(--text-secondary)]"
              >
                {p}
              </p>
            ))}
            <div className="pt-4">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[color:var(--border-strong)] text-[color:var(--text-primary)] text-[13px] font-semibold tracking-[0.06em] uppercase hover:border-[color:var(--accent-brass)] hover:text-[color:var(--accent-brass)] transition-colors min-h-[44px]"
              >
                {HOME_WHAT_IS_IT.cta}
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
