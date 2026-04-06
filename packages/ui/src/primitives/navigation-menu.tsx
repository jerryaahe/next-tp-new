"use client";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * NavigationMenu Primitive - Pure Radix UI implementation
 *
 * A collection of links for navigating websites.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/navigation-menu
 */

export interface NavigationMenuProps
	extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {}

export function NavigationMenu({
	className,
	children,
	...props
}: NavigationMenuProps) {
	return (
		<NavigationMenuPrimitive.Root
			className={cn(
				"relative z-10 flex max-w-max flex-1 items-center justify-center",
				className
			)}
			{...props}
		>
			{children}
			<NavigationMenuViewport />
		</NavigationMenuPrimitive.Root>
	);
}

export interface NavigationMenuListProps
	extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> {}

export function NavigationMenuList({
	className,
	...props
}: NavigationMenuListProps) {
	return (
		<NavigationMenuPrimitive.List
			className={cn(
				"group flex flex-1 list-none items-center justify-center space-x-1",
				className
			)}
			{...props}
		/>
	);
}

// Re-export Radix primitives for direct access
export const NavigationMenuItem = NavigationMenuPrimitive.Item;

export interface NavigationMenuTriggerProps
	extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> {}

export function NavigationMenuTrigger({
	className,
	children,
	...props
}: NavigationMenuTriggerProps) {
	return (
		<NavigationMenuPrimitive.Trigger
			className={cn(
				// Base
				"group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors",
				// Hover
				"hover:bg-accent hover:text-accent-foreground",
				// Focus
				"focus:bg-accent focus:text-accent-foreground focus:outline-none",
				// Disabled
				"disabled:pointer-events-none disabled:opacity-50",
				// Active
				"data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
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
				className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</NavigationMenuPrimitive.Trigger>
	);
}

export interface NavigationMenuContentProps
	extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> {}

export function NavigationMenuContent({
	className,
	...props
}: NavigationMenuContentProps) {
	return (
		<NavigationMenuPrimitive.Content
			className={cn(
				// Position
				"left-0 top-0 w-full md:absolute md:w-auto",
				// Animation
				"data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
				"data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
				"data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52",
				"data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
				className
			)}
			{...props}
		/>
	);
}

export interface NavigationMenuLinkProps
	extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> {}

export function NavigationMenuLink({
	className,
	...props
}: NavigationMenuLinkProps) {
	return (
		<NavigationMenuPrimitive.Link
			className={cn(
				"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
				"hover:bg-accent hover:text-accent-foreground",
				"focus:bg-accent focus:text-accent-foreground",
				className
			)}
			{...props}
		/>
	);
}

export interface NavigationMenuViewportProps
	extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> {}

export function NavigationMenuViewport({
	className,
	...props
}: NavigationMenuViewportProps) {
	return (
		<div className={cn("absolute left-0 top-full flex justify-center")}>
			<NavigationMenuPrimitive.Viewport
				className={cn(
					// Base
					"origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow",
					// Animation
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
					// Width
					"md:w-[var(--radix-navigation-menu-viewport-width)]",
					className
				)}
				{...props}
			/>
		</div>
	);
}

export interface NavigationMenuIndicatorProps
	extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator> {}

export function NavigationMenuIndicator({
	className,
	...props
}: NavigationMenuIndicatorProps) {
	return (
		<NavigationMenuPrimitive.Indicator
			className={cn(
				"top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
				"data-[state=visible]:animate-in data-[state=hidden]:animate-out",
				"data-[state=hidden]:fade-out data-[state=visible]:fade-in",
				className
			)}
			{...props}
		>
			<div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
		</NavigationMenuPrimitive.Indicator>
	);
}
