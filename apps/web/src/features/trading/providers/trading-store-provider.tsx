"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";
import {
  createTradingStore,
  type TradingStore,
  type TradingStoreApi,
  type TradingStoreInitState,
} from "@/features/trading/stores/trading-store";

const TradingStoreContext = createContext<TradingStoreApi | null>(null);

export function TradingStoreProvider({
  children,
  initialState,
}: PropsWithChildren<{
  initialState?: TradingStoreInitState;
}>) {
  const storeRef = useRef<TradingStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createTradingStore(initialState);
  }

  return (
    <TradingStoreContext.Provider value={storeRef.current}>
      {children}
    </TradingStoreContext.Provider>
  );
}

export function useTradingStore<T>(
  selector: (state: TradingStore) => T,
) {
  const store = useContext(TradingStoreContext);

  if (!store) {
    throw new Error(
      "useTradingStore must be used within TradingStoreProvider",
    );
  }

  return useStore(store, selector);
}

export function useTradingStoreApi() {
  const store = useContext(TradingStoreContext);

  if (!store) {
    throw new Error(
      "useTradingStoreApi must be used within TradingStoreProvider",
    );
  }

  return store;
}
