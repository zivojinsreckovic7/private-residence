"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Lifted this long after navigation started, whatever happens, so nothing can
 * be waited on forever. Measured from navigation rather than from hydration:
 * on a slow connection hydration is itself most of the wait, and a cap counted
 * from there would stack on top of it.
 */
const CAP_MS = 2600;
/** How long the last 8% of the line takes. Matches curtain-fill-close. */
const CLOSE_MS = 260;
/** A beat at full before the curtain leaves. */
const HOLD_MS = 160;
/** Must match --dur-curtain in globals.css. */
const CURTAIN_MS = 900;
/** Backstop in case the fill animation never reports finishing. */
const FILL_BACKSTOP_MS = 1800;

/** Resolves when the image is in cache, and also if it fails: never blocks. */
function preload(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

/**
 * The loading curtain.
 *
 * The line is filled by CSS so it starts on the first painted frame instead of
 * waiting for hydration, and it stops at 92%. Script decides only when the
 * last 8% may close, and it waits on something real: the webfonts and the
 * hero's poster frame actually being in. A cap means a slow asset can never
 * hold the site hostage.
 *
 * Rather than guessing when the CSS fill has finished, it waits on the
 * animation's own `finished` promise, so the two never disagree and the line
 * cannot jump.
 *
 * See globals.css for why this is safe to server-render.
 */
export function SiteLoader() {
  const fillRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<
    "loading" | "closing" | "leaving" | "gone"
  >("loading");

  useEffect(() => {
    const fill = fillRef.current;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Nothing to show and nothing to wait for: drop it on the next tick.
    if (reduced) {
      const id = setTimeout(() => setState("gone"), 0);
      return () => clearTimeout(id);
    }

    let closed = false;
    let ready = false;
    let filled = false;

    const maybeClose = () => {
      if (closed || !ready || !filled) return;
      closed = true;
      setState("closing");

      // Scrolling is unlocked by CSS as soon as the state changes; see the
      // :has() rule in globals.css.
      timers.push(
        setTimeout(() => {
          setState("leaving");
          timers.push(setTimeout(() => setState("gone"), CURTAIN_MS));
        }, CLOSE_MS + HOLD_MS),
      );
    };

    const markFilled = () => {
      filled = true;
      maybeClose();
    };

    const markReady = () => {
      ready = true;
      maybeClose();
    };

    // Wait on the fill animation itself, not on a matching timer.
    const running = fill?.getAnimations?.() ?? [];
    if (running.length === 0) {
      markFilled();
    } else {
      void Promise.all(running.map((a) => a.finished)).then(
        markFilled,
        markFilled,
      );
    }
    timers.push(setTimeout(markFilled, FILL_BACKSTOP_MS));

    void Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      preload("/hero/walkthrough-poster.webp"),
    ]).then(markReady);
    timers.push(
      setTimeout(markReady, Math.max(0, CAP_MS - performance.now())),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  if (state === "gone") return null;

  return (
    <div className="curtain" data-state={state} aria-hidden>
      <div className="curtain-mark flex flex-col items-center">
        <Image
          src="/logo-mark.webp"
          alt=""
          width={716}
          height={718}
          priority
          sizes="220px"
          className="h-auto w-[180px] md:w-[220px]"
        />
        {/* Track and fill. The fill scales from its left edge, so the line
            grows without anything laying out. */}
        <div className="mt-12 h-px w-[180px] overflow-hidden bg-ink/12 md:w-[220px]">
          <div ref={fillRef} className="curtain-fill h-full w-full bg-accent" />
        </div>
      </div>

      {/* Last resort: with no script at all, the curtain is never shown. */}
      <noscript>
        <style>{`.curtain{display:none}`}</style>
      </noscript>
    </div>
  );
}
