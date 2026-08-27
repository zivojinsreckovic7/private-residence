"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CaretDown, Check, Lock, Minus, Plus } from "@phosphor-icons/react/ssr";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Field, fieldControl } from "@/components/ui/field";
import { cn } from "@/lib/cn";
import { LANG_TAGS, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

const COPY = {
  en: {
    formLabel: "Reservation request",
    steps: [
      {
        title: "Your stay",
        note: "Not fixed on the dates yet? Give us your best guess — we will work around it.",
      },
      { title: "Your details", note: "So we know who we are writing back to." },
      {
        title: "Anything we should arrange",
        note: "Optional, and nothing here is a commitment. We will tell you honestly what is possible for your dates.",
      },
    ],
    arrival: "Arrival",
    departure: "Departure",
    guests: "Guests",
    guestsNote: "The residence is yours alone for the whole stay.",
    fewer: "Fewer guests",
    more: "More guests",
    occasion: "Occasion",
    occasionAny: "No particular occasion",
    occasions: [
      "A private escape",
      "A romantic stay",
      "Time with family",
      "A trip with friends",
      "A special celebration",
      "A long Mediterranean weekend",
    ],
    name: "Full name",
    email: "Email address",
    phone: "Phone number",
    country: "Country",
    arrangements: [
      "Airport transfer",
      "Early check-in or late checkout",
      "Groceries in before we arrive",
      "A celebration to set up",
      "Recommendations across the island",
    ],
    message: "Anything else",
    messagePlaceholder:
      "Who is travelling, how you would like the stay to feel, and anything you would like us to know.",
    summary: {
      title: "Your request",
      /* The island as prose, not as the postal address, which is never
         translated. */
      country: "Cyprus",
      exclusive: "Exclusive use",
      notSet: "Not selected yet",
      nights: "Nights",
      included: [
        "The whole residence, for you and your guests alone",
        "Private pool and terrace, all day, every day",
        "One team, from this message through to your arrival",
      ],
      submit: "Request Reservation",
      noPayment: "No payment is taken on this page.",
      assurance:
        "We reply with availability and written terms for your dates. Nothing is charged, and nothing is confirmed, until you say yes.",
      privacy: "Your details are used to answer this request and nothing else.",
    },
    bar: { empty: "Add your dates", submit: "Request", sending: "Sending" },
    sending: "Sending your request",
    sent: {
      badge: "Request sent",
      title: "Your request is with us.",
      body: (email: React.ReactNode) => (
        <>
          A copy is on its way to {email}. Someone from our team will reply
          personally, usually within 24 hours, with availability and written
          terms for your dates.
        </>
      ),
      note: "Nothing has been charged and nothing is confirmed yet. You can change or cancel simply by replying to that email.",
    },
    error: {
      title: "That did not go through.",
      body: "Something went wrong at our end — nothing you typed is lost. Send the request straight from your email app instead, or try again in a moment.",
      action: "Open the request in email",
      fallback: "Or write to us directly at",
    },
  },
  sr: {
    formLabel: "Zahtev za rezervaciju",
    steps: [
      {
        title: "Vaš boravak",
        note: "Datumi još nisu sigurni? Upišite okvirno — prilagodićemo se.",
      },
      { title: "Vaši podaci", note: "Da znamo kome pišemo nazad." },
      {
        title: "Šta da pripremimo",
        note: "Opciono i ni na šta vas ne obavezuje. Iskreno ćemo vam reći šta je moguće za vaše datume.",
      },
    ],
    arrival: "Dolazak",
    departure: "Odlazak",
    guests: "Gosti",
    guestsNote: "Rezidencija je tokom celog boravka samo vaša.",
    fewer: "Manje gostiju",
    more: "Više gostiju",
    occasion: "Povod",
    occasionAny: "Bez posebnog povoda",
    occasions: [
      "Privatno bekstvo",
      "Romantičan boravak",
      "Vreme sa porodicom",
      "Putovanje sa prijateljima",
      "Posebna proslava",
      "Dug mediteranski vikend",
    ],
    name: "Ime i prezime",
    email: "Imejl adresa",
    phone: "Broj telefona",
    country: "Država",
    arrangements: [
      "Prevoz sa aerodroma",
      "Raniji dolazak ili kasniji odlazak",
      "Namirnice pre našeg dolaska",
      "Proslava koju treba pripremiti",
      "Preporuke širom ostrva",
    ],
    message: "Još nešto",
    messagePlaceholder:
      "Ko putuje, kakav boravak želite i sve ostalo što bi trebalo da znamo.",
    summary: {
      title: "Vaš zahtev",
      country: "Kipar",
      exclusive: "Ekskluzivno korišćenje",
      notSet: "Još nije izabrano",
      nights: "Noćenja",
      included: [
        "Cela rezidencija, samo za vas i vaše goste",
        "Privatni bazen i terasa, ceo dan, svakog dana",
        "Jedan tim, od ove poruke do vašeg dolaska",
      ],
      submit: "Pošaljite zahtev",
      noPayment: "Na ovoj stranici se ne vrši nikakvo plaćanje.",
      assurance:
        "Odgovaramo sa dostupnošću i pisanim uslovima za vaše datume. Ništa se ne naplaćuje i ništa nije potvrđeno dok vi ne kažete da.",
      privacy:
        "Vaše podatke koristimo isključivo da odgovorimo na ovaj zahtev.",
    },
    bar: { empty: "Unesite datume", submit: "Pošaljite", sending: "Šaljemo" },
    sending: "Šaljemo vaš zahtev",
    sent: {
      badge: "Zahtev je poslat",
      title: "Vaš zahtev je stigao do nas.",
      body: (email: React.ReactNode) => (
        <>
          Kopija je na putu ka {email}. Neko iz našeg tima javiće vam se lično,
          obično u roku od 24 sata, sa dostupnošću i pisanim uslovima za vaše
          datume.
        </>
      ),
      note: "Ništa nije naplaćeno i ništa još nije potvrđeno. Sve možete izmeniti ili otkazati odgovorom na taj imejl.",
    },
    error: {
      title: "Slanje nije uspelo.",
      body: "Nešto je zapelo na našoj strani — ništa što ste uneli nije izgubljeno. Pošaljite zahtev direktno iz svoje imejl aplikacije ili pokušajte ponovo za koji trenutak.",
      action: "Otvorite zahtev u imejlu",
      fallback: "Ili nam pišite direktno na",
    },
  },
} as const;

/** Enough for any party the residence takes; not a statement of capacity. */
const MAX_GUESTS = 16;

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The reservation request: the form and the summary that reads back from it,
 * as one component because they share the same state.
 *
 * The submit posts to `/api/reservations`, which validates everything again
 * and sends two messages: the request to the residence, and a confirmation to
 * the guest. Nothing about the sending happens here — the key is the server's.
 *
 * If that call fails the guest is not left holding an error. The request is
 * written into a `mailto:` with everything they typed, so the worst outcome is
 * one extra click rather than a lost booking.
 */
export function ReservationCheckout({
  lang,
  photo,
}: {
  lang: Lang;
  photo: { src: string; alt: string };
}) {
  const t = COPY[lang];

  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  /** Where the confirmation went, for the sent panel to name. */
  const [sentTo, setSentTo] = useState("");
  /** The request as a `mailto:`, offered only if the send failed. */
  const [fallback, setFallback] = useState<string | null>(null);

  /**
   * Today, as the floor under both date fields. Read from the guest's own
   * clock the moment they reach for a date, rather than at render: both
   * editions are prerendered, so a build-time date would be stale by the time
   * anyone read the page and would not match what the browser hydrates with.
   */
  const [today, setToday] = useState("");

  /**
   * When the guest first touched the form. The endpoint rejects a submit that
   * follows within a few seconds, which no person manages and every script
   * does. A ref, not state: nothing on screen depends on it.
   */
  const startedAt = useRef(0);

  const stamp = () => {
    if (!startedAt.current) startedAt.current = Date.now();
    if (!today) setToday(new Date().toISOString().slice(0, 10));
  };

  const nights = nightsBetween(arrival, departure);
  const noticeRef = useRef<HTMLDivElement>(null);

  // Whatever the answer is, it is the one thing on the page worth moving the
  // reader to.
  useEffect(() => {
    if (status === "sent" || status === "error") noticeRef.current?.focus();
  }, [status]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    // Read the form before the first await: React clears `currentTarget` once
    // the handler returns, and the fallback needs these values.
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();

    setStatus("sending");
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          startedAt: startedAt.current,
          company: data.get("company"),
          arrival: data.get("arrival"),
          departure: data.get("departure"),
          guests: data.get("guests"),
          occasion: data.get("occasion"),
          arrangements: data.getAll("arrangements"),
          name: data.get("name"),
          email,
          phone: data.get("phone"),
          country: data.get("country"),
          message: data.get("message"),
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setSentTo(email);
      setStatus("sent");
    } catch {
      // The guest keeps everything they typed, in a form they can send by hand.
      setFallback(composeRequest(data, lang));
      setStatus("error");
    }
  }

  return (
    <form
      aria-label={t.formLabel}
      onSubmit={submit}
      onFocusCapture={stamp}
      onPointerDownCapture={stamp}
    >
      <Container className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          {status === "error" && fallback && (
            <div
              ref={noticeRef}
              tabIndex={-1}
              role="alert"
              className="rounded-surface mb-6 border border-accent/35 bg-accent-tint p-6 sm:p-8"
            >
              <p className="text-title font-medium text-ink">{t.error.title}</p>
              <p className="text-body mt-3 max-w-[54ch] text-ink-muted">
                {t.error.body}
              </p>
              <Button href={fallback} icon className="mt-6">
                {t.error.action}
              </Button>
              <p className="text-meta mt-5 text-ink-subtle">
                {t.error.fallback}{" "}
                <a
                  href={`mailto:${site.contact.reservations}`}
                  className="text-accent underline underline-offset-4"
                >
                  {site.contact.reservations}
                </a>
              </p>
            </div>
          )}

          {status === "sent" ? (
            /*
              The form is done, so it goes: what is left to read is what
              happens next, and the summary alongside still shows the stay
              exactly as it was sent.
            */
            <div
              ref={noticeRef}
              tabIndex={-1}
              role="status"
              className="rounded-surface border border-line bg-canvas p-8 sm:p-12"
            >
              <p className="text-label inline-flex items-center gap-2 uppercase text-accent">
                <Check size={14} weight="bold" aria-hidden />
                {t.sent.badge}
              </p>
              <p className="text-headline mt-5 max-w-[18ch] font-serif font-light text-ink">
                {t.sent.title}
              </p>
              <p className="text-lead mt-6 max-w-[48ch] text-ink-muted">
                {t.sent.body(
                  <span className="whitespace-nowrap text-ink">{sentTo}</span>,
                )}
              </p>
              <p className="text-meta mt-6 max-w-[52ch] border-t border-line pt-6 text-ink-subtle">
                {t.sent.note}
              </p>
            </div>
          ) : (
          <Reveal className="rounded-surface border border-line bg-canvas p-6 sm:p-10">
            <Step index="01" title={t.steps[0].title} note={t.steps[0].note} />
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field
                label={t.arrival}
                name="arrival"
                type="date"
                required
                value={arrival}
                min={today || undefined}
                onChange={(value) => {
                  setArrival(value);
                  // A departure that is now on or before the arrival is not a
                  // stay any more, so it is dropped rather than left to fail
                  // validation later.
                  if (departure && departure <= value) setDeparture("");
                }}
              />
              <Field
                label={t.departure}
                name="departure"
                type="date"
                required
                value={departure}
                min={nextDay(arrival) || today || undefined}
                onChange={setDeparture}
              />

              <div className="flex flex-col gap-2">
                <span className="text-meta text-ink">{t.guests}</span>
                <div className="rounded-surface flex items-center justify-between border border-line-strong bg-canvas py-1.5 pr-1.5 pl-4">
                  <span className="text-body text-ink">
                    {guests} {guestWord(guests, lang)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Stepper
                      label={t.fewer}
                      disabled={guests <= 1}
                      onClick={() => setGuests((n) => Math.max(1, n - 1))}
                    >
                      <Minus size={15} weight="light" />
                    </Stepper>
                    <Stepper
                      label={t.more}
                      disabled={guests >= MAX_GUESTS}
                      onClick={() =>
                        setGuests((n) => Math.min(MAX_GUESTS, n + 1))
                      }
                    >
                      <Plus size={15} weight="light" />
                    </Stepper>
                  </span>
                </div>
                <input type="hidden" name="guests" value={guests} />
                <p className="text-meta text-ink-subtle">{t.guestsNote}</p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="occasion" className="text-meta text-ink">
                  {t.occasion}
                </label>
                <div className="relative">
                  <select
                    id="occasion"
                    name="occasion"
                    value={occasion}
                    onChange={(event) => setOccasion(event.target.value)}
                    className={cn(fieldControl, "appearance-none pr-11")}
                  >
                    <option value="">{t.occasionAny}</option>
                    {t.occasions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <CaretDown
                    size={16}
                    weight="light"
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-subtle"
                  />
                </div>
              </div>
            </div>

            <Rule />

            <Step index="02" title={t.steps[1].title} note={t.steps[1].note} />
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field
                label={t.name}
                name="name"
                required
                autoComplete="name"
              />
              <Field
                label={t.email}
                name="email"
                type="email"
                required
                autoComplete="email"
              />
              <Field
                label={t.phone}
                name="phone"
                type="tel"
                autoComplete="tel"
              />
              <Field
                label={t.country}
                name="country"
                autoComplete="country-name"
              />
            </div>

            <Rule />

            <Step index="03" title={t.steps[2].title} note={t.steps[2].note} />
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {t.arrangements.map((item) => (
                <li key={item}>
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      name="arrangements"
                      value={item}
                      className="peer sr-only"
                    />
                    <span className="text-meta inline-flex items-center rounded-full border border-line-strong px-4 py-2.5 text-ink-muted transition-colors duration-(--dur-fast) hover:border-ink-faint peer-checked:border-accent peer-checked:bg-accent-tint peer-checked:text-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-accent">
                      {item}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <Field
              label={t.message}
              name="message"
              multiline
              placeholder={t.messagePlaceholder}
              className="mt-7"
            />

            {/*
              The honeypot: a field no guest can reach, that a script fills in
              anyway. Clipped rather than `display:none`, which the better
              scripts check for, and kept out of both the tab order and the
              accessibility tree so it costs nobody anything.
            */}
            <div aria-hidden className="sr-only">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
          </Reveal>
          )}
        </div>

        <Reveal
          delay={120}
          as="section"
          aria-label={t.summary.title}
          className="rounded-surface border border-line bg-canvas p-6 shadow-soft sm:p-8 lg:sticky lg:top-28"
        >
          <div className="rounded-surface relative aspect-[16/10] overflow-hidden bg-surface">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
          </div>

          <p className="text-title mt-6 font-serif font-light text-ink">
            {site.fullName}
          </p>
          <p className="text-meta mt-1 text-ink-subtle">
            {site.address.locality}, {t.summary.country} · {t.summary.exclusive}
          </p>

          <dl className="mt-7">
            <Row
              label={t.arrival}
              value={formatDate(arrival, lang) ?? t.summary.notSet}
              muted={!arrival}
            />
            <Row
              label={t.departure}
              value={formatDate(departure, lang) ?? t.summary.notSet}
              muted={!departure}
            />
            <Row
              label={t.summary.nights}
              value={
                nights ? `${nights} ${nightWord(nights, lang)}` : t.summary.notSet
              }
              muted={!nights}
            />
            <Row
              label={t.guests}
              value={`${guests} ${guestWord(guests, lang)}`}
            />
            {occasion && <Row label={t.occasion} value={occasion} />}
          </dl>

          <ul className="mt-7 space-y-3 border-t border-line pt-7">
            {t.summary.included.map((item) => (
              <li key={item} className="flex gap-3">
                <Check
                  size={16}
                  weight="light"
                  aria-hidden
                  className="mt-1 shrink-0 text-accent"
                />
                <span className="text-meta text-ink-muted">{item}</span>
              </li>
            ))}
          </ul>

          {status === "sent" ? (
            <p className="text-meta mt-8 flex items-center justify-center gap-2 rounded-full border border-accent/35 bg-accent-tint py-3.5 font-medium text-accent">
              <Check size={15} weight="bold" aria-hidden />
              {t.sent.badge}
            </p>
          ) : (
            <Magnetic className="mt-8 block">
              <Button
                size="lg"
                icon={status !== "sending"}
                disabled={status === "sending"}
                className="w-full"
              >
                {status === "sending" ? t.sending : t.summary.submit}
              </Button>
            </Magnetic>
          )}

          <p className="text-meta mt-5 flex items-start gap-2 text-ink">
            <Lock
              size={15}
              weight="light"
              aria-hidden
              className="mt-0.5 shrink-0 text-ink-subtle"
            />
            <span>
              {t.summary.noPayment}{" "}
              <span className="text-ink-muted">{t.summary.assurance}</span>
            </span>
          </p>
          <p className="text-meta mt-3 text-ink-subtle">{t.summary.privacy}</p>
        </Reveal>
      </Container>

      {/*
        The phone's action bar. Sticky rather than fixed, and the last thing in
        the form, so it rides the bottom of the window while the form is on
        screen and then comes to rest at the end of it, instead of hanging over
        the sections and the footer below.
      */}
      {status !== "sent" && (
        <div className="sticky bottom-0 z-20 mt-8 border-t border-line bg-canvas px-5 py-3 lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <p className="text-meta text-ink-muted">
              {nights
                ? `${nights} ${nightWord(nights, lang)} · ${guests} ${guestWord(guests, lang)}`
                : t.bar.empty}
            </p>
            <Button disabled={status === "sending"} className="shrink-0">
              {status === "sending" ? t.bar.sending : t.bar.submit}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

/** A numbered step heading inside the panel. */
function Step({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note: string;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-4">
        {/* Cormorant sets oldstyle figures by default, where 01 reads as
            "oi". `lnum` asks for the lining set, so a step number is a
            number. */}
        <span className="text-title font-serif font-light text-accent [font-feature-settings:'lnum']">
          {index}
        </span>
        <h2 className="text-title font-medium text-ink">{title}</h2>
      </div>
      <p className="text-meta mt-2 max-w-[52ch] text-ink-subtle">{note}</p>
    </div>
  );
}

function Rule() {
  return <hr className="my-9 border-0 border-t border-line" />;
}

/** One row of the summary, read back from the form. */
function Row({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-line py-3 first:border-t-0 first:pt-0">
      <dt className="text-meta text-ink-subtle">{label}</dt>
      <dd
        className={cn(
          "text-meta text-right",
          muted ? "text-ink-faint" : "font-medium text-ink",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function Stepper({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-(--dur-fast) hover:border-ink hover:bg-accent-tint disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}

/** Nights between two `YYYY-MM-DD` values, or null while the pair is unusable. */
function nightsBetween(from: string, to: string): number | null {
  if (!from || !to) return null;
  const start = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  const nights = Math.round((end - start) / 86_400_000);
  return nights > 0 ? nights : null;
}

/** The earliest departure that makes a stay, as a date-input floor. */
function nextDay(value: string): string {
  const ms = Date.parse(`${value}T00:00:00Z`);
  if (Number.isNaN(ms)) return "";
  return new Date(ms + 86_400_000).toISOString().slice(0, 10);
}

function formatDate(value: string, lang: Lang): string | null {
  if (!value) return null;
  const ms = Date.parse(`${value}T00:00:00Z`);
  if (Number.isNaN(ms)) return null;
  return new Intl.DateTimeFormat(LANG_TAGS[lang], {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(ms);
}

/**
 * Serbian counts in three forms and English in two, and the summary reads back
 * whatever the guest has just set, so the wrong form is noticeable.
 */
function guestWord(n: number, lang: Lang): string {
  if (lang === "en") return n === 1 ? "guest" : "guests";
  const ones = n % 10;
  const tens = n % 100;
  if (ones === 1 && tens !== 11) return "gost";
  if (ones >= 2 && ones <= 4 && (tens < 12 || tens > 14)) return "gosta";
  return "gostiju";
}

function nightWord(n: number, lang: Lang): string {
  if (lang === "en") return n === 1 ? "night" : "nights";
  return n % 10 === 1 && n % 100 !== 11 ? "noć" : "noći";
}

/**
 * The whole request, written out as a `mailto:` the guest can send. Everything
 * typed into the form is carried across, so nothing has to be entered twice.
 */
function composeRequest(data: FormData, lang: Lang): string {
  const t = COPY[lang];
  const value = (name: string) => String(data.get(name) ?? "").trim();
  const arrival = value("arrival");
  const departure = value("departure");
  const nights = nightsBetween(arrival, departure);
  const arrangements = data.getAll("arrangements").map(String);

  const rows: [string, string][] = [
    [t.arrival, formatDate(arrival, lang) ?? arrival],
    [t.departure, formatDate(departure, lang) ?? departure],
    [t.summary.nights, nights ? String(nights) : ""],
    [t.guests, value("guests")],
    [t.occasion, value("occasion") || t.occasionAny],
    [t.steps[2].title, arrangements.join(", ")],
    [t.name, value("name")],
    [t.email, value("email")],
    [t.phone, value("phone")],
    [t.country, value("country")],
  ];

  const body = [
    `${t.formLabel} — ${site.fullName}`,
    "",
    ...rows.filter(([, v]) => v).map(([label, v]) => `${label}: ${v}`),
    "",
    `${t.message}:`,
    value("message") || "—",
  ].join("\n");

  const subject = `${t.formLabel}${arrival ? ` — ${arrival}` : ""}`;

  return `mailto:${site.contact.reservations}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
