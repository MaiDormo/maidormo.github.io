# Elia Gatti — Portfolio

Personal site at [maidormo.github.io](https://maidormo.github.io). React, TypeScript, Tailwind CSS 4, deployed to GitHub Pages.

## Design

A light "technical editorial" layout: paper ground, ink text, one orange accent, serif display type over mono data. The design tokens (palette, type scale, section spacing) are the `@theme` block in `src/assets/index.css`; components compose those tokens and do not hardcode colours. Shared class recipes (links, pills, tags) live in `src/lib/styles.ts`.

- **Display**: Instrument Serif · **Body**: Plus Jakarta Sans · **Data**: JetBrains Mono (all self-hosted via `@fontsource`)
- **Hero figure**: a deterministic sparse matrix drawn to canvas (`src/lib/sparsity.ts`, `src/components/ui/SparsityFigure.tsx`).
- **Work figure**: a KAIROS segment timeline (`src/components/ui/SegmentTimeline.tsx`) drawn from `src/data/kairosFootball.ts`, a verbatim copy of the football sample the public demo at kairosapp.tech serves. `public/kairos-mark.png` is the product's public mark.
- **Motion**: scroll reveal with hairlines that draw in (`src/lib/reveal.ts`); everything respects `prefers-reduced-motion`.
- **Keyboard**: `/` or `⌘K` opens a command palette to jump, open links, or copy the email.

## Tech Stack

- **Framework**: React 19 + TypeScript 5.8
- **Build**: Vite 7
- **Styling**: Tailwind CSS 4
- **PWA**: vite-plugin-pwa + Workbox
- **Package Manager**: Bun

## Development

```bash
bun install
bun run dev        # Start dev server
bun run build      # Type-check + production build
bun run preview    # Preview production build
```

## Linting & Formatting

```bash
bun run lint       # ESLint
bun run prettier   # Prettier check
```

## Content

Everything on the page (roles, projects, hackathons, education, skills, social links, SEO copy) is configured in `gitprofile.config.ts`. The CV is `public/elia_gatti_cv.pdf`; replace the file to update the download.

## Logos

`public/logos/*.png` are monochrome ink renderings of third-party marks, shown small next to the organisation they identify: Bitmovin (from the KAIROS repo's white wordmark, inverted), Dedagroup (deda.com footer SVG, recoloured), EuroTech Universities Alliance (their 15-years lockup, inverted), University of Trento (the logo file on English Wikipedia, which is marked non-free fair use there). They are used for identification only; replace or remove any on request from the owner.

## Icons and OG image

`public/favicon*.png`, `favicon.ico`, `apple-touch-icon.png`, and `logo.png` are rendered from a single SVG (a 4×4 sparsity pattern spelling an E) with `rsvg-convert` and ImageMagick. `public/og.png` is a 1200×630 screenshot of a small HTML page using the same fonts, rendered with headless Chrome. Both sources are throwaway; regenerate by re-creating them from the description above if the palette changes.

## Deployment

Push to `main` — GitHub Actions builds and deploys to GitHub Pages automatically.
