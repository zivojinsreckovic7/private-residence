import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "inverse" | "onDark";
type Size = "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  /** Render the trailing arrow in its own nested circle. */
  icon?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = BaseProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof BaseProps> & {
    href?: undefined;
  };

type LinkProps = BaseProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, keyof BaseProps> & {
    href: string;
  };

const base =
  "group inline-flex shrink-0 items-center justify-center gap-3 rounded-full " +
  "font-sans font-medium whitespace-nowrap select-none " +
  "transition-[background-color,border-color,color,box-shadow,transform] " +
  "duration-(--dur-base) ease-out-expo active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-dark hover:bg-accent-deep hover:shadow-accent",
  outline:
    "border border-line-strong text-ink hover:border-ink hover:bg-accent-tint",
  inverse: "bg-canvas text-ink shadow-soft hover:shadow-lift",
  onDark: "border border-white/35 bg-white/10 text-on-dark hover:bg-white/20",
};

/** Trailing-circle tone, matched to the variant it sits inside. */
const iconWells: Record<Variant, string> = {
  primary: "bg-white/18",
  outline: "bg-ink/[0.07]",
  inverse: "bg-ink/[0.07]",
  onDark: "bg-white/18",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-13 px-8 text-base",
};

/** Right padding shrinks when the nested icon well is present. */
const sizesWithIcon: Record<Size, string> = {
  md: "pr-1.5",
  lg: "pr-2",
};

const iconWellSizes: Record<Size, string> = {
  md: "size-8",
  lg: "size-9",
};

function content(variant: Variant, size: Size, icon: boolean, children: React.ReactNode) {
  if (!icon) return children;
  return (
    <>
      {children}
      <span
        aria-hidden
        className={cn(
          "flex items-center justify-center rounded-full",
          "transition-transform duration-(--dur-base) ease-out-expo",
          "group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
          iconWells[variant],
          iconWellSizes[size],
        )}
      >
        <ArrowUpRight size={16} weight="light" />
      </span>
    </>
  );
}

export function Button(props: ButtonProps | LinkProps) {
  const {
    variant = "primary",
    size = "md",
    icon = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    icon && sizesWithIcon[size],
    className,
  );

  if (typeof rest.href === "string") {
    const { href, ...linkRest } = rest as Omit<LinkProps, keyof BaseProps>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {content(variant, size, icon, children)}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as Omit<ButtonProps, keyof BaseProps>)}>
      {content(variant, size, icon, children)}
    </button>
  );
}
