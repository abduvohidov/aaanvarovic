"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { type FC, type MouseEvent, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/** Pulls its child slightly toward the cursor while hovered. */
export const Magnetic: FC<MagneticProps> = ({ children, strength = 0.3, className }) => {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.4 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className ?? "inline-block"}
    >
      {children}
    </motion.div>
  );
};
