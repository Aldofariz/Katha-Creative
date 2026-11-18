import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/ui/accordion";
import { CtaBanner } from "@/components/sections/cta-banner";
import { RelatedServices } from "@/components/sections/service-detail/related-services";
import { ServiceHero } from "@/components/sections/service-detail/service-hero";
import { ServiceOverview } from "@/components/sections/service-detail/service-overview";
import { services } from "@/data/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.summary,
    openGraph: {
      title: `${service.title} | Katha Creative`,
      description: service.summary,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <main className="relative z-10 flex-1">
      <ServiceHero service={service} />
      <ServiceOverview service={service} />
      <section
        aria-labelledby="service-faq-title"
        className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-12 md:grid-cols-[0.7fr_1.3fr] md:px-8 lg:px-12"
      >
        <h2 id="service-faq-title" className="font-heading text-h2">
          Questions, answered
        </h2>
        <Accordion items={service.faqs} />
      </section>
      <RelatedServices service={service} />
      <CtaBanner title={`Ready to get started with ${service.title}?`} />
    </main>
  );
}
