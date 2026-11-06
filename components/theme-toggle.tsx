"use client";

import { useSyncExternalStore } from "react";
import { Moon } from "@phosphor-icons/react/dist/icons/Moon";
import { Sun } from "@phosphor-icons/react/dist/icons/Sun";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Theme = "light" | "dark";

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function serverTheme(): Theme {
  return "light";
}

export function ThemeToggle() {
  const reduced = useReducedMotion() === true;
  const theme = useSyncExternalStore(subscribeTheme, readTheme, serverTheme);
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => {
        const next: Theme = dark ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {}
      }}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-[transform,border-color,color] duration-[120ms] active:scale-[0.94] [@media(hover:hover)_and_(pointer:fine)]:hover:border-ink"
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
          transition={{ duration: reduced ? 0 : 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {dark ? (
            <Moon size={20} weight="regular" aria-hidden />
          ) : (
            <Sun size={20} weight="regular" aria-hidden />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
