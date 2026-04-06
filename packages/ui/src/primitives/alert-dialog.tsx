"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * AlertDialog Primitive - Pure Radix UI implementation
 *
 * A modal dialog that interrupts the user with important content and expects a response.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/alert-dialog
 */

// Re-export Radix primitives for direct access
export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export interface AlertDialogOverlayProps
	extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {}

export function AlertDialogOverlay({
	className,
	...props
}: AlertDialogOverlayProps) {
	return (
		<AlertDialogPrimitive.Overlay
			className={cn(
				// Base
				"fixed inset-0 z-[var(--z-overlay)] bg-black/50",
				// Animation
				"data-[state=open]:animate-in data-[state=closed]:animate-out",
				"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
				className
			)}
			{...props}
		/>
	);
}

export interface AlertDialogContentProps
	extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {}

export function AlertDialogContent({
	className,
	...props
}: AlertDialogContentProps) {
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<AlertDialogPrimitive.Content
				className={cn(
					// Position & Layout
					"fixed left-1/2 top-1/2 z-[var(--z-modal)]",
					"w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
					// Appearance
					"grid gap-4 rounded-lg border bg-background p-6 shadow-lg",
					// Animation
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					"data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
					"data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
					// Duration
					"duration-200",
					className
				)}
				{...props}
			/>
		</AlertDialogPortal>
	);
}

export interface AlertDialogHeaderProps
	extends ComponentPropsWithoutRef<"div"> {}

export function AlertDialogHeader({
	className,
	...props
}: AlertDialogHeaderProps) {
	return (
		<div
			className={cn(
				"flex flex-col space-y-2 text-center sm:text-left",
				className
			)}
			{...props}
		/>
	);
}

export interface AlertDialogFooterProps
	extends ComponentPropsWithoutRef<"div"> {}

export function AlertDialogFooter({
	className,
	...props
}: AlertDialogFooterProps) {
	return (
		<div
			className={cn(
				"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
				className
			)}
			{...props}
		/>
	);
}

export interface AlertDialogTitleProps
	extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {}

export function AlertDialogTitle({
	className,
	...props
}: AlertDialogTitleProps) {
	return (
		<AlertDialogPrimitive.Title
			className={cn("text-lg font-semibold", className)}
			{...props}
		/>
	);
}

export interface AlertDialogDescriptionProps
	extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> {}

export function AlertDialogDescription({
	className,
	...props
}: AlertDialogDescriptionProps) {
	return (
		<AlertDialogPrimitive.Description
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

export interface AlertDialogActionProps
	extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {}

export function AlertDialogAction({
	className,
	...props
}: AlertDialogActionProps) {
	return (
		<AlertDialogPrimitive.Action
			className={cn(
				"inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
				"hover:bg-primary/90",
				"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
				"disabled:pointer-events-none disabled:opacity-50",
				className
			)}
			{...props}
		/>
	);
}

export interface AlertDialogCancelProps
	extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {}

export function AlertDialogCancel({
	className,
	...props
}: AlertDialogCancelProps) {
	return (
		<AlertDialogPrimitive.Cancel
			className={cn(
				"inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium",
				"hover:bg-accent hover:text-accent-foreground",
				"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
				"disabled:pointer-events-none disabled:opacity-50",
				"mt-2 sm:mt-0",
				className
			)}
			{...props}
		/>
	);
}
