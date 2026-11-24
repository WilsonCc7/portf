"use client";

import { useRef } from "react";
import { motion, type MotionValue, useScroll, useTransform } from "motion/react";
import { copy } from "@/content/copy";

/** One word of the statement, faded in as the scroll progress crosses its slice. */
function Word({
  word,
  index,
  total,
  progress,
  accent,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  accent: boolean;
}) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0.18, 1],
  );

  return (
    <motion.span
      style={{ opacity }}
      className={`motion-reduce:!opacity-100 ${accent ? "text-accent-strong" : ""}`}
    >
      {word}
      {index < total - 1 ? " " : ""}
    </motion.span>
  );
}

/**
 * The About statement, revealed word by word as it scrolls through the viewport.
 *
 * One tree is rendered for every state. Under reduced motion the
 * `motion-reduce:!opacity-100` utility beats the inline opacity, so the text
 * is fully visible without a second markup branch.
 */
export function AboutStatement() {
  const target = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 0.8", "end 0.4"],
  });

  const words = copy.about.statement.split(" ");
  const accentIndex = words.findIndex((word) => word.includes("Wilson"));

  return (
    <p
      ref={target}
      className="max-w-[20ch] font-display text-[clamp(28px,4vw,56px)] leading-[1.04] tracking-[-0.03em]"
    >
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          word={word}
          index={i}
          total={words.length}
          progress={scrollYProgress}
          accent={i === accentIndex}
        />
      ))}
    </p>
  );
}
