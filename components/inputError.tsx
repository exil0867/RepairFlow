import { cn } from '@/lib/utils'
import React from 'react'

export function InputError({
  children,
  className = '',
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn('text-sm text-red-500 dark:text-red-400', className)}>
      {children}
    </span>
  )
}
