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
import updateApplicationStatus from '@/app/actions/updateApplicationStatus'
import toast from 'react-hot-toast'
import { FieldPath, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import createApplication from '@/app/actions/createApplication'
import Selector from '@/components/selector'
import CustomerModal from '../../../wizard/customer-modal'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { renderStatus, transformArray } from '@/lib/utils'
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
import Form, {
  FormField,
  FormFieldSubWrapper,
  FormFieldWrapper,
} from '@/components/form'
import { useRouter } from 'next/navigation'
import { FormResponse } from '@/app/actions/type'
import { ErrorMessage } from '@hookform/error-message'
import { InputError } from '@/components/inputError'
import { zodResolver } from '@hookform/resolvers/zod'
import { validateUpdateArticle } from '@/app/validation'

export interface FormValues {
  id: string
  subject: string
  remark: string
  deviceId: string
  customerId: string
  status: 'DIAGNOSIS' | 'REPAIRED' | 'REPAIRING' | 'CANCELLED'
}

export default function Component({ application }: any) {
  const { id, subject, remark, status, customer, device } = application
  const [customerIsEmpty, setCustomerIsEmpty] = useState<boolean | null>(null)
  const [deviceIsEmpty, setDeviceIsEmpty] = useState<boolean | null>(null)
  const [statusIsEmpty, setStatusIsEmpty] = useState<boolean | null>(null)
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [state, formAction] = useFormState<FormResponse, FormData>(
    updateApplication,
    {
      message: null,
      response: null as any,
      error: null,
    },
  )
  const initialCustomer = transformArray([application.customer], 'name')[0]
  const initialDevice = transformArray([application.device], 'model')[0]
  const [customer_, setCustomer_] = useState(initialCustomer)

  const [device_, setDevice_] = useState(initialDevice)
  const { pending } = useFormStatus()
  const myRef = useRef(null) as any
  const handleSubmit = (e: any) => {
    e.preventDefault()
    myRef.current.requestSubmit()
  }
  const {
    reset,
    setError,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(validateUpdateArticle),
  })
  useEffect(() => {
    if (!state) return
    if (pending || state.error === null) return
    if (!state.error) {
      toast.success(state.message)
      router.push(`/dashboard/applications/${state?.response?.id}`)
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
      title={`Modifier l'article`}
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
            data.set('customerId', customer_.id)
            data.set('deviceId', device_.id)
            data.set('id', application.id)
            formAction(data)
          }}
          className='grid gap-6 md:gap-8'
        >
          <FormFieldWrapper>
            <FormField
              labelText={`Sujet de l'article`}
              inputElement={
                <>
                  <Input
                    type='text'
                    defaultValue={application.subject}
                    placeholder='Sujet'
                    className='border border-gray-300 p-2 rounded text-gray-700'
                    {...register('subject')}
                  />
                  <ErrorMessage
                    name='subject'
                    errors={errors}
                    as={<InputError />}
                  />
                </>
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText={`Remarque sur l'article`}
              inputElement={
                <>
                  <Textarea
                    defaultValue={application.remark}
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
              labelText={`Statut de l'article`}
              inputElement={
                <>
                  <Select
                    defaultValue={application.status}
                    {...register('status')}
                  >
                    <SelectTrigger className='w-[180px] border border-gray-300 p-2 rounded'>
                      <SelectValue placeholder='Sélectionnez le statut' />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      <SelectGroup>
                        <SelectItem value='REPAIRING'>Réparation</SelectItem>
                        <SelectItem value='REPAIRED'>Réparé</SelectItem>
                        <SelectItem value='CANCELLED'>Annulé</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <ErrorMessage
                    name='status'
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
