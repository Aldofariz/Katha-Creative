import Image from "next/image";
import { emoji, type EmojiKey } from "@/data/emoji";
import { cn } from "@/lib/cn";

type EmojiImageProps = {
  emojiKey: EmojiKey;
  width: number;
  height: number;
  alt?: string;
  className?: string;
  priority?: boolean;
};

export function EmojiImage({
  emojiKey,
  width,
  height,
  alt = "",
  className,
  priority = false,
}: EmojiImageProps) {
  const asset = emoji[emojiKey];

  return (
    <Image
      src={asset.src}
      alt={alt}
      width={width}
      height={height}
      className={cn("select-none", className)}
      draggable={false}
      priority={priority}
    />
  );
}
