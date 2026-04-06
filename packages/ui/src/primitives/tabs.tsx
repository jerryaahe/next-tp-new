"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * Tabs Primitive - Pure Radix UI implementation
 *
 * A set of layered sections of content that are displayed one at a time.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/tabs
 */

// Re-export Radix primitives for direct access
export const Tabs = TabsPrimitive.Root;

export interface TabsListProps
	extends ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}

export function TabsList({ className, ...props }: TabsListProps) {
	return (
		<TabsPrimitive.List
			className={cn(
				"inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
				className
			)}
			{...props}
		/>
	);
}

export interface TabsTriggerProps
	extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
	return (
		<TabsPrimitive.Trigger
			className={cn(
				// Base
				"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all",
				// Focus
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				// Disabled
				"disabled:pointer-events-none disabled:opacity-50",
				// Active state
				"data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
				className
			)}
			{...props}
		/>
	);
}

export interface TabsContentProps
	extends ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}

export function TabsContent({ className, ...props }: TabsContentProps) {
	return (
		<TabsPrimitive.Content
			className={cn(
				"mt-2 ring-offset-background",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				className
			)}
			{...props}
		/>
	);
}
