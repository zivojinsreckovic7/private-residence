import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

/**
 * Six highlights on a twelve column field. Each has its own span, its own crop
 * and its own vertical offset, so the eye travels down the page rather than
 * scanning three equal cards across it.
 */
const HIGHLIGHTS = [
  {
    title: "Private Pool",
    body: "A private setting for morning swims, long afternoons and evenings beneath the Cyprus sky.",
    image: "/gallery/pool-terrace/pool-lengthwise-to-villa.jpeg",
    alt: "The pool running the length of the terrace toward the villa.",
    place: "lg:col-span-7",
    aspect: "aspect-[16/11]",
    drift: -70,
  },
  {
    title: "Indoor-Outdoor Living",
    body: "Open living spaces connect naturally with the exterior, creating a seamless flow throughout the residence.",
    image: "/gallery/living/living-room-toward-pool.jpeg",
    alt: "The living room looking out through open glass doors to the pool.",
    place: "lg:col-span-4 lg:col-start-9 lg:mt-32",
    aspect: "aspect-[3/4]",
    drift: 60,
  },
  {
    title: "Refined Interiors",
    body: "Contemporary design, considered materials and a calm, understated approach to luxury.",
    image: "/gallery/kitchen/kitchen-island-and-display-shelves.jpeg",
    alt: "The kitchen island with display shelving behind it.",
    place: "lg:col-span-5 lg:col-start-2 lg:-mt-24",
    aspect: "aspect-[4/5]",
    drift: -50,
  },
  {
    title: "Private Outdoor Spaces",
    body: "Room to relax, dine and spend the day entirely at your own pace.",
    image: "/gallery/pool-terrace/terrace-hanging-chair-and-dining.jpeg",
    alt: "A hanging chair and outdoor dining table on the terrace.",
    place: "lg:col-span-5 lg:col-start-8 lg:mt-16",
    aspect: "aspect-[4/3]",
    drift: 70,
  },
  {
    title: "Generous Living Areas",
    body: "Beautifully proportioned spaces created for both shared moments and complete relaxation.",
    image: "/gallery/living/living-room-sectional-wide.jpeg",
    alt: "The full width of the living room and its sectional sofa.",
    place: "lg:col-span-6 lg:-mt-16",
    aspect: "aspect-[16/11]",
    drift: -60,
  },
  {
    title: "Complete Privacy",
    body: "A residence that is yours to experience without crowds, shared spaces or interruption.",
    image: "/gallery/exterior/villa-full-view-with-pool.jpeg",
    alt: "The villa seen in full from across the pool.",
    place: "lg:col-span-4 lg:col-start-8 lg:mt-24",
    aspect: "aspect-[3/4]",
    drift: 50,
  },
] as const;

export function Highlights() {
  return (
    <Section tone="canvas" className="pb-40 md:pb-56">
      <Container>
        <Reveal variant="drape">
          <Heading size="display" className="max-w-[14ch]">
            Made for the Way You <Accent>Want</Accent> to Stay
          </Heading>
        </Reveal>

        <div className="mt-20 grid gap-x-8 gap-y-20 md:mt-28 lg:grid-cols-12">
          {HIGHLIGHTS.map((highlight) => (
            <article key={highlight.title} className={highlight.place}>
              <Reveal variant="mask">
                <Parallax
                  distance={highlight.drift}
                  className={`rounded-surface bg-surface ${highlight.aspect}`}
                >
                  <Image
                    src={highlight.image}
                    alt={highlight.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </Parallax>
              </Reveal>

              <Reveal delay={120}>
                <h3 className="font-serif text-title mt-7 text-ink">
                  {highlight.title}
                </h3>
                <p className="text-body mt-3 max-w-[36ch] text-ink-muted">
                  {highlight.body}
                </p>
              </Reveal>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
