import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, X } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { PageCta } from "@/components/sections/page-cta";
import { FactsGrid } from "@/components/sections/facts-grid";
import { Reveal } from "@/components/reveal";
import { COLLECTIONS_LIST, COLLECTIONS_INDEX, getCollection } from "@/lib/copy/collections";
import { COLLECTION_GALLERY, PLACEHOLDER_HINT } from "@/lib/copy/visuals";
import { ImageLightboxGallery } from "@/components/ui/image-lightbox";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return COLLECTIONS_LIST.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return { title: "Коллекция не найдена | LUMO" };
  return {
    title: `${c.name} — ${c.tagline} | LUMO`,
    description: c.catalog,
    alternates: { canonical: `/collections/${c.id}` },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();

  const others = COLLECTIONS_LIST.filter((x) => x.id !== c.id);

  return (
    <>
      <PageHero
        label={`Коллекция · 0${COLLECTIONS_LIST.findIndex((x) => x.id === c.id) + 1} / ${COLLECTIONS_LIST.length}`}
        title={
          <>
            <span className="block">{c.name}</span>
            <span
              className={cn(
                "block mt-2 font-[family-name:var(--font-cormorant)] italic font-light text-[clamp(22px,3vw,40px)] leading-[1.1]",
                c.accent === "warm" ? "text-gradient-warm" : "text-gradient-cool"
              )}
            >
              {c.tagline}
            </span>
          </>
        }
      />

      {/* 3 voice variants — poetic / catalog / premium */}
      <section className="container-lumo pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <Reveal className="md:col-span-7 space-y-8 md:space-y-10">
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                Поэтически
              </div>
              <p className="mt-3 font-[family-name:var(--font-cormorant)] italic text-[20px] md:text-[24px] leading-snug text-[color:var(--text-primary)]">
                {c.poetic}
              </p>
            </div>
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                Каталожно
              </div>
              <p className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-[color:var(--text-secondary)]">
                {c.catalog}
              </p>
            </div>
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                Для премиум-клиента
              </div>
              <p className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-[color:var(--text-secondary)]">
                {c.premium}
              </p>
            </div>
          </Reveal>

          {/* Spec card */}
          <Reveal delay={0.05} className="md:col-span-5">
            <div className="sticky top-28 rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] p-6 md:p-7">
              <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent-brass)]">
                Параметры финиша
              </div>
              <dl className="mt-5 space-y-4 font-[family-name:var(--font-mono)] text-[12.5px]">
                {[
                  ["Финиш", c.finish],
                  ["Металлы", c.metals.join(", ")],
                  ["Шлифовка", c.sanding],
                  ["Полировка", c.polish],
                  ["Толщина слоя", c.thickness],
                  ["Блеск", c.glossGU],
                  ["Защита", c.protection],
                  ["Гарантия", c.warranty],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 pb-3 border-b border-[color:var(--border)] last:border-0">
                    <dt className="text-[10px] tracking-[0.16em] uppercase text-[color:var(--text-muted)]">{k}</dt>
                    <dd className="text-[color:var(--text-primary)] leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 md:py-28 bg-[color:var(--bg-elevated)]">
        <div className="container-lumo">
          <Reveal>
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Применения
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(28px,4vw,48px)] leading-[1.05] text-[color:var(--text-primary)] max-w-[820px]">
              Где живёт {c.name}
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            <Reveal>
              <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent-brass)] mb-4">
                Подходит для
              </div>
              <ul className="space-y-3">
                {c.applications.map((a) => (
                  <li key={a} className="flex gap-3 items-start text-[14.5px] text-[color:var(--text-secondary)] leading-relaxed">
                    <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-[color:var(--accent-brass)]" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)] mb-4">
                Не для
              </div>
              <ul className="space-y-3">
                {c.notFor.map((a) => (
                  <li key={a} className="flex gap-3 items-start text-[14.5px] text-[color:var(--text-muted)] leading-relaxed">
                    <X size={18} aria-hidden className="mt-0.5 shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {c.relatedApps.map((r) => (
                <Link
                  key={r.slug}
                  href={`/applications/${r.slug}`}
                  className="group rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] px-5 py-4 flex items-center justify-between gap-3 hover:border-[color:var(--accent-brass)] transition-colors"
                >
                  <span className="text-[14px] text-[color:var(--text-primary)]">{r.label}</span>
                  <ArrowUpRight size={14} aria-hidden className="text-[color:var(--text-secondary)] group-hover:text-[color:var(--accent-brass)] transition-colors" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28">
        <div className="container-lumo">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
              <div>
                <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                  Галерея
                </span>
                <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(26px,3.6vw,44px)] leading-[1.08] text-[color:var(--text-primary)]">
                  {c.name} в&nbsp;интерьерах
                </h2>
              </div>
              <p className="md:text-right md:max-w-[360px] text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
                Объекты подобраны с разрешения клиентов. Адреса и имена не разглашаем без отдельного согласования.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <ImageLightboxGallery
              items={[...COLLECTION_GALLERY[c.id]]}
              aspect="4/5"
              placeholderHint={PLACEHOLDER_HINT}
            />
          </Reveal>
        </div>
      </section>

      {/* References */}
      <section className="py-20 md:py-28">
        <div className="container-lumo">
          <Reveal>
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Культурные референсы
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(26px,3.6vw,44px)] leading-[1.08] text-[color:var(--text-primary)] max-w-[820px]">
              Откуда у этого финиша память
            </h2>
          </Reveal>
          <div className="mt-10">
            <FactsGrid
              items={c.references.map((r, i) => ({ k: `Ref · 0${i + 1}`, v: r }))}
              columns={2}
            />
          </div>
        </div>
      </section>

      {/* Other collections */}
      <section className="py-20 md:py-28 bg-[color:var(--bg-elevated)]">
        <div className="container-lumo">
          <Reveal>
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Другие коллекции
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(26px,3.6vw,44px)] leading-[1.08] text-[color:var(--text-primary)]">
              Четыре других характера материала
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {others.map((o) => (
              <Link
                key={o.id}
                href={`/collections/${o.id}`}
                className="group block rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] p-5 hover:border-[color:var(--accent-brass)] transition-colors"
              >
                <div className={cn("font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase", o.accent === "warm" ? "text-gradient-warm" : "text-gradient-cool")}>
                  {o.epithet}
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-unbounded)] font-medium text-[18px] text-[color:var(--text-primary)]">
                  {o.name}
                </h3>
                <p className="mt-2 text-[12.5px] text-[color:var(--text-muted)] leading-snug">
                  {o.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        title={`Заказать выкрас в финише ${c.name}`}
        body="Образец A4 в выбранной коллекции — 3 дня. Тестовый выкрас 30×30 на стене заказчика — 7 дней."
        primary={{ label: COLLECTIONS_INDEX.ctaPrimary, href: "/contacts" }}
        secondary={{ label: COLLECTIONS_INDEX.ctaSecondary, href: "/contacts" }}
      />
    </>
  );
}
