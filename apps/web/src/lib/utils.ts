import { env } from "../../env.mjs";

/**
 * Safely parse JSON string, returns undefined on failure
 */
export const safeJsonParse = <T>(json: unknown): T | undefined => {
  if (typeof json !== "string" || json.trim() === "") {
    return undefined;
  }

  try {
    return JSON.parse(json) as T;
  } catch {
    return undefined;
  }
};

/**
 * Safely stringify data to JSON, returns undefined on failure
 */
export const safeJsonStringify = (data: unknown): string | undefined => {
  if (
    data === undefined ||
    typeof data === "function" ||
    typeof data === "symbol"
  ) {
    return undefined;
  }

  try {
    return JSON.stringify(data);
  } catch {
    return undefined;
  }
};

export const absoluteUrl = (path: string) =>
  `${env.NEXT_PUBLIC_APP_URL}${path}`;
