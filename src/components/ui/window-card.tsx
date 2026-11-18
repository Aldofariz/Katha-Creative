import type { ReactNode } from "react";
import type { AccentColor } from "@/types";
import { cn } from "@/lib/cn";
import { GlassCard } from "@/components/ui/glass-card";

const accentGlow: Record<AccentColor, string> = {
  pink: "bg-pink/45",
  yellow: "bg-yellow/45",
  mint: "bg-mint/45",
  sky: "bg-sky/45",
  coral: "bg-coral/45",
  lilac: "bg-lilac/45",
  lime: "bg-lime/45",
  peach: "bg-peach/45",
};

type WindowCardProps = {
  title: string;
  children: ReactNode;
  accent?: AccentColor;
  className?: string;
  bodyClassName?: string;
};

export function WindowCard({
  title,
  children,
  accent,
  className,
  bodyClassName,
}: WindowCardProps) {
  return (
    <GlassCard className={cn("rounded-window", className)}>
      {accent ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-8 -right-8 z-0 size-36 rounded-full opacity-50 blur-3xl",
            accentGlow[accent],
          )}
        />
      ) : null}
      <div className="border-line relative z-[1] flex h-10 items-center border-b px-4">
        <div aria-hidden="true" className="flex gap-1.5">
          <span className="bg-dot-close size-3 rounded-full" />
          <span className="bg-dot-min size-3 rounded-full" />
          <span className="bg-dot-zoom size-3 rounded-full" />
        </div>
        <span className="text-small text-ink-soft absolute left-1/2 max-w-[60%] -translate-x-1/2 truncate">
          {title}
        </span>
      </div>
      <div className={cn("relative z-[1] p-6", bodyClassName)}>{children}</div>
    </GlassCard>
  );
}
