"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { copy } from "@/content/copy";
import type { Project } from "@/content/projects";
import { EASE_OUT } from "@/lib/motion";

export function WorkIndex({ projects }: { projects: Project[] }) {
  const ordered = useMemo(
    () => [...projects].sort((a, b) => a.order - b.order),
    [projects],
  );
  const [active, setActive] = useState(ordered[0]?.slug ?? null);
  const reduced = useReducedMotion();
  const activeProject = ordered.find((project) => project.slug === active);

  return (
    <section id="work" className="border-t border-line section-y">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading label={copy.work.label}>
            {copy.work.heading}
          </SectionHeading>
          <p className="text-right font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {ordered.length} projects
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {ordered.map((project, index) => {
              const media = project.media[0];

              return (
                <Reveal key={project.slug} delay={index * 0.05}>
                  <Link
                    href={`/work/${project.slug}`}
                    onPointerEnter={() => setActive(project.slug)}
                    onFocus={() => setActive(project.slug)}
                    className="group block border-t border-line py-6"
                  >
                    {media && (
                      <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-media lg:hidden">
                        <Image
                          src={media.src}
                          alt={media.alt}
                          fill
                          sizes="(max-width:1023px) 100vw, 1px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-[2rem_1fr_auto] gap-4">
                      <span className="font-mono text-[11px] text-accent-strong">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <span className="block font-display text-[clamp(28px,3.4vw,48px)] leading-[1.02] tracking-[-0.03em] text-ink transition-[transform,color] duration-[160ms] ease-[var(--ease-out)] group-focus-visible:translate-x-1.5 group-focus-visible:text-accent-strong motion-reduce:!translate-none motion-reduce:transform-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-accent-strong">
                          {project.title}
                        </span>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.stack.slice(0, 3).map((item) => (
                            <span
                              key={item}
                              className="rounded-control border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right font-mono text-[11px] leading-[1.6] text-ink-soft">
                        <p>{project.year}</p>
                        <p>{project.status}</p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <aside className="hidden lg:col-span-5 lg:block">
            {activeProject && (
              <div className="lg:sticky lg:top-24">
                <div className="rounded-card bg-surface p-2 ring-1 ring-line shadow-[0_18px_40px_-20px_var(--shadow)]">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-media">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={activeProject.slug}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: reduced ? 0 : 0.18,
                          ease: EASE_OUT,
                        }}
                        className="absolute inset-0"
                      >
                        {activeProject.media[0] && (
                          <Image
                            src={activeProject.media[0].src}
                            alt={activeProject.media[0].alt}
                            fill
                            sizes="(min-width:1024px) 40vw, 100vw"
                            className="object-cover"
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <p className="font-display text-lg">{activeProject.title}</p>
                  <p className="text-right font-mono text-[11px] text-ink-soft">
                    {activeProject.year} · {activeProject.status}
                  </p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
