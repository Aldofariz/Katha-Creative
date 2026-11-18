"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BatteryFull, ChevronDown, Menu, Search, Wifi, X } from "lucide-react";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { EmojiImage } from "@/components/ui/emoji-image";
import { cn } from "@/lib/cn";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).formatToParts(new Date());
      const part = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((item) => item.type === type)?.value ?? "";
      setTime(
        `${part("weekday")} ${part("day")} ${part("month")} ${part("hour")}:${part("minute")} ${part("dayPeriod")}`,
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <time
      className="text-ink-soft text-xs whitespace-nowrap tabular-nums"
      suppressHydrationWarning
    >
      {time}
    </time>
  );
}

const itemClass =
  "flex h-7 items-center rounded px-2 text-[13px] font-medium text-ink-soft transition-colors hover:bg-black/[0.08] focus-visible:bg-black/[0.08] focus-visible:outline-2 focus-visible:outline-accent";
const serviceLinks = services.map((service) => ({
  href: `/services/${service.slug}`,
  label: service.title,
  emoji: service.emoji,
}));
const serviceMenuLength = serviceLinks.length + 1;

export function MenuBarNav() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const activeServices = pathname.startsWith("/services");

  const closeMenu = (restoreFocus = false) => {
    setServicesOpen(false);
    if (restoreFocus) servicesButtonRef.current?.focus();
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }
    const current = linkRefs.current.findIndex(
      (link) => link === document.activeElement,
    );
    let next: number | null = null;
    if (event.key === "ArrowDown")
      next = (current + 1 + serviceMenuLength) % serviceMenuLength;
    if (event.key === "ArrowUp")
      next = (current - 1 + serviceMenuLength) % serviceMenuLength;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = serviceMenuLength - 1;
    if (next !== null) {
      event.preventDefault();
      linkRefs.current[next]?.focus();
    }
  };

  return (
    <header className="vibrancy border-line sticky top-0 z-50 border-b">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-2 sm:px-4"
      >
        <div className="flex h-8 items-center gap-2">
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="focus-visible:outline-accent flex h-7 shrink-0 items-center gap-2 rounded px-1 focus-visible:outline-2"
          >
            <span
              aria-hidden="true"
              className="grid size-5 place-items-center rounded-[5px] bg-[#1d1d1f] text-[13px] leading-none font-bold text-white"
            >
              K
            </span>
            <span className="text-ink text-[13px] font-bold">{site.name}</span>
          </Link>

          <div className="hidden items-center gap-0.5 md:flex">
            <div
              ref={menuRef}
              className="relative"
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setServicesOpen(true);
              }}
              onPointerLeave={(event) => {
                if (
                  event.pointerType === "mouse" &&
                  !menuRef.current?.contains(document.activeElement)
                )
                  closeMenu();
              }}
              onBlur={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget as Node | null,
                  )
                )
                  closeMenu();
              }}
              onKeyDown={handleMenuKeyDown}
            >
              <button
                ref={servicesButtonRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                aria-current={activeServices ? "page" : undefined}
                onFocus={() => setServicesOpen(true)}
                className={cn(
                  itemClass,
                  activeServices && "text-ink bg-black/[0.08]",
                  servicesOpen && "bg-accent hover:bg-accent text-white",
                )}
                onClick={() => setServicesOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setServicesOpen(true);
                    requestAnimationFrame(() => linkRefs.current[0]?.focus());
                  } else if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setServicesOpen(true);
                    requestAnimationFrame(() => linkRefs.current[0]?.focus());
                  }
                }}
              >
                Services
                <ChevronDown
                  aria-hidden="true"
                  className={cn("ml-1 size-3", servicesOpen && "rotate-180")}
                />
              </button>
              {servicesOpen ? (
                <div
                  id="services-menu"
                  role="menu"
                  aria-label="Services"
                  className="vibrancy border-line shadow-window absolute top-full left-0 z-[60] mt-1 w-60 rounded-[10px] border p-1"
                  onKeyDown={handleMenuKeyDown}
                >
                  {serviceLinks.map((item, index) => (
                    <Link
                      key={item.href}
                      ref={(node) => {
                        linkRefs.current[index] = node;
                      }}
                      href={item.href}
                      role="menuitem"
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cn(
                        "group text-ink hover:bg-accent focus-visible:bg-accent flex h-6 items-center gap-2 rounded px-1.5 text-[13px] hover:text-white focus-visible:text-white focus-visible:outline-none",
                        pathname === item.href && "bg-accent text-white",
                      )}
                      onClick={() => closeMenu()}
                    >
                      <EmojiImage
                        emojiKey={item.emoji}
                        width={16}
                        height={16}
                        className="size-4 shrink-0"
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  ))}
                  <div role="separator" className="border-line my-1 border-t" />
                  <Link
                    ref={(node) => {
                      linkRefs.current[serviceLinks.length] = node;
                    }}
                    href="/services"
                    role="menuitem"
                    aria-current={pathname === "/services" ? "page" : undefined}
                    className={cn(
                      "text-ink hover:bg-accent focus-visible:bg-accent flex h-6 items-center rounded px-1.5 text-[13px] font-medium hover:text-white focus-visible:text-white focus-visible:outline-none",
                      pathname === "/services" && "bg-accent text-white",
                    )}
                    onClick={() => closeMenu()}
                  >
                    All services
                  </Link>
                </div>
              ) : null}
            </div>
            <Link
              href="/about"
              aria-current={pathname === "/about" ? "page" : undefined}
              className={cn(
                itemClass,
                pathname === "/about" && "text-ink bg-black/[0.08]",
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              className={cn(
                itemClass,
                pathname === "/contact" && "text-ink bg-black/[0.08]",
              )}
            >
              Contact
            </Link>
          </div>

          <div
            aria-hidden="true"
            className="ml-auto hidden items-center gap-3 md:flex"
          >
            <span className="text-ink-soft flex items-center gap-2">
              <Wifi className="size-4" />
              <BatteryFull className="size-4" />
              <Search className="size-3.5" />
            </span>
          </div>
          <div className="hidden md:block">
            <LiveClock />
          </div>
          <Link
            href="/contact"
            className="bg-accent hover:bg-accent-hover focus-visible:outline-accent ml-auto flex h-6 shrink-0 items-center rounded-[6px] px-2.5 text-xs font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 md:ml-1"
          >
            Start a project
          </Link>
          <button
            ref={mobileButtonRef}
            type="button"
            className="text-ink focus-visible:outline-accent grid size-7 shrink-0 place-items-center rounded hover:bg-black/[0.08] focus-visible:outline-2 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="size-4" />
            ) : (
              <Menu aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
        {mobileOpen ? (
          <div
            id="mobile-navigation"
            className="border-line shadow-window -mx-2 border-t bg-white p-3 md:hidden"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setMobileOpen(false);
                mobileButtonRef.current?.focus();
              }
            }}
          >
            <div className="grid gap-1">
              {[
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "focus-visible:outline-accent flex min-h-10 items-center rounded px-3 text-sm font-medium hover:bg-black/[0.08] focus-visible:outline-2",
                    pathname === item.href && "bg-black/[0.08]",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-line grid grid-cols-2 gap-1 border-y py-2">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="focus-visible:outline-accent flex min-h-10 items-center gap-2 rounded px-3 text-sm hover:bg-black/[0.08] focus-visible:outline-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    <EmojiImage emojiKey={item.emoji} width={18} height={18} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
