import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

const FAQS = [
  {
    question: "How can I check availability?",
    answer:
      "Contact our reservations team with your preferred arrival and departure dates. We will confirm availability and provide the relevant reservation details.",
  },
  {
    question: "Is MIS Private Residence rented privately?",
    answer:
      "The residence is designed as a private accommodation experience for you and your guests.",
  },
  {
    question: "Can I make special requests before my stay?",
    answer:
      "Yes. Contact our team before arrival and we will assist with available arrangements wherever possible.",
  },
  {
    question: "Can you recommend places to visit in Cyprus?",
    answer:
      "Yes. Our team can provide recommendations based on the type of experience you are looking for during your stay.",
  },
  {
    question: "Are longer stays available?",
    answer:
      "Availability and stay requirements may vary throughout the year. Please contact our reservations team for your preferred dates.",
  },
  {
    question: "How do I make a reservation?",
    answer: `Send your enquiry directly to ${site.contact.reservations} with your preferred dates and guest information.`,
  },
] as const;

export function Faq() {
  return (
    <Section tone="canvas" className="py-32 md:py-44">
      <Container className="grid gap-14 lg:grid-cols-12">
        <Reveal variant="drape" className="lg:col-span-4">
          <Heading size="headline" className="max-w-[10ch]">
            Frequently Asked <Accent>Questions</Accent>
          </Heading>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
          <Accordion items={FAQS} />
        </Reveal>
      </Container>
    </Section>
  );
}
