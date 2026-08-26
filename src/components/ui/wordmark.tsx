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
/**
 * The three parts move together: the rule is sized against the monogram
 * rather than fixed, so neither size ends up with a hairline that reads as
 * too short or too tall beside the letters.
 *
 * The label is set at 500, never lighter. Cormorant is a high-contrast serif
 * and its hairlines all but disappear below about 11px at 300, which is what
 * made "PRIVATE RESIDENCE" read as a grey smudge rather than as type. Size
 * and weight are doing that work here, not colour, so the lockup keeps its
 * proportions.
 */
const SIZES = {
  sm: { monogram: "text-[1.6rem]", label: "text-[0.6875rem]", rule: "h-6" },
  lg: { monogram: "text-[2rem]", label: "text-[0.75rem]", rule: "h-7" },
} as const;

export function Wordmark({
  size = "sm",
  tone = "ink",
  className,
}: WordmarkProps) {
  const { monogram, label, rule } = SIZES[size];

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
          "w-px",
          rule,
          tone === "onDark" ? "bg-white/25" : "bg-line-strong",
        )}
      />
      <span
        className={cn(
          "pt-px font-medium whitespace-nowrap uppercase tracking-[0.28em]",
          label,
          tone === "onDark" ? "text-on-dark/85" : "text-ink",
        )}
      >
        Private Residence
      </span>
    </span>
  );
}
