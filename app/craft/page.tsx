import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { PageCta } from "@/components/sections/page-cta";
import { FactsGrid } from "@/components/sections/facts-grid";
import { Reveal } from "@/components/reveal";
import { CRAFT_PAGE } from "@/lib/copy/craft";

export const metadata: Metadata = {
  title: "Ремесло — пять самостоятельных ремёсел | LUMO",
  description:
    "Подготовка, нанесение, шлифовка, полировка, защита. От DTM-праймера до полисилазана 9H+ — каждый этап ведёт отдельный мастер AuraMetal Academy.",
  alternates: { canonical: "/craft" },
};

export default function CraftPage() {
  return (
    <>
      <PageHero
        label={CRAFT_PAGE.hero.label}
        title={
          <>
            Пять самостоятельных ремёсел.{" "}
            <span className="text-gradient-warm">Один объект.</span>
          </>
        }
        lead={CRAFT_PAGE.hero.lead}
      />

      {CRAFT_PAGE.steps.map((s, i) => (
        <section
          key={s.n}
          className={`py-20 md:py-28 ${i % 2 === 0 ? "bg-[color:var(--bg-elevated)]" : ""}`}
        >
          <div className="container-lumo">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
              <Reveal className="md:col-span-5">
                <div className="font-[family-name:var(--font-mono)] text-[clamp(60px,9vw,120px)] leading-[0.9] text-gradient-warm">
                  {s.n}
                </div>
                <div className="mt-3 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                  Этап ремесла
                </div>
                <h2 className="mt-4 font-[family-name:var(--font-unbounded)] font-medium text-[clamp(28px,3.6vw,46px)] leading-[1.06] text-[color:var(--text-primary)]">
                  {s.name}
                </h2>
                <div
                  className="mt-2 font-[family-name:var(--font-cormorant)] italic text-[20px] md:text-[24px] text-gradient-warm"
                >
                  {s.tagline}
                </div>
              </Reveal>

              <Reveal delay={0.05} className="md:col-span-7">
                {s.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 32)}
                    className="mb-5 last:mb-0 text-[15px] md:text-[17px] leading-relaxed text-[color:var(--text-secondary)]"
                  >
                    {p}
                  </p>
                ))}
                <div className="mt-8">
                  <FactsGrid items={s.facts.map((f) => ({ k: f.k, v: f.v }))} />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <PageCta
        title={CRAFT_PAGE.ctaPrimary}
        body="Под брендом LUMO или под вашим — на выбор. Авторский надзор и фотопротокол на каждой стадии."
        primary={{ label: CRAFT_PAGE.ctaPrimary, href: "/contacts" }}
        secondary={{ label: CRAFT_PAGE.ctaSecondary, href: "/contacts" }}
      />
    </>
  );
}
