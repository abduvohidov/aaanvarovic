"use client";

import { contacts, type Content } from "@/shared/content";
import { Magnetic, SplitText, EASE_OUT } from "@/shared/ui/motion";
import { ArrowDown, ArrowUpRight, FileDown, MapPin, Send } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, type FC } from "react";
import Photo from "../../../../public/photo.jpeg";

interface HeroProps {
  content: Pick<Content, "name" | "role" | "location" | "currently" | "heroTitle" | "heroLead">;
  labels: { writeTelegram: string; viewCases: string; downloadCv: string; scroll: string };
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, ease: EASE_OUT, delay },
});

export const Hero: FC<HeroProps> = ({ content, labels }) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <motion.div style={{ y: textY, opacity: fade }} className="order-2 lg:order-1">
          <motion.div
            {...fadeUp(0.1)}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border bg-surface py-1.5 pr-4 pl-2 text-xs text-muted-foreground backdrop-blur"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-400" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
            </span>
            {content.currently}
          </motion.div>

          <motion.p {...fadeUp(0.2)} className="mb-4 font-mono text-sm tracking-wide text-muted-foreground">
            {content.name} · <span className="text-brand">{content.role}</span>
          </motion.p>

          <SplitText
            as="h1"
            immediate
            delay={0.3}
            stagger={0.07}
            text={content.heroTitle}
            className="text-[2.6rem] leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          />

          <motion.p
            {...fadeUp(0.85)}
            className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg"
          >
            {content.heroLead}
          </motion.p>

          <motion.div {...fadeUp(1)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_var(--brand)] transition-transform active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Send className="size-4" />
                {labels.writeTelegram}
              </a>
            </Magnetic>
            <Magnetic>
              <Link
                href="#projects"
                className="group inline-flex h-12 items-center gap-2 rounded-full border bg-surface px-6 text-sm font-semibold backdrop-blur transition-colors hover:bg-surface-strong"
              >
                {labels.viewCases}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
            <a
              href={contacts.cv}
              download
              className="inline-flex h-12 items-center gap-2 px-3 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              <FileDown className="size-4" />
              {labels.downloadCv}
            </a>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: photoY }} className="order-1 mx-auto w-full max-w-[280px] sm:max-w-sm lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.15 }}
            className="relative"
          >
            {/* rotating conic halo */}
            <div aria-hidden className="absolute -inset-[2px] overflow-hidden rounded-[2rem] opacity-90">
              <motion.div
                className="absolute -inset-1/2 bg-[conic-gradient(from_0deg,var(--brand),var(--brand-2),var(--brand-3),var(--brand))]"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-brand/25 blur-3xl" />
            <div className="relative overflow-hidden rounded-[calc(2rem-2px)] bg-card">
              <Image
                src={Photo}
                alt={content.name}
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 384px, 280px"
                className="aspect-square h-auto w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                <MapPin className="size-3.5" />
                {content.location}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: EASE_OUT }}
              className="absolute top-6 -right-8 hidden sm:block"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="glass rounded-2xl border px-4 py-3 shadow-xl"
              >
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Humo · Uzcard · UnionPay</p>
                <p className="text-sm font-semibold">→ PROD ✓</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8, ease: EASE_OUT }}
              className="absolute bottom-16 -left-10 hidden sm:block"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="glass rounded-2xl border px-4 py-3 shadow-xl"
              >
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Jira · Confluence</p>
                <p className="text-sm font-semibold">BRD · UML · BPMN</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase md:flex"
      >
        {labels.scroll}
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
};
