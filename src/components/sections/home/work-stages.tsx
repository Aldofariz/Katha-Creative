"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Search,
  Target,
  UsersRound,
} from "lucide-react";
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
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-small text-accent mb-1 font-semibold">{stage.name}</p>
          <h3 className="font-sans text-h3">{stage.window}</h3>
        </div>
        <span className="text-small text-ink-soft mt-1 shrink-0 tabular-nums">
          {String(index + 1).padStart(2, "0")} / 04
        </span>
      </div>
      {index === 1 ? (
        <>
          <div className="border-line flex items-center gap-2 border-b pb-3 text-xs">
            <span className="size-2 rounded-full bg-accent" />
            <span className="font-medium">Campaign direction</span>
            <span className="text-ink-soft ml-auto">3 priorities</span>
          </div>
          <ol className="divide-line divide-y">
            {stage.detail.filter((_, itemIndex) => itemIndex % 2 === 0).map((item, itemIndex) => {
              const Icon = itemIndex === 0 ? Search : itemIndex === 1 ? UsersRound : Target;
              return (
                <li key={item} className="grid grid-cols-[28px_1fr_20px] items-center gap-3 py-4">
                  <span className="text-accent grid size-7 place-items-center rounded-full bg-accent-wash">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{item}</span>
                    <span className="text-small text-ink-soft">{stage.detail[itemIndex * 2 + 1]}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="text-ink-soft size-4" />
                </li>
              );
            })}
          </ol>
        </>
      ) : index === 2 ? (
        <>
          <div className="mb-2 flex items-center gap-2">
            <CalendarDays aria-hidden="true" className="text-ink-soft size-4" />
            <span className="text-small text-ink-soft">Launch day · Tuesday</span>
          </div>
          <ul className="divide-line divide-y">
            {stage.detail.map((item, itemIndex) => (
              <li key={item} className="flex min-h-12 items-center gap-3 py-2">
                <span aria-hidden="true" className="text-accent grid size-5 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent-wash">
                  <Check className="size-3" strokeWidth={2.5} />
                </span>
                <span className="text-sm font-medium">{item}</span>
                <span className="text-small text-ink-soft ml-auto">{itemIndex === 3 ? "Ready" : "Done"}</span>
              </li>
            ))}
          </ul>
          <p className="text-small text-ink-soft mt-4 border-l-2 border-accent pl-3">
            Everything is checked. The campaign is ready to go live.
          </p>
        </>
      ) : index === 3 ? (
        <>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-small text-ink-soft">Sales this week</p>
              <p className="text-3xl leading-tight font-semibold tracking-tight tabular-nums">+38%</p>
            </div>
            <span className="text-small text-ink-soft flex items-center gap-1.5 pb-1">
              <span className="size-2 rounded-full bg-accent" />
              Online sales
            </span>
          </div>
          <div className="relative h-32 border-b border-line-strong">
            <div aria-hidden="true" className="absolute inset-0 grid grid-rows-3">
              <span className="border-t border-line" />
              <span className="border-t border-line" />
              <span className="border-t border-line" />
            </div>
            <div className="relative z-[1] flex h-full items-end gap-3 px-2 sm:gap-5">
              {[35, 50, 44, 72, 88].map((height, bar) => (
                <span key={bar} className="bg-accent/85 relative flex-1 rounded-t-sm" style={{ height: `${height}%` }}>
                  {bar === 4 ? <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full border-2 border-accent bg-white" /> : null}
                </span>
              ))}
            </div>
          </div>
          <div className="text-small text-ink-soft flex justify-between px-1 pt-2">
            {(["Mon", "Tue", "Wed", "Thu", "Fri"] as const).map((day) => <span key={day}>{day}</span>)}
          </div>
        </>
      ) : (
        <>
          <div className="border-line mb-3 flex items-center justify-between border-b pb-3">
            <span className="text-small text-ink-soft">Project overview</span>
            <span className="text-small text-accent font-medium">In progress</span>
          </div>
          <dl className="divide-line divide-y text-sm">
            {stage.detail.filter((_, itemIndex) => itemIndex % 2 === 0).map((label, itemIndex) => (
              <div key={label} className="grid grid-cols-[auto_1fr] gap-4 py-3">
                <dt className="text-ink-soft">{label}</dt>
                <dd className="text-right font-medium">{stage.detail[itemIndex * 2 + 1]}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex gap-1.5" aria-label="Brief progress, step one of four">
            {[0, 1, 2, 3].map((step) => <span key={step} aria-hidden="true" className={`h-1 flex-1 rounded-full ${step === 0 ? "bg-accent" : "bg-line-strong"}`} />)}
          </div>
        </>
      )}
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
    const position = Math.min(value * stages.length, stages.length);
    const fade = 0.16;
    const start = index;
    const end = index + 1;
    if (position < start) return Math.max(0, 1 - (start - position) / fade);
    if (index === stages.length - 1 || position <= end - fade) return 1;
    return Math.max(0, (end - position) / fade);
  });
  const y = useTransform(opacity, [0, 1], [14, 0]);
  const stage = stages[index];
  if (!stage) return null;

  return (
    <motion.article
      className="how-stage-view absolute inset-0 grid items-center gap-7 md:grid-cols-2 md:gap-12"
      style={{ opacity, y }}
    >
      <WindowCard title="Messages" className="h-full" bodyClassName="p-5 sm:p-6">
        <ol aria-label="Work stages" className="mb-6 space-y-2">
          {stages.map((item, itemIndex) => (
            <li key={item.name} className={`flex items-center gap-3 text-sm ${itemIndex === index ? "text-ink font-semibold" : "text-ink-soft"}`}>
              <span aria-hidden="true" className={`h-4 w-0.5 ${itemIndex === index ? "bg-accent" : "bg-transparent"}`} />
              <span>{item.name}</span>
              {itemIndex === index ? <span className="sr-only">Current stage</span> : null}
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-4">
          <ChatBubble variant="received">{stage.received}</ChatBubble>
          <ChatBubble variant="sent">{stage.sent}</ChatBubble>
        </div>
        {index === 3 ? (
          <p className="text-small text-ink-soft mt-3 text-right">Delivered</p>
        ) : null}
      </WindowCard>
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
      className="how-scroll-track relative h-[400svh] md:h-[520svh]"
    >
      <div className="mx-auto max-w-7xl px-5 pt-16 md:px-8 md:pt-24 lg:px-12">
        <div className="mb-8 max-w-2xl">
          <h2 className="font-sans text-h2">
            From first message to first results
          </h2>
        </div>
      </div>
      <div className="how-sticky sticky top-20 mx-auto flex min-h-[min(680px,calc(100svh-100px))] max-w-7xl items-center px-5 pb-12 md:top-24 md:px-8 lg:px-12">
        <div className="relative w-full">
          <div
            aria-hidden="true"
            className="bg-line absolute top-8 bottom-8 left-2.5 w-px md:left-4"
          >
            <motion.span
              className="bg-accent absolute top-0 left-0 h-full w-full origin-top"
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
