import { WindowCard } from "@/components/ui/window-card";
import type { Service } from "@/types";

export function ServiceOverview({ service }: { service: Service }) {
  const training = Boolean(service.curriculum && service.program);

  return (
    <>
      <section
        aria-labelledby="included-title"
        className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 lg:px-12"
      >
        <h2 id="included-title" className="font-heading text-h2 mb-7">
          {training ? "What you'll learn" : "What's included"}
        </h2>
        {training ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.curriculum?.map((item, index) => (
              <WindowCard
                key={item.module}
                title={`module-${String(index + 1).padStart(2, "0")}.app`}
              >
                <p className="text-small text-brand font-semibold">
                  Module {index + 1}
                </p>
                <h3 className="font-heading text-h3 mt-2">{item.module}</h3>
                <p className="text-ink-soft mt-2">{item.topics}</p>
              </WindowCard>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.included.map((item) => (
              <WindowCard
                key={item.title}
                title={`${service.slug}.app`}
              >
                <span
                  aria-hidden="true"
                  className="bg-mint/45 grid size-8 place-items-center rounded-full"
                >
                  ✓
                </span>
                <h3 className="font-heading text-h3 mt-4">{item.title}</h3>
                <p className="text-ink-soft mt-2">{item.description}</p>
              </WindowCard>
            ))}
          </div>
        )}
      </section>
      {service.program ? (
        <section
          aria-labelledby="program-details-title"
          className="mx-auto w-full max-w-7xl px-5 py-8 md:px-8 lg:px-12"
        >
          <WindowCard title="program-details.app">
            <h2
              id="program-details-title"
              className="font-heading text-h2 mb-6"
            >
              Program details
            </h2>
            <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(service.program).map(([label, value]) => (
                <div key={label}>
                  <dt className="text-small text-ink-soft capitalize">
                    {label === "classSize" ? "Class size" : label}
                  </dt>
                  <dd className="mt-1 font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-small text-ink-soft mt-5">
              This training program is fictional demo content.
            </p>
          </WindowCard>
        </section>
      ) : null}
      <section
        aria-labelledby="process-title"
        className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 lg:px-12"
      >
        <h2 id="process-title" className="font-heading text-h2 mb-7">
          How it works
        </h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.steps.map((step, index) => (
            <li key={step.title}>
              <WindowCard
                title={`step-${index + 1}.app`}
              >
                <p className="text-small text-brand font-semibold">
                  Step {index + 1}
                </p>
                <h3 className="font-heading text-h3 mt-2">{step.title}</h3>
                <p className="text-ink-soft mt-2">{step.description}</p>
              </WindowCard>
            </li>
          ))}
        </ol>
      </section>
      <section
        aria-labelledby="fit-title"
        className="mx-auto w-full max-w-7xl px-5 py-8 md:px-8 lg:px-12"
      >
        <WindowCard title="a-good-fit.app">
          <h2 id="fit-title" className="font-heading text-h2 mb-5">
            Who it&apos;s for
          </h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {service.fitFor.map((fit) => (
              <li
                key={fit}
                className="rounded-input border-line border bg-white/60 p-4"
              >
                {fit}
              </li>
            ))}
          </ul>
        </WindowCard>
      </section>
    </>
  );
}
