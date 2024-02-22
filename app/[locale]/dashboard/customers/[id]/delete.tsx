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
import deleteCustomer from '@/app/actions/deleteCustomer'
import deleteApplication from '@/app/actions/deleteApplication'
import { useRouter } from 'next/navigation'

export default function Delete({ id, onClose }: any) {
  const router = useRouter()
  return (
    <DialogContent className='sm:max-w-[425px] bg-white'>
      <DialogHeader>
        <DialogTitle>Supprimer le client</DialogTitle>
        <DialogDescription>Es-tu sûr?</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant='outline'
          onClick={async () => {
            const response = await deleteCustomer(id)
            if (!response.error) {
              toast.success(response.message)
              router.push(`/dashboard/customers`)
              onClose()
            } else {
              toast.error(response.message)
            }
            onClose()
          }}
        >
          Supprimer le client
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
