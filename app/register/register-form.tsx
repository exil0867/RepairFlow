'use client'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { registerRes } from './page'

export default function RegisterForm({ registerUser }: { registerUser: any }) {
  const {
    register,
    formState: { errors },
  } = useForm()

  const router = useRouter()

  const [state, formAction] = useFormState(registerUser, {
    message: null,
    error: null,
  })

  const { pending } = useFormStatus()

  useEffect(() => {
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      toast.error(state.message)
    }
  }, [pending, router, state])

  return (
    <form action={formAction}>
      <input
        type='text'
        placeholder='username'
        {...register('username', { required: true })}
      />
      <input
        type='password'
        placeholder='password'
        {...register('password', { required: true })}
      />

      <input type='submit' />
    </form>
  )
}
