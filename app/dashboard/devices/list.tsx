'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import searchApplication from '../../actions/searchApplication'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Selector from '@/components/selector'
import { transformArray } from '@/lib/utils'
import searchCustomer from '../../actions/searchCustomer'
import searchDevice from '@/app/actions/searchDevice'

export default function Component() {
  const [list, setList] = useState([])
  const [model, setModel] = useState(undefined)
  const [serialNumber, setSerialNumber] = useState(undefined)
  const [brand, setBrand] = useState(undefined)
  const [customer_, setCustomer_] = useState(undefined)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  useEffect(() => {
    async function fetchData() {
      const filtered = (await searchDevice(
        model,
        brand,
        serialNumber,
        (customer_ as any)?.id as any,
      )) as any
      setList(filtered)
    }
    fetchData()
  }, [brand, customer_, model, serialNumber])
  return (
    <main className='container mx-auto px-4 md:px-6 py-8'>
      <div className='flex flex-col gap-6'>
        <h1 className='text-2xl font-bold'>Devices</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='filter-customer'>Customer</Label>
            {/* <Input id='filter-customer' placeholder='Filter by customer' /> */}
            <Selector
              setObject={setCustomer_}
              object={customer_}
              itemName={{ plurar: 'customers', singular: 'customer' }}
              showList={open}
              setShowList={(v) => {
                setOpen(v)
              }}
              getObjects={async (e: any) => {
                const s = transformArray(await searchCustomer(e), 'name')
                console.log(s, 'hi', e)
                return s
              }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='filter-subject'>Model</Label>
            <Input
              id='filter-subject'
              placeholder='Filter by model'
              onChange={(s) => {
                console.log(s)
                setModel(s.target.value as any)
              }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='filter-subject'>Brand</Label>
            <Input
              id='filter-subject'
              placeholder='Filter by brand'
              onChange={(s) => {
                console.log(s)
                setBrand(s.target.value as any)
              }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='filter-subject'>Serial Number</Label>
            <Input
              id='filter-subject'
              placeholder='Filter by serial number'
              onChange={(s) => {
                console.log(s)
                setSerialNumber(s.target.value as any)
              }}
            />
          </div>
        </div>
        <div className='grid gap-6'>
          {list.map(({ id, model, brand, customer }) => {
            return (
              <div
                key={id}
                className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800'
              >
                <div className='md:col-span-2'>
                  <h3 className='font-semibold'>Device {model}</h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    customer: {customer.name}
                  </p>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Brand: {brand}
                  </p>
                </div>
                <div className='flex justify-end'>
                  <Link href={`/dashboard/devices/${id}`}>
                    <Button variant='outline'>View</Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
