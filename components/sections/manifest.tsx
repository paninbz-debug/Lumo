import { Reveal } from "@/components/reveal";
import { MANIFEST } from "@/lib/content";

export function Manifest() {
  return (
    <section id="manifest" className="relative py-28 md:py-40">
      <div className="container-lumo">
        <Reveal>
          <div className="text-center max-w-[920px] mx-auto">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Манифест
            </span>
            <blockquote className="mt-8 font-[family-name:var(--font-cormorant)] italic font-light text-[color:var(--text-primary)] leading-[1.1] text-[clamp(34px,5.4vw,72px)]">
              «{MANIFEST.quote}»
            </blockquote>
            <div className="mt-6 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em] uppercase text-[color:var(--text-secondary)]">
              {MANIFEST.attribution}
            </div>
          </div>
        </Reveal>

        <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
          {MANIFEST.columns.map((col, i) => (
            <Reveal key={col.title} delay={0.05 * i}>
              <div className="border-t border-[color:var(--border-strong)] pt-7">
                <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent-brass)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-unbounded)] font-medium text-2xl md:text-[28px] text-[color:var(--text-primary)]">
                  {col.title}
                </h3>
                <p className="mt-5 text-[15px] leading-relaxed text-[color:var(--text-secondary)]">
                  {col.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
