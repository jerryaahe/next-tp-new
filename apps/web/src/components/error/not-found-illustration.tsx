import { cn } from "@workspace/ui/lib/utils";

export interface NotFoundIllustrationProps {
	className?: string;
}

export function NotFoundIllustration({
	className,
}: NotFoundIllustrationProps) {
	return (
		<div className={cn("relative", className)}>
			<svg
				viewBox="0 0 400 300"
				className="h-full w-full"
				role="img"
				aria-label="404 illustration"
			>
				<defs>
					{/* Tech gradient */}
					<linearGradient id="techGradient404" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.8" />
						<stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.3" />
					</linearGradient>
					{/* Glow filter */}
					<filter id="glow404" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="3" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
					{/* Subtle glow */}
					<filter id="subtleGlow" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="2" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Background grid - subtle */}
				<g className="stroke-foreground/5" strokeWidth="1">
					{[...Array(9)].map((_, i) => (
						<line key={`v${i}`} x1={40 + i * 40} y1="20" x2={40 + i * 40} y2="280" />
					))}
					{[...Array(7)].map((_, i) => (
						<line key={`h${i}`} x1="40" y1={20 + i * 40} x2="360" y2={20 + i * 40} />
					))}
				</g>

				{/* Decorative circuit lines */}
				<g className="stroke-primary/20" strokeWidth="1.5" fill="none">
					<path d="M60 80 L90 80 L90 60 L120 60" />
					<circle cx="120" cy="60" r="3" className="fill-primary/30" />
					<path d="M340 220 L310 220 L310 240 L280 240" />
					<circle cx="280" cy="240" r="3" className="fill-primary/30" />
				</g>

				{/* Main 404 display */}
				<g className="animate-[float_6s_ease-in-out_infinite]">
					{/* Outer frame - hexagonal inspired */}
					<path
						d="M120 90 L280 90 L300 110 L300 190 L280 210 L120 210 L100 190 L100 110 Z"
						className="fill-muted/50 stroke-foreground/30"
						strokeWidth="2"
					/>

					{/* Inner screen */}
					<rect
						x="115"
						y="100"
						width="170"
						height="100"
						rx="4"
						className="fill-background stroke-foreground/20"
						strokeWidth="1"
					/>

					{/* Screen content - 404 */}
					<text
						x="200"
						y="165"
						textAnchor="middle"
						className="fill-primary font-bold"
						style={{ fontSize: "48px", fontFamily: "system-ui" }}
						filter="url(#subtleGlow)"
					>
						404
					</text>

					{/* Status indicators */}
					<g className="fill-primary/60">
						<circle cx="130" cy="195" r="3" className="animate-[pulse_2s_ease-in-out_infinite]" />
						<circle cx="145" cy="195" r="3" className="animate-[pulse_2s_ease-in-out_infinite_0.3s]" />
						<circle cx="160" cy="195" r="3" className="animate-[pulse_2s_ease-in-out_infinite_0.6s]" />
					</g>

					{/* Corner accents */}
					<g className="stroke-primary/40" strokeWidth="2" fill="none">
						<path d="M105 105 L115 105 L115 115" />
						<path d="M295 105 L285 105 L285 115" />
						<path d="M105 195 L115 195 L115 185" />
						<path d="M295 195 L285 195 L285 185" />
					</g>
				</g>

				{/* Floating geometric elements */}
				<g filter="url(#subtleGlow)">
					{/* Left side elements */}
					<rect
						x="50"
						y="140"
						width="30"
						height="30"
						rx="4"
						className="fill-none stroke-primary/40 animate-[float_5s_ease-in-out_infinite_0.5s]"
						strokeWidth="1.5"
						transform="rotate(15, 65, 155)"
					/>
					<circle
						cx="70"
						cy="200"
						r="8"
						className="fill-none stroke-primary/30 animate-[float_4s_ease-in-out_infinite_1s]"
						strokeWidth="1.5"
					/>

					{/* Right side elements */}
					<rect
						x="320"
						y="120"
						width="25"
						height="25"
						rx="4"
						className="fill-none stroke-primary/40 animate-[float_5s_ease-in-out_infinite_0.8s]"
						strokeWidth="1.5"
						transform="rotate(-10, 332, 132)"
					/>
					<polygon
						points="340,180 350,195 330,195"
						className="fill-none stroke-primary/30 animate-[float_4.5s_ease-in-out_infinite_1.2s]"
						strokeWidth="1.5"
					/>
				</g>

				{/* Bottom decorative line */}
				<g className="stroke-foreground/10" strokeWidth="1">
					<line x1="80" y1="250" x2="320" y2="250" />
					<circle cx="80" cy="250" r="2" className="fill-foreground/20" />
					<circle cx="320" cy="250" r="2" className="fill-foreground/20" />
				</g>

				{/* Small data dots */}
				<g className="fill-primary/40">
					<circle cx="160" cy="240" r="2" />
					<circle cx="200" cy="238" r="2" />
					<circle cx="240" cy="240" r="2" />
				</g>
			</svg>

			<style>{`
				@keyframes float {
					0%, 100% { transform: translateY(0); }
					50% { transform: translateY(-8px); }
				}
			`}</style>
		</div>
	);
}
