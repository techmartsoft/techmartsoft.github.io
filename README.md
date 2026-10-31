# Next.js Portfolio Starter

A responsive creative portfolio starter built with:

- Next.js App Router + TypeScript
- Tailwind CSS v4
- shadcn/ui configuration and a reusable Button primitive
- Lucide React icons
- GSAP + ScrollTrigger
- Light/dark theme toggle powered by `next-themes`
- Mobile navigation and responsive project grid

## Requirements

- Node.js 20.9+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build
npm start
```

## Customize the portfolio

- Edit project data, services, and copy in `src/components/portfolio.tsx`.
- Replace the placeholder name, social links, and `hello@example.com`.
- Project visuals are CSS-built mockups in `src/app/globals.css` and the project card markup.
- Adjust colors for light and dark modes in `src/app/globals.css`.

## Add more shadcn/ui components

`components.json` is included. Install more primitives using the CLI:

```bash
npx shadcn@latest add card dialog dropdown-menu input
```

## GSAP notes

The portfolio uses `gsap.context()` for scoped animation cleanup, plus ScrollTrigger for reveal and scrubbed project effects. It respects `prefers-reduced-motion`.
