import { Accordion } from "@/components/ui/accordion";
import { homeFaqs } from "@/data/faqs";

export function FaqSection() {
  return (
    <section
      aria-labelledby="home-faq-title"
      className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-16 md:grid-cols-[0.7fr_1.3fr] md:px-8 md:py-24 lg:px-12"
    >
      <div>
        <h2 id="home-faq-title" className="font-sans text-h2">
          Questions, answered
        </h2>
        <p className="text-ink-soft mt-4 max-w-sm">
          A few useful details before we get started.
        </p>
      </div>
      <Accordion items={homeFaqs} />
    </section>
  );
}
