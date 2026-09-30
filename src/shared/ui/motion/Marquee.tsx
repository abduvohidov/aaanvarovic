import { cn } from "@/shared/lib/cn";
import { type CSSProperties, type FC, type ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  /** Seconds per loop. */
  duration?: number;
  className?: string;
}

/** Infinite horizontal ticker; pauses on hover and for reduced motion. */
export const Marquee: FC<MarqueeProps> = ({ children, reverse, duration = 40, className }) => (
  <div className={cn("group flex overflow-hidden mask-fade-x", className)}>
    <div
      className="flex w-max shrink-0 animate-marquee gap-3 pr-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
      style={
        {
          "--marquee-duration": `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        } as CSSProperties
      }
    >
      {children}
      <div aria-hidden className="flex gap-3">
        {children}
      </div>
    </div>
  </div>
);
