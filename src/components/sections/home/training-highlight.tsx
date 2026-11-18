"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { WindowCard } from "@/components/ui/window-card";
import { buttonClassNames } from "@/lib/button-styles";
import { services } from "@/data/services";

export function TrainingHighlight() {
  const [checked, setChecked] = useState<number[]>([]);
  const training = services.find((service) => service.slug === "digital-marketing-training");
  if (!training?.curriculum || !training.program) return null;

  function toggleModule(index: number) {
    setChecked((current) => current.includes(index)
      ? current.filter((item) => item !== index)
      : [...current, index]);
  }

  return (
    <section className="bg-surface">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24 lg:px-12">
        <div>
          <p className="text-small text-accent mb-3 font-semibold">A little hands-on learning</p>
          <h2 className="font-heading text-h2">Want to do this yourself? Learn with us.</h2>
          <p className="text-body-lg text-ink-soft mt-5 max-w-prose">{training.summary}</p>
          <ul className="text-small text-ink-soft mt-6 space-y-2">
            <li>For career switchers, small business owners, and fresh graduates.</li>
            <li>{training.program.duration} &middot; {training.program.format}.</li>
          </ul>
          <Link href={`/services/${training.slug}`} className={buttonClassNames("primary", "md", "mt-8")}>
            Explore the training program
          </Link>
        </div>
        <div className="px-0 sm:px-8">
          <WindowCard title="Reminders" bodyClassName="p-5 sm:p-6">
            <h3 className="font-heading text-h3 mb-2">Six modules, one portfolio</h3>
            <p className="text-small text-ink-soft mb-4">Your training plan</p>
            <ol className="divide-line divide-y">
              {training.curriculum.map((item, index) => {
                const isChecked = checked.includes(index);
                return (
                  <li key={item.module}>
                    <button type="button" aria-pressed={isChecked} onClick={() => toggleModule(index)} className="focus-visible:outline-accent flex min-h-14 w-full items-center gap-3 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px]">
                      <span className={`grid size-5 shrink-0 place-items-center rounded-full border transition-colors ${isChecked ? "border-accent bg-accent text-white" : "border-line-strong text-transparent"}`}>
                        <Check aria-hidden="true" className="size-3" />
                      </span>
                      <span className={`text-small transition-opacity ${isChecked ? "text-ink-soft opacity-60 line-through" : ""}`}>
                        <strong>{item.module}</strong><span className="text-ink-soft"> &mdash; {item.topics}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </WindowCard>
        </div>
      </div>
    </section>
  );
}
