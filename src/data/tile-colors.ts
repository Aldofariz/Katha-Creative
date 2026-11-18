import type { AccentColor } from "@/types";

export const tileColors: Record<AccentColor, { top: string; bottom: string }> =
  {
    sky: { top: "#6cb6ff", bottom: "#2f80ed" },
    lilac: { top: "#a99bff", bottom: "#6b5ce6" },
    pink: { top: "#ff8fb1", bottom: "#e8457a" },
    coral: { top: "#ff9a76", bottom: "#e8603a" },
    yellow: { top: "#ffd96b", bottom: "#f2b01e" },
    mint: { top: "#6be3c3", bottom: "#1fb58f" },
    peach: { top: "#ffc083", bottom: "#f08a2c" },
    lime: { top: "#b6e36b", bottom: "#6bbf2f" },
  };
