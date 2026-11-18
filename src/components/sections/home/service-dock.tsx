"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import {
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
  motion,
  type MotionValue,
} from "motion/react";
import { Mail } from "lucide-react";
import { AppIcon } from "@/components/ui/app-icon";
import type { Service } from "@/types";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

const BASE_SIZE = 56;
const MAX_SIZE = 88;
const MAGNIFICATION_RANGE = 150;
const MouseXContext = createContext<MotionValue<number> | null>(null);

type DockIconProps = {
  service: Service;
  expanded: boolean;
  bounceToken: number;
  onOpen: (service: Service) => void;
  onRegister: (slug: string, node: HTMLButtonElement | null) => void;
};

function DockIcon({
  service,
  expanded,
  bounceToken,
  onOpen,
  onRegister,
}: DockIconProps) {
  const mouseX = useContext(MouseXContext)!;
  const reducedMotion = useReducedMotionSafe();
  const controls = useAnimationControls();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const target = useTransform(mouseX, (x) => {
    if (reducedMotion || !Number.isFinite(x)) return BASE_SIZE;
    const bounds = buttonRef.current?.getBoundingClientRect();
    if (!bounds) return BASE_SIZE;
    const distance = Math.abs(x - bounds.left - bounds.width / 2);
    if (distance >= MAGNIFICATION_RANGE) return BASE_SIZE;
    return MAX_SIZE - (distance / MAGNIFICATION_RANGE) * (MAX_SIZE - BASE_SIZE);
  });
  const size = useSpring(target, {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });

  useEffect(() => {
    if (reducedMotion || bounceToken === 0) {
      void controls.start({ y: 0, transition: { duration: 0 } });
      return;
    }
    void controls.start({
      y: [0, -22, 0, -12, 0],
      transition: { duration: 0.7, times: [0, 0.25, 0.5, 0.72, 1] },
    });
  }, [bounceToken, controls, reducedMotion]);

  return (
    <div className="relative flex flex-col items-center justify-end">
      <motion.button
        ref={(node) => {
          buttonRef.current = node;
          onRegister(service.slug, node);
        }}
        data-dock-item="true"
        data-dock-slug={service.slug}
        type="button"
        aria-label={service.title}
        aria-expanded={expanded}
        onClick={() => onOpen(service)}
        animate={controls}
        style={{ width: size, height: size }}
        className="group/dock-icon focus-visible:outline-accent relative flex shrink-0 items-center justify-center rounded-[22.37%] focus-visible:scale-[1.286] focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <AppIcon
          accent={service.accent}
          emojiKey={service.emoji}
          size="100%"
          className="pointer-events-none"
        />
        <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 translate-y-1 rounded-[6px] bg-[rgb(30_30_30_/_0.85)] px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-all delay-75 duration-100 group-hover/dock-icon:translate-y-0 group-hover/dock-icon:opacity-100 group-focus-visible/dock-icon:translate-y-0 group-focus-visible/dock-icon:opacity-100">
          {service.title}
        </span>
      </motion.button>
      {expanded ? (
        <span
          aria-hidden="true"
          className="bg-ink/60 absolute -bottom-2 size-1 rounded-full"
        />
      ) : null}
    </div>
  );
}

function ContactDockIcon() {
  const mouseX = useContext(MouseXContext)!;
  const reducedMotion = useReducedMotionSafe();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const target = useTransform(mouseX, (x) => {
    if (reducedMotion || !Number.isFinite(x)) return BASE_SIZE;
    const bounds = linkRef.current?.getBoundingClientRect();
    if (!bounds) return BASE_SIZE;
    const distance = Math.abs(x - bounds.left - bounds.width / 2);
    if (distance >= MAGNIFICATION_RANGE) return BASE_SIZE;
    return MAX_SIZE - (distance / MAGNIFICATION_RANGE) * (MAX_SIZE - BASE_SIZE);
  });
  const size = useSpring(target, { mass: 0.1, stiffness: 170, damping: 14 });

  return (
    <motion.a
      ref={linkRef}
      href="/contact"
      data-dock-item="true"
      aria-label="Contact"
      style={{ width: size, height: size }}
      className="group/dock-icon focus-visible:outline-accent relative flex shrink-0 items-center justify-center rounded-[22.37%] focus-visible:scale-[1.286] focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <AppIcon
        accent="sky"
        emojiKey="speech-balloon"
        iconOverride={Mail}
        size="100%"
        className="pointer-events-none"
      />
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 translate-y-1 rounded-[6px] bg-[rgb(30_30_30_/_0.85)] px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-all delay-75 duration-100 group-hover/dock-icon:translate-y-0 group-hover/dock-icon:opacity-100 group-focus-visible/dock-icon:translate-y-0 group-focus-visible/dock-icon:opacity-100">
        Contact
      </span>
    </motion.a>
  );
}

type ServiceDockProps = {
  services: Service[];
  openSlug: string | null;
  bounceTarget: { slug: string; token: number };
  onOpen: (service: Service) => void;
  onRegister: (slug: string, node: HTMLButtonElement | null) => void;
};

export function ServiceDock({
  services,
  openSlug,
  bounceTarget,
  onOpen,
  onRegister,
}: ServiceDockProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <MouseXContext.Provider value={mouseX}>
      <div
        role="toolbar"
        aria-label="Services"
        className="vibrancy flex items-end gap-2 rounded-[22px] border border-white/60 p-2 shadow-[0_0_0_0.5px_rgb(0_0_0_/_0.12),0_8px_24px_rgb(0_0_0_/_0.12)]"
        style={{ background: "rgb(255 255 255 / 0.55)" }}
        onPointerMove={(event) => {
          if (event.pointerType === "mouse") mouseX.set(event.clientX);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse")
            mouseX.set(Number.POSITIVE_INFINITY);
        }}
        onKeyDown={(event) => {
          if (
            ![
              "ArrowLeft",
              "ArrowRight",
              "ArrowUp",
              "ArrowDown",
              "Home",
              "End",
            ].includes(event.key)
          )
            return;
          const items = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "[data-dock-item='true']",
            ),
          );
          const current = items.indexOf(document.activeElement as HTMLElement);
          let next = current;
          if (event.key === "ArrowLeft" || event.key === "ArrowUp")
            next = (current - 1 + items.length) % items.length;
          if (event.key === "ArrowRight" || event.key === "ArrowDown")
            next = (current + 1) % items.length;
          if (event.key === "Home") next = 0;
          if (event.key === "End") next = items.length - 1;
          event.preventDefault();
          items[next]?.focus();
        }}
      >
        {services.map((service) => (
          <DockIcon
            key={service.slug}
            service={service}
            expanded={openSlug === service.slug}
            bounceToken={
              bounceTarget.slug === service.slug ? bounceTarget.token : 0
            }
            onOpen={onOpen}
            onRegister={onRegister}
          />
        ))}
        <span
          aria-hidden="true"
          className="bg-ink/15 mx-0.5 h-12 w-px self-center"
        />
        <ContactDockIcon />
      </div>
    </MouseXContext.Provider>
  );
}
