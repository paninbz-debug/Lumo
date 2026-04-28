import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { withBase } from "@/lib/asset-path";
import { COLLECTION_PHOTOS } from "@/lib/copy/photos";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    title: "Парадный вход · ЖК Москва-Сити",
    collection: "DEEP MIRROR",
    collectionHref: "/collections/deep-mirror",
    photo: COLLECTION_PHOTOS["deep-mirror"][2].src,
    metrics: [
      { k: "Площадь", v: "12 м²" },
      { k: "Финиш", v: "Латунь Deep Mirror" },
      { k: "Гарантия", v: "5+2 года" },
      { k: "Срок работ", v: "21 день" },
    ],
    description:
      "Колонна и портал входной группы — полировка от P80 к P2000, финальный проход Dialux Jaune. Зеркальный объём, в котором архитектура удваивается, а свет становится материалом.",
  },
  {
    title: "Лифтовой портал · бутик-отель",
    collection: "AGED PATINA",
    collectionHref: "/collections/aged-patina",
    photo: COLLECTION_PHOTOS["aged-patina"][2].src,
    metrics: [
      { k: "Площадь", v: "8 м²" },
      { k: "Финиш", v: "Медь Aged Patina" },
      { k: "Гарантия", v: "5+2 года" },
      { k: "Срок работ", v: "28 дней" },
    ],
    description:
      "Контролируемая патинация настоящей меди — рука мастера ускоряет окисление и фиксирует характер на нужном этапе. Финиш живёт под полисилазановым клиркоутом.",
  },
  {
    title: "Кухонный фасад · частный особняк",
    collection: "BRUSHED DAYLIGHT",
    collectionHref: "/collections/brushed-daylight",
    photo: COLLECTION_PHOTOS["brushed-daylight"][0].src,
    metrics: [
      { k: "Фасадов", v: "180" },
      { k: "Финиш", v: "Алюминий BD" },
      { k: "Гарантия", v: "5+2 года" },
      { k: "Срок работ", v: "12 дней" },
    ],
    description:
      "Однонаправленная штриховка по никелевому волосу — поверхность раскрывается только в скользящем свете. Идеален для кухонных МДФ-фасадов: отпечатки пальцев почти не видны.",
  },
];

export function FeaturedProjects() {
  return (
    <section className="relative py-24 md:py-36" aria-labelledby="featured-title">
      <div className="container-lumo">
        <Reveal>
          <div className="max-w-[820px] mb-16 md:mb-20">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Из практики
            </span>
            <h2
              id="featured-title"
              className="mt-5 font-[family-name:var(--font-unbounded)] font-black tracking-[-0.02em] text-[clamp(30px,4.6vw,64px)] leading-[1.04] text-[color:var(--text-primary)]"
            >
              Объекты, которые{" "}
              <span className="text-gradient-warm">передаются</span>
            </h2>
            <p className="mt-6 font-[family-name:var(--font-cormorant)] italic text-[18px] md:text-[22px] leading-snug text-[color:var(--text-secondary)]">
              Поверхности, которые можно передать через десять лет следующему владельцу — как мебель.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="space-y-16 md:space-y-24">
        {PROJECTS.map((p, i) => {
          const reverse = i % 2 === 1;
          return (
            <article key={p.title} className="container-lumo">
                <div
                  className={cn(
                    "grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center",
                    reverse && "md:[direction:rtl]"
                  )}
                >
                  {/* photo — 7/12 cols, ~60% */}
                  <div className="md:col-span-7 [direction:ltr]">
                    <Link
                      href={p.collectionHref}
                      className="group block relative aspect-[4/3] md:aspect-[16/11] overflow-hidden rounded-2xl border border-[color:var(--border)]"
                    >
                      <Image
                        src={withBase(p.photo)}
                        alt={`${p.title} — ${p.collection}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span aria-hidden className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
                    </Link>
                  </div>

                  {/* copy — 5/12 cols, ~40% */}
                  <div className="md:col-span-5 [direction:ltr]">
                    <Link
                      href={p.collectionHref}
                      className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] uppercase text-gradient-warm inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                      {p.collection}
                      <ArrowUpRight size={12} aria-hidden />
                    </Link>
                    <h3 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold text-[clamp(22px,2.8vw,34px)] leading-[1.15] text-[color:var(--text-primary)]">
                      {p.title}
                    </h3>
                    <p className="mt-5 text-[15px] md:text-[16px] leading-relaxed text-[color:var(--text-secondary)]">
                      {p.description}
                    </p>
                    <dl className="mt-7 grid grid-cols-2 gap-3 md:gap-4">
                      {p.metrics.map((m) => (
                        <div
                          key={m.k}
                          className="rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-card)] px-4 py-3"
                        >
                          <dt className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] uppercase text-[color:var(--text-muted)]">
                            {m.k}
                          </dt>
                          <dd className="mt-1 font-[family-name:var(--font-mono)] text-[14px] text-[color:var(--text-primary)]">
                            {m.v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
