"use client";

import { useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { Reveal } from "@/components/reveal";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { FINAL_CTA } from "@/lib/content";
import { submitLead } from "@/lib/submit-lead";

const BackgroundBeams = dynamic(
  () => import("@/components/ui/background-beams").then((m) => m.BackgroundBeams),
  { ssr: false }
);

export function FinalCta() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await submitLead(e.currentTarget, "home-final-cta");
    setSubmitting(false);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate py-28 md:py-40 bg-[color:var(--bg-primary)] overflow-hidden"
    >
      <BackgroundBeams className="opacity-50" />
      {/* metallic grain backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grain opacity-[0.6]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[80vw] max-w-[1100px] aspect-square rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #c77d4a, transparent 65%)" }}
      />

      <div className="container-lumo">
        <Reveal>
          <div className="text-center max-w-[820px] mx-auto">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Контакты
            </span>
            <h2 id="contact-title" className="mt-6 font-[family-name:var(--font-unbounded)] font-black tracking-[-0.02em] text-[clamp(38px,7vw,96px)] leading-[1.02] text-[color:var(--text-primary)]">
              {FINAL_CTA.title}
            </h2>
            <p className="mt-6 font-[family-name:var(--font-cormorant)] italic text-[color:var(--text-secondary)] text-[20px] md:text-[24px] leading-snug">
              {FINAL_CTA.subtitle}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <form
            onSubmit={onSubmit}
            className="mt-16 md:mt-20 max-w-[820px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          >
            <div className="md:col-span-1">
              <label htmlFor="lead-name" className="block mb-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">
                {FINAL_CTA.fields.name}
              </label>
              <input id="lead-name" name="name" type="text" required autoComplete="name" className="lumo-input" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="lead-contact" className="block mb-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">
                {FINAL_CTA.fields.contact}
              </label>
              <input id="lead-contact" name="contact" type="text" required placeholder="@username или +7…" className="lumo-input" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="lead-object-type" className="block mb-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">
                {FINAL_CTA.fields.objectType}
              </label>
              <select id="lead-object-type" name="objectType" required defaultValue="" aria-label={FINAL_CTA.fields.objectType} className="lumo-input">
                <option value="" disabled>
                  —
                </option>
                {FINAL_CTA.objectTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-1">
              <label htmlFor="lead-area" className="block mb-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">
                {FINAL_CTA.fields.area}
              </label>
              <input id="lead-area" name="area" type="number" min={1} step={1} required className="lumo-input" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="lead-date" className="block mb-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">
                {FINAL_CTA.fields.date}
              </label>
              <input id="lead-date" name="date" type="date" required className="lumo-input" />
            </div>
            <div className="md:col-span-2 mt-4 flex flex-col items-center gap-5">
              <MovingBorderButton type="submit" ariaLabel={FINAL_CTA.submit}>
                {submitting ? "Отправляем…" : FINAL_CTA.submit}
              </MovingBorderButton>
              <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em] text-[color:var(--text-muted)] max-w-[640px] text-center leading-relaxed">
                {FINAL_CTA.formNote}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
