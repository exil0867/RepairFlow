'use client'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { formRes } from './page'

export default function Form({ createDevice }: { createDevice: any }) {
  const {
    register,
    formState: { errors },
  } = useForm()

  const router = useRouter()

  const [state, formAction] = useFormState(createDevice, {
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
        placeholder='Serial Number'
        {...register('serial_number', { required: true })}
      />
      <input
        type='text'
        placeholder='Modal'
        {...register('model', { required: true })}
      />

      <input
        type='text'
        placeholder='Brand'
        {...register('brand', { required: true })}
      />

      <input type='submit' />
    </form>
  )
}
