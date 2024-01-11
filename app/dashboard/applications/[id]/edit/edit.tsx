'use client'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
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

export default function Component({ application }: any) {
  const { id, subject, notes, status, customer, device } = application
  // const router = useRouter()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [state, formAction] = useFormState(updateApplication, {
    message: null,
    response: null as any,
    error: null,
  })
  const initialCustomer = transformArray([application.customer], 'name')[0]
  const initialDevice = transformArray([application.device], 'model')[0]
  const [customer_, setCustomer_] = useState(initialCustomer)

  const [device_, setDevice_] = useState(initialDevice)
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
      // router.push(`/applications/${state?.response?.id}`)
    } else {
      toast.error(state.message)
    }
  }, [pending, state])
  return (
    <Wrapper
      title='Edit application'
      footer={
        <Button variant='outline' onClick={handleSubmit} type='submit'>
          Save changes
        </Button>
      }
    >
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <form
          ref={myRef}
          action={async (data) => {
            // console.log(await data.values(), 'hidd')
            data.set('device_id', device_.id)
            data.set('customer_id', customer_.id)
            data.set('id', application.id)
            for (const value of data.values()) {
              console.log(value)
            }
            formAction(data)
          }}
        >
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Application Subject
              </Label>
              <Input
                type='text'
                defaultValue={application.subject}
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
                defaultValue={application.notes}
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
                defaultValue={application.status}
                className='col-span-3'
                {...register('status', { required: true })}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Customer
              </Label>
              <Selector
                setObject={setCustomer_}
                object={customer_}
                itemName={{ plurar: 'customers', singular: 'customer' }}
                showList={open}
                setShowList={(v) => {
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
                getObjects={async (e) => {
                  const s = transformArray(await searchCustomer(e), 'name')
                  console.log(s, 'hi', e)
                  return s
                }}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Device
              </Label>
              <Selector
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
                getObjects={async (e) => {
                  const s = transformArray(
                    await searchDevice(e, customer_.id),
                    'model',
                  )
                  console.log(s, 'hi', e)
                  return s
                }}
              />
            </div>
          </div>
        </form>
      </Dialog>
    </Wrapper>
  )
}
