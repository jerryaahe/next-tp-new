import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/lib/utils";
import type { ButtonHTMLAttributes } from "react";

/*
 * Button Component - Custom styled button
 *
 * Minimal, customizable button without shadcn/ui dependencies.
 * Uses Radix Slot for composition with asChild pattern.
 */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Render as child element */
	asChild?: boolean;
	/** Visual variant */
	variant?:
		| "primary"
		| "secondary"
		| "outline"
		| "ghost"
		| "destructive"
		| "link";
	/** Size variant */
	size?: "sm" | "md" | "lg" | "icon";
}

const variantStyles = {
	primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
	secondary:
		"bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
	outline:
		"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
	ghost: "hover:bg-accent hover:text-accent-foreground",
	destructive:
		"bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
	link: "text-primary underline-offset-4 hover:underline",
};

const sizeStyles = {
	sm: "h-8 px-3 text-xs rounded-md",
	md: "h-10 px-4 py-2 text-sm rounded-md",
	lg: "h-12 px-6 text-base rounded-lg",
	icon: "h-10 w-10 rounded-md",
};

export function Button({
	className,
	variant = "primary",
	size = "md",
	asChild = false,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			className={cn(
				// Base styles
				"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium",
				"transition-colors duration-150",
				// Focus styles
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				// Disabled styles
				"disabled:pointer-events-none disabled:opacity-50",
				// Variant & Size
				variantStyles[variant],
				sizeStyles[size],
				className,
			)}
			{...props}
		/>
	);
}
