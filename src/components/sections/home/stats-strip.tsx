import { StatCounter } from "@/components/sections/home/stat-counter";
import { clientWordmarks, stats } from "@/data/stats";

export function StatsStrip() {
  return (
    <section
      aria-label="Katha Creative in numbers"
      className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 lg:px-12"
    >
      <div className="glass rounded-window grid grid-cols-2 gap-6 p-6 sm:grid-cols-4 sm:gap-4 sm:p-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <StatCounter stat={stat} />
            <p className="text-small text-ink-soft mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
      <div
        aria-label="A few of the brands we work with"
        className="mt-9 overflow-hidden"
      >
        <div className="client-marquee text-ink-soft flex w-max items-center gap-12 px-4 text-sm font-semibold sm:gap-16">
          {clientWordmarks.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
          {clientWordmarks.map((brand) => (
            <span key={`${brand}-duplicate`} aria-hidden="true">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
