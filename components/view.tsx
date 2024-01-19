import { ReactNode } from 'react'

export const ViewField = ({
  title,
  value,
}: {
  title: ReactNode
  value: ReactNode
}) => {
  return (
    <>
      <div className='text-lg font-semibold'>{title}</div>
      <div className='text-gray-600'>{value}</div>
    </>
  )
}

export const ViewFieldWrapper = ({ children }: { children: ReactNode }) => {
  return <div className='grid gap-2'>{children}</div>
}

export const ViewFieldSubWrapper = ({
  children,
  title,
}: {
  children: ReactNode
  title: ReactNode
}) => {
  return (
    <>
      <div className='text-lg font-semibold'>{title}</div>
      <div className='text-gray-600'>{children}</div>
    </>
  )
}

export const ViewFieldSubWrapperField = ({
  title,
  value,
}: {
  title: ReactNode
  value: ReactNode
}) => {
  return (
    <div>
      <span className='text-gray-800 font-medium'>{title}</span>
      <div>{value}</div>
    </div>
  )
}
