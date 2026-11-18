"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { buttonClassNames } from "@/lib/button-styles";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import { siteCopy } from "@/data/site-copy";

export function HeroCopy() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <motion.div
      className="max-w-2xl"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.7, ease: "easeOut" }}
    >
      <h1 className="font-heading text-display leading-[1.02] tracking-[-0.045em]">
        {siteCopy.home.heroTitle}
      </h1>
      <p className="text-body-lg text-ink-soft mt-6 max-w-[58ch]">
        {siteCopy.home.heroSubline}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/contact" className={buttonClassNames("primary", "lg")}>
          Start a project
        </Link>
        <Link href="/services" className={buttonClassNames("secondary", "lg")}>
          See our services
        </Link>
      </div>
      <p className="text-small text-ink-soft mt-5">{siteCopy.home.trustLine}</p>
    </motion.div>
  );
}
