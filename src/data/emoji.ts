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
  | "heart"
  | "fire"
  | "star"
  | "thumbs-up"
  | "party-popper"
  | "light-bulb"
  | "chart-increasing"
  | "money-bag"
  | "eyes"
  | "camera"
  | "speech-balloon"
  | "trophy"
  | "bullseye"
  | "crystal-ball";

export const emoji: Record<EmojiKey, { src: string; label: string }> = {
  rocket: { src: "/emoji/rocket.webp", label: "rocket" },
  sparkles: { src: "/emoji/sparkles.webp", label: "sparkles" },
  "sweat-smile": {
    src: "/emoji/sweat-smile.webp",
    label: "grinning face with sweat",
  },
  megaphone: { src: "/emoji/megaphone.webp", label: "megaphone" },
  magnifier: { src: "/emoji/magnifier.webp", label: "magnifying glass" },
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
  heart: { src: "/emoji/heart.webp", label: "heart" },
  fire: { src: "/emoji/fire.webp", label: "fire" },
  star: { src: "/emoji/star.webp", label: "star" },
  "thumbs-up": { src: "/emoji/thumbs-up.webp", label: "thumbs up" },
  "party-popper": {
    src: "/emoji/party-popper.webp",
    label: "party popper",
  },
  "light-bulb": { src: "/emoji/light-bulb.webp", label: "light bulb" },
  "chart-increasing": {
    src: "/emoji/chart-increasing.webp",
    label: "chart increasing",
  },
  "money-bag": { src: "/emoji/money-bag.webp", label: "money bag" },
  eyes: { src: "/emoji/eyes.webp", label: "eyes" },
  camera: { src: "/emoji/camera.webp", label: "camera" },
  "speech-balloon": {
    src: "/emoji/speech-balloon.webp",
    label: "speech balloon",
  },
  trophy: { src: "/emoji/trophy.webp", label: "trophy" },
  bullseye: { src: "/emoji/bullseye.webp", label: "bullseye" },
  "crystal-ball": { src: "/emoji/crystal-ball.webp", label: "crystal ball" },
};

export const emojiKeys = Object.keys(emoji) as EmojiKey[];
