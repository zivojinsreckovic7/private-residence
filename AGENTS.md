<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Working rules

**Keep the code scalable, easy to read, and free of over-engineering unless it
is genuinely required. Componentize smartly. Keep the file base cleanly
organized.**

In practice:

- Reach for the smallest thing that solves the problem. Add a dependency, an
  abstraction, or a layer of indirection only when the concrete need is already
  in front of you, not in anticipation of one.
- A component earns its own file when it is reused, or when it owns real state
  or interaction. Page-local pieces stay in the page file until a second caller
  appears.
- Values that appear in more than one place live in `src/lib/site.ts` or as a
  design token, never inline twice.
- Prefer clear names and short files over clever ones. Comments explain *why*,
  not *what*.

# File layout

```
src/
  app/                 routes only
    layout.tsx         fonts, metadata, header and footer chrome
    globals.css        design tokens + the handful of global rules
    page.tsx           home
    about/             the long-form about page, written for search
    contact/           the enquiry page
    experiences/       what a stay is like, plus the guest quotes
    gallery/           the full photography set
    favicon.ico        the crest, 16/32/48; see scripts/make-icons.py
    icon.png           the crest, 512
    apple-icon.png     the crest, 180
    styleguide/        living specimen of the system, noindex, not linked
  components/
    ui/                primitives, no page knowledge  (Button, Section, ...)
    layout/            site chrome                    (SiteHeader, SiteFooter)
    motion/            the motion system              (Reveal, Parallax, ...)
    sections/          one file per landing section   (Hero, Cyprus, Faq, ...)
  lib/                 fonts, brand config, helpers
scripts/
  make-icons.py        regenerates the three app icons from the crest
media-source/          original masters, not served, not deployed
public/
  logo.jpeg            the crest raster; see the Wordmark note below
  hero/                walkthrough video tiers + poster
  gallery/             residence photography, one folder per subject
    exterior/          the building itself
    pool-terrace/      pool, terrace, outdoor lounging and dining
    living/            living room and dining room
    kitchen/
    bedrooms/
    bathrooms/
    details/           styled close-ups, for texture between wide shots
```

`@/*` maps to `src/*`.

Gallery filenames are *meant* to describe the shot
(`pool-through-bougainvillea.jpeg`), so a gallery's *order* belongs in code,
never in a numeric prefix. **Several of them are wrong**, so never write alt
text from a file name — open the image. Known liars:
`living/living-and-dining-toward-pool.jpeg` is the kitchen bar seen from the
dining table, and `kitchen/kitchen-island-and-display-shelves.jpeg` is the
living room looking out to the pool. The verified descriptions all live in
`lib/gallery.ts`, which is the single manifest both the wall and the grid read;
copy from there rather than re-deriving them.

# Theme notes

**Palette.** White canvas, graphite ink, one burnt-orange action colour
(`#c24e19`, 4.78:1 on white, so it is safe for text as well as fills). The
crest's gold is kept as `--color-gold` for the mark and hairline rules only; it
is never a CTA. Deliberately avoided the beige-and-brass palette that every
luxury site defaults to, so the brand stays legible against its category.

**"Text is white"** was read as: white is the *canvas*, and white type is what
runs on photography and on the dark footer. Ink on white is `--color-ink`,
never white. Tokens are split accordingly: `ink` / `ink-muted` / `ink-subtle`
for light surfaces, `on-dark` / `on-dark-muted` for dark ones.

**Light mode only**, by brand decision (`color-scheme: light`). A residence
site is closer to print than to an app. If dark mode is wanted later, the
tokens are already semantic, so it is a matter of adding one media block in
`globals.css`.

**Type.** Two families, each with a job:

- **Geist** is the working voice: nav, body, labels, buttons.
- **Cormorant Garamond** is the brand voice. It matches the letterspaced serif
  on the crest, so it carries the wordmark, the rate, and accented words inside
  headings via `<Accent>`.

`<Accent>` scales to `1.08em` to compensate for Cormorant's small x-height next
to Geist, and sets `leading-[1.15]` so italic descenders (`y g j p`) clear the
line below. Use it for one word or a short phrase, never a whole heading.

