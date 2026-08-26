import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { localePath, type Lang } from "@/lib/i18n";

const COPY = {
  en: {
    title: (
      <>
        Beyond the <Accent>Residence</Accent>
      </>
    ),
  },
  sr: {
    title: (
      <>
        Izvan <Accent>rezidencije</Accent>
      </>
    ),
  },
} as const;

/*
 * TODO: these five need Cyprus photography (coastline, a taverna table, a
 * historic street, an inland landscape, an evening scene). Nothing in the
 * residence shoot covers the island itself, so this is set as an index rather
 * than as cards with villa photos standing in for destinations.
 */
const DESTINATIONS = [
  {
    id: "coast",
    title: { en: "Coast", sr: "Obala" },
    body: {
      en: "Discover the clear Mediterranean waters and beautiful coastline that define Cyprus.",
      sr: "Otkrijte bistro mediteransko more i prelepu obalu koja određuje Kipar.",
    },
  },
  {
    id: "dining",
    title: { en: "Dining", sr: "Gastronomija" },
    body: {
      en: "Experience everything from relaxed local tavernas to sophisticated destination dining.",
      sr: "Doživite sve, od opuštenih lokalnih taverni do sofisticiranih restorana vrednih puta.",
    },
  },
  {
    id: "culture",
    title: { en: "Culture", sr: "Kultura" },
    body: {
      en: "Explore an island shaped by centuries of history, architecture and Mediterranean influence.",
      sr: "Istražite ostrvo oblikovano vekovima istorije, arhitekture i mediteranskih uticaja.",
    },
  },
  {
    id: "nature",
    title: { en: "Nature", sr: "Priroda" },
    body: {
      en: "Leave the coast behind and discover Cyprus through its landscapes, viewpoints and quieter corners.",
      sr: "Ostavite obalu za sobom i otkrijte Kipar kroz njegove predele, vidikovce i mirnije kutke.",
    },
  },
  {
    id: "evenings",
    title: { en: "Evenings", sr: "Večeri" },
    body: {
      en: "Watch the island slow down as warm days become long Mediterranean nights.",
      sr: "Gledajte kako ostrvo usporava dok topli dani prelaze u duge mediteranske noći.",
    },
  },
] as const;

export function Destinations({ lang }: { lang: Lang }) {
  return (
    <Section id="destinations" tone="canvas" className="py-32 md:py-44">
      <Container>
        <Reveal variant="drape">
          <Heading size="display" className="max-w-[14ch]">
            {COPY[lang].title}
          </Heading>
        </Reveal>

        <ul className="mt-20 border-t border-line">
          {DESTINATIONS.map((destination, i) => (
            <Reveal
              as="li"
              key={destination.id}
              delay={i * 70}
              className="border-b border-line"
            >
              <a
                href={localePath("/contact", lang)}
                className="group grid items-baseline gap-3 py-8 md:grid-cols-12 md:gap-8"
              >
                <h3 className="font-serif text-headline font-light text-ink transition-[color,transform] duration-(--dur-base) ease-out-expo group-hover:translate-x-2 group-hover:text-accent md:col-span-4">
                  {destination.title[lang]}
                </h3>
                <p className="text-body text-ink-muted md:col-span-6">
                  {destination.body[lang]}
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
