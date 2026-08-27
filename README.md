# MIS Private Residence

Marketing site for a private residence in Cyprus. Next.js 16 (App Router),
Tailwind v4, TypeScript.

## Running it

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Without `RESEND_API_KEY` everything runs, but the reservation form answers
503 and no mail is sent. The same value belongs in the Vercel project's
environment variables for Production and Preview.

## Routes

| Path                 | What it is                                             |
| -------------------- | ------------------------------------------------------ |
| `/`                  | The landing page                                       |
| `/reservations`      | The booking request. Every reserve CTA lands here      |
| `/experiences`       | What a stay is like                                    |
| `/gallery`           | Every photograph, grouped by part of the house         |
| `/about`             | The long-form about page, written for search           |
| `/contact`           | General enquiries, not bookings                        |
| `/styleguide`        | Living specimen of the design system. `noindex`        |
| `/api/reservations`  | POST endpoint behind the reservation form              |

Serbian sits under `/sr`; English is unprefixed. `sitemap.xml` and
`robots.txt` are generated from `src/app/sitemap.ts` and `robots.ts`.

## The reservation form

`POST /api/reservations` validates the request server-side and sends two
messages through Resend: the request to `reservation@misprivateresidence.com`
with `Reply-To` set to the guest, and a confirmation back to the guest in
whichever language they were reading.

Mail is sent from `reservation.misprivateresidence.com`, a subdomain verified
with Resend. That is deliberate: the root domain carries Titan's MX and SPF
records for the mailbox, and keeping the sending records on a subdomain means
nothing about sending can affect receiving.

## Where things live

```
src/
  app/                 routes only
    globals.css        design tokens + the handful of global rules
  components/
    ui/                primitives, no page knowledge
    motion/            the motion system
    layout/            site chrome
    sections/          one file per landing section
  lib/                 fonts, brand config, helpers
public/
  gallery/             property photography, grouped by room
  hero/                the walkthrough, encoded all-intra for scroll scrubbing
```

**Read `AGENTS.md` before changing anything.** It carries the design system,
the motion system, and the reasons behind several decisions that look
arbitrary but are not.

## Deployment

Vercel, from this repository root. Next.js is detected automatically; no build
configuration is required. Set `RESEND_API_KEY` in the project's environment
variables before the first deploy, or the reservation form will answer 503.
