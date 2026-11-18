import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/cta-banner";
import { NotSureBlock } from "@/components/sections/services/not-sure-block";
import { ServiceListCard } from "@/components/sections/services/service-list-card";
import { EmojiImage } from "@/components/ui/emoji-image";
import { services } from "@/data/services";
import type { ServiceCategory } from "@/types";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Katha Creative's advertising, social, creative, and growth services.",
};

const categories: ServiceCategory[] = [
  "Advertising",
  "Social",
  "Creative and build",
  "Growth and learning",
];

export default function ServicesPage() {
  return (
    <main className="relative z-10 flex-1">
      <header className="relative mx-auto flex min-h-[340px] w-full max-w-7xl items-center px-5 py-16 md:px-8 lg:px-12">
        <div className="relative z-[1] max-w-3xl">
          <h1 className="font-heading text-display">
            Services for a story worth sharing
          </h1>
          <p className="text-body-lg text-ink-soft mt-5 max-w-prose">
            Eight services, one team. Pick one or let us build the whole plan.
          </p>
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-12 right-[10%] rotate-12 opacity-80"
        >
          <EmojiImage emojiKey="sparkles" width={88} height={88} />
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[28%] bottom-8 -rotate-12 opacity-70"
        >
          <EmojiImage emojiKey="megaphone" width={62} height={62} />
        </span>
      </header>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-5 pb-8 md:px-8 lg:px-12">
        {categories.map((category) => {
          const categoryServices = services.filter(
            (service) => service.category === category,
          );
          return (
            <section
              key={category}
              aria-labelledby={`category-${category.replaceAll(" ", "-")}`}
            >
              <h2
                id={`category-${category.replaceAll(" ", "-")}`}
                className="font-heading text-h2 mb-6"
              >
                {category}
              </h2>
              <div className="grid gap-4">
                {categoryServices.map((service) => (
                  <ServiceListCard key={service.slug} service={service} />
                ))}
              </div>
            </section>
          );
        })}
        <NotSureBlock />
      </div>
      <CtaBanner />
    </main>
  );
}
