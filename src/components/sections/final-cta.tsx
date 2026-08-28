"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { localePath, type Lang } from "@/lib/i18n";
import { RESERVE_CTA, RESERVE_PATH, site } from "@/lib/site";

const COPY = {
  en: {
    title: (
      <>
        Cyprus Is <Accent>Waiting</Accent>
      </>
    ),
    lines: [
      "Come for the Mediterranean sun.",
      "Stay for the privacy.",
      "Remember everything in between.",
    ],
    signoff: `${site.fullName}. Your private escape in Cyprus.`,
    alt: "The pool and terrace seen from inside the house.",
  },
  sr: {
    title: (
      <>
        Kipar <Accent>čeka</Accent>
      </>
    ),
    lines: [
      "Dođite zbog mediteranskog sunca.",
      "Ostanite zbog privatnosti.",
      "Pamtite sve između.",
    ],
    signoff: `${site.fullName}. Vaše privatno bekstvo na Kipru.`,
    alt: "Bazen i terasa viđeni iz unutrašnjosti kuće.",
  },
} as const;

const SCENE_VH = 200;

/**
 * The closing frame. The photograph settles slowly inward while the type
 * arrives, so the page ends on a held shot rather than a banner.
 */
export function FinalCta({ lang }: { lang: Lang }) {
  const t = COPY[lang];
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
            src="/gallery/pool-terrace/pool-and-terrace-from-house.webp"
            alt={t.alt}
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
                {t.title}
              </Heading>
            </Reveal>
            <div className="text-lead mt-10 max-w-[34ch] space-y-2 text-on-dark/85">
              {t.lines.map((line, i) => (
                <Reveal key={line} delay={200 + i * 90}>
                  <p>{line}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={520}>
              <p className="text-meta mt-10 max-w-[40ch] text-on-dark/60">
                {t.signoff}
              </p>
              <Magnetic className="mt-12 inline-block">
                <Button href={localePath(RESERVE_PATH, lang)} size="lg" icon>
                  {RESERVE_CTA[lang]}
                </Button>
              </Magnetic>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
