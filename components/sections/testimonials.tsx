import { Reveal } from "@/components/reveal";
import { HOME_TESTIMONIALS } from "@/lib/copy/home-extras";
import { cn } from "@/lib/utils";

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32" aria-labelledby="testimonials-title">
      <div className="container-lumo">
        <Reveal>
          <div className="max-w-[820px]">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              {HOME_TESTIMONIALS.label}
            </span>
            <h2
              id="testimonials-title"
              className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(28px,4vw,52px)] leading-[1.05] text-[color:var(--text-primary)]"
            >
              {HOME_TESTIMONIALS.title}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {HOME_TESTIMONIALS.items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <figure className="h-full rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] p-7 md:p-8 flex flex-col">
                <div className="flex items-center gap-4">
                  <div
                    aria-hidden
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center font-[family-name:var(--font-unbounded)] font-bold text-[14px] text-[#0a0908]"
                    )}
                    style={{
                      background:
                        t.tone === "warm"
                          ? "var(--gradient-warm)"
                          : "var(--gradient-cool)",
                    }}
                  >
                    {t.initials}
                  </div>
                  <figcaption className="text-[12px] font-[family-name:var(--font-mono)] tracking-[0.04em] text-[color:var(--text-secondary)] leading-snug">
                    {t.name}
                  </figcaption>
                </div>
                <blockquote className="mt-7 font-[family-name:var(--font-cormorant)] italic text-[18px] md:text-[20px] leading-snug text-[color:var(--text-primary)] flex-1">
                  «{t.quote}»
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-[820px] font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[color:var(--text-muted)] leading-relaxed">
          {HOME_TESTIMONIALS.caveat}
        </p>
      </div>
    </section>
  );
}
