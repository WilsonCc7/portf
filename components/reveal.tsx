"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  // Only the transition varies: markup, element type and initial styles stay
  // identical on server and client, so hydration cannot leave a stale style.
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "motion-reduce:!transform-none motion-reduce:!opacity-100",
        className,
      )}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{
        duration: reduced ? 0 : 0.42,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
