import { contacts, type Project } from "@/shared/content";
import { accentStyle } from "@/shared/lib/accent";
import { Chip } from "@/shared/ui/Chip";
import { Reveal, SplitText, SpotlightCard, Stagger, StaggerItem } from "@/shared/ui/motion";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface CaseStudyProps {
  project: Project;
  next: Project;
  labels: {
    back: string;
    company: string;
    role: string;
    period: string;
    status: string;
    tasks: string;
    results: string;
    tools: string;
    products: string;
    next: string;
    cta: string;
    writeTelegram: string;
  };
}

export const CaseStudy: FC<CaseStudyProps> = ({ project, next, labels }) => {
  const meta = [
    { label: labels.company, value: project.company },
    { label: labels.role, value: project.role },
    { label: labels.period, value: project.period },
    { label: labels.status, value: project.status },
  ];

  return (
    <article style={accentStyle(project.accent)} className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "var(--c)" }}
      />

      {/* intro */}
      <header className="mx-auto max-w-5xl px-5 pt-32 pb-16 md:px-8 md:pt-40">
        <Reveal>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full border bg-surface px-4 py-2 text-sm text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            {labels.back}
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] tracking-wider uppercase"
            style={{ background: "color-mix(in oklch, var(--c) 16%, transparent)", color: "var(--c)" }}
          >
            <span className="size-1.5 rounded-full" style={{ background: "var(--c)" }} />
            {project.status}
          </span>
          <Chip>{project.company}</Chip>
        </Reveal>

        <SplitText
          as="h1"
          immediate
          delay={0.15}
          text={project.name}
          className="mt-6 text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl md:text-8xl"
        />
        <Reveal delay={0.4}>
          <p className="mt-6 max-w-2xl text-xl text-pretty text-muted-foreground md:text-2xl">{project.tagline}</p>
        </Reveal>

        <Stagger delay={0.5} className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-4">
          {meta.map((m) => (
            <StaggerItem key={m.label} className="bg-background/85 p-5 backdrop-blur">
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{m.label}</p>
              <p className="mt-1.5 text-sm font-medium">{m.value}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </header>

      <div className="mx-auto max-w-5xl space-y-20 px-5 pb-24 md:px-8">
        <Reveal>
          <p className="text-2xl leading-snug font-medium tracking-tight text-pretty md:text-3xl">{project.summary}</p>
        </Reveal>

        {project.products && (
          <section>
            <SectionLabel index="00" text={labels.products} />
            <Stagger className="grid gap-4 md:grid-cols-3">
              {project.products.map((p) => (
                <StaggerItem key={p.name} className="h-full">
                  <SpotlightCard className="h-full p-6">
                    <p className="text-lg font-semibold">{p.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        )}

        <section>
          <SectionLabel index="01" text={labels.tasks} />
          <Stagger className="divide-y rounded-3xl border bg-card/40 backdrop-blur" stagger={0.06}>
            {project.tasks.map((task, i) => (
              <StaggerItem key={task} className="group flex gap-5 p-5 transition-colors hover:bg-surface md:gap-8 md:p-6">
                <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-[var(--c)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-relaxed md:text-lg">{task}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <section>
          <SectionLabel index="02" text={labels.results} />
          <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
            {project.results.map((result, i) => (
              <StaggerItem key={result} className={i === 0 && project.results.length % 2 === 1 ? "h-full sm:col-span-2" : "h-full"}>
                <SpotlightCard className="h-full p-6 md:p-7">
                  <span
                    className="grid size-9 place-items-center rounded-full"
                    style={{ background: "color-mix(in oklch, var(--c) 18%, transparent)", color: "var(--c)" }}
                  >
                    <Check className="size-4" />
                  </span>
                  <p className="mt-5 text-lg leading-snug font-medium text-pretty">{result}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <section>
          <SectionLabel index="03" text={labels.tools} />
          <Reveal className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <Chip key={tool} className="px-4 py-2 text-sm text-foreground/85">
                {tool}
              </Chip>
            ))}
          </Reveal>
        </section>

        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border bg-card/40 p-8 backdrop-blur md:flex-row md:items-center md:p-10">
            <p className="text-2xl font-semibold tracking-tight md:text-3xl">{labels.cta}</p>
            <a
              href={contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Send className="size-4" />
              {labels.writeTelegram}
            </a>
          </div>
        </Reveal>

        <Reveal>
          <Link href={`/projects/${next.slug}`} className="group block" style={accentStyle(next.accent)}>
            <SpotlightCard className="p-8 md:p-12">
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">{labels.next}</p>
              <div className="mt-4 flex items-end justify-between gap-6">
                <div>
                  <p className="text-4xl font-semibold tracking-tight transition-colors group-hover:text-[var(--c)] md:text-6xl">
                    {next.name}
                  </p>
                  <p className="mt-3 text-muted-foreground">{next.tagline}</p>
                </div>
                <span className="grid size-14 shrink-0 place-items-center rounded-full border transition-all duration-500 group-hover:border-transparent group-hover:bg-[var(--c)] group-hover:text-white">
                  <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </SpotlightCard>
          </Link>
        </Reveal>
      </div>
    </article>
  );
};

const SectionLabel: FC<{ index: string; text: string }> = ({ index, text }) => (
  <Reveal className="mb-6 flex items-center gap-3">
    <span className="font-mono text-xs text-[var(--c)]">{index}</span>
    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{text}</h2>
  </Reveal>
);
