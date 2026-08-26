"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type MagneticProps = {
  children: React.ReactNode;
  /** Maximum pull toward the pointer, in px. */
  strength?: number;
  className?: string;
};

/**
 * Lets a control lean very slightly toward the pointer.
 *
 * Used on primary CTAs only. Pointer position goes into MotionValues, never
 * React state, so the tree never re-renders while the pointer moves. Disabled
 * for coarse pointers and under reduced motion, where it would be either
 * meaningless or unwelcome.
 */
export function Magnetic({
  children,
  strength = 8,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 26, mass: 0.6 };
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  if (reduced) return <div className={className}>{children}</div>;

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set((dx / rect.width) * strength * 2);
    y.set((dy / rect.height) * strength * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
