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

export default function Component({ application }: any) {
  const { id, subject, notes, status, customer, device } = application
  // const router = useRouter()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [state, formAction] = useFormState(updateApplication as any, {
    message: null,
    response: null as any,
    error: null,
  }) as any
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
          action={async (data: { set: (arg0: string, arg1: any) => void }) => {
            data.set('device_id', device_.id)
            data.set('customer_id', customer_.id)
            data.set('id', application.id)
            formAction(data)
          }}
          className='grid gap-6 md:gap-8'
        >
          <FormFieldWrapper>
            <FormField
              labelText={`Sujet de l'article`}
              inputElement={
                <Input
                  type='text'
                  defaultValue={application.subject}
                  placeholder='Sujet'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('subject', { required: true })}
                />
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText={`Notes d'articles`}
              inputElement={
                <textarea
                  defaultValue={application.notes}
                  placeholder='Notes'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('notes', { required: true })}
                />
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText={`Statut de l'article`}
              inputElement={
                <Select
                  defaultValue={application.status}
                  {...register('status', { required: true })}
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Sélectionnez le statut' />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <SelectGroup>
                      <SelectItem value='PENDING'>En cours</SelectItem>
                      <SelectItem value='COMPLETE'>Complet</SelectItem>
                      <SelectItem value='CANCELLED'>Annulé</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormFieldSubWrapper subtitle='Client'>
              <FormField
                labelText='Client sélectionné:'
                labelClassName=''
                inputElement={
                  <Selector
                    className='border border-gray-300 p-2 rounded'
                    setObject={setCustomer_}
                    object={customer_}
                    itemName={{ plurar: 'clients', singular: 'client' }}
                    showList={open}
                    setShowList={(v: any) => {
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
                }
              />
            </FormFieldSubWrapper>
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormFieldSubWrapper subtitle='Appareil'>
              <FormField
                labelText='Appareil sélectionné:'
                labelClassName=''
                inputElement={
                  <Selector
                    className='border border-gray-300 p-2 rounded'
                    setObject={setDevice_}
                    object={device_}
                    itemName={{ plurar: 'appareils', singular: 'Appareil' }}
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
                          <Button variant='outline'>Créer un appareil</Button>
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
    </Wrapper>
  )
}
