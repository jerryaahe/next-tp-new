"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * Select Primitive - Pure Radix UI implementation
 *
 * @see https://www.radix-ui.com/primitives/docs/components/select
 */

// Re-export Radix primitives
export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;
export const SelectPortal = SelectPrimitive.Portal;
export const SelectIcon = SelectPrimitive.Icon;

// Styled Trigger
export interface SelectTriggerProps
	extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {}

export function SelectTrigger({
	className,
	children,
	...props
}: SelectTriggerProps) {
	return (
		<SelectPrimitive.Trigger
			className={cn(
				// Layout
				"flex h-10 w-full items-center justify-between gap-2 px-3 py-2",
				// Appearance
				"rounded-md border border-input bg-background text-sm",
				"placeholder:text-muted-foreground",
				// States
				"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
				"disabled:cursor-not-allowed disabled:opacity-50",
				// Icon sizing
				"[&>span]:line-clamp-1",
				className
			)}
			{...props}
		>
			{children}
			<SelectIcon asChild>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="h-4 w-4 opacity-50"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</SelectIcon>
		</SelectPrimitive.Trigger>
	);
}

// Styled Content
export interface SelectContentProps
	extends ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}

export function SelectContent({
	className,
	children,
	position = "popper",
	...props
}: SelectContentProps) {
	return (
		<SelectPortal>
			<SelectPrimitive.Content
				className={cn(
					// Layout
					"relative z-[var(--z-dropdown)] max-h-96 min-w-[8rem] overflow-hidden",
					// Appearance
					"rounded-md border bg-popover text-popover-foreground shadow-md",
					// Animation
					"data-[state=open]:animate-[fade-in_150ms_ease-out]",
					"data-[state=closed]:animate-[fade-out_150ms_ease-in]",
					// Position-based sizing
					position === "popper" &&
						"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
					className
				)}
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						"p-1",
						position === "popper" &&
							"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPortal>
	);
}

// Scroll buttons
function SelectScrollUpButton({
	className,
	...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>) {
	return (
		<SelectPrimitive.ScrollUpButton
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className
			)}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-4 w-4"
			>
				<path d="m18 15-6-6-6 6" />
			</svg>
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>) {
	return (
		<SelectPrimitive.ScrollDownButton
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className
			)}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-4 w-4"
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</SelectPrimitive.ScrollDownButton>
	);
}

// Styled Label
export interface SelectLabelProps
	extends ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {}

export function SelectLabel({ className, ...props }: SelectLabelProps) {
	return (
		<SelectPrimitive.Label
			className={cn("px-2 py-1.5 text-sm font-semibold", className)}
			{...props}
		/>
	);
}

// Styled Item
export interface SelectItemProps
	extends ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}

export function SelectItem({
	className,
	children,
	...props
}: SelectItemProps) {
	return (
		<SelectPrimitive.Item
			className={cn(
				// Layout
				"relative flex w-full cursor-pointer select-none items-center py-1.5 pr-8 pl-2",
				// Appearance
				"rounded-sm text-sm outline-none",
				// States
				"focus:bg-accent focus:text-accent-foreground",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				className
			)}
			{...props}
		>
			<span className="absolute right-2 flex h-4 w-4 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-4 w-4"
					>
						<polyline points="20 6 9 17 4 12" />
					</svg>
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

// Styled Separator
export interface SelectSeparatorProps
	extends ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {}

export function SelectSeparator({
	className,
	...props
}: SelectSeparatorProps) {
	return (
		<SelectPrimitive.Separator
			className={cn("-mx-1 my-1 h-px bg-border", className)}
			{...props}
		/>
	);
}
