"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

const beachBallStyle: CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at 35% 28%, rgb(255 255 255 / 0.95), transparent 36%), conic-gradient(#ed4b4b 0deg 60deg, #f49b32 60deg 120deg, #f5db46 120deg 180deg, #42bd72 180deg 240deg, #3789e8 240deg 300deg, #9b63dc 300deg 360deg)",
};

type BeachBallProps = {
  label?: string;
  className?: string;
};

export function BeachBall({ label = "Sending", className }: BeachBallProps) {
  const isReducedMotion = useReducedMotionSafe();

  return (
    <span
      role="status"
      aria-label={label}
      aria-live="polite"
      className={cn("inline-flex items-center justify-center", className)}
    >
      <motion.span
        aria-hidden="true"
        className="size-5 rounded-full shadow-[inset_0_0_0_0.5px_rgb(0_0_0_/_0.12)]"
        style={beachBallStyle}
        animate={isReducedMotion ? undefined : { rotate: 360 }}
        transition={
          isReducedMotion
            ? undefined
            : { duration: 0.9, ease: "linear", repeat: Infinity }
        }
      />
    </span>
  );
}
