"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "~/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/*
 * Avatar Primitive - Pure Radix UI implementation
 *
 * An image element with a fallback for representing the user.
 *
 * @see https://www.radix-ui.com/primitives/docs/components/avatar
 */

export interface AvatarProps
	extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {}

export function Avatar({ className, ...props }: AvatarProps) {
	return (
		<AvatarPrimitive.Root
			className={cn(
				"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
				className
			)}
			{...props}
		/>
	);
}

export interface AvatarImageProps
	extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
	return (
		<AvatarPrimitive.Image
			className={cn("aspect-square h-full w-full", className)}
			{...props}
		/>
	);
}

export interface AvatarFallbackProps
	extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
	return (
		<AvatarPrimitive.Fallback
			className={cn(
				"flex h-full w-full items-center justify-center rounded-full bg-muted",
				className
			)}
			{...props}
		/>
	);
}
