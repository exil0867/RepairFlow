'use client'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { registerRes } from './page'
import { Button } from '@/components/ui/button'
import { FormField, FormFieldWrapper } from '@/components/form'
import { Input } from '@/components/ui/input'

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
      <FormFieldWrapper>
        <FormField
          labelText={`Nom d'utilisateur`}
          inputElement={
            <Input
              placeholder={`Nom d'utilisateur`}
              type='text'
              className='border border-gray-300 p-2 rounded text-gray-700'
              {...register('username', { required: true })}
            />
          }
        />
      </FormFieldWrapper>
      <FormFieldWrapper>
        <FormField
          labelText='Mot de passe'
          inputElement={
            <Input
              placeholder='Mot de passe'
              type='password'
              className='border border-gray-300 p-2 rounded text-gray-700'
              {...register('password', { required: true })}
            />
          }
        />
      </FormFieldWrapper>
      <div className={`space-y-2 mt-6 bg-slate-900 text-white `}>
        <Button disabled={pending} type='submit' className='w-full'>
          S&apos;inscrire
        </Button>
      </div>
    </form>
  )
}
