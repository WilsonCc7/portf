"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react/ssr";
import { copy } from "@/content/copy";

/** Copies the email address to the clipboard and confirms it for 1.6 seconds. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
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
      aria-label={copy.contact.copy}
      aria-live="polite"
      className="inline-flex h-11 items-center gap-2 border border-line px-4 font-mono text-xs text-ink-soft transition-colors hover:text-ink"
    >
      {copied ? <Check size={16} weight="regular" /> : <Copy size={16} weight="regular" />}
      {copied ? copy.contact.copied : copy.contact.copy}
    </button>
  );
}
