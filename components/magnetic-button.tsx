"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MotionProps } from "framer-motion";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  "aria-label"?: string;
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  "aria-label": ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.18,
      y: (e.clientY - rect.top - rect.height / 2) * 0.18,
    });
  };

  const onLeave = () => setPos({ x: 0, y: 0 });

  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-[13px] font-semibold tracking-[0.1em] uppercase transition-shadow min-h-[44px]";

  const variants: Record<Variant, string> = {
    primary:
      "bg-gradient-warm text-[#0a0908] shadow-[0_8px_24px_-8px_rgba(184,153,104,0.5)] hover:shadow-[0_16px_36px_-8px_rgba(184,153,104,0.7)]",
    ghost:
      "border border-[color:var(--border-strong)] text-[color:var(--text-primary)] hover:border-[color:var(--accent-brass)] hover:text-[color:var(--accent-brass)]",
  };

  const motionProps: MotionProps = {
    animate: { x: pos.x, y: pos.y },
    transition: { type: "spring", stiffness: 220, damping: 18, mass: 0.4 },
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(baseStyles, variants[variant], className)}
      {...motionProps}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-flex" onClick={onClick} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className="inline-flex" aria-label={ariaLabel}>
      {inner}
    </button>
  );
}
