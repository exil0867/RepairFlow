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
import createApplication from '../../actions/createApplication'
import router from 'next/router'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Form from '@/components/form'

export default function DialogDemo({ customer, device }: any) {
  const router = useRouter()
  const [state, formAction] = useFormState(createApplication as any, {
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
      router.push(`/dashboard/applications/${state?.response?.id}`)
    } else {
      toast.error(state.message)
    }
  }, [pending, router, state])
  return (
    <Form className='grid gap-6 md:gap-8' action={formAction}>
      <div className='grid gap-2'>
        <Label htmlFor='name' className='text-lg font-semibold text-gray-600'>
          Application Subject
        </Label>
        <Input
          type='text'
          placeholder='Subject'
          className='border border-gray-300 p-2 rounded text-gray-700'
          {...register('subject', { required: true })}
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='name' className='text-lg font-semibold text-gray-600'>
          Application Notes
        </Label>
        <Input
          type='text'
          placeholder='Notes'
          className='border border-gray-300 p-2 rounded text-gray-700'
          {...register('notes', { required: true })}
        />
      </div>
      <div className='grid gap-2'>
        <Label className='text-lg font-semibold text-gray-600' htmlFor='status'>
          Application Status
        </Label>
        <Select
          defaultValue={'PENDING'}
          {...register('status', { required: true })}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select status' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='PENDING'>Pending</SelectItem>
              <SelectItem value='COMPLETE'>Complete</SelectItem>
              <SelectItem value='CANCELLED'>Cancelled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='grid gap-2'>
        <Label className='text-lg font-semibold text-gray-600' htmlFor='status'>
          Customer
        </Label>
        <Input
          type='text'
          value={customer.value}
          className='border border-gray-300 p-2 rounded text-gray-700'
          readOnly
          disabled
        />
        <Input
          type='hidden'
          value={customer.id}
          {...register('customer_id', { required: true })}
        />
      </div>
      <div className='grid gap-2'>
        <Label className='text-lg font-semibold text-gray-600' htmlFor='status'>
          Device
        </Label>
        <Input
          type='text'
          value={device.value}
          className='border border-gray-300 p-2 rounded text-gray-700'
          readOnly
          disabled
        />
        <Input
          type='hidden'
          value={device.id}
          {...register('device_id', { required: true })}
        />
      </div>
      <Button variant='outline' type='submit'>
        Create Application
      </Button>
    </Form>
  )
}
