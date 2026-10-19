import { copy } from "@/content/copy";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>{copy.footer.copyright}</p>
        <p>{copy.footer.location}</p>
        <div className="flex items-center gap-6">
          <p>{copy.footer.colophon}</p>
          <a
            href={`https://github.com/${site.handle}/portf`}
            target="_blank"
            rel="noreferrer"
            className="text-ink transition-colors hover:text-accent"
          >
            {copy.footer.source}
          </a>
        </div>
      </div>
    </footer>
  );
}
