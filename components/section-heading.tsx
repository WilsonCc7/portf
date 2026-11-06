import type React from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionHeading({ label, className, children }: SectionHeadingProps) {
  return (
    <div className={cn(className)}>
      {label && <p className="label">{label}</p>}
      <h2 className="mt-4 max-w-[820px] type-h2">{children}</h2>
    </div>
  );
}
