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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Form, {
  FormField,
  FormFieldSubWrapper,
  FormFieldWrapper,
} from '@/components/form'

export default function Component({ customer }: any) {
  const { id, name, address, phoneNumber } = customer
  // const router = useRouter()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [state, formAction] = useFormState(updateCustomer as any, {
    message: null,
    response: null as any,
    error: null,
  }) as any
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
        <Form
          ref={myRef}
          action={async (data: { set: (arg0: string, arg1: any) => void }) => {
            data.set('id', customer.id)
            formAction(data)
          }}
          className='grid gap-6 md:gap-8'
        >
          <FormFieldWrapper>
            <FormField
              labelText='Customer Name'
              inputElement={
                <Input
                  type='text'
                  defaultValue={customer.name}
                  placeholder='Customer Name'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('name', { required: true })}
                />
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText='Customer Address'
              inputElement={
                <Textarea
                  defaultValue={customer.address}
                  placeholder='Customer Address'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('address', { required: true })}
                />
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText='Phone Number'
              inputElement={
                <Input
                  type='text'
                  defaultValue={customer.phoneNumber}
                  placeholder='Phone Number'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('phone_number', { required: true })}
                />
              }
            />
          </FormFieldWrapper>
        </Form>
      </Dialog>
    </Wrapper>
  )
}
