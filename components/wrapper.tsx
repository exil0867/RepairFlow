import React, { ReactNode } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

type Props = {
  title: string
  children: ReactNode
  footer: ReactNode
}

function Wrapper({ title, children, footer }: Props) {
  return (
    <main className='p-6 md:p-8 lg:p-10'>
      <Card className='space-y-6'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && <CardFooter className='flex gap-4'>{footer}</CardFooter>}
      </Card>
    </main>
  )
}

export default Wrapper
