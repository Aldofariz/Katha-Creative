import {
  GraduationCap,
  Handshake,
  Laptop,
  Megaphone,
  Palette,
  Rocket,
  Search,
  Smartphone,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import type { EmojiKey } from "@/data/emoji";
import { tileColors } from "@/data/tile-colors";
import { EmojiImage } from "@/components/ui/emoji-image";
import type { AccentColor } from "@/types";
import { cn } from "@/lib/cn";

export const APP_ICON_GLYPH: "emoji" | "lucide" = "lucide";

const lineGlyphs: Partial<Record<EmojiKey, LucideIcon>> = {
  magnifier: Search,
  megaphone: Megaphone,
  "mobile-phone": Smartphone,
  rocket: Rocket,
  "graduation-cap": GraduationCap,
  laptop: Laptop,
  handshake: Handshake,
  "artist-palette": Palette,
  sparkles: Sparkles,
};

type AppIconProps = {
  accent: AccentColor;
  emojiKey: EmojiKey;
  iconOverride?: LucideIcon;
  size?: number | `${number}%`;
  className?: string;
};

export function AppIcon({
  accent,
  emojiKey,
  iconOverride,
  size = 56,
  className,
}: AppIconProps) {
  const colors = tileColors[accent];
  const style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: "22.37%",
    background: `linear-gradient(180deg, ${colors.top}, ${colors.bottom})`,
    boxShadow:
      "inset 0 1px 0 rgb(255 255 255 / 0.5), 0 1px 2px rgb(0 0 0 / 0.2)",
  };

  const Glyph = iconOverride ?? lineGlyphs[emojiKey] ?? Sparkles;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        className,
      )}
      style={style}
    >
      {APP_ICON_GLYPH === "emoji" && !iconOverride ? (
        <EmojiImage
          emojiKey={emojiKey}
          width={56}
          height={56}
          className="size-[58%] [filter:drop-shadow(0_1px_1px_rgb(0_0_0_/_0.2))]"
        />
      ) : (
        <Glyph strokeWidth={1.8} className="size-[58%] text-white" />
      )}
    </span>
  );
}
