import { copy } from "@/content/copy";
import { uses } from "@/content/uses";

export function Uses() {
  return (
    <section id="uses" className="border-t border-line py-[clamp(64px,9vw,128px)]">
      <div className="mx-auto max-w-[1240px] px-6">
        <p className="label">{copy.uses.label}</p>
        <h2 className="mt-3 font-display text-[clamp(32px,4.5vw,56px)] leading-[1] tracking-[-0.015em] text-ink">
          {copy.uses.heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {uses.map((group) => (
            <div key={group.title} className="border-t border-line pt-4">
              <p className="label">{group.title}</p>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="font-mono text-sm leading-[1.4] text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
