import { cn } from "@workspace/ui/lib/utils";
import type { ReactNode } from "react";

export interface ErrorLayoutProps {
	/** The illustration component to display */
	illustration: ReactNode;
	/** Error code (e.g., "404", "500") - not displayed, kept for compatibility */
	code?: string;
	/** Main title text */
	title: string;
	/** Description text */
	description?: string;
	/** Action button or link */
	action?: ReactNode;
	/** Additional CSS classes */
	className?: string;
}

export function ErrorLayout({
	illustration,
	title,
	description,
	action,
	className,
}: ErrorLayoutProps) {
	return (
		<div
			className={cn(
				"flex min-h-[70vh] flex-col items-center justify-center px-4 py-8",
				className,
			)}
		>
			{/* Title - Notion style: bold, simple */}
			<h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
				{title}
			</h1>

			{/* Description */}
			{description && (
				<p className="mb-6 max-w-md text-center text-muted-foreground">
					{description}
				</p>
			)}

			{/* Illustration - larger, centered */}
			<div className="relative w-full max-w-md">{illustration}</div>

			{/* Action */}
			{action && <div className="mt-6">{action}</div>}
		</div>
	);
}
