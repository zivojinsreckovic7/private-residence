"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Figure } from "@/components/ui/figure";
import type { Lang } from "@/lib/i18n";

type Item = { src: string; alt: string };

const COPY = {
  en: { previous: "Previous photographs", next: "Next photographs" },
  sr: { previous: "Prethodne fotografije", next: "Sledeće fotografije" },
} as const;

/**
 * The container's own content edge, so the first frame lines up with the type
 * above it while the track still spans the full width of the page.
 * Mirrors `Container`: `max-w-[1240px]` centred, `px-8` from `md` up.
 */
const EDGE = "calc(max(0px, (100vw - 1240px)) / 2 + 2rem)";

/**
 * A horizontal strip of photographs that runs off the right edge of the page.
 *
 * Native scroll with CSS snap points, not a carousel library: the browser
 * already does momentum, touch and trackpad better than script can, and the
 * brief was explicitly against hijacked scrolling. The arrows only exist for
 * the one case the platform does not cover, a desktop mouse with no
 * horizontal wheel, and they nudge the same native scroll.
 *
 * The track is keyboard-reachable (`tabIndex`) so arrow keys scroll it, since
 * the photographs themselves are not focusable.
 */
export function PhotoStrip({
  lang,
  title,
  items,
}: {
  lang: Lang;
  title: string;
  items: readonly Item[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const t = COPY[lang];

  const nudge = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    // One card plus the gap, so a nudge always lands on the next snap point.
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * step, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div>
      <Container className="flex items-end justify-between gap-8">
        <Reveal>
          <h2 className="font-serif text-headline font-light text-ink">
            {title}
          </h2>
        </Reveal>
        <div className="hidden shrink-0 gap-2 md:flex">
          <Arrow onClick={() => nudge(-1)} label={t.previous}>
            <ArrowLeft size={18} weight="light" />
          </Arrow>
          <Arrow onClick={() => nudge(1)} label={t.next}>
            <ArrowRight size={18} weight="light" />
          </Arrow>
        </div>
      </Container>

      {/* Runs the full width of the page, so the last frame bleeds off it. */}
      <div
        ref={track}
        role="region"
        aria-label={title}
        tabIndex={0}
        style={{ "--edge": EDGE } as React.CSSProperties}
        className={[
          "mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4",
          // scroll-padding has to match the padding, or the mandatory snap
          // aligns the first frame to the scrollport edge and scrolls the
          // padding away, cutting it off against the left of the window.
          "pl-5 scroll-pl-5 pr-5 md:pl-(--edge) md:scroll-pl-(--edge) md:pr-8",
          "motion-safe:scroll-smooth",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        ].join(" ")}
      >
        {items.map((item, i) => (
          <Reveal
            as="figure"
            key={item.src}
            variant="mask"
            delay={Math.min(i, 3) * 90}
            className="w-[80vw] shrink-0 snap-start sm:w-[54vw] lg:w-[32rem]"
          >
            <Figure
              src={item.src}
              alt={item.alt}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 32rem, (min-width: 640px) 54vw, 80vw"
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Arrow({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-(--dur-base) ease-out-expo hover:border-ink hover:bg-accent-tint active:scale-[0.98]"
    >
      {children}
    </button>
  );
}
