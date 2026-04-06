"use client";

import { Button } from "@workspace/ui/components";
import {
  ErrorBoundary,
  type FallbackProps,
} from "react-error-boundary";

function ClientErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const message =
    error instanceof Error ? error.message : "Unknown client error";

  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-3xl border border-border/60 bg-background/70 p-6 text-center">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Client module error
        </h2>
        <p className="max-w-lg text-sm leading-6 text-muted-foreground">
          This interactive section failed to render. The rest of the page is
          still available.
        </p>
      </div>

      <pre className="max-w-lg overflow-auto rounded-2xl bg-muted px-4 py-3 text-left text-xs text-muted-foreground">
        {message}
      </pre>

      <Button onClick={resetErrorBoundary} variant="outline">
        Retry module
      </Button>
    </div>
  );
}

export function ClientErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary
      FallbackComponent={ClientErrorFallback}
      onError={(error, info) => {
        console.error("ClientErrorBoundary caught:", error, info);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
