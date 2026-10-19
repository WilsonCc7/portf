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
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.16, ease: "easeOut" }}
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
