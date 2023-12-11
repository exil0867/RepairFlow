'use client'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useForm()

  const router = useRouter()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        signIn('credentials', {
          redirect: false,
          username: e.currentTarget.username.value,
          password: e.currentTarget.password.value,
          // @ts-ignore
        }).then(({ error }) => {
          if (error) {
            toast.error(error)
          } else {
            router.refresh()
            router.push('/protected')
          }
        })
      }}
    >
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
