import Image from "next/image";
import { offscreen } from "@/content/offscreen";

export function Offscreen() {
  return (
    <div className="mx-auto mt-16 max-w-[1360px] px-6 md:mt-20 md:px-10">
      <div className="flex flex-col gap-8 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="label text-accent-strong">{offscreen.label}</p>
          <p className="mt-3 max-w-[30ch] font-display text-[clamp(22px,2.2vw,30px)] leading-[1.05] tracking-[-0.02em]">
            {offscreen.lead}
          </p>
        </div>

        <ul className="grid w-full max-w-[292px] grid-cols-2 gap-3 max-lg:mx-auto">
          {offscreen.films.map((film) => (
            <li key={film.title}>
              <figure>
                <span className="block overflow-hidden rounded-media bg-surface p-1 shadow-[0_14px_30px_-22px_var(--shadow)] ring-1 ring-line">
                  <Image
                    src={film.poster}
                    alt=""
                    width={400}
                    height={600}
                    sizes="150px"
                    className="h-auto w-full rounded-[10px] object-cover"
                  />
                </span>
                <figcaption className="mt-2 font-mono text-[10px] uppercase leading-[1.3] tracking-[0.08em] text-ink-soft">
                  {film.title}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
