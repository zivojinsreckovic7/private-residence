import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

/*
 * PLACEHOLDER. These are the sample quotes from the copy document, not real
 * reviews, and the attributions are intentionally left as literal placeholders
 * so none of this can be published by accident. Replace with genuine guest
 * reviews before launch. If no real reviews exist yet, remove the section from
 * the page rather than shipping invented ones.
 */
const QUOTES = [
  {
    quote: "An exceptional place to completely switch off.",
    name: "Guest name",
    country: "Country",
  },
  {
    quote:
      "The privacy, design and atmosphere made the entire stay unforgettable.",
    name: "Guest name",
    country: "Country",
  },
  {
    quote:
      "We planned to explore every day. We ended up barely wanting to leave the residence.",
    name: "Guest name",
    country: "Country",
  },
] as const;

export function Testimonials() {
  return (
    <Section tone="surface" className="py-32 md:py-44">
      <Container>
        <Reveal variant="drape">
          <Heading size="headline" className="max-w-[12ch]">
            From Our <Accent>Guests</Accent>
          </Heading>
        </Reveal>

        <div className="mt-20 space-y-16 md:space-y-24">
          {QUOTES.map((item, i) => (
            <Reveal
              as="figure"
              key={item.quote}
              delay={i * 90}
              className={
                i % 2 === 1
                  ? "md:ml-auto md:max-w-[62%]"
                  : "md:max-w-[62%]"
              }
            >
              <blockquote className="font-serif text-headline leading-[1.15] font-light text-ink">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="text-meta mt-6 text-ink-subtle">
                {item.name}, {item.country}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
