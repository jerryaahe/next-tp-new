"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * Progress Primitive - Pure Radix UI implementation
 *
 * Displays an indicator showing the completion progress of a task.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/progress
 */

export interface ProgressProps
	extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
	/** Current progress value (0-100) */
	value?: number;
}

export function Progress({ className, value, ...props }: ProgressProps) {
	return (
		<ProgressPrimitive.Root
			className={cn(
				"relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
				className
			)}
			{...props}
		>
			<ProgressPrimitive.Indicator
				className="h-full w-full flex-1 bg-primary transition-all"
				style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
			/>
		</ProgressPrimitive.Root>
	);
}
