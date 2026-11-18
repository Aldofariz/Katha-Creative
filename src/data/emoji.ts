export type EmojiKey =
  | "rocket"
  | "sparkles"
  | "sweat-smile"
  | "megaphone"
  | "magnifier"
  | "mobile-phone"
  | "graduation-cap"
  | "laptop"
  | "handshake"
  | "artist-palette"
  | "chart-increasing"
  | "speech-balloon";

export const emoji: Record<EmojiKey, { src: string; label: string }> = {
  rocket: { src: "/emoji/rocket.webp", label: "rocket" },
  sparkles: { src: "/emoji/sparkles.webp", label: "sparkles" },
  "sweat-smile": {
    src: "/emoji/sweat-smile.webp",
    label: "grinning face with sweat",
  },
  megaphone: { src: "/emoji/megaphone.webp", label: "megaphone" },
  magnifier: { src: "/emoji/magnifier.webp", label: "magnifier" },
  "mobile-phone": { src: "/emoji/mobile-phone.webp", label: "mobile phone" },
  "graduation-cap": {
    src: "/emoji/graduation-cap.webp",
    label: "graduation cap",
  },
  laptop: { src: "/emoji/laptop.webp", label: "laptop" },
  handshake: { src: "/emoji/handshake.webp", label: "handshake" },
  "artist-palette": {
    src: "/emoji/artist-palette.webp",
    label: "artist palette",
  },
  "chart-increasing": {
    src: "/emoji/chart-increasing.webp",
    label: "chart increasing",
  },
  "speech-balloon": {
    src: "/emoji/speech-balloon.webp",
    label: "speech balloon",
  },
};
