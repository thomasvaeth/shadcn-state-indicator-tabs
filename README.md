# Animated Tabs Registry

This repo is now a Next.js showcase site that ships the tabs as a shadcn registry item instead of an npm package.

## What it includes

- A Next.js App Router landing page with a live tabs demo
- A shadcn registry source file at `src/registry/animated-tabs/tabs.tsx`
- A `registry.json` definition that builds to `public/r/animated-tabs.json`
- Tailwind CSS v4 styling and install instructions for `shadcn add`

## Local development

```bash
pnpm install
pnpm dev
```

The dev script rebuilds the registry output before starting Next.

## Build

```bash
pnpm build
```

This runs `shadcn build` first, then `next build`.

## Production start

```bash
pnpm start
```

This runs the build first, then starts the production server.

## Registry output

- Source definition: `registry.json`
- Generated files: `public/r/*.json`
- Install URL in local development: `http://localhost:3000/r/animated-tabs.json`

## Install command for consumers

```bash
pnpm dlx shadcn@latest add https://your-domain.com/r/animated-tabs.json
```

The installed file lands as `components/ui/tabs.tsx` in the consuming app.
