"use client";

import { Button } from "@workspace/ui/components";
import { useShallow } from "zustand/shallow";
import { TradingRealtimeBridge } from "@/features/trading/components/trading-realtime-bridge";
import { useTradingStore } from "@/features/trading/providers/trading-store-provider";

const SYMBOL_OPTIONS = [
  { symbol: "BTCUSDT", anchorPrice: 108_420 },
  { symbol: "ETHUSDT", anchorPrice: 5_240 },
  { symbol: "SOLUSDT", anchorPrice: 182.4 },
] as const;

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: value >= 1000 ? 2 : 4,
    minimumFractionDigits: value >= 1000 ? 2 : 4,
  }).format(value);
}

function formatMetricPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
}

function formatSignedPercent(value: number) {
  const formatted = Math.abs(value).toFixed(2);
  return `${value >= 0 ? "+" : "-"}${formatted}%`;
}

export function TradingWorkspace() {
  const selectSymbol = useTradingStore((state) => state.selectSymbol);
  const toggleFeed = useTradingStore((state) => state.toggleFeed);
  const setDepthPanelOpen = useTradingStore(
    (state) => state.setDepthPanelOpen,
  );
  const reset = useTradingStore((state) => state.reset);

  const { symbol, lastPrice, priceChangePct, spreadBps, isFeedLive } =
    useTradingStore(
      useShallow((state) => ({
        symbol: state.symbol,
        lastPrice: state.lastPrice,
        priceChangePct: state.priceChangePct,
        spreadBps: state.spreadBps,
        isFeedLive: state.isFeedLive,
      })),
    );

  const { bids, asks, isDepthPanelOpen } = useTradingStore(
    useShallow((state) => ({
      bids: state.bids,
      asks: state.asks,
      isDepthPanelOpen: state.isDepthPanelOpen,
    })),
  );

  return (
    <section className="text-left">
      <TradingRealtimeBridge />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            <span
              className={`h-2 w-2 rounded-full ${
                isFeedLive ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            Zustand Business Example
          </div>

          <div className="space-y-3">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Route-scoped market workspace powered by Zustand
            </h2>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              This module follows the repository rules: vanilla store factory,
              Context Provider, atomic selectors, a dedicated realtime bridge,
              and a safe reset action that preserves the intended initial state.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {SYMBOL_OPTIONS.map((option) => (
              <Button
                key={option.symbol}
                variant={option.symbol === symbol ? "primary" : "outline"}
                onClick={() => selectSymbol(option.symbol, option.anchorPrice)}
              >
                {option.symbol}
              </Button>
            ))}

            <Button variant="outline" onClick={toggleFeed}>
              {isFeedLive ? "Pause feed" : "Resume feed"}
            </Button>

            <Button
              variant="outline"
              onClick={() => setDepthPanelOpen(!isDepthPanelOpen)}
            >
              {isDepthPanelOpen ? "Hide depth" : "Show depth"}
            </Button>

            <Button variant="ghost" onClick={reset}>
              Reset workspace
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:w-[360px] xl:self-start">
          <MetricCard label="Selected Symbol" value={symbol} />
          <MetricCard
            label="Last Price"
            value={`$${formatMetricPrice(lastPrice)}`}
          />
          <MetricCard
            label="24h Drift"
            value={formatSignedPercent(priceChangePct)}
            tone={priceChangePct >= 0 ? "positive" : "negative"}
          />
          <MetricCard
            label="Spread"
            value={`${spreadBps.toFixed(1)} bps`}
          />
        </div>
      </div>
      <div className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-3xl border border-border/60 bg-background/70 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                Execution Context
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                UI state stays in Zustand while server data remains outside the
                store boundary.
              </p>
            </div>
            <span className="inline-flex w-fit shrink-0 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
              {isFeedLive ? "Live bridge active" : "Bridge paused"}
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <StatusPill label="Provider scope" value="Page feature" />
            <StatusPill label="Store model" value="Vanilla + Context" />
            <StatusPill label="Selectors" value="Atomic / shallow" />
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-background/70 p-5">
          <p className="text-sm font-medium text-foreground">
            Why this matches `CLAUDE.md`
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
            <li>Per-feature provider instead of a root-level global store.</li>
            <li>Actions encapsulate symbol selection, feed control, and reset.</li>
            <li>Realtime updates are isolated in a bridge component.</li>
            <li>Components subscribe only to the state they actually render.</li>
          </ul>
        </div>
      </div>

      {isDepthPanelOpen && (
        <div className="mt-8 grid gap-4 xl:grid-cols-2">
          <OrderbookCard title="Bid ladder" levels={bids} tone="bid" />
          <OrderbookCard title="Ask ladder" levels={asks} tone="ask" />
        </div>
      )}
    </section>
  );
}

function MetricCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "positive" | "negative";
}) {
  const toneClass =
    tone === "positive"
      ? "text-emerald-500"
      : tone === "negative"
        ? "text-rose-500"
        : "text-foreground";

  return (
    <div className="flex min-h-[156px] flex-col rounded-2xl border border-border/60 bg-background/70 p-4">
      <p className="min-h-[3.5rem] text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-auto overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-semibold leading-none tracking-tight tabular-nums ${toneClass}`}
      >
        {value}
      </p>
    </div>
  );
}

function StatusPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 p-3">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function OrderbookCard({
  title,
  levels,
  tone,
}: {
  title: string;
  levels: Array<{ price: number; size: number }>;
  tone: "bid" | "ask";
}) {
  const accentClass =
    tone === "bid"
      ? "from-emerald-500/15 to-emerald-500/0"
      : "from-rose-500/15 to-rose-500/0";
  const textClass = tone === "bid" ? "text-emerald-500" : "text-rose-500";

  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-background/70">
      <div className={`bg-gradient-to-r ${accentClass} px-5 py-4`}>
        <p className={`text-sm font-medium ${textClass}`}>{title}</p>
      </div>

      <div className="space-y-2 px-5 py-4">
        {levels.map((level) => (
          <div
            key={`${title}-${level.price}`}
            className="grid grid-cols-2 gap-3 rounded-2xl border border-border/50 px-3 py-2 text-sm"
          >
            <span className="font-medium text-foreground">
              ${formatPrice(level.price)}
            </span>
            <span className="text-right text-muted-foreground">
              {level.size.toFixed(2)} lots
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
