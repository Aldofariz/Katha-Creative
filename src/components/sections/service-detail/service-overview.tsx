import { Service } from "@/types";

export function ServiceOverview({ service }: { service: Service }) {
  const training = Boolean(service.curriculum && service.program);

  return (
    <>
      <section aria-labelledby="included-title" className="bg-surface">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 lg:px-12">
          <h2 id="included-title" className="font-sans text-h2 mb-7">
            {training ? "What you'll learn" : "What's included"}
          </h2>
          {training ? (
            <ol aria-label="Training curriculum" className="border-line border-t">
              {service.curriculum?.map((item, index) => (
                <li key={item.module} className="border-line grid gap-2 border-b py-4 sm:grid-cols-[minmax(200px,0.8fr)_1.2fr] sm:gap-8">
                  <span className="flex items-center gap-3 font-semibold">
                    <span aria-hidden="true" className="border-line-strong grid size-5 shrink-0 place-items-center rounded-full border" />
                    <span>{item.module}</span>
                  </span>
                  <span className="text-ink-soft sm:pl-8">{item.topics}</span>
                  <span className="sr-only">Module {index + 1}</span>
                </li>
              ))}
            </ol>
          ) : (
            <ul className="border-line border-t">
              {service.included.map((item) => (
                <li key={item.title} className="border-line grid gap-2 border-b py-4 sm:grid-cols-[minmax(200px,0.8fr)_1.2fr] sm:gap-8">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-ink-soft">{item.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      {service.program ? (
        <section aria-labelledby="program-details-title" className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 lg:px-12">
          <h2 id="program-details-title" className="font-sans text-h2 mb-6">Program details</h2>
          <dl className="border-line grid border-y sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(service.program).map(([label, value]) => (
              <div key={label} className="border-line border-b py-4 sm:px-4 sm:first:pl-0 lg:border-r lg:border-b-0 lg:first:pl-0 lg:last:border-r-0">
                <dt className="text-small text-ink-soft capitalize">{label === "classSize" ? "Class size" : label}</dt>
                <dd className="mt-1 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
      <section aria-labelledby="process-title" className="bg-surface">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 lg:px-12">
          <h2 id="process-title" className="font-sans text-h2 mb-7">How it works</h2>
          <ol className="border-line border-t">
            {service.steps.map((step, index) => (
              <li key={step.title} className="border-line grid gap-2 border-b py-4 sm:grid-cols-[64px_minmax(180px,0.8fr)_1.2fr] sm:items-baseline sm:gap-6">
                <span className="text-small text-accent font-semibold">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-ink-soft">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section aria-labelledby="fit-title" className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 lg:px-12">
        <h2 id="fit-title" className="font-sans text-h2 mb-5">Who it&apos;s for</h2>
        <ul className="border-line grid border-t sm:grid-cols-3">
          {service.fitFor.map((fit) => (
            <li key={fit} className="border-line border-b py-4 text-ink-soft sm:px-4 sm:first:pl-0 sm:last:pr-0">{fit}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
