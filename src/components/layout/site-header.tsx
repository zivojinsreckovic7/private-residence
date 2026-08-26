"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";
import { cn } from "@/lib/cn";
import { RESERVE_CTA, navigation, site } from "@/lib/site";

/** Scroll past this before the header is allowed to retract. */
const RETRACT_AFTER = 600;

/**
 * Site header.
 *
 * Three states, and the transitions between them are the point:
 * - Over the hero it is full width, tall and transparent, so nothing competes
 *   with the footage.
 * - Once past the hero it condenses into a floating glass pill inset from the
 *   edges, rather than a bar glued to the top of the window.
 * - Scrolling down retracts it out of frame and scrolling up brings it back,
 *   so long stretches of photography are never interrupted.
 *
 * The retraction is driven by MotionValues rather than React state, so the
 * header never re-renders while the page scrolls. Only the transparent/pill
 * switch is state, and that flips once per hero crossing.
 *
 * z-index scale: mobile overlay 30, header 40, loading curtain 50,
 * grain 60.
 */
export function SiteHeader() {
  const [overHero, setOverHero] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const shift = useMotionValue(0);
  const y = useSpring(shift, { stiffness: 260, damping: 34, mass: 0.7 });

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (open || reduced) return;
    const previous = scrollY.getPrevious() ?? 0;
    const goingDown = current > previous;
    shift.set(goingDown && current > RETRACT_AFTER ? -140 : 0);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onPhoto = overHero && !open;

  return (
    <>
      <motion.header
        style={{ y }}
        className="fixed inset-x-0 top-0 z-40 will-change-transform"
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-8",
            "transition-[height,background-color,box-shadow,margin,padding,border-radius]",
            "duration-(--dur-base) ease-out-expo",
            onPhoto
              ? "h-24 max-w-[1440px] px-5 md:px-10"
              : "mt-3 h-14 max-w-[1240px] rounded-full bg-canvas/80 px-3 pl-6 shadow-soft ring-1 ring-line backdrop-blur-xl md:mt-4",
            !onPhoto && "mx-4 md:mx-8",
          )}
        >
          <a href="#top" aria-label={`${site.fullName}, home`}>
            <Wordmark tone={onPhoto ? "onDark" : "ink"} />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <NavLink key={item.href} href={item.href} onPhoto={onPhoto}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:block">
              <Button
                href="#contact"
                variant={onPhoto ? "onDark" : "primary"}
                icon={!onPhoto}
              >
                {RESERVE_CTA}
              </Button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={cn(
                "relative size-11 shrink-0 rounded-full lg:hidden",
                onPhoto ? "text-on-dark" : "text-ink",
              )}
            >
              <MenuLines open={open} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/** Nav link with a rule that wipes in from the left. */
function NavLink({
  href,
  onPhoto,
  children,
}: {
  href: string;
  onPhoto: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative text-meta transition-colors duration-(--dur-fast)",
        onPhoto
          ? "text-on-dark/85 hover:text-on-dark"
          : "text-ink-muted hover:text-ink",
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0",
          "transition-transform duration-(--dur-base) ease-out-expo",
          "group-hover:scale-x-100",
          onPhoto ? "bg-on-dark" : "bg-accent",
        )}
      />
    </a>
  );
}

/** Two rules that rotate into an X rather than swapping icons. */
function MenuLines({ open }: { open: boolean }) {
  const line =
    "absolute left-1/2 h-px w-5 -translate-x-1/2 bg-current transition-transform duration-(--dur-base) ease-swift";
  return (
    <span aria-hidden className="absolute inset-0">
      <span
        className={cn(line, open ? "top-1/2 rotate-45" : "top-[calc(50%-4px)]")}
      />
      <span
        className={cn(line, open ? "top-1/2 -rotate-45" : "top-[calc(50%+4px)]")}
      />
    </span>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-30 bg-canvas transition-opacity duration-(--dur-base) ease-out-expo lg:hidden",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="flex h-full flex-col justify-between px-5 pt-28 pb-10 md:px-10">
        <nav className="flex flex-col items-start gap-1">
          {navigation.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
              className={cn(
                "text-headline font-serif font-light text-ink transition-all duration-(--dur-drape) ease-drape",
                open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div
          style={{ transitionDelay: open ? "460ms" : "0ms" }}
          className={cn(
            "transition-all duration-(--dur-drape) ease-drape",
            open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <Button href="#contact" size="lg" icon onClick={onClose}>
            {RESERVE_CTA}
          </Button>
          <a
            href={`mailto:${site.contact.reservations}`}
            className="text-meta mt-8 block text-ink-subtle"
          >
            {site.contact.reservations}
          </a>
        </div>
      </div>
    </div>
  );
}
