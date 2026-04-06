"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * Switch Primitive - Pure Radix UI implementation
 *
 * A control that allows the user to toggle between checked and not checked.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/switch
 */

export interface SwitchProps
	extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {}

export function Switch({ className, ...props }: SwitchProps) {
	return (
		<SwitchPrimitive.Root
			className={cn(
				// Base
				"peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
				// Transition
				"transition-colors",
				// Focus
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
				// Disabled
				"disabled:cursor-not-allowed disabled:opacity-50",
				// States
				"data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
				className
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				className={cn(
					// Base
					"pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0",
					// Transition
					"transition-transform",
					// States
					"data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
				)}
			/>
		</SwitchPrimitive.Root>
	);
}
