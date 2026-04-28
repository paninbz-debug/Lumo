import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { PageCta } from "@/components/sections/page-cta";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Reveal } from "@/components/reveal";
import { NumberTicker } from "@/components/ui/number-ticker";
import { PRICING_PAGE } from "@/lib/copy/pricing";
import { PRICING_BREAKDOWN, PRICE_CHART_DATA } from "@/lib/copy/pricing-extras";
import { PriceChart } from "@/components/ui/price-chart";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Цена — 25 000–55 000 ₽/м² | LUMO",
  description:
    "Открытая вилка цены: 25 000–55 000 ₽ за м² жидкого металла под ключ в Москве. В смете отдельно: материал, грунт, работа, лак. Сравнение с альтернативами и 10 ответов на частые вопросы.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        label={PRICING_PAGE.hero.label}
        title={PRICING_PAGE.hero.title}
        lead={PRICING_PAGE.hero.body}
      />

      {/* Big numbers */}
      <section className="container-lumo pb-12">
        <Reveal>
          <div className="font-[family-name:var(--font-mono)] font-light leading-[0.95] tracking-[-0.04em] text-[clamp(56px,9vw,140px)]">
            <NumberTicker
              to={Number(PRICING_PAGE.hero.rangeFrom.replace(/\s/g, ""))}
              className="text-gradient-warm"
            />
            <span className="text-[color:var(--text-muted)]"> — </span>
            <NumberTicker
              to={Number(PRICING_PAGE.hero.rangeTo.replace(/\s/g, ""))}
              className="text-gradient-warm"
            />
          </div>
          <div className="mt-3 font-[family-name:var(--font-mono)] text-[14px] tracking-[0.06em] text-[color:var(--text-secondary)]">
            {PRICING_PAGE.hero.unit}
          </div>
        </Reveal>
      </section>

      {/* Cost breakdown 50/30/15/5 — plain language */}
      <section className="py-20 md:py-28">
        <div className="container-lumo">
          <Reveal>
            <div className="max-w-[820px]">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                {PRICING_BREAKDOWN.label}
              </span>
              <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(28px,4vw,52px)] leading-[1.05] text-[color:var(--text-primary)]">
                {PRICING_BREAKDOWN.title}
              </h2>
              <p className="mt-6 text-[15px] md:text-[17px] leading-relaxed text-[color:var(--text-secondary)] max-w-[680px]">
                {PRICING_BREAKDOWN.intro}
              </p>
            </div>
          </Reveal>

          {/* visual stacked bar */}
          <Reveal>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
              {PRICING_BREAKDOWN.parts.map((p, i) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] p-6 md:p-7"
                  style={{ gridColumn: `span ${Math.max(2, Math.round(p.pct / 100 * 12))} / span ${Math.max(2, Math.round(p.pct / 100 * 12))}` }}
                >
                  <div className="font-[family-name:var(--font-mono)] text-gradient-warm text-[36px] md:text-[44px] leading-none">
                    {p.pct}<span className="text-[24px] md:text-[28px] text-[color:var(--text-muted)] font-normal">%</span>
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-unbounded)] font-medium text-[18px] md:text-[20px] text-[color:var(--text-primary)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[color:var(--text-secondary)]">
                    {p.body}
                  </p>
                  <div className="mt-5 h-1 rounded-full bg-[color:var(--bg-elevated)] overflow-hidden">
                    <span className="block h-full bg-gradient-warm" style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-10 max-w-[760px] font-[family-name:var(--font-cormorant)] italic text-[18px] md:text-[20px] leading-snug text-[color:var(--text-secondary)]">
              В сумме — стоимость, которую можно передать через десять лет следующему владельцу квартиры как мебель.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Visual price chart — log scale */}
      <section className="py-20 md:py-28 bg-[color:var(--bg-elevated)]">
        <div className="container-lumo">
          <Reveal>
            <div className="max-w-[820px]">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                Сравнительная картина
              </span>
              <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(28px,4vw,52px)] leading-[1.05] text-[color:var(--text-primary)]">
                Цена и срок службы — на одной шкале
              </h2>
              <p className="mt-6 text-[15px] md:text-[16px] leading-relaxed text-[color:var(--text-secondary)] max-w-[640px]">
                Логарифмическая шкала цен от 700 ₽ до 100 000 ₽/м². Точка справа на каждой полосе — срок службы в годах.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-12">
              <PriceChart rows={[...PRICE_CHART_DATA]} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Factors */}
      <section className="py-20 md:py-28 bg-[color:var(--bg-elevated)]">
        <div className="container-lumo">
          <Reveal>
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              5 факторов цены
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(28px,4vw,52px)] leading-[1.05] text-[color:var(--text-primary)] max-w-[820px]">
              Что внутри сметы. Каждой строкой.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {PRICING_PAGE.factors.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04}>
                <div className="h-full border-t border-[color:var(--border-strong)] pt-6">
                  <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase text-[color:var(--accent-brass)]">
                    Фактор · 0{i + 1}
                  </div>
                  <h3 className="mt-3 font-[family-name:var(--font-unbounded)] font-medium text-[18px] md:text-[20px] text-[color:var(--text-primary)]">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What included / not included */}
      <section className="py-20 md:py-28">
        <div className="container-lumo grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <Reveal>
            <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent-brass)]">
              Входит в стоимость
            </div>
            <h3 className="mt-4 font-[family-name:var(--font-unbounded)] font-medium text-[24px] md:text-[28px] text-[color:var(--text-primary)]">
              Что мы делаем
            </h3>
            <ul className="mt-6 space-y-3">
              {PRICING_PAGE.whatIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14.5px] text-[color:var(--text-secondary)] leading-relaxed">
                  <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-[color:var(--accent-brass)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Не входит
            </div>
            <h3 className="mt-4 font-[family-name:var(--font-unbounded)] font-medium text-[24px] md:text-[28px] text-[color:var(--text-primary)]">
              Что мы не делаем
            </h3>
            <ul className="mt-6 space-y-3">
              {PRICING_PAGE.whatNotIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14.5px] text-[color:var(--text-muted)] leading-relaxed">
                  <X size={18} aria-hidden className="mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Alternatives table */}
      <section className="py-20 md:py-28 bg-[color:var(--bg-elevated)]">
        <div className="container-lumo">
          <Reveal>
            <div className="max-w-[820px]">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                Сравнение с альтернативами
              </span>
              <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(28px,4vw,52px)] leading-[1.05] text-[color:var(--text-primary)]">
                Когда выбрать жидкий металл, когда — другое
              </h2>
            </div>
          </Reveal>

          {/* Desktop table */}
          <Reveal>
            <div className="mt-12 hidden md:block rounded-2xl border border-[color:var(--border-strong)] overflow-hidden">
              <div className="grid grid-cols-12 px-6 py-4 bg-[color:var(--bg-card)] border-b border-[color:var(--border-strong)] font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                <div className="col-span-3">Решение</div>
                <div className="col-span-2">Цена за м²</div>
                <div className="col-span-2">Срок службы</div>
                <div className="col-span-3">Эстетика</div>
                <div className="col-span-2">Когда выбрать</div>
              </div>
              {PRICING_PAGE.alternatives.map((row, i) => (
                <div
                  key={row.name}
                  className={cn(
                    "grid grid-cols-12 px-6 py-5 items-start gap-4",
                    i % 2 ? "bg-[color:var(--bg-primary)]" : "bg-[color:var(--bg-card)]",
                    row.featured && "bg-gradient-to-r from-[rgba(184,153,104,0.08)] via-[rgba(199,125,74,0.05)] to-transparent border-l-2 border-l-[color:var(--accent-brass)]"
                  )}
                >
                  <div className={cn("col-span-3 text-[14px] font-medium", row.featured ? "text-gradient-warm" : "text-[color:var(--text-primary)]")}>
                    {row.name}
                  </div>
                  <div className="col-span-2 font-[family-name:var(--font-mono)] text-[13px] text-[color:var(--text-primary)]">
                    {row.pricePerM2}
                  </div>
                  <div className="col-span-2 font-[family-name:var(--font-mono)] text-[13px] text-[color:var(--text-secondary)]">
                    {row.lifespan}
                  </div>
                  <div className="col-span-3 text-[13.5px] text-[color:var(--text-secondary)] leading-snug">
                    {row.aesthetic}
                  </div>
                  <div className="col-span-2 text-[13.5px] text-[color:var(--text-muted)] leading-snug">
                    {row.whenChoose}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Mobile cards */}
          <div className="mt-10 md:hidden flex flex-col gap-3">
            {PRICING_PAGE.alternatives.map((row) => (
              <div
                key={row.name}
                className={cn(
                  "rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] p-5",
                  row.featured && "border-l-2 border-l-[color:var(--accent-brass)]"
                )}
              >
                <div className={cn("font-[family-name:var(--font-unbounded)] font-medium text-[16px]", row.featured ? "text-gradient-warm" : "text-[color:var(--text-primary)]")}>
                  {row.name}
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2 font-[family-name:var(--font-mono)] text-[12px]">
                  <div><dt className="text-[color:var(--text-muted)] uppercase tracking-[0.1em] text-[10px]">Цена</dt><dd className="mt-0.5 text-[color:var(--text-primary)]">{row.pricePerM2}</dd></div>
                  <div><dt className="text-[color:var(--text-muted)] uppercase tracking-[0.1em] text-[10px]">Срок</dt><dd className="mt-0.5 text-[color:var(--text-primary)]">{row.lifespan}</dd></div>
                </dl>
                <p className="mt-3 text-[13px] text-[color:var(--text-secondary)] leading-snug">{row.aesthetic}</p>
                <p className="mt-2 text-[12px] text-[color:var(--text-muted)] leading-snug">Когда выбрать: {row.whenChoose}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion items={[...PRICING_PAGE.faq]} />

      <PageCta
        title="Запросить расчёт по объекту"
        body="Назовите тип объекта, площадь и желаемый финиш — пришлём смету с разбивкой по строкам в течение часа."
        primary={{ label: PRICING_PAGE.ctas.primary, href: "/contacts" }}
        secondary={{ label: PRICING_PAGE.ctas.secondary, href: "/contacts" }}
      />
    </>
  );
}
