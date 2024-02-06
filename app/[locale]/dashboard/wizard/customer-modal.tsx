import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
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
import createCustomer from '../../actions/createCustomer'
import router from 'next/router'
import Form, {
  FormField,
  FormFieldSubWrapper,
  FormFieldWrapper,
} from '@/components/form'
import { Textarea } from '@/components/ui/textarea'

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
    formState: { errors },
  } = useForm()
  const [state, formAction] = useFormState(createCustomer as any, {
    message: null,
    response: null as any,
    error: null,
  })

  const myRef = useRef(null) as any
  const handleSubmit = (e: any) => {
    e.preventDefault()
    myRef.current.requestSubmit()
  }

  const { pending } = useFormStatus()
  useEffect(() => {
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
      setCustomer_({ id: state?.response?.id, value: state?.response?.name })
      reset()
      onClose()
    } else {
      toast.error(state.message)
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
            labelText='Nom du client'
            inputElement={
              <Input
                type='text'
                placeholder='Nom du client'
                className='border border-gray-300 p-2 rounded text-gray-700'
                {...register('name', { required: true })}
              />
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField
            labelText='Adresse du client'
            inputElement={
              <Textarea
                placeholder='Adresse du client'
                className='border border-gray-300 p-2 rounded text-gray-700'
                {...register('address', { required: true })}
              />
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField
            labelText='Numéro de téléphone'
            inputElement={
              <Input
                type='text'
                placeholder='Numéro de téléphone'
                className='border border-gray-300 p-2 rounded text-gray-700'
                {...register('phone_number', { required: true })}
              />
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
