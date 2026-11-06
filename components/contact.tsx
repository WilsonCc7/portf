import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { CopyEmail } from "@/components/copy-email";

export function Contact() {
  return (
    <section id="contact" className="border-t border-line section-y-tight">
      <div className="mx-auto max-w-[46ch] px-6 text-center">
        <h2 className="type-h2 mx-auto text-center">
          {copy.contact.heading}
        </h2>
        <p className="mt-5 type-lead">
          {copy.contact.lead}
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-11 items-center justify-center rounded-control bg-accent px-5 text-sm font-medium text-accent-ink transition-[transform,background-color] duration-[120ms] active:scale-[0.98]"
          >
            {copy.contact.email}
          </a>

          <a
            href={`https://github.com/${site.handle}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-ink underline decoration-line underline-offset-4 transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-accent"
          >
            {copy.contact.secondary}
            <ArrowUpRight size={16} weight="regular" className="text-ink-soft" />
          </a>
        </div>

        <div className="mt-6 flex justify-center">
          <CopyEmail email={site.email} />
        </div>
      </div>
    </section>
  );
}
