"use client";

import { useEffect } from "react";
import {
  useTradingStore,
  useTradingStoreApi,
} from "@/features/trading/providers/trading-store-provider";
import {
  createMarketSnapshot,
  SYMBOL_BASE_PRICES,
} from "@/features/trading/lib/trading-market";

export function TradingRealtimeBridge() {
  const store = useTradingStoreApi();
  const symbol = useTradingStore((state) => state.symbol);
  const isFeedLive = useTradingStore((state) => state.isFeedLive);

  useEffect(() => {
    if (!isFeedLive) return;

    let tick = 0;

    const interval = window.setInterval(() => {
      tick += 1;

      const current = store.getState();
      const baseline =
        SYMBOL_BASE_PRICES[current.symbol] ?? current.lastPrice;
      const drift = Math.sin(tick / 2) * baseline * 0.0016;
      const microMove = Math.cos(tick / 3) * baseline * 0.0005;
      const nextPrice = baseline + drift + microMove;
      const priceChangePct = ((nextPrice - baseline) / baseline) * 100;
      const spreadBps = 1.2 + Math.abs(Math.sin(tick / 4)) * 3.8;

      current.applyMarketTick({
        ...createMarketSnapshot(
          current.symbol,
          nextPrice,
          priceChangePct,
          spreadBps,
        ),
      });
    }, 1200);

    return () => {
      window.clearInterval(interval);
    };
  }, [isFeedLive, store, symbol]);

  return null;
}
