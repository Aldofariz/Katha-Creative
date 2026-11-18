export const springSoft = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.8,
} as const;

export const springSnappy = {
  type: "spring",
  stiffness: 380,
  damping: 26,
} as const;

export const easeOut = [0.22, 1, 0.36, 1] as const;
