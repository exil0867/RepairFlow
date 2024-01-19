import { ReactNode } from 'react'

export const ListItem = ({
  title,
  subtitle,
  footer,
  button,
}: {
  title: ReactNode
  subtitle: ReactNode
  footer: ReactNode
  button: ReactNode
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800'>
      <div className='md:col-span-2'>
        <h3 className='font-semibold'>{title}</h3>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{subtitle}</p>
        <p className='text-sm text-gray-500 dark:text-gray-400'>{footer}</p>
      </div>
      <div className='flex justify-end'>{button}</div>
    </div>
  )
}
