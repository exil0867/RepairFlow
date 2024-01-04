import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formRes } from '../customers/create/page'
import { Check, ChevronsUpDown } from 'lucide-react'
import CustomerModal from './customer-modal'
import DeviceModal from './device-modal'
import Application from './application'

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
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import createDevice from '../actions/createDevice'
import router from 'next/router'

export default function DialogDemo({ setDevice_, setDialogOpen }: any) {
  const {
    reset,
    register,
    formState: { errors },
  } = useForm()
  const [state, formAction] = useFormState(createDevice, {
    message: null,
    response: null as any,
    error: null,
  })

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
      setDialogOpen(false)
    } else {
      toast.error(state.message)
    }
  }, [pending, router, state])
  return (
    <DialogContent className='sm:max-w-[425px]'>
      <form action={formAction}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Serial Number
            </Label>
            <Input
              type='text'
              placeholder='Serial Number'
              className='col-span-3'
              {...register('serial_number', { required: true })}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Model
            </Label>
            <Input
              type='text'
              placeholder='Model'
              className='col-span-3'
              {...register('model', { required: true })}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Brand
            </Label>
            <Input
              type='text'
              placeholder='Brand'
              className='col-span-3'
              {...register('brand', { required: true })}
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
