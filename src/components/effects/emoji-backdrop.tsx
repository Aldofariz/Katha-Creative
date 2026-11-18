"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { usePathname } from "next/navigation";
import type { FloatingEmojiConfig } from "@/data/emoji-presets";
import {
  aboutPreset,
  contactPreset,
  homePreset,
  servicePreset,
  servicesPreset,
} from "@/data/emoji-presets";
import { services } from "@/data/services";
import { EmojiImage } from "@/components/ui/emoji-image";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import { springSnappy } from "@/lib/motion";

type FloatingEmojiProps = {
  config: FloatingEmojiConfig;
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  isMobile: boolean;
  isReducedMotion: boolean;
  isDocumentVisible: boolean;
};

function FloatingEmoji({
  config,
  index,
  pointerX,
  pointerY,
  isMobile,
  isReducedMotion,
  isDocumentVisible,
}: FloatingEmojiProps) {
  const depth = isMobile || isReducedMotion ? 0 : config.depth;
  const targetX = useTransform(
    pointerX,
    [-0.5, 0.5],
    [-28 * depth, 28 * depth],
  );
  const targetY = useTransform(
    pointerY,
    [-0.5, 0.5],
    [-28 * depth, 28 * depth],
  );
  const x = useSpring(targetX, { stiffness: 80, damping: 20 });
  const y = useSpring(targetY, { stiffness: 80, damping: 20 });
  const canAnimate = !isReducedMotion && isDocumentVisible;
  const floatDistance = isMobile ? 6 : 14;
  const rotationAmount = isMobile ? 2 : 4;

  return (
    <motion.div
      aria-hidden="true"
      className={`emoji-parallax absolute will-change-transform ${index >= 8 ? "hidden md:block" : "block"}`}
      style={{ left: `${config.x}%`, top: `${config.y}%`, x, y }}
    >
      <motion.div
        className="emoji-static-under-reduced-motion"
        initial={
          canAnimate
            ? { scale: 0, rotate: -20, opacity: 0 }
            : { scale: 1, rotate: config.rotate, opacity: 0.45 }
        }
        animate={
          canAnimate
            ? {
                scale: 1,
                opacity: 0.45,
                rotate: [
                  config.rotate,
                  config.rotate + rotationAmount,
                  config.rotate,
                ],
                y: [0, -floatDistance, 0],
              }
            : { scale: 1, rotate: config.rotate, y: 0, opacity: 0.45 }
        }
        transition={
          canAnimate
            ? {
                scale: { ...springSnappy, delay: index * 0.04 },
                opacity: { duration: 0.24, delay: index * 0.04 },
                rotate: {
                  duration: config.floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: config.delay,
                },
                y: {
                  duration: config.floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: config.delay,
                },
              }
            : { duration: 0 }
        }
      >
        <EmojiImage
          emojiKey={config.key}
          width={config.size}
          height={config.size}
          preload={index < 6}
        />
      </motion.div>
    </motion.div>
  );
}

export function EmojiBackdrop() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isReducedMotion = useReducedMotionSafe();
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const pointerPosition = useMousePosition(
    !isMobile && !isReducedMotion && isDocumentVisible,
  );

  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  let preset: FloatingEmojiConfig[] = homePreset;
  if (pathname === "/services") preset = servicesPreset;
  if (pathname === "/about") preset = aboutPreset;
  if (pathname === "/contact") preset = contactPreset;
  if (pathname.startsWith("/services/")) {
    const slug = pathname.slice("/services/".length);
    const service = services.find((item) => item.slug === slug);
    if (service) preset = servicePreset(service);
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {preset.slice(0, isMobile ? 8 : 16).map((config, index) => (
        <FloatingEmoji
          key={`${config.key}-${index}`}
          config={config}
          index={index}
          pointerX={pointerPosition.x}
          pointerY={pointerPosition.y}
          isMobile={isMobile}
          isReducedMotion={isReducedMotion}
          isDocumentVisible={isDocumentVisible}
        />
      ))}
    </div>
  );
}
