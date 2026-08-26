"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/container";
import { window01 } from "@/lib/ramp";
import type { PhotoGroup } from "@/lib/gallery";

/** Track geometry, in viewport widths. */
const GAP = 1.5;
const PAD = 8;

/**
 * Frame shapes, cycled by position.
 *
 * Width is in vw because the pan distance has to be computed in vw; height is
 * in vh so the frames actually fill the pinned stage instead of floating in
 * the middle of it. That means the printed aspect drifts a little with the
 * window's own ratio, which `object-cover` absorbs — the alternative, deriving
 * height from width, leaves every frame about half the height of the stage on
 * a laptop.
 */
const SHAPES = [
  { w: 32, h: 58, dy: 0 },
  { w: 42, h: 50, dy: 3 },
  { w: 26, h: 64, dy: -3 },
  { w: 38, h: 54, dy: 2 },
  { w: 30, h: 48, dy: -2 },
] as const;

/**
 * The gallery, panned sideways while the page holds.
 *
 * Vertical scroll drives horizontal travel: the whole collection is one wall
 * you move along, rather than a stack of equal rectangles or a carousel that
 * waits to be clicked. The room label and the progress rail are driven from
 * the same scroll position, so the page always says where in the house you are.
 *
 * Everything here is a MotionValue. Nothing in the pan touches React state, so
 * scrolling never causes a render.
 *
 * Below `lg` it becomes a native scroll-snap strip. A pinned pan on a phone
 * costs a lot of vertical scroll for a gesture the device already does better,
 * so the mobile version keeps the idea and drops the mechanism.
 */
export function GalleryWall({ groups }: { groups: readonly PhotoGroup[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /*
   * The track is measured from the data rather than written down as a
   * constant, so adding or removing a photograph cannot leave the pan distance
   * silently wrong. Positions are cumulative offsets along the track, in vw.
   */
  const frames = groups.flatMap((group, g) =>
    group.items.map((item, i) => ({
      ...item,
      group: group.label,
      ...SHAPES[(g + i) % SHAPES.length],
    })),
  );

  const placed = frames.map((frame, i) => {
    const start =
      PAD + frames.slice(0, i).reduce((sum, f) => sum + f.w + GAP, 0);
    return { ...frame, start, end: start + frame.w };
  });

  const trackVw = placed[placed.length - 1].end + PAD;
  const travelVw = trackVw - 100;
  const travel = `-${((travelVw / trackVw) * 100).toFixed(3)}%`;

  /*
   * Scene height sets the pan speed. The landing page's shorter strip runs at
   * ~0.87vh of scroll per vw of travel; this one is three times as long, so it
   * is panned faster to keep the page from becoming a corridor.
   */
  const sceneVh = Math.round(100 + travelVw * 0.62);

  const x = useTransform(scrollYProgress, [0, 1], ["0%", travel]);

  /** A group is current while the middle of the viewport is inside its span. */
  const spans = groups.map((group) => {
    const own = placed.filter((frame) => frame.group === group.label);
    const from = (own[0].start - 50) / travelVw;
    const to = (own[own.length - 1].end - 50) / travelVw;
    return { label: group.label, from, to };
  });

  return (
    <>
      <section
        ref={ref}
        aria-label="Residence photographs"
        style={{ "--scene": `${sceneVh}vh` } as React.CSSProperties}
        className="relative hidden h-[var(--scene)] bg-canvas lg:block motion-reduce:h-auto"
      >
        <div className="sticky top-0 flex h-dvh flex-col motion-reduce:static motion-reduce:h-auto">
          <div className="flex flex-1 items-center overflow-clip motion-reduce:overflow-x-auto">
            <motion.ul
              style={{ x }}
              className="flex w-max gap-[1.5vw] px-[8vw] will-change-transform motion-reduce:translate-x-0"
            >
              {placed.map((frame) => (
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
                    sizes={`${frame.w}vw`}
                    boxStyle={{ height: `${frame.h}vh` }}
                  />
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="shrink-0 border-t border-line motion-reduce:hidden">
            <Container className="flex h-20 items-center justify-between gap-10">
              {/*
                Every label stays in the DOM and only its opacity moves, so the
                room names are readable by a crawler and a screen reader and
                the swap costs nothing per frame.
              */}
              <p className="relative h-8 flex-1">
                {spans.map((span) => (
                  <Label key={span.label} progress={scrollYProgress} {...span} />
                ))}
              </p>

              <div className="hidden w-[38%] items-center gap-4 sm:flex">
                <span className="text-label uppercase text-ink-subtle">
                  {placed.length} photographs
                </span>
                <span className="relative h-px flex-1 bg-line">
                  <motion.span
                    style={{ scaleX: scrollYProgress }}
                    className="absolute inset-0 origin-left bg-accent"
                  />
                </span>
              </div>
            </Container>
          </div>
        </div>
      </section>

      {/* Below lg: the device's own horizontal gesture. */}
      <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:px-8 lg:hidden">
        {placed.map((frame) => (
          <li key={frame.src} className="w-[78vw] shrink-0 snap-center">
            <Frame {...frame} sizes="78vw" boxClassName="aspect-[4/3]" />
          </li>
        ))}
      </ul>
    </>
  );
}

function Label({
  progress,
  label,
  from,
  to,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  label: string;
  from: number;
  to: number;
}) {
  const opacity = useTransform(progress, (p) => window01(p, from, to, 0.02));
  return (
    <motion.span
      style={{ opacity }}
      className="font-serif text-title absolute inset-0 font-light text-ink"
    >
      {label}
    </motion.span>
  );
}

function Frame({
  src,
  alt,
  group,
  sizes,
  boxStyle,
  boxClassName,
}: {
  src: string;
  alt: string;
  group: string;
  sizes: string;
  /** Desktop sizes the box in vh; the mobile strip gives it an aspect. */
  boxStyle?: React.CSSProperties;
  boxClassName?: string;
}) {
  return (
    <figure className="group">
      <div
        style={boxStyle}
        className={`rounded-surface relative overflow-clip bg-surface ${boxClassName ?? ""}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-(--dur-drape) ease-drape group-hover:scale-[1.04]"
        />
      </div>
      <figcaption className="text-label mt-4 uppercase text-ink-subtle lg:hidden">
        {group}
      </figcaption>
    </figure>
  );
}
