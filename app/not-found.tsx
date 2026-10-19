import Link from "next/link";
import { copy } from "@/content/copy";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1240px] px-6 py-[clamp(64px,9vw,128px)]">
      <h1 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[1.1] tracking-[-0.015em] text-ink">
        {copy.notFound.heading}
      </h1>
      <Link
        href="/#work"
        className="mt-8 inline-block text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
      >
        {copy.notFound.link}
      </Link>
    </div>
  );
}
