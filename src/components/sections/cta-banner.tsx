import Link from "next/link";
import { EmojiImage } from "@/components/ui/emoji-image";
import { buttonClassNames } from "@/lib/button-styles";

type CtaBannerProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function CtaBanner({
  title = "Got a brand with a story? Let's make people talk.",
  description = "Tell us what you're building. We'll reply within one business day.",
  className = "",
}: CtaBannerProps) {
  return (
    <section
      className={`mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-12 ${className}`}
    >
      <div className="glass rounded-banner relative isolate overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-16">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-5 left-5 -z-0 rotate-[-12deg] opacity-75 sm:top-8 sm:left-10"
        >
          <EmojiImage emojiKey="sparkles" width={48} height={48} />
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-5 bottom-4 -z-0 rotate-12 opacity-75 sm:right-10 sm:bottom-8"
        >
          <EmojiImage emojiKey="party-popper" width={54} height={54} />
        </span>
        <div className="relative z-[1] mx-auto max-w-2xl">
          <h2 className="font-heading text-h2">{title}</h2>
          <p className="text-body-lg text-ink-soft mt-4">{description}</p>
          <Link
            href="/contact"
            className={buttonClassNames("primary", "lg", "mt-8")}
          >
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}
