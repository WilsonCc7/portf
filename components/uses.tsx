import { SectionHeading } from "@/components/section-heading";
import { TechStrip } from "@/components/tech-strip";
import { copy } from "@/content/copy";
import { stackLead } from "@/content/stack";

export function Uses() {
  return (
    <section id="uses" className="border-t border-line section-y">
      <div className="mx-auto max-w-[1240px] px-6">
        <SectionHeading label={copy.uses.label}>{copy.uses.heading}</SectionHeading>
        <p className="mt-6 type-lead">{stackLead}</p>
        <div className="mt-14">
          <TechStrip />
        </div>
      </div>
    </section>
  );
}
