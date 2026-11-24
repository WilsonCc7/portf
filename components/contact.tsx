import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { CopyEmail } from "@/components/copy-email";
import { MagneticLink } from "@/components/magnetic-link";
import { StickerField } from "@/components/sticker";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line section-y"
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="relative z-10 max-w-[760px]">
          <p className="label flex items-center gap-3 text-accent-strong">
            <span className="h-px w-8 bg-accent" />
            Contact
          </p>
          <h2 className="mt-6 font-display text-[clamp(44px,7.4vw,108px)] leading-[0.95] tracking-[-0.04em]">
            {copy.contact.heading}
          </h2>
          <p className="mt-6 type-lead">{copy.contact.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticLink
              href={`mailto:${site.email}`}
              className="inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 text-sm font-medium text-accent-ink transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97]"
            >
              {copy.contact.email}
              <ArrowUpRight size={16} weight="regular" />
            </MagneticLink>
            <CopyEmail email={site.email} />
            <a
              href={`https://github.com/${site.handle}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft underline decoration-line underline-offset-4 transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink"
            >
              {copy.contact.secondary}
              <ArrowUpRight size={16} weight="regular" />
            </a>
          </div>
        </div>
        <StickerField
          className="pointer-events-none absolute inset-0 hidden lg:block"
          items={[
            {
              src: "/widgets/01-samurai.jpg",
              width: 512,
              height: 512,
              rotate: -6,
              depth: 32,
              className: "absolute right-[140px] top-[10%] w-[120px]",
            },
            {
              src: "/widgets/03-dunk.jpg",
              width: 735,
              height: 1065,
              rotate: 7,
              depth: -28,
              className: "absolute bottom-[8%] right-0 w-[104px]",
            },
          ]}
        />
      </div>
    </section>
  );
}
