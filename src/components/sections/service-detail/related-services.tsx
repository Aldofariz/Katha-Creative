import Link from "next/link";
import { EmojiImage } from "@/components/ui/emoji-image";
import { WindowCard } from "@/components/ui/window-card";
import { services } from "@/data/services";
import type { Service } from "@/types";

export function RelatedServices({ service }: { service: Service }) {
  const relatedServices = service.related
    .map((slug) => services.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is Service => candidate !== undefined);

  return (
    <section
      aria-labelledby="related-title"
      className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 lg:px-12"
    >
      <h2 id="related-title" className="font-heading text-h2 mb-7">
        Related services
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {relatedServices.map((related) => (
          <Link
            key={related.slug}
            href={`/services/${related.slug}`}
            className="rounded-window focus-visible:outline-brand block focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <WindowCard
              title={related.name}
              className="h-full transition-transform hover:-translate-y-1"
            >
              <EmojiImage emojiKey={related.emoji} width={52} height={52} />
              <h3 className="font-heading text-h3 mt-3">{related.title}</h3>
              <p className="text-small text-ink-soft mt-2">{related.tagline}</p>
            </WindowCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
