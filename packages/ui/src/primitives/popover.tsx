"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * Popover Primitive - Pure Radix UI implementation
 *
 * Displays rich content in a portal, triggered by a button.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/popover
 */

// Re-export Radix primitives for direct access
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverPortal = PopoverPrimitive.Portal;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;
export const PopoverArrow = PopoverPrimitive.Arrow;

export interface PopoverContentProps
	extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {}

export function PopoverContent({
	className,
	align = "center",
	sideOffset = 4,
	...props
}: PopoverContentProps) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				align={align}
				sideOffset={sideOffset}
				className={cn(
					// Base
					"z-[var(--z-popover)] w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
					// Animation
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					"data-[side=bottom]:slide-in-from-top-2",
					"data-[side=left]:slide-in-from-right-2",
					"data-[side=right]:slide-in-from-left-2",
					"data-[side=top]:slide-in-from-bottom-2",
					className
				)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	);
}
