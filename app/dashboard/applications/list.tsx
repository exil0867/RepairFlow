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
  const [customer_, setCustomer_] = useState(undefined)
  const [device_, setDevice_] = useState(undefined)
  const [subject, setSubject] = useState(undefined)
  useEffect(() => {
    async function fetchData() {
      const filtered = (await searchApplication(
        (customer_ as any)?.id as any,
        (device_ as any)?.id as any,
        subject,
      )) as any
      console.log('adsfasdf ', filtered)
      setList(filtered)
    }
    fetchData()
  }, [customer_, device_, subject])
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
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
              setShowList={(v) => {
                setOpen(v)
                setDevice_(undefined)
              }}
              getObjects={async (e: any) => {
                const s = transformArray(await searchCustomer(e), 'name')
                console.log(s, 'hi', e)
                return s
              }}
            />
          </div>
          {customer_ && (
            <div className='flex flex-col gap-2'>
              <Label htmlFor='filter-device'>Device</Label>
              <Selector
                setObject={setDevice_}
                object={device_}
                itemName={{ plurar: 'devices', singular: 'device' }}
                showList={open2}
                setShowList={setOpen2}
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
          )}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='filter-subject'>Subject</Label>
            <Input
              id='filter-subject'
              placeholder='Filter by subject'
              onChange={(s) => {
                console.log(s)
                setSubject(s.target.value as any)
              }}
            />
          </div>
        </div>
        <div className='grid gap-6'>
          {list.map(({ id, device, customer }) => {
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
                  <Link href={`/dashboard/applications/${id}`}>
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
