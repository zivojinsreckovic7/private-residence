import { AppLink } from "@/components/ui/app-link";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/sections/contact-form";
import { Accent, Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { localePath, type Lang } from "@/lib/i18n";
import { RESERVE_PATH, SHARED, site } from "@/lib/site";

const COPY = {
  en: {
    title: (
      <>
        How Can We <Accent>Help</Accent>
      </>
    ),
    lead: "If there is something you would like to know about MIS Private Residence, our team is here to answer it.",
    body: (link: React.ReactNode) => (
      <>
        This is our line for general enquiries — the house, the island, what a
        stay here involves. Reserving dates happens on its own page: {link}.
      </>
    ),
    bodyLink: "reserve your stay",
  },
  sr: {
    title: (
      <>
        Kako možemo da <Accent>pomognemo</Accent>
      </>
    ),
    lead: "Ako želite nešto da saznate o rezidenciji MIS Private Residence, naš tim je tu da odgovori.",
    body: (link: React.ReactNode) => (
      <>
        Ovo je naša linija za opšte upite — o kući, ostrvu i tome kako izgleda
        boravak kod nas. Rezervacija datuma ide preko svoje stranice: {link}.
      </>
    ),
    bodyLink: "rezervišite boravak",
  },
} as const;

export function Contact({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const shared = SHARED[lang];

  return (
    <Section id="contact" tone="surface" className="py-32 md:py-44">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <Reveal variant="drape">
          <Heading size="display" className="max-w-[12ch]">
            {t.title}
          </Heading>
          <p className="text-lead mt-8 max-w-[46ch] text-ink-muted">
            {t.lead}
          </p>
          <p className="text-lead mt-4 max-w-[46ch] text-ink-muted">
            {t.body(
              <AppLink
                href={localePath(RESERVE_PATH, lang)}
                className="text-ink underline underline-offset-4 transition-colors duration-(--dur-fast) hover:text-accent"
              >
                {t.bodyLink}
              </AppLink>,
            )}
          </p>

          <dl className="mt-14 space-y-8">
            <ContactRow
              label={shared.reservations}
              value={site.contact.reservations}
            />
            <ContactRow
              label={shared.general}
              value={site.contact.general}
            />
            <div className="border-t border-line pt-4">
              <dt className="text-meta text-ink-subtle">{shared.residence}</dt>
              <dd>
                <address className="text-body mt-2 not-italic text-ink">
                  {site.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={140}>
          <ContactForm lang={lang} />
        </Reveal>
      </Container>
    </Section>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line pt-4">
      <dt className="text-meta text-ink-subtle">{label}</dt>
      <dd className="mt-2">
        <a
          href={`mailto:${value}`}
          className="text-title font-serif text-ink transition-colors duration-(--dur-fast) hover:text-accent"
        >
          {value}
        </a>
      </dd>
    </div>
  );
}
