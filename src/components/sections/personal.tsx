import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { localePath, type Lang } from "@/lib/i18n";

/**
 * The CTA here is "Plan Your Stay" rather than the site's one booking label.
 * That is the client's wording for this section and is kept deliberately; it
 * points at the same place.
 */
const COPY = {
  en: {
    title: (
      <>
        Make the Stay <Accent>Yours</Accent>
      </>
    ),
    opening: "No two stays need to feel the same.",
    body: "Whether you are planning a quiet private escape, time with family and friends, a special occasion or simply several days away from everything else, your stay can be shaped around you.",
    requests:
      "For special requests or arrangements, contact our team before arrival.",
    cta: "Plan Your Stay",
  },
  sr: {
    title: (
      <>
        Neka boravak bude <Accent>vaš</Accent>
      </>
    ),
    opening: "Nijedan boravak ne mora da liči na prethodni.",
    body: "Bilo da planirate tiho privatno bekstvo, vreme sa porodicom i prijateljima, poseban povod ili jednostavno nekoliko dana daleko od svega, boravak može biti oblikovan prema vama.",
    requests:
      "Za posebne želje ili dogovore, obratite se našem timu pre dolaska.",
    cta: "Isplanirajte boravak",
  },
} as const;

export function Personal({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <Section tone="canvas" className="py-32 md:py-44">
      <Container className="grid gap-16 lg:grid-cols-12">
        <Reveal variant="drape" className="lg:col-span-5">
          <Heading size="display" className="max-w-[10ch]">
            {t.title}
          </Heading>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={80}>
            <p className="font-serif text-title text-ink">{t.opening}</p>
            <p className="text-lead mt-8 text-ink-muted">{t.body}</p>
            <p className="text-lead mt-4 text-ink-muted">{t.requests}</p>
          </Reveal>
          <Reveal delay={200}>
            <Magnetic className="mt-12 inline-block">
              <Button href={localePath("/contact", lang)} icon size="lg">
                {t.cta}
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
