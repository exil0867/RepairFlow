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
import setArticleAsCancelled from '@/app/actions/setArticleAsCancelled'

export default function Additional({ applicationId, onClose }: any) {
  return (
    <DialogContent className='sm:max-w-[425px] bg-white'>
      <DialogHeader>
        <DialogTitle>Annuler la tâche</DialogTitle>
        <DialogDescription>Es-tu sûr?</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant='outline'
          onClick={async () => {
            const response = await setArticleAsCancelled(applicationId)
            if (!response.error) {
              toast.success(response.message)
              onClose()
            } else {
              toast.error(response.message)
            }
          }}
        >
          Annuler
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
