"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { timeline } from "@/data/timeline";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

export function AboutTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 70%", "end 30%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} aria-labelledby="timeline-title" className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-12">
      <h2 id="timeline-title" className="font-sans text-h2 mb-10">A few chapters so far</h2>
      <div className="relative">
        <span aria-hidden="true" className="bg-line-strong absolute top-2 bottom-2 left-[5px] w-px md:left-[72px]">
          <motion.span className="bg-accent absolute inset-0 origin-top" style={{ scaleY: reducedMotion ? 1 : lineScale }} />
        </span>
        <ol className="border-line divide-y">
          {timeline.map((item) => (
            <li key={item.year} className="relative grid gap-2 border-line py-6 pl-8 sm:grid-cols-[72px_1fr] sm:gap-6 sm:pl-0">
              <span aria-hidden="true" className="bg-accent absolute top-8 left-0 size-[11px] rounded-full ring-4 ring-white sm:left-[67px]" />
              <p className="text-accent text-sm font-semibold tabular-nums">{item.year}</p>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-ink-soft mt-1">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
