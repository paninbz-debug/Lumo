import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { PageCta } from "@/components/sections/page-cta";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Reveal } from "@/components/reveal";
import { APPLICATIONS_LIST, getApplication } from "@/lib/copy/applications";
import { getCollection } from "@/lib/copy/collections";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return APPLICATIONS_LIST.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getApplication(slug);
  if (!a) return { title: "Применение не найдено | LUMO" };
  return {
    title: `${a.name} — ${a.tagline} | LUMO`,
    description: a.lead,
    alternates: { canonical: `/applications/${a.id}` },
  };
}

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getApplication(slug);
  if (!a) notFound();

  return (
    <>
      <PageHero label={`Применение · ${a.name}`} title={a.tagline} lead={a.lead} />

      {/* Risk zones + Preparation */}
      <section className="py-20 md:py-28 bg-[color:var(--bg-elevated)]">
        <div className="container-lumo grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <Reveal>
            <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Зоны риска
            </div>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-medium text-[24px] md:text-[28px] text-[color:var(--text-primary)]">
              Где материал работает на пределе
            </h2>
            <ul className="mt-7 space-y-3">
              {a.riskZones.map((r) => (
                <li
                  key={r}
                  className="px-5 py-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-card)] text-[14px] text-[color:var(--text-secondary)] leading-snug"
                >
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent-brass)]">
              Подготовка
            </div>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-medium text-[24px] md:text-[28px] text-[color:var(--text-primary)]">
              Как мы работаем здесь
            </h2>
            <ul className="mt-7 space-y-3">
              {a.preparation.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-[14px] text-[color:var(--text-secondary)] leading-relaxed"
                >
                  <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-[color:var(--accent-brass)]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Recommended collections */}
      <section className="py-20 md:py-28">
        <div className="container-lumo">
          <Reveal>
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Рекомендуем
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(26px,3.6vw,44px)] leading-[1.08] text-[color:var(--text-primary)] max-w-[820px]">
              Какие коллекции подходят
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {a.recommendedCollections.map((rc, i) => {
              const col = getCollection(rc.slug);
              if (!col) return null;
              return (
                <Reveal key={rc.slug} delay={i * 0.04}>
                  <Link
                    href={`/collections/${col.id}`}
                    className="group block h-full rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] p-6 hover:border-[color:var(--accent-brass)] transition-colors"
                  >
                    <div
                      className={cn(
                        "font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase",
                        col.accent === "warm" ? "text-gradient-warm" : "text-gradient-cool"
                      )}
                    >
                      {col.epithet}
                    </div>
                    <h3 className="mt-3 font-[family-name:var(--font-unbounded)] font-medium text-[20px] text-[color:var(--text-primary)]">
                      {col.name}
                    </h3>
                    <p className="mt-3 text-[14px] text-[color:var(--text-secondary)] leading-relaxed">
                      {rc.reason}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em] uppercase text-[color:var(--text-secondary)] group-hover:text-[color:var(--accent-brass)] transition-colors">
                      Открыть коллекцию <ArrowUpRight size={12} aria-hidden />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cases + Durability */}
      <section className="py-20 md:py-28 bg-[color:var(--bg-elevated)]">
        <div className="container-lumo grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <Reveal className="md:col-span-7">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Из практики
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-medium text-[24px] md:text-[32px] text-[color:var(--text-primary)]">
              Реальные объекты
            </h2>
            <ul className="mt-7 space-y-3">
              {a.cases.map((c) => (
                <li
                  key={c.title}
                  className="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-card)] px-5 py-4 flex items-center justify-between gap-4"
                >
                  <span className="text-[14.5px] text-[color:var(--text-primary)]">{c.title}</span>
                  <span className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--text-secondary)]">
                    {c.metric}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[color:var(--text-muted)]">
              Адреса и имена не разглашаем без отдельного согласования.
            </p>
          </Reveal>

          <Reveal className="md:col-span-5" delay={0.05}>
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Срок и уход
            </span>
            <h3 className="mt-5 font-[family-name:var(--font-unbounded)] font-medium text-[20px] md:text-[24px] text-[color:var(--text-primary)]">
              Что получает заказчик
            </h3>
            <dl className="mt-7 space-y-5">
              <div>
                <dt className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--accent-brass)]">
                  Срок
                </dt>
                <dd className="mt-1 text-[14px] text-[color:var(--text-secondary)] leading-relaxed">
                  {a.durability}
                </dd>
              </div>
              <div>
                <dt className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--accent-brass)]">
                  Уход
                </dt>
                <dd className="mt-1 text-[14px] text-[color:var(--text-secondary)] leading-relaxed">
                  {a.care}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <FaqAccordion
        label="FAQ по объекту"
        title={`Частые вопросы про ${a.name.toLowerCase()}`}
        items={[...a.faq]}
      />

      <PageCta
        title={a.ctaPrimary}
        body="Назовите площадь, нужный финиш и срок готовности — пришлём смету и предложим окно записи."
        primary={{ label: a.ctaPrimary, href: "/contacts" }}
        secondary={{ label: "Открыть прайс", href: "/pricing" }}
      />
    </>
  );
}
