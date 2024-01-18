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
import updateApplication from '@/app/actions/updateApplication'
import Wrapper from '@/components/wrapper'
import { useRef } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Form from '@/components/form'

export default function Component({ application }: any) {
  const { id, subject, notes, status, customer, device } = application
  // const router = useRouter()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [state, formAction] = useFormState(updateApplication as any, {
    message: null,
    response: null as any,
    error: null,
  }) as any
  const initialCustomer = transformArray([application.customer], 'name')[0]
  const initialDevice = transformArray([application.device], 'model')[0]
  const [customer_, setCustomer_] = useState(initialCustomer)

  const [device_, setDevice_] = useState(initialDevice)
  const { pending } = useFormStatus()
  const myRef = useRef(null) as any
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
      // router.push(`/applications/${state?.response?.id}`)
    } else {
      toast.error(state.message)
    }
  }, [pending, state])
  return (
    <Wrapper
      title='Edit application'
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
        <Form
          ref={myRef}
          action={async (data) => {
            data.set('device_id', device_.id)
            data.set('customer_id', customer_.id)
            data.set('id', application.id)
            formAction(data)
          }}
          className='grid gap-6 md:gap-8'
        >
          <div className='grid gap-2'>
            <Label
              htmlFor='name'
              className='text-lg font-semibold text-gray-600'
            >
              Application Subject
            </Label>
            <Input
              type='text'
              defaultValue={application.subject}
              placeholder='Subject'
              className='border border-gray-300 p-2 rounded text-gray-700'
              {...register('subject', { required: true })}
            />
          </div>
          <div className='grid gap-2'>
            <Label
              htmlFor='name'
              className='text-lg font-semibold text-gray-600'
            >
              Application Notes
            </Label>
            <textarea
              defaultValue={application.notes}
              placeholder='Notes'
              className='border border-gray-300 p-2 rounded text-gray-700'
              {...register('notes', { required: true })}
            />
          </div>
          <div className='grid gap-2'>
            <Label
              className='text-lg font-semibold text-gray-600'
              htmlFor='status'
            >
              Application Status
            </Label>
            <Select
              defaultValue={application.status}
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
            <div className='text-lg font-semibold text-gray-600'>Customer</div>
            <div className='grid gap-2 text-gray-700'>
              <Label htmlFor='customer'>Selected customer:</Label>
              <Selector
                className='border border-gray-300 p-2 rounded'
                setObject={setCustomer_}
                object={customer_}
                itemName={{ plurar: 'customers', singular: 'customer' }}
                showList={open}
                setShowList={(v: any) => {
                  setOpen(v)
                  setDevice_(undefined)
                }}
                creator={
                  <>
                    <CustomerModal
                      setCustomer_={setCustomer_}
                      onClose={() => {
                        setOpen(false)
                        setDialogOpen(false)
                      }}
                    />
                    <DialogTrigger asChild>
                      <Button variant='outline'>Create customer</Button>
                    </DialogTrigger>
                  </>
                }
                getObjects={async (e: any) => {
                  const s = transformArray(await searchCustomer(e), 'name')
                  console.log(s, 'hi', e)
                  return s
                }}
              />
            </div>
          </div>
          <div className='grid gap-2'>
            <div className='text-lg font-semibold text-gray-600'>Device</div>
            <div className='grid gap-2 text-gray-700'>
              <Label htmlFor='customer'>Selected customer:</Label>
              <Selector
                className='border border-gray-300 p-2 rounded'
                setObject={setDevice_}
                object={device_}
                itemName={{ plurar: 'devices', singular: 'device' }}
                showList={open2}
                setShowList={setOpen2}
                creator={
                  <>
                    <DeviceModal
                      setDevice_={setDevice_}
                      customerId={customer_.id}
                      onClose={() => {
                        setOpen(false)
                        setDialogOpen(false)
                      }}
                    />
                    <DialogTrigger asChild>
                      <Button variant='outline'>Create device</Button>
                    </DialogTrigger>
                  </>
                }
                getObjects={async (e: any) => {
                  const s = transformArray(
                    await searchDevice(e, undefined, undefined, customer_.id),
                    'model',
                  )
                  console.log(s, 'hi', e)
                  return s
                }}
              />
            </div>
          </div>
        </Form>
      </Dialog>
    </Wrapper>
  )
}
