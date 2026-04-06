# Zustand Middleware Patterns: `persist`, SSR, `immer`, and `devtools`

These examples assume vanilla stores in `src/stores/`. If you need selector-based subscriptions inside providers or bridge components, include `subscribeWithSelector`. This document uses `settings-store`, which complements the `trading-store` used elsewhere: one owns persisted preferences, the other owns trading-page UI and real-time state.

## Recommended Middleware Order

A common order is:

`devtools -> subscribeWithSelector -> immer -> persist -> core`

`devtools` typically sits outermost so it can observe the original `setState` flow. If you place it too deep, debugging output becomes less useful.

## `persist` + SSR Hydration

### Option A: `skipHydration` + Manual Rehydration

```typescript
// src/stores/settings-store.ts
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

type SettingsStore = {
  theme: 'light' | 'dark'
  locale: string
  setTheme: (theme: 'light' | 'dark') => void
  setLocale: (locale: string) => void
}

export const createSettingsStore = () =>
  createStore<SettingsStore>()(
    subscribeWithSelector(
      persist(
        (set) => ({
          theme: 'light' as const,
          locale: 'en',
          setTheme: (theme) => set({ theme }),
          setLocale: (locale) => set({ locale }),
        }),
        {
          name: 'settings-storage',
          storage: createJSONStorage(() => localStorage),
          skipHydration: true,
        },
      ),
    ),
  )

// src/components/providers/settings-store-provider.tsx
'use client'

import { createContext, type ReactNode, useEffect, useRef } from 'react'

type SettingsStoreApi = ReturnType<typeof createSettingsStore>

const SettingsStoreContext = createContext<SettingsStoreApi | undefined>(undefined)

export function SettingsStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<SettingsStoreApi | null>(null)
  if (storeRef.current === null) storeRef.current = createSettingsStore()

  useEffect(() => {
    storeRef.current?.persist.rehydrate()
  }, [])

  return (
    <SettingsStoreContext.Provider value={storeRef.current}>
      {children}
    </SettingsStoreContext.Provider>
  )
}
```

### Option B: Mounted Guard

```typescript
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) return <Fallback />
return <RealContent />
```

This keeps SSR output and the first client render aligned.

### `partialize`: Persist Only What Matters

```typescript
persist(storeCreator, {
  name: 'settings-storage',
  partialize: (state) => ({
    theme: state.theme,
    locale: state.locale,
  }),
  // Do not persist loading, error, or WS runtime fields.
})
```

## `immer`

Use `immer` when nested state updates are common. Flat state often does not need it.

```typescript
set((state) => {
  state.user.name = newName
  state.nested.deep.value = 42
})
```

## `devtools`

```typescript
devtools(innerMiddleware, {
  name: 'SettingsStore',
  enabled: process.env.NODE_ENV === 'development',
})

set(
  (s) => {
    s.count += 1
  },
  false,
  'increment',
)
```

If the store later relies on `store.subscribe(selector, listener)`, include `subscribeWithSelector`. Without it, only whole-store subscriptions are supported.
