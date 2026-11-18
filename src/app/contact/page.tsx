import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { EmojiImage } from "@/components/ui/emoji-image";
import { WindowCard } from "@/components/ui/window-card";
import { services } from "@/data/services";

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
  const requestedService = Array.isArray(params.service)
    ? params.service[0]
    : params.service;
  const initialService = services.some(
    (service) => service.slug === requestedService,
  )
    ? (requestedService ?? "Not sure yet")
    : "Not sure yet";

  return (
    <main className="relative z-10 flex-1">
      <header className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-20 lg:px-12">
        <h1 className="font-heading text-display">
          Tell us what you&apos;re building.
        </h1>
        <p className="text-body-lg text-ink-soft mt-5 max-w-prose">
          Share a few details and we&apos;ll reply within one business day.
        </p>
      </header>
      <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-5 pb-20 md:grid-cols-[1.2fr_0.8fr] md:px-8 lg:px-12">
        <WindowCard title="New message" bodyClassName="p-5 sm:p-8">
          <ContactForm initialService={initialService} />
        </WindowCard>
        <aside className="relative space-y-5 py-2">
          <h2 className="font-heading text-h3">A note from the studio</h2>
          <p className="text-ink-soft">
            We&apos;re a fictional agency based in Bandung, Indonesia. This demo
            form doesn&apos;t send or store your message.
          </p>
          <dl className="glass rounded-window space-y-4 p-5">
            <div>
              <dt className="text-small text-ink-soft">Email</dt>
              <dd>
                <a
                  href="mailto:hello@katha.example"
                  className="focus-visible:outline-brand font-semibold underline-offset-4 hover:underline focus-visible:outline-2"
                >
                  hello@katha.example
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-small text-ink-soft">Location</dt>
              <dd className="font-semibold">Bandung, Indonesia</dd>
            </div>
            <div>
              <dt className="text-small text-ink-soft">Response time</dt>
              <dd className="font-semibold">
                We reply within one business day.
              </dd>
            </div>
          </dl>
          <span
            aria-hidden="true"
            className="absolute top-0 right-5 rotate-12 opacity-75"
          >
            <EmojiImage emojiKey="speech-balloon" width={68} height={68} />
          </span>
        </aside>
      </div>
    </main>
  );
}
