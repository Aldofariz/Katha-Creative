"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { EmojiImage } from "@/components/ui/emoji-image";
import { ClickBurst } from "@/components/effects/click-burst";
import { buttonClassNames } from "@/lib/button-styles";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

 type CtaBannerProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function CtaBanner({
  title = "Got a brand with a story? Let's make people talk.",
  description = "Tell us what you're building. We'll reply within one business day.",
  className = "",
}: CtaBannerProps) {
  const [burstId, setBurstId] = useState<number | null>(null);
  const reducedMotion = useReducedMotionSafe();

  return (
    <section className={`bg-surface w-full px-5 py-16 md:px-8 md:py-24 lg:px-12 ${className}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="font-sans text-h2">{title}</h2>
          <p className="text-body-lg text-ink-soft mt-4">{description}</p>
          <Link href="/contact" className={buttonClassNames("primary", "lg", "mt-8")}>Start a project</Link>
        </div>
        <motion.button type="button" aria-label="Celebrate" onClick={() => setBurstId((current) => (current ?? 0) + 1)} whileTap={reducedMotion ? undefined : { scale: 0.94 }} className="focus-visible:outline-accent relative hidden shrink-0 rotate-[8deg] rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 sm:block">
          <EmojiImage emojiKey="rocket" width={96} height={96} />
          {burstId !== null ? <ClickBurst key={burstId} emojiKey="sparkles" onComplete={() => setBurstId(null)} /> : null}
        </motion.button>
      </div>
    </section>
  );
}
