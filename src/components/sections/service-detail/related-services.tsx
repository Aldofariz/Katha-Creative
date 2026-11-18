import Link from "next/link";
import { AppIcon } from "@/components/ui/app-icon";
import { services } from "@/data/services";
import type { Service } from "@/types";

export function RelatedServices({ service }: { service: Service }) {
  const relatedServices = service.related
    .map((slug) => services.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is Service => candidate !== undefined);

  return (
    <section aria-labelledby="related-title" className="bg-surface">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 lg:px-12">
        <h2 id="related-title" className="font-heading text-h2 mb-7">Related services</h2>
        <ul className="border-line border-t md:grid md:grid-cols-3 md:divide-x md:divide-line">
          {relatedServices.map((related) => (
            <li key={related.slug} className="border-line border-b md:border-b-0 md:px-5 md:first:pl-0 md:last:pr-0">
              <Link href={`/services/${related.slug}`} className="focus-visible:bg-accent focus-visible:text-white group flex min-h-24 items-center gap-3 py-4 focus-visible:outline-none md:pr-3">
                <AppIcon accent={related.accent} emojiKey={related.emoji} size={40} />
                <span className="min-w-0">
                  <span className="block font-semibold">{related.title}</span>
                  <span className="text-small text-ink-soft line-clamp-2 group-focus-visible:text-white">{related.tagline}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
