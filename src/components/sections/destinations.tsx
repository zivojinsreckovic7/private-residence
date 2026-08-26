import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

/*
 * TODO: these five need Cyprus photography (coastline, a taverna table, a
 * historic street, an inland landscape, an evening scene). Nothing in the
 * residence shoot covers the island itself, so this is set as an index rather
 * than as cards with villa photos standing in for destinations.
 */
const DESTINATIONS = [
  {
    title: "Coast",
    body: "Discover the clear Mediterranean waters and beautiful coastline that define Cyprus.",
  },
  {
    title: "Dining",
    body: "Experience everything from relaxed local tavernas to sophisticated destination dining.",
  },
  {
    title: "Culture",
    body: "Explore an island shaped by centuries of history, architecture and Mediterranean influence.",
  },
  {
    title: "Nature",
    body: "Leave the coast behind and discover Cyprus through its landscapes, viewpoints and quieter corners.",
  },
  {
    title: "Evenings",
    body: "Watch the island slow down as warm days become long Mediterranean nights.",
  },
] as const;

export function Destinations() {
  return (
    <Section id="destinations" tone="canvas" className="py-32 md:py-44">
      <Container>
        <Reveal variant="drape">
          <Heading size="display" className="max-w-[14ch]">
            Beyond the <Accent>Residence</Accent>
          </Heading>
        </Reveal>

        <ul className="mt-20 border-t border-line">
          {DESTINATIONS.map((destination, i) => (
            <Reveal
              as="li"
              key={destination.title}
              delay={i * 70}
              className="border-b border-line"
            >
              <a
                href="#contact"
                className="group grid items-baseline gap-3 py-8 md:grid-cols-12 md:gap-8"
              >
                <h3 className="font-serif text-headline font-light text-ink transition-[color,transform] duration-(--dur-base) ease-out-expo group-hover:translate-x-2 group-hover:text-accent md:col-span-4">
                  {destination.title}
                </h3>
                <p className="text-body text-ink-muted md:col-span-6">
                  {destination.body}
                </p>
                <span className="hidden justify-end md:col-span-2 md:flex">
                  <ArrowUpRight
                    size={22}
                    weight="light"
                    aria-hidden
                    className="text-ink-faint transition-[transform,color] duration-(--dur-base) ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
