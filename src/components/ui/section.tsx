import { cn } from "@/lib/cn";

type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  as?: "section" | "footer" | "div";
  /**
   * Surface tone. `deep` is the only inverted tone and it carries its own
   * text colours, so nothing inside it needs to opt in.
   */
  tone?: "canvas" | "surface" | "deep";
  /** Vertical rhythm. The scale is deliberately generous. */
  space?: "default" | "tight" | "loose" | "none";
};

const tones = {
  canvas: "bg-canvas text-ink",
  surface: "bg-surface text-ink",
  deep: "bg-surface-deep text-on-dark",
};

const spaces = {
  none: "",
  tight: "py-16 md:py-20",
  default: "py-24 md:py-32",
  loose: "py-28 md:py-40",
};

export function Section({
  as: Tag = "section",
  tone = "canvas",
  space = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn("relative", tones[tone], spaces[space], className)}
      {...props}
    />
  );
}
