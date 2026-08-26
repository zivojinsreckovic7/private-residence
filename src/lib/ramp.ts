/**
 * Linear map from one range to another, hard-clamped at both ends.
 *
 * Used instead of `useTransform`'s input/output range form wherever the range
 * covers only a window of the scroll progress rather than the whole of it.
 * Passing a plain function to `useTransform` leaves no interpolation semantics
 * to guess at, and a windowed range mapping was observed extrapolating back
 * toward its first output value past the end of its window.
 */
export function ramp(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  if (inMax === inMin) return outMin;
  const t = Math.min(Math.max((value - inMin) / (inMax - inMin), 0), 1);
  return outMin + (outMax - outMin) * t;
}

/**
 * 1 inside [from, to], ramping up over `fade` before it and down over `fade`
 * after it. The shape every crossfading scene on the page is built from.
 */
export function window01(
  value: number,
  from: number,
  to: number,
  fade: number,
) {
  if (value < from) return ramp(value, from - fade, from, 0, 1);
  if (value > to) return ramp(value, to, to + fade, 1, 0);
  return 1;
}
