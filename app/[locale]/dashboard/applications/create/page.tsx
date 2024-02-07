'use client'
import { z } from 'zod'
import createCustomer from '@/app/actions/createCustomer'
import { useFormState, useFormStatus } from 'react-dom'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Form, {
  FormField,
  FormFieldSubWrapper,
  FormFieldWrapper,
} from '@/components/form'
import { Textarea } from '@/components/ui/textarea'
import Wrapper from '@/components/wrapper'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import createApplication from '@/app/actions/createApplication'
import router from 'next/router'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Selector from '@/components/selector'
import CustomerModal from '../../wizard/customer-modal'
import { transformArray } from '@/lib/utils'
import searchCustomer from '@/app/actions/searchCustomer'
import DeviceModal from '../../wizard/device-modal'
import searchDevice from '@/app/actions/searchDevice'
import { useParams } from 'next/navigation'

const schema = z.object({
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
})

export type formRes = {
  message: string
  error: boolean
}

export default function CreateApplication() {
  const customerId = useSearchParams().get('customerId')
  const deviceId = useSearchParams().get('deviceId')
  const status = useSearchParams().get('status')
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (!customerId) return
    const getCustomer = async () => {
      const customer = transformArray(
        await searchCustomer(customerId ? Number(customerId) : undefined),
        'name',
      )
      setCustomer_(customer[0])
    }
    getCustomer()
  }, [customerId])

  useEffect(() => {
    if (!deviceId) return
    const getDevice = async () => {
      const device = transformArray(
        await searchDevice(deviceId ? Number(deviceId) : undefined),
        'model',
      )
      setDevice_(device[0])
    }
    getDevice()
  }, [deviceId])
  const [customer_, setCustomer_] = useState({
    value: '',
    id: 0,
  })

  const [device_, setDevice_] = useState({
    value: '',
    id: 0,
  })
  const [state, formAction] = useFormState(createApplication as any, {
    message: null,
    response: null as any,
    error: null,
  })
  const { pending } = useFormStatus()

  const myRef = useRef(null) as any
  const handleSubmit = (e: any) => {
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
      router.push(`/dashboard/applications/${state?.response?.id}`)
    } else {
      toast.error(state.message)
    }
  }, [pending, router, state])
  return (
    <Wrapper
      title='Create Application'
      footer={
        <>
          <Button variant='outline' onClick={handleSubmit}>
            Create Application
          </Button>
        </>
      }
    >
      {customer_ && device_ && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Form
            className='grid gap-6 md:gap-8'
            ref={myRef}
            action={async (data) => {
              data.set('device_id', device_.id)
              data.set('customer_id', customer_.id)
              formAction(data)
            }}
          >
            <FormFieldWrapper>
              <FormField
                labelText='Application Subject'
                inputElement={
                  <Input
                    type='text'
                    placeholder='Application Subject'
                    className='border border-gray-300 p-2 rounded text-gray-700'
                    {...register('subject', { required: true })}
                  />
                }
              />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormField
                labelText='Application Notes'
                inputElement={
                  <Textarea
                    placeholder='Application Notes'
                    className='border border-gray-300 p-2 rounded text-gray-700'
                    {...register('notes', { required: true })}
                  />
                }
              />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormField
                labelText='Application Status'
                inputElement={
                  <Select
                    defaultValue={status ? status.toUpperCase() : undefined}
                    {...register('status', { required: true })}
                  >
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      <SelectGroup>
                        <SelectItem value='PENDING'>Pending</SelectItem>
                        <SelectItem value='COMPLETE'>Complete</SelectItem>
                        <SelectItem value='CANCELLED'>Cancelled</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                }
              />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormFieldSubWrapper subtitle='Device'>
                <FormField
                  labelText='Selected customer:'
                  labelClassName=''
                  inputElement={
                    <Selector
                      className='border border-gray-300 p-2 rounded'
                      setObject={setCustomer_}
                      object={customer_}
                      itemName={{ plurar: 'customers', singular: 'customer' }}
                      showList={open}
                      setShowList={(v: any) => {
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
                      getObjects={async (e: any) => {
                        const s = transformArray(
                          await searchCustomer(undefined, e),
                          'name',
                        )
                        console.log(s, 'hi', e)
                        return s
                      }}
                    />
                  }
                />
              </FormFieldSubWrapper>
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormFieldSubWrapper subtitle='Device'>
                <FormField
                  labelText='Selected device:'
                  labelClassName=''
                  inputElement={
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
                          await searchDevice(
                            undefined,
                            e,
                            undefined,
                            undefined,
                            customer_.id,
                          ),
                          'model',
                        )
                        console.log(s, 'hi', e)
                        return s
                      }}
                    />
                  }
                />
              </FormFieldSubWrapper>
            </FormFieldWrapper>
          </Form>
        </Dialog>
      )}
    </Wrapper>
  )
}
