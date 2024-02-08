import { Application } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformArray(arr: any, selectedProp: any) {
  return arr.map((element: any) => ({
    id: element.id,
    value: element[selectedProp],
  }))
}

export function renderStatus(status: string) {
  switch (status) {
    case 'CANCELLED':
      return 'Annulé'
    case 'REPAIRED':
      return 'Réparé'
    case 'REPAIRING':
      return 'réparer'
  }
}
