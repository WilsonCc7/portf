import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/reveal";

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
    <article className="pt-28">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:text-accent-strong"
        >
          <ArrowLeft size={16} weight="regular" aria-hidden="true" />
          All work
        </Link>

        <Reveal className="mt-12 flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="label text-accent-strong">{project.kind}</p>
            <h1 className="mt-4 font-display text-[clamp(48px,8vw,112px)] leading-[0.95] tracking-[-0.04em] text-ink">
              {project.title}
            </h1>
            <p className="mt-6 type-lead">{project.summary}</p>
          </div>
          <div className="flex items-center gap-2 rounded-control border border-line bg-surface px-3 py-2">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-soft">{project.status}</span>
          </div>
        </Reveal>
      </div>

      {lead && (
        <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden">
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

      <div className="mx-auto max-w-[1360px] px-6 py-[clamp(64px,9vw,128px)] md:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <dl className="grid grid-cols-[5rem_1fr] border-t border-line">
              <dt className="border-b border-line py-4 pr-4 font-mono text-[13px] text-ink-soft">Year</dt>
              <dd className="border-b border-line py-4 font-mono text-[13px] text-ink">{project.year}</dd>
              <dt className="border-b border-line py-4 pr-4 font-mono text-[13px] text-ink-soft">Status</dt>
              <dd className="border-b border-line py-4 font-mono text-[13px] text-ink">{project.status}</dd>
              <dt className="py-4 pr-4 font-mono text-[13px] text-ink-soft">Stack</dt>
              <dd className="py-4 font-mono text-[13px] text-ink">{project.stack.join(" · ")}</dd>
            </dl>
            <div className="flex flex-wrap gap-2 pt-4">
              {project.repo && (
                <a
                  href={`https://github.com/${project.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-control border border-line bg-surface px-5 text-sm text-ink transition-transform duration-[140ms] active:scale-[0.97]"
                >
                  Repo
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-control bg-accent px-5 text-sm font-medium text-accent-ink transition-transform duration-[140ms] active:scale-[0.97]"
                >
                  Live
                </a>
              )}
            </div>
          </aside>

          <div className="space-y-10 lg:col-span-8">
            {project.sections.map((section, index) => (
              <Reveal key={section.heading} delay={index * 0.06}>
                <section className="border-t border-line pt-6">
                  <h2 className="font-display text-2xl leading-[1.1] text-ink">
                    {section.heading}
                  </h2>
                  <p className="mt-3 max-w-[65ch] text-base leading-[1.65] text-ink-soft">
                    {section.body}
                  </p>
                </section>
              </Reveal>
            ))}
          </div>
        </div>

        {rest.length > 0 && (
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {rest.map((media) => (
              <div
                key={media.src}
                className="relative aspect-[16/10] overflow-hidden rounded-media"
              >
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 border-t border-line pt-8">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-end justify-between gap-6"
          >
            <span>
              <span className="label block">Next</span>
              <span className="mt-2 block font-display text-[clamp(32px,5vw,64px)] leading-[1] tracking-[-0.03em] text-ink transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-accent-strong">
                {next.title}
              </span>
            </span>
            <ArrowUpRight
              size={28}
              weight="regular"
              className="text-ink-soft transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-accent-strong"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
