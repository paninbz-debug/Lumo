import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { PageCta } from "@/components/sections/page-cta";
import { Reveal } from "@/components/reveal";
import { APPLICATIONS_INDEX, APPLICATIONS_LIST } from "@/lib/copy/applications";
import { draftRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Применения — где живёт жидкий металл | LUMO",
  description:
    "Шесть типов объектов: стены, мебель и MDF-фасады, кухни, ванные, HoReCa и фасады. У каждого свои зоны риска, своя подготовка и допустимые коллекции.",
  robots: draftRobots,
  alternates: { canonical: "/applications" },
};

export default function ApplicationsIndexPage() {
  return (
    <>
      <PageHero
        label={APPLICATIONS_INDEX.hero.label}
        title={APPLICATIONS_INDEX.hero.title}
        lead={APPLICATIONS_INDEX.hero.lead}
      />

      <section className="container-lumo pb-24 md:pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {APPLICATIONS_LIST.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.04}>
              <Link
                href={`/applications/${a.id}`}
                className="group block h-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-card)] p-7 hover:border-[color:var(--accent-brass)] transition-colors"
              >
                <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                  Применение · 0{i + 1}
                </div>
                <h2 className="mt-4 font-[family-name:var(--font-unbounded)] font-medium text-[24px] md:text-[28px] text-[color:var(--text-primary)]">
                  {a.name}
                </h2>
                <p className="mt-2 font-[family-name:var(--font-cormorant)] italic text-[16px] text-[color:var(--text-secondary)] leading-snug">
                  {a.tagline}
                </p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em] uppercase text-[color:var(--text-secondary)] group-hover:text-[color:var(--accent-brass)] transition-colors">
                    Открыть
                  </span>
                  <span aria-hidden className="w-9 h-9 rounded-full border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--text-secondary)] group-hover:text-[color:var(--accent-brass)] group-hover:border-[color:var(--accent-brass)] transition-colors">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <PageCta
        title="Не нашли свой тип объекта?"
        body="Напишите менеджеру — обсудим, подходит ли жидкий металл для вашей задачи. Если не подходит — скажем честно."
        primary={{ label: "Поговорить с мастером", href: "/contacts" }}
        secondary={{ label: "Все коллекции", href: "/collections" }}
      />
    </>
  );
}
