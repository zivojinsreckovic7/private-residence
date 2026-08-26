"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Accent, Heading } from "@/components/ui/heading";
import { RESERVE_CTA, site } from "@/lib/site";

/**
 * The hero is measured in three parts, all as multiples of the viewport.
 *
 *   SCRUB_VH    the scroll the walkthrough itself is spread across
 *   OVERLAP_VH  the extra height that lets the next plate ride up over the
 *               stage while it is still pinned
 *   SCROLL_VH   the section height, which must be at least
 *               SCRUB_VH + 2 viewports for that handoff to work
 *
 * The next section pulls itself up by OVERLAP_VH, so the page gains
 * SCROLL_VH - OVERLAP_VH of real scroll.
 */
const SCRUB_VH = 260;
const OVERLAP_VH = 100;
const SCROLL_VH = SCRUB_VH + 200;

/** Exported so the section that follows knows how far to ride up. */
export const HERO_OVERLAP = `${OVERLAP_VH}vh`;

/** Per-frame easing toward the scroll target. Lower is heavier. */
const SMOOTHING = 0.12;

/** Stop seeking once we are within this many seconds of the target. */
const SETTLED = 0.004;

/**
 * The source footage ends on a black frame, so the scrub stops just short of
 * the duration. Without this the walkthrough lands on black exactly when the
 * next plate starts riding over it.
 */
const TAIL = 0.35;

/**
 * When each caption is fully legible, in scroll progress. Each one fades in
 * over the FADE before `from` and out over the FADE after `to`, so the windows
 * are spaced to never overlap.
 *
 * The last window ends at 1 on purpose: `progress()` is clamped to 1, so
 * `p > to` never becomes true and the caption never runs its leaving fade. It
 * holds to the end of the scrub and is then carried out by the handoff, which
 * recedes and dims the whole stage — copy included — as the next plate rides
 * up over it. Fading it out first left the reader looking at an empty frame
 * for the last stretch of the pin.
 */
const CAPTIONS = [
  { from: 0.0, to: 0.16 },
  { from: 0.36, to: 0.54 },
  { from: 0.74, to: 1 },
] as const;

const FADE = 0.09;

/** Travel of a caption as it enters and leaves, in px. */
const DRIFT = 32;

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);

