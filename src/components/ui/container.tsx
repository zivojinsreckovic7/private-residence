import { cn } from "@/lib/cn";

type ContainerProps = React.ComponentPropsWithoutRef<"div"> & {
  /** `wide` for full-bleed photography rows, `narrow` for reading columns. */
  width?: "default" | "wide" | "narrow";
};

const widths = {
  default: "max-w-[1240px]",
  wide: "max-w-[1440px]",
  narrow: "max-w-[760px]",
};

export function Container({
  width = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-5 md:px-8", widths[width], className)}
      {...props}
    />
  );
}
