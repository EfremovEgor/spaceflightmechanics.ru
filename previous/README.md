# Archived forum sites

Each folder is the site of one past forum, kept in its own design and served at `/previous/<slug>/`:

| Folder | URL | Source |
| --- | --- | --- |
| `scitech-2025/` | `/previous/scitech-2025/` | branch `2025` (6th SciTech Forum) |

`npm run build` in the repository root builds every folder here into `dist/previous/<slug>/` with the root
`node_modules` (no separate install) and writes an `index.html` for each route, so deep links work with the usual
`try_files $uri $uri/ /index.html` nginx rule. Changes from the original branch are only what serving from a
sub-path needs: `base`/`basepath`, public file links through `src/lib/asset.ts`, an explicit white page background,
and a one-line archive notice with a link to the current forum.

To work on an archived site locally:

```bash
npx vite --config previous/scitech-2025/vite.config.ts
```

## Archiving the current site when a new year starts

1. Copy the current site into `previous/scitech-<year>/`: `src/`, `public/`, `index.html`, `tsconfig.json`.
2. Add `vite.config.ts` like the one in `scitech-2025/` with `slug = "scitech-<year>"`.
3. Serve it from the sub-path: `basepath: import.meta.env.BASE_URL.replace(/\/$/, "")` in `createRouter`, and links to
   files in `public/` through `asset("images/…")` instead of `"/images/…"`.
4. Add the year to `src/lib/previousForums.ts` (footer links) and set its **Путь сайта** in the admin to
   `/previous/scitech-<year>/`.
5. In the admin, create the new year (**Создать следующий год**) — the new site registers at `/api/scitech<year+1>/register`.
