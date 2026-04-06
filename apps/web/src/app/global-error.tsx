"use client";

import { useEffect } from "react";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Global error:", error);
	}, [error]);

	return (
		<html lang="en">
			<head>
				<style>{`
					* { margin: 0; padding: 0; box-sizing: border-box; }
					:root {
						--primary: #3b82f6;
						--destructive: #ef4444;
						--bg: #ffffff;
						--fg: #0a0a0a;
						--muted: #f4f4f5;
						--muted-fg: #71717a;
					}
					@media (prefers-color-scheme: dark) {
						:root {
							--primary: #60a5fa;
							--destructive: #f87171;
							--bg: #0a0a0a;
							--fg: #fafafa;
							--muted: #27272a;
							--muted-fg: #a1a1aa;
						}
					}
					body {
						font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
						min-height: 100vh;
						display: flex;
						align-items: center;
						justify-content: center;
						background: var(--bg);
						color: var(--fg);
					}
					.container {
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 2rem;
						text-align: center;
						max-width: 480px;
					}
					h1 {
						font-size: 1.5rem;
						font-weight: 700;
						margin-bottom: 0.5rem;
						letter-spacing: -0.02em;
					}
					.illustration {
						width: 100%;
						max-width: 400px;
						height: auto;
						margin-bottom: 1.5rem;
					}
					.muted {
						color: var(--muted-fg);
						font-size: 0.75rem;
						margin-bottom: 1rem;
						font-family: monospace;
					}
					.btn {
						background: transparent;
						color: var(--fg);
						border: 1px solid var(--muted-fg);
						padding: 0.625rem 1.5rem;
						border-radius: 0.5rem;
						font-size: 0.875rem;
						font-weight: 500;
						cursor: pointer;
						transition: all 0.15s;
					}
					.btn:hover {
						background: var(--muted);
					}
					.grid-line { stroke: var(--muted); opacity: 0.3; }
					.circuit-line { stroke: var(--destructive); opacity: 0.3; }
					.frame-fill { fill: var(--muted); opacity: 0.3; }
					.frame-stroke { stroke: var(--fg); opacity: 0.2; }
					.screen-fill { fill: var(--bg); }
					.screen-stroke { stroke: var(--fg); opacity: 0.1; }
					.x-mark { stroke: var(--destructive); }
					.fatal-text { fill: var(--destructive); }
					.corner-bracket { stroke: var(--destructive); opacity: 0.5; }
					.status-text { fill: var(--muted-fg); }
					.status-line { stroke: var(--fg); opacity: 0.1; }
					.error-dot { fill: var(--destructive); opacity: 0.6; }
					.glitch-line { stroke: var(--destructive); opacity: 0.2; }

					@keyframes pulse {
						0%, 100% { opacity: 1; }
						50% { opacity: 0.4; }
					}
					@keyframes glitch {
						0%, 100% { opacity: 0.2; transform: translateX(0); }
						50% { opacity: 0.5; transform: translateX(2px); }
					}
					.pulse { animation: pulse 1s ease-in-out infinite; }
					.pulse-delay-1 { animation: pulse 0.5s ease-in-out infinite 0.15s; }
					.pulse-delay-2 { animation: pulse 0.5s ease-in-out infinite 0.3s; }
					.glitch1 { animation: glitch 0.5s ease-in-out infinite; }
					.glitch2 { animation: glitch 0.5s ease-in-out infinite 0.2s; }
					.glitch3 { animation: glitch 0.5s ease-in-out infinite 0.4s; }
				`}</style>
			</head>
			<body>
				<div className="container">
					<h1>System Error</h1>

					<svg
						viewBox="0 0 400 300"
						className="illustration"
						role="img"
						aria-label="System error"
					>
						<defs>
							<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
								<feGaussianBlur stdDeviation="3" result="blur" />
								<feMerge>
									<feMergeNode in="blur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
						</defs>

						{/* Background grid */}
						{[...Array(9)].map((_, i) => (
							<line key={`v${i}`} x1={40 + i * 40} y1="20" x2={40 + i * 40} y2="280" className="grid-line" strokeWidth="1" />
						))}
						{[...Array(7)].map((_, i) => (
							<line key={`h${i}`} x1="40" y1={20 + i * 40} x2="360" y2={20 + i * 40} className="grid-line" strokeWidth="1" />
						))}

						{/* Broken circuit lines */}
						<path d="M40 80 L70 80 L70 60" className="circuit-line" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
						<path d="M360 100 L330 100 L330 80" className="circuit-line" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
						<path d="M60 220 L90 220 L90 200" className="circuit-line" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />
						<path d="M340 240 L310 240 L310 220" className="circuit-line" strokeWidth="1.5" fill="none" strokeDasharray="4,4" />

						{/* Main crash display */}
						{/* Outer frame */}
						<path
							d="M100 70 L300 70 L310 80 L310 200 L300 210 L100 210 L90 200 L90 80 Z"
							className="frame-fill frame-stroke"
							strokeWidth="2"
						/>

						{/* Inner screen */}
						<rect
							x="105"
							y="80"
							width="190"
							height="120"
							rx="4"
							className="screen-fill screen-stroke"
							strokeWidth="1"
						/>

						{/* Glitch lines */}
						<line x1="105" y1="100" x2="295" y2="100" className="glitch-line glitch1" strokeWidth="1" />
						<line x1="105" y1="140" x2="295" y2="140" className="glitch-line glitch2" strokeWidth="1" />
						<line x1="105" y1="180" x2="295" y2="180" className="glitch-line glitch3" strokeWidth="1" />

						{/* X X symbol */}
						<g className="x-mark pulse" strokeWidth="4" strokeLinecap="round" filter="url(#glow)">
							<line x1="150" y1="110" x2="180" y2="150" />
							<line x1="180" y1="110" x2="150" y2="150" />
							<line x1="220" y1="110" x2="250" y2="150" />
							<line x1="250" y1="110" x2="220" y2="150" />
						</g>

						{/* FATAL text */}
						<text
							x="200"
							y="185"
							textAnchor="middle"
							className="fatal-text pulse"
							style={{ fontSize: "18px", fontFamily: "monospace", fontWeight: "bold" }}
						>
							FATAL ERROR
						</text>

						{/* Corner brackets */}
						<path d="M100 85 L110 85 L110 95" className="corner-bracket" strokeWidth="2" fill="none" />
						<path d="M300 85 L290 85 L290 95" className="corner-bracket" strokeWidth="2" fill="none" />
						<path d="M100 195 L110 195 L110 185" className="corner-bracket" strokeWidth="2" fill="none" />
						<path d="M300 195 L290 195 L290 185" className="corner-bracket" strokeWidth="2" fill="none" />

						{/* Scattered error indicators */}
						<circle cx="60" cy="140" r="6" className="error-dot pulse" />
						<circle cx="340" cy="150" r="5" className="error-dot pulse-delay-1" />
						<circle cx="70" cy="180" r="4" className="error-dot pulse-delay-2" />

						{/* Bottom status */}
						<text
							x="200"
							y="240"
							textAnchor="middle"
							className="status-text"
							style={{ fontSize: "12px", fontFamily: "monospace" }}
						>
							SYSTEM HALTED
						</text>

						{/* Status line */}
						<line x1="80" y1="260" x2="320" y2="260" className="status-line" strokeWidth="1" />

						{/* Error indicators */}
						<circle cx="140" cy="260" r="3" className="error-dot pulse" />
						<circle cx="200" cy="260" r="3" className="error-dot pulse-delay-1" />
						<circle cx="260" cy="260" r="3" className="error-dot pulse-delay-2" />
					</svg>

					{error.digest && (
						<p className="muted">Error ID: {error.digest}</p>
					)}

					<button type="button" className="btn" onClick={reset}>
						Reload Page
					</button>
				</div>
			</body>
		</html>
	);
}
