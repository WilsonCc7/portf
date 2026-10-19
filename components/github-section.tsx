import Image from "next/image";
import { ArrowUpRight, Star } from "@phosphor-icons/react/ssr";
import { copy } from "@/content/copy";
import { profile, relativeTime, repos } from "@/content/github";
import { CountUp } from "@/components/count-up";

const stats = [
  { label: "Repos", value: profile.publicRepos },
  { label: "Stars", value: profile.stars },
  { label: "Followers", value: profile.followers },
];

// `relativeTime` defaults to `Date.now()`, which Next.js treats as unstable IO
// and refuses to prerender under `cacheComponents`. The same wall clock read
// through `performance` keeps the route statically prerenderable. Read once at
// module load, never during render.
const now = performance.timeOrigin + performance.now();

export function GitHubSection() {
  return (
    <section id="github" className="border-t border-line py-[clamp(64px,9vw,128px)]">
      <div className="mx-auto max-w-[1240px] px-6">
        <h2 className="max-w-[820px] font-display text-[clamp(32px,4.5vw,56px)] leading-[1] tracking-[-0.015em] text-ink">
          {copy.github.heading}
        </h2>

        <div className="mt-6 flex justify-end">
          <a
            href={`https://github.com/${profile.login}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-ink transition-colors hover:text-accent"
          >
            {copy.github.profileLink}
            <ArrowUpRight size={16} weight="regular" className="text-ink-soft" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          <a
            href={`https://github.com/${profile.login}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col gap-6 bg-ink p-6 text-paper sm:col-span-2 sm:p-8"
          >
            <div className="flex items-center gap-5">
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={96}
                height={96}
                className="size-24 rounded-full"
              />
              <div className="min-w-0">
                <p className="font-display text-2xl leading-[1.1]">{profile.name}</p>
                <p className="mt-1 font-mono text-xs opacity-70">@{profile.login}</p>
              </div>
            </div>

            <p className="max-w-[40ch] text-sm leading-[1.55] opacity-80">{profile.bio}</p>

            <div className="flex gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="font-display text-3xl leading-none">
                    <CountUp value={stat.value} />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-paper/60">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </a>

          {repos.map((repo, i) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className={`flex flex-col justify-between gap-8 p-6 ${
                i % 2 === 0 ? "bg-surface" : "bg-paper"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm text-ink">{repo.name}</span>
                <ArrowUpRight size={16} weight="regular" className="shrink-0 text-ink-soft" />
              </div>

              <p className="text-sm leading-[1.5] text-ink-soft">
                {repo.description ?? copy.github.emptyDescription}
              </p>

              <div className="flex items-center gap-3 font-mono text-[11px] text-ink-soft">
                {repo.language !== null ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {repo.language}
                  </span>
                ) : null}

                {repo.stars > 0 ? (
                  <span className="inline-flex items-center gap-1">
                    <Star size={12} weight="regular" />
                    {repo.stars}
                  </span>
                ) : null}

                <span className="ml-auto">{relativeTime(repo.pushedAt, now)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
