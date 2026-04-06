"use client";

import { Toaster } from "@workspace/ui/components/sonner";
import { type PropsWithChildren } from "react";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Consolidates all client-side providers & global singleton UI helpers.
 * Keeps the root layout lean and enables reuse across different app shells.
 */
export function RootProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      forcedTheme="dark"
    >
      {children}
      {/* <Analytics />  @sentry/nextjs */}
      <Toaster />
      <TailwindIndicator />
    </ThemeProvider>
  );
}
