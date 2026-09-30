"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type FC } from "react";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Counts from 0 to `value` the first time it becomes visible. */
export const CountUp: FC<CountUpProps> = ({ value, suffix = "", duration = 1.6, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
};
