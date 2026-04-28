"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Native draggable before/after slider. Handles pointer + keyboard.
 * Both sides are CSS gradient placeholders; replace with <Image> later.
 */
export function BeforeAfter({
  beforeGradient,
  afterGradient,
  beforeLabel = "До",
  afterLabel = "После",
  beforeCaption,
  afterCaption,
  className,
}: {
  beforeGradient: string;
  afterGradient: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeCaption?: string;
  afterCaption?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const onUp = () => (dragging.current = false);
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, []);

  const update = (clientX: number) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)));
  };

  const onDown = (e: PointerEvent) => {
    dragging.current = true;
    update(e.clientX);
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging.current) return;
    update(e.clientX);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 4));
  };

  return (
    <figure className={cn("w-full", className)}>
      <div
        ref={containerRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        className="placeholder-grain relative w-full rounded-2xl border border-[color:var(--border-strong)] overflow-hidden cursor-ew-resize select-none"
        style={{ aspectRatio: "16/10", background: beforeGradient }}
      >
        {/* labels — before */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[color:var(--bg-primary)]/70 backdrop-blur-sm border border-[color:var(--border)] font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] uppercase text-[color:var(--text-secondary)] z-10">
          {beforeLabel}
        </span>

        {/* after layer — clipped */}
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background: afterGradient,
            clipPath: `inset(0 0 0 ${pos}%)`,
          }}
        />
        <span
          className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[color:var(--accent-brass)] font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] uppercase text-[#0a0908] z-10"
          style={{
            opacity: pos < 95 ? 1 : 0,
            transition: "opacity 200ms",
          }}
        >
          {afterLabel}
        </span>

        {/* divider line */}
        <span
          aria-hidden
          className="absolute top-0 bottom-0 w-[2px] bg-[color:var(--accent-brass)] shadow-[0_0_24px_rgba(184,153,104,0.6)]"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        />

        {/* handle */}
        <button
          type="button"
          aria-label="Перетащите, чтобы сравнить «до» и «после»"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          role="slider"
          onKeyDown={onKey}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[color:var(--bg-card)] border-2 border-[color:var(--accent-brass)] shadow-lg flex items-center justify-center text-[color:var(--accent-brass)] z-20 cursor-grab active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-[color:var(--accent-brass)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-primary)] outline-none"
          style={{ left: `${pos}%` }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      {(beforeCaption || afterCaption) && (
        <figcaption className="mt-3 grid grid-cols-2 gap-4 font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--text-muted)]">
          <span><span className="text-[color:var(--text-secondary)] mr-2">{beforeLabel}:</span>{beforeCaption}</span>
          <span className="text-right"><span className="text-[color:var(--text-secondary)] mr-2">{afterLabel}:</span>{afterCaption}</span>
        </figcaption>
      )}
    </figure>
  );
}
