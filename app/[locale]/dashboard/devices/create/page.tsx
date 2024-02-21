'use client'
import { z } from 'zod'
import createCustomer from '@/app/actions/createCustomer'
import { useFormState, useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { FieldPath, useForm } from 'react-hook-form'
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
import { FormResponse } from '@/app/actions/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { validateCreateDevice } from '@/app/validation'
import { ErrorMessage } from '@hookform/error-message'
import { InputError } from '@/components/inputError'

export interface FormValues {
  customerId: string
  brand: string
  model: string
  serialNumber: string
  remark: string
}

export default function CreateCustomer() {
  // const router = useRouter()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [customerIsEmpty, setClientIsEmpty] = useState<boolean | null>(null)

  const [customer_, setCustomer_] = useState<any>(null)
  const router = useRouter()
  const [state, formAction] = useFormState<FormResponse, FormData>(
    createDevice,
    {
      message: null,
      response: null as any,
      error: null,
    },
  )
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
    setError,
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(validateCreateDevice),
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
      title='Créer un appareil'
      footer={
        <>
          <Button variant='outline' onClick={handleSubmit}>
            Créer un appareil
          </Button>
        </>
      }
    >
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Form
          className='grid gap-6 md:gap-8'
          ref={myRef}
          action={async (data: FormData) => {
            if (!customer_) {
              setClientIsEmpty(true)
            } else {
              setClientIsEmpty(false)
            }
            data.set('customerId', customer_?.id)
            formAction(data)
          }}
        >
          <FormFieldWrapper>
            <FormField
              labelText={`Marque`}
              hint={`La marque de l'appareil`}
              inputElement={
                <>
                  <Input
                    type='text'
                    className='border border-gray-300 p-2 rounded text-gray-700'
                    {...register('brand')}
                  />
                  <ErrorMessage
                    name='brand'
                    errors={errors}
                    as={<InputError />}
                  />
                </>
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText={`Modèle`}
              hint={`Le modèle de l'appareil`}
              required
              inputElement={
                <>
                  <Input
                    type='text'
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
              labelText={`Numéro de série`}
              hint={`Le numéro de série de l'appareil`}
              inputElement={
                <>
                  <Input
                    type='text'
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
          <FormFieldWrapper>
            <FormField
              labelText={`Remarque`}
              hint={`Ajouter une remarque sur l'appareil`}
              inputElement={
                <>
                  <Textarea
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
            <FormFieldSubWrapper subtitle='Client'>
              <FormField
                required
                labelClassName=''
                hint={`Sélectionnez le client associé à l'appareil`}
                inputElement={
                  <>
                    <Selector
                      className='border border-gray-300 p-2 rounded'
                      setObject={setCustomer_}
                      object={customer_}
                      itemName={{ plurar: 'clients', singular: 'client' }}
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
                            <Button variant='outline'>Créer un client</Button>
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
                    {customerIsEmpty && (
                      <InputError>Le client est requis</InputError>
                    )}
                  </>
                }
              />
            </FormFieldSubWrapper>
          </FormFieldWrapper>
        </Form>
      </Dialog>
    </Wrapper>
  )
}
