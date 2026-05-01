"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { COMPARISON } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Comparison() {
  return (
    <section
      id="comparison"
      className="relative py-28 md:py-40 bg-[color:var(--bg-elevated)] overflow-hidden"
    >
      <div className="container-lumo">
        <Reveal>
          <div className="max-w-[820px]">
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
              Сравнение — 14 строк
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-unbounded)] font-bold tracking-[-0.02em] text-[clamp(34px,5vw,68px)] leading-[1.05] text-[color:var(--text-primary)]">
              <span className="text-gradient-warm">LUMO</span> и&nbsp;случайный подрядчик
            </h2>
            <p className="mt-6 text-[15px] md:text-[17px] leading-relaxed text-[color:var(--text-secondary)] max-w-[640px]">
              Различие не в цене сметы, а в&nbsp;каждой из&nbsp;четырнадцати позиций ниже.
            </p>
          </div>
        </Reveal>

        {/* Desktop table */}
        <Reveal>
          <div className="mt-14 hidden md:block rounded-2xl border border-[color:var(--border-strong)] overflow-hidden">
            <div className="grid grid-cols-12 px-7 py-4 bg-[color:var(--bg-card)] border-b border-[color:var(--border-strong)]">
              <div className="col-span-4 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                Параметр
              </div>
              <div className="col-span-4 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase">
                <span className="text-gradient-warm">LUMO</span>
              </div>
              <div className="col-span-4 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
                Случайный подрядчик
              </div>
            </div>

            {COMPARISON.rows.map((r, i) => (
              <div
                key={r.criterion}
                className={cn(
                  "grid grid-cols-12 px-7 py-5 items-start gap-4",
                  i % 2 ? "bg-[color:var(--bg-primary)]" : "bg-[color:var(--bg-card)]"
                )}
              >
                <div className="col-span-4 text-[14px] font-medium text-[color:var(--text-primary)]">
                  {r.criterion}
                </div>
                <div className="col-span-4 text-[14px] leading-snug text-[color:var(--text-primary)] relative pl-3">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-gradient-warm rounded-full"
                  />
                  {r.lumo}
                </div>
                <div className="col-span-4 text-[14px] leading-snug text-[color:var(--text-muted)]">
                  {r.other}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mobile accordion */}
        <div className="mt-12 md:hidden flex flex-col gap-2">
          {COMPARISON.rows.map((r, i) => (
            <ComparisonRow key={r.criterion} index={i} row={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonRow({
  index,
  row,
}: {
  index: number;
  row: { criterion: string; lumo: string; other: string };
}) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border border-[color:var(--border-strong)] rounded-xl bg-[color:var(--bg-card)] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] uppercase text-[color:var(--text-muted)]">
          {String(index + 1).padStart(2, "0")} · {row.criterion}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "text-[color:var(--text-secondary)] transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 grid grid-cols-1 gap-3 border-t border-[color:var(--border)] pt-4">
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-gradient-warm mb-1">
              LUMO
            </div>
            <div className="text-[14px] text-[color:var(--text-primary)] leading-snug">
              {row.lumo}
            </div>
          </div>
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)] mb-1">
              Случайный подрядчик
            </div>
            <div className="text-[14px] text-[color:var(--text-muted)] leading-snug">
              {row.other}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
