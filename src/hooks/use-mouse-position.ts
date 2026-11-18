"use client";

import { useEffect } from "react";
import { useMotionValue } from "motion/react";

export function useMousePosition(enabled: boolean) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!enabled) return;

    const onPointerMove = (event: PointerEvent) => {
      const viewportWidth = window.innerWidth || 1;
      const viewportHeight = window.innerHeight || 1;
      x.set(event.clientX / viewportWidth - 0.5);
      y.set(event.clientY / viewportHeight - 0.5);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [enabled, x, y]);

  return { x, y };
}
