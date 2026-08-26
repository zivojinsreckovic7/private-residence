"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "rise" | "drape" | "mask" | "still";

type RevealProps = React.ComponentPropsWithoutRef<"div"> & {
  /**
   * `rise` for body copy, `drape` for display headings, `mask` for
   * photography, `still` for anything that should simply be present.
   */
  variant?: Variant;
  /** Milliseconds of stagger, for revealing siblings in sequence. */
  delay?: number;
  /** Render as something other than a div, for correct semantics. */
  as?: "div" | "span" | "li" | "figure" | "article" | "section";
};

/**
 * Reveals its children once, as they enter the viewport.
 *
 * The transitions live in globals.css so they are gated behind
 * `prefers-reduced-motion` in CSS rather than in JS. The observer writes the
 * attribute straight to the node instead of going through React state, which
 * keeps every reveal on the page off the render path.
 *
 * Deliberately not Motion's `whileInView`: there are dozens of these, and a
 * CSS transition driven by one boolean attribute is far cheaper than dozens of
 * JS-driven animations. Motion is reserved for scroll-linked motion, where it
 * earns its weight.
 */
export function Reveal({
  variant = "rise",
  delay = 0,
  as = "div",
  className,
  style,
  ...props
}: RevealProps) {
  // Loosened on purpose: the wrapper only ever forwards div-shaped props, and
  // a fully polymorphic generic would cost far more than it is worth here.
  const Tag = as as React.ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.setAttribute("data-reveal", "shown");

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant === "still" ? undefined : "hidden"}
      data-variant={variant}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn(variant === "mask" && "will-change-[clip-path]", className)}
      {...props}
    />
  );
}

type RevealLinesProps = {
  children: readonly string[];
  /** Milliseconds between each line. */
  step?: number;
  variant?: Variant;
  className?: string;
  lineClassName?: string;
};

/**
 * A run of short paragraphs that arrive one after another.
 *
 * The brand copy is written as standalone lines, so staggering them reads as
 * pacing rather than as decoration.
 */
export function RevealLines({
  children,
  step = 70,
  variant = "rise",
  className,
  lineClassName,
}: RevealLinesProps) {
  return (
    <div className={className}>
      {children.map((line, i) => (
        <Reveal
          key={line}
          variant={variant}
          delay={i * step}
          className={lineClassName}
        >
          <p>{line}</p>
        </Reveal>
      ))}
    </div>
  );
}
