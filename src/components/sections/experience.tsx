import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { Lang } from "@/lib/i18n";

const COPY = {
  en: {
    title: (
      <>
        Stay <Accent>Differently</Accent>
      </>
    ),
    lead: "There is no itinerary here.",
    beats: [
      "Wake when you want.",
      "Step outside into the morning sun.",
      "Swim before breakfast.",
      "Let lunch last longer than planned.",
      "Spend the afternoon by the pool.",
      "Open a bottle as the light begins to soften.",
      "Stay outside long after sunset.",
    ],
    close:
      "At MIS Private Residence, luxury is simply having the time, space and privacy to do exactly what you feel like doing.",
  },
  sr: {
    title: (
      <>
        Boravite <Accent>drugačije</Accent>
      </>
    ),
    lead: "Ovde nema unapred zadatog plana.",
    beats: [
      "Probudite se kada želite.",
      "Izađite na jutarnje sunce.",
      "Zaplivajte pre doručka.",
      "Neka ručak potraje duže nego što ste planirali.",
      "Provedite popodne pored bazena.",
      "Otvorite flašu dok svetlost počinje da omekšava.",
      "Ostanite napolju dugo posle zalaska sunca.",
    ],
    close:
      "U rezidenciji MIS luksuz je jednostavno imati vreme, prostor i privatnost da radite tačno ono što poželite.",
  },
} as const;

/**
 * The heading holds still on the left while the day's beats pass it on the
 * right. A sticky column rather than a pinned scene: the same idea of
 * something staying put while content moves, at a quieter scale.
 */
export function Experience({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <Section id="experience" tone="surface" className="py-32 md:py-44">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal variant="drape">
              <Heading size="display" className="max-w-[10ch]">
                {t.title}
              </Heading>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lead mt-8 max-w-[34ch] text-ink-muted">
                {t.lead}
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="lg:col-span-6 lg:col-start-7">
          {t.beats.map((beat, i) => (
            <Reveal
              as="li"
              key={beat}
              delay={i * 60}
              className="border-b border-line py-7 first:pt-0"
            >
              <span className="font-serif text-title font-light text-ink">
                {beat}
              </span>
            </Reveal>
          ))}
          <Reveal delay={480}>
            <p className="text-lead mt-12 text-ink-muted">{t.close}</p>
          </Reveal>
        </ul>
      </Container>
    </Section>
  );
}
