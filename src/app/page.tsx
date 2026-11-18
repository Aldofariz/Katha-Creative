import { Hero } from "@/components/sections/home/hero";
import { ServicesGrid } from "@/components/sections/home/services-grid";
import { StatsStrip } from "@/components/sections/home/stats-strip";
import { WorkStages } from "@/components/sections/home/work-stages";
import { TrainingHighlight } from "@/components/sections/home/training-highlight";
import { Testimonials } from "@/components/sections/home/testimonials";
import { FaqSection } from "@/components/sections/home/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ServicesGrid />
      <WorkStages />
      <TrainingHighlight />
      <Testimonials />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
