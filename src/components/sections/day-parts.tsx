"use client";

import { useRef } from "react";
import Image from "next/image";
import { MotionValue, motion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/container";
import { ramp, window01 } from "@/lib/ramp";
import { Accent, Heading } from "@/components/ui/heading";
import type { Copy, Lang } from "@/lib/i18n";

type Part = {
  id: string;
  label: Copy<string>;
  /** The heading's opening words, and the one word set in <Accent>. */
  heading: Copy<string>;
  accent: Copy<string>;
  image: string;
  alt: Copy<string>;
  lines: Copy<readonly string[]>;
  /** Progress window in which this chapter is fully legible. */
  window: readonly [number, number];
};

const PARTS: readonly Part[] = [
  {
    id: "morning",
    label: { en: "Morning", sr: "Jutro" },
    heading: { en: "Mornings, ", sr: "Jutra bez " },
    accent: { en: "Unhurried", sr: "žurbe" },
    image: "/gallery/details/outdoor-dining-through-foliage.webp",
    alt: {
      en: "The outdoor dining table seen through foliage in the morning.",
      sr: "Spoljni trpezarijski sto viđen kroz zelenilo u jutarnjim satima.",
    },
    lines: {
      en: [
        "The best days here start slowly.",
        "Natural light fills the residence as Cyprus wakes around you.",
        "Coffee outside. A quiet swim. Breakfast beneath the morning sun.",
        "No alarms. No schedule. No reason to be anywhere else.",
      ],
      sr: [
        "Najbolji dani ovde počinju polako.",
        "Prirodna svetlost ispunjava rezidenciju dok se Kipar budi oko vas.",
        "Kafa napolju. Mirno plivanje. Doručak pod jutarnjim suncem.",
        "Bez budilnika. Bez rasporeda. Bez razloga da budete bilo gde drugde.",
      ],
    },
    window: [0, 0.3],
  },
  {
    id: "day",
    label: { en: "Day", sr: "Dan" },
    heading: { en: "Days Without a ", sr: "Dani bez " },
    accent: { en: "Schedule", sr: "rasporeda" },
    image: "/gallery/pool-terrace/pool-from-covered-lounge.webp",
    alt: {
      en: "The pool seen from the shade of the covered lounge.",
      sr: "Bazen viđen iz hlada natkrivenog salona.",
    },
    lines: {
      en: [
        "Move effortlessly between the residence and its outdoor spaces.",
        "Swim. Read. Share lunch.",
        "Spend hours beneath the Mediterranean sun, then disappear inside for an afternoon rest.",
        "Sometimes the most valuable part of a stay is having absolutely nowhere you need to be.",
      ],
      sr: [
        "Krećite se bez napora između rezidencije i njenih spoljnih prostora.",
        "Plivajte. Čitajte. Ručajte zajedno.",
        "Provedite sate pod mediteranskim suncem, a zatim se povucite unutra na popodnevni odmor.",
        "Ponekad je najdragoceniji deo boravka to što ne morate da budete baš nigde.",
      ],
    },
    window: [0.37, 0.63],
  },
  {
    id: "evening",
    label: { en: "Evening", sr: "Veče" },
    heading: { en: "Stay for ", sr: "Ostanite zbog " },
    accent: { en: "Sunset", sr: "zalaska" },
    image: "/gallery/pool-terrace/pool-outdoor-cinema-screen.webp",
    alt: {
      en: "The outdoor cinema screen standing beside the pool at dusk.",
      sr: "Platno bioskopa na otvorenom pored bazena u sumrak.",
    },
    lines: {
      en: [
        "As the sun begins to disappear, the atmosphere changes.",
        "Warm light moves across the architecture. The pool reflects the evening sky.",
        "Dinner moves outside. Conversations last longer.",
        "This is Cyprus after dark, experienced entirely your way.",
      ],
      sr: [
        "Kako sunce počinje da nestaje, atmosfera se menja.",
        "Topla svetlost prelazi preko arhitekture. Bazen odražava večernje nebo.",
        "Večera se seli napolje. Razgovori traju duže.",
        "To je Kipar posle mraka, doživljen potpuno na vaš način.",
      ],
    },
    window: [0.7, 1],
  },
];

/** Scroll the whole day is spread across, as a multiple of the viewport. */
const SCENE_VH = 290;

/** Crossfade length between chapters, in progress. */
const FADE = 0.07;

/**
 * A day at the residence, as one pinned frame that dissolves through morning,
 * afternoon and evening.
 *
 * Three separate full-bleed sections would have repeated the same shape three
 * times; holding one frame and changing what is inside it reads as a single
 * continuous day instead. Each chapter's photograph drifts slowly inward while
 * its type travels the other way, so the two layers never move together.
 *
 * All three chapters stay in the DOM at all times, as real headings and
 * paragraphs. Only opacity changes, so nothing here is hidden from search or
 * from a screen reader.
 */
export function DayParts({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      id="day"
      style={{ "--scene": `${SCENE_VH}vh` } as React.CSSProperties}
      className="relative h-[var(--scene)] bg-surface-deep motion-reduce:h-auto"
    >
      <div className="sticky top-0 h-dvh overflow-clip motion-reduce:static motion-reduce:h-auto">
        {PARTS.map((part) => (
          <Chapter
            key={part.id}
            part={part}
            lang={lang}
            progress={scrollYProgress}
          />
        ))}

        <ChapterIndex lang={lang} progress={scrollYProgress} />
      </div>
    </section>
  );
}

function Chapter({
  part,
  lang,
  progress,
}: {
  part: Part;
  lang: Lang;
  progress: MotionValue<number>;
}) {
  const [from, to] = part.window;
  const opacity = useTransform(progress, (p) => window01(p, from, to, FADE));
  const scale = useTransform(progress, (p) => ramp(p, from, to, 1.12, 1));
  const typeY = useTransform(progress, (p) => ramp(p, from, to, 40, -40));

  return (
    <motion.article
      style={{ opacity }}
      className="absolute inset-0 flex items-center motion-reduce:relative motion-reduce:min-h-[80dvh] motion-reduce:opacity-100"
    >
      <motion.div
        style={{ scale }}
        className="absolute inset-0 will-change-transform motion-reduce:scale-100"
      >
        <Image
          src={part.image}
          alt={part.alt[lang]}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-surface-deep/90 via-surface-deep/60 to-surface-deep/25"
      />

      <Container className="relative">
        <motion.div style={{ y: typeY }} className="max-w-[46ch]">
          <Heading size="display" className="text-on-dark">
            {part.heading[lang]}
            <Accent>{part.accent[lang]}</Accent>
          </Heading>
          <div className="text-lead mt-8 space-y-4 text-on-dark/80">
            {part.lines[lang].map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </motion.div>
      </Container>
    </motion.article>
  );
}

/**
 * The one place vertical type earns its keep: a chapter index for a scene that
 * holds still while its contents change, so the reader can see where in the
 * day they are.
 */
function ChapterIndex({
  lang,
  progress,
}: {
  lang: Lang;
  progress: MotionValue<number>;
}) {
  return (
    <div className="absolute right-8 bottom-0 top-0 z-10 hidden flex-col items-center justify-center gap-10 lg:flex motion-reduce:hidden">
      {PARTS.map((part) => (
        <IndexLabel
          key={part.id}
          part={part}
          lang={lang}
          progress={progress}
        />
      ))}
    </div>
  );
}

function IndexLabel({
  part,
  lang,
  progress,
}: {
  part: Part;
  lang: Lang;
  progress: MotionValue<number>;
}) {
  const [from, to] = part.window;
  const active = useTransform(progress, (p) => window01(p, from, to, FADE));
  const opacity = useTransform(active, (v) => 0.3 + v * 0.7);
  const rule = useTransform(active, (v) => 0.2 + v * 0.8);

  return (
    <motion.span
      style={{ opacity }}
      className="text-label flex items-center gap-3 [writing-mode:vertical-rl] uppercase text-on-dark"
    >
      <motion.span
        aria-hidden
        style={{ scaleY: rule }}
        className="h-8 w-px origin-center bg-accent-bright"
      />
      {part.label[lang]}
    </motion.span>
  );
}
