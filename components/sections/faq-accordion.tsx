import { Reveal } from "@/components/reveal";

type Props = {
  label?: string;
  title?: string;
  items: { q: string; a: string }[];
};

export function FaqAccordion({ label = "FAQ", title = "Часто задаваемые вопросы", items }: Props) {
  return (
    <section className="relative py-24 md:py-32 bg-[color:var(--bg-elevated)]">
      <div className="container-lumo">
        <Reveal>
          <div className="max-w-[820px]">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              {label}
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(28px,4vw,52px)] leading-[1.05] text-[color:var(--text-primary)]">
              {title}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 max-w-[920px] flex flex-col gap-3">
          {items.map((it, i) => (
            <Reveal key={it.q} delay={i * 0.03}>
              <details
                name="faq"
                className="group rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] overflow-hidden"
              >
                <summary className="flex justify-between items-start gap-5 cursor-pointer px-6 py-5 list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-[family-name:var(--font-unbounded)] font-medium text-[16px] md:text-[18px] text-[color:var(--text-primary)]">
                    {it.q}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 mt-1 w-7 h-7 rounded-full border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--text-secondary)] transition-transform group-open:rotate-45 group-open:border-[color:var(--accent-brass)] group-open:text-[color:var(--accent-brass)]"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-[14.5px] md:text-[15px] leading-relaxed text-[color:var(--text-secondary)]">
                  {it.a}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
