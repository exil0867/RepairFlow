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
import { useForm } from 'react-hook-form'
import createDiagnosedApplication from '@/app/actions/createDiagnosedApplication'
import toast from 'react-hot-toast'

export default function Additional({ applicationId, onClose }: any) {
  const [state, formAction] = useFormState(createDiagnosedApplication as any, {
    message: null,
    response: null as any,
    error: null,
  }) as any
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
  } = useForm()
  useEffect(() => {
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
      // router.push(`/applications/${state?.response?.id}`)
      reset()
      onClose()
    } else {
      toast.error(state.message)
    }
  }, [pending, state])
  return (
    <DialogContent className='sm:max-w-[425px] bg-white'>
      <DialogHeader>
        <DialogTitle>Définir l&apos;article comme en attente</DialogTitle>
        <DialogDescription>
          Définir un diagnostic pour l&apos;article
        </DialogDescription>
      </DialogHeader>
      <Form ref={myRef} action={formAction} className='grid gap-6 md:gap-8'>
        <input type='hidden' name='application_id' value={applicationId} />
        <FormFieldWrapper>
          <FormField
            labelText='Problème'
            inputElement={
              <Textarea
                placeholder='Problème'
                className='border border-gray-300 p-2 rounded text-gray-700'
                {...register('issue', { required: true })}
              />
            }
          />
        </FormFieldWrapper>
      </Form>
      <DialogFooter>
        <Button variant='outline' onClick={handleSubmit}>
          Définir comme en attente
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
