'use client'
import { z } from 'zod'
import createCustomer from '@/app/actions/createCustomer'
import { useFormState, useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Form from '@/components/form'

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
    <Form className='grid gap-6 md:gap-8' action={formAction}>
      <div className='grid gap-2'>
        <Label htmlFor='name' className='text-lg font-semibold text-gray-600'>
          Name
        </Label>
        <Input
          type='text'
          placeholder='Name'
          className='border border-gray-300 p-2 rounded text-gray-700'
          {...register('name', { required: true })}
        />
      </div>{' '}
      <div className='grid gap-2'>
        <Label htmlFor='name' className='text-lg font-semibold text-gray-600'>
          Address
        </Label>
        <Input
          type='text'
          placeholder='Home Address'
          className='border border-gray-300 p-2 rounded text-gray-700'
          {...register('address', { required: true })}
        />
      </div>{' '}
      <div className='grid gap-2'>
        <Label htmlFor='name' className='text-lg font-semibold text-gray-600'>
          Phone Number
        </Label>
        <Input
          type='text'
          placeholder='Phone Number'
          className='border border-gray-300 p-2 rounded text-gray-700'
          {...register('phone_number', { required: true })}
        />
      </div>
      <Button variant='outline' type='submit'>
        Create Customer
      </Button>
    </Form>
  )
}
