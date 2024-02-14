import React from 'react'

export function InputError({ children }: { children?: React.ReactNode }) {
  return (
    <span className='text-sm text-red-500 dark:text-red-400'>{children}</span>
  )
}
