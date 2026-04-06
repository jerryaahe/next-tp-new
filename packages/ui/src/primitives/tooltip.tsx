"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/*
 * Tooltip Primitive - Pure Radix UI implementation
 *
 * @see https://www.radix-ui.com/primitives/docs/components/tooltip
 */

// Re-export Radix primitives
export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;
export const TooltipArrow = TooltipPrimitive.Arrow;

// Styled Content
export interface TooltipContentProps
  extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  showArrow?: boolean;
  arrowClassName?: string;
}

export function TooltipContent({
  className,
  children,
  sideOffset = 4,
  showArrow = true,
  arrowClassName,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPortal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          // Layout
          "z-[var(--z-tooltip)] max-w-xs px-3 py-1.5",
          // Appearance
          "rounded-md bg-popover text-sm text-popover-foreground shadow-md",
          "border",
          // Animation
          "data-[state=delayed-open]:animate-[fade-in_150ms_ease-out]",
          "data-[state=closed]:animate-[fade-out_150ms_ease-in]",
          className
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <TooltipArrow
            className={cn("fill-popover drop-shadow-sm", arrowClassName)}
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPortal>
  );
}

// Composed Tooltip for convenience
export interface SimpleTooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  contentClassName?: string;
}

export function SimpleTooltip({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 200,
  contentClassName,
}: SimpleTooltipProps) {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} align={align} className={contentClassName}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}
