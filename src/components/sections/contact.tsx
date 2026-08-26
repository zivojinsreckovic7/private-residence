import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/sections/contact-form";
import { Accent, Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import type { Lang } from "@/lib/i18n";
import { SHARED, site } from "@/lib/site";

const COPY = {
  en: {
    title: (
      <>
        Your Stay <Accent>Starts</Accent> Here
      </>
    ),
    lead: "If MIS Private Residence feels like the kind of place you have been looking for, tell us when you would like to arrive.",
    body: "Share your dates, number of guests and anything you would like us to know. Our team will take care of the rest.",
  },
  sr: {
    title: (
      <>
        Vaš boravak <Accent>počinje</Accent> ovde
      </>
    ),
    lead: "Ako vam MIS Private Residence deluje kao mesto koje ste tražili, recite nam kada biste želeli da dođete.",
    body: "Pošaljite nam datume, broj gostiju i sve što želite da znamo. O ostalom će se pobrinuti naš tim.",
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
            {t.body}
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
