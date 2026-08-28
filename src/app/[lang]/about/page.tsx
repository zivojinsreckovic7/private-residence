import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Figure } from "@/components/ui/figure";
import { FindUs } from "@/components/sections/find-us";
import { Accent, Heading } from "@/components/ui/heading";
import { PhotoStrip } from "@/components/ui/photo-strip";
import { Section } from "@/components/ui/section";
import { photo } from "@/lib/gallery";
import { localePath, LANG_TAGS, isLang, type Lang } from "@/lib/i18n";
import { alternates, ogImages } from "@/lib/metadata";
import { RESERVE_CTA, RESERVE_PATH, site } from "@/lib/site";

/**
 * The reading column. The page sits in the full-width container so its
 * hairlines and photography run the usual width, while the prose keeps a
 * comfortable measure and a left edge shared with everything else.
 */
const COLUMN = "max-w-[46rem]";

/**
 * The page's whole argument, in both languages. `nav` is the short form for
 * the jump list at the top; `title` is the heading itself, which is written
 * for search and is too long to sit in a nav.
 *
 * The photography is not listed here: every shot on this page is looked up in
 * the gallery manifest by path, so its description is written once and stays
 * in step across the site.
 */
const COPY = {
  en: {
    title: "About",
    description:
      "MIS Private Residence is a luxury private villa in Cyprus, created for guests looking for privacy, comfort, contemporary design and a high standard of accommodation.",
    ogTitle: `About ${site.fullName}`,
    eyebrow: "About",
    heading: (
      <>
        About MIS <Accent>Private Residence</Accent>
      </>
    ),
    onThisPage: "On this page",
    atAGlance: "At a glance",
    roomByRoom: "Room by room",
    enquiries: "Enquiries",
    reservationLine: "For reservation enquiries, contact",
    generalLine: `For general information about ${site.fullName}, contact`,
    closing:
      "MIS Private Residence provides luxury private accommodation in Cyprus for guests looking for modern design, generous living spaces, privacy and a more exclusive way to experience the island.",
    amenities: ["Private pool", "Private terrace", "Exclusive use"],
    intro: [
      "MIS Private Residence is a luxury private villa in Cyprus created for guests looking for privacy, comfort, contemporary design and a high standard of accommodation.",
      "The residence combines spacious interiors, private outdoor areas and carefully designed living spaces to provide a complete luxury villa experience. It is suited to private holidays, family stays, couples, groups of friends and guests looking for premium accommodation in Cyprus with more privacy and independence than a traditional hotel environment.",
      "Every part of MIS Private Residence has been planned around comfort, functionality and quality. From the interior layout to the outdoor areas, the property is designed to support both short luxury escapes and longer stays in Cyprus.",
    ],
    sections: [
      {
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
        nav: "Private Stays",
        title: "Designed for Memorable Private Stays",
        paragraphs: [
          "MIS Private Residence is suitable for a wide range of private stays, including luxury holidays, romantic escapes, family trips, group travel, celebrations and longer visits to Cyprus.",
          "The property is designed to offer the space and flexibility required for different types of guests while maintaining a consistent focus on quality, privacy and comfort.",
          "From the initial reservation enquiry through to the stay itself, the objective is to provide a straightforward and personalised experience.",
          "Guests can contact the MIS Private Residence team directly regarding availability, stay requirements and additional information before making a reservation.",
        ],
      },
    ],
    glance: [
      { term: "Type", detail: "Private villa, exclusive use" },
      { term: "Setting", detail: "Paralimni-Protaras, Cyprus" },
      { term: "Design", detail: "Contemporary architecture, open-plan interiors" },
      { term: "Living", detail: "Spacious indoor areas and private outdoor space" },
      { term: "Suited to", detail: "Families, couples, groups and friends" },
      { term: "Stays", detail: "Short luxury escapes and longer visits" },
    ],
  },
  sr: {
    title: "O nama",
    description:
      "MIS Private Residence je luksuzna privatna vila na Kipru, stvorena za goste koji traže privatnost, udobnost, savremen dizajn i visok standard smeštaja.",
    ogTitle: `O rezidenciji ${site.fullName}`,
    eyebrow: "O nama",
    heading: (
      <>
        O rezidenciji MIS <Accent>Private Residence</Accent>
      </>
    ),
    onThisPage: "Na ovoj stranici",
    atAGlance: "Ukratko",
    roomByRoom: "Prostorija po prostorija",
    enquiries: "Upiti",
    reservationLine: "Za upite o rezervaciji obratite se na",
    generalLine: `Za opšte informacije o rezidenciji ${site.fullName} obratite se na`,
    closing:
      "MIS Private Residence pruža luksuzan privatan smeštaj na Kipru gostima koji traže moderan dizajn, prostrane životne zone, privatnost i ekskluzivniji način da dožive ostrvo.",
    amenities: ["Privatni bazen", "Privatna terasa", "Ekskluzivno korišćenje"],
    intro: [
      "MIS Private Residence je luksuzna privatna vila na Kipru, stvorena za goste koji traže privatnost, udobnost, savremen dizajn i visok standard smeštaja.",
      "Rezidencija spaja prostrane enterijere, privatne spoljne zone i pažljivo osmišljene dnevne prostore kako bi pružila potpun doživljaj luksuzne vile. Pogodna je za privatne odmore, porodične boravke, parove, grupe prijatelja i goste koji na Kipru traže vrhunski smeštaj sa više privatnosti i nezavisnosti nego u tradicionalnom hotelskom okruženju.",
      "Svaki deo rezidencije MIS planiran je oko udobnosti, funkcionalnosti i kvaliteta. Od rasporeda enterijera do spoljnih površina, objekat je osmišljen tako da podržava i kratka luksuzna bekstva i duže boravke na Kipru.",
    ],
    sections: [
      {
        nav: "Vila",
        title: "Luksuzna privatna vila na Kipru",
        paragraphs: [
          "MIS Private Residence nudi privatan smeštajni doživljaj gostima koji tokom boravka cene prostor, diskreciju i fleksibilnost.",
          "Za razliku od hotela ili zajedničkog resort okruženja, rezidencija gostima daje ceo objekat na korišćenje kao privatan prostor, tako da svoje vreme provode bez zajedničkih prostorija i ograničenja koja prate tradicionalno ugostiteljstvo.",
          "Vila je projektovana sa savremenim načinom života na umu i spaja otvorene prostore, moderne enterijere i snažnu vezu između unutrašnjih i spoljnih zona.",
          "Prostrane dnevne zone pružaju mesto za opuštanje i druženje, dok privatni delovi rezidencije omogućavaju udobnost i izdvajanje kada je potrebno.",
          "Za goste koji traže luksuznu vilu na Kipru, privatan smeštaj u vili ili vrhunsku rezidenciju za odmor, MIS Private Residence nudi okruženje usmereno na privatnost, kvalitet i visok nivo udobnosti.",
        ],
      },
      {
        nav: "Dizajn",
        title: "Savremen dizajn i kvalitetni životni prostori",
        paragraphs: [
          "Dizajn rezidencije MIS prati savremen i prefinjen arhitektonski pristup.",
          "Enterijeri su čisti, prostrani i funkcionalni, sa naglaskom na prirodnu svetlost, kvalitetne materijale i praktične rasporede. Ukupan dizajn je namerno suzdržan, tako da arhitektura, nameštaj i okruženje deluju zajedno, bez nepotrebne dekoracije.",
          "Glavne dnevne zone osmišljene su i za svakodnevnu udobnost i za druženje. Gosti mogu da provode vreme zajedno, odmaraju u zatvorenom, obeduju, po potrebi rade na daljinu ili se lako kreću između unutrašnjih i spoljnih prostora.",
          "Spoljni prostori čine važan deo rezidencije i osmišljeni su tako da tokom celog dana proširuju upotrebljivu životnu površinu.",
          "Ta kombinacija savremene arhitekture, velikodušnih proporcija i privatnog spoljnog prostora čini rezidenciju MIS pogodnom za goste koji na Kipru traže modernu luksuznu vilu, a ne uobičajen hotelski boravak.",
        ],
      },
      {
        nav: "Privatnost",
        title: "Privatnost, udobnost i ekskluzivno korišćenje",
        paragraphs: [
          "Privatnost je jedna od glavnih odlika rezidencije MIS.",
          "Objekat je zamišljen tako da gostima pruži ekskluzivniji i nezavisniji doživljaj, uz mogućnost da tokom boravka privatno koriste rezidenciju i sve njene sadržaje.",
          "To vilu čini naročito pogodnom za porodice, parove, grupe i goste koji žele smeštaj u kojem sami određuju raspored, obroke, slobodno vreme i dnevni ritam.",
          "Gosti objekat koriste sopstvenim tempom, bez zajedničkih hotelskih sadržaja, prepunih prostorija i unapred zadatih rasporeda.",
          "Rezidencija je osmišljena da pruži udobno okruženje tokom celog dana, bilo da gosti veći deo vremena provode u vili ili je koriste kao privatnu bazu dok istražuju Kipar.",
          "Putnicima kojima su najvažniji privatnost, prostran smeštaj i vrhunsko okruženje, MIS Private Residence nudi alternativu luksuznim hotelima i velikim resort kompleksima.",
        ],
      },
      {
        nav: "Kipar",
        title: "Vrhunska baza za otkrivanje Kipra",
        paragraphs: [
          "Kipar je poznat po mediteranskoj klimi, obali, plažama, restoranima, istorijskim destinacijama i privlačnosti tokom cele godine.",
          "Boravak u rezidenciji MIS gostima daje fleksibilnost da privatan život u vili spoje sa svime što ostrvo nudi.",
          "Dane mogu da provedu obilazeći plaže, istražujući obližnje gradove, otkrivajući lokalne restorane, upoznajući kiparsku kulturu ili se jednostavno odmarajući u rezidenciji.",
          "Ta fleksibilnost je jedna od glavnih prednosti privatne vile na Kipru. Gosti sami prave raspored i odlučuju koliko će boravka posvetiti istraživanju destinacije, a koliko uživanju u samom objektu.",
          "MIS Private Residence namenjena je putnicima koji žele da njihov smeštaj bude važan deo celokupnog doživljaja Kipra, a ne samo mesto za prenoćište između aktivnosti.",
        ],
      },
      {
        nav: "Privatni boravci",
        title: "Stvoreno za pamtljive privatne boravke",
        paragraphs: [
          "MIS Private Residence pogodna je za širok spektar privatnih boravaka: luksuzne odmore, romantična bekstva, porodična putovanja, grupna putovanja, proslave i duže posete Kipru.",
          "Objekat pruža prostor i fleksibilnost koje traže različiti gosti, uz dosledan fokus na kvalitet, privatnost i udobnost.",
          "Od prvog upita za rezervaciju do samog boravka, cilj je jednostavno i personalizovano iskustvo.",
          "Gosti mogu da se obrate timu rezidencije MIS direktno u vezi sa dostupnošću, uslovima boravka i dodatnim informacijama pre nego što rezervišu.",
        ],
      },
    ],
    glance: [
      { term: "Tip", detail: "Privatna vila, ekskluzivno korišćenje" },
      { term: "Lokacija", detail: "Paralimni-Protaras, Kipar" },
      { term: "Dizajn", detail: "Savremena arhitektura, otvoreni enterijeri" },
      { term: "Prostor", detail: "Prostrane unutrašnje zone i privatan spoljni prostor" },
      { term: "Pogodno za", detail: "Porodice, parove, grupe i prijatelje" },
      { term: "Boravci", detail: "Kratka luksuzna bekstva i duže posete" },
    ],
  },
} as const;

