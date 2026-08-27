import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

/** A validated request, as both messages need it. */
export type ReservationRequest = {
  lang: Lang;
  arrival: string;
  departure: string;
  nights: number;
  guests: number;
  occasion: string;
  arrangements: string[];
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
};

type Message = { subject: string; html: string; text: string };

/*
 * Two messages leave the form: one to the residence, one back to the guest.
 *
 * They are written here rather than in the route so the route stays about
 * validating and sending. Both are plain tables with inline styles and no
 * images: an email client is not a browser, half of them strip <style>, and a
 * request that renders as a wall of unstyled text in one of them is worse than
 * one that was never pretty to begin with.
 */

const INK = "#141619";
const MUTED = "#5a5f66";
const LINE = "#e6e6e8";
const ACCENT = "#c24e19";
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

/**
 * The residence's own notification. Always English: it is an operations mail,
 * not a guest-facing one.
 *
 * Everything the guest entered is in the body — the whole point is that
 * whoever opens this in webmail can answer without opening anything else.
 * Optional fields that were left blank are shown as a dash rather than
 * dropped, so "no phone number" reads as a fact rather than as a gap.
 */
export function teamMessage(request: ReservationRequest): Message {
  const stay: [string, string][] = [
    ["Arrival", day(request.arrival)],
    ["Departure", day(request.departure)],
    ["Nights", String(request.nights)],
    ["Guests", String(request.guests)],
    ["Occasion", request.occasion || DASH],
    ["Arrangements", request.arrangements.join(", ") || DASH],
  ];

  const guest: [string, string][] = [
    ["Name", request.name],
    ["Email", request.email],
    ["Phone", request.phone || DASH],
    ["Country", request.country || DASH],
    ["Writing in", request.lang === "sr" ? "Serbian" : "English"],
    ["Received", received()],
  ];

  const subject = `Reservation request — ${request.name}, ${range(request.arrival, request.departure)} (${request.nights} ${plural(request.nights, "night", "nights")}, ${request.guests} ${plural(request.guests, "guest", "guests")})`;

  const text = [
    subject,
    "",
    "THE STAY",
    ...stay.map(([label, value]) => `${label}: ${value}`),
    "",
    "THE GUEST",
    ...guest.map(([label, value]) => `${label}: ${value}`),
    "",
    "MESSAGE",
    request.message || DASH,
    "",
    `Reply to this email to answer ${request.name} directly.`,
  ].join("\n");

  const html = shell(`
    ${heading("Reservation request")}
    ${label("The stay")}
    ${table(stay)}
    ${label("The guest")}
    ${table(([
      ["Name", request.name],
      ["Email", link(`mailto:${request.email}`, request.email)],
      [
        "Phone",
        request.phone ? link(`tel:${request.phone.replace(/[^+\d]/g, "")}`, request.phone) : DASH,
      ],
      ["Country", request.country || DASH],
      ["Writing in", request.lang === "sr" ? "Serbian" : "English"],
      ["Received", received()],
    ] as [string, Cell][]))}
    ${label("Message")}
    <p style="margin:6px 0 0;font:400 15px/1.7 ${SANS};color:${INK};white-space:pre-wrap">${escape(request.message || DASH)}</p>
    <p style="margin:28px 0 0;padding-top:20px;border-top:1px solid ${LINE};font:400 13px/1.6 ${SANS};color:${MUTED}">
      Reply to this email and it goes straight to ${escape(request.name)}.
    </p>
  `);

  return { subject, html, text };
}

