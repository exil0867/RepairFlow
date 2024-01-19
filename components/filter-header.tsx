import { ReactNode } from 'react'

export function FilterHeader({ children }: { children: ReactNode }) {
  return <div className='flex gap-4 mb-8'>{children}</div>
}

export function FilterWrapper({ children }: { children: ReactNode }) {
  return <div className='flex flex-col gap-2'>{children}</div>
}