/** The `id`s the jump list and the sections share, in order. */
const IDS = ["private-villa", "design", "privacy", "cyprus", "private-stays"];

/**
 * Structured data. This page exists to be found, so the facts a search engine
 * needs are stated once, here, rather than left to be inferred from the prose.
 */
function structuredData(lang: Lang) {
  const t = COPY[lang];
  const url = `${site.url}${localePath("/about", lang)}`;

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t.ogTitle,
    url,
    description: t.description,
    inLanguage: LANG_TAGS[lang],
    mainEntity: {
      "@type": "LodgingBusiness",
      name: site.fullName,
      description: t.description,
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
      amenityFeature: t.amenities.map((name) => ({
        "@type": "LocationFeatureSpecification",
        name,
        value: true,
      })),
    },
  };
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = COPY[lang];

  return {
    title: t.title,
    description: t.description,
    alternates: alternates("/about", lang),
    openGraph: {
      title: t.ogTitle,
      description: t.description,
      url: `${site.url}${localePath("/about", lang)}`,
      images: ogImages(lang),
      type: "article",
    },
  };
}

/**
 * The about page is written for search first, so the whole text is present in
 * the markup as real headings and paragraphs in document order. What keeps it
 * from reading as a wall of prose is the media rhythm: no two neighbouring
 * blocks share a shape. Wide plate, split row, dark summary, pair, strip,
 * band, grid. Nothing here is scroll-linked; entrances only.
 */
