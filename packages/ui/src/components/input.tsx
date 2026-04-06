import { cn } from "~/lib/utils";
import type { InputHTMLAttributes } from "react";

/*
 * Input Component - Styled text input
 *
 * Simple, accessible input component.
 */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, type = "text", ...props }: InputProps) {
	return (
		<input
			type={type}
			className={cn(
				// Layout
				"flex h-10 w-full px-3 py-2",
				// Appearance
				"rounded-md border border-input bg-background text-sm",
				"placeholder:text-muted-foreground",
				// File input specific
				"file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
				// Focus
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				// Disabled
				"disabled:cursor-not-allowed disabled:opacity-50",
				// Invalid state (works with aria-invalid)
				"aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive",
				className
			)}
			{...props}
		/>
	);
}
