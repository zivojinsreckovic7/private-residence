import type { Metadata } from "next";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Figure } from "@/components/ui/figure";
import { FindUs } from "@/components/sections/find-us";
import { Accent, Heading } from "@/components/ui/heading";
import { PhotoStrip } from "@/components/ui/photo-strip";
import { Section } from "@/components/ui/section";
import { RESERVE_CTA, site } from "@/lib/site";

const DESCRIPTION =
  "MIS Private Residence is a luxury private villa in Cyprus, created for guests looking for privacy, comfort, contemporary design and a high standard of accommodation.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${site.fullName}`,
    description: DESCRIPTION,
    url: `${site.url}/about`,
    type: "article",
  },
};

/**
 * The reading column. The page sits in the full-width container so its
 * hairlines and photography run the usual width, while the prose keeps a
 * comfortable measure and a left edge shared with everything else.
 */
const COLUMN = "max-w-[46rem]";

const INTRO = [
  "MIS Private Residence is a luxury private villa in Cyprus created for guests looking for privacy, comfort, contemporary design and a high standard of accommodation.",
  "The residence combines spacious interiors, private outdoor areas and carefully designed living spaces to provide a complete luxury villa experience. It is suited to private holidays, family stays, couples, groups of friends and guests looking for premium accommodation in Cyprus with more privacy and independence than a traditional hotel environment.",
  "Every part of MIS Private Residence has been planned around comfort, functionality and quality. From the interior layout to the outdoor areas, the property is designed to support both short luxury escapes and longer stays in Cyprus.",
] as const;

/**
 * The body of the page. `nav` is the short form for the jump list at the top;
 * `title` is the heading itself, which is written for search and is too long
 * to sit in a nav.
 */
const SECTIONS = [
  {
    id: "private-villa",
    nav: "The Villa",
    title: "A Luxury Private Villa in Cyprus",
    paragraphs: [
      "MIS Private Residence offers a private accommodation experience for guests who value space, discretion and flexibility during their stay.",
      "Unlike a hotel or shared resort environment, the residence gives guests access to the property as a private space, allowing them to enjoy their time without shared common areas or the restrictions associated with traditional hospitality.",
      "The villa has been designed with modern living in mind, combining open-plan spaces, contemporary interiors and a strong connection between indoor and outdoor areas.",
      "Large living areas provide space for guests to relax and spend time together, while private spaces throughout the residence allow for comfort and separation when required.",
      "For guests searching for a luxury villa in Cyprus, private villa accommodation or a premium holiday residence, MIS Private Residence provides a setting focused on privacy, quality and a high level of comfort.",
    ],
  },
  {
    id: "design",
    nav: "Design",
    title: "Contemporary Design and High-Quality Living Spaces",
    paragraphs: [
      "The design of MIS Private Residence follows a modern and refined architectural approach.",
      "Interiors are clean, spacious and functional, with an emphasis on natural light, high-quality materials and practical layouts. The overall design is intentionally understated, allowing the architecture, furnishings and surrounding environment to work together without unnecessary decoration.",
      "The main living areas are designed for both everyday comfort and social use. Guests can spend time together, relax indoors, dine, work remotely if required or move easily between interior and exterior areas.",
      "The outdoor spaces form an important part of the residence and are designed to extend the usable living area throughout the day.",
      "This combination of contemporary architecture, generous proportions and private outdoor space makes MIS Private Residence suitable for guests looking for a modern luxury villa in Cyprus rather than a conventional hotel stay.",
    ],
  },
  {
    id: "privacy",
    nav: "Privacy",
    title: "Privacy, Comfort and Exclusive Use",
    paragraphs: [
      "Privacy is one of the main characteristics of MIS Private Residence.",
      "The property is intended to provide guests with a more exclusive and independent experience, with the ability to enjoy the residence and its facilities privately during their stay.",
      "This makes the villa particularly suitable for families, couples, groups and guests who prefer accommodation where they can control their own schedule, meals, leisure time and daily routine.",
      "Guests are able to enjoy the property at their own pace without shared hotel facilities, crowded common areas or fixed schedules.",
      "The residence is designed to provide a comfortable environment throughout the day, whether guests choose to spend most of their time at the villa or use it as a private base while exploring Cyprus.",
      "For travellers prioritising privacy, spacious accommodation and a premium setting, MIS Private Residence offers an alternative to luxury hotels and larger resort properties.",
    ],
  },
  {
    id: "cyprus",
    nav: "Cyprus",
    title: "A Premium Base for Experiencing Cyprus",
    paragraphs: [
      "Cyprus is known for its Mediterranean climate, coastline, beaches, restaurants, historic destinations and year-round appeal.",
      "Staying at MIS Private Residence gives guests the flexibility to combine private villa living with access to the wider experiences available across the island.",
      "Guests can spend their days visiting beaches, exploring nearby towns, discovering local restaurants, experiencing Cypriot culture or simply relaxing at the residence.",
      "This flexibility is one of the main advantages of choosing a private villa in Cyprus. Guests can create their own schedule and decide how much of their stay is spent exploring the destination and how much is spent enjoying the property itself.",
      "MIS Private Residence is designed for travellers who want their accommodation to be an important part of the overall Cyprus experience, rather than simply somewhere to sleep between activities.",
    ],
  },
  {
    id: "private-stays",
    nav: "Private Stays",
    title: "Designed for Memorable Private Stays",
    paragraphs: [
      "MIS Private Residence is suitable for a wide range of private stays, including luxury holidays, romantic escapes, family trips, group travel, celebrations and longer visits to Cyprus.",
      "The property is designed to offer the space and flexibility required for different types of guests while maintaining a consistent focus on quality, privacy and comfort.",
      "From the initial reservation enquiry through to the stay itself, the objective is to provide a straightforward and personalised experience.",
      "Guests can contact the MIS Private Residence team directly regarding availability, stay requirements and additional information before making a reservation.",
    ],
  },
] as const;

