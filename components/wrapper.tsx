import React, { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  footer: ReactNode
}

function Wrapper({ title, children, footer }: Props) {
  return (
    <main className='container mx-auto px-4 md:px-6 py-8'>
      <div className='flex flex-col gap-6'>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {children}
        </div>
        {footer && <div className='flex gap-4'>{footer}</div>}
      </div>
    </main>
  )
}

export default Wrapper
