import Link from "next/link";
import { services } from "@/data/services";
import { site } from "@/data/site";

const linkClass =
  "text-[13px] text-ink-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-accent";

export function Footer() {
  return (
    <footer className="border-line bg-canvas border-t px-5 py-9 sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="text-ink focus-visible:outline-accent text-sm font-bold focus-visible:outline-2"
          >
            {site.name}
          </Link>
          <p className="text-small text-ink-soft mt-2">{site.tagline}</p>
          <p className="text-small text-ink-soft mt-4">
            <a className={linkClass} href={`mailto:${site.email}`}>
              {site.email}
            </a>
            {site.city ? (
              <>
                <span aria-hidden="true">&middot;</span>
                {site.city}
              </>
            ) : null}
          </p>
        </div>
        <div>
          <h2 className="text-ink text-[13px] font-semibold">Services</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link className={linkClass} href={`/services/${service.slug}`}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-ink text-[13px] font-semibold">Company</h2>
          <ul className="mt-3 grid gap-2">
            <li>
              <Link className={linkClass} href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className={linkClass} href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-small text-ink-soft mx-auto mt-8 w-full max-w-7xl">
        © 2026 {site.name}
      </p>
    </footer>
  );
}
