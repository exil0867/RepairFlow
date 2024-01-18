import React, { forwardRef, ReactNode } from 'react'

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
