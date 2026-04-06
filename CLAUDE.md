# NEXT-TP

Monorepo: Turborepo + pnpm workspace + Next.js 16 App Router + TypeScript + React 19

## Purpose

This file is the project entrypoint for working conventions.
Use it for quick rules, architectural boundaries, and links to deeper documents.
Detailed framework patterns live in `docs/`, which acts as the project knowledge base rather than a reusable skill folder.

## Commands

```bash
pnpm dev          # Start all apps
pnpm build        # Production build
pnpm lint         # Biome lint
pnpm --filter=storybook test  # Run Storybook app tests
pnpm typecheck    # TypeScript check
```

## Project Structure

```
apps/              # Applications and tooling apps
packages/          # Shared packages (UI, utils, config)
docs/              # Project-specific technical standards and reference guides
```

## Core Rules

### State Management

- Zustand: always use `createStore` from `zustand/vanilla` plus a Context Provider; do not create module-level global stores with `create()`
- Use TanStack Query for server data and Zustand for client-side UI state; do not mix their responsibilities
- Export store factory functions, not store instances

### Components

- Components should be Server Components by default; add `'use client'` only when hooks, stores, or browser APIs are required
- Server Components must not read from or write to Zustand stores

### Code Style

- Use TypeScript strict mode and avoid `any`
- Prefer named exports
- Let Biome handle linting and formatting; do not manually maintain style rules

## How To Use This File

- Read the core rules here before implementing anything
- When you need details about Zustand, SSR, hydration, performance, or multi-store patterns, go to the topic docs in `docs/`
- Keep `CLAUDE.md` lightweight; new detailed guidance should usually go into `docs/`, while this file stays as a summary and index

## Reference Documents

Use the following references for implementation details instead of relying on memory:

- **Zustand + Next.js**: @docs/zustand-nextjs.md — Store + Provider templates, selector guidance, migration notes
- **Zustand Middleware**: @docs/zustand-middleware-patterns.md — `persist`, SSR hydration, `immer`, `devtools`
- **Real-Time Performance**: @docs/zustand-realtime-performance.md — WebSocket integration, order-book optimization, transient updates
- **Multi-Store Patterns**: @docs/zustand-multi-store-patterns.md — slices, cross-store communication, error recovery
