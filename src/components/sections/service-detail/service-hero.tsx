import Link from "next/link";
import { AppIcon } from "@/components/ui/app-icon";
import { buttonClassNames } from "@/lib/button-styles";
import type { Service } from "@/types";

export function ServiceHero({ service }: { service: Service }) {
  return (
    <header className="mx-auto grid min-h-[380px] w-full max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-[1fr_auto] md:px-8 lg:px-12">
      <div className="max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-small text-ink-soft mb-5">
          <Link href="/services" className="underline-offset-4 hover:underline">Services</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{service.title}</span>
        </nav>
        <p className="text-accent mb-3 font-semibold">{service.tagline}</p>
        <h1 className="font-heading text-display">{service.title}</h1>
        <p className="text-body-lg text-ink-soft mt-5 max-w-prose">{service.summary}</p>
        <Link href={`/contact?service=${service.slug}`} className={buttonClassNames("primary", "lg", "mt-8")}>
          Start a project
        </Link>
      </div>
      <div aria-hidden="true" className="mx-auto rotate-[-7deg] md:mr-8">
        <AppIcon accent={service.accent} emojiKey={service.emoji} size={160} />
      </div>
    </header>
  );
}
