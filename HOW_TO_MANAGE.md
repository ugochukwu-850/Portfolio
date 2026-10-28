# Managing this site

SvelteKit (Svelte 5) app. Every page is prerendered to static HTML at build time and deployed on
Vercel with `@sveltejs/adapter-vercel`, so server routes (an API, a dashboard) can be added later
without changing hosts.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173 with hot reload
npm run check      # type-check
npm run build      # production build into .vercel/output
npm run preview    # serve the production build
```

## Where the content lives

All copy is plain data in `src/lib/data/` — edit these files, not the page markup.

| File                                | What it holds                                         |
| ----------------------------------- | ----------------------------------------------------- |
| `src/lib/data/site.ts`              | Name, email, social links, nav items, home-page stats |
| `src/lib/data/experience.ts`        | Roles, capabilities, education, certifications        |
| `src/lib/data/projects.ts`          | Featured project, project list, open-source work      |
| `src/lib/data/mastering-backend.ts` | Articles published on Mastering Backend               |
| `src/lib/data/topics.ts`            | Topic tags used to filter articles                    |
| `src/content/articles/*.md`         | Articles hosted on this site                          |

### Add a Mastering Backend article

Add an entry at the top of `masteringBackend` in `src/lib/data/mastering-backend.ts`. The `slug` is
the part of the URL after `blog.masteringbackend.com/`; `topics` must come from `topics.ts`.

### Add an article hosted on this site

Create `src/content/articles/my-article.md`:

```md
---
title: My Article Title
date: 2026-11-01
description: One sentence shown in lists and search results.
topics: Memory, Concurrency
---

Markdown body. Code blocks are highlighted at build time.
```

It appears at `/writing/my-article` and in the writing index, sorted by date.

## Design

- Tokens (colours, fonts, spacing, easing) are CSS variables at the top of `src/app.css`.
- Font: D-DIN PRO (SIL Open Font License), self-hosted from `src/lib/assets/fonts/`.
- The space visuals (`src/lib/visuals/`) are generated SVG and CSS — no images to load.
- Animations respect `prefers-reduced-motion`.

## Deploying

Push to `main`. Vercel builds with the settings in `vercel.json` (framework: SvelteKit).
Pushes to other branches get preview URLs.
