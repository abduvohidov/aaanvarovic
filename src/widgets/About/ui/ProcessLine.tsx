"use client";

import type { ProcessStep } from "@/shared/content";
import { EASE_OUT } from "@/shared/ui/motion";
import { ClipboardList, FileText, CalendarRange, Users, Rocket } from "lucide-react";
import { motion } from "motion/react";
import { FC } from "react";

const ICONS = [ClipboardList, FileText, CalendarRange, Users, Rocket];

/** Five-step delivery process with a connector that draws itself on scroll. */
export const ProcessLine: FC<{ steps: ProcessStep[] }> = ({ steps }) => (
  <motion.ol
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className="relative grid gap-8 md:grid-cols-5 md:gap-4"
  >
    {/* connector: vertical on mobile, horizontal on desktop */}
    <motion.span
      aria-hidden
      variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.4, ease: EASE_OUT } } }}
      className="absolute top-6 right-[10%] left-[10%] hidden h-px origin-left bg-gradient-to-r from-brand via-brand-2 to-brand-3 md:block"
    />
    <motion.span
      aria-hidden
      variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { duration: 1.4, ease: EASE_OUT } } }}
      className="absolute top-6 bottom-6 left-6 w-px origin-top bg-gradient-to-b from-brand via-brand-2 to-brand-3 md:hidden"
    />

    {steps.map((step, i) => {
      const Icon = ICONS[i % ICONS.length];
      return (
        <motion.li
          key={step.title}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.15, duration: 0.7, ease: EASE_OUT } },
          }}
          className="group relative flex gap-5 md:flex-col md:items-center md:gap-4 md:text-center"
        >
          <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-2xl border bg-background shadow-lg transition-all duration-500 group-hover:-translate-y-1 group-hover:border-brand/60 group-hover:shadow-brand/20">
            <Icon className="size-5 text-brand transition-transform duration-500 group-hover:scale-110" />
          </span>
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">0{i + 1}</p>
            <p className="mt-1 font-semibold">{step.title}</p>
            <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{step.text}</p>
          </div>
        </motion.li>
      );
    })}
  </motion.ol>
);
