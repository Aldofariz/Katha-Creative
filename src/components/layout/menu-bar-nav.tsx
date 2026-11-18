"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BatteryFull, ChevronDown, Menu, Wifi, X } from "lucide-react";
import { services } from "@/data/services";
import { EmojiImage } from "@/components/ui/emoji-image";
import { buttonClassNames } from "@/components/ui/button";
import { cn } from "@/lib/cn";

function LiveClock() {
  const [time, setTime] = useState("Wed 9:41 AM");

  useEffect(() => {
    const updateTime = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).formatToParts(new Date());
      const getPart = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((part) => part.type === type)?.value ?? "";

      setTime(
        `${getPart("weekday")} ${getPart("hour")}:${getPart("minute")} ${getPart("dayPeriod")}`,
      );
    };
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      updateTime();
      timeout = setTimeout(tick, 60_000);
    };

    updateTime();
    const delay = 60_000 - (Date.now() % 60_000);
    timeout = setTimeout(tick, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <time className="text-ink-soft text-xs whitespace-nowrap">{time}</time>
  );
}

const servicesMenuLinks = [
  { href: "/services", label: "All services" },
  ...services.map((service) => ({
    href: `/services/${service.slug}`,
    label: service.title,
  })),
];

const menuItemClasses =
  "flex min-h-11 items-center rounded-full px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-brand-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function MenuBarNav() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const serviceLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const pointerHoverRef = useRef(false);

  const onServicesKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setServicesOpen(true);
      requestAnimationFrame(() => serviceLinkRefs.current[0]?.focus());
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setServicesOpen(true);
      requestAnimationFrame(() => serviceLinkRefs.current[0]?.focus());
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setServicesOpen(true);
      requestAnimationFrame(() =>
        serviceLinkRefs.current[servicesMenuLinks.length - 1]?.focus(),
      );
    } else if (event.key === "Escape") {
      setServicesOpen(false);
      servicesButtonRef.current?.focus();
    }
  };

  const onServiceLinkKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setServicesOpen(false);
      servicesButtonRef.current?.focus();
      return;
    }

    let targetIndex: number | null = null;
    if (event.key === "ArrowDown")
      targetIndex = (index + 1) % servicesMenuLinks.length;
    if (event.key === "ArrowUp") {
      targetIndex =
        (index - 1 + servicesMenuLinks.length) % servicesMenuLinks.length;
    }
    if (event.key === "Home") targetIndex = 0;
    if (event.key === "End") targetIndex = servicesMenuLinks.length - 1;

    if (targetIndex !== null) {
      event.preventDefault();
      serviceLinkRefs.current[targetIndex]?.focus();
    }
  };

  const closeOnBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setServicesOpen(false);
    }
  };

  const servicesActive =
    pathname === "/services" || pathname.startsWith("/services/");

  return (
    <header className="glass glass-strong border-line sticky top-0 z-50 border-b">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-3 sm:px-5"
      >
        <div className="flex h-12 items-center justify-between gap-3">
          <Link
            href="/"
            aria-label="Katha Creative home"
            className="focus-visible:outline-brand flex min-h-11 shrink-0 items-center gap-2 rounded-full px-2 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <EmojiImage emojiKey="sparkles" width={24} height={24} />
            <span className="font-heading text-ink text-lg font-bold tracking-tight">
              Katha
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <div
              ref={servicesMenuRef}
              className="relative"
              onFocusCapture={() => setServicesOpen(true)}
              onBlurCapture={closeOnBlur}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") {
                  pointerHoverRef.current = true;
                  setServicesOpen(true);
                }
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") {
                  pointerHoverRef.current = false;
                  if (
                    !servicesMenuRef.current?.contains(document.activeElement)
                  ) {
                    setServicesOpen(false);
                  }
                }
              }}
            >
              <button
                ref={servicesButtonRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                aria-current={servicesActive ? "page" : undefined}
                className={cn(
                  menuItemClasses,
                  servicesActive && "bg-brand-wash",
                  "flex items-center gap-1",
                )}
                onClick={() => {
                  if (pointerHoverRef.current) {
                    pointerHoverRef.current = false;
                    setServicesOpen(true);
                  } else {
                    setServicesOpen((open) => !open);
                  }
                }}
                onKeyDown={onServicesKeyDown}
              >
                Services
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-4 transition-transform duration-150",
                    servicesOpen && "rotate-180",
                  )}
                />
              </button>
              {servicesOpen ? (
                <div
                  id="services-menu"
                  role="menu"
                  aria-label="Services"
                  className="glass-strong rounded-window absolute top-full left-0 z-[60] mt-2 grid w-64 origin-top gap-1 border border-white/70 p-2 shadow-xl"
                >
                  {servicesMenuLinks.map((item, index) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        ref={(node) => {
                          serviceLinkRefs.current[index] = node;
                        }}
                        href={item.href}
                        role="menuitem"
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "text-ink hover:bg-brand-wash focus-visible:bg-brand-wash focus-visible:outline-brand flex min-h-11 items-center rounded-full px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
                          active && "bg-brand-wash font-semibold",
                        )}
                        onKeyDown={(event) =>
                          onServiceLinkKeyDown(event, index)
                        }
                        onClick={() => setServicesOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <Link
              href="/about"
              aria-current={pathname === "/about" ? "page" : undefined}
              className={cn(
                menuItemClasses,
                pathname === "/about" && "bg-brand-wash",
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              className={cn(
                menuItemClasses,
                pathname === "/contact" && "bg-brand-wash",
              )}
            >
              Contact
            </Link>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <span aria-hidden="true" className="flex items-center gap-2">
              <Wifi className="text-ink-soft size-4" />
              <BatteryFull className="text-ink-soft size-4" />
            </span>
            <LiveClock />
          </div>

          <Link
            href="/contact"
            className={cn(
              buttonClassNames("primary", "md"),
              "hidden motion-safe:transition-transform motion-safe:hover:-translate-y-px md:inline-flex",
            )}
          >
            Start a project
          </Link>

          <button
            ref={mobileButtonRef}
            type="button"
            className="text-ink hover:bg-brand-wash focus-visible:outline-brand grid size-11 shrink-0 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>

        {mobileOpen ? (
          <div
            id="mobile-navigation"
            className="rounded-window border-line mb-3 border bg-white/90 p-3 shadow-lg md:hidden"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                setMobileOpen(false);
                mobileButtonRef.current?.focus();
              }
            }}
          >
            <div className="grid gap-1">
              <Link
                href="/services"
                aria-current={pathname === "/services" ? "page" : undefined}
                className={cn(
                  menuItemClasses,
                  pathname === "/services" && "bg-brand-wash",
                )}
                onClick={() => setMobileOpen(false)}
              >
                All services
              </Link>
              <div className="border-line grid grid-cols-2 gap-1 border-y py-2">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    aria-current={
                      pathname === `/services/${service.slug}`
                        ? "page"
                        : undefined
                    }
                    className={cn(
                      "text-ink hover:bg-brand-wash focus-visible:outline-brand flex min-h-11 items-center rounded-full px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
                      pathname === `/services/${service.slug}` &&
                        "bg-brand-wash font-semibold",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
              <Link
                href="/about"
                aria-current={pathname === "/about" ? "page" : undefined}
                className={cn(
                  menuItemClasses,
                  pathname === "/about" && "bg-brand-wash",
                )}
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                aria-current={pathname === "/contact" ? "page" : undefined}
                className={cn(
                  menuItemClasses,
                  pathname === "/contact" && "bg-brand-wash",
                )}
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className={buttonClassNames("primary", "md", "mt-2")}
                onClick={() => setMobileOpen(false)}
              >
                Start a project
              </Link>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
