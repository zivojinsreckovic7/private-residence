import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { MapEmbed } from "@/components/ui/map-embed";
import { Section } from "@/components/ui/section";
import type { Lang } from "@/lib/i18n";
import { SHARED, site } from "@/lib/site";

const COPY = {
  en: {
    title: (
      <>
        Where to <Accent>Find Us</Accent>
      </>
    ),
    lead: "The residence is in Bayview Villas, on the Paralimni-Protaras coast in the Ammochostos district of Cyprus.",
    plusCode: "Plus Code",
    coordinates: "Coordinates",
  },
  sr: {
    title: (
      <>
        Gde se <Accent>nalazimo</Accent>
      </>
    ),
    lead: "Rezidencija se nalazi u kompleksu Bayview Villas, na obali Paralimni-Protaras, u distriktu Amohostos na Kipru.",
    plusCode: "Plus kod",
    coordinates: "Koordinate",
  },
} as const;

/**
 * Where the residence actually is.
 *
 * Its own section on every page that carries it, rather than a map tacked to
 * the bottom of a contact block: the address is a fact guests need before they
 * book, and burying it under a form makes it look like something we would
 * rather not say. Everything is stated as text next to the frame, so the
 * address survives a blocked third-party frame and is legible to a crawler.
 */
export function FindUs({
  lang,
  tone = "surface",
}: {
  lang: Lang;
  /** Set to `canvas` where the section above is already a grey band. */
  tone?: "canvas" | "surface";
}) {
  const { address } = site;
  const t = COPY[lang];

  return (
    <Section id="find-us" tone={tone} className="py-24 md:py-32">
      <Container>
        <Reveal variant="drape">
          <Heading size="headline" className="max-w-[16ch]">
            {t.title}
          </Heading>
        </Reveal>
        <Reveal delay={90}>
          <p className="text-lead mt-6 max-w-[54ch] text-ink-muted">
            {t.lead}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <Reveal delay={140}>
            <dl>
              <Detail term={SHARED[lang].address}>
                <address className="not-italic">
                  {address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </Detail>
              <Detail term={t.plusCode}>22CV+GW7 Paralimni</Detail>
              <Detail term={t.coordinates}>
                {address.latitude}, {address.longitude}
              </Detail>
            </dl>

            <Button
              href={address.mapsUrl}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              icon
              className="mt-10"
            >
              {SHARED[lang].openInMaps}
            </Button>
          </Reveal>

          <Reveal variant="mask" delay={200}>
            <MapEmbed lang={lang} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Detail({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line-strong py-5 first:border-t-0 first:pt-0">
      <dt className="text-label uppercase text-ink-subtle">{term}</dt>
      <dd className="text-body mt-2.5 text-ink">{children}</dd>
    </div>
  );
}
