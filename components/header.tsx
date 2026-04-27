"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { NAV } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-[color:var(--bg-primary)]/70 border-b border-[color:var(--border)]"
          : "bg-transparent"
      )}
    >
      <div className="container-lumo flex items-center justify-between h-[68px] md:h-[80px]">
        <Link
          href="/"
          className="font-[family-name:var(--font-unbounded)] font-black text-xl md:text-2xl tracking-[0.2em] text-[color:var(--text-primary)]"
          aria-label="LUMO — главная"
        >
          LUMO
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.filter((_, i) => i !== 2).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-medium tracking-[0.08em] uppercase text-[color:var(--text-secondary)] hover:text-[color:var(--accent-brass)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
              className="w-10 h-10 rounded-full border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--text-secondary)] hover:text-[color:var(--accent-brass)] hover:border-[color:var(--accent-brass)] transition-colors"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-warm text-[#0a0908] text-[13px] font-semibold tracking-[0.05em] uppercase hover:opacity-90 transition-opacity"
          >
            Заказать выкрас
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="lg:hidden w-10 h-10 rounded-full border border-[color:var(--border-strong)] flex items-center justify-center text-[color:var(--text-primary)]"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* mobile nav */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-[68px] bottom-0 bg-[color:var(--bg-primary)] transition-[transform,opacity] duration-300 origin-top",
          open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
        )}
      >
        <div className="container-lumo py-10 flex flex-col gap-1">
          {NAV.filter((_, i) => i !== 2).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-4 border-b border-[color:var(--border)] font-[family-name:var(--font-unbounded)] text-2xl text-[color:var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center px-5 py-4 rounded-full bg-gradient-warm text-[#0a0908] text-sm font-semibold tracking-[0.05em] uppercase"
          >
            Заказать выкрас
          </Link>
        </div>
      </div>
    </header>
  );
}
