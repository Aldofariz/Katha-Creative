"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { WindowCard } from "@/components/ui/window-card";
import { timeline } from "@/data/timeline";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

const timelineAccents = ["pink", "sky", "coral", "yellow", "mint"] as const;

export function AboutTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="timeline-title"
      className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-12"
    >
      <h2 id="timeline-title" className="font-heading text-h2 mb-10">
        A few chapters so far
      </h2>
      <div className="relative">
        <span
          aria-hidden="true"
          className="bg-line absolute top-2 bottom-2 left-[13px] w-px md:left-1/2"
        >
          <motion.span
            className="bg-brand absolute inset-0 origin-top"
            style={{ scaleY: reducedMotion ? 1 : lineScale }}
          />
        </span>
        <ol className="space-y-6">
          {timeline.map((item, index) => {
            const accent = timelineAccents[index] ?? "pink";
            const leftSide = index % 2 === 0;
            return (
              <li
                key={item.year}
                className={`relative pl-10 md:w-1/2 md:pl-0 ${leftSide ? "md:pr-10" : "md:ml-auto md:pl-10"}`}
              >
                <span
                  aria-hidden="true"
                  className={`bg-brand absolute top-7 left-[7px] size-3.5 rounded-full ring-4 ring-white md:left-auto ${leftSide ? "md:right-[-7px]" : "md:left-[-7px]"}`}
                />
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: reducedMotion ? 0 : 0.45 }}
                >
                  <WindowCard title={`${item.year}.chapter`} accent={accent}>
                    <p className="text-small text-brand font-semibold">
                      {item.year}
                    </p>
                    <h3 className="font-heading text-h3 mt-1">{item.title}</h3>
                    <p className="text-ink-soft mt-2">{item.description}</p>
                  </WindowCard>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
