import { clsx, type ClassValue } from "clsx"

import { twMerge } from "tailwind-merge"

// Utility function used by shadcn/ui to conditionally join classNames
// and intelligently merge Tailwind classes.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

