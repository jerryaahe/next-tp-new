"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * RadioGroup Primitive - Pure Radix UI implementation
 *
 * A set of checkable buttons where only one can be checked at a time.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/radio-group
 */

export interface RadioGroupProps
	extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {}

export function RadioGroup({ className, ...props }: RadioGroupProps) {
	return (
		<RadioGroupPrimitive.Root
			className={cn("grid gap-2", className)}
			{...props}
		/>
	);
}

export interface RadioGroupItemProps
	extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {}

export function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
	return (
		<RadioGroupPrimitive.Item
			className={cn(
				// Base
				"aspect-square h-4 w-4 rounded-full border border-primary text-primary",
				// Focus
				"focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				// Disabled
				"disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="h-2.5 w-2.5"
				>
					<circle cx="12" cy="12" r="6" />
				</svg>
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
}
