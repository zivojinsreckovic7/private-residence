import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { Lang } from "@/lib/i18n";

const COPY = {
  en: {
    title: (
      <>
        Close to Cyprus. <Accent>Away</Accent> From Everything Else.
      </>
    ),
    lines: [
      "The best private escapes offer two things at once. A feeling of complete seclusion, and the freedom to explore whenever you choose.",
      "MIS Private Residence places the experience of Cyprus within reach while giving you a private world to return to.",
      "Discover beaches, restaurants, landscapes, culture and the distinctive Mediterranean character of the island.",
      "Then close the door behind you and make the rest of the evening entirely your own.",
    ],
    cta: "Discover Cyprus",
    alt: "The villa facade with bougainvillea along the poolside.",
  },
  sr: {
    title: (
      <>
        Blizu Kipra. <Accent>Daleko</Accent> od svega ostalog.
      </>
    ),
    lines: [
      "Najbolja privatna bekstva nude dve stvari istovremeno: osećaj potpune izdvojenosti i slobodu da istražujete kad god poželite.",
      "MIS Private Residence stavlja doživljaj Kipra nadohvat ruke, a istovremeno vam daje privatan svet u koji se vraćate.",
      "Otkrijte plaže, restorane, predele, kulturu i prepoznatljiv mediteranski karakter ostrva.",
      "A zatim zatvorite vrata za sobom i ostatak večeri učinite potpuno svojim.",
    ],
    cta: "Otkrijte Kipar",
    alt: "Fasada vile sa bugenvilijom uz bazen.",
  },
} as const;

/**
 * The photograph runs off the right edge of the page rather than sitting
 * inside the grid, so the composition reads as a spread rather than a row.
 */
export function Location({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <Section tone="surface" className="overflow-clip py-32 md:py-44">
      <Container className="grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal variant="drape">
            <Heading size="headline" className="max-w-[16ch]">
              {t.title}
            </Heading>
          </Reveal>
          <RevealLines
            step={90}
            className="text-body mt-10 space-y-5 text-ink-muted"
          >
            {t.lines}
          </RevealLines>
          <Reveal delay={420}>
            <Button
              href="#destinations"
              variant="outline"
              icon
              className="mt-12"
            >
              {t.cta}
            </Button>
          </Reveal>
        </div>

        <Reveal
          variant="mask"
          delay={120}
          className="lg:col-span-7 lg:col-start-7 lg:-mr-[14vw]"
        >
          <Parallax
            distance={-70}
            className="rounded-surface aspect-[5/4] bg-canvas lg:aspect-[16/11]"
          >
            <Image
              src="/gallery/exterior/villa-facade-pool-bougainvillea.jpeg"
              alt={t.alt}
              fill
              sizes="(min-width: 1024px) 65vw, 100vw"
              className="object-cover"
            />
          </Parallax>
        </Reveal>
      </Container>
    </Section>
  );
}
