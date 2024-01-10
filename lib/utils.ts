import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformArray(arr: any, selectedProp: any) {
  return arr.map((element) => ({
    id: element.id,
    value: element[selectedProp],
  }))
}
