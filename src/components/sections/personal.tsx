import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export function Personal() {
  return (
    <Section tone="canvas" className="py-32 md:py-44">
      <Container className="grid gap-16 lg:grid-cols-12">
        <Reveal variant="drape" className="lg:col-span-5">
          <Heading size="display" className="max-w-[10ch]">
            Make the Stay <Accent>Yours</Accent>
          </Heading>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={80}>
            <p className="font-serif text-title text-ink">
              No two stays need to feel the same.
            </p>
            <p className="text-lead mt-8 text-ink-muted">
              Whether you are planning a quiet private escape, time with family
              and friends, a special occasion or simply several days away from
              everything else, your stay can be shaped around you.
            </p>
            <p className="text-lead mt-4 text-ink-muted">
              For special requests or arrangements, contact our team before
              arrival.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Magnetic className="mt-12 inline-block">
              <Button href="/contact" icon size="lg">
                Plan Your Stay
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
