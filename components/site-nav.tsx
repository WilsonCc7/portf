"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { List } from "@phosphor-icons/react/dist/icons/List";
import { X } from "@phosphor-icons/react/dist/icons/X";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const SECTION_IDS = ["work", "about", "uses"];

const PRIMARY =
  "inline-flex h-11 items-center justify-center bg-accent px-5 text-sm font-medium text-accent-ink transition-transform duration-[90ms] active:scale-[0.98]";

export function SiteNav() {
  const headerRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  // Only the animation duration, never the markup: useReducedMotion() is null
  // on the server, so a branch on it would change the rendered tree.
  const reduced = useReducedMotion() === true;

  const { scrollY } = useScroll();

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
      <style>{`
        dialog[data-menu]::backdrop {
          background: color-mix(in srgb, var(--ink) 40%, transparent);
        }
        header[data-scrolled] {
          border-bottom: 1px solid var(--line);
          background-color: color-mix(in srgb, var(--paper) 85%, transparent);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
        }
        @media (prefers-reduced-transparency: reduce) {
          header[data-scrolled] {
            background-color: var(--paper);
            -webkit-backdrop-filter: none;
            backdrop-filter: none;
          }
        }
      `}</style>

      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 h-16 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-200"
      >
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-6">
          <Link
            href="/"
            className="font-mono text-sm uppercase tracking-[0.14em] text-ink"
          >
            {copy.wordmark}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "true" : undefined}
                className={cn(
                  "text-sm text-ink-soft transition-colors hover:text-ink",
                  isActive(item.href) && "text-ink",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className={cn(PRIMARY, "hidden sm:inline-flex")}
            >
              {copy.hero.email}
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={openMenu}
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink lg:hidden"
            >
              {open ? (
                <X size={20} weight="regular" aria-hidden />
              ) : (
                <List size={20} weight="regular" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        data-menu
        onClick={(event) => {
          if (event.target === dialogRef.current) closeMenu();
        }}
        className="fixed inset-x-0 top-0 m-0 h-dvh max-h-dvh w-full max-w-none border-0 bg-transparent p-0 text-ink"
      >
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.22, ease: "easeOut" }}
          className="overflow-hidden border-b border-line bg-paper"
        >
          <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-6 pb-14 pt-20">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm uppercase tracking-[0.14em] text-ink-soft">
                {copy.wordmark}
              </span>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
              >
                <X size={20} weight="regular" aria-hidden />
              </button>
            </div>

            <nav className="flex flex-col">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="font-display text-[32px] leading-[1.15] text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${site.email}`}
                onClick={closeMenu}
                className={`${PRIMARY} w-full`}
              >
                {copy.hero.email}
              </a>
              <div className="flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </motion.div>
      </dialog>
    </>
  );
}
