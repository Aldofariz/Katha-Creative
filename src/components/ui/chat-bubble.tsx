"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { EmojiKey } from "@/data/emoji";
import { EmojiImage } from "@/components/ui/emoji-image";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

type ChatBubbleProps = {
  variant: "sent" | "received" | "typing";
  children?: ReactNode;
  reaction?: EmojiKey;
  timestamp?: string;
  className?: string;
  decorative?: boolean;
};

const bubbleVariants = {
  sent: "self-end rounded-chat rounded-br-[6px] bg-brand text-white",
  received: "self-start rounded-chat rounded-bl-[6px] bg-ink/[0.06] text-ink",
  typing: "self-start rounded-chat rounded-bl-[6px] bg-ink/[0.06] text-ink",
} as const;

export function ChatBubble({
  variant,
  children,
  reaction,
  timestamp,
  className,
  decorative = false,
}: ChatBubbleProps) {
  const isReducedMotion = useReducedMotionSafe();

  return (
    <div
      className={cn(
        "relative flex w-fit max-w-[min(100%,26rem)] flex-col",
        variant === "sent" ? "items-end" : "items-start",
        className,
      )}
      aria-hidden={decorative || undefined}
    >
      <div
        className={cn(
          "relative px-4 py-3 text-sm leading-relaxed",
          bubbleVariants[variant],
        )}
        role={variant === "typing" && !decorative ? "status" : undefined}
        aria-label={variant === "typing" && !decorative ? "Typing" : undefined}
      >
        {variant === "typing" ? (
          <span className="flex h-5 items-center gap-1" aria-hidden="true">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="bg-ink-soft size-1.5 rounded-full"
                animate={isReducedMotion ? { y: 0 } : { y: [0, -3, 0] }}
                transition={
                  isReducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: dot * 0.12,
                      }
                }
              />
            ))}
          </span>
        ) : (
          children
        )}
        {reaction ? (
          <span
            aria-hidden="true"
            className={cn(
              "border-line absolute -bottom-3 grid size-7 place-items-center rounded-full border bg-white",
              variant === "sent" ? "-right-2" : "-left-2",
            )}
          >
            <EmojiImage emojiKey={reaction} width={20} height={20} />
          </span>
        ) : null}
      </div>
      {timestamp ? (
        <span className="text-ink-soft mt-1 px-1 text-xs">{timestamp}</span>
      ) : null}
    </div>
  );
}
