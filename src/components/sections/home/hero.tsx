import { HeroCopy } from "@/components/sections/home/hero-copy";
import { HeroPlayground } from "@/components/sections/home/hero-playground";

export function Hero() {
  return (
    <main className="relative z-10 flex flex-1 items-center">
      <section className="mx-auto grid min-h-[calc(100svh-48px)] w-full max-w-7xl items-center gap-8 px-5 py-12 md:grid-cols-[0.95fr_1.05fr] md:gap-10 md:px-8 lg:px-12">
        <HeroCopy />
        <HeroPlayground />
      </section>
    </main>
  );
}
