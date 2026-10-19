import { copy } from "@/content/copy";
import { AboutStatement } from "@/components/about-statement";
import { TimeNow } from "@/components/time-now";

export function About() {
  return (
    <section id="about" className="border-t border-line py-[clamp(64px,9vw,128px)]">
      <div className="mx-auto max-w-[1240px] px-6">
        <AboutStatement />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 md:divide-x divide-line">
          {copy.about.facts.map((fact, i) => (
            <div key={fact.label} className="md:px-8 md:first:pl-0 py-4 md:py-0">
              <p className="label">{fact.label}</p>
              <p className="mt-1.5 font-mono text-[13px] leading-[1.4] text-ink">
                {fact.value}
                {i === 0 ? (
                  <>
                    {" | "}
                    <TimeNow />
                  </>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
