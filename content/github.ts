export type RepoStat = {
  name: string;
  description: string | null;
  stars: number;
  language: string | null;
  pushedAt: string;
  url: string;
  homepage: string | null;
};

export type ProfileStat = {
  login: string;
  name: string;
  bio: string;
  avatar: string;
  publicRepos: number;
  followers: number;
  stars: number;
};

export const profile: ProfileStat = {
  login: "WilsonCc7",
  name: "Wilson Anggriawan",
  bio: "Interested in how the world works. Right now, mostly watching what AI does.",
  avatar: "/github-avatar.jpg",
  publicRepos: 6,
  followers: 0,
  stars: 1,
};

export const repos: RepoStat[] = [
  {
    name: "port",
    description: "Single-file portfolio with a three.js hero.",
    stars: 0,
    language: "HTML",
    pushedAt: "2026-10-07T05:36:39Z",
    url: "https://github.com/WilsonCc7/port",
    homepage: "https://port-murex-zeta-18.vercel.app",
  },
  {
    name: "notify",
    description: "School planner with Google Classroom coursework and its own tasks.",
    stars: 0,
    language: "TypeScript",
    pushedAt: "2026-10-06T04:09:25Z",
    url: "https://github.com/WilsonCc7/notify",
    homepage: null,
  },
  {
    name: "wacanan",
    description: "Laravel blog with articles, likes and an admin panel.",
    stars: 0,
    language: "Blade",
    pushedAt: "2026-09-29T03:23:48Z",
    url: "https://github.com/WilsonCc7/wacanan",
    homepage: null,
  },
  {
    name: "Cinea",
    description: "Streaming platform with a film diary, powered by Jellyfin.",
    stars: 1,
    language: null,
    pushedAt: "2026-09-24T01:38:30Z",
    url: "https://github.com/WilsonCc7/Cinea",
    homepage: null,
  },
];

/** Formats an ISO timestamp as a short relative label. */
export function relativeTime(iso: string, now = Date.now()): string {
  const days = Math.floor((now - Date.parse(iso)) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}