**Type scale** is fluid (`clamp()`) in `@theme`, so `text-display`,
`text-headline`, `text-title`, `text-lead`, `text-body`, `text-meta` and
`text-label` need no responsive variants.

**Shape lock.** Interactive elements are full pills. Surfaces are near-sharp at
`rounded-surface` (2px). That split is the rule; do not mix others in. The one
exception is `CtaBanner`, which is a `rounded-2xl` white card on a grey band,
by request. It is the only mid radius and the only white surface sitting on
another surface, and both are what make it read as an offer rather than as
another chapter. Do not "correct" it back.

**Motion.** Custom easings only (`ease-out-expo`, `ease-swift`) with
`--dur-fast/base/slow`. Everything animates `transform` and `opacity` only.
`<Reveal>` handles scroll entrances through an IntersectionObserver that writes
straight to the DOM, and the animation itself lives in `globals.css` behind
`prefers-reduced-motion`.

**z-index scale.** Mobile menu overlay 30, header 40, loading curtain 50,
grain 60. Nothing else claims a layer. The header sits *above* the mobile
overlay so its close control stays reachable, and the grain sits above the
curtain so the paper texture is there from the first frame.

# Landing page

`app/page.tsx` composes the sections in order and holds no markup of its own.
Each section owns its copy inline rather than importing from a content file:
with this much text, colocation reads better than indirection, and a section is
the unit we iterate on.

Repeating items inside a section (highlights, destination cards, FAQ entries,
day parts) are a `const` array at the top of that section's file.

**Nav anchors.** `#residence`, `#experience`, `#cyprus`. Keep them on the
sections the nav points at. The nav links to them as `/#residence` and so on,
so the nav still works from the standalone pages, where a bare fragment would
have nothing to scroll to.

**Contact, About, Gallery and Experience are routes, not anchors.** Every
reservation CTA points at `/contact`; the nav's other three point at `/about`,
`/gallery` and `/experiences`. The landing page keeps its own `#contact`,
`#about`, `#gallery` and `#experience` sections as its own moments, but nothing
links to those anchors any more: the sections are the page's argument, the
routes are what search and the nav address. Only `#residence`, `#experience`'s
neighbours `#cyprus` and the rest are still nav targets.

`/experiences` composes the landing page's own experience sections rather than
restating them — `Experience`, `Occasions`, `Testimonials`, `Personal` — so
there is one set of that copy, not two that drift apart. Only its hero is
written for the page. It deliberately carries no pinned scene: `DayParts` is
the landing page's moment and repeating it would spend it twice.

**`sections/photo-hero.tsx` is the standing-page hero**, shared by `/gallery`
and `/experiences`. Its scrim is a prop rather than a constant because it
serves the photograph, not the layout: a shot that is bright where the copy
lands needs more than one that is already dark there.

`/gallery` is a full page rather than an index: a photographic hero, then
`sections/gallery-wall.tsx`, then the complete set grouped by room, then
`<Contact>` and `<FindUs>`.

The wall is the sixth scroll-linked moment on the site and the largest: all 28
photographs on one horizontal track, panned by vertical scroll while the stage
holds, with the room label and the progress rail driven from the same
MotionValue. Three things about it are load-bearing:

- **The track measures itself.** Widths come from `SHAPES`, and the pan
  distance is computed from the data, so adding or removing a photograph cannot
  leave a hand-written travel constant silently wrong. (The landing page's
  shorter strip still carries one; that one you must update by hand.)
- **Width is vw, height is vh.** Deriving height from width leaves every frame
  about half the height of the stage on a laptop. The printed aspect drifts a
  little with the window's ratio and `object-cover` absorbs it.
- **The room labels all stay in the DOM**, opacity only, the same as the day
  scene. They stay readable to a crawler and a screen reader, and the swap
  costs nothing per frame.

It pans at ~1.6vw per vh against the landing strip's ~1.14, because it is three
times as long and would otherwise turn the page into a corridor.

Because the nav is a mixed list of routes and fragments, chrome links go
through `<AppLink>`: routes get `next/link`, so moving to `/contact` is a
client navigation and does not replay the loading curtain, while fragments stay
plain anchors, because the App Router forces an instant jump on hash navigation
and would throw away `scroll-behavior: smooth`.

