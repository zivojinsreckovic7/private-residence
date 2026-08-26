import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { FindUs } from "@/components/sections/find-us";
import { Occasions } from "@/components/sections/occasions";
import { Personal } from "@/components/sections/personal";
import { PhotoHero } from "@/components/sections/photo-hero";
import { Testimonials } from "@/components/sections/testimonials";
import { Accent } from "@/components/ui/heading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Experience",
  description: `What a stay at ${site.fullName} is actually like: no itinerary, no shared spaces, and the time and privacy to spend the day however you want to.`,
  alternates: { canonical: "/experiences" },
};

/**
 * The experience page.
 *
 * It composes the landing page's own experience sections rather than restating
 * them in new words: `Experience`, `Occasions`, `Testimonials` and `Personal`
 * are the client's copy, and a second set of near-identical sentences would be
 * worse for the reader and worse for search. Only the hero is written for this
 * page. The landing page keeps its versions; nothing links to those anchors
 * any more, the same as `#about`, `#contact` and `#gallery`.
 *
 * Deliberately no pinned scene here. `DayParts` is the landing page's own
 * moment, and repeating it on a second page would spend it twice.
 */
export default function ExperiencesPage() {
  return (
    <>
      <PhotoHero
        eyebrow="Experience"
        title={<>The <Accent>Experience</Accent></>}
        lead="There is no itinerary here. Luxury is simply having the time, space and privacy to do exactly what you feel like doing."
        src="/gallery/pool-terrace/pool-terrace-lounge-and-dining.jpeg"
        alt="The covered terrace lounge beside the pool, with the outdoor dining table and hanging chair beyond it."
      />

      <Experience />
      <Occasions />
      <Testimonials />
      <Personal />
      <Contact />
      <FindUs tone="canvas" />
    </>
  );
}
