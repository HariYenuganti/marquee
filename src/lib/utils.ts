import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Canonical site URL. Driven by `NEXT_PUBLIC_SITE_URL` (set per deployment)
 * with a localhost fallback so local dev and CI don't need it.
 *
 * Always returns a URL without trailing slash so callers can append paths
 * without worrying about double slashes.
 */
export function siteUrl(path = ''): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    'http://localhost:3000';
  const suffix = path.startsWith('/') ? path : path ? `/${path}` : '';
  return `${raw}${suffix}`;
}
