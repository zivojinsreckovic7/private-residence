"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";

type ParallaxProps = {
  /** Usually a `next/image` with `fill`. */
  children: React.ReactNode;
  /**
   * Total vertical travel across the time the frame is on screen, in px.
   * Negative hangs back against the scroll, positive runs with it. Keep it
   * under about 90: more than that reads as a gimmick, and more than the
   * 9% of overscan below would expose an edge.
   */
  distance?: number;
  /** Frame classes: aspect ratio, radius, background. */
  className?: string;
};

/**
 * Moves a photograph inside a frame that stays put.
 *
 * The frame is the element that sizes and clips; the image inside it is
 * overscanned vertically by 9% and travels within that margin, so the frame's
 * edges never move and the travel can never expose a gap. Scaling the frame
 * itself would push it past the page's right edge, which is both a horizontal
 * scrollbar and the wrong effect.
 *
 * The scroll target is the frame, which is never transformed. Measuring a
 * transformed element would feed its own movement back into the measurement.
 *
 * Writes only `transform`, to a MotionValue rather than React state, so this
 * never re-renders. Under reduced motion it is a plain static frame.
 */
export function Parallax({
  children,
  distance = 60,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-distance / 2, distance / 2],
  );

  return (
    <div ref={ref} className={cn("relative overflow-clip", className)}>
      {reduced ? (
        <div className="absolute inset-0">{children}</div>
      ) : (
        <motion.div
          style={{ y }}
          className="absolute inset-x-0 -inset-y-[9%] will-change-transform"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
