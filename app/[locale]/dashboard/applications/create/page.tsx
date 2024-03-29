'use client'
import { z } from 'zod'
import createCustomer from '@/app/actions/createCustomer'
import { useFormState, useFormStatus } from 'react-dom'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FieldPath, useForm } from 'react-hook-form'
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
import { renderStatus, transformArray } from '@/lib/utils'
import searchCustomer from '@/app/actions/searchCustomer'
import DeviceModal from '../../wizard/device-modal'
import searchDevice from '@/app/actions/searchDevice'
import { useParams } from 'next/navigation'
import { FormResponse } from '@/app/actions/type'
import { validateCreateArticle } from '@/app/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputError } from '@/components/inputError'
import { ErrorMessage } from '@hookform/error-message'

export interface FormValues {
  subject: string
  remark: string
  deviceId: string
  customerId: string
  status: 'REPAIRED' | 'REPAIRING' | 'CANCELLED'
}

export default function CreateApplication() {
  const [customerIsEmpty, setCustomerIsEmpty] = useState<boolean | null>(null)
  const [deviceIsEmpty, setDeviceIsEmpty] = useState<boolean | null>(null)
  const [statusIsEmpty, setStatusIsEmpty] = useState<boolean | null>(null)
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
        await searchCustomer(customerId ? customerId : undefined),
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
        await searchDevice(deviceId ? deviceId : undefined),
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
  const [state, formAction] = useFormState<FormResponse, FormData>(
    createApplication,
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
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(validateCreateArticle),
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
      title='Créer une tâche'
      footer={
        <>
          <Button variant='outline' onClick={handleSubmit}>
            Créer une tâche
          </Button>
        </>
      }
    >
      {customer_ && device_ && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Form
            className='grid gap-6 md:gap-8'
            ref={myRef}
            action={async (data: FormData) => {
              if (device_.id === 0) {
                setDeviceIsEmpty(true)
              } else {
                setDeviceIsEmpty(false)
              }
              data.set('deviceId', String(device_.id))
              if (customer_.id === 0) {
                setCustomerIsEmpty(true)
              } else {
                setCustomerIsEmpty(false)
              }
              data.set('customerId', String(customer_.id))
              formAction(data)
            }}
          >
            <FormFieldWrapper>
              <FormField
                labelText={`Sujet`}
                hint={`Sujet de la tâche`}
                required
                inputElement={
                  <>
                    <Input
                      type='text'
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
                labelText={`Remarque`}
                hint={`Ajouter une remarque à la tâche`}
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
              <FormField
                labelText={`Statut`}
                hint={`Statut de la tâche`}
                inputElement={
                  <>
                    <Select
                      defaultValue={status ? status.toUpperCase() : undefined}
                      {...register('status')}
                    >
                      <SelectTrigger className='w-[180px] border border-gray-300 p-2 rounded'>
                        <SelectValue placeholder='Sélectionnez le statut' />
                      </SelectTrigger>
                      <SelectContent className='bg-white'>
                        <SelectGroup>
                          <SelectItem value='DIAGNOSING'>Diagnostic</SelectItem>
                          <SelectItem value='REPAIRING'>Réparer</SelectItem>
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
            <FormFieldWrapper>
              <FormFieldSubWrapper subtitle='Client'>
                <FormField
                  hint={`Sélectionner un client associé à la tâche`}
                  labelClassName=''
                  inputElement={
                    <>
                      <Selector
                        className='border border-gray-300 p-2 rounded'
                        setObject={setCustomer_}
                        object={customer_}
                        initialDisplay={false}
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
            <FormFieldWrapper>
              <FormFieldSubWrapper subtitle='Appareil'>
                <FormField
                  hint={`Sélectionner l'appareil associé à la tâche`}
                  labelClassName=''
                  inputElement={
                    <>
                      <Selector
                        className='border border-gray-300 p-2 rounded'
                        setObject={setDevice_}
                        object={device_}
                        initialDisplay={true}
                        itemName={{ plurar: 'appareils', singular: 'appareil' }}
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
                              <Button variant='outline'>
                                Créer un appareil
                              </Button>
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
                              customer_.id as any,
                            ),
                            'model',
                          )
                          console.log(s, 'hi', e)
                          return s
                        }}
                      />
                      {deviceIsEmpty && (
                        <InputError>Le appareil est requis</InputError>
                      )}
                    </>
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
