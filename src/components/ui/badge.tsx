import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-small inline-flex min-h-6 items-center rounded-md bg-surface px-2 py-1 font-medium text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
