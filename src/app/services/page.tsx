import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/cta-banner";
import { NotSureBlock } from "@/components/sections/services/not-sure-block";
import { ServicesFinder } from "@/components/sections/services/services-finder";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Katha Creative's advertising, social, creative, and growth services.",
};

export default function ServicesPage() {
  return (
    <main className="relative z-10 flex-1">
      <header className="mx-auto flex min-h-[300px] w-full max-w-7xl items-center px-5 py-16 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h1 className="font-heading text-display">Services for a story worth sharing</h1>
          <p className="text-body-lg text-ink-soft mt-5 max-w-prose">
            Eight services, one team. Pick one or let us build the whole plan.
          </p>
        </div>
      </header>
      <ServicesFinder />
      <NotSureBlock />
      <CtaBanner />
    </main>
  );
}
