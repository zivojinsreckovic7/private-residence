import Image from "next/image";
import { cn } from "@/lib/cn";

type FigureProps = {
  src: string;
  alt: string;
  /** Tailwind aspect utility, e.g. "aspect-[4/5]". */
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * A photograph in the house treatment: near-sharp corners, cover fit, and a
 * hairline so light interiors do not bleed into the white page.
 */
export function Figure({
  src,
  alt,
  aspect = "aspect-[4/3]",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}: FigureProps) {
  return (
    <div
      className={cn(
        "rounded-surface relative overflow-hidden bg-surface ring-1 ring-line",
        aspect,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
