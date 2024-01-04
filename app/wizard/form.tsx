'use client'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formRes } from '../customers/create/page'
import { Check, ChevronsUpDown } from 'lucide-react'
import CustomerModal from './customer-modal'
import DeviceModal from './device-modal'
import Application from './application'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

export default function Form({
  customers,
  devices,
}: {
  customers: any
  devices: any
}) {
  const [open, setOpen] = useState(false)
  const [customer_, setCustomer_] = useState({
    value: '',
    id: 0,
  })

  const [device_, setDevice_] = useState({
    value: '',
    id: 0,
  })

  const router = useRouter()

  useEffect(() => {
    console.log(device_, customer_)
  }, [device_, customer_])

  const [step, setStep] = useState(0)

  return (
    <Dialog>
      {step === 0 && (
        <>
          <CustomerModal setCustomer_={setCustomer_} />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className='w-[200px] justify-between'
              >
                {customer_.value
                  ? customers.find(
                      (customer: any) => customer.id === customer_.id,
                    )?.name
                  : 'Select customer...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Search customer...' />
                <CommandEmpty>No customers found. </CommandEmpty>
                <CommandGroup>
                  {customers.map((customer: any) => (
                    <CommandItem
                      key={customer.id}
                      value={customer}
                      onSelect={(currentValue) => {
                        setCustomer_({ id: customer.id, value: customer.name })
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          customer_.id === customer.id
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {customer.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <DialogTrigger asChild>
                  <Button variant='outline'>Create Profile</Button>
                </DialogTrigger>
              </Command>
            </PopoverContent>
          </Popover>
        </>
      )}
      {step === 1 && (
        <>
          <DeviceModal setDevice_={setDevice_} />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className='w-[200px] justify-between'
              >
                {device_.value
                  ? devices.find((device: any) => device.id === device_.id)
                      ?.model
                  : 'Select device...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Search  device...' />
                <CommandEmpty>No devices found. </CommandEmpty>
                <CommandGroup>
                  {devices.map((device: any) => (
                    <CommandItem
                      key={device.id}
                      value={device}
                      onSelect={(currentValue) => {
                        setDevice_({ id: device.id, value: device.model })
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          device_.id === device.id
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {device.model}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <DialogTrigger asChild>
                  <Button variant='outline'>Create device</Button>
                </DialogTrigger>
              </Command>
            </PopoverContent>
          </Popover>
        </>
      )}
      {step === 2 && <Application customer={customer_} device={device_} />}
      <button onClick={() => setStep(step + 1)}>Next</button>
    </Dialog>
  )
}
