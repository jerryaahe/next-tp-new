"use client";

import { useEffect } from "react";
import { Button } from "@workspace/ui/components";
import { ErrorLayout, WarningIllustration } from "@/components/error";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: Send to error reporting service (e.g., Sentry)
    console.error("Page error:", error);
  }, [error]);

  return (
    <ErrorLayout
      illustration={<WarningIllustration state="confused" />}
      title="Something Went Wrong"
      action={
        <div className="flex flex-col items-center gap-3">
          <Button onClick={reset} variant="outline">
            Try Again
          </Button>
          {error.digest && (
            <p className="text-xs text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      }
    />
  );
}
