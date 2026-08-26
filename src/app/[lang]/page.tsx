import { notFound } from "next/navigation";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Cyprus } from "@/components/sections/cyprus";
import { DayParts } from "@/components/sections/day-parts";
import { Destinations } from "@/components/sections/destinations";
import { Experience } from "@/components/sections/experience";
import { Faq } from "@/components/sections/faq";
import { FeatureIntro } from "@/components/sections/feature-intro";
import { FinalCta } from "@/components/sections/final-cta";
import { FindUs } from "@/components/sections/find-us";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { Introduction } from "@/components/sections/introduction";
import { Location } from "@/components/sections/location";
import { Occasions } from "@/components/sections/occasions";
import { Personal } from "@/components/sections/personal";
import { Reservations } from "@/components/sections/reservations";
import { Residence } from "@/components/sections/residence";
import { Spaces } from "@/components/sections/spaces";
import { Testimonials } from "@/components/sections/testimonials";
import { isLang } from "@/lib/i18n";

/**
 * The three booking cards. Each line follows the section it sits under, so
 * they are written here rather than inside `CtaBanner`, which only owns the
 * shape and the label.
 */
const BANNERS = {
  en: [
    {
      line: "Check your dates.",
      note: "Availability, rates and anything else you need to know before you decide.",
    },
    {
      line: "Start planning your stay.",
      note: "Tell us who is travelling and when, and we will take it from there.",
    },
    {
      line: "Photographs only go so far.",
      note: "Enquire about your dates and we will answer you personally.",
    },
  ],
  sr: [
    {
      line: "Proverite svoje datume.",
      note: "Dostupnost, cene i sve ostalo što treba da znate pre nego što odlučite.",
    },
    {
      line: "Počnite da planirate boravak.",
      note: "Recite nam ko putuje i kada, a mi preuzimamo dalje.",
    },
    {
      line: "Fotografije govore samo do neke mere.",
      note: "Pošaljite upit za svoje datume i odgovorićemo vam lično.",
    },
  ],
} as const;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const [dates, planning, photographs] = BANNERS[lang];

  return (
    <>
      <Hero lang={lang} />
      <Introduction lang={lang} />
      <Residence lang={lang} />
      <FeatureIntro lang={lang} />
      <Highlights lang={lang} />
      <CtaBanner lang={lang} {...dates} />
      <Experience lang={lang} />
      <DayParts lang={lang} />
      <Spaces lang={lang} />
      <CtaBanner lang={lang} {...planning} />
      <Cyprus lang={lang} />
      <Location lang={lang} />
      <Destinations lang={lang} />
      <Gallery lang={lang} />
      <CtaBanner lang={lang} {...photographs} />
      <About lang={lang} />
      <Personal lang={lang} />
      <Testimonials lang={lang} />
      <Occasions lang={lang} />
      <Reservations lang={lang} />
      <Faq lang={lang} />
      <Contact lang={lang} />
      <FindUs lang={lang} tone="canvas" />
      <FinalCta lang={lang} />
    </>
  );
}
