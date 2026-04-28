"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Inline glossary term. Hover/focus on desktop → popover above.
 * Tap on mobile → expands to inline detail block. Native <button> for a11y.
 */
export function GlossaryTip({
  term,
  children,
  className,
}: {
  term: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <span ref={wrapperRef} className={cn("relative inline-block group", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-label={`${term} — расшифровка`}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="cursor-help underline decoration-dotted decoration-1 underline-offset-[5px] decoration-[color:var(--accent-brass)] hover:text-[color:var(--accent-brass)] transition-colors text-inherit font-inherit"
      >
        {term}
      </button>
      <span
        role="tooltip"
        className={cn(
          "absolute z-50 left-1/2 -translate-x-1/2 bottom-[calc(100%+10px)] w-[280px] md:w-[340px] rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] px-4 py-3 text-[12.5px] leading-relaxed text-[color:var(--text-secondary)] shadow-lg pointer-events-none",
          "transition-[opacity,transform] duration-200 ease-out",
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
        )}
      >
        <span className="block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--accent-brass)] mb-1.5">
          {term}
        </span>
        {children}
      </span>
    </span>
  );
}
