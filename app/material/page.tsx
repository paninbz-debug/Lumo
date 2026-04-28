import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { PageCta } from "@/components/sections/page-cta";
import { FactsGrid } from "@/components/sections/facts-grid";
import { MetalSamples } from "@/components/sections/metal-samples";
import { Reveal } from "@/components/reveal";
import { GlossaryTip } from "@/components/ui/glossary";
import { GLOSSARY } from "@/lib/copy/glossary";
import { MATERIAL } from "@/lib/copy/material";

export const metadata: Metadata = {
  title: "Материал — жидкий металл AuraMetal | LUMO",
  description:
    "Двухкомпонентная система жидкого металла AuraMetal: 11 артикулов металлов, толщина слоя 300–800 микрон, расход 300–400 мл/м². Партия под весь объект, паспорт партии, сертификат подлинности.",
  alternates: { canonical: "/material" },
};

export default function MaterialPage() {
  return (
    <>
      <PageHero label={MATERIAL.hero.label} title={MATERIAL.hero.title} lead={MATERIAL.hero.lead} />

      <section className="container-lumo py-12 md:py-16">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { k: "11", v: "артикулов металлов в линейке 2K" },
            { k: "300–800", v: "микрон — толщина слоя после полировки" },
            { k: "5+2", v: "лет письменной гарантии" },
          ].map((m) => (
            <div
              key={m.k}
              className="rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] p-6"
            >
              <div className="font-[family-name:var(--font-mono)] text-gradient-warm text-[36px] md:text-[44px] leading-none">
                {m.k}
              </div>
              <div className="mt-3 text-[14px] leading-snug text-[color:var(--text-secondary)]">
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {MATERIAL.steps.map((s, i) => (
        <section
          key={s.n}
          className={`py-20 md:py-28 ${i % 2 === 0 ? "bg-[color:var(--bg-elevated)]" : ""}`}
        >
          <div className="container-lumo">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
              <Reveal className="md:col-span-5">
                <div className="font-[family-name:var(--font-mono)] text-[clamp(50px,7vw,96px)] leading-[0.9] text-gradient-warm">
                  {s.n}
                </div>
                <div className="mt-3 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                  {s.label}
                </div>
                <h2 className="mt-4 font-[family-name:var(--font-unbounded)] font-medium tracking-[-0.02em] text-[clamp(28px,3.6vw,44px)] leading-[1.08] text-[color:var(--text-primary)]">
                  {s.title}
                </h2>
              </Reveal>

              <Reveal delay={0.05} className="md:col-span-7">
                {s.body.map((p) => (
                  <p
                    key={p.slice(0, 32)}
                    className="mt-0 mb-5 last:mb-0 text-[15px] md:text-[17px] leading-relaxed text-[color:var(--text-secondary)]"
                  >
                    {p}
                  </p>
                ))}

                {s.facts && (
                  <div className="mt-8">
                    <FactsGrid items={[...s.facts]} />
                  </div>
                )}

                {"caveat" in s && s.caveat && (
                  <p className="mt-6 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[color:var(--text-muted)] max-w-[640px] leading-relaxed">
                    {s.caveat}
                  </p>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Sub-lead — what's inside (plain language) */}
      <section className="py-16 md:py-20 bg-[color:var(--bg-elevated)]">
        <div className="container-lumo grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className="md:col-span-4">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Простыми словами
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-unbounded)] font-medium text-[clamp(22px,2.6vw,32px)] leading-[1.1] text-[color:var(--text-primary)]">
              Что внутри банки и почему это работает
            </h2>
          </div>
          <div className="md:col-span-8 space-y-4 text-[15px] md:text-[16px] leading-relaxed text-[color:var(--text-secondary)]">
            <p>
              <GlossaryTip term="2K">{GLOSSARY["2K"].plain}</GlossaryTip>
              -система жидкого металла — это две банки: А (металл в полимерном связующем) и&nbsp;Б (отвердитель). После смешивания идёт химическая реакция —{" "}
              <GlossaryTip term="pot life">{GLOSSARY["pot life"].plain}</GlossaryTip>{" "}
              у нас 20&nbsp;минут, потом материал каменеет.
            </p>
            <p>
              На стену наносим{" "}
              <GlossaryTip term="HVLP">{GLOSSARY["HVLP"].plain}</GlossaryTip>
              -краскопультом Festool — это «много воздуха, низкое давление», без перерасхода. Для рельефа — мастерком и шпателем, как в&nbsp;венецианской традиции.
            </p>
            <p>
              Шлифуем по шкале{" "}
              <GlossaryTip term="P80 → P2000">{GLOSSARY["P80 → P2000"].plain}</GlossaryTip>
              {" "}— от грубой к тонкой, восемь стадий. Полируем тёплые металлы пастой{" "}
              <GlossaryTip term="Dialux Jaune">{GLOSSARY["Dialux Jaune"].plain}</GlossaryTip>{" "}
              — без неё характерный медовый блеск не получишь.
            </p>
            <p>
              Финальный слой —{" "}
              <GlossaryTip term="2K-clearcoat">{GLOSSARY["2K-clearcoat"].plain}</GlossaryTip>
              {" "}или{" "}
              <GlossaryTip term="полисилазан">{GLOSSARY["полисилазан"].plain}</GlossaryTip>
              {" "}для каминных порталов и фасадов с термонагрузкой.
            </p>
          </div>
        </div>
      </section>

      <MetalSamples />

      {/* Bases + Metals */}
      <section className="py-20 md:py-28">
        <div className="container-lumo grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <Reveal>
            <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Допустимые основания
            </div>
            <h3 className="mt-4 font-[family-name:var(--font-unbounded)] font-medium text-[24px] md:text-[28px] text-[color:var(--text-primary)]">
              Где применяется AuraMetal
            </h3>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {MATERIAL.bases.map((b) => (
                <li
                  key={b}
                  className="px-4 py-3 rounded-lg border border-[color:var(--border)] text-[14px] text-[color:var(--text-primary)]"
                >
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Линейка 2K — металлы
            </div>
            <h3 className="mt-4 font-[family-name:var(--font-unbounded)] font-medium text-[24px] md:text-[28px] text-[color:var(--text-primary)]">
              11 артикулов
            </h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {MATERIAL.metals2k.map((m) => (
                <li
                  key={m}
                  className="px-3 py-1.5 rounded-full border border-[color:var(--border-strong)] font-[family-name:var(--font-mono)] text-[11px] tracking-[0.06em] text-[color:var(--text-secondary)]"
                >
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <PageCta
        title="Заказать выкрас в выбранном финише"
        body="Образец A4 — 3 дня. Тестовый выкрас 30×30 см на стене заказчика — 7 дней."
        primary={{ label: MATERIAL.ctas.primary, href: "/contacts" }}
        secondary={{ label: MATERIAL.ctas.secondary, href: "/trade" }}
      />
    </>
  );
}
