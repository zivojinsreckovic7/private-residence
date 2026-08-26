"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/motion/reveal";

const FRAMES = [
  {
    label: "Residence",
    src: "/gallery/exterior/villa-facade-from-pool.jpeg",
    alt: "The villa facade seen across the pool.",
    w: 30, dy: 0, aspect: "aspect-[4/5]",
  },
  {
    label: "Interiors",
    src: "/gallery/living/living-room-and-staircase.jpeg",
    alt: "The living room with the staircase behind it.",
    w: 40, dy: 7, aspect: "aspect-[4/3]",
  },
  {
    label: "Pool",
    src: "/gallery/pool-terrace/pool-through-bougainvillea.jpeg",
    alt: "The pool framed by bougainvillea.",
    w: 26, dy: -5, aspect: "aspect-[3/4]",
  },
  {
    label: "Kitchen",
    src: "/gallery/kitchen/kitchen-island-and-display-shelves.jpeg",
    alt: "The kitchen island with display shelving behind it.",
    w: 34, dy: 4, aspect: "aspect-[4/5]",
  },
  {
    label: "Outdoor Living",
    src: "/gallery/pool-terrace/pool-terrace-lounge-and-dining.jpeg",
    alt: "Lounge seating and a dining table on the pool terrace.",
    w: 44, dy: -6, aspect: "aspect-[16/10]",
  },
  {
    label: "Bedrooms",
    src: "/gallery/bedrooms/twin-bedroom-with-balcony.jpeg",
    alt: "A twin bedroom opening onto its own balcony.",
    w: 28, dy: 6, aspect: "aspect-[3/4]",
  },
  {
    label: "Details",
    src: "/gallery/details/poolside-table-juice-and-fruit.jpeg",
    alt: "Juice and fruit laid out on a poolside table.",
    w: 36, dy: -3, aspect: "aspect-[4/3]",
  },
  {
    label: "Evenings",
    src: "/gallery/exterior/villa-facade-outdoor-cinema.jpeg",
    alt: "The villa facade with the outdoor cinema set up in front of it.",
    w: 30, dy: 5, aspect: "aspect-[4/5]",
  },
] as const;

/*
 * The pan distance is fixed by geometry rather than measured, which keeps the
 * section height stable and avoids a layout shift after mount:
 *
 *   frames  30+40+26+34+44+28+36+30 = 268vw
 *   gaps    7 x 1.5vw               =  10.5vw
 *   padding 8vw + 8vw               =  16vw
 *   track                           = 294.5vw
 *   travel  track - one viewport    = 194.5vw, which is 66% of the track
 *
 * Change any frame width and this number has to change with it.
 */
const TRAVEL = "-66%";
const SCENE_VH = 270;

/**
 * The gallery, panned sideways while the section holds.
 *
 * Vertical scroll drives horizontal travel, so the photographs are read the
 * way they were shot rather than stacked into a grid of equal rectangles.
 *
 * Below `lg` this becomes a native scroll-snap strip instead. A pinned pan on
 * a phone costs a lot of vertical scroll for a gesture the device already does
 * better, so the mobile version keeps the idea and drops the mechanism.
 */
export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", TRAVEL]);

  return (
    <section id="gallery" className="bg-canvas">
      <Container className="pt-28 md:pt-40">
        <Reveal variant="drape">
          <Heading size="display" className="max-w-[14ch]">
            See the <Accent>Residence</Accent>
          </Heading>
        </Reveal>
        <Reveal delay={90} className="mt-8 max-w-[52ch]">
          <p className="text-lead text-ink-muted">
            Architecture can be described. Atmosphere needs to be seen.
          </p>
        </Reveal>
      </Container>

      {/* Desktop: vertical scroll drives the pan. */}
      <section
        ref={ref}
        aria-label="Gallery"
        style={{ "--scene": `${SCENE_VH}vh` } as React.CSSProperties}
        className="relative mt-16 hidden h-[var(--scene)] lg:block motion-reduce:h-auto"
      >
        <div className="sticky top-0 flex h-dvh items-center overflow-clip motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-x-auto">
          <motion.ul
            style={{ x }}
            className="flex w-max gap-[1.5vw] px-[8vw] will-change-transform motion-reduce:translate-x-0"
          >
            {FRAMES.map((frame) => (
              <li
                key={frame.src}
                style={{
                  width: `${frame.w}vw`,
                  transform: `translateY(${frame.dy}vh)`,
                }}
                className="shrink-0"
              >
                <Frame {...frame} sizes={`${frame.w}vw`} />
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Below lg: the device's own horizontal gesture. */}
      <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:px-8 lg:hidden">
        {FRAMES.map((frame) => (
          <li key={frame.src} className="w-[78vw] shrink-0 snap-center">
            <Frame {...frame} sizes="78vw" />
          </li>
        ))}
      </ul>

      <Container className="pt-10 pb-28 md:pb-40">
        <Reveal>
          <Button href="/gallery" variant="outline" icon>
            View Full Gallery
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

function Frame({
  src,
  alt,
  label,
  aspect,
  sizes,
}: {
  src: string;
  alt: string;
  label: string;
  aspect: string;
  sizes: string;
}) {
  return (
    <figure className="group">
      <div
        className={`rounded-surface relative overflow-clip bg-surface ${aspect}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-(--dur-drape) ease-drape group-hover:scale-[1.04]"
        />
      </div>
      <figcaption className="text-label mt-4 uppercase text-ink-subtle">
        {label}
      </figcaption>
    </figure>
  );
}
