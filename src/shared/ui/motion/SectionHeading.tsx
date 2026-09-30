import { cn } from "@/shared/lib/cn";
import { type FC } from "react";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading: FC<SectionHeadingProps> = ({ index, eyebrow, title, subtitle, className }) => (
  <div className={cn("mb-12 max-w-3xl md:mb-16", className)}>
    <Reveal className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
      <span className="text-brand">{index}</span>
      <span className="h-px w-10 bg-gradient-to-r from-brand to-transparent" />
      <span>{eyebrow}</span>
    </Reveal>
    <SplitText
      as="h2"
      text={title}
      className="text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl"
    />
    {subtitle && (
      <Reveal delay={0.2}>
        <p className="mt-5 text-base text-pretty text-muted-foreground md:text-lg">{subtitle}</p>
      </Reveal>
    )}
  </div>
);
