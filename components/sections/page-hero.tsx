import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg";
};

export function PageHero({ label, title, lead, align = "left", size = "lg" }: Props) {
  return (
    <section className="relative pt-[140px] md:pt-[180px] pb-16 md:pb-24 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 w-[55vw] max-w-[700px] aspect-square rounded-full opacity-[0.10] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #c77d4a, transparent 70%)" }}
      />
      <div className="container-lumo relative">
        <Reveal>
          <div
            className={cn(
              "max-w-[1080px]",
              align === "center" && "mx-auto text-center"
            )}
          >
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              {label}
            </span>
            <h1
              className={cn(
                "mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] leading-[1.04] text-[color:var(--text-primary)]",
                size === "lg"
                  ? "text-[clamp(36px,5.6vw,76px)]"
                  : "text-[clamp(30px,4.6vw,60px)]"
              )}
            >
              {title}
            </h1>
            {lead && (
              <p className="mt-7 md:mt-9 font-[family-name:var(--font-cormorant)] italic font-light text-[clamp(18px,1.9vw,24px)] leading-snug text-[color:var(--text-secondary)] max-w-[820px]">
                {lead}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
