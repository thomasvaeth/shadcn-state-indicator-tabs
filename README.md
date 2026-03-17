# State Indicator Tabs

A shadcn/ui registry item that keeps the tabs API familiar while adding a separate indicator for each state — active and hover.

## What it includes

- A Next.js App Router showcase with live demos and install instructions
- The component source at `src/registry/animated-tabs/tabs.tsx`
- A `registry.json` definition that builds to `public/r/state-indicator-tabs.json`

## Install

```bash
pnpm dlx shadcn@latest add https://shadcn-state-indicator-tabs.vercel.app/r/state-indicator-tabs.json
```

The installed file lands as `components/ui/tabs.tsx` in the consuming app.

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

Runs `shadcn build` first, then `next build`.
