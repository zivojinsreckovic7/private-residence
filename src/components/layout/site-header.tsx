"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AppLink } from "@/components/ui/app-link";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";
import { cn } from "@/lib/cn";
import { LANGS, LANG_NAMES, LANG_TAGS, localePath, type Lang } from "@/lib/i18n";
import { RESERVE_CTA, RESERVE_PATH, navigation, site } from "@/lib/site";

const COPY = {
  en: { home: "home", open: "Open menu", close: "Close menu", language: "Language" },
  sr: {
    home: "početna",
    open: "Otvorite meni",
    close: "Zatvorite meni",
    language: "Jezik",
  },
} as const;

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
export function SiteHeader({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const t = COPY[lang];

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
            "gap-4 rounded-full px-3 pl-6 md:mx-8 md:mt-4 xl:gap-8",
            "bg-canvas/80 shadow-soft ring-1 ring-line backdrop-blur-xl",
            "xl:mx-auto",
          )}
        >
          {/* Root, not `#top`: the mark has to return home from a standalone
              page, and on the landing page `/` still lands on the hero. */}
          <AppLink
            href={localePath("/", lang)}
            aria-label={`${site.fullName}, ${t.home}`}
          >
            <Wordmark />
          </AppLink>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navigation.map((item) => (
              <NavLink key={item.href} href={localePath(item.href, lang)}>
                {item.label[lang]}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitch
              lang={lang}
              label={t.language}
              className="hidden md:flex"
            />

            <Magnetic className="hidden sm:block">
              <Button href={localePath(RESERVE_PATH, lang)} icon>
                {RESERVE_CTA[lang]}
              </Button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.close : t.open}
              aria-expanded={open}
              className="relative size-11 shrink-0 rounded-full text-ink lg:hidden"
            >
              <MenuLines open={open} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu lang={lang} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/**
 * The language switch: both languages always visible, the current one marked,
 * rather than a dropdown that hides the fact the site is written twice.
 *
 * It links to the same page in the other language, not to that language's home
 * page: a reader who has scrolled to the gallery wants the gallery, in
 * Serbian. The path is stripped of any prefix before being rebuilt, so it does
 * not matter whether the router reports the browser URL or the rewritten one.
 */
function LanguageSwitch({
  lang,
  label,
  className,
  onNavigate,
}: {
  lang: Lang;
  label: string;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() ?? "/";
  const bare = pathname.replace(/^\/(en|sr)(?=\/|$)/, "") || "/";

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("items-center gap-2 pr-1 pl-2 flex", className)}
    >
      {LANGS.map((code, i) => {
        const current = code === lang;
        return (
          <span key={code} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="h-3 w-px bg-line-strong" />}
            <AppLink
              href={localePath(bare, code)}
              hrefLang={LANG_TAGS[code]}
              onClick={onNavigate}
              aria-current={current ? "true" : undefined}
              className={cn(
                "text-label uppercase transition-colors duration-(--dur-fast)",
                current
                  ? "font-medium text-ink"
                  : "text-ink-subtle hover:text-accent",
              )}
            >
              <span className="sr-only">{LANG_NAMES[code].full}</span>
              <span aria-hidden>{LANG_NAMES[code].short}</span>
            </AppLink>
          </span>
        );
      })}
    </div>
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
    <AppLink
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
    </AppLink>
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

function MobileMenu({
  lang,
  open,
  onClose,
}: {
  lang: Lang;
  open: boolean;
  onClose: () => void;
}) {
  const t = COPY[lang];

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
            <AppLink
              key={item.href}
              href={localePath(item.href, lang)}
              onClick={onClose}
              style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
              className={cn(
                "text-headline font-serif font-light text-ink transition-all duration-(--dur-drape) ease-drape",
                open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
              )}
            >
              {item.label[lang]}
            </AppLink>
          ))}
        </nav>

        <div
          style={{ transitionDelay: open ? "460ms" : "0ms" }}
          className={cn(
            "transition-all duration-(--dur-drape) ease-drape",
            open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <Button
            href={localePath(RESERVE_PATH, lang)}
            size="lg"
            icon
            onClick={onClose}
          >
            {RESERVE_CTA[lang]}
          </Button>

          <div className="mt-8 flex items-center justify-between gap-6">
            <a
              href={`mailto:${site.contact.reservations}`}
              className="text-meta text-ink-subtle"
            >
              {site.contact.reservations}
            </a>
            <LanguageSwitch
              lang={lang}
              label={t.language}
              onNavigate={onClose}
              className="shrink-0 pr-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
