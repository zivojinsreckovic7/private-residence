import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/sections/contact-form";
import { Accent, Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <Section id="contact" tone="surface" className="py-32 md:py-44">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <Reveal variant="drape">
          <Heading size="display" className="max-w-[12ch]">
            Your Stay <Accent>Starts</Accent> Here
          </Heading>
          <p className="text-lead mt-8 max-w-[46ch] text-ink-muted">
            If MIS Private Residence feels like the kind of place you have been
            looking for, tell us when you would like to arrive.
          </p>
          <p className="text-lead mt-4 max-w-[46ch] text-ink-muted">
            Share your dates, number of guests and anything you would like us to
            know. Our team will take care of the rest.
          </p>

          <dl className="mt-14 space-y-8">
            <ContactRow label="Reservations" value={site.contact.reservations} />
            <ContactRow label="General Enquiries" value={site.contact.general} />
            <div className="border-t border-line pt-4">
              <dt className="text-meta text-ink-subtle">The Residence</dt>
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
          <ContactForm />
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
