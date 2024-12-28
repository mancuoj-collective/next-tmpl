import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
