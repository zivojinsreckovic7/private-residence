import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type WordmarkProps = {
  size?: "sm" | "lg";
  tone?: "ink" | "onDark";
  className?: string;
};

/**
 * Type-set version of the crest wordmark, in Cormorant Garamond to match it.
 *
 * The artwork in `public/logo.jpeg` is a raster on a cream ground, so it
 * cannot sit on a white page without a visible box. Swap this for the crest
 * SVG once it exists; the API stays the same.
 */
export function Wordmark({
  size = "sm",
  tone = "ink",
  className,
}: WordmarkProps) {
  const monogram = size === "sm" ? "text-[1.3rem]" : "text-[2rem]";
  const label = size === "sm" ? "text-[0.5rem]" : "text-[0.625rem]";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-serif leading-none",
        tone === "onDark" ? "text-on-dark" : "text-ink",
        className,
      )}
    >
      <span className={cn("font-medium tracking-[0.08em]", monogram)}>
        {site.name}
      </span>
      <span
        aria-hidden
        className={cn(
          "h-5 w-px",
          tone === "onDark" ? "bg-white/25" : "bg-line-strong",
        )}
      />
      <span
        className={cn(
          "pt-px font-light uppercase tracking-[0.3em]",
          label,
          tone === "onDark" ? "text-on-dark-muted" : "text-ink-muted",
        )}
      >
        Private Residence
      </span>
    </span>
  );
}
