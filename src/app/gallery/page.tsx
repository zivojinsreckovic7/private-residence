import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `The spaces, details and surroundings of ${site.fullName}.`,
};

const GROUPS = [
  {
    id: "exterior",
    label: "The Residence",
    items: [
      {
        src: "/gallery/exterior/villa-facade-from-pool.jpeg",
        alt: "Villa facade from pool.",
      },
      {
        src: "/gallery/exterior/villa-facade-outdoor-cinema.jpeg",
        alt: "Villa facade outdoor cinema.",
      },
      {
        src: "/gallery/exterior/villa-facade-pool-bougainvillea.jpeg",
        alt: "Villa facade pool bougainvillea.",
      },
      {
        src: "/gallery/exterior/villa-full-view-with-pool.jpeg",
        alt: "Villa full view with pool.",
      },
    ],
  },
  {
    id: "pool-terrace",
    label: "Pool & Terrace",
    items: [
      {
        src: "/gallery/pool-terrace/covered-terrace-lounge-pool.jpeg",
        alt: "Covered terrace lounge pool.",
      },
      {
        src: "/gallery/pool-terrace/pool-and-terrace-from-house.jpeg",
        alt: "Pool and terrace from house.",
      },
      {
        src: "/gallery/pool-terrace/pool-from-covered-lounge.jpeg",
        alt: "Pool from covered lounge.",
      },
      {
        src: "/gallery/pool-terrace/pool-lengthwise-to-villa.jpeg",
        alt: "Pool lengthwise to villa.",
      },
      {
        src: "/gallery/pool-terrace/pool-outdoor-cinema-screen.jpeg",
        alt: "Pool outdoor cinema screen.",
      },
      {
        src: "/gallery/pool-terrace/pool-terrace-lounge-and-dining.jpeg",
        alt: "Pool terrace lounge and dining.",
      },
      {
        src: "/gallery/pool-terrace/pool-through-bougainvillea.jpeg",
        alt: "Pool through bougainvillea.",
      },
      {
        src: "/gallery/pool-terrace/terrace-hanging-chair-and-dining.jpeg",
        alt: "Terrace hanging chair and dining.",
      },
    ],
  },
  {
    id: "living",
    label: "Living",
    items: [
      {
        src: "/gallery/living/dining-area-and-shelving-niche.jpeg",
        alt: "Dining area and shelving niche.",
      },
      {
        src: "/gallery/living/dining-table-toward-living-room.jpeg",
        alt: "Dining table toward living room.",
      },
      {
        src: "/gallery/living/living-and-dining-toward-pool.jpeg",
        alt: "Living and dining toward pool.",
      },
      {
        src: "/gallery/living/living-room-and-staircase.jpeg",
        alt: "Living room and staircase.",
      },
      {
        src: "/gallery/living/living-room-sectional-wide.jpeg",
        alt: "Living room sectional wide.",
      },
      {
        src: "/gallery/living/living-room-toward-pool.jpeg",
        alt: "Living room toward pool.",
      },
    ],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    items: [
      {
        src: "/gallery/kitchen/kitchen-bar-from-dining.jpeg",
        alt: "Kitchen bar from dining.",
      },
      {
        src: "/gallery/kitchen/kitchen-galley-and-extractor.jpeg",
        alt: "Kitchen galley and extractor.",
      },
      {
        src: "/gallery/kitchen/kitchen-island-and-display-shelves.jpeg",
        alt: "Kitchen island and display shelves.",
      },
      {
        src: "/gallery/kitchen/kitchen-island-and-entrance.jpeg",
        alt: "Kitchen island and entrance.",
      },
      {
        src: "/gallery/kitchen/kitchen-island-open-to-living.jpeg",
        alt: "Kitchen island open to living.",
      },
    ],
  },
  {
    id: "bedrooms",
    label: "Bedrooms",
    items: [
      {
        src: "/gallery/bedrooms/double-bedroom-with-balcony.jpeg",
        alt: "Double bedroom with balcony.",
      },
      {
        src: "/gallery/bedrooms/twin-bedroom-with-balcony.jpeg",
        alt: "Twin bedroom with balcony.",
      },
    ],
  },
  {
    id: "bathrooms",
    label: "Bathrooms",
    items: [
      {
        src: "/gallery/bathrooms/bathroom-walk-in-shower.jpeg",
        alt: "Bathroom walk in shower.",
      },
    ],
  },
  {
    id: "details",
    label: "Details",
    items: [
      {
        src: "/gallery/details/outdoor-dining-through-foliage.jpeg",
        alt: "Outdoor dining through foliage.",
      },
      {
        src: "/gallery/details/poolside-table-juice-and-fruit.jpeg",
        alt: "Poolside table juice and fruit.",
      },
      {
        src: "/gallery/details/poolside-tray-and-pomegranates.jpeg",
        alt: "Poolside tray and pomegranates.",
      },
    ],
  },
] as const;

/** Every third frame runs full width, so the column never becomes a grid. */
function span(index: number) {
  return index % 3 === 0 ? "sm:col-span-2" : "sm:col-span-1";
}

function aspect(index: number) {
  if (index % 3 === 0) return "aspect-[16/9]";
  return index % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/3]";
}

export default function GalleryPage() {
  return (
    <>
      <Section tone="canvas" className="pt-40 pb-16 md:pt-52">
        <Container>
          <Reveal variant="drape">
            <Heading as="h1" size="display" className="max-w-[14ch]">
              The <Accent>Residence</Accent>, in full
            </Heading>
          </Reveal>
          <Reveal delay={90}>
            <p className="text-lead mt-8 max-w-[52ch] text-ink-muted">
              Architecture can be described. Atmosphere needs to be seen.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <nav aria-label="Gallery sections" className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
              {GROUPS.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="text-meta text-ink-subtle transition-colors duration-(--dur-fast) hover:text-accent"
                >
                  {group.label}
                </a>
              ))}
            </nav>
          </Reveal>
        </Container>
      </Section>

      {GROUPS.map((group, groupIndex) => (
        <Section
          key={group.id}
          id={group.id}
          tone={groupIndex % 2 === 0 ? "canvas" : "surface"}
          className="py-20 md:py-28"
        >
          <Container>
            <Reveal>
              <h2 className="font-serif text-headline font-light text-ink">
                {group.label}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {group.items.map((item, i) => (
                <Reveal
                  as="figure"
                  variant="mask"
                  key={item.src}
                  delay={(i % 2) * 110}
                  className={span(i)}
                >
                  <div
                    className={`rounded-surface relative overflow-clip bg-surface ${aspect(i)}`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-(--dur-drape) ease-drape hover:scale-[1.03]"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="canvas" className="py-24 md:py-32">
        <Container>
          <Reveal>
            <Button href="/#contact" size="lg" icon>
              Reserve Your Stay
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
