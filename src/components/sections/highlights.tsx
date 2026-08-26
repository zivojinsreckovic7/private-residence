import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import type { Lang } from "@/lib/i18n";

const COPY = {
  en: {
    title: (
      <>
        Made for the Way You <Accent>Want</Accent> to Stay
      </>
    ),
  },
  sr: {
    title: (
      <>
        Prilagođeno načinu na koji <Accent>želite</Accent> da boravite
      </>
    ),
  },
} as const;

/**
 * Six highlights on a twelve column field. Each has its own span, its own crop
 * and its own vertical offset, so the eye travels down the page rather than
 * scanning three equal cards across it.
 *
 * Each entry carries both languages beside its own photograph and placement,
 * so a highlight stays one thing to edit rather than a row of layout in one
 * place and a row of words in another.
 */
const HIGHLIGHTS = [
  {
    title: { en: "Private Pool", sr: "Privatni bazen" },
    body: {
      en: "A private setting for morning swims, long afternoons and evenings beneath the Cyprus sky.",
      sr: "Privatan prostor za jutarnje plivanje, duga popodneva i večeri pod kiparskim nebom.",
    },
    image: "/gallery/pool-terrace/pool-lengthwise-to-villa.jpeg",
    alt: {
      en: "The pool running the length of the terrace toward the villa.",
      sr: "Bazen koji se pruža duž terase prema vili.",
    },
    place: "lg:col-span-7",
    aspect: "aspect-[16/11]",
    drift: -70,
  },
  {
    title: { en: "Indoor-Outdoor Living", sr: "Spoj enterijera i eksterijera" },
    body: {
      en: "Open living spaces connect naturally with the exterior, creating a seamless flow throughout the residence.",
      sr: "Otvoreni dnevni prostori prirodno se povezuju sa spoljašnjim, stvarajući neprekinut tok kroz celu rezidenciju.",
    },
    image: "/gallery/living/living-room-toward-pool.jpeg",
    alt: {
      en: "The living room looking out through open glass doors to the pool.",
      sr: "Dnevna soba sa pogledom kroz otvorena staklena vrata na bazen.",
    },
    place: "lg:col-span-4 lg:col-start-9 lg:mt-32",
    aspect: "aspect-[3/4]",
    drift: 60,
  },
  {
    title: { en: "Refined Interiors", sr: "Prefinjeni enterijeri" },
    body: {
      en: "Contemporary design, considered materials and a calm, understated approach to luxury.",
      sr: "Savremen dizajn, pažljivo birani materijali i smiren, nenametljiv pristup luksuzu.",
    },
    image: "/gallery/kitchen/kitchen-island-and-display-shelves.jpeg",
    alt: {
      en: "The kitchen island with display shelving behind it.",
      sr: "Kuhinjsko ostrvo sa policama u pozadini.",
    },
    place: "lg:col-span-5 lg:col-start-2 lg:-mt-24",
    aspect: "aspect-[4/5]",
    drift: -50,
  },
  {
    title: { en: "Private Outdoor Spaces", sr: "Privatni spoljni prostori" },
    body: {
      en: "Room to relax, dine and spend the day entirely at your own pace.",
      sr: "Prostor za odmor, obedovanje i dan proveden potpuno vašim tempom.",
    },
    image: "/gallery/pool-terrace/terrace-hanging-chair-and-dining.jpeg",
    alt: {
      en: "A hanging chair and outdoor dining table on the terrace.",
      sr: "Viseća fotelja i spoljni trpezarijski sto na terasi.",
    },
    place: "lg:col-span-5 lg:col-start-8 lg:mt-16",
    aspect: "aspect-[4/3]",
    drift: 70,
  },
  {
    title: { en: "Generous Living Areas", sr: "Prostrane dnevne zone" },
    body: {
      en: "Beautifully proportioned spaces created for both shared moments and complete relaxation.",
      sr: "Lepo proporcionisani prostori stvoreni i za zajedničke trenutke i za potpuno opuštanje.",
    },
    image: "/gallery/living/living-room-sectional-wide.jpeg",
    alt: {
      en: "The full width of the living room and its sectional sofa.",
      sr: "Cela širina dnevne sobe sa ugaonom garniturom.",
    },
    place: "lg:col-span-6 lg:-mt-16",
    aspect: "aspect-[16/11]",
    drift: -60,
  },
  {
    title: { en: "Complete Privacy", sr: "Potpuna privatnost" },
    body: {
      en: "A residence that is yours to experience without crowds, shared spaces or interruption.",
      sr: "Rezidencija koju doživljavate bez gužve, zajedničkih prostora i ometanja.",
    },
    image: "/gallery/exterior/villa-full-view-with-pool.jpeg",
    alt: {
      en: "The villa seen in full from across the pool.",
      sr: "Vila u punom pogledu sa druge strane bazena.",
    },
    place: "lg:col-span-4 lg:col-start-8 lg:mt-24",
    aspect: "aspect-[3/4]",
    drift: 50,
  },
] as const;

export function Highlights({ lang }: { lang: Lang }) {
  return (
    <Section tone="canvas" className="pb-40 md:pb-56">
      <Container>
        <Reveal variant="drape">
          <Heading size="display" className="max-w-[14ch]">
            {COPY[lang].title}
          </Heading>
        </Reveal>

        <div className="mt-20 grid gap-x-8 gap-y-20 md:mt-28 lg:grid-cols-12">
          {HIGHLIGHTS.map((highlight) => (
            <article key={highlight.image} className={highlight.place}>
              <Reveal variant="mask">
                <Parallax
                  distance={highlight.drift}
                  className={`rounded-surface bg-surface ${highlight.aspect}`}
                >
                  <Image
                    src={highlight.image}
                    alt={highlight.alt[lang]}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </Parallax>
              </Reveal>

              <Reveal delay={120}>
                <h3 className="font-serif text-title mt-7 text-ink">
                  {highlight.title[lang]}
                </h3>
                <p className="text-body mt-3 max-w-[36ch] text-ink-muted">
                  {highlight.body[lang]}
                </p>
              </Reveal>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
