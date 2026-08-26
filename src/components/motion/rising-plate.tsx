import { cn } from "@/lib/cn";

type RisingPlateProps = {
  /** How far the plate pulls up over what is pinned behind it. */
  overlap?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * A plate that rides up and covers whatever is pinned behind it, with a
 * contact shadow along its leading edge so it reads as a physical sheet
 * passing in front rather than a section simply following on.
 *
 * Pure CSS. The plate's own background comes from the section inside it.
 */
export function RisingPlate({
  overlap = "100vh",
  children,
  className,
}: RisingPlateProps) {
  return (
    <div
      // Through a variable rather than an inline margin, so the
      // motion-reduce variant can drop the overlap entirely.
      style={{ "--plate-overlap": overlap } as React.CSSProperties}
      className={cn(
        "relative z-10 mt-[calc(var(--plate-overlap)*-1)] motion-reduce:mt-0",
        "shadow-[0_-40px_90px_-30px_rgb(20_22_25/0.55)] motion-reduce:shadow-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
