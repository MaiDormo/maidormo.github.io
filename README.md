# Elia Gatti — Portfolio

Personal portfolio site built with React, TypeScript, and Tailwind CSS. Deployed via GitHub Pages.

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

## Deployment

Push to `main` — GitHub Actions builds and deploys to GitHub Pages automatically.

## Configuration

Site content (projects, experience, social links, SEO) is configured in `gitprofile.config.ts`.
