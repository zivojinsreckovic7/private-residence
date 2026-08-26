import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const OCCASIONS = [
  "Private escapes.",
  "Romantic stays.",
  "Time with family.",
  "Trips with friends.",
  "Special celebrations.",
  "Long Mediterranean weekends.",
  "Or absolutely no occasion at all.",
] as const;

export function Occasions() {
  return (
    <Section tone="canvas" className="py-32 md:py-44">
      <Container className="grid gap-16 lg:grid-cols-12">
        <Reveal variant="drape" className="lg:col-span-4">
          <Heading size="headline" className="max-w-[10ch]">
            Your Reason for <Accent>Escaping</Accent>
          </Heading>
          <p className="text-lead mt-8 max-w-[34ch] text-ink-muted">
            Some stays are planned months in advance. Others happen because you
            simply need to disappear for a while. MIS Private Residence is made
            for both.
          </p>
        </Reveal>

        <ul className="lg:col-span-7 lg:col-start-6">
          {OCCASIONS.map((occasion, i) => (
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
