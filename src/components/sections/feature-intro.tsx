import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

/** The copy names these as a deliberate list, one beat per line. */
const ELEMENTS = [
  "The architecture.",
  "The light.",
  "The privacy.",
  "The space.",
  "The quiet.",
] as const;

/**
 * A deliberate rest between two loud sections. Nothing moves here except the
 * lines arriving in order, which is the whole point: after the residence opens
 * out and before the day begins, the page holds still.
 */
export function FeatureIntro() {
  return (
    <Section tone="canvas" className="py-40 md:py-56">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal variant="drape" className="lg:col-span-5">
            <Heading size="display" className="max-w-[10ch]">
              Everything in Its <Accent>Place</Accent>
            </Heading>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <p className="text-lead text-ink-muted">
                A remarkable stay is rarely defined by one feature. It is the
                way everything works together.
              </p>
            </Reveal>

            <ul className="mt-16 space-y-2">
              {ELEMENTS.map((element, i) => (
                <Reveal as="li" key={element} delay={200 + i * 110}>
                  <span className="font-serif text-display font-light text-ink">
                    {element}
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={800}>
              <p className="text-lead mt-16 max-w-[48ch] text-ink-muted">
                At MIS Private Residence, each element has been designed to make
                staying in feel every bit as rewarding as exploring Cyprus
                beyond it.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
