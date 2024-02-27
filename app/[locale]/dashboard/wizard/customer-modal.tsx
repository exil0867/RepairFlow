import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FieldPath, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ChevronsUpDown } from 'lucide-react'
import CustomerModal from './customer-modal'
import DeviceModal from './device-modal'

import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import createCustomer from '../../actions/createCustomer'
import router from 'next/router'
import Form, {
  FormField,
  FormFieldSubWrapper,
  FormFieldWrapper,
} from '@/components/form'
import { Textarea } from '@/components/ui/textarea'
import { FormResponse } from '../../actions/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { validateCreateCustomer } from '../../validation'
import { InputError } from '@/components/inputError'
import { ErrorMessage } from '@hookform/error-message'

export interface FormValues {
  name: string
  address: string
  phoneNumber: string
  taxId: string
  remark: string
}

export default function DialogDemo({
  setCustomer_,
  onClose,
}: {
  setCustomer_: any
  onClose: any
}) {
  const {
    reset,
    register,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(validateCreateCustomer),
  })
  const [state, formAction] = useFormState<FormResponse, FormData>(
    createCustomer,
    {
      message: null,
      response: null as any,
      error: null,
    },
  )

  const myRef = useRef(null) as any
  const handleSubmit = (e: any) => {
    e.preventDefault()
    myRef.current.requestSubmit()
  }

  const { pending } = useFormStatus()
  useEffect(() => {
    if (!state) return
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
      setCustomer_({ id: state?.response?.id, value: state?.response?.name })
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
  }, [pending, reset, setCustomer_, state])

  return (
    <DialogContent className='sm:max-w-[425px] bg-white'>
      <DialogHeader>
        <DialogTitle>Créer un client</DialogTitle>
        <DialogDescription>
          Créez un nouveau client à ajouter à la base de données.
        </DialogDescription>
      </DialogHeader>
      <Form ref={myRef} action={formAction} className='grid gap-6 md:gap-8'>
        <FormFieldWrapper>
          <FormField
            labelText='Nom'
            hint={`Nom du client`}
            required
            inputElement={
              <>
                <Input
                  type='text'
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
            labelText='Adresse'
            hint={`Adresse du client`}
            inputElement={
              <>
                <Textarea
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
            hint='Numéro de téléphone du client'
            inputElement={
              <>
                <Input
                  type='text'
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
            hint={`Numéro d'immatriculation fiscale du client`}
            inputElement={
              <>
                <Input
                  type='text'
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
        <FormFieldWrapper>
          <FormField
            labelText='Remarque'
            hint={`Ajouter une remarque au client`}
            inputElement={
              <>
                <Textarea
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('remark')}
                />
                <ErrorMessage
                  name='remark'
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
          Créer un client
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
