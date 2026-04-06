# Docs Index

This directory contains project-specific technical guides.
Use these documents for implementation details, architecture conventions, and framework patterns used in this repository.

`CLAUDE.md` is the lightweight entrypoint.
`docs/` is the deeper knowledge base.

## Zustand Guides

- `zustand-nextjs.md`: Next.js App Router + Zustand v5 usage, Store Provider pattern, selector guidance, migration notes
- `zustand-middleware-patterns.md`: `persist`, SSR hydration, `immer`, `devtools`, middleware ordering
- `zustand-realtime-performance.md`: real-time updates, buffering, rendering optimization, high-frequency state patterns
- `zustand-multi-store-patterns.md`: multi-store boundaries, store communication, slices, reset and recovery patterns

## Writing Rule

Add detailed project guidance here when:

- the rule is too long for `CLAUDE.md`
- the topic needs examples or tradeoff discussion
- the content is project-specific rather than a reusable external skill
