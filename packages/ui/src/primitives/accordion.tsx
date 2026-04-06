"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * Accordion Primitive - Pure Radix UI implementation
 *
 * A vertically stacked set of interactive headings that reveal associated content.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/accordion
 */

// Re-export Radix primitives for direct access
export const Accordion = AccordionPrimitive.Root;

export interface AccordionItemProps
	extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

export function AccordionItem({ className, ...props }: AccordionItemProps) {
	return (
		<AccordionPrimitive.Item
			className={cn("border-b", className)}
			{...props}
		/>
	);
}

export interface AccordionTriggerProps
	extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {}

export function AccordionTrigger({
	className,
	children,
	...props
}: AccordionTriggerProps) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				className={cn(
					// Base
					"flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all",
					// Hover
					"hover:underline",
					// Icon rotation
					"[&[data-state=open]>svg]:rotate-180",
					className
				)}
				{...props}
			>
				{children}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

export interface AccordionContentProps
	extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {}

export function AccordionContent({
	className,
	children,
	...props
}: AccordionContentProps) {
	return (
		<AccordionPrimitive.Content
			className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
			{...props}
		>
			<div className={cn("pb-4 pt-0", className)}>{children}</div>
		</AccordionPrimitive.Content>
	);
}
