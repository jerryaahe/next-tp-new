"use client";

import { subscribeWithSelector } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { createMarketSnapshot } from "@/features/trading/lib/trading-market";

export type OrderbookLevel = {
  price: number;
  size: number;
};

export type TradingState = {
  symbol: string;
  lastPrice: number;
  priceChangePct: number;
  spreadBps: number;
  bids: OrderbookLevel[];
  asks: OrderbookLevel[];
  isDepthPanelOpen: boolean;
  isFeedLive: boolean;
};

export type TradingActions = {
  selectSymbol: (symbol: string, anchorPrice: number) => void;
  setDepthPanelOpen: (isOpen: boolean) => void;
  toggleFeed: () => void;
  applyMarketTick: (payload: {
    lastPrice: number;
    priceChangePct: number;
    spreadBps: number;
    bids: OrderbookLevel[];
    asks: OrderbookLevel[];
  }) => void;
  reset: () => void;
};

export type TradingStore = TradingState & TradingActions;

export type TradingStoreApi = ReturnType<typeof createTradingStore>;

export type TradingStoreInitState = Partial<TradingState>;

const DEFAULT_MARKET = createMarketSnapshot("BTCUSDT", 108_420, 0.84, 1.8);

const DEFAULT_STATE: TradingState = {
  symbol: "BTCUSDT",
  ...DEFAULT_MARKET,
  isDepthPanelOpen: true,
  isFeedLive: true,
};

function createInitialState(
  initState: TradingStoreInitState,
): TradingState {
  return {
    ...DEFAULT_STATE,
    ...initState,
    ...createMarketSnapshot(
      initState.symbol ?? DEFAULT_STATE.symbol,
      initState.lastPrice ?? DEFAULT_STATE.lastPrice,
      initState.priceChangePct ?? DEFAULT_STATE.priceChangePct,
      initState.spreadBps ?? DEFAULT_STATE.spreadBps,
    ),
    ...initState,
    bids:
      initState.bids ??
      createMarketSnapshot(
        initState.symbol ?? DEFAULT_STATE.symbol,
        initState.lastPrice ?? DEFAULT_STATE.lastPrice,
        initState.priceChangePct ?? DEFAULT_STATE.priceChangePct,
        initState.spreadBps ?? DEFAULT_STATE.spreadBps,
      ).bids,
    asks:
      initState.asks ??
      createMarketSnapshot(
        initState.symbol ?? DEFAULT_STATE.symbol,
        initState.lastPrice ?? DEFAULT_STATE.lastPrice,
        initState.priceChangePct ?? DEFAULT_STATE.priceChangePct,
        initState.spreadBps ?? DEFAULT_STATE.spreadBps,
      ).asks,
  };
}

export function createTradingStore(
  initState: TradingStoreInitState = {},
) {
  const initialState = createInitialState(initState);

  return createStore<TradingStore>()(
    subscribeWithSelector((set) => ({
      ...initialState,
      selectSymbol: (symbol, anchorPrice) =>
        set((state) => ({
          ...state,
          ...createMarketSnapshot(symbol, anchorPrice, 0, 1.2),
          symbol,
        })),
      setDepthPanelOpen: (isOpen) =>
        set((state) => ({
          ...state,
          isDepthPanelOpen: isOpen,
        })),
      toggleFeed: () =>
        set((state) => ({
          ...state,
          isFeedLive: !state.isFeedLive,
        })),
      applyMarketTick: (payload) =>
        set((state) => ({
          ...state,
          ...payload,
        })),
      reset: () =>
        set((state) => ({
          ...state,
          ...createInitialState(initState),
        })),
    })),
  );
}
