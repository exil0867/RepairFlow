import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import createApplication from '../actions/createApplication'
import router from 'next/router'
import { useRouter } from 'next/navigation'

export default function DialogDemo({ customer, device }: any) {
  console.log(customer, device)
  const router = useRouter()
  const [state, formAction] = useFormState(createApplication, {
    message: null,
    response: null as any,
    error: null,
  })
  const { pending } = useFormStatus()
  const {
    reset,
    register,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
      router.push(`/applications/${state?.response?.id}`)
    } else {
      toast.error(state.message)
    }
  }, [pending, router, state])
  return (
    <form action={formAction}>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Application Subject
          </Label>
          <Input
            type='text'
            placeholder='Subject'
            className='col-span-3'
            {...register('subject', { required: true })}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Application Notes
          </Label>
          <Input
            type='text'
            placeholder='Notes'
            className='col-span-3'
            {...register('notes', { required: true })}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Application Status
          </Label>
          <Input
            type='text'
            value={'PENDING'}
            disabled
            className='col-span-3'
            {...register('status', { required: true })}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='username' className='text-right'>
            Customer
          </Label>
          <Input
            type='text'
            value={customer.value}
            className='col-span-3'
            readOnly
            disabled
          />
          <Input
            type='hidden'
            value={customer.id}
            className='col-span-3'
            {...register('customer_id', { required: true })}
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='username' className='text-right'>
            Device
          </Label>
          <Input
            type='text'
            value={device.value}
            className='col-span-3'
            readOnly
            disabled
          />
          <Input
            type='hidden'
            placeholder='Device'
            value={device.id}
            className='col-span-3'
            {...register('device_id', { required: true })}
          />
        </div>
      </div>
      <Button type='submit'>Save changes</Button>
    </form>
  )
}
