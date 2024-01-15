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
  const [name, setName] = useState(undefined)
  useEffect(() => {
    async function fetchData() {
      const filtered = (await searchCustomer(name)) as any
      setList(filtered)
    }
    fetchData()
  }, [name])
  return (
    <main className='container mx-auto px-4 md:px-6 py-8'>
      <div className='flex flex-col gap-6'>
        <h1 className='text-2xl font-bold'>Customers</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='filter-subject'>Name</Label>
            <Input
              id='filter-subject'
              placeholder='Filter by name'
              onChange={(s) => {
                console.log(s)
                setName(s.target.value as any)
              }}
            />
          </div>
        </div>
        <div className='grid gap-6'>
          {list.map(({ id, name, address, phoneNumber }) => {
            return (
              <div
                key={id}
                className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800'
              >
                <div className='md:col-span-2'>
                  <h3 className='font-semibold'>Customer {name}</h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Address: {address}
                  </p>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Phone Number: {phoneNumber}
                  </p>
                </div>
                <div className='flex justify-end'>
                  <Link href={`/dashboard/customers/${id}`}>
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