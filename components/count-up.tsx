"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Counts from 0 to `value` once the element enters the viewport.
 *
 * The server and the first client render both show the final value, so
 * hydration can never leave a stale number behind. The count-up only runs
 * in a mount effect, and is skipped under reduced motion.
 */
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduced) return;
    if (!inView) return;

    const controls = animate(0, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, reduced, value]);

  return <span ref={ref}>{display}</span>;
}
