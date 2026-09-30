"use client";

import type { Content } from "@/shared/content";
import { Chip } from "@/shared/ui/Chip";
import { EASE_OUT, Marquee, SectionHeading, SpotlightCard, Stagger, StaggerItem } from "@/shared/ui/motion";
import { Award, Bot, BriefcaseBusiness, FileSearch, GraduationCap, Languages, Code2, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { FC } from "react";

interface SkillsProps {
  content: Pick<Content, "skills" | "aiTools" | "languages" | "courses" | "certificates" | "education">;
  labels: {
    eyebrow: string;
    title: string;
    ai: string;
    languages: string;
    education: string;
    certificates: string;
    baseEducation: string;
  };
}

const GROUP_ICONS = [BriefcaseBusiness, FileSearch, Wrench, Code2];

export const Skills: FC<SkillsProps> = ({ content, labels }) => {
  const allTools = content.skills.flatMap((g) => g.items);
  const half = Math.ceil(allTools.length / 2);

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="04" eyebrow={labels.eyebrow} title={labels.title} />
      </div>

      <div className="mb-14 space-y-3">
        <Marquee duration={55}>
          {allTools.slice(0, half).map((tool) => (
            <span key={tool} className="rounded-full border bg-surface px-5 py-2.5 text-sm font-medium whitespace-nowrap backdrop-blur md:text-base">
              {tool}
            </span>
          ))}
        </Marquee>
        <Marquee duration={60} reverse>
          {allTools.slice(half).map((tool) => (
            <span key={tool} className="rounded-full border bg-surface px-5 py-2.5 text-sm font-medium whitespace-nowrap text-muted-foreground backdrop-blur md:text-base">
              {tool}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Stagger className="grid gap-4 md:grid-cols-2" stagger={0.1}>
          {content.skills.map((group, gi) => {
            const Icon = GROUP_ICONS[gi % GROUP_ICONS.length];
            return (
              <StaggerItem key={group.title} className="h-full">
                <SpotlightCard className="h-full p-6 md:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-brand/12 text-brand">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-lg font-semibold">{group.title}</h3>
                  </div>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{ visible: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } } }}
                  >
                    {group.items.map((item) => (
                      <motion.span
                        key={item}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 22 } },
                        }}
                        whileHover={{ y: -2 }}
                      >
                        <Chip className="px-3.5 py-1.5 text-sm text-foreground/85 hover:border-brand/50 hover:text-foreground">
                          {item}
                        </Chip>
                      </motion.span>
                    ))}
                  </motion.div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Stagger className="mt-4 grid gap-4 lg:grid-cols-3" stagger={0.1}>
          <StaggerItem className="h-full">
            <SpotlightCard className="h-full p-6 md:p-7">
              <CardTitle icon={Languages} title={labels.languages} />
              <ul className="space-y-5">
                {content.languages.map((lang, i) => (
                  <li key={lang.name}>
                    <div className="mb-2 flex items-baseline justify-between text-sm">
                      <span className="font-medium">{lang.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{lang.level}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full origin-left rounded-full bg-gradient-to-r from-brand to-brand-2"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: lang.value }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.2 + i * 0.12 }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </StaggerItem>

          <StaggerItem className="h-full">
            <SpotlightCard className="h-full p-6 md:p-7">
              <CardTitle icon={GraduationCap} title={labels.education} />
              <ul className="space-y-4">
                {content.courses.map((c) => (
                  <li key={c.title} className="flex gap-4">
                    <span className="font-mono text-xs text-brand">{c.year}</span>
                    <div>
                      <p className="font-medium">{c.org}</p>
                      <p className="text-sm text-muted-foreground">{c.title}</p>
                    </div>
                  </li>
                ))}
                <li className="flex gap-4 border-t pt-4">
                  <span className="font-mono text-xs text-muted-foreground">—</span>
                  <div>
                    <p className="text-sm text-muted-foreground">{labels.baseEducation}</p>
                    <p className="font-medium">{content.education}</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                <Award className="size-3.5" />
                {labels.certificates}
              </div>
              <ul className="mt-3 space-y-2">
                {content.certificates.map((c) => (
                  <li key={c.title + c.year} className="flex items-baseline justify-between gap-3 text-sm">
                    <span>{c.title}</span>
                    <span className="font-mono text-xs text-muted-foreground">{c.year}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </StaggerItem>

          <StaggerItem className="h-full">
            <SpotlightCard className="h-full overflow-hidden p-6 md:p-7">
              <CardTitle icon={Bot} title={labels.ai} />
              <div className="relative flex flex-wrap gap-2">
                {content.aiTools.map((tool, i) => (
                  <motion.span
                    key={tool}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    className="rounded-xl border bg-gradient-to-br from-brand/15 to-brand-2/15 px-4 py-2 text-sm font-medium"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
              <div aria-hidden className="pointer-events-none absolute -right-10 -bottom-10 size-40 rounded-full bg-brand-2/25 blur-3xl" />
            </SpotlightCard>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
};

const CardTitle: FC<{ icon: typeof Bot; title: string }> = ({ icon: Icon, title }) => (
  <div className="mb-5 flex items-center gap-3">
    <span className="grid size-10 place-items-center rounded-xl bg-brand/12 text-brand">
      <Icon className="size-5" />
    </span>
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);
