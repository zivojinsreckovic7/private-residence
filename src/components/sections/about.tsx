import { Reveal, RevealLines } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

const ABOUT = [
  "The most memorable luxury feels effortless.",
  "It can be found in the space around you. In the privacy you have. In architecture that feels considered rather than excessive.",
  "In being able to spend an entire day without needing anything beyond what is already around you.",
  "Every part of the residence contributes to that experience.",
] as const;

const PHILOSOPHY = [
  "You notice it in the details.",
  "In the materials.",
  "In the light.",
  "In the way spaces connect.",
  "In how effortless everything feels.",
] as const;

const ABSENCES = [
  "No hotel corridors.",
  "No shared pool.",
  "No strangers at breakfast.",
  "No crowded common spaces.",
] as const;

const YOURS = ["Your people.", "Your plans.", "Your pace.", "Your residence."] as const;

export function About() {
  return (
    <>
      <Section id="about" tone="surface" className="py-32 md:py-44">
        <Container className="grid gap-16 lg:grid-cols-12">
          <Reveal variant="drape" className="lg:col-span-5">
            <Heading size="display" className="max-w-[10ch]">
              MIS Private <Accent>Residence</Accent>
            </Heading>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <p className="font-serif text-title text-ink">
                MIS Private Residence was created around a simple idea.
              </p>
            </Reveal>
            <RevealLines
              step={90}
              className="text-lead mt-8 space-y-5 text-ink-muted"
            >
              {ABOUT}
            </RevealLines>
            <Reveal delay={480}>
              <p className="font-serif text-title mt-10 max-w-[36ch] text-ink">
                A private Cyprus retreat designed not simply to be visited, but
                to be remembered.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="canvas" className="py-32 md:py-44">
        <Container>
          <Reveal variant="drape">
            <Heading size="display" className="max-w-[14ch]">
              Luxury Without the <Accent>Noise</Accent>
            </Heading>
          </Reveal>
          <Reveal delay={100} className="mt-12 max-w-[54ch]">
            <p className="text-lead text-ink-muted">
              We believe the best residences do not need to constantly remind
              you that they are luxurious.
            </p>
          </Reveal>
          <ul className="mt-16 grid gap-x-16 gap-y-4 sm:grid-cols-2">
            {PHILOSOPHY.map((line, i) => (
              <Reveal as="li" key={line} delay={i * 90}>
                <span className="font-serif text-title font-light text-ink">
                  {line}
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={520}>
            <p className="text-lead mt-16 max-w-[52ch] text-ink-muted">
              And most importantly, in the privacy to experience it all entirely
              your way.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* The one inverted plate on the page. Type only, no photograph. */}
      <Section tone="deep" className="py-40 md:py-56">
        <Container>
          <Reveal variant="drape">
            <Heading size="mega" className="max-w-[14ch] text-on-dark">
              Entirely <Accent>Yours</Accent>
            </Heading>
          </Reveal>

          <div className="mt-24 grid gap-16 lg:grid-cols-12">
            <ul className="lg:col-span-4">
              {ABSENCES.map((line, i) => (
                <Reveal
                  as="li"
                  key={line}
                  delay={i * 80}
                  className="border-b border-line-on-dark py-4 first:pt-0"
                >
                  <span className="text-lead text-on-dark/55">{line}</span>
                </Reveal>
              ))}
            </ul>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={200}>
                <p className="text-lead max-w-[42ch] text-on-dark/85">
                  MIS Private Residence offers something increasingly rare.
                  Space that is truly your own.
                </p>
              </Reveal>
              <ul className="mt-12 space-y-2">
                {YOURS.map((line, i) => (
                  <Reveal as="li" key={line} delay={300 + i * 110}>
                    <span className="font-serif text-display font-light text-on-dark">
                      {line}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
