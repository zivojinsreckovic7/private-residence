"use client";

import { useState } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * The reservation enquiry form. One definition, used by the contact page and
 * by the contact section on the landing page.
 *
 * It is deliberately not wired to anything: there is no route handler and no
 * inbox behind it yet. Left inert it would still submit, reloading the page
 * with the guest's details in the query string, so the submit is intercepted
 * and the guest is pointed at the reservations address instead. When the
 * endpoint exists, replace the body of `onSubmit`; the markup does not change.
 */
export function ContactForm({ className }: { className?: string }) {
  const [notice, setNotice] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setNotice(true);
      }}
      aria-label="Reservation enquiry"
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
      <p className="text-title font-medium text-ink">Reservation Enquiry</p>
      <p className="text-meta mt-2 text-ink-subtle">
        Fields marked <span className="text-accent">*</span> are required.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="Full Name" name="name" required />
        <Field label="Email Address" name="email" type="email" required />
        <Field label="Phone Number" name="phone" type="tel" />
        <Field label="Number of Guests" name="guests" type="number" />
        <Field label="Arrival Date" name="arrival" type="date" />
        <Field label="Departure Date" name="departure" type="date" />
        <Field
          label="Message"
          name="message"
          multiline
          required
          placeholder="Tell us about your stay and any special requests you may have."
          className="sm:col-span-2"
        />
      </div>

      <Magnetic className="mt-8 block sm:inline-block">
        <Button size="lg" icon className="w-full sm:w-auto">
          Send Enquiry
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
        {notice && (
          <>
            This form is not connected yet. Please send your enquiry to{" "}
            <a
              href={`mailto:${site.contact.reservations}`}
              className="text-accent underline underline-offset-4"
            >
              {site.contact.reservations}
            </a>{" "}
            and we will reply personally.
          </>
        )}
      </p>
    </form>
  );
}
