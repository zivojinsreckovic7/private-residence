"use client";

import { useState } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { cn } from "@/lib/cn";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

const COPY = {
  en: {
    formLabel: "Reservation enquiry",
    title: "Reservation Enquiry",
    required: (star: React.ReactNode) => <>Fields marked {star} are required.</>,
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    guests: "Number of Guests",
    arrival: "Arrival Date",
    departure: "Departure Date",
    message: "Message",
    messagePlaceholder:
      "Tell us about your stay and any special requests you may have.",
    send: "Send Enquiry",
    notice: (address: React.ReactNode) => (
      <>
        This form is not connected yet. Please send your enquiry to {address}{" "}
        and we will reply personally.
      </>
    ),
  },
  sr: {
    formLabel: "Upit za rezervaciju",
    title: "Upit za rezervaciju",
    required: (star: React.ReactNode) => (
      <>Polja označena sa {star} su obavezna.</>
    ),
    name: "Ime i prezime",
    email: "Imejl adresa",
    phone: "Broj telefona",
    guests: "Broj gostiju",
    arrival: "Datum dolaska",
    departure: "Datum odlaska",
    message: "Poruka",
    messagePlaceholder:
      "Recite nam nešto o svom boravku i posebnim željama koje imate.",
    send: "Pošaljite upit",
    notice: (address: React.ReactNode) => (
      <>
        Ova forma još nije povezana. Pošaljite upit na {address} i odgovorićemo
        vam lično.
      </>
    ),
  },
} as const;

/**
 * The reservation enquiry form. One definition, used by the contact page and
 * by the contact section on the landing page, in both languages.
 *
 * It is deliberately not wired to anything: there is no route handler and no
 * inbox behind it yet. Left inert it would still submit, reloading the page
 * with the guest's details in the query string, so the submit is intercepted
 * and the guest is pointed at the reservations address instead. When the
 * endpoint exists, replace the body of `onSubmit`; the markup does not change.
 */
export function ContactForm({
  lang,
  className,
}: {
  lang: Lang;
  className?: string;
}) {
  const [notice, setNotice] = useState(false);
  const t = COPY[lang];

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setNotice(true);
      }}
      aria-label={t.formLabel}
      className={cn(
        "rounded-surface border border-line bg-canvas p-8 sm:p-10",
        className,
      )}
    >
      {/*
        The form's own title, not a document heading: the form sits under a
        section heading in both callers, so `aria-label` above names it and the
        outline stays correct wherever it is used.
      */}
      <p className="text-title font-medium text-ink">{t.title}</p>
      <p className="text-meta mt-2 text-ink-subtle">
        {t.required(<span className="text-accent">*</span>)}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label={t.name} name="name" required />
        <Field label={t.email} name="email" type="email" required />
        <Field label={t.phone} name="phone" type="tel" />
        <Field label={t.guests} name="guests" type="number" />
        <Field label={t.arrival} name="arrival" type="date" />
        <Field label={t.departure} name="departure" type="date" />
        <Field
          label={t.message}
          name="message"
          multiline
          required
          placeholder={t.messagePlaceholder}
          className="sm:col-span-2"
        />
      </div>

      <Magnetic className="mt-8 block sm:inline-block">
        <Button size="lg" icon className="w-full sm:w-auto">
          {t.send}
        </Button>
      </Magnetic>

      {/*
        Present from the first render so the live region is there to announce
        into, and `empty:` keeps it from taking any space until it has text.
      */}
      <p
        role="status"
        className="text-meta mt-6 max-w-[52ch] text-ink-muted empty:mt-0"
      >
        {notice &&
          t.notice(
            <a
              href={`mailto:${site.contact.reservations}`}
              className="text-accent underline underline-offset-4"
            >
              {site.contact.reservations}
            </a>,
          )}
      </p>
    </form>
  );
}
