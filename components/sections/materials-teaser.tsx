import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { MATERIAL_METALS } from "@/lib/copy/visuals";

/**
 * Reuses MATERIAL_METALS gradients (no real photos to avoid clashing with
 * Aesthetics/Featured/Process sections). Hover overlay shows lead phrase.
 */
export function MaterialsTeaser() {
  return (
    <section className="relative py-24 md:py-32" aria-labelledby="materials-teaser-title">
      <div className="container-lumo">
        <Reveal>
          <div className="max-w-[860px] mb-12 md:mb-16">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Материал — AuraMetal
            </span>
            <h2
              id="materials-teaser-title"
              className="mt-5 font-[family-name:var(--font-unbounded)] font-black tracking-[-0.02em] text-[clamp(30px,4.6vw,64px)] leading-[1.04] text-[color:var(--text-primary)]"
            >
              Пять металлов.{" "}
              <span className="text-gradient-warm">Один протокол.</span>
            </h2>
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {MATERIAL_METALS.map((m) => (
            <li
                key={m.id}
                className="placeholder-grain group relative aspect-square rounded-xl border border-[color:var(--border-strong)] overflow-hidden"
                style={{ background: m.gradient }}
              >
                <div className="absolute inset-0 p-5 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0">
                  <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-white/85">
                    {m.formula}
                  </div>
                  <div className="mt-1 font-[family-name:var(--font-unbounded)] font-black text-[20px] md:text-[26px] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                    {m.name}
                  </div>
                </div>
                <div className="absolute inset-0 p-5 flex flex-col justify-between bg-[color:var(--bg-primary)]/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--accent-brass)]">
                      {m.formula}
                    </div>
                    <div className="mt-1 font-[family-name:var(--font-unbounded)] font-bold text-[18px] md:text-[22px] text-[color:var(--text-primary)]">
                      {m.name}
                    </div>
                  </div>
                  <p className="font-[family-name:var(--font-cormorant)] italic text-[13px] md:text-[15px] leading-snug text-[color:var(--text-secondary)]">
                    «{m.leadPhrase}»
                  </p>
                </div>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="mt-10 md:mt-14">
            <Link
              href="/material"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[color:var(--border-strong)] text-[color:var(--text-primary)] text-[13px] font-semibold tracking-[0.06em] uppercase hover:border-[color:var(--accent-brass)] hover:text-[color:var(--accent-brass)] transition-colors min-h-[44px]"
            >
              О материале AuraMetal
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
