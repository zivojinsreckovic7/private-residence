import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { Lang } from "@/lib/i18n";

const COPY = {
  en: {
    title: (
      <>
        Your Reason for <Accent>Escaping</Accent>
      </>
    ),
    lead: "Some stays are planned months in advance. Others happen because you simply need to disappear for a while. MIS Private Residence is made for both.",
    occasions: [
      "Private escapes.",
      "Romantic stays.",
      "Time with family.",
      "Trips with friends.",
      "Special celebrations.",
      "Long Mediterranean weekends.",
      "Or absolutely no occasion at all.",
    ],
  },
  sr: {
    title: (
      <>
        Vaš razlog za <Accent>bekstvo</Accent>
      </>
    ),
    lead: "Neki boravci planiraju se mesecima unapred. Drugi se dese zato što jednostavno morate da nestanete na neko vreme. MIS Private Residence stvorena je za oboje.",
    occasions: [
      "Privatna bekstva.",
      "Romantični boravci.",
      "Vreme sa porodicom.",
      "Putovanja sa prijateljima.",
      "Posebne proslave.",
      "Dugi mediteranski vikendi.",
      "Ili baš nikakav poseban povod.",
    ],
  },
} as const;

export function Occasions({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <Section tone="canvas" className="py-32 md:py-44">
      <Container className="grid gap-16 lg:grid-cols-12">
        <Reveal variant="drape" className="lg:col-span-4">
          <Heading size="headline" className="max-w-[10ch]">
            {t.title}
          </Heading>
          <p className="text-lead mt-8 max-w-[34ch] text-ink-muted">
            {t.lead}
          </p>
        </Reveal>

        <ul className="lg:col-span-7 lg:col-start-6">
          {t.occasions.map((occasion, i) => (
            <Reveal as="li" key={occasion} delay={i * 70}>
              <span className="font-serif text-display leading-[1.2] font-light text-ink">
                {occasion}
              </span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
