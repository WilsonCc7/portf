# portf

Portfolio for Wilson Anggriawan, live at [port.wilsb.me](https://port.wilsb.me).

Next.js 16 App Router, Tailwind v4, Motion. All copy, projects and stack are typed data under `content/`; the GitHub section reads `content/github.ts` and never calls the API at runtime.

The CV section previews `public/cv/wilson-anggriawan-cv.pdf` in a native dialog and links the same file with `download`. Replace that file to update the CV; its path lives in `content/cv.ts`.

```bash
pnpm install
pnpm dev
```

Deployed on Vercel from `main`.
