# Zustand v5 + Next.js App Router Best Practices

> Zustand v5.0.x | Next.js 16 App Router | React 19 | TypeScript 5+

## Three Rules

1. **No global stores**: use `createStore` from `zustand/vanilla` plus a Context Provider to create stores per request or per layout boundary.
2. **Keep stores out of RSCs**: Server Components should not read from or write to Zustand stores. Stores should only live in `'use client'` components.
3. **Be routing-aware**: provider placement controls store lifetime and reset behavior.

Exception cases must satisfy all of the following:

- initial state does not depend on the server
- usage is limited to `'use client'` components
- no user-sensitive data is stored
- the module is protected with `import 'client-only'`

Use repository-aligned paths in examples:

- stores live in `src/stores/`
- providers live in `src/components/providers/`
- layouts stay in `src/app/`

## Store + Provider + Hook Template

### Store Definition

```typescript
// src/stores/trading-store.ts
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createStore } from 'zustand/vanilla'

export type TradingState = {
  symbol: string
  lastPrice: number
  bids: [number, number][]
  asks: [number, number][]
  isPanelOpen: boolean
  isLoading: boolean
  error: string | null
}

export type TradingActions = {
  setSymbol: (symbol: string) => void
  setPanelOpen: (isOpen: boolean) => void
  setLastPrice: (price: number) => void
  fetchPairs: () => Promise<void>
  reset: () => void
}

export type TradingStore = TradingState & TradingActions

const defaultState: TradingState = {
  symbol: 'BTCUSDT',
  lastPrice: 0,
  bids: [],
  asks: [],
  isPanelOpen: false,
  isLoading: false,
  error: null,
}

export const createTradingStore = (initState: Partial<TradingState> = {}) => {
  const initialState = { ...defaultState, ...initState }

  return createStore<TradingStore>()(
    devtools(
      subscribeWithSelector(
        immer((set, get) => ({
          ...initialState,
          setSymbol: (symbol) =>
            set((s) => {
              s.symbol = symbol
            }),
          setPanelOpen: (isOpen) =>
            set((s) => {
              s.isPanelOpen = isOpen
            }),
          setLastPrice: (price) =>
            set((s) => {
              s.lastPrice = price
            }),
          fetchPairs: async () => {
            if (get().isLoading) return

            set((s) => {
              s.isLoading = true
              s.error = null
            })

            try {
              const res = await fetch('/api/market/pairs')
              if (!res.ok) throw new Error(`HTTP ${res.status}`)

              const data = (await res.json()) as { pairs: string[] }
              const nextSymbol = data.pairs[0] ?? defaultState.symbol

              set((s) => {
                s.symbol = nextSymbol
                s.isLoading = false
              })
            } catch (err) {
              set((s) => {
                s.error = err instanceof Error ? err.message : 'Unknown error'
                s.isLoading = false
              })
            }
          },
          reset: () =>
            set((s) => {
              s.symbol = initialState.symbol
              s.lastPrice = initialState.lastPrice
              s.bids = initialState.bids
              s.asks = initialState.asks
              s.isPanelOpen = initialState.isPanelOpen
              s.isLoading = false
              s.error = null
            }),
        })),
      ),
      { name: 'TradingStore' },
    ),
  )
}
```

Key points:

- `createStore` from `zustand/vanilla` returns a plain store API, not a React hook
- `create` from `zustand` creates a module-level singleton hook, which is unsafe for SSR-sensitive state
- export factory functions, not store instances
- a common middleware order is `devtools -> subscribeWithSelector -> immer -> core`
- expose a `reset()` action on each store
- do not call `set(initialState, true)` when `initialState` only contains data, because that replaces actions as well

### Provider

