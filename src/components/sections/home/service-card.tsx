"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { EmojiImage } from "@/components/ui/emoji-image";
import { WindowCard } from "@/components/ui/window-card";
import { emoji } from "@/data/emoji";
import type { Service } from "@/types";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

const accentClasses: Record<Service["accent"], string> = {
  pink: "bg-pink/25",
  yellow: "bg-yellow/30",
  mint: "bg-mint/30",
  sky: "bg-sky/25",
  coral: "bg-coral/25",
  lilac: "bg-lilac/25",
  lime: "bg-lime/30",
  peach: "bg-peach/30",
};

export function ServiceCard({ service }: { service: Service }) {
  const reducedMotion = useReducedMotionSafe();
  const isTraining = service.slug === "digital-marketing-training";

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group rounded-window focus-visible:outline-brand block h-full focus-visible:outline-2 focus-visible:outline-offset-4"
      aria-label={`${service.title}: learn more`}
    >
      <WindowCard
        title={service.name}
        accent={service.accent}
        className={`h-full transition-transform duration-200 group-hover:-translate-y-1 ${isTraining ? "border-brand/20 bg-brand-wash/35" : ""}`}
        bodyClassName="flex h-[calc(100%-40px)] flex-col p-5 sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <span
            aria-hidden="true"
            className={`grid size-14 shrink-0 place-items-center rounded-2xl ${accentClasses[service.accent]}`}
          >
            <motion.span
              className="grid place-items-center"
              whileHover={reducedMotion ? undefined : { rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.45 }}
            >
              <EmojiImage emojiKey={service.emoji} width={42} height={42} />
            </motion.span>
          </span>
          {isTraining ? <Badge variant="brand">Learn with us</Badge> : null}
        </div>
        <h3 className="font-heading text-h3 mt-5">{service.title}</h3>
        <p className="text-small text-ink-soft mt-2 line-clamp-2 min-h-11">
          {service.tagline}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {service.chips.slice(0, 3).map((chip) => (
            <span
              key={chip}
              className="text-ink-soft border-line rounded-full border bg-white/55 px-2.5 py-1 text-xs"
            >
              {chip}
            </span>
          ))}
        </div>
        <span className="text-small text-brand mt-auto inline-flex min-h-11 items-end font-semibold underline-offset-4 group-hover:underline">
          Learn more
          <span className="sr-only">
            {" "}
            about {emoji[service.emoji].label} service
          </span>
        </span>
      </WindowCard>
    </Link>
  );
}
