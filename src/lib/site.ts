import type { Copy, Lang } from "@/lib/i18n";

/**
 * Single source of truth for brand facts. Anything that appears in more than
 * one place on the site belongs here, not inline in a component.
 *
 * Facts are language-neutral and live in `site`. Anything with wording in it —
 * the tagline, the nav labels, the booking label — is a `Copy` and is read
 * through the small helpers at the foot of this file.
 */
export const site = {
  name: "MIS",
  fullName: "MIS Private Residence",
  location: "Cyprus",
  url: "https://www.misprivateresidence.com",
  contact: {
    reservations: "reservation@misprivateresidence.com",
    general: "info@misprivateresidence.com",
    instagram: "https://instagram.com/misprivateresidence",
    /**
     * What the reservation form sends as.
     *
     * `reservation.misprivateresidence.com` is a sending subdomain verified
     * with Resend, deliberately not the root domain: the root is where Titan's
     * MX and SPF live, and a sending service wants records at the same names.
     * Keeping them apart means nothing here can affect the mailbox.
     *
     * Guests never write to this address — every message sets `Reply-To`, so a
     * reply reaches a person either way.
     */
    sender: "MIS Private Residence <no-reply@reservation.misprivateresidence.com>",
  },
  /**
   * The residence's address. `lines` is the postal form, written the way it
   * would be on an envelope; the flat fields underneath are the same address
   * for schema.org, which wants it broken up. Keep the two in step.
   *
   * The address is not translated. It is written the way the post office and
   * a maps app need it, in both languages.
   */
  address: {
    lines: [
      "Villa 6, Bayview Villas",
      "22CV+GW7, Paralimni-Protaras",
      "Ammochostos 5296",
      "Cyprus",
    ],
    street: "Villa 6, Bayview Villas",
    locality: "Paralimni-Protaras",
    region: "Ammochostos",
    postalCode: "5296",
    country: "CY",
    latitude: 35.021445,
    longitude: 34.045185,
    /** Opens the pin in whatever maps app the visitor has. */
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=35.021445,34.045185",
    /** The embed Google generates for this pin. Used by <MapEmbed>. */
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3267.4110641692178!2d34.045185!3d35.021445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDAxJzE3LjIiTiAzNMKwMDInNDIuNyJF!5e0!3m2!1sen!2srs!4v1787757666874!5m2!1sen!2srs",
  },
} as const;

/** The line under the wordmark in the footer, and the site's meta description. */
export const TAGLINE: Copy<string> = {
  en: "Private luxury living in Cyprus.",
  sr: "Privatan luksuz na Kipru.",
};

/**
 * The one label for the booking intent. Used in the nav, hero, reservations
 * and the final CTA.
 */
export const RESERVE_CTA: Copy<string> = {
  en: "Reserve Your Stay",
  sr: "Rezervišite boravak",
};

/**
 * Where every booking CTA points. Written once here rather than at each call
 * site: the label and its destination are one decision, and this route has
 * already moved once (it was `/contact` before the reservations page existed).
 *
 * Unprefixed and in the English form, like every other href on the site —
 * `localePath()` adds the `/sr` prefix.
 */
export const RESERVE_PATH = "/reservations";

/**
 * Primary navigation. Kept short so the nav stays on one line at desktop.
 *
 * Hrefs are written unprefixed and in the English form: they are the site's
 * route structure, not copy. `localePath()` adds the `/sr` prefix where it is
 * needed, so the Serbian edition uses the same routes rather than a second set
 * of slugs to keep in step.
 *
 * The section links are root-relative (`/#residence`, not `#residence`) so the
 * nav still works from the standalone pages, where a bare fragment would have
 * nothing to scroll to. On the landing page itself the browser still treats
 * them as same-document jumps, so smooth scrolling is unaffected.
 */
export const navigation = [
  { href: "/#residence", label: { en: "Residence", sr: "Rezidencija" } },
  { href: "/experiences", label: { en: "Experience", sr: "Doživljaj" } },
  { href: "/gallery", label: { en: "Gallery", sr: "Galerija" } },
  { href: "/about", label: { en: "About", sr: "O nama" } },
  { href: "/contact", label: { en: "Contact", sr: "Kontakt" } },
] as const;

/*
 * The footer's legal links are deliberately absent. Privacy Policy, Terms &
 * Conditions and Reservation Terms were listed here before the pages existed,
 * so every one of them 404'd and was crawled as a broken link. Put the list
 * back when the routes are real, not before.
 */

/** Labels that appear in the chrome and in more than one section. */
export const SHARED: Copy<{
  reservations: string;
  general: string;
  residence: string;
  address: string;
  openInMaps: string;
  copyright: (year: number) => string;
}> = {
  en: {
    reservations: "Reservations",
    general: "General Enquiries",
    residence: "The Residence",
    address: "Address",
    openInMaps: "Open in Google Maps",
    copyright: (year) => `© ${year} ${site.fullName}. All rights reserved.`,
  },
  sr: {
    reservations: "Rezervacije",
    general: "Opšte informacije",
    residence: "Rezidencija",
    address: "Adresa",
    openInMaps: "Otvorite u Google mapama",
    copyright: (year) =>
      `© ${year} ${site.fullName}. Sva prava zadržana.`,
  },
};

/** The site name as it reads in a title, per language. */
export function siteTitle(lang: Lang) {
  return lang === "sr"
    ? `${site.fullName}, Kipar`
    : `${site.fullName}, ${site.location}`;
}
