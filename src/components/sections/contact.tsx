import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Field } from "@/components/ui/field";
import { Accent, Heading } from "@/components/ui/heading";
import { Magnetic } from "@/components/motion/magnetic";
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
          </dl>
        </Reveal>

        <Reveal delay={140}>
          {/*
            Skeleton only. There is no submit handler or backend yet, so the
            form is marked up correctly but does not send. Wire it to a route
            handler before launch.
          */}
          <form className="rounded-surface border border-line bg-canvas p-8 sm:p-10">
            <h3 className="text-title font-medium text-ink">
              Reservation Enquiry
            </h3>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Field label="Arrival Date" name="arrival" type="date" required />
              <Field
                label="Departure Date"
                name="departure"
                type="date"
                required
              />
              <Field
                label="Number of Guests"
                name="guests"
                type="number"
                required
              />
              <Field label="Full Name" name="name" required />
              <Field
                label="Email Address"
                name="email"
                type="email"
                required
                className="sm:col-span-2"
              />
              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                className="sm:col-span-2"
              />
              <Field
                label="Message"
                name="message"
                multiline
                placeholder="Tell us about your stay and any special requests you may have."
                className="sm:col-span-2"
              />
            </div>

            <Magnetic className="mt-8 block sm:inline-block">
              <Button size="lg" icon className="w-full sm:w-auto">
                Send Reservation Enquiry
              </Button>
            </Magnetic>
          </form>
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
