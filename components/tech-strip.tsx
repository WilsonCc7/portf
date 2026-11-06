import { stack } from "@/content/stack";

export function TechStrip() {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <ul className="tech-track flex w-max items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
        {stack.map((item) => (
          <li key={item.name}>
            <svg
              viewBox="0 0 24 24"
              role="img"
              aria-label={item.name}
              className="size-7 shrink-0 fill-current text-ink-soft [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink transition-colors duration-200"
            >
              <title>{item.name}</title>
              <path d={item.path} />
            </svg>
          </li>
        ))}
        {stack.map((item) => (
          <li key={`${item.name}-duplicate`} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-7 shrink-0 fill-current text-ink-soft [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink transition-colors duration-200"
            >
              <title>{item.name}</title>
              <path d={item.path} />
            </svg>
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes tech-marquee {
          to { transform: translateX(-50%); }
        }
        .tech-track {
          animation: tech-marquee 38s linear infinite;
        }
        .tech-track:hover,
        .tech-track:focus-within {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .tech-track {
            animation: none;
            flex-wrap: wrap;
            width: 100%;
            row-gap: 1.5rem;
            padding-right: 0;
          }
          .tech-track > li[aria-hidden="true"] {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
