"use client";

import type { Project } from "@/shared/content";
import { accentStyle } from "@/shared/lib/accent";
import { cn } from "@/shared/lib/cn";
import { Chip } from "@/shared/ui/Chip";
import { EASE_OUT, SectionHeading, SpotlightCard } from "@/shared/ui/motion";
import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { FC } from "react";

interface ProjectsProps {
  projects: Project[];
  labels: { eyebrow: string; title: string; subtitle: string; open: string; featured: string };
}

/** Bento layout on a 6-column grid: featured 4×2, two 2×1, then 3×1 pairs. */
const SPANS = [
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
];

export const Projects: FC<ProjectsProps> = ({ projects, labels }) => (
  <section id="projects" className="relative py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <SectionHeading index="03" eyebrow={labels.eyebrow} title={labels.title} subtitle={labels.subtitle} />

      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: (i % 3) * 0.08 }}
            className={cn(SPANS[i] ?? "lg:col-span-3", project.featured && "sm:col-span-2")}
          >
            <ProjectCard project={project} index={i} labels={labels} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

interface ProjectCardProps {
  project: Project;
  index: number;
  labels: ProjectsProps["labels"];
}

const ProjectCard: FC<ProjectCardProps> = ({ project, index, labels }) => {
  const featured = project.featured;

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full" aria-label={`${labels.open}: ${project.name}`}>
      <SpotlightCard
        style={accentStyle(project.accent)}
        className={cn("flex h-full flex-col p-6 transition-transform duration-500 group-hover:-translate-y-1", featured && "md:p-10")}
      >
        {/* accent orb */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -z-10 rounded-full opacity-30 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-50",
            featured ? "-top-24 -right-24 size-96" : "-top-16 -right-16 size-48"
          )}
          style={{ background: "var(--c)" }}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute right-6 bottom-2 font-mono font-bold text-foreground/[0.04] transition-colors duration-500 select-none group-hover:text-[color:color-mix(in_oklch,var(--c)_14%,transparent)]",
            featured ? "text-[11rem] leading-none" : "translate-y-1/4 text-7xl leading-none"
          )}
        >
          0{index + 1}
        </span>

        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase"
              style={{ background: "color-mix(in oklch, var(--c) 16%, transparent)", color: "var(--c)" }}
            >
              <span className="size-1.5 rounded-full" style={{ background: "var(--c)" }} />
              {project.status}
            </span>
            {featured && <Chip className="text-[10px]">{labels.featured}</Chip>}
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border bg-surface transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-[var(--c)] group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {project.company} · {project.period}
        </p>
        <h3
          className={cn(
            "mt-2 font-semibold tracking-tight",
            featured ? "text-4xl md:text-6xl" : "text-2xl"
          )}
        >
          {project.name}
        </h3>
        <p className={cn("mt-3 text-pretty text-muted-foreground", featured ? "max-w-md text-base md:text-lg" : "text-sm")}>
          {project.tagline}
        </p>

        {featured && (
          <ul className="mt-8 space-y-3">
            {project.results.slice(0, 3).map((result) => (
              <li key={result} className="flex items-start gap-3 text-sm text-foreground/85 md:text-base">
                <span
                  className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full"
                  style={{ background: "color-mix(in oklch, var(--c) 20%, transparent)", color: "var(--c)" }}
                >
                  <Check className="size-3" />
                </span>
                {result}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
          {project.tools.slice(0, featured ? 6 : 3).map((tool) => (
            <Chip key={tool} className="text-[11px]">
              {tool}
            </Chip>
          ))}
        </div>
      </SpotlightCard>
    </Link>
  );
};