```typescript
// src/components/providers/trading-store-provider.tsx
'use client'

import { createContext, type ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'
import {
  createTradingStore,
  type TradingState,
  type TradingStore,
} from '@/stores/trading-store'

type TradingStoreApi = ReturnType<typeof createTradingStore>

const TradingStoreContext = createContext<TradingStoreApi | undefined>(undefined)

export function TradingStoreProvider({
  children,
  initialState,
}: {
  children: ReactNode
  initialState?: Partial<TradingState>
}) {
  const storeRef = useRef<TradingStoreApi | null>(null)
  if (storeRef.current === null) storeRef.current = createTradingStore(initialState)

  return (
    <TradingStoreContext.Provider value={storeRef.current}>
      {children}
    </TradingStoreContext.Provider>
  )
}

export function useTradingStore<T>(selector: (state: TradingStore) => T): T {
  const store = useContext(TradingStoreContext)
  if (!store) throw new Error('useTradingStore must be used within TradingStoreProvider')

  return useStore(store, selector)
}

export function useTradingStoreApi() {
  const store = useContext(TradingStoreContext)
  if (!store) throw new Error('useTradingStoreApi must be used within TradingStoreProvider')

  return store
}
```

### Layout Placement

```typescript
// src/app/(trading)/layout.tsx
import { TradingStoreProvider } from '@/components/providers/trading-store-provider'

export default async function TradingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const prefs = await fetchUserPreferences()

  return (
    <TradingStoreProvider initialState={{ symbol: prefs.defaultPair }}>
      {children}
    </TradingStoreProvider>
  )
}
```

Prefer route-scoped or feature-scoped providers over mounting everything in the root layout. Put the provider in `src/app/layout.tsx` only when the state is truly app-wide.

## Component Consumption

```typescript
'use client'

import { useShallow } from 'zustand/shallow'

// Good: atomic selectors
const symbol = useTradingStore((s) => s.symbol)
const isPanelOpen = useTradingStore((s) => s.isPanelOpen)
const setPanelOpen = useTradingStore((s) => s.setPanelOpen)

// Good: multiple fields with useShallow
const { symbol, lastPrice } = useTradingStore(
  useShallow((s) => ({ symbol: s.symbol, lastPrice: s.lastPrice })),
)

// Avoid: selecting the whole store object
const { symbol, setPanelOpen, lastPrice } = useTradingStore((s) => s)
```

## Async Actions

Async actions fit well inside `TradingStore` when handling page-level UI state, loading state, and error state. High-frequency real-time updates are usually better handled in the bridge layer described in `@docs/zustand-realtime-performance.md`.

## TanStack Query Coordination

Use TanStack Query for server data and Zustand for client-side UI state. Avoid using Zustand as an API response cache.

## Experimental: `unstable_ssrSafe` (v5.0.9+)

```typescript
// Experimental only. Prefer createStore + Provider in production.
import { unstable_ssrSafe } from 'zustand/middleware'
import { create } from 'zustand'

export const useCounterStore = create(
  unstable_ssrSafe((set) => ({
    count: 0,
    increment: () =>
      set((s) => ({
        count: s.count + 1,
      })),
  })),
)
```

## Common Failure Modes

| Problem | Fix |
|------|------|
| Hydration mismatch | Use `skipHydration` plus `useEffect` rehydration. See `@docs/zustand-middleware-patterns.md`. |
| Cross-request data leakage | Replace global `create()` stores with `createStore()` plus a Provider. |
| Hooks used in an RSC | Mark the component with `'use client'`. |
| Excessive rerenders | Use atomic selectors or `useShallow`. |
| State not resetting on navigation | Move the provider down to the route layout boundary. |
| WebSocket-driven rerender pressure | Use buffering or transient updates. See `@docs/zustand-realtime-performance.md`. |
| Cross-store inconsistency | Use `subscribeWithSelector` plus a bridge component. See `@docs/zustand-multi-store-patterns.md`. |
| Broken state after an error | Use `reset()` plus an error boundary. See `@docs/zustand-multi-store-patterns.md`. |

## Migration Checklist

**v4 -> v5**: React >= 18, TS >= 4.5, `shallow` -> `useShallow`, remove `use-sync-external-store`  
**global -> per-request**: `create` -> `createStore` factory -> Context + Provider + Hook -> layout-based mounting
