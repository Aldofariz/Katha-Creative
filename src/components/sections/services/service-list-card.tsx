import Link from "next/link";
import { EmojiImage } from "@/components/ui/emoji-image";
import { WindowCard } from "@/components/ui/window-card";
import type { Service } from "@/types";

const accentClasses: Record<Service["accent"], string> = {
  pink: "bg-pink/25",
  yellow: "bg-yellow/30",
  mint: "bg-mint/30",
  sky: "bg-sky/25",
  coral: "bg-coral/25",
  lilac: "bg-lilac/25",
  lime: "bg-lime/30",
  peach: "bg-peach/30",
};

export function ServiceListCard({ service }: { service: Service }) {
  const training = service.slug === "digital-marketing-training";

  return (
    <WindowCard
      title={service.name}
      className={training ? "border-brand/20 bg-brand-wash/30" : ""}
      bodyClassName="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6"
    >
      <span
        aria-hidden="true"
        className={`grid size-16 shrink-0 place-items-center rounded-2xl ${accentClasses[service.accent]}`}
      >
        <EmojiImage emojiKey={service.emoji} width={48} height={48} />
      </span>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-h3">{service.title}</h3>
          {training ? (
            <span className="bg-brand-wash rounded-full px-3 py-1 text-xs font-semibold">
              Learn with us
            </span>
          ) : null}
        </div>
        <p className="text-ink-soft mt-1">{service.summary}</p>
        <ul
          className="mt-3 flex flex-wrap gap-2"
          aria-label={`${service.title} highlights`}
        >
          {service.chips.map((chip) => (
            <li
              key={chip}
              className="text-ink-soft border-line rounded-full border bg-white/60 px-2.5 py-1 text-xs"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={`/services/${service.slug}`}
        className="text-small text-brand focus-visible:outline-brand inline-flex min-h-11 shrink-0 items-center font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Learn more<span className="sr-only"> about {service.title}</span>
      </Link>
    </WindowCard>
  );
}
