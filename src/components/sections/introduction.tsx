import { RisingPlate } from "@/components/motion/rising-plate";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { HERO_OVERLAP } from "@/components/sections/hero";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const COPY = [
  "MIS Private Residence was created around space, privacy and the freedom to experience Cyprus entirely on your own terms.",
  "Days begin slowly beside the water. Interiors open naturally into the outdoors. Evenings stretch long after sunset.",
  "Nothing needs to be rushed.",
  "Nothing needs to compete for your attention.",
  "For the duration of your stay, this world is entirely yours.",
] as const;

/**
 * The first paper plate. It rides up over the pinned walkthrough, which is why
 * it carries the hero's overlap and its own opaque background.
 */
export function Introduction() {
  return (
    <RisingPlate overlap={HERO_OVERLAP}>
      <Section tone="canvas" className="pt-32 pb-40 md:pt-44 md:pb-56">
        <Container>
          <Reveal variant="drape">
            <Heading size="mega" className="max-w-[11ch]">
              The whole
              <br />
              <Accent>house.</Accent>
            </Heading>
          </Reveal>

          <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12">
            <Reveal
              variant="rise"
              delay={80}
              className="lg:col-span-4 lg:col-start-1"
            >
              <p className="font-serif text-title text-ink">
                There is luxury you can see.
              </p>
              <p className="font-serif text-title mt-1 text-ink">
                Then there is luxury you can feel.
              </p>
            </Reveal>

            <RevealLines
              step={90}
              className="text-lead space-y-6 text-ink-muted lg:col-span-6 lg:col-start-7"
            >
              {COPY}
            </RevealLines>
          </div>
        </Container>
      </Section>
    </RisingPlate>
  );
}
