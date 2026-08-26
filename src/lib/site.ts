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
} as const;

/** The one label for the booking intent. Used in the nav, hero, and footer. */
export const RESERVE_CTA = "Reserve Your Stay";

/** Primary navigation. Kept short so the nav stays on one line at desktop. */
export const navigation = [
  { label: "Residence", href: "#residence" },
  { label: "Experience", href: "#experience" },
  { label: "Cyprus", href: "#cyprus" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Reservation Terms", href: "/reservation-terms" },
] as const;
