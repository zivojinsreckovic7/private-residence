import { cn } from "@/lib/cn";

type ScrollOverlayProps = {
  /** The visual that stays pinned to the viewport. */
  backdrop: React.ReactNode;
  /**
   * Scroll distance the backdrop holds alone before the content starts riding
   * over it. Any CSS length, e.g. "220vh".
   */
  runway?: string;
  /** Content that scrolls up over the pinned backdrop. */
  children: React.ReactNode;
  className?: string;
};

/**
 * A visual that stays pinned while the content after it scrolls up and covers
 * it, so a section appears to emerge from underneath the one before it.
 *
 * Pure CSS sticky. No scroll listener, no JS, no jank, and it degrades to a
 * plain stacked layout wherever sticky is unsupported.
 *
 * The pinned child must not sit inside `overflow: hidden`, which would break
 * sticky; use `overflow-clip` on the backdrop itself if it needs to clip.
 */
export function ScrollOverlay({
  backdrop,
  runway = "200vh",
  children,
  className,
}: ScrollOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="sticky top-0 z-0 h-dvh overflow-clip">{backdrop}</div>
      <div aria-hidden style={{ height: runway }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
