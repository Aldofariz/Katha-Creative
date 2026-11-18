"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ClickBurst } from "@/components/effects/click-burst";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import { cn } from "@/lib/cn";

export function Sticker({ className }: { className?: string }) {
  const isReducedMotion = useReducedMotionSafe();
  const [burstId, setBurstId] = useState<number | null>(null);

  return (
    <motion.div
      aria-hidden="true"
      drag={!isReducedMotion}
      dragElastic={0.08}
      dragMomentum={false}
      whileDrag={isReducedMotion ? undefined : { scale: 1.05, rotate: 0 }}
      onTap={() => setBurstId((current) => (current ?? 0) + 1)}
      className={cn(
        "relative w-[132px] cursor-grab touch-none rounded-[4px] bg-white text-center shadow-[0_3px_12px_rgb(0_0_0_/_0.2)] select-none active:cursor-grabbing",
        className,
      )}
      style={{ rotate: "-6deg" }}
    >
      <span className="flex h-9 flex-col items-center justify-center rounded-t-[4px] bg-[#e34b4b] text-[10px] leading-tight font-bold tracking-[0.08em] text-white">
        <span>HELLO</span>
        <span>my name is</span>
      </span>
      <span className="text-ink block px-2 py-1 text-[32px] leading-[1.1] font-[var(--font-caveat)]">
        Katha
      </span>
      {burstId !== null ? (
        <ClickBurst
          key={burstId}
          emojiKey="sparkles"
          onComplete={() => setBurstId(null)}
        />
      ) : null}
    </motion.div>
  );
}
