import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Figure } from "@/components/ui/figure";
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
 *
 * The heading leaves most of its column empty, so one detail shot sits at the
 * foot of it: a close-up rather than a wide view, because the list beside it is
 * about small things adding up.
 */
export function FeatureIntro() {
  return (
    <Section tone="canvas" className="py-40 md:py-56">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="flex flex-col lg:col-span-5">
            <Reveal variant="drape">
              <Heading size="display" className="max-w-[10ch]">
                Everything in Its <Accent>Place</Accent>
              </Heading>
            </Reveal>

            <Reveal
              variant="mask"
              delay={120}
              className="mt-16 max-w-[26rem] lg:mt-auto"
            >
              <Figure
                src="/gallery/details/poolside-tray-and-pomegranates.jpeg"
                alt="A woven tray of water and mint set beside a bowl of pomegranates at the edge of the pool."
                aspect="aspect-[4/3]"
                sizes="(min-width: 1024px) 26rem, 100vw"
              />
            </Reveal>
          </div>

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