/**
 * Hero walkthrough. Scroll position drives `video.currentTime` instead of
 * playback, so the viewer moves through the house at their own pace, and three
 * captions take their turn over the footage as it goes.
 *
 * Three things make the scrub smooth rather than lurching:
 * - The sources are encoded all-intra (every frame a keyframe). A normally
 *   encoded file can only seek to keyframes, which makes scrubbing snap.
 * - Scroll is read inside a rAF loop, never from a scroll event, and the
 *   result is eased toward rather than applied raw.
 * - Nothing here touches React state. The loop writes to the video and to the
 *   caption styles directly, so scrubbing never triggers a render.
 *
 * The loop only runs while the section is on screen, and under
 * `prefers-reduced-motion` it never starts: the section collapses to one
 * viewport, the video holds on its first frame, and only the first caption
 * shows.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const veil = veilRef.current;
    const stage = stageRef.current;
    if (!section || !video || !veil || !stage) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Collected once here rather than through refs: the loop is imperative
    // anyway, and DOM order matches CAPTIONS order.
    const captions = [
      ...section.querySelectorAll<HTMLElement>("[data-caption]"),
    ];

    let frame = 0;
    let eased = 0;
    let duration = 0;
    let activated = false;
    let hasFrame = false;

    /**
     * Latched, not read live. `readyState` dips back below HAVE_CURRENT_DATA
     * while a seek is in flight, so testing it on every tick throttles the
     * scrub badly on desktop: it costs about 40% of the distinct frames across
     * a fast scroll and turns a 0.6s worst-case jump into 1.3s. What actually
     * needs guarding is the first seek, before there has ever been any decoded
     * data to paint.
     */
    const noteFrame = () => {
      if (video.readyState >= 2) hasFrame = true;
    };
    noteFrame();
    video.addEventListener("loadeddata", noteFrame);
    video.addEventListener("canplay", noteFrame);

    const readDuration = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
    };
    readDuration();
    video.addEventListener("loadedmetadata", readDuration);

    /**
     * iOS will not buffer a video it has never been asked to play. It reads
     * `preload="auto"` as little more than "fetch the metadata", so a video
     * that is only ever seeked has no decoded data behind it and paints
     * nothing at all: the element goes blank the moment the poster is
     * displaced by the first seek.
     *
     * Muted and inline means we are allowed to start it, so we start it and
     * immediately stop it. That is enough to make the media pipeline real.
     */
    const activate = () => {
      if (activated) return;
      activated = true;
      // React does not emit the `muted` attribute into server-rendered HTML,
      // and an unmuted video is not allowed to start on its own.
      video.muted = true;
      const started = video.play();
      if (!started) return;
      started
        .then(() => video.pause())
        .catch(() => {
          // Refused. The first time the reader touches the screen is the
          // next chance to try.
          activated = false;
        });
    };

    activate();
    const onGesture = () => activate();

    /**
     * Whether to wait for each seek to land before asking for the next one.
     *
     * Desktop browsers coalesce a stream of `currentTime` writes and keep up
     * at frame rate, so gating them there measurably costs smoothness: it
     * drops the walkthrough from ~257 distinct frames across a fast scroll to
     * 88, and introduces jumps of over a second. Touch devices cannot service
     * that rate and fall behind or blank instead, which is far worse.
     *
     * A pointer query rather than a user-agent test: the thing that actually
     * differs is the class of device, and this is how the platform reports it.
     */
    const gateSeeks = window.matchMedia("(pointer: coarse)").matches;
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("pointerdown", onGesture);

    /** Scroll consumed since the top of the section, in px. */
    const scrolled = () => -section.getBoundingClientRect().top;

    /** 0 at the top of the section, 1 when the walkthrough has played out. */
    const progress = () =>
      clamp01(scrolled() / ((SCRUB_VH / 100) * window.innerHeight));

    /** 0 while the walkthrough runs, 1 once the next plate has covered it. */
    const handoff = () =>
      clamp01(
        (scrolled() - (SCRUB_VH / 100) * window.innerHeight) /
          window.innerHeight,
      );

    const tick = () => {
      const p = progress();

      const target = p * Math.max(duration - TAIL, 0);
      eased += (target - eased) * SMOOTHING;
      if (Math.abs(target - eased) < SETTLED) eased = target;

      // Three guards:
      //   hasFrame    - seeking before there has ever been decoded data paints
      //                 nothing, which is what leaves the element blank on iOS.
      //   gateSeeks   - on touch devices, never queue a second seek on top of
      //                 an unfinished one. A 120Hz screen would otherwise ask
      //                 for 120 seeks a second and the decoder gives up.
      //   SETTLED     - seeking to an unchanged time still costs a decode.
      if (
        duration > 0 &&
        hasFrame &&
        !(gateSeeks && video.seeking) &&
        Math.abs(video.currentTime - eased) > SETTLED
      ) {
        video.currentTime = eased;
      }

      let strongest = 0;

      CAPTIONS.forEach(({ from, to }, i) => {
        const node = captions[i];
        if (!node) return;

        let opacity: number;
        let drift: number;

        if (p < from) {
          // Entering: rises into place from below.
          opacity = smoothstep(clamp01((p - (from - FADE)) / FADE));
          drift = (1 - opacity) * DRIFT;
        } else if (p > to) {
          // Leaving: keeps travelling the same way the scroll is going.
          opacity = 1 - smoothstep(clamp01((p - to) / FADE));
          drift = -(1 - opacity) * DRIFT;
        } else {
          opacity = 1;
          drift = 0;
        }

        strongest = Math.max(strongest, opacity);
        node.style.opacity = `${opacity}`;
        node.style.transform = `translate3d(0, ${drift}px, 0)`;
        // Hidden rather than transparent, so a faded caption's buttons drop
        // out of the tab order instead of being focusable but invisible.
        node.style.visibility = opacity < 0.01 ? "hidden" : "visible";
      });

      // The veil follows whichever caption is showing, so the walkthrough gets
      // brighter in the gaps between them.
      veil.style.opacity = `${strongest}`;

      // Handoff: as the next plate rides up, the frame recedes and darkens
      // instead of just being covered.
      const out = handoff();
      stage.style.transform = `scale(${1 - out * 0.06})`;
      stage.style.opacity = `${1 - out * 0.3}`;

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !frame) {
          frame = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0 },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", readDuration);
      video.removeEventListener("loadeddata", noteFrame);
      video.removeEventListener("canplay", noteFrame);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("pointerdown", onGesture);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      data-hero
      // Height goes through a variable, not an inline `height`, so the
      // motion-reduce variant can still collapse the section to one viewport.
      className="relative h-[var(--hero-scroll)] motion-reduce:h-dvh"
      style={{ "--hero-scroll": `${SCROLL_VH}vh` } as React.CSSProperties}
    >
      <div className="sticky top-0 h-dvh overflow-clip bg-surface-deep">
        {/* No will-change here: it promotes a layer containing a video for
            the whole scroll, which iOS composites badly, and the stage is
            only transformed during the last viewport of the handoff. */}
        <div ref={stageRef} className="absolute inset-0 origin-center">
          {/* The floor. If the video cannot paint a frame, this shows through
              instead of black, so the worst case is a still photograph. */}
          <Image
            src="/hero/walkthrough-poster.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <video
            ref={videoRef}
            poster="/hero/walkthrough-poster.jpg"
            preload="auto"
            muted
            playsInline
            disablePictureInPicture
            aria-label="A walkthrough of the residence, from the living room out to the pool terrace."
            className="absolute inset-0 size-full object-cover"
          >
            <source
              src="/hero/walkthrough-1080.mp4"
              type="video/mp4"
              media="(min-width: 768px)"
            />
            <source src="/hero/walkthrough-720.mp4" type="video/mp4" />
          </video>

        {/*
          Three scrims with different jobs. The first is flat and sits on the
          footage itself: the walkthrough is a heavily compressed source and
          its softness shows at full brightness, so it is knocked back a little
          rather than presented as a bright photograph. The second is constant
          and keeps the white nav readable against a bright sky for the whole
          scroll. The third sits behind the captions only, and fades with them.
        */}
        <div aria-hidden className="absolute inset-0 bg-surface-deep/30" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-surface-deep/60 via-transparent to-surface-deep/30"
        />
        <div
          ref={veilRef}
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 50% 50%, rgb(20 22 25 / 0.76), rgb(20 22 25 / 0.28) 70%, transparent)",
          }}
        />

        <Caption>
          <p className="text-label mb-6 uppercase text-on-dark/70">
            {site.fullName}
          </p>
          <Heading as="h1" size="display" className="text-on-dark">
            A <Accent>Private</Accent> Side of Cyprus
          </Heading>
          <p className="text-lead mx-auto mt-8 max-w-[46ch] text-on-dark/85">
            An exceptional private residence created for unforgettable stays
            beneath the Mediterranean sun.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg" icon>
              {RESERVE_CTA}
            </Button>
            <Button href="#residence" size="lg" variant="onDark">
              Discover the Residence
            </Button>
          </div>
        </Caption>

        <Caption initiallyHidden>
          <Heading as="h2" size="display" className="text-on-dark">
            There is luxury you can see. Then there is luxury you can{" "}
            <Accent>feel</Accent>.
          </Heading>
        </Caption>

        <Caption initiallyHidden>
          <Heading as="h2" size="display" className="text-on-dark">
            Contemporary architecture, complete <Accent>privacy</Accent>,
            effortless indoor-outdoor living.
          </Heading>
          <p className="text-lead mx-auto mt-8 max-w-[46ch] text-on-dark/85">
            A setting designed to be experienced slowly.
          </p>
        </Caption>
        </div>
      </div>
    </section>
  );
}

type CaptionProps = {
  /** Captions after the first start out of the way, before the loop runs. */
  initiallyHidden?: boolean;
  children: React.ReactNode;
};

/**
 * One centered text moment, stacked over the footage with its siblings. The
 * scroll loop finds these by `data-caption`, in document order.
 */
function Caption({ initiallyHidden = false, children }: CaptionProps) {
  return (
    <div
      data-caption
      style={
        initiallyHidden ? { opacity: 0, visibility: "hidden" } : undefined
      }
      className="absolute inset-0 flex items-center"
    >
      <Container>
        <div className="mx-auto max-w-[64rem] text-center">{children}</div>
      </Container>
    </div>
  );
}
