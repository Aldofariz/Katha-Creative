"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import type { Stat } from "@/types";

export function StatCounter({ stat }: { stat: Stat }) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const value = useMotionValue(0);
  const formatted = useTransform(value, (current) => {
    const rounded = Number(current.toFixed(stat.decimals ?? 0));
    return `${stat.prefix ?? ""}${rounded.toLocaleString("en-US", {
      minimumFractionDigits: stat.decimals ?? 0,
      maximumFractionDigits: stat.decimals ?? 0,
    })}${stat.suffix ?? ""}`;
  });
  const isInView = useInView(elementRef, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotionSafe();

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(value, stat.value, {
      duration: reducedMotion ? 0 : 1.5,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [isInView, reducedMotion, stat.value, value]);

  return (
    <motion.span
      ref={elementRef}
      className="font-heading text-h2 block tabular-nums"
    >
      {formatted}
    </motion.span>
  );
}
