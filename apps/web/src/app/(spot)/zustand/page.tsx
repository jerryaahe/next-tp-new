import { ClientErrorBoundary } from "@/components/error";
import { TradingWorkspace } from "@/features/trading/components/trading-workspace";
import { TradingStoreProvider } from "@/features/trading/providers/trading-store-provider";

export default function ZustandExamplePage() {
  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <ClientErrorBoundary>
          <TradingStoreProvider
            initialState={{
              symbol: "BTCUSDT",
              lastPrice: 108_420,
              priceChangePct: 0.84,
              spreadBps: 1.8,
            }}
          >
            <TradingWorkspace />
          </TradingStoreProvider>
        </ClientErrorBoundary>
      </div>
    </div>
  );
}
