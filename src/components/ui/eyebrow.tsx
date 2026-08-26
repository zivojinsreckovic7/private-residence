import { cn } from "@/lib/cn";

/**
 * Small letterspaced label above a headline.
 *
 * Use sparingly: at most one per three sections across the page. A section's
 * position usually categorises it well enough on its own.
 */
export function Eyebrow({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "text-label font-medium uppercase text-ink-subtle",
        className,
      )}
      {...props}
    />
  );
}
