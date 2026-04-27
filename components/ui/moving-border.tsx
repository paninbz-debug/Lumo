"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonProps = {
  borderRadius?: string;
  children: React.ReactNode;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  ariaLabel?: string;
};

/**
 * Premium magnetic CTA with travelling glint border. Re-skinned to LUMO warm-metallic palette.
 * Reduced-motion: glint disabled, gradient stays static.
 */
export function MovingBorderButton({
  borderRadius = "9999px",
  children,
  containerClassName,
  borderClassName,
  duration,
  className,
  href,
  type = "button",
  onClick,
  ariaLabel,
}: ButtonProps) {
  const inner = (
    <span
      className={cn(
        "relative inline-flex h-[58px] min-w-[230px] overflow-hidden p-[1.5px]",
        "focus-visible:ring-2 focus-visible:ring-[color:var(--accent-brass)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-primary)] outline-none",
        containerClassName,
      )}
      style={{ borderRadius }}
    >
      <span className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <span
            className={cn(
              "block h-24 w-24 opacity-90 [background:radial-gradient(closest-side,#c77d4a_30%,#b89968_55%,transparent_75%)]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </span>

      <span
        className={cn(
          "relative inline-flex items-center justify-center w-full h-full px-7 antialiased",
          "bg-[color:var(--bg-primary)]/85 backdrop-blur-xl",
          "border border-[color:var(--border-strong)]",
          "text-[color:var(--text-primary)]",
          "font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.06em] uppercase",
          "gap-2",
          className,
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className="inline-flex">
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className="inline-flex bg-transparent border-0 p-0">
      {inner}
    </button>
  );
}

export const MovingBorder = ({
  children,
  duration = 2400,
  rx,
  ry,
  ...rest
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: unknown;
}) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue(0);
  const reduced = useReducedMotion();

  useAnimationFrame((time) => {
    if (reduced) return;
    const length = pathRef.current?.getTotalLength();
    if (!length) return;
    const pxPerMs = length / duration;
    progress.set((time * pxPerMs) % length);
  });

  const x = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).x ?? 0);
  const y = useTransform(progress, (v) => pathRef.current?.getPointAtLength(v).y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        aria-hidden
        {...(rest as React.SVGAttributes<SVGSVGElement>)}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      {!reduced && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "inline-block",
            transform,
          }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};
