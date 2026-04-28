import { Award, Clock, Layers, Hammer, MapPin, Flame } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { NumberTicker } from "@/components/ui/number-ticker";
import { HOME_STATS } from "@/lib/copy/home-extras";

const ICONS = [Award, Clock, Layers, MapPin, Hammer, Flame] as const;

export function HomeStats() {
  return (
    <section
      className="relative py-24 md:py-32 bg-[color:var(--bg-elevated)]"
      aria-labelledby="home-stats-title"
    >
      <div className="container-lumo">
        <Reveal>
          <div className="max-w-[820px]">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              {HOME_STATS.label}
            </span>
            <h2
              id="home-stats-title"
              className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(28px,4vw,52px)] leading-[1.05] text-[color:var(--text-primary)]"
            >
              {HOME_STATS.title}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {HOME_STATS.items.map((s, i) => {
            const Icon = ICONS[i] ?? Layers;
            return (
              <Reveal key={s.label} delay={i * 0.04}>
                <div className="h-full rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] p-7">
                  <div className="w-11 h-11 rounded-full border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--accent-brass)]">
                    <Icon size={18} aria-hidden />
                  </div>
                  <div className="mt-6 font-[family-name:var(--font-mono)] font-light leading-none tracking-[-0.02em] text-[clamp(40px,5vw,64px)] text-gradient-warm">
                    <NumberTicker to={s.value} />
                    <span>{s.suffix}</span>
                  </div>
                  <p className="mt-5 text-[13.5px] leading-relaxed text-[color:var(--text-secondary)]">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
