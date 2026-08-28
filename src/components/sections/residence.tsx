"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/container";
import { ramp } from "@/lib/ramp";
import { Accent, Heading } from "@/components/ui/heading";
import type { Lang } from "@/lib/i18n";

const COPY = {
  en: {
    title: (
      <>
        Designed for <Accent>Exceptional</Accent> Living
      </>
    ),
    lead: "Every element of MIS Private Residence has been considered as part of one complete experience.",
    lines: [
      "Contemporary architecture meets refined interiors, generous living spaces and an effortless connection between inside and outside.",
      "Natural light moves throughout the residence, while carefully selected materials and understated detailing create an atmosphere that feels sophisticated without becoming formal.",
    ],
    close: "This is luxury without excess.",
    alt: "The living and dining area, open along its full width to the pool terrace.",
  },
  sr: {
    title: (
      <>
        Stvoreno za <Accent>izuzetan</Accent> život
      </>
    ),
    lead: "Svaki element rezidencije MIS osmišljen je kao deo jednog celovitog doživljaja.",
    lines: [
      "Savremena arhitektura susreće se sa prefinjenim enterijerima, prostranim dnevnim zonama i neusiljenom vezom između unutrašnjeg i spoljašnjeg prostora.",
      "Prirodna svetlost kreće se kroz celu rezidenciju, dok pažljivo odabrani materijali i suzdržani detalji stvaraju atmosferu koja je sofisticirana, a nikada formalna.",
    ],
    close: "Ovo je luksuz bez preterivanja.",
    alt: "Dnevni i trpezarijski prostor, otvoren celom širinom ka terasi sa bazenom.",
  },
} as const;

/** Total scroll the expansion is spread across, as a multiple of the viewport. */
const SCENE_VH = 230;

/**
 * The residence, introduced by one photograph opening out.
 *
 * The image starts as a contained plate on white and grows to full bleed as
 * the scene is scrolled, while the heading travels upward at its own rate and
 * the body copy arrives only once the photograph owns the frame. Typography
 * and image deliberately move at different speeds.
 *
 * Everything animated here is `transform` or `opacity`, driven by MotionValues
 * rather than React state, so the scene never re-renders while scrolling.
 * Under reduced motion the CSS collapses the runway to a single viewport and
 * the scene simply presents its finished state.
 */
export function Residence({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const p = scrollYProgress;
  const plate = useTransform(p, (v) => ramp(v, 0, 0.62, 0.72, 1));
  const kenBurns = useTransform(p, (v) => ramp(v, 0, 1, 1.12, 1));
  const veil = useTransform(p, (v) => ramp(v, 0, 0.62, 0.56, 0.68));

  const headingY = useTransform(p, (v) => `${ramp(v, 0, 0.62, 0, -26)}vh`);
  const headingFade = useTransform(p, (v) => ramp(v, 0.3, 0.5, 1, 0));

  const copyFade = useTransform(p, (v) => ramp(v, 0.58, 0.74, 0, 1));
  const copyY = useTransform(p, (v) => ramp(v, 0.55, 0.78, 48, 0));

  return (
    <section
      ref={ref}
      id="residence"
      style={{ "--scene": `${SCENE_VH}vh` } as React.CSSProperties}
      className="relative h-[var(--scene)] bg-canvas motion-reduce:h-dvh"
    >
      <div className="sticky top-0 h-dvh overflow-clip">
        <motion.div
          style={{ scale: plate }}
          className="absolute inset-0 will-change-transform motion-reduce:scale-100"
        >
          <motion.div
            style={{ scale: kenBurns }}
            className="absolute inset-0 motion-reduce:scale-100"
          >
            <Image
              src="/gallery/living/living-and-dining-toward-pool.webp"
              alt={t.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity: veil }}
            aria-hidden
            className="absolute inset-0 bg-surface-deep motion-reduce:opacity-65"
          />
        </motion.div>

        <motion.div
          style={{ y: headingY, opacity: headingFade }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 motion-reduce:opacity-100"
        >
          <Container>
            <Heading size="display" className="max-w-[14ch] text-on-dark">
              {t.title}
            </Heading>
          </Container>
        </motion.div>

        <motion.div
          style={{ opacity: copyFade }}
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[55vh] bg-gradient-to-t from-surface-deep/85 to-transparent motion-reduce:opacity-100"
        />

        <motion.div
          style={{ opacity: copyFade, y: copyY }}
          className="absolute inset-x-0 bottom-[9vh] motion-reduce:opacity-100"
        >
          <Container>
            <div className="max-w-[52ch]">
              <p className="text-lead text-on-dark">{t.lead}</p>
              {t.lines.map((line) => (
                <p key={line} className="text-body mt-4 text-on-dark/75">
                  {line}
                </p>
              ))}
              <p className="font-serif text-title mt-8 text-on-dark">
                {t.close}
              </p>
            </div>
          </Container>
        </motion.div>
      </div>
    </section>
  );
}
