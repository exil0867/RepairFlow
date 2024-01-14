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
import updateDevice from '@/app/actions/updateDevice'

export default function Component({ device }: any) {
  const { id, brand, model, serialNumber } = device
  // const router = useRouter()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const initialCustomer = transformArray([device.customer], 'name')[0]
  const [customer_, setCustomer_] = useState(initialCustomer)
  const [state, formAction] = useFormState(updateDevice, {
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
      title='Edit device'
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
            data.set('id', device.id)
            data.set('customer_id', customer_.id)
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
              Brand
            </Label>
            <Input
              type='text'
              defaultValue={device.brand}
              placeholder='Device brand'
              className='border border-gray-300 p-2 rounded text-gray-700'
              {...register('brand', { required: true })}
            />
          </div>
          <div className='grid gap-2'>
            <Label
              htmlFor='name'
              className='text-lg font-semibold text-gray-600'
            >
              Model
            </Label>
            <textarea
              defaultValue={device.model}
              placeholder='Model'
              className='border border-gray-300 p-2 rounded text-gray-700'
              {...register('model', { required: true })}
            />
          </div>
          <div className='grid gap-2'>
            <Label
              htmlFor='name'
              className='text-lg font-semibold text-gray-600'
            >
              Serial Number
            </Label>
            <textarea
              defaultValue={device.serialNumber}
              placeholder='Serial Number'
              className='border border-gray-300 p-2 rounded text-gray-700'
              {...register('serial_number', { required: true })}
            />
          </div>
          <div className='grid gap-2'>
            <Label
              htmlFor='name'
              className='text-lg font-semibold text-gray-600'
            >
              Customer
            </Label>
            <Selector
              className='border border-gray-300 p-2 rounded'
              setObject={setCustomer_}
              object={customer_}
              itemName={{ plurar: 'customers', singular: 'customer' }}
              showList={open}
              setShowList={(v) => {
                setOpen(v)
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
              getObjects={async (e) => {
                const s = transformArray(await searchCustomer(e), 'name')
                console.log(s, 'hi', e)
                return s
              }}
            />
          </div>
        </form>
      </Dialog>
    </Wrapper>
  )
}
