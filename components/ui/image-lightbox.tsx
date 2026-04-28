"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { withBase } from "@/lib/asset-path";

export type LightboxItem = {
  /** Real image src (preferred — uses next/image). Optional. */
  image?: string;
  /** CSS gradient string for placeholder when no image. */
  gradient?: string;
  caption: string;
  emoji?: string;
};

/**
 * Native <dialog>-based lightbox (no JS lib).
 * Click placeholder → opens modal with caption.
 * Arrow keys / on-screen arrows for prev/next, Esc / X to close.
 */
export function ImageLightboxGallery({
  items,
  className,
  aspect = "4/5",
  placeholderHint,
}: {
  items: LightboxItem[];
  className?: string;
  aspect?: "4/5" | "1/1" | "16/10";
  placeholderHint?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (index !== null && !dlg.open) dlg.showModal();
    if (index === null && dlg.open) dlg.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? 0 : (i - 1 + items.length) % items.length));
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? 0 : (i + 1) % items.length));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, items.length]);

  const close = () => setIndex(null);
  const prev = () => setIndex((i) => (i === null ? 0 : (i - 1 + items.length) % items.length));
  const next = () => setIndex((i) => (i === null ? 0 : (i + 1) % items.length));

  return (
    <>
      <ul
        className={cn(
          "grid gap-3 md:gap-4",
          "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          className
        )}
      >
        {items.map((it, i) => (
          <li key={it.caption}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full text-left"
              aria-label={`Открыть «${it.caption}»`}
            >
              <span
                className={cn(
                  "relative block w-full overflow-hidden rounded-xl border border-[color:var(--border)]",
                  !it.image && "placeholder-grain"
                )}
                style={{ aspectRatio: aspect, background: it.image ? undefined : it.gradient }}
              >
                {it.image && (
                  <Image
                    src={withBase(it.image)}
                    alt={it.caption}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {it.emoji && !it.image && (
                  <span className="absolute inset-0 flex items-center justify-center text-[44px] md:text-[56px] opacity-60 transition-transform duration-500 group-hover:scale-110" aria-hidden>
                    {it.emoji}
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <span className="block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] uppercase text-white">
                    {it.caption}
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {placeholderHint && (
        <p className="mt-4 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[color:var(--text-muted)]">
          {placeholderHint}
        </p>
      )}

      <dialog
        ref={dialogRef}
        className="lumo-lightbox"
        aria-label="Просмотр изображения"
        onClose={() => setIndex(null)}
      >
        {index !== null && (
          <div className="relative w-full h-full flex items-center justify-center p-6 md:p-12">
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[color:var(--bg-card)] border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--text-primary)] hover:border-[color:var(--accent-brass)] hover:text-[color:var(--accent-brass)] transition-colors"
            >
              <X size={18} />
            </button>
            <button
              type="button"
              onClick={prev}
              aria-label="Предыдущее"
              className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[color:var(--bg-card)] border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--text-primary)] hover:border-[color:var(--accent-brass)] hover:text-[color:var(--accent-brass)] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Следующее"
              className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[color:var(--bg-card)] border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--text-primary)] hover:border-[color:var(--accent-brass)] hover:text-[color:var(--accent-brass)] transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            <figure className="w-full max-w-[1100px]">
              <span
                className={cn(
                  "relative block w-full rounded-2xl overflow-hidden border border-[color:var(--border-strong)]",
                  !items[index].image && "placeholder-grain"
                )}
                style={{
                  aspectRatio: aspect,
                  background: items[index].image ? undefined : items[index].gradient,
                }}
              >
                {items[index].image && (
                  <Image
                    src={withBase(items[index].image as string)}
                    alt={items[index].caption}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                )}
                {items[index].emoji && !items[index].image && (
                  <span className="absolute inset-0 flex items-center justify-center text-[120px] md:text-[180px] opacity-65" aria-hidden>
                    {items[index].emoji}
                  </span>
                )}
              </span>
              <figcaption className="mt-4 flex items-center justify-between gap-4 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.06em] text-[color:var(--text-secondary)]">
                <span className="text-[color:var(--text-primary)]">{items[index].caption}</span>
                <span className="text-[color:var(--text-muted)]">
                  {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          </div>
        )}
      </dialog>
    </>
  );
}
