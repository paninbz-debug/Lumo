import { Reveal } from "@/components/reveal";
import { MATERIAL_METALS } from "@/lib/copy/visuals";

export function MetalSamples() {
  return (
    <section className="relative py-24 md:py-32" aria-labelledby="metal-samples-title">
      <div className="container-lumo">
        <Reveal>
          <div className="max-w-[820px]">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Пять металлов
            </span>
            <h2
              id="metal-samples-title"
              className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(28px,4vw,52px)] leading-[1.05] text-[color:var(--text-primary)]"
            >
              Из чего состоит линейка AuraMetal 2K
            </h2>
            <p className="mt-5 text-[15px] md:text-[17px] leading-relaxed text-[color:var(--text-secondary)] max-w-[680px]">
              Каждый цвет — отдельный артикул. Хим. формула, эпитеты, культурные ассоциации. Подведите курсор, чтобы увидеть характер.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {MATERIAL_METALS.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.04}>
              <li className="placeholder-grain group relative aspect-square rounded-2xl border border-[color:var(--border-strong)] overflow-hidden" style={{ background: m.gradient }}>
                {/* default state */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
                  <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-white/85">
                    {m.formula}
                  </div>
                  <div className="mt-1 font-[family-name:var(--font-unbounded)] font-bold text-[20px] md:text-[24px] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                    {m.name}
                  </div>
                </div>
                {/* hover overlay */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between bg-[color:var(--bg-primary)]/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--accent-brass)]">
                      {m.formula}
                    </div>
                    <div className="mt-1 font-[family-name:var(--font-unbounded)] font-bold text-[20px] md:text-[22px] text-[color:var(--text-primary)]">
                      {m.name}
                    </div>
                    <p className="mt-3 text-[12px] leading-snug text-[color:var(--text-secondary)]">
                      {m.epithets}
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-cormorant)] italic text-[14px] leading-snug text-[color:var(--text-primary)]">
                    «{m.leadPhrase}»
                  </p>
                </div>
                {/* focus button overlay for keyboard */}
                <button
                  type="button"
                  className="absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-brass)]"
                  aria-label={`${m.name}: ${m.epithets}`}
                />
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
