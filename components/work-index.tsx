"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { Reveal } from "@/components/reveal";
import { copy } from "@/content/copy";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

export function WorkIndex({ projects }: { projects: Project[] }) {
  const ordered = useMemo(
    () => [...projects].sort((a, b) => a.order - b.order),
    [projects],
  );

  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [pointer, setPointer] = useState({ wide: false, fine: false });

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setPointer({ wide: wide.matches, fine: fine.matches });
    sync();
    wide.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
    };
  }, []);

  // The floating preview only exists on wide, precise pointers. Everywhere
  // else each row carries its own media inline.
  const floating = pointer.wide && pointer.fine;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 26 });
  const springY = useSpring(y, { stiffness: 220, damping: 26 });

  const active = ordered.find((project) => project.slug === hovered);

  return (
    <section
      id="work"
      className="border-t border-line py-[clamp(64px,9vw,128px)]"
      onPointerMove={(event) => {
        if (!pointer.fine) return;
        x.set(event.clientX + 24);
        y.set(event.clientY + 24);
      }}
    >
      <div className="mx-auto max-w-[1240px] px-6">
        <p className="label">{copy.work.label}</p>
        <h2 className="mt-4 max-w-[820px] font-display text-[clamp(32px,4.5vw,56px)] leading-[1] tracking-[-0.015em] text-ink">
          {copy.work.heading}
        </h2>

        <div>
          {ordered.map((project, index) => {
            const isHovered = pointer.fine && hovered === project.slug;
            const media = project.media[0];

            return (
              <Reveal key={project.slug} delay={index * 0.05}>
                <Link
                  href={`/work/${project.slug}`}
                  onPointerEnter={() => {
                    if (pointer.fine) setHovered(project.slug);
                  }}
                  onPointerLeave={() => {
                    if (pointer.fine) setHovered(null);
                  }}
                  className="grid grid-cols-[auto_1fr_auto] items-baseline gap-6 border-t border-line py-8"
                >
                  {media && !floating && (
                    <div className="relative col-span-3 aspect-[16/10] w-full self-start overflow-hidden [@media(min-width:1024px)_and_(hover:hover)_and_(pointer:fine)]:hidden">
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(max-width: 1023px) 100vw, 320px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span
                    className={cn(
                      "font-mono text-xs text-ink-soft",
                      isHovered && "text-accent",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <motion.span
                      className="block font-display text-[clamp(22px,2.4vw,32px)] leading-[1.1] tracking-[-0.01em] text-ink"
                      animate={{ x: isHovered && !reduced ? 8 : 0 }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { duration: 0.15, ease: "easeOut" }
                      }
                    >
                      {project.title}
                    </motion.span>
                    <p className="mt-2 max-w-[52ch] text-sm text-ink-soft">
                      {project.summary}
                    </p>
                  </div>
                  <div className="text-right font-mono text-[13px] text-ink-soft">
                    <p>{project.year}</p>
                    <p>{project.status}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>

      {floating && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[320px] lg:block"
        >
          <motion.div
            style={{ x: springX, y: springY }}
            className="relative aspect-[16/10] w-[320px]"
          >
            <AnimatePresence>
              {active && (
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.18 }}
                  className="absolute inset-0"
                >
                  {active.media[0] && (
                    <Image
                      src={active.media[0].src}
                      alt=""
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </section>
  );
}
