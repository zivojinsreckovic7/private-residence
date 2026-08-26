"use client";

import { useEffect, useState } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";
import { cn } from "@/lib/cn";
import { RESERVE_CTA, navigation, site } from "@/lib/site";

/**
 * Site header.
 *
 * One state, always: a floating glass pill inset from the edges, pinned to the
 * top of the window for the whole page. It never retracts and it never
 * dissolves into the photography, so navigation and the reservation link are
 * one glance away at any point in a forty-viewport scroll.
 *
 * Because it is always the same thing, there is nothing here driven by scroll:
 * no listener, no observer, no MotionValues. The only state is whether the
 * mobile menu is open.
 *
 * z-index scale: mobile overlay 30, header 40, loading curtain 50, grain 60.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <div
          className={cn(
            "mx-4 mt-3 flex h-14 max-w-[1240px] items-center justify-between",
            "gap-8 rounded-full px-3 pl-6 md:mx-8 md:mt-4",
            "bg-canvas/80 shadow-soft ring-1 ring-line backdrop-blur-xl",
            "xl:mx-auto",
          )}
        >
          <a href="#top" aria-label={`${site.fullName}, home`}>
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:block">
              <Button href="#contact" icon>
                {RESERVE_CTA}
              </Button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative size-11 shrink-0 rounded-full text-ink lg:hidden"
            >
              <MenuLines open={open} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/** Nav link with a rule that wipes in from the left. */
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group relative text-meta text-ink-muted transition-colors duration-(--dur-fast) hover:text-ink"
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent",
          "transition-transform duration-(--dur-base) ease-out-expo",
          "group-hover:scale-x-100",
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
