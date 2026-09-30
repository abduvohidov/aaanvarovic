"use client";

import { setLanguageValue } from "@/entities/LangSwitch/SetLangValue";
import { LOCALES, type Locale } from "@/shared/content/types";
import { cn } from "@/shared/lib/cn";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { FC, useId, useState, useTransition } from "react";

interface LangSwitchProps {
  className?: string;
  locale: string;
  label: string;
}

/** Segmented RU / EN switch with a sliding indicator. */
export const LangSwitch: FC<LangSwitchProps> = ({ className, locale, label }) => {
  const router = useRouter();
  const id = useId();
  const [active, setActive] = useState(locale);
  const [pending, startTransition] = useTransition();

  function handleChange(value: Locale) {
    if (value === active) return;
    setActive(value);
    startTransition(async () => {
      await setLanguageValue(value);
      router.refresh();
    });
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "relative flex h-9 items-center rounded-full border bg-surface p-1 font-mono text-xs",
        pending && "opacity-70",
        className
      )}
    >
      {LOCALES.map((value) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={active === value}
          onClick={() => handleChange(value)}
          className={cn(
            "relative z-10 h-full rounded-full px-3 uppercase transition-colors",
            active === value ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {active === value && (
            <motion.span
              layoutId={`lang-pill-${id}`}
              className="absolute inset-0 -z-10 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          {value}
        </button>
      ))}
    </div>
  );
};
