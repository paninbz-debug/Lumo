"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { FileText, FolderKanban, Percent, ShieldCheck, Clock, Eye } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/reveal";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { TRADE_PAGE } from "@/lib/copy/trade";

const ICONS = [FileText, FolderKanban, Percent, ShieldCheck, Clock, Eye] as const;

export default function TradePage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO Phase 3: POST → /api/trade/apply → Resend + Telegram + Slack
    setTimeout(() => {
      toast.success("Заявка принята. Свяжемся в течение двух недель.");
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 600);
  };

  return (
    <>
      <PageHero label={TRADE_PAGE.hero.label} title={TRADE_PAGE.hero.title} lead={TRADE_PAGE.hero.lead} />

      <section className="py-20 md:py-28">
        <div className="container-lumo">
          <Reveal>
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Что получает партнёр
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(28px,4vw,52px)] leading-[1.05] text-[color:var(--text-primary)] max-w-[820px]">
              Шесть преимуществ кабинета дизайнера
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRADE_PAGE.perks.map((p, i) => {
              const Icon = ICONS[i] ?? FileText;
              return (
                <Reveal key={p.title} delay={i * 0.04}>
                  <div className="h-full rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] p-7 hover:-translate-y-1 hover:border-[color:var(--accent-brass)] transition-[transform,border-color] duration-300">
                    <div className="w-11 h-11 rounded-full border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--accent-brass)]">
                      <Icon size={18} aria-hidden />
                    </div>
                    <h3 className="mt-6 font-[family-name:var(--font-unbounded)] font-medium text-[18px] md:text-[20px] text-[color:var(--text-primary)]">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[color:var(--bg-elevated)]">
        <div className="container-lumo grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <Reveal className="md:col-span-5">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Условия
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-medium text-[clamp(26px,3.4vw,42px)] leading-[1.08] text-[color:var(--text-primary)]">
              Как мы оформляем партнёрство
            </h2>
          </Reveal>
          <Reveal className="md:col-span-7" delay={0.05}>
            <ul className="space-y-3">
              {TRADE_PAGE.conditions.map((c) => (
                <li
                  key={c}
                  className="rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] px-5 py-4 text-[14.5px] text-[color:var(--text-secondary)] leading-relaxed"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 md:py-28">
        <div className="container-lumo">
          <Reveal>
            <div className="max-w-[820px] mx-auto text-center">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                Стать партнёром
              </span>
              <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(28px,4vw,52px)] leading-[1.05] text-[color:var(--text-primary)]">
                Заявка на партнёрское соглашение
              </h2>
            </div>
          </Reveal>

          <form
            onSubmit={onSubmit}
            className="mt-14 max-w-[820px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          >
            <div>
              <label htmlFor="trade-name" className="block mb-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">{TRADE_PAGE.formFields.name}</label>
              <input id="trade-name" name="name" type="text" required autoComplete="name" className="lumo-input" />
            </div>
            <div>
              <label htmlFor="trade-studio" className="block mb-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">{TRADE_PAGE.formFields.studio}</label>
              <input id="trade-studio" name="studio" type="text" required className="lumo-input" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="trade-portfolio" className="block mb-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">{TRADE_PAGE.formFields.portfolio}</label>
              <input id="trade-portfolio" name="portfolio" type="url" placeholder="https://" className="lumo-input" />
            </div>
            <div>
              <label htmlFor="trade-email" className="block mb-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">{TRADE_PAGE.formFields.email}</label>
              <input id="trade-email" name="email" type="email" required autoComplete="email" className="lumo-input" />
            </div>
            <div>
              <label htmlFor="trade-phone" className="block mb-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">{TRADE_PAGE.formFields.phone}</label>
              <input id="trade-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+7…" className="lumo-input" />
            </div>
            <div>
              <label htmlFor="trade-years" className="block mb-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">{TRADE_PAGE.formFields.yearsInTrade}</label>
              <input id="trade-years" name="years" type="number" min={0} step={1} className="lumo-input" />
            </div>
            <div>
              <label htmlFor="trade-objects" className="block mb-2 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">{TRADE_PAGE.formFields.objectsPerYear}</label>
              <input id="trade-objects" name="objects" type="number" min={0} step={1} className="lumo-input" />
            </div>
            <div className="md:col-span-2 mt-4 flex flex-col items-center gap-5">
              <MovingBorderButton type="submit" ariaLabel={TRADE_PAGE.formFields.submit}>
                {submitting ? "Отправляем…" : TRADE_PAGE.formFields.submit}
              </MovingBorderButton>
              <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em] text-[color:var(--text-muted)] max-w-[640px] text-center leading-relaxed">
                {TRADE_PAGE.formNote}
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
