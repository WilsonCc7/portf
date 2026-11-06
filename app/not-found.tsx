import Link from "next/link";
import { copy } from "@/content/copy";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1240px] px-6 py-[clamp(64px,9vw,128px)]">
      <h1 className="type-h2">
        {copy.notFound.heading}
      </h1>
      <Link
        href="/#work"
        className="mt-8 inline-block text-ink underline decoration-line underline-offset-4 [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-accent"
      >
        {copy.notFound.link}
      </Link>
    </div>
  );
}
