"use client";

import { LangSwitch } from "@/features/LangSwitch";
import { ThemeToggle } from "@/features/ThemeToggle";
import { NavListType } from "@/shared/constants/navlist";
import { cn } from "@/shared/lib/cn";
import { Logo } from "@/shared/ui/Logo";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";

interface HeaderBarProps {
  locale: string;
  navlist: NavListType[];
  labels: { menu: string; close: string; theme: string; language: string };
}

/** Tracks which section is currently in the middle of the viewport. */
function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}

export const HeaderBar: FC<HeaderBarProps> = ({ locale, navlist, labels }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ids = useMemo(() => navlist.map((n) => n.id), [navlist]);
  const active = useActiveSection(ids, isHome);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 320 && !open);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
      >
        <div
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-3 pl-5 transition-all duration-500",
            scrolled
              ? "glass border-border shadow-[0_8px_30px_-12px_rgb(0_0_0/0.35)]"
              : "border-transparent bg-transparent"
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {navlist.map(({ id, label }) => (
              <Link
                key={id}
                href={hrefFor(id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-surface-strong ring-1 ring-border"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitch locale={locale} label={labels.language} className="max-sm:hidden" />
            <ThemeToggle label={labels.theme} />
            <button
              type="button"
              aria-label={open ? labels.close : labels.menu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative grid size-9 place-items-center rounded-full border bg-surface lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X className="size-4" /> : <Menu className="size-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.75rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.75rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.75rem)" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[45] flex flex-col bg-background/95 px-6 pt-28 pb-10 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              className="flex flex-col gap-2"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              {navlist.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 } },
                  }}
                >
                  <Link
                    href={hrefFor(id)}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b py-4 text-3xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs text-brand">0{i + 1}</span>
                    {label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              className="mt-auto flex items-center gap-3"
            >
              <LangSwitch locale={locale} label={labels.language} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