const [VILLA, DESIGN, PRIVACY, CYPRUS, STAYS] = SECTIONS;

/** Every line here is a restatement of the prose, never a new claim. */
const AT_A_GLANCE = [
  { term: "Type", detail: "Private villa, exclusive use" },
  { term: "Setting", detail: "Paralimni-Protaras, Cyprus" },
  { term: "Design", detail: "Contemporary architecture, open-plan interiors" },
  { term: "Living", detail: "Spacious indoor areas and private outdoor space" },
  { term: "Suited to", detail: "Families, couples, groups and friends" },
  { term: "Stays", detail: "Short luxury escapes and longer visits" },
] as const;

const STRIP = [
  {
    src: "/gallery/exterior/villa-facade-pool-bougainvillea.jpeg",
    alt: "The villa facade above the pool, its upper balcony clad in stone and the ground floor opening onto the terrace.",
  },
  {
    src: "/gallery/pool-terrace/pool-terrace-lounge-and-dining.jpeg",
    alt: "The covered terrace lounge beside the pool, with the outdoor dining table and hanging chair beyond it.",
  },
  {
    src: "/gallery/living/living-room-sectional-wide.jpeg",
    alt: "The living room sectional facing a wall of glass that slides open to the pool terrace, with the dining table behind.",
  },
  {
    src: "/gallery/bedrooms/double-bedroom-with-balcony.jpeg",
    alt: "A double bedroom with sliding doors onto its own balcony and a framed abstract painting above the bed.",
  },
  {
    src: "/gallery/bedrooms/twin-bedroom-with-balcony.jpeg",
    alt: "A twin bedroom with fitted wardrobes and sliding doors onto a balcony.",
  },
  {
    src: "/gallery/bathrooms/bathroom-walk-in-shower.jpeg",
    alt: "A bathroom finished in large stone-coloured tiles, with a walk-in rain shower and a window beside it.",
  },
] as const;

/**
 * Structured data. This page exists to be found, so the facts a search engine
 * needs are stated once, here, rather than left to be inferred from the prose.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${site.fullName}`,
  url: `${site.url}/about`,
  description: DESCRIPTION,
  mainEntity: {
    "@type": "LodgingBusiness",
    name: site.fullName,
    description: DESCRIPTION,
    url: site.url,
    email: site.contact.reservations,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.latitude,
      longitude: site.address.longitude,
    },
    hasMap: site.address.mapsUrl,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Private pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Private terrace", value: true },
      { "@type": "LocationFeatureSpecification", name: "Exclusive use", value: true },
    ],
  },
};

/**
 * The about page is written for search first, so the whole text is present in
 * the markup as real headings and paragraphs in document order. What keeps it
 * from reading as a wall of prose is the media rhythm: no two neighbouring
 * blocks share a shape. Wide plate, split row, dark summary, pair, strip,
 * band, grid. Nothing here is scroll-linked; entrances only.
 */
