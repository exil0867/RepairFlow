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
import { formRes } from '../customers/create/page'
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
import createDevice from '../../actions/createDevice'
import router from 'next/router'
import Form, {
  FormField,
  FormFieldSubWrapper,
  FormFieldWrapper,
} from '@/components/form'
import { Textarea } from '@/components/ui/textarea'
import { validateCreateDevice } from '../../validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormResponse } from '../../actions/type'
import { ErrorMessage } from '@hookform/error-message'
import { InputError } from '@/components/inputError'

export interface FormValues {
  customerId: string
  brand: string
  model: string
  serialNumber: string
  remark: string
}

export default function DialogDemo({
  setDevice_,
  onClose,
  customerId,
}: {
  setDevice_: any
  onClose: any
  customerId: any
}) {
  const {
    reset,
    register,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(validateCreateDevice),
  })
  const [state, formAction] = useFormState<FormResponse, FormData>(
    createDevice,
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
      setDevice_({
        id: state?.response?.id,
        value: state?.response?.model,
      })
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
  }, [pending, reset, setDevice_, state])

  return (
    <DialogContent className='sm:max-w-[425px] bg-white'>
      <DialogHeader>
        <DialogTitle>Créer un appareil</DialogTitle>
        <DialogDescription>
          Créez un nouvel appareil à ajouter à la base de données.
        </DialogDescription>
      </DialogHeader>
      <Form ref={myRef} action={formAction} className='grid gap-6 md:gap-8'>
        <input type='hidden' name='customerId' value={customerId} />
        <FormFieldWrapper>
          <FormField
            labelText='Marque'
            hint={`La marque de l'appareil`}
            inputElement={
              <>
                <Input
                  type='text'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('brand')}
                />
                <ErrorMessage
                  name='brand'
                  errors={errors}
                  as={<InputError />}
                />
              </>
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField
            labelText='Modèle'
            hint={`Le modèle de l'appareil`}
            required
            inputElement={
              <>
                <Input
                  type='text'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('model')}
                />
                <ErrorMessage
                  name='model'
                  errors={errors}
                  as={<InputError />}
                />
              </>
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField
            labelText='Numéro de série'
            hint={`Le numéro de série de l'appareil`}
            inputElement={
              <>
                <Input
                  type='text'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('serialNumber')}
                />
                <ErrorMessage
                  name='serialNumber'
                  errors={errors}
                  as={<InputError />}
                />
              </>
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField
            labelText={`Remarque`}
            hint={`Ajouter une remarque sur l'appareil`}
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
