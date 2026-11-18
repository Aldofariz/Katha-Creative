"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { AppIcon } from "@/components/ui/app-icon";
import { WindowCard } from "@/components/ui/window-card";
import { buttonClassNames } from "@/lib/button-styles";
import { springSnappy } from "@/lib/motion";
import type { Service } from "@/types";

type ServiceDetailsProps = {
  service: Service;
  compact?: boolean;
};

export function ServiceDetails({
  service,
  compact = false,
}: ServiceDetailsProps) {
  return (
    <div className="flex min-h-[340px] flex-col">
      <div className="grid flex-1 gap-7 p-5 sm:p-7 md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex min-w-0 items-start gap-4">
          <AppIcon
            accent={service.accent}
            emojiKey={service.emoji}
            size={compact ? 56 : 72}
          />
          <div className="min-w-0 pt-1">
            <h2 className="font-heading text-[24px] leading-tight font-bold tracking-tight sm:text-[28px]">
              {service.title}
            </h2>
            <p className="text-ink mt-2 font-medium">{service.tagline}</p>
            <p className="text-small text-ink-soft mt-2 max-w-prose leading-relaxed">
              {service.summary}
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-ink text-[13px] font-semibold">
            What&apos;s included
          </h3>
          <ul className="mt-2">
            {service.included.slice(0, 4).map((item) => (
              <li
                key={item.title}
                className="border-line text-ink-soft flex min-h-9 items-center gap-2 border-b py-1.5 text-[13px] last:border-b-0"
              >
                <Check
                  aria-hidden="true"
                  className="text-accent size-4 shrink-0"
                />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-line flex flex-wrap items-center gap-3 border-t px-5 py-4 sm:px-7">
        <Link
          href={`/services/${service.slug}`}
          className={buttonClassNames(
            "primary",
            "md",
            "min-h-10 rounded-md px-4 text-[13px]",
          )}
        >
          Open service page
        </Link>
        <Link
          href={`/contact?service=${service.slug}`}
          className={buttonClassNames(
            "ghost",
            "md",
            "min-h-10 rounded-md px-2 text-[13px]",
          )}
        >
          Start a project
        </Link>
      </div>
    </div>
  );
}

type ServiceWindowProps = {
  service: Service;
  zoomed: boolean;
  reducedMotion: boolean;
  originX: number;
  onClose: () => void;
  onMinimize: () => void;
  onZoom: () => void;
};

export function ServiceWindow({
  service,
  zoomed,
  reducedMotion,
  originX,
  onClose,
  onMinimize,
  onZoom,
}: ServiceWindowProps) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.85, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 24 }}
      transition={reducedMotion ? { duration: 0 } : springSnappy}
      style={{ transformOrigin: `${originX}px 100%` }}
      className={`w-full ${zoomed ? "max-w-[960px]" : "max-w-[760px]"}`}
    >
      <WindowCard
        title={service.name}
        active
        onClose={onClose}
        onMinimize={onMinimize}
        onZoom={onZoom}
        toolbar={<span aria-hidden="true" className="size-5" />}
        className="w-full"
        bodyClassName="p-0"
      >
        <ServiceDetails service={service} />
      </WindowCard>
    </motion.div>
  );
}
