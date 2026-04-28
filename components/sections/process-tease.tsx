import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { withBase } from "@/lib/asset-path";
import { CRAFT_PHOTOS } from "@/lib/copy/photos";

const STAGES = [
  { name: "Подготовка", tagline: "Фундамент адгезии" },
  { name: "Нанесение", tagline: "Окно химии 20 минут" },
  { name: "Шлифовка", tagline: "P80 → P2000" },
  { name: "Полировка", tagline: "Дисциплинированный блеск" },
  { name: "Защита", tagline: "Невидимая броня" },
];

export function ProcessTease() {
  return (
    <section
      className="relative py-24 md:py-32 bg-[color:var(--bg-elevated)]"
      aria-labelledby="process-tease-title"
    >
      <div className="container-lumo">
        <Reveal>
          <div className="max-w-[860px] mb-12 md:mb-16">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Ремесло — пять рук
            </span>
            <h2
              id="process-tease-title"
              className="mt-5 font-[family-name:var(--font-unbounded)] font-black tracking-[-0.02em] text-[clamp(30px,4.6vw,64px)] leading-[1.04] text-[color:var(--text-primary)]"
            >
              Пять самостоятельных ремёсел.{" "}
              <span className="text-gradient-warm">Один объект.</span>
            </h2>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 sm:grid-cols-5 gap-3 md:gap-4">
          {CRAFT_PHOTOS.map((p, i) => (
            <li key={i} className="relative aspect-[4/5] rounded-xl overflow-hidden border border-[color:var(--border)] bg-[color:var(--bg-card)]">
                <Image
                  src={withBase(p.src)}
                  alt={p.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover"
                />
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <span className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
                  <span className="block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] uppercase text-[color:var(--accent-brass)]">
                    0{i + 1}
                  </span>
                  <span className="mt-1.5 block font-[family-name:var(--font-unbounded)] font-bold text-[15px] md:text-[18px] text-white leading-[1.15]">
                    {STAGES[i]?.name ?? "Этап"}
                  </span>
                  <span className="mt-1 block font-[family-name:var(--font-cormorant)] italic text-[12px] md:text-[14px] text-white/80 leading-snug">
                    {STAGES[i]?.tagline ?? p.caption}
                  </span>
                </span>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="mt-10 md:mt-14">
            <Link
              href="/craft"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[color:var(--border-strong)] text-[color:var(--text-primary)] text-[13px] font-semibold tracking-[0.06em] uppercase hover:border-[color:var(--accent-brass)] hover:text-[color:var(--accent-brass)] transition-colors min-h-[44px]"
            >
              Все детали ремесла
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
