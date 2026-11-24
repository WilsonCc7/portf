"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/** A pill link that leans towards the pointer, never more than 8px. */
export function MagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion() === true;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22 });
  const springY = useSpring(y, { stiffness: 260, damping: 22 });
  const transform = useTransform<number, string>(
    [springX, springY],
    ([latestX, latestY]) =>
      `translate3d(${Math.max(-8, Math.min(8, latestX))}px, ${Math.max(-8, Math.min(8, latestY))}px, 0)`,
  );

  return (
    <motion.a
      href={href}
      style={{ transform }}
      onPointerMove={(event) => {
        if (reduced) return;
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(
          Math.max(-8, Math.min(8, (event.clientX - (rect.left + rect.width / 2)) * 0.3)),
        );
        y.set(
          Math.max(-8, Math.min(8, (event.clientY - (rect.top + rect.height / 2)) * 0.3)),
        );
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn(className)}
    >
      {children}
    </motion.a>
  );
}
