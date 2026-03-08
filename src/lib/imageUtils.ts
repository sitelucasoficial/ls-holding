/**
 * Appends a cache-busting timestamp to Supabase Storage URLs.
 * Uses a stable timestamp per page load to avoid re-renders breaking cache.
 */
const PAGE_LOAD_TS = Date.now();

export function bustCache(url: string | undefined | null): string {
  if (!url) return "";
  const clean = url.replace(/[?&]t=\d+/, "");
  const separator = clean.includes("?") ? "&" : "?";
  return `${clean}${separator}t=${PAGE_LOAD_TS}`;
}

/**
 * Default dark placeholder for broken images
 */
export const PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23111' width='400' height='400'/%3E%3C/svg%3E";

/**
 * onError handler for <img> tags — shows neutral dark placeholder
 */
export function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.src !== PLACEHOLDER_IMG) {
    img.src = PLACEHOLDER_IMG;
  }
}
