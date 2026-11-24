import { StickerField } from "@/components/sticker";
import { copy } from "@/content/copy";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[1360px] px-6 pb-6 pt-14 md:px-10">
        <div className="grid gap-6 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft md:grid-cols-3">
          <p>{copy.footer.copyright}</p>
          <p>{copy.footer.location}</p>
          <div className="flex items-center gap-6">
            <a
              href={site.instagram.href}
              target="_blank"
              rel="noreferrer"
              className="text-ink transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-accent"
            >
              {copy.footer.instagram}
            </a>
            <a
              href={`https://github.com/${site.handle}/portf`}
              target="_blank"
              rel="noreferrer"
              className="text-ink transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-accent"
            >
              {copy.footer.source}
            </a>
          </div>
        </div>
        <p
          aria-hidden="true"
          className="pointer-events-none mt-10 select-none font-display text-[clamp(64px,16vw,240px)] leading-[0.8] tracking-[-0.06em] text-ink/[0.08]"
        >
          {copy.wordmark}
        </p>
      </div>
      <StickerField
        className="pointer-events-none absolute right-10 top-10 hidden lg:block"
        items={[
          {
            src: "/widgets/02-claymation.jpg",
            width: 736,
            height: 738,
            rotate: 5,
            depth: 20,
            className: "w-[96px]",
          },
        ]}
      />
    </footer>
  );
}
