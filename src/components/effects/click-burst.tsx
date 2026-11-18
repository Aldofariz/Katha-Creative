"use client";

import { motion } from "motion/react";
import type { EmojiKey } from "@/data/emoji";
import { EmojiImage } from "@/components/ui/emoji-image";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

const particles = [
  { x: 0, y: -34 },
  { x: 24, y: -24 },
  { x: 34, y: 0 },
  { x: 24, y: 24 },
  { x: 0, y: 34 },
  { x: -24, y: 24 },
  { x: -34, y: 0 },
  { x: -24, y: -24 },
] as const;

type ClickBurstProps = {
  emojiKey: EmojiKey;
  onComplete?: () => void;
};

export function ClickBurst({ emojiKey, onComplete }: ClickBurstProps) {
  const isReducedMotion = useReducedMotionSafe();

  if (isReducedMotion) return null;

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.72, ease: "easeOut" }}
      onAnimationComplete={onComplete}
    >
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute top-1/2 left-1/2"
          initial={{ x: 0, y: 0, scale: 0.45, opacity: 1 }}
          animate={{
            x: particle.x,
            y: particle.y,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.01 }}
        >
          <EmojiImage emojiKey={emojiKey} width={18} height={18} />
        </motion.span>
      ))}
    </motion.span>
  );
}
