import { AboutStatement } from "@/components/about-statement";
import { Offscreen } from "@/components/offscreen";
import { StickerField } from "@/components/sticker";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-line section-y"
    >
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <AboutStatement />
        </div>
        <div className="lg:col-span-4">
          <StickerField
            className="mt-10 flex justify-center gap-3 lg:relative lg:mt-0 lg:block lg:h-[300px]"
            items={[
              {
                src: "/widgets/07-portrait-wilson.jpg",
                width: 900,
                height: 1200,
                rotate: 4,
                depth: 26,
                className: "w-[88px] lg:absolute lg:right-0 lg:top-0 lg:w-[128px]",
              },
              {
                src: "/widgets/05-portrait-musashi.jpg",
                width: 736,
                height: 736,
                rotate: -5,
                depth: 30,
                className: "w-[88px] lg:absolute lg:right-[104px] lg:top-[96px] lg:w-[112px]",
              },
              {
                src: "/widgets/06-portrait-window.jpg",
                width: 735,
                height: 748,
                rotate: 7,
                depth: 22,
                className: "w-[88px] lg:absolute lg:right-4 lg:bottom-0 lg:w-[104px]",
              },
            ]}
          />
        </div>
      </div>
      <Offscreen />
    </section>
  );
}
