"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { X } from "lucide-react";
import Link from "next/link";
import { AppIcon } from "@/components/ui/app-icon";
import { ServiceDock } from "@/components/sections/home/service-dock";
import {
  ServiceDetails,
  ServiceWindow,
} from "@/components/sections/home/service-window";
import { services } from "@/data/services";
import { siteCopy } from "@/data/site-copy";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import type { Service } from "@/types";

const initialService = services[0]?.slug ?? null;

export function ServicesDock() {
  const reducedMotion = useReducedMotionSafe();
  const stageRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef(new Map<string, HTMLButtonElement>());
  const mobileIconRefs = useRef(new Map<string, HTMLButtonElement>());
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const lastMobileSlug = useRef<string | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(initialService);
  const [mobileSlug, setMobileSlug] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [windowOriginX, setWindowOriginX] = useState(380);
  const [bounceTarget, setBounceTarget] = useState({ slug: "", token: 0 });
  const bounceCount = useRef(0);
  const didHint = useRef(false);

  const selectedService = services.find((service) => service.slug === openSlug);
  const selectedMobileService = services.find(
    (service) => service.slug === mobileSlug,
  );

  const registerIcon = (slug: string, node: HTMLButtonElement | null) => {
    if (node) iconRefs.current.set(slug, node);
    else iconRefs.current.delete(slug);
  };

  const measureWindowOrigin = useCallback(
    (slug: string) => {
      const stage = stageRef.current?.getBoundingClientRect();
      const icon = iconRefs.current.get(slug)?.getBoundingClientRect();
      if (!stage || !icon || stage.width === 0) return;
      const maxWidth = zoomed ? 960 : 760;
      const windowWidth = Math.min(maxWidth, stage.width - 48);
      const windowLeft = (stage.width - windowWidth) / 2;
      setWindowOriginX(icon.left + icon.width / 2 - stage.left - windowLeft);
    },
    [zoomed],
  );

  useLayoutEffect(() => {
    if (openSlug) measureWindowOrigin(openSlug);
  }, [openSlug, measureWindowOrigin]);

  useEffect(() => {
    if (!openSlug) return;
    const handleResize = () => measureWindowOrigin(openSlug);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openSlug, measureWindowOrigin]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || didHint.current || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || didHint.current) return;
        didHint.current = true;
        bounceCount.current += 1;
        setBounceTarget({
          slug: services[0]?.slug ?? "",
          token: bounceCount.current,
        });
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!mobileSlug) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => mobileCloseRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(frame);
    };
  }, [mobileSlug]);

  const triggerBounce = (slug: string) => {
    if (reducedMotion) return;
    bounceCount.current += 1;
    setBounceTarget({ slug, token: bounceCount.current });
  };

  const openService = (service: Service) => {
    setOpenSlug(service.slug);
    setZoomed(false);
    triggerBounce(service.slug);
  };

  const openMobileService = (service: Service) => {
    lastMobileSlug.current = service.slug;
    setMobileSlug(service.slug);
  };

  const closeMobileSheet = () => {
    setMobileSlug(null);
    requestAnimationFrame(() => {
      if (lastMobileSlug.current) {
        mobileIconRefs.current.get(lastMobileSlug.current)?.focus();
      }
    });
  };

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMobileSheet();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <section aria-labelledby="home-services-title" className="bg-surface">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="mb-9 max-w-2xl">
          <h2 id="home-services-title" className="font-heading text-h2">
            {siteCopy.home.servicesTitle}
          </h2>
          <p className="text-body-lg text-ink-soft mt-4">
            {siteCopy.home.servicesIntro}
          </p>
        </div>

        <div
          ref={stageRef}
          className="border-line bg-canvas relative hidden min-h-[560px] overflow-hidden rounded-[24px] border md:block"
        >
          <div className="absolute inset-x-0 top-6 flex justify-center px-6">
            <AnimatePresence mode="wait" initial={false}>
              {selectedService ? (
                <ServiceWindow
                  key={selectedService.slug}
                  service={selectedService}
                  zoomed={zoomed}
                  reducedMotion={reducedMotion}
                  originX={windowOriginX}
                  onClose={() => setOpenSlug(null)}
                  onMinimize={() => setOpenSlug(null)}
                  onZoom={() => setZoomed((value) => !value)}
                />
              ) : null}
            </AnimatePresence>
          </div>
          {!selectedService ? (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
              <p className="text-ink-soft text-2xl" aria-hidden="true">
                {String.fromCodePoint(175, 92, 95, 40, 12484, 41, 47, 175)}
              </p>
              <p className="text-small text-ink-soft mt-2">
                Pick an app in the Dock.
              </p>
            </div>
          ) : null}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <ServiceDock
              services={services}
              openSlug={openSlug}
              bounceTarget={bounceTarget}
              onOpen={openService}
              onRegister={registerIcon}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-x-2 gap-y-7 md:hidden">
          {services.map((service) => (
            <button
              key={service.slug}
              ref={(node) => {
                if (node) mobileIconRefs.current.set(service.slug, node);
                else mobileIconRefs.current.delete(service.slug);
              }}
              type="button"
              aria-label={service.title}
              aria-haspopup="dialog"
              aria-expanded={mobileSlug === service.slug}
              onClick={() => openMobileService(service)}
              className="focus-visible:outline-accent flex min-w-0 flex-col items-center gap-2 rounded-lg px-1 py-1 text-center focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <AppIcon
                accent={service.accent}
                emojiKey={service.emoji}
                size={56}
              />
              <span className="text-ink text-xs leading-tight">
                {service.title}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {mobileSlug && selectedMobileService ? (
            <MobileServiceSheet
              key={selectedMobileService.slug}
              service={selectedMobileService}
              reducedMotion={reducedMotion}
              closeRef={mobileCloseRef}
              onClose={closeMobileSheet}
              onKeyDown={handleDialogKeyDown}
            />
          ) : null}
        </AnimatePresence>

        <nav
          aria-label="All services"
          className="sr-only focus-within:not-sr-only focus-within:static focus-within:p-2"
        >
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6">
          <Link
            href="/services"
            className="text-small text-link focus-visible:outline-accent font-semibold underline-offset-4 hover:underline focus-visible:outline-2"
          >
            See all services
          </Link>
        </div>
      </div>
    </section>
  );
}

type MobileServiceSheetProps = {
  service: Service;
  reducedMotion: boolean;
  closeRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

function MobileServiceSheet({
  service,
  reducedMotion,
  closeRef,
  onClose,
  onKeyDown,
}: MobileServiceSheetProps) {
  const dragControls = useDragControls();

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end bg-black/25 md:hidden"
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.16 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-sheet-title"
        className="bg-canvas max-h-[88dvh] w-full overflow-y-auto rounded-t-2xl shadow-[0_-8px_36px_rgb(0_0_0_/_0.16)]"
        initial={reducedMotion ? { y: 0 } : { y: 48 }}
        animate={{ y: 0 }}
        exit={reducedMotion ? { y: 0 } : { y: 48 }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        drag={reducedMotion ? false : "y"}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 500) onClose();
        }}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div
          aria-hidden="true"
          className="flex h-8 cursor-grab touch-none items-center justify-center active:cursor-grabbing"
          onPointerDown={(event) => dragControls.start(event)}
        >
          <span className="bg-ink/20 h-1 w-9 rounded-full" />
        </div>
        <div className="border-line flex items-center justify-between border-b px-5 pb-3">
          <h2
            id="service-sheet-title"
            className="text-ink text-sm font-semibold"
          >
            {service.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close service details"
            onClick={onClose}
            className="focus-visible:outline-accent hover:bg-surface grid size-9 place-items-center rounded-full focus-visible:outline-2"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
        <ServiceDetails service={service} compact />
      </motion.div>
    </motion.div>
  );
}
