'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import searchApplication from '../actions/searchApplication'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Selector from '@/components/selector'
import { transformArray } from '@/lib/utils'
import searchCustomer from '../actions/searchCustomer'

export default function Component() {
  const [list, setList] = useState([])
  useEffect(() => {
    async function fetchData() {
      const filtered = (await searchApplication('test')) as any
      setList(filtered)
    }
    fetchData()
  }, [])
  const [customer_, setCustomer_] = useState({
    value: '',
    id: 0,
  })
  const [open, setOpen] = useState(false)
  return (
    <main className='container mx-auto px-4 md:px-6 py-8'>
      <div className='flex flex-col gap-6'>
        <h1 className='text-2xl font-bold'>User Applications</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='filter-customer'>Customer</Label>
            {/* <Input id='filter-customer' placeholder='Filter by customer' /> */}
            <Selector
              setObject={setCustomer_}
              object={customer_}
              itemName={{ plurar: 'customers', singular: 'customer' }}
              showList={open}
              setShowList={setOpen}
              getObjects={async (e: any) => {
                const s = transformArray(await searchCustomer(e), 'name')
                console.log(s, 'hi', e)
                return s
              }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='filter-device'>Device</Label>
            <Input id='filter-device' placeholder='Filter by device' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='filter-appId'>Application ID</Label>
            <Input id='filter-appId' placeholder='Filter by application ID' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='filter-subject'>Subject</Label>
            <Input id='filter-subject' placeholder='Filter by subject' />
          </div>
        </div>
        <div className='grid gap-6'>
          {list.map(({ id, device, customer }: any) => {
            return (
              <div
                key={id}
                className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800'
              >
                <div className='md:col-span-2'>
                  <h3 className='font-semibold'>Application {id}</h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Device: {device.model}
                  </p>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Customer: {customer.name}
                  </p>
                </div>
                <div className='flex justify-end'>
                  <Link href={`/applications/${id}`}>
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
