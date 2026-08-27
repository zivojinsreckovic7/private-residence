import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import type { Lang } from "@/lib/i18n";

const COPY = {
  en: {
    title: (
      <>
        Frequently Asked <Accent>Questions</Accent>
      </>
    ),
    faqs: [
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
        answer:
          "Send your preferred dates and guest details from the reservations page. No payment is taken there, and we reply personally with availability and written terms, usually within 24 hours.",
      },
    ],
  },
  sr: {
    title: (
      <>
        Često postavljana <Accent>pitanja</Accent>
      </>
    ),
    faqs: [
      {
        question: "Kako mogu da proverim dostupnost?",
        answer:
          "Obratite se našem timu za rezervacije sa željenim datumima dolaska i odlaska. Potvrdićemo dostupnost i poslati sve detalje rezervacije.",
      },
      {
        question: "Da li se MIS Private Residence izdaje isključivo privatno?",
        answer:
          "Rezidencija je osmišljena kao privatan smeštaj namenjen samo vama i vašim gostima.",
      },
      {
        question: "Mogu li da uputim posebne želje pre boravka?",
        answer:
          "Da. Obratite se našem timu pre dolaska i pomoći ćemo vam sa dostupnim aranžmanima gde god je to moguće.",
      },
      {
        question: "Možete li da preporučite mesta koja vredi posetiti na Kipru?",
        answer:
          "Da. Naš tim može da vam da preporuke u skladu sa doživljajem koji tražite tokom boravka.",
      },
      {
        question: "Da li su mogući duži boravci?",
        answer:
          "Dostupnost i uslovi boravka mogu se razlikovati tokom godine. Obratite se našem timu za rezervacije sa željenim datumima.",
      },
      {
        question: "Kako da napravim rezervaciju?",
        answer:
          "Pošaljite željene datume i podatke o gostima sa stranice za rezervacije. Tamo se ništa ne naplaćuje, a mi odgovaramo lično, sa dostupnošću i pisanim uslovima, obično u roku od 24 sata.",
      },
    ],
  },
} as const;

export function Faq({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <Section tone="canvas" className="py-32 md:py-44">
      <Container className="grid gap-14 lg:grid-cols-12">
        <Reveal variant="drape" className="lg:col-span-4">
          <Heading size="headline" className="max-w-[10ch]">
            {t.title}
          </Heading>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
          <Accordion items={t.faqs} />
        </Reveal>
      </Container>
    </Section>
  );
}
