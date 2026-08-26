import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { Lang } from "@/lib/i18n";

/*
 * PLACEHOLDER. These are the sample quotes from the copy document, not real
 * reviews, and the attributions are intentionally left as literal placeholders
 * in both languages so none of this can be published by accident. Replace with
 * genuine guest reviews before launch. If no real reviews exist yet, remove
 * the section from the page rather than shipping invented ones — it renders on
 * the landing page and on /experiences, so there are two callers to check.
 */
const COPY = {
  en: {
    title: (
      <>
        From Our <Accent>Guests</Accent>
      </>
    ),
    name: "Guest name",
    country: "Country",
    quotes: [
      "An exceptional place to completely switch off.",
      "The privacy, design and atmosphere made the entire stay unforgettable.",
      "We planned to explore every day. We ended up barely wanting to leave the residence.",
    ],
  },
  sr: {
    title: (
      <>
        Reči naših <Accent>gostiju</Accent>
      </>
    ),
    name: "Ime gosta",
    country: "Država",
    quotes: [
      "Izuzetno mesto da se potpuno isključite.",
      "Privatnost, dizajn i atmosfera učinili su ceo boravak nezaboravnim.",
      "Planirali smo da svakog dana istražujemo. Na kraju jedva da smo želeli da napustimo rezidenciju.",
    ],
  },
} as const;

export function Testimonials({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <Section tone="surface" className="py-32 md:py-44">
      <Container>
        <Reveal variant="drape">
          <Heading size="headline" className="max-w-[12ch]">
            {t.title}
          </Heading>
        </Reveal>

        <div className="mt-20 space-y-16 md:space-y-24">
          {t.quotes.map((quote, i) => (
            <Reveal
              as="figure"
              key={quote}
              delay={i * 90}
              className={
                i % 2 === 1 ? "md:ml-auto md:max-w-[62%]" : "md:max-w-[62%]"
              }
            >
              <blockquote className="font-serif text-headline leading-[1.15] font-light text-ink">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="text-meta mt-6 text-ink-subtle">
                {t.name}, {t.country}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
