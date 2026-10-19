import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { projects } from "@/content/projects";

export const instant = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) notFound();

  const ordered = [...projects].sort((a, b) => a.order - b.order);
  const index = ordered.findIndex((entry) => entry.slug === project.slug);
  const next = ordered[(index + 1) % ordered.length];
  const lead = project.media[0];
  const rest = project.media.slice(1);

  return (
    <article>
      <div className="mx-auto max-w-[1240px] px-6 pt-[clamp(64px,9vw,128px)]">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} weight="regular" aria-hidden="true" />
          All work
        </Link>

        <div className="mt-12 flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="label">{project.kind}</p>
            <h1 className="mt-4 font-display text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-0.02em] text-ink">
              {project.title}
            </h1>
            <p className="mt-6 max-w-[52ch] text-[clamp(17px,1.6vw,20px)] leading-[1.55] tracking-[-0.01em] text-ink-soft">
              {project.summary}
            </p>
          </div>
          <div className="flex items-center gap-2 border border-line px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-soft">{project.status}</span>
          </div>
        </div>
      </div>

      {lead && (
        <div className="relative mt-12 aspect-[16/10] w-full overflow-hidden">
          <Image
            src={lead.src}
            alt={lead.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="mx-auto max-w-[1240px] px-6 py-[clamp(64px,9vw,128px)]">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <dl className="grid grid-cols-[8rem_1fr] border-t border-line">
            <dt className="py-4 pr-4 font-mono text-[13px] text-ink-soft">Year</dt>
            <dd className="py-4 font-mono text-[13px] text-ink">{project.year}</dd>
            <dt className="py-4 pr-4 font-mono text-[13px] text-ink-soft">Status</dt>
            <dd className="py-4 font-mono text-[13px] text-ink">{project.status}</dd>
            <dt className="py-4 pr-4 font-mono text-[13px] text-ink-soft">Stack</dt>
            <dd className="py-4 font-mono text-[13px] text-ink">
              {project.stack.join(" · ")}
            </dd>
          </dl>

          <div className="flex flex-col items-end gap-3 md:justify-start">
            {project.repo && (
              <a
                href={`https://github.com/${project.repo}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center border border-line px-5 text-sm text-ink transition-transform duration-[90ms] active:scale-[0.98]"
              >
                Repo
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center bg-accent px-5 text-sm font-medium text-accent-ink transition-transform duration-[90ms] active:scale-[0.98]"
              >
                Live
              </a>
            )}
          </div>
        </div>

        <div className="mt-16 space-y-10">
          {project.sections.map((section) => (
            <section key={section.heading} className="max-w-[65ch]">
              <h2 className="font-display text-2xl leading-[1.1] text-ink">
                {section.heading}
              </h2>
              <p className="mt-3 text-base leading-[1.65] text-ink-soft">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-16 space-y-6">
            {rest.map((media) => (
              <div
                key={media.src}
                className="relative aspect-[16/10] w-full overflow-hidden"
              >
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  sizes="(max-width: 1240px) 100vw, 1240px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 border-t border-line pt-8">
          <Link
            href={`/work/${next.slug}`}
            className="flex items-end justify-between gap-6"
          >
            <span>
              <span className="label block">Next</span>
              <span className="mt-2 block font-display text-[clamp(22px,2.4vw,32px)] leading-[1.1] text-ink">
                {next.title}
              </span>
            </span>
            <ArrowUpRight
              size={24}
              weight="regular"
              className="text-ink-soft"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
