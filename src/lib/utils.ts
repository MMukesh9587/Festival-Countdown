import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBasename(path: string) {
  return path.split('/').pop()?.split('.')[0] ?? '';
}
