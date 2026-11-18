"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef } from "react";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { WindowCard } from "@/components/ui/window-card";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

const stages = [
  {
    name: "Brief",
    received: "we sell handmade candles. sales are flat.",
    sent: "tell us who buys, what they love, and what you've tried.",
    window: "The brief",
    detail: [
      "Goal",
      "Grow online sales",
      "Audience",
      "Candle lovers",
      "Budget",
      "Ready to plan",
    ],
  },
  {
    name: "Strategy",
    received: "so what's the plan?",
    sent: "ads where buyers search, content where they scroll, and one clear offer.",
    window: "The strategy board",
    detail: [
      "Search",
      "Meet active buyers",
      "Social",
      "Build a following",
      "Offer",
      "Make it clear",
    ],
  },
  {
    name: "Launch",
    received: "when do we go live?",
    sent: "tuesday. creatives approved, tracking checked, budget set.",
    window: "Launch checklist",
    detail: [
      "Creative approved",
      "Tracking checked",
      "Budget set",
      "Ready for Tuesday",
    ],
  },
  {
    name: "Report",
    received: "how did week one go?",
    sent: "sales up 38%. here's what we'll scale next.",
    window: "Week one report",
    detail: ["Sales", "+38%", "Next step", "Scale the winning offer"],
  },
] as const;

function StageWindow({ index }: { index: number }) {
  const stage = stages[index];
  if (!stage) return null;
  return (
    <WindowCard title={`${stage.name.toLowerCase()}.app`} className="h-full">
      <p className="font-heading text-h3 mb-5">{stage.window}</p>
      {index === 1 ? (
        <div className="grid grid-cols-3 gap-2">
          {stage.detail
            .filter((_, itemIndex) => itemIndex % 2 === 0)
            .map((item) => (
              <div
                key={item}
                className="rounded-input bg-brand-wash px-2 py-4 text-center text-xs font-semibold"
              >
                {item}
              </div>
            ))}
        </div>
      ) : index === 2 ? (
        <ul className="space-y-3">
          {stage.detail.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm">
              <span
                aria-hidden="true"
                className="bg-mint/40 grid size-5 place-items-center rounded-full text-xs"
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      ) : index === 3 ? (
        <div className="border-line flex h-28 items-end gap-3 border-b px-3">
          {[35, 50, 44, 72, 88].map((height, bar) => (
            <span
              key={bar}
              className="bg-brand/70 flex-1 rounded-t-md"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      ) : (
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm">
          {stage.detail.map((item, itemIndex) => (
            <span
              key={item}
              className={itemIndex % 2 === 0 ? "text-ink-soft" : "font-medium"}
            >
              {item}
            </span>
          ))}
        </dl>
      )}
      {index === 3 ? (
        <p className="text-small text-ink-soft mt-4">Delivered</p>
      ) : null}
    </WindowCard>
  );
}

function WorkStage({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, (value) => {
    const position = Math.min(value * stages.length, stages.length - 1);
    return Math.max(0, 1 - Math.abs(position - index));
  });
  const y = useTransform(opacity, [0, 1], [14, 0]);
  const stage = stages[index];
  if (!stage) return null;

  return (
    <motion.article
      className="how-stage-view absolute inset-0 grid items-center gap-7 md:grid-cols-2 md:gap-12"
      style={{ opacity, y }}
    >
      <div>
        <p className="text-small text-brand mb-3 font-semibold">
          {String(index + 1).padStart(2, "0")} / 04
        </p>
        <h3 className="font-heading text-h2 mb-6">{stage.name}</h3>
        <div className="flex flex-col gap-4">
          <ChatBubble variant="received">{stage.received}</ChatBubble>
          <ChatBubble variant="sent">{stage.sent}</ChatBubble>
        </div>
        {index === 3 ? (
          <p className="text-small text-ink-soft mt-3 text-right">Delivered</p>
        ) : null}
      </div>
      <StageWindow index={index} />
    </motion.article>
  );
}

export function WorkStages() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="how-scroll-track relative h-[200svh] md:h-[300svh]"
    >
      <div className="mx-auto max-w-7xl px-5 pt-16 md:px-8 md:pt-24 lg:px-12">
        <div className="mb-8 max-w-2xl">
          <h2 className="font-heading text-h2">
            From first message to first results
          </h2>
        </div>
      </div>
      <div className="how-sticky sticky top-20 mx-auto flex min-h-[min(680px,calc(100svh-100px))] max-w-7xl items-center px-5 pb-12 md:top-24 md:px-8 lg:px-12">
        <div className="rounded-window border-line relative w-full border bg-white/45 p-5 sm:p-8 md:p-10">
          <div
            aria-hidden="true"
            className="bg-line absolute top-8 bottom-8 left-2.5 w-px md:left-4"
          >
            <motion.span
              className="bg-brand absolute top-0 left-0 h-full w-full origin-top"
              style={{ scaleY: reducedMotion ? 1 : progressScale }}
            />
          </div>
          <div className="how-stage-frame relative min-h-[540px] md:min-h-[440px]">
            {stages.map((stage, index) => (
              <WorkStage
                key={stage.name}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