**The about page is a reading page with a media rhythm.** `app/about/page.tsx`
holds the copy in `SECTIONS` and composes the five parts explicitly rather than
in a loop, because each one carries a different treatment: split row, dark
summary plate, image pair, photo strip, full-bleed band, three-up grid. That
variety is the only thing keeping 1,100 words of search copy from reading as a
wall, so keep neighbouring blocks in different shapes when editing it. The
prose sits in a `max-w-[46rem]` column inside the full-width container, so the
hairlines and photography run the usual width and everything shares a left
edge.

`ui/photo-strip.tsx` is the horizontal strip: native scroll with CSS snap
points, never a carousel library. Its `scroll-padding-left` must stay equal to
its `padding-left` (both `--edge`), or mandatory snapping aligns the first
frame to the scrollport and scrolls the padding away, cutting the frame off
against the window edge.

**The reservation is offered three times on the way down.** The page is long,
so `CtaBanner` sits after `Highlights`, after `Spaces` and after `Gallery`, in
addition to the CTAs already in the hero, `Personal`, `Reservations` and
`FinalCta`. Each placement carries its own line, written to follow the section
above it; only the label is fixed. Keep them spaced across the middle of the
page, which is the stretch that had no way to book.

**The address lives in `site.ts`.** `site.address` holds both the postal form
(`lines`, written the way it goes on an envelope) and the flat fields
schema.org wants; keep the two in step.

`sections/find-us.tsx` is the "Where to Find Us" section: address, plus code,
coordinates, a maps link and the frame. It is a section in its own right on the
home page, `/contact` and `/about`, not a map tacked to the bottom of a contact
block. Every fact is text beside the frame rather than inside it, because a map
tile is invisible to a crawler and to anyone blocking third-party frames.
`ui/map-embed.tsx` is the frame alone and is the only third-party embed on the
site. The address is also in the footer on every page and in the contact
sections.

**The guest quotes are placeholders and must not be published.**
`sections/testimonials.tsx` carries the sample quotes from the copy document
with the attributions left as the literal strings "Guest name" and "Country",
so nothing invented can ship by accident. It now renders on the landing page
*and* `/experiences`, so there are two places to check. Replace with real
reviews, or delete the section from both — never fill it in.

**One label per intent.** `RESERVE_CTA` in `lib/site.ts` is the booking label,
used in the header, hero, reservations and final CTA. The brief also specifies
"Plan Your Stay" on the personal-experience section, which points at the same
place; that is the client's wording, kept deliberately.

**Layout variety is deliberate.** The skeleton alternates split rows, centred
prose, full-bleed media moments, card grids and one inverted section so no two
neighbouring sections share a shape. Notably, the middle of the three "spaces"
sections is centred rather than split, so three image-and-text rows do not run
back to back. Keep that in mind when re-ordering.

# The motion system

Two mechanisms, each with one job. Do not mix them up.

**CSS + IntersectionObserver, for entrances.** `motion/reveal.tsx` flips one
attribute and the transition lives in `globals.css`. There are over a hundred
reveals on the page; a CSS transition driven by a boolean attribute costs
almost nothing per element, while a hundred JS-driven animations would not.
Four variants exist so the page is not one fade-up repeated: `rise` for body
copy, `drape` for display headings, `mask` for photography (wiped open from the
bottom edge), `still` for anything that should simply be present.

**Motion (`motion/react`), for scroll-linked motion only.** Anything whose
value is a continuous function of scroll position: the pinned scenes, the
gallery pan, parallax. Always through MotionValues,
never React state, so scrolling never triggers a render. That is the only
reason Motion is a dependency; do not reach for it for entrances.

**No smooth-scroll library.** Lenis and friends look premium and intercept the
user's scroll. The brief asked for no hijacking, so the page uses native scroll
with CSS sticky, which is smoother than any JS can be.

## The five big moments

Motion is rationed. Four pinned scenes and one handoff carry the experience,
and the sections between them are deliberately still so those moments land.

1. **Hero.** Scroll drives `video.currentTime`, three captions take turns, then
   the introduction plate rides up over the still-pinned frame.
