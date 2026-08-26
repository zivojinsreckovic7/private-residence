import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { Lang } from "@/lib/i18n";

const COPY = {
  en: {
    title: (
      <>
        The Mediterranean, <Accent>Your Way</Accent>
      </>
    ),
    lead: "Cyprus has a rhythm of its own.",
    rhythm: [
      "Warm days.",
      "Clear water.",
      "Long evenings.",
      "Coastal landscapes.",
      "Historic towns.",
      "Quiet beaches.",
      "Exceptional food.",
    ],
    base: "MIS Private Residence gives you a private base from which to experience all of it.",
    choose: (
      <>
        Explore the island when you want adventure.
        <br />
        Return when you want silence.
        <br />
        Or stay exactly where you are.
      </>
    ),
  },
  sr: {
    title: (
      <>
        Mediteran, <Accent>na vaš način</Accent>
      </>
    ),
    lead: "Kipar ima sopstveni ritam.",
    rhythm: [
      "Topli dani.",
      "Bistro more.",
      "Duge večeri.",
      "Priobalni predeli.",
      "Istorijski gradovi.",
      "Mirne plaže.",
      "Izuzetna hrana.",
    ],
    base: "MIS Private Residence daje vam privatnu bazu iz koje sve to možete doživeti.",
    choose: (
      <>
        Istražite ostrvo kada poželite avanturu.
        <br />
        Vratite se kada poželite tišinu.
        <br />
        Ili ostanite tačno tu gde jeste.
      </>
    ),
  },
} as const;

/**
 * The island in its own words. Set as one large serif run rather than a row of
 * pills, which would have read as interface rather than as writing.
 */
export function Cyprus({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <Section id="cyprus" tone="canvas" className="py-32 md:py-48">
      <Container>
        <Reveal variant="drape">
          <Heading size="display" className="max-w-[16ch]">
            {t.title}
          </Heading>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-lead mt-10 text-ink-muted">{t.lead}</p>
        </Reveal>

        <p className="mt-16 max-w-[24ch] font-serif text-mega leading-[1.05] font-light text-ink md:max-w-[20ch]">
          {t.rhythm.map((word, i) => (
            <Reveal
              key={word}
              as="span"
              delay={i * 90}
              className="mr-[0.4em] inline-block"
            >
              {word}
            </Reveal>
          ))}
        </p>

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <Reveal delay={80} className="lg:col-span-5 lg:col-start-7">
            <p className="text-lead text-ink-muted">{t.base}</p>
            <p className="font-serif text-title mt-8 text-ink">{t.choose}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