export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section tone="canvas" className="pt-40 pb-16 md:pt-52 md:pb-20">
        <Container>
          <div className={COLUMN}>
            <Reveal variant="still">
              <Eyebrow>About</Eyebrow>
            </Reveal>
            <Reveal variant="drape" className="mt-5">
              <Heading as="h1" size="display" className="max-w-[16ch]">
                About MIS <Accent>Private Residence</Accent>
              </Heading>
            </Reveal>
            <RevealLines
              step={80}
              className="mt-10 space-y-6"
              lineClassName="text-lead text-ink-muted"
            >
              {INTRO}
            </RevealLines>
          </div>

          <Reveal delay={240}>
            <nav
              aria-label="On this page"
              className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6"
            >
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-meta text-ink-subtle transition-colors duration-(--dur-fast) hover:text-accent"
                >
                  {section.nav}
                </a>
              ))}
            </nav>
          </Reveal>
        </Container>
      </Section>

      <Section tone="canvas" space="none">
        <Container>
          <Reveal variant="mask" as="figure">
            <Figure
              src="/gallery/exterior/villa-full-view-with-pool.jpeg"
              alt="MIS Private Residence seen in full, its pool and terrace in the foreground and the open-air cinema screen at the far end."
              aspect="aspect-[21/9]"
              sizes="(min-width: 1240px) 1240px, 100vw"
              priority
            />
          </Reveal>
        </Container>
      </Section>

      {/* 01 — split row: prose with a standing photograph alongside it. */}
      <Section id={VILLA.id} tone="canvas" className="pt-16 md:pt-20">
        <Container className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[minmax(0,44rem)_minmax(0,1fr)] lg:gap-16">
          <Prose index={0} section={VILLA} />
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="mask" as="figure">
              <Figure
                src="/gallery/details/outdoor-dining-through-foliage.jpeg"
                alt="The outdoor dining table set for a meal, glimpsed through the foliage at the edge of the terrace."
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The summary plate: the one inverted surface on the page, type only. */}
      <Section tone="deep" className="mt-16 py-20 md:mt-20 md:py-24">
        <Container>
          <Reveal>
            <h2 className="font-serif text-headline font-light text-on-dark">
              At a glance
            </h2>
          </Reveal>
          <dl className="mt-12 grid gap-x-16 sm:grid-cols-2 lg:grid-cols-3">
            {AT_A_GLANCE.map((item, i) => (
              <Reveal
                key={item.term}
                delay={i * 70}
                className="border-t border-line-on-dark py-5"
              >
                <dt className="text-label uppercase text-on-dark/45">
                  {item.term}
                </dt>
                <dd className="text-body mt-2 text-on-dark-muted">
                  {item.detail}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* 02 — prose, then a pair: one interior, one exterior. */}
      <Section id={DESIGN.id} tone="canvas" className="pt-16 md:pt-20">
        <Container className="border-t border-line pt-12">
          <Prose index={1} section={DESIGN} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            <Reveal variant="mask" as="figure">
              <Figure
                src="/gallery/kitchen/kitchen-island-open-to-living.jpeg"
                alt="The kitchen island and breakfast bar, open along its length to the living room beyond."
                aspect="aspect-[4/3]"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </Reveal>
            <Reveal variant="mask" as="figure" delay={110}>
              <Figure
                src="/gallery/pool-terrace/pool-through-bougainvillea.jpeg"
                alt="The pool and covered lounge seen through bougainvillea, with the long dining table and sun loungers alongside."
                aspect="aspect-[4/3]"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 03 — prose alone, so the strip that follows lands. */}
      <Section id={PRIVACY.id} tone="canvas" className="pt-16 md:pt-20">
        <Container className="border-t border-line pt-12">
          <Prose index={2} section={PRIVACY} />
        </Container>
      </Section>

      <Section tone="surface" className="mt-16 py-20 md:mt-20 md:py-24">
        <PhotoStrip title="Room by room" items={STRIP} />
      </Section>

      {/* 04 — prose, then one full-bleed band. */}
      <Section id={CYPRUS.id} tone="canvas" className="pt-16 md:pt-20">
        <Container className="border-t border-line pt-12">
          <Prose index={3} section={CYPRUS} />
        </Container>
      </Section>

      <Section tone="canvas" className="pt-14 md:pt-16" space="none">
        <Reveal variant="mask" as="figure">
          <Figure
            src="/gallery/exterior/villa-facade-from-pool.jpeg"
            alt="The villa from the far side of the pool, its living room open to the terrace across the full width of the ground floor."
            aspect="aspect-[21/9]"
            sizes="100vw"
            className="rounded-none ring-0"
          />
        </Reveal>
      </Section>

      {/* 05 — prose, then a three-up grid. */}
      <Section id={STAYS.id} tone="canvas" className="pt-16 md:pt-20">
        <Container className="border-t border-line pt-12">
          <Prose index={4} section={STAYS} />
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            <Reveal variant="mask" as="figure">
              <Figure
                src="/gallery/pool-terrace/pool-outdoor-cinema-screen.jpeg"
                alt="The outdoor dining table laid with fruit and juice, the pool behind it and the open-air cinema screen at the end of the terrace."
                aspect="aspect-[4/3]"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
            </Reveal>
            <Reveal variant="mask" as="figure" delay={110}>
              <Figure
                src="/gallery/living/living-and-dining-toward-pool.jpeg"
                alt="The open-plan kitchen and breakfast bar at the residence, seen from the dining table beside the shelving niche."
                aspect="aspect-[4/3]"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
            </Reveal>
            <Reveal variant="mask" as="figure" delay={220}>
              <Figure
                src="/gallery/details/poolside-tray-and-pomegranates.jpeg"
                alt="A woven tray of glasses and a bowl of pomegranates on a sun lounger at the edge of the pool."
                aspect="aspect-[4/3]"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="surface" className="mt-16 py-20 md:mt-20 md:py-28">
        <Container>
          <div className={COLUMN}>
            <Reveal>
              <Heading as="h2" size="title" className="font-serif font-light">
                Enquiries
              </Heading>
            </Reveal>
            <div className="mt-8 space-y-4">
              <Reveal delay={60}>
                <p className="text-lead text-ink-muted">
                  For reservation enquiries, contact{" "}
                  <MailLink address={site.contact.reservations} />.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p className="text-lead text-ink-muted">
                  For general information about {site.fullName}, contact{" "}
                  <MailLink address={site.contact.general} />.
                </p>
              </Reveal>
            </div>

            <Reveal delay={180}>
              <p className="font-serif text-title mt-12 text-ink">
                MIS Private Residence provides luxury private accommodation in
                Cyprus for guests looking for modern design, generous living
                spaces, privacy and a more exclusive way to experience the
                island.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <Button href="/contact" size="lg" icon className="mt-12">
                {RESERVE_CTA}
              </Button>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FindUs tone="canvas" />
    </>
  );
}

/** One numbered section of the argument: the rule, the heading, the prose. */
function Prose({
  index,
  section,
}: {
  index: number;
  section: (typeof SECTIONS)[number];
}) {
  return (
    <div className={COLUMN}>
      <Reveal variant="still">
        <p className="text-label uppercase text-ink-subtle">
          {String(index + 1).padStart(2, "0")}
        </p>
      </Reveal>
      <Reveal delay={60}>
        <Heading as="h2" size="headline" className="mt-6 font-serif font-light">
          {section.title}
        </Heading>
      </Reveal>
      <RevealLines
        step={70}
        className="mt-8 space-y-6"
        lineClassName="text-lead text-ink-muted"
      >
        {section.paragraphs}
      </RevealLines>
    </div>
  );
}

function MailLink({ address }: { address: string }) {
  return (
    <a
      href={`mailto:${address}`}
      className="break-words text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-(--dur-fast) hover:text-accent hover:decoration-accent"
    >
      {address}
    </a>
  );
}