2. **The Residence.** One photograph opens from a contained plate to full
   bleed, while the heading travels upward at its own rate.
3. **A day here.** One pinned frame dissolving through morning, day and
   evening, with a vertical chapter index. Three separate full-bleed sections
   would have repeated the same shape three times.
4. **Gallery.** Vertical scroll drives a horizontal pan of eight frames at
   varying widths and heights. Below `lg` it becomes a native scroll-snap
   strip: a pinned pan costs a lot of vertical scroll for a gesture a phone
   already does better.
5. **Cyprus Is Waiting.** The closing photograph settles inward while the type
   arrives once and stays.

## Layering

`motion/scroll-overlay.tsx` and `motion/rising-plate.tsx` are pure CSS sticky.
A plate rides up over a pinned backdrop carrying a white bloom above its
leading edge, so the backdrop dissolves into the plate rather than being cut
across by a line. The bloom is two layered gradients: a radial one centred on
the edge, which is the whole of the effect at centre, over a shallow linear
one that catches the corners the radial does not reach. It replaced a dark
contact shadow; if you are tempted to put an edge back, the brief was
explicitly for a seamless blend. It is hidden under `motion-reduce`, where the
plate has no overlap and the bloom would land on the hero's own copy.
The hero exports `HERO_OVERLAP` and the introduction consumes it: that pairing
is a deliberate composition, not incidental coupling.

## Windowed scroll mappings: use `ramp`, not an input/output range

`useTransform(progress, [a, b], [x, y])` is only safe when `[a, b]` spans the
whole `[0, 1]` progress domain. Where it covers a *window* of it, this version
of Motion was measured extrapolating back toward the first output value past
the end of the window rather than holding it, and `{ clamp: true }` does not
change that. In the day scene it made the morning chapter fade out correctly
and then climb back to 93% opacity behind the evening one.

`lib/ramp.ts` provides `ramp()` (clamped linear map) and `window01()` (the
crossfade shape: 1 inside a window, ramping in and out either side). Pass them
to `useTransform` as a plain function. A function has no interpolation
semantics to guess at, and it reads more clearly than a pair of arrays.

## The loading curtain

`layout/site-loader.tsx` plus the `.curtain` rules in `globals.css`. Cream
ground, the crest centred, a hairline filling underneath it, then the whole
sheet lifts upward with the mark leaving slightly ahead of it.

**The line is filled by CSS, not by script.** It starts on the first painted
frame instead of waiting for hydration, which matters: on a throttled
connection hydration was measured at 2.4s, and a JS-driven line would have sat
at zero that whole time. CSS runs it to 92% and holds; script only decides when
the last 8% may close. To avoid the two disagreeing, script waits on the fill
animation's own `finished` promise rather than a matching timer.

**It waits on something real.** Webfonts plus the hero's poster frame, capped
at `CAP_MS` from *navigation start* rather than from hydration, because on a
slow connection hydration is itself most of the wait and a cap counted from
there would stack on top of it.

**It cannot trap anyone.** This is server-rendered so there is no flash of the
page before hydration puts it up, which makes the failsafes mandatory: the page
content sits underneath it as normal for crawlers and for anyone whose script
never arrives, a CSS failsafe animation lifts it after six seconds regardless,
and `<noscript>` removes it outright.

**Scroll is held by CSS**, through `body:has(.curtain[data-state="loading"])`,
so it holds from the first frame rather than from hydration and releases itself
when the state changes. Nothing to restore, and no chance of a stuck lock. That
rule is inside `prefers-reduced-motion: no-preference`: `:has()` does not care
that the curtain is `display:none` under reduced motion, so without the guard
it would lock the page for a user who cannot even see the curtain.

`public/logo-mark.jpg` is `logo.jpeg` cropped to its content: the original is
54% empty margin, so it rendered tiny at any sensible width. Both are raster on
a cream ground, which is why `--color-parchment` is sampled from the artwork
itself; against anything else the JPEG shows a box.

## Rules that keep it fast

