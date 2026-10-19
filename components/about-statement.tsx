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
  italic,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  italic: boolean;
}) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0.18, 1],
  );

  return (
    <motion.span
      style={{ opacity }}
      className={`motion-reduce:!opacity-100 ${italic ? "italic" : ""}`}
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
  const italicIndex = words.findIndex((word) => word.includes("Wilson"));

  return (
    <p
      ref={target}
      className="max-w-[22ch] font-display text-[clamp(28px,3.6vw,48px)] leading-[1.1] tracking-[-0.01em] text-ink sm:max-w-[28ch]"
    >
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          word={word}
          index={i}
          total={words.length}
          progress={scrollYProgress}
          italic={i === italicIndex}
        />
      ))}
    </p>
  );
}
