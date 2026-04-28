import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, ExternalLink } from "lucide-react";
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
import {
  EXTERNAL_PHOTOS,
  BRAND_INFO,
  brandsWithPhotos,
  type Brand,
} from "@/lib/copy/external-photos";
import { DRAFT_MODE } from "@/lib/copy/draft-mode";
import { draftRobots } from "@/lib/seo";
import { withBase } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Атрибуция фото | LUMO",
  description:
    "Все фото на сайте LUMO — временные. Источники: Unsplash (free for commercial use) + ручные референсы из премиум-каталогов для personal review. Атрибуция по каждому кадру.",
  robots: draftRobots,
  alternates: { canonical: "/credits" },
};

function PhotoRow({ src, caption, right }: { src: string; caption: string; right: React.ReactNode }) {
  return (
    <li className="grid grid-cols-12 gap-4 items-center py-4 border-b border-[color:var(--border)] last:border-0">
      <div className="col-span-3 md:col-span-2 relative aspect-[4/3] rounded-md overflow-hidden border border-[color:var(--border)]">
        <Image src={withBase(src)} alt={caption} fill sizes="120px" className="object-cover" />
      </div>
      <div className="col-span-9 md:col-span-7 text-[13.5px] text-[color:var(--text-secondary)] leading-snug">
        <div className="text-[color:var(--text-primary)]">{caption}</div>
        <div className="mt-1 font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--text-muted)]">{src}</div>
      </div>
      <div className="col-span-12 md:col-span-3 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[color:var(--text-muted)]">
        {right}
      </div>
    </li>
  );
}

function UnsplashSection({ title, subtitle, photos }: { title: string; subtitle?: string; photos: Photo[] }) {
  return (
    <Reveal>
      <section className="mb-14">
        <h3 className="font-[family-name:var(--font-unbounded)] font-bold text-[18px] md:text-[22px] text-[color:var(--text-primary)]">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-2 text-[14px] text-[color:var(--text-secondary)]">{subtitle}</p>
        )}
        <ul className="mt-6 rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] px-5 md:px-7">
          {photos.map((p) => (
            <PhotoRow
              key={p.src}
              src={p.src}
              caption={p.caption}
              right={
                <a
                  href={unsplashLink(p.unsplashId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted underline-offset-4 hover:text-[color:var(--accent-brass)]"
                >
                  Unsplash · {p.unsplashId.slice(0, 18)}…
                </a>
              }
            />
          ))}
        </ul>
      </section>
    </Reveal>
  );
}

function BrandSection({ brand }: { brand: Brand }) {
  const info = BRAND_INFO[brand];
  const photos = EXTERNAL_PHOTOS.filter((p) => p.brand === brand);
  if (photos.length === 0) return null;
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h4 className="font-[family-name:var(--font-unbounded)] font-bold text-[16px] md:text-[18px] text-[color:var(--text-primary)]">
            {info.name}
          </h4>
          <a
            href={info.site}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--text-muted)] underline decoration-dotted underline-offset-4 hover:text-[color:var(--accent-brass)] inline-flex items-center gap-1.5"
          >
            {info.site.replace("https://", "")}
            <ExternalLink size={11} aria-hidden />
          </a>
        </div>
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] uppercase text-[color:var(--text-muted)]">
          {photos.length} ref
        </span>
      </div>
      <ul className="rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] px-5 md:px-7">
        {photos.map((p) => (
          <PhotoRow
            key={p.src}
            src={p.src}
            caption={p.caption}
            right={
              <a
                href={p.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-4 hover:text-[color:var(--accent-brass)]"
              >
                Источник на {info.name}
              </a>
            }
          />
        ))}
      </ul>
    </section>
  );
}

