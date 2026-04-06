import { cn } from "@workspace/ui/lib/utils";
import type { Metadata, Viewport } from "next";
import { RootProviders } from "@/components/providers/root-providers";
import { geistSans } from "@/config/fonts";
import { baseMetadata, baseViewport } from "@/config/metadata";
import type { LayoutProps } from "@/types/common";

import "@workspace/ui/styles/globals.css";

/**
 * Define the metadata for the site
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
 */
export const metadata: Metadata = baseMetadata;

/**
 * Define the viewport for the site
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = baseViewport;

/**
 * Define the root layout for the site
 * Only the root layout can contain <html> and <body> tags.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layouts
 */
export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      className={cn(geistSans.variable, "antialiased")}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProviders>
          <main className="flex-1" tabIndex={-1}>
            {children}
          </main>
        </RootProviders>
      </body>
    </html>
  );
}
