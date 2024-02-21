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
import { useRouter } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
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
import { FormResponse } from '@/app/actions/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { validateUpdateCustomer } from '@/app/validation'
import { ErrorMessage } from '@hookform/error-message'
import { InputError } from '@/components/inputError'

export interface FormValues {
  name: string
  address: string
  phoneNumber: string
  id: string
  taxId: string
}

export default function Component({ customer }: any) {
  const router = useRouter()
  const { id, name, address, phoneNumber } = customer
  // const router = useRouter()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [state, formAction] = useFormState<FormResponse, FormData>(
    updateCustomer,
    {
      message: null,
      response: null as any,
      error: null,
    },
  )
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
    setError,
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(validateUpdateCustomer),
  })
  useEffect(() => {
    if (!state) return
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
      router.push(`/dashboard/customers/${state?.response?.id}`)
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
      title='Modifier le client'
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
            data.set('id', customer.id)
            formAction(data)
          }}
          className='grid gap-6 md:gap-8'
        >
          <FormFieldWrapper>
            <FormField
              labelText='Nom'
              hint={`Nom du client`}
              required
              inputElement={
                <>
                  <Input
                    type='text'
                    defaultValue={customer.name}
                    className='border border-gray-300 p-2 rounded text-gray-700'
                    {...register('name')}
                  />
                  <ErrorMessage
                    name='name'
                    errors={errors}
                    as={<InputError />}
                  />
                </>
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText='Adresse'
              hint={`Adresse du client`}
              inputElement={
                <>
                  <Textarea
                    defaultValue={customer.address}
                    className='border border-gray-300 p-2 rounded text-gray-700'
                    {...register('address')}
                  />
                  <ErrorMessage
                    name='address'
                    errors={errors}
                    as={<InputError />}
                  />
                </>
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText='Numéro de téléphone'
              hint='Numéro de téléphone du client'
              inputElement={
                <>
                  <Input
                    type='text'
                    defaultValue={customer.phoneNumber}
                    className='border border-gray-300 p-2 rounded text-gray-700'
                    {...register('phoneNumber')}
                  />
                  <ErrorMessage
                    name='phoneNumber'
                    errors={errors}
                    as={<InputError />}
                  />
                </>
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText='Matricule fiscal'
              hint={`Numéro d'immatriculation fiscale du client`}
              inputElement={
                <>
                  <Input
                    type='text'
                    defaultValue={customer.taxId}
                    className='border border-gray-300 p-2 rounded text-gray-700'
                    {...register('taxId')}
                  />
                  <ErrorMessage
                    name='taxId'
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
