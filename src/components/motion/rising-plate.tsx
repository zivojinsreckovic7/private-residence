import { cn } from "@/lib/cn";

type RisingPlateProps = {
  /** How far the plate pulls up over what is pinned behind it. */
  overlap?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * A plate that rides up and covers whatever is pinned behind it.
 *
 * A white bloom sits directly above the leading edge and travels with it, so
 * the footage behind dissolves into the plate instead of being cut across by
 * a hard line. It replaces the contact shadow this used to carry: a shadow
 * reads as a sheet passing in front, which is the opposite of a blend.
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
        className,
      )}
    >
      <div
        aria-hidden
        // `bottom-full` puts this entirely above the plate, so the gradient's
        // 50% 100% origin lands exactly on the leading edge.
        //
        // Dropped under reduced motion along with the overlap: with the plate
        // sitting below the hero rather than riding over it, the bloom would
        // land on the hero's own copy and swallow the white outline button.
        className="pointer-events-none absolute inset-x-0 bottom-full h-[40vh] motion-reduce:hidden"
        style={{
          background: [
            // The bloom itself, and the whole of the effect at centre.
            "radial-gradient(85% 100% at 50% 100%, var(--color-canvas) 0%, rgb(255 255 255 / 0.72) 42%, rgb(255 255 255 / 0.24) 70%, transparent 88%)",
            // A shallow catch underneath it, so the corners the bloom does not
            // reach still meet the plate without a line.
            "linear-gradient(to top, var(--color-canvas) 0%, rgb(255 255 255 / 0.55) 7%, rgb(255 255 255 / 0.16) 20%, transparent 42%)",
          ].join(", "),
        }}
      />
      {children}
    </div>
  );
}
