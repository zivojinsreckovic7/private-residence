import { cn } from "@/lib/cn";

type HeadingProps = React.ComponentPropsWithoutRef<"h2"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  size?: "mega" | "display" | "headline" | "title";
};

const sizes = {
  mega: "text-mega",
  display: "text-display",
  headline: "text-headline",
  title: "text-title",
};

/**
 * Headings are set in Geist at a tight, low-contrast weight. Emphasis comes
 * from <Accent>, not from raw scale or colour.
 */
export function Heading({
  as: Tag = "h2",
  size = "headline",
  className,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cn("font-sans font-medium text-balance", sizes[size], className)}
      {...props}
    />
  );
}

/**
 * A word or short phrase inside a heading, set in Cormorant Garamond italic.
 * This is the one place the two typefaces meet, and it echoes the serif
 * wordmark on the crest.
 *
 * Two deliberate adjustments:
 * - `text-[1.08em]` compensates for Cormorant's small x-height next to Geist.
 * - `leading-[1.15]` reserves descender room, so italic y/g/p do not collide
 *   with the line below in a tightly-led display heading.
 */
export function Accent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"em">) {
  return (
    <em
      className={cn(
        "font-serif text-[1.08em] font-light italic leading-[1.15] tracking-normal",
        className,
      )}
      {...props}
    />
  );
}
