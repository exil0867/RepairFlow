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
import updateApplicationStatus from '@/app/actions/updateApplicationStatus'

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
        <DialogTitle>Cancel Application</DialogTitle>
        <DialogDescription>Are you sure?</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant='outline'
          onClick={async () => {
            await updateApplicationStatus(applicationId, 'CANCELLED')
            onClose()
          }}
        >
          Cancel Application
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
