"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export type StickerItem = {
  src: string;
  width: number;
  height: number;
  rotate: number;
  depth: number;
  className?: string;
  sizes?: string;
};

export function StickerField({
  items,
  className,
}: {
  items: StickerItem[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
    >
      {items.map((item) => (
        <Sticker
          key={item.src}
          item={item}
          progress={scrollYProgress}
          reduced={reduced}
        />
      ))}
    </div>
  );
}

function Sticker({
  item,
  progress,
  reduced,
}: {
  item: StickerItem;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  // The full transform string keeps the drift on the compositor; rotation is
  // folded in because Motion writes the whole `transform` property.
  const transform = useTransform(progress, (value) => {
    const offset = reduced ? 0 : (value - 0.5) * item.depth * 2;
    return `translate3d(0, ${offset}px, 0) rotate(${item.rotate}deg)`;
  });

  return (
    <motion.figure
      style={{ transform }}
      className={cn(
        "rounded-card bg-surface p-2 pb-3 shadow-[0_18px_40px_-20px_var(--shadow)] ring-1 ring-line",
        item.className,
      )}
    >
      <Image
        src={item.src}
        alt=""
        width={item.width}
        height={item.height}
        sizes={item.sizes ?? "128px"}
        loading="lazy"
        className="h-auto w-full rounded-media object-cover"
      />
    </motion.figure>
  );
}
