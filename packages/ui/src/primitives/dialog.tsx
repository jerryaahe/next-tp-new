"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/*
 * Dialog Primitive - Pure Radix UI implementation
 *
 * This is a minimal wrapper around Radix UI Dialog.
 * Customize styles directly in your components or extend these.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/dialog
 */

// Re-export Radix primitives for direct access
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

// Styled Overlay
export interface DialogOverlayProps
	extends ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}

export function DialogOverlay({ className, ...props }: DialogOverlayProps) {
	return (
		<DialogPrimitive.Overlay
			className={cn(
				// Base styles
				"fixed inset-0 z-[var(--z-overlay)] bg-black/50",
				// Animation
				"data-[state=open]:animate-[fade-in_150ms_ease-out]",
				"data-[state=closed]:animate-[fade-out_150ms_ease-in]",
				className
			)}
			{...props}
		/>
	);
}

// Styled Content
export interface DialogContentProps
	extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
	/** Whether to show the overlay */
	showOverlay?: boolean;
	/** Custom overlay className */
	overlayClassName?: string;
}

export function DialogContent({
	className,
	children,
	showOverlay = true,
	overlayClassName,
	...props
}: DialogContentProps) {
	return (
		<DialogPortal>
			{showOverlay && <DialogOverlay className={overlayClassName} />}
			<DialogPrimitive.Content
				className={cn(
					// Position & Layout
					"fixed left-1/2 top-1/2 z-[var(--z-modal)]",
					"w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
					// Appearance
					"rounded-lg border bg-popover p-6 shadow-lg",
					// Animation
					"data-[state=open]:animate-[zoom-in_150ms_ease-out]",
					"data-[state=closed]:animate-[zoom-out_150ms_ease-in]",
					// Focus
					"focus:outline-none",
					className
				)}
				{...props}
			>
				{children}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

// Title
export interface DialogTitleProps
	extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
	return (
		<DialogPrimitive.Title
			className={cn("text-lg font-semibold text-foreground", className)}
			{...props}
		/>
	);
}

// Description
export interface DialogDescriptionProps
	extends ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

export function DialogDescription({
	className,
	...props
}: DialogDescriptionProps) {
	return (
		<DialogPrimitive.Description
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

// Composed Dialog for convenience
export interface ComposedDialogProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	trigger?: ReactNode;
	title?: ReactNode;
	description?: ReactNode;
	children: ReactNode;
	contentClassName?: string;
}

export function ComposedDialog({
	open,
	onOpenChange,
	trigger,
	title,
	description,
	children,
	contentClassName,
}: ComposedDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
			<DialogContent className={contentClassName}>
				{title && <DialogTitle>{title}</DialogTitle>}
				{description && <DialogDescription>{description}</DialogDescription>}
				{children}
			</DialogContent>
		</Dialog>
	);
}
