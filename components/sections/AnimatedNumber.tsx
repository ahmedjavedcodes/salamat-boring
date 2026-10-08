'use client';

import { useEffect, useRef, useState } from 'react';

type AnimatedNumberProps = {
  /** The confirmed figure, e.g. 95 for "95%". */
  value: number;
  /** Rendered after the counted digits once counting finishes, e.g. "%" or "+". */
  suffix?: string;
};

const DURATION_MS = 900;

/** Cubic ease-out: fast start, settles gently into the final figure. */
function easeOut(t: number): number {
  return 1 - (1 - t) ** 3;
}

/**
 * Counts up from 0 to `value` once, the moment it scrolls into view (CLAUDE.md §8).
 * This is the one piece of scroll-triggered motion on the page, kept to real
 * client-supplied figures rather than decoration, and it never repeats or loops.
 *
 * The initial render state is the final value, not 0 — that is what shows with no JS
 * and is what the server sends, so there is no flash-of-zero on first paint. The effect
 * only resets to 0 and counts back up once the element actually scrolls into view.
 * `prefers-reduced-motion: reduce` skips all of that and leaves the final figure in
 * place, matching how the hero's pipe-draw animation already behaves (§3.6).
 *
 * Every state update happens inside a callback (the observer's, or rAF's) rather than
 * directly in the effect body, which is what React's exhaustive-deps / set-state-in-
 * effect rule asks for.
 */
export function AnimatedNumber({ value, suffix = '' }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        setDisplay(0);
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          setDisplay(Math.round(value * easeOut(progress)));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
