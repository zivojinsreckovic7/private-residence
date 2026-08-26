import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Contact } from "@/components/sections/contact";
import { GalleryWall } from "@/components/sections/gallery-wall";
import { PhotoHero } from "@/components/sections/photo-hero";
import { FindUs } from "@/components/sections/find-us";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { galleryGroups } from "@/lib/gallery";
import { isLang } from "@/lib/i18n";
import { alternates } from "@/lib/metadata";
import { site } from "@/lib/site";

const COPY = {
  en: {
    title: "Gallery",
    description: `Photographs of ${site.fullName}: the architecture, the pool terrace, the living spaces, the bedrooms and the details.`,
    eyebrow: "Gallery",
    heading: (
      <>
        The Residence, <Accent>in Full</Accent>
      </>
    ),
    lead: "Architecture can be described. Atmosphere has to be seen. Every room, terrace and corner of the residence, photographed as it is.",
    alt: "The pool running the length of the terrace back toward the villa.",
    scroll:
      "Scroll to move along the wall. Every room of the residence, in the order you would walk it.",
    everyRoom: "Every room, in full",
    grouped: "The complete set, grouped by where it sits in the residence.",
  },
  sr: {
    title: "Galerija",
    description: `Fotografije rezidencije ${site.fullName}: arhitektura, terasa sa bazenom, dnevni prostori, spavaće sobe i detalji.`,
    eyebrow: "Galerija",
    heading: (
      <>
        Rezidencija, <Accent>u celini</Accent>
      </>
    ),
    lead: "Arhitektura se može opisati. Atmosfera se mora videti. Svaka soba, terasa i ugao rezidencije, snimljeni onakvi kakvi jesu.",
    alt: "Bazen koji se pruža duž terase nazad prema vili.",
    scroll:
      "Skrolujte da biste se kretali duž zida. Svaka prostorija rezidencije, redom kojim biste je i obišli.",
    everyRoom: "Svaka prostorija, u celini",
    grouped: "Kompletan set, grupisan prema mestu u rezidenciji.",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/gallery">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return {
    title: COPY[lang].title,
    description: COPY[lang].description,
    alternates: alternates("/gallery", lang),
  };
}

/** Every third frame runs full width, so the column never becomes a grid. */
function span(index: number) {
  return index % 3 === 0 ? "sm:col-span-2" : "sm:col-span-1";
}

function aspect(index: number) {
  if (index % 3 === 0) return "aspect-[16/9]";
  return index % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/3]";
}

export default async function GalleryPage({
  params,
}: PageProps<"/[lang]/gallery">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = COPY[lang];
  const groups = galleryGroups(lang);

  return (
    <>
      <PhotoHero
        eyebrow={t.eyebrow}
        title={t.heading}
        lead={t.lead}
        src="/gallery/pool-terrace/pool-lengthwise-to-villa.jpeg"
        alt={t.alt}
      />

      <Section tone="canvas" space="none" className="pt-16 md:pt-20">
        <Container>
          <Reveal>
            <p className="text-meta max-w-[42ch] text-ink-subtle">
              {t.scroll}
            </p>
          </Reveal>
        </Container>
      </Section>

      <div className="bg-canvas pt-10 pb-16 md:pb-20">
        <GalleryWall lang={lang} groups={groups} />
      </div>

      <Section tone="surface" className="py-20 md:py-24">
        <Container>
          <Reveal variant="drape">
            <Heading
              size="headline"
              className="max-w-[16ch] font-serif font-light"
            >
              {t.everyRoom}
            </Heading>
          </Reveal>
          <Reveal delay={90}>
            <p className="text-lead mt-6 max-w-[48ch] text-ink-muted">
              {t.grouped}
            </p>
          </Reveal>
        </Container>
      </Section>

      {groups.map((group, groupIndex) => (
        <Section
          key={group.id}
          id={group.id}
          tone={groupIndex % 2 === 0 ? "canvas" : "surface"}
          className="py-16 md:py-20"
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

      <Contact lang={lang} />
      <FindUs lang={lang} tone="canvas" />
    </>
  );
}
