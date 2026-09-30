import { FC } from "react";
import { cn } from "@/shared/lib/cn";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)} aria-label="aaanvarovic">
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-brand to-brand-2 font-mono text-xs font-bold text-white shadow-lg shadow-brand/25 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105">
        AA
      </span>
      <span className="font-mono text-sm tracking-tight text-foreground/90 max-sm:hidden">aaanvarovic</span>
    </Link>
  );
};
