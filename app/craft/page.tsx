import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { PageCta } from "@/components/sections/page-cta";
import { FactsGrid } from "@/components/sections/facts-grid";
import { Reveal } from "@/components/reveal";
import { CRAFT_PAGE } from "@/lib/copy/craft";
import { CRAFT_PROCESS, PLACEHOLDER_HINT } from "@/lib/copy/visuals";
import { GlossaryTip } from "@/components/ui/glossary";
import { GLOSSARY } from "@/lib/copy/glossary";

export const metadata: Metadata = {
  title: "Ремесло — пять самостоятельных ремёсел | LUMO",
  description:
    "Подготовка, нанесение, шлифовка, полировка, защита. От DTM-праймера до полисилазана 9H+ — каждый этап ведёт отдельный мастер AuraMetal Academy.",
  alternates: { canonical: "/craft" },
};

const PLAIN: Array<{ subtitle: string; details: string[] }> = [
  {
    subtitle: "Стену готовят к металлу — и без этого не начинают.",
    details: ["Тест влажности, ремонт неровностей, праймер и фотопротокол. Скрытые работы фиксируются актом — это часть гарантии."],
  },
  {
    subtitle: "20 минут от смешивания до схватывания. Внутри окна работают чисто.",
    details: ["Распыление HVLP-краскопультом, мастерком и шпателем — для рельефа."],
  },
  {
    subtitle: "8 стадий шлифовки, как у мастера ножей. От грубой к зеркалу.",
    details: ["Между каждой стадией — поперечная шлифовка против волокна предыдущей. Иначе зеркало нечестное."],
  },
  {
    subtitle: "Полировка особой пастой делает металл зеркальным без масс-эффекта.",
    details: ["Тёплые металлы — Dialux Jaune, французская полировальная паста. Без неё медового блеска не получишь."],
  },
  {
    subtitle: "Защитный слой, прозрачный как стекло, твёрдый как алмаз.",
    details: ["2K-полиуретан — для жилых зон. Полисилазан 9H+ — для каминных порталов и фасадов до 1000 °C."],
  },
];

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

      {/* Process visual gallery */}
      <section className="py-12 md:py-16">
        <div className="container-lumo">
          <Reveal>
            <ul className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {CRAFT_PROCESS.map((p, i) => (
                <li key={p.caption} className="placeholder-grain relative aspect-[4/5] rounded-xl border border-[color:var(--border)] overflow-hidden" style={{ background: p.gradient }}>
                  <span className="absolute top-3 left-3 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-white/85">
                    0{i + 1}
                  </span>
                  <span aria-hidden className="absolute inset-0 flex items-center justify-center text-[44px] md:text-[56px] opacity-60">{p.emoji}</span>
                  <span className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/65 to-transparent">
                    <span className="block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.04em] text-white">
                      {p.caption}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <p className="mt-4 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[color:var(--text-muted)]">
            {PLACEHOLDER_HINT}. Реальные кадры из мастер-класса AuraMetal Academy будут добавлены после съёмки.
          </p>
        </div>
      </section>

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
                <div className="mt-2 font-[family-name:var(--font-cormorant)] italic text-[20px] md:text-[24px] text-gradient-warm">
                  {s.tagline}
                </div>
                {/* plain-language one-liner */}
                <p className="mt-6 text-[15px] md:text-[16px] leading-relaxed text-[color:var(--text-primary)]">
                  {PLAIN[i].subtitle}
                </p>
              </Reveal>

              <Reveal delay={0.05} className="md:col-span-7">
                {s.paragraphs.map((p) => {
                  // Inline glossary tooltips for known technical terms
                  return (
                    <p
                      key={p.slice(0, 32)}
                      className="mb-5 last:mb-0 text-[15px] md:text-[17px] leading-relaxed text-[color:var(--text-secondary)]"
                    >
                      {renderWithGlossary(p)}
                    </p>
                  );
                })}
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

/**
 * Очень простой replace-and-wrap helper: заменяет известные термины на
 * <GlossaryTip> в строке. Не идеально, но достаточно для статичного контента.
 */
function renderWithGlossary(text: string): React.ReactNode {
  const TERMS: Array<keyof typeof GLOSSARY> = [
    "Pot life",
    "HVLP",
    "DTM-праймер",
    "Dialux Jaune",
    "P80 к P2000",
    "P80 → P2000",
    "2K-clearcoat",
  ];
  // build regex with longer terms first
  const sorted = [...TERMS].sort((a, b) => b.length - a.length);
  const escaped = sorted.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(re);

  return parts.map((p, idx) => {
    if (sorted.includes(p as keyof typeof GLOSSARY)) {
      const entry = GLOSSARY[p as keyof typeof GLOSSARY];
      return (
        <GlossaryTip key={idx} term={entry.term}>
          {entry.plain}
        </GlossaryTip>
      );
    }
    return <span key={idx}>{p}</span>;
  });
}
