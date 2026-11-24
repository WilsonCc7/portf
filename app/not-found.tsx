import Link from "next/link";
import { copy } from "@/content/copy";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1360px] px-6 pt-32 pb-24 md:px-10">
      <h1 className="type-h2">{copy.notFound.heading}</h1>
      <Link
        href="/#work"
        className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-accent-strong underline decoration-line underline-offset-4 [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-accent"
      >
        {copy.notFound.link}
      </Link>
    </div>
  );
}
