import { cn } from "@workspace/ui/lib/utils";

export interface WarningIllustrationProps {
	/** Warning state */
	state?: "confused" | "crashed";
	className?: string;
}

export function WarningIllustration({
	state = "confused",
	className,
}: WarningIllustrationProps) {
	if (state === "crashed") {
		return <CrashedWarning className={className} />;
	}
	return <ConfusedWarning className={className} />;
}

function ConfusedWarning({ className }: { className?: string }) {
	return (
		<div className={cn("relative", className)}>
			<svg
				viewBox="0 0 400 300"
				className="h-full w-full"
				role="img"
				aria-label="Error illustration"
			>
				<defs>
					<linearGradient id="techGradientError" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.8" />
						<stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.3" />
					</linearGradient>
					<filter id="glowError" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="2" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Background grid */}
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
					<path d="M50 100 L80 100 L80 80 L110 80" />
					<circle cx="110" cy="80" r="3" className="fill-primary/30" />
					<path d="M350 200 L320 200 L320 220 L290 220" />
					<circle cx="290" cy="220" r="3" className="fill-primary/30" />
				</g>

				{/* Warning symbol - main element */}
				<g className="animate-[float_5s_ease-in-out_infinite]">
					{/* Outer warning frame */}
					<path
						d="M200 60 L300 200 L100 200 Z"
						className="fill-muted/30 stroke-foreground/30"
						strokeWidth="2"
						fill="none"
					/>

					{/* Inner warning triangle */}
					<path
						d="M200 85 L275 185 L125 185 Z"
						className="fill-background stroke-primary/50"
						strokeWidth="2"
					/>

					{/* Exclamation mark */}
					<g filter="url(#glowError)">
						<rect
							x="193"
							y="105"
							width="14"
							height="45"
							rx="4"
							className="fill-primary animate-[pulse_2s_ease-in-out_infinite]"
						/>
						<circle
							cx="200"
							cy="165"
							r="8"
							className="fill-primary animate-[pulse_2s_ease-in-out_infinite]"
						/>
					</g>

					{/* Corner tech accents */}
					<g className="stroke-primary/40" strokeWidth="2" fill="none">
						<path d="M200 55 L200 45 M195 50 L205 50" />
						<path d="M95 205 L85 205 L85 195" />
						<path d="M305 205 L315 205 L315 195" />
					</g>
				</g>

				{/* Floating data points */}
				<g filter="url(#glowError)">
					<circle
						cx="70"
						cy="150"
						r="4"
						className="fill-primary/50 animate-[float_4s_ease-in-out_infinite_0.5s]"
					/>
					<circle
						cx="330"
						cy="130"
						r="5"
						className="fill-primary/40 animate-[float_4.5s_ease-in-out_infinite_0.8s]"
					/>
					<circle
						cx="340"
						cy="160"
						r="3"
						className="fill-primary/30 animate-[float_3.5s_ease-in-out_infinite_1s]"
					/>
				</g>

				{/* Status text */}
				<text
					x="200"
					y="240"
					textAnchor="middle"
					className="fill-foreground/60 font-mono"
					style={{ fontSize: "14px" }}
				>
					ERROR
				</text>

				{/* Bottom status line */}
				<g className="stroke-foreground/10" strokeWidth="1">
					<line x1="100" y1="260" x2="300" y2="260" />
					<circle cx="100" cy="260" r="2" className="fill-foreground/20" />
					<circle cx="300" cy="260" r="2" className="fill-foreground/20" />
				</g>

				{/* Blinking status indicators */}
				<g className="fill-primary/50">
					<circle cx="170" cy="260" r="3" className="animate-[pulse_1.5s_ease-in-out_infinite]" />
					<circle cx="200" cy="260" r="3" className="animate-[pulse_1.5s_ease-in-out_infinite_0.3s]" />
					<circle cx="230" cy="260" r="3" className="animate-[pulse_1.5s_ease-in-out_infinite_0.6s]" />
				</g>
			</svg>

			<style>{`
				@keyframes float {
					0%, 100% { transform: translateY(0); }
					50% { transform: translateY(-6px); }
				}
			`}</style>
		</div>
	);
}