export default function CreditsPage() {
  const brandsActive = brandsWithPhotos();

  return (
    <>
      <PageHero
        label={DRAFT_MODE ? "Phase 3.6 · DRAFT mode" : "Атрибуция"}
        title="Атрибуция фотографий"
        lead="Все фото на сайте — временные. Источники: Unsplash (free for commercial use) + ручные референсы из премиум-каталогов для personal review. После собственной фотосессии LUMO заменим."
      />

      <section className="container-lumo pb-24 md:pb-32">
        {/* DRAFT warning */}
        {DRAFT_MODE && (
          <Reveal>
            <div className="mb-12 max-w-[820px] rounded-2xl border-2 border-[color:var(--accent-brass)] bg-[#15110b] p-7 md:p-8 flex gap-4">
              <AlertTriangle aria-hidden size={24} className="shrink-0 text-[color:var(--accent-brass)] mt-1" />
              <div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent-brass)]">
                  DRAFT mode
                </div>
                <h2 className="mt-2 font-[family-name:var(--font-unbounded)] font-bold text-[20px] md:text-[22px] text-[color:var(--text-primary)]">
                  Сайт временно заиндексирован noindex
                </h2>
                <p className="mt-3 text-[14.5px] text-[color:var(--text-secondary)] leading-relaxed">
                  Пока сайт работает с временными фото, для всех страниц установлено{" "}
                  <code className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--text-primary)]">&lt;meta name=&quot;robots&quot; content=&quot;noindex,nofollow&quot;&gt;</code>{" "}
                  и <code className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--text-primary)]">/robots.txt</code> блокирует индексацию полностью. Поисковики не закэшируют draft-фото.
                </p>
                <p className="mt-3 text-[13.5px] text-[color:var(--text-muted)] leading-relaxed">
                  Снять режим — переключить <code className="font-[family-name:var(--font-mono)] text-[12px]">DRAFT_MODE</code> в{" "}
                  <code className="font-[family-name:var(--font-mono)] text-[12px]">lib/copy/draft-mode.ts</code> на <code>false</code> после фотосессии и подмены файлов.
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* Section A: External brand references */}
        <Reveal>
          <h2 className="font-[family-name:var(--font-unbounded)] font-bold text-[24px] md:text-[28px] text-[color:var(--text-primary)]">
            A. Brand references
          </h2>
          <p className="mt-3 max-w-[820px] text-[14.5px] text-[color:var(--text-secondary)] leading-relaxed">
            Премиум-бренды, которые мы упоминали в research как ориентир. Фото с их сайтов <strong>не выкачиваются автоматически</strong>: De Castelli явно запрещают использование своего контента вне их сайта (Terms § Intellectual Property), у остальных стандартный «© All rights reserved». Если кадры нужны для personal review — Данил вручную сохраняет с brand-страницы в{" "}
            <code className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--text-primary)]">public/photos/external/&lt;brand&gt;/</code>{" "}
            и регистрирует в <code className="font-[family-name:var(--font-mono)] text-[12px]">lib/copy/external-photos.ts</code>.
          </p>
          <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(BRAND_INFO).map(([id, info]) => {
              const count = EXTERNAL_PHOTOS.filter((p) => p.brand === (id as Brand)).length;
              return (
                <li
                  key={id}
                  className="rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] px-5 py-4 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-[14px] text-[color:var(--text-primary)]">{info.name}</div>
                    <a
                      href={info.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--text-muted)] underline decoration-dotted underline-offset-4 hover:text-[color:var(--accent-brass)] inline-flex items-center gap-1.5 mt-1"
                    >
                      Открыть портфолио <ExternalLink size={11} aria-hidden />
                    </a>
                  </div>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] uppercase text-[color:var(--text-muted)]">
                    {count} ref
                  </span>
                </li>
              );
            })}
          </ul>

          {brandsActive.length > 0 && (
            <div className="mt-12">
              <h3 className="font-[family-name:var(--font-unbounded)] font-medium text-[18px] md:text-[20px] text-[color:var(--text-primary)] mb-3">
                Сохранённые brand-референсы
              </h3>
              <p className="text-[13.5px] text-[color:var(--text-muted)] mb-6 max-w-[820px]">
                Эти кадры использованы временно для personal review. Сайт работает в DRAFT-mode (
                <code className="font-[family-name:var(--font-mono)] text-[12px]">noindex</code>), не для публичного маркетинга. После своей фотосессии LUMO — удаляются.
              </p>
              {brandsActive.map((b) => (
                <BrandSection key={b} brand={b} />
              ))}
            </div>
          )}
        </Reveal>

        {/* Section B: Unsplash */}
        <Reveal>
          <div className="mt-20">
            <h2 className="font-[family-name:var(--font-unbounded)] font-bold text-[24px] md:text-[28px] text-[color:var(--text-primary)]">
              B. Unsplash
            </h2>
            <div className="mt-3 max-w-[820px] rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] p-5">
              <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent-brass)]">
                Unsplash License
              </div>
              <p className="mt-2 text-[13.5px] text-[color:var(--text-secondary)] leading-relaxed">
                Все изображения в этой секции — с фотобанка{" "}
                <a
                  href="https://unsplash.com/license"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted underline-offset-4 hover:text-[color:var(--accent-brass)]"
                >
                  Unsplash
                </a>
                . Лицензия разрешает коммерческое использование и модификацию без обязательной атрибуции — но мы её даём как good practice и знак уважения к авторам.
              </p>
            </div>

            <div className="mt-12">
              <UnsplashSection
                title="Главный экран"
                subtitle="Фон для hero-блока на главной."
                photos={[HERO_PHOTO]}
              />
              <UnsplashSection
                title="Коллекции"
                subtitle="По 8–12 кадров на каждую из 5 коллекций финиша."
                photos={Object.values(COLLECTION_PHOTOS).flat()}
              />
              <UnsplashSection
                title="Применения"
                subtitle="По 5–8 кадров на каждый из 6 типов объектов."
                photos={Object.values(APPLICATION_PHOTOS).flat()}
              />
              <UnsplashSection title="Ремесло — пять этапов" photos={CRAFT_PHOTOS} />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-12 max-w-[760px] mx-auto text-center font-[family-name:var(--font-cormorant)] italic text-[18px] md:text-[20px] leading-snug text-[color:var(--text-secondary)]">
            После собственной фотосессии LUMO эта страница останется только с brand-portfolio ссылками — все картинки будут заменены на кадры реальных проектов LUMO.
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
