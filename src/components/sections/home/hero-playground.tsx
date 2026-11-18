"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { EmojiImage } from "@/components/ui/emoji-image";
import { Sticker } from "@/components/ui/sticker";
import { WindowCard } from "@/components/ui/window-card";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

function InlineEmoji({ emojiKey }: { emojiKey: "sweat-smile" | "rocket" }) {
  return (
    <span className="ml-0.5 inline-flex size-4 align-[-3px]">
      <EmojiImage
        emojiKey={emojiKey}
        width={16}
        height={16}
        className="size-4"
      />
    </span>
  );
}

const messages = [
  {
    variant: "received",
    content: (
      <>
        hey katha, our ads are burning cash{" "}
        <InlineEmoji emojiKey="sweat-smile" />
      </>
    ),
  },
  {
    variant: "sent",
    content: <>send us the numbers. we&apos;ll find the leak.</>,
  },
  {
    variant: "received",
    content: <>and then?</>,
  },
  {
    variant: "sent",
    content: (
      <>
        then we make it sing. <InlineEmoji emojiKey="rocket" />
      </>
    ),
  },
] as const;

export function HeroPlayground() {
  const reducedMotion = useReducedMotionSafe();
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const timers = [
      window.setTimeout(() => setTyping(true), 180),
      window.setTimeout(() => {
        setTyping(false);
        setVisibleCount(1);
      }, 350),
      window.setTimeout(() => setVisibleCount(2), 700),
      window.setTimeout(() => setTyping(true), 880),
      window.setTimeout(() => {
        setTyping(false);
        setVisibleCount(3);
      }, 1050),
      window.setTimeout(() => setVisibleCount(4), 1400),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [reducedMotion]);

  const displayedCount = reducedMotion ? messages.length : visibleCount;
  const sequenceComplete = reducedMotion || displayedCount === messages.length;

  return (
    <div
      role="img"
      aria-label="A conversation with Katha Creative"
      className="relative mx-auto w-full max-w-[500px] pt-7 md:pt-9"
    >
      <Sticker className="absolute top-0 right-1 z-20 sm:right-0" />
      <WindowCard
        title="Messages"
        titleContent={
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="bg-ink grid size-7 shrink-0 place-items-center rounded-[22.37%] text-[13px] font-bold text-white"
            >
              K
            </span>
            <span className="flex min-w-0 flex-col text-left leading-tight">
              <span className="text-ink truncate text-[13px] font-semibold">
                Katha Creative
              </span>
              <span className="text-ink-soft truncate text-[11px] font-normal">
                Usually replies in a day
              </span>
            </span>
          </div>
        }
        toolbar={<span aria-hidden="true" className="size-5" />}
        className="relative z-10 mx-auto w-full max-w-[460px]"
        bodyClassName="p-4 sm:p-6"
      >
        <motion.div
          aria-hidden="true"
          className="flex min-h-[230px] flex-col gap-3"
          animate={
            sequenceComplete && !reducedMotion ? { y: [0, -6, 0] } : { y: 0 }
          }
          transition={
            sequenceComplete && !reducedMotion
              ? { duration: 6, ease: "easeInOut", repeat: Infinity }
              : { duration: reducedMotion ? 0 : 0.2 }
          }
        >
          {messages.map((message, index) =>
            index < displayedCount ? (
              <motion.div
                key={index}
                initial={
                  reducedMotion ? false : { opacity: 0, scale: 0.92, y: 8 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.32,
                  ease: "easeOut",
                }}
              >
                <ChatBubble variant={message.variant} decorative>
                  {message.content}
                </ChatBubble>
              </motion.div>
            ) : null,
          )}
          {typing && displayedCount < messages.length ? (
            <ChatBubble variant="typing" decorative />
          ) : null}
        </motion.div>
      </WindowCard>
    </div>
  );
}
