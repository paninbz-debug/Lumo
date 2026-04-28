import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { PageCta } from "@/components/sections/page-cta";
import { Reveal } from "@/components/reveal";
import { JOURNAL_INDEX, JOURNAL_ARTICLES } from "@/lib/copy/journal";
import { draftRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Журнал — про материал и ремесло | LUMO",
  description:
    "Разбираем жидкий металл честно: сравнения с альтернативами, ограничения, реальные сроки и реальные цены. Без эпитетов в превосходной степени.",
  robots: draftRobots,
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        label={JOURNAL_INDEX.hero.label}
        title={JOURNAL_INDEX.hero.title}
        lead={JOURNAL_INDEX.hero.lead}
      />

      <section className="container-lumo pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {JOURNAL_ARTICLES.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.04}>
              <article className="group block h-full rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] p-7 md:p-8 cursor-not-allowed">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent-brass)]">
                    {a.category}
                  </span>
                  <div className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--text-muted)]">
                    <Clock size={12} aria-hidden /> {a.readMin} мин
                  </div>
                </div>
                <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-medium text-[20px] md:text-[22px] leading-[1.2] text-[color:var(--text-primary)]">
                  {a.title}
                </h2>
                <p className="mt-4 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
                  {a.lead}
                </p>
                {a.draft && (
                  <div className="mt-6 inline-block rounded-full border border-[color:var(--border)] px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] uppercase text-[color:var(--text-muted)]">
                    Готовится — Phase 3
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <PageCta
        title="Подпишитесь на анонсы статей"
        body="Раз в месяц — одна развёрнутая статья. Без рекламы и продажи."
        primary={{ label: "Поговорить с мастером", href: "/contacts" }}
        secondary={{ label: "Все коллекции", href: "/collections" }}
      />
    </>
  );
}
