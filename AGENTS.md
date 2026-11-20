# Notes for agents working on this repository

These apply to every automated agent and assistant (Claude, Codex, Auto-fix sessions, review bots) as well as to people.

## Do not change the design without the designer's approval

The look of this site is owned by the designer (GitHub: NiZhen001). Fix what a review comment asks for in the code, but
do not alter how the site looks on your own initiative: type styling, shadows, glows, outlines, overlays, colours,
layout, spacing, motion or artwork. If you think a visual change is needed, say so in a PR comment and wait for the
designer's explicit go-ahead. Do not push it.

## The hero film titles are final

The white game titles and taglines over the home page's hero film (`Hero` in `src/site.jsx`) keep the light text shadow
they have now.

- No shade, gradient or overlay on the film.
- No heavier glow and no outline round the titles or taglines.
- Lower contrast on the film's pale frames is a trade-off the designer has accepted. Do not "fix" it, and do not report
  it as a finding again.

Two attempts to change this (a shade in PR #1, a glow and outline in commit 1077bf8) were rejected and reverted.

## Building

See `src/README.md`. `site/app.js` and `site/site.css` are compiled from `src/`; do not edit them by hand.
