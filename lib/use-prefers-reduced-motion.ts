"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Reduced-motion preference that is `false` during SSR and hydration.
 *
 * Motion's own `useReducedMotion` reads the query on the first client render,
 * so using it to compute an inline transform makes that style differ from the
 * server's. This keeps the first client render identical, then updates.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
