'use client'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '../actions/auth'

export default function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useForm()

  const [state, dispatch] = useFormState(authenticate as any, {
    message: null,
    error: null,
  })
  const { pending } = useFormStatus()

  const router = useRouter()

  return (
    <form action={dispatch}>
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
      <div
        className='flex h-8 items-end space-x-1'
        aria-live='polite'
        aria-atomic='true'
      >
        {state.error && (
          <>
            <p className='text-sm text-red-500'>{state.error}</p>
          </>
        )}
      </div>
    </form>
  )
}
