"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { type FC } from "react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
}

/** Fades, lifts and un-blurs its content once it scrolls into view. */
export const Reveal: FC<RevealProps> = ({ delay = 0, amount = 0.25, children, ...props }) => (
  <motion.div
    variants={revealVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount }}
    transition={{ delay }}
    {...props}
  >
    {children}
  </motion.div>
);

interface StaggerProps extends HTMLMotionProps<"div"> {
  stagger?: number;
  delay?: number;
  amount?: number;
}

/** Parent that reveals `StaggerItem` children one after another. */
export const Stagger: FC<StaggerProps> = ({ stagger = 0.08, delay = 0, amount = 0.15, children, ...props }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
    }}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerItem: FC<HTMLMotionProps<"div">> = ({ children, ...props }) => (
  <motion.div variants={revealVariants} {...props}>
    {children}
  </motion.div>
);
