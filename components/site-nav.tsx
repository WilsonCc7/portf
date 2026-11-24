"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { List } from "@phosphor-icons/react/dist/icons/List";
import { X } from "@phosphor-icons/react/dist/icons/X";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { TimeNow } from "./time-now";

const SECTION_IDS = ["work", "about", "uses", "cv"];
const PRIMARY =
  "inline-flex h-11 items-center justify-center rounded-control bg-accent px-5 text-sm font-medium text-accent-ink transition-transform duration-150 active:scale-[0.97]";

export function SiteNav() {
  const headerRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    headerRef.current?.toggleAttribute("data-scrolled", y > 24);
  });

  useEffect(() => {
    headerRef.current?.toggleAttribute("data-scrolled", window.scrollY > 24);
  }, []);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(SECTION_IDS.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of SECTION_IDS) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const sync = () => setOpen(dialog.open);
    dialog.addEventListener("close", sync);
    sync();
    return () => dialog.removeEventListener("close", sync);
  }, []);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (dialog.open) dialog.close();
    else dialog.showModal();
    setOpen(dialog.open);
  };
  const closeMenu = () => dialogRef.current?.close();
  const isActive = (href: string) => active !== null && href.endsWith(`#${active}`);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 h-16 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-200"
      >
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-4 px-6 md:px-10">
          <Link href="/" className="inline-flex items-center gap-2 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
            {copy.wordmark}<span aria-hidden="true" className="size-1.5 bg-accent" />
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {site.nav.map((item) => {
              const selected = isActive(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    "relative font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-200 after:ease-[var(--ease-out)] after:scale-x-0 motion-reduce:after:transition-none [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink [@media(hover:hover)_and_(pointer:fine)]:hover:after:scale-x-100",
                    selected && "text-accent-strong after:scale-x-100",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs text-ink-soft md:block"><TimeNow /></span>
            <a href={`mailto:${site.email}`} className={cn(PRIMARY, "hidden sm:inline-flex")}>
              {copy.hero.email}
            </a>
            <button
              type="button"
              onClick={openMenu}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-line text-ink transition-transform duration-150 active:scale-[0.97] lg:hidden"
            >
              {open ? <X size={20} aria-hidden="true" /> : <List size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
          style={{ scaleX: reduced ? 1 : scrollYProgress }}
        />
      </header>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        data-menu
        onClick={(event) => {
          if (event.target === dialogRef.current) closeMenu();
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-paper p-0 text-ink"
      >
        <div
          onClick={(event) => {
            if (event.target === event.currentTarget) closeMenu();
          }}
          className="mx-auto flex min-h-dvh max-w-[1360px] flex-col px-6 pb-10 pt-24 md:px-10"
        >
          <div className="flex items-center justify-between">
            <Link href="/" onClick={closeMenu} className="font-display text-[18px] font-semibold tracking-[-0.02em]">
              {copy.wordmark}<span aria-hidden="true" className="ml-2 inline-block size-1.5 bg-accent" />
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-line text-ink transition-transform duration-150 active:scale-[0.97]"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="mt-8 flex flex-col">
            {site.nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                style={{ "--i": index } as CSSProperties}
                className="menu-link flex min-h-11 items-center border-b border-line font-display text-[clamp(40px,10vw,72px)] leading-[1.05] tracking-[-0.03em]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
            <a href={`mailto:${site.email}`} onClick={closeMenu} className={PRIMARY}>
              {copy.hero.email}
            </a>
            <a
              href={`https://github.com/${site.handle}`}
              className="font-mono text-xs text-ink-soft underline underline-offset-4 transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink"
            >
              github.com/{site.handle}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
