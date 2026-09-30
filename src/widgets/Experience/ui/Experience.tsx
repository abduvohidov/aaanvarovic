"use client";

import type { Job, Project } from "@/shared/content";
import { cn } from "@/shared/lib/cn";
import { Chip } from "@/shared/ui/Chip";
import { EASE_OUT, SectionHeading, SpotlightCard } from "@/shared/ui/motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { FC, useRef, useState } from "react";

interface ExperienceProps {
  jobs: Job[];
  projects: Pick<Project, "slug" | "name">[];
  labels: {
    eyebrow: string;
    title: string;
    current: string;
    responsibilities: string;
    showMore: string;
    showLess: string;
    projects: string;
    tools: string;
  };
}

export const Experience: FC<ExperienceProps> = ({ jobs, projects, labels }) => {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const projectName = (slug: string) => projects.find((p) => p.slug === slug)?.name ?? slug;

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="02" eyebrow={labels.eyebrow} title={labels.title} />

        <ol ref={listRef} className="relative space-y-6 md:space-y-8">
          {/* track + animated fill */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-border md:left-[calc(12rem+7px)]" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-brand via-brand-2 to-brand-3 md:left-[calc(12rem+7px)]"
          />

          {jobs.map((job) => (
            <JobItem key={job.id} job={job} labels={labels} projectName={projectName} />
          ))}
        </ol>
      </div>
    </section>
  );
};

interface JobItemProps {
  job: Job;
  labels: ExperienceProps["labels"];
  projectName: (slug: string) => string;
}

const JobItem: FC<JobItemProps> = ({ job, labels, projectName }) => {
  const [open, setOpen] = useState(false);
  const hasDetails = job.responsibilities.length > 0;

  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="relative grid gap-3 pl-8 md:grid-cols-[12rem_1fr] md:gap-0 md:pl-0"
    >
      {/* period column */}
      <div className="md:pt-6 md:pr-10 md:text-right">
        <p className="font-mono text-xs text-muted-foreground">{job.period}</p>
        {job.duration && <p className="mt-1 font-mono text-[11px] text-muted-foreground/70">{job.duration}</p>}
      </div>

      {/* timeline node */}
      <span className="absolute top-0.5 left-0 flex size-[15px] items-center justify-center md:top-[1.6rem] md:left-[12rem]">
        {job.current && <span className="absolute size-full animate-pulse-ring rounded-full bg-brand" />}
        <span
          className={cn(
            "relative size-[15px] rounded-full border-2 bg-background",
            job.current ? "border-brand" : "border-muted-foreground/40"
          )}
        />
      </span>

      <div className="md:pl-10">
        <SpotlightCard className="p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-2xl font-semibold tracking-tight">
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                {job.current && (
                  <span className="rounded-full bg-brand/15 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-brand uppercase">
                    {labels.current}
                  </span>
                )}
              </div>
              <p className="mt-1 text-base font-medium text-foreground/80">{job.role}</p>
            </div>
            {job.badge && <Chip>{job.badge}</Chip>}
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
            {job.summary}
          </p>

          {job.projects.length > 0 && (
            <div className="mt-6">
              <p className="mb-2.5 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {labels.projects}
              </p>
              <div className="flex flex-wrap gap-2">
                {job.projects.map((slug) => (
                  <Link
                    key={slug}
                    href={`/projects/${slug}`}
                    className="group inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:border-brand hover:bg-brand/20"
                  >
                    {projectName(slug)}
                    <ArrowUpRight className="size-3.5 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-1.5">
            {job.tools.map((tool) => (
              <Chip key={tool} className="text-[11px]">
                {tool}
              </Chip>
            ))}
          </div>

          {job.note && <p className="mt-5 text-xs text-muted-foreground italic">{job.note}</p>}

          {hasDetails && (
            <>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <p className="mt-6 mb-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                      {labels.responsibilities}
                    </p>
                    <ul className="space-y-2">
                      {job.responsibilities.map((item, i) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i }}
                          className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-opacity hover:opacity-80"
              >
                {open ? labels.showLess : labels.showMore}
                <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
              </button>
            </>
          )}
        </SpotlightCard>
      </div>
    </motion.li>
  );
};
