"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import type { FaqItem } from "@/types";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

type AccordionProps = {
  items: FaqItem[];
  className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const id = useId();
  const isReducedMotion = useReducedMotionSafe();

  return (
    <div className={cn("border-line divide-line divide-y border-y", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${id}-trigger-${index}`;
        const panelId = `${id}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="text-ink focus-visible:outline-accent flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-semibold focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.question}
                <motion.span
                  aria-hidden="true"
                  className="text-ink-soft relative size-3 shrink-0"
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={isReducedMotion ? { duration: 0 } : { duration: 0.15 }}
                >
                  <span className="absolute top-1/2 left-1/2 size-0 -translate-x-1/3 -translate-y-1/2 border-y-[4px] border-y-transparent border-l-[5px] border-l-current" />
                </motion.span>
              </button>
            </h3>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={
                isReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.24, ease: "easeOut" }
              }
              className="overflow-hidden"
            >
              <p className="text-ink-soft max-w-prose pb-5">
                {item.answer}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
