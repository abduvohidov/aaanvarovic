"use client";

import { cn } from "@/shared/lib/cn";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState, type FC } from "react";

interface ThemeToggleProps {
  className?: string;
  label: string;
}

/** Icon button that flips between light and dark with a rotating icon swap. */
export const ThemeToggle: FC<ThemeToggleProps> = ({ className, label }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme !== "light";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative grid size-9 place-items-center overflow-hidden rounded-full border bg-surface text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};
