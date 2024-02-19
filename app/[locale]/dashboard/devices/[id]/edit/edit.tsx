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
import toast from 'react-hot-toast'
import { FieldPath, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
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
import updateDevice from '@/app/actions/updateDevice'
import Form, {
  FormField,
  FormFieldSubWrapper,
  FormFieldWrapper,
} from '@/components/form'
import { FormResponse } from '@/app/actions/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { validateUpdateDevice } from '@/app/validation'
import { useRouter } from 'next/navigation'
import { ErrorMessage } from '@hookform/error-message'
import { InputError } from '@/components/inputError'

export interface FormValues {
  customerId: string
  brand: string
  model: string
  serialNumber: string
  remark: string
}

export default function Component({ device }: any) {
  const { id, brand, model, serialNumber } = device
  // const router = useRouter()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [customerIsEmpty, setCustomerIsEmpty] = useState<boolean | null>(null)

  const initialCustomer = transformArray([device.customer], 'name')[0]
  const [customer_, setCustomer_] = useState(initialCustomer)
  const [state, formAction] = useFormState<FormResponse, FormData>(
    updateDevice,
    {
      message: null,
      response: null as any,
      error: null,
    },
  )
  const router = useRouter()
  const { pending } = useFormStatus()
  const myRef = useRef(null) as any
  const handleSubmit = (e: any) => {
    console.log('dadsadadsad')
    e.preventDefault()
    if (!customer_) {
      setCustomerIsEmpty(true)
    } else {
      setCustomerIsEmpty(false)
    }
    myRef.current.requestSubmit()
  }
  const {
    reset,
    register,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(validateUpdateDevice),
  })
  useEffect(() => {
    if (!state) return
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
      router.push(`/dashboard/devices/${state?.response?.id}`)
    } else {
      toast.error(state.message)
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<FormValues>, {
          message: error.message,
        })
      })
    }
  }, [pending, router, state])
  return (
    <Wrapper
      title={`Modifier l'appareil`}
      footer={
        <>
          <Button variant='outline' onClick={handleSubmit}>
            Sauvegarder
          </Button>
        </>
      }
    >
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Form
          ref={myRef}
          action={async (data: FormData) => {
            data.set('id', device.id)
            data.set('customerId', customer_.id)
            formAction(data)
          }}
          className='grid gap-6 md:gap-8'
        >
          <FormFieldWrapper>
            <FormField
              labelText={`Marque de l'appareil`}
              inputElement={
                <Input
                  type='text'
                  defaultValue={device.brand}
                  placeholder={`Marque de l'appareil`}
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('brand')}
                />
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText={`Modèle d'appareil`}
              required
              inputElement={
                <>
                  <Textarea
                    defaultValue={device.model}
                    placeholder='Modèle'
                    className='border border-gray-300 p-2 rounded text-gray-700'
                    {...register('model')}
                  />
                  <ErrorMessage
                    name='model'
                    errors={errors}
                    as={<InputError />}
                  />
                </>
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText={`Remarque sur l'appareil`}
              required
              inputElement={
                <>
                  <Textarea
                    defaultValue={device.remark}
                    placeholder='remark'
                    className='border border-gray-300 p-2 rounded text-gray-700'
                    {...register('remark')}
                  />
                  <ErrorMessage
                    name='remark'
                    errors={errors}
                    as={<InputError />}
                  />
                </>
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText='Numéro de série'
              inputElement={
                <>
                  <Textarea
                    defaultValue={device.serialNumber}
                    placeholder='Numéro de série'
                    className='border border-gray-300 p-2 rounded text-gray-700'
                    {...register('serialNumber')}
                  />
                  <ErrorMessage
                    name='serialNumber'
                    errors={errors}
                    as={<InputError />}
                  />
                </>
              }
            />
          </FormFieldWrapper>
        </Form>
      </Dialog>
    </Wrapper>
  )
}
