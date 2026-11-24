"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Copy } from "@phosphor-icons/react/ssr";
import { copy } from "@/content/copy";

/** Copies the email address to the clipboard and confirms it for 1.6 seconds. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion() === true;
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  async function handleCopy() {
    if (!navigator.clipboard) return;

    await navigator.clipboard.writeText(email);
    setCopied(true);
    clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className="inline-flex h-11 items-center gap-2 rounded-control border border-line bg-surface px-4 font-mono text-xs text-ink-soft transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "copied" : "idle"}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2"
        >
          {copied ? <Check size={16} weight="regular" /> : <Copy size={16} weight="regular" />}
          {copied ? copy.contact.copied : copy.contact.copy}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{copied ? copy.contact.copied : copy.contact.copy}</span>
    </button>
  );
}
