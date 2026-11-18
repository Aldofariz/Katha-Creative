"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WindowCard } from "@/components/ui/window-card";
import { team } from "@/data/team";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

const initialMember = team[0]?.name ?? "";

export function TeamGrid() {
  const [activeName, setActiveName] = useState(initialMember);
  const reducedMotion = useReducedMotionSafe();
  const activeMember = team.find((member) => member.name === activeName) ?? team[0];

  if (!activeMember) return null;

  const peopleList = (
    <nav aria-label="Team members" className="space-y-1">
      {team.map((member) => {
        const active = member.name === activeName;
        return (
          <button key={member.name} type="button" aria-pressed={active} onClick={() => setActiveName(member.name)} className={`focus-visible:outline-accent flex min-h-10 w-full items-center rounded-md px-2 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${active ? "bg-accent-wash text-accent font-semibold" : "text-ink-soft hover:bg-white/70 hover:text-ink"}`}>
            {member.name}
          </button>
        );
      })}
    </nav>
  );

  const initials = activeMember.name.split(" ").map((part) => part[0]).join("");

  return (
    <section aria-labelledby="team-title" className="bg-surface">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-12">
        <h2 id="team-title" className="font-sans text-h2 mb-8">The people behind the stories</h2>
        <div className="mb-3 overflow-x-auto md:hidden">
          <div className="flex w-max min-w-full gap-2 pb-2">{team.map((member) => (
            <button key={member.name} type="button" aria-pressed={activeName === member.name} onClick={() => setActiveName(member.name)} className={`focus-visible:outline-accent min-h-10 shrink-0 rounded-lg border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 ${activeName === member.name ? "border-accent bg-accent text-white" : "border-line bg-white text-ink-soft"}`}>
              {member.name.split(" ")[0]}
            </button>
          ))}</div>
        </div>
        <WindowCard title="Contacts" sidebar={peopleList} sidebarClassName="hidden md:block" bodyClassName="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={activeMember.name} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.15 }} className="flex flex-col items-center text-center">
                <span aria-hidden="true" className="bg-accent-wash text-accent grid size-20 place-items-center rounded-[22.37%] text-2xl font-semibold">{initials}</span>
                <h3 className="font-sans text-h3 mt-5">{activeMember.name}</h3>
                <p className="text-ink-soft mt-1">{activeMember.role}</p>
                <p className="text-ink-soft mt-5 max-w-md">{activeMember.funFact}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </WindowCard>
      </div>
    </section>
  );
}
