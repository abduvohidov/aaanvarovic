"use client";

import { contacts } from "@/shared/content";
import { Magnetic, Reveal, SplitText, SpotlightCard, Stagger, StaggerItem } from "@/shared/ui/motion";
import { ArrowUpRight, Check, Copy, FileDown, Linkedin, Mail, Phone, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FC, useState, type ReactNode } from "react";

interface ContactProps {
  labels: {
    eyebrow: string;
    title: string;
    text: string;
    telegram: string;
    phone: string;
    email: string;
    linkedin: string;
    copy: string;
    copied: string;
    downloadCv: string;
  };
}

export const Contact: FC<ContactProps> = ({ labels }) => {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contacts.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contacts.email}`;
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,color-mix(in_oklch,var(--brand)_22%,transparent),transparent)]" />

      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <Reveal className="mb-6 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          <span className="text-brand">05</span>
          <span className="h-px w-10 bg-gradient-to-r from-brand to-transparent" />
          <span>{labels.eyebrow}</span>
        </Reveal>

        <SplitText
          as="h2"
          text={labels.title}
          wordClassName="text-gradient animate-shine"
          className="mx-auto max-w-4xl text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl md:text-8xl"
        />

        <Reveal delay={0.3}>
          <p className="mx-auto mt-7 max-w-xl text-base text-pretty text-muted-foreground md:text-lg">{labels.text}</p>
        </Reveal>

        <Reveal delay={0.45} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <a
              href={contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_20px_60px_-15px_var(--brand)] transition-transform active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Send className="size-5" />
              {contacts.telegramHandle}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={contacts.cv}
              download
              className="inline-flex h-14 items-center gap-2 rounded-full border bg-surface px-7 text-base font-semibold backdrop-blur transition-colors hover:bg-surface-strong"
            >
              <FileDown className="size-5" />
              {labels.downloadCv}
            </a>
          </Magnetic>
        </Reveal>

        <Stagger className="mx-auto mt-16 grid max-w-5xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.45fr_1fr]" delay={0.2}>
          <StaggerItem>
            <ContactCard icon={<Send className="size-4" />} label={labels.telegram} value={contacts.telegramHandle} href={contacts.telegram} external />
          </StaggerItem>
          <StaggerItem>
            <ContactCard icon={<Phone className="size-4" />} label={labels.phone} value={contacts.phoneLabel} href={`tel:${contacts.phone}`} />
          </StaggerItem>
          <StaggerItem>
            <SpotlightCard className="h-full rounded-2xl p-5">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="grid size-9 place-items-center rounded-full bg-brand/12 text-brand">
                  <Mail className="size-4" />
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={labels.copy}
                  title={copied ? labels.copied : labels.copy}
                  className="grid size-8 place-items-center rounded-full border bg-surface transition-colors hover:text-foreground"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "ok" : "copy"}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
              <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {copied ? labels.copied : labels.email}
              </p>
              <a href={`mailto:${contacts.email}`} className="mt-1 block truncate text-sm font-medium hover:text-brand">
                {contacts.email}
              </a>
            </SpotlightCard>
          </StaggerItem>
          <StaggerItem>
            <ContactCard icon={<Linkedin className="size-4" />} label={labels.linkedin} value="Abdulloh Abduvohidov" href={contacts.linkedin} external />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
};

interface ContactCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

const ContactCard: FC<ContactCardProps> = ({ icon, label, value, href, external }) => (
  <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group block h-full">
    <SpotlightCard className="h-full rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="grid size-9 place-items-center rounded-full bg-brand/12 text-brand">{icon}</span>
        <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
      </div>
      <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{label}</p>
      <p className="mt-1 truncate text-sm font-medium">{value}</p>
    </SpotlightCard>
  </a>
);
