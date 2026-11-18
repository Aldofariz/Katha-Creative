"use client";

import { motion } from "motion/react";
import { WindowCard } from "@/components/ui/window-card";
import { team } from "@/data/team";
import type { AccentColor } from "@/types";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

const avatarColors: Record<AccentColor, string> = {
  pink: "bg-pink/35",
  yellow: "bg-yellow/45",
  mint: "bg-mint/40",
  sky: "bg-sky/35",
  coral: "bg-coral/35",
  lilac: "bg-lilac/40",
  lime: "bg-lime/40",
  peach: "bg-peach/45",
};

export function TeamGrid() {
  const reducedMotion = useReducedMotionSafe();

  return (
    <section
      aria-labelledby="team-title"
      className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-12"
    >
      <h2 id="team-title" className="font-heading text-h2 mb-8">
        The people behind the stories
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {team.map((member, index) => {
          const initials = member.name
            .split(" ")
            .map((part) => part[0])
            .join("");
          return (
            <motion.div
              key={member.name}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: reducedMotion ? 0 : 0.5,
                delay: reducedMotion ? 0 : (index % 3) * 0.06,
              }}
            >
              <WindowCard
                title={`${member.name.toLowerCase().split(" ")[0]}.profile`}
              >
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className={`font-heading grid size-14 place-items-center rounded-2xl text-lg font-bold ${avatarColors[member.accent]}`}
                  >
                    {initials}
                  </span>
                  <div>
                    <h3 className="font-heading text-h3">{member.name}</h3>
                    <p className="text-small text-ink-soft">{member.role}</p>
                  </div>
                </div>
                <p className="text-small text-ink-soft mt-5">
                  {member.funFact}
                </p>
              </WindowCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
