import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Handshake, Key, Lock } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/reveal";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accent, Heading } from "@/components/ui/heading";
import { ReservationCheckout } from "@/components/sections/reservation-checkout";
import { Section } from "@/components/ui/section";
import { photo } from "@/lib/gallery";
import { LANG_TAGS, isLang, localePath, type Lang } from "@/lib/i18n";
import { alternates, ogImages } from "@/lib/metadata";
import { RESERVE_PATH, site } from "@/lib/site";

/** The photograph the summary card carries. Described once, in the manifest. */
const HERO_PHOTO = "/gallery/exterior/villa-full-view-with-pool.jpeg";

const COPY = {
  en: {
    title: "Reservations",
    description: `Request your dates at ${site.fullName}, a private luxury villa in Cyprus. No payment online: we confirm availability and written terms personally, usually within 24 hours.`,
    ogTitle: `Reserve your stay at ${site.fullName}`,
    eyebrow: "Reservations",
    heading: (
      <>
        Reserve Your <Accent>Stay</Accent>
      </>
    ),
    lead: "Tell us when you would like to arrive and who is coming with you. We answer with availability and written terms for your dates, personally, and nothing is charged until you say yes.",
    assurances: [
      { icon: Lock, text: "No payment on this page" },
      { icon: Clock, text: "A personal reply, usually within 24 hours" },
      { icon: Handshake, text: "Direct with the residence, no agency" },
      { icon: Key, text: "Exclusive use of the whole villa" },
    ],
    next: {
      eyebrow: "What happens next",
      title: (
        <>
          Three Steps, <Accent>No Surprises</Accent>
        </>
      ),
      steps: [
        {
          title: "You send your dates",
          body: "A minute of typing, and it commits you to nothing at all. Approximate dates are fine — say so and we will work around them.",
        },
        {
          title: "We come back to you personally",
          body: "Availability for your dates, written terms, and an answer to anything you asked. Usually within 24 hours, from someone who knows the house.",
        },
        {
          title: "You decide, and it is yours",
          body: "Only once you confirm in writing is anything booked. Then we move on to arrival details and whatever you would like arranged.",
        },
      ],
    },
    direct: {
      title: (
        <>
          Booked <Accent>Direct</Accent>
        </>
      ),
      lead: "There is no booking platform between you and the residence, and no commission built into the answer you get.",
      points: [
        {
          title: "No middle",
          body: "You are writing to the residence itself, not to a desk that has never walked through the house.",
        },
        {
          title: "One conversation",
          body: "Whoever answers your first message is who sees the stay through, from these dates to your arrival.",
        },
        {
          title: "Honest availability",
          body: "If your dates are not free we say so straight away, and tell you the closest ones that are.",
        },
        {
          title: "Shaped around you",
          body: "Transfers, a celebration, groceries in before you arrive: tell us early and we will tell you what is possible.",
        },
      ],
    },
    faq: {
      title: (
        <>
          Before You <Accent>Send It</Accent>
        </>
      ),
      items: [
        {
          question: "Do I pay anything now?",
          answer:
            "No. This page sends a request, nothing more. No card details are taken here, and payment terms reach you in writing with the confirmation for your dates.",
        },
        {
          question: "How quickly will I hear back?",
          answer:
            "Every request is read and answered by our team personally, usually within 24 hours.",
        },
        {
          question: "What if my dates are not available?",
          answer:
            "We will tell you straight away rather than leave you waiting, and suggest the closest dates that are open.",
        },
        {
          question: "Is the whole residence private?",
          answer:
            "Yes. The villa is yours and your guests' alone for the length of the stay, with no shared areas and no other parties on the property.",
        },
        {
          question: "Are there minimum stays?",
          answer:
            "Availability and stay requirements vary through the year. Send your preferred dates and we will confirm what applies to them.",
        },
        {
          question: "Can I ask for arrangements before we arrive?",
          answer:
            "Yes. Tell us in your request and we will assist with what is possible for your dates, from transfers to a celebration set up before you walk in.",
        },
      ],
    },
    closing: {
      title: "Rather write to us yourself?",
      body: "Send your dates and guest details to our reservations team and you will reach exactly the same people.",
      general: "Anything that is not a reservation belongs on our",
      generalLink: "general enquiry page",
    },
  },
  sr: {
    title: "Rezervacije",
    description: `Pošaljite zahtev za svoje datume u rezidenciji ${site.fullName}, privatnoj luksuznoj vili na Kipru. Bez plaćanja onlajn: dostupnost i pisane uslove potvrđujemo lično, obično u roku od 24 sata.`,
    ogTitle: `Rezervišite boravak u rezidenciji ${site.fullName}`,
    eyebrow: "Rezervacije",
    heading: (
      <>
        Rezervišite <Accent>boravak</Accent>
      </>
    ),
    lead: "Recite nam kada biste želeli da stignete i ko dolazi sa vama. Odgovaramo lično, sa dostupnošću i pisanim uslovima za vaše datume, a ništa se ne naplaćuje dok vi ne kažete da.",
    assurances: [
      { icon: Lock, text: "Bez plaćanja na ovoj stranici" },
      { icon: Clock, text: "Lični odgovor, obično u roku od 24 sata" },
      { icon: Handshake, text: "Direktno sa rezidencijom, bez posrednika" },
      { icon: Key, text: "Ekskluzivno korišćenje cele vile" },
    ],
    next: {
      eyebrow: "Šta sledi",
      title: (
        <>
          Tri koraka, <Accent>bez iznenađenja</Accent>
        </>
      ),
      steps: [
        {
          title: "Pošaljete svoje datume",
          body: "Minut kucanja i ni na šta vas ne obavezuje. Okvirni datumi su sasvim u redu — recite nam i prilagodićemo se.",
        },
        {
          title: "Javljamo vam se lično",
          body: "Dostupnost za vaše datume, pisani uslovi i odgovor na sve što ste pitali. Obično u roku od 24 sata, od nekoga ko poznaje kuću.",
        },
        {
          title: "Vi odlučujete i rezidencija je vaša",
          body: "Tek kada potvrdite u pisanoj formi, rezervacija je napravljena. Zatim prelazimo na detalje dolaska i sve što želite da pripremimo.",
        },
      ],
    },
    direct: {
      title: (
        <>
          Rezervisano <Accent>direktno</Accent>
        </>
      ),
      lead: "Između vas i rezidencije nema platforme za rezervacije, niti provizije ugrađene u odgovor koji dobijate.",
      points: [
        {
          title: "Bez posrednika",
          body: "Pišete samoj rezidenciji, a ne šalteru koji kroz ovu kuću nikada nije prošao.",
        },
        {
          title: "Jedan razgovor",
          body: "Ko god odgovori na vašu prvu poruku, vodi boravak do kraja, od ovih datuma do vašeg dolaska.",
        },
        {
          title: "Iskrena dostupnost",
          body: "Ako vaši datumi nisu slobodni, odmah ćemo vam reći i predložiti najbliže koji jesu.",
        },
        {
          title: "Prilagođeno vama",
          body: "Prevoz, proslava, namirnice pre dolaska: recite nam na vreme i reći ćemo vam šta je moguće.",
        },
      ],
    },
    faq: {
      title: (
        <>
          Pre nego što <Accent>pošaljete</Accent>
        </>
      ),
      items: [
        {
          question: "Da li sada nešto plaćam?",
          answer:
            "Ne. Ova stranica šalje zahtev i ništa više. Ovde se ne unose podaci o kartici, a uslovi plaćanja stižu vam u pisanoj formi uz potvrdu za vaše datume.",
        },
        {
          question: "Koliko brzo ću dobiti odgovor?",
          answer:
            "Svaki zahtev naš tim čita i na njega odgovara lično, obično u roku od 24 sata.",
        },
        {
          question: "Šta ako moji datumi nisu dostupni?",
          answer:
            "Odmah ćemo vam reći, umesto da čekate, i predložiti najbliže datume koji su slobodni.",
        },
        {
          question: "Da li je cela rezidencija privatna?",
          answer:
            "Da. Vila pripada samo vama i vašim gostima tokom celog boravka, bez zajedničkih prostorija i bez drugih gostiju na imanju.",
        },
        {
          question: "Postoji li minimalan broj noćenja?",
          answer:
            "Dostupnost i uslovi boravka razlikuju se tokom godine. Pošaljite željene datume i potvrdićemo šta važi za njih.",
        },
        {
          question: "Mogu li nešto da zatražim pre dolaska?",
          answer:
            "Da. Napišite nam u zahtevu i pomoći ćemo sa onim što je moguće za vaše datume, od prevoza do proslave pripremljene pre nego što uđete.",
        },
      ],
    },
    closing: {
      title: "Radije biste pisali sami?",
      body: "Pošaljite datume i podatke o gostima našem timu za rezervacije i stižete do istih ljudi.",
      general: "Sve što nije rezervacija ide na našu",
      generalLink: "stranicu za opšte upite",
    },
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/reservations">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = COPY[lang];
  const url = `${site.url}${localePath(RESERVE_PATH, lang)}`;

  return {
    title: t.title,
    description: t.description,
    alternates: alternates(RESERVE_PATH, lang),
    openGraph: {
      title: t.ogTitle,
      description: t.description,
      url,
      images: ogImages(lang),
      locale: LANG_TAGS[lang].replace(/-/g, "_"),
      type: "website",
    },
  };
}

/**
 * The reservation page.
 *
 * It is a checkout, so it is built like one and not like the rest of the site:
 * no pinned scenes, one photograph, and the request itself above the fold on a
 * laptop. Everything below it exists to answer the question a guest asks
 * before sending — what happens next, who they are writing to, what it costs
 * them to ask — because that is what is actually in the way.
 *
 * The form is not wired to an inbox. See `ReservationCheckout`.
 */
export default async function ReservationsPage({
  params,
}: PageProps<"/[lang]/reservations">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = COPY[lang];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(lang)),
        }}
      />

      <Section tone="canvas" className="pt-40 pb-12 md:pt-52 md:pb-16">
        <Container>
          <Reveal variant="still">
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal variant="drape" className="mt-5">
            <Heading as="h1" size="display" className="max-w-[14ch]">
              {t.heading}
            </Heading>
          </Reveal>
          <Reveal delay={90}>
            <p className="text-lead mt-7 max-w-[58ch] text-ink-muted">
              {t.lead}
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-px border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {t.assurances.map(({ icon: Icon, text }, i) => (
              <Reveal
                as="li"
                key={text}
                delay={i * 70}
                className="flex items-start gap-3 border-b border-line py-5 lg:border-b-0 lg:pr-8"
              >
                <Icon
                  size={20}
                  weight="light"
                  aria-hidden
                  className="mt-px shrink-0 text-accent"
                />
                <span className="text-meta text-ink">{text}</span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="reserve" tone="surface" className="py-12 md:py-20">
        <ReservationCheckout lang={lang} photo={photo(HERO_PHOTO, lang)} />
      </Section>

      <Section tone="canvas" className="py-24 md:py-32">
        <Container>
          <Reveal variant="still">
            <Eyebrow>{t.next.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal variant="drape" className="mt-5">
            <Heading size="headline" className="max-w-[16ch]">
              {t.next.title}
            </Heading>
          </Reveal>

          <ol className="mt-16 border-t border-line">
            {t.next.steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 80}
                className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-8"
              >
                <span className="text-title font-serif font-light text-accent [font-feature-settings:'lnum'] md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-title font-medium text-ink md:col-span-4">
                  {step.title}
                </h3>
                <p className="text-body text-ink-muted md:col-span-7">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="deep" className="py-24 md:py-32">
        <Container>
          <Reveal variant="drape">
            <Heading size="headline" className="max-w-[14ch] text-on-dark">
              {t.direct.title}
            </Heading>
          </Reveal>
          <Reveal delay={90}>
            <p className="text-lead mt-7 max-w-[52ch] text-on-dark-muted">
              {t.direct.lead}
            </p>
          </Reveal>

          <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {t.direct.points.map((point, i) => (
              <Reveal
                as="li"
                key={point.title}
                delay={i * 70}
                className="border-t border-line-on-dark pt-6"
              >
                <h3 className="text-title font-serif font-light text-on-dark">
                  {point.title}
                </h3>
                <p className="text-meta mt-3 text-on-dark-muted">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="canvas" className="py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-12">
          <Reveal variant="drape" className="lg:col-span-4">
            <Heading size="headline" className="max-w-[10ch]">
              {t.faq.title}
            </Heading>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            <Accordion items={t.faq.items} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface" className="py-16 md:py-20">
        <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="text-title font-serif font-light text-ink">
              {t.closing.title}
            </h2>
            <p className="text-body mt-3 max-w-[46ch] text-ink-muted">
              {t.closing.body}
            </p>
            <p className="text-meta mt-3 text-ink-subtle">
              {t.closing.general}{" "}
              <a
                href={localePath("/contact", lang)}
                className="text-ink underline underline-offset-4 transition-colors duration-(--dur-fast) hover:text-accent"
              >
                {t.closing.generalLink}
              </a>
              .
            </p>
          </Reveal>
          <Reveal delay={90}>
            <a
              href={`mailto:${site.contact.reservations}`}
              className="text-title font-serif break-words text-ink transition-colors duration-(--dur-fast) hover:text-accent"
            >
              {site.contact.reservations}
            </a>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

/**
 * Structured data. A reservation page is what a search engine should surface
 * for "book MIS Private Residence", so the booking action and the questions
 * around it are stated rather than left to be inferred from the prose.
 */
function structuredData(lang: Lang) {
  const t = COPY[lang];
  const url = `${site.url}${localePath(RESERVE_PATH, lang)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: t.ogTitle,
        url,
        description: t.description,
        inLanguage: LANG_TAGS[lang],
        mainEntity: {
          "@type": "LodgingBusiness",
          name: site.fullName,
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
          potentialAction: {
            "@type": "ReserveAction",
            name: t.title,
            target: {
              "@type": "EntryPoint",
              urlTemplate: url,
              inLanguage: LANG_TAGS[lang],
              actionPlatform: [
                "https://schema.org/DesktopWebPlatform",
                "https://schema.org/MobileWebPlatform",
              ],
            },
            result: { "@type": "LodgingReservation", name: site.fullName },
          },
        },
      },
      {
        "@type": "FAQPage",
        inLanguage: LANG_TAGS[lang],
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}
