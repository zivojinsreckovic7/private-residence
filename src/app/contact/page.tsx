import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FindUs } from "@/components/sections/find-us";
import { Accent, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Enquire about dates, rates and availability at ${site.fullName}.`,
};

/**
 * The contact page is a utility page, so it is built as one: a heading, the
 * enquiry form, and the ways to reach us directly, in that order. No pinned
 * scenes and no photography. The premium comes from the type, the spacing and
 * the hairlines the rest of the site already uses.
 */
export default function ContactPage() {
  return (
    <>
      <Section tone="canvas" className="pt-40 pb-14 md:pt-52 md:pb-16">
        <Container>
          <Reveal variant="still">
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <Reveal variant="drape" className="mt-5">
            <Heading as="h1" size="display" className="max-w-[13ch]">
              Get in <Accent>Touch</Accent>
            </Heading>
          </Reveal>
          <Reveal delay={90}>
            <p className="text-lead mt-7 max-w-[54ch] text-ink-muted">
              Tell us your dates and who is travelling with you. Every enquiry
              is read and answered by our team, usually within 24 hours.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section id="contact" tone="surface" className="py-16 md:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={120} as="section" className="lg:sticky lg:top-28">
            <h2 className="text-title font-serif font-light text-ink">
              Or reach us directly
            </h2>

            <dl className="mt-8">
              <Detail label="Reservations">
                <MailLink address={site.contact.reservations} />
              </Detail>
              <Detail label="General Enquiries">
                <MailLink address={site.contact.general} />
              </Detail>
              <Detail label="Instagram">
                <a
                  href={site.contact.instagram}
                  className="text-body text-ink transition-colors duration-(--dur-fast) hover:text-accent"
                >
                  @misprivateresidence
                </a>
              </Detail>
              <Detail label="The Residence">
                <address className="text-body not-italic text-ink">
                  {site.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </Detail>
            </dl>
          </Reveal>
        </Container>
      </Section>

      <FindUs tone="canvas" />
    </>
  );
}

/** One labelled row in the direct-contact list. */
function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line-strong py-5 first:pt-0 first:border-t-0">
      <dt className="text-label uppercase text-ink-subtle">{label}</dt>
      <dd className="mt-2.5">{children}</dd>
    </div>
  );
}

function MailLink({ address }: { address: string }) {
  return (
    <a
      href={`mailto:${address}`}
      className="text-body break-words text-ink transition-colors duration-(--dur-fast) hover:text-accent"
    >
      {address}
    </a>
  );
}
