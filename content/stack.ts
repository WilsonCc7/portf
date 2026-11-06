import {
  siCloudflare,
  siDrizzle,
  siFramer,
  siLaravel,
  siNextdotjs,
  siPhp,
  siPostgresql,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";

export const stack: { name: string; path: string }[] = [
  { name: siNextdotjs.title, path: siNextdotjs.path },
  { name: siTypescript.title, path: siTypescript.path },
  { name: siTailwindcss.title, path: siTailwindcss.path },
  // Motion has no Simple Icons mark, so use Framer's closest real icon path.
  { name: siFramer.title, path: siFramer.path },
  { name: siLaravel.title, path: siLaravel.path },
  { name: siPhp.title, path: siPhp.path },
  { name: siPostgresql.title, path: siPostgresql.path },
  { name: siDrizzle.title, path: siDrizzle.path },
  { name: siCloudflare.title, path: siCloudflare.path },
  { name: siVercel.title, path: siVercel.path },
];

export const stackLead = "The tools behind the projects above.";
