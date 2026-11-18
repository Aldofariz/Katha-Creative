import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { services } from "@/data/services";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Katha Creative what you're building. We'll reply within one business day.",
};

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const requestedService = Array.isArray(params.service) ? params.service[0] : params.service;
  const initialService = services.some((service) => service.slug === requestedService)
    ? (requestedService ?? "Not sure yet")
    : "Not sure yet";

  return (
    <main className="relative z-10 flex-1">
      <header className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-20 lg:px-12">
        <h1 className="font-sans text-display">Tell us what you&apos;re building.</h1>
        <p className="text-body-lg text-ink-soft mt-5 max-w-prose">
          Share a few details and we&apos;ll reply within one business day.
        </p>
      </header>
      <div className="mx-auto grid w-full max-w-7xl items-start gap-12 px-5 pb-20 md:grid-cols-[1.2fr_0.8fr] md:px-8 lg:px-12">
        <ContactForm initialService={initialService} />
        <aside className="space-y-5 py-2">
          <h2 className="font-sans text-h3">A note from the studio</h2>
          <p className="text-ink-soft">Tell us a little about your project and we will be in touch.</p>
          <dl className="border-line divide-line divide-y border-y">
            <div className="py-4">
              <dt className="text-small text-ink-soft">Email</dt>
              <dd><a href={`mailto:${site.email}`} className="focus-visible:outline-accent font-semibold underline-offset-4 hover:underline focus-visible:outline-2">{site.email}</a></dd>
            </div>
            {site.city ? (
              <div className="py-4">
                <dt className="text-small text-ink-soft">City</dt>
                <dd className="font-semibold">{site.city}</dd>
              </div>
            ) : null}
            <div className="py-4">
              <dt className="text-small text-ink-soft">Response time</dt>
              <dd className="font-semibold">{site.responseTime}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </main>
  );
}
