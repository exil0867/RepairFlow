'use client'
import { z } from 'zod'
import createCustomer from '@/app/actions/createCustomer'
import { useFormState, useFormStatus } from 'react-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FieldPath, useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import toast from 'react-hot-toast'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Form, { FormField, FormFieldWrapper } from '@/components/form'
import { Textarea } from '@/components/ui/textarea'
import Wrapper from '@/components/wrapper'
import useZodForm from '@/hooks/useZodForm'
import { validateCreateCustomer } from '@/app/validation'
import { InputError } from '@/components/inputError'
import { FormResponse } from '@/app/actions/type'

export interface FormValues {
  name: string
  address: string
  phoneNumber: string
  taxId: string
}

export default function CreateCustomer() {
  const router = useRouter()
  const [state, formAction] = useFormState<FormResponse, FormData>(
    createCustomer,
    {
      message: null,
      response: null as any,
      error: null,
    },
  )
  const { pending } = useFormStatus()

  const myRef = useRef(null) as any
  const handleSubmit = (e: any) => {
    e.preventDefault()
    myRef.current.requestSubmit()
  }

  const {
    reset,
    register,
    formState: { errors, isValid },
    setError,
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(validateCreateCustomer),
  })

  useEffect(() => {
    if (!state) return
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
      router.push(`/dashboard/customers/${state?.response?.id}`)
    } else {
      toast.error(state.message)
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<FormValues>, {
          message: error.message,
        })
      })
    }
  }, [pending, router, state])
  return (
    <Wrapper
      title='Créer un client'
      footer={
        <>
          <Button variant='outline' onClick={handleSubmit}>
            Créer un client
          </Button>
        </>
      }
    >
      <Form className='grid gap-6 md:gap-8' ref={myRef} action={formAction}>
        <FormFieldWrapper>
          <FormField
            labelText='Nom du client'
            required
            inputElement={
              <>
                <Input
                  type='text'
                  placeholder='Nom du client'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('name')}
                />
                <ErrorMessage name='name' errors={errors} as={<InputError />} />
              </>
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField
            labelText='Adresse du client'
            inputElement={
              <>
                <Textarea
                  placeholder='Adresse du client'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('address')}
                />
                <ErrorMessage
                  name='address'
                  errors={errors}
                  as={<InputError />}
                />
              </>
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField
            labelText='Numéro de téléphone'
            inputElement={
              <>
                <Input
                  type='text'
                  placeholder='Numéro de téléphone'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('phoneNumber')}
                />
                <ErrorMessage
                  name='phoneNumber'
                  errors={errors}
                  as={<InputError />}
                />
              </>
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField
            labelText='Matricule fiscal'
            inputElement={
              <>
                <Input
                  type='text'
                  placeholder='Matricule fiscal'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('taxId')}
                />
                <ErrorMessage
                  name='taxId'
                  errors={errors}
                  as={<InputError />}
                />
              </>
            }
          />
        </FormFieldWrapper>
      </Form>
    </Wrapper>
  )
}
