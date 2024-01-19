'use client'
import { z } from 'zod'
import createCustomer from '@/app/actions/createCustomer'
import { useFormState, useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Form, { FormField, FormFieldWrapper } from '@/components/form'
import { Textarea } from '@/components/ui/textarea'
import Wrapper from '@/components/wrapper'

const schema = z.object({
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
})

export type formRes = {
  message: string
  error: boolean
}

export default function CreateCustomer() {
  const router = useRouter()
  const [state, formAction] = useFormState(createCustomer as any, {
    message: null,
    response: null as any,
    error: null,
  })
  const { pending } = useFormStatus()

  const myRef = useRef(null) as any
  const handleSubmit = (e: any) => {
    e.preventDefault()
    myRef.current.requestSubmit()
  }

  const {
    reset,
    register,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
      router.push(`/dashboard/customers/${state?.response?.id}`)
    } else {
      toast.error(state.message)
    }
  }, [pending, router, state])
  return (
    <Wrapper
      title='Create customer'
      footer={
        <>
          <Button variant='outline' onClick={handleSubmit}>
            Create Customer
          </Button>
        </>
      }
    >
      <Form className='grid gap-6 md:gap-8' ref={myRef} action={formAction}>
        <FormFieldWrapper>
          <FormField
            labelText='Customer Name'
            inputElement={
              <Input
                type='text'
                placeholder='Customer Name'
                className='border border-gray-300 p-2 rounded text-gray-700'
                {...register('name', { required: true })}
              />
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField
            labelText='Customer Address'
            inputElement={
              <Textarea
                placeholder='Customer Address'
                className='border border-gray-300 p-2 rounded text-gray-700'
                {...register('address', { required: true })}
              />
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField
            labelText='Phone Number'
            inputElement={
              <Input
                type='text'
                placeholder='Phone Number'
                className='border border-gray-300 p-2 rounded text-gray-700'
                {...register('phone_number', { required: true })}
              />
            }
          />
        </FormFieldWrapper>
      </Form>
    </Wrapper>
  )
}
