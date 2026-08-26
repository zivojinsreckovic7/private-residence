/**
 * Single source of truth for brand facts. Anything that appears in more than
 * one place on the site belongs here, not inline in a component.
 */
export const site = {
  name: "MIS",
  fullName: "MIS Private Residence",
  tagline: "Private luxury living in Cyprus.",
  location: "Cyprus",
  url: "https://www.misprivateresidence.com",
  contact: {
    reservations: "reservation@misprivateresidence.com",
    general: "info@misprivateresidence.com",
    instagram: "https://instagram.com/misprivateresidence",
  },
  /**
   * The residence's address. `lines` is the postal form, written the way it
   * would be on an envelope; the flat fields underneath are the same address
   * for schema.org, which wants it broken up. Keep the two in step.
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

/** The one label for the booking intent. Used in the nav, hero, and footer. */
export const RESERVE_CTA = "Reserve Your Stay";

/**
 * Primary navigation. Kept short so the nav stays on one line at desktop.
 *
 * The section links are root-relative (`/#residence`, not `#residence`) so the
 * nav still works from the standalone pages, where a bare fragment would have
 * nothing to scroll to. On the landing page itself the browser still treats
 * them as same-document jumps, so smooth scrolling is unaffected.
 */
export const navigation = [
  { label: "Residence", href: "/#residence" },
  { label: "Experience", href: "/experiences" },
  { label: "Cyprus", href: "/#cyprus" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Reservation Terms", href: "/reservation-terms" },
] as const;
