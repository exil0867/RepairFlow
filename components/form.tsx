import React, { forwardRef, ReactElement, ReactNode } from 'react'
import { Label } from './ui/label'

interface Form {
  children: ReactNode
  [x: string]: any
}

const Form = forwardRef<HTMLFormElement, Form>(function (props, ref) {
  return (
    <form ref={ref} {...props}>
      {props.children}
    </form>
  )
})

Form.displayName = 'Form'

export default Form

interface FormFieldProps {
  labelText: string
  labelClassName?: string
  inputElement: ReactElement
  inputClassName?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  labelText,
  labelClassName = 'text-lg font-semibold text-gray-600',
  inputElement,
  inputClassName = 'border border-gray-300 p-2 rounded text-gray-700',
}) => {
  return (
    <>
      <Label className={labelClassName}>{labelText}</Label>
      {React.cloneElement(inputElement, {
        className: `${inputClassName} ${inputElement.props.className || ''}`,
      })}
    </>
  )
}

export const FormFieldWrapper = ({ children }: { children: ReactNode }) => {
  return <div className='grid gap-2'>{children}</div>
}

export const FormFieldSubWrapper = ({
  children,
  subtitle,
}: {
  children: ReactNode
  subtitle: string
}) => {
  return (
    <>
      <div className='text-lg font-semibold text-gray-600'>{subtitle}</div>
      <div className='grid gap-2 text-gray-700'>{children}</div>
    </>
  )
}
