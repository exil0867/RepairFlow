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
import updateDevice from '@/app/actions/updateDevice'
import Form, {
  FormField,
  FormFieldSubWrapper,
  FormFieldWrapper,
} from '@/components/form'

export default function Component({ device }: any) {
  const { id, brand, model, serialNumber } = device
  // const router = useRouter()
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const initialCustomer = transformArray([device.customer], 'name')[0]
  const [customer_, setCustomer_] = useState(initialCustomer)
  const [state, formAction] = useFormState(updateDevice as any, {
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
      // router.push(`/devices/${state?.response?.id}`)
    } else {
      toast.error(state.message)
    }
  }, [pending, state])
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
          action={async (data: { set: (arg0: string, arg1: any) => void }) => {
            data.set('id', device.id)
            data.set('customer_id', customer_.id)
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
                  {...register('brand', { required: true })}
                />
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText={`Modèle d'appareil`}
              inputElement={
                <textarea
                  defaultValue={device.model}
                  placeholder='Modèle'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('model', { required: true })}
                />
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText='Numéro de série'
              inputElement={
                <Textarea
                  defaultValue={device.serialNumber}
                  placeholder='Numéro de série'
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('serial_number', { required: true })}
                />
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
        </Form>
      </Dialog>
    </Wrapper>
  )
}
