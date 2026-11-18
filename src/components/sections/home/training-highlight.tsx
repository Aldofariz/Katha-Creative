import Link from "next/link";
import { EmojiImage } from "@/components/ui/emoji-image";
import { WindowCard } from "@/components/ui/window-card";
import { buttonClassNames } from "@/lib/button-styles";
import { services } from "@/data/services";

export function TrainingHighlight() {
  const training = services.find(
    (service) => service.slug === "digital-marketing-training",
  );
  if (!training?.curriculum || !training.program) return null;

  return (
    <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24 lg:px-12">
      <div>
        <p className="text-small text-brand mb-3 font-semibold">
          A little hands-on learning
        </p>
        <h2 className="font-heading text-h2">
          Want to do this yourself? Learn with us.
        </h2>
        <p className="text-body-lg text-ink-soft mt-5 max-w-prose">
          {training.summary}
        </p>
        <ul className="text-small text-ink-soft mt-6 space-y-2">
          <li>
            For career switchers, small business owners, and fresh graduates.
          </li>
          <li>
            {training.program.duration} · {training.program.format}.
          </li>
        </ul>
        <Link
          href={`/services/${training.slug}`}
          className={buttonClassNames("primary", "md", "mt-8")}
        >
          Explore the training program
        </Link>
      </div>
      <div className="relative px-3 py-4 sm:px-8">
        <span
          aria-hidden="true"
          className="absolute -top-2 -right-1 z-10 rotate-12"
        >
          <EmojiImage emojiKey="graduation-cap" width={96} height={96} />
        </span>
        <WindowCard title="your-curriculum.app">
          <h3 className="font-heading text-h3 mb-5">
            Six modules, one portfolio
          </h3>
          <ol className="space-y-3">
            {training.curriculum.map((item) => (
              <li key={item.module} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="bg-mint/45 mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-xs"
                >
                  ✓
                </span>
                <span className="text-small">
                  <strong>{item.module}</strong>
                  <span className="text-ink-soft"> — {item.topics}</span>
                </span>
              </li>
            ))}
          </ol>
        </WindowCard>
      </div>
    </section>
  );
}
