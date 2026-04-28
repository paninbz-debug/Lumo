"use client";

import Link from "next/link";
import { X, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { DRAFT_BANNER, DRAFT_MODE } from "@/lib/copy/draft-mode";

const STORAGE_KEY = "lumo-draft-banner-dismissed";

export function DraftBanner() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!DRAFT_MODE) return;
    const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    setHidden(dismissed);
  }, []);

  if (!DRAFT_MODE) return null;
  if (hidden) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setHidden(true);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative z-[60] border-b border-[color:var(--accent-brass)] bg-[#15110b] text-[color:var(--text-primary)]"
    >
      <div className="container-lumo flex items-start md:items-center gap-3 py-2.5 md:py-3 text-[12.5px] md:text-[13px]">
        <AlertTriangle
          size={16}
          aria-hidden
          className="shrink-0 text-[color:var(--accent-brass)] mt-0.5 md:mt-0"
        />
        <p className="leading-snug flex-1">
          <span className="font-[family-name:var(--font-mono)] tracking-[0.18em] uppercase text-[color:var(--accent-brass)] mr-2">
            Draft
          </span>
          {DRAFT_BANNER.full}{" "}
          <Link
            href="/credits"
            className="underline decoration-dotted underline-offset-4 hover:text-[color:var(--accent-brass)] transition-colors"
          >
            Атрибуция
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Скрыть DRAFT-баннер"
          className="shrink-0 w-8 h-8 -mr-2 rounded-full hover:bg-[color:var(--bg-card)] flex items-center justify-center text-[color:var(--text-secondary)] hover:text-[color:var(--accent-brass)] transition-colors"
        >
          <X size={14} aria-hidden />
        </button>
      </div>
    </div>
  );
}