export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = COPY[lang];
  const [villa, design, privacy, cyprus, stays] = t.sections;
  const strip = [
    "/gallery/exterior/villa-facade-pool-bougainvillea.webp",
    "/gallery/pool-terrace/pool-terrace-lounge-and-dining.webp",
    "/gallery/living/living-room-sectional-wide.webp",
    "/gallery/bedrooms/double-bedroom-with-balcony.webp",
    "/gallery/bedrooms/twin-bedroom-with-balcony.webp",
    "/gallery/bathrooms/bathroom-walk-in-shower.webp",
  ].map((src) => photo(src, lang));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(lang)),
        }}
      />

      <Section tone="canvas" className="pt-40 pb-16 md:pt-52 md:pb-20">
        <Container>
          <div className={COLUMN}>
            <Reveal variant="still">
              <Eyebrow>{t.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal variant="drape" className="mt-5">
              <Heading as="h1" size="display" className="max-w-[16ch]">
                {t.heading}
              </Heading>
            </Reveal>
            <RevealLines
              step={80}
              className="mt-10 space-y-6"
              lineClassName="text-lead text-ink-muted"
            >
              {t.intro}
            </RevealLines>
          </div>

          <Reveal delay={240}>
            <nav
              aria-label={t.onThisPage}
              className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6"
            >
              {t.sections.map((section, i) => (
                <a
                  key={IDS[i]}
                  href={`#${IDS[i]}`}
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
              {...photo("/gallery/exterior/villa-full-view-with-pool.webp", lang)}
              aspect="aspect-[21/9]"
              sizes="(min-width: 1240px) 1240px, 100vw"
              priority
            />
          </Reveal>
        </Container>
      </Section>

      {/* 01 — split row: prose with a standing photograph alongside it. */}
      <Section id={IDS[0]} tone="canvas" className="pt-16 md:pt-20">
        <Container className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[minmax(0,44rem)_minmax(0,1fr)] lg:gap-16">
          <Prose index={0} section={villa} />
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="mask" as="figure">
              <Figure
                {...photo(
                  "/gallery/details/outdoor-dining-through-foliage.webp",
                  lang,
                )}
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
              {t.atAGlance}
            </h2>
          </Reveal>
          <dl className="mt-12 grid gap-x-16 sm:grid-cols-2 lg:grid-cols-3">
            {t.glance.map((item, i) => (
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
      <Section id={IDS[1]} tone="canvas" className="pt-16 md:pt-20">
        <Container className="border-t border-line pt-12">
          <Prose index={1} section={design} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            <Reveal variant="mask" as="figure">
              <Figure
                {...photo(
                  "/gallery/kitchen/kitchen-island-open-to-living.webp",
                  lang,
                )}
                aspect="aspect-[4/3]"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </Reveal>
            <Reveal variant="mask" as="figure" delay={110}>
              <Figure
                {...photo(
                  "/gallery/pool-terrace/pool-through-bougainvillea.webp",
                  lang,
                )}
                aspect="aspect-[4/3]"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 03 — prose alone, so the strip that follows lands. */}
      <Section id={IDS[2]} tone="canvas" className="pt-16 md:pt-20">
        <Container className="border-t border-line pt-12">
          <Prose index={2} section={privacy} />
        </Container>
      </Section>

      <Section tone="surface" className="mt-16 py-20 md:mt-20 md:py-24">
        <PhotoStrip lang={lang} title={t.roomByRoom} items={strip} />
      </Section>

      {/* 04 — prose, then one full-bleed band. */}
      <Section id={IDS[3]} tone="canvas" className="pt-16 md:pt-20">
        <Container className="border-t border-line pt-12">
          <Prose index={3} section={cyprus} />
        </Container>
      </Section>

      <Section tone="canvas" className="pt-14 md:pt-16" space="none">
        <Reveal variant="mask" as="figure">
          <Figure
            {...photo("/gallery/exterior/villa-facade-from-pool.webp", lang)}
            aspect="aspect-[21/9]"
            sizes="100vw"
            className="rounded-none ring-0"
          />
        </Reveal>
      </Section>

      {/* 05 — prose, then a three-up grid. */}
      <Section id={IDS[4]} tone="canvas" className="pt-16 md:pt-20">
        <Container className="border-t border-line pt-12">
          <Prose index={4} section={stays} />
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            <Reveal variant="mask" as="figure">
              <Figure
                {...photo(
                  "/gallery/pool-terrace/pool-outdoor-cinema-screen.webp",
                  lang,
                )}
                aspect="aspect-[4/3]"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
            </Reveal>
            <Reveal variant="mask" as="figure" delay={110}>
              <Figure
                {...photo(
                  "/gallery/living/living-and-dining-toward-pool.webp",
                  lang,
                )}
                aspect="aspect-[4/3]"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
            </Reveal>
            <Reveal variant="mask" as="figure" delay={220}>
              <Figure
                {...photo(
                  "/gallery/details/poolside-tray-and-pomegranates.webp",
                  lang,
                )}
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
                {t.enquiries}
              </Heading>
            </Reveal>
            <div className="mt-8 space-y-4">
              <Reveal delay={60}>
                <p className="text-lead text-ink-muted">
                  {t.reservationLine}{" "}
                  <MailLink address={site.contact.reservations} />.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p className="text-lead text-ink-muted">
                  {t.generalLine} <MailLink address={site.contact.general} />.
                </p>
              </Reveal>
            </div>

            <Reveal delay={180}>
              <p className="font-serif text-title mt-12 text-ink">
                {t.closing}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <Button
                href={localePath(RESERVE_PATH, lang)}
                size="lg"
                icon
                className="mt-12"
              >
                {RESERVE_CTA[lang]}
              </Button>
            </Reveal>
          </div>
        </Container>
      </Section>

      <FindUs lang={lang} tone="canvas" />
    </>
  );
}

/** One numbered section of the argument: the rule, the heading, the prose. */
function Prose({
  index,
  section,
}: {
  index: number;
  section: (typeof COPY)[Lang]["sections"][number];
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
