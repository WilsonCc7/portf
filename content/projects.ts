export type Project = {
  slug: string;
  title: string;
  year: string;
  status: "Live" | "In development" | "Private";
  kind: string;
  summary: string;
  repo?: string;
  live?: string;
  stack: string[];
  media: { src: string; alt: string; width: number; height: number }[];
  sections: { heading: string; body: string }[];
  order: number;
};

export const projects: Project[] = [
  {
    slug: "withbox",
    title: "withbox",
    year: "2026",
    status: "Private",
    kind: "Web app",
    summary:
      "Letterboxd for films and series, with the player built in. Next.js on Cloudflare Workers with D1, KV and R2.",
    stack: [
      "Next.js (vinext)",
      "Cloudflare Workers",
      "D1 + Drizzle",
      "Workers KV",
      "R2",
      "Better Auth",
      "TMDB",
    ],
    media: [
      {
        src: "/work/withbox/01.webp",
        alt: "A dim cinema screen seen from a seat",
        width: 1600,
        height: 1000,
      },
    ],
    sections: [
      {
        heading: "What it does",
        body: "Log every film and every episode: date, rating, review, watchlist. Four favourites per profile, a diary you can filter by year or month, and a command palette on Cmd K.",
      },
      {
        heading: "The player",
        body: "Pluggable stream-source adapters behind one interface, resume positions, auto-advance, and a remembered source across visits. The app points at streams and never stores or proxies a video byte.",
      },
      {
        heading: "The data layer",
        body: "D1 with Drizzle for storage, Workers KV for two layers of metadata and score caching, R2 for avatars. Every stat on the stats page is a query at render time, not a stored counter.",
      },
    ],
    order: 1,
  },
  {
    slug: "cinea",
    title: "cinea",
    year: "2026",
    status: "In development",
    kind: "Streaming platform",
    summary:
      "Streaming platform with a film diary built in, powered by a self-hosted Jellyfin server.",
    repo: "WilsonCc7/Cinea",
    stack: ["Jellyfin", "Streaming", "Film diary"],
    media: [
      {
        src: "/work/cinea/01.webp",
        alt: "A dark room lit by a projector glow",
        width: 1600,
        height: 1000,
      },
    ],
    sections: [
      {
        heading: "The pitch",
        body: "Watch, rate, review and log films in one place. Accounts, the player, ratings, reviews, a diary, a watchlist and custom lists, all sitting on top of a Jellyfin library.",
      },
      {
        heading: "How it works",
        body: "Viewers only ever talk to Cinea. Cinea's backend talks to Jellyfin on their behalf, so the media server and its API key never reach the browser.",
      },
    ],
    order: 2,
  },
  {
    slug: "notify",
    title: "notify",
    year: "2026",
    status: "Live",
    kind: "School planner",
    summary:
      "School planner that pulls Google Classroom coursework into one place, with its own tasks and due dates.",
    repo: "WilsonCc7/notify",
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Google Classroom API",
      "Docker",
    ],
    media: [
      {
        src: "/work/notify/01.png",
        alt: "notify dashboard with Classroom tasks",
        width: 1726,
        height: 1022,
      },
      {
        src: "/work/notify/02.png",
        alt: "notify home screen",
        width: 1707,
        height: 922,
      },
      {
        src: "/work/notify/03.png",
        alt: "notify registration screen",
        width: 1711,
        height: 1027,
      },
    ],
    sections: [
      {
        heading: "The flow",
        body: "Register with any email, link Google, and Classroom coursework lands on the dashboard on login. Custom tasks take seconds, and every task carries its own help thread.",
      },
      {
        heading: "Why it exists",
        body: "Coursework was spread across Classroom, notes and chat. One calm list with due dates, an overdue tab and a completed tab removed the tab juggling.",
      },
    ],
    order: 3,
  },
  {
    slug: "wacanan",
    title: "wacanan",
    year: "2026",
    status: "Live",
    kind: "Blog engine",
    summary: "A Laravel blog with articles, likes and an admin panel for writing.",
    repo: "WilsonCc7/wacanan",
    stack: ["Laravel", "PHP", "Blade", "Railway"],
    media: [
      {
        src: "/work/wacanan/01.webp",
        alt: "An editorial desk with printed pages",
        width: 1600,
        height: 1000,
      },
    ],
    sections: [
      {
        heading: "What it is",
        body: "A public article index with slug routes, likes, and an article page that renders from Blade templates.",
      },
      {
        heading: "The admin side",
        body: "Create, bulk import, edit and delete articles behind auth, so writing does not require a deploy.",
      },
    ],
    order: 4,
  },
];
