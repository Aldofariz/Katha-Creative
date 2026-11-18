"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { motion, useAnimationControls } from "motion/react";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { ClickBurst } from "@/components/effects/click-burst";
import { EmojiImage } from "@/components/ui/emoji-image";
import { emoji, type EmojiKey } from "@/data/emoji";
import { springSoft } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";

const messages = [
  { variant: "received", text: "hey katha, our ads are burning cash 😅" },
  { variant: "sent", text: "send us the numbers. we'll find the leak." },
  { variant: "received", text: "and then?" },
  { variant: "sent", text: "then we make it sing. 🚀" },
] as const;

const heroEmojis: { key: EmojiKey; position: string; size: number }[] = [
  { key: "rocket", position: "left-[4%] top-[12%]", size: 78 },
  { key: "sparkles", position: "right-[6%] top-[9%]", size: 68 },
  { key: "megaphone", position: "right-[2%] bottom-[16%]", size: 76 },
  { key: "heart", position: "left-[8%] bottom-[10%]", size: 62 },
  { key: "star", position: "left-[1%] top-[48%]", size: 54 },
];

type HeroEmojiProps = {
  emojiKey: EmojiKey;
  position: string;
  size: number;
  index: number;
  reducedMotion: boolean;
  register: (node: HTMLSpanElement | null) => void;
};

function HeroEmoji({
  emojiKey,
  position,
  size,
  index,
  reducedMotion,
  register,
}: HeroEmojiProps) {
  const controls = useAnimationControls();
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    void controls
      .start({
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: reducedMotion
          ? { duration: 0 }
          : { ...springSoft, delay: index * 0.11 },
      })
      .then(() => {
        if (!reducedMotion) {
          return controls.start({
            y: [0, -8, 0],
            rotate: [0, 2, 0],
            transition: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3,
            },
          });
        }
      });
  }, [controls, index, reducedMotion]);

  const pop = useCallback(async () => {
    if (reducedMotion) return;
    setBurst(true);
    await controls.start({
      scale: [1, 0.7, 1.25, 1],
      transition: { duration: 0.42, ease: "easeOut" },
    });
    await controls.start({
      y: [0, -8, 0],
      rotate: [0, 2, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls, reducedMotion]);

  return (
    <span
      ref={register}
      className={`hero-emoji-repel absolute ${position} z-10 inline-flex`}
      style={{ width: size + 20, height: size + 20 }}
    >
      <motion.button
        type="button"
        aria-label={`Pop ${emoji[emojiKey].label}`}
        className="focus-visible:outline-brand relative grid size-full place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
        initial={reducedMotion ? false : { opacity: 0, scale: 0, rotate: -20 }}
        animate={controls}
        onClick={() => void pop()}
        style={{ touchAction: "manipulation" }}
      >
        <EmojiImage
          emojiKey={emojiKey}
          width={size}
          height={size}
          preload={index < 3}
          className="pointer-events-none drop-shadow-[0_12px_12px_rgb(27_21_53_/_0.12)]"
        />
        {burst ? (
          <ClickBurst emojiKey={emojiKey} onComplete={() => setBurst(false)} />
        ) : null}
      </motion.button>
    </span>
  );
}

export function HeroPlayground() {
  const reducedMotion = useReducedMotionSafe();
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const emojiRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const inViewRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const tickRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (reducedMotion) return;

    const timers = [
      window.setTimeout(() => setTyping(true), 180),
      window.setTimeout(() => {
        setTyping(false);
        setVisibleCount(1);
      }, 350),
      window.setTimeout(() => setVisibleCount(2), 700),
      window.setTimeout(() => setTyping(true), 880),
      window.setTimeout(() => {
        setTyping(false);
        setVisibleCount(3);
      }, 1050),
      window.setTimeout(() => setVisibleCount(4), 1400),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [reducedMotion]);

  const resetRepel = useCallback(() => {
    pointerRef.current = null;
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    emojiRefs.current.forEach((node) => {
      node?.style.setProperty("--repel-x", "0px");
      node?.style.setProperty("--repel-y", "0px");
    });
  }, []);

  useEffect(() => {
    const area = areaRef.current;
    if (!area || reducedMotion) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      inViewRef.current = entry.isIntersecting;
      if (!entry.isIntersecting) resetRepel();
    });
    observer.observe(area);
    return () => observer.disconnect();
  }, [reducedMotion, resetRepel]);

  useEffect(() => {
    if (reducedMotion) return;

    const tick = () => {
      const pointer = pointerRef.current;
      if (pointer && inViewRef.current && window.innerWidth >= 768) {
        emojiRefs.current.forEach((node) => {
          if (!node) return;
          const rect = node.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = centerX - pointer.x;
          const dy = centerY - pointer.y;
          const distance = Math.hypot(dx, dy);
          const force =
            distance < 140 && distance > 0 ? ((140 - distance) / 140) * 40 : 0;
          node.style.setProperty(
            "--repel-x",
            `${(dx / (distance || 1)) * force}px`,
          );
          node.style.setProperty(
            "--repel-y",
            `${(dy / (distance || 1)) * force}px`,
          );
        });
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
      }
    };

    tickRef.current = tick;
    return () => {
      if (frameRef.current !== null)
        window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [reducedMotion]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || window.innerWidth < 768) return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
    if (inViewRef.current && frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(tickRef.current);
    }
  };

  const displayedCount = reducedMotion ? messages.length : visibleCount;

  return (
    <div
      ref={areaRef}
      aria-label="A conversation with Katha Creative"
      className="relative mx-auto flex min-h-[430px] w-full max-w-[620px] items-center justify-center md:min-h-[560px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetRepel}
    >
      <div className="glass relative z-[1] w-full max-w-[420px] rounded-[28px] p-5 shadow-xl sm:p-7">
        <div className="border-line mb-5 flex items-center gap-3 border-b pb-4">
          <span className="bg-brand-wash grid size-10 place-items-center rounded-full">
            <EmojiImage emojiKey="sparkles" width={26} height={26} />
          </span>
          <div>
            <p className="leading-tight font-semibold">Katha Creative</p>
            <p className="text-small text-ink-soft">Usually replies in a day</p>
          </div>
          <span
            aria-hidden="true"
            className="bg-mint ml-auto size-2.5 rounded-full"
          />
        </div>
        <div className="flex min-h-[230px] flex-col gap-3" aria-hidden="true">
          {messages.map((message, index) =>
            index < displayedCount ? (
              <motion.div
                key={message.text}
                initial={
                  reducedMotion ? false : { opacity: 0, scale: 0.92, y: 8 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.32,
                  ease: "easeOut",
                }}
              >
                <ChatBubble variant={message.variant} decorative>
                  {message.text}
                </ChatBubble>
              </motion.div>
            ) : null,
          )}
          {typing && displayedCount < messages.length ? (
            <ChatBubble variant="typing" decorative />
          ) : null}
        </div>
      </div>
      {heroEmojis.map((item, index) => (
        <HeroEmoji
          key={item.key}
          emojiKey={item.key}
          position={item.position}
          size={item.size}
          index={index}
          reducedMotion={reducedMotion}
          register={(node) => {
            emojiRefs.current[index] = node;
          }}
        />
      ))}
      <span
        aria-hidden="true"
        className="bg-pink/40 pointer-events-none absolute top-[20%] left-[18%] -z-0 size-24 rounded-full blur-3xl"
      />
      <span
        aria-hidden="true"
        className="bg-sky/40 pointer-events-none absolute right-[14%] bottom-[15%] -z-0 size-28 rounded-full blur-3xl"
      />
    </div>
  );
}
