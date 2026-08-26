import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { Lang } from "@/lib/i18n";

const COPY = {
  en: {
    together: (
      <>
        Space to Come <Accent>Together</Accent>
      </>
    ),
    togetherLead:
      "The heart of MIS Private Residence is designed for connection.",
    living: [
      "Generous living areas provide space for everyone to come together without ever feeling crowded.",
      "From slow mornings and afternoon conversations to dinners that continue late into the evening, the residence adapts naturally around the people staying within it.",
    ],
    rest: (
      <>
        Designed for <Accent>Rest</Accent>
      </>
    ),
    restLead: "Privacy continues throughout the residence.",
    private: [
      "Calm interiors, considered proportions and understated finishes create spaces designed to help you switch off completely.",
      "No noise. No rush.",
      "Just somewhere exceptional to return to at the end of the day.",
    ],
    outside: (
      <>
        Outside Is Part of the <Accent>Residence</Accent>
      </>
    ),
    outsideLead:
      "In Cyprus, outdoor living should never feel secondary. At MIS Private Residence, it is part of the architecture.",
    outdoor: [
      "The pool, terraces and exterior living areas become natural extensions of the interior, allowing the residence to open completely to the Mediterranean climate.",
      "Morning becomes afternoon almost unnoticed. Afternoon becomes evening.",
      "And plans to leave become increasingly easy to cancel.",
    ],
    alts: {
      dining: "The dining table with the living room beyond it.",
      staircase: "The living room with the staircase behind it.",
      bedroom: "A double bedroom opening onto its own balcony.",
      bathroom: "A bathroom with a walk-in shower.",
      terrace: "The covered terrace lounge alongside the pool.",
    },
  },
  sr: {
    together: (
      <>
        Prostor za <Accent>zajedništvo</Accent>
      </>
    ),
    togetherLead:
      "Srce rezidencije MIS osmišljeno je za zajedničke trenutke.",
    living: [
      "Prostrane dnevne zone pružaju mesta da se svi okupe, a da nikada ne bude tesno.",
      "Od sporih jutara i popodnevnih razgovora do večera koje traju do kasno, rezidencija se prirodno prilagođava ljudima koji u njoj borave.",
    ],
    rest: (
      <>
        Stvoreno za <Accent>odmor</Accent>
      </>
    ),
    restLead: "Privatnost se nastavlja kroz celu rezidenciju.",
    private: [
      "Smireni enterijeri, promišljene proporcije i suzdržane obrade stvaraju prostore koji vam pomažu da se potpuno isključite.",
      "Bez buke. Bez žurbe.",
      "Samo izuzetno mesto na koje se vraćate na kraju dana.",
    ],
    outside: (
      <>
        Spolja je deo <Accent>rezidencije</Accent>
      </>
    ),
    outsideLead:
      "Na Kipru život na otvorenom nikada ne bi trebalo da bude sporedan. U rezidenciji MIS on je deo arhitekture.",
    outdoor: [
      "Bazen, terase i spoljne dnevne zone postaju prirodan nastavak enterijera, dopuštajući rezidenciji da se potpuno otvori mediteranskoj klimi.",
      "Jutro pređe u popodne gotovo neprimetno. Popodne pređe u veče.",
      "A planove da negde krenete sve je lakše otkazati.",
    ],
    alts: {
      dining: "Trpezarijski sto sa dnevnom sobom u pozadini.",
      staircase: "Dnevna soba sa stepeništem u pozadini.",
      bedroom: "Spavaća soba sa francuskim ležajem koja se otvara ka sopstvenom balkonu.",
      bathroom: "Kupatilo sa tuš-kabinom u ravni poda.",
      terrace: "Natkriveni salon na terasi pored bazena.",
    },
  },
} as const;

/**
 * Living, rest and outdoor living. Three different compositions on purpose:
 * two overlapping plates, a pair of quiet portraits, and one photograph the
 * type sits directly on top of. Repeating a split row three times would have
 * been the obvious move and the wrong one.
 */
export function Spaces({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <>
      {/* Two photographs layered, the smaller breaking over the larger. */}
      <Section tone="canvas" className="py-32 md:py-44">
        <Container className="grid items-center gap-16 lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            <Reveal variant="mask">
              <Parallax
                distance={-60}
                className="rounded-surface aspect-[4/3] bg-surface"
              >
                <Image
                  src="/gallery/living/dining-table-toward-living-room.jpeg"
                  alt={t.alts.dining}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </Parallax>
            </Reveal>

            <Reveal
              variant="mask"
              delay={220}
              className="absolute -bottom-16 right-0 w-[46%] lg:-right-16"
            >
              <Parallax
                distance={70}
                className="rounded-surface aspect-square bg-surface ring-8 ring-canvas"
              >
                <Image
                  src="/gallery/living/living-room-and-staircase.jpeg"
                  alt={t.alts.staircase}
                  fill
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className="object-cover"
                />
              </Parallax>
            </Reveal>
          </div>

          <div className="mt-24 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <Reveal variant="drape">
              <Heading size="headline" className="max-w-[12ch]">
                {t.together}
              </Heading>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lead mt-8 text-ink-muted">{t.togetherLead}</p>
            </Reveal>
            <RevealLines
              step={90}
              className="text-body mt-6 space-y-4 text-ink-muted"
            >
              {t.living}
            </RevealLines>
          </div>
        </Container>
      </Section>

      {/* Two portraits at different heights, the quietest moment in the run. */}
      <Section tone="surface" className="py-32 md:py-44">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal variant="drape" className="lg:col-span-4">
              <Heading size="headline" className="max-w-[10ch]">
                {t.rest}
              </Heading>
              <p className="text-lead mt-8 text-ink-muted">{t.restLead}</p>
            </Reveal>

            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              <Reveal variant="mask">
                <Parallax
                  distance={-50}
                  className="rounded-surface aspect-[3/4] bg-canvas"
                >
                  <Image
                    src="/gallery/bedrooms/double-bedroom-with-balcony.jpeg"
                    alt={t.alts.bedroom}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover"
                  />
                </Parallax>
              </Reveal>
              <Reveal variant="mask" delay={160} className="sm:mt-20">
                <Parallax
                  distance={50}
                  className="rounded-surface aspect-[3/4] bg-canvas"
                >
                  <Image
                    src="/gallery/bathrooms/bathroom-walk-in-shower.jpeg"
                    alt={t.alts.bathroom}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover"
                  />
                </Parallax>
              </Reveal>
            </div>
          </div>

          <RevealLines
            step={90}
            className="text-lead mt-24 max-w-[46ch] space-y-4 text-ink-muted lg:ml-auto lg:mr-[8%]"
          >
            {t.private}
          </RevealLines>
        </Container>
      </Section>

      {/* One photograph the type sits directly on. */}
      <section className="relative flex min-h-[86dvh] items-end overflow-clip py-24">
        <Parallax distance={-80} className="absolute inset-0">
          <Image
            src="/gallery/pool-terrace/covered-terrace-lounge-pool.jpeg"
            alt={t.alts.terrace}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-surface-deep/90 via-surface-deep/40 to-surface-deep/20"
        />
        <Container className="relative">
          <Reveal variant="drape">
            <Heading size="display" className="max-w-[18ch] text-on-dark">
              {t.outside}
            </Heading>
          </Reveal>
          <Reveal delay={120} className="mt-10 max-w-[52ch]">
            <p className="text-lead text-on-dark/85">{t.outsideLead}</p>
            <div className="text-body mt-5 space-y-3 text-on-dark/70">
              {t.outdoor.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
