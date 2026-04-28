import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { withBase } from "@/lib/asset-path";
import { COLLECTION_PHOTOS } from "@/lib/copy/photos";

/**
 * Image-led full-bleed wall: one hand-picked photo per collection.
 * Static (no hover-effects) — это просто sanctum-стена «как может выглядеть».
 */
const SHOWCASE: Array<{ id: string; name: string; tag: string; photo: string; caption: string }> = [
  {
    id: "deep-mirror",
    name: "DEEP MIRROR",
    tag: "Зеркало",
    photo: COLLECTION_PHOTOS["deep-mirror"][7].src,
    caption: COLLECTION_PHOTOS["deep-mirror"][7].caption,
  },
  {
    id: "aged-patina",
    name: "AGED PATINA",
    tag: "Патина",
    photo: COLLECTION_PHOTOS["aged-patina"][0].src,
    caption: COLLECTION_PHOTOS["aged-patina"][0].caption,
  },
  {
    id: "brushed-daylight",
    name: "BRUSHED DAYLIGHT",
    tag: "Свет",
    photo: COLLECTION_PHOTOS["brushed-daylight"][8].src,
    caption: COLLECTION_PHOTOS["brushed-daylight"][8].caption,
  },
  {
    id: "liquid-mercury",
    name: "LIQUID MERCURY",
    tag: "Ртуть",
    photo: COLLECTION_PHOTOS["liquid-mercury"][8].src,
    caption: COLLECTION_PHOTOS["liquid-mercury"][8].caption,
  },
  {
    id: "copper-fire",
    name: "COPPER FIRE",
    tag: "Огонь",
    photo: COLLECTION_PHOTOS["copper-fire"][1].src,
    caption: COLLECTION_PHOTOS["copper-fire"][1].caption,
  },
];

export function AestheticsGallery() {
  return (
    <section className="relative py-20 md:py-28" aria-labelledby="aesthetics-title">
      <div className="container-lumo">
        <Reveal>
          <div className="max-w-[860px]">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent-brass)]">
              5 коллекций · 5 финишей · единый ремесленный стандарт
            </span>
            <h2
              id="aesthetics-title"
              className="mt-5 font-[family-name:var(--font-unbounded)] font-black tracking-[-0.02em] text-[clamp(32px,5vw,72px)] leading-[1.02] text-[color:var(--text-primary)]"
            >
              Пять способов превратить{" "}
              <span className="text-gradient-warm">стену в металл</span>
            </h2>
          </div>
        </Reveal>
      </div>

      {/* full-bleed grid — outside container, edge-to-edge */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1.5 md:gap-2">
        {SHOWCASE.map((s) => (
          <Link
              key={s.id}
              href={`/collections/${s.id}`}
              className="group block relative aspect-[3/4] overflow-hidden bg-[color:var(--bg-card)]"
            >
              <Image
                src={withBase(s.photo)}
                alt={`${s.name} — ${s.caption}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {/* subtle bottom gradient for label readability */}
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <span className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7">
                <span className="block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-white/80">
                  {s.tag}
                </span>
                <span className="mt-2 block font-[family-name:var(--font-unbounded)] font-black text-[clamp(18px,2vw,26px)] leading-[1.1] text-white">
                  {s.name}
                </span>
              </span>
            </Link>
        ))}
      </div>

      <div className="container-lumo mt-10 md:mt-14">
        <Reveal>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[color:var(--border-strong)] text-[color:var(--text-primary)] text-[13px] font-semibold tracking-[0.06em] uppercase hover:border-[color:var(--accent-brass)] hover:text-[color:var(--accent-brass)] transition-colors min-h-[44px]"
          >
            Открыть все коллекции
            <ArrowRight size={16} aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
