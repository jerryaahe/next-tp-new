# Zustand Multi-Store Patterns: Slices, Cross-Store Communication, and Error Recovery

These examples follow the repository's suggested structure and continue using `TradingStore` as the primary business store:

- stores live in `src/stores/`
- bridge components live in `src/components/providers/` or inside a nearby feature provider
- if you rely on `store.subscribe(selector, listener)`, the store must include `subscribeWithSelector`

## Slice Composition

```typescript
// src/stores/slices/orderbook-slice.ts
import type { StateCreator } from 'zustand'
import type { TradingStore } from '../trading-store'

export type OrderbookSlice = {
  bids: [number, number][]
  asks: [number, number][]
  updateOrderbook: (bids: [number, number][], asks: [number, number][]) => void
}

export const createOrderbookSlice: StateCreator<
  TradingStore,
  [['zustand/immer', never]],
  [],
  OrderbookSlice
> = (set) => ({
  bids: [],
  asks: [],
  updateOrderbook: (bids, asks) =>
    set((s) => {
      s.bids = bids
      s.asks = asks
    }),
})

// src/stores/trading-store.ts
export type TradingStore = OrderbookSlice & PositionSlice

export const createTradingStore = () =>
  createStore<TradingStore>()(
    devtools(
      subscribeWithSelector(
        immer((...args) => ({
          ...createOrderbookSlice(...args),
          ...createPositionSlice(...args),
        })),
      ),
      { name: 'TradingStore' },
    ),
  )
```

Slices work well when several subdomains belong to one lifecycle boundary and should reset together. If two domains have independent lifetimes, separate stores are often cleaner.

## Cross-Store Communication

### Option 1: Subscribe Bridge Component

Use this when one store should react to another store's updates.

```typescript
// src/components/providers/store-sync.tsx
'use client'

import { useEffect } from 'react'

export function StoreSync() {
  const tradingStore = useTradingStoreApi()
  const positionStore = usePositionStoreApi()

  useEffect(() => {
    const unsub = tradingStore.subscribe(
      (state) => state.lastPrice,
      (lastPrice) => {
        const positions = positionStore.getState().positions

        for (const pos of positions) {
          const pnl =
            (lastPrice - pos.entryPrice) * pos.size * (pos.side === 'long' ? 1 : -1)

          positionStore.getState().updatePositionPnl(pos.id, pnl)
        }
      },
    )

    return unsub
  }, [tradingStore, positionStore])

  return null
}

// In a layout or feature boundary
<TradingStoreProvider>
  <PositionStoreProvider>
    <StoreSync />
    {children}
  </PositionStoreProvider>
</TradingStoreProvider>
```

### Option 2: Composite Hook for Read-Only Derived State

Use this when a component only needs a derived view across multiple stores.

```typescript
export function usePositionPnl(positionId: string) {
  const lastPrice = useTradingStore((s) => s.lastPrice)
  const position = usePositionStore((s) =>
    s.positions.find((p) => p.id === positionId),
  )

  return useMemo(() => {
    if (!position) return null

    const pnl = (lastPrice - position.entryPrice) * position.size

    return {
      pnl,
      pnlPercent: (pnl / (position.entryPrice * position.size)) * 100,
    }
  }, [lastPrice, position])
}
```

### Option 3: External Service Function for Rich Business Flows

Use this when the operation is cross-cutting, async, and business-heavy.

```typescript
export async function closePosition(
  tradingStore: TradingStoreApi,
  positionStore: PositionStoreApi,
  positionId: string,
) {
  const position = positionStore.getState().positions.find((p) => p.id === positionId)
  if (!position) throw new Error('Position not found')

  await api.closePosition(positionId, tradingStore.getState().lastPrice)
  positionStore.getState().removePosition(positionId)
}
```

### Selection Guide

| Scenario | Recommended Pattern |
|------|------|
| `TradingStore` updates should write into `PositionStore` | Subscribe bridge component |
| A component needs a read-only derived view across stores | Composite hook + `useMemo` |
| A complex cross-store business flow | External service function |

## Error Boundaries and Store Reset

### `reset()` Pattern

```typescript
const initialState = { ...defaultState, ...initState }

return createStore<T>()((set) => ({
  ...initialState,
  reset: () => set(defaultState),
}))
```

If you need to reset back to request-injected initial values, rebuild the full state shape explicitly, including actions, rather than calling `set(initialState, true)`.

### Error Boundary

```typescript
'use client'

import { Component, type ReactNode } from 'react'

export class StoreErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; onReset?: () => void },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('[StoreErrorBoundary]', error)
  }

  handleReset = () => {
    this.props.onReset?.()
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          {this.props.fallback}
          <button onClick={this.handleReset}>Retry</button>
        </div>
      )
    }

    return this.props.children
  }
}
```

Example composition:

```typescript
<TradingStoreProvider onStoreReady={(store) => {
  resetRef.current = () => store.getState().reset()
}}>
  <StoreErrorBoundary
    fallback={<div>Trading module failed.</div>}
    onReset={() => resetRef.current?.()}
  >
    {children}
  </StoreErrorBoundary>
</TradingStoreProvider>
```

### Automatic Invalid-State Recovery

```typescript
useEffect(() => {
  const unsub = store.subscribe((state) => {
    if (state.lastPrice < 0) {
      store.getState().setError('Invalid market data')
      store.getState().reset()
    }
  })

  return unsub
}, [])
```

This should be reserved for truly invalid state, not normal business errors. Otherwise the store becomes too eager to reset and the UI becomes harder to reason about.
