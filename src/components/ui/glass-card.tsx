"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Spotlight, useSpotlight } from "@/components/effects/spotlight";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function GlassCard({
  children,
  className,
  contentClassName,
}: GlassCardProps) {
  const { ref, onPointerMove, onPointerLeave } = useSpotlight();

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        "glass group rounded-window relative overflow-hidden",
        className,
      )}
    >
      <Spotlight />
      <div className={cn("relative z-[1]", contentClassName)}>{children}</div>
    </div>
  );
}
