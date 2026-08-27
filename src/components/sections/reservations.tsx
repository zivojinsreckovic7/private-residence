import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { localePath, type Lang } from "@/lib/i18n";
import { RESERVE_CTA, RESERVE_PATH } from "@/lib/site";

const COPY = {
  en: {
    title: (
      <>
        Book Directly With <Accent>MIS</Accent>
      </>
    ),
    lead: "Your experience begins before you arrive.",
    body: "Contact MIS Private Residence directly to discuss availability, your stay and any individual requirements.",
  },
  sr: {
    title: (
      <>
        Rezervišite direktno kod <Accent>MIS-a</Accent>
      </>
    ),
    lead: "Vaš doživljaj počinje pre nego što stignete.",
    body: "Obratite se rezidenciji MIS direktno kako biste razgovarali o dostupnosti, svom boravku i posebnim željama.",
  },
} as const;

const PROMISES = [
  {
    id: "direct",
    title: { en: "Direct Communication", sr: "Direktna komunikacija" },
    body: {
      en: "Speak directly with our team regarding your reservation.",
      sr: "Razgovarajte direktno sa našim timom o svojoj rezervaciji.",
    },
  },
  {
    id: "personal",
    title: { en: "Personal Assistance", sr: "Lična podrška" },
    body: {
      en: "Share any requests or requirements before your arrival.",
      sr: "Podelite sve želje i potrebe pre dolaska.",
    },
  },
  {
    id: "local",
    title: { en: "Local Knowledge", sr: "Poznavanje ostrva" },
    body: {
      en: "Discover recommendations for making more of your time in Cyprus.",
      sr: "Otkrijte preporuke koje će vaše vreme na Kipru učiniti sadržajnijim.",
    },
  },
  {
    id: "arrival",
    title: { en: "A Considered Arrival", sr: "Pripremljen dolazak" },
    body: {
      en: "Allow us to understand your stay before you reach the residence.",
      sr: "Dozvolite nam da razumemo vaš boravak pre nego što stignete u rezidenciju.",
    },
  },
] as const;

export function Reservations({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <Section tone="surface" className="py-32 md:py-44">
      <Container>
        <Reveal variant="drape">
          <Heading size="display" className="max-w-[14ch]">
            {t.title}
          </Heading>
          <p className="text-lead mt-8 text-ink-muted">{t.lead}</p>
          <p className="text-lead mt-4 text-ink-muted">{t.body}</p>
        </Reveal>

        <ul className="mt-20 border-t border-line">
          {PROMISES.map((promise, i) => (
            <Reveal
              as="li"
              key={promise.id}
              delay={i * 70}
              className="grid gap-2 border-b border-line py-7 md:grid-cols-12 md:gap-8"
            >
              <h3 className="font-serif text-title font-light text-ink md:col-span-5">
                {promise.title[lang]}
              </h3>
              <p className="text-body text-ink-muted md:col-span-7">
                {promise.body[lang]}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <Magnetic className="mt-16 inline-block">
            <Button href={localePath(RESERVE_PATH, lang)} size="lg" icon>
              {RESERVE_CTA[lang]}
            </Button>
          </Magnetic>
        </Reveal>
      </Container>
    </Section>
  );
}
