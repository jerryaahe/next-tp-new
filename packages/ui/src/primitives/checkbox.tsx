"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * Checkbox Primitive - Pure Radix UI implementation
 *
 * A control that allows the user to toggle between checked and not checked.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/checkbox
 */

export interface CheckboxProps
	extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

export function Checkbox({ className, ...props }: CheckboxProps) {
	return (
		<CheckboxPrimitive.Root
			className={cn(
				// Base
				"peer h-4 w-4 shrink-0 rounded-sm border border-primary",
				// Focus
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				// Checked state
				"data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
				// Disabled
				"disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				className={cn("flex items-center justify-center text-current")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="h-3.5 w-3.5"
				>
					<path d="M20 6 9 17l-5-5" />
				</svg>
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}
