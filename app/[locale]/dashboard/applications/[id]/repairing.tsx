'use client'
import Form, { FormField, FormFieldWrapper } from '@/components/form'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { FieldPath, useForm } from 'react-hook-form'
import createDiagnosedApplication from '@/app/actions/createDiagnosedApplication'
import toast from 'react-hot-toast'
import { FormResponse } from '@/app/actions/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { validateUpdateCustomer } from '@/app/validation'
import { InputError } from '@/components/inputError'
import { ErrorMessage } from '@hookform/error-message'

export interface FormValues {
  issue: string
}

export default function Additional({ applicationId, onClose }: any) {
  const [state, formAction] = useFormState<FormResponse, FormData>(
    createDiagnosedApplication,
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
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(validateUpdateCustomer),
  })
  useEffect(() => {
    if (!state) return
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
      reset()
      onClose()
    } else {
      toast.error(state.message)
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<FormValues>, {
          message: error.message,
        })
      })
    }
  }, [pending, state])
  return (
    <DialogContent className='sm:max-w-[425px] bg-white'>
      <DialogHeader>
        <DialogTitle>Définir l&apos;article comme diagnostic</DialogTitle>
        <DialogDescription>
          Entrez les informations de diagnostic
        </DialogDescription>
      </DialogHeader>
      <Form
        ref={myRef}
        action={async (data: FormData) => {
          data.set('applicationId', applicationId)
          formAction(data)
        }}
        className='grid gap-6 md:gap-8'
      >
        <FormFieldWrapper>
          <FormField
            labelText='Problème'
            hint={`Décrire le problème suite au diagnostic`}
            inputElement={
              <>
                <Textarea
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('issue')}
                />
                <ErrorMessage
                  name='issue'
                  errors={errors}
                  as={<InputError />}
                />
              </>
            }
          />
        </FormFieldWrapper>
      </Form>
      <DialogFooter>
        <Button variant='outline' onClick={handleSubmit}>
          Diagnostiquer
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
