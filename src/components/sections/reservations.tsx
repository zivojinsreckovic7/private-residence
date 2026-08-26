import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { RESERVE_CTA } from "@/lib/site";

const PROMISES = [
  {
    title: "Direct Communication",
    body: "Speak directly with our team regarding your reservation.",
  },
  {
    title: "Personal Assistance",
    body: "Share any requests or requirements before your arrival.",
  },
  {
    title: "Local Knowledge",
    body: "Discover recommendations for making more of your time in Cyprus.",
  },
  {
    title: "A Considered Arrival",
    body: "Allow us to understand your stay before you reach the residence.",
  },
] as const;

export function Reservations() {
  return (
    <Section tone="surface" className="py-32 md:py-44">
      <Container>
        <Reveal variant="drape">
          <Heading size="display" className="max-w-[14ch]">
            Book Directly With <Accent>MIS</Accent>
          </Heading>
          <p className="text-lead mt-8 text-ink-muted">
            Your experience begins before you arrive.
          </p>
          <p className="text-lead mt-4 text-ink-muted">
            Contact MIS Private Residence directly to discuss availability, your
            stay and any individual requirements.
          </p>
        </Reveal>

        <ul className="mt-20 border-t border-line">
          {PROMISES.map((promise, i) => (
            <Reveal
              as="li"
              key={promise.title}
              delay={i * 70}
              className="grid gap-2 border-b border-line py-7 md:grid-cols-12 md:gap-8"
            >
              <h3 className="font-serif text-title font-light text-ink md:col-span-5">
                {promise.title}
              </h3>
              <p className="text-body text-ink-muted md:col-span-7">
                {promise.body}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <Magnetic className="mt-16 inline-block">
            <Button href="#contact" size="lg" icon>
              {RESERVE_CTA}
            </Button>
          </Magnetic>
        </Reveal>
      </Container>
    </Section>
  );
}
