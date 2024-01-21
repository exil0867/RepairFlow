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
import { useEffect, useState } from 'react'
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
    <DialogContent className='sm:max-w-[425px]'>
      <form action={formAction}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              type='text'
              placeholder='Name'
              className='col-span-3'
              {...register('name', { required: true })}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Address
            </Label>
            <Input
              type='text'
              placeholder='Address'
              className='col-span-3'
              {...register('address', { required: true })}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Phone number
            </Label>
            <Input
              type='text'
              placeholder='Phone number'
              className='col-span-3'
              {...register('phone_number', { required: true })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
