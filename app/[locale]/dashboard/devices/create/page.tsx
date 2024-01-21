'use client'
import { z } from 'zod'
import createCustomer from '@/app/actions/createCustomer'
import { useFormState, useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import createDevice from '@/app/actions/createDevice'
import Form, {
  FormField,
  FormFieldSubWrapper,
  FormFieldWrapper,
} from '@/components/form'
import { Textarea } from '@/components/ui/textarea'
import Wrapper from '@/components/wrapper'
import { transformArray } from '@/lib/utils'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import CustomerModal from '../../wizard/customer-modal'
import Selector from '@/components/selector'
import searchCustomer from '@/app/actions/searchCustomer'

const schema = z.object({
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
})

export type formRes = {
  message: string
  error: boolean
}

export default function CreateCustomer() {
  // const router = useRouter()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const [customer_, setCustomer_] = useState(null)
  const router = useRouter()
  const [state, formAction] = useFormState(createDevice as any, {
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
      router.push(`/dashboard/devices/${state?.response?.id}`)
    } else {
      toast.error(state.message)
    }
  }, [pending, router, state])
  return (
    <Wrapper
      title='Create Device'
      footer={
        <>
          <Button variant='outline' onClick={handleSubmit}>
            Create Device
          </Button>
        </>
      }
    >
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Form
          className='grid gap-6 md:gap-8'
          ref={myRef}
          action={async (data: any) => {
            data.set('customer_id', customer_?.id)
            formAction(data)
          }}
        >
          <FormFieldWrapper>
            <FormField
              labelText='Device Brand'
              inputElement={
                <Input
                  type='text'
                  placeholder='Device brand'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('brand', { required: true })}
                />
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText='Device Model'
              inputElement={
                <Textarea
                  placeholder='Model'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('model', { required: true })}
                />
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText='Serial Number'
              inputElement={
                <Textarea
                  placeholder='Serial Number'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('serial_number', { required: true })}
                />
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormFieldSubWrapper subtitle='Customer'>
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
        </Form>
      </Dialog>
    </Wrapper>
  )
}
