import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/reveal";
import {
  COLLECTION_PHOTOS,
  APPLICATION_PHOTOS,
  CRAFT_PHOTOS,
  HERO_PHOTO,
  unsplashLink,
  type Photo,
} from "@/lib/copy/photos";

export const metadata: Metadata = {
  title: "Атрибуция фото | LUMO",
  description:
    "Все фото на сайте LUMO — временные, использованы для иллюстрации стилистики. Источник: Unsplash, free for commercial use. Атрибуция по каждому кадру.",
  alternates: { canonical: "/credits" },
};

function PhotoRow({ p }: { p: Photo & { section?: string } }) {
  return (
    <li className="grid grid-cols-12 gap-4 items-center py-4 border-b border-[color:var(--border)] last:border-0">
      <div className="col-span-3 md:col-span-2 relative aspect-[4/3] rounded-md overflow-hidden border border-[color:var(--border)]">
        <Image src={p.src} alt={p.caption} fill sizes="120px" className="object-cover" />
      </div>
      <div className="col-span-9 md:col-span-7 text-[13.5px] text-[color:var(--text-secondary)] leading-snug">
        <div className="text-[color:var(--text-primary)]">{p.caption}</div>
        <div className="mt-1 font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--text-muted)]">{p.src}</div>
      </div>
      <div className="col-span-12 md:col-span-3 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[color:var(--text-muted)]">
        <a
          href={unsplashLink(p.unsplashId)}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-4 hover:text-[color:var(--accent-brass)]"
        >
          Unsplash · {p.unsplashId.slice(0, 18)}…
        </a>
      </div>
    </li>
  );
}

function Section({ title, subtitle, photos }: { title: string; subtitle?: string; photos: Photo[] }) {
  return (
    <Reveal>
      <section className="mb-16">
        <h2 className="font-[family-name:var(--font-unbounded)] font-bold text-[20px] md:text-[24px] text-[color:var(--text-primary)]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-[14px] text-[color:var(--text-secondary)]">{subtitle}</p>
        )}
        <ul className="mt-6 rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] px-5 md:px-7">
          {photos.map((p) => (
            <PhotoRow key={p.src} p={p} />
          ))}
        </ul>
      </section>
    </Reveal>
  );
}

export default function CreditsPage() {
  return (
    <>
      <PageHero
        label="Phase 3.5 · временные иллюстрации"
        title="Атрибуция фотографий"
        lead="Все фото на сайте — временные, взяты с Unsplash и использованы как иллюстрация стилистики. Объекты на фото не выполнены студией LUMO. После собственной фотосессии в шоуруме мы заменим эти изображения на реальные работы."
      />

      <section className="container-lumo pb-24 md:pb-32">
        <Reveal>
          <div className="mb-14 max-w-[820px] rounded-2xl border border-[color:var(--accent-brass)] bg-[color:var(--bg-card)] p-7 md:p-8">
            <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent-brass)]">
              Лицензия
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-unbounded)] font-bold text-[20px] md:text-[22px] text-[color:var(--text-primary)]">
              Unsplash License
            </h2>
            <p className="mt-3 text-[14.5px] text-[color:var(--text-secondary)] leading-relaxed">
              Все изображения на этой странице — с фотобанка{" "}
              <a
                href="https://unsplash.com/license"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-4 hover:text-[color:var(--accent-brass)]"
              >
                Unsplash
              </a>
              . Лицензия разрешает коммерческое использование и модификацию без обязательной атрибуции — но мы её даём как good practice и&nbsp;знак уважения к&nbsp;авторам.
            </p>
            <p className="mt-3 text-[13.5px] text-[color:var(--text-muted)] leading-relaxed">
              Эталонные премиум-бренды, которые мы упоминали в&nbsp;research как ориентир (De&nbsp;Castelli, VeroMetal, Promemoria, Boca&nbsp;do&nbsp;Lobo, Brillux, Sculpt&nbsp;Nouveau, Modern&nbsp;Masters,&nbsp;Ideal Work)&nbsp;— на&nbsp;этой странице не&nbsp;представлены. Их фото защищены copyright; мы их не&nbsp;скачиваем и&nbsp;не&nbsp;используем в&nbsp;продуктиве.
            </p>
          </div>
        </Reveal>

        <Section
          title="Главный экран"
          subtitle="Фон для hero-блока на главной."
          photos={[HERO_PHOTO]}
        />

        <Section
          title="Коллекции"
          subtitle="По 8 кадров на каждую из 5 коллекций финиша."
          photos={Object.values(COLLECTION_PHOTOS).flat()}
        />

        <Section
          title="Применения"
          subtitle="По 5 кадров на каждый из 6 типов объектов."
          photos={Object.values(APPLICATION_PHOTOS).flat()}
        />

        <Section title="Ремесло — пять этапов" photos={CRAFT_PHOTOS} />

        <Reveal>
          <p className="mt-12 max-w-[760px] mx-auto text-center font-[family-name:var(--font-cormorant)] italic text-[18px] md:text-[20px] leading-snug text-[color:var(--text-secondary)]">
            После собственной фотосессии в&nbsp;шоуруме на&nbsp;Видном эта страница останется только с&nbsp;ссылками на&nbsp;контрольные референсы — все картинки будут заменены на&nbsp;кадры реальных проектов LUMO.
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[color:var(--border-strong)] text-[color:var(--text-primary)] text-[13px] font-semibold tracking-[0.06em] uppercase hover:border-[color:var(--accent-brass)] hover:text-[color:var(--accent-brass)] transition-colors min-h-[44px]"
            >
              Записаться на выкрас
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
