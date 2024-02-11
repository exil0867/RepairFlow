'use client'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '../actions/auth'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormField, FormFieldWrapper } from '@/components/form'
import { useEffect } from 'react'

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
  useEffect(() => {
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } else {
      toast.error(state.message)
    }
  }, [pending, router, state])

  return (
    <form action={dispatch}>
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
      <div className={`space-y-2 mt-6 bg-slate-900 text-white`}>
        <Button disabled={pending} type='submit' className='w-full'>
          Se connecter
        </Button>
      </div>
    </form>
  )
}
