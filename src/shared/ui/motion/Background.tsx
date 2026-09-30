"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, type FC } from "react";

/**
 * Fixed page backdrop: a faint grid, slowly drifting aurora blobs that
 * parallax with scroll, and a soft glow that trails the cursor.
 */
export const Background: FC = () => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const shiftA = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const shiftB = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const mx = useSpring(useMotionValue(-1000), { stiffness: 120, damping: 25 });
  const my = useSpring(useMotionValue(-1000), { stiffness: 120, damping: 25 });
  const cursorGlow = useMotionTemplate`radial-gradient(600px circle at ${mx}px ${my}px, var(--glow), transparent 65%)`;

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent_75%)]" />

      <motion.div style={{ y: shiftA }} className="absolute -top-[20%] -left-[10%] size-[60vmax]">
        <motion.div
          className="size-full rounded-full opacity-[0.22] blur-[120px] dark:opacity-30"
          style={{ background: "radial-gradient(circle, var(--brand), transparent 65%)" }}
          animate={reduce ? undefined : { x: [0, 80, -40, 0], y: [0, 60, 20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div style={{ y: shiftB }} className="absolute top-[10%] -right-[15%] size-[55vmax]">
        <motion.div
          className="size-full rounded-full opacity-[0.18] blur-[120px] dark:opacity-25"
          style={{ background: "radial-gradient(circle, var(--brand-2), transparent 65%)" }}
          animate={reduce ? undefined : { x: [0, -70, 30, 0], y: [0, 40, -50, 0], scale: [1, 0.92, 1.08, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ background: cursorGlow }} />

      {/* film grain to avoid gradient banding */}
      <svg className="absolute inset-0 size-full opacity-[0.035] mix-blend-overlay dark:opacity-[0.06]">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
};

/** Thin gradient bar at the top of the viewport showing read progress. */
export const ScrollProgress: FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-brand via-brand-2 to-brand-3"
      style={{ scaleX }}
    />
  );
};
