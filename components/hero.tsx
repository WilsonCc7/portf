import { copy } from "@/content/copy";
import type { Track } from "@/content/tracks";
import { HeroCopy, Player } from "./player";

export function Hero({ tracks }: { tracks: Track[] }) {
  return (
    <section className="flex min-h-[100dvh] items-center pb-16 pt-28 lg:pt-24">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <HeroCopy
            line1={copy.hero.line1}
            line2={copy.hero.line2}
            lead={copy.hero.lead}
            cta={copy.hero.cta}
            email={copy.hero.email}
          />
        </div>
        <div className="lg:col-span-5">
          <Player tracks={tracks} />
        </div>
      </div>
    </section>
  );
}
