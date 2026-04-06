"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * ToggleGroup Primitive - Pure Radix UI implementation
 *
 * A set of two-state buttons that can be toggled on or off.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/toggle-group
 */

// Re-export Radix primitives for direct access
export const ToggleGroup = ToggleGroupPrimitive.Root;

export interface ToggleGroupItemProps
	extends ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {
	/** Visual variant */
	variant?: "default" | "outline";
	/** Size variant */
	size?: "default" | "sm" | "lg";
}

export function ToggleGroupItem({
	className,
	variant = "default",
	size = "default",
	...props
}: ToggleGroupItemProps) {
	return (
		<ToggleGroupPrimitive.Item
			className={cn(
				// Base
				"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
				// Hover
				"hover:bg-muted hover:text-muted-foreground",
				// Focus
				"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
				// Disabled
				"disabled:pointer-events-none disabled:opacity-50",
				// Active state
				"data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
				// Variant styles
				variant === "outline" &&
					"border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
				// Size styles
				size === "default" && "h-9 px-3",
				size === "sm" && "h-8 px-2",
				size === "lg" && "h-10 px-3",
				className
			)}
			{...props}
		/>
	);
}
