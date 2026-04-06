"use client";

import { useMediaQuery } from "./use-media-query";
import { breakpoints, type Breakpoint } from "~/lib/utils";

/**
 * Hook to detect if the viewport is at or above a specific breakpoint
 * @param breakpoint - The breakpoint name (xs, sm, md, lg, xl, 2xl)
 * @returns boolean indicating if viewport width >= breakpoint
 */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const width = breakpoints[breakpoint];
  return useMediaQuery(`(min-width: ${width}px)`);
}

/**
 * Hook to detect if the viewport is below a specific breakpoint
 * @param breakpoint - The breakpoint name (xs, sm, md, lg, xl, 2xl)
 * @returns boolean indicating if viewport width < breakpoint
 */
export function useBreakpointDown(breakpoint: Breakpoint): boolean {
  const width = breakpoints[breakpoint];
  return useMediaQuery(`(max-width: ${width - 1}px)`);
}

/**
 * Hook to detect if the viewport is between two breakpoints
 * @param min - The minimum breakpoint (inclusive)
 * @param max - The maximum breakpoint (exclusive)
 * @returns boolean indicating if viewport is between the breakpoints
 */
export function useBreakpointBetween(
  min: Breakpoint,
  max: Breakpoint
): boolean {
  const minWidth = breakpoints[min];
  const maxWidth = breakpoints[max];
  return useMediaQuery(
    `(min-width: ${minWidth}px) and (max-width: ${maxWidth - 1}px)`
  );
}

/**
 * Hook to get the current active breakpoint
 * @returns The current breakpoint name or null if below xs
 */
export function useCurrentBreakpoint(): Breakpoint | null {
  const is2xl = useBreakpoint("2xl");
  const isXl = useBreakpoint("xl");
  const isLg = useBreakpoint("lg");
  const isMd = useBreakpoint("md");
  const isSm = useBreakpoint("sm");
  const isXs = useBreakpoint("xs");

  if (is2xl) return "2xl";
  if (isXl) return "xl";
  if (isLg) return "lg";
  if (isMd) return "md";
  if (isSm) return "sm";
  if (isXs) return "xs";
  return null;
}
