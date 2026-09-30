"use client";

import { cn } from "@/shared/lib/cn";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { type CSSProperties, type FC, type MouseEvent, type ReactNode } from "react";

interface SpotlightCardProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** Colour of the glow that follows the cursor. */
  color?: string;
  /** Adds a subtle 3D tilt toward the cursor. */
  tilt?: boolean;
}

/**
 * Card with a radial glow that follows the cursor and an optional 3D tilt.
 * The border lights up near the cursor as well.
 */
export const SpotlightCard: FC<SpotlightCardProps> = ({
  className,
  style,
  children,
  color = "var(--c, var(--brand))",
  tilt = false,
}) => {
  const reduce = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, color-mix(in oklch, ${color} 22%, transparent), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, color-mix(in oklch, ${color} 80%, transparent), transparent 70%)`;

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    x.set(-400);
    y.set(-400);
    px.set(0.5);
    py.set(0.5);
  }

  const useTilt = tilt && !reduce;

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        ...(useTilt ? { rotateX, rotateY, transformPerspective: 1000 } : {}),
      }}
      className={cn(
        "group/spot relative isolate overflow-hidden rounded-3xl border bg-card/60 backdrop-blur-sm",
        className
      )}
    >
      {/* cursor-following border highlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: border,
          padding: 1,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* cursor-following glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background: glow }}
      />
      {children}
    </motion.div>
  );
};
