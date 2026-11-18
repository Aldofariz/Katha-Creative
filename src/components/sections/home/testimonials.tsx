"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <section aria-labelledby="testimonials-title" className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-12">
      <h2 id="testimonials-title" className="font-heading text-h2 mb-9">Kind words from people we&apos;ve worked with</h2>
      <div className="border-line border-t">
        {testimonials.map((testimonial, index) => (
          <article key={testimonial.name} onMouseEnter={() => setActiveRow(index)} onMouseLeave={() => setActiveRow(null)} className={`border-line grid gap-4 border-b py-7 transition-opacity md:grid-cols-3 md:gap-8 md:py-9 ${activeRow !== null && activeRow !== index ? "opacity-40" : "opacity-100"}`}>
            <blockquote className="text-[22px] leading-snug font-medium tracking-[-0.02em] md:col-span-2 md:text-[26px]">&ldquo;{testimonial.quote}&rdquo;</blockquote>
            <div className="text-small text-ink-soft md:pt-1">
              <p className="text-ink font-semibold">{testimonial.name}</p>
              <p>{testimonial.role}, {testimonial.company}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
