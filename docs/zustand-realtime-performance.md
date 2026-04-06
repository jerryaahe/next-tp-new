# Zustand Real-Time Performance: WebSockets, Order Books, and Transient Updates

## WebSocket + Store Integration

Design principle: keep WebSocket connection management independent from React and bridge into `TradingStore` through store actions or `store.setState()`.

Use this boundary:

- direct `store.setState()` is acceptable for high-frequency, low-level data bridges
- prefer store actions when validation, normalization, analytics, or named devtools actions matter
- if you need selector-based subscriptions for `price` or `orderbook`, wire the store with `subscribeWithSelector`

## `WSManager` Outside React

```typescript
// src/lib/ws-manager.ts
type MessageHandler = (data: unknown) => void

export class WSManager {
  private ws: WebSocket | null = null
  private handlers = new Map<string, Set<MessageHandler>>()
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null
  private reconnectAttempts = 0

  constructor(
    private url: string,
    private maxReconnects = 10,
  ) {}

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return

    this.ws = new WebSocket(this.url)

    this.ws.onopen = () => {
      this.reconnectAttempts = 0
      for (const ch of this.handlers.keys()) {
        this.send({ action: 'subscribe', channel: ch })
      }
    }

    this.ws.onmessage = (e) => {
      try {
        const message = JSON.parse(e.data) as { channel: string; data: unknown }
        this.handlers.get(message.channel)?.forEach((fn) => fn(message.data))
      } catch {
        // Ignore malformed messages.
      }
    }

    this.ws.onclose = () => this.scheduleReconnect()
    this.ws.onerror = () => this.ws?.close()
  }

  subscribe(channel: string, handler: MessageHandler): () => void {
    if (!this.handlers.has(channel)) {
      this.handlers.set(channel, new Set())
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send({ action: 'subscribe', channel })
      }
    }

    this.handlers.get(channel)!.add(handler)

    return () => {
      this.handlers.get(channel)?.delete(handler)
      if (this.handlers.get(channel)?.size === 0) {
        this.handlers.delete(channel)
        this.send({ action: 'unsubscribe', channel })
      }
    }
  }

  private send(data: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnects) return

    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts += 1
      this.connect()
    }, Math.min(1000 * 2 ** this.reconnectAttempts, 30_000))
  }

  disconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer)
    this.ws?.close()
    this.ws = null
  }
}
```

## `TradingStoreProvider` Bridge

```typescript
import { useEffect } from 'react'
import { useTradingStoreApi } from '@/components/providers/trading-store-provider'
import { WSManager } from '@/lib/ws-manager'

export function TradingRealtimeBridge({
  wsUrl,
  symbol,
}: {
  wsUrl: string
  symbol: string
}) {
  const store = useTradingStoreApi()

  useEffect(() => {
    const ws = new WSManager(wsUrl)
    ws.connect()

    const unsubOrderbook = ws.subscribe(`orderbook:${symbol}`, (data) => {
      const { bids, asks } = data as {
        bids: [number, number][]
        asks: [number, number][]
      }

      store.setState((s) => ({
        ...s,
        bids,
        asks,
      }))
    })

    const unsubTicker = ws.subscribe(`ticker:${symbol}`, (data) => {
      store.getState().setLastPrice((data as { lastPrice: number }).lastPrice)
    })

    return () => {
      unsubOrderbook()
      unsubTicker()
      ws.disconnect()
    }
  }, [store, wsUrl, symbol])

  return null
}
```

Direct `store.setState()` is reasonable for high-frequency bridge code, but ordinary business updates should still prefer store actions.

## Performance Decision Tree

```text
How often does the state update?
├── <1 time/sec   -> regular useStore selectors + React rendering
├── 1-10 times/sec -> buffered updates + useShallow + virtualization
└── >10 times/sec -> transient updates (subscribe + useRef + imperative DOM updates)
```

## Transient Updates: Bypassing React

```typescript
import { useEffect, useRef } from 'react'

export function TickerPrice({ storeApi }: { storeApi: TradingStoreApi }) {
  const priceRef = useRef<HTMLSpanElement>(null)
  const prevRef = useRef(0)

  useEffect(() => {
    const unsub = storeApi.subscribe(
      (state) => state.lastPrice,
      (price) => {
        if (!priceRef.current) return

        priceRef.current.textContent = price.toFixed(2)
        priceRef.current.className =
          price > prevRef.current ? 'text-green-500' : 'text-red-500'
        prevRef.current = price
      },
    )

    return unsub
  }, [storeApi])

  return <span ref={priceRef}>--</span>
}
```

Use this sparingly. It is useful for ticker cells, order-book flashes, and similar ultra-hot UI paths, but it should not become the default rendering model.

## Order Book Buffering

```typescript
// src/lib/orderbook-buffer.ts
export class OrderbookBuffer {
  private bids = new Map<number, number>()
  private asks = new Map<number, number>()
  private timer: ReturnType<typeof setTimeout> | null = null

  constructor(
    private onFlush: (data: { bids: [number, number][]; asks: [number, number][] }) => void,
    private interval = 100,
  ) {}

  push(bids: [number, number][], asks: [number, number][]) {
    for (const [p, q] of bids) {
      if (q === 0) this.bids.delete(p)
      else this.bids.set(p, q)
    }

    for (const [p, q] of asks) {
      if (q === 0) this.asks.delete(p)
      else this.asks.set(p, q)
    }

    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.onFlush({
          bids: [...this.bids.entries()].sort((a, b) => b[0] - a[0]),
          asks: [...this.asks.entries()].sort((a, b) => a[0] - b[0]),
        })
        this.timer = null
      }, this.interval)
    }
  }

  destroy() {
    if (this.timer) clearTimeout(this.timer)
  }
}

const buffer = new OrderbookBuffer((update) => {
  store.setState((s) => ({
    ...s,
    bids: update.bids.slice(0, 20),
    asks: update.asks.slice(0, 20),
  }))
})

ws.subscribe(`orderbook:${symbol}`, (data) => {
  buffer.push(data.bids, data.asks)
})
```

## Virtualized Rendering

For deep books or large real-time tables, pair this with `@tanstack/react-virtual` so only visible rows render. Combine that with stable selectors or `useShallow`.

## Selector Guidelines

```typescript
import { useShallow } from 'zustand/shallow'

// Avoid: creates a fresh object each time.
const data = useStore((s) => ({ a: s.a, b: s.b }))

// Good: shallow comparison for grouped fields.
const { a, b } = useStore(useShallow((s) => ({ a: s.a, b: s.b })))

// Good: derived scalar.
const hasOrders = useStore((s) => s.orders.length > 0)

// Avoid: expensive selector work.
// Prefer selector + useMemo when computation is heavy.
```
