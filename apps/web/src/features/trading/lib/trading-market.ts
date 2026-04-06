import type { OrderbookLevel } from "@/features/trading/stores/trading-store";

export const SYMBOL_BASE_PRICES: Record<string, number> = {
  BTCUSDT: 108_420,
  ETHUSDT: 5_240,
  SOLUSDT: 182.4,
};

export type MarketSnapshot = {
  lastPrice: number;
  priceChangePct: number;
  spreadBps: number;
  bids: OrderbookLevel[];
  asks: OrderbookLevel[];
};

function buildLevels(anchor: number, direction: 1 | -1): OrderbookLevel[] {
  return Array.from({ length: 6 }, (_, index) => {
    const distance = 0.0012 * (index + 1);
    const price =
      direction === 1 ? anchor * (1 - distance) : anchor * (1 + distance);
    const size = 0.35 + (index + 1) * 0.18;

    return {
      price,
      size,
    };
  });
}

export function createMarketSnapshot(
  symbol: string,
  lastPrice = SYMBOL_BASE_PRICES[symbol] ?? 1_000,
  priceChangePct = 0.84,
  spreadBps = 1.8,
): MarketSnapshot {
  return {
    lastPrice,
    priceChangePct,
    spreadBps,
    bids: buildLevels(lastPrice, 1),
    asks: buildLevels(lastPrice, -1),
  };
}
