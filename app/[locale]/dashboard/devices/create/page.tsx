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

  const [customer_, setCustomer_] = useState<any>(null)
  const router = useRouter()
  const [state, formAction]: any = useFormState(createDevice as any, {
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
          action={async (data: any) => {
            data.set('customer_id', customer_?.id)
            formAction(data)
          }}
        >
          <FormFieldWrapper>
            <FormField
              labelText={`Marque de l'appareil`}
              inputElement={
                <Input
                  type='text'
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
                <Textarea
                  placeholder={`Modèle d'appareil`}
                  className='border border-gray-300 p-2 rounded text-gray-700'
                  {...register('model', { required: true })}
                />
              }
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <FormField
              labelText={`Numéro de série`}
              inputElement={
                <Textarea
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
