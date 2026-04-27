import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "lucide-react";

type Props = {
  label?: string;
  title: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function PageCta({ label = "Следующий шаг", title, body, primary, secondary }: Props) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grain opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 w-[80vw] max-w-[1100px] aspect-square rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #c77d4a, transparent 65%)" }}
      />
      <div className="container-lumo relative">
        <Reveal>
          <div className="max-w-[760px] mx-auto text-center">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              {label}
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(30px,4.4vw,56px)] leading-[1.05] text-[color:var(--text-primary)]">
              {title}
            </h2>
            {body && (
              <p className="mt-6 font-[family-name:var(--font-cormorant)] italic text-[18px] md:text-[20px] leading-snug text-[color:var(--text-secondary)]">
                {body}
              </p>
            )}
            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href={primary.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gradient-warm text-[#0a0908] text-[13px] font-semibold tracking-[0.06em] uppercase shadow-[0_8px_24px_-8px_rgba(184,153,104,0.5)] hover:shadow-[0_16px_36px_-8px_rgba(184,153,104,0.7)] transition-shadow min-h-[44px]"
              >
                {primary.label}
                <ArrowRight size={16} aria-hidden />
              </Link>
              {secondary && (
                <Link
                  href={secondary.href}
                  className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-[color:var(--border-strong)] text-[color:var(--text-primary)] text-[13px] font-semibold tracking-[0.06em] uppercase hover:border-[color:var(--accent-brass)] hover:text-[color:var(--accent-brass)] transition-colors min-h-[44px]"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
