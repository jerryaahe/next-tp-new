"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * Toggle Primitive - Pure Radix UI implementation
 *
 * A two-state button that can be either on or off.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/toggle
 */

export interface ToggleProps
	extends ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
	/** Visual variant */
	variant?: "default" | "outline";
	/** Size variant */
	size?: "default" | "sm" | "lg";
}

const variantStyles = {
	default: "bg-transparent",
	outline:
		"border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
};

const sizeStyles = {
	default: "h-9 px-3",
	sm: "h-8 px-2",
	lg: "h-10 px-3",
};

export function Toggle({
	className,
	variant = "default",
	size = "default",
	...props
}: ToggleProps) {
	return (
		<TogglePrimitive.Root
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
				// Variants
				variantStyles[variant],
				sizeStyles[size],
				className
			)}
			{...props}
		/>
	);
}
