import { WindowCard } from "@/components/ui/window-card";
import { testimonials } from "@/data/testimonials";
import type { AccentColor } from "@/types";

const avatarColors: Record<AccentColor, string> = {
  pink: "bg-pink/35",
  yellow: "bg-yellow/45",
  mint: "bg-mint/40",
  sky: "bg-sky/35",
  coral: "bg-coral/35",
  lilac: "bg-lilac/40",
  lime: "bg-lime/40",
  peach: "bg-peach/45",
};

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-12"
    >
      <h2 id="testimonials-title" className="font-heading text-h2 mb-9">
        Kind words from people we&apos;ve worked with
      </h2>
      <div className="grid snap-x snap-mandatory auto-cols-[minmax(82%,1fr)] grid-flow-col gap-4 overflow-x-auto pb-4 md:auto-cols-auto md:grid-flow-row md:grid-cols-2 md:overflow-visible xl:grid-cols-3">
        {testimonials.map((testimonial) => {
          const initials = testimonial.name
            .split(" ")
            .map((part) => part[0])
            .join("");
          return (
            <WindowCard
              key={testimonial.name}
              title={`${testimonial.company.toLowerCase().replaceAll(" ", "-")}.note`}
              className="snap-start"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`font-heading grid size-11 place-items-center rounded-full font-bold ${avatarColors[testimonial.accent]}`}
                >
                  {initials}
                </span>
                <div>
                  <p className="leading-tight font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-small text-ink-soft">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
              <blockquote className="text-ink-soft mt-5">
                “{testimonial.quote}”
              </blockquote>
            </WindowCard>
          );
        })}
      </div>
    </section>
  );
}