- Animate `transform`, `opacity` and `clip-path` only.
- `backdrop-blur` on the fixed header only, never on scrolling content.
- The grain is one fixed, `pointer-events-none` layer tiled from a small SVG,
  so it rasterises once and never repaints on scroll.
- Every scene collapses under `prefers-reduced-motion`: runways shrink to one
  viewport and nothing is left hidden. Verified: 133 reveals, 0 invisible.
- All three day chapters stay in the DOM as real headings and paragraphs. Only
  opacity changes, so nothing is hidden from search or from a screen reader.

# Gotchas worth remembering

- Tailwind v4 has no `--duration-*` theme namespace. Reference durations as
  `duration-(--dur-base)`. The bracket form `duration-[--dur-base]` silently
  compiles to invalid CSS.
- `cn()` extends `tailwind-merge` with the custom `text-*` size scale. Without
  that, `tailwind-merge` reads `text-display` as a colour and lets
  `text-on-dark` delete the font size. Add any new `--text-*` token to the list
  in `src/lib/cn.ts`.
- Icons come from `@phosphor-icons/react/ssr` at `weight="light"`. One family,
  no hand-rolled SVG.
- `public/logo.jpeg` is a raster on a cream ground, so it cannot sit on the
  white page. `<Wordmark>` type-sets the mark in Cormorant instead. Swap in the
  crest SVG when it exists; the component API stays the same.
- **The app icons are generated, not hand-cropped.** `scripts/make-icons.py`
  cuts them from `public/logo-mark.jpg`; run it if the crest artwork changes.
  Two things in there are load-bearing. The wordmark under the rule is dropped
  entirely, and 16px gets a tighter crop than the rest: at that size the gold
  bracket and palm turn to noise across the top third of the tile and take the
  monogram down with them. And every image inside the `.ico` is saved **RGBA**
  — Next stores ICO entries as PNG and its decoder rejects a non-RGBA one with
  "The PNG is not in RGBA format!", which fails the build outright rather than
  degrading the icon.
- The header is one state and only one: a floating pill, pinned, always
  visible, identical at every scroll position. It deliberately has no
  scroll listener, observer or MotionValue. If you are tempted to make it
  retract or dissolve over the hero again, that was tried and removed:
  navigation and the reservation link need to be one glance away across a
  forty-viewport page.
- `data-hero` marks the hero section. Nothing in the app reads it any more now
  that the header no longer changes over it; it is kept as a stable hook for
  verification scripts.
- **`max-w-[Nch]` belongs on the element that carries the font size**, not on a
  `Reveal` wrapper around it. `ch` resolves against the element's own font, so
  `max-w-[20ch]` on a wrapper is about 160px and squeezes a display heading to
  one word per line.
- **Never put `overflow-x: clip` on `body`.** With `overflow-y: visible` the
  other axis computes to `auto`, body becomes a scroll container, and every
  pinned section silently stops pinning. Fix stray horizontal overflow at its
  source instead.
- `Parallax` moves the image inside a frame that stays put: the frame clips and
  the image is overscanned 9% vertically. Scaling the frame instead pushes it
  past the page's right edge, which is both a horizontal scrollbar and the
  wrong effect.
- The hero video's scrub is clamped by `TAIL` because the source footage ends
  on a black frame.
- **The hero video has to be started once before it can be scrubbed.** iOS
  reads `preload="auto"` as little more than "fetch the metadata", so a video
  that is only ever seeked has no decoded data behind it and paints nothing:
  the element goes blank the moment the first seek displaces the poster. The
  effect calls `play()` then `pause()` to make the pipeline real, retrying on
  the first touch if autoplay was refused (Low Power Mode refuses it). It also
  sets `video.muted` imperatively, because React does not put the `muted`
  attribute into server-rendered HTML and an unmuted video may not start.
- **Latch video readiness; never test `readyState` per tick.** It dips back
  below HAVE_CURRENT_DATA while a seek is in flight, so a per-tick test
  throttles the scrub badly: measured at 40% fewer distinct frames across a
  fast scroll, and a worst-case jump of 1.3s instead of 0.6s. Guard the *first*
  seek only.
