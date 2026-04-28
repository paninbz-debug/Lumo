import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { PageCta } from "@/components/sections/page-cta";
import { Reveal } from "@/components/reveal";
import { COLLECTIONS_INDEX, COLLECTIONS_LIST } from "@/lib/copy/collections";
import { cn } from "@/lib/utils";
import { draftRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Коллекции — пять характеров одного материала | LUMO",
  description:
    "Пять коллекций финишей жидкого металла: Deep Mirror (зеркало), Aged Patina (биография), Brushed Daylight (свет), Liquid Mercury (ртуть), Copper Fire (огонь).",
  robots: draftRobots,
  alternates: { canonical: "/collections" },
};

export default function CollectionsIndexPage() {
  return (
    <>
      <PageHero
        label={COLLECTIONS_INDEX.hero.label}
        title={COLLECTIONS_INDEX.hero.title}
        lead={COLLECTIONS_INDEX.hero.lead}
      />

      <section className="container-lumo pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-6">
          {COLLECTIONS_LIST.map((c, i) => {
            const span = i < 2 ? "md:col-span-3" : i < 4 ? "md:col-span-3" : "md:col-span-6";
            const isWide = i >= 4;
            return (
              <Reveal key={c.id} delay={i * 0.05} className={cn(span)}>
                <Link
                  href={`/collections/${c.id}`}
                  className={cn(
                    "group relative block overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-card)] p-7 md:p-9 min-h-[360px] md:min-h-[440px]",
                    isWide && "md:p-12 md:min-h-[380px]"
                  )}
                >
                  <div
                    aria-hidden
                    className={cn(
                      "absolute inset-0 -z-10 opacity-[0.18] transition-opacity duration-500 group-hover:opacity-[0.32]",
                      c.accent === "warm" ? "bg-gradient-warm" : ""
                    )}
                    style={c.accent === "cool" ? { backgroundImage: "var(--gradient-cool)" } : undefined}
                  />
                  <div aria-hidden className="absolute inset-0 -z-10 mix-blend-overlay opacity-50 bg-grain" />

                  <div className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">
                    Коллекция · 0{i + 1} / {COLLECTIONS_LIST.length}
                  </div>
                  <h2
                    className={cn(
                      "mt-4 font-[family-name:var(--font-unbounded)] font-medium text-[color:var(--text-primary)] tracking-[-0.01em]",
                      isWide ? "text-[clamp(34px,4.6vw,56px)]" : "text-[clamp(28px,3.4vw,42px)]"
                    )}
                  >
                    {c.name}
                  </h2>
                  <div
                    className={cn(
                      "mt-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase",
                      c.accent === "warm" ? "text-gradient-warm" : "text-gradient-cool"
                    )}
                  >
                    {c.epithet}
                  </div>
                  <p className="mt-6 font-[family-name:var(--font-cormorant)] italic text-[18px] md:text-[20px] leading-snug text-[color:var(--text-secondary)]">
                    {c.catalog}
                  </p>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em] uppercase text-[color:var(--text-secondary)] group-hover:text-[color:var(--accent-brass)] transition-colors">
                      Открыть коллекцию
                    </span>
                    <span aria-hidden className="w-9 h-9 rounded-full border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--text-secondary)] group-hover:text-[color:var(--accent-brass)] group-hover:border-[color:var(--accent-brass)] transition-colors">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <PageCta
        title="Запросить образец A4 — три дня"
        body="Можно увидеть финиш в скользящем свете перед заказом тестового выкраса."
        primary={{ label: COLLECTIONS_INDEX.ctaPrimary, href: "/contacts" }}
        secondary={{ label: "Все детали ремесла", href: "/craft" }}
      />
    </>
  );
}
