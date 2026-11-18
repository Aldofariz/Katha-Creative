"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { AppIcon } from "@/components/ui/app-icon";
import { WindowCard } from "@/components/ui/window-card";
import { services } from "@/data/services";
import type { ServiceCategory } from "@/types";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

const categories: (ServiceCategory | "All")[] = [
  "All",
  "Advertising",
  "Social",
  "Creative and build",
  "Growth and learning",
];

const MotionLink = motion.create(Link);

export function ServicesFinder() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "All">("All");
  const reducedMotion = useReducedMotionSafe();
  const visibleServices = activeCategory === "All"
    ? services
    : services.filter((service) => service.category === activeCategory);

  function categoryButton(category: ServiceCategory | "All") {
    const active = activeCategory === category;
    return (
      <button
        key={category}
        type="button"
        aria-pressed={active}
        onClick={() => setActiveCategory(category)}
        className={`focus-visible:outline-accent flex min-h-9 w-full items-center rounded-md px-2 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${active ? "bg-accent-wash text-accent font-semibold" : "text-ink-soft hover:bg-white/70 hover:text-ink"}`}
      >
        {category}
      </button>
    );
  }

  const sidebar = (
    <div>
      <p className="text-ink-soft mb-2 px-2 text-xs font-semibold">Favorites</p>
      <nav aria-label="Filter services" className="space-y-1">
        {categories.map(categoryButton)}
      </nav>
    </div>
  );

  const toolbar = (
    <div className="text-ink-soft flex items-center gap-2 pr-2 text-xs sm:text-sm">
      <Search aria-hidden="true" className="size-4" />
      <span>{visibleServices.length} {visibleServices.length === 1 ? "item" : "items"}</span>
    </div>
  );

  return (
    <section aria-label="Browse services" className="mx-auto w-full max-w-7xl px-5 pb-14 md:px-8 lg:px-12">
      <div className="mb-3 overflow-x-auto md:hidden">
        <nav aria-label="Filter services" className="flex w-max min-w-full gap-2 pb-2">
          {categories.map((category) => {
            const active = activeCategory === category;
            return (
              <button key={category} type="button" aria-pressed={active} onClick={() => setActiveCategory(category)} className={`focus-visible:outline-accent min-h-10 shrink-0 rounded-lg border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 ${active ? "border-accent bg-accent text-white" : "border-line text-ink-soft bg-white"}`}>
                {category}
              </button>
            );
          })}
        </nav>
      </div>
      <WindowCard title="Services" sidebar={sidebar} sidebarClassName="hidden md:block" toolbar={toolbar} bodyClassName="p-0">
        <div className="hidden grid-cols-[minmax(180px,1.1fr)_minmax(110px,0.7fr)_minmax(200px,1.5fr)] gap-4 border-b border-line px-4 py-2 text-xs font-semibold text-ink-soft md:grid">
          <span>Name</span><span>Kind</span><span>Description</span>
        </div>
        <ul aria-label="Services list" className="divide-line divide-y">
          <AnimatePresence initial={false}>
            {visibleServices.map((service) => (
              <motion.li key={service.slug} layout transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reducedMotion ? undefined : { opacity: 0 }}>
                <MotionLink href={`/services/${service.slug}`} className="focus-visible:bg-accent focus-visible:text-white group grid min-h-[68px] grid-cols-[minmax(0,1fr)] items-center gap-2 px-4 py-3 text-ink transition-colors hover:bg-accent-wash focus-visible:outline-none md:grid-cols-[minmax(180px,1.1fr)_minmax(110px,0.7fr)_minmax(200px,1.5fr)] md:gap-4">
                  <span className="flex min-w-0 items-center gap-3">
                    <AppIcon accent={service.accent} emojiKey={service.emoji} size={24} />
                    <span className="truncate text-sm font-semibold">{service.title}</span>
                  </span>
                  <span className="text-small text-ink-soft hidden md:block group-focus-visible:text-white">{service.category}</span>
                  <span className="text-small text-ink-soft line-clamp-2 group-focus-visible:text-white">{service.summary}</span>
                </MotionLink>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </WindowCard>
    </section>
  );
}
