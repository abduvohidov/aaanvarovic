import { cn } from "@/shared/lib/cn";
import { type FC, type ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  className?: string;
}

export const Chip: FC<ChipProps> = ({ children, className }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border bg-surface px-3 py-1 text-xs font-medium whitespace-nowrap text-muted-foreground transition-colors",
      className
    )}
  >
    {children}
  </span>
);