function CrashedWarning({ className }: { className?: string }) {
	return (
		<div className={cn("relative", className)}>
			<svg
				viewBox="0 0 400 300"
				className="h-full w-full"
				role="img"
				aria-label="System error illustration"
			>
				<defs>
					<linearGradient id="techGradientCrash" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" className="[stop-color:hsl(var(--destructive))]" stopOpacity="0.8" />
						<stop offset="100%" className="[stop-color:hsl(var(--destructive))]" stopOpacity="0.3" />
					</linearGradient>
					<filter id="glowCrash" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="3" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
					<filter id="subtleGlowCrash" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="2" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Background grid */}
				<g className="stroke-foreground/5" strokeWidth="1">
					{[...Array(9)].map((_, i) => (
						<line key={`v${i}`} x1={40 + i * 40} y1="20" x2={40 + i * 40} y2="280" />
					))}
					{[...Array(7)].map((_, i) => (
						<line key={`h${i}`} x1="40" y1={20 + i * 40} x2="360" y2={20 + i * 40} />
					))}
				</g>

				{/* Broken circuit lines */}
				<g className="stroke-destructive/30" strokeWidth="1.5" fill="none">
					<path d="M40 80 L70 80 L70 60" strokeDasharray="4,4" />
					<path d="M360 100 L330 100 L330 80" strokeDasharray="4,4" />
					<path d="M60 220 L90 220 L90 200" strokeDasharray="4,4" />
					<path d="M340 240 L310 240 L310 220" strokeDasharray="4,4" />
				</g>

				{/* Main crash display */}
				<g>
					{/* Outer frame with glitch effect */}
					<path
						d="M100 70 L300 70 L310 80 L310 200 L300 210 L100 210 L90 200 L90 80 Z"
						className="fill-muted/30 stroke-foreground/20"
						strokeWidth="2"
					/>

					{/* Inner screen */}
					<rect
						x="105"
						y="80"
						width="190"
						height="120"
						rx="4"
						className="fill-background stroke-foreground/10"
						strokeWidth="1"
					/>

					{/* Glitch lines on screen */}
					<g className="stroke-destructive/20" strokeWidth="1">
						<line x1="105" y1="100" x2="295" y2="100" className="animate-[glitch_0.5s_ease-in-out_infinite]" />
						<line x1="105" y1="140" x2="295" y2="140" className="animate-[glitch_0.5s_ease-in-out_infinite_0.2s]" />
						<line x1="105" y1="180" x2="295" y2="180" className="animate-[glitch_0.5s_ease-in-out_infinite_0.4s]" />
					</g>

					{/* X X symbol */}
					<g className="stroke-destructive" strokeWidth="4" strokeLinecap="round" filter="url(#glowCrash)">
						<line x1="150" y1="110" x2="180" y2="150" className="animate-[pulse_1s_ease-in-out_infinite]" />
						<line x1="180" y1="110" x2="150" y2="150" className="animate-[pulse_1s_ease-in-out_infinite]" />
						<line x1="220" y1="110" x2="250" y2="150" className="animate-[pulse_1s_ease-in-out_infinite]" />
						<line x1="250" y1="110" x2="220" y2="150" className="animate-[pulse_1s_ease-in-out_infinite]" />
					</g>

					{/* FATAL text */}
					<text
						x="200"
						y="185"
						textAnchor="middle"
						className="fill-destructive font-mono font-bold animate-[pulse_1s_ease-in-out_infinite]"
						style={{ fontSize: "18px" }}
						filter="url(#subtleGlowCrash)"
					>
						FATAL ERROR
					</text>

					{/* Corner brackets */}
					<g className="stroke-destructive/50" strokeWidth="2" fill="none">
						<path d="M100 85 L110 85 L110 95" />
						<path d="M300 85 L290 85 L290 95" />
						<path d="M100 195 L110 195 L110 185" />
						<path d="M300 195 L290 195 L290 185" />
					</g>
				</g>

				{/* Scattered error indicators */}
				<g filter="url(#subtleGlowCrash)">
					<circle
						cx="60"
						cy="140"
						r="6"
						className="fill-destructive/50 animate-[pulse_0.8s_ease-in-out_infinite]"
					/>
					<circle
						cx="340"
						cy="150"
						r="5"
						className="fill-destructive/40 animate-[pulse_0.8s_ease-in-out_infinite_0.3s]"
					/>
					<circle
						cx="70"
						cy="180"
						r="4"
						className="fill-destructive/30 animate-[pulse_0.8s_ease-in-out_infinite_0.6s]"
					/>
				</g>

				{/* Bottom status */}
				<g>
					<text
						x="200"
						y="240"
						textAnchor="middle"
						className="fill-foreground/50 font-mono"
						style={{ fontSize: "12px" }}
					>
						SYSTEM HALTED
					</text>

					{/* Status line */}
					<line x1="80" y1="260" x2="320" y2="260" className="stroke-foreground/10" strokeWidth="1" />

					{/* Error indicators */}
					<g>
						<circle cx="140" cy="260" r="3" className="fill-destructive/60 animate-[pulse_0.5s_ease-in-out_infinite]" />
						<circle cx="200" cy="260" r="3" className="fill-destructive/60 animate-[pulse_0.5s_ease-in-out_infinite_0.15s]" />
						<circle cx="260" cy="260" r="3" className="fill-destructive/60 animate-[pulse_0.5s_ease-in-out_infinite_0.3s]" />
					</g>
				</g>
			</svg>

			<style>{`
				@keyframes glitch {
					0%, 100% { opacity: 0.2; transform: translateX(0); }
					50% { opacity: 0.5; transform: translateX(2px); }
				}
			`}</style>
		</div>
	);
}
