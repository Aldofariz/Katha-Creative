"use client";

import { motion } from "motion/react";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { EmojiImage } from "@/components/ui/emoji-image";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import type { ContactValues } from "@/components/sections/contact/contact-types";
import { services } from "@/data/services";

const positions = [
  [-38, -46],
  [-8, -56],
  [27, -42],
  [48, -12],
  [42, 22],
  [16, 46],
  [-18, 48],
  [-48, 20],
  [-56, -10],
  [4, 17],
  [29, 4],
  [-22, -20],
] as const;
const emojiKeys = [
  "party-popper",
  "sparkles",
  "star",
  "heart",
  "thumbs-up",
  "fire",
] as const;

export function ContactSuccess({
  values,
  onReset,
}: {
  values: ContactValues;
  onReset: () => void;
}) {
  const reducedMotion = useReducedMotionSafe();
  const serviceName =
    services.find((service) => service.slug === values.service)?.title ??
    values.service;

  return (
    <div className="relative min-h-80 overflow-hidden py-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2"
      >
        {positions.map(([x, y], index) => (
          <motion.span
            key={index}
            className="absolute"
            initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
            animate={
              reducedMotion
                ? { opacity: 0.5, scale: 1, x: 0, y: 0 }
                : { opacity: [0, 1, 0], scale: [0.5, 1, 0.6], x, y }
            }
            transition={{
              duration: reducedMotion ? 0 : 0.8,
              delay: reducedMotion ? 0 : index * 0.025,
            }}
          >
            <EmojiImage
              emojiKey={emojiKeys[index % emojiKeys.length] ?? "sparkles"}
              width={24}
              height={24}
            />
          </motion.span>
        ))}
      </div>
      <div aria-live="polite" className="relative z-[1] flex flex-col gap-4">
        <ChatBubble variant="sent">
          Delivered. Thanks, {values.name}. We&apos;ll follow up about{" "}
          {serviceName}.
        </ChatBubble>
        <ChatBubble variant="received">
          got it! we&apos;ll reply within one business day.
        </ChatBubble>
        <button
          type="button"
          onClick={onReset}
          className="text-small text-ink focus-visible:outline-brand mt-3 min-h-11 self-start font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Send another message
        </button>
      </div>
    </div>
  );
}
