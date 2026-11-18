import { ServiceCard } from "@/components/sections/home/service-card";
import { services } from "@/data/services";

export function ServicesGrid() {
  return (
    <section
      aria-labelledby="home-services-title"
      className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-12"
    >
      <div className="mb-9 max-w-2xl">
        <h2 id="home-services-title" className="font-heading text-h2">
          Everything your brand needs to get noticed
        </h2>
        <p className="text-body-lg text-ink-soft mt-4">
          Eight services, one team. Pick one or let us build the whole plan.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
