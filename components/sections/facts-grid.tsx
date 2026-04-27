import { cn } from "@/lib/utils";

type Fact = { k: string; v: string };

export function FactsGrid({
  items,
  className,
  columns = "auto",
}: {
  items: Fact[];
  className?: string;
  columns?: "auto" | 2 | 3 | 4;
}) {
  const colClass =
    columns === "auto"
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      : `grid-cols-1 md:grid-cols-${columns}`;
  return (
    <dl className={cn("grid gap-4 md:gap-5", colClass, className)}>
      {items.map((it) => (
        <div
          key={it.k}
          className="rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-card)] px-5 py-4"
        >
          <dt className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[color:var(--text-muted)]">
            {it.k}
          </dt>
          <dd className="mt-1.5 font-[family-name:var(--font-mono)] text-[15px] md:text-[16px] text-[color:var(--text-primary)]">
            {it.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}
