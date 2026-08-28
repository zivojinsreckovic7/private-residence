import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { FindUs } from "@/components/sections/find-us";
import { Occasions } from "@/components/sections/occasions";
import { Personal } from "@/components/sections/personal";
import { PhotoHero } from "@/components/sections/photo-hero";
import { Testimonials } from "@/components/sections/testimonials";
import { Accent } from "@/components/ui/heading";
import { isLang } from "@/lib/i18n";
import { alternates } from "@/lib/metadata";
import { site } from "@/lib/site";

const COPY = {
  en: {
    title: "The Experience",
    description: `What a stay at ${site.fullName} is actually like: no itinerary, no shared spaces, and the time and privacy to spend the day however you want to.`,
    eyebrow: "Experience",
    heading: (
      <>
        The <Accent>Experience</Accent>
      </>
    ),
    lead: "There is no itinerary here. Luxury is simply having the time, space and privacy to do exactly what you feel like doing.",
    alt: "The covered terrace lounge beside the pool, with the outdoor dining table and hanging chair beyond it.",
  },
  sr: {
    title: "Doživljaj",
    description: `Kako zaista izgleda boravak u rezidenciji ${site.fullName}: bez unapred zadatog plana, bez zajedničkih prostora, sa vremenom i privatnošću da dan provedete kako želite.`,
    eyebrow: "Doživljaj",
    heading: (
      <>
        Vaš <Accent>doživljaj</Accent>
      </>
    ),
    lead: "Ovde nema unapred zadatog plana. Luksuz je jednostavno imati vreme, prostor i privatnost da radite tačno ono što poželite.",
    alt: "Natkriveni salon na terasi pored bazena, sa spoljnim trpezarijskim stolom i visećom foteljom u pozadini.",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/experiences">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return {
    title: COPY[lang].title,
    description: COPY[lang].description,
    alternates: alternates("/experiences", lang),
  };
}

/**
 * The experience page.
 *
 * It composes the landing page's own experience sections rather than restating
 * them in new words: `Experience`, `Occasions`, `Testimonials` and `Personal`
 * are the client's copy, and a second set of near-identical sentences would be
 * worse for the reader and worse for search. Only the hero is written for this
 * page. The landing page keeps its versions; nothing links to those anchors
 * any more, the same as `#about`, `#contact` and `#gallery`.
 *
 * Deliberately no pinned scene here. `DayParts` is the landing page's own
 * moment, and repeating it on a second page would spend it twice.
 */
export default async function ExperiencesPage({
  params,
}: PageProps<"/[lang]/experiences">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = COPY[lang];

  return (
    <>
      <PhotoHero
        eyebrow={t.eyebrow}
        title={t.heading}
        lead={t.lead}
        src="/gallery/pool-terrace/pool-terrace-lounge-and-dining.webp"
        alt={t.alt}
      />

      <Experience lang={lang} />
      <Occasions lang={lang} />
      <Testimonials lang={lang} />
      <Personal lang={lang} />
      <Contact lang={lang} />
      <FindUs lang={lang} tone="canvas" />
    </>
  );
}
