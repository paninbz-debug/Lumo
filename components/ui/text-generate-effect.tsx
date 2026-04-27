"use client";

import { useEffect, type ElementType } from "react";
import { motion, stagger, useAnimate, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Word-by-word reveal: opacity + slight blur. Inherits color/typography from parent
 * (no built-in dark/light tokens, no font-bold — wrap in your typography element).
 */
export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  stagger: staggerSeconds = 0.08,
  as: Tag = "span",
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  stagger?: number;
  as?: ElementType;
}) => {
  const [scope, animate] = useAnimate();
  const reduced = useReducedMotion();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (reduced) return;
    animate(
      "span",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      { duration, delay: stagger(staggerSeconds) }
    );
  }, [scope, animate, reduced, filter, duration, staggerSeconds]);

  const Wrapper = Tag as ElementType;

  return (
    <Wrapper className={cn(className)}>
      <motion.span ref={scope} className="contents">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="inline-block"
            initial={reduced ? false : { opacity: 0, filter: filter ? "blur(10px)" : "none" }}
            style={reduced ? undefined : { opacity: 0 }}
          >
            {word}
            {idx < wordsArray.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};
