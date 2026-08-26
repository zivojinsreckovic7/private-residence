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

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <Residence />
      <FeatureIntro />
      <Highlights />
      <CtaBanner
        line="Check your dates."
        note="Availability, rates and anything else you need to know before you decide."
      />
      <Experience />
      <DayParts />
      <Spaces />
      <CtaBanner
        line="Start planning your stay."
        note="Tell us who is travelling and when, and we will take it from there."
      />
      <Cyprus />
      <Location />
      <Destinations />
      <Gallery />
      <CtaBanner
        line="Photographs only go so far."
        note="Enquire about your dates and we will answer you personally."
      />
      <About />
      <Personal />
      <Testimonials />
      <Occasions />
      <Reservations />
      <Faq />
      <Contact />
      <FindUs tone="canvas" />
      <FinalCta />
    </>
  );
}