- Waiting for each seek to land before issuing the next is right on touch
  devices and wrong on desktop, where browsers coalesce the writes and keep up.
  `(pointer: coarse)` picks between them. A 120Hz phone would otherwise be
  asked for 120 seeks a second.
- A poster image sits underneath the hero video, so a frame that cannot be
  painted degrades to the still rather than to black.
- When testing scroll positions in a headless browser, pass
  `behavior: 'instant'`. `scroll-behavior: smooth` is on, and a short wait will
  measure the page mid-flight and look exactly like a broken sticky.
- Do not set a height with an inline `style` on an element that also needs a
  `motion-reduce:` height. Inline styles beat classes, so the variant silently
  loses. Pass a CSS variable and size with `h-[var(--x)]` instead.

# Hero walkthrough

`components/sections/hero.tsx` scrubs `video.currentTime` from scroll position
instead of playing, so the viewer moves through the house at their own pace.
The section is `SCROLL_VH` (400) viewports tall with a sticky one-viewport
stage inside it.

**Captions.** Three centered text moments take turns over the footage, timed by
the `CAPTIONS` windows (scroll progress at which each is fully legible). Each
fades in over `FADE` before its window and out over `FADE` after it, drifting
`DRIFT` px upward the whole time so the movement always runs with the scroll.
The windows are spaced so no two overlap, and the darkening veil follows
whichever caption is showing, which means the walkthrough opens back up in the
gaps between them. That rhythm is the point: retune `CAPTIONS`, not the fades,
if the pacing needs to change.

**The last window ends at 1 and must stay that way.** `progress()` is clamped
to 1, so `p > to` never fires and the third caption never runs its leaving
fade. It holds to the end of the scrub and the handoff carries it out: the
captions live inside the stage, so they recede and dim with the frame as the
introduction plate rides up. Give it a `to` below 1 again and the copy
disappears before the plate arrives, leaving an empty frame for the last
stretch of the pin.

**Three scrims, not two.** Under the caption veil and the top-and-bottom
gradient sits a flat `bg-surface-deep/30` on the footage itself. The
walkthrough is a heavily compressed source and its softness shows at full
brightness, so it is knocked back rather than presented as a bright
photograph. Retune that one value if the hero wants more or less footage; the
other two are doing different jobs and are not the dial for this.

Captions are found by `data-caption` in document order rather than through
refs, which keeps `<Caption>` free of ref plumbing and matches the fact that the
whole loop is imperative. Add or remove one and you must add or remove a
matching entry in `CAPTIONS`.

A faded caption gets `visibility: hidden`, not just `opacity: 0`, so its buttons
leave the tab order instead of being focusable but invisible. Captions after the
first also ship hidden from the server, so they do not stack before the loop
runs.

**The encoding is load-bearing.** Ordinary H.264 places a keyframe about once a
second, and a browser can only seek cleanly to keyframes, so scrubbing a normal
file lurches. Both hero sources are re-encoded all-intra (every frame a
keyframe). Regenerate from `media-source/` with:

```
ffmpeg -i media-source/private-residence-hero.mp4 -an \
  -vf "scale=1920:-2,fps=24" -c:v libx264 -profile:v high -crf 30 \
  -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart \
  public/hero/walkthrough-1080.mp4
```

The 720 variant is the same with `scale=960:-2` and `-crf 28`. All-intra costs
roughly 3x the bitrate of the original encode, which is why the resolution and
CRF are set where they are: 14 MB and 5.8 MB against a 32 MB master.

`<source media="(min-width: 768px)">` picks the tier. That is evaluated once at
load and never re-evaluated on resize, which is fine here.

Other constraints worth keeping:

- Scroll is read inside a rAF loop, never from a scroll event, and the loop is
  gated by an IntersectionObserver so it stops when the hero leaves the screen.
- Nothing in the loop touches React state. It writes to the video and to the
  copy's inline style directly, so scrubbing never causes a render.
- Seeks are guarded by a threshold. Assigning an unchanged `currentTime` still
  costs a decode.
- Under `prefers-reduced-motion` the loop never starts and the section collapses
  to one viewport, holding on the poster frame.
- iOS Safari needs `muted` + `playsInline` + `preload="auto"` to allow seeking
  at all. Verify any change to those on a real device.
