"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";

/*
 * DropdownMenu Primitive - Pure Radix UI implementation
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dropdown-menu
 */

// Re-export Radix primitives
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// Styled Content
export interface DropdownMenuContentProps
	extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {}

export function DropdownMenuContent({
	className,
	sideOffset = 4,
	...props
}: DropdownMenuContentProps) {
	return (
		<DropdownMenuPortal>
			<DropdownMenuPrimitive.Content
				sideOffset={sideOffset}
				className={cn(
					// Layout
					"z-[var(--z-dropdown)] min-w-[8rem] overflow-hidden p-1",
					// Appearance
					"rounded-md border bg-popover text-popover-foreground shadow-md",
					// Animation
					"data-[state=open]:animate-[fade-in_150ms_ease-out]",
					"data-[state=closed]:animate-[fade-out_150ms_ease-in]",
					// Slide animations based on side
					"data-[side=top]:animate-[slide-in-from-bottom_150ms]",
					"data-[side=bottom]:animate-[slide-in-from-top_150ms]",
					"data-[side=left]:animate-[slide-in-from-right_150ms]",
					"data-[side=right]:animate-[slide-in-from-left_150ms]",
					className,
				)}
				{...props}
			/>
		</DropdownMenuPortal>
	);
}

// Styled Item
export interface DropdownMenuItemProps
	extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
	inset?: boolean;
}

export function DropdownMenuItem({
	className,
	inset,
	...props
}: DropdownMenuItemProps) {
	return (
		<DropdownMenuPrimitive.Item
			className={cn(
				// Layout
				"relative flex cursor-pointer select-none items-center gap-2 px-2 py-1.5",
				// Appearance
				"rounded-sm text-sm outline-none transition-colors",
				// States
				"focus:bg-accent focus:text-accent-foreground",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				// Inset for items with icons
				inset && "pl-8",
				className,
			)}
			{...props}
		/>
	);
}

// Styled CheckboxItem
export interface DropdownMenuCheckboxItemProps
	extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {}

export function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: DropdownMenuCheckboxItemProps) {
	return (
		<DropdownMenuPrimitive.CheckboxItem
			className={cn(
				"relative flex cursor-pointer select-none items-center gap-2 py-1.5 pr-2 pl-8",
				"rounded-sm text-sm outline-none transition-colors",
				"focus:bg-accent focus:text-accent-foreground",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className="absolute left-2 flex h-4 w-4 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
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
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	);
}

// Styled RadioItem
export interface DropdownMenuRadioItemProps
	extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {}

export function DropdownMenuRadioItem({
	className,
	children,
	...props
}: DropdownMenuRadioItemProps) {
	return (
		<DropdownMenuPrimitive.RadioItem
			className={cn(
				"relative flex cursor-pointer select-none items-center gap-2 py-1.5 pr-2 pl-8",
				"rounded-sm text-sm outline-none transition-colors",
				"focus:bg-accent focus:text-accent-foreground",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				className,
			)}
			{...props}
		>
			<span className="absolute left-2 flex h-4 w-4 items-center justify-center">
				<DropdownMenuPrimitive.ItemIndicator>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="h-2 w-2"
					>
						<circle cx="12" cy="12" r="6" />
					</svg>
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.RadioItem>
	);
}

// Styled Label
export interface DropdownMenuLabelProps
	extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
	inset?: boolean;
}

export function DropdownMenuLabel({
	className,
	inset,
	...props
}: DropdownMenuLabelProps) {
	return (
		<DropdownMenuPrimitive.Label
			className={cn(
				"px-2 py-1.5 text-sm font-semibold",
				inset && "pl-8",
				className,
			)}
			{...props}
		/>
	);
}

// Styled Separator
export interface DropdownMenuSeparatorProps
	extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {}

export function DropdownMenuSeparator({
	className,
	...props
}: DropdownMenuSeparatorProps) {
	return (
		<DropdownMenuPrimitive.Separator
			className={cn("-mx-1 my-1 h-px bg-border", className)}
			{...props}
		/>
	);
}

// Styled SubTrigger
export interface DropdownMenuSubTriggerProps
	extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {
	inset?: boolean;
}

export function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: DropdownMenuSubTriggerProps) {
	return (
		<DropdownMenuPrimitive.SubTrigger
			className={cn(
				"flex cursor-pointer select-none items-center gap-2 px-2 py-1.5",
				"rounded-sm text-sm outline-none",
				"focus:bg-accent data-[state=open]:bg-accent",
				inset && "pl-8",
				className,
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
				className="ml-auto h-4 w-4"
			>
				<polyline points="9 18 15 12 9 6" />
			</svg>
		</DropdownMenuPrimitive.SubTrigger>
	);
}

// Styled SubContent
export interface DropdownMenuSubContentProps
	extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> {}

export function DropdownMenuSubContent({
	className,
	...props
}: DropdownMenuSubContentProps) {
	return (
		<DropdownMenuPrimitive.SubContent
			className={cn(
				"z-[var(--z-dropdown)] min-w-[8rem] overflow-hidden p-1",
				"rounded-md border bg-popover text-popover-foreground shadow-lg",
				"data-[state=open]:animate-[fade-in_150ms_ease-out]",
				"data-[state=closed]:animate-[fade-out_150ms_ease-in]",
				className,
			)}
			{...props}
		/>
	);
}

// Shortcut display
export function DropdownMenuShortcut({
	className,
	...props
}: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
			{...props}
		/>
	);
}
