import type { EmojiKey } from "@/data/emoji";
import type { Service } from "@/types";

export type FloatingEmojiConfig = {
  key: EmojiKey;
  x: number;
  y: number;
  size: number;
  depth: number;
  rotate: number;
  floatDuration: number;
  delay: number;
};

const positions = [
  [6, 12, 62, 0.45, -8, 7.2, 0],
  [92, 17, 74, 0.9, 12, 8.4, 0.8],
  [13, 43, 54, 0.35, 6, 6.6, 1.6],
  [87, 48, 80, 1.1, -14, 9.1, 2.4],
  [5, 81, 68, 0.8, 10, 7.8, 3.2],
  [95, 83, 52, 0.3, -6, 10.2, 4],
  [35, 6, 44, 0.4, 14, 8.8, 0.4],
  [67, 9, 60, 0.6, -12, 6.2, 1.2],
  [28, 92, 72, 0.85, -4, 9.6, 2],
  [74, 91, 56, 0.4, 8, 7.4, 2.8],
  [2, 33, 48, 0.35, -16, 8.1, 3.6],
  [98, 35, 64, 0.75, 4, 10.8, 4.4],
  [18, 65, 58, 0.65, 16, 6.9, 0.6],
  [82, 68, 46, 0.3, -10, 9.9, 1.4],
  [43, 96, 50, 0.25, 5, 7.6, 2.2],
  [59, 3, 54, 0.45, -4, 8.6, 3],
] as const;

function createPreset(keys: readonly EmojiKey[]): FloatingEmojiConfig[] {
  return keys.map((key, index) => {
    const position = positions[index % positions.length];
    if (!position) throw new Error("Emoji preset position is missing.");

    const [x, y, size, depth, rotate, floatDuration, delay] = position;
    return { key, x, y, size, depth, rotate, floatDuration, delay };
  });
}

export const homePreset = createPreset([
  "rocket",
  "sparkles",
  "megaphone",
  "magnifier",
  "mobile-phone",
  "graduation-cap",
  "heart",
  "fire",
  "star",
  "thumbs-up",
  "party-popper",
  "light-bulb",
  "chart-increasing",
  "money-bag",
  "eyes",
  "camera",
]);

export const servicesPreset = createPreset([
  "magnifier",
  "megaphone",
  "mobile-phone",
  "rocket",
  "graduation-cap",
  "laptop",
  "handshake",
  "artist-palette",
  "sparkles",
  "heart",
  "star",
  "thumbs-up",
  "party-popper",
  "light-bulb",
  "chart-increasing",
  "trophy",
]);

export const aboutPreset = createPreset([
  "sparkles",
  "speech-balloon",
  "camera",
  "heart",
  "star",
  "party-popper",
  "artist-palette",
  "handshake",
  "fire",
  "thumbs-up",
  "light-bulb",
  "chart-increasing",
  "eyes",
  "trophy",
  "bullseye",
  "crystal-ball",
]);

export const contactPreset = createPreset([
  "speech-balloon",
  "sparkles",
  "heart",
  "eyes",
  "thumbs-up",
  "rocket",
  "star",
  "party-popper",
  "megaphone",
  "fire",
  "light-bulb",
  "chart-increasing",
  "money-bag",
  "camera",
  "trophy",
  "crystal-ball",
]);

const serviceDecorations: readonly EmojiKey[] = [
  "sparkles",
  "star",
  "heart",
  "thumbs-up",
  "eyes",
  "party-popper",
  "bullseye",
];

export function servicePreset(
  service: Pick<Service, "emoji">,
): FloatingEmojiConfig[] {
  const [hero, ...decorations] = createPreset([
    service.emoji,
    ...serviceDecorations,
  ]);
  if (!hero) return [];

  return [
    { ...hero, x: 86, y: 23, size: 120, depth: 0.7, rotate: -8 },
    ...decorations,
  ];
}