/** The guest's confirmation, in the language they were reading. */
export function guestMessage(request: ReservationRequest): Message {
  const sr = request.lang === "sr";

  const subject = sr
    ? `Vaš zahtev za rezervaciju — ${site.fullName}`
    : `Your reservation request — ${site.fullName}`;

  // "Poštovani" is masculine and the form never asks who is writing, so the
  // Serbian greeting takes the neutral form rather than guessing.
  const greeting = sr
    ? `Poštovani/a ${request.name},`
    : `Dear ${request.name},`;

  const opening = sr
    ? "Hvala vam — vaš zahtev je stigao do nas."
    : "Thank you — your request has reached us.";

  const rows: [string, string][] = sr
    ? [
        ["Dolazak", day(request.arrival, "sr")],
        ["Odlazak", day(request.departure, "sr")],
        ["Noćenja", String(request.nights)],
        ["Gosti", String(request.guests)],
      ]
    : [
        ["Arrival", day(request.arrival)],
        ["Departure", day(request.departure)],
        ["Nights", String(request.nights)],
        ["Guests", String(request.guests)],
      ];

  const body = sr
    ? [
        "Neko iz našeg tima javiće vam se lično, obično u roku od 24 sata, sa dostupnošću i pisanim uslovima za vaše datume.",
        "Ništa nije naplaćeno i ništa još nije potvrđeno. Zahtev možete izmeniti ili otkazati u svakom trenutku — dovoljno je da odgovorite na ovaj imejl.",
      ]
    : [
        "Someone from our team will reply personally, usually within 24 hours, with availability and written terms for your dates.",
        "Nothing has been charged and nothing is confirmed yet. You can change or cancel this request at any point by replying to this email.",
      ];

  const text = [
    greeting,
    "",
    opening,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    ...body,
    "",
    site.fullName,
    site.address.lines.join(", "),
    site.contact.reservations,
    site.url,
  ].join("\n");

  const html = shell(`
    ${heading(sr ? "Zahtev za rezervaciju" : "Reservation request")}
    <p style="margin:0 0 6px;font:400 16px/1.7 ${SANS};color:${INK}">${escape(greeting)}</p>
    <p style="margin:0 0 24px;font:400 16px/1.7 ${SANS};color:${INK}">${escape(opening)}</p>
    ${table(rows)}
    ${body.map((line) => `<p style="margin:20px 0 0;font:400 15px/1.7 ${SANS};color:${MUTED}">${escape(line)}</p>`).join("")}
    <p style="margin:32px 0 0;padding-top:20px;border-top:1px solid ${LINE};font:400 13px/1.7 ${SANS};color:${MUTED}">
      ${escape(site.fullName)}<br>
      ${site.address.lines.map(escape).join("<br>")}<br>
      <a href="mailto:${site.contact.reservations}" style="color:${ACCENT}">${site.contact.reservations}</a>
    </p>
  `);

  return { subject, html, text };
}

/* -------------------------------------------------------------------------- */

function shell(content: string): string {
  return `<!doctype html><html><body style="margin:0;padding:32px 16px;background:#f4f4f5">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid ${LINE}">
    <tr><td style="padding:36px 36px 40px">
      <p style="margin:0 0 28px;font:400 15px/1 ${SERIF};letter-spacing:0.18em;text-transform:uppercase;color:${INK}">
        MIS <span style="color:${LINE}">|</span> Private Residence
      </p>
      ${content}
    </td></tr>
  </table>
</body></html>`;
}

function heading(text: string): string {
  return `<h1 style="margin:0 0 24px;font:400 24px/1.3 ${SERIF};color:${INK}">${escape(text)}</h1>`;
}

/**
 * A cell is either text, which is escaped here, or markup built by `link()`,
 * which is already safe. Nothing else can reach the template.
 */
type Cell = string | { html: string };

function table(rows: [string, Cell][]): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
    ${rows
      .map(
        ([label, value]) => `<tr>
      <td style="padding:10px 0;border-top:1px solid ${LINE};font:400 13px/1.5 ${SANS};color:${MUTED}">${escape(label)}</td>
      <td style="padding:10px 0;border-top:1px solid ${LINE};font:500 14px/1.5 ${SANS};color:${INK};text-align:right">${typeof value === "string" ? escape(value) : value.html}</td>
    </tr>`,
      )
      .join("")}
  </table>`;
}

/** Blank optional fields read as a fact, not as a gap. */
const DASH = "—";

/** `2026-09-12` as a person reads it. Written in UTC, as the value is a day. */
function day(iso: string, lang: Lang = "en"): string {
  const ms = Date.parse(`${iso}T00:00:00Z`);
  if (Number.isNaN(ms)) return iso;
  return new Intl.DateTimeFormat(lang === "sr" ? "sr-Latn-RS" : "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(ms);
}

/**
 * The stay as one short span, for the subject line: `12–19 Sep 2026`, with the
 * month or year repeated only when the stay actually crosses one.
 */
function range(from: string, to: string): string {
  const start = new Date(`${from}T00:00:00Z`);
  const end = new Date(`${to}T00:00:00Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return `${from} to ${to}`;
  }

  const part = (date: Date, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "UTC" }).format(date);

  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const sameMonth = sameYear && start.getUTCMonth() === end.getUTCMonth();

  const left = sameMonth
    ? part(start, { day: "numeric" })
    : part(start, { day: "numeric", month: "short", ...(sameYear ? {} : { year: "numeric" }) });

  return `${left}–${part(end, { day: "numeric", month: "short", year: "numeric" })}`;
}

/** When the request landed, on the residence's own clock. */
function received(): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Nicosia",
  }).format(new Date());
}

function label(text: string): string {
  return `<p style="margin:28px 0 4px;font:500 11px/1 ${SANS};letter-spacing:0.14em;text-transform:uppercase;color:${MUTED}">${escape(text)}</p>`;
}

/** A cell that is a link. The text is escaped; the markup around it is ours. */
function link(href: string, text: string): { html: string } {
  return { html: `<a href="${escape(href)}" style="color:${ACCENT}">${escape(text)}</a>` };
}

/** Everything interpolated here is guest input, so none of it is trusted. */
function escape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function plural(n: number, one: string, many: string): string {
  return n === 1 ? one : many;
}
