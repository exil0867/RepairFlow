'use client'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { formRes } from './page'

export default function Form({ createCustomer }: { createCustomer: any }) {
  const {
    register,
    formState: { errors },
  } = useForm()

  const router = useRouter()

  const [state, formAction] = useFormState(createCustomer, {
    message: null,
    error: null,
  })

  const { pending } = useFormStatus()

  useEffect(() => {
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
    } else {
      toast.error(state.message)
    }
  }, [pending, router, state])

  return (
    <form action={formAction}>
      <input
        type='text'
        placeholder='Name'
        {...register('name', { required: true })}
      />
      <input
        type='text'
        placeholder='Address'
        {...register('address', { required: true })}
      />

      <input
        type='text'
        placeholder='Phone Number'
        {...register('phone_number', { required: true })}
      />

      <input type='submit' />
    </form>
  )
}
