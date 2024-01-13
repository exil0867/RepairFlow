'use client'
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import setApplicationAsComplete from '@/app/actions/setApplicationAsComplete'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useFormState, useFormStatus } from 'react-dom'
import createApplication from '@/app/actions/createApplication'
import Selector from '@/components/selector'
import CustomerModal from '../../../wizard/customer-modal'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { transformArray } from '@/lib/utils'
import searchCustomer from '@/app/actions/searchCustomer'
import DeviceModal from '../../../wizard/device-modal'
import searchDevice from '@/app/actions/searchDevice'
import updateCustomer from '@/app/actions/updateCustomer'
import Wrapper from '@/components/wrapper'
import { useRef } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Component({ customer }: any) {
  const { id, name, address, phoneNumber } = customer
  // const router = useRouter()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [state, formAction] = useFormState(updateCustomer, {
    message: null,
    response: null as any,
    error: null,
  })
  const { pending } = useFormStatus()
  const myRef = useRef(null)
  const handleSubmit = (e: any) => {
    console.log('dadsadadsad')
    e.preventDefault()
    myRef.current.requestSubmit()
  }
  const {
    reset,
    register,
    formState: { errors },
  } = useForm()
  useEffect(() => {
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
      // router.push(`/customers/${state?.response?.id}`)
    } else {
      toast.error(state.message)
    }
  }, [pending, state])
  return (
    <Wrapper
      title='Edit customer'
      footer={
        <>
          <Button variant='outline' onClick={handleSubmit}>
            Save
          </Button>
          <Button variant='outline'>Reset</Button>
        </>
      }
    >
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <form
          ref={myRef}
          action={async (data) => {
            data.set('id', customer.id)
            for (const value of data.values()) {
              console.log(value)
            }
            formAction(data)
          }}
          className='grid gap-6 md:gap-8'
        >
          <div className='grid gap-2'>
            <Label
              htmlFor='name'
              className='text-lg font-semibold text-gray-600'
            >
              Name
            </Label>
            <Input
              type='text'
              defaultValue={customer.name}
              placeholder='Customer name'
              className='border border-gray-300 p-2 rounded text-gray-700'
              {...register('name', { required: true })}
            />
          </div>
          <div className='grid gap-2'>
            <Label
              htmlFor='name'
              className='text-lg font-semibold text-gray-600'
            >
              Address
            </Label>
            <textarea
              defaultValue={customer.address}
              placeholder='Address'
              className='border border-gray-300 p-2 rounded text-gray-700'
              {...register('address', { required: true })}
            />
          </div>
          <div className='grid gap-2'>
            <Label
              htmlFor='name'
              className='text-lg font-semibold text-gray-600'
            >
              Phone Number
            </Label>
            <textarea
              defaultValue={customer.phoneNumber}
              placeholder='Phone Number'
              className='border border-gray-300 p-2 rounded text-gray-700'
              {...register('phone_number', { required: true })}
            />
          </div>
        </form>
      </Dialog>
    </Wrapper>
  )
}
