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
      {label && (
        <p className="label flex items-center gap-3 text-accent-strong">
          <span aria-hidden className="h-px w-8 bg-accent" />
          {label}
        </p>
      )}
      <h2 className="mt-4 type-h2 max-w-[20ch]">{children}</h2>
    </div>
  );
}
