"use client";

import { useEffect, useRef } from "react";
import type { PointerEventHandler, RefObject } from "react";

type SpotlightPointerProps = {
  ref: RefObject<HTMLDivElement | null>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerLeave: PointerEventHandler<HTMLDivElement>;
};

export function useSpotlight(): SpotlightPointerProps {
  const elementRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      element.style.setProperty("--mx", `${x}%`);
      element.style.setProperty("--my", `${y}%`);
      frameRef.current = null;
    });
  };

  const onPointerLeave: PointerEventHandler<HTMLDivElement> = (event) => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    event.currentTarget.style.removeProperty("--mx");
    event.currentTarget.style.removeProperty("--my");
  };

  return {
    ref: elementRef,
    onPointerMove,
    onPointerLeave,
  };
}

export function Spotlight() {
  return (
    <span
      aria-hidden="true"
      className="spotlight-glow pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), rgb(255 255 255 / 0.9), transparent 60%)",
      }}
    />
  );
}
