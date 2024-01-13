'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formRes } from '../customers/create/page'
import { Check, ChevronsUpDown } from 'lucide-react'
import { transformArray } from '@/lib/utils'
import CustomerModal from './customer-modal'
import DeviceModal from './device-modal'
import Application from './application'

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

  const goToNextStep = (event) => {
    event.preventDefault()
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const goToPreviousStep = (event) => {
    event.preventDefault()
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div key={1}>
            <Label className='block pb-4'>Customer</Label>
            <Selector
              setObject={setCustomer_}
              object={customer_}
              itemName={{ plurar: 'customers', singular: 'customer' }}
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
                    <Button variant='outline'>Create customer</Button>
                  </DialogTrigger>
                </>
              }
              getObjects={async (e) => {
                const s = transformArray(await searchCustomer(e), 'name')
                console.log(s, 'hi', e)
                return s
              }}
            />
          </div>
        )
      case 2:
        return (
          <div key={2}>
            <Label className='block pb-4'>Device</Label>
            <Selector
              setObject={setDevice_}
              object={device_}
              itemName={{ plurar: 'devices', singular: 'device' }}
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
                    <Button variant='outline'>Create device</Button>
                  </DialogTrigger>
                </>
              }
              getObjects={async (e) => {
                const s = transformArray(
                  await searchDevice(e, customer_.id),
                  'model',
                )
                console.log(s, 'hi', e)
                return s
              }}
            />
          </div>
        )
      case 3:
        return (
          <div key={3}>
            <Label className='block pb-4'>Customer</Label>
            <Application customer={customer_} device={device_} />
          </div>
        )
      default:
        return null
    }
  }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Wrapper
        title='Edit application'
        footer={
          <>
            <div className='flex items-center'>
              {currentStep > 1 && (
                <Button
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
                  variant='outline'
                  onClick={goToPreviousStep}
                >
                  Back
                </Button>
              )}
            </div>
            <div className='text-sm'>
              {currentStep < 3 && (
                <Button
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                  onClick={goToNextStep}
                >
                  Next
                </Button>
              )}
            </div>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Step {currentStep} of 3
            </p>
          </>
        }
      >
        {renderStep()}
      </Wrapper>
    </Dialog>
  )
}
