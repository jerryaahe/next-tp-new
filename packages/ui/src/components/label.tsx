"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * Label Component - Radix UI Label primitive
 *
 * @see https://www.radix-ui.com/primitives/docs/components/label
 */

export interface LabelProps
  extends ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /** Whether the associated field is required */
  required?: boolean;
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-sm font-medium leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-destructive" aria-hidden="true">
          *
        </span>
      )}
    </LabelPrimitive.Root>
  );
}
