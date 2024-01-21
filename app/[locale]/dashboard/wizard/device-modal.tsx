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
import createDevice from '../../actions/createDevice'
import router from 'next/router'
import Form, {
  FormField,
  FormFieldSubWrapper,
  FormFieldWrapper,
} from '@/components/form'
import { Textarea } from '@/components/ui/textarea'

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
    formState: { errors },
  } = useForm()
  const [state, formAction] = useFormState(createDevice as any, {
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
      setDevice_({
        id: state?.response?.id,
        value: state?.response?.model,
      })
      reset()
      onClose()
    } else {
      toast.error(state.message)
    }
  }, [pending, reset, setDevice_, state])

  return (
    <DialogContent className='sm:max-w-[425px] bg-white'>
      <DialogHeader>
        <DialogTitle>Create Device</DialogTitle>
        <DialogDescription>
          Create a new device to be added to the database.
        </DialogDescription>
      </DialogHeader>
      <Form ref={myRef} action={formAction} className='grid gap-6 md:gap-8'>
        <input type='hidden' name='customer_id' value={customerId} />
        <FormFieldWrapper>
          <FormField
            labelText='Serial Number'
            inputElement={
              <Input
                type='text'
                placeholder='Serial Number'
                className='border border-gray-300 p-2 rounded text-gray-700'
                {...register('serial_number', { required: true })}
              />
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField
            labelText='Model'
            inputElement={
              <Input
                type='text'
                placeholder='Model'
                className='border border-gray-300 p-2 rounded text-gray-700'
                {...register('model', { required: true })}
              />
            }
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormField
            labelText='Brand'
            inputElement={
              <Input
                type='text'
                placeholder='Brand'
                className='border border-gray-300 p-2 rounded text-gray-700'
                {...register('brand', { required: true })}
              />
            }
          />
        </FormFieldWrapper>
      </Form>
      <DialogFooter>
        <Button variant='outline' onClick={handleSubmit}>
          Create Customer
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
