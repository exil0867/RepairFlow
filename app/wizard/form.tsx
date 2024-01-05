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
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import searchCustomer from '../actions/searchCustomer'
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import Selector from '@/components/selector'
import searchDevice from '../actions/searchDevice'

function transformArray(arr: any, selectedProp: any) {
  return arr.map((element) => ({
    id: element.id,
    value: element[selectedProp],
  }))
}

export default function Form({ devices }: { devices: any }) {
  const [customer_, setCustomer_] = useState({
    value: '',
    id: 0,
  })

  const [device_, setDevice_] = useState({
    value: '',
    id: 0,
  })
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    console.log(device_, customer_)
  }, [device_, customer_])

  const [step, setStep] = useState(0)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {step === 0 && (
        <Selector
          setObject={setCustomer_}
          object={customer_}
          itemName={{ plurar: 'customers', singular: 'customer' }}
          creator={
            <>
              <CustomerModal
                setCustomer_={setCustomer_}
                setDialogOpen={setDialogOpen}
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
      )}
      {step === 1 && (
        <Selector
          setObject={setDevice_}
          object={device_}
          itemName={{ plurar: 'devices', singular: 'device' }}
          creator={
            <>
              <DeviceModal
                setDevice_={setDevice_}
                setDialogOpen={setDialogOpen}
              />
              <DialogTrigger asChild>
                <Button variant='outline'>Create device</Button>
              </DialogTrigger>
            </>
          }
          getObjects={async (e) => {
            const s = transformArray(await searchDevice(e), 'model')
            console.log(s, 'hi', e)
            return s
          }}
        />
      )}
      {step === 2 && <Application customer={customer_} device={device_} />}
      <button onClick={() => setStep(step + 1)}>Next</button>
    </Dialog>
  )
}
