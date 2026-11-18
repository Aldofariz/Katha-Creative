import Link from "next/link";
import { EmojiImage } from "@/components/ui/emoji-image";
import { buttonClassNames } from "@/lib/button-styles";
import type { Service } from "@/types";

const accentGlow: Record<Service["accent"], string> = {
  pink: "bg-pink/40",
  yellow: "bg-yellow/45",
  mint: "bg-mint/45",
  sky: "bg-sky/40",
  coral: "bg-coral/40",
  lilac: "bg-lilac/45",
  lime: "bg-lime/45",
  peach: "bg-peach/45",
};

export function ServiceHero({ service }: { service: Service }) {
  return (
    <header className="relative mx-auto grid min-h-[460px] w-full max-w-7xl items-center gap-8 overflow-hidden px-5 py-14 md:grid-cols-[1fr_auto] md:px-8 lg:px-12">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/4 right-8 -z-0 size-64 rounded-full opacity-60 blur-3xl ${accentGlow[service.accent]}`}
      />
      <div className="relative z-[1] max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-small text-ink-soft mb-5">
          <Link href="/services" className="underline-offset-4 hover:underline">
            Services
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{service.title}</span>
        </nav>
        <p className="text-brand mb-3 font-semibold">{service.tagline}</p>
        <h1 className="font-heading text-display">{service.title}</h1>
        <p className="text-body-lg text-ink-soft mt-5 max-w-prose">
          {service.summary}
        </p>
        <Link
          href={`/contact?service=${service.slug}`}
          className={buttonClassNames("primary", "lg", "mt-8")}
        >
          Start a project
        </Link>
      </div>
      <div
        aria-hidden="true"
        className="relative z-[1] mx-auto rotate-[-7deg] rounded-[32px] border border-white/80 bg-white/55 p-6 shadow-xl md:mr-8"
      >
        <EmojiImage emojiKey={service.emoji} width={144} height={144} preload />
      </div>
    </header>
  );
}
