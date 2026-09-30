import type { Content } from "@/shared/content";
import {
  CountUp,
  Reveal,
  SectionHeading,
  SpotlightCard,
  Stagger,
  StaggerItem,
} from "@/shared/ui/motion";
import { FC } from "react";
import { ProcessLine } from "./ProcessLine";

interface AboutProps {
  content: Pick<Content, "about" | "stats" | "facts" | "process">;
  labels: { eyebrow: string; title: string; processTitle: string };
}

export const About: FC<AboutProps> = ({ content, labels }) => (
  <section id="about" className="relative py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <SectionHeading index="01" eyebrow={labels.eyebrow} title={labels.title} />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <Stagger className="space-y-5 text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
            {content.about.map((p, i) => (
              <StaggerItem key={i}>
                <p className={i === 0 ? "text-foreground" : undefined}>{p}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border" delay={0.2}>
            {content.facts.map((fact) => (
              <StaggerItem key={fact.label} className="bg-background/80 p-4 backdrop-blur">
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{fact.label}</p>
                <p className="mt-1 text-sm font-medium">{fact.value}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Stagger className="grid grid-cols-2 gap-4 self-start" stagger={0.1}>
          {content.stats.map((stat, i) => (
            <StaggerItem key={stat.label}>
              <SpotlightCard tilt className="flex h-full min-h-44 flex-col justify-between gap-6 p-5 md:min-h-52 md:p-6">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <div>
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    className="block bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl"
                  />
                  <p className="mt-2 text-sm leading-snug text-muted-foreground">{stat.label}</p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Reveal className="mt-24 mb-10">
        <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{labels.processTitle}</h3>
      </Reveal>
      <ProcessLine steps={content.process} />
    </div>
  </section>
);
