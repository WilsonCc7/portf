"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/icons/ArrowUpRight";
import { DownloadSimple } from "@phosphor-icons/react/dist/icons/DownloadSimple";
import { X } from "@phosphor-icons/react/dist/icons/X";
import { SectionHeading } from "@/components/section-heading";
import { cv } from "@/content/cv";

export function Cv() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const previewUrl = `${cv.href}#page=1&view=FitH&toolbar=0&navpanes=0`;

  const openPreview = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    setOpen(true);
  };


  return (
    <>
      <style>{`
        dialog[data-cv-dialog] {
          opacity: 0;
          transform: translateY(12px) scale(0.98);
          transition:
            opacity 200ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)),
            transform 240ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)),
            display 240ms allow-discrete,
            overlay 240ms allow-discrete;
        }
        dialog[data-cv-dialog][open] {
          opacity: 1;
          transform: none;
        }
        dialog[data-cv-dialog]::backdrop {
          opacity: 0;
          transition: opacity 200ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
        }
        dialog[data-cv-dialog][open]::backdrop {
          opacity: 1;
        }
        @starting-style {
          dialog[data-cv-dialog][open] {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          dialog[data-cv-dialog][open]::backdrop {
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          dialog[data-cv-dialog],
          dialog[data-cv-dialog]::backdrop {
            transition-duration: 1ms;
            transform: none;
          }
        }
      `}</style>

      <section id="cv" className="section-y border-t border-line">
        <div className="mx-auto max-w-[1240px] px-6">
          <SectionHeading label={cv.label}>{cv.heading}</SectionHeading>

          <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <button
              type="button"
              aria-label={cv.preview}
              onClick={openPreview}
              className="group relative block aspect-[210/297] w-full max-w-[420px] overflow-hidden rounded-card border border-line bg-surface transition-[border-color,transform] duration-[160ms] ease-out active:scale-[0.99] [@media(hover:hover)_and_(pointer:fine)]:hover:border-ink"
            >
              <object
                data={previewUrl}
                type="application/pdf"
                aria-label={cv.alt}
                className="pointer-events-none h-full w-full"
              >
                <span className="flex h-full flex-col items-center justify-center gap-2">
                  <span className="label">CV</span>
                  <span className="max-w-[24ch] text-center text-xs text-ink-soft">
                    PDF preview unavailable. Use the links to open or download it.
                  </span>
                </span>
              </object>
              <span className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto w-fit rounded-control border border-line bg-paper/90 px-3 py-2 text-xs text-ink opacity-0 transition-opacity duration-[160ms] [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100">
                {cv.preview}
              </span>
            </button>

            <div className="max-w-[48ch] lg:pt-2">
              <p className="text-base leading-relaxed text-ink-soft">{cv.lead}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={cv.href}
                  download
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-control bg-accent px-5 text-sm font-medium text-accent-ink transition-[transform,background-color] duration-[120ms] active:scale-[0.98]"
                >
                  <DownloadSimple size={16} weight="regular" aria-hidden />
                  {cv.download}
                </a>
                <a
                  href={cv.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-ink underline decoration-line underline-offset-4 transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-accent"
                >
                  {cv.open}
                  <ArrowUpRight size={16} weight="regular" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        data-cv-dialog
        aria-labelledby="cv-dialog-title"
        onClose={(event) => setOpen(event.currentTarget.open)}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto w-[min(92vw,860px)] max-h-[90dvh] rounded-card border border-line bg-paper p-0 text-ink backdrop:bg-[color-mix(in_srgb,var(--ink)_45%,transparent)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <p id="cv-dialog-title" className="label">
            {cv.preview}
          </p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-line px-3 text-sm text-ink transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:border-ink"
          >
            <span>{cv.close}</span>
            <X size={16} weight="regular" aria-hidden />
          </button>
        </div>
        {open && (
          <object
            data={`${cv.href}#page=1&view=FitH&toolbar=0&navpanes=0`}
            type="application/pdf"
            aria-label={cv.alt}
            className="block max-h-[calc(90dvh-88px)] aspect-[210/297] w-full overflow-y-auto"
          >
            <span className="flex min-h-48 items-center justify-center label">CV</span>
          </object>
        )}
      </dialog>
    </>
  );
}
