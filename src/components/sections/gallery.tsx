"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/motion/reveal";
import { localePath, type Lang } from "@/lib/i18n";

const COPY = {
  en: {
    title: (
      <>
        See the <Accent>Residence</Accent>
      </>
    ),
    lead: "Architecture can be described. Atmosphere needs to be seen.",
    region: "Gallery",
    cta: "View Full Gallery",
  },
  sr: {
    title: (
      <>
        Pogledajte <Accent>rezidenciju</Accent>
      </>
    ),
    lead: "Arhitektura se može opisati. Atmosfera se mora videti.",
    region: "Galerija",
    cta: "Pogledajte celu galeriju",
  },
} as const;

const FRAMES = [
  {
    label: { en: "Residence", sr: "Rezidencija" },
    src: "/gallery/exterior/villa-facade-from-pool.jpeg",
    alt: {
      en: "The villa facade seen across the pool.",
      sr: "Fasada vile viđena preko bazena.",
    },
    w: 30, dy: 0, aspect: "aspect-[4/5]",
  },
  {
    label: { en: "Interiors", sr: "Enterijeri" },
    src: "/gallery/living/living-room-and-staircase.jpeg",
    alt: {
      en: "The living room with the staircase behind it.",
      sr: "Dnevna soba sa stepeništem u pozadini.",
    },
    w: 40, dy: 7, aspect: "aspect-[4/3]",
  },
  {
    label: { en: "Pool", sr: "Bazen" },
    src: "/gallery/pool-terrace/pool-through-bougainvillea.jpeg",
    alt: {
      en: "The pool framed by bougainvillea.",
      sr: "Bazen uokviren bugenvilijom.",
    },
    w: 26, dy: -5, aspect: "aspect-[3/4]",
  },
  {
    label: { en: "Kitchen", sr: "Kuhinja" },
    src: "/gallery/kitchen/kitchen-island-and-display-shelves.jpeg",
    alt: {
      en: "The kitchen island with display shelving behind it.",
      sr: "Kuhinjsko ostrvo sa policama u pozadini.",
    },
    w: 34, dy: 4, aspect: "aspect-[4/5]",
  },
  {
    label: { en: "Outdoor Living", sr: "Život na otvorenom" },
    src: "/gallery/pool-terrace/pool-terrace-lounge-and-dining.jpeg",
    alt: {
      en: "Lounge seating and a dining table on the pool terrace.",
      sr: "Sedeći deo i trpezarijski sto na terasi uz bazen.",
    },
    w: 44, dy: -6, aspect: "aspect-[16/10]",
  },
  {
    label: { en: "Bedrooms", sr: "Spavaće sobe" },
    src: "/gallery/bedrooms/twin-bedroom-with-balcony.jpeg",
    alt: {
      en: "A twin bedroom opening onto its own balcony.",
      sr: "Soba sa dva ležaja koja se otvara ka sopstvenom balkonu.",
    },
    w: 28, dy: 6, aspect: "aspect-[3/4]",
  },
  {
    label: { en: "Details", sr: "Detalji" },
    src: "/gallery/details/poolside-table-juice-and-fruit.jpeg",
    alt: {
      en: "Juice and fruit laid out on a poolside table.",
      sr: "Sok i voće posluženi na stolu uz bazen.",
    },
    w: 36, dy: -3, aspect: "aspect-[4/3]",
  },
  {
    label: { en: "Evenings", sr: "Večeri" },
    src: "/gallery/exterior/villa-facade-outdoor-cinema.jpeg",
    alt: {
      en: "The villa facade with the outdoor cinema set up in front of it.",
      sr: "Fasada vile sa bioskopom na otvorenom postavljenim ispred nje.",
    },
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
export function Gallery({ lang }: { lang: Lang }) {
  const t = COPY[lang];
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
            {t.title}
          </Heading>
        </Reveal>
        <Reveal delay={90} className="mt-8 max-w-[52ch]">
          <p className="text-lead text-ink-muted">{t.lead}</p>
        </Reveal>
      </Container>

      {/* Desktop: vertical scroll drives the pan. */}
      <section
        ref={ref}
        aria-label={t.region}
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
                <Frame
                  {...frame}
                  label={frame.label[lang]}
                  alt={frame.alt[lang]}
                  sizes={`${frame.w}vw`}
                />
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Below lg: the device's own horizontal gesture. */}
      <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:px-8 lg:hidden">
        {FRAMES.map((frame) => (
          <li key={frame.src} className="w-[78vw] shrink-0 snap-center">
            <Frame
              {...frame}
              label={frame.label[lang]}
              alt={frame.alt[lang]}
              sizes="78vw"
            />
          </li>
        ))}
      </ul>

      <Container className="pt-10 pb-28 md:pb-40">
        <Reveal>
          <Button href={localePath("/gallery", lang)} variant="outline" icon>
            {t.cta}
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
