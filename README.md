# MIS Private Residence

Marketing site for a private residence in Cyprus. Next.js 16 (App Router),
Tailwind v4, TypeScript.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Routes

| Path          | What it is                                              |
| ------------- | ------------------------------------------------------- |
| `/`           | The landing page                                        |
| `/gallery`    | Every photograph, grouped by part of the house          |
| `/styleguide` | Living specimen of the design system. `noindex`         |

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
configuration is required.
