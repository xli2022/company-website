# Site source

The pages at the repo root (`index.html`, `games.html`, `jobs.html`, `contact.html`, and `index.html` in
`rich-revenge/`, `realm-defense/`, `draft-wars/`) are thin shells. Each one sets `window.BT_PAGE` and loads the same
compiled files from `/site`.

- `src/site.jsx` — all components and pages (React 18, no bundler imports; React is a global).
- `src/site.css` — design tokens and the few global rules.
- `site/app.js`, `site/site.css` — compiled from the two files above. Do not edit by hand.
- `site/media/` — images and the hero film.

After editing `src/`, rebuild with esbuild:

    npx esbuild src/site.jsx --loader:.jsx=jsx --jsx=transform --minify --target=es2018 --format=iife --legal-comments=none --outfile=site/app.js
    npx esbuild src/site.css --minify --outfile=site/site.css

The policy, support and install pages under `realm-defense/` and `draft-wars/` are the original pages and still use
the files in `/assets`.
