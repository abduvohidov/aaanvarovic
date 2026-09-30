"use client";

import { cn } from "@/shared/lib/cn";
import { motion } from "motion/react";
import { type FC, type JSX } from "react";
import { EASE_OUT } from "./Reveal";

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "p" | "span">;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
}

/** Reveals text word by word, each word rising out of a clipping mask. */
export const SplitText: FC<SplitTextProps> = ({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  as: Tag = "span",
  immediate = false,
}) => {
  const MotionTag = motion[Tag];
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <MotionTag
      aria-label={text}
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            variants={{
              hidden: { y: "110%", rotate: 4, opacity: 0 },
              visible: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.9, ease: EASE_OUT } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </MotionTag>
  );
};
