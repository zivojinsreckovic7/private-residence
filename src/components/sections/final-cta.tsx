"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { RESERVE_CTA, site } from "@/lib/site";

const LINES = [
  "Come for the Mediterranean sun.",
  "Stay for the privacy.",
  "Remember everything in between.",
] as const;

const SCENE_VH = 200;

/**
 * The closing frame. The photograph settles slowly inward while the type
 * arrives, so the page ends on a held shot rather than a banner.
 */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Only the photograph is scroll-linked. The type arrives once and stays:
  // fading closing copy back out as the reader reaches it would be perverse,
  // and one MotionValue here is cheaper than four.
  const settle = useTransform(scrollYProgress, [0, 1], [1.14, 1]);

  return (
    <section
      ref={ref}
      style={{ "--scene": `${SCENE_VH}vh` } as React.CSSProperties}
      className="relative h-[var(--scene)] bg-surface-deep motion-reduce:h-dvh"
    >
      <div className="sticky top-0 flex h-dvh items-center overflow-clip">
        <motion.div
          style={{ scale: settle }}
          className="absolute inset-0 will-change-transform motion-reduce:scale-100"
        >
          <Image
            src="/gallery/pool-terrace/pool-and-terrace-from-house.jpeg"
            alt="The pool and terrace seen from inside the house."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-surface-deep/90 via-surface-deep/65 to-surface-deep/35"
        />

        <Container className="relative">
          <div>
            <Reveal variant="drape">
              <Heading size="mega" className="max-w-[9ch] text-on-dark">
                Cyprus Is <Accent>Waiting</Accent>
              </Heading>
            </Reveal>
            <div className="text-lead mt-10 max-w-[34ch] space-y-2 text-on-dark/85">
              {LINES.map((line, i) => (
                <Reveal key={line} delay={200 + i * 90}>
                  <p>{line}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={520}>
              <p className="text-meta mt-10 max-w-[40ch] text-on-dark/60">
                {site.fullName}. Your private escape in Cyprus.
              </p>
              <Magnetic className="mt-12 inline-block">
                <Button href="#contact" size="lg" icon>
                  {RESERVE_CTA}
                </Button>
              </Magnetic>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
