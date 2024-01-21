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
import createConcludedApplication from '@/app/actions/createConcludedApplication'
import toast from 'react-hot-toast'

export default function Additional({ applicationId, onClose }: any) {
  const [state, formAction] = useFormState(createConcludedApplication as any, {
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
        <DialogTitle>Create Concluded Application</DialogTitle>
        <DialogDescription>
          Create a new Concluded Application to be added to the database.
        </DialogDescription>
      </DialogHeader>
      <Form ref={myRef} action={formAction} className='grid gap-6 md:gap-8'>
        <input type='hidden' name='application_id' value={applicationId} />

        <FormFieldWrapper>
          <FormField
            labelText='Changes'
            inputElement={
              <Textarea
                placeholder='Changes'
                className='border border-gray-300 p-2 rounded text-gray-700'
                {...register('changes', { required: true })}
              />
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField
            labelText='Cost'
            inputElement={
              <Input
                type='text'
                placeholder='Cost'
                className='border border-gray-300 p-2 rounded text-gray-700'
                {...register('cost', { required: true })}
              />
            }
          />
        </FormFieldWrapper>
      </Form>
      <DialogFooter>
        <Button variant='outline' onClick={handleSubmit}>
          Create Concluded Application
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
