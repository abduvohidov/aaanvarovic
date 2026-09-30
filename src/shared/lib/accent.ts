import type { CSSProperties } from "react";
import type { Accent } from "@/shared/content/types";

export const ACCENT_COLORS: Record<Accent, string> = {
  blue: "oklch(0.66 0.17 255)",
  violet: "oklch(0.63 0.2 295)",
  cyan: "oklch(0.72 0.12 205)",
  emerald: "oklch(0.7 0.15 160)",
  amber: "oklch(0.76 0.15 70)",
  rose: "oklch(0.66 0.2 15)",
};

/** Exposes the accent as `--c` so children can use `var(--c)` in arbitrary values. */
export function accentStyle(accent: Accent): CSSProperties {
  return { "--c": ACCENT_COLORS[accent] } as CSSProperties;
}
