import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { TimeNow } from "./time-now";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-24 pb-16 lg:flex lg:items-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_78%_0%,var(--accent-soft),transparent_65%)]" />
      <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="label flex items-center gap-3 text-accent-strong">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {site.name} / Developer in {site.location.split(",")[0]}
          </p>
          <h1 className="mt-6">
            <span className="hero-in block pb-2 font-display text-[clamp(48px,7.4vw,108px)] leading-[0.95] tracking-[-0.04em]">
              {copy.hero.line1}
            </span>
            <span
              className="hero-in mt-2 block text-[clamp(24px,3.2vw,46px)] leading-[1.05] tracking-[-0.02em] text-ink-soft"
              style={{ animationDelay: "80ms" }}
            >
              {copy.hero.line2}
            </span>
          </h1>
          <p className="mt-6 type-lead hero-in" style={{ animationDelay: "160ms" }}>
            {copy.hero.lead}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 hero-in" style={{ animationDelay: "240ms" }}>
            <a
              href="#work"
              className="inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 text-sm font-medium text-accent-ink transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97]"
            >
              {copy.hero.cta}<ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-12 items-center gap-2 rounded-control border border-line bg-surface px-6 text-sm font-medium text-ink transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97]"
            >
              {copy.hero.email}<ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <aside className="mt-12 grid gap-5 border-t border-line pt-6 sm:grid-cols-3 lg:col-span-4 lg:mt-0 lg:block lg:space-y-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
          {copy.about.facts.map((fact, index) => (
            <div key={fact.label}>
              <p className="label">{fact.label}</p>
              <p className="mt-1 font-mono text-[13px] leading-[1.5] text-ink">
                {fact.value}{index === 0 && <> · <TimeNow /></>}
              </p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
