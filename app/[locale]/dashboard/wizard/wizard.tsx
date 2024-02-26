'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ChevronsUpDown } from 'lucide-react'
import { transformArray } from '@/lib/utils'
import CustomerModal from './customer-modal'
import DeviceModal from './device-modal'

import { cn } from '@/lib/utils'
// import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import searchCustomer from '../../actions/searchCustomer'
import Selector from '@/components/selector'
import searchDevice from '../../actions/searchDevice'
import Wrapper from '@/components/wrapper'
import { InputError } from '@/components/inputError'

export default function Component() {
  const [open, setOpen] = useState(false)
  const [customer_, setCustomer_] = useState({
    value: '',
    id: 0,
  })

  const [device_, setDevice_] = useState({
    value: '',
    id: 0,
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [customerIsSelected, setCustomerIsSelected] = useState<boolean | null>(
    null,
  )
  const [deviceIsSelected, setDeviceIsSelected] = useState<boolean | null>(null)

  const goToNextStep = (event: any) => {
    event.preventDefault()
    if (currentStep === 1) {
      if (customer_.id === 0) {
        return setCustomerIsSelected(false)
      }
    }
    if (currentStep === 2) {
      if (device_.id === 0) {
        return setDeviceIsSelected(false)
      }
    }
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const goToPreviousStep = (event: any) => {
    event.preventDefault()
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const router = useRouter()

  useEffect(() => {
    if (currentStep === 3)
      router.push(
        `/dashboard/applications/create?customerId=${customer_.id}&deviceId=${device_.id}&status=diagnosing`,
      )
  }, [currentStep, customer_.id, device_.id, router])

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div key={1} className='mb-2'>
              <Label className='block pb-4'>Client</Label>
              <Selector
                initialDisplay={false}
                setObject={setCustomer_}
                object={customer_}
                itemName={{ plurar: 'clients', singular: 'client' }}
                showList={open}
                setShowList={setOpen}
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
            </div>
            <p className='text-xs text-gray-600'>
              Sélectionner ou créer un client
            </p>
            {!customerIsSelected && customerIsSelected !== null && (
              <InputError>Veuillez sélectionner un client</InputError>
            )}
          </>
        )
      case 2:
        return (
          <>
            <div key={2} className='mb-2'>
              <Label className='block pb-4'>Appareil</Label>
              <Selector
                initialDisplay={true}
                setObject={setDevice_}
                object={device_}
                itemName={{ plurar: 'appareils', singular: 'appareil' }}
                showList={open}
                setShowList={setOpen}
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
                      customer_.id as any,
                    ),
                    'model',
                  )
                  console.log(s, 'hi', e)
                  return s
                }}
              />
            </div>
            <p className='text-xs text-gray-600'>
              Sélectionner ou créer un appareil du client
            </p>
            {!deviceIsSelected && deviceIsSelected !== null && (
              <InputError>Veuillez sélectionner un appareil</InputError>
            )}
          </>
        )
      default:
        return null
    }
  }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Wrapper
        title='Créer une tâche'
        footer={
          <>
            {currentStep > 1 && (
              <Button
                className='flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
                variant='outline'
                onClick={goToPreviousStep}
              >
                Arrière
              </Button>
            )}
            {currentStep < 3 && (
              <Button
                className='flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                onClick={goToNextStep}
              >
                Suivant
              </Button>
            )}
            <p className='mt-2 text-center text-sm text-gray-600'>
              Étape {currentStep} sur 3
            </p>
          </>
        }
      >
        <p className='mb-5'>
          Dans cette page, le processus de lancement d&apos;une nouvelle tâche
          commence par la sélection d&apos;un client, suivie de la sélection de
          votre appareil et enfin en remplissant le formulaire de tâche.
        </p>
        {renderStep()}
      </Wrapper>
    </Dialog>
  )
}
